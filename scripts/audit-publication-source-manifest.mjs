import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  manifestDoc: `${seoPackage}/MANIFESTO_TECNICO_PUBLICACAO_ITENS_PRONTOS_BB.md`,
  manifestCsv: `${seoPackage}/artifacts/seo-ops-027-manifesto-tecnico-publicacao-2026-06-15.csv`,
  validationCsv: `${seoPackage}/artifacts/seo-ops-026-validacao-publica-pos-publicacao-2026-06-15.csv`,
  publicationQueueCsv: `${seoPackage}/artifacts/seo-pub-001-fila-publicacao-controlada-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'item_backlog',
  'onda',
  'url_ou_entregavel',
  'source_paths',
  'auditoria_pre_publicacao',
  'auditoria_pos_publicacao',
  'status_esperado',
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

function parseBacklogRows(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => line.startsWith('| SEO-'))
    .map((line) => {
      const columns = line
        .split('|')
        .slice(1, -1)
        .map((column) => column.trim())

      return {
        id: columns[0],
        status: columns.at(-1),
      }
    })
}

function parseQueueIds(queueRows) {
  const ids = new Set()

  for (const row of queueRows) {
    if (!row.backlog_ids) continue

    for (const id of row.backlog_ids.split(';').map((item) => item.trim()).filter(Boolean)) {
      ids.add(id)
    }
  }

  return ids
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

const manifestDoc = await readExpectedFile(files.manifestDoc)
const manifestCsvSource = await readExpectedFile(files.manifestCsv)
const validationCsvSource = await readExpectedFile(files.validationCsv)
const publicationQueueSource = await readExpectedFile(files.publicationQueueCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const readiness = await readExpectedFile(files.readiness)

const manifestCsv = manifestCsvSource ? parseCsv(manifestCsvSource) : { header: [], rows: [] }
const validationCsv = validationCsvSource ? parseCsv(validationCsvSource).rows : []
const publicationQueue = publicationQueueSource ? parseCsv(publicationQueueSource).rows : []
const backlogRows = parseBacklogRows(backlog)
const readyRows = backlogRows.filter((row) => row.status === 'pronto_para_publicacao_controlada')
const readyIds = new Set(readyRows.map((row) => row.id))
const manifestIds = new Set(manifestCsv.rows.map((row) => row.item_backlog))
const validationIds = new Set(validationCsv.map((row) => row.item_backlog))
const queueIds = parseQueueIds(publicationQueue)
const readinessChecks = countReadinessChecks(readiness)

for (const column of requiredColumns) {
  if (!manifestCsv.header.includes(column)) {
    failures.push(`CSV de manifesto tecnico sem coluna obrigatoria: ${column}`)
  }
}

if (manifestCsv.rows.length !== readyRows.length) {
  failures.push(`Manifesto deve cobrir ${readyRows.length} itens prontos; encontrado ${manifestCsv.rows.length}.`)
}

for (const row of readyRows) {
  if (!manifestIds.has(row.id)) {
    failures.push(`Item pronto sem manifesto tecnico: ${row.id}`)
  }
}

for (const row of manifestCsv.rows) {
  if (!readyIds.has(row.item_backlog)) {
    failures.push(`Manifesto contem item que nao esta pronto para publicacao controlada: ${row.item_backlog}`)
    continue
  }

  if (!validationIds.has(row.item_backlog)) {
    failures.push(`Item ${row.item_backlog} nao esta coberto pela matriz pos-publicacao.`)
  }

  if (!queueIds.has(row.item_backlog)) {
    failures.push(`Item ${row.item_backlog} nao esta coberto pela fila de publicacao.`)
  }

  if (row.status_esperado !== 'pronto_para_publicacao_controlada') {
    failures.push(`Status esperado invalido em ${row.item_backlog}: ${row.status_esperado}`)
  }

  if (!row.auditoria_pre_publicacao.startsWith('npm run seo:audit:')) {
    failures.push(`Auditoria pre-publicacao invalida em ${row.item_backlog}: ${row.auditoria_pre_publicacao}`)
  }

  if (!row.auditoria_pos_publicacao.includes('npm run seo:audit:')) {
    failures.push(`Auditoria pos-publicacao invalida em ${row.item_backlog}: ${row.auditoria_pos_publicacao}`)
  }

  const sourcePaths = row.source_paths
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)

  if (sourcePaths.length === 0) {
    failures.push(`Item ${row.item_backlog} sem paths de origem.`)
  }

  for (const sourcePath of sourcePaths) {
    const absolutePath = path.resolve(root, sourcePath)
    if (!existsSync(absolutePath)) {
      failures.push(`Path de origem ausente para ${row.item_backlog}: ${sourcePath}`)
    }
  }
}

for (const term of [
  '21 itens',
  'Onda 1',
  'Onda 2',
  'Onda 3',
  'Onda 4',
  'npm run seo:audit:publication-source-manifest',
  'Nao publicar por existir manifesto',
]) {
  if (!manifestDoc.includes(term)) {
    failures.push(`Manifesto tecnico nao menciona: ${term}`)
  }
}

const waveCounts = manifestCsv.rows.reduce((counts, row) => {
  counts.set(row.onda, (counts.get(row.onda) ?? 0) + 1)
  return counts
}, new Map())

if (waveCounts.get('1') !== 5) {
  failures.push(`Esperado 5 itens na Onda 1; encontrado ${waveCounts.get('1') ?? 0}.`)
}

if (waveCounts.get('2') !== 6) {
  failures.push(`Esperado 6 itens na Onda 2; encontrado ${waveCounts.get('2') ?? 0}.`)
}

if (waveCounts.get('3') !== 8) {
  failures.push(`Esperado 8 itens na Onda 3; encontrado ${waveCounts.get('3') ?? 0}.`)
}

if (waveCounts.get('4') !== 2) {
  failures.push(`Esperado 2 itens na Onda 4; encontrado ${waveCounts.get('4') ?? 0}.`)
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard deve mencionar ${readinessChecks} checks locais.`)
}

console.log('Publication source manifest audit summary')
console.log(`backlog_items=${backlogRows.length}`)
console.log(`ready_items=${readyRows.length}`)
console.log(`manifest_rows=${manifestCsv.rows.length}`)
console.log(`validation_rows=${validationCsv.length}`)
console.log(`queue_ids=${queueIds.size}`)
console.log(`wave1=${waveCounts.get('1') ?? 0}`)
console.log(`wave2=${waveCounts.get('2') ?? 0}`)
console.log(`wave3=${waveCounts.get('3') ?? 0}`)
console.log(`wave4=${waveCounts.get('4') ?? 0}`)
console.log(`readiness_checks=${readinessChecks}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPublication source manifest warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublication source manifest audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublication source manifest audit completed.')
