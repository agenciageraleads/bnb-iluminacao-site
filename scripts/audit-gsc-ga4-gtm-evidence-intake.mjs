import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint150: `${seoPackage}/SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM.md`,
  report150: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM_2026-06-15.md`,
  csv150: `${seoPackage}/artifacts/seo-meas-004-ficha-evidencia-gsc-ga4-gtm-2026-06-15.csv`,
  checklist: `${seoPackage}/CHECKLIST_GSC_GA4_INDEXACAO_P0.md`,
  responses: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  packageJson: 'package.json',
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

const sprint150 = await readExpectedFile(files.sprint150)
const report150 = await readExpectedFile(files.report150)
const csv150Source = await readExpectedFile(files.csv150)
const checklist = await readExpectedFile(files.checklist)
const responsesSource = await readExpectedFile(files.responses)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv150 = csv150Source ? parseCsv(csv150Source) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const gscResponse = responses.find((row) => row.item_backlog === 'SEO-MEAS-001')

const requiredColumns = [
  'etapa',
  'campo',
  'valor_esperado',
  'evidencia_aceita',
  'como_preencher',
  'risco',
  'status_preenchimento',
  'criterio_aprovacao',
  'proxima_acao',
]

for (const column of requiredColumns) {
  if (!csv150.header.includes(column)) {
    failures.push(`CSV Sprint 150 sem coluna obrigatoria: ${column}`)
  }
}

if (csv150.rows.length < 18) {
  failures.push(`CSV Sprint 150 deveria ter pelo menos 18 campos; encontrado ${csv150.rows.length}.`)
}

for (const field of [
  'propriedade_correta',
  'acesso_confirmado',
  'sitemap_publico',
  'page_indexing_report',
  'url_inspection_p0',
  'request_indexing_p0',
  'manual_actions_security',
  'propriedade_ga4_correta',
  'realtime_data',
  'debugview_ativo',
  'evento_whatsapp_click',
  'parametros_whatsapp_click',
  'key_event',
  'container_correto',
  'preview_tag_assistant',
  'tag_disparo_whatsapp',
  'utm_teste',
  'go_gsc_ga4_recomendado',
]) {
  const hasField = csv150.rows.some((row) => row.campo === field)
  if (!hasField) {
    failures.push(`Ficha GSC/GA4/GTM sem campo obrigatorio: ${field}`)
  }
}

const invalidStatuses = csv150.rows.filter((row) => row.status_preenchimento !== 'pendente_execucao_humana')
if (invalidStatuses.length > 0) {
  failures.push('Ficha GSC/GA4/GTM deve iniciar com todos os status como pendente_execucao_humana.')
}

if (gscResponse?.status_resposta !== 'recebido_insuficiente' || gscResponse?.go_autorizado !== 'nao') {
  failures.push('SEO-MEAS-001 deve continuar recebido_insuficiente/go_autorizado=nao ate haver evidencia real.')
}

for (const expected of [
  'https://bebiluminacao.com.br/sitemap.xml',
  'whatsapp_click',
  'cta_channel',
  'utm_campaign',
  'GO_GSC_GA4',
  'SEO-MEAS-001',
]) {
  assertIncludes(sprint150, expected, 'SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM.md')
}

for (const expected of [
  'https://support.google.com/webmasters/answer/10267942',
  'https://support.google.com/webmasters/answer/9008080',
  'https://support.google.com/webmasters/answer/7451001',
  'https://support.google.com/webmasters/answer/9012289',
  'https://support.google.com/webmasters/answer/7440203',
  'https://support.google.com/analytics/answer/7201382',
  'https://support.google.com/analytics/answer/9333790',
  'https://support.google.com/tagmanager/answer/6107056',
]) {
  assertIncludes(sprint150, expected, 'SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM.md')
}

for (const expected of [
  'nenhuma conta Google foi acessada pelo Codex',
  'nenhum sitemap foi enviado',
  'nenhuma URL foi solicitada para indexacao',
  'nenhum evento GA4/GTM foi validado como real',
  'nenhum site, CRM, CMS, Cloudflare ou VPS foi alterado',
]) {
  assertIncludes(report150, expected, 'RELATORIO_EXECUCAO_SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM_2026-06-15.md')
}

if (!checklist.includes('Checklist GSC, GA4 e Indexacao P0') || !checklist.includes('whatsapp_click')) {
  failures.push('Checklist GSC/GA4 base ausente ou inconsistente.')
}

const unsafeText = `${sprint150}\n${report150}\n${csv150Source}`
for (const pattern of [
  /GSC validado:\s*sim/i,
  /GA4 validado:\s*sim/i,
  /GTM validado:\s*sim/i,
  /sitemap enviado:\s*sim/i,
  /indexacao solicitada:\s*sim/i,
  /container publicado:\s*sim/i,
  /deploy executado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Ficha GSC/GA4/GTM sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Ficha GSC/GA4/GTM nao pode conter segredo real.')
}

if (packageJson.scripts?.['seo:audit:gsc-ga4-gtm-evidence-intake'] !== 'node scripts/audit-gsc-ga4-gtm-evidence-intake.mjs') {
  failures.push('package.json sem script seo:audit:gsc-ga4-gtm-evidence-intake.')
}

console.log('GSC GA4 GTM evidence intake audit summary')
console.log(`rows=${csv150.rows.length}`)
console.log(`pending_rows=${csv150.rows.filter((row) => row.status_preenchimento === 'pendente_execucao_humana').length}`)
console.log(`gsc_response=${gscResponse?.status_resposta ?? 'missing'}/${gscResponse?.go_autorizado ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nGSC GA4 GTM evidence intake warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nGSC GA4 GTM evidence intake audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nGSC GA4 GTM evidence intake audit completed.')
