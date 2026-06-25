import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint153: `${seoPackage}/SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP.md`,
  report153: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP_2026-06-15.md`,
  csv153: `${seoPackage}/artifacts/seo-pub-024-roteador-pos-decisao-build-onda1-nap-2026-06-15.csv`,
  decisionCsv: `${seoPackage}/artifacts/seo-pub-023-decisao-build-onda1-nap-2026-06-15.csv`,
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

const requiredDecisions = ['PENDENTE', 'GO_BUILD_ONDA_1_NAP', 'NO_GO_BUILD']

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

const sprint153 = await readExpectedFile(files.sprint153)
const report153 = await readExpectedFile(files.report153)
const csv153Source = await readExpectedFile(files.csv153)
const decisionCsvSource = await readExpectedFile(files.decisionCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv153 = csv153Source ? parseCsv(csv153Source) : { header: [], rows: [] }
const decisionCsv = decisionCsvSource ? parseCsv(decisionCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv153.header.includes(column)) {
    failures.push(`CSV roteador build sem coluna obrigatoria: ${column}`)
  }
}

for (const decision of requiredDecisions) {
  if (!csv153.rows.some((row) => row.decisao_detectada === decision)) {
    failures.push(`Roteador build sem decisao obrigatoria: ${decision}`)
  }
}

const currentDecision = decisionCsv.rows.find((row) => row.campo === 'decisao_build')?.valor
if (!requiredDecisions.includes(currentDecision ?? '')) {
  failures.push(`Decisao atual de build invalida: ${currentDecision ?? 'missing'}`)
}

const pendingRoute = csv153.rows.find((row) => row.decisao_detectada === 'PENDENTE')
if (!pendingRoute || pendingRoute.proximo_sprint_permitido !== 'SPRINT_152_DECISAO_BUILD_ONDA_1_NAP') {
  failures.push('Rota PENDENTE deve voltar para a decisao do Sprint 152.')
}

const goRoute = csv153.rows.find((row) => row.decisao_detectada === 'GO_BUILD_ONDA_1_NAP')
if (!goRoute || goRoute.proximo_sprint_permitido !== 'SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP') {
  failures.push('Rota GO_BUILD_ONDA_1_NAP deve apontar para build controlado em sprint proprio.')
}

const noGoRoute = csv153.rows.find((row) => row.decisao_detectada === 'NO_GO_BUILD')
if (!noGoRoute || noGoRoute.proximo_sprint_permitido !== 'SPRINT_153B_ROTA_SEM_BUILD_ONDA_1_NAP') {
  failures.push('Rota NO_GO_BUILD deve apontar para rota sem build.')
}

for (const row of csv153.rows) {
  if (/deploy automatico/i.test(row.acao_permitida)) {
    failures.push(`Roteador nao pode permitir deploy automatico: ${row.decisao_detectada}`)
  }
}

for (const expected of [
  'PENDENTE',
  'GO_BUILD_ONDA_1_NAP',
  'NO_GO_BUILD',
  'SPRINT_152_DECISAO_BUILD_ONDA_1_NAP',
  'SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP',
  'sem build executado',
  'sem deploy executado',
]) {
  assertIncludes(sprint153, expected, 'SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP.md')
}

for (const expected of [
  'Nenhum build foi executado',
  'Nenhum deploy foi executado',
  'Nenhum `docker service update` foi executado',
  'Nenhum `docker image rm` foi executado',
  'Nenhum `docker system prune` foi executado',
  'Nenhum `docker builder prune` foi executado',
]) {
  assertIncludes(report153, expected, 'RELATORIO_EXECUCAO_SPRINT_153_ROTEADOR_POS_DECISAO_BUILD_ONDA_1_NAP_2026-06-15.md')
}

const unsafeText = `${sprint153}\n${report153}\n${csv153Source}`
for (const pattern of [
  /build executado: sim/i,
  /deploy executado: sim/i,
  /service update executado: sim/i,
  /image rm executado: sim/i,
  /system prune executado: sim/i,
  /builder prune executado: sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Roteador de build sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeText)) {
  failures.push('Roteador de build nao pode conter segredo ou variavel sensivel.')
}

if (currentDecision === 'GO_BUILD_ONDA_1_NAP') {
  warnings.push('GO_BUILD_ONDA_1_NAP registrado: proximo sprint deve ser build controlado, sem deploy automatico.')
}

if (packageJson.scripts?.['seo:audit:wave1:build-router'] !== 'node scripts/audit-wave1-build-router.mjs') {
  failures.push('package.json sem script seo:audit:wave1:build-router.')
}

console.log('Wave 1 build router audit summary')
console.log(`rows=${csv153.rows.length}`)
console.log(`current_decision=${currentDecision ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 build router warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 build router failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 build router completed.')
