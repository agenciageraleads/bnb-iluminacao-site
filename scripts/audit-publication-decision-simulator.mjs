import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_129_SIMULADOR_DECISAO_PUBLICACAO.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_129_SIMULADOR_DECISAO_PUBLICACAO_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-040-simulador-decisao-publicacao-2026-06-15.csv`,
  routerCsv: `${seoPackage}/artifacts/seo-ops-037-roteador-pos-decisao-publicacao-2026-06-15.csv`,
  decisionCsv: `${seoPackage}/artifacts/seo-ops-036-registro-decisao-executiva-publicacao-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredDecisions = [
  'GO_ONDA_1',
  'GO_21_ITENS_EM_ONDAS',
  'GO_TECNICO_SEM_PUBLICACAO',
  'NO_GO_PUBLICACAO',
]

const requiredColumns = [
  'decisao',
  'simulacao_status',
  'proximo_sprint',
  'comandos_necessarios',
  'comandos_existentes',
  'executa_agora',
  'acao_proibida',
  'evidencia_minima',
  'risco_controlado',
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

function splitCommands(source) {
  return source
    .split(';')
    .map((command) => command.trim())
    .filter(Boolean)
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
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const simulation = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const router = routerSource ? parseCsv(routerSource) : { header: [], rows: [] }
const decisionRegister = decisionSource ? parseCsv(decisionSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const readinessChecks = countReadinessChecks(readiness)

for (const column of requiredColumns) {
  if (!simulation.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (simulation.rows.length !== requiredDecisions.length) {
  failures.push(`CSV deve ter ${requiredDecisions.length} decisoes simuladas; encontrado ${simulation.rows.length}.`)
}

const routerByDecision = new Map(router.rows.map((row) => [row.decisao, row]))
const simulationDecisions = simulation.rows.map((row) => row.decisao)

for (const decision of requiredDecisions) {
  if (!simulationDecisions.includes(decision)) {
    failures.push(`Simulador sem decisao obrigatoria: ${decision}`)
  }

  if (!routerByDecision.has(decision)) {
    failures.push(`Roteador sem decisao obrigatoria: ${decision}`)
  }
}

for (const row of simulation.rows) {
  const routerRow = routerByDecision.get(row.decisao)

  if (!routerRow) continue

  if (row.proximo_sprint !== routerRow.proximo_sprint_permitido) {
    failures.push(`Proximo sprint diverge do roteador em ${row.decisao}.`)
  }

  if (row.executa_agora !== 'nao') {
    failures.push(`Simulador nao pode executar agora: ${row.decisao}`)
  }

  if (!row.simulacao_status.includes('dependente_decisao')) {
    failures.push(`Status da simulacao deve depender de decisao: ${row.decisao}`)
  }

  for (const term of ['nao executar segredo', 'nao executar deploy', 'nao alterar producao']) {
    if (!row.acao_proibida.includes(term)) {
      failures.push(`Acao proibida incompleta em ${row.decisao}: falta ${term}`)
    }
  }

  for (const command of splitCommands(row.comandos_necessarios)) {
    if (!routerRow.comandos_obrigatorios.includes(command)) {
      failures.push(`Comando do simulador nao existe no roteador em ${row.decisao}: ${command}`)
    }

    const scriptMatch = command.match(/^npm run ([^ ]+)$/)
    if (scriptMatch && !packageJson.scripts?.[scriptMatch[1]]) {
      failures.push(`package.json sem script usado no simulador: ${scriptMatch[1]}`)
    }
  }

  if (row.comandos_existentes !== 'sim') {
    failures.push(`Linha deve confirmar comandos existentes: ${row.decisao}`)
  }
}

const chosenDecisions = decisionRegister.filter((row) => row.status_decisao === 'escolhido')
const executableNow = simulation.rows.filter((row) => row.executa_agora !== 'nao')

if (chosenDecisions.length === 0) {
  warnings.push('Nenhuma decisao executiva escolhida; simulador permanece em dry-run.')
}

if (chosenDecisions.length > 1) {
  failures.push(`Registro oficial tem mais de uma decisao escolhida: ${chosenDecisions.length}`)
}

if (!backlog.includes('SEO-OPS-040') || !backlog.includes('simulador decisao publicacao')) {
  failures.push('Backlog nao registra SEO-OPS-040.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:publication-decision-simulator']) {
  failures.push('package.json sem script seo:audit:publication-decision-simulator.')
}

if (!readiness.includes("['seo:audit:publication-decision-simulator', 'Publication decision simulator']")) {
  failures.push('Readiness geral nao inclui Publication decision simulator.')
}

for (const term of [
  'sem deploy',
  'sem producao',
  'sem segredo',
  'nao altera registro oficial',
  'seo:audit:publication-decision-simulator',
]) {
  if (!doc.includes(term) || !report.includes(term)) {
    failures.push(`Documentacao do simulador nao menciona: ${term}`)
  }
}

console.log('Publication decision simulator audit summary')
console.log(`decisions=${simulation.rows.length}`)
console.log(`chosen_decisions=${chosenDecisions.length}`)
console.log(`executable_now=${executableNow.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPublication decision simulator audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublication decision simulator audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublication decision simulator audit completed.')
