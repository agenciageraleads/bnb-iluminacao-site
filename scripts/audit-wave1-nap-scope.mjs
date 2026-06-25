import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  decisionCsv: `${seoPackage}/artifacts/seo-ops-036-registro-decisao-executiva-publicacao-2026-06-15.csv`,
  externalResponsesCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  scopeCsv: `${seoPackage}/artifacts/seo-pub-014-escopo-pos-go-onda1-nap-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  sprint137: `${seoPackage}/SPRINT_137_DESBLOQUEIO_EXECUTIVO_NAP_GO_ONDA_1.md`,
  sprint138: `${seoPackage}/SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP.md`,
  report138: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP_2026-06-15.md`,
  approvalPackage: `${seoPackage}/SPRINT_75_PACOTE_APROVACAO_DEPLOY_CONTROLADO.md`,
  goNoGoFinal: `${seoPackage}/SPRINT_80_GO_NO_GO_FINAL_ONDA_1.md`,
  napGovernance: 'src/lib/seo/nap-governance.json',
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

function assertIncludes(source, expected, label) {
  if (!source.includes(expected)) {
    failures.push(`${label} nao contem: ${expected}`)
  }
}

const decisionCsvSource = await readExpectedFile(files.decisionCsv)
const externalResponsesCsvSource = await readExpectedFile(files.externalResponsesCsv)
const scopeCsvSource = await readExpectedFile(files.scopeCsv)
const backlogSource = await readExpectedFile(files.backlog)
const sprint137 = await readExpectedFile(files.sprint137)
const sprint138 = await readExpectedFile(files.sprint138)
const report138 = await readExpectedFile(files.report138)
const approvalPackage = await readExpectedFile(files.approvalPackage)
const goNoGoFinal = await readExpectedFile(files.goNoGoFinal)
const napGovernanceSource = await readExpectedFile(files.napGovernance)

const decisionRows = decisionCsvSource ? parseCsv(decisionCsvSource).rows : []
const externalRows = externalResponsesCsvSource ? parseCsv(externalResponsesCsvSource).rows : []
const scopeRows = scopeCsvSource ? parseCsv(scopeCsvSource).rows : []
const backlogRows = parseBacklogRows(backlogSource)

const chosenGo = decisionRows.find(
  (row) => row.decisao === 'GO_ONDA_1' && row.status_decisao === 'escolhido' && row.go_autorizado === 'sim'
)

if (!chosenGo) {
  failures.push('GO_ONDA_1 precisa estar escolhido e autorizado no registro executivo.')
}

const napResponse = externalRows.find((row) => row.frente === 'NAP' && row.item_backlog === 'SEO-NAP-001')
if (!napResponse || napResponse.status_resposta !== 'validado' || napResponse.go_autorizado !== 'sim') {
  failures.push('NAP precisa estar validado e autorizado no registro de respostas externas.')
}

const napBacklog = backlogRows.find((row) => row.id === 'SEO-NAP-001')
if (!napBacklog || napBacklog.status !== 'concluido') {
  failures.push('SEO-NAP-001 precisa estar concluido no backlog antes do escopo Onda 1 + NAP.')
}

let napGovernance = {}
if (napGovernanceSource) {
  napGovernance = JSON.parse(napGovernanceSource)
}

for (const [key, expected] of [
  ['officialPublicEmail', 'contato@bebiluminacao.com'],
  ['officialPhone', '62 3576-1988'],
  ['officialWhatsapp', '62 3576-1988'],
  ['officialCnpj', '14.401.288/0002-00'],
]) {
  if (napGovernance[key] !== expected) {
    failures.push(`nap-governance.json divergente em ${key}: esperado ${expected}`)
  }
}

for (const signal of ['Rua CV10', 'Residencial Centerville', 'Goiania, GO']) {
  if (!Array.isArray(napGovernance.requiredAddressSignals) || !napGovernance.requiredAddressSignals.includes(signal)) {
    failures.push(`nap-governance.json sem sinal de endereco: ${signal}`)
  }
}

for (const expected of [
  'Onda 1 + NAP oficial',
  'sem deploy automatico',
  'rollback',
  'imagem viva',
  'backup do spec',
  'sem Google Business Profile',
  'sem diretorios definitivos',
  'sem CRM',
  'UF primeiro; cidade so por cluster validado',
]) {
  assertIncludes(sprint138, expected, 'SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP.md')
  assertIncludes(report138, expected, 'RELATORIO_EXECUCAO_SPRINT_138_ESCOPO_POS_GO_ONDA_1_NAP_2026-06-15.md')
}

for (const row of scopeRows) {
  const rowText = Object.values(row).join(' ')
  if (!rowText.includes('sem deploy automatico')) {
    failures.push(`Linha de escopo sem guardrail sem deploy automatico: ${row.item || 'sem item'}`)
  }
}

if (scopeRows.length < 5) {
  failures.push(`CSV de escopo precisa ter pelo menos 5 linhas; encontrado ${scopeRows.length}.`)
}

if (approvalPackage.includes('Fora do escopo: NAP') && !approvalPackage.includes('Addendum Sprint 138 - NAP autorizado')) {
  warnings.push('Pacote Sprint 75 ainda contem frase historica "Fora do escopo: NAP"; Sprint 138 deve prevalecer para este GO.')
}

if (goNoGoFinal.includes('Fora do escopo: NAP') && !goNoGoFinal.includes('Addendum Sprint 138 - NAP autorizado')) {
  warnings.push('Sprint 80 ainda contem frase historica "Fora do escopo: NAP"; Sprint 138 deve prevalecer para este GO.')
}

assertIncludes(sprint137, 'Publicacao: `GO_ONDA_1`', 'SPRINT_137_DESBLOQUEIO_EXECUTIVO_NAP_GO_ONDA_1.md')

console.log('Wave 1 NAP scope audit summary')
console.log(`decision_go=${chosenGo ? 'sim' : 'nao'}`)
console.log(`nap_response=${napResponse?.status_resposta ?? 'ausente'}`)
console.log(`nap_backlog=${napBacklog?.status ?? 'ausente'}`)
console.log(`scope_rows=${scopeRows.length}`)
console.log(`warnings=${warnings.length}`)
console.log(`failures=${failures.length}`)

if (warnings.length > 0) {
  console.warn('\nWave 1 NAP scope warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 NAP scope failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 NAP scope audit completed.')
