const baseUrl = process.env.SITE_SMOKE_BASE_URL ?? 'https://bebiluminacao.com.br'
const siteUrl = 'https://bebiluminacao.com.br'

const pages = [
  {
    path: '/fabricante-de-postes-metalicos',
    types: ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/fabricante-de-postes-teleconicos',
    types: ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/fornecedor-de-postes-metalicos',
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
    path: '/produtos/poste-metalico-galvanizado',
    types: ['Product', 'WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/produtos/poste-curvo-simples',
    types: ['Product', 'WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/produtos/poste-curvo-duplo',
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
  {
    path: '/blog/altura-de-poste-para-iluminacao-publica',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
]

const redirects = [
  ['/lp/postes-metalicos', '/postes-metalicos'],
  ['/iluminacao-publica', '/postes-para-iluminacao-publica'],
  ['/postes-de-iluminacao-publica', '/postes-para-iluminacao-publica'],
  ['/fabricante-postes-teleconicos', '/fabricante-de-postes-teleconicos'],
  ['/fabricantes-de-postes-teleconicos', '/fabricante-de-postes-teleconicos'],
  ['/fabricante-de-poste-teleconico', '/fabricante-de-postes-teleconicos'],
  ['/fabricante-poste-teleconico', '/fabricante-de-postes-teleconicos'],
  ['/poste-metalico-galvanizado', '/produtos/poste-metalico-galvanizado'],
  ['/postes-metalicos-galvanizados', '/produtos/poste-metalico-galvanizado'],
  ['/poste-de-aco-galvanizado', '/produtos/poste-metalico-galvanizado'],
  ['/poste-galvanizado-para-iluminacao', '/produtos/poste-metalico-galvanizado'],
  ['/poste-galvanizado-com-base', '/produtos/poste-metalico-galvanizado'],
  ['/produtos/poste-galvanizado', '/produtos/poste-metalico-galvanizado'],
  ['/produtos/postes-metalicos-galvanizados', '/produtos/poste-metalico-galvanizado'],
  ['/poste-curvo-simples', '/produtos/poste-curvo-simples'],
  ['/postes-curvos-simples', '/produtos/poste-curvo-simples'],
  ['/poste-teleconico-curvo-simples', '/produtos/poste-curvo-simples'],
  ['/poste-curvo-simples-galvanizado', '/produtos/poste-curvo-simples'],
  ['/poste-curvo-simples-com-base', '/produtos/poste-curvo-simples'],
  ['/poste-curvo-simples-engastado', '/produtos/poste-curvo-simples'],
  ['/produtos/poste-curvo-simples-galvanizado', '/produtos/poste-curvo-simples'],
  ['/poste-curvo-duplo', '/produtos/poste-curvo-duplo'],
  ['/postes-curvos-duplos', '/produtos/poste-curvo-duplo'],
  ['/poste-teleconico-curvo-duplo', '/produtos/poste-curvo-duplo'],
  ['/poste-curvo-duplo-galvanizado', '/produtos/poste-curvo-duplo'],
  ['/poste-curvo-duplo-com-base', '/produtos/poste-curvo-duplo'],
  ['/poste-curvo-duplo-engastado', '/produtos/poste-curvo-duplo'],
  ['/produtos/poste-curvo-duplo-galvanizado', '/produtos/poste-curvo-duplo'],
  ['/poste-teleconico', '/produtos/poste-teleconico'],
  ['/postes-teleconicos', '/produtos/poste-teleconico'],
  ['/braco-para-luminaria-publica', '/produtos/braco-para-luminaria-publica'],
  ['/bracos-para-luminaria-publica', '/produtos/braco-para-luminaria-publica'],
  ['/fabrica-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/fabricas-de-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/industria-de-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/postes-metalicos-direto-da-fabrica', '/fabrica-de-postes-metalicos'],
  ['/fornecedor-postes-metalicos', '/fornecedor-de-postes-metalicos'],
  ['/fornecedores-de-postes-metalicos', '/fornecedor-de-postes-metalicos'],
  ['/comprar-poste-metalico', '/fornecedor-de-postes-metalicos'],
]

const sitemapForbiddenPaths = [
  '/lp/postes-metalicos/cidades/',
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
  assert(sitemap.includes(expectedCanonical(page.path)), `/sitemap.xml missing ${page.path}`)
}

for (const forbiddenPath of sitemapForbiddenPaths) {
  assert(!sitemap.includes(forbiddenPath), `/sitemap.xml should not include ${forbiddenPath}`)
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
