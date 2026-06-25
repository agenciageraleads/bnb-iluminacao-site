import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))

const expectedPages = [
  {
    dataKey: 'saoPaulo',
    path: '/postes-metalicos-sao-paulo',
    routeFile: 'src/app/(site)/postes-metalicos-sao-paulo/page.tsx',
    stateName: 'Sao Paulo',
    uf: 'SP',
  },
  {
    dataKey: 'minasGerais',
    path: '/postes-metalicos-minas-gerais',
    routeFile: 'src/app/(site)/postes-metalicos-minas-gerais/page.tsx',
    stateName: 'Minas Gerais',
    uf: 'MG',
  },
  {
    dataKey: 'rioDeJaneiro',
    path: '/postes-metalicos-rio-de-janeiro',
    routeFile: 'src/app/(site)/postes-metalicos-rio-de-janeiro/page.tsx',
    stateName: 'Rio de Janeiro',
    uf: 'RJ',
  },
  {
    dataKey: 'parana',
    path: '/postes-metalicos-parana',
    routeFile: 'src/app/(site)/postes-metalicos-parana/page.tsx',
    stateName: 'Parana',
    uf: 'PR',
  },
  {
    dataKey: 'santaCatarina',
    path: '/postes-metalicos-santa-catarina',
    routeFile: 'src/app/(site)/postes-metalicos-santa-catarina/page.tsx',
    stateName: 'Santa Catarina',
    uf: 'SC',
  },
  {
    dataKey: 'rioGrandeDoSul',
    path: '/postes-metalicos-rio-grande-do-sul',
    routeFile: 'src/app/(site)/postes-metalicos-rio-grande-do-sul/page.tsx',
    stateName: 'Rio Grande do Sul',
    uf: 'RS',
  },
  {
    dataKey: 'bahia',
    path: '/postes-metalicos-bahia',
    routeFile: 'src/app/(site)/postes-metalicos-bahia/page.tsx',
    stateName: 'Bahia',
    uf: 'BA',
  },
  {
    dataKey: 'pernambuco',
    path: '/postes-metalicos-pernambuco',
    routeFile: 'src/app/(site)/postes-metalicos-pernambuco/page.tsx',
    stateName: 'Pernambuco',
    uf: 'PE',
  },
  {
    dataKey: 'ceara',
    path: '/postes-metalicos-ceara',
    routeFile: 'src/app/(site)/postes-metalicos-ceara/page.tsx',
    stateName: 'Ceara',
    uf: 'CE',
  },
  {
    dataKey: 'paraState',
    path: '/postes-metalicos-para',
    routeFile: 'src/app/(site)/postes-metalicos-para/page.tsx',
    stateName: 'Para',
    uf: 'PA',
  },
  {
    dataKey: 'matoGrosso',
    path: '/postes-metalicos-mato-grosso',
    routeFile: 'src/app/(site)/postes-metalicos-mato-grosso/page.tsx',
    stateName: 'Mato Grosso',
    uf: 'MT',
  },
  {
    dataKey: 'matoGrossoDoSul',
    path: '/postes-metalicos-mato-grosso-do-sul',
    routeFile: 'src/app/(site)/postes-metalicos-mato-grosso-do-sul/page.tsx',
    stateName: 'Mato Grosso do Sul',
    uf: 'MS',
  },
  {
    dataKey: 'goias',
    path: '/postes-metalicos-goias',
    routeFile: 'src/app/(site)/postes-metalicos-goias/page.tsx',
    stateName: 'Goias',
    uf: 'GO',
  },
  {
    dataKey: 'distritoFederal',
    path: '/postes-metalicos-distrito-federal',
    routeFile: 'src/app/(site)/postes-metalicos-distrito-federal/page.tsx',
    stateName: 'Distrito Federal',
    uf: 'DF',
  },
  {
    dataKey: 'tocantins',
    path: '/postes-metalicos-tocantins',
    routeFile: 'src/app/(site)/postes-metalicos-tocantins/page.tsx',
    stateName: 'Tocantins',
    uf: 'TO',
  },
]

const requiredFiles = [
  'src/lib/seo/regional-ufs.ts',
  'src/components/seo/regional-uf-page.tsx',
  'src/app/(site)/lp/estados/[estado]/page.tsx',
  'src/app/(site)/lp/postes-metalicos/cidades/[city]/page.tsx',
  'src/app/sitemap.ts',
  'scripts/smoke-public.mjs',
  'scripts/audit-seo-p0.mjs',
  'package.json',
]

