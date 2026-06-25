import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint143: `${seoPackage}/SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP.md`,
  report143: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md`,
  csv143: `${seoPackage}/artifacts/seo-pub-019-pacote-execucao-limpeza-vps-onda1-nap-2026-06-15.csv`,
  sprint142: `${seoPackage}/SPRINT_142_PLANO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md`,
  cleanupPlanCsv: `${seoPackage}/artifacts/seo-pub-018-plano-limpeza-controlada-vps-onda1-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'ordem',
  'fase',
  'comando',
  'status_permitido',
  'objetivo',
  'criterio_sucesso',
  'criterio_parada',
]

const requiredPhases = [
  'gate_ssh',
  'baseline_pre',
  'backup_spec',
  'limpar_build_cache',
  'validar_pos_cache',
  'remover_imagens_antigas_bnb_site',
  'validar_preservadas',
  'validar_servicos',
  'validar_http_publico',
  'gate_local_pos_limpeza',
  'decisao_build',
]

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

const sprint143 = await readExpectedFile(files.sprint143)
const report143 = await readExpectedFile(files.report143)
const csv143Source = await readExpectedFile(files.csv143)
const sprint142 = await readExpectedFile(files.sprint142)
const cleanupPlanCsvSource = await readExpectedFile(files.cleanupPlanCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv143 = csv143Source ? parseCsv(csv143Source) : { header: [], rows: [] }
const cleanupPlanCsv = cleanupPlanCsvSource ? parseCsv(cleanupPlanCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv143.header.includes(column)) {
    failures.push(`CSV pacote execucao limpeza sem coluna obrigatoria: ${column}`)
  }
}

for (const phase of requiredPhases) {
  if (!csv143.rows.some((row) => row.fase === phase)) {
    failures.push(`CSV pacote execucao limpeza sem fase obrigatoria: ${phase}`)
  }
}

const destructiveRows = csv143.rows.filter((row) =>
  /docker builder prune|docker image rm/.test(row.comando)
)

if (destructiveRows.length !== 2) {
  failures.push(`Pacote deve ter exatamente 2 fases destrutivas documentadas; encontrado ${destructiveRows.length}.`)
}

for (const row of destructiveRows) {
  if (!row.status_permitido.includes('bloqueado_ate_GO_LIMPEZA_CONTROLADA_VPS')) {
    failures.push(`Comando destrutivo precisa estar bloqueado ate GO: ${row.fase}`)
  }
}

const imageRemovalRow = csv143.rows.find((row) => row.fase === 'remover_imagens_antigas_bnb_site')
if (!imageRemovalRow) {
  failures.push('Fase de remocao de imagens antigas ausente.')
} else {
  for (const image of protectedImages) {
    if (imageRemovalRow.comando.includes(image)) {
      failures.push(`Comando de remocao nao pode conter imagem protegida: ${image}`)
    }
  }
}

for (const image of protectedImages) {
  assertIncludes(sprint143, image, 'SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP.md')
  assertIncludes(report143, image, 'RELATORIO_EXECUCAO_SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md')
}

for (const expected of [
  'GO_LIMPEZA_CONTROLADA_VPS',
  'GO_BUILD_ONDA_1_NAP',
  'sem limpeza executada',
  'sem deploy',
  'sem build',
  '3901b319481862b2da4d62082811848e6de8e4be05e3c4ea57a626dd589b72c0',
]) {
  assertIncludes(sprint143, expected, 'SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP.md')
}

for (const expected of ['GO_LIMPEZA_CONTROLADA_VPS', 'sem limpeza executada', 'sem deploy', 'sem build']) {
  assertIncludes(report143, expected, 'RELATORIO_EXECUCAO_SPRINT_143_PACOTE_EXECUCAO_LIMPEZA_VPS_ONDA_1_NAP_2026-06-15.md')
}

if (!sprint142.includes('20 imagens antigas')) {
  failures.push('Sprint 142 precisa continuar documentando as 20 imagens antigas candidatas.')
}

const cleanupCandidates = cleanupPlanCsv.rows.filter((row) => row.tipo === 'candidato' && row.imagem.startsWith('bnb-site:'))
if (cleanupCandidates.length !== 20) {
  failures.push(`CSV do Sprint 142 deve continuar com 20 candidatas; encontrado ${cleanupCandidates.length}.`)
}

const unsafeClaims = `${sprint143}\n${report143}\n${csv143Source}`
for (const pattern of [
  /limpeza executada: sim/i,
  /deploy executado/i,
  /build executado/i,
  /service update executado/i,
  /image rm executado/i,
  /builder prune executado/i,
]) {
  if (pattern.test(unsafeClaims)) {
    failures.push(`Pacote de execucao sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeClaims)) {
  failures.push('Pacote de execucao nao pode conter segredo ou variavel sensivel.')
}

if (packageJson.scripts?.['seo:audit:wave1:vps-cleanup-execution'] !== 'node scripts/audit-wave1-vps-cleanup-execution.mjs') {
  failures.push('package.json sem script seo:audit:wave1:vps-cleanup-execution.')
}

console.log('Wave 1 VPS cleanup execution audit summary')
console.log(`rows=${csv143.rows.length}`)
console.log(`required_phases=${requiredPhases.length}`)
console.log(`destructive_rows=${destructiveRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 VPS cleanup execution warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 VPS cleanup execution failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 VPS cleanup execution completed.')
