import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  publicationGate: `${seoPackage}/GATE_PUBLICACAO_CONTROLADA_SPRINTS_LOCAIS_SEO_BB.md`,
  publicationQueue: `${seoPackage}/artifacts/seo-pub-001-fila-publicacao-controlada-2026-06-15.csv`,
  sprint31: `${seoPackage}/SPRINT_31_DIRETORIOS_INDUSTRIAIS.md`,
  sprint32: `${seoPackage}/SPRINT_32_ROTINA_RANKING_MENSAL.md`,
  directoriesDoc: `${seoPackage}/DIRETORIOS_INDUSTRIAIS_PRIORITARIOS_SEO_BB.md`,
  directoriesCsv: `${seoPackage}/artifacts/seo-link-001-diretorios-industriais-prioritarios.csv`,
  rankingRunbook: `${seoPackage}/ROTINA_MENSAL_RANKING_SEO_BB.md`,
  rankingScript: `${seoPackage}/scripts/monthly_ranking_monitor.py`,
  rankingKeywords: `${seoPackage}/artifacts/ranking-monitor-keywords-v1.csv`,
  rankingBaseline: `${seoPackage}/artifacts/ranking-baseline-from-serpapi-2026-06-14.csv`,
  rankingSummary: `${seoPackage}/artifacts/ranking-baseline-from-serpapi-2026-06-14.md`,
  authorityAssets: `${seoPackage}/ATIVOS_AUTORIDADE_OFFPAGE_BB.md`,
  authorityResponses: `${seoPackage}/CONTROLE_RESPOSTAS_AUTORIDADE_OFFPAGE_BB.md`,
}

const requiredWaveIds = ['SEO-LINK-001', 'SEO-MEAS-003']

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

