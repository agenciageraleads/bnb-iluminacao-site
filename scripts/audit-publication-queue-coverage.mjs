import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  publicationGate: `${seoPackage}/GATE_PUBLICACAO_CONTROLADA_SPRINTS_LOCAIS_SEO_BB.md`,
  publicationQueue: `${seoPackage}/artifacts/seo-pub-001-fila-publicacao-controlada-2026-06-15.csv`,
}

const requiredColumns = [
  'onda',
  'sprints',
  'backlog_ids',
  'area',
  'urls_ou_entregaveis',
  'status_atual',
  'pre_deploy_obrigatorio',
  'pos_deploy_obrigatorio',
  'risco',
  'observacoes',
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
  const lines = source.trimEnd().split(/\r?\n/)
  const header = parseCsvLine(lines[0])
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
        area: columns[4],
        files: columns[8],
        status: columns[10],
      }
    })
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

const backlogSource = await readExpectedFile(files.backlog)
const publicationGate = await readExpectedFile(files.publicationGate)
const publicationQueueSource = await readExpectedFile(files.publicationQueue)

const backlogRows = parseBacklogRows(backlogSource)
const readyRows = backlogRows.filter((row) => row.status === 'pronto_para_publicacao_controlada')
const backlogById = new Map(backlogRows.map((row) => [row.id, row]))
const { header, rows: queueRows } = parseCsv(publicationQueueSource)

for (const column of requiredColumns) {
  if (!header.includes(column)) {
    failures.push(`Fila de publicacao sem coluna obrigatoria: ${column}`)
  }
}

const queuedIds = new Set()
const queuedReadyIds = new Set()
const queuedNonReadyIds = []

for (const row of queueRows) {
  for (const id of row.backlog_ids.split(';').map((item) => item.trim()).filter(Boolean)) {
    queuedIds.add(id)
    const backlogItem = backlogById.get(id)

    if (!backlogItem) {
      failures.push(`Fila de publicacao referencia ID inexistente no backlog: ${id}`)
      continue
    }

    if (backlogItem.status === 'pronto_para_publicacao_controlada') {
      queuedReadyIds.add(id)
    } else {
      queuedNonReadyIds.push(`${id}:${backlogItem.status}`)
    }
  }
}

for (const row of readyRows) {
  if (!queuedIds.has(row.id)) {
    failures.push(`Item pronto para publicacao fora da fila controlada: ${row.id}`)
  }

  if (!publicationGate.includes(row.id)) {
    failures.push(`Gate de publicacao nao menciona item pronto: ${row.id}`)
  }
}

if (!publicationGate.includes('seo-pub-001-fila-publicacao-controlada-2026-06-15.csv')) {
  failures.push('Gate de publicacao nao referencia o CSV operacional da fila.')
}

if (!publicationGate.includes('SEO-IMG-009') || !publicationGate.includes('cases')) {
  warnings.push('Gate de publicacao deve manter alerta sobre cases comerciais nao validados.')
}

console.log('Publication queue coverage audit summary')
console.log(`queue_rows=${queueRows.length}`)
console.log(`backlog_ready_items=${readyRows.length}`)
console.log(`queued_ready_items=${queuedReadyIds.size}`)
console.log(`queued_non_ready_refs=${queuedNonReadyIds.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (queuedNonReadyIds.length > 0) {
  console.log('\nNon-ready references kept in queue:')
  for (const item of queuedNonReadyIds) {
    console.log(`- ${item}`)
  }
}

if (warnings.length > 0) {
  console.warn('\nPublication queue coverage warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublication queue coverage audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublication queue coverage audit completed.')
