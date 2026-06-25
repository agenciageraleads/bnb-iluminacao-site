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
    path: '/postes-metalicos-sao-paulo',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-minas-gerais',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-rio-de-janeiro',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-parana',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-santa-catarina',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-rio-grande-do-sul',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-bahia',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-pernambuco',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-ceara',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-para',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-mato-grosso',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-mato-grosso-do-sul',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-goias',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-distrito-federal',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-metalicos-tocantins',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
    regional: true,
  },
  {
    path: '/postes-para-iluminacao-publica',
    types: ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/postes-para-loteamentos',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
  },
  {
    path: '/postes-para-condominios',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
  },
  {
    path: '/postes-para-pracas',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
  },
  {
    path: '/postes-para-estacionamentos',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject', 'FAQPage'],
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
    path: '/produtos/suporte-para-luminaria-publica',
    types: ['Product', 'WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/produtos/chumbador-para-poste-metalico',
    types: ['Product', 'WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/fabrica-de-postes-metalicos',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/obras',
    types: ['WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject'],
  },
  {
    path: '/obras/postes-para-pracas-centralina-mg',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject'],
  },
  {
    path: '/obras/postes-para-quadras-esportivas-arapora-go',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject'],
  },
  {
    path: '/obras/postes-para-area-hospitalar-goiania-go',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'ImageObject'],
  },
  {
    path: '/blog/altura-de-poste-para-iluminacao-publica',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/blog/normas-para-postes-de-iluminacao',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/blog/poste-galvanizado-ou-pintado',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/blog/poste-teleconico-ou-reto',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    path: '/blog/poste-flangeado-ou-engastado',
    types: ['Article', 'WebPage', 'Organization', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
]

const redirects = [
  ['/lp/postes-metalicos', '/postes-metalicos'],
  ['/iluminacao-publica', '/postes-para-iluminacao-publica'],
  ['/postes-de-iluminacao-publica', '/postes-para-iluminacao-publica'],
  ['/postes-loteamentos', '/postes-para-loteamentos'],
  ['/postes-para-loteamento', '/postes-para-loteamentos'],
  ['/poste-para-loteamento', '/postes-para-loteamentos'],
  ['/iluminacao-para-loteamentos', '/postes-para-loteamentos'],
  ['/postes-condominios', '/postes-para-condominios'],
  ['/postes-para-condominio', '/postes-para-condominios'],
  ['/poste-para-condominio', '/postes-para-condominios'],
  ['/iluminacao-para-condominios', '/postes-para-condominios'],
  ['/postes-pracas', '/postes-para-pracas'],
  ['/postes-para-praca', '/postes-para-pracas'],
  ['/poste-para-praca', '/postes-para-pracas'],
  ['/iluminacao-para-pracas', '/postes-para-pracas'],
  ['/postes-estacionamentos', '/postes-para-estacionamentos'],
  ['/postes-para-estacionamento', '/postes-para-estacionamentos'],
  ['/poste-para-estacionamento', '/postes-para-estacionamentos'],
  ['/iluminacao-para-estacionamentos', '/postes-para-estacionamentos'],
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
  ['/suporte-para-luminaria-publica', '/produtos/suporte-para-luminaria-publica'],
  ['/suportes-para-luminaria-publica', '/produtos/suporte-para-luminaria-publica'],
  ['/suporte-para-luminarias-publicas', '/produtos/suporte-para-luminaria-publica'],
  ['/nucleo-para-luminaria-publica', '/produtos/suporte-para-luminaria-publica'],
  ['/nucleo-para-luminarias-publicas', '/produtos/suporte-para-luminaria-publica'],
  ['/chumbador-para-poste-metalico', '/produtos/chumbador-para-poste-metalico'],
  ['/chumbadores-para-poste-metalico', '/produtos/chumbador-para-poste-metalico'],
  ['/chumbador-para-poste', '/produtos/chumbador-para-poste-metalico'],
  ['/base-flangeada-para-poste', '/produtos/chumbador-para-poste-metalico'],
  ['/base-para-poste-metalico', '/produtos/chumbador-para-poste-metalico'],
  ['/gabarito-para-chumbador', '/produtos/chumbador-para-poste-metalico'],
  ['/produtos/chumbadores-para-poste-metalico', '/produtos/chumbador-para-poste-metalico'],
  ['/produtos/base-flangeada-para-poste', '/produtos/chumbador-para-poste-metalico'],
  ['/produtos/gabarito-para-chumbador', '/produtos/chumbador-para-poste-metalico'],
  ['/fabrica-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/fabricas-de-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/industria-de-postes-metalicos', '/fabrica-de-postes-metalicos'],
  ['/postes-metalicos-direto-da-fabrica', '/fabrica-de-postes-metalicos'],
  ['/fornecedor-postes-metalicos', '/fornecedor-de-postes-metalicos'],
  ['/fornecedores-de-postes-metalicos', '/fornecedor-de-postes-metalicos'],
  ['/comprar-poste-metalico', '/fornecedor-de-postes-metalicos'],
  ['/lp/estados/sao-paulo', '/postes-metalicos-sao-paulo'],
  ['/lp/estados/minas-gerais', '/postes-metalicos-minas-gerais'],
  ['/lp/estados/rio-de-janeiro', '/postes-metalicos-rio-de-janeiro'],
  ['/lp/estados/parana', '/postes-metalicos-parana'],
  ['/lp/estados/santa-catarina', '/postes-metalicos-santa-catarina'],
  ['/lp/estados/rio-grande-do-sul', '/postes-metalicos-rio-grande-do-sul'],
  ['/lp/estados/bahia', '/postes-metalicos-bahia'],
  ['/lp/estados/pernambuco', '/postes-metalicos-pernambuco'],
  ['/lp/estados/ceara', '/postes-metalicos-ceara'],
  ['/lp/estados/para', '/postes-metalicos-para'],
  ['/lp/estados/mato-grosso', '/postes-metalicos-mato-grosso'],
  ['/lp/estados/mato-grosso-do-sul', '/postes-metalicos-mato-grosso-do-sul'],
  ['/lp/estados/goias', '/postes-metalicos-goias'],
  ['/lp/estados/distrito-federal', '/postes-metalicos-distrito-federal'],
  ['/lp/estados/tocantins', '/postes-metalicos-tocantins'],
  ['/lp/postes-metalicos/cidades/goiania', '/postes-metalicos'],
  ['/lp/postes-metalicos/cidades/sao-paulo', '/postes-metalicos'],
]

const sitemapForbiddenPaths = [
  '/lp/postes-metalicos/cidades/',
  '/lp/estados/',
]

const regionalForbiddenHtml = [
  'LocalBusiness',
  'GeoCoordinates',
  'addressLocality',
  'B&B - Unidade',
  '/lp/estados/',
  '/regioes-atendidas/cidades/',
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

  if (page.regional) {
    for (const forbidden of regionalForbiddenHtml) {
      assert(!html.includes(forbidden), `${page.path} should not include regional forbidden signal ${forbidden}`)
    }
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
  assert([301, 307, 308].includes(response.status), `${source} returned ${response.status}`)
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