function runPythonPlan() {
  return spawnSync('python3', [path.resolve(root, files.rankingScript), 'plan'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 4,
    timeout: 120000,
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

function requireColumns(label, header, columns) {
  for (const column of columns) {
    if (!header.includes(column)) {
      failures.push(`${label} sem coluna obrigatoria: ${column}`)
    }
  }
}

function requireIncludes(label, source, terms) {
  for (const term of terms) {
    if (!source.includes(term)) {
      failures.push(`${label} nao menciona: ${term}`)
    }
  }
}

const publicationGate = await readExpectedFile(files.publicationGate)
const publicationQueueSource = await readExpectedFile(files.publicationQueue)
const sprint31 = await readExpectedFile(files.sprint31)
const sprint32 = await readExpectedFile(files.sprint32)
const directoriesDoc = await readExpectedFile(files.directoriesDoc)
const directoriesSource = await readExpectedFile(files.directoriesCsv)
const rankingRunbook = await readExpectedFile(files.rankingRunbook)
const rankingKeywordsSource = await readExpectedFile(files.rankingKeywords)
const rankingBaselineSource = await readExpectedFile(files.rankingBaseline)
const rankingSummary = await readExpectedFile(files.rankingSummary)
const authorityAssets = await readExpectedFile(files.authorityAssets)
const authorityResponses = await readExpectedFile(files.authorityResponses)

const queueRows = publicationQueueSource ? parseCsv(publicationQueueSource).rows : []
const wave5 = queueRows.find((row) => row.onda === '5')
const wave5Ids = new Set(wave5?.backlog_ids.split(';').map((item) => item.trim()).filter(Boolean) ?? [])

if (!wave5) {
  failures.push('Fila de publicacao sem Onda 5.')
} else {
  for (const id of requiredWaveIds) {
    if (!wave5Ids.has(id)) {
      failures.push(`Onda 5 sem ID obrigatorio: ${id}`)
    }
  }

  if (wave5.status_atual !== 'concluido_com_execucao_externa_pendente') {
    failures.push(`Onda 5 com status inesperado: ${wave5.status_atual}`)
  }

  for (const requiredSignal of ['diretorios', 'ranking']) {
    const rowText = Object.values(wave5).join(' ').toLowerCase()
    if (!rowText.includes(requiredSignal)) {
      failures.push(`Onda 5 nao menciona sinal obrigatorio: ${requiredSignal}`)
    }
  }
}

for (const id of requiredWaveIds) {
  if (!publicationGate.includes(id)) {
    failures.push(`Gate de publicacao nao menciona ID da Onda 5: ${id}`)
  }
}

const directories = directoriesSource ? parseCsv(directoriesSource) : { header: [], rows: [] }
requireColumns('CSV de diretorios', directories.header, [
  'ordem',
  'prioridade',
  'plataforma',
  'tipo',
  'url',
  'acao',
  'status_execucao',
  'assets_minimos',
])

if (directories.rows.length < 10) {
  failures.push(`CSV de diretorios deveria ter pelo menos 10 oportunidades; encontrado ${directories.rows.length}`)
}

const p0Directories = directories.rows.filter((row) => row.prioridade === 'P0')
if (p0Directories.length < 2) {
  failures.push(`CSV de diretorios deveria ter pelo menos 2 oportunidades P0; encontrado ${p0Directories.length}`)
}

const executedDirectories = directories.rows.filter((row) => row.status_execucao !== 'nao_executado')
if (executedDirectories.length > 0) {
  warnings.push(`Existem diretorios com status diferente de nao_executado: ${executedDirectories.length}; validar se houve execucao externa real.`)
}

const rankingKeywords = rankingKeywordsSource ? parseCsv(rankingKeywordsSource) : { header: [], rows: [] }
requireColumns('CSV de ranking mensal', rankingKeywords.header, [
  'priority',
  'cluster',
  'keyword',
  'intent',
  'ideal_page',
  'cadence',
  'engine',
  'location',
])

if (rankingKeywords.rows.length < 50) {
  failures.push(`Plano mensal de ranking deveria ter pelo menos 50 keywords; encontrado ${rankingKeywords.rows.length}`)
}

const p0Keywords = rankingKeywords.rows.filter((row) => row.priority === 'P0')
if (p0Keywords.length < 30) {
  failures.push(`Plano mensal de ranking deveria ter pelo menos 30 keywords P0; encontrado ${p0Keywords.length}`)
}

const rankingBaseline = rankingBaselineSource ? parseCsv(rankingBaselineSource) : { header: [], rows: [] }
requireColumns('Baseline de ranking', rankingBaseline.header, [
  'keyword',
  'location',
  'cluster',
  'priority',
  'bb_found_top20',
  'leading_domain',
  'recommended_action',
])

if (rankingBaseline.rows.length < 30) {
  failures.push(`Baseline deveria ter pelo menos 30 keywords analisadas; encontrado ${rankingBaseline.rows.length}`)
}

const baselineWithBb = rankingBaseline.rows.filter((row) => row.bb_found_top20 === 'yes')
if (baselineWithBb.length > 0) {
  warnings.push(`Baseline mostra B&B no top 20 em ${baselineWithBb.length} keywords; revisar se isso mudou desde a coleta.`)
}

requireIncludes('Sprint 31', sprint31, [
  'sem executar cadastro externo',
  'Nenhum cadastro externo foi executado',
  'Nenhum pagamento',
])

requireIncludes('Sprint 32', sprint32, [
  'sem depender exclusivamente de GSC',
  'Nao foi feita coleta live nova',
  'A primeira coleta mensal live deve acontecer apos publicacao',
])

requireIncludes('Runbook de ranking', rankingRunbook, [
  'monthly_ranking_monitor.py',
  'ranking-monitor-keywords-v1.csv',
  'ranking-baseline-from-serpapi-2026-06-14.csv',
])

requireIncludes('Documento de diretorios', directoriesDoc, ['AECweb', 'QuemFornece', 'ABILUX'])
requireIncludes('Ativos de autoridade', authorityAssets, ['AECweb', 'QuemFornece', 'Portal Metalica'])
requireIncludes('Controle de respostas off-page', authorityResponses, ['status_contato', 'decisao'])
requireIncludes('Resumo baseline ranking', rankingSummary, ['Keywords analisadas', 'Keywords sem B&B no top 20'])

const planResult = runPythonPlan()
const planOutput = `${planResult.stdout || ''}\n${planResult.stderr || ''}`.trim()

if (planResult.status !== 0) {
  failures.push('monthly_ranking_monitor.py plan falhou dentro da auditoria da Onda 5.')
} else if (!planOutput.includes('keywords=58')) {
  failures.push('monthly_ranking_monitor.py plan nao confirmou keywords=58.')
}

console.log('Wave 5 authority and measurement audit summary')
console.log(`directory_opportunities=${directories.rows.length}`)
console.log(`directory_p0=${p0Directories.length}`)
console.log(`ranking_keywords=${rankingKeywords.rows.length}`)
console.log(`ranking_p0_keywords=${p0Keywords.length}`)
console.log(`baseline_keywords=${rankingBaseline.rows.length}`)
console.log(`baseline_bb_top20=${baselineWithBb.length}`)
console.log(`plan_status=${planResult.status ?? 'error'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

for (const line of planOutput.split('\n').filter((item) => item.includes('keywords=') || item.includes('live_collection_'))) {
  console.log(`ranking_plan: ${line}`)
}

if (warnings.length > 0) {
  console.warn('\nWave 5 authority and measurement warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 5 authority and measurement audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 5 authority and measurement audit completed.')
