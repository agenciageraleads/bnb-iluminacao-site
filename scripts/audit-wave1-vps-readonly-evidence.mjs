import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint140: `${seoPackage}/SPRINT_140_EVIDENCIA_VPS_READONLY_ONDA_1_NAP.md`,
  report140: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_140_EVIDENCIA_VPS_READONLY_ONDA_1_NAP_2026-06-15.md`,
  csv140: `${seoPackage}/artifacts/seo-pub-016-evidencia-vps-readonly-onda1-nap-2026-06-15.csv`,
  preprodCsv: `${seoPackage}/artifacts/seo-pub-015-validacao-operacional-pre-producao-onda1-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

const requiredColumns = ['item', 'status', 'evidencia', 'acao_permitida', 'acao_proibida']
const requiredItems = [
  'ssh_gate',
  'imagem_viva',
  'servico',
  'backup_spec',
  'cms_publico',
  'logs_recentes',
  'disco_vps',
  'rollback',
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

const sprint140 = await readExpectedFile(files.sprint140)
const report140 = await readExpectedFile(files.report140)
const csv140Source = await readExpectedFile(files.csv140)
const preprodCsvSource = await readExpectedFile(files.preprodCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv140 = csv140Source ? parseCsv(csv140Source) : { header: [], rows: [] }
const preprodRows = preprodCsvSource ? parseCsv(preprodCsvSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv140.header.includes(column)) {
    failures.push(`CSV VPS read-only sem coluna obrigatoria: ${column}`)
  }
}

for (const item of requiredItems) {
  if (!csv140.rows.some((row) => row.item === item)) {
    failures.push(`CSV VPS read-only sem item: ${item}`)
  }
}

for (const expected of [
  'bnb-site:9fab426',
  'site-bb_app',
  '1/1',
  '3901b319481862b2da4d62082811848e6de8e4be05e3c4ea57a626dd589b72c0',
  '92%',
  'sem deploy',
]) {
  assertIncludes(sprint140, expected, 'SPRINT_140_EVIDENCIA_VPS_READONLY_ONDA_1_NAP.md')
  assertIncludes(report140, expected, 'RELATORIO_EXECUCAO_SPRINT_140_EVIDENCIA_VPS_READONLY_ONDA_1_NAP_2026-06-15.md')
}

for (const expected of ['validado_vps_readonly', 'validado_vps_backup', 'preparado_sem_execucao', 'atencao_operacional']) {
  if (!preprodRows.some((row) => row.status === expected)) {
    failures.push(`Preprod CSV nao contem status esperado apos VPS read-only: ${expected}`)
  }
}

const rollbackRow = csv140.rows.find((row) => row.item === 'rollback')
if (rollbackRow && !rollbackRow.evidencia.includes('bnb-site:9fab426')) {
  failures.push('Rollback precisa apontar para a imagem viva bnb-site:9fab426.')
}

const unsafeText = `${sprint140}\n${report140}\n${csv140Source}`
if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeText)) {
  failures.push('Artefatos VPS read-only nao podem conter segredo ou variavel sensivel.')
}

const deployClaims = [/deploy executado/i, /service update executado/i, /publicado em producao neste sprint/i]
for (const pattern of deployClaims) {
  if (pattern.test(unsafeText)) {
    failures.push(`Artefatos VPS read-only sugerem execucao proibida: ${pattern}`)
  }
}

if (packageJson.scripts?.['seo:audit:wave1:vps-readonly'] !== 'node scripts/audit-wave1-vps-readonly-evidence.mjs') {
  failures.push('package.json sem script seo:audit:wave1:vps-readonly.')
}

console.log('Wave 1 VPS read-only evidence audit summary')
console.log(`rows=${csv140.rows.length}`)
console.log(`required_items=${requiredItems.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 VPS read-only warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 VPS read-only failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 VPS read-only evidence completed.')
