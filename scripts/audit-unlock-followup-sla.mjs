import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  slaDoc: `${seoPackage}/SLA_FOLLOWUP_DESBLOQUEIOS_TURNAROUND_BB.md`,
  slaCsv: `${seoPackage}/artifacts/seo-ops-024-sla-followup-desbloqueios-2026-06-15.csv`,
  ownerBriefs: `${seoPackage}/PACOTE_ACIONAMENTO_DONOS_DESBLOQUEIOS_TURNAROUND_BB.md`,
  responsesCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const expectedBlockers = [
  'SEO-NAP-001',
  'SEO-MEAS-001',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'SEO-IMG-009',
  'SEO-LINK-002',
  'SEO-REG-003',
]

const requiredOwners = [
  'direcao_comercial_administrativo',
  'marketing_administrador_gsc',
  'responsavel_perfil_google',
  'marketing_seo',
  'comercial',
  'seo_dev_cms',
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

function requireIncludes(label, source, terms) {
  for (const term of terms) {
    if (!source.includes(term)) {
      failures.push(`${label} nao menciona: ${term}`)
    }
  }
}

const slaDoc = await readExpectedFile(files.slaDoc)
const slaCsvSource = await readExpectedFile(files.slaCsv)
const ownerBriefs = await readExpectedFile(files.ownerBriefs)
const responsesSource = await readExpectedFile(files.responsesCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const readiness = await readExpectedFile(files.readiness)

const slaCsv = slaCsvSource ? parseCsv(slaCsvSource) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const backlogRows = parseBacklogRows(backlog)
const readinessChecks = countReadinessChecks(readiness)

requireIncludes('SLA de follow-up', slaDoc, [
  'Dia 0',
  'Dia 2',
  'Dia 5',
  'Dia 7',
  'Dia 14',
  'nao envia mensagens',
  'Nao enviar senha',
  'artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv',
  'npm run seo:audit:external-responses',
  'npm run seo:audit:external-next-actions',
  'npm run seo:audit:final-blockers',
  'npm run seo:audit:turnaround',
])

for (const id of expectedBlockers) {
  if (!slaDoc.includes(id)) {
    failures.push(`SLA nao referencia bloqueio final: ${id}`)
  }

  if (!ownerBriefs.includes(id)) {
    failures.push(`Pacote de acionamento nao referencia bloqueio final: ${id}`)
  }
}

for (const owner of requiredOwners) {
  if (!slaDoc.includes(owner) && !slaCsvSource.includes(owner)) {
    failures.push(`SLA/CSV sem dono esperado: ${owner}`)
  }
}

for (const column of [
  'item_backlog',
  'dono',
  'dia_0',
  'dia_2',
  'dia_5',
  'dia_7',
  'dia_14',
  'quando_encerrar',
  'status_atual',
]) {
  if (!slaCsv.header.includes(column)) {
    failures.push(`CSV de SLA sem coluna obrigatoria: ${column}`)
  }
}

if (slaCsv.rows.length !== expectedBlockers.length) {
  failures.push(`CSV de SLA deve ter ${expectedBlockers.length} linhas; encontrado ${slaCsv.rows.length}.`)
}

for (const id of expectedBlockers) {
  const row = slaCsv.rows.find((item) => item.item_backlog === id)
  if (!row) {
    failures.push(`CSV de SLA sem linha para ${id}.`)
    continue
  }

  for (const field of ['dia_0', 'dia_2', 'dia_5', 'dia_7', 'dia_14', 'quando_encerrar']) {
    if (!row[field]) {
      failures.push(`CSV de SLA com campo ${field} vazio para ${id}.`)
    }
  }

  const backlogRow = backlogRows.find((item) => item.id === id)
  if (backlogRow && row.status_atual !== backlogRow.status) {
    failures.push(`CSV de SLA diverge do backlog em ${id}: ${row.status_atual} vs ${backlogRow.status}.`)
  }

  const responseRow = responses.find((item) => item.item_backlog === id)
  if (!responseRow) {
    failures.push(`Registro de respostas externas sem linha para ${id}.`)
  }
}

const unsafePhrases = [
  'mande a senha',
  'envie a senha',
  'manda a senha',
  'cole a senha',
  'envie token',
  'mande token',
  'envie chave',
  'mande chave',
]

for (const phrase of unsafePhrases) {
  if (slaDoc.toLowerCase().includes(phrase)) {
    failures.push(`SLA contem frase insegura: ${phrase}`)
  }
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard deve mencionar ${readinessChecks} checks locais apos o SLA de follow-up.`)
}

if (!scorecard.includes('SLA follow-up dos donos') && !scorecard.includes('SLA/follow-up')) {
  warnings.push('Scorecard nao menciona explicitamente o SLA de follow-up dos donos.')
}

console.log('Unlock follow-up SLA audit summary')
console.log(`expected_blockers=${expectedBlockers.length}`)
console.log(`sla_rows=${slaCsv.rows.length}`)
console.log(`response_rows=${responses.length}`)
console.log(`readiness_checks=${readinessChecks}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nUnlock follow-up SLA warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nUnlock follow-up SLA audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nUnlock follow-up SLA audit completed.')
