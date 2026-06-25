import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const expectedItems = new Map([
  ['SEO-ACC-001', { target: '/produtos/suporte-para-luminaria-publica', type: 'patch_local_site' }],
  ['SEO-ACC-002', { target: '/produtos/chumbador-para-poste-metalico', type: 'patch_local_site' }],
  ['SEO-IMG-003', { target: '/obras', type: 'patch_local_site_governanca' }],
  ['SEO-GEO-001', { target: '/robots.txt', type: 'decisao_externa_cloudflare' }],
])

const files = {
  doc: `${seoPackage}/PACOTE_CORRECAO_PUBLICACAO_ITENS_200_BB.md`,
  csv: `${seoPackage}/artifacts/seo-ops-031-pacote-correcao-publicacao-itens-200-2026-06-15.csv`,
  deepAuditCsv: `${seoPackage}/artifacts/seo-ops-030-auditoria-profunda-publica-itens-200-2026-06-15.csv`,
  public200Csv: `${seoPackage}/artifacts/seo-ops-029-fila-validacao-itens-publicos-200-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  packageJson: 'package.json',
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const requiredColumns = [
  'item_backlog',
  'target_publico',
  'frente',
  'tipo_intervencao',
  'source_paths',
  'patch_local_permitido',
  'dependencia_externa',
  'pre_go',
  'comando_pre_patch',
  'comando_pos_patch',
  'evidencia_para_publicacao',
  'risco',
  'decisao',
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

function splitList(value) {
  return value
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
}

function validateSourcePath(itemId, sourcePath) {
  if (sourcePath.startsWith('externo:')) return

  const absolutePath = path.resolve(root, sourcePath)
  if (!existsSync(absolutePath)) {
    failures.push(`Source path ausente em ${itemId}: ${sourcePath}`)
  }
}

const doc = await readExpectedFile(files.doc)
const csvSource = await readExpectedFile(files.csv)
const deepAuditSource = await readExpectedFile(files.deepAuditCsv)
const public200Source = await readExpectedFile(files.public200Csv)
const backlogSource = await readExpectedFile(files.backlog)
const packageJsonSource = await readExpectedFile(files.packageJson)
const readiness = await readExpectedFile(files.readiness)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const deepAuditIds = new Set(deepAuditSource ? parseCsv(deepAuditSource).rows.map((row) => row.item_backlog) : [])
const public200Ids = new Set(public200Source ? parseCsv(public200Source).rows.map((row) => row.item_backlog) : [])
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

  if (!row) {
    failures.push(`Item ausente do pacote de correcao: ${itemId}`)
    continue
  }

  if (row.target_publico !== expected.target) {
    failures.push(`Target divergente em ${itemId}: esperado ${expected.target}, encontrado ${row.target_publico}`)
  }

  if (row.tipo_intervencao !== expected.type) {
    failures.push(`Tipo de intervencao divergente em ${itemId}: esperado ${expected.type}, encontrado ${row.tipo_intervencao}`)
  }

  if (!deepAuditIds.has(itemId)) {
    failures.push(`Item ${itemId} nao esta coberto pela auditoria profunda da Sprint 118.`)
  }

  if (!public200Ids.has(itemId)) {
    failures.push(`Item ${itemId} nao esta coberto pela fila publica 200 da Sprint 117.`)
  }

  if (!backlogRow) {
    failures.push(`Item ${itemId} nao existe no backlog.`)
  } else if (backlogRow.status !== 'pronto_para_publicacao_controlada') {
    failures.push(`Item ${itemId} deveria seguir pronto_para_publicacao_controlada; atual ${backlogRow.status}`)
  }

  for (const sourcePath of splitList(row.source_paths)) {
    validateSourcePath(itemId, sourcePath)
  }

  for (const field of ['pre_go', 'comando_pre_patch', 'comando_pos_patch', 'evidencia_para_publicacao', 'decisao']) {
    if (!row[field] || row[field].length < 8) {
      failures.push(`Campo ${field} ausente ou fraco em ${itemId}.`)
    }
  }

  if (itemId === 'SEO-GEO-001') {
    if (row.patch_local_permitido !== 'nao') {
      failures.push('SEO-GEO-001 nao deve permitir patch local sem decisao Cloudflare/GEO.')
    }

    if (!row.dependencia_externa.toLowerCase().includes('cloudflare')) {
      failures.push('SEO-GEO-001 deve declarar dependencia externa Cloudflare/GEO.')
    }
  } else if (row.patch_local_permitido !== 'sim') {
    failures.push(`${itemId} deve permitir patch local de site.`)
  }
}

for (const term of [
  'patch local de site',
  'decisao externa Cloudflare/GEO',
  'Nao aplicar patch',
  'npm run seo:audit:public-200-correction-package',
  'npm run seo:audit:public-200-deep-readonly',
  'GO_CORRECAO_ACC_001',
  'GO_DECISAO_GEO_CLOUDFLARE',
]) {
  if (!doc.includes(term)) {
    failures.push(`Documento do pacote de correcao nao menciona: ${term}`)
  }
}

if (packageJson.scripts?.['seo:audit:public-200-correction-package'] !== 'node scripts/audit-public-200-correction-package.mjs') {
  failures.push('package.json sem script seo:audit:public-200-correction-package.')
}

if (!readiness.includes("['seo:audit:public-200-correction-package', 'Public 200 correction package']")) {
  failures.push('Readiness geral nao inclui Public 200 correction package.')
}

console.log('Public 200 correction package audit summary')
console.log(`package_rows=${csv.rows.length}`)
console.log(`expected_items=${expectedItems.size}`)
console.log(`site_patch_items=${csv.rows.filter((row) => row.patch_local_permitido === 'sim').length}`)
console.log(`external_decision_items=${csv.rows.filter((row) => row.patch_local_permitido === 'nao').length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPublic 200 correction package warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublic 200 correction package audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublic 200 correction package audit completed.')
