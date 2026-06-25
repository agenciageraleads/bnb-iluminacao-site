import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_131_STAGING_RESPOSTAS_EXTERNAS.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_131_STAGING_RESPOSTAS_EXTERNAS_2026-06-15.md`,
  stagingCsv: `${seoPackage}/artifacts/seo-ops-042-staging-respostas-externas-2026-06-15.csv`,
  officialCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  criteriaCsv: `${seoPackage}/artifacts/seo-ops-041-qualidade-evidencias-externas-2026-06-15.csv`,
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
  'status_rascunho',
  'evidencia_ref_rascunho',
  'data_rascunho',
  'responsavel_rascunho',
  'go_sugerido',
  'campos_preenchidos',
  'lacunas_detectadas',
  'acao_recomendada',
  'promover_para_registro_oficial',
]

const allowedDraftStatuses = new Set(['pendente', 'rascunho_recebido', 'rascunho_insuficiente', 'pronto_para_promocao', 'descartado'])
const allowedPromotionValues = new Set(['sim', 'nao'])
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
const stagingSource = await readExpectedFile(files.stagingCsv)
const officialSource = await readExpectedFile(files.officialCsv)
const criteriaSource = await readExpectedFile(files.criteriaCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const staging = stagingSource ? parseCsv(stagingSource) : { header: [], rows: [] }
const official = officialSource ? parseCsv(officialSource).rows : []
const criteria = criteriaSource ? parseCsv(criteriaSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const readinessChecks = countReadinessChecks(readiness)

for (const column of requiredColumns) {
  if (!staging.header.includes(column)) {
    failures.push(`Staging sem coluna obrigatoria: ${column}`)
  }
}

if (staging.rows.length !== requiredItems.length) {
  failures.push(`Staging deve ter ${requiredItems.length} linhas; encontrado ${staging.rows.length}.`)
}

const stagingByItem = new Map(staging.rows.map((row) => [row.item_backlog, row]))
const officialByItem = new Map(official.map((row) => [row.item_backlog, row]))
const criteriaByItem = new Map(criteria.map((row) => [row.item_backlog, row]))

for (const item of requiredItems) {
  const row = stagingByItem.get(item)
  const officialRow = officialByItem.get(item)
  const criteriaRow = criteriaByItem.get(item)

  if (!row) {
    failures.push(`Staging sem item obrigatorio: ${item}`)
    continue
  }

  if (!officialRow) {
    failures.push(`Registro oficial sem item correspondente: ${item}`)
  }

  if (!criteriaRow) {
    failures.push(`Criterios de evidencia sem item correspondente: ${item}`)
  }

  if (!allowedDraftStatuses.has(row.status_rascunho)) {
    failures.push(`Status de rascunho invalido em ${item}: ${row.status_rascunho}`)
  }

  if (!allowedPromotionValues.has(row.promover_para_registro_oficial)) {
    failures.push(`Promocao invalida em ${item}: ${row.promover_para_registro_oficial}`)
  }

  const searchableText = [
    row.evidencia_ref_rascunho,
    row.campos_preenchidos,
    row.lacunas_detectadas,
    row.acao_recomendada,
  ].join(' ')

  if (unsafePattern.test(searchableText)) {
    failures.push(`Staging nao deve conter segredo ou referencia a segredo em ${item}.`)
  }

  if (row.promover_para_registro_oficial === 'sim') {
    if (row.status_rascunho !== 'pronto_para_promocao') {
      failures.push(`Promocao exige status pronto_para_promocao em ${item}.`)
    }

    if (!row.evidencia_ref_rascunho || !row.data_rascunho || !row.responsavel_rascunho) {
      failures.push(`Promocao exige evidencia, data e responsavel em ${item}.`)
    }

    const requiredFields = criteriaRow?.campos_obrigatorios?.split(';').map((value) => value.trim()).filter(Boolean) ?? []
    for (const field of requiredFields) {
      if (!row.campos_preenchidos.includes(field)) {
        failures.push(`Promocao de ${item} sem campo obrigatorio preenchido: ${field}`)
      }
    }
  }

  if (row.status_rascunho === 'rascunho_insuficiente' && !row.lacunas_detectadas) {
    failures.push(`Rascunho insuficiente precisa listar lacunas em ${item}.`)
  }
}

const promotionRows = staging.rows.filter((row) => row.promover_para_registro_oficial === 'sim')
const pendingRows = staging.rows.filter((row) => row.status_rascunho === 'pendente')

if (promotionRows.length === 0) {
  warnings.push('Nenhum rascunho pronto para promocao ao registro oficial.')
}

if (!backlog.includes('SEO-OPS-042') || !backlog.includes('staging respostas externas')) {
  failures.push('Backlog nao registra SEO-OPS-042.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:external-response-staging']) {
  failures.push('package.json sem script seo:audit:external-response-staging.')
}

if (!readiness.includes("['seo:audit:external-response-staging', 'External response staging']")) {
  failures.push('Readiness geral nao inclui External response staging.')
}

for (const term of [
  'sem deploy',
  'sem producao',
  'sem segredo',
  'nao altera registro oficial',
  'seo:audit:external-response-staging',
]) {
  if (!doc.includes(term) || !report.includes(term)) {
    failures.push(`Documentacao de staging nao menciona: ${term}`)
  }
}

console.log('External response staging audit summary')
console.log(`staging_rows=${staging.rows.length}`)
console.log(`official_rows=${official.length}`)
console.log(`criteria_rows=${criteria.length}`)
console.log(`promotion_ready=${promotionRows.length}`)
console.log(`pending=${pendingRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExternal response staging warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal response staging audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal response staging audit completed.')
