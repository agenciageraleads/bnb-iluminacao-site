import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint142: `${seoPackage}/SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md`,
  report142: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP_2026-06-15.md`,
  csv142: `${seoPackage}/artifacts/seo-pub-018-plano-limpeza-controlada-vps-onda1-nap-2026-06-15.csv`,
  sprint141: `${seoPackage}/SPRINT_141_READINESS_DISCO_VPS_ONDA_1_NAP.md`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'tipo',
  'item',
  'imagem',
  'image_id',
  'idade',
  'tamanho_nominal',
  'status',
  'decisao',
  'observacao',
]

const preservedImages = [
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

const sprint142 = await readExpectedFile(files.sprint142)
const report142 = await readExpectedFile(files.report142)
const csv142Source = await readExpectedFile(files.csv142)
const sprint141 = await readExpectedFile(files.sprint141)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv142 = csv142Source ? parseCsv(csv142Source) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv142.header.includes(column)) {
    failures.push(`CSV plano limpeza VPS sem coluna obrigatoria: ${column}`)
  }
}

for (const image of preservedImages) {
  const row = csv142.rows.find((candidate) => candidate.imagem === image)

  if (!row) {
    failures.push(`CSV plano limpeza sem imagem preservada: ${image}`)
    continue
  }

  if (row.decisao !== 'manter') {
    failures.push(`Imagem preservada ${image} deve estar com decisao manter; encontrado ${row.decisao}.`)
  }
}

const activeImage = csv142.rows.find((row) => row.imagem === 'bnb-site:9fab426')
if (activeImage?.status !== 'ativo') {
  failures.push('Imagem viva bnb-site:9fab426 deve estar marcada como ativo.')
}

const cleanupCandidates = csv142.rows.filter((row) => row.tipo === 'candidato' && row.imagem.startsWith('bnb-site:'))
if (cleanupCandidates.length !== 20) {
  failures.push(`Plano deve listar 20 imagens bnb-site candidatas; encontrado ${cleanupCandidates.length}.`)
}

if (cleanupCandidates.some((row) => preservedImages.includes(row.imagem))) {
  failures.push('Plano marcou imagem preservada como candidata de limpeza.')
}

if (cleanupCandidates.some((row) => row.decisao !== 'remover_somente_com_go')) {
  failures.push('Toda imagem candidata deve exigir remover_somente_com_go.')
}

for (const image of ['crm-bb:weekly-wpp-e2153c5', 'documenso-bb:ptbr-9529572']) {
  const row = csv142.rows.find((candidate) => candidate.imagem === image)
  if (!row || row.decisao !== 'nao_remover') {
    failures.push(`Imagem ativa de outro servico deve estar bloqueada para remocao: ${image}`)
  }
}

const goRow = csv142.rows.find((row) => row.item === 'go_limpeza')
if (!goRow || goRow.status !== 'pendente' || goRow.decisao !== 'aguardar_usuario') {
  failures.push('Plano precisa manter GO_LIMPEZA_CONTROLADA_VPS como pendente.')
}

for (const expected of [
  'GO_LIMPEZA_CONTROLADA_VPS',
  '29.18GB',
  '34.52GB',
  'bnb-site:9fab426',
  'sem limpeza executada',
  'sem deploy',
  'sem build',
]) {
  assertIncludes(sprint142, expected, 'SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md')
  assertIncludes(report142, expected, 'RELATORIO_EXECUCAO_SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP_2026-06-15.md')
}

if (!sprint141.includes('GO_LIMPEZA_CONTROLADA_VPS')) {
  failures.push('Sprint 141 deve apontar o GO especifico de limpeza controlada.')
}

const unsafeText = `${sprint142}\n${report142}\n${csv142Source}`
for (const pattern of [
  /limpeza executada: sim/i,
  /deploy executado/i,
  /build executado/i,
  /service update executado/i,
  /image rm executado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Artefatos do Sprint 142 sugerem execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeText)) {
  failures.push('Artefatos do Sprint 142 nao podem conter segredo ou variavel sensivel.')
}

if (packageJson.scripts?.['seo:audit:wave1:vps-cleanup-plan'] !== 'node scripts/audit-wave1-vps-cleanup-plan.mjs') {
  failures.push('package.json sem script seo:audit:wave1:vps-cleanup-plan.')
}

console.log('Wave 1 VPS cleanup plan audit summary')
console.log(`rows=${csv142.rows.length}`)
console.log(`cleanup_candidates=${cleanupCandidates.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 VPS cleanup plan warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 VPS cleanup plan failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 VPS cleanup plan completed.')
