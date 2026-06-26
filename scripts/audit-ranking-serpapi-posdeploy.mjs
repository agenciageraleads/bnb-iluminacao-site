import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  statusCsv: `${seoPackage}/artifacts/seo-meas-007-ranking-serpapi-posdeploy-d0-2026-06-15.csv`,
  macro: `${seoPackage}/MACROBLOCO_RANKING_SERPAPI_POS_DEPLOY.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_MACROBLOCO_RANKING_SERPAPI_POS_DEPLOY_2026-06-15.md`,
  routine: `${seoPackage}/ROTINA_MENSAL_RANKING_SEO_BB.md`,
  postDeployPackage: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'data',
  'frente',
  'status',
  'planned_searches',
  'executed_searches',
  'result_artifact',
  'blocker',
  'safe_next_action',
  'auditor',
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

const statusCsvSource = await readExpectedFile(files.statusCsv)
const macro = await readExpectedFile(files.macro)
const report = await readExpectedFile(files.report)
const routine = await readExpectedFile(files.routine)
const postDeployPackage = await readExpectedFile(files.postDeployPackage)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)

const statusCsv = statusCsvSource ? parseCsv(statusCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!statusCsv.header.includes(column)) {
    failures.push(`Status SerpApi pos-deploy sem coluna obrigatoria: ${column}`)
  }
}

if (statusCsv.rows.length !== 1) {
  failures.push(`Status SerpApi pos-deploy deveria ter 1 linha; encontrado ${statusCsv.rows.length}.`)
}

const statusRow = statusCsv.rows[0] ?? {}

if (statusRow.status !== 'bloqueado_quota_serpapi_429') {
  failures.push(`Status SerpApi pos-deploy deveria ser bloqueado_quota_serpapi_429; encontrado ${statusRow.status || 'vazio'}.`)
}

if (statusRow.planned_searches !== '28' || statusRow.executed_searches !== '0') {
  failures.push('Status SerpApi pos-deploy deve registrar 28 buscas planejadas e 0 buscas executadas.')
}

if (statusRow.result_artifact !== 'nao_gerado') {
  failures.push('Status SerpApi pos-deploy nao pode apontar artefato de resultado quando a coleta falhou antes de gerar CSV.')
}

for (const expected of [
  'bloqueado_quota_serpapi_429',
  'planned_searches=28',
  'executed_searches=0',
  'nao houve baseline pos-deploy',
  'nao imprimir segredo',
]) {
  assertIncludes(`${macro}\n${report}\n${routine}\n${postDeployPackage}`, expected, 'Docs ranking SerpApi pos-deploy')
}

for (const expected of ['SerpApi D0 bloqueado por quota', 'ranking-serpapi-posdeploy']) {
  assertIncludes(scorecard, expected, 'SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md')
}

const unsafeText = `${statusCsvSource}\n${macro}\n${report}\n${routine}\n${postDeployPackage}`
for (const pattern of [
  /ranking pos-deploy coletado:\s*sim/i,
  /bb_top20=\d+/i,
  /csv=.+serpapi-ranking-posdeploy/i,
  /AIza[0-9A-Za-z_-]{20,}/,
  /serpapi[_-]?key\s*[:=]\s*["']?[A-Za-z0-9_-]{20,}/i,
  /PRIVATE KEY|BEGIN OPENSSH|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Ranking SerpApi pos-deploy sugere conclusao indevida ou segredo: ${pattern}`)
  }
}

if (packageJson.scripts?.['seo:audit:ranking-serpapi-posdeploy'] !== 'node scripts/audit-ranking-serpapi-posdeploy.mjs') {
  failures.push('package.json sem script seo:audit:ranking-serpapi-posdeploy.')
}

console.log('Ranking SerpApi post-deploy audit summary')
console.log(`status_rows=${statusCsv.rows.length}`)
console.log(`status=${statusRow.status || ''}`)
console.log(`planned_searches=${statusRow.planned_searches || ''}`)
console.log(`executed_searches=${statusRow.executed_searches || ''}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nRanking SerpApi post-deploy warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nRanking SerpApi post-deploy audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nRanking SerpApi post-deploy audit completed.')
