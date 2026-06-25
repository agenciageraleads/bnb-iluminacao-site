import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const baseUrl = process.env.SEO_PUBLIC_BASE_URL || 'https://bebiluminacao.com.br'
const failures = []
const warnings = []

const expectedTargets = new Map([
  ['SEO-ACC-001', '/produtos/suporte-para-luminaria-publica'],
  ['SEO-ACC-002', '/produtos/chumbador-para-poste-metalico'],
  ['SEO-IMG-003', '/obras'],
  ['SEO-GEO-001', '/robots.txt'],
])

const htmlTargets = new Set(['SEO-ACC-001', 'SEO-ACC-002', 'SEO-IMG-003'])
const files = {
  doc: `${seoPackage}/AUDITORIA_PROFUNDA_PUBLICA_ITENS_200_BB.md`,
  csv: `${seoPackage}/artifacts/seo-ops-030-auditoria-profunda-publica-itens-200-2026-06-15.csv`,
  public200Csv: `${seoPackage}/artifacts/seo-ops-029-fila-validacao-itens-publicos-200-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
}

const requiredColumns = [
  'item_backlog',
  'target_publico',
  'http_status',
  'title_status',
  'canonical_status',
  'h1_status',
  'schema_status',
  'cta_status',
  'sitemap_status',
  'robots_status',
  'achado_principal',
  'risco',
  'proxima_acao',
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

function toUrl(target) {
  if (target.startsWith('http')) return target
  return new URL(target, baseUrl).toString()
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function firstMatch(source, patterns) {
  for (const pattern of patterns) {
    const match = source.match(pattern)
    if (match?.[1]) return stripTags(match[1])
  }

  return ''
}

function extractJsonLdTypes(html) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  const types = []
  const errors = []

  for (const script of scripts) {
    try {
      const parsed = JSON.parse(script[1].trim())
      const items = Array.isArray(parsed) ? parsed : [parsed]

      for (const item of items) {
        if (Array.isArray(item['@graph'])) {
          for (const graphItem of item['@graph']) {
            types.push(graphItem['@type'])
          }
        } else {
          types.push(item['@type'])
        }
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error))
    }
  }

  return {
    count: scripts.length,
    types: types.flat().filter(Boolean),
    errors,
  }
}

async function fetchText(target) {
  const url = toUrl(target)
  const started = Date.now()

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(15000),
      headers: {
        'user-agent': 'B&B SEO deep read-only audit/1.0',
      },
    })

    return {
      target,
      url,
      status: response.status,
      contentType: response.headers.get('content-type') ?? '',
      body: await response.text(),
      elapsedMs: Date.now() - started,
      error: '',
    }
  } catch (error) {
    return {
      target,
      url,
      status: 0,
      contentType: '',
      body: '',
      elapsedMs: Date.now() - started,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

function analyzeHtml(itemId, target, html, sitemapSource) {
  const title = firstMatch(html, [/<title[^>]*>([\s\S]*?)<\/title>/i])
  const description = firstMatch(html, [
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i,
  ])
  const canonical = firstMatch(html, [
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
  ])
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1]))
  const schemas = extractJsonLdTypes(html)
  const whatsappMentions = (html.match(/wa\.me|api\.whatsapp|whatsapp|WhatsApp/gi) ?? []).length
  const sitemapUrl = toUrl(target)
  const inSitemap = sitemapSource.includes(sitemapUrl)
  const genericTitle = title.includes('B&B') && title.includes('Solu')
  const expectedSchemaTypes = itemId.startsWith('SEO-ACC') ? ['Product', 'WebPage'] : ['WebPage']
  const hasExpectedSchema = expectedSchemaTypes.some((type) => schemas.types.includes(type))

  return {
    itemId,
    target,
    title,
    description,
    canonical,
    h1s,
    schemaTypes: schemas.types,
    schemaCount: schemas.count,
    schemaErrors: schemas.errors,
    whatsappMentions,
    inSitemap,
    titleStatus: genericTitle ? 'generico' : 'especifico',
    canonicalStatus: canonical ? 'presente' : 'ausente',
    h1Status: h1s.length === 1 ? 'unico' : `quantidade_${h1s.length}`,
    schemaStatus: hasExpectedSchema ? 'especifico' : 'generico_ou_incompleto',
    ctaStatus: whatsappMentions > 0 ? 'presente' : 'ausente',
    sitemapStatus: inSitemap ? 'presente' : 'ausente',
  }
}

function analyzeRobots(body) {
  const hasSitemap = body.includes(`Sitemap: ${new URL('/sitemap.xml', baseUrl).toString()}`)
  const hasCloudflareBlock = body.includes('# BEGIN Cloudflare Managed content')
  const blocksGptBot = /User-agent:\s*GPTBot[\s\S]*?Disallow:\s*\//i.test(body)
  const laterAllowsGptBot = /User-Agent:\s*GPTBot[\s\S]*?Allow:\s*\//i.test(body)
  const hasSearchSignal = body.includes('Content-Signal: search=yes,ai-train=no')

  return {
    hasSitemap,
    hasCloudflareBlock,
    blocksGptBot,
    laterAllowsGptBot,
    hasSearchSignal,
    conflict: blocksGptBot && laterAllowsGptBot,
  }
}

const doc = await readExpectedFile(files.doc)
const csvSource = await readExpectedFile(files.csv)
const public200Source = await readExpectedFile(files.public200Csv)
const backlogSource = await readExpectedFile(files.backlog)

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const public200Rows = public200Source ? parseCsv(public200Source).rows : []
const backlogRows = parseBacklogRows(backlogSource)
const backlogById = new Map(backlogRows.map((row) => [row.id, row]))
const public200Ids = new Set(public200Rows.map((row) => row.item_backlog))

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV sem coluna obrigatoria: ${column}`)
  }
}

