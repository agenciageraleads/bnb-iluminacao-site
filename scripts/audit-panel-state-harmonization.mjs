import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint156: `${seoPackage}/SPRINT_156_HARMONIZACAO_PAINEIS_POS_NAP_BUILD_PENDENTE.md`,
  report156: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_156_HARMONIZACAO_PAINEIS_POS_NAP_BUILD_PENDENTE_2026-06-15.md`,
  csv156: `${seoPackage}/artifacts/seo-ops-049-harmonizacao-paineis-pos-nap-build-pendente-2026-06-15.csv`,
  blockersPanel: `${seoPackage}/PAINEL_BLOQUEIOS_GO_NO_GO_TURNAROUND_BB.md`,
  masterMatrix: `${seoPackage}/MATRIZ_MESTRA_SPRINTS_RESTANTES_TURNAROUND_BB.md`,
  exitPlan: `${seoPackage}/PLANO_FECHAMENTO_ITENS_ABERTOS_TURNAROUND_BB.md`,
  responsesCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  buildDecisionCsv: `${seoPackage}/artifacts/seo-pub-023-decisao-build-onda1-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

const requiredColumns = ['frente', 'estado_anterior', 'estado_corrigido', 'evidencia', 'gate', 'acao_bloqueada']
const requiredFronts = [
  'nap_painel',
  'build_decision',
  'gbp',
  'offpage',
  'gsc_ga4_gtm',
  'cases_cidades',
  'scorecard_readiness',
]

function parseCsvLine(line) {
  const columns = []
  let current = ''
  let quoted = false

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]

    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"'
        index += 1
      } else {
        quoted = !quoted
      }
    } else if (char === ',' && !quoted) {
      columns.push(current)
      current = ''
    } else {
      current += char
    }
  }

  columns.push(current)
  return columns
}

function parseCsv(source) {
  const lines = source.trimEnd().split(/\r?\n/).filter(Boolean)
  const header = parseCsvLine(lines[0] ?? '')
  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line)
    return Object.fromEntries(header.map((column, index) => [column, values[index] ?? '']))
  })

  return { header, rows }
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

function assertIncludes(source, expected, label) {
  if (!source.includes(expected)) {
    failures.push(`${label} nao contem: ${expected}`)
  }
}

