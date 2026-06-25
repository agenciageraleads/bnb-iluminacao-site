import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint155: `${seoPackage}/SPRINT_155_FILA_SEM_GO_BUILD_SEM_PRODUCAO.md`,
  report155: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_155_FILA_SEM_GO_BUILD_SEM_PRODUCAO_2026-06-15.md`,
  csv155: `${seoPackage}/artifacts/seo-ops-048-fila-sem-go-build-sem-producao-2026-06-15.csv`,
  decisionCsv: `${seoPackage}/artifacts/seo-pub-023-decisao-build-onda1-nap-2026-06-15.csv`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'frente',
  'acao_permitida',
  'artefato_base',
  'gate',
  'acao_bloqueada',
  'criterio_saida',
]

const requiredFronts = [
  'decisao_build_pendente',
  'gbp_readonly',
  'gsc_ga4_gtm_evidencia',
  'offpage_precontatos',
  'cases_comerciais',
  'cidades_cms',
  'scorecard_readiness',
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

const sprint155 = await readExpectedFile(files.sprint155)
const report155 = await readExpectedFile(files.report155)
const csv155Source = await readExpectedFile(files.csv155)
const decisionCsvSource = await readExpectedFile(files.decisionCsv)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv155 = csv155Source ? parseCsv(csv155Source) : { header: [], rows: [] }
const decisionCsv = decisionCsvSource ? parseCsv(decisionCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const currentDecision = decisionCsv.rows.find((row) => row.campo === 'decisao_build')?.valor

for (const column of requiredColumns) {
  if (!csv155.header.includes(column)) {
    failures.push(`CSV Sprint 155 sem coluna obrigatoria: ${column}`)
  }
}

for (const front of requiredFronts) {
  if (!csv155.rows.some((row) => row.frente === front)) {
    failures.push(`CSV Sprint 155 sem frente obrigatoria: ${front}`)
  }
}

if (currentDecision === 'PENDENTE') {
  warnings.push('Decisao de build segue PENDENTE; Sprint 155 continua ativo como fila sem producao.')
} else if (currentDecision === 'GO_BUILD_ONDA_1_NAP') {
  warnings.push('GO_BUILD_ONDA_1_NAP registrado; Sprint 155 passa a ser historico para frentes externas sem producao.')
} else if (currentDecision === 'NO_GO_BUILD') {
  warnings.push('NO_GO_BUILD registrado; Sprint 155 continua valido para fila sem build e sem producao.')
} else {
  failures.push(`Decisao de build invalida para Sprint 155: ${currentDecision ?? 'missing'}`)
}

for (const row of csv155.rows) {
  if (/build|deploy|service update|cadastro definitivo|pagamento|update GBP|enviar sitemap/i.test(row.acao_permitida ?? '')) {
    failures.push(`Acao permitida contem operacao bloqueada em ${row.frente}: ${row.acao_permitida}`)
  }
}

for (const expected of [
  'GO_BUILD_ONDA_1_NAP',
  'NO_GO_BUILD',
  'decisao_build=PENDENTE',
  'sem build',
  'sem deploy',
  'sem producao',
  'GBP',
  'GSC/GA4/GTM',
  'Off-page',
  'Cases',
  'Cidades/CMS',
]) {
  assertIncludes(sprint155, expected, 'SPRINT_155_FILA_SEM_GO_BUILD_SEM_PRODUCAO.md')
}

for (const expected of [
  'decisao de build ainda `PENDENTE`',
  'sem build',
  'sem deploy',
  'sem `docker service update`',
  'rows=7',
  'local_checks=119',
]) {
  assertIncludes(report155, expected, 'RELATORIO_EXECUCAO_SPRINT_155_FILA_SEM_GO_BUILD_SEM_PRODUCAO_2026-06-15.md')
}

const unsafeText = `${sprint155}\n${report155}\n${csv155Source}`
for (const pattern of [
  /build executado: sim/i,
  /deploy executado: sim/i,
  /service update executado: sim/i,
  /GBP atualizado/i,
  /sitemap enviado/i,
  /pagamento aprovado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Sprint 155 sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|senha|token/i.test(unsafeText)) {
  failures.push('Sprint 155 nao pode conter segredo ou pedir segredo.')
}

if (packageJson.scripts?.['seo:audit:no-build-production-queue'] !== 'node scripts/audit-no-build-production-queue.mjs') {
  failures.push('package.json sem script seo:audit:no-build-production-queue.')
}

if (!csv155.rows.some((row) => /UFs primeiro/i.test(row.acao_permitida))) {
  warnings.push('CSV Sprint 155 deveria manter a recomendacao UFs primeiro.')
}

console.log('No-build production queue audit summary')
console.log(`rows=${csv155.rows.length}`)
console.log(`current_decision=${currentDecision ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nNo-build production queue warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nNo-build production queue audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nNo-build production queue audit completed.')
