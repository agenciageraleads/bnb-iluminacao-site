import { readFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_126N_INTAKE_FOTOS_RECENTES_POS_DECISAO.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_126N_INTAKE_FOTOS_RECENTES_POS_DECISAO_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-img-018-intake-fotos-recentes-pos-decisao-2026-06-15.csv`,
  priorCsv: `${seoPackage}/artifacts/seo-img-017-auditoria-fotos-novas-2026-06-15.csv`,
  manifest: 'src/lib/seo/images.ts',
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'item',
  'categoria',
  'source_path',
  'public_path',
  'manifest_key',
  'decisao',
  'pagina_candidata',
  'motivo',
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

async function assertExistingFile(file, label) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`${label} inexistente: ${file}`)
    return
  }

  const stats = await stat(absolutePath)
  if (stats.size <= 10_000) {
    failures.push(`${label} parece vazio ou pequeno demais: ${file}`)
  }
}

const doc = await readExpectedFile(files.doc)
const report = await readExpectedFile(files.report)
const csvSource = await readExpectedFile(files.csv)
const priorCsvSource = await readExpectedFile(files.priorCsv)
const manifest = await readExpectedFile(files.manifest)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)
const readinessChecks = countReadinessChecks(readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const priorRows = priorCsvSource ? parseCsv(priorCsvSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

const publishedRows = csv.rows.filter((row) => row.decisao === 'publicada_no_manifest')
const excludedRows = csv.rows.filter((row) => row.decisao === 'excluida_pipeline_seo')

if (publishedRows.length < 10) {
  failures.push(`CSV deve registrar ao menos 10 imagens recentes publicadas/organizadas; encontrado ${publishedRows.length}.`)
}

if (excludedRows.length < 4) {
  failures.push(`CSV deve registrar ao menos 4 arquivos excluidos do pipeline SEO; encontrado ${excludedRows.length}.`)
}

const priorPublicPaths = new Set(priorRows.map((row) => row.publico_webp).filter(Boolean))

for (const row of publishedRows) {
  await assertExistingFile(`../../Marketing/seo-turnaround-2026-06-12/${row.source_path}`, `Fonte organizada do item ${row.item}`)
  await assertExistingFile(`public${row.public_path}`, `Imagem publica do item ${row.item}`)

  if (!manifest.includes(`${row.manifest_key}: {`)) {
    failures.push(`Manifest sem chave do item ${row.item}: ${row.manifest_key}`)
  }

  if (!manifest.includes(`src: "${row.public_path}"`)) {
    failures.push(`Manifest sem public_path do item ${row.item}: ${row.public_path}`)
  }

  if (!row.pagina_candidata.startsWith('/')) {
    failures.push(`Pagina candidata deve ser rota absoluta no item ${row.item}.`)
  }

  if (
    row.source_path.includes('fotos-originais-2026-06-15') &&
    !priorPublicPaths.has(row.public_path)
  ) {
    failures.push(`Item ${row.item} do lote 2026-06-15 nao esta coberto pelo CSV SEO-IMG-017.`)
  }
}

for (const row of excludedRows) {
  await assertExistingFile(row.source_path, `Arquivo excluido do item ${row.item}`)

  if (row.public_path || row.manifest_key) {
    failures.push(`Arquivo excluido nao deve ter public_path nem manifest_key no item ${row.item}.`)
  }

  if (!/screenshot|material|validacao|artefato/.test(row.motivo)) {
    warnings.push(`Motivo do item excluido ${row.item} poderia explicar melhor o bloqueio editorial.`)
  }
}

const requiredDocSignals = [
  'sem deploy',
  'sem producao',
  'Google Imagens',
  'nao mover originais',
  'seo:audit:recent-image-intake',
]

for (const signal of requiredDocSignals) {
  if (!doc.includes(signal) && !report.includes(signal)) {
    failures.push(`Documentacao do intake nao menciona: ${signal}`)
  }
}

if (!backlog.includes('SEO-IMG-018') || !backlog.includes('intake fotos recentes pos-decisao')) {
  failures.push('Backlog nao registra SEO-IMG-018.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:recent-image-intake']) {
  failures.push('package.json sem script seo:audit:recent-image-intake.')
}

if (!readiness.includes("['seo:audit:recent-image-intake', 'Recent image intake']")) {
  failures.push('Readiness geral nao inclui Recent image intake.')
}

console.log('Recent image intake audit summary')
console.log(`published_or_organized=${publishedRows.length}`)
console.log(`excluded_from_seo_pipeline=${excludedRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nRecent image intake warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nRecent image intake audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nRecent image intake audit completed.')
