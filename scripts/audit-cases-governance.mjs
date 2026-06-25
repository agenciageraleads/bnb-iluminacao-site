import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const strict = process.argv.includes('--strict')
const warnings = []
const failures = []

const files = {
  caseStudies: 'src/lib/seo/cases.ts',
  portfolioItems: 'src/lib/constants.ts',
  obrasPage: 'src/app/(site)/obras/page.tsx',
  casePage: 'src/app/(site)/obras/[slug]/page.tsx',
  governance: 'src/lib/seo/cases-governance.json',
}

const nominalTerms = [
  'Burger King',
  'Celia Camara',
  'Célia Câmara',
  'Centro de Esportes UFG',
  'FIEAC',
  'Leroy Merlin',
  'Maternidade',
  'Portal do Sol',
  'Reserva do Parque',
  'SENAI',
  'Sistema FIEAC SENAI',
  'UFG',
]

const requiredCaseFields = [
  'slug',
  'title',
  'shortTitle',
  'category',
  'location',
  'city',
  'state',
  'product',
  'productHref',
  'applicationHref',
  'image',
  'imageAlt',
  'summary',
  'context',
  'solution',
  'outcomes',
  'ctaMessage',
]

function findArrayBlock(source, exportName, endMarker) {
  const start = source.indexOf(`export const ${exportName}`)
  if (start === -1) return ''

  const blockStart = source.indexOf('[', start)
  const blockEnd = endMarker ? source.indexOf(endMarker, blockStart) : source.indexOf('\n]\n', blockStart)

  if (blockStart === -1 || blockEnd === -1) return ''
  return source.slice(blockStart, blockEnd)
}

function splitObjectBlocks(arrayBlock) {
  const blocks = []
  let depth = 0
  let start = -1

  for (let index = 0; index < arrayBlock.length; index += 1) {
    const char = arrayBlock[index]
    if (char === '{') {
      if (depth === 0) start = index
      depth += 1
    }
    if (char === '}') {
      depth -= 1
      if (depth === 0 && start !== -1) {
        blocks.push(arrayBlock.slice(start, index + 1))
        start = -1
      }
    }
  }

  return blocks
}

function getField(block, field) {
  const regexp = new RegExp(`${field}:\\s*["']([^"']+)["']`)
  return block.match(regexp)?.[1] ?? ''
}

function findNominalTerms(source) {
  return nominalTerms.filter((term) => source.includes(term))
}

async function readExpectedFile(file) {
  try {
    return await readFile(path.join(root, file), 'utf8')
  } catch (error) {
    failures.push(`Arquivo esperado nao encontrado ou ilegivel: ${file}`)
    return ''
  }
}

