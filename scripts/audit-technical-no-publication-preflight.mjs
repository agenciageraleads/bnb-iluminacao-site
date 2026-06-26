import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_127T_PREFLIGHT_TECNICO_SEM_PUBLICACAO.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_127T_PREFLIGHT_TECNICO_SEM_PUBLICACAO_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-038-preflight-tecnico-sem-publicacao-2026-06-15.csv`,
  routerCsv: `${seoPackage}/artifacts/seo-ops-037-roteador-pos-decisao-publicacao-2026-06-15.csv`,
  decisionCsv: `${seoPackage}/artifacts/seo-ops-036-registro-decisao-executiva-publicacao-2026-06-15.csv`,
  goNoGoCsv: `${seoPackage}/artifacts/seo-ops-035-go-no-go-publicacao-21-itens-2026-06-15.csv`,
  publicationManifest: `${seoPackage}/MANIFESTO_TECNICO_PUBLICACAO_ITENS_PRONTOS_BB.md`,
  rollback: `${seoPackage}/SPRINT_78_PACOTE_ROLLBACK_ONDA_1.md`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'gate',
  'tipo',
  'comando_ou_arquivo',
  'condicao_para_executar',
  'permitido_agora',
  'proibido',
  'evidencia_minima',
  'status',
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

const doc = await readExpectedFile(files.doc)
const report = await readExpectedFile(files.report)
const csvSource = await readExpectedFile(files.csv)
const routerSource = await readExpectedFile(files.routerCsv)
const decisionSource = await readExpectedFile(files.decisionCsv)
const goNoGoSource = await readExpectedFile(files.goNoGoCsv)
const publicationManifest = await readExpectedFile(files.publicationManifest)
const rollback = await readExpectedFile(files.rollback)
const backlogSource = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)
const readinessChecks = countReadinessChecks(readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const routerRows = routerSource ? parseCsv(routerSource).rows : []
const decisionRows = decisionSource ? parseCsv(decisionSource).rows : []
const goNoGoRows = goNoGoSource ? parseCsv(goNoGoSource).rows : []
const backlogRows = parseBacklogRows(backlogSource)
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (csv.rows.length < 6) {
  failures.push(`CSV deve ter ao menos 6 gates tecnicos; encontrado ${csv.rows.length}.`)
}

const routerRow = routerRows.find((row) => row.decisao === 'GO_TECNICO_SEM_PUBLICACAO')
const decisionRow = decisionRows.find((row) => row.decisao === 'GO_TECNICO_SEM_PUBLICACAO')
const goNoGoRow = goNoGoRows.find((row) => row.decisao === 'GO_TECNICO_SEM_PUBLICACAO')
const chosenRows = decisionRows.filter((row) => row.status_decisao === 'escolhido')
const readyRows = backlogRows.filter((row) => row.status === 'pronto_para_publicacao_controlada')

if (!routerRow) {
  failures.push('Roteador nao possui GO_TECNICO_SEM_PUBLICACAO.')
} else {
  for (const term of [
    'Sprint 126T - preflight tecnico sem publicacao',
    'nao trocar producao',
    'nao executar segredo',
    'nao marcar item como publicado',
    'seo:audit:publication-decision-record:strict',
    'seo:audit:publication-go-nogo-final',
    'seo:audit:turnaround',
  ]) {
    if (!Object.values(routerRow).join(' ').includes(term)) {
      failures.push(`Roteador tecnico sem publicacao nao menciona: ${term}`)
    }
  }
}

if (!decisionRow || !goNoGoRow) {
  failures.push('Registro de decisao ou pacote GO/NO-GO sem linha GO_TECNICO_SEM_PUBLICACAO.')
}

if (chosenRows.length === 0) {
  warnings.push('Nenhuma decisao escolhida; preflight tecnico fica preparado mas nao executavel em modo strict.')
}

if (chosenRows.length > 1) {
  failures.push(`Registro de decisao tem mais de uma escolha: ${chosenRows.length}.`)
}

if (readyRows.length !== 21) {
  failures.push(`Preflight tecnico deve preservar 21 itens prontos para publicacao controlada; encontrado ${readyRows.length}.`)
}

for (const row of csv.rows) {
  if (!['sim', 'nao'].includes(row.permitido_agora)) {
    failures.push(`Gate ${row.gate} deve declarar permitido_agora como sim ou nao.`)
  }

  if (!row.proibido.includes('nao')) {
    failures.push(`Gate ${row.gate} deve declarar acao proibida explicitamente.`)
  }

  if (!row.evidencia_minima || !row.status) {
    failures.push(`Gate ${row.gate} tem evidencia/status incompleto.`)
  }
}

const strictGate = csv.rows.find((row) => row.gate === 'decisao_strict')
if (!strictGate || strictGate.permitido_agora !== 'nao') {
  failures.push('Gate decisao_strict deve existir e estar permitido_agora=nao enquanto nao houver escolha executiva.')
}

for (const term of [
  'sem deploy',
  'sem producao',
  'sem segredo',
  'GO_TECNICO_SEM_PUBLICACAO',
  'nao marcar item como publicado',
  'seo:audit:technical-no-publication-preflight',
]) {
  if (!doc.includes(term) && !report.includes(term)) {
    failures.push(`Documentacao do preflight tecnico nao menciona: ${term}`)
  }
}

for (const term of [
  'MANIFESTO_TECNICO_PUBLICACAO_ITENS_PRONTOS_BB.md',
  '21 itens',
]) {
  if (!publicationManifest.includes(term) && !doc.includes(term)) {
    failures.push(`Manifesto/preflight nao referencia: ${term}`)
  }
}

if (!rollback.includes('rollback') || !doc.includes('rollback')) {
  failures.push('Preflight tecnico deve manter rollback como gate antes de qualquer publicacao futura.')
}

if (!backlogSource.includes('SEO-OPS-038') || !backlogSource.includes('preflight tecnico sem publicacao')) {
  failures.push('Backlog nao registra SEO-OPS-038.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:technical-no-publication-preflight']) {
  failures.push('package.json sem script seo:audit:technical-no-publication-preflight.')
}

if (!readiness.includes("['seo:audit:technical-no-publication-preflight', 'Technical no-publication preflight']")) {
  failures.push('Readiness geral nao inclui Technical no-publication preflight.')
}

console.log('Technical no-publication preflight audit summary')
console.log(`gates=${csv.rows.length}`)
console.log(`chosen_decisions=${chosenRows.length}`)
console.log(`ready_items=${readyRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nTechnical no-publication preflight warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nTechnical no-publication preflight audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nTechnical no-publication preflight audit completed.')
