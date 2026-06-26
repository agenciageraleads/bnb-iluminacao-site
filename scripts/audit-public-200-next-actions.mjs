import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const expectedItems = new Map([
  ['SEO-ACC-001', '/produtos/suporte-para-luminaria-publica'],
  ['SEO-ACC-002', '/produtos/chumbador-para-poste-metalico'],
  ['SEO-IMG-003', '/obras'],
  ['SEO-GEO-001', '/robots.txt'],
])

const files = {
  doc: `${seoPackage}/FILA_VALIDACAO_ITENS_PUBLICOS_200_BB.md`,
  csv: `${seoPackage}/artifacts/seo-ops-029-fila-validacao-itens-publicos-200-2026-06-15.csv`,
  publicReadonlyCsv: `${seoPackage}/artifacts/seo-ops-028-auditoria-publica-readonly-2026-06-15.csv`,
  postPublicationCsv: `${seoPackage}/artifacts/seo-ops-026-validacao-publica-pos-publicacao-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'item_backlog',
  'target_publico',
  'http_status_publico',
  'status_backlog',
  'por_que_nao_fecha',
  'validacao_pendente',
  'comando_proximo',
  'evidencia_para_concluir',
  'acao_permitida',
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
        status: columns[10],
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

const doc = await readExpectedFile(files.doc)
const csvSource = await readExpectedFile(files.csv)
const publicReadonlySource = await readExpectedFile(files.publicReadonlyCsv)
const postPublicationSource = await readExpectedFile(files.postPublicationCsv)
const backlogSource = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const readiness = await readExpectedFile(files.readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const publicReadonlyRows = publicReadonlySource ? parseCsv(publicReadonlySource).rows : []
const postPublicationRows = postPublicationSource ? parseCsv(postPublicationSource).rows : []
const backlogRows = parseBacklogRows(backlogSource)
const backlogById = new Map(backlogRows.map((row) => [row.id, row]))
const publicReadonlyById = new Map(publicReadonlyRows.map((row) => [row.item_backlog, row]))
const postPublicationIds = new Set(postPublicationRows.map((row) => row.item_backlog))
const readinessChecks = countReadinessChecks(readiness)
const concludedRows = backlogRows.filter((row) => row.status === 'concluido')

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (csv.rows.length !== expectedItems.size) {
  failures.push(`CSV deve conter ${expectedItems.size} itens publicos 200; encontrado ${csv.rows.length}.`)
}

for (const [itemId, target] of expectedItems) {
  const row = csv.rows.find((candidate) => candidate.item_backlog === itemId)
  const backlogRow = backlogById.get(itemId)
  const publicReadonlyRow = publicReadonlyById.get(itemId)

  if (!row) {
    failures.push(`Item publico 200 ausente da fila: ${itemId}`)
    continue
  }

  if (row.target_publico !== target) {
    failures.push(`Target divergente em ${itemId}: esperado ${target}, encontrado ${row.target_publico}`)
  }

  if (row.http_status_publico !== '200') {
    failures.push(`Item ${itemId} deve registrar http_status_publico=200.`)
  }

  if (row.status_backlog !== 'pronto_para_publicacao_controlada') {
    failures.push(`Item ${itemId} deve permanecer como pronto_para_publicacao_controlada na fila.`)
  }

  if (!backlogRow) {
    failures.push(`Item ${itemId} nao existe no backlog.`)
  } else if (backlogRow.status !== row.status_backlog) {
    failures.push(`Status do backlog diverge da fila em ${itemId}: ${backlogRow.status} vs ${row.status_backlog}`)
  }

  if (!publicReadonlyRow) {
    failures.push(`Item ${itemId} nao aparece na auditoria publica read-only.`)
  } else if (!publicReadonlyRow.targets_publicos.split(';').map((item) => item.trim()).includes(target)) {
    failures.push(`Auditoria publica read-only nao cobre o target ${target} em ${itemId}.`)
  }

  if (!postPublicationIds.has(itemId)) {
    failures.push(`Item ${itemId} nao esta coberto pela validacao pos-publicacao.`)
  }

  for (const field of ['por_que_nao_fecha', 'validacao_pendente', 'comando_proximo', 'evidencia_para_concluir']) {
    if (!row[field] || row[field].length < 12) {
      failures.push(`Campo ${field} ausente ou fraco em ${itemId}.`)
    }
  }

  if (!row.acao_permitida.toLowerCase().includes('manter aberto')) {
    failures.push(`Item ${itemId} deve orientar manter aberto ate validacao.`)
  }
}

for (const row of csv.rows) {
  if (!expectedItems.has(row.item_backlog)) {
    failures.push(`CSV contem item inesperado: ${row.item_backlog}`)
  }
}

for (const term of [
  '200 nao significa concluido',
  'npm run seo:audit:public-readonly-coverage',
  'npm run seo:audit:public-200-next-actions',
  'Nao alterar status',
  'GSC',
  'GA4/GTM',
]) {
  if (!doc.includes(term)) {
    failures.push(`Documento da fila 200 nao menciona: ${term}`)
  }
}

if (!readiness.includes("['seo:audit:public-200-next-actions', 'Public 200 next actions']")) {
  failures.push('Readiness geral nao inclui Public 200 next actions.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona o readiness atual: ${readinessChecks} checks locais.`)
}

if (!scorecard.includes(`| Itens totais no backlog | ${backlogRows.length} |`)) {
  warnings.push(`Scorecard pode nao estar atualizado com ${backlogRows.length} itens totais.`)
}

if (!scorecard.includes(`| Concluidos | ${concludedRows.length} |`)) {
  warnings.push(`Scorecard pode nao estar atualizado com ${concludedRows.length} concluidos.`)
}

console.log('Public 200 next actions audit summary')
console.log(`public_200_candidates=${csv.rows.length}`)
console.log(`expected_candidates=${expectedItems.size}`)
console.log(`readiness_checks=${readinessChecks}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPublic 200 next actions warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublic 200 next actions audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublic 200 next actions audit completed.')
