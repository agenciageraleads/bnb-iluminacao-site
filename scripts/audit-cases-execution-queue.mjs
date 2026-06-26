import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  queueCsv: `${seoPackage}/artifacts/seo-img-019-fila-execucao-cases-comerciais-2026-06-15.csv`,
  sourceCsv: `${seoPackage}/artifacts/seo-img-010-matriz-validacao-comercial-cases-2026-06-15.csv`,
  gateCsv: `${seoPackage}/artifacts/seo-img-012-gate-cases-comerciais-2026-06-15.csv`,
  packageDoc: `${seoPackage}/PACOTE_VALIDACAO_COMERCIAL_CASES_BB.md`,
  macro: `${seoPackage}/MACROBLOCO_CASES_EXECUCAO_ASSISTIDA.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_MACROBLOCO_CASES_EXECUCAO_ASSISTIDA_2026-06-15.md`,
  postDeployPackage: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'ordem',
  'prioridade',
  'cluster',
  'source_path',
  'candidato_case_slug',
  'pagina_destino_se_confirmado',
  'responsavel_validacao',
  'status_execucao',
  'pergunta_para_time_comercial',
  'confirmacoes_obrigatorias',
  'evidencia_aceita',
  'decisao_permitida',
  'acao_segura_sem_resposta',
  'gate_publicacao',
  'acao_bloqueada',
  'auditor',
]

const requiredClusters = [
  'comercial-estacionamento',
  'hospitalar-estacionamento',
  'pracas',
  'institucional-industrial',
  'condominios',
  'esportivo',
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
const sourceCsvSource = await readExpectedFile(files.sourceCsv)
const gateCsvSource = await readExpectedFile(files.gateCsv)
const packageDoc = await readExpectedFile(files.packageDoc)
const macro = await readExpectedFile(files.macro)
const report = await readExpectedFile(files.report)
const postDeployPackage = await readExpectedFile(files.postDeployPackage)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)

const queueCsv = queueCsvSource ? parseCsv(queueCsvSource) : { header: [], rows: [] }
const sourceCsv = sourceCsvSource ? parseCsv(sourceCsvSource) : { header: [], rows: [] }
const gateCsv = gateCsvSource ? parseCsv(gateCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!queueCsv.header.includes(column)) {
    failures.push(`Fila de cases sem coluna obrigatoria: ${column}`)
  }
}

if (sourceCsv.rows.length !== 37) {
  failures.push(`Matriz de origem deveria ter 37 fotos candidatas; encontrado ${sourceCsv.rows.length}.`)
}

if (gateCsv.rows.length !== 6) {
  failures.push(`Gate de cases deveria ter 6 grupos; encontrado ${gateCsv.rows.length}.`)
}

if (queueCsv.rows.length !== 37) {
  failures.push(`Fila de cases deveria ter 37 linhas; encontrado ${queueCsv.rows.length}.`)
}

for (const cluster of requiredClusters) {
  if (!queueCsv.rows.some((row) => row.cluster === cluster)) {
    failures.push(`Fila de cases sem cluster obrigatorio: ${cluster}`)
  }
}

for (const row of queueCsv.rows) {
  if (row.status_execucao !== 'pendente_validacao_comercial') {
    failures.push(`Linha ${row.ordem} deveria iniciar como pendente_validacao_comercial.`)
  }

  if (!row.pergunta_para_time_comercial || !row.confirmacoes_obrigatorias || !row.evidencia_aceita) {
    failures.push(`Linha ${row.ordem} tem pergunta ou evidencia de validacao fraca.`)
  }

  for (const expectedDecision of ['aprovar_nominal', 'aprovar_anonimo', 'manter_referencia_visual', 'descartar']) {
    if (!row.decisao_permitida.includes(expectedDecision)) {
      failures.push(`Linha ${row.ordem} nao permite decisao ${expectedDecision}.`)
    }
  }
}

for (const expected of [
  'obra_BB_confirmada',
  'cidade_UF',
  'produto_familia',
  'autorizacao_uso_publico',
  'decisao_nome_cliente',
  'publicar case nominal',
]) {
  assertIncludes(queueCsvSource, expected, 'Fila de cases')
}

for (const expected of [
  'artifacts/seo-img-019-fila-execucao-cases-comerciais-2026-06-15.csv',
  'npm run seo:build:cases-execution-queue',
  'npm run seo:audit:cases-execution-queue',
  'Nenhuma nova pagina de case deve ser criada',
]) {
  assertIncludes(packageDoc, expected, 'PACOTE_VALIDACAO_COMERCIAL_CASES_BB.md')
  assertIncludes(macro, expected, 'MACROBLOCO_CASES_EXECUCAO_ASSISTIDA.md')
  assertIncludes(report, expected, 'RELATORIO_EXECUCAO_MACROBLOCO_CASES_EXECUCAO_ASSISTIDA_2026-06-15.md')
  assertIncludes(postDeployPackage, expected, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

for (const expected of ['37 acoes de validacao comercial', 'cases-execution-queue']) {
  assertIncludes(scorecard, expected, 'SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md')
}

const unsafeText = `${queueCsvSource}\n${packageDoc}\n${macro}\n${report}\n${postDeployPackage}`
for (const pattern of [
  /case nominal publicado:\s*sim/i,
  /autorizacao recebida:\s*sim/i,
  /GO_CASES:\s*sim/i,
  /obra validada:\s*sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Fila de cases sugere conclusao indevida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Fila de cases nao pode conter segredo real.')
}

if (packageJson.scripts?.['seo:build:cases-execution-queue'] !== 'node scripts/build-cases-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:cases-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:cases-execution-queue'] !== 'node scripts/audit-cases-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:cases-execution-queue.')
}

console.log('Cases execution queue audit summary')
console.log(`queue_rows=${queueCsv.rows.length}`)
console.log(`source_rows=${sourceCsv.rows.length}`)
console.log(`gate_rows=${gateCsv.rows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nCases execution queue warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nCases execution queue audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nCases execution queue audit completed.')
