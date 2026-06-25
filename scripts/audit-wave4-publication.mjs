import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  publicationGate: `${seoPackage}/GATE_PUBLICACAO_CONTROLADA_SPRINTS_LOCAIS_SEO_BB.md`,
  publicationQueue: `${seoPackage}/artifacts/seo-pub-001-fila-publicacao-controlada-2026-06-15.csv`,
  regionalData: 'src/lib/seo/regional-ufs.ts',
  regionalPage: 'src/components/seo/regional-uf-page.tsx',
  sitemap: 'src/app/sitemap.ts',
  robots: 'src/app/robots.ts',
}

const requiredWaveIds = ['SEO-REG-002', 'SEO-GEO-001']
const requiredRegionalPaths = [
  '/postes-metalicos-sao-paulo',
  '/postes-metalicos-minas-gerais',
  '/postes-metalicos-rio-de-janeiro',
  '/postes-metalicos-parana',
  '/postes-metalicos-santa-catarina',
  '/postes-metalicos-rio-grande-do-sul',
  '/postes-metalicos-bahia',
  '/postes-metalicos-pernambuco',
  '/postes-metalicos-ceara',
  '/postes-metalicos-para',
  '/postes-metalicos-mato-grosso',
  '/postes-metalicos-mato-grosso-do-sul',
  '/postes-metalicos-goias',
  '/postes-metalicos-distrito-federal',
  '/postes-metalicos-tocantins',
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
const regionalData = await readExpectedFile(files.regionalData)
const regionalPage = await readExpectedFile(files.regionalPage)
const sitemap = await readExpectedFile(files.sitemap)
const robots = await readExpectedFile(files.robots)

const queueRows = publicationQueueSource ? parseCsv(publicationQueueSource).rows : []
const wave4 = queueRows.find((row) => row.onda === '4')
const wave4Ids = new Set(wave4?.backlog_ids.split(';').map((item) => item.trim()).filter(Boolean) ?? [])

if (!wave4) {
  failures.push('Fila de publicacao sem Onda 4.')
} else {
  for (const id of requiredWaveIds) {
    if (!wave4Ids.has(id)) {
      failures.push(`Onda 4 sem ID obrigatorio: ${id}`)
    }
  }

  if (!wave4.pre_deploy_obrigatorio.includes('seo:audit:regional')) {
    failures.push('Onda 4 deve exigir seo:audit:regional no pre-deploy.')
  }

  if (!wave4.pre_deploy_obrigatorio.includes('seo:audit:robots')) {
    failures.push('Onda 4 deve exigir seo:audit:robots no pre-deploy.')
  }
}

for (const id of requiredWaveIds) {
  if (!publicationGate.includes(id)) {
    failures.push(`Gate de publicacao nao menciona ID da Onda 4: ${id}`)
  }
}

for (const regionalPath of requiredRegionalPaths) {
  if (!regionalData.includes(`path: "${regionalPath}"`)) {
    failures.push(`Dados regionais sem path: ${regionalPath}`)
  }

  if (!sitemap.includes(`'${regionalPath}'`)) {
    failures.push(`Sitemap sem path regional: ${regionalPath}`)
  }
}

if (sitemap.includes('/lp/estados/')) {
  failures.push('Sitemap nao deve conter /lp/estados/.')
}

if (!regionalPage.includes('Organization') || regionalPage.includes('LocalBusiness')) {
  failures.push('Pagina regional deve usar Organization nacional e nao LocalBusiness.')
}

for (const requiredSignal of ['aiSearchAndReferralBots', 'aiTrainingAndDatasetBots', "const privatePaths = ['/admin/', '/api/']"]) {
  if (!robots.includes(requiredSignal)) {
    failures.push(`robots.ts sem sinal obrigatorio: ${requiredSignal}`)
  }
}

const regionalAudit = runNpmScript('seo:audit:regional')
const regionalAuditOutput = `${regionalAudit.stdout || ''}\n${regionalAudit.stderr || ''}`.trim()
if (regionalAudit.status !== 0) {
  failures.push('seo:audit:regional falhou dentro da auditoria da Onda 4.')
}

const robotsAudit = runNpmScript('seo:audit:robots')
const robotsAuditOutput = `${robotsAudit.stdout || ''}\n${robotsAudit.stderr || ''}`.trim()
if (robotsAudit.status !== 0) {
  failures.push('seo:audit:robots falhou dentro da auditoria da Onda 4.')
}

console.log('Wave 4 publication audit summary')
console.log(`regional_paths=${requiredRegionalPaths.length}`)
console.log(`wave4_ids=${wave4Ids.size}`)
console.log(`regional_audit_status=${regionalAudit.status ?? 'error'}`)
console.log(`robots_audit_status=${robotsAudit.status ?? 'error'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

for (const line of summarizeOutput(regionalAuditOutput)) {
  console.log(`regional: ${line}`)
}

for (const line of summarizeOutput(robotsAuditOutput)) {
  console.log(`robots: ${line}`)
}

if (warnings.length > 0) {
  console.warn('\nWave 4 publication warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 4 publication audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 4 publication audit completed.')
