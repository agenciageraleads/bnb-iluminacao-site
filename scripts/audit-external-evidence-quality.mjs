import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_130_QUALIDADE_EVIDENCIAS_EXTERNAS.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_130_QUALIDADE_EVIDENCIAS_EXTERNAS_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-041-qualidade-evidencias-externas-2026-06-15.csv`,
  externalResponses: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const expectedItems = [
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
  'status_para_validar',
  'evidencia_aceita',
  'evidencia_rejeitada',
  'campos_obrigatorios',
  'politica_segredo',
  'comando_pos_validacao',
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
const csvSource = await readExpectedFile(files.csv)
const externalResponsesSource = await readExpectedFile(files.externalResponses)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const criteria = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const externalResponses = externalResponsesSource ? parseCsv(externalResponsesSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const readinessChecks = countReadinessChecks(readiness)

for (const column of requiredColumns) {
  if (!criteria.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (criteria.rows.length !== expectedItems.length) {
  failures.push(`CSV deve cobrir ${expectedItems.length} bloqueios externos; encontrado ${criteria.rows.length}.`)
}

const criteriaByItem = new Map(criteria.rows.map((row) => [row.item_backlog, row]))
const responsesByItem = new Map(externalResponses.map((row) => [row.item_backlog, row]))

for (const item of expectedItems) {
  const row = criteriaByItem.get(item)
  const response = responsesByItem.get(item)

  if (!row) {
    failures.push(`Criterios sem item obrigatorio: ${item}`)
    continue
  }

  if (!response) {
    failures.push(`Registro de respostas sem item obrigatorio: ${item}`)
  }

  if (row.status !== 'pronto_para_uso') {
    failures.push(`Criterio deve ficar pronto_para_uso: ${item}`)
  }

  if (row.status_para_validar !== 'validado') {
    failures.push(`Status alvo deve ser validado: ${item}`)
  }

  if (!row.evidencia_aceita || !row.evidencia_rejeitada || !row.campos_obrigatorios) {
    failures.push(`Linha com evidencia/campos incompletos: ${item}`)
  }

  for (const term of ['senha', 'token', 'chave', 'codigo']) {
    if (!row.politica_segredo.includes(term)) {
      failures.push(`Politica de segredo incompleta em ${item}: falta ${term}`)
    }
  }

  if (!row.evidencia_rejeitada.includes('senha') || !row.evidencia_rejeitada.includes('token')) {
    failures.push(`Evidencia rejeitada precisa bloquear senha/token em ${item}.`)
  }

  for (const command of row.comando_pos_validacao.split(';').map((value) => value.trim()).filter(Boolean)) {
    const scriptMatch = command.match(/^npm run ([^ ]+)$/)
    if (!scriptMatch) {
      failures.push(`Comando invalido em ${item}: ${command}`)
      continue
    }

    if (!packageJson.scripts?.[scriptMatch[1]]) {
      failures.push(`package.json sem script usado nos criterios: ${scriptMatch[1]}`)
    }
  }
}

const validatedResponses = externalResponses.filter((row) => row.status_resposta === 'validado' && row.go_autorizado === 'sim')

if (validatedResponses.length === 0) {
  warnings.push('Nenhum GO externo validado; criterios ficam prontos para intake futuro.')
}

if (!backlog.includes('SEO-OPS-041') || !backlog.includes('qualidade evidencias externas')) {
  failures.push('Backlog nao registra SEO-OPS-041.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:external-evidence-quality']) {
  failures.push('package.json sem script seo:audit:external-evidence-quality.')
}

if (!readiness.includes("['seo:audit:external-evidence-quality', 'External evidence quality']")) {
  failures.push('Readiness geral nao inclui External evidence quality.')
}

for (const term of [
  'sem deploy',
  'sem producao',
  'sem segredo',
  'nao altera respostas externas',
  'seo:audit:external-evidence-quality',
]) {
  if (!doc.includes(term) || !report.includes(term)) {
    failures.push(`Documentacao de qualidade de evidencias nao menciona: ${term}`)
  }
}

console.log('External evidence quality audit summary')
console.log(`criteria_rows=${criteria.rows.length}`)
console.log(`response_rows=${externalResponses.length}`)
console.log(`validated_go=${validatedResponses.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExternal evidence quality warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal evidence quality audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal evidence quality audit completed.')
