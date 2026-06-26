import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const strict = process.argv.includes('--strict')
const failures = []
const warnings = []

const responseRegister =
  '../../Marketing/seo-turnaround-2026-06-12/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv'

const requiredRows = [
  { frente: 'NAP', item: 'SEO-NAP-001' },
  { frente: 'GSC', item: 'SEO-MEAS-001' },
  { frente: 'GBP', item: 'SEO-GBP-001' },
  { frente: 'GBP update', item: 'SEO-GBP-002' },
  { frente: 'Cases', item: 'SEO-IMG-009' },
  { frente: 'Off-page', item: 'SEO-LINK-002' },
  { frente: 'Cidades', item: 'SEO-REG-003' },
]

const requiredColumns = [
  'frente',
  'item_backlog',
  'status_resposta',
  'evidencia_ref',
  'data_resposta',
  'responsavel',
  'go_autorizado',
  'proximo_sprint',
  'observacao',
]

const allowedStatuses = new Set(['pendente', 'recebido_insuficiente', 'validado', 'descartado'])
const allowedGoValues = new Set(['sim', 'nao'])

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
let rows = []
let columns = []

if (source) {
  const parsed = parseCsv(source)
  rows = parsed.rows
  columns = parsed.header

  for (const column of requiredColumns) {
    if (!columns.includes(column)) {
      failures.push(`Registro de respostas sem coluna obrigatoria: ${column}`)
    }
  }

  if (rows.length !== requiredRows.length) {
    failures.push(`Registro deve ter ${requiredRows.length} linhas operacionais; encontrado ${rows.length}.`)
  }

  for (const required of requiredRows) {
    const row = rows.find((item) => item.frente === required.frente && item.item_backlog === required.item)
    if (!row) {
      failures.push(`Registro sem linha para ${required.frente}/${required.item}.`)
      continue
    }

    if (!allowedStatuses.has(row.status_resposta)) {
      failures.push(`Status invalido para ${required.item}: ${row.status_resposta || 'vazio'}.`)
    }

    if (!allowedGoValues.has(row.go_autorizado)) {
      failures.push(`go_autorizado invalido para ${required.item}: ${row.go_autorizado || 'vazio'}.`)
    }

    if (!row.proximo_sprint) {
      failures.push(`Registro sem proximo_sprint para ${required.item}.`)
    }

    const potentiallyUnsafeText = `${row.evidencia_ref ?? ''} ${row.observacao ?? ''}`
    if (/senha|token|chave|secret|password/i.test(potentiallyUnsafeText)) {
      failures.push(`Registro nao deve conter segredo ou referencia a segredo em ${required.item}.`)
    }
  }

  const pendingRows = rows.filter((row) => row.status_resposta === 'pendente')
  const insufficientRows = rows.filter((row) => row.status_resposta === 'recebido_insuficiente')
  const validGoRows = rows.filter((row) => row.status_resposta === 'validado' && row.go_autorizado === 'sim')

  if (pendingRows.length > 0) {
    warnings.push(`Respostas externas pendentes: ${pendingRows.map((row) => row.item_backlog).join(', ')}`)
  }

  if (insufficientRows.length > 0) {
    warnings.push(`Respostas recebidas mas insuficientes: ${insufficientRows.map((row) => row.item_backlog).join(', ')}`)
  }

  if (strict) {
    if (pendingRows.length > 0 || insufficientRows.length > 0) {
      failures.push('Modo strict exige que todas as respostas estejam validado ou descartado.')
    }

    if (validGoRows.length === 0) {
      failures.push('Modo strict exige pelo menos uma frente com status validado e go_autorizado=sim.')
    }
  }
}

console.log('External responses audit summary')
console.log(`mode=${strict ? 'strict' : 'inventory'}`)
console.log(`csv_rows=${rows.length}`)
console.log(`csv_columns=${columns.length}`)
console.log(`required_backlog_items=${requiredRows.length}`)
console.log(`validated_go=${rows.filter((row) => row.status_resposta === 'validado' && row.go_autorizado === 'sim').length}`)
console.log(`pending=${rows.filter((row) => row.status_resposta === 'pendente').length}`)
console.log(`insufficient=${rows.filter((row) => row.status_resposta === 'recebido_insuficiente').length}`)
console.log(`discarded=${rows.filter((row) => row.status_resposta === 'descartado').length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExternal responses audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal responses audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal responses audit completed.')
