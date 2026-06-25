import { existsSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const results = []
const failures = []
const blockers = []
const packageJson = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))

const requiredFiles = [
  '../../Marketing/seo-turnaround-2026-06-12/GATE_PUBLICACAO_CONTROLADA_SPRINTS_LOCAIS_SEO_BB.md',
  '../../Marketing/seo-turnaround-2026-06-12/MATRIZ_MESTRA_SPRINTS_RESTANTES_TURNAROUND_BB.md',
  '../../Marketing/seo-turnaround-2026-06-12/PAINEL_BLOQUEIOS_GO_NO_GO_TURNAROUND_BB.md',
  '../../Marketing/seo-turnaround-2026-06-12/PACOTE_DECISAO_RAPIDA_NAP_WHATSAPP_BB.md',
  '../../Marketing/seo-turnaround-2026-06-12/PACOTE_VALIDACAO_COMERCIAL_CASES_BB.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_139_VALIDACAO_OPERACIONAL_PRE_PRODUCAO_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_139_VALIDACAO_OPERACIONAL_PRE_PRODUCAO_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_140_EVIDENCIA_VPS_READONLY_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_140_EVIDENCIA_VPS_READONLY_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_145_ROTEADOR_POS_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_145_ROTEADOR_POS_DECISAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-022-execucao-limpeza-controlada-vps-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_152_DECISAO_BUILD_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_152_DECISAO_BUILD_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-023-decisao-build-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-024-roteador-pos-decisao-build-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_154_PACOTE_BUILD_CONTROLADO_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-025-pacote-build-controlado-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_155_FILA_SEM_GO_BUILD_SEM_PRODUCAO.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_155_FILA_SEM_GO_BUILD_SEM_PRODUCAO_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-ops-048-fila-sem-go-build-sem-producao-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_156_HARMONIZACAO_PAINEIS_POS_NAP_BUILD_PENDENTE.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_156_HARMONIZACAO_PAINEIS_POS_NAP_BUILD_PENDENTE_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-ops-049-harmonizacao-paineis-pos-nap-build-pendente-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-ops-050-fila-execucao-humana-gbp-offpage-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_146_FILA_POS_READINESS_SEM_PRODUCAO.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_146_FILA_POS_READINESS_SEM_PRODUCAO_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-ops-047-fila-pos-readiness-sem-producao-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-link-009-pre-contatos-offpage-pos-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/MACROBLOCO_OFFPAGE_EXECUCAO_ASSISTIDA.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_MACROBLOCO_OFFPAGE_EXECUCAO_ASSISTIDA_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-link-010-fila-execucao-offpage-pos-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/MACROBLOCO_CASES_EXECUCAO_ASSISTIDA.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_MACROBLOCO_CASES_EXECUCAO_ASSISTIDA_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-img-019-fila-execucao-cases-comerciais-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/MACROBLOCO_REGIONAL_CMS_EXECUCAO_ASSISTIDA.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_MACROBLOCO_REGIONAL_CMS_EXECUCAO_ASSISTIDA_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-reg-005-fila-cidades-cms-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_148_AUDITORIA_GBP_READONLY.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_148_AUDITORIA_GBP_READONLY_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-gbp-001-auditoria-readonly-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-gbp-002-ficha-evidencia-readonly-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/MACROBLOCO_GBP_EXECUCAO_ASSISTIDA.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_MACROBLOCO_GBP_EXECUCAO_ASSISTIDA_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-gbp-003-fila-execucao-readonly-update-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-meas-004-ficha-evidencia-gsc-ga4-gtm-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/MACROBLOCO_RANKING_SERPAPI_POS_DEPLOY.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_MACROBLOCO_RANKING_SERPAPI_POS_DEPLOY_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-meas-007-ranking-serpapi-posdeploy-d0-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/MACROBLOCO_GO_GSC_GA4_EXECUCAO_ASSISTIDA.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_MACROBLOCO_GO_GSC_GA4_EXECUCAO_ASSISTIDA_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-meas-006-fila-execucao-gsc-ga4-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/PACOTE_VALIDACAO_TAGS_GSC_GA4_TRAFEGO_PAGO_BB.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-meas-008-validacao-tags-gsc-ga4-trafego-pago-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-ops-051-pos-deploy-evidencias-externas-2026-06-15.csv',
  'src/lib/seo/nap-governance.json',
  'src/lib/seo/cases-governance.json',
]

