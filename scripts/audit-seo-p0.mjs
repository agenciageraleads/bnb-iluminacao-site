const baseUrl = process.env.SITE_SMOKE_BASE_URL ?? 'https://bebiluminacao.com.br'
const siteUrl = 'https://bebiluminacao.com.br'

const pages = [
  {
    path: '/fabricante-de-postes-metalicos',
    types: ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/postes-metalicos',
    types: ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/postes-para-iluminacao-publica',
    types: ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/produtos/poste-teleconico',
    types: ['Product', 'WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/produtos/braco-para-luminaria-publica',
    types: ['Product', 'WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/fabrica-de-postes-metalicos',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
]

const redirects = [
  ['/lp/postes-metalicos', '/postes-metalicos'],
  ['/iluminacao-publica', '/postes-para-iluminacao-publica'],
  ['/postes-de-iluminacao-publica', '/postes-para-iluminacao-publica'],
  ['/poste-teleconico', '/produtos/poste-teleconico'],
  ['/postes-teleconicos', '/produtos/poste-teleconico'],
  ['/braco-para-luminaria-publica', '/produtos/braco-para-luminaria-publica'],
  ['/bracos-para-luminaria-publica', '/produtos/braco-para-luminaria-publica'],
  ['/fabrica-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/fabricas-de-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/industria-de-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/postes-metalicos-direto-da-fabrica', '/fabrica-de-postes-metalicos'],
]

const failures = []

function absolute(path, base = baseUrl) {
  return new URL(path, base).toString()
}

function expectedCanonical(path) {
  return `${siteUrl}${path}`
}

function getCanonical(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
}

function getSchemaTypes(html) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  const types = new Set()

  for (const [, raw] of scripts) {
    try {
      const parsed = JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, '&'))
      const nodes = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed]
      for (const node of nodes) {
        if (node?.['@type']) {
          types.add(node['@type'])
        }
      }
    } catch (error) {
      failures.push(`Invalid JSON-LD block: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return types
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

for (const page of pages) {
  const url = absolute(page.path)
  const response = await fetch(url, { redirect: 'follow' })
  const html = await response.text()
  const types = getSchemaTypes(html)
  const canonical = getCanonical(html)
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length
  const hasWhatsapp = html.includes('https://wa.me/') || html.includes('https://api.whatsapp.com/')

  console.log(`${response.status} ${page.path} canonical=${canonical ?? 'missing'} h1=${h1Count} schema=${[...types].join(',')}`)

  assert(response.status === 200, `${page.path} returned ${response.status}`)
  assert(canonical === expectedCanonical(page.path), `${page.path} canonical mismatch: ${canonical}`)
  assert(h1Count === 1, `${page.path} expected one H1, found ${h1Count}`)
  assert(hasWhatsapp, `${page.path} missing WhatsApp CTA`)

  for (const type of page.types) {
    assert(types.has(type), `${page.path} missing schema type ${type}`)
  }
}

const sitemapResponse = await fetch(absolute('/sitemap.xml'))
const sitemap = await sitemapResponse.text()
console.log(`${sitemapResponse.status} /sitemap.xml`)
assert(sitemapResponse.status === 200, `/sitemap.xml returned ${sitemapResponse.status}`)

for (const page of pages) {
  assert(sitemap.includes(absolute(page.path)), `/sitemap.xml missing ${page.path}`)
}

for (const [source, destination] of redirects) {
  const response = await fetch(absolute(source), { redirect: 'manual' })
  const location = response.headers.get('location') ?? ''
  console.log(`${response.status} ${source} -> ${location}`)
  assert(response.status === 308 || response.status === 301, `${source} returned ${response.status}`)
  assert(location.endsWith(destination), `${source} should redirect to ${destination}, got ${location}`)
}

if (failures.length > 0) {
  console.error('\nP0 SEO audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nP0 SEO audit passed.')
