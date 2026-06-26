import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []
const warnings = []

const requiredScripts = [
  'build',
  'start',
  'smoke:public',
  'seo:audit:p0',
  'seo:audit:regional',
  'seo:audit:images',
  'seo:audit:robots',
  'seo:audit:nap',
  'seo:audit:cases',
  'seo:audit:cases:strict',
  'seo:audit:wave1',
  'seo:audit:wave1:nap-scope',
  'seo:audit:wave1:preprod',
  'seo:audit:wave1:vps-readonly',
  'seo:audit:wave1:vps-disk',
  'seo:audit:wave1:vps-cleanup-plan',
  'seo:audit:wave1:vps-cleanup-execution',
  'seo:audit:wave1:vps-cleanup-decision',
  'seo:audit:wave1:vps-cleanup-router',
  'seo:audit:wave1:vps-cleanup-executed',
  'seo:audit:wave1:build-decision',
  'seo:audit:wave1:build-router',
  'seo:audit:wave1:build-package',
  'seo:audit:turnaround',
]

const requiredFiles = [
  'Dockerfile',
  'docker-compose.yml',
  'docker-compose.vps.yml',
  'scripts/audit-wave1-publication.mjs',
  'scripts/audit-turnaround-readiness.mjs',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_75_PACOTE_APROVACAO_DEPLOY_CONTROLADO.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_76_AUDITORIA_ONDA_1_PUBLICACAO.md',
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
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_152_DECISAO_BUILD_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_152_DECISAO_BUILD_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP.md',
  '../../Marketing/seo-turnaround-2026-06-12/RELATORIO_EXECUCAO_SPRINT_154_PACOTE_BUILD_CONTROLADO_ONDA_1_NAP_2026-06-15.md',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-014-escopo-pos-go-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-015-validacao-operacional-pre-producao-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-016-evidencia-vps-readonly-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-017-readiness-disco-vps-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-018-plano-limpeza-controlada-vps-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-019-pacote-execucao-limpeza-vps-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-020-registro-decisao-limpeza-vps-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-021-roteador-pos-decisao-limpeza-vps-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-022-execucao-limpeza-controlada-vps-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-023-decisao-build-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-024-roteador-pos-decisao-build-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-pub-025-pacote-build-controlado-onda1-nap-2026-06-15.csv',
  '../../Marketing/seo-turnaround-2026-06-12/GATE_PUBLICACAO_CONTROLADA_SPRINTS_LOCAIS_SEO_BB.md',
]

function assertIncludes(source, expected, label) {
  if (!source.includes(expected)) {
    failures.push(`${label} nao contem: ${expected}`)
  }
}

const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
const scripts = packageJson.scripts ?? {}

for (const scriptName of requiredScripts) {
  if (!scripts[scriptName]) {
    failures.push(`Script obrigatorio ausente no package.json: ${scriptName}`)
  }
}

for (const file of requiredFiles) {
  if (!existsSync(path.resolve(root, file))) {
    failures.push(`Arquivo obrigatorio ausente no preflight da Onda 1: ${file}`)
  }
}

const dockerfile = await readFile(path.join(root, 'Dockerfile'), 'utf8')
assertIncludes(dockerfile, 'npm run build', 'Dockerfile')
assertIncludes(dockerfile, 'EXPOSE 9010', 'Dockerfile')
assertIncludes(dockerfile, 'CMD ["npm", "start"]', 'Dockerfile')

const compose = await readFile(path.join(root, 'docker-compose.yml'), 'utf8')
const composeVps = await readFile(path.join(root, 'docker-compose.vps.yml'), 'utf8')

if (!compose.includes('9010') && !compose.includes('9011')) {
  warnings.push('docker-compose.yml nao mostra porta 9010/9011 explicitamente; confirmar porta no dry-run.')
}

assertIncludes(composeVps, '9010', 'docker-compose.vps.yml')

const approvalPackage = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_75_PACOTE_APROVACAO_DEPLOY_CONTROLADO.md'),
  'utf8'
)

for (const expected of ['Rollback minimo exigido', 'GO parcial', 'npm run seo:audit:wave1']) {
  assertIncludes(approvalPackage, expected, 'SPRINT_75_PACOTE_APROVACAO_DEPLOY_CONTROLADO.md')
}

