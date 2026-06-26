import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const baseUrl = process.env.SEO_PUBLIC_BASE_URL || 'https://bebiluminacao.com.br'
const targetPath = '/fabricante-de-postes-metalicos'
const targetQuery =
  '?utm_source=google&utm_medium=cpc&utm_campaign=seo_pos_deploy_onda1&utm_content=debug_whatsapp&utm_term=fabricante_de_postes_metalicos'
const targetUrl = `${baseUrl}${targetPath}${targetQuery}`
const failures = []
const warnings = []

const files = {
  whatsappLink: 'src/components/ui/whatsapp-link.tsx',
  tracking: 'src/components/Tracking.tsx',
  checklist: '../../Marketing/seo-turnaround-2026-06-12/CHECKLIST_GSC_GA4_INDEXACAO_P0.md',
  packageDoc: '../../Marketing/seo-turnaround-2026-06-12/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md',
}

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

async function fetchPublicHtml() {
  try {
    const response = await fetch(targetUrl, {
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
      headers: {
        'user-agent': 'B&B SEO public whatsapp tracking audit/1.0',
      },
    })
    const html = await response.text()

    return {
      status: response.status,
      ok: response.status >= 200 && response.status < 300,
      html,
    }
  } catch (error) {
    failures.push(`Falha ao buscar URL publica ${targetUrl}: ${error instanceof Error ? error.message : String(error)}`)
    return { status: 0, ok: false, html: '' }
  }
}

const [whatsappLink, tracking, checklist, packageDoc, publicResult] = await Promise.all([
  readExpectedFile(files.whatsappLink),
  readExpectedFile(files.tracking),
  readExpectedFile(files.checklist),
  readExpectedFile(files.packageDoc),
  fetchPublicHtml(),
])

if (!publicResult.ok) {
  failures.push(`URL publica de teste retornou status ${publicResult.status}.`)
}

for (const expected of [
  'GTM-P6MMNNGR',
  'googletagmanager.com/gtm.js',
  'googletagmanager.com/gtag/js?id=AW-824337235',
  'wa.me/556235761988',
]) {
  assertIncludes(publicResult.html, expected, 'HTML publico de teste')
}

for (const expected of [
  "event: 'whatsapp_click'",
  "cta_channel: 'whatsapp'",
  'window.dataLayer.push',
  'getLeadAttributionPayload',
  'readAttributionParams',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
]) {
  assertIncludes(whatsappLink, expected, 'WhatsAppLink')
}

for (const param of requiredParams) {
  assertIncludes(checklist, param, 'CHECKLIST_GSC_GA4_INDEXACAO_P0.md')
  assertIncludes(packageDoc, param, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

for (const expected of [
  'googletagmanager.com/gtag/js',
  'googletagmanager.com/gtm.js',
  'window.dataLayer',
]) {
  assertIncludes(tracking, expected, 'Tracking component')
}

if (!publicResult.html.includes('index, follow')) {
  warnings.push('HTML publico de teste nao expôs meta robots index, follow de forma literal; outros auditores cobrem robots/canonical.')
}

console.log('Public WhatsApp tracking audit summary')
console.log(`target_url=${targetUrl}`)
console.log(`http_status=${publicResult.status}`)
console.log(`required_params=${requiredParams.length}`)
console.log(`gtm_public=${publicResult.html.includes('GTM-P6MMNNGR') ? 'present' : 'missing'}`)
console.log(`gtm_js_public=${publicResult.html.includes('googletagmanager.com/gtm.js') ? 'present' : 'missing'}`)
console.log(
  `google_ads_public=${publicResult.html.includes('googletagmanager.com/gtag/js?id=AW-824337235') ? 'present' : 'missing'}`,
)
console.log(`whatsapp_anchor=${publicResult.html.includes('wa.me/556235761988') ? 'present' : 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPublic WhatsApp tracking warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublic WhatsApp tracking audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublic WhatsApp tracking audit completed.')