const sprint156 = await readExpectedFile(files.sprint156)
const report156 = await readExpectedFile(files.report156)
const csv156Source = await readExpectedFile(files.csv156)
const blockersPanel = await readExpectedFile(files.blockersPanel)
const masterMatrix = await readExpectedFile(files.masterMatrix)
const exitPlan = await readExpectedFile(files.exitPlan)
const responsesSource = await readExpectedFile(files.responsesCsv)
const buildDecisionSource = await readExpectedFile(files.buildDecisionCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv156 = csv156Source ? parseCsv(csv156Source) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const buildDecisionRows = buildDecisionSource ? parseCsv(buildDecisionSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const responsesByItem = new Map(responses.map((row) => [row.item_backlog, row]))
const buildDecision = buildDecisionRows.find((row) => row.campo === 'decisao_build')?.valor

for (const column of requiredColumns) {
  if (!csv156.header.includes(column)) {
    failures.push(`CSV Sprint 156 sem coluna obrigatoria: ${column}`)
  }
}

for (const front of requiredFronts) {
  if (!csv156.rows.some((row) => row.frente === front)) {
    failures.push(`CSV Sprint 156 sem frente obrigatoria: ${front}`)
  }
}

for (const item of ['SEO-NAP-001', 'SEO-GBP-001', 'SEO-GBP-002', 'SEO-LINK-002']) {
  const row = responsesByItem.get(item)
  if (row?.status_resposta !== 'validado' || row?.go_autorizado !== 'sim') {
    failures.push(`Resposta externa deveria estar validada com GO para ${item}.`)
  }
}

for (const item of ['SEO-MEAS-001', 'SEO-IMG-009', 'SEO-REG-003']) {
  const row = responsesByItem.get(item)
  if (row?.status_resposta !== 'recebido_insuficiente') {
    failures.push(`Resposta externa deveria seguir insuficiente para ${item}.`)
  }
}

if (buildDecision === 'PENDENTE') {
  warnings.push('Decisao de build segue PENDENTE; paineis devem manter build bloqueado.')
} else if (buildDecision === 'GO_BUILD_ONDA_1_NAP') {
  warnings.push('GO_BUILD_ONDA_1_NAP registrado; paineis devem separar build autorizado de deploy bloqueado.')
} else if (buildDecision === 'NO_GO_BUILD') {
  warnings.push('NO_GO_BUILD registrado; paineis devem manter build e deploy bloqueados.')
} else {
  failures.push(`Decisao de build invalida; atual=${buildDecision ?? 'missing'}`)
}

for (const [label, source] of [
  ['Painel GO/NO-GO', blockersPanel],
  ['Matriz mestra', masterMatrix],
  ['Plano de fechamento', exitPlan],
]) {
  for (const stalePhrase of [
    'e-mail e endereco oficiais ainda nao confirmados',
    'Falta resposta oficial completa antes de patch',
    'Patch definitivo de NAP.',
    'Com resposta NAP oficial, o proximo sprint passa a ser `Patch NAP local`',
  ]) {
    if (source.includes(stalePhrase)) {
      failures.push(`${label} manteve frase desatualizada: ${stalePhrase}`)
    }
  }
}

for (const expected of [
  'NAP oficial validado localmente',
  'seo:audit:nap:strict',
  'GO_BUILD_ONDA_1_NAP',
  'NO_GO_BUILD',
]) {
  assertIncludes(blockersPanel, expected, 'PAINEL_BLOQUEIOS_GO_NO_GO_TURNAROUND_BB.md')
}

for (const expected of [
  'NAP local validado',
  'GO_BUILD_ONDA_1_NAP',
  'NO_GO_BUILD',
  'sem deploy automatico',
]) {
  assertIncludes(masterMatrix, expected, 'MATRIZ_MESTRA_SPRINTS_RESTANTES_TURNAROUND_BB.md')
}

for (const expected of [
  'NAP oficial ja esta validado localmente',
  'NAP externo continua separado',
]) {
  assertIncludes(exitPlan, expected, 'PLANO_FECHAMENTO_ITENS_ABERTOS_TURNAROUND_BB.md')
}

for (const expected of ['rows=7', 'local_checks=123', 'sem build', 'sem deploy']) {
  assertIncludes(report156, expected, 'RELATORIO_EXECUCAO_SPRINT_156_HARMONIZACAO_PAINEIS_POS_NAP_BUILD_PENDENTE_2026-06-15.md')
}

for (const expected of ['NAP oficial ja validado localmente', 'decisao_build=PENDENTE', 'sem producao']) {
  assertIncludes(sprint156, expected, 'SPRINT_156_HARMONIZACAO_PAINEIS_POS_NAP_BUILD_PENDENTE.md')
}

const unsafeText = `${sprint156}\n${report156}\n${csv156Source}`
if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|senha|token/i.test(unsafeText)) {
  failures.push('Sprint 156 nao pode conter segredo ou pedir segredo.')
}

if (packageJson.scripts?.['seo:audit:panel-state-harmonization'] !== 'node scripts/audit-panel-state-harmonization.mjs') {
  failures.push('package.json sem script seo:audit:panel-state-harmonization.')
}

if (!csv156.rows.some((row) => row.acao_bloqueada.includes('build'))) {
  warnings.push('CSV Sprint 156 deveria bloquear build explicitamente.')
}

console.log('Panel state harmonization audit summary')
console.log(`responses_rows=${responses.length}`)
console.log(`build_decision=${buildDecision ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPanel state harmonization warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPanel state harmonization audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPanel state harmonization audit completed.')
