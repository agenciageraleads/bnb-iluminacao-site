import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const failures = []
const warnings = []

const wave1Routes = [
  {
    sprint: 17,
    route: '/blog/altura-de-poste-para-iluminacao-publica',
    file: 'src/app/(site)/blog/altura-de-poste-para-iluminacao-publica/page.tsx',
    schemaId: 'altura-poste-iluminacao-publica-schema',
  },
  {
    sprint: 18,
    route: '/blog/normas-para-postes-de-iluminacao',
    file: 'src/app/(site)/blog/normas-para-postes-de-iluminacao/page.tsx',
    schemaId: 'normas-postes-iluminacao-schema',
  },
  {
    sprint: 19,
    route: '/blog/poste-galvanizado-ou-pintado',
    file: 'src/app/(site)/blog/poste-galvanizado-ou-pintado/page.tsx',
    schemaId: 'poste-galvanizado-ou-pintado-schema',
  },
  {
    sprint: 20,
    route: '/blog/poste-teleconico-ou-reto',
    file: 'src/app/(site)/blog/poste-teleconico-ou-reto/page.tsx',
    schemaId: 'poste-teleconico-ou-reto-schema',
  },
  {
    sprint: 21,
    route: '/blog/poste-flangeado-ou-engastado',
    file: 'src/app/(site)/blog/poste-flangeado-ou-engastado/page.tsx',
    schemaId: 'poste-flangeado-ou-engastado-schema',
  },
]

async function readExpectedFile(file) {
  try {
    return await readFile(path.join(root, file), 'utf8')
  } catch (error) {
    failures.push(`Arquivo esperado da Onda 1 ausente ou ilegivel: ${file}`)
    return ''
  }
}

const sitemapSource = await readExpectedFile('src/app/sitemap.ts')
const blogIndexSource = await readExpectedFile('src/app/(site)/blog/page.tsx')

const checkedRoutes = []

for (const item of wave1Routes) {
  const source = await readExpectedFile(item.file)
  const checks = {
    routeInSitemap: sitemapSource.includes(`'${item.route}'`) || sitemapSource.includes(`"${item.route}"`),
    routeInBlogIndex: blogIndexSource.includes(`href: "${item.route}"`) || blogIndexSource.includes(`href: '${item.route}'`),
    canonical: source.includes(`const pageUrl = "https://bebiluminacao.com.br${item.route}"`),
    metadata: source.includes('export const metadata'),
    schema: source.includes('<SchemaOrg') && source.includes(item.schemaId),
    whatsapp: source.includes('<WhatsAppLink'),
    internalLinks: source.split(item.route).length > 1 || source.includes('/postes-metalicos') || source.includes('/produtos/'),
  }

  for (const [check, passed] of Object.entries(checks)) {
    if (!passed) {
      failures.push(`Sprint ${item.sprint} ${item.route} falhou no check: ${check}`)
    }
  }

  const faqSignals = ['FAQ', 'pergunta', 'duvida', 'perguntas'].filter((signal) => source.toLowerCase().includes(signal.toLowerCase()))
  if (faqSignals.length === 0) {
    warnings.push(`Sprint ${item.sprint} ${item.route} sem sinal textual simples de FAQ; revisar manualmente se necessario.`)
  }

  checkedRoutes.push({ ...item, checks })
}

console.log('Wave 1 publication audit summary')
console.log(`routes=${checkedRoutes.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

for (const item of checkedRoutes) {
  const passedCount = Object.values(item.checks).filter(Boolean).length
  const totalCount = Object.values(item.checks).length
  console.log(`[${passedCount}/${totalCount}] Sprint ${item.sprint} ${item.route}`)
}

if (warnings.length > 0) {
  console.warn('\nWave 1 publication warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 1 publication audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 1 publication audit completed.')
