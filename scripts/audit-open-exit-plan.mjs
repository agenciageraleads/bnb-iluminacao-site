import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  exitPlanDoc: `${seoPackage}/PLANO_FECHAMENTO_ITENS_ABERTOS_TURNAROUND_BB.md`,
  exitPlanCsv: `${seoPackage}/artifacts/seo-ops-025-plano-fechamento-itens-abertos-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'item_backlog',
  'status_atual',
  'grupo_fechamento',
  'dependencia_para_fechar',
  'acao_quando_liberado',
  'comando_validacao',
  'criterio_conclusao',
]

const expectedGroups = new Set([
  'publicacao_controlada',
  'evidencia_externa_humana',
  'medicao_externa',
  'fechamento_parcial',
])

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
        priority: columns[2],
        type: columns[3],
        area: columns[4],
        status: columns.at(-1),
      }
    })
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

const exitPlanDoc = await readExpectedFile(files.exitPlanDoc)
const exitPlanCsvSource = await readExpectedFile(files.exitPlanCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const readiness = await readExpectedFile(files.readiness)

const exitPlan = exitPlanCsvSource ? parseCsv(exitPlanCsvSource) : { header: [], rows: [] }
const backlogRows = parseBacklogRows(backlog)
const openBacklogRows = backlogRows.filter((row) => row.status !== 'concluido')
const openIds = new Set(openBacklogRows.map((row) => row.id))
const planIds = new Set(exitPlan.rows.map((row) => row.item_backlog))
const readinessChecks = countReadinessChecks(readiness)
const expectedExternalHumanItems = openBacklogRows.filter((row) =>
  ['em_validacao', 'pendente', 'bloqueado'].includes(row.status),
).length

for (const column of requiredColumns) {
  if (!exitPlan.header.includes(column)) {
    failures.push(`CSV de plano de fechamento sem coluna obrigatoria: ${column}`)
  }
}

if (exitPlan.rows.length !== openBacklogRows.length) {
  failures.push(`CSV deve cobrir ${openBacklogRows.length} itens abertos; encontrado ${exitPlan.rows.length}.`)
}

for (const row of openBacklogRows) {
  if (!planIds.has(row.id)) {
    failures.push(`Item aberto sem plano de fechamento: ${row.id}`)
  }
}

for (const row of exitPlan.rows) {
  if (!openIds.has(row.item_backlog)) {
    failures.push(`CSV contem item que nao esta aberto no backlog: ${row.item_backlog}`)
    continue
  }

  const backlogRow = openBacklogRows.find((item) => item.id === row.item_backlog)
  if (backlogRow && row.status_atual !== backlogRow.status) {
    failures.push(`Status divergente para ${row.item_backlog}: CSV=${row.status_atual}; backlog=${backlogRow.status}`)
  }

  if (!expectedGroups.has(row.grupo_fechamento)) {
    failures.push(`Grupo de fechamento invalido em ${row.item_backlog}: ${row.grupo_fechamento}`)
  }

  for (const field of ['dependencia_para_fechar', 'acao_quando_liberado', 'comando_validacao', 'criterio_conclusao']) {
    if (!row[field] || row[field].length < 12) {
      failures.push(`Campo ${field} ausente ou fraco em ${row.item_backlog}.`)
    }
  }
}

for (const term of [
  `${openBacklogRows.length} itens`,
  '21 prontos para publicacao controlada',
  `${expectedExternalHumanItems} dependentes de evidencia humana/externa`,
  'concluido_codigo_pendente_ga4',
  'npm run seo:audit:open-exit-plan',
  'Nao alterar status',
  'Nao publicar sem GO explicito',
]) {
  if (!exitPlanDoc.includes(term)) {
    failures.push(`Plano de fechamento nao menciona: ${term}`)
  }
}

const groupCounts = exitPlan.rows.reduce((counts, row) => {
  counts.set(row.grupo_fechamento, (counts.get(row.grupo_fechamento) ?? 0) + 1)
  return counts
}, new Map())

if (groupCounts.get('publicacao_controlada') !== 21) {
  failures.push(`Esperado 21 itens de publicacao_controlada; encontrado ${groupCounts.get('publicacao_controlada') ?? 0}.`)
}

if (groupCounts.get('evidencia_externa_humana') !== expectedExternalHumanItems) {
  failures.push(
    `Esperado ${expectedExternalHumanItems} itens de evidencia_externa_humana; encontrado ${
      groupCounts.get('evidencia_externa_humana') ?? 0
    }.`,
  )
}

if (groupCounts.get('medicao_externa') !== 2) {
  failures.push(`Esperado 2 itens de medicao_externa; encontrado ${groupCounts.get('medicao_externa') ?? 0}.`)
}

if ((groupCounts.get('fechamento_parcial') ?? 0) !== 0) {
  failures.push(`Esperado 0 itens de fechamento_parcial; encontrado ${groupCounts.get('fechamento_parcial') ?? 0}.`)
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard deve mencionar ${readinessChecks} checks locais.`)
}

if (!scorecard.includes(`Itens totais no backlog | ${backlogRows.length}`)) {
  failures.push(`Scorecard deve mencionar ${backlogRows.length} itens totais.`)
}

if (warnings.length > 0) {
  console.warn('\nOpen exit plan warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

console.log('Open exit plan audit summary')
console.log(`backlog_items=${backlogRows.length}`)
console.log(`open_items=${openBacklogRows.length}`)
console.log(`plan_rows=${exitPlan.rows.length}`)
console.log(`publication_controlled=${groupCounts.get('publicacao_controlada') ?? 0}`)
console.log(`external_or_human=${groupCounts.get('evidencia_externa_humana') ?? 0}`)
console.log(`measurement_external=${groupCounts.get('medicao_externa') ?? 0}`)
console.log(`partial_close=${groupCounts.get('fechamento_parcial') ?? 0}`)
console.log(`readiness_checks=${readinessChecks}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (failures.length > 0) {
  console.error('\nOpen exit plan audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nOpen exit plan audit completed.')