async function readOptionalJson(file) {
  try {
    return JSON.parse(await readFile(path.join(root, file), 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') {
      warnings.push(`Arquivo opcional de governanca nao encontrado: ${file}`)
      return {}
    }
    failures.push(`Arquivo de governanca invalido ou ilegivel: ${file}`)
    return {}
  }
}

const caseSource = await readExpectedFile(files.caseStudies)
const constantsSource = await readExpectedFile(files.portfolioItems)
const obrasPageSource = await readExpectedFile(files.obrasPage)
const casePageSource = await readExpectedFile(files.casePage)
const governance = await readOptionalJson(files.governance)

const approvedNominalCaseSlugs = new Set(governance.approvedNominalCaseSlugs ?? [])
const approvedNominalPortfolioTitles = new Set(governance.approvedNominalPortfolioTitles ?? [])

const caseBlocks = splitObjectBlocks(findArrayBlock(caseSource, 'caseStudies', 'export function getCaseStudyBySlug'))
const portfolioBlocks = splitObjectBlocks(findArrayBlock(constantsSource, 'portfolioItems', 'export const catalogs'))

const cases = caseBlocks.map((block) => ({
  block,
  slug: getField(block, 'slug'),
  title: getField(block, 'title'),
  shortTitle: getField(block, 'shortTitle'),
  location: getField(block, 'location'),
  image: getField(block, 'image'),
  nominalTerms: findNominalTerms(block),
  missingFields: requiredCaseFields.filter((field) => !block.includes(`${field}:`)),
}))

const portfolioItems = portfolioBlocks.map((block) => ({
  block,
  title: getField(block, 'title'),
  location: getField(block, 'location'),
  image: getField(block, 'image'),
  nominalTerms: findNominalTerms(block),
}))

const caseSlugs = cases.map((item) => item.slug).filter(Boolean)
const duplicatedSlugs = caseSlugs.filter((slug, index) => caseSlugs.indexOf(slug) !== index)
const nominalCaseItems = cases.filter((item) => item.nominalTerms.length > 0)
const nominalPortfolioItems = portfolioItems.filter((item) => item.nominalTerms.length > 0)
const unapprovedNominalCaseItems = nominalCaseItems.filter((item) => !approvedNominalCaseSlugs.has(item.slug))
const unapprovedNominalPortfolioItems = nominalPortfolioItems.filter((item) => !approvedNominalPortfolioTitles.has(item.title))

if (cases.length === 0) {
  failures.push('Nenhum case SEO encontrado em src/lib/seo/cases.ts.')
}

if (portfolioItems.length === 0) {
  warnings.push('Nenhum item de portfolio encontrado em src/lib/constants.ts.')
}

if (duplicatedSlugs.length > 0) {
  failures.push(`Slugs duplicados em caseStudies: ${[...new Set(duplicatedSlugs)].join(', ')}`)
}

for (const item of cases) {
  if (item.missingFields.length > 0) {
    failures.push(`Case ${item.slug || item.title || 'sem identificador'} sem campos obrigatorios: ${item.missingFields.join(', ')}`)
  }
}

if (!obrasPageSource.includes('caseStudies')) {
  warnings.push('Pagina /obras nao referencia caseStudies explicitamente.')
}

if (!casePageSource.includes('generateStaticParams') || !casePageSource.includes('getCaseStudyBySlug')) {
  failures.push('Pagina /obras/[slug] nao parece gerar rotas a partir de caseStudies.')
}

if (nominalCaseItems.length > 0) {
  warnings.push(`Cases SEO com nome proprio/cliente pendente de validacao comercial: ${nominalCaseItems.map((item) => item.slug || item.title).join(', ')}`)
}

if (nominalPortfolioItems.length > 0) {
  warnings.push(`Portfolio com nome proprio/cliente pendente de validacao comercial: ${nominalPortfolioItems.map((item) => item.title).join(', ')}`)
}

if (strict && unapprovedNominalCaseItems.length > 0) {
  failures.push('Modo strict nao permite case SEO nominal sem validacao comercial documentada ou anonimizacao aplicada.')
}

if (strict && unapprovedNominalPortfolioItems.length > 0) {
  failures.push('Modo strict nao permite portfolio nominal sem validacao comercial documentada ou anonimizacao aplicada.')
}

console.log('Cases governance audit summary')
console.log(`mode=${strict ? 'strict' : 'inventory'}`)
console.log(`case_pages=${cases.length}`)
console.log(`portfolio_items=${portfolioItems.length}`)
console.log(`nominal_case_items=${nominalCaseItems.length}`)
console.log(`nominal_portfolio_items=${nominalPortfolioItems.length}`)
console.log(`approved_nominal_case_items=${nominalCaseItems.length - unapprovedNominalCaseItems.length}`)
console.log(`approved_nominal_portfolio_items=${nominalPortfolioItems.length - unapprovedNominalPortfolioItems.length}`)
console.log(`unapproved_nominal_case_items=${unapprovedNominalCaseItems.length}`)
console.log(`unapproved_nominal_portfolio_items=${unapprovedNominalPortfolioItems.length}`)
console.log(`case_slugs=${caseSlugs.join(', ') || 'none'}`)

if (warnings.length > 0) {
  console.warn('\nCases governance warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nCases governance audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nCases governance audit completed.')
