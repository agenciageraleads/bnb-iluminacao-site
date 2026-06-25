import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const outputFile = `${seoPackage}/artifacts/seo-found-002-canonical-coverage-2026-06-15.csv`
const failures = []
const warnings = []

const checks = [
  {
    id: 'static_seo_pages',
    group: 'static',
    file: 'src/app/(site)/fabricante-de-postes-metalicos/page.tsx',
    required: ['export const metadata', 'alternates:', 'canonical: pageUrl', 'SITE_URL'],
    canonicalRule: 'canonical absoluto por pageUrl nas P0 estaticas',
  },
  {
    id: 'blog_dynamic_slug',
    group: 'dynamic',
    file: 'src/app/(site)/blog/[slug]/page.tsx',
    required: ['generateMetadata', 'getBlogPostBySlug(slug)', 'canonical: pageUrl', '`${SITE_URL}/blog/${slug}`'],
    canonicalRule: 'canonical absoluto /blog/{slug} para posts CMS',
  },
  {
    id: 'product_category_dynamic',
    group: 'dynamic',
    file: 'src/app/(site)/produtos/[category]/page.tsx',
    required: [
      'generateMetadata',
      'getCategories()',
      'getProducts()',
      'canonical: pageUrl',
      '`${SITE_URL}/produtos/${category.slug}`',
      '`${SITE_URL}/produtos/item/${productAsCategory.id}`',
    ],
    canonicalRule: 'categoria canonical /produtos/{slug}; produto acessado como categoria canonicaliza para /produtos/item/{id}',
  },
  {
    id: 'product_item_dynamic',
    group: 'dynamic',
    file: 'src/app/(site)/produtos/item/[slug]/page.tsx',
    required: ['generateMetadata', 'getProducts()', 'canonical: pageUrl', '`${SITE_URL}/produtos/item/${product.id}`'],
    canonicalRule: 'canonical absoluto /produtos/item/{id} para produto CMS',
  },
  {
    id: 'case_dynamic_slug',
    group: 'dynamic',
    file: 'src/app/(site)/obras/[slug]/page.tsx',
    required: ['generateMetadata', 'getCaseStudyBySlug(slug)', 'canonical: url', '`${SITE_URL}/obras/${caseStudy.slug}`'],
    canonicalRule: 'canonical absoluto /obras/{slug} para cases',
  },
  {
    id: 'regional_uf_helper',
    group: 'dynamic',
    file: 'src/components/seo/regional-uf-page.tsx',
    required: ['getRegionalUfMetadata', 'canonical: pageUrl', '`${SITE_URL}${data.path}`'],
    canonicalRule: 'canonical absoluto por data.path para UFs',
  },
  {
    id: 'legacy_state_redirects',
    group: 'legacy',
    file: 'src/app/(site)/lp/estados/[estado]/page.tsx',
    required: ['generateMetadata', 'canonical:', 'legacyStateRedirects[estado]', 'redirect('],
    canonicalRule: 'rotas antigas por estado canonicalizam e redirecionam para UF nova',
  },
  {
    id: 'legacy_city_redirects',
    group: 'legacy',
    file: 'src/app/(site)/regioes-atendidas/cidades/[city]/page.tsx',
    required: ['generateMetadata', 'getLegacyCityDestination(city)', 'canonical:', 'redirect('],
    canonicalRule: 'rotas antigas de cidade canonicalizam para UF publicada ou /postes-metalicos',
  },
]

function csvEscape(value) {
  const text = String(value ?? '')
  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`
  }
  return text
}

async function readExpectedFile(file) {
  const absolutePath = path.join(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

const rows = []

for (const check of checks) {
  const source = await readExpectedFile(check.file)
  const missing = check.required.filter((signal) => !source.includes(signal))
  const status = missing.length === 0 ? 'pass' : 'fail'

  if (missing.length > 0) {
    failures.push(`${check.id} sem sinais obrigatorios: ${missing.join(', ')}`)
  }

  rows.push({
    id: check.id,
    group: check.group,
    source_file: check.file,
    canonical_rule: check.canonicalRule,
    required_signals: check.required.join(';'),
    missing_signals: missing.join(';'),
    status,
  })
}

const dynamicRows = rows.filter((row) => row.group === 'dynamic')
if (dynamicRows.length < 4) {
  warnings.push('Menos de quatro templates dinamicos cobertos pela auditoria canonical.')
}

await mkdir(path.dirname(path.resolve(root, outputFile)), { recursive: true })
await writeFile(
  path.resolve(root, outputFile),
  [
    'id,group,source_file,canonical_rule,required_signals,missing_signals,status',
    ...rows.map((row) =>
      [
        row.id,
        row.group,
        row.source_file,
        row.canonical_rule,
        row.required_signals,
        row.missing_signals,
        row.status,
      ]
        .map(csvEscape)
        .join(','),
    ),
  ].join('\n') + '\n',
)

console.log('Canonical coverage audit summary')
console.log(`checks=${rows.length}`)
console.log(`dynamic_checks=${dynamicRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)
console.log(`artifact=${outputFile}`)

if (warnings.length > 0) {
  console.warn('\nCanonical coverage audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nCanonical coverage audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nCanonical coverage audit completed.')
