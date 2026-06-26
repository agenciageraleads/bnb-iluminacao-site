import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  packageDoc: `${seoPackage}/PACOTE_VALIDACAO_TAGS_GSC_GA4_TRAFEGO_PAGO_BB.md`,
  packageCsv: `${seoPackage}/artifacts/seo-meas-008-validacao-tags-gsc-ga4-trafego-pago-2026-06-15.csv`,
  postDeployPackage: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  publicTrackingAudit: 'scripts/audit-public-whatsapp-tracking.mjs',
  publicIndexabilityAudit: 'scripts/audit-public-indexability-evidence.mjs',
  postDeployAudit: 'scripts/audit-post-deploy-external-package.mjs',
  packageJson: 'package.json',
}

const requiredColumns = [
  'ordem',
  'frente',
  'acao',
  'status',
  'dependencia',
  'evidencia_esperada',
  'observacao',
]

const requiredActions = [
  ['tag_assistant', 'abrir_url_debug_postes_iluminacao'],
  ['tag_assistant', 'clicar_cta_whatsapp'],
  ['ga4', 'validar_debugview_realtime'],
  ['gtm', 'conferir_tag_evento_whatsapp'],
  ['google_ads', 'conferir_conversao_whatsapp'],
  ['gsc', 'enviar_sitemap'],
  ['gsc', 'inspecionar_lote_p0'],
  ['documentacao', 'registrar_evidencias'],
]

const requiredDocSignals = [
  'GTM-P6MMNNGR',
  'AW-824337235',
  'googletagmanager.com/gtm.js',
  'whatsapp_click',
  'Tag Assistant',
  'GA4 DebugView',
  'https://bebiluminacao.com.br/sitemap.xml',
  'https://bebiluminacao.com.br/postes-para-iluminacao-publica?gtm_debug=1718159281829',
  'https://bebiluminacao.com.br/fabricante-de-postes-metalicos',
  'Nao acessou conta Google',
  'Nao alterou GTM, GA4 ou Google Ads',
  'Nao alterou Google Business Profile',
  'Nao alterou CRM',
  'Nao publicou diretorio externo',
  'Nao usou SerpApi',
  'artifacts/seo-meas-008-validacao-tags-gsc-ga4-trafego-pago-2026-06-15.csv',
]

const requiredParams = [
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

const [
  packageDoc,
  packageCsvSource,
  postDeployPackage,
  scorecard,
  publicTrackingAudit,
  publicIndexabilityAudit,
  postDeployAudit,
  packageJsonSource,
] = await Promise.all([
  readExpectedFile(files.packageDoc),
  readExpectedFile(files.packageCsv),
  readExpectedFile(files.postDeployPackage),
  readExpectedFile(files.scorecard),
  readExpectedFile(files.publicTrackingAudit),
  readExpectedFile(files.publicIndexabilityAudit),
  readExpectedFile(files.postDeployAudit),
  readExpectedFile(files.packageJson),
])

const packageCsv = packageCsvSource ? parseCsv(packageCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!packageCsv.header.includes(column)) {
    failures.push(`CSV de validacao de tags sem coluna obrigatoria: ${column}`)
  }
}

if (packageCsv.rows.length !== 8) {
  failures.push(`CSV de validacao de tags deveria ter 8 linhas; encontrado ${packageCsv.rows.length}.`)
}

for (const [frente, acao] of requiredActions) {
  if (!packageCsv.rows.some((row) => row.frente === frente && row.acao === acao)) {
    failures.push(`CSV de validacao de tags sem acao obrigatoria: ${frente}/${acao}.`)
  }
}

for (const row of packageCsv.rows) {
  if (row.status !== 'pronto_para_execucao_humana') {
    failures.push(`Linha ${row.ordem} deveria iniciar como pronto_para_execucao_humana.`)
  }

  if (!row.dependencia || !row.evidencia_esperada || !row.observacao) {
    failures.push(`Linha ${row.ordem} tem dependencia, evidencia ou observacao ausente.`)
  }

  if (/concluido|validado/i.test(row.status)) {
    failures.push(`Linha ${row.ordem} sugere conclusao sem evidencia externa real.`)
  }
}

for (const expected of requiredDocSignals) {
  assertIncludes(packageDoc, expected, 'PACOTE_VALIDACAO_TAGS_GSC_GA4_TRAFEGO_PAGO_BB.md')
}

for (const param of requiredParams) {
  assertIncludes(packageDoc, param, 'PACOTE_VALIDACAO_TAGS_GSC_GA4_TRAFEGO_PAGO_BB.md')
}

for (const expected of [
  'Public WhatsApp tracking audit:',
  'Public indexability evidence:',
  'Post-deploy external package:',
  'failures=0',
  'warnings=0',
]) {
  assertIncludes(packageDoc, expected, 'PACOTE_VALIDACAO_TAGS_GSC_GA4_TRAFEGO_PAGO_BB.md')
}

for (const expected of [
  'PACOTE_VALIDACAO_TAGS_GSC_GA4_TRAFEGO_PAGO_BB.md',
  'artifacts/seo-meas-008-validacao-tags-gsc-ga4-trafego-pago-2026-06-15.csv',
]) {
  assertIncludes(postDeployPackage, expected, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
  assertIncludes(scorecard, expected, 'SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md')
}

for (const expected of [
  'gtm.js',
  'GTM-P6MMNNGR',
  'AW-824337235',
  'wa.me/556235761988',
]) {
  assertIncludes(publicTrackingAudit, expected, 'audit-public-whatsapp-tracking.mjs')
}

for (const expected of ['sitemap_status=', 'robots_status=', 'urls_checked=']) {
  assertIncludes(publicIndexabilityAudit, expected, 'audit-public-indexability-evidence.mjs')
}

for (const expected of ['gsc_ga4_queue_rows=', 'event_params=']) {
  assertIncludes(postDeployAudit, expected, 'audit-post-deploy-external-package.mjs')
}

const unsafeText = `${packageDoc}\n${packageCsvSource}`
for (const pattern of [
  /GSC validado:\s*sim/i,
  /GA4 validado:\s*sim/i,
  /GTM validado:\s*sim/i,
  /evento validado:\s*sim/i,
  /key event ativado:\s*sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Pacote de tags sugere conclusao externa indevida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Pacote de tags nao pode conter segredo real.')
}

if (
  packageJson.scripts?.['seo:audit:paid-traffic-tag-validation-package'] !==
  'node scripts/audit-paid-traffic-tag-validation-package.mjs'
) {
  failures.push('package.json sem script seo:audit:paid-traffic-tag-validation-package.')
}

console.log('Paid traffic tag validation package audit summary')
console.log(`csv_rows=${packageCsv.rows.length}`)
console.log(`required_actions=${requiredActions.length}`)
console.log(`required_params=${requiredParams.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPaid traffic tag validation package warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPaid traffic tag validation package audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPaid traffic tag validation package audit completed.')
