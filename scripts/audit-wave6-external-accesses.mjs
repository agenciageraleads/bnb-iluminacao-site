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
  checklist: `${seoPackage}/CHECKLIST_GSC_GA4_INDEXACAO_P0.md`,
  finalUnlockPanel: `${seoPackage}/DESBLOQUEIO_EXECUTIVO_FINAL_TURNAROUND_BB.md`,
  collectionPackage: `${seoPackage}/COLETA_DESBLOQUEIOS_EXTERNOS_TURNAROUND_BB.md`,
  responsesCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  trackingComponent: 'src/components/Tracking.tsx',
  whatsappLink: 'src/components/ui/whatsapp-link.tsx',
  rootLayout: 'src/app/(site)/layout.tsx',
  sitemap: 'src/app/sitemap.ts',
  robots: 'src/app/robots.ts',
}

const requiredWaveIds = ['SEO-MEAS-001', 'SEO-MEAS-002', 'SEO-GBP-001', 'SEO-GBP-002']
const requiredEventParams = [
  'cta_channel',
  'cta_source',
  'cta_label',
  'page_path',
  'page_location',
  'whatsapp_phone',
  'has_prefilled_message',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
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
    .filter((line) => line.includes('audit summary') || line.includes('audit completed') || line.includes('warnings:'))
    .slice(-8)
}

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

function requireIncludes(label, source, terms) {
  for (const term of terms) {
    if (!source.includes(term)) {
      failures.push(`${label} nao menciona: ${term}`)
    }
  }
}

function parseBacklogStatus(source, itemId) {
  const line = source.split(/\r?\n/).find((item) => item.startsWith(`| ${itemId} |`))
  if (!line) return ''

  return line
    .split('|')
    .slice(1, -1)
    .map((column) => column.trim())
    .at(-1)
}

const publicationGate = await readExpectedFile(files.publicationGate)
const publicationQueueSource = await readExpectedFile(files.publicationQueue)
const checklist = await readExpectedFile(files.checklist)
const finalUnlockPanel = await readExpectedFile(files.finalUnlockPanel)
const collectionPackage = await readExpectedFile(files.collectionPackage)
const responsesSource = await readExpectedFile(files.responsesCsv)
const backlog = await readExpectedFile(files.backlog)
const trackingComponent = await readExpectedFile(files.trackingComponent)
const whatsappLink = await readExpectedFile(files.whatsappLink)
const rootLayout = await readExpectedFile(files.rootLayout)
const sitemap = await readExpectedFile(files.sitemap)
const robots = await readExpectedFile(files.robots)

const queueRows = publicationQueueSource ? parseCsv(publicationQueueSource).rows : []
const wave6 = queueRows.find((row) => row.onda === '6')
const wave6Ids = new Set(wave6?.backlog_ids.split(';').map((item) => item.trim()).filter(Boolean) ?? [])

if (!wave6) {
  failures.push('Fila de publicacao sem Onda 6.')
} else {
  for (const id of requiredWaveIds) {
    if (!wave6Ids.has(id)) {
      failures.push(`Onda 6 sem ID obrigatorio: ${id}`)
    }
  }

  if (wave6.status_atual !== 'bloqueado_ou_pendente_por_acesso') {
    failures.push(`Onda 6 com status inesperado: ${wave6.status_atual}`)
  }

  for (const signal of ['Search Console', 'Analytics', 'Tag Manager', 'Google Business Profile']) {
    if (!Object.values(wave6).join(' ').includes(signal)) {
      failures.push(`Onda 6 nao menciona sinal obrigatorio: ${signal}`)
    }
  }
}

for (const id of requiredWaveIds) {
  if (!publicationGate.includes(id)) {
    failures.push(`Gate de publicacao nao menciona ID da Onda 6: ${id}`)
  }
}

requireIncludes('Checklist GSC/GA4', checklist, [
  'Status: `pendente_acesso_externo`',
  'https://bebiluminacao.com.br/sitemap.xml',
  'whatsapp_click',
  'Tag Assistant',
  'GA4 DebugView',
  'concluido_codigo_pendente_acesso_externo',
])

for (const param of requiredEventParams) {
  if (!checklist.includes(param)) {
    failures.push(`Checklist GSC/GA4 sem parametro obrigatorio: ${param}`)
  }
}

requireIncludes('Painel executivo final', finalUnlockPanel, requiredWaveIds)
requireIncludes('Pacote de coleta externa', collectionPackage, [
  'Google Search Console',
  'Google Business Profile',
  'GO_GSC_GA4',
  'GO_GBP_AUDIT',
  'GO_GBP_UPDATE',
  'Nao enviem senha',
])

const responses = responsesSource ? parseCsv(responsesSource) : { header: [], rows: [] }
for (const requiredColumn of ['frente', 'item_backlog', 'status_resposta', 'go_autorizado', 'proximo_sprint']) {
  if (!responses.header.includes(requiredColumn)) {
    failures.push(`Registro de respostas sem coluna obrigatoria: ${requiredColumn}`)
  }
}

