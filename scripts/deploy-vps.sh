#!/usr/bin/env bash
# ============================================================
# deploy-vps.sh — Build nativo na VPS, deploy no Swarm e
#                 limpeza automática de imagens antigas.
#
# Uso:
#   ./scripts/deploy-vps.sh [TAG]
#
#   TAG opcional: nome curto para a imagem (ex.: "fix-blog")
#   Se omitido, usa o hash curto do commit atual.
#
# Mantém as 2 imagens mais recentes, remove o resto.
# ============================================================

set -euo pipefail

# ── Guard-rail de release ────────────────────────────────────
# Só a branch de release vai a produção. Impede que o deploy de uma
# feature branch substitua o que já está no ar ("último deploy ganha").
# Hotfix de emergência: ALLOW_BRANCH_DEPLOY=1 ./scripts/deploy-vps.sh ...
RELEASE_BRANCH="${RELEASE_BRANCH:-main}"
SCRIPT_REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CURRENT_BRANCH="$(git -C "${SCRIPT_REPO_ROOT}" rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"

if [[ "${ALLOW_BRANCH_DEPLOY:-}" == "1" ]]; then
  echo "⚠️  ALLOW_BRANCH_DEPLOY=1 — guard-rail DESLIGADO (hotfix). Branch: ${CURRENT_BRANCH}"
else
  if [[ "${CURRENT_BRANCH}" != "${RELEASE_BRANCH}" ]]; then
    echo "❌ Deploy recusado: só a branch '${RELEASE_BRANCH}' vai a produção (você está em '${CURRENT_BRANCH}')."
    echo "   Faça PR da sua mudança para '${RELEASE_BRANCH}', dê merge e deploye a '${RELEASE_BRANCH}'."
    echo "   Hotfix de emergência: ALLOW_BRANCH_DEPLOY=1 ./scripts/deploy-vps.sh ..."
    exit 1
  fi
  git -C "${SCRIPT_REPO_ROOT}" fetch -q origin "${RELEASE_BRANCH}" || true
  LOCAL_SHA="$(git -C "${SCRIPT_REPO_ROOT}" rev-parse HEAD 2>/dev/null || echo local)"
  REMOTE_SHA="$(git -C "${SCRIPT_REPO_ROOT}" rev-parse "origin/${RELEASE_BRANCH}" 2>/dev/null || echo remote)"
  if [[ "${LOCAL_SHA}" != "${REMOTE_SHA}" ]]; then
    echo "❌ Deploy recusado: HEAD local (${LOCAL_SHA}) ≠ origin/${RELEASE_BRANCH} (${REMOTE_SHA})."
    echo "   Rode 'git pull' antes de deployar."
    exit 1
  fi
  echo "✓ Guard-rail: na '${RELEASE_BRANCH}', em dia com origin (${LOCAL_SHA:0:7})."
fi

# ── Configuração ─────────────────────────────────────────────
VPS_HOST="2.25.144.65"
VPS_USER="root"
VPS_KEY="${VPS_KEY:-$HOME/.ssh/vps_2_25_144_65}"
VPS_BUILD_DIR="/tmp/site-bb-build"
VPS_ENV_FILE="/opt/vps-bb/env/site-bb.env"
SERVICE_NAME="site-bb_app"
IMAGE_NAME="bnb-site"
KEEP_IMAGES=2
RELEASE_WINDOW_SECONDS="${RELEASE_WINDOW_SECONDS:-285}"
ROLLOUT_TIMEOUT_SECONDS="${ROLLOUT_TIMEOUT_SECONDS:-150}"
SMOKE_URL="${SMOKE_URL:-https://bebiluminacao.com.br/}"
MEDIA_VOLUME="bnb-platform_media_data"
MEDIA_TARGET="/app/media"

TAG="${1:-$(git -C "${SCRIPT_REPO_ROOT}" rev-parse --short HEAD 2>/dev/null || echo 'latest')}"
FULL_TAG="${IMAGE_NAME}:${TAG}"

SSH_OPTS="-i ${VPS_KEY} -o StrictHostKeyChecking=no -o BatchMode=yes"
SSH_CMD="ssh ${SSH_OPTS} ${VPS_USER}@${VPS_HOST}"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  Site B&B — Deploy de Produção                      ║"
echo "║  Tag: ${FULL_TAG}"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ── 1. git archive ────────────────────────────────────────────
echo "▶ [1/5] Sincronizando código com a VPS..."
${SSH_CMD} "rm -rf ${VPS_BUILD_DIR} && mkdir -p ${VPS_BUILD_DIR}"
git -C "${SCRIPT_REPO_ROOT}" archive HEAD | ${SSH_CMD} "tar x -C ${VPS_BUILD_DIR}"
echo "   ✓ Código sincronizado"

