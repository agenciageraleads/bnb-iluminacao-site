import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint151: `${seoPackage}/SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md`,
  report151: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP_2026-06-15.md`,
  csv151: `${seoPackage}/artifacts/seo-pub-022-execucao-limpeza-controlada-vps-onda1-nap-2026-06-15.csv`,
  decisionCsv: `${seoPackage}/artifacts/seo-pub-020-registro-decisao-limpeza-vps-onda1-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

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

const sprint151 = await readExpectedFile(files.sprint151)
const report151 = await readExpectedFile(files.report151)
const csv151Source = await readExpectedFile(files.csv151)
const decisionCsvSource = await readExpectedFile(files.decisionCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv151 = csv151Source ? parseCsv(csv151Source) : { header: [], rows: [] }
const decisionRows = decisionCsvSource ? parseCsv(decisionCsvSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const decision = decisionRows.find((row) => row.campo === 'decisao_limpeza')?.valor

for (const column of ['campo', 'antes', 'depois', 'status', 'observacao']) {
  if (!csv151.header.includes(column)) {
    failures.push(`CSV execucao limpeza sem coluna obrigatoria: ${column}`)
  }
}

if (decision !== 'GO_LIMPEZA_CONTROLADA_VPS') {
  failures.push(`Decisao de limpeza deveria estar GO_LIMPEZA_CONTROLADA_VPS; atual=${decision ?? 'missing'}`)
}

for (const field of [
  'disco_uso_percentual',
  'disco_livre',
  'docker_builder_prune',
  'docker_image_rm',
  'docker_system_prune',
  'service_update',
  'build',
  'deploy',
  'site_service',
  'backup_spec_hash',
  'imagem_viva',
  'rollbacks_protegidos',
  'url_home',
  'url_p0',
  'url_sitemap',
  'logs_recentes',
  'proximo_go_exigido',
]) {
  if (!csv151.rows.some((row) => row.campo === field)) {
    failures.push(`CSV execucao limpeza sem campo obrigatorio: ${field}`)
  }
}

for (const expected of [
  'GO_LIMPEZA_CONTROLADA_VPS',
  'GO_BUILD_ONDA_1_NAP',
  'docker builder prune -f',
  '9.795GB',
  '92%',
  '84%',
  'site-bb_app 1/1 bnb-site:9fab426',
  'container healthy',
  'https://bebiluminacao.com.br/ 200',
  'https://bebiluminacao.com.br/fabricante-de-postes-metalicos 200',
  'https://bebiluminacao.com.br/sitemap.xml 200',
  '3901b319481862b2da4d62082811848e6de8e4be05e3c4ea57a626dd589b72c0',
]) {
  assertIncludes(sprint151, expected, 'SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP.md')
}

for (const expected of [
  'nenhum `docker image rm` foi executado',
  'nenhum `docker system prune` foi executado',
  'nenhum `docker service update` foi executado',
  'nenhum build foi executado',
  'nenhum deploy foi executado',
  'nenhum volume foi removido',
]) {
  assertIncludes(report151, expected, 'RELATORIO_EXECUCAO_SPRINT_151_EXECUCAO_LIMPEZA_CONTROLADA_VPS_ONDA_1_NAP_2026-06-15.md')
}

const unsafeText = `${sprint151}\n${report151}\n${csv151Source}`
const csvRowsByField = new Map(csv151.rows.map((row) => [row.campo, row]))

for (const field of ['docker_image_rm', 'docker_system_prune', 'service_update', 'build', 'deploy']) {
  const row = csvRowsByField.get(field)
  if (!row) continue

  if (row.depois !== 'nao_executado') {
    failures.push(`Campo ${field} deveria permanecer nao_executado; atual=${row.depois}`)
  }
}

for (const pattern of [
  /docker image rm\s+-/i,
  /docker system prune\s+-/i,
  /docker service update\s+/i,
  /GO_BUILD_ONDA_1_NAP.*recebido/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Execucao de limpeza sugere acao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeText)) {
  failures.push('Execucao de limpeza nao pode conter segredo ou variavel sensivel.')
}

if (packageJson.scripts?.['seo:audit:wave1:vps-cleanup-executed'] !== 'node scripts/audit-wave1-vps-cleanup-executed.mjs') {
  failures.push('package.json sem script seo:audit:wave1:vps-cleanup-executed.')
}

console.log('Wave 1 VPS cleanup executed audit summary')
console.log(`rows=${csv151.rows.length}`)
console.log(`decision=${decision ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 VPS cleanup executed warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 VPS cleanup executed failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 VPS cleanup executed completed.')
