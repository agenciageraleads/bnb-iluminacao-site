import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint139: `${seoPackage}/SPRINT_139_VALIDACAO_OPERACIONAL_PRE_PRODUCAO_ONDA_1_NAP.md`,
  report139: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_139_VALIDACAO_OPERACIONAL_PRE_PRODUCAO_ONDA_1_NAP_2026-06-15.md`,
  csv139: `${seoPackage}/artifacts/seo-pub-015-validacao-operacional-pre-producao-onda1-nap-2026-06-15.csv`,
  sprint78: `${seoPackage}/SPRINT_78_PACOTE_ROLLBACK_ONDA_1.md`,
  sprint79: `${seoPackage}/SPRINT_79_EXECUCAO_LOCAL_ONDA_1.md`,
  sprint80: `${seoPackage}/SPRINT_80_GO_NO_GO_FINAL_ONDA_1.md`,
  sprint138: `${seoPackage}/SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP.md`,
  rollbackCsv: `${seoPackage}/artifacts/seo-pub-005-pacote-rollback-onda-1-2026-06-15.csv`,
  localExecutionCsv: `${seoPackage}/artifacts/seo-pub-006-execucao-local-onda-1-2026-06-15.csv`,
  releaseRunbook: 'docs/RUNBOOK_RELEASE.md',
  packageJson: 'package.json',
}

const requiredColumns = [
  'item',
  'frente',
  'status',
  'evidencia_atual',
  'acao_permitida',
  'acao_proibida',
  'comando_readonly_ou_gate',
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

const sprint139 = await readExpectedFile(files.sprint139)
const report139 = await readExpectedFile(files.report139)
const csv139Source = await readExpectedFile(files.csv139)
const sprint78 = await readExpectedFile(files.sprint78)
const sprint79 = await readExpectedFile(files.sprint79)
const sprint80 = await readExpectedFile(files.sprint80)
const sprint138 = await readExpectedFile(files.sprint138)
const rollbackCsvSource = await readExpectedFile(files.rollbackCsv)
const localExecutionCsvSource = await readExpectedFile(files.localExecutionCsv)
const releaseRunbook = await readExpectedFile(files.releaseRunbook)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv139 = csv139Source ? parseCsv(csv139Source) : { header: [], rows: [] }
const rollbackRows = rollbackCsvSource ? parseCsv(rollbackCsvSource).rows : []
const localExecutionRows = localExecutionCsvSource ? parseCsv(localExecutionCsvSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv139.header.includes(column)) {
    failures.push(`CSV pre-producao sem coluna obrigatoria: ${column}`)
  }
}

const requiredItems = [
  'imagem_viva',
  'backup_spec',
  'rollback_real',
  'cms_real',
  'gates_locais',
  'escopo_onda1_nap',
  'disco_vps',
]

for (const item of requiredItems) {
  const row = csv139.rows.find((candidate) => candidate.item === item)

  if (!row) {
    failures.push(`CSV pre-producao sem item: ${item}`)
    continue
  }

  const rowText = Object.values(row).join(' ')
  if (!rowText.includes('sem deploy automatico')) {
    failures.push(`Linha ${item} precisa declarar sem deploy automatico.`)
  }
}

const expectedStatuses = {
  imagem_viva: 'validado_vps_readonly',
  backup_spec: 'validado_vps_backup',
  rollback_real: 'preparado_sem_execucao',
  cms_real: 'validado_vps_readonly',
  disco_vps: 'atencao_operacional',
}

for (const [item, expectedStatus] of Object.entries(expectedStatuses)) {
  const row = csv139.rows.find((candidate) => candidate.item === item)
  if (row && row.status !== expectedStatus) {
    failures.push(`Item ${item} deve estar como ${expectedStatus}; encontrado ${row.status}.`)
  }
}

for (const item of ['gates_locais', 'escopo_onda1_nap']) {
  const row = csv139.rows.find((candidate) => candidate.item === item)
  if (row && row.status !== 'validado_localmente') {
    failures.push(`Item ${item} deve estar validado localmente; encontrado ${row.status}.`)
  }
}

for (const source of [sprint139, report139]) {
  for (const expected of [
    'Onda 1 + NAP oficial',
    'sem deploy automatico',
    'read-only',
    'bnb-site:9fab426',
    'backup do spec salvo',
    'rollback real preparado',
    'CMS/admin',
    'nao publicar',
    'nao trocar servico',
  ]) {
    assertIncludes(source, expected, source === sprint139 ? 'SPRINT_139' : 'RELATORIO_SPRINT_139')
  }
}

for (const expected of [
  'Addendum Sprint 138 - NAP autorizado',
  'Onda 1 + NAP oficial',
  'sem deploy automatico',
]) {
  assertIncludes(sprint78, expected, 'SPRINT_78_PACOTE_ROLLBACK_ONDA_1.md')
  assertIncludes(sprint80, expected, 'SPRINT_80_GO_NO_GO_FINAL_ONDA_1.md')
}

assertIncludes(sprint79, 'validar o CMS real da VPS', 'SPRINT_79_EXECUCAO_LOCAL_ONDA_1.md')
assertIncludes(sprint138, 'Onda 1 + NAP oficial', 'SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP.md')
assertIncludes(report139, 'disco raiz da VPS em 92%', 'RELATORIO_EXECUCAO_SPRINT_139_VALIDACAO_OPERACIONAL_PRE_PRODUCAO_ONDA_1_NAP_2026-06-15.md')
assertIncludes(releaseRunbook, 'Use commit-tagged images', 'docs/RUNBOOK_RELEASE.md')

const rollbackText = rollbackRows.map((row) => Object.values(row).join(' ')).join(' ')
const localExecutionText = localExecutionRows.map((row) => Object.values(row).join(' ')).join(' ')

for (const expected of ['Onda 1 + NAP oficial', 'sem deploy automatico']) {
  assertIncludes(rollbackText, expected, 'seo-pub-005-pacote-rollback-onda-1-2026-06-15.csv')
}

for (const expected of ['wave1:nap-scope', 'NAP strict verde', 'sem deploy automatico']) {
  assertIncludes(localExecutionText, expected, 'seo-pub-006-execucao-local-onda-1-2026-06-15.csv')
}

if (packageJson.scripts?.['seo:audit:wave1:preprod'] !== 'node scripts/audit-wave1-preproduction-readiness.mjs') {
  failures.push('package.json sem script seo:audit:wave1:preprod.')
}

if (csv139.rows.some((row) => /publicado|deploy executado|servico atualizado/i.test(Object.values(row).join(' ')))) {
  failures.push('CSV pre-producao nao pode sugerir que deploy/producao ja foi executado.')
}

if (warnings.length > 0) {
  console.warn('\nWave 1 preproduction readiness warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

console.log('Wave 1 preproduction readiness audit summary')
console.log(`rows=${csv139.rows.length}`)
console.log(`required_items=${requiredItems.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (failures.length > 0) {
  console.error('\nWave 1 preproduction readiness failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 preproduction readiness completed.')
