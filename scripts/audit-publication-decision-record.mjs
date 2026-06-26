import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const strict = process.argv.includes('--strict')
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/REGISTRO_DECISAO_EXECUTIVA_PUBLICACAO_BB.md`,
  sprint: `${seoPackage}/SPRINT_124_REGISTRO_DECISAO_EXECUTIVA_PUBLICACAO.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_124_REGISTRO_DECISAO_EXECUTIVA_PUBLICACAO_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-036-registro-decisao-executiva-publicacao-2026-06-15.csv`,
  goNoGoDoc: `${seoPackage}/PACOTE_FINAL_GO_NO_GO_PUBLICACAO_21_ITENS_BB.md`,
  goNoGoCsv: `${seoPackage}/artifacts/seo-ops-035-go-no-go-publicacao-21-itens-2026-06-15.csv`,
  externalResponses: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'decisao',
  'status_decisao',
  'evidencia_ref',
  'data_decisao',
  'responsavel',
  'go_autorizado',
  'escopo_liberado',
  'acao_permitida',
  'acao_proibida',
  'comando_pos_decisao',
  'status_operacional',
]

const requiredDecisionRows = [
  'GO_ONDA_1',
  'GO_21_ITENS_EM_ONDAS',
  'GO_TECNICO_SEM_PUBLICACAO',
  'NO_GO_PUBLICACAO',
]

const allowedStatuses = new Set(['pendente', 'escolhido', 'descartado'])

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
const goNoGoDoc = await readExpectedFile(files.goNoGoDoc)
const goNoGoCsvSource = await readExpectedFile(files.goNoGoCsv)
const externalResponsesSource = await readExpectedFile(files.externalResponses)
const backlogSource = await readExpectedFile(files.backlog)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const goNoGoRows = goNoGoCsvSource ? parseCsv(goNoGoCsvSource).rows : []
const externalResponseRows = externalResponsesSource ? parseCsv(externalResponsesSource).rows : []
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

  if (!goNoGoRows.some((row) => row.decisao === decision)) {
    failures.push(`Pacote GO/NO-GO final nao cobre decisao: ${decision}`)
  }

  if (!goNoGoDoc.includes(decision)) {
    failures.push(`Documento GO/NO-GO final nao menciona decisao: ${decision}`)
  }
}

if (readyRows.length !== 21) {
  failures.push(`Registro de decisao deve operar sobre 21 itens prontos; encontrado ${readyRows.length}.`)
}

const chosenRows = csv.rows.filter((row) => row.status_decisao === 'escolhido')
const discardedRows = csv.rows.filter((row) => row.status_decisao === 'descartado')
const pendingRows = csv.rows.filter((row) => row.status_decisao === 'pendente')

for (const row of csv.rows) {
  if (!allowedStatuses.has(row.status_decisao)) {
    failures.push(`Status de decisao invalido em ${row.decisao}: ${row.status_decisao}`)
  }

  const rowText = Object.values(row).join(' ')
  for (const term of ['sem deploy automatico', 'sem producao automatica', 'nao executar segredo']) {
    if (!rowText.includes(term)) {
      failures.push(`Linha ${row.decisao} nao menciona: ${term}`)
    }
  }

  if (row.status_decisao === 'pendente') {
    if (row.go_autorizado !== 'nao') {
      failures.push(`Decisao pendente nao pode ter go_autorizado diferente de nao: ${row.decisao}`)
    }

    if (row.evidencia_ref || row.data_decisao || row.responsavel) {
      failures.push(`Decisao pendente deve manter evidencia/data/responsavel vazios: ${row.decisao}`)
    }
  }

  if (row.status_decisao === 'escolhido') {
    if (!row.evidencia_ref || !row.data_decisao || !row.responsavel) {
      failures.push(`Decisao escolhida exige evidencia_ref, data_decisao e responsavel: ${row.decisao}`)
    }

    if (!row.comando_pos_decisao.includes('npm run seo:audit:')) {
      failures.push(`Decisao escolhida sem comando pos-decisao auditavel: ${row.decisao}`)
    }
  }
}

if (chosenRows.length > 1) {
  failures.push(`Registro permite no maximo uma decisao escolhida; encontrado ${chosenRows.length}.`)
}

if (chosenRows.length === 0) {
  warnings.push('Nenhuma decisao executiva foi escolhida ainda.')
}

if (strict) {
  if (chosenRows.length !== 1) {
    failures.push('Modo strict exige exatamente uma decisao executiva escolhida.')
  }

  if (discardedRows.length !== requiredDecisionRows.length - 1) {
    failures.push('Modo strict exige que as decisoes nao escolhidas estejam descartadas.')
  }

  if (pendingRows.length > 0) {
    failures.push('Modo strict nao permite decisoes pendentes.')
  }
}

for (const term of [
  'registro auditavel',
  'GO_ONDA_1',
  'GO_21_ITENS_EM_ONDAS',
  'GO_TECNICO_SEM_PUBLICACAO',
  'NO_GO_PUBLICACAO',
  'nao executa deploy',
  'nao altera VPS',
  'nao imprime segredo',
  'modo strict',
]) {
  if (!doc.includes(term)) {
    failures.push(`Registro de decisao nao menciona: ${term}`)
  }
}

if (!sprint.includes('SEO-OPS-036') || !report.includes('SEO-OPS-036')) {
  failures.push('Sprint/relatorio devem referenciar SEO-OPS-036.')
}

if (!report.includes('sem deploy') || !report.includes('sem producao')) {
  failures.push('Relatorio do Sprint 124 deve declarar sem deploy e sem producao.')
}

if (!externalResponseRows.every((row) => row.go_autorizado === 'nao')) {
  warnings.push('Ha resposta externa com GO autorizado; revisar se a decisao de publicacao deve considerar dependencias externas.')
}

if (packageJson.scripts?.['seo:audit:publication-decision-record'] !== 'node scripts/audit-publication-decision-record.mjs') {
  failures.push('package.json sem script seo:audit:publication-decision-record.')
}

if (packageJson.scripts?.['seo:audit:publication-decision-record:strict'] !== 'node scripts/audit-publication-decision-record.mjs --strict') {
  failures.push('package.json sem script seo:audit:publication-decision-record:strict.')
}

if (!readiness.includes("['seo:audit:publication-decision-record', 'Publication decision record']")) {
  failures.push('Readiness geral nao inclui Publication decision record.')
}

console.log('Publication decision record audit summary')
console.log(`mode=${strict ? 'strict' : 'inventory'}`)
console.log(`decision_rows=${csv.rows.length}`)
console.log(`chosen_decisions=${chosenRows.length}`)
console.log(`pending_decisions=${pendingRows.length}`)
console.log(`ready_items=${readyRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPublication decision record warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublication decision record audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublication decision record audit completed.')
