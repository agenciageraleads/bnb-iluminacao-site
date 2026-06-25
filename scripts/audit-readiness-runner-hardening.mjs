import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []

const files = {
  doc: `${seoPackage}/SPRINT_128_HARDENING_READINESS_AGREGADO.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_128_HARDENING_READINESS_AGREGADO_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-039-hardening-readiness-agregado-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'gate',
  'risco_anterior',
  'controle_aplicado',
  'evidencia_no_codigo',
  'status',
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

function countReadinessChecks(source) {
  const requiredFilesMatch = source.match(/const requiredFiles = \[([\s\S]*?)\]\n\nconst localAuditScripts/)
  const localScriptsMatch = source.match(/const localAuditScripts = \[([\s\S]*?)\]\n\nfunction runNpmScript/)

  const requiredFiles = requiredFilesMatch?.[1]?.match(/'[^']+'/g)?.length ?? 0
  const localScripts =
    localScriptsMatch?.[1]?.split('\n').filter((line) => line.trim().startsWith("['seo:audit:")).length ?? 0

  return requiredFiles + localScripts
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

const doc = await readExpectedFile(files.doc)
const report = await readExpectedFile(files.report)
const csvSource = await readExpectedFile(files.csv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)
const readinessChecks = countReadinessChecks(readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (csv.rows.length < 5) {
  failures.push(`CSV deve ter ao menos 5 gates de hardening; encontrado ${csv.rows.length}.`)
}

const requiredReadinessSignals = [
  'readFileSync',
  'packageJson.scripts?.[scriptName]',
  'spawnSync(process.execPath, args',
  "spawnSync('npm', ['run', '--silent', scriptName]",
  'timeout: 120000',
  "console.log(`[running] ${label}`)",
  "['seo:audit:readiness-runner-hardening', 'Readiness runner hardening']",
]

for (const signal of requiredReadinessSignals) {
  if (!readiness.includes(signal)) {
    failures.push(`Readiness sem hardening esperado: ${signal}`)
  }
}

for (const term of [
  'npm run aninhado',
  'process.execPath',
  'timeout de 120000 ms',
  'progresso por gate',
  'seo:audit:readiness-runner-hardening',
]) {
  if (!doc.includes(term) && !report.includes(term)) {
    failures.push(`Documentacao do hardening nao menciona: ${term}`)
  }
}

if (!backlog.includes('SEO-OPS-039') || !backlog.includes('hardening readiness agregado')) {
  failures.push('Backlog nao registra SEO-OPS-039.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:readiness-runner-hardening']) {
  failures.push('package.json sem script seo:audit:readiness-runner-hardening.')
}

console.log('Readiness runner hardening audit summary')
console.log(`hardening_rows=${csv.rows.length}`)
console.log(`failures=${failures.length}`)

if (failures.length > 0) {
  console.error('\nReadiness runner hardening audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nReadiness runner hardening audit completed.')
