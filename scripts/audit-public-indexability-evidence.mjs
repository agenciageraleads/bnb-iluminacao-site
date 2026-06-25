import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const baseUrl = (process.env.SEO_PUBLIC_BASE_URL ?? 'https://bebiluminacao.com.br').replace(/\/$/, '')
const seoPackage = path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12')
const artifactPath = path.join(
  seoPackage,
  'artifacts/seo-meas-005-evidencia-publica-indexabilidade-2026-06-15.csv',
)
const failures = []
const warnings = []

const priorityPaths = [
  '/fabricante-de-postes-metalicos',
  '/fornecedor-de-postes-metalicos',
  '/fabricante-de-postes-teleconicos',
  '/fabrica-de-postes-metalicos',
  '/postes-metalicos',
  '/postes-para-iluminacao-publica',
  '/produtos/poste-teleconico',
  '/produtos/poste-metalico-galvanizado',
  '/produtos/poste-curvo-simples',
  '/produtos/poste-curvo-duplo',
  '/produtos/braco-para-luminaria-publica',
  '/blog/altura-de-poste-para-iluminacao-publica',
  '/blog/normas-para-postes-de-iluminacao',
  '/blog/poste-galvanizado-ou-pintado',
  '/blog/poste-teleconico-ou-reto',
  '/blog/poste-flangeado-ou-engastado',
  '/postes-para-loteamentos',
  '/postes-para-condominios',
  '/postes-para-pracas',
  '/postes-para-estacionamentos',
  '/produtos/suporte-para-luminaria-publica',
  '/produtos/chumbador-para-poste-metalico',
  '/postes-metalicos-sao-paulo',
  '/postes-metalicos-minas-gerais',
  '/postes-metalicos-goias',
]

function normalizeUrl(url) {
  return url.replace(/\/$/, '')
}

function csvEscape(value) {
  const text = String(value ?? '')

  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`
  }

  return text
}

function extractFirst(source, pattern) {
  const match = source.match(pattern)
  return match?.[1]?.trim() ?? ''
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'B&B SEO Turnaround public indexability audit/1.0',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    redirect: 'follow',
  })

  return {
    ok: response.ok,
    status: response.status,
    finalUrl: response.url,
    text: await response.text(),
  }
}

function analyzeHtml({ pathName, url, html, status, finalUrl, sitemapSource }) {
  const canonical = extractFirst(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)
  const robotsMeta = extractFirst(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/i)
  const title = extractFirst(html, /<title[^>]*>([^<]+)<\/title>/i)
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length
  const canonicalMatches = normalizeUrl(canonical) === normalizeUrl(url)
  const hasNoindex = /noindex/i.test(robotsMeta)
  const gtmPresent = /GTM-P6MMNNGR/.test(html)
  const whatsappPresent = /wa\.me\/556235761988|api\.whatsapp\.com/i.test(html)
  const sitemapIncluded = sitemapSource.includes(url)
  const indexable = status === 200 && canonicalMatches && !hasNoindex && sitemapIncluded
  const notes = []

  if (status !== 200) notes.push(`http_${status}`)
  if (!canonical) notes.push('canonical_ausente')
  if (canonical && !canonicalMatches) notes.push('canonical_divergente')
  if (hasNoindex) notes.push('noindex')
  if (!sitemapIncluded) notes.push('fora_do_sitemap')
  if (!gtmPresent) notes.push('gtm_ausente_no_html')
  if (!whatsappPresent) notes.push('whatsapp_ausente_no_html')
  if (h1Count !== 1) notes.push(`h1_count_${h1Count}`)

  if (status !== 200 || !canonicalMatches || hasNoindex || !sitemapIncluded) {
    failures.push(`${pathName}: ${notes.join('; ')}`)
  }

  if (!gtmPresent || !whatsappPresent || h1Count !== 1) {
    warnings.push(`${pathName}: ${notes.join('; ')}`)
  }

  return {
    path: pathName,
    url,
    http_status: status,
    final_url: finalUrl,
    canonical,
    canonical_matches: canonicalMatches ? 'sim' : 'nao',
    robots_meta: robotsMeta || 'ausente',
    indexable_public_surface: indexable ? 'sim' : 'nao',
    gtm_present: gtmPresent ? 'sim' : 'nao',
    whatsapp_present: whatsappPresent ? 'sim' : 'nao',
    sitemap_included: sitemapIncluded ? 'sim' : 'nao',
    title,
    h1_count: h1Count,
    evidence_status: indexable ? 'ok_para_gsc' : 'corrigir_antes_gsc',
    notes: notes.join('; ') || 'ok',
  }
}

const sitemapUrl = `${baseUrl}/sitemap.xml`
const robotsUrl = `${baseUrl}/robots.txt`
const sitemap = await fetchText(sitemapUrl)
const robots = await fetchText(robotsUrl)

if (sitemap.status !== 200) {
  failures.push(`sitemap.xml retornou HTTP ${sitemap.status}`)
}

if (robots.status !== 200) {
  warnings.push(`robots.txt retornou HTTP ${robots.status}`)
}

if (!robots.text.includes('Sitemap:')) {
  warnings.push('robots.txt nao declara Sitemap.')
}

const rows = []

for (const pathName of priorityPaths) {
  const url = `${baseUrl}${pathName}`
  const page = await fetchText(url)
  rows.push(
    analyzeHtml({
      pathName,
      url,
      html: page.text,
      status: page.status,
      finalUrl: page.finalUrl,
      sitemapSource: sitemap.text,
    }),
  )
}

const header = [
  'path',
  'url',
  'http_status',
  'final_url',
  'canonical',
  'canonical_matches',
  'robots_meta',
  'indexable_public_surface',
  'gtm_present',
  'whatsapp_present',
  'sitemap_included',
  'title',
  'h1_count',
  'evidence_status',
  'notes',
]

const csv = [
  header.join(','),
  ...rows.map((row) => header.map((column) => csvEscape(row[column])).join(',')),
].join('\n')

await mkdir(path.dirname(artifactPath), { recursive: true })
await writeFile(artifactPath, `${csv}\n`)

console.log('Public indexability evidence audit summary')
console.log(`base_url=${baseUrl}`)
console.log(`sitemap_status=${sitemap.status}`)
console.log(`robots_status=${robots.status}`)
console.log(`urls_checked=${rows.length}`)
console.log(`indexable_public_surface=${rows.filter((row) => row.indexable_public_surface === 'sim').length}`)
console.log(`artifact=${path.relative(root, artifactPath)}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPublic indexability evidence warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublic indexability evidence audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublic indexability evidence audit completed.')
