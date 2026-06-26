import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint152: `${seoPackage}/SPRINT_152_DECISAO_BUILD_ONDA_1_NAP.md`,
  report152: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_152_DECISAO_BUILD_ONDA_1_NAP_2026-06-15.md`,
  csv152: `${seoPackage}/artifacts/seo-pub-023-decisao-build-onda1-nap-2026-06-15.csv`,
  cleanupExecuted: `${seoPackage}/SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md`,
  cleanupCsv: `${seoPackage}/artifacts/seo-pub-022-execucao-limpeza-controlada-vps-onda1-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

const requiredColumns = ['campo', 'valor', 'status', 'observacao']
const allowedDecisions = ['PENDENTE', 'GO_BUILD_ONDA_1_NAP', 'NO_GO_BUILD']
const requiredFields = [
  'decisao_build',
  'go_permitido',
  'no_go_permitido',
  'escopo_permitido',
  'fora_do_escopo',
  'limpeza_vps',
  'disco_vps',
  'imagem_viva',
  'rollbacks_protegidos',
  'backup_spec_hash',
  'comandos_bloqueados_pre_go',
  'gates_pre_build',
  'criterio_abort_disco',
  'criterio_abort_imagem_viva',
  'criterio_abort_backup',
  'proximo_sprint_se_go',
  'proximo_sprint_se_no_go',
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

const sprint152 = await readExpectedFile(files.sprint152)
const report152 = await readExpectedFile(files.report152)
const csv152Source = await readExpectedFile(files.csv152)
const cleanupExecuted = await readExpectedFile(files.cleanupExecuted)
const cleanupCsvSource = await readExpectedFile(files.cleanupCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv152 = csv152Source ? parseCsv(csv152Source) : { header: [], rows: [] }
const cleanupCsv = cleanupCsvSource ? parseCsv(cleanupCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const rowsByField = new Map(csv152.rows.map((row) => [row.campo, row]))
const cleanupRowsByField = new Map(cleanupCsv.rows.map((row) => [row.campo, row]))
const decision = rowsByField.get('decisao_build')?.valor

for (const column of requiredColumns) {
  if (!csv152.header.includes(column)) {
    failures.push(`CSV decisao build sem coluna obrigatoria: ${column}`)
  }
}

for (const field of requiredFields) {
  if (!rowsByField.has(field)) {
    failures.push(`CSV decisao build sem campo obrigatorio: ${field}`)
  }
}

if (!allowedDecisions.includes(decision ?? '')) {
  failures.push(`Decisao de build invalida: ${decision ?? 'missing'}`)
}

for (const expected of [
  'PENDENTE',
  'GO_BUILD_ONDA_1_NAP',
  'NO_GO_BUILD',
  'Onda 1 + NAP oficial',
  'bnb-site:9fab426',
  'bnb-site:2d00d08',
  'bnb-site:41ece76',
  'bnb-site:8cd63e6',
  'bnb-site:b4e9a82',
  '3901b319481862b2da4d62082811848e6de8e4be05e3c4ea57a626dd589b72c0',
  '92% -> 84%',
  'sem build/deploy',
]) {
  assertIncludes(sprint152, expected, 'SPRINT_152_DECISAO_BUILD_ONDA_1_NAP.md')
}

for (const expected of [
  'Nenhum build foi executado',
  'Nenhum deploy foi executado',
  'Nenhum `docker service update` foi executado',
  'Nenhum `docker image rm` foi executado',
  'Nenhum `docker system prune` foi executado',
  'Nenhum `docker builder prune` foi executado neste sprint',
]) {
  assertIncludes(report152, expected, 'RELATORIO_EXECUCAO_SPRINT_152_DECISAO_BUILD_ONDA_1_NAP_2026-06-15.md')
}

if (cleanupRowsByField.get('docker_builder_prune')?.depois !== 'executado') {
  failures.push('Sprint 152 exige limpeza controlada ja executada no CSV do Sprint 151.')
}

if (cleanupRowsByField.get('build')?.depois !== 'nao_executado') {
  failures.push('Sprint 151 nao pode ter executado build.')
}

if (cleanupRowsByField.get('deploy')?.depois !== 'nao_executado') {
  failures.push('Sprint 151 nao pode ter executado deploy.')
}

if (
  cleanupRowsByField.get('disco_uso_percentual')?.antes !== '92%' ||
  cleanupRowsByField.get('disco_uso_percentual')?.depois !== '84%'
) {
  failures.push('CSV do Sprint 151 precisa provar disco 92% -> 84%.')
}

if (!cleanupExecuted.includes('docker builder prune -f') || !cleanupExecuted.includes('92%') || !cleanupExecuted.includes('84%')) {
  failures.push('Sprint 151 precisa continuar documentando a limpeza controlada e a reducao de disco.')
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(`${sprint152}\n${report152}\n${csv152Source}`)) {
  failures.push('Decisao de build nao pode conter segredo ou variavel sensivel.')
}

const unsafeText = `${sprint152}\n${report152}\n${csv152Source}`
for (const pattern of [
  /build executado: sim/i,
  /deploy executado: sim/i,
  /service update executado: sim/i,
  /image rm executado: sim/i,
  /system prune executado: sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Decisao de build sugere execucao proibida: ${pattern}`)
  }
}

if (decision === 'GO_BUILD_ONDA_1_NAP') {
  warnings.push('GO_BUILD_ONDA_1_NAP registrado: executar apenas sprint tecnico controlado, sem deploy automatico.')
}

if (packageJson.scripts?.['seo:audit:wave1:build-decision'] !== 'node scripts/audit-wave1-build-decision.mjs') {
  failures.push('package.json sem script seo:audit:wave1:build-decision.')
}

console.log('Wave 1 build decision audit summary')
console.log(`rows=${csv152.rows.length}`)
console.log(`decision=${decision ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 build decision warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 build decision failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 build decision completed.')
