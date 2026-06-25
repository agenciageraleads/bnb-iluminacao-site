import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/PACOTE_FINAL_GO_NO_GO_PUBLICACAO_21_ITENS_BB.md`,
  sprint: `${seoPackage}/SPRINT_123_GO_NO_GO_PUBLICACAO_21_ITENS.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_123_GO_NO_GO_PUBLICACAO_21_ITENS_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-035-go-no-go-publicacao-21-itens-2026-06-15.csv`,
  queue: `${seoPackage}/artifacts/seo-pub-001-fila-publicacao-controlada-2026-06-15.csv`,
  validation: `${seoPackage}/artifacts/seo-ops-026-validacao-publica-pos-publicacao-2026-06-15.csv`,
  manifest: `${seoPackage}/artifacts/seo-ops-027-manifesto-tecnico-publicacao-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  executiveDecision: `${seoPackage}/PACOTE_DECISAO_EXECUTIVA_PUBLICACAO_TURNAROUND_BB.md`,
  rollback: `${seoPackage}/SPRINT_78_PACOTE_ROLLBACK_ONDA_1.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'decisao',
  'escopo',
  'ondas_autorizadas',
  'itens_prontos_cobertos',
  'pre_go_obrigatorio',
  'pre_deploy_obrigatorio',
  'pos_deploy_obrigatorio',
  'rollback_obrigatorio',
  'fora_de_escopo',
  'status_operacional',
]

const requiredDecisionRows = [
  'GO_ONDA_1',
  'GO_21_ITENS_EM_ONDAS',
  'GO_TECNICO_SEM_PUBLICACAO',
  'NO_GO_PUBLICACAO',
]

const publishableWaves = new Set(['1', '2', '3', '4'])

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

function splitList(value) {
  return value
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
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
const sprint = await readExpectedFile(files.sprint)
const report = await readExpectedFile(files.report)
const csvSource = await readExpectedFile(files.csv)
const queueSource = await readExpectedFile(files.queue)
const validationSource = await readExpectedFile(files.validation)
const manifestSource = await readExpectedFile(files.manifest)
const backlogSource = await readExpectedFile(files.backlog)
const executiveDecision = await readExpectedFile(files.executiveDecision)
const rollback = await readExpectedFile(files.rollback)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const queueRows = queueSource ? parseCsv(queueSource).rows : []
const validationRows = validationSource ? parseCsv(validationSource).rows : []
const manifestRows = manifestSource ? parseCsv(manifestSource).rows : []
const backlogRows = parseBacklogRows(backlogSource)
const readyRows = backlogRows.filter((row) => row.status === 'pronto_para_publicacao_controlada')
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

for (const decision of requiredDecisionRows) {
  if (!csv.rows.some((row) => row.decisao === decision)) {
    failures.push(`CSV sem decisao obrigatoria: ${decision}`)
  }
}

const queuePublishableIds = new Set()
const queueWaveCounts = new Map()

for (const row of queueRows) {
  if (!publishableWaves.has(row.onda)) continue

  const ids = splitList(row.backlog_ids)
  queueWaveCounts.set(row.onda, ids.length)

  for (const id of ids) {
    queuePublishableIds.add(id)
  }
}

const readyIds = new Set(readyRows.map((row) => row.id))
const validationIds = new Set(validationRows.map((row) => row.item_backlog))
const manifestIds = new Set(manifestRows.map((row) => row.item_backlog))

if (readyRows.length !== 21) {
  failures.push(`Backlog deve manter 21 itens prontos; encontrado ${readyRows.length}.`)
}

if (queuePublishableIds.size !== 21) {
  failures.push(`Ondas 1 a 4 devem cobrir 21 itens; encontrado ${queuePublishableIds.size}.`)
}

for (const countCheck of [
  ['1', 5],
  ['2', 6],
  ['3', 8],
  ['4', 2],
]) {
  const [wave, expectedCount] = countCheck
  if (queueWaveCounts.get(wave) !== expectedCount) {
    failures.push(`Onda ${wave} deve ter ${expectedCount} itens; encontrado ${queueWaveCounts.get(wave) ?? 0}.`)
  }
}

for (const id of queuePublishableIds) {
  if (!readyIds.has(id)) {
    failures.push(`Item da fila final nao esta pronto para publicacao controlada: ${id}`)
  }

  if (!validationIds.has(id)) {
    failures.push(`Item da fila final sem matriz pos-publicacao: ${id}`)
  }

  if (!manifestIds.has(id)) {
    failures.push(`Item da fila final sem manifesto tecnico: ${id}`)
  }
}

for (const row of csv.rows) {
  const rowText = Object.values(row).join(' ')

  for (const requiredTerm of [
    'rollback',
    'smoke publico',
    'GSC',
    'GA4/GTM',
    'sem producao',
  ]) {
    if (!rowText.includes(requiredTerm)) {
      failures.push(`Linha ${row.decisao} nao menciona: ${requiredTerm}`)
    }
  }

  if (row.decisao === 'GO_21_ITENS_EM_ONDAS') {
    if (!row.ondas_autorizadas.includes('1;2;3;4')) {
      failures.push('GO_21_ITENS_EM_ONDAS deve autorizar ondas 1;2;3;4 em sequencia.')
    }

    if (!row.itens_prontos_cobertos.includes('21')) {
      failures.push('GO_21_ITENS_EM_ONDAS deve cobrir 21 itens prontos.')
    }
  }

  if (row.decisao === 'GO_TECNICO_SEM_PUBLICACAO' && !row.status_operacional.includes('nao publica')) {
    failures.push('GO_TECNICO_SEM_PUBLICACAO deve declarar que nao publica.')
  }

  if (row.decisao === 'NO_GO_PUBLICACAO' && !row.status_operacional.includes('manter local')) {
    failures.push('NO_GO_PUBLICACAO deve declarar manter local.')
  }
}

for (const term of [
  '21 itens prontos',
  'GO_ONDA_1',
  'GO_21_ITENS_EM_ONDAS',
  'GO_TECNICO_SEM_PUBLICACAO',
  'NO_GO_PUBLICACAO',
  'Nao autoriza deploy sozinho',
  'rollback',
  'smoke publico',
  'GSC',
  'GA4/GTM',
  'SEO-IMG-009 fica fora',
]) {
  if (!doc.includes(term)) {
    failures.push(`Pacote final GO/NO-GO nao menciona: ${term}`)
  }
}

for (const term of [
  'GO_ONDA_1',
  'GO_TECNICO_SEM_PUBLICACAO',
  'NO_GO_PUBLICACAO',
]) {
  if (!executiveDecision.includes(term)) {
    failures.push(`Pacote executivo anterior sem decisao base: ${term}`)
  }
}

if (!rollback.includes('rollback') || !rollback.includes('imagem viva')) {
  failures.push('Pacote de rollback da Onda 1 deve continuar disponivel como gate.')
}

if (!sprint.includes('SEO-OPS-035') || !report.includes('SEO-OPS-035')) {
  failures.push('Sprint/relatorio devem referenciar SEO-OPS-035.')
}

if (!report.includes('sem producao') || !report.includes('sem deploy')) {
  failures.push('Relatorio do Sprint 123 deve declarar sem producao e sem deploy.')
}

if (packageJson.scripts?.['seo:audit:publication-go-nogo-final'] !== 'node scripts/audit-publication-go-nogo-final.mjs') {
  failures.push('package.json sem script seo:audit:publication-go-nogo-final.')
}

if (!readiness.includes("['seo:audit:publication-go-nogo-final', 'Publication GO/NO-GO final']")) {
  failures.push('Readiness geral nao inclui Publication GO/NO-GO final.')
}

console.log('Publication GO/NO-GO final audit summary')
console.log(`ready_items=${readyRows.length}`)
console.log(`publishable_wave_items=${queuePublishableIds.size}`)
console.log(`decision_rows=${csv.rows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPublication GO/NO-GO final warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublication GO/NO-GO final audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublication GO/NO-GO final audit completed.')
