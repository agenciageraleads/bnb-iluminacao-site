import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint157: `${seoPackage}/SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE.md`,
  report157: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE_2026-06-15.md`,
  csv157: `${seoPackage}/artifacts/seo-ops-050-fila-execucao-humana-gbp-offpage-2026-06-15.csv`,
  responsesCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  gbpCsv: `${seoPackage}/artifacts/seo-gbp-002-ficha-evidencia-readonly-2026-06-15.csv`,
  offpageCsv: `${seoPackage}/artifacts/seo-link-009-pre-contatos-offpage-pos-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'trilha',
  'ordem',
  'tarefa',
  'origem',
  'executor_humano',
  'status_execucao',
  'evidencia_aceita',
  'proibido',
  'criterio_avanco',
  'auditor',
]

const requiredTasks = [
  'confirmar perfil correto da B&B no GBP',
  'copiar dados publicos de identidade e NAP',
  'mapear produtos servicos fotos posts e reviews anonimizados',
  'registrar divergencias e recomendacao de GO_GBP_UPDATE',
  'enviar pre-contato AECweb',
  'enviar pre-contato QuemFornece',
  'enviar pre-contato Portal Metalica/CIMM',
  'enviar pre-contato Kompass/B2Brazil',
  'revisar rascunhos LinkedIn apenas internamente',
  'registrar respostas e atualizar matriz de triagem',
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

const sprint157 = await readExpectedFile(files.sprint157)
const report157 = await readExpectedFile(files.report157)
const csv157Source = await readExpectedFile(files.csv157)
const responsesSource = await readExpectedFile(files.responsesCsv)
const gbpCsvSource = await readExpectedFile(files.gbpCsv)
const offpageCsvSource = await readExpectedFile(files.offpageCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv157 = csv157Source ? parseCsv(csv157Source) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const gbpCsv = gbpCsvSource ? parseCsv(gbpCsvSource) : { header: [], rows: [] }
const offpageCsv = offpageCsvSource ? parseCsv(offpageCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const responsesByItem = new Map(responses.map((row) => [row.item_backlog, row]))

for (const column of requiredColumns) {
  if (!csv157.header.includes(column)) {
    failures.push(`CSV Sprint 157 sem coluna obrigatoria: ${column}`)
  }
}

if (csv157.rows.length !== 10) {
  failures.push(`CSV Sprint 157 deveria ter 10 tarefas; encontrado ${csv157.rows.length}.`)
}

for (const task of requiredTasks) {
  if (!csv157.rows.some((row) => row.tarefa === task)) {
    failures.push(`CSV Sprint 157 sem tarefa obrigatoria: ${task}`)
  }
}

for (const row of csv157.rows) {
  if (row.status_execucao !== 'pendente_execucao_humana') {
    failures.push(`Tarefa ${row.ordem} deveria iniciar como pendente_execucao_humana.`)
  }

  if (!row.executor_humano || !row.evidencia_aceita || !row.criterio_avanco || !row.auditor) {
    failures.push(`Tarefa ${row.ordem} tem campos de execucao fracos ou ausentes.`)
  }
}

for (const item of ['SEO-GBP-001', 'SEO-GBP-002', 'SEO-LINK-002']) {
  const response = responsesByItem.get(item)
  if (response?.status_resposta !== 'validado' || response?.go_autorizado !== 'sim') {
    failures.push(`${item} precisa estar validado com go_autorizado=sim para Sprint 157.`)
  }
}

if (gbpCsv.rows.length < 18) {
  failures.push('Ficha GBP base deveria ter pelo menos 18 linhas.')
}

if (offpageCsv.rows.length < 5) {
  failures.push('Fila off-page base deveria ter pelo menos 5 linhas.')
}

for (const expected of [
  'sem abrir producao',
  'nao acessa Google Business Profile',
  'nao envia mensagens',
  'nao cria cadastro',
  'nao publica perfil',
  'nao paga diretorio',
  'decisao_build=PENDENTE',
  'sem deploy',
]) {
  assertIncludes(sprint157, expected, 'SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE.md')
}

for (const expected of ['rows=10', 'gbp_ready=2', 'offpage_ready=1', 'local_checks=127', 'nenhum build foi executado']) {
  assertIncludes(report157, expected, 'RELATORIO_EXECUCAO_SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE_2026-06-15.md')
}

const unsafeText = `${sprint157}\n${report157}\n${csv157Source}`
for (const pattern of [
  /build executado:\s*sim/i,
  /deploy executado:\s*sim/i,
  /perfil externo criado:\s*sim/i,
  /pagamento autorizado:\s*sim/i,
  /GBP atualizado:\s*sim/i,
  /mensagem enviada:\s*sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Sprint 157 sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|senha|token/i.test(unsafeText)) {
  failures.push('Sprint 157 nao pode conter segredo ou pedir segredo.')
}

if (packageJson.scripts?.['seo:audit:human-external-execution-queue'] !== 'node scripts/audit-human-external-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:human-external-execution-queue.')
}

const gbpReady = ['SEO-GBP-001', 'SEO-GBP-002'].filter((item) => {
  const response = responsesByItem.get(item)
  return response?.status_resposta === 'validado' && response?.go_autorizado === 'sim'
}).length

const offpageReady = ['SEO-LINK-002'].filter((item) => {
  const response = responsesByItem.get(item)
  return response?.status_resposta === 'validado' && response?.go_autorizado === 'sim'
}).length

console.log('Human external execution queue audit summary')
console.log(`rows=${csv157.rows.length}`)
console.log(`gbp_ready=${gbpReady}`)
console.log(`offpage_ready=${offpageReady}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nHuman external execution queue warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nHuman external execution queue audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nHuman external execution queue audit completed.')
