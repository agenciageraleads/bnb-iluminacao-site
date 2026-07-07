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

# Working tree sujo é recusado SEMPRE — inclusive com ALLOW_BRANCH_DEPLOY=1.
# O `git archive HEAD` não leva mudanças não commitadas, então um deploy de
# árvore suja publica um estado que não existe em commit nenhum (incidente
# de 06/07/2026: curadoria de catálogo deployada de árvore desatualizada
# regrediu o site em produção).
if [[ -n "$(git -C "${SCRIPT_REPO_ROOT}" status --porcelain 2>/dev/null)" ]]; then
  echo "❌ Deploy recusado: working tree com mudanças não commitadas ou arquivos untracked."
  echo "   Commite tudo, faça PR para '${RELEASE_BRANCH}' e deploye após o merge."
  exit 1
fi

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
  cd ${VPS_BUILD_DIR}
  docker build \
    --build-arg PAYLOAD_SECRET=\"\${PAYLOAD_SECRET}\" \
    --build-arg NEXT_PUBLIC_GTM_ID=\"\${NEXT_PUBLIC_GTM_ID}\" \
    --build-arg NEXT_PUBLIC_ADS_ID=\"\${NEXT_PUBLIC_ADS_ID}\" \
    --build-arg NEXT_PUBLIC_GA_ID=\"\${NEXT_PUBLIC_GA_ID}\" \
    --build-arg NEXT_PUBLIC_FB_PIXEL_ID=\"\${NEXT_PUBLIC_FB_PIXEL_ID}\" \
    -t ${FULL_TAG} . 2>&1 | tail -5
'"
echo "   ✓ Imagem construída"

# ── 3. Deploy no Swarm ────────────────────────────────────────
echo ""
echo "▶ [3/5] Atualizando serviço Swarm..."
${SSH_CMD} "docker service update --image '${FULL_TAG}' ${SERVICE_NAME}"
echo "   ✓ Serviço atualizado"

# ── 4. Verificação rápida ─────────────────────────────────────
echo ""
echo "▶ [4/5] Verificando estado do serviço..."
sleep 5
${SSH_CMD} "docker service ps ${SERVICE_NAME} --format '{{.Name}}\t{{.CurrentState}}' | head -3"

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