if (csv.rows.length !== expectedTargets.size) {
  failures.push(`CSV deve conter ${expectedTargets.size} linhas; encontrado ${csv.rows.length}.`)
}

for (const [itemId, target] of expectedTargets) {
  const row = csv.rows.find((candidate) => candidate.item_backlog === itemId)
  const backlogRow = backlogById.get(itemId)

  if (!row) {
    failures.push(`Item esperado ausente do CSV: ${itemId}`)
    continue
  }

  if (row.target_publico !== target) {
    failures.push(`Target divergente em ${itemId}: esperado ${target}, encontrado ${row.target_publico}`)
  }

  if (!public200Ids.has(itemId)) {
    failures.push(`Item ${itemId} nao esta na fila publica 200 da Sprint 117.`)
  }

  if (!backlogRow) {
    failures.push(`Item ${itemId} nao existe no backlog.`)
  } else if (backlogRow.status !== 'pronto_para_publicacao_controlada') {
    failures.push(`Item ${itemId} deveria continuar pronto_para_publicacao_controlada; atual ${backlogRow.status}`)
  }

  if (!row.status_operacional.toLowerCase().includes('manter aberto')) {
    failures.push(`Item ${itemId} deve orientar manter aberto no status_operacional.`)
  }
}

for (const term of [
  'read-only',
  'canonical ausente',
  'schema generico',
  'sitemap publico',
  'conflito Cloudflare',
  'Nao alterar status',
  'npm run seo:audit:public-200-deep-readonly',
]) {
  if (!doc.includes(term)) {
    failures.push(`Documento da auditoria profunda nao menciona: ${term}`)
  }
}

const sitemap = await fetchText('/sitemap.xml')
if (sitemap.status !== 200) {
  failures.push(`Sitemap publico deveria responder 200; status=${sitemap.status || sitemap.error}`)
}

const liveResults = []

if (failures.length === 0) {
  for (const [itemId, target] of expectedTargets) {
    const response = await fetchText(target)

    if (response.status !== 200) {
      failures.push(`Target publico ${target} (${itemId}) deveria responder 200; status=${response.status || response.error}`)
      liveResults.push({ itemId, target, status: response.status, issueCount: 1 })
      continue
    }

    if (htmlTargets.has(itemId)) {
      const analysis = analyzeHtml(itemId, target, response.body, sitemap.body)
      const issues = []

      if (analysis.titleStatus === 'generico') issues.push('title_generico')
      if (analysis.canonicalStatus === 'ausente') issues.push('canonical_ausente')
      if (analysis.schemaStatus !== 'especifico') issues.push('schema_generico_ou_incompleto')
      if (analysis.sitemapStatus === 'ausente') issues.push('sitemap_ausente')
      if (analysis.ctaStatus === 'ausente') issues.push('cta_ausente')
      if (analysis.schemaErrors.length > 0) issues.push('schema_parse_error')

      for (const issue of issues) {
        warnings.push(`${itemId} ${target}: ${issue}`)
      }

      liveResults.push({
        itemId,
        target,
        status: response.status,
        titleStatus: analysis.titleStatus,
        canonicalStatus: analysis.canonicalStatus,
        h1Status: analysis.h1Status,
        schemaStatus: analysis.schemaStatus,
        ctaStatus: analysis.ctaStatus,
        sitemapStatus: analysis.sitemapStatus,
        h1: analysis.h1s.join(' | '),
        schemaTypes: analysis.schemaTypes.join('|'),
        issueCount: issues.length,
      })
    } else {
      const robots = analyzeRobots(response.body)
      const issues = []

      if (!robots.hasSitemap) issues.push('robots_sem_sitemap')
      if (robots.conflict) issues.push('conflito_cloudflare_local')
      if (!robots.hasSearchSignal) issues.push('content_signal_ausente')

      for (const issue of issues) {
        warnings.push(`${itemId} ${target}: ${issue}`)
      }

      liveResults.push({
        itemId,
        target,
        status: response.status,
        robotsStatus: robots.conflict ? 'conflito_cloudflare_local' : 'coerente',
        sitemapStatus: robots.hasSitemap ? 'presente' : 'ausente',
        issueCount: issues.length,
      })
    }
  }
}

console.log('Public 200 deep read-only audit summary')
console.log(`base_url=${baseUrl}`)
console.log(`public_200_targets=${expectedTargets.size}`)
console.log(`html_targets=${htmlTargets.size}`)
console.log(`robots_targets=1`)
console.log(`sitemap_status=${sitemap.status}`)
console.log(`targets_checked=${liveResults.length}`)
console.log(`http_200=${liveResults.filter((item) => item.status === 200).length}`)
console.log(`technical_gaps=${liveResults.reduce((total, item) => total + item.issueCount, 0)}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

for (const item of liveResults) {
  console.log(`${item.itemId} ${item.target} status=${item.status} issues=${item.issueCount}`)
  if (item.h1) console.log(`  h1=${item.h1}`)
  if (item.schemaTypes) console.log(`  schema=${item.schemaTypes}`)
  if (item.robotsStatus) console.log(`  robots=${item.robotsStatus}`)
}

if (warnings.length > 0) {
  console.warn('\nPublic 200 deep read-only findings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPublic 200 deep read-only audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPublic 200 deep read-only audit completed.')
