import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  finalUnlockPanel: `${seoPackage}/DESBLOQUEIO_EXECUTIVO_FINAL_TURNAROUND_BB.md`,
  blockersPanel: `${seoPackage}/PAINEL_BLOQUEIOS_GO_NO_GO_TURNAROUND_BB.md`,
  postGoRunbook: `${seoPackage}/RUNBOOK_EXECUCAO_POS_GO_TURNAROUND_BB.md`,
  responsesCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  napGovernance: 'src/lib/seo/nap-governance.json',
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

function runNpmScript(scriptName) {
  const result = spawnSync('npm', ['run', scriptName], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 8,
    timeout: 120000,
  })

  return {
    status: result.status,
    output: `${result.stdout || ''}\n${result.stderr || ''}`.trim(),
    error: result.error,
  }
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

function assertExpectedFailure({ label, result, requiredSignals }) {
  if (result.error?.code === 'ETIMEDOUT') {
    failures.push(`${label} excedeu timeout.`)
    return
  }

  if (result.status === 0) {
    failures.push(`${label} passou, mas deveria estar bloqueado ate evidencias externas reais.`)
    return
  }

  for (const signal of requiredSignals) {
    if (!result.output.includes(signal)) {
      failures.push(`${label} falhou sem sinal esperado: ${signal}`)
    }
  }
}

const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const finalUnlockPanel = await readExpectedFile(files.finalUnlockPanel)
const blockersPanel = await readExpectedFile(files.blockersPanel)
const postGoRunbook = await readExpectedFile(files.postGoRunbook)
const responsesSource = await readExpectedFile(files.responsesCsv)
await readExpectedFile(files.napGovernance)

const backlogRows = parseBacklogRows(backlog)
const openRows = backlogRows.filter((row) => row.status !== 'concluido')
const blockerRows = backlogRows.filter((row) => expectedBlockers.includes(row.id))
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const pendingResponses = responses.filter((row) => ['pendente', 'recebido_insuficiente'].includes(row.status_resposta))
const validatedGoRows = responses.filter((row) => row.status_resposta === 'validado' && row.go_autorizado === 'sim')
const scorecardLower = scorecard.toLowerCase()

for (const id of expectedBlockers) {
  const backlogRow = blockerRows.find((row) => row.id === id)
  if (!backlogRow) {
    failures.push(`Backlog sem bloqueio final esperado: ${id}`)
  }

  for (const [label, source] of [
    ['Painel executivo final', finalUnlockPanel],
    ['Painel GO/NO-GO', blockersPanel],
    ['Runbook pos-GO', postGoRunbook],
  ]) {
    if (!source.includes(id)) {
      failures.push(`${label} nao referencia bloqueio final: ${id}`)
    }
  }
}

if (!scorecardLower.includes('projeto ainda nao esta fechado')) {
  failures.push('Scorecard deve afirmar que o projeto ainda nao esta fechado.')
}

if (!scorecard.includes('NAP oficial') || !scorecard.includes('GSC/GA4/GTM') || !scorecard.includes('GBP/diretorios')) {
  failures.push('Scorecard deve listar NAP, GSC/GA4/GTM e GBP/diretorios como bloqueios principais.')
}

if (pendingResponses.length === 0) {
  warnings.push('Nenhuma resposta externa pendente encontrada; strict pode estar pronto para virar GO.')
}

const napStrict = runNpmScript('seo:audit:nap:strict')
if (napStrict.status !== 0) {
  assertExpectedFailure({
    label: 'NAP strict',
    result: napStrict,
    requiredSignals: [
      'Modo strict exige officialPublicEmail',
      'cnpjExposure',
      'requiredAddressSignals',
    ],
  })
}

const externalResponsesStrict = runNpmScript('seo:audit:external-responses:strict')
assertExpectedFailure({
  label: 'External responses strict',
  result: externalResponsesStrict,
  requiredSignals: [
    'Modo strict exige que todas as respostas estejam validado ou descartado',
  ],
})

const completionStrict = runNpmScript('seo:audit:completion:strict')
assertExpectedFailure({
  label: 'Turnaround completion strict',
  result: completionStrict,
  requiredSignals: [
    'Modo strict exige backlog sem itens abertos',
    'Modo strict exige respostas externas validadas ou descartadas',
    'Modo strict exige GO validado',
  ],
})

console.log('Final blockers audit summary')
console.log(`backlog_items=${backlogRows.length}`)
console.log(`open_items=${openRows.length}`)
console.log(`expected_blockers=${expectedBlockers.length}`)
console.log(`blocker_rows=${blockerRows.length}`)
console.log(`pending_responses=${pendingResponses.length}`)
console.log(`validated_go=${validatedGoRows.length}`)
console.log(`nap_strict_status=${napStrict.status ?? 'error'}`)
console.log(`external_responses_strict_status=${externalResponsesStrict.status ?? 'error'}`)
console.log(`completion_strict_status=${completionStrict.status ?? 'error'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nFinal blockers warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nFinal blockers audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nFinal blockers audit completed.')
