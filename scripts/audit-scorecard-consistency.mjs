import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const statusToScorecardMetric = {
  concluido: 'Concluidos',
  concluido_codigo_pendente_ga4: 'Concluidos com validacao externa pendente',
  concluido_p0: 'Concluido P0 parcial',
  pronto_para_publicacao_controlada: 'Prontos para publicacao controlada',
  em_validacao: 'Em validacao',
  em_andamento: 'Em andamento',
  pendente: 'Pendentes',
  bloqueado: 'Bloqueados',
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

function parseBacklogCounts(source) {
  const counts = new Map()
  let total = 0

  for (const line of source.split(/\r?\n/)) {
    if (!line.startsWith('| SEO-')) continue

    const columns = line
      .split('|')
      .slice(1, -1)
      .map((column) => column.trim())

    const status = columns.at(-1)
    total += 1
    counts.set(status, (counts.get(status) ?? 0) + 1)
  }

  return { total, counts }
}

function parseScorecardNumbers(source) {
  const values = new Map()

  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\| ([^|]+?) \| ([0-9]+) \|$/)
    if (!match) continue

    values.set(match[1].trim(), Number(match[2]))
  }

  return values
}

function countReadinessChecks(source) {
  const requiredFilesMatch = source.match(/const requiredFiles = \[([\s\S]*?)\]\n\nconst localAuditScripts/)
  const localScriptsMatch = source.match(/const localAuditScripts = \[([\s\S]*?)\]\n\nfunction runNpmScript/)

  const requiredFiles = requiredFilesMatch?.[1]?.match(/'[^']+'/g)?.length ?? 0
  const localScripts =
    localScriptsMatch?.[1]?.split('\n').filter((line) => line.trim().startsWith("['seo:audit:")).length ?? 0

  return requiredFiles + localScripts
}

const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const readiness = await readExpectedFile(files.readiness)

const { total, counts } = parseBacklogCounts(backlog)
const scorecardValues = parseScorecardNumbers(scorecard)
const readinessChecks = countReadinessChecks(readiness)

const expectedMetrics = new Map([
  ['Itens totais no backlog', total],
  ...Object.entries(statusToScorecardMetric).map(([status, metric]) => [metric, counts.get(status) ?? 0]),
])

for (const [metric, expectedValue] of expectedMetrics) {
  const scorecardValue = scorecardValues.get(metric)

  if (scorecardValue === undefined) {
    failures.push(`Scorecard sem metrica obrigatoria: ${metric}`)
    continue
  }

  if (scorecardValue !== expectedValue) {
    failures.push(`Scorecard divergente em ${metric}: esperado ${expectedValue}, encontrado ${scorecardValue}`)
  }
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard nao menciona o total atual do readiness: ${readinessChecks} checks locais`)
}

if (!scorecard.includes('Turnaround operacional geral') || !scorecard.match(/\] [0-9]+%/)) {
  warnings.push('Barra geral do scorecard nao foi encontrada no formato esperado.')
}

console.log('Scorecard consistency audit summary')
console.log(`backlog_items=${total}`)
console.log(`scorecard_metrics=${scorecardValues.size}`)
console.log(`readiness_checks=${readinessChecks}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nScorecard consistency audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nScorecard consistency audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nScorecard consistency audit completed.')
