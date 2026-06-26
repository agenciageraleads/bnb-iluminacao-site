import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  executiveUnlocks: `${seoPackage}/DESBLOQUEIO_EXECUTIVO_FINAL_TURNAROUND_BB.md`,
  masterMatrix: `${seoPackage}/MATRIZ_MESTRA_SPRINTS_RESTANTES_TURNAROUND_BB.md`,
  postGoRunbook: `${seoPackage}/RUNBOOK_EXECUCAO_POS_GO_TURNAROUND_BB.md`,
  externalResponses: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
}

const allowedStatuses = new Set([
  'pendente',
  'em_andamento',
  'bloqueado',
  'em_validacao',
  'pronto_para_publicacao_controlada',
  'concluido',
  'concluido_p0',
  'concluido_codigo_pendente_ga4',
])

const executiveBlockers = [
  'SEO-NAP-001',
  'SEO-MEAS-001',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'SEO-IMG-009',
  'SEO-LINK-002',
  'SEO-REG-003',
]

const postGoSignals = {
  'SEO-NAP-001': 'GO_NAP_PATCH',
  'SEO-MEAS-001': 'GO_GSC_GA4',
  'SEO-GBP-001': 'GO_GBP_AUDIT',
  'SEO-GBP-002': 'GO_GBP_UPDATE',
  'SEO-IMG-009': 'GO_CASES',
  'SEO-LINK-002': 'GO_PRE_CONTATOS_OFFPAGE',
  'SEO-REG-003': 'GO_CIDADES_CMS',
}

const expectedExternalStatuses = new Set(['pendente', 'bloqueado', 'em_validacao', 'concluido'])
const expectedReadyStatus = 'pronto_para_publicacao_controlada'

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
        phase: columns[1],
        priority: columns[2],
        type: columns[3],
        area: columns[4],
        task: columns[5],
        impact: columns[6],
        dependency: columns[7],
        files: columns[8],
        doneCriteria: columns[9],
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
const executiveUnlocks = await readExpectedFile(files.executiveUnlocks)
const masterMatrix = await readExpectedFile(files.masterMatrix)
const postGoRunbook = await readExpectedFile(files.postGoRunbook)
const externalResponses = await readExpectedFile(files.externalResponses)

const rows = parseBacklogRows(backlogSource)
const statusCounts = new Map()

for (const row of rows) {
  if (!allowedStatuses.has(row.status)) {
    failures.push(`Status nao permitido no backlog: ${row.id} -> ${row.status}`)
  }

  statusCounts.set(row.status, (statusCounts.get(row.status) ?? 0) + 1)
}

const activeRows = rows.filter((row) => row.status !== 'concluido')
const executiveRows = rows.filter((row) => executiveBlockers.includes(row.id))
const orphanExecutiveRows = executiveRows.filter((row) => !expectedExternalStatuses.has(row.status))
const readyRows = activeRows.filter((row) => row.status === expectedReadyStatus)
const externalRows = activeRows.filter((row) => ['pendente', 'bloqueado', 'em_validacao'].includes(row.status))
const partialRows = activeRows.filter((row) =>
  ['concluido_p0', 'concluido_codigo_pendente_ga4'].includes(row.status),
)

if (executiveRows.length !== executiveBlockers.length) {
  failures.push(`Backlog deve conter ${executiveBlockers.length} bloqueios executivos; encontrou ${executiveRows.length}.`)
}

for (const row of orphanExecutiveRows) {
  failures.push(`Bloqueio executivo com status inesperado: ${row.id} -> ${row.status}`)
}

for (const id of executiveBlockers) {
  if (!executiveUnlocks.includes(id)) {
    failures.push(`Painel executivo sem item restante: ${id}`)
  }

  if (!masterMatrix.includes(id) && id !== 'SEO-REG-003') {
    warnings.push(`Matriz mestra nao menciona diretamente ${id}; revisar se a dependencia esta indireta.`)
  }

  const goSignal = postGoSignals[id]
  if (!postGoRunbook.includes(goSignal)) {
    failures.push(`Runbook pos-GO sem cenario para ${id}: ${goSignal}`)
  }
}

if (!externalResponses.includes('status_resposta') || !externalResponses.includes('go_autorizado')) {
  failures.push('CSV de respostas externas sem colunas de status/go.')
}

if (activeRows.length !== readyRows.length + externalRows.length + partialRows.length) {
  failures.push('Itens ativos do backlog nao foram totalmente classificados em pronto, externo ou parcial.')
}

if (readyRows.length < 1) {
  warnings.push('Nao ha itens prontos para publicacao controlada; revisar se o projeto mudou de fase.')
}

console.log('Remaining sprints audit summary')
console.log(`backlog_items=${rows.length}`)
console.log(`not_fully_closed=${activeRows.length}`)
console.log(`ready_for_controlled_publication=${readyRows.length}`)
console.log(`external_or_human_dependency=${externalRows.length}`)
console.log(`partial_or_measurement_pending=${partialRows.length}`)
console.log(`executive_blockers=${executiveRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

console.log('\nStatus counts:')
for (const [status, count] of [...statusCounts.entries()].sort(([left], [right]) => left.localeCompare(right))) {
  console.log(`- ${status}: ${count}`)
}

if (warnings.length > 0) {
  console.warn('\nRemaining sprints audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nRemaining sprints audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nRemaining sprints audit completed.')
