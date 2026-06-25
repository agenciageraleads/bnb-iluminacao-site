import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint146: `${seoPackage}/SPRINT_146_FILA_POS_READINESS_SEM_PRODUCAO.md`,
  report146: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_146_FILA_POS_READINESS_SEM_PRODUCAO_2026-06-15.md`,
  csv146: `${seoPackage}/artifacts/seo-ops-047-fila-pos-readiness-sem-producao-2026-06-15.csv`,
  responses: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
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

const sprint146 = await readExpectedFile(files.sprint146)
const report146 = await readExpectedFile(files.report146)
const csv146Source = await readExpectedFile(files.csv146)
const responsesSource = await readExpectedFile(files.responses)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv146 = csv146Source ? parseCsv(csv146Source) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

const requiredColumns = [
  'frente',
  'item_backlog',
  'status_entrada',
  'decisao_operacional',
  'acao_sem_producao',
  'acao_bloqueada',
  'proximo_gate',
]

for (const column of requiredColumns) {
  if (!csv146.header.includes(column)) {
    failures.push(`CSV Sprint 146 sem coluna obrigatoria: ${column}`)
  }
}

const requiredItems = [
  'SEO-NAP-001',
  'SEO-MEAS-001',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'SEO-IMG-009',
  'SEO-LINK-002',
  'SEO-REG-003',
  'SEO-PUB-ONDA1',
]

for (const item of requiredItems) {
  if (!csv146.rows.some((row) => row.item_backlog === item)) {
    failures.push(`CSV Sprint 146 sem item obrigatorio: ${item}`)
  }
}

const validatedGoRows = responses.filter((row) => row.status_resposta === 'validado' && row.go_autorizado === 'sim')
const insufficientRows = responses.filter((row) => row.status_resposta === 'recebido_insuficiente')

if (validatedGoRows.length !== 4) {
  failures.push(`Registro externo deveria ter 4 GOs validados; encontrado ${validatedGoRows.length}.`)
}

if (insufficientRows.length !== 3) {
  failures.push(`Registro externo deveria ter 3 respostas insuficientes; encontrado ${insufficientRows.length}.`)
}

for (const expected of [
  '4 GOs validados',
  '3 respostas insuficientes',
  'UFs primeiro',
  'conteudo unico',
  'sem producao',
  'sem limpeza',
  'sem build',
  'sem deploy',
  'GO_LIMPEZA_CONTROLADA_VPS',
  'GO_BUILD_ONDA_1_NAP',
]) {
  assertIncludes(sprint146, expected, 'SPRINT_146_FILA_POS_READINESS_SEM_PRODUCAO.md')
}

for (const expected of [
  '4 GOs validados',
  '3 respostas ainda insuficientes',
  'GSC',
  'Cases',
  'Cidades/CMS',
  'sem limpeza VPS',
  'sem build',
  'sem deploy',
]) {
  assertIncludes(report146, expected, 'RELATORIO_EXECUCAO_SPRINT_146_FILA_POS_READINESS_SEM_PRODUCAO_2026-06-15.md')
}

const unsafeText = `${sprint146}\n${report146}\n${csv146Source}`
for (const pattern of [
  /limpeza executada: sim/i,
  /deploy executado/i,
  /build executado/i,
  /service update executado/i,
  /GBP atualizado/i,
  /sitemap enviado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Sprint 146 sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|senha|token/i.test(unsafeText)) {
  failures.push('Sprint 146 nao pode conter segredo ou pedir segredo.')
}

if (packageJson.scripts?.['seo:audit:post-readiness-no-production'] !== 'node scripts/audit-post-readiness-no-production.mjs') {
  failures.push('package.json sem script seo:audit:post-readiness-no-production.')
}

if (!csv146.rows.some((row) => /UFs primeiro/i.test(row.acao_sem_producao))) {
  warnings.push('CSV Sprint 146 deveria deixar a recomendacao regional ainda mais explicita.')
}

console.log('Post-readiness no-production audit summary')
console.log(`rows=${csv146.rows.length}`)
console.log(`validated_go=${validatedGoRows.length}`)
console.log(`insufficient=${insufficientRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPost-readiness no-production warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPost-readiness no-production audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPost-readiness no-production audit completed.')
