import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_135_VALIDACAO_POS_PROMOCAO_RESPOSTAS_EXTERNAS.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_135_VALIDACAO_POS_PROMOCAO_RESPOSTAS_EXTERNAS_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-046-validacao-pos-promocao-respostas-externas-2026-06-15.csv`,
  officialCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  stagingCsv: `${seoPackage}/artifacts/seo-ops-042-staging-respostas-externas-2026-06-15.csv`,
  dryRunCsv: `${seoPackage}/artifacts/seo-ops-045-dry-run-promocao-respostas-externas-2026-06-15.csv`,
  snapshotCsv: `${seoPackage}/artifacts/seo-ops-044-snapshot-rollback-respostas-externas-2026-06-15.csv`,
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

const requiredColumns = [
  'frente',
  'item_backlog',
  'registro_status_atual',
  'acao_pos_promocao',
  'validacoes_obrigatorias',
  'criterio_sucesso',
  'acao_se_falhar',
  'executa_agora',
  'status',
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

function expectedActionFor(row) {
  if (row.status_resposta === 'validado' && row.go_autorizado === 'sim') {
    return 'validar_go_promovido'
  }

  if (row.status_resposta === 'descartado') {
    return 'validar_descartado'
  }

  if (row.status_resposta === 'recebido_insuficiente') {
    return 'devolver_para_staging'
  }

  return 'aguardar_promocao'
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
const csvSource = await readExpectedFile(files.csv)
const officialSource = await readExpectedFile(files.officialCsv)
const stagingSource = await readExpectedFile(files.stagingCsv)
const dryRunSource = await readExpectedFile(files.dryRunCsv)
const snapshotSource = await readExpectedFile(files.snapshotCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const postPromotion = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const official = officialSource ? parseCsv(officialSource).rows : []
const staging = stagingSource ? parseCsv(stagingSource).rows : []
const dryRun = dryRunSource ? parseCsv(dryRunSource).rows : []
const snapshot = snapshotSource ? parseCsv(snapshotSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const readinessChecks = countReadinessChecks(readiness)

for (const column of requiredColumns) {
  if (!postPromotion.header.includes(column)) {
    failures.push(`CSV pos-promocao sem coluna obrigatoria: ${column}`)
  }
}

if (postPromotion.rows.length !== requiredItems.length) {
  failures.push(`CSV pos-promocao deve ter ${requiredItems.length} linhas; encontrado ${postPromotion.rows.length}.`)
}

const postPromotionByItem = new Map(postPromotion.rows.map((row) => [row.item_backlog, row]))
const officialByItem = new Map(official.map((row) => [row.item_backlog, row]))
const stagingByItem = new Map(staging.map((row) => [row.item_backlog, row]))
const dryRunByItem = new Map(dryRun.map((row) => [row.item_backlog, row]))
const snapshotByItem = new Map(snapshot.map((row) => [row.item_backlog, row]))

let promotedRows = 0

for (const item of requiredItems) {
  const row = postPromotionByItem.get(item)
  const officialRow = officialByItem.get(item)

  if (!row) {
    failures.push(`CSV pos-promocao sem item: ${item}`)
    continue
  }

  if (!officialRow) {
    failures.push(`Registro oficial sem item: ${item}`)
    continue
  }

  if (!stagingByItem.has(item)) {
    failures.push(`Staging sem item correspondente: ${item}`)
  }

  if (!dryRunByItem.has(item)) {
    failures.push(`Dry-run sem item correspondente: ${item}`)
  }

  if (!snapshotByItem.has(item)) {
    failures.push(`Snapshot sem item correspondente: ${item}`)
  }

  const expectedAction = expectedActionFor(officialRow)
  if (row.acao_pos_promocao !== expectedAction) {
    failures.push(`Acao pos-promocao divergente em ${item}: esperado ${expectedAction}, encontrado ${row.acao_pos_promocao}.`)
  }

  if (row.registro_status_atual !== officialRow.status_resposta) {
    failures.push(`Status atual diverge do registro oficial em ${item}.`)
  }

  if (row.executa_agora !== 'nao') {
    failures.push(`Validacao pos-promocao nao pode executar agora em ${item}.`)
  }

  if (row.status !== 'pronto_para_uso') {
    failures.push(`Status do CSV pos-promocao deve ser pronto_para_uso em ${item}.`)
  }

  if (!row.criterio_sucesso || !row.acao_se_falhar) {
    failures.push(`Linha pos-promocao incompleta em ${item}.`)
  }

  for (const command of splitCommands(row.validacoes_obrigatorias)) {
    const scriptMatch = command.match(/^npm run ([^ ]+)$/)
    if (!scriptMatch) {
      failures.push(`Comando invalido em ${item}: ${command}`)
      continue
    }

    if (!packageJson.scripts?.[scriptMatch[1]]) {
      failures.push(`package.json sem script usado no pos-promocao: ${scriptMatch[1]}`)
    }
  }

  if (expectedAction === 'validar_go_promovido') {
    promotedRows += 1
  }
}

if (promotedRows === 0) {
  warnings.push('Nenhuma resposta externa promovida; validacao pos-promocao fica em aguardando promocao.')
}

if (!backlog.includes('SEO-OPS-046') || !backlog.includes('validacao pos-promocao respostas externas')) {
  failures.push('Backlog nao registra SEO-OPS-046.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:external-response-post-promotion']) {
  failures.push('package.json sem script seo:audit:external-response-post-promotion.')
}

if (!readiness.includes("['seo:audit:external-response-post-promotion', 'External response post-promotion']")) {
  failures.push('Readiness geral nao inclui External response post-promotion.')
}

for (const term of [
  'sem deploy',
  'sem producao',
  'sem segredo',
  'nao escreve registro oficial',
  'seo:audit:external-response-post-promotion',
]) {
  if (!doc.includes(term) || !report.includes(term)) {
    failures.push(`Documentacao pos-promocao nao menciona: ${term}`)
  }
}

console.log('External response post-promotion audit summary')
console.log(`post_promotion_rows=${postPromotion.rows.length}`)
console.log(`promoted_rows=${promotedRows}`)
console.log(`official_writes=0`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExternal response post-promotion warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal response post-promotion audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal response post-promotion audit completed.')
