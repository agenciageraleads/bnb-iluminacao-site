import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const failures = []
const warnings = []

const wave2Routes = [
  {
    sprint: 22,
    route: '/postes-para-loteamentos',
    file: 'src/app/(site)/postes-para-loteamentos/page.tsx',
    schemaId: 'postes-para-loteamentos-schema',
  },
  {
    sprint: 23,
    route: '/postes-para-condominios',
    file: 'src/app/(site)/postes-para-condominios/page.tsx',
    schemaId: 'postes-para-condominios-schema',
  },
  {
    sprint: 24,
    route: '/postes-para-pracas',
    file: 'src/app/(site)/postes-para-pracas/page.tsx',
    schemaId: 'postes-para-pracas-schema',
  },
  {
    sprint: 25,
    route: '/postes-para-estacionamentos',
    file: 'src/app/(site)/postes-para-estacionamentos/page.tsx',
    schemaId: 'postes-para-estacionamentos-schema',
  },
  {
    sprint: 26,
    route: '/produtos/suporte-para-luminaria-publica',
    file: 'src/app/(site)/produtos/suporte-para-luminaria-publica/page.tsx',
    schemaId: 'suporte-luminaria-publica-schema',
  },
  {
    sprint: 27,
    route: '/produtos/chumbador-para-poste-metalico',
    file: 'src/app/(site)/produtos/chumbador-para-poste-metalico/page.tsx',
    schemaId: 'chumbador-poste-metalico-schema',
  },
]

async function readExpectedFile(file) {
  try {
    return await readFile(path.join(root, file), 'utf8')
  } catch {
    failures.push(`Arquivo esperado da Onda 2 ausente ou ilegivel: ${file}`)
    return ''
  }
}

const sitemapSource = await readExpectedFile('src/app/sitemap.ts')
const hubSource = await readExpectedFile('src/app/(site)/postes-metalicos/page.tsx')
const footerSource = await readExpectedFile('src/components/layout/footer.tsx')

const checkedRoutes = []

for (const item of wave2Routes) {
  const source = await readExpectedFile(item.file)
  const routeLiteralSingle = `'${item.route}'`
  const routeLiteralDouble = `"${item.route}"`

  const checks = {
    routeInSitemap: sitemapSource.includes(routeLiteralSingle) || sitemapSource.includes(routeLiteralDouble),
    routeInHub: hubSource.includes(routeLiteralSingle) || hubSource.includes(routeLiteralDouble),
    canonical: source.includes(`const pageUrl = "https://bebiluminacao.com.br${item.route}"`),
    metadata: source.includes('export const metadata'),
    schema: source.includes('<SchemaOrg') && source.includes(item.schemaId),
    whatsapp: source.includes('<WhatsAppLink'),
    internalLinks: source.includes('/postes-metalicos') && source.includes('/produtos/'),
  }

  for (const [check, passed] of Object.entries(checks)) {
    if (!passed) {
      failures.push(`Sprint ${item.sprint} ${item.route} falhou no check: ${check}`)
    }
  }

  if (!source.includes('breadcrumb') && !source.includes('Breadcrumb')) {
    warnings.push(`Sprint ${item.sprint} ${item.route} sem sinal textual simples de breadcrumb; revisar manualmente se necessario.`)
  }

  checkedRoutes.push({ ...item, checks })
}

for (const route of ['/postes-para-pracas', '/postes-para-estacionamentos', '/produtos/suporte-para-luminaria-publica', '/produtos/chumbador-para-poste-metalico']) {
  if (!footerSource.includes(`"${route}"`) && !footerSource.includes(`'${route}'`)) {
    warnings.push(`Footer nao referencia ${route}; nao e bloqueio se o hub principal mantiver o link.`)
  }
}

console.log('Wave 2 publication audit summary')
console.log(`routes=${checkedRoutes.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

for (const item of checkedRoutes) {
  const passedCount = Object.values(item.checks).filter(Boolean).length
  const totalCount = Object.values(item.checks).length
  console.log(`[${passedCount}/${totalCount}] Sprint ${item.sprint} ${item.route}`)
}

if (warnings.length > 0) {
  console.warn('\nWave 2 publication warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 2 publication audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 2 publication audit completed.')