# ── 2. Build nativo na VPS (com build args das NEXT_PUBLIC_*) ─
echo ""
echo "▶ [2/5] Construindo imagem na VPS (${TAG})..."
${SSH_CMD} "bash -c '
  set -euo pipefail
  set -a; source ${VPS_ENV_FILE}; set +a
  : \"\${BLOG_ENGINE_SECRET:?BLOG_ENGINE_SECRET is required in ${VPS_ENV_FILE}}\"
  cd ${VPS_BUILD_DIR}
  docker build \
    --build-arg NEXT_PUBLIC_GTM_ID=\"\${NEXT_PUBLIC_GTM_ID}\" \
    --build-arg NEXT_PUBLIC_ADS_ID=\"\${NEXT_PUBLIC_ADS_ID}\" \
    --build-arg NEXT_PUBLIC_GA_ID=\"\${NEXT_PUBLIC_GA_ID}\" \
    --build-arg NEXT_PUBLIC_FB_PIXEL_ID=\"\${NEXT_PUBLIC_FB_PIXEL_ID}\" \
    -t ${FULL_TAG} . 2>&1 | tail -5
'"
echo "   ✓ Imagem construída"

# ── 3. Preflight e deploy no Swarm ────────────────────────────
echo ""
echo "▶ [3/5] Validando contrato runtime e atualizando serviço Swarm..."

# O preflight lê apenas nomes de variáveis e mounts. Valores de secrets nunca
# saem da VPS. Falhar aqui preserva integralmente a imagem atual.
${SSH_CMD} "bash -s -- '${SERVICE_NAME}' '${MEDIA_VOLUME}' '${MEDIA_TARGET}'" <<'REMOTE_PREFLIGHT'
set -euo pipefail
service="$1"
media_volume="$2"
media_target="$3"

docker service inspect "$service" >/dev/null
env_names="$(docker service inspect "$service" --format '{{range .Spec.TaskTemplate.ContainerSpec.Env}}{{println .}}{{end}}' | sed 's/=.*//')"
service_env="$(docker service inspect "$service" --format '{{range .Spec.TaskTemplate.ContainerSpec.Env}}{{println .}}{{end}}')"
for required in PAYLOAD_SECRET BLOG_ENGINE_SECRET REDIS_URL; do
  if ! grep -Fxq "$required" <<<"$env_names"; then
    echo "❌ Service spec sem variável obrigatória: $required" >&2
    exit 1
  fi
done
if ! grep -Fxq 'PUBLIC_FORM_TRUSTED_IP_HEADER=x-real-ip' <<<"$service_env"; then
  echo "❌ Service spec exige PUBLIC_FORM_TRUSTED_IP_HEADER=x-real-ip (Traefik deve sobrescrever o header e a origem deve estar bloqueada)" >&2
  exit 1
fi

mounts="$(docker service inspect "$service" --format '{{range .Spec.TaskTemplate.ContainerSpec.Mounts}}{{println .Source "|" .Target}}{{end}}')"
if ! grep -Fxq "$media_volume | $media_target" <<<"$mounts"; then
  echo "❌ Service spec sem volume obrigatório: $media_volume -> $media_target" >&2
  exit 1
fi
REMOTE_PREFLIGHT

RELEASE_DEADLINE=$((SECONDS + RELEASE_WINDOW_SECONDS))
PREVIOUS_IMAGE="$(${SSH_CMD} "docker service inspect '${SERVICE_NAME}' --format '{{.Spec.TaskTemplate.ContainerSpec.Image}}'")"
if [[ -z "${PREVIOUS_IMAGE}" ]]; then
  echo "❌ Não foi possível registrar a imagem atual; deploy abortado antes do update."
  exit 1
fi
echo "   ↩ Imagem de rollback: ${PREVIOUS_IMAGE}"

UPDATE_FLAGS=(--detach=true --image "${FULL_TAG}")
SERVICE_UPDATE_HELP="$(${SSH_CMD} "docker service update --help")"
if grep -q -- '--update-failure-action' <<<"${SERVICE_UPDATE_HELP}"; then
  UPDATE_FLAGS+=(--update-failure-action rollback)
fi
if grep -q -- '--update-order' <<<"${SERVICE_UPDATE_HELP}"; then
  UPDATE_FLAGS+=(--update-order start-first)
fi
if grep -q -- '--rollback-failure-action' <<<"${SERVICE_UPDATE_HELP}"; then
  UPDATE_FLAGS+=(--rollback-failure-action pause)
fi

printf -v REMOTE_UPDATE ' %q' "${UPDATE_FLAGS[@]}"
${SSH_CMD} "docker service update${REMOTE_UPDATE} '${SERVICE_NAME}'"
echo "   ✓ Update solicitado"

# ── 4. Verificação rápida ─────────────────────────────────────
echo ""
echo "▶ [4/5] Aguardando convergência e executando smoke HTTP..."

