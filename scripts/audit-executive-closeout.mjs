import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  closeoutDoc: `${seoPackage}/ENCERRAMENTO_PARCIAL_DESBLOQUEIO_FINAL_TURNAROUND_BB.md`,
  closeoutCsv: `${seoPackage}/artifacts/seo-ops-022-encerramento-parcial-desbloqueio-final-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  finalUnlockPanel: `${seoPackage}/DESBLOQUEIO_EXECUTIVO_FINAL_TURNAROUND_BB.md`,
  blockersPanel: `${seoPackage}/PAINEL_BLOQUEIOS_GO_NO_GO_TURNAROUND_BB.md`,
  postGoRunbook: `${seoPackage}/RUNBOOK_EXECUCAO_POS_GO_TURNAROUND_BB.md`,
  responsesCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  publicationQueue: `${seoPackage}/artifacts/seo-pub-001-fila-publicacao-controlada-2026-06-15.csv`,
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

const requiredCommands = [
  'npm run seo:audit:turnaround',
  'npm run seo:audit:final-blockers',
  'npm run seo:audit:external-responses',
  'npm run seo:audit:external-next-actions',
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

const closeoutDoc = await readExpectedFile(files.closeoutDoc)
const closeoutCsvSource = await readExpectedFile(files.closeoutCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const finalUnlockPanel = await readExpectedFile(files.finalUnlockPanel)
const blockersPanel = await readExpectedFile(files.blockersPanel)
const postGoRunbook = await readExpectedFile(files.postGoRunbook)
const responsesSource = await readExpectedFile(files.responsesCsv)
const publicationQueueSource = await readExpectedFile(files.publicationQueue)
const readiness = await readExpectedFile(files.readiness)

const backlogRows = parseBacklogRows(backlog)
const openRows = backlogRows.filter((row) => row.status !== 'concluido')
const concludedRows = backlogRows.filter((row) => row.status === 'concluido')
const closeoutCsv = closeoutCsvSource ? parseCsv(closeoutCsvSource) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const pendingResponses = responses.filter((row) => ['pendente', 'recebido_insuficiente'].includes(row.status_resposta))
const publicationQueue = publicationQueueSource ? parseCsv(publicationQueueSource).rows : []
const readinessChecks = countReadinessChecks(readiness)

requireIncludes('Pacote executivo de encerramento parcial', closeoutDoc, [
  'nao esta concluido',
  `${readinessChecks} checks locais`,
  `${openRows.length} itens ainda abertos`,
  '7 bloqueios finais',
  'GO_ONDA_1',
  'GO_NAP_PATCH',
  'GO_GSC_GA4',
  'GO_GBP_AUDIT',
  'GO_GBP_UPDATE',
  'GO_CASES',
  'GO_PRE_CONTATOS_OFFPAGE',
  'GO_CIDADES_CMS',
])

for (const command of requiredCommands) {
  if (!closeoutDoc.includes(command)) {
    failures.push(`Pacote executivo nao lista comando obrigatorio: ${command}`)
  }
}

for (const id of expectedBlockers) {
  for (const [label, source] of [
    ['Pacote executivo', closeoutDoc],
    ['Painel final', finalUnlockPanel],
    ['Painel GO/NO-GO', blockersPanel],
    ['Runbook pos-GO', postGoRunbook],
  ]) {
    if (!source.includes(id)) {
      failures.push(`${label} nao referencia bloqueio final: ${id}`)
    }
  }
}

for (const column of [
  'item_backlog',
  'bloqueio',
  'dono',
  'evidencia_minima',
  'decisao_ou_go',
  'comando_apos_go',
  'status_atual',
]) {
  if (!closeoutCsv.header.includes(column)) {
    failures.push(`CSV de encerramento sem coluna obrigatoria: ${column}`)
  }
}

if (closeoutCsv.rows.length !== expectedBlockers.length) {
  failures.push(`CSV de encerramento deve ter ${expectedBlockers.length} bloqueios finais; encontrado ${closeoutCsv.rows.length}.`)
}

for (const id of expectedBlockers) {
  const row = closeoutCsv.rows.find((item) => item.item_backlog === id)
  if (!row) {
    failures.push(`CSV de encerramento sem linha para ${id}.`)
    continue
  }

  if (!row.evidencia_minima || !row.decisao_ou_go || !row.comando_apos_go || !row.status_atual) {
    failures.push(`CSV de encerramento com campos incompletos para ${id}.`)
  }

  const backlogRow = backlogRows.find((item) => item.id === id)
  if (backlogRow && row.status_atual !== backlogRow.status) {
    failures.push(`CSV de encerramento diverge do backlog em ${id}: ${row.status_atual} vs ${backlogRow.status}.`)
  }
}

if (
  !scorecard.includes(`Itens totais no backlog | ${backlogRows.length}`) ||
  !scorecard.includes(`Concluidos | ${concludedRows.length}`)
) {
  failures.push(`Scorecard deve estar atualizado para ${backlogRows.length} itens totais e ${concludedRows.length} concluidos.`)
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard deve mencionar ${readinessChecks} checks locais apos o pacote de encerramento/follow-up.`)
}

if (openRows.length !== 29) {
  warnings.push(`Quantidade de itens abertos mudou para ${openRows.length}; revisar pacote executivo.`)
}

if (pendingResponses.length !== 3) {
  warnings.push(`Quantidade de respostas externas pendentes mudou para ${pendingResponses.length}; revisar pacote executivo.`)
}

if (publicationQueue.length !== 6) {
  warnings.push(`Fila de publicacao mudou para ${publicationQueue.length} ondas; revisar pacote executivo.`)
}

console.log('Executive closeout audit summary')
console.log(`backlog_items=${backlogRows.length}`)
console.log(`open_items=${openRows.length}`)
console.log(`expected_blockers=${expectedBlockers.length}`)
console.log(`closeout_rows=${closeoutCsv.rows.length}`)
console.log(`pending_responses=${pendingResponses.length}`)
console.log(`publication_waves=${publicationQueue.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExecutive closeout warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExecutive closeout audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExecutive closeout audit completed.')