const responseRowsById = new Map(responses.rows.map((row) => [row.item_backlog, row]))
const expectedExternalResponses = {
  'SEO-MEAS-001': {
    status: 'recebido_insuficiente',
    go: 'nao',
    reason: 'GSC ainda depende de acesso efetivo validado na conta.',
  },
  'SEO-GBP-001': {
    status: 'validado',
    go: 'sim',
    reason: 'GBP informado pelo usuario e liberado para auditoria antes de alterar.',
  },
  'SEO-GBP-002': {
    status: 'validado',
    go: 'sim',
    reason: 'GBP update liberado apenas depois de auditoria do perfil correto.',
  },
}

for (const [id, expected] of Object.entries(expectedExternalResponses)) {
  const row = responseRowsById.get(id)
  if (!row) {
    failures.push(`Registro de respostas sem linha para ${id}.`)
    continue
  }

  if (row.status_resposta !== expected.status || row.go_autorizado !== expected.go) {
    failures.push(
      `Registro externo para ${id} deveria estar ${expected.status}/go=${expected.go}; encontrado ${row.status_resposta}/go=${row.go_autorizado}. Motivo: ${expected.reason}`
    )
  }
}

const expectedStatuses = {
  'SEO-MEAS-001': 'bloqueado',
  'SEO-MEAS-002': 'concluido_codigo_pendente_ga4',
  'SEO-GBP-001': 'pendente',
  'SEO-GBP-002': 'pendente',
}

for (const [id, expectedStatus] of Object.entries(expectedStatuses)) {
  const status = parseBacklogStatus(backlog, id)
  if (status !== expectedStatus) {
    failures.push(`Backlog ${id} deveria estar como ${expectedStatus}, encontrado ${status || 'ausente'}.`)
  }
}

requireIncludes('Tracking component', trackingComponent, [
  'googletagmanager.com/gtag/js',
  'googletagmanager.com/gtm.js',
  'window.dataLayer',
])

requireIncludes('Root layout', rootLayout, [
  'NEXT_PUBLIC_GTM_ID',
  'NEXT_PUBLIC_ADS_ID',
  'NEXT_PUBLIC_GA_ID',
  '<GoogleTagManager',
])

requireIncludes('WhatsAppLink', whatsappLink, ['event: \'whatsapp_click\'', 'window.dataLayer'])
for (const param of requiredEventParams) {
  if (!whatsappLink.includes(param)) {
    failures.push(`WhatsAppLink sem parametro de evento: ${param}`)
  }
}

if (!sitemap.includes('https://bebiluminacao.com.br') && !sitemap.includes('getBaseUrl')) {
  warnings.push('Sitemap nao mostra base publica de forma direta; confirmar output publico antes de enviar ao GSC.')
}

if (!robots.includes('sitemap.xml')) {
  failures.push('robots.ts deve expor sitemap.xml para descoberta externa.')
}

const externalUnlocks = runNpmScript('seo:audit:external-unlocks')
const externalUnlocksOutput = `${externalUnlocks.stdout || ''}\n${externalUnlocks.stderr || ''}`.trim()
if (externalUnlocks.status !== 0) {
  failures.push('seo:audit:external-unlocks falhou dentro da auditoria da Onda 6.')
}

const externalResponses = runNpmScript('seo:audit:external-responses')
const externalResponsesOutput = `${externalResponses.stdout || ''}\n${externalResponses.stderr || ''}`.trim()
if (externalResponses.status !== 0) {
  failures.push('seo:audit:external-responses falhou dentro da auditoria da Onda 6.')
}

const externalNextActions = runNpmScript('seo:audit:external-next-actions')
const externalNextActionsOutput = `${externalNextActions.stdout || ''}\n${externalNextActions.stderr || ''}`.trim()
if (externalNextActions.status !== 0) {
  failures.push('seo:audit:external-next-actions falhou dentro da auditoria da Onda 6.')
}

console.log('Wave 6 external accesses audit summary')
console.log(`wave6_ids=${wave6Ids.size}`)
console.log(`required_wave_ids=${requiredWaveIds.length}`)
console.log(`external_response_rows=${responses.rows.length}`)
console.log(`tracking_params=${requiredEventParams.length}`)
console.log(`external_unlocks_status=${externalUnlocks.status ?? 'error'}`)
console.log(`external_responses_status=${externalResponses.status ?? 'error'}`)
console.log(`external_next_actions_status=${externalNextActions.status ?? 'error'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

for (const line of summarizeOutput(externalUnlocksOutput)) {
  console.log(`external_unlocks: ${line}`)
}

for (const line of summarizeOutput(externalResponsesOutput)) {
  console.log(`external_responses: ${line}`)
}

for (const line of summarizeOutput(externalNextActionsOutput)) {
  console.log(`external_next_actions: ${line}`)
}

if (warnings.length > 0) {
  console.warn('\nWave 6 external accesses warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nWave 6 external accesses audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nWave 6 external accesses audit completed.')
