import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint144: `${seoPackage}/SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md`,
  report144: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md`,
  csv144: `${seoPackage}/artifacts/seo-pub-020-registro-decisao-limpeza-vps-onda1-nap-2026-06-15.csv`,
  sprint143: `${seoPackage}/SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP.md`,
  packageJson: 'package.json',
}

const requiredColumns = ['campo', 'valor', 'status', 'observacao']
const allowedDecisions = ['PENDENTE', 'GO_LIMPEZA_CONTROLADA_VPS', 'NO_GO_LIMPEZA']
const protectedImages = [
  'bnb-site:9fab426',
  'bnb-site:2d00d08',
  'bnb-site:41ece76',
  'bnb-site:8cd63e6',
  'bnb-site:b4e9a82',
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

const sprint144 = await readExpectedFile(files.sprint144)
const report144 = await readExpectedFile(files.report144)
const csv144Source = await readExpectedFile(files.csv144)
const sprint143 = await readExpectedFile(files.sprint143)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv144 = csv144Source ? parseCsv(csv144Source) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv144.header.includes(column)) {
    failures.push(`CSV decisao limpeza VPS sem coluna obrigatoria: ${column}`)
  }
}

const decisionRow = csv144.rows.find((row) => row.campo === 'decisao_limpeza')
if (!decisionRow) {
  failures.push('CSV decisao limpeza sem campo decisao_limpeza.')
} else if (!allowedDecisions.includes(decisionRow.valor)) {
  failures.push(`Decisao de limpeza invalida: ${decisionRow.valor}`)
}

for (const requiredField of [
  'go_permitido',
  'no_go_permitido',
  'go_build_pos_limpeza',
  'imagem_viva_protegida',
  'rollbacks_protegidos',
  'backup_spec_hash',
  'proximo_sprint_se_go',
  'proximo_sprint_se_no_go',
]) {
  if (!csv144.rows.some((row) => row.campo === requiredField)) {
    failures.push(`CSV decisao limpeza sem campo obrigatorio: ${requiredField}`)
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
  '3901b319481862b2da4d62082811848e6de8e4be05e3c4ea57a626dd589b72c0',
]) {
  assertIncludes(sprint144, expected, 'SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md')
  assertIncludes(report144, expected, 'RELATORIO_EXECUCAO_SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md')
}

for (const image of protectedImages) {
  assertIncludes(sprint144, image, 'SPRINT_144_REGISTRO_DECISAO_LIMPEZA_VPS_ONDA_1_NAP.md')
}

if (!sprint143.includes('GO_LIMPEZA_CONTROLADA_VPS') || !sprint143.includes('GO_BUILD_ONDA_1_NAP')) {
  failures.push('Sprint 143 precisa continuar separando GO de limpeza e GO de build.')
}

const unsafeText = `${sprint144}\n${report144}\n${csv144Source}`
for (const pattern of [
  /limpeza executada: sim/i,
  /deploy executado/i,
  /build executado/i,
  /service update executado/i,
  /image rm executado/i,
  /builder prune executado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Registro de decisao sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeText)) {
  failures.push('Registro de decisao nao pode conter segredo ou variavel sensivel.')
}

if (packageJson.scripts?.['seo:audit:wave1:vps-cleanup-decision'] !== 'node scripts/audit-wave1-vps-cleanup-decision.mjs') {
  failures.push('package.json sem script seo:audit:wave1:vps-cleanup-decision.')
}

console.log('Wave 1 VPS cleanup decision audit summary')
console.log(`rows=${csv144.rows.length}`)
console.log(`decision=${decisionRow?.valor ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 VPS cleanup decision warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 VPS cleanup decision failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 VPS cleanup decision completed.')