wait_for_convergence() {
  local expected_image="$1"
  local deadline=$((SECONDS + ROLLOUT_TIMEOUT_SECONDS))
  local state running desired current_image expected_image_ref current_image_ref

  expected_image_ref="${expected_image%%@*}"
  if (( deadline > RELEASE_DEADLINE )); then
    deadline="${RELEASE_DEADLINE}"
  fi

  while (( SECONDS < deadline )); do
    state="$(${SSH_CMD} "docker service inspect '${SERVICE_NAME}' --format '{{if .UpdateStatus}}{{.UpdateStatus.State}}{{else}}completed{{end}}'")"
    read -r running desired <<<"$(${SSH_CMD} "running=\$(docker service ps '${SERVICE_NAME}' --filter desired-state=running --format '{{.CurrentState}}' | grep -c '^Running' || true); desired=\$(docker service inspect '${SERVICE_NAME}' --format '{{.Spec.Mode.Replicated.Replicas}}'); echo \"\$running \$desired\"")"
    current_image="$(${SSH_CMD} "docker service inspect '${SERVICE_NAME}' --format '{{.Spec.TaskTemplate.ContainerSpec.Image}}'")"
    current_image_ref="${current_image%%@*}"

    if [[ "${current_image_ref}" == "${expected_image_ref}" && "${running}" == "${desired}" && "${state}" == "completed" ]]; then
      return 0
    fi
    if [[ "${state}" =~ ^(paused|rollback_paused|rollback_completed)$ ]]; then
      echo "   Estado terminal do Swarm: ${state}"
      return 1
    fi
    sleep 5
  done
  echo "   Timeout aguardando convergência (limite do rollout: ${ROLLOUT_TIMEOUT_SECONDS}s; janela total: ${RELEASE_WINDOW_SECONDS}s)."
  return 1
}

rollback_release() {
  echo "❌ Verificação falhou; restaurando ${PREVIOUS_IMAGE}..."
  ${SSH_CMD} "docker service update --detach=true --image '${PREVIOUS_IMAGE}' '${SERVICE_NAME}'" || {
    echo "❌ Rollback explícito falhou. Intervenção manual imediata necessária."
    return 1
  }
  if ! wait_for_convergence "${PREVIOUS_IMAGE}"; then
    echo "❌ Rollback não convergiu dentro da janela. Intervenção manual necessária."
    return 1
  fi
  echo "✓ Rollback concluído e convergente."
}

if ! wait_for_convergence "${FULL_TAG}"; then
  rollback_release
  exit 1
fi

if ! curl --fail --silent --show-error --location \
  --connect-timeout 5 --max-time 15 --retry 2 --retry-delay 2 \
  --output /dev/null "${SMOKE_URL}"; then
  echo "   Smoke HTTP falhou: ${SMOKE_URL}"
  rollback_release
  exit 1
fi

${SSH_CMD} "docker service ps '${SERVICE_NAME}' --format '{{.Name}}\t{{.CurrentState}}' | head -3"
echo "   ✓ Serviço convergente e smoke HTTP aprovado"

# ── 5. Limpeza de imagens antigas ─────────────────────────────
echo ""
echo "▶ [5/5] Limpando imagens antigas (mantendo as ${KEEP_IMAGES} mais recentes)..."

CLEANUP_CMD=$(cat <<'HEREDOC'
KEEP=KEEP_PLACEHOLDER
CURRENT=$(docker service inspect SERVICE_PLACEHOLDER --format '{{.Spec.TaskTemplate.ContainerSpec.Image}}' 2>/dev/null | sed 's/IMAGE_NAME_PLACEHOLDER://g')
docker images IMAGE_NAME_PLACEHOLDER --format '{{.Tag}}\t{{.CreatedAt}}' \
  | sort -k2 -r \
  | awk '{print $1}' \
  | tail -n +$((KEEP + 1)) \
  | while read -r tag; do
      full="IMAGE_NAME_PLACEHOLDER:${tag}"
      if [[ "$tag" == "$CURRENT" ]]; then
        echo "   ↷ Ignorando (em execução): ${full}"
      else
        docker rmi "${full}" 2>/dev/null && echo "   Removida: ${full}" || echo "   ↷ Não removida (em uso?): ${full}"
      fi
    done
HEREDOC
)

CLEANUP_CMD="${CLEANUP_CMD//KEEP_PLACEHOLDER/$KEEP_IMAGES}"
CLEANUP_CMD="${CLEANUP_CMD//SERVICE_PLACEHOLDER/$SERVICE_NAME}"
CLEANUP_CMD="${CLEANUP_CMD//IMAGE_NAME_PLACEHOLDER/$IMAGE_NAME}"

${SSH_CMD} "$CLEANUP_CMD"
echo ""

# ── Resumo ────────────────────────────────────────────────────
echo "╔══════════════════════════════════════════════════════╗"
echo "║  ✅  Deploy concluído!                               ║"
echo "║  Tag em execução: ${FULL_TAG}"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

echo "Imagens ${IMAGE_NAME} na VPS:"
${SSH_CMD} "docker images ${IMAGE_NAME} --format '  {{.Tag}}\t{{.Size}}\t{{.CreatedAt}}' | sort -k3 -r"
echo ""