const wave1NapScope = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'Onda 1 + NAP oficial',
  'sem deploy automatico',
  'rollback',
  'imagem viva',
  'backup do spec',
  'sem Google Business Profile',
  'sem diretorios definitivos',
  'sem CRM',
]) {
  assertIncludes(wave1NapScope, expected, 'SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP.md')
}

const wave1Preprod = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_139_VALIDACAO_OPERACIONAL_PRE_PRODUCAO_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'bnb-site:9fab426',
  'backup do spec salvo',
  'rollback real preparado',
  'CMS/admin',
  'nao publicar',
  'nao trocar servico',
]) {
  assertIncludes(wave1Preprod, expected, 'SPRINT_139_VALIDACAO_OPERACIONAL_PRE_PRODUCAO_ONDA_1_NAP.md')
}

const wave1DiskReadiness = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  '92%',
  '8.4G',
  '29.18GB',
  'GO_LIMPEZA_CONTROLADA_VPS',
  'sem deploy',
]) {
  assertIncludes(wave1DiskReadiness, expected, 'SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP.md')
}

const wave1CleanupPlan = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'GO_LIMPEZA_CONTROLADA_VPS',
  'bnb-site:9fab426',
  '34.52GB',
  '29.18GB',
  'sem limpeza executada',
]) {
  assertIncludes(wave1CleanupPlan, expected, 'SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md')
}

const wave1CleanupExecution = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'GO_LIMPEZA_CONTROLADA_VPS',
  'GO_BUILD_ONDA_1_NAP',
  'bnb-site:9fab426',
  'sem limpeza executada',
  'sem deploy',
]) {
  assertIncludes(wave1CleanupExecution, expected, 'SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP.md')
}

const wave1CleanupDecision = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'PENDENTE',
  'GO_LIMPEZA_CONTROLADA_VPS',
  'NO_GO_LIMPEZA',
  'GO_BUILD_ONDA_1_NAP',
  'sem limpeza executada',
]) {
  assertIncludes(wave1CleanupDecision, expected, 'SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md')
}

const wave1CleanupRouter = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_145_ROTEADOR_POS_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'PENDENTE',
  'GO_LIMPEZA_CONTROLADA_VPS',
  'NO_GO_LIMPEZA',
  'SPRINT_145_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP',
  'sem limpeza executada',
]) {
  assertIncludes(wave1CleanupRouter, expected, 'SPRINT_145_ROTEADOR_POS_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md')
}

const wave1CleanupExecuted = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'docker builder prune -f',
  '92%',
  '84%',
  'site-bb_app 1/1 bnb-site:9fab426',
  'sem build/deploy',
]) {
  assertIncludes(wave1CleanupExecuted, expected, 'SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md')
}

const wave1BuildDecision = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_152_DECISAO_BUILD_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'PENDENTE',
  'GO_BUILD_ONDA_1_NAP',
  'NO_GO_BUILD',
  'Onda 1 + NAP oficial',
  'sem build/deploy',
]) {
  assertIncludes(wave1BuildDecision, expected, 'SPRINT_152_DECISAO_BUILD_ONDA_1_NAP.md')
}

const wave1BuildRouter = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'PENDENTE',
  'GO_BUILD_ONDA_1_NAP',
  'NO_GO_BUILD',
  'SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP',
  'sem build executado',
  'sem deploy executado',
]) {
  assertIncludes(wave1BuildRouter, expected, 'SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP.md')
}

const wave1BuildPackage = await readFile(
  path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12/SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP.md'),
  'utf8'
)

for (const expected of [
  'pacote operacional pronto',
  'decisao_build=GO_BUILD_ONDA_1_NAP',
  'GO_BUILD_ONDA_1_NAP',
  'build nao executado',
  'deploy nao executado',
]) {
  assertIncludes(wave1BuildPackage, expected, 'SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP.md')
}

console.log('Wave 1 deploy preflight summary')
console.log(`required_scripts=${requiredScripts.length}`)
console.log(`required_files=${requiredFiles.length}`)
console.log(`warnings=${warnings.length}`)
console.log(`failures=${failures.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 deploy preflight warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 deploy preflight failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 deploy preflight completed.')
