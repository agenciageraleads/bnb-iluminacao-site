import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const expectedItem = {
  id: 'SEO-GEO-001',
  target: '/robots.txt',
  sourceLocal: 'src/app/robots.ts',
}

const requiredSearchBots = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'OAI-AdsBot',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
]

const requiredTrainingBlocks = [
  'GPTBot',
  'Google-Extended',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
]

const files = {
  doc: `${seoPackage}/PACOTE_DECISAO_CLOUDFLARE_GEO_BB.md`,
  sprint: `${seoPackage}/SPRINT_122_DECISAO_CLOUDFLARE_GEO_ROBOTS.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_122_DECISAO_CLOUDFLARE_GEO_ROBOTS_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-ops-034-decisao-cloudflare-geo-robots-2026-06-15.csv`,
  correctionPackageCsv: `${seoPackage}/artifacts/seo-ops-031-pacote-correcao-publicacao-itens-200-2026-06-15.csv`,
  deepAuditCsv: `${seoPackage}/artifacts/seo-ops-030-auditoria-profunda-publica-itens-200-2026-06-15.csv`,
  public200Csv: `${seoPackage}/artifacts/seo-ops-029-fila-validacao-itens-publicos-200-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  robots: expectedItem.sourceLocal,
  robotsAudit: 'scripts/audit-robots-geo.mjs',
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'item_backlog',
  'target_publico',
  'source_local',
  'surface_externa',
  'politica_local',
  'achado_publico',
  'decisao_requerida',
  'acao_permitida_sem_acesso',
  'acao_proibida_sem_go',
  'comandos_pre_go',
  'evidencia_para_fechar',
  'status_operacional',
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
        status: columns[10],
      }
    })
}

function extractArray(source, name) {
  const match = source.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\]`))

  if (!match) {
    failures.push(`Array ausente em robots.ts: ${name}`)
    return []
  }

  return [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1])
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
const correctionPackageSource = await readExpectedFile(files.correctionPackageCsv)
const deepAuditSource = await readExpectedFile(files.deepAuditCsv)
const public200Source = await readExpectedFile(files.public200Csv)
const backlogSource = await readExpectedFile(files.backlog)
const robots = await readExpectedFile(files.robots)
const robotsAudit = await readExpectedFile(files.robotsAudit)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const correctionRows = correctionPackageSource ? parseCsv(correctionPackageSource).rows : []
const deepAuditRows = deepAuditSource ? parseCsv(deepAuditSource).rows : []
const public200Rows = public200Source ? parseCsv(public200Source).rows : []
const backlogRows = parseBacklogRows(backlogSource)
const backlogById = new Map(backlogRows.map((row) => [row.id, row]))
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (csv.rows.length !== 1) {
  failures.push(`CSV deve conter 1 linha; encontrado ${csv.rows.length}.`)
}

const row = csv.rows.find((candidate) => candidate.item_backlog === expectedItem.id)
const backlogRow = backlogById.get(expectedItem.id)
const correctionRow = correctionRows.find((candidate) => candidate.item_backlog === expectedItem.id)
const deepAuditRow = deepAuditRows.find((candidate) => candidate.item_backlog === expectedItem.id)
const public200Row = public200Rows.find((candidate) => candidate.item_backlog === expectedItem.id)

if (!row) {
  failures.push(`Item ausente do CSV de decisao Cloudflare/GEO: ${expectedItem.id}`)
} else {
  if (row.target_publico !== expectedItem.target) {
    failures.push(`Target publico divergente: esperado ${expectedItem.target}, encontrado ${row.target_publico}`)
  }

  if (row.source_local !== expectedItem.sourceLocal) {
    failures.push(`Source local divergente: esperado ${expectedItem.sourceLocal}, encontrado ${row.source_local}`)
  }

  for (const requiredTerm of [
    'Cloudflare Managed Content',
    'busca/citacao permitida',
    'treino/dataset bloqueado',
    'conflito_cloudflare_local',
    'GO_DECISAO_GEO_CLOUDFLARE',
    'nao alterar Cloudflare',
    'robots publico sem conflito',
  ]) {
    const rowText = Object.values(row).join(' ')
    if (!rowText.includes(requiredTerm)) {
      failures.push(`CSV de ${expectedItem.id} nao menciona: ${requiredTerm}`)
    }
  }
}

