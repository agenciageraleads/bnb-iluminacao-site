import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_134_DRY_RUN_PROMOCAO_RESPOSTAS_EXTERNAS.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_134_DRY_RUN_PROMOCAO_RESPOSTAS_EXTERNAS_2026-06-15.md`,
  dryRunCsv: `${seoPackage}/artifacts/seo-ops-045-dry-run-promocao-respostas-externas-2026-06-15.csv`,
  stagingCsv: `${seoPackage}/artifacts/seo-ops-042-staging-respostas-externas-2026-06-15.csv`,
  planCsv: `${seoPackage}/artifacts/seo-ops-043-plano-promocao-respostas-externas-2026-06-15.csv`,
  snapshotCsv: `${seoPackage}/artifacts/seo-ops-044-snapshot-rollback-respostas-externas-2026-06-15.csv`,
  officialCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredItems = [
  'SEO-NAP-001',
  'SEO-MEAS-001',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'SEO-IMG-009',
  'SEO-LINK-002',
  'SEO-REG-003',
]

const requiredDryRunColumns = [
  'frente',
  'item_backlog',
  'status_rascunho_esperado',
  'acao_dry_run',
  'campos_simulados',
  'snapshot_rollback_disponivel',
  'escreve_registro_oficial',
  'comandos_validacao',
  'status',
]

const requiredPlanFields = [
  'status_rascunho',
  'evidencia_ref_rascunho',
  'data_rascunho',
  'responsavel_rascunho',
  'go_sugerido',
  'acao_recomendada',
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

function splitCommands(value) {
  return value
    .split(';')
    .map((command) => command.trim())
    .filter(Boolean)
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
const dryRunSource = await readExpectedFile(files.dryRunCsv)
const stagingSource = await readExpectedFile(files.stagingCsv)
const planSource = await readExpectedFile(files.planCsv)
const snapshotSource = await readExpectedFile(files.snapshotCsv)
const officialSource = await readExpectedFile(files.officialCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const dryRun = dryRunSource ? parseCsv(dryRunSource) : { header: [], rows: [] }
const staging = stagingSource ? parseCsv(stagingSource).rows : []
const plan = planSource ? parseCsv(planSource).rows : []
const snapshot = snapshotSource ? parseCsv(snapshotSource).rows : []
const official = officialSource ? parseCsv(officialSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const readinessChecks = countReadinessChecks(readiness)

for (const column of requiredDryRunColumns) {
  if (!dryRun.header.includes(column)) {
    failures.push(`Dry-run sem coluna obrigatoria: ${column}`)
  }
}

if (dryRun.rows.length !== requiredItems.length) {
  failures.push(`Dry-run deve ter ${requiredItems.length} linhas; encontrado ${dryRun.rows.length}.`)
}

const stagingByItem = new Map(staging.map((row) => [row.item_backlog, row]))
const snapshotByItem = new Map(snapshot.map((row) => [row.item_backlog, row]))
const officialByItem = new Map(official.map((row) => [row.item_backlog, row]))
const dryRunByItem = new Map(dryRun.rows.map((row) => [row.item_backlog, row]))

let promotionReady = 0

for (const item of requiredItems) {
  const dryRunRow = dryRunByItem.get(item)
  const stagingRow = stagingByItem.get(item)
  const snapshotRow = snapshotByItem.get(item)
  const officialRow = officialByItem.get(item)

  if (!dryRunRow) {
    failures.push(`Dry-run sem item: ${item}`)
    continue
  }

  if (!stagingRow) {
    failures.push(`Staging sem item: ${item}`)
  }

  if (!snapshotRow) {
    failures.push(`Snapshot sem item: ${item}`)
  }

  if (!officialRow) {
    failures.push(`Registro oficial sem item: ${item}`)
  }

  const planRows = plan.filter((row) => row.item_backlog === item)
  for (const field of requiredPlanFields) {
    if (!planRows.some((row) => row.campo_staging === field)) {
      failures.push(`Plano sem campo simulado em ${item}: ${field}`)
    }
  }

  const isPromotionReady =
    stagingRow?.status_rascunho === 'pronto_para_promocao' &&
    stagingRow?.promover_para_registro_oficial === 'sim'

  if (isPromotionReady) {
    promotionReady += 1
  }

  const expectedAction = isPromotionReady ? 'simular_promocao' : 'nenhuma_promocao_pendente'

  if (dryRunRow.acao_dry_run !== expectedAction) {
    failures.push(`Acao dry-run divergente em ${item}: esperado ${expectedAction}, encontrado ${dryRunRow.acao_dry_run}.`)
  }

  if (dryRunRow.snapshot_rollback_disponivel !== 'sim') {
    failures.push(`Dry-run sem snapshot de rollback disponivel em ${item}.`)
  }

  if (dryRunRow.escreve_registro_oficial !== 'nao') {
    failures.push(`Dry-run nao pode escrever registro oficial em ${item}.`)
  }

  if (dryRunRow.status !== 'pronto_para_uso') {
    failures.push(`Status do dry-run deve ser pronto_para_uso em ${item}.`)
  }

  for (const command of splitCommands(dryRunRow.comandos_validacao)) {
    const scriptMatch = command.match(/^npm run ([^ ]+)$/)
    if (!scriptMatch) {
      failures.push(`Comando invalido em ${item}: ${command}`)
      continue
    }

    if (!packageJson.scripts?.[scriptMatch[1]]) {
      failures.push(`package.json sem script usado no dry-run: ${scriptMatch[1]}`)
    }
  }

  const searchableText = Object.values(dryRunRow).join(' ')
  if (unsafePattern.test(searchableText)) {
    failures.push(`Dry-run nao deve conter segredo ou referencia a segredo em ${item}.`)
  }
}

if (promotionReady === 0) {
  warnings.push('Nenhuma linha do staging esta pronta para promocao; dry-run atual e no-op.')
}

if (!backlog.includes('SEO-OPS-045') || !backlog.includes('dry-run promocao respostas externas')) {
  failures.push('Backlog nao registra SEO-OPS-045.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:external-response-promotion-dry-run']) {
  failures.push('package.json sem script seo:audit:external-response-promotion-dry-run.')
}

if (!readiness.includes("['seo:audit:external-response-promotion-dry-run', 'External response promotion dry-run']")) {
  failures.push('Readiness geral nao inclui External response promotion dry-run.')
}

for (const term of [
  'sem deploy',
  'sem producao',
  'sem segredo',
  'nao escreve registro oficial',
  'seo:audit:external-response-promotion-dry-run',
]) {
  if (!doc.includes(term) || !report.includes(term)) {
    failures.push(`Documentacao do dry-run nao menciona: ${term}`)
  }
}

console.log('External response promotion dry-run audit summary')
console.log(`dry_run_rows=${dryRun.rows.length}`)
console.log(`promotion_ready=${promotionReady}`)
console.log(`official_writes=0`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExternal response promotion dry-run warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal response promotion dry-run audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal response promotion dry-run audit completed.')
