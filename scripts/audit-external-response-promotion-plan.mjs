import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  doc: `${seoPackage}/SPRINT_132_PLANO_PROMOCAO_RESPOSTAS_EXTERNAS.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_132_PLANO_PROMOCAO_RESPOSTAS_EXTERNAS_2026-06-15.md`,
  planCsv: `${seoPackage}/artifacts/seo-ops-043-plano-promocao-respostas-externas-2026-06-15.csv`,
  stagingCsv: `${seoPackage}/artifacts/seo-ops-042-staging-respostas-externas-2026-06-15.csv`,
  officialCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  criteriaCsv: `${seoPackage}/artifacts/seo-ops-041-qualidade-evidencias-externas-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredItems = [
  'SEO-NAP-001',
  'SEO-MEAS-001',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'SEO-IMG-009',
  'SEO-LINK-002',
  'SEO-REG-003',
]

const requiredColumns = [
  'frente',
  'item_backlog',
  'campo_staging',
  'campo_registro_oficial',
  'condicao_promocao',
  'revisor_obrigatorio',
  'comandos_pre_promocao',
  'comandos_pos_promocao',
  'rollback',
  'executa_agora',
  'status',
]

const requiredFieldPairs = new Map([
  ['status_rascunho', 'status_resposta'],
  ['evidencia_ref_rascunho', 'evidencia_ref'],
  ['data_rascunho', 'data_resposta'],
  ['responsavel_rascunho', 'responsavel'],
  ['go_sugerido', 'go_autorizado'],
  ['acao_recomendada', 'observacao'],
])

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

function splitCommands(value) {
  return value
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
const planSource = await readExpectedFile(files.planCsv)
const stagingSource = await readExpectedFile(files.stagingCsv)
const officialSource = await readExpectedFile(files.officialCsv)
const criteriaSource = await readExpectedFile(files.criteriaCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const plan = planSource ? parseCsv(planSource) : { header: [], rows: [] }
const staging = stagingSource ? parseCsv(stagingSource) : { header: [], rows: [] }
const official = officialSource ? parseCsv(officialSource) : { header: [], rows: [] }
const criteria = criteriaSource ? parseCsv(criteriaSource) : { rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const readinessChecks = countReadinessChecks(readiness)

for (const column of requiredColumns) {
  if (!plan.header.includes(column)) {
    failures.push(`Plano sem coluna obrigatoria: ${column}`)
  }
}

const expectedRows = requiredItems.length * requiredFieldPairs.size

if (plan.rows.length !== expectedRows) {
  failures.push(`Plano deve ter ${expectedRows} linhas de mapeamento; encontrado ${plan.rows.length}.`)
}

for (const item of requiredItems) {
  if (!staging.rows.some((row) => row.item_backlog === item)) {
    failures.push(`Staging sem item correspondente: ${item}`)
  }

  if (!official.rows.some((row) => row.item_backlog === item)) {
    failures.push(`Registro oficial sem item correspondente: ${item}`)
  }

  if (!criteria.rows.some((row) => row.item_backlog === item)) {
    failures.push(`Criterios sem item correspondente: ${item}`)
  }

  for (const [stagingField, officialField] of requiredFieldPairs) {
    const mapping = plan.rows.find(
      (row) =>
        row.item_backlog === item &&
        row.campo_staging === stagingField &&
        row.campo_registro_oficial === officialField,
    )

    if (!mapping) {
      failures.push(`Plano sem mapeamento ${item}: ${stagingField} -> ${officialField}`)
      continue
    }

    if (mapping.executa_agora !== 'nao') {
      failures.push(`Plano nao pode executar agora em ${item}/${stagingField}.`)
    }

    if (mapping.status !== 'pronto_para_uso') {
      failures.push(`Status do plano deve ser pronto_para_uso em ${item}/${stagingField}.`)
    }

    for (const term of ['pronto_para_promocao', 'promover_para_registro_oficial=sim']) {
      if (!mapping.condicao_promocao.includes(term)) {
        failures.push(`Condicao de promocao incompleta em ${item}/${stagingField}: falta ${term}`)
      }
    }

    if (!mapping.revisor_obrigatorio) {
      failures.push(`Plano sem revisor obrigatorio em ${item}/${stagingField}.`)
    }

    if (!mapping.rollback.includes('restaurar')) {
      failures.push(`Plano sem rollback restauravel em ${item}/${stagingField}.`)
    }

    for (const command of [...splitCommands(mapping.comandos_pre_promocao), ...splitCommands(mapping.comandos_pos_promocao)]) {
      const scriptMatch = command.match(/^npm run ([^ ]+)$/)
      if (!scriptMatch) {
        failures.push(`Comando invalido em ${item}/${stagingField}: ${command}`)
        continue
      }

      if (!packageJson.scripts?.[scriptMatch[1]]) {
        failures.push(`package.json sem script usado no plano: ${scriptMatch[1]}`)
      }
    }
  }
}

const executableRows = plan.rows.filter((row) => row.executa_agora !== 'nao')

if (executableRows.length > 0) {
  failures.push(`Plano possui ${executableRows.length} linhas executaveis agora.`)
}

if (!backlog.includes('SEO-OPS-043') || !backlog.includes('plano promocao respostas externas')) {
  failures.push('Backlog nao registra SEO-OPS-043.')
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona ${readinessChecks} checks locais.`)
}

if (!packageJson.scripts?.['seo:audit:external-response-promotion-plan']) {
  failures.push('package.json sem script seo:audit:external-response-promotion-plan.')
}

if (!readiness.includes("['seo:audit:external-response-promotion-plan', 'External response promotion plan']")) {
  failures.push('Readiness geral nao inclui External response promotion plan.')
}

for (const term of [
  'sem deploy',
  'sem producao',
  'sem segredo',
  'nao altera registro oficial',
  'seo:audit:external-response-promotion-plan',
]) {
  if (!doc.includes(term) || !report.includes(term)) {
    failures.push(`Documentacao do plano de promocao nao menciona: ${term}`)
  }
}

warnings.push('Plano e dry-run: nenhuma linha promove automaticamente o staging para o registro oficial.')

console.log('External response promotion plan audit summary')
console.log(`plan_rows=${plan.rows.length}`)
console.log(`expected_rows=${expectedRows}`)
console.log(`executable_now=${executableRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExternal response promotion plan warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal response promotion plan audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal response promotion plan audit completed.')