if (!backlogRow) {
  failures.push(`Item ${expectedItem.id} nao existe no backlog.`)
} else if (backlogRow.status !== 'pronto_para_publicacao_controlada') {
  failures.push(`Item ${expectedItem.id} deve continuar pronto_para_publicacao_controlada; atual ${backlogRow.status}`)
}

if (!public200Row) {
  failures.push(`${expectedItem.id} nao esta na fila publica 200.`)
}

if (!deepAuditRow) {
  failures.push(`${expectedItem.id} nao esta na auditoria profunda publica 200.`)
} else if (deepAuditRow.robots_status !== 'conflito_cloudflare_local') {
  failures.push(`${expectedItem.id} deve registrar conflito_cloudflare_local na auditoria profunda.`)
}

if (!correctionRow) {
  failures.push(`${expectedItem.id} nao esta no pacote de correcao 200.`)
} else {
  if (correctionRow.patch_local_permitido !== 'nao') {
    failures.push(`${expectedItem.id} nao deve permitir patch local no pacote de correcao.`)
  }

  if (!correctionRow.dependencia_externa.toLowerCase().includes('cloudflare')) {
    failures.push(`${expectedItem.id} deve declarar dependencia Cloudflare no pacote de correcao.`)
  }
}

const searchBots = extractArray(robots, 'aiSearchAndReferralBots')
const trainingBots = extractArray(robots, 'aiTrainingAndDatasetBots')

for (const bot of requiredSearchBots) {
  if (!searchBots.includes(bot)) {
    failures.push(`Bot de busca/citacao nao liberado localmente: ${bot}`)
  }

  if (trainingBots.includes(bot)) {
    failures.push(`Bot de busca/citacao bloqueado indevidamente localmente: ${bot}`)
  }
}

for (const bot of requiredTrainingBlocks) {
  if (!trainingBots.includes(bot)) {
    failures.push(`Bot de treino/dataset nao bloqueado localmente: ${bot}`)
  }

  if (searchBots.includes(bot)) {
    failures.push(`Bot de treino/dataset liberado indevidamente localmente: ${bot}`)
  }
}

for (const signal of [
  "const privatePaths = ['/admin/', '/api/']",
  'userAgent: aiSearchAndReferralBots',
  'userAgent: aiTrainingAndDatasetBots',
  "sitemap: `${baseUrl}/sitemap.xml`",
]) {
  if (!robots.includes(signal)) {
    failures.push(`robots.ts sem sinal obrigatorio: ${signal}`)
  }
}

for (const signal of [
  'requiredSearchBots',
  'requiredTrainingBlocks',
  'seo:audit:robots',
]) {
  if (!robotsAudit.includes(signal)) {
    failures.push(`audit-robots-geo.mjs sem sinal obrigatorio: ${signal}`)
  }
}

for (const term of [
  'decisao externa Cloudflare/GEO',
  'busca/citacao permitida',
  'treino/dataset bloqueado',
  'conflito Cloudflare/local',
  'GO_DECISAO_GEO_CLOUDFLARE',
  'Nao alterar Cloudflare',
  'SEO-GEO-001',
  'robots publico sem conflito',
]) {
  if (!doc.includes(term)) {
    failures.push(`Pacote Cloudflare/GEO nao menciona: ${term}`)
  }

  if (!sprint.includes(term) && !['Nao alterar Cloudflare', 'robots publico sem conflito'].includes(term)) {
    failures.push(`Sprint 122 nao menciona: ${term}`)
  }
}

if (!report.includes('sem producao') || !report.includes('sem acesso Cloudflare')) {
  failures.push('Relatorio do Sprint 122 deve declarar sem producao e sem acesso Cloudflare.')
}

if (packageJson.scripts?.['seo:audit:cloudflare-geo-decision'] !== 'node scripts/audit-cloudflare-geo-decision.mjs') {
  failures.push('package.json sem script seo:audit:cloudflare-geo-decision.')
}

if (!readiness.includes("['seo:audit:cloudflare-geo-decision', 'Cloudflare GEO decision']")) {
  failures.push('Readiness geral nao inclui Cloudflare GEO decision.')
}

console.log('Cloudflare GEO decision audit summary')
console.log('decision_items=1')
console.log(`search_referral_bots=${searchBots.length}`)
console.log(`training_dataset_bots=${trainingBots.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nCloudflare GEO decision warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nCloudflare GEO decision audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nCloudflare GEO decision audit completed.')
