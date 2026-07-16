#!/usr/bin/env bash

set -euo pipefail

readonly APP_ID='site'
readonly RELEASE_BRANCH="${RELEASE_BRANCH:-main}"
readonly REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
readonly SSH_TARGET="${VPS_SSH_TARGET:-vps-bb-deploy}"

usage() {
  cat <<'EOF'
Usage:
  ./scripts/deploy-vps-secure.sh --check-remote
  ./scripts/deploy-vps-secure.sh --validate-only [TAG]
  ./scripts/deploy-vps-secure.sh [TAG]

The original deploy-vps.sh remains the root rollback path.
EOF
}

check_release_guard() {
  local current_branch local_sha remote_sha
  if [[ -n "$(git -C "${REPO_ROOT}" status --porcelain)" ]]; then
    printf 'Deploy refused: working tree has uncommitted or untracked files\n' >&2
    exit 1
  fi
  current_branch="$(git -C "${REPO_ROOT}" rev-parse --abbrev-ref HEAD)"
  if [[ "${ALLOW_BRANCH_DEPLOY:-}" == '1' ]]; then
    printf 'WARNING: branch guard disabled for %s\n' "${current_branch}"
    return
  fi
  [[ "${current_branch}" == "${RELEASE_BRANCH}" ]] || {
    printf 'Deploy refused: expected branch %s, got %s\n' "${RELEASE_BRANCH}" "${current_branch}" >&2
    exit 1
  }
  git -C "${REPO_ROOT}" fetch -q origin "${RELEASE_BRANCH}"
  local_sha="$(git -C "${REPO_ROOT}" rev-parse HEAD)"
  remote_sha="$(git -C "${REPO_ROOT}" rev-parse "origin/${RELEASE_BRANCH}")"
  [[ "${local_sha}" == "${remote_sha}" ]] || {
    printf 'Deploy refused: local HEAD differs from origin/%s\n' "${RELEASE_BRANCH}" >&2
    exit 1
  }
}

validate_tag() {
  [[ ${#1} -le 64 && "$1" =~ ^[a-zA-Z0-9][a-zA-Z0-9._-]*$ ]] || {
    printf 'Invalid image tag: %s\n' "$1" >&2
    exit 1
  }
}

upload_archive() {
  local archive="$1" tag="$2" remote_dir remote_file
  remote_dir="/home/bb-deploy/incoming/${APP_ID}"
  remote_file="${remote_dir}/${tag}.tar"
  ssh -o BatchMode=yes "${SSH_TARGET}" "install -d -m 700 '${remote_dir}'"
  scp -q -o BatchMode=yes "${archive}" "${SSH_TARGET}:${remote_file}.part"
  ssh -o BatchMode=yes "${SSH_TARGET}" "chmod 600 '${remote_file}.part' && mv -f -- '${remote_file}.part' '${remote_file}'"
}

main() {
  local mode='deploy' tag archive digest
  case "${1:-}" in
    -h | --help)
      usage
      return
      ;;
    --check-remote)
      ssh -o BatchMode=yes "${SSH_TARGET}" 'sudo -n /usr/local/sbin/vps-bb-release check'
      return
      ;;
    --validate-only)
      mode='validate'
      shift
      ;;
  esac

  check_release_guard
  tag="${1:-secure-$(git -C "${REPO_ROOT}" rev-parse --short=12 HEAD)}"
  validate_tag "${tag}"
  archive="$(mktemp -t "vps-bb-${APP_ID}.XXXXXX.tar")"
  trap "rm -f -- '${archive}'" EXIT
  git -C "${REPO_ROOT}" archive --format=tar.gz HEAD >"${archive}"
  digest="$(shasum -a 256 "${archive}" | awk '{print $1}')"
  upload_archive "${archive}" "${tag}"
  ssh -o BatchMode=yes "${SSH_TARGET}" \
    "sudo -n /usr/local/sbin/vps-bb-release '${mode}' '${APP_ID}' '${tag}' '${digest}'"
}

main "$@"
