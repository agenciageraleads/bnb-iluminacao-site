import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const expectedItem = {
  id: 'SEO-IMG-003',
  route: '/obras',
  pageSource: 'src/app/(site)/obras/page.tsx',
  casePageSource: 'src/app/(site)/obras/[slug]/page.tsx',
  casesSource: 'src/lib/seo/cases.ts',
  governanceSource: 'src/lib/seo/cases-governance.json',
  title: 'Obras Realizadas em Postes e Iluminacao | B&B',
  h1: 'Obras realizadas com postes e iluminacao',
}

const expectedCaseSlugs = [
  'postes-para-pracas-centralina-mg',
  'postes-para-quadras-esportivas-arapora-go',
  'postes-para-area-hospitalar-goiania-go',
]

const files = {
  doc: `${seoPackage}/PATCH_LOCAL_OBRAS_CASES_PUBLICOS_200_BB.md`,
  csv: `${seoPackage}/artifacts/seo-ops-033-patch-local-obras-cases-publicos-200-2026-06-15.csv`,
  correctionPackageCsv: `${seoPackage}/artifacts/seo-ops-031-pacote-correcao-publicacao-itens-200-2026-06-15.csv`,
  deepAuditCsv: `${seoPackage}/artifacts/seo-ops-030-auditoria-profunda-publica-itens-200-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  sitemap: 'src/app/sitemap.ts',
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'item_backlog',
  'target_local',
  'source_files',
  'title_local',
  'canonical_local',
  'schema_local',
  'sitemap_local',
  'case_governance_local',
  'cta_local',
  'comando_pre_publicacao',
  'evidencia_publica_pendente',
  'status_operacional',
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

function parseBacklogRows(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => line.startsWith('| SEO-'))
    .map((line) => {
      const columns = line
        .split('|')
        .slice(1, -1)
        .map((column) => column.trim())

      return {
        id: columns[0],
        status: columns[10],
      }
    })
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

const doc = await readExpectedFile(files.doc)
const csvSource = await readExpectedFile(files.csv)
const correctionPackageSource = await readExpectedFile(files.correctionPackageCsv)
const deepAuditSource = await readExpectedFile(files.deepAuditCsv)
const backlogSource = await readExpectedFile(files.backlog)
const sitemap = await readExpectedFile(files.sitemap)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)
const pageSource = await readExpectedFile(expectedItem.pageSource)
const casePageSource = await readExpectedFile(expectedItem.casePageSource)
const casesSource = await readExpectedFile(expectedItem.casesSource)
const governanceSource = await readExpectedFile(expectedItem.governanceSource)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const correctionPackageRows = correctionPackageSource ? parseCsv(correctionPackageSource).rows : []
const deepAuditIds = new Set(deepAuditSource ? parseCsv(deepAuditSource).rows.map((row) => row.item_backlog) : [])
const backlogRows = parseBacklogRows(backlogSource)
const backlogById = new Map(backlogRows.map((row) => [row.id, row]))
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const governance = governanceSource ? JSON.parse(governanceSource) : {}

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (csv.rows.length !== 1) {
  failures.push(`CSV deve conter 1 linha; encontrado ${csv.rows.length}.`)
}

const row = csv.rows.find((candidate) => candidate.item_backlog === expectedItem.id)
const backlogRow = backlogById.get(expectedItem.id)

if (!row) {
  failures.push(`Item ausente do CSV de patch local: ${expectedItem.id}`)
} else {
  if (row.target_local !== expectedItem.route) {
    failures.push(`Target local divergente em ${expectedItem.id}: esperado ${expectedItem.route}, encontrado ${row.target_local}`)
  }

  for (const sourcePath of [
    expectedItem.pageSource,
    expectedItem.casePageSource,
    expectedItem.casesSource,
    expectedItem.governanceSource,
    files.sitemap,
  ]) {
    if (!row.source_files.includes(sourcePath)) {
      failures.push(`CSV de ${expectedItem.id} nao menciona source path: ${sourcePath}`)
    }
  }

  for (const field of [
    'title_local',
    'canonical_local',
    'schema_local',
    'sitemap_local',
    'case_governance_local',
    'cta_local',
  ]) {
    if (row[field] !== 'ok') {
      failures.push(`${expectedItem.id} deve registrar ${field}=ok.`)
    }
  }

  if (!row.status_operacional.toLowerCase().includes('aguarda publicacao')) {
    failures.push(`${expectedItem.id} deve registrar que aguarda publicacao/validacao publica.`)
  }
}

if (!backlogRow) {
  failures.push(`Item ${expectedItem.id} nao existe no backlog.`)
} else if (backlogRow.status !== 'pronto_para_publicacao_controlada') {
  failures.push(`Item ${expectedItem.id} deve continuar pronto_para_publicacao_controlada; atual ${backlogRow.status}`)
}

if (!deepAuditIds.has(expectedItem.id)) {
  failures.push(`Item ${expectedItem.id} nao esta coberto pela auditoria profunda publica.`)
}

if (!correctionPackageRows.some((candidate) => candidate.item_backlog === expectedItem.id && candidate.patch_local_permitido === 'sim')) {
  failures.push(`Item ${expectedItem.id} nao esta marcado para patch local no pacote de correcao.`)
}

const pageUrl = `https://bebiluminacao.com.br${expectedItem.route}`
const pageChecks = {
  metadata: pageSource.includes('export const metadata'),
  title: pageSource.includes(expectedItem.title),
  canonical: pageSource.includes('canonical: pageUrl') && pageSource.includes(`const pageUrl = "${pageUrl}"`),
  organizationSchema: pageSource.includes('createFactoryOrganizationSchema()'),
  webPageSchema: pageSource.includes('createWebPageSchema({'),
  breadcrumbSchema: pageSource.includes('createBreadcrumbSchema(pageUrl'),
  itemListSchema: pageSource.includes('createItemListSchema({'),
  imageSchemas: pageSource.includes('createImageSchemas('),
  schemaOrg: pageSource.includes('<SchemaOrg id="obras-schema" data={getSchema()} />'),
  caseStudies: pageSource.includes('caseStudies.map'),
  h1: pageSource.includes(expectedItem.h1),
  whatsapp: pageSource.includes('<WhatsAppLink'),
}

const casePageChecks = {
  generateStaticParams: casePageSource.includes('generateStaticParams'),
  generateMetadata: casePageSource.includes('generateMetadata'),
  getCaseStudyBySlug: casePageSource.includes('getCaseStudyBySlug'),
  canonical: casePageSource.includes('alternates:') && casePageSource.includes('canonical: url'),
  articleSchema: casePageSource.includes('createArticleSchema'),
  webPageSchema: casePageSource.includes('createWebPageSchema({'),
  breadcrumbSchema: casePageSource.includes('createBreadcrumbSchema(pageUrl'),
  itemListSchema: casePageSource.includes('createItemListSchema({'),
  imageSchemas: casePageSource.includes('createImageSchemas(['),
  whatsapp: casePageSource.includes('<WhatsAppLink'),
}

const sitemapChecks = {
  obrasRoute: sitemap.includes("'/obras'") || sitemap.includes('"/obras"'),
  caseStudies: sitemap.includes('caseStudies'),
  caseRoutes: sitemap.includes('caseRoutes'),
}

for (const [check, passed] of Object.entries(pageChecks)) {
  if (!passed) {
    failures.push(`${expectedItem.id} falhou no check local da pagina /obras: ${check}`)
  }
}

for (const [check, passed] of Object.entries(casePageChecks)) {
  if (!passed) {
    failures.push(`${expectedItem.id} falhou no check local das paginas de case: ${check}`)
  }
}

for (const [check, passed] of Object.entries(sitemapChecks)) {
  if (!passed) {
    failures.push(`${expectedItem.id} falhou no check local do sitemap: ${check}`)
  }
}

for (const slug of expectedCaseSlugs) {
  if (!casesSource.includes(`slug: "${slug}"`)) {
    failures.push(`Case esperado ausente em cases.ts: ${slug}`)
  }
}

for (const field of ['imageAlt', 'productHref', 'applicationHref', 'ctaMessage']) {
  if (!casesSource.includes(field)) {
    failures.push(`cases.ts deve conter campo SEO/comercial: ${field}`)
  }
}

if (!Array.isArray(governance.approvedNominalCaseSlugs)) {
  failures.push('cases-governance.json deve conter approvedNominalCaseSlugs como array.')
}

if (!Array.isArray(governance.approvedNominalPortfolioTitles)) {
  failures.push('cases-governance.json deve conter approvedNominalPortfolioTitles como array.')
}

for (const term of [
  'patch local ja esta no codigo',
  'producao publica ainda precisa validar',
  'npm run seo:audit:obras-source-patch',
  'npm run seo:audit:wave3',
  'Nao alterar status',
  'SEO-IMG-003',
]) {
  if (!doc.includes(term)) {
    failures.push(`Documento do patch local de obras/cases nao menciona: ${term}`)
  }
}

if (packageJson.scripts?.['seo:audit:obras-source-patch'] !== 'node scripts/audit-obras-source-patch.mjs') {
  failures.push('package.json sem script seo:audit:obras-source-patch.')
}

if (!readiness.includes("['seo:audit:obras-source-patch', 'Obras source patch']")) {
  failures.push('Readiness geral nao inclui Obras source patch.')
}

console.log('Obras source patch audit summary')
console.log('source_patch_items=1')
console.log(`case_pages=${expectedCaseSlugs.length}`)
console.log(`csv_rows=${csv.rows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nObras source patch warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nObras source patch audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nObras source patch audit completed.')
