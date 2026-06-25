import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []
const warnings = []

const responseRegister =
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv'
const backlogFile = '../../Marketing/seo-turnaround-2026-06-12/BACKLOG_SEO_TURNAROUND_BB.md'

const dependencyRules = [
  {
    item: 'SEO-NAP-001',
    blocks: ['SEO-GBP-002'],
  },
  {
    item: 'SEO-GBP-001',
    blocks: ['SEO-GBP-002'],
  },
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

  return rows
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

async function readRegister() {
  const absolutePath = path.resolve(root, responseRegister)

  if (!existsSync(absolutePath)) {
    failures.push(`Registro de respostas ausente: ${responseRegister}`)
    return ''
  }

  try {
    return await readFile(absolutePath, 'utf8')
  } catch {
    failures.push(`Registro de respostas ilegivel: ${responseRegister}`)
    return ''
  }
}

const source = await readRegister()
const backlogSource = await readFile(path.resolve(root, backlogFile), 'utf8')
const rows = source ? parseCsv(source) : []
const byItem = new Map(rows.map((row) => [row.item_backlog, row]))
const backlogStatusById = new Map(parseBacklogRows(backlogSource).map((row) => [row.id, row.status]))

const goRows = rows.filter(
  (row) =>
    row.status_resposta === 'validado' &&
    row.go_autorizado === 'sim' &&
    backlogStatusById.get(row.item_backlog) !== 'concluido',
)
const insufficientRows = rows.filter((row) => row.status_resposta === 'recebido_insuficiente')
const pendingRows = rows.filter((row) => row.status_resposta === 'pendente')
const discardedRows = rows.filter((row) => row.status_resposta === 'descartado')

function isGo(item) {
  const row = byItem.get(item)
  return row?.status_resposta === 'validado' && row?.go_autorizado === 'sim'
}

const dependencyBlocked = []

for (const rule of dependencyRules) {
  for (const blockedItem of rule.blocks) {
    const row = byItem.get(blockedItem)
    if (row?.status_resposta === 'validado' && row?.go_autorizado === 'sim' && !isGo(rule.item)) {
      dependencyBlocked.push(`${blockedItem} exige ${rule.item} validado antes de executar ${row.proximo_sprint}`)
    }
  }
}

if (dependencyBlocked.length > 0) {
  failures.push(...dependencyBlocked)
}

if (goRows.length === 0) {
  warnings.push('Nenhum proximo sprint externo liberado; todas as frentes seguem sem GO validado.')
}

if (insufficientRows.length > 0) {
  warnings.push(`Frentes com resposta insuficiente: ${insufficientRows.map((row) => row.item_backlog).join(', ')}`)
}

const nextActions = goRows.map((row) => ({
  item: row.item_backlog,
  frente: row.frente,
  nextSprint: row.proximo_sprint,
  evidence: row.evidencia_ref || 'sem referencia',
}))

console.log('External next actions audit summary')
console.log(`registered_rows=${rows.length}`)
console.log(`ready_actions=${nextActions.length}`)
console.log(`pending=${pendingRows.length}`)
console.log(`insufficient=${insufficientRows.length}`)
console.log(`discarded=${discardedRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (nextActions.length > 0) {
  console.log('\nReady next actions:')
  for (const action of nextActions) {
    console.log(`- ${action.item} ${action.frente}: ${action.nextSprint} (${action.evidence})`)
  }
}

if (warnings.length > 0) {
  console.warn('\nExternal next actions warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal next actions audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal next actions audit completed.')