const localAuditScripts = [
  ['seo:audit:canonical-coverage', 'Canonical coverage'],
  ['seo:audit:nap', 'NAP inventory'],
  ['seo:audit:cases', 'Cases inventory'],
  ['seo:audit:cases:strict', 'Cases strict'],
  ['seo:audit:publication-queue', 'Publication queue coverage'],
  ['seo:audit:wave1', 'Wave 1 publication'],
  ['seo:audit:wave1:nap-scope', 'Wave 1 NAP scope'],
  ['seo:audit:wave1:preprod', 'Wave 1 preproduction readiness'],
  ['seo:audit:wave1:vps-readonly', 'Wave 1 VPS read-only evidence'],
  ['seo:audit:wave1:vps-disk', 'Wave 1 VPS disk readiness'],
  ['seo:audit:wave1:vps-cleanup-plan', 'Wave 1 VPS cleanup plan'],
  ['seo:audit:wave1:vps-cleanup-execution', 'Wave 1 VPS cleanup execution'],
  ['seo:audit:wave1:vps-cleanup-decision', 'Wave 1 VPS cleanup decision'],
  ['seo:audit:wave1:vps-cleanup-router', 'Wave 1 VPS cleanup router'],
  ['seo:audit:wave1:vps-cleanup-executed', 'Wave 1 VPS cleanup executed'],
  ['seo:audit:wave1:build-decision', 'Wave 1 build decision'],
  ['seo:audit:wave1:build-router', 'Wave 1 build router'],
  ['seo:audit:wave1:build-package', 'Wave 1 build package'],
  ['seo:audit:no-build-production-queue', 'No-build production queue'],
  ['seo:audit:panel-state-harmonization', 'Panel state harmonization'],
  ['seo:audit:human-external-execution-queue', 'Human external execution queue'],
  ['seo:audit:wave2', 'Wave 2 publication'],
  ['seo:audit:wave3', 'Wave 3 publication'],
  ['seo:audit:wave4', 'Wave 4 publication'],
  ['seo:audit:wave5', 'Wave 5 authority and measurement'],
  ['seo:audit:wave6', 'Wave 6 external accesses'],
  ['seo:audit:wave1:deploy', 'Wave 1 deploy preflight'],
  ['seo:audit:robots', 'Robots GEO/AI'],
  ['seo:audit:regional', 'Regional pages'],
  ['seo:audit:images', 'SEO images'],
  ['seo:audit:recent-image-intake', 'Recent image intake'],
  ['seo:audit:external-unlocks', 'External unlocks'],
  ['seo:audit:external-responses', 'External responses inventory'],
  ['seo:audit:external-next-actions', 'External next actions'],
  ['seo:audit:external-evidence-quality', 'External evidence quality'],
  ['seo:audit:external-response-staging', 'External response staging'],
  ['seo:audit:external-response-promotion-plan', 'External response promotion plan'],
  ['seo:audit:external-response-rollback-snapshot', 'External response rollback snapshot'],
  ['seo:audit:external-response-promotion-dry-run', 'External response promotion dry-run'],
  ['seo:audit:external-response-post-promotion', 'External response post-promotion'],
  ['seo:audit:post-readiness-no-production', 'Post-readiness no-production'],
  ['seo:audit:offpage-post-nap-precontacts', 'Off-page post-NAP precontacts'],
  ['seo:audit:offpage-execution-queue', 'Off-page execution queue'],
  ['seo:audit:cases-execution-queue', 'Cases execution queue'],
  ['seo:audit:regional-cms-execution-queue', 'Regional CMS execution queue'],
  ['seo:audit:gbp-readonly-package', 'GBP read-only package'],
  ['seo:audit:gbp-evidence-intake', 'GBP evidence intake'],
  ['seo:audit:gbp-execution-queue', 'GBP execution queue'],
  ['seo:audit:gsc-ga4-gtm-evidence-intake', 'GSC GA4 GTM evidence intake'],
  ['seo:audit:gsc-ga4-execution-queue', 'GSC GA4 execution queue'],
  ['seo:audit:paid-traffic-tag-validation-package', 'Paid traffic tag validation package'],
  ['seo:audit:ranking-serpapi-posdeploy', 'Ranking SerpApi post-deploy'],
  ['seo:audit:post-deploy-external-package', 'Post-deploy external package'],
  ['seo:audit:executive-closeout', 'Executive closeout'],
  ['seo:audit:final-blockers', 'Final blockers'],
  ['seo:audit:unlock-owner-briefs', 'Unlock owner briefs'],
  ['seo:audit:unlock-followup-sla', 'Unlock follow-up SLA'],
  ['seo:audit:open-exit-plan', 'Open item exit plan'],
  ['seo:audit:post-publication-validation', 'Post-publication validation'],
  ['seo:audit:publication-source-manifest', 'Publication source manifest'],
  ['seo:audit:public-200-next-actions', 'Public 200 next actions'],
  ['seo:audit:public-200-correction-package', 'Public 200 correction package'],
  ['seo:audit:accessory-source-patch', 'Accessory source patch'],
  ['seo:audit:obras-source-patch', 'Obras source patch'],
  ['seo:audit:cloudflare-geo-decision', 'Cloudflare GEO decision'],
  ['seo:audit:publication-go-nogo-final', 'Publication GO/NO-GO final'],
  ['seo:audit:publication-decision-record', 'Publication decision record'],
  ['seo:audit:post-decision-router', 'Post-decision router'],
  ['seo:audit:technical-no-publication-preflight', 'Technical no-publication preflight'],
  ['seo:audit:readiness-runner-hardening', 'Readiness runner hardening'],
  ['seo:audit:publication-decision-simulator', 'Publication decision simulator'],
  ['seo:audit:post-go-runbook', 'Post-GO runbook'],
  ['seo:audit:remaining-sprints', 'Remaining sprints'],
  ['seo:audit:scorecard', 'Scorecard consistency'],
  ['seo:audit:completion', 'Turnaround completion inventory'],
]

