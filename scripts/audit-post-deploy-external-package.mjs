import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  packageDoc: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  packageCsv: `${seoPackage}/artifacts/seo-ops-051-pos-deploy-evidencias-externas-2026-06-15.csv`,
  gscGa4QueueCsv: `${seoPackage}/artifacts/seo-meas-006-fila-execucao-gsc-ga4-2026-06-15.csv`,
  rankingSerpApiCsv: `${seoPackage}/artifacts/seo-meas-007-ranking-serpapi-posdeploy-d0-2026-06-15.csv`,
  gbpQueueCsv: `${seoPackage}/artifacts/seo-gbp-003-fila-execucao-readonly-update-2026-06-15.csv`,
  offpageQueueCsv: `${seoPackage}/artifacts/seo-link-010-fila-execucao-offpage-pos-nap-2026-06-15.csv`,
  casesQueueCsv: `${seoPackage}/artifacts/seo-img-019-fila-execucao-cases-comerciais-2026-06-15.csv`,
  regionalCmsQueueCsv: `${seoPackage}/artifacts/seo-reg-005-fila-cidades-cms-2026-06-15.csv`,
  checklist: `${seoPackage}/CHECKLIST_GSC_GA4_INDEXACAO_P0.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  blockerPanel: `${seoPackage}/PAINEL_BLOQUEIOS_GO_NO_GO_TURNAROUND_BB.md`,
  postDeployReport: `${seoPackage}/RELATORIO_POS_DEPLOY_ONDA_1_NAP_2026-06-15.md`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'ordem',
  'frente',
  'item_backlog',
  'status_atual',
  'acao_executavel',
  'evidencia_aceita',
  'bloqueio',
  'proximo_status_permitido',
]

const requiredRows = [
  ['GSC', 'SEO-MEAS-001'],
  ['GA4_GTM', 'SEO-MEAS-002'],
  ['GBP', 'SEO-GBP-001'],
  ['GBP', 'SEO-GBP-002'],
  ['Offpage', 'SEO-LINK-002'],
  ['Cases', 'SEO-IMG-009'],
  ['Cidades', 'SEO-REG-003'],
]

const requiredUrls = [
  'https://bebiluminacao.com.br/fabricante-de-postes-metalicos',
  'https://bebiluminacao.com.br/postes-metalicos',
  'https://bebiluminacao.com.br/postes-para-iluminacao-publica',
  'https://bebiluminacao.com.br/fabricante-de-postes-teleconicos',
  'https://bebiluminacao.com.br/fornecedor-de-postes-metalicos',
  'https://bebiluminacao.com.br/fabrica-de-postes-metalicos',
  'https://bebiluminacao.com.br/produtos/poste-teleconico',
  'https://bebiluminacao.com.br/produtos/poste-metalico-galvanizado',
  'https://bebiluminacao.com.br/produtos/poste-curvo-simples',
  'https://bebiluminacao.com.br/produtos/poste-curvo-duplo',
  'https://bebiluminacao.com.br/produtos/braco-para-luminaria-publica',
  'https://bebiluminacao.com.br/postes-para-loteamentos',
  'https://bebiluminacao.com.br/postes-para-condominios',
  'https://bebiluminacao.com.br/postes-para-pracas',
  'https://bebiluminacao.com.br/postes-para-estacionamentos',
  'https://bebiluminacao.com.br/produtos/suporte-para-luminaria-publica',
  'https://bebiluminacao.com.br/produtos/chumbador-para-poste-metalico',
  'https://bebiluminacao.com.br/blog/altura-de-poste-para-iluminacao-publica',
  'https://bebiluminacao.com.br/blog/normas-para-postes-de-iluminacao',
  'https://bebiluminacao.com.br/blog/poste-galvanizado-ou-pintado',
  'https://bebiluminacao.com.br/blog/poste-teleconico-ou-reto',
  'https://bebiluminacao.com.br/blog/poste-flangeado-ou-engastado',
  'https://bebiluminacao.com.br/postes-metalicos-sao-paulo',
  'https://bebiluminacao.com.br/postes-metalicos-minas-gerais',
  'https://bebiluminacao.com.br/postes-metalicos-goias',
]

const requiredEventParams = [
  'cta_channel',
  'cta_source',
  'cta_label',
  'page_path',
  'page_location',
  'whatsapp_phone',
  'has_prefilled_message',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
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

const packageDoc = await readExpectedFile(files.packageDoc)
const packageCsvSource = await readExpectedFile(files.packageCsv)
const gscGa4QueueCsvSource = await readExpectedFile(files.gscGa4QueueCsv)
const rankingSerpApiCsvSource = await readExpectedFile(files.rankingSerpApiCsv)
const gbpQueueCsvSource = await readExpectedFile(files.gbpQueueCsv)
const offpageQueueCsvSource = await readExpectedFile(files.offpageQueueCsv)
const casesQueueCsvSource = await readExpectedFile(files.casesQueueCsv)
const regionalCmsQueueCsvSource = await readExpectedFile(files.regionalCmsQueueCsv)
const checklist = await readExpectedFile(files.checklist)
const scorecard = await readExpectedFile(files.scorecard)
const blockerPanel = await readExpectedFile(files.blockerPanel)
const postDeployReport = await readExpectedFile(files.postDeployReport)
const packageJsonSource = await readExpectedFile(files.packageJson)

const packageCsv = packageCsvSource ? parseCsv(packageCsvSource) : { header: [], rows: [] }
const gscGa4QueueCsv = gscGa4QueueCsvSource ? parseCsv(gscGa4QueueCsvSource) : { header: [], rows: [] }
const rankingSerpApiCsv = rankingSerpApiCsvSource ? parseCsv(rankingSerpApiCsvSource) : { header: [], rows: [] }
const gbpQueueCsv = gbpQueueCsvSource ? parseCsv(gbpQueueCsvSource) : { header: [], rows: [] }
const offpageQueueCsv = offpageQueueCsvSource ? parseCsv(offpageQueueCsvSource) : { header: [], rows: [] }
const casesQueueCsv = casesQueueCsvSource ? parseCsv(casesQueueCsvSource) : { header: [], rows: [] }
const regionalCmsQueueCsv = regionalCmsQueueCsvSource ? parseCsv(regionalCmsQueueCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!packageCsv.header.includes(column)) {
    failures.push(`CSV pos-deploy externo sem coluna obrigatoria: ${column}`)
  }
}

if (packageCsv.rows.length !== 10) {
  failures.push(`CSV pos-deploy externo deveria ter 10 linhas; encontrado ${packageCsv.rows.length}.`)
}

if (gscGa4QueueCsv.rows.length !== 33) {
  failures.push(`Fila GSC/GA4 deveria ter 33 linhas; encontrado ${gscGa4QueueCsv.rows.length}.`)
}

if (rankingSerpApiCsv.rows.length !== 1) {
  failures.push(`Status ranking SerpApi D0 deveria ter 1 linha; encontrado ${rankingSerpApiCsv.rows.length}.`)
}

if (rankingSerpApiCsv.rows[0]?.status !== 'bloqueado_quota_serpapi_429') {
  failures.push('Status ranking SerpApi D0 deveria registrar bloqueio de quota 429.')
}

if (gbpQueueCsv.rows.length !== 21) {
  failures.push(`Fila GBP deveria ter 21 linhas; encontrado ${gbpQueueCsv.rows.length}.`)
}

if (offpageQueueCsv.rows.length !== 6) {
  failures.push(`Fila off-page deveria ter 6 linhas; encontrado ${offpageQueueCsv.rows.length}.`)
}

if (casesQueueCsv.rows.length !== 37) {
  failures.push(`Fila de cases deveria ter 37 linhas; encontrado ${casesQueueCsv.rows.length}.`)
}

if (regionalCmsQueueCsv.rows.length !== 20) {
  failures.push(`Fila regional/CMS deveria ter 20 linhas; encontrado ${regionalCmsQueueCsv.rows.length}.`)
}

for (const [frente, item] of requiredRows) {
  if (!packageCsv.rows.some((row) => row.frente === frente && row.item_backlog === item)) {
    failures.push(`CSV pos-deploy externo sem linha para ${frente}/${item}.`)
  }
}

for (const row of packageCsv.rows) {
  if (!row.acao_executavel || !row.evidencia_aceita || !row.bloqueio || !row.proximo_status_permitido) {
    failures.push(`Linha ${row.ordem} do CSV pos-deploy externo tem campos fracos ou ausentes.`)
  }

  if (row.proximo_status_permitido === 'concluido') {
    failures.push(`Linha ${row.ordem} nao deve permitir conclusao direta sem evidencia externa strict.`)
  }
}

for (const url of requiredUrls) {
  assertIncludes(packageDoc, url, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

for (const param of requiredEventParams) {
  assertIncludes(packageDoc, param, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
  assertIncludes(checklist, param, 'CHECKLIST_GSC_GA4_INDEXACAO_P0.md')
}

for (const expected of [
  'A Onda 1 + NAP ja esta publicada',
  'nao acessa conta Google',
  'nao pede senha',
  'nao altera GBP',
  'nao publica diretorio',
  'nao envia mensagem externa',
  'nao mexe no CRM',
  'Tag Assistant',
  'GA4 DebugView',
  'GBP read-only',
  'GO_GBP_UPDATE',
  'thin content',
  'npm run seo:audit:public-indexability-evidence',
  'npm run seo:build:gsc-ga4-execution-queue',
  'npm run seo:audit:gsc-ga4-execution-queue',
  'npm run seo:audit:ranking-serpapi-posdeploy',
  'npm run seo:build:gbp-execution-queue',
  'npm run seo:audit:gbp-execution-queue',
  'npm run seo:build:offpage-execution-queue',
  'npm run seo:audit:offpage-execution-queue',
  'npm run seo:build:cases-execution-queue',
  'npm run seo:audit:cases-execution-queue',
  'npm run seo:build:regional-cms-execution-queue',
  'npm run seo:audit:regional-cms-execution-queue',
  'artifacts/seo-ops-051-pos-deploy-evidencias-externas-2026-06-15.csv',
  'artifacts/seo-meas-005-evidencia-publica-indexabilidade-2026-06-15.csv',
  'artifacts/seo-meas-006-fila-execucao-gsc-ga4-2026-06-15.csv',
  'artifacts/seo-meas-007-ranking-serpapi-posdeploy-d0-2026-06-15.csv',
  'artifacts/seo-gbp-003-fila-execucao-readonly-update-2026-06-15.csv',
  'artifacts/seo-link-010-fila-execucao-offpage-pos-nap-2026-06-15.csv',
  'artifacts/seo-img-019-fila-execucao-cases-comerciais-2026-06-15.csv',
  'artifacts/seo-reg-005-fila-cidades-cms-2026-06-15.csv',
  'npm run seo:audit:public-whatsapp-tracking',
]) {
  assertIncludes(packageDoc, expected, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

for (const expected of [
  'Atualizado: 2026-06-15 pos-deploy Onda 1 + NAP',
  'Estas URLs ja foram publicadas em producao',
  '/postes-metalicos-sao-paulo',
  '/postes-metalicos-minas-gerais',
  '/postes-metalicos-goias',
]) {
  assertIncludes(checklist, expected, 'CHECKLIST_GSC_GA4_INDEXACAO_P0.md')
}

for (const expected of [
  'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md',
  'GSC',
  'GA4/GTM',
  'GBP',
  'off-page',
  'cases',
  'cidades/CMS',
]) {
  assertIncludes(scorecard, expected, 'SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md')
}

for (const expected of [
  'painel operacional atualizado pos-deploy Onda 1',
  'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md',
  'GO_BUILD_ONDA_1_NAP',
  'NO_GO_BUILD',
]) {
  assertIncludes(blockerPanel, expected, 'PAINEL_BLOQUEIOS_GO_NO_GO_TURNAROUND_BB.md')
}

if (!postDeployReport.includes('Onda 1 publicada e validada em producao')) {
  failures.push('Relatorio pos-deploy nao comprova que a Onda 1 esta publicada.')
}

const unsafeText = `${packageDoc}\n${packageCsvSource}`
for (const pattern of [
  /GSC validado:\s*sim/i,
  /GA4 validado:\s*sim/i,
  /GTM validado:\s*sim/i,
  /GBP atualizado:\s*sim/i,
  /diretorio publicado:\s*sim/i,
  /case nominal publicado:\s*sim/i,
  /cidade publicada:\s*sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Pacote pos-deploy externo sugere conclusao indevida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Pacote pos-deploy externo nao pode conter segredo real.')
}

if (packageJson.scripts?.['seo:audit:post-deploy-external-package'] !== 'node scripts/audit-post-deploy-external-package.mjs') {
  failures.push('package.json sem script seo:audit:post-deploy-external-package.')
}

if (packageJson.scripts?.['seo:audit:public-whatsapp-tracking'] !== 'node scripts/audit-public-whatsapp-tracking.mjs') {
  failures.push('package.json sem script seo:audit:public-whatsapp-tracking.')
}

if (packageJson.scripts?.['seo:audit:public-indexability-evidence'] !== 'node scripts/audit-public-indexability-evidence.mjs') {
  failures.push('package.json sem script seo:audit:public-indexability-evidence.')
}

if (packageJson.scripts?.['seo:build:gsc-ga4-execution-queue'] !== 'node scripts/build-gsc-ga4-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:gsc-ga4-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:gsc-ga4-execution-queue'] !== 'node scripts/audit-gsc-ga4-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:gsc-ga4-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:ranking-serpapi-posdeploy'] !== 'node scripts/audit-ranking-serpapi-posdeploy.mjs') {
  failures.push('package.json sem script seo:audit:ranking-serpapi-posdeploy.')
}

if (packageJson.scripts?.['seo:build:gbp-execution-queue'] !== 'node scripts/build-gbp-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:gbp-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:gbp-execution-queue'] !== 'node scripts/audit-gbp-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:gbp-execution-queue.')
}

if (packageJson.scripts?.['seo:build:offpage-execution-queue'] !== 'node scripts/build-offpage-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:offpage-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:offpage-execution-queue'] !== 'node scripts/audit-offpage-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:offpage-execution-queue.')
}

if (packageJson.scripts?.['seo:build:cases-execution-queue'] !== 'node scripts/build-cases-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:cases-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:cases-execution-queue'] !== 'node scripts/audit-cases-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:cases-execution-queue.')
}

if (packageJson.scripts?.['seo:build:regional-cms-execution-queue'] !== 'node scripts/build-regional-cms-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:regional-cms-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:regional-cms-execution-queue'] !== 'node scripts/audit-regional-cms-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:regional-cms-execution-queue.')
}

console.log('Post-deploy external package audit summary')
console.log(`csv_rows=${packageCsv.rows.length}`)
console.log(`csv_columns=${packageCsv.header.length}`)
console.log(`gsc_ga4_queue_rows=${gscGa4QueueCsv.rows.length}`)
console.log(`ranking_serpapi_rows=${rankingSerpApiCsv.rows.length}`)
console.log(`gbp_queue_rows=${gbpQueueCsv.rows.length}`)
console.log(`offpage_queue_rows=${offpageQueueCsv.rows.length}`)
console.log(`cases_queue_rows=${casesQueueCsv.rows.length}`)
console.log(`regional_cms_queue_rows=${regionalCmsQueueCsv.rows.length}`)
console.log(`required_urls=${requiredUrls.length}`)
console.log(`event_params=${requiredEventParams.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPost-deploy external package warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPost-deploy external package audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPost-deploy external package audit completed.')
