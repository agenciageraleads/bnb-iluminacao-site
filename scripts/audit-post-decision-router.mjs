import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const strict = process.argv.includes('--strict')
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/ROTEADOR_POS_DECISAO_PUBLICACAO_BB.md`,
  sprint: `${seoPackage}/SPRINT_125_ROTEADOR_POS_DECISAO_PUBLICACAO.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_125_ROTEADOR_POS_DECISAO_PUBLICACAO_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-037-roteador-pos-decisao-publicacao-2026-06-15.csv`,
  decisionRegister: `${seoPackage}/artifacts/seo-ops-036-registro-decisao-executiva-publicacao-2026-06-15.csv`,
  goNoGoCsv: `${seoPackage}/artifacts/seo-ops-035-go-no-go-publicacao-21-itens-2026-06-15.csv`,
  postGoRunbook: `${seoPackage}/RUNBOOK_EXECUCAO_POS_GO_TURNAROUND_BB.md`,
  rollback: `${seoPackage}/SPRINT_78_PACOTE_ROLLBACK_ONDA_1.md`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'decisao',
  'condicao_entrada',
  'proximo_sprint_permitido',
  'acao_permitida',
  'acao_proibida',
  'comandos_obrigatorios',
  'evidencia_minima',
  'status_quando_pendente',
]

const expectedRoutes = {
  GO_ONDA_1: {
    nextSprint: 'Sprint 126 - preflight operacional Onda 1',
    requiredCommands: ['seo:audit:publication-decision-record:strict', 'seo:audit:wave1', 'seo:audit:wave1:deploy', 'seo:audit:turnaround'],
  },
  GO_21_ITENS_EM_ONDAS: {
    nextSprint: 'Sprint 126 - preflight operacional Onda 1',
    requiredCommands: [
      'seo:audit:publication-decision-record:strict',
      'seo:audit:publication-go-nogo-final',
      'seo:audit:publication-source-manifest',
      'seo:audit:turnaround',
    ],
  },
  GO_TECNICO_SEM_PUBLICACAO: {
    nextSprint: 'Sprint 126T - preflight tecnico sem publicacao',
    requiredCommands: ['seo:audit:publication-decision-record:strict', 'seo:audit:publication-go-nogo-final', 'seo:audit:turnaround'],
  },
  NO_GO_PUBLICACAO: {
    nextSprint: 'Sprint 126N - manutencao local e bloqueios externos',
    requiredCommands: ['seo:audit:publication-decision-record:strict', 'seo:audit:completion', 'seo:audit:turnaround'],
  },
}

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
const decisionSource = await readExpectedFile(files.decisionRegister)
const goNoGoSource = await readExpectedFile(files.goNoGoCsv)
const postGoRunbook = await readExpectedFile(files.postGoRunbook)
const rollback = await readExpectedFile(files.rollback)
const backlogSource = await readExpectedFile(files.backlog)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const decisionRows = decisionSource ? parseCsv(decisionSource).rows : []
const goNoGoRows = goNoGoSource ? parseCsv(goNoGoSource).rows : []
const backlogRows = parseBacklogRows(backlogSource)
const readyRows = backlogRows.filter((row) => row.status === 'pronto_para_publicacao_controlada')
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

for (const [decision, expected] of Object.entries(expectedRoutes)) {
  const route = csv.rows.find((row) => row.decisao === decision)
  const decisionRegisterRow = decisionRows.find((row) => row.decisao === decision)
  const goNoGoRow = goNoGoRows.find((row) => row.decisao === decision)

  if (!route) {
    failures.push(`Roteador sem decisao obrigatoria: ${decision}`)
    continue
  }

  if (!decisionRegisterRow) {
    failures.push(`Registro de decisao sem linha: ${decision}`)
  }

  if (!goNoGoRow) {
    failures.push(`Pacote GO/NO-GO sem linha: ${decision}`)
  }

  if (route.proximo_sprint_permitido !== expected.nextSprint) {
    failures.push(`Proximo sprint divergente para ${decision}: esperado ${expected.nextSprint}, encontrado ${route.proximo_sprint_permitido}`)
  }

  for (const command of expected.requiredCommands) {
    if (!route.comandos_obrigatorios.includes(command)) {
      failures.push(`Roteador ${decision} nao exige comando: ${command}`)
    }
  }

  const routeText = Object.values(route).join(' ')
  for (const term of ['sem execucao automatica', 'sem segredo', 'sem deploy automatico']) {
    if (!routeText.includes(term)) {
      failures.push(`Roteador ${decision} nao menciona: ${term}`)
    }
  }
}

const chosenRows = decisionRows.filter((row) => row.status_decisao === 'escolhido')
const pendingRows = decisionRows.filter((row) => row.status_decisao === 'pendente')

if (readyRows.length !== 21) {
  failures.push(`Roteador deve operar sobre 21 itens prontos; encontrado ${readyRows.length}.`)
}

if (chosenRows.length > 1) {
  failures.push(`Registro de decisao permite no maximo uma escolha; encontrado ${chosenRows.length}.`)
}

if (chosenRows.length === 0) {
  warnings.push('Nenhuma decisao executiva escolhida; roteador permanece em modo pendente.')
}

if (strict && chosenRows.length !== 1) {
  failures.push('Modo strict exige exatamente uma decisao escolhida antes de liberar proximo sprint.')
}

if (chosenRows.length === 1) {
  const decision = chosenRows[0].decisao
  const route = csv.rows.find((row) => row.decisao === decision)

  if (!route) {
    failures.push(`Decisao escolhida sem rota: ${decision}`)
  } else if (route.status_quando_pendente !== 'aguarda escolha executiva') {
    failures.push(`Rota ${decision} deve manter status pendente padronizado ate execucao.`)
  }
}

if (pendingRows.length === 4 && !csv.rows.every((row) => row.status_quando_pendente === 'aguarda escolha executiva')) {
  failures.push('Com todas decisoes pendentes, todas as rotas devem declarar aguarda escolha executiva.')
}

for (const term of [
  'GO_NAP_PATCH',
  'GO_GSC_GA4',
  'GO_GBP_AUDIT',
  'GO_CASES',
  'GO_PRE_CONTATOS_OFFPAGE',
]) {
  if (!postGoRunbook.includes(term)) {
    failures.push(`Runbook pos-GO perdeu referencia externa: ${term}`)
  }
}

if (!rollback.includes('imagem viva') || !rollback.includes('rollback')) {
  failures.push('Pacote de rollback deve continuar disponivel para rotas de publicacao.')
}

for (const term of [
  'roteador pos-decisao',
  'nao executa deploy',
  'sem execucao automatica',
  'GO_ONDA_1',
  'GO_21_ITENS_EM_ONDAS',
  'GO_TECNICO_SEM_PUBLICACAO',
  'NO_GO_PUBLICACAO',
  'modo strict',
]) {
  if (!doc.includes(term)) {
    failures.push(`Documento do roteador nao menciona: ${term}`)
  }
}

if (!sprint.includes('SEO-OPS-037') || !report.includes('SEO-OPS-037')) {
  failures.push('Sprint/relatorio devem referenciar SEO-OPS-037.')
}

if (!report.includes('sem deploy') || !report.includes('sem producao')) {
  failures.push('Relatorio do Sprint 125 deve declarar sem deploy e sem producao.')
}

if (packageJson.scripts?.['seo:audit:post-decision-router'] !== 'node scripts/audit-post-decision-router.mjs') {
  failures.push('package.json sem script seo:audit:post-decision-router.')
}

if (packageJson.scripts?.['seo:audit:post-decision-router:strict'] !== 'node scripts/audit-post-decision-router.mjs --strict') {
  failures.push('package.json sem script seo:audit:post-decision-router:strict.')
}

if (!readiness.includes("['seo:audit:post-decision-router', 'Post-decision router']")) {
  failures.push('Readiness geral nao inclui Post-decision router.')
}

console.log('Post-decision router audit summary')
console.log(`mode=${strict ? 'strict' : 'inventory'}`)
console.log(`routes=${csv.rows.length}`)
console.log(`chosen_decisions=${chosenRows.length}`)
console.log(`pending_decisions=${pendingRows.length}`)
console.log(`ready_items=${readyRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPost-decision router warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPost-decision router audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPost-decision router audit completed.')
