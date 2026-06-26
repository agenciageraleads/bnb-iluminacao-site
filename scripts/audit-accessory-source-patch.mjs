import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const expectedItems = new Map([
  [
    'SEO-ACC-001',
    {
      route: '/produtos/suporte-para-luminaria-publica',
      source: 'src/app/(site)/produtos/suporte-para-luminaria-publica/page.tsx',
      schemaId: 'suporte-luminaria-publica-schema',
      title: 'Suporte para Luminaria Publica | 1 a 4 Luminarias B&B',
      h1: 'Suporte para Luminaria Publica',
    },
  ],
  [
    'SEO-ACC-002',
    {
      route: '/produtos/chumbador-para-poste-metalico',
      source: 'src/app/(site)/produtos/chumbador-para-poste-metalico/page.tsx',
      schemaId: 'chumbador-poste-metalico-schema',
      title: 'Chumbador para Poste Metalico | Base Flangeada B&B',
      h1: 'Chumbador para Poste Metalico',
    },
  ],
])

const files = {
  doc: `${seoPackage}/PATCH_LOCAL_ACESSORIOS_PUBLICOS_200_BB.md`,
  csv: `${seoPackage}/artifacts/seo-ops-032-patch-local-acessorios-publicos-200-2026-06-15.csv`,
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
  'source_file',
  'title_local',
  'canonical_local',
  'schema_local',
  'sitemap_local',
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

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const correctionPackageRows = correctionPackageSource ? parseCsv(correctionPackageSource).rows : []
const deepAuditIds = new Set(deepAuditSource ? parseCsv(deepAuditSource).rows.map((row) => row.item_backlog) : [])
const backlogRows = parseBacklogRows(backlogSource)
const backlogById = new Map(backlogRows.map((row) => [row.id, row]))
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (csv.rows.length !== expectedItems.size) {
  failures.push(`CSV deve conter ${expectedItems.size} linhas; encontrado ${csv.rows.length}.`)
}

for (const [itemId, expected] of expectedItems) {
  const row = csv.rows.find((candidate) => candidate.item_backlog === itemId)
  const backlogRow = backlogById.get(itemId)
  const pageSource = await readExpectedFile(expected.source)

  if (!row) {
    failures.push(`Item ausente do CSV de patch local: ${itemId}`)
    continue
  }

  if (row.target_local !== expected.route) {
    failures.push(`Target local divergente em ${itemId}: esperado ${expected.route}, encontrado ${row.target_local}`)
  }

  if (row.source_file !== expected.source) {
    failures.push(`Source file divergente em ${itemId}: esperado ${expected.source}, encontrado ${row.source_file}`)
  }

  if (!backlogRow) {
    failures.push(`Item ${itemId} nao existe no backlog.`)
  } else if (backlogRow.status !== 'pronto_para_publicacao_controlada') {
    failures.push(`Item ${itemId} deve continuar pronto_para_publicacao_controlada; atual ${backlogRow.status}`)
  }

  if (!deepAuditIds.has(itemId)) {
    failures.push(`Item ${itemId} nao esta coberto pela auditoria profunda publica.`)
  }

  if (!correctionPackageRows.some((candidate) => candidate.item_backlog === itemId && candidate.patch_local_permitido === 'sim')) {
    failures.push(`Item ${itemId} nao esta marcado para patch local no pacote de correcao.`)
  }

  const pageUrl = `https://bebiluminacao.com.br${expected.route}`
  const sourceChecks = {
    metadata: pageSource.includes('export const metadata'),
    title: pageSource.includes(expected.title),
    canonical: pageSource.includes(`canonical: pageUrl`) && pageSource.includes(`const pageUrl = "${pageUrl}"`),
    productSchema: pageSource.includes('createProductSchema({'),
    webPageSchema: pageSource.includes('createWebPageSchema({'),
    breadcrumbSchema: pageSource.includes('createBreadcrumbSchema(pageUrl'),
    itemListSchema: pageSource.includes('createItemListSchema({'),
    faqSchema: pageSource.includes('createFaqSchema(pageUrl, faq)'),
    schemaOrg: pageSource.includes(`<SchemaOrg id="${expected.schemaId}" data={getSchema()} />`),
    h1: pageSource.includes(expected.h1),
    whatsapp: pageSource.includes('<WhatsAppLink'),
    sitemap: sitemap.includes(`'${expected.route}'`) || sitemap.includes(`"${expected.route}"`),
  }

  for (const [check, passed] of Object.entries(sourceChecks)) {
    if (!passed) {
      failures.push(`${itemId} falhou no check local: ${check}`)
    }
  }

  for (const field of ['title_local', 'canonical_local', 'schema_local', 'sitemap_local', 'cta_local']) {
    if (row[field] !== 'ok') {
      failures.push(`${itemId} deve registrar ${field}=ok.`)
    }
  }

  if (!row.status_operacional.toLowerCase().includes('aguarda publicacao')) {
    failures.push(`${itemId} deve registrar que aguarda publicacao/validacao publica.`)
  }
}

for (const term of [
  'patch local ja esta no codigo',
  'producao publica ainda precisa validar',
  'npm run seo:audit:accessory-source-patch',
  'npm run seo:audit:wave2',
  'Nao alterar status',
  'SEO-ACC-001',
  'SEO-ACC-002',
]) {
  if (!doc.includes(term)) {
    failures.push(`Documento do patch local de acessorios nao menciona: ${term}`)
  }
}

if (packageJson.scripts?.['seo:audit:accessory-source-patch'] !== 'node scripts/audit-accessory-source-patch.mjs') {
  failures.push('package.json sem script seo:audit:accessory-source-patch.')
}

if (!readiness.includes("['seo:audit:accessory-source-patch', 'Accessory source patch']")) {
  failures.push('Readiness geral nao inclui Accessory source patch.')
}

console.log('Accessory source patch audit summary')
console.log(`source_patch_items=${expectedItems.size}`)
console.log(`csv_rows=${csv.rows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nAccessory source patch warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nAccessory source patch audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nAccessory source patch audit completed.')