function runNpmScript(scriptName) {
  const script = packageJson.scripts?.[scriptName]
  const nodeMatch = script?.match(/^node\s+(.+)$/)

  if (nodeMatch) {
    const args = nodeMatch[1].split(/\s+/).filter(Boolean)
    return spawnSync(process.execPath, args, {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 8,
      timeout: 120000,
    })
  }

  return spawnSync('npm', ['run', '--silent', scriptName], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 8,
    timeout: 120000,
  })
}

function summarizeOutput(output) {
  return output
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return (
        trimmed.endsWith('completed.') ||
        trimmed.includes('audit summary') ||
        trimmed.includes('audit completed') ||
        trimmed.includes('Regional') ||
        trimmed.includes('Images') ||
        trimmed.includes('robots') ||
        trimmed.includes('warnings:') ||
        trimmed.includes('failed:')
      )
    })
    .slice(-8)
}

for (const file of requiredFiles) {
  const absolutePath = path.resolve(root, file)
  if (existsSync(absolutePath)) {
    results.push({ name: `file:${file}`, status: 'pass' })
  } else {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
  }
}

for (const [scriptName, label] of localAuditScripts) {
  console.log(`[running] ${label}`)
  const result = runNpmScript(scriptName)
  const output = `${result.stdout || ''}\n${result.stderr || ''}`.trim()

  if (result.status === 0) {
    results.push({ name: label, status: 'pass', summary: summarizeOutput(output) })
    console.log(`[pass] ${label}`)
  } else if (result.error?.code === 'ETIMEDOUT') {
    failures.push(`${label} excedeu timeout ao executar npm run ${scriptName}`)
    results.push({ name: label, status: 'fail', summary: summarizeOutput(output) })
    console.log(`[timeout] ${label}`)
  } else {
    failures.push(`${label} falhou ao executar npm run ${scriptName}`)
    results.push({ name: label, status: 'fail', summary: summarizeOutput(output) })
    console.log(`[fail] ${label}`)
  }
}

console.log('[running] NAP strict')
const napStrict = runNpmScript('seo:audit:nap:strict')
const napStrictOutput = `${napStrict.stdout || ''}\n${napStrict.stderr || ''}`.trim()

if (napStrict.status === 0) {
  results.push({ name: 'NAP strict', status: 'pass', summary: summarizeOutput(napStrictOutput) })
  console.log('[pass] NAP strict')
} else if (napStrict.error?.code === 'ETIMEDOUT') {
  failures.push('NAP strict excedeu timeout.')
  results.push({ name: 'NAP strict', status: 'fail', summary: summarizeOutput(napStrictOutput) })
  console.log('[timeout] NAP strict')
} else if (
  napStrictOutput.includes('officialPublicEmail') &&
  napStrictOutput.includes('cnpjExposure') &&
  napStrictOutput.includes('requiredAddressSignals')
) {
  blockers.push('NAP strict bloqueado por governanca oficial pendente e e-mails publicos divergentes.')
  results.push({ name: 'NAP strict', status: 'blocked_expected', summary: summarizeOutput(napStrictOutput) })
  console.log('[blocked_expected] NAP strict')
} else {
  failures.push('NAP strict falhou por motivo diferente do bloqueio esperado.')
  results.push({ name: 'NAP strict', status: 'fail', summary: summarizeOutput(napStrictOutput) })
  console.log('[fail] NAP strict')
}