const regionalSourceFiles = [
  'src/lib/seo/regional-ufs.ts',
  'src/components/seo/regional-uf-page.tsx',
  ...expectedPages.map((page) => page.routeFile),
]

const forbiddenRegionalSourceSignals = [
  'LocalBusiness',
  'GeoCoordinates',
  'addressLocality',
  'B&B - Unidade',
  '/lp/estados/',
  '/regioes-atendidas/cidades/',
  '/lp/postes-metalicos/cidades/',
  'filial',
  'loja',
]

const failures = []

function resolveProjectFile(path) {
  return new URL(`../${path}`, import.meta.url)
}

function readProjectFile(path) {
  return execFileSync('/bin/cat', [path], {
    cwd: projectRoot,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 8,
  })
}

function assertFileExists(path) {
  if (!existsSync(resolveProjectFile(path))) {
    failures.push(`Missing file: ${path}`)
  }
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

for (const file of requiredFiles) {
  assertFileExists(file)
}

for (const page of expectedPages) {
  assertFileExists(page.routeFile)
}

const [
  regionalData,
  legacyStatePage,
  legacyCityPage,
  sitemap,
  smokePublic,
  auditP0,
  packageJson,
] = [
  readProjectFile('src/lib/seo/regional-ufs.ts'),
  readProjectFile('src/app/(site)/lp/estados/[estado]/page.tsx'),
  readProjectFile('src/app/(site)/lp/postes-metalicos/cidades/[city]/page.tsx'),
  readProjectFile('src/app/sitemap.ts'),
  readProjectFile('scripts/smoke-public.mjs'),
  readProjectFile('scripts/audit-seo-p0.mjs'),
  readProjectFile('package.json'),
]

for (const page of expectedPages) {
  assert(regionalData.includes(`${page.dataKey}: {`), `regional data missing key ${page.dataKey}`)
  assert(regionalData.includes(`uf: "${page.uf}"`), `regional data missing UF ${page.uf}`)
  assert(regionalData.includes(`stateName: "${page.stateName}"`), `regional data missing state ${page.stateName}`)
  assert(regionalData.includes(`path: "${page.path}"`), `regional data missing path ${page.path}`)
  assert(sitemap.includes(`'${page.path}'`), `sitemap missing ${page.path}`)
  assert(smokePublic.includes(`'${page.path}'`), `smoke-public missing ${page.path}`)
  assert(auditP0.includes(`path: '${page.path}'`), `audit-seo-p0 missing ${page.path}`)
  assert(auditP0.includes(`'/lp/estados/${page.path.replace('/postes-metalicos-', '')}'`), `audit-seo-p0 missing legacy redirect for ${page.path}`)
  assert(auditP0.includes('regional: true'), `audit-seo-p0 missing regional guard`)

  const routeSource = readProjectFile(page.routeFile)
  assert(routeSource.includes(`regionalUfPages.${page.dataKey}`), `${page.routeFile} uses wrong regional data key`)
  assert(routeSource.includes('getRegionalUfMetadata(data)'), `${page.routeFile} missing metadata helper`)
  assert(routeSource.includes('<RegionalUfPage data={data} />'), `${page.routeFile} missing shared page component`)
}

assert(!sitemap.includes('/lp/estados/'), 'sitemap source should not include /lp/estados/')
assert(auditP0.includes("'/lp/estados/'"), 'audit-seo-p0 should keep blocking /lp/estados/')
assert(packageJson.includes('"seo:audit:regional"'), 'package.json missing seo:audit:regional script')
assert(legacyStatePage.includes('redirect(legacyStateRedirects[estado]'), 'legacy state page should redirect to canonical regional pages')
assert(legacyStatePage.includes('robots: {'), 'legacy state page should declare robots metadata')
assert(!existsSync(resolveProjectFile('src/lib/states-data.ts')), 'legacy states-data with fixed delivery promises should be removed')
assert(legacyCityPage.includes('redirect("/postes-metalicos")'), 'legacy city page should redirect to /postes-metalicos')
assert(legacyCityPage.includes('robots: {'), 'legacy city page should declare robots metadata')
assert(!existsSync(resolveProjectFile('src/lib/cities-data.ts')), 'legacy cities-data with fixed delivery promises should be removed')

for (const file of regionalSourceFiles) {
  const source = readProjectFile(file)
  for (const forbidden of forbiddenRegionalSourceSignals) {
    assert(!source.includes(forbidden), `${file} should not include forbidden regional signal: ${forbidden}`)
  }
}

if (failures.length > 0) {
  console.error('\nRegional SEO audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Regional SEO audit passed.')
