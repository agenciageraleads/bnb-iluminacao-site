import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_133_SNAPSHOT_ROLLBACK_RESPOSTAS_EXTERNAS.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_133_SNAPSHOT_ROLLBACK_RESPOSTAS_EXTERNAS_2026-06-15.md`,
  snapshotCsv: `${seoPackage}/artifacts/seo-ops-044-snapshot-rollback-respostas-externas-2026-06-15.csv`,
  officialCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const officialFields = [
  'frente',
  'item_backlog',
  'status_resposta',
  'evidencia_ref',
  'data_resposta',
  'responsavel',
  'go_autorizado',
  'proximo_sprint',
  'observacao',
]

const requiredSnapshotColumns = [
  'frente',
  'item_backlog',
  'status_resposta_snapshot',
  'evidencia_ref_snapshot',
  'data_resposta_snapshot',
  'responsavel_snapshot',
  'go_autorizado_snapshot',
  'proximo_sprint_snapshot',
  'observacao_snapshot',
  'snapshot_tipo',
  'rollback_acao',
  'status',
]

const requiredItems = [
  'SEO-NAP-001',
  'SEO-MEAS-001',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'SEO-IMG-009',
  'SEO-LINK-002',
  'SEO-REG-003',
]

const unsafePattern = /\b(senha|token|chave|secret|password|codigo de acesso|c[oó]digo de acesso)\b/i

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

function countReadinessChecks(source) {
  const requiredFilesMatch = source.match(/const requiredFiles = \[([\s\S]*?)\]\n\nconst localAuditScripts/)
  const localScriptsMatch = source.match(/const localAuditScripts = \[([\s\S]*?)\]\n\nfunction runNpmScript/)

  const requiredFiles = requiredFilesMatch?.[1]?.match(/'[^']+'/g)?.length ?? 0
  const localScripts =
    localScriptsMatch?.[1]?.split('\n').filter((line) => line.trim().startsWith("['seo:audit:")).length ?? 0

  return requiredFiles + localScripts
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

const doc = await readExpectedFile(files.doc)
const report = await readExpectedFile(files.report)
const snapshotSource = await readExpectedFile(files.snapshotCsv)
const officialSource = await readExpectedFile(files.officialCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const snapshot = snapshotSource ? parseCsv(snapshotSource) : { header: [], rows: [] }
const official = officialSource ? parseCsv(officialSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const readinessChecks = countReadinessChecks(readiness)

for (const column of requiredSnapshotColumns) {
  if (!snapshot.header.includes(column)) {
    failures.push(`Snapshot sem coluna obrigatoria: ${column}`)
  }
}

for (const column of officialFields) {
  if (!official.header.includes(column)) {
    failures.push(`Registro oficial sem coluna obrigatoria: ${column}`)
  }
}

if (snapshot.rows.length !== requiredItems.length) {
  failures.push(`Snapshot deve ter ${requiredItems.length} linhas; encontrado ${snapshot.rows.length}.`)
}

const officialByItem = new Map(official.rows.map((row) => [row.item_backlog, row]))
const snapshotByItem = new Map(snapshot.rows.map((row) => [row.item_backlog, row]))
const officialStillPending = official.rows.every((row) => row.status_resposta === 'pendente' && row.go_autorizado === 'nao')

for (const item of requiredItems) {
  const officialRow = officialByItem.get(item)
  const snapshotRow = snapshotByItem.get(item)

  if (!officialRow) {
    failures.push(`Registro oficial sem item: ${item}`)
    continue
  }

  if (!snapshotRow) {
    failures.push(`Snapshot sem item: ${item}`)
    continue
  }

  if (snapshotRow.snapshot_tipo !== 'baseline_pre_promocao') {
    failures.push(`snapshot_tipo invalido em ${item}: ${snapshotRow.snapshot_tipo}`)
  }

  if (snapshotRow.status !== 'pronto_para_uso') {
    failures.push(`Status do snapshot deve ser pronto_para_uso em ${item}.`)
  }

  if (!snapshotRow.rollback_acao.includes('restaurar registro oficial')) {
    failures.push(`rollback_acao deve orientar restaurar registro oficial em ${item}.`)
  }

  const searchableText = Object.values(snapshotRow).join(' ')
  if (unsafePattern.test(searchableText)) {
    failures.push(`Snapshot nao deve conter segredo ou referencia a segredo em ${item}.`)
  }

  if (officialStillPending) {
    const fieldPairs = [
      ['frente', 'frente'],
      ['status_resposta', 'status_resposta_snapshot'],
      ['evidencia_ref', 'evidencia_ref_snapshot'],
      ['data_resposta', 'data_resposta_snapshot'],
      ['responsavel', 'responsavel_snapshot'],
      ['go_autorizado', 'go_autorizado_snapshot'],
      ['proximo_sprint', 'proximo_sprint_snapshot'],
      ['observacao', 'observacao_snapshot'],
    ]

    for (const [officialField, snapshotField] of fieldPairs) {
      if ((officialRow[officialField] ?? '') !== (snapshotRow[snapshotField] ?? '')) {
        failures.push(`Snapshot diverge do registro oficial em ${item}/${officialField}.`)
      }
    }
  }
}

if (!officialStillPending) {
  warnings.push('Registro oficial ja mudou; snapshot continua como baseline de rollback pre-promocao.')
}

if (!backlog.includes('SEO-OPS-044') || !backlog.includes('snapshot rollback respostas externas')) {
  failures.push('Backlog nao registra SEO-OPS-044.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:external-response-rollback-snapshot']) {
  failures.push('package.json sem script seo:audit:external-response-rollback-snapshot.')
}

if (!readiness.includes("['seo:audit:external-response-rollback-snapshot', 'External response rollback snapshot']")) {
  failures.push('Readiness geral nao inclui External response rollback snapshot.')
}

for (const term of [
  'sem deploy',
  'sem producao',
  'sem segredo',
  'nao altera registro oficial',
  'seo:audit:external-response-rollback-snapshot',
]) {
  if (!doc.includes(term) || !report.includes(term)) {
    failures.push(`Documentacao do snapshot nao menciona: ${term}`)
  }
}

console.log('External response rollback snapshot audit summary')
console.log(`snapshot_rows=${snapshot.rows.length}`)
console.log(`official_rows=${official.rows.length}`)
console.log(`official_still_pending=${officialStillPending ? 'sim' : 'nao'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExternal response rollback snapshot warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal response rollback snapshot audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal response rollback snapshot audit completed.')
