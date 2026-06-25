import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint154: `${seoPackage}/SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP.md`,
  report154: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_154_PACOTE_BUILD_CONTROLADO_ONDA_1_NAP_2026-06-15.md`,
  csv154: `${seoPackage}/artifacts/seo-pub-025-pacote-build-controlado-onda1-nap-2026-06-15.csv`,
  decisionCsv: `${seoPackage}/artifacts/seo-pub-023-decisao-build-onda1-nap-2026-06-15.csv`,
  routerCsv: `${seoPackage}/artifacts/seo-pub-024-roteador-pos-decisao-build-onda1-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

const requiredColumns = ['campo', 'valor', 'status', 'observacao']
const requiredFields = [
  'decisao_atual',
  'go_exigido',
  'escopo',
  'imagem_viva',
  'rollbacks_protegidos',
  'backup_spec_hash',
  'disco_pos_limpeza',
  'build',
  'deploy',
  'service_update',
  'docker_image_rm',
  'docker_system_prune',
  'docker_builder_prune',
  'gates_pre_build',
  'fora_do_escopo',
  'proximo_sprint_se_go',
  'proximo_sprint_se_sem_go',
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

const sprint154 = await readExpectedFile(files.sprint154)
const report154 = await readExpectedFile(files.report154)
const csv154Source = await readExpectedFile(files.csv154)
const decisionCsvSource = await readExpectedFile(files.decisionCsv)
const routerCsvSource = await readExpectedFile(files.routerCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv154 = csv154Source ? parseCsv(csv154Source) : { header: [], rows: [] }
const decisionCsv = decisionCsvSource ? parseCsv(decisionCsvSource) : { header: [], rows: [] }
const routerCsv = routerCsvSource ? parseCsv(routerCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const rowsByField = new Map(csv154.rows.map((row) => [row.campo, row]))
const currentDecision = decisionCsv.rows.find((row) => row.campo === 'decisao_build')?.valor

for (const column of requiredColumns) {
  if (!csv154.header.includes(column)) {
    failures.push(`CSV pacote build sem coluna obrigatoria: ${column}`)
  }
}

for (const field of requiredFields) {
  if (!rowsByField.has(field)) {
    failures.push(`CSV pacote build sem campo obrigatorio: ${field}`)
  }
}

if (currentDecision !== 'PENDENTE' && currentDecision !== 'GO_BUILD_ONDA_1_NAP' && currentDecision !== 'NO_GO_BUILD') {
  failures.push(`Decisao de build invalida no Sprint 152: ${currentDecision ?? 'missing'}`)
}

if (rowsByField.get('decisao_atual')?.valor !== currentDecision) {
  failures.push(`CSV pacote build deve refletir decisao atual ${currentDecision}; encontrado ${rowsByField.get('decisao_atual')?.valor}`)
}

if (routerCsv.rows.find((row) => row.decisao_detectada === 'GO_BUILD_ONDA_1_NAP')?.proximo_sprint_permitido !== 'SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP') {
  failures.push('Roteador do Sprint 153 deve apontar GO_BUILD_ONDA_1_NAP para Sprint 154.')
}

for (const field of ['build', 'deploy', 'service_update', 'docker_image_rm', 'docker_system_prune', 'docker_builder_prune']) {
  const row = rowsByField.get(field)
  if (row?.valor !== 'nao_executado') {
    failures.push(`Campo ${field} deveria permanecer nao_executado; atual=${row?.valor ?? 'missing'}`)
  }
}

const expectedDecisionText = currentDecision === 'GO_BUILD_ONDA_1_NAP'
  ? 'decisao_build=GO_BUILD_ONDA_1_NAP'
  : 'decisao_build=PENDENTE'

for (const expected of [
  expectedDecisionText,
  'GO_BUILD_ONDA_1_NAP',
  'Onda 1 + NAP oficial',
  'bnb-site:9fab426',
  '84%',
  'build nao executado',
  'deploy nao executado',
  'service update nao executado',
]) {
  assertIncludes(sprint154, expected, 'SPRINT_154_EXECUCAO_BUILD_CONTROLADO_ONDA_1_NAP.md')
}

for (const expected of [
  'Nenhum build foi executado',
  'Nenhum deploy foi executado',
  'Nenhum `docker service update` foi executado',
  'Nenhum `docker image rm` foi executado',
  'Nenhum `docker system prune` foi executado',
  'Nenhum `docker builder prune` foi executado neste sprint',
]) {
  assertIncludes(report154, expected, 'RELATORIO_EXECUCAO_SPRINT_154_PACOTE_BUILD_CONTROLADO_ONDA_1_NAP_2026-06-15.md')
}

const unsafeText = `${sprint154}\n${report154}\n${csv154Source}`
for (const pattern of [
  /build executado: sim/i,
  /deploy executado: sim/i,
  /service update executado: sim/i,
  /image rm executado: sim/i,
  /system prune executado: sim/i,
  /builder prune executado: sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Pacote de build sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH/i.test(unsafeText)) {
  failures.push('Pacote de build nao pode conter segredo ou variavel sensivel.')
}

if (currentDecision === 'PENDENTE') {
  warnings.push('Decisao de build segue PENDENTE; pacote permanece documental.')
} else if (currentDecision === 'GO_BUILD_ONDA_1_NAP') {
  warnings.push('GO_BUILD_ONDA_1_NAP registrado; pacote permite build controlado, sem deploy automatico.')
}

if (packageJson.scripts?.['seo:audit:wave1:build-package'] !== 'node scripts/audit-wave1-build-package.mjs') {
  failures.push('package.json sem script seo:audit:wave1:build-package.')
}

console.log('Wave 1 build package audit summary')
console.log(`rows=${csv154.rows.length}`)
console.log(`current_decision=${currentDecision ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 build package warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 build package failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 build package completed.')
