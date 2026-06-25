import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  queueCsv: `${seoPackage}/artifacts/seo-gbp-003-fila-execucao-readonly-update-2026-06-15.csv`,
  gbpEvidenceCsv: `${seoPackage}/artifacts/seo-gbp-002-ficha-evidencia-readonly-2026-06-15.csv`,
  sprint149: `${seoPackage}/SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY.md`,
  sprint157: `${seoPackage}/SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE.md`,
  macro: `${seoPackage}/MACROBLOCO_GBP_EXECUCAO_ASSISTIDA.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_MACROBLOCO_GBP_EXECUCAO_ASSISTIDA_2026-06-15.md`,
  packageDoc: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'trilha',
  'ordem',
  'campo_origem',
  'acao',
  'valor_esperado',
  'evidencia_aceita',
  'prioridade',
  'status_execucao',
  'decisao_permitida',
  'proibido',
  'criterio_avanco',
]

const requiredFields = [
  'perfil_correto',
  'url_perfil_publico',
  'nome_publico',
  'categoria_primaria',
  'categorias_secundarias',
  'telefone_whatsapp',
  'site',
  'endereco',
  'horarios',
  'areas_atendimento',
  'produtos',
  'servicos',
  'fotos',
  'posts',
  'reviews_qna',
  'links_utms',
  'divergencias_prioritarias',
  'go_update_recomendado',
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

const queueCsvSource = await readExpectedFile(files.queueCsv)
const gbpEvidenceCsvSource = await readExpectedFile(files.gbpEvidenceCsv)
const sprint149 = await readExpectedFile(files.sprint149)
const sprint157 = await readExpectedFile(files.sprint157)
const macro = await readExpectedFile(files.macro)
const report = await readExpectedFile(files.report)
const packageDoc = await readExpectedFile(files.packageDoc)
const packageJsonSource = await readExpectedFile(files.packageJson)

const queueCsv = queueCsvSource ? parseCsv(queueCsvSource) : { header: [], rows: [] }
const gbpEvidenceCsv = gbpEvidenceCsvSource ? parseCsv(gbpEvidenceCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!queueCsv.header.includes(column)) {
    failures.push(`Fila GBP sem coluna obrigatoria: ${column}`)
  }
}

if (gbpEvidenceCsv.rows.length !== 18) {
  failures.push(`Ficha GBP deveria ter 18 linhas; encontrado ${gbpEvidenceCsv.rows.length}.`)
}

if (queueCsv.rows.length !== 21) {
  failures.push(`Fila GBP deveria ter 21 linhas; encontrado ${queueCsv.rows.length}.`)
}

for (const field of requiredFields) {
  if (!queueCsv.rows.some((row) => row.campo_origem === field)) {
    failures.push(`Fila GBP nao inclui campo obrigatorio: ${field}`)
  }
}

for (const row of queueCsv.rows) {
  if (row.status_execucao !== 'pendente_execucao_humana') {
    failures.push(`Linha ${row.ordem} deveria iniciar como pendente_execucao_humana.`)
  }

  if (!row.evidencia_aceita || !row.proibido || !row.criterio_avanco || !row.decisao_permitida) {
    failures.push(`Linha ${row.ordem} tem criterio operacional fraco ou ausente.`)
  }
}

for (const expected of [
  'B&B Iluminacao',
  'contato@bebiluminacao.com',
  '3576-1988',
  'Rua CV10',
  'postes metalicos',
  'GO_GBP_UPDATE',
]) {
  assertIncludes(queueCsvSource, expected, 'Fila GBP')
}

for (const expected of [
  'nao alterar nenhum campo',
  'GO_GBP_UPDATE',
  'npm run seo:audit:nap:strict',
]) {
  assertIncludes(sprint149, expected, 'SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY.md')
}

for (const expected of ['gbp_readonly', 'sem deploy', 'nao acessa Google Business Profile']) {
  assertIncludes(sprint157, expected, 'SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE.md')
}

for (const expected of [
  'artifacts/seo-gbp-003-fila-execucao-readonly-update-2026-06-15.csv',
  'npm run seo:build:gbp-execution-queue',
  'npm run seo:audit:gbp-execution-queue',
  'nenhum Google Business Profile foi editado',
]) {
  assertIncludes(macro, expected, 'MACROBLOCO_GBP_EXECUCAO_ASSISTIDA.md')
  assertIncludes(report, expected, 'RELATORIO_EXECUCAO_MACROBLOCO_GBP_EXECUCAO_ASSISTIDA_2026-06-15.md')
  assertIncludes(packageDoc, expected, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

const unsafeText = `${queueCsvSource}\n${macro}\n${report}\n${packageDoc}`
for (const pattern of [
  /GBP atualizado:\s*sim/i,
  /perfil editado:\s*sim/i,
  /foto publicada:\s*sim/i,
  /post publicado:\s*sim/i,
  /review respondid[ao]:\s*sim/i,
  /pagamento autorizado:\s*sim/i,
  /deploy executado:\s*sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Fila GBP sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Fila GBP nao pode conter segredo real.')
}

if (packageJson.scripts?.['seo:build:gbp-execution-queue'] !== 'node scripts/build-gbp-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:gbp-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:gbp-execution-queue'] !== 'node scripts/audit-gbp-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:gbp-execution-queue.')
}

console.log('GBP execution queue audit summary')
console.log(`queue_rows=${queueCsv.rows.length}`)
console.log(`source_rows=${gbpEvidenceCsv.rows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nGBP execution queue warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nGBP execution queue audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nGBP execution queue audit completed.')
