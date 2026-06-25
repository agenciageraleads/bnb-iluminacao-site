import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const strict = process.argv.includes('--strict')
const baseUrl = process.env.SEO_PUBLIC_BASE_URL || 'https://bebiluminacao.com.br'
const failures = []
const warnings = []

const files = {
  publicAuditDoc: `${seoPackage}/AUDITORIA_PUBLICA_READONLY_ITENS_PRONTOS_BB.md`,
  publicAuditCsv: `${seoPackage}/artifacts/seo-ops-028-auditoria-publica-readonly-2026-06-15.csv`,
  postPublicationCsv: `${seoPackage}/artifacts/seo-ops-026-validacao-publica-pos-publicacao-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
}

const requiredColumns = [
  'item_backlog',
  'onda',
  'tipo_validacao',
  'targets_publicos',
  'resultado_esperado_antes_go',
  'acao_se_200',
  'acao_se_nao_200',
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
        status: columns.at(-1),
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

function normalizeTargets(value) {
  return value
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
}

function toUrl(target) {
  if (target.startsWith('http')) return target
  return new URL(target, baseUrl).toString()
}

async function fetchTarget(target) {
  const url = toUrl(target)
  const started = Date.now()

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(10000),
      headers: {
        'user-agent': 'B&B SEO read-only audit/1.0',
      },
    })

    return {
      target,
      url,
      status: response.status,
      ok: response.status >= 200 && response.status < 300,
      redirected: response.status >= 300 && response.status < 400,
      location: response.headers.get('location') ?? '',
      elapsedMs: Date.now() - started,
      error: '',
    }
  } catch (error) {
    return {
      target,
      url,
      status: 0,
      ok: false,
      redirected: false,
      location: '',
      elapsedMs: Date.now() - started,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

const publicAuditDoc = await readExpectedFile(files.publicAuditDoc)
const publicAuditCsvSource = await readExpectedFile(files.publicAuditCsv)
const postPublicationSource = await readExpectedFile(files.postPublicationCsv)
const backlog = await readExpectedFile(files.backlog)

const publicAuditCsv = publicAuditCsvSource ? parseCsv(publicAuditCsvSource) : { header: [], rows: [] }
const postPublicationRows = postPublicationSource ? parseCsv(postPublicationSource).rows : []
const backlogRows = parseBacklogRows(backlog)
const readyRows = backlogRows.filter((row) => row.status === 'pronto_para_publicacao_controlada')
const readyIds = new Set(readyRows.map((row) => row.id))
const publicAuditIds = new Set(publicAuditCsv.rows.map((row) => row.item_backlog))
const postPublicationIds = new Set(postPublicationRows.map((row) => row.item_backlog))

for (const column of requiredColumns) {
  if (!publicAuditCsv.header.includes(column)) {
    failures.push(`CSV de auditoria publica sem coluna obrigatoria: ${column}`)
  }
}

if (publicAuditCsv.rows.length !== readyRows.length) {
  failures.push(`CSV deve cobrir ${readyRows.length} itens prontos; encontrado ${publicAuditCsv.rows.length}.`)
}

for (const row of readyRows) {
  if (!publicAuditIds.has(row.id)) {
    failures.push(`Item pronto sem auditoria publica read-only: ${row.id}`)
  }
}

for (const row of publicAuditCsv.rows) {
  if (!readyIds.has(row.item_backlog)) {
    failures.push(`CSV contem item que nao esta pronto para publicacao controlada: ${row.item_backlog}`)
  }

  if (!postPublicationIds.has(row.item_backlog)) {
    failures.push(`Item ${row.item_backlog} nao esta coberto pela validacao pos-publicacao.`)
  }

  for (const field of ['targets_publicos', 'resultado_esperado_antes_go', 'acao_se_200', 'acao_se_nao_200']) {
    if (!row[field] || row[field].length < 5) {
      failures.push(`Campo ${field} ausente ou fraco em ${row.item_backlog}.`)
    }
  }
}

for (const term of [
  'https://bebiluminacao.com.br',
  'read-only',
  'npm run seo:audit:public-readonly-coverage',
  'Nao marcar item como concluido',
  'nao altera status do backlog',
]) {
  if (!publicAuditDoc.includes(term)) {
    failures.push(`Documento de auditoria publica nao menciona: ${term}`)
  }
}

const networkResults = []

if (failures.length === 0) {
  for (const row of publicAuditCsv.rows) {
    for (const target of normalizeTargets(row.targets_publicos)) {
      const result = await fetchTarget(target)
      networkResults.push({
        item_backlog: row.item_backlog,
        onda: row.onda,
        tipo_validacao: row.tipo_validacao,
        ...result,
      })
    }
  }
}

const okCount = networkResults.filter((item) => item.ok).length
const redirectCount = networkResults.filter((item) => item.redirected).length
const missingCount = networkResults.filter((item) => item.status === 404).length
const networkErrorCount = networkResults.filter((item) => item.status === 0).length
const otherStatusCount = networkResults.filter(
  (item) => !item.ok && !item.redirected && item.status !== 404 && item.status !== 0,
).length

if (networkErrorCount > 0) {
  warnings.push(`Falhas de rede na auditoria publica: ${networkErrorCount}. Repetir antes de decidir GO/NO-GO.`)
}

if (strict) {
  const badStrictResults = networkResults.filter((item) => !item.ok)
  for (const item of badStrictResults) {
    failures.push(`Modo strict exige 200 publico para ${item.item_backlog} em ${item.target}; status=${item.status || item.error}`)
  }
}

console.log('Public read-only coverage audit summary')
console.log(`mode=${strict ? 'strict' : 'inventory'}`)
console.log(`base_url=${baseUrl}`)
console.log(`ready_items=${readyRows.length}`)
console.log(`audit_rows=${publicAuditCsv.rows.length}`)
console.log(`targets_checked=${networkResults.length}`)
console.log(`http_2xx=${okCount}`)
console.log(`http_3xx=${redirectCount}`)
console.log(`http_404=${missingCount}`)
console.log(`other_status=${otherStatusCount}`)
console.log(`network_errors=${networkErrorCount}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

for (const item of networkResults) {
  const statusLabel = item.status === 0 ? `network_error:${item.error}` : `status=${item.status}`
  const redirectLabel = item.location ? ` location=${item.location}` : ''
  console.log(`${item.item_backlog} ${item.target} ${statusLabel}${redirectLabel} ${item.elapsedMs}ms`)
}

if (warnings.length > 0) {
  console.warn('\nPublic read-only coverage warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublic read-only coverage audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublic read-only coverage audit completed.')