console.log('[running] External responses strict')
const externalResponsesStrict = runNpmScript('seo:audit:external-responses:strict')
const externalResponsesStrictOutput = `${externalResponsesStrict.stdout || ''}\n${externalResponsesStrict.stderr || ''}`.trim()

if (externalResponsesStrict.status === 0) {
  results.push({
    name: 'External responses strict',
    status: 'pass',
    summary: summarizeOutput(externalResponsesStrictOutput),
  })
  console.log('[pass] External responses strict')
} else if (externalResponsesStrict.error?.code === 'ETIMEDOUT') {
  failures.push('External responses strict excedeu timeout.')
  results.push({
    name: 'External responses strict',
    status: 'fail',
    summary: summarizeOutput(externalResponsesStrictOutput),
  })
  console.log('[timeout] External responses strict')
} else if (
  externalResponsesStrictOutput.includes('Modo strict exige que todas as respostas estejam validado ou descartado') ||
  externalResponsesStrictOutput.includes('Modo strict exige pelo menos uma frente')
) {
  blockers.push('Respostas externas strict bloqueadas ate haver evidencia validada ou decisao descartada.')
  results.push({
    name: 'External responses strict',
    status: 'blocked_expected',
    summary: summarizeOutput(externalResponsesStrictOutput),
  })
  console.log('[blocked_expected] External responses strict')
} else {
  failures.push('External responses strict falhou por motivo diferente do bloqueio esperado.')
  results.push({
    name: 'External responses strict',
    status: 'fail',
    summary: summarizeOutput(externalResponsesStrictOutput),
  })
  console.log('[fail] External responses strict')
}

console.log('[running] Turnaround completion strict')
const completionStrict = runNpmScript('seo:audit:completion:strict')
const completionStrictOutput = `${completionStrict.stdout || ''}\n${completionStrict.stderr || ''}`.trim()

if (completionStrict.status === 0) {
  results.push({ name: 'Turnaround completion strict', status: 'pass', summary: summarizeOutput(completionStrictOutput) })
  console.log('[pass] Turnaround completion strict')
} else if (completionStrict.error?.code === 'ETIMEDOUT') {
  failures.push('Turnaround completion strict excedeu timeout.')
  results.push({ name: 'Turnaround completion strict', status: 'fail', summary: summarizeOutput(completionStrictOutput) })
  console.log('[timeout] Turnaround completion strict')
} else if (
  completionStrictOutput.includes('Modo strict exige backlog sem itens abertos') &&
  completionStrictOutput.includes('Modo strict exige respostas externas validadas ou descartadas')
) {
  blockers.push('Fechamento strict bloqueado ate backlog, GOs e respostas externas provarem conclusao real.')
  results.push({
    name: 'Turnaround completion strict',
    status: 'blocked_expected',
    summary: summarizeOutput(completionStrictOutput),
  })
  console.log('[blocked_expected] Turnaround completion strict')
} else {
  failures.push('Turnaround completion strict falhou por motivo diferente do bloqueio esperado.')
  results.push({ name: 'Turnaround completion strict', status: 'fail', summary: summarizeOutput(completionStrictOutput) })
  console.log('[fail] Turnaround completion strict')
}

console.log('Turnaround readiness summary')
console.log(`local_checks=${results.filter((item) => item.status === 'pass').length}`)
console.log(`expected_blockers=${blockers.length}`)
console.log(`failures=${failures.length}`)

for (const item of results) {
  console.log(`\n[${item.status}] ${item.name}`)
  for (const line of item.summary ?? []) {
    console.log(`  ${line}`)
  }
}

if (blockers.length > 0) {
  console.log('\nExpected blockers:')
  for (const blocker of blockers) {
    console.log(`- ${blocker}`)
  }
}

if (failures.length > 0) {
  console.error('\nReadiness failures:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nTurnaround readiness completed.')
