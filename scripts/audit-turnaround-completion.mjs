import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const strict = process.argv.includes('--strict')
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  externalResponses: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  executiveUnlocks: `${seoPackage}/DESBLOQUEIO_EXECUTIVO_FINAL_TURNAROUND_BB.md`,
  postGoRunbook: `${seoPackage}/RUNBOOK_EXECUCAO_POS_GO_TURNAROUND_BB.md`,
}

const allowedOpenStatuses = new Set([
  'bloqueado',
  'em_validacao',
  'pendente',
  'pronto_para_publicacao_controlada',
  'concluido_p0',
  'concluido_codigo_pendente_ga4',
])

const completionBlockers = [
  'SEO-NAP-001',
  'SEO-MEAS-001',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'SEO-IMG-009',
  'SEO-LINK-002',
  'SEO-REG-003',
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

const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const externalResponses = await readExpectedFile(files.externalResponses)
const executiveUnlocks = await readExpectedFile(files.executiveUnlocks)
const postGoRunbook = await readExpectedFile(files.postGoRunbook)

const backlogRows = parseBacklogRows(backlog)
const openRows = backlogRows.filter((row) => row.status !== 'concluido')
const blockerRows = backlogRows.filter((row) => completionBlockers.includes(row.id))
const invalidOpenRows = openRows.filter((row) => !allowedOpenStatuses.has(row.status))
const responseRows = externalResponses ? parseCsv(externalResponses).rows : []
const validatedGoRows = responseRows.filter((row) => row.status_resposta === 'validado' && row.go_autorizado === 'sim')
const pendingResponseRows = responseRows.filter((row) => ['pendente', 'recebido_insuficiente'].includes(row.status_resposta))
const scorecardLower = scorecard.toLowerCase()

for (const row of invalidOpenRows) {
  failures.push(`Status aberto nao previsto para auditoria de fechamento: ${row.id} -> ${row.status}`)
}

for (const id of completionBlockers) {
  if (!executiveUnlocks.includes(id)) {
    failures.push(`Painel executivo sem bloqueio de fechamento: ${id}`)
  }

  if (!postGoRunbook.includes(id)) {
    failures.push(`Runbook pos-GO nao referencia item de fechamento: ${id}`)
  }
}

if (!scorecardLower.includes('projeto ainda nao esta fechado')) {
  failures.push('Scorecard deve declarar explicitamente que o projeto ainda nao esta fechado.')
}

if (!scorecard.includes('Resultado organico nacional') || !scorecard.includes('90 a 180 dias')) {
  failures.push('Scorecard deve manter maturacao organica nacional como camada de longo prazo.')
}

if (openRows.length > 0) {
  warnings.push(`Backlog ainda tem ${openRows.length} itens nao concluidos.`)
}

if (pendingResponseRows.length > 0) {
  warnings.push(`Respostas externas pendentes ou insuficientes: ${pendingResponseRows.length}.`)
}

if (strict) {
  if (openRows.length > 0) {
    failures.push('Modo strict exige backlog sem itens abertos.')
  }

  if (blockerRows.some((row) => row.status !== 'concluido')) {
    failures.push('Modo strict exige os sete bloqueios executivos concluidos.')
  }

  if (pendingResponseRows.length > 0) {
    failures.push('Modo strict exige respostas externas validadas ou descartadas.')
  }

  if (validatedGoRows.length < completionBlockers.length) {
    failures.push('Modo strict exige GO validado para todas as frentes de fechamento.')
  }
}

console.log('Turnaround completion audit summary')
console.log(`mode=${strict ? 'strict' : 'inventory'}`)
console.log(`backlog_items=${backlogRows.length}`)
console.log(`open_items=${openRows.length}`)
console.log(`completion_blockers=${blockerRows.length}`)
console.log(`validated_go=${validatedGoRows.length}`)
console.log(`pending_or_insufficient_responses=${pendingResponseRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nTurnaround completion audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nTurnaround completion audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nTurnaround completion audit completed.')
