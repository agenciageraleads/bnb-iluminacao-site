import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint141: `${seoPackage}/SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP.md`,
  report141: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP_2026-06-15.md`,
  csv141: `${seoPackage}/artifacts/seo-pub-017-readiness-disco-vps-onda1-nap-2026-06-15.csv`,
  sprint140: `${seoPackage}/SPRINT_140_EVIDENCIA_VPS_READONLY_ONDA_1_NAP.md`,
  packageJson: 'package.json',
}

const requiredColumns = ['item', 'status', 'evidencia', 'risco', 'acao_permitida', 'acao_proibida', 'decisao']
const requiredItems = [
  'ssh_gate',
  'disco_raiz',
  'docker_system_df',
  'servicos_ativos',
  'imagem_site_rollback',
  'candidatos_limpeza_planejada',
  'build_cache',
  'go_publicacao',
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

const sprint141 = await readExpectedFile(files.sprint141)
const report141 = await readExpectedFile(files.report141)
const csv141Source = await readExpectedFile(files.csv141)
const sprint140 = await readExpectedFile(files.sprint140)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv141 = csv141Source ? parseCsv(csv141Source) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv141.header.includes(column)) {
    failures.push(`CSV readiness disco VPS sem coluna obrigatoria: ${column}`)
  }
}

for (const item of requiredItems) {
  if (!csv141.rows.some((row) => row.item === item)) {
    failures.push(`CSV readiness disco VPS sem item: ${item}`)
  }
}

for (const expected of [
  '8.4G',
  '92%',
  '78.41GB',
  '34.46GB',
  '29.18GB',
  'bnb-site:9fab426',
  '2d00d08',
  '41ece76',
  '8cd63e6',
  'b4e9a82',
  'sem deploy',
]) {
  assertIncludes(sprint141, expected, 'SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP.md')
  assertIncludes(report141, expected, 'RELATORIO_EXECUCAO_SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP_2026-06-15.md')
}

const diskRow = csv141.rows.find((row) => row.item === 'disco_raiz')
if (diskRow?.status !== 'bloqueio_operacional') {
  failures.push('Linha disco_raiz deve bloquear publicacao ate limpeza controlada.')
}

const publicationRow = csv141.rows.find((row) => row.item === 'go_publicacao')
if (publicationRow?.status !== 'bloqueado') {
  failures.push('Linha go_publicacao deve estar bloqueada ate espaco seguro.')
}

const cleanupRow = csv141.rows.find((row) => row.item === 'candidatos_limpeza_planejada')
if (cleanupRow && cleanupRow.status !== 'planejado_com_aprovacao') {
  failures.push('Linha candidatos_limpeza_planejada deve exigir aprovacao.')
}

const unsafeText = `${sprint141}\n${report141}\n${csv141Source}`
for (const pattern of [
  /docker system prune executado/i,
  /docker builder prune executado/i,
  /docker image rm executado/i,
  /docker service update executado/i,
  /deploy executado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Artefatos do Sprint 141 sugerem acao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeText)) {
  failures.push('Artefatos do Sprint 141 nao podem conter segredo ou variavel sensivel.')
}

if (!sprint140.includes('disco raiz da VPS em 92%')) {
  warnings.push('Sprint 140 nao cita literalmente o alerta de disco; Sprint 141 passa a ser a evidencia detalhada.')
}

if (packageJson.scripts?.['seo:audit:wave1:vps-disk'] !== 'node scripts/audit-wave1-vps-disk-readiness.mjs') {
  failures.push('package.json sem script seo:audit:wave1:vps-disk.')
}

console.log('Wave 1 VPS disk readiness audit summary')
console.log(`rows=${csv141.rows.length}`)
console.log(`required_items=${requiredItems.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 VPS disk readiness warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 VPS disk readiness failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 VPS disk readiness completed.')
