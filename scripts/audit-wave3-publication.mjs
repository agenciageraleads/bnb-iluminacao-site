import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const failures = []
const warnings = []
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'

const files = {
  publicationGate: `${seoPackage}/GATE_PUBLICACAO_CONTROLADA_SPRINTS_LOCAIS_SEO_BB.md`,
  publicationQueue: `${seoPackage}/artifacts/seo-pub-001-fila-publicacao-controlada-2026-06-15.csv`,
  casesGovernance: 'src/lib/seo/cases-governance.json',
  cases: 'src/lib/seo/cases.ts',
  obrasPage: 'src/app/(site)/obras/page.tsx',
  casePage: 'src/app/(site)/obras/[slug]/page.tsx',
  sitemap: 'src/app/sitemap.ts',
  imageManifest: 'src/lib/seo/images.ts',
}

const requiredReadyIds = [
  'SEO-IMG-001',
  'SEO-IMG-002',
  'SEO-IMG-003',
  'SEO-IMG-004',
  'SEO-IMG-006',
  'SEO-IMG-007',
  'SEO-IMG-008',
  'SEO-IMG-011',
]

const blockedNominalId = 'SEO-IMG-009'

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
  const lines = source.trimEnd().split(/\r?\n/)
  const header = parseCsvLine(lines[0])
  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line)
    return Object.fromEntries(header.map((column, index) => [column, values[index] ?? '']))
  })

  return { header, rows }
}

function runNpmScript(scriptName) {
  return spawnSync('npm', ['run', scriptName], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 8,
    timeout: 120000,
  })
}

function summarizeOutput(output) {
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.includes('audit') || line.includes('passed') || line.includes('completed') || line.includes('failed'))
    .slice(-6)
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

const publicationGate = await readExpectedFile(files.publicationGate)
const publicationQueueSource = await readExpectedFile(files.publicationQueue)
const casesGovernanceSource = await readExpectedFile(files.casesGovernance)
const casesSource = await readExpectedFile(files.cases)
const obrasPage = await readExpectedFile(files.obrasPage)
const casePage = await readExpectedFile(files.casePage)
const sitemap = await readExpectedFile(files.sitemap)
const imageManifest = await readExpectedFile(files.imageManifest)

const queueRows = publicationQueueSource ? parseCsv(publicationQueueSource).rows : []
const wave3 = queueRows.find((row) => row.onda === '3')
const wave3Ids = new Set(wave3?.backlog_ids.split(';').map((item) => item.trim()).filter(Boolean) ?? [])

if (!wave3) {
  failures.push('Fila de publicacao sem Onda 3.')
} else {
  for (const id of requiredReadyIds) {
    if (!wave3Ids.has(id)) {
      failures.push(`Onda 3 sem ID pronto obrigatorio: ${id}`)
    }
  }

  if (wave3Ids.has(blockedNominalId)) {
    failures.push(`${blockedNominalId} nao deve estar na Onda 3 publicavel sem validacao comercial.`)
  }

  if (!wave3.pre_deploy_obrigatorio.includes('seo:audit:images')) {
    failures.push('Onda 3 deve exigir seo:audit:images no pre-deploy.')
  }

  if (!wave3.pre_deploy_obrigatorio.includes('seo:audit:cases:strict')) {
    failures.push('Onda 3 deve exigir seo:audit:cases:strict no pre-deploy.')
  }
}

for (const id of requiredReadyIds) {
  if (!publicationGate.includes(id)) {
    failures.push(`Gate de publicacao nao menciona ID da Onda 3: ${id}`)
  }
}

if (!publicationGate.includes(blockedNominalId) || !publicationGate.includes('confirmacao comercial')) {
  failures.push('Gate de publicacao deve manter SEO-IMG-009 bloqueado ate confirmacao comercial.')
}

if (!obrasPage.includes('caseStudies') || !obrasPage.includes('createImageSchemas')) {
  failures.push('Pagina /obras deve usar caseStudies e createImageSchemas.')
}

if (!casePage.includes('generateStaticParams') || !casePage.includes('getCaseStudyBySlug')) {
  failures.push('Pagina /obras/[slug] deve gerar rotas a partir de caseStudies.')
}

if (!sitemap.includes('caseStudies') || !sitemap.includes('caseRoutes')) {
  failures.push('Sitemap deve incluir rotas de cases a partir de caseStudies.')
}

if (!imageManifest.includes('seoImageAssets') || !imageManifest.includes('getProductImageAlt')) {
  failures.push('Manifest de imagens deve expor assets SEO e helper de alt.')
}

try {
  const governance = JSON.parse(casesGovernanceSource)
  const approvedCases = governance.approvedNominalCaseSlugs ?? []
  const approvedPortfolio = governance.approvedNominalPortfolioTitles ?? []

  if (approvedCases.length > 0 || approvedPortfolio.length > 0) {
    warnings.push('Governanca de cases tem itens nominais aprovados; confirmar que ha autorizacao comercial anexada.')
  }
} catch {
  failures.push('cases-governance.json invalido.')
}

if (!casesSource.includes('caseStudies')) {
  failures.push('Fonte de cases nao exporta caseStudies.')
}

const imageAudit = runNpmScript('seo:audit:images')
const imageAuditOutput = `${imageAudit.stdout || ''}\n${imageAudit.stderr || ''}`.trim()
if (imageAudit.status !== 0) {
  failures.push('seo:audit:images falhou dentro da auditoria da Onda 3.')
}

const casesStrictAudit = runNpmScript('seo:audit:cases:strict')
const casesStrictOutput = `${casesStrictAudit.stdout || ''}\n${casesStrictAudit.stderr || ''}`.trim()
if (casesStrictAudit.status !== 0) {
  failures.push('seo:audit:cases:strict falhou dentro da auditoria da Onda 3.')
}

console.log('Wave 3 publication audit summary')
console.log(`ready_ids=${requiredReadyIds.length}`)
console.log(`wave3_ids=${wave3Ids.size}`)
console.log(`image_audit_status=${imageAudit.status ?? 'error'}`)
console.log(`cases_strict_status=${casesStrictAudit.status ?? 'error'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

for (const line of summarizeOutput(imageAuditOutput)) {
  console.log(`image: ${line}`)
}

for (const line of summarizeOutput(casesStrictOutput)) {
  console.log(`cases: ${line}`)
}

if (warnings.length > 0) {
  console.warn('\nWave 3 publication warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 3 publication audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 3 publication audit completed.')
