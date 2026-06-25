import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint145: `${seoPackage}/SPRINT_145_ROTEADOR_POS_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md`,
  report145: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_145_ROTEADOR_POS_DECISAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md`,
  csv145: `${seoPackage}/artifacts/seo-pub-021-roteador-pos-decisao-limpeza-vps-onda1-nap-2026-06-15.csv`,
  decisionCsv: `${seoPackage}/artifacts/seo-pub-020-registro-decisao-limpeza-vps-onda1-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'decisao_detectada',
  'status_decisao',
  'proximo_sprint_permitido',
  'acao_permitida',
  'acao_bloqueada',
  'criterio_entrada',
]

const requiredDecisions = ['PENDENTE', 'GO_LIMPEZA_CONTROLADA_VPS', 'NO_GO_LIMPEZA', 'POS_LIMPEZA_VALIDADA']

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

const sprint145 = await readExpectedFile(files.sprint145)
const report145 = await readExpectedFile(files.report145)
const csv145Source = await readExpectedFile(files.csv145)
const decisionCsvSource = await readExpectedFile(files.decisionCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv145 = csv145Source ? parseCsv(csv145Source) : { header: [], rows: [] }
const decisionCsv = decisionCsvSource ? parseCsv(decisionCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv145.header.includes(column)) {
    failures.push(`CSV roteador limpeza VPS sem coluna obrigatoria: ${column}`)
  }
}

for (const decision of requiredDecisions) {
  if (!csv145.rows.some((row) => row.decisao_detectada === decision)) {
    failures.push(`Roteador sem decisao obrigatoria: ${decision}`)
  }
}

const currentDecision = decisionCsv.rows.find((row) => row.campo === 'decisao_limpeza')?.valor
if (currentDecision !== 'PENDENTE') {
  warnings.push(`Decisao atual nao e PENDENTE: ${currentDecision}`)
}

const pendingRoute = csv145.rows.find((row) => row.decisao_detectada === 'PENDENTE')
if (!pendingRoute || pendingRoute.proximo_sprint_permitido !== 'SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP') {
  failures.push('Rota PENDENTE deve voltar para o registro de decisao do Sprint 144.')
}

const goRoute = csv145.rows.find((row) => row.decisao_detectada === 'GO_LIMPEZA_CONTROLADA_VPS')
if (!goRoute || goRoute.proximo_sprint_permitido !== 'SPRINT_145_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP') {
  failures.push('Rota GO_LIMPEZA_CONTROLADA_VPS deve apontar para execucao controlada da limpeza.')
}

const noGoRoute = csv145.rows.find((row) => row.decisao_detectada === 'NO_GO_LIMPEZA')
if (!noGoRoute || noGoRoute.proximo_sprint_permitido !== 'SPRINT_145B_ROTA_SEM_LIMPEZA_VPS_ONDA_1_NAP') {
  failures.push('Rota NO_GO_LIMPEZA deve apontar para alternativa sem limpeza.')
}

for (const row of csv145.rows) {
  if (/build automatico|deploy automatico/i.test(row.acao_permitida)) {
    failures.push(`Roteador nao pode permitir build/deploy automatico: ${row.decisao_detectada}`)
  }
}

for (const expected of [
  'PENDENTE',
  'GO_LIMPEZA_CONTROLADA_VPS',
  'NO_GO_LIMPEZA',
  'GO_BUILD_ONDA_1_NAP',
  'sem limpeza executada',
  'sem deploy',
  'sem build',
]) {
  assertIncludes(sprint145, expected, 'SPRINT_145_ROTEADOR_POS_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md')
  assertIncludes(report145, expected, 'RELATORIO_EXECUCAO_SPRINT_145_ROTEADOR_POS_DECISAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md')
}

const unsafeText = `${sprint145}\n${report145}\n${csv145Source}`
for (const pattern of [
  /limpeza executada: sim/i,
  /deploy executado/i,
  /build executado/i,
  /service update executado/i,
  /image rm executado/i,
  /builder prune executado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Roteador sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeText)) {
  failures.push('Roteador nao pode conter segredo ou variavel sensivel.')
}

if (packageJson.scripts?.['seo:audit:wave1:vps-cleanup-router'] !== 'node scripts/audit-wave1-vps-cleanup-router.mjs') {
  failures.push('package.json sem script seo:audit:wave1:vps-cleanup-router.')
}

console.log('Wave 1 VPS cleanup router audit summary')
console.log(`rows=${csv145.rows.length}`)
console.log(`current_decision=${currentDecision ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 VPS cleanup router warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 VPS cleanup router failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 VPS cleanup router completed.')
