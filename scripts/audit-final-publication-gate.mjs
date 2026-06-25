import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  report: `${seoPackage}/RELATORIO_GATE_FINAL_TAGS_PUBLICACAO_BUILD_LOCAL_2026-06-15.md`,
  csv: `${seoPackage}/artifacts/seo-pub-031-gate-final-tags-publicacao-build-local-2026-06-15.csv`,
  paidTrafficPackage: `${seoPackage}/PACOTE_VALIDACAO_TAGS_GSC_GA4_TRAFEGO_PAGO_BB.md`,
  postDeployPackage: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  tracking: 'src/components/Tracking.tsx',
  layout: 'src/app/(site)/layout.tsx',
  dockerfile: 'Dockerfile',
  releaseRunbook: 'docs/RUNBOOK_RELEASE.md',
  packageJson: 'package.json',
}

const requiredColumns = ['ordem', 'frente', 'item', 'status', 'evidencia', 'proxima_acao']
const requiredRows = [
  ['producao_publica', 'tags_google_ads_gtm_whatsapp', 'validado_publico'],
  ['producao_publica', 'indexabilidade_sitemap_robots', 'validado_publico'],
  ['gate_local', 'typecheck', 'pendente_tooling_local'],
  ['gate_local', 'lint', 'pendente_tooling_local'],
  ['gate_local', 'next_build_turbopack', 'pendente_tooling_local'],
  ['gate_local', 'next_build_webpack', 'pendente_tooling_local'],
  ['gate_local', 'next_build_compile', 'pendente_tooling_local'],
  ['seguranca_deploy', 'novo_deploy', 'bloqueado_ate_build_verde'],
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

async function readExpectedFile(file) {
  const absolutePath = path.resolve(root, file)

  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo obrigatorio ausente: ${file}`)
    return ''
  }

  return readFile(absolutePath, 'utf8')
}

function assertIncludes(source, expected, label) {
  if (!source.includes(expected)) {
    failures.push(`${label} nao contem: ${expected}`)
  }
}

const [
  report,
  csvSource,
  paidTrafficPackage,
  postDeployPackage,
  tracking,
  layout,
  dockerfile,
  releaseRunbook,
  packageJsonSource,
] = await Promise.all([
  readExpectedFile(files.report),
  readExpectedFile(files.csv),
  readExpectedFile(files.paidTrafficPackage),
  readExpectedFile(files.postDeployPackage),
  readExpectedFile(files.tracking),
  readExpectedFile(files.layout),
  readExpectedFile(files.dockerfile),
  readExpectedFile(files.releaseRunbook),
  readExpectedFile(files.packageJson),
])

const csv = csvSource ? parseCsv(csvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const normalizedReport = report.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

for (const column of requiredColumns) {
  if (!csv.header.includes(column)) {
    failures.push(`CSV do gate final sem coluna obrigatoria: ${column}`)
  }
}

for (const [frente, item, status] of requiredRows) {
  if (!csv.rows.some((row) => row.frente === frente && row.item === item && row.status === status)) {
    failures.push(`CSV do gate final sem linha obrigatoria: ${frente}/${item}/${status}`)
  }
}

for (const expected of [
  'gtm_public=present',
  'gtm_js_public=present',
  'google_ads_public=present',
  'whatsapp_anchor=present',
  'sitemap_status=200',
  'robots_status=200',
  'urls_checked=25',
  'indexable_public_surface=25',
  'typecheck',
  'lint',
  'next build',
  'Node 20',
  'NEXT_PUBLIC_GTM_ID',
  'NEXT_PUBLIC_ADS_ID',
  'NEXT_PUBLIC_GA_ID',
  'NEXT_PUBLIC_FB_PIXEL_ID',
]) {
  assertIncludes(report, expected, 'RELATORIO_GATE_FINAL_TAGS_PUBLICACAO_BUILD_LOCAL_2026-06-15.md')
}

for (const expected of ['nao mexeu no crm', 'nao criou novo deploy']) {
  assertIncludes(normalizedReport, expected, 'RELATORIO_GATE_FINAL_TAGS_PUBLICACAO_BUILD_LOCAL_2026-06-15.md')
}

for (const expected of ['GTM-P6MMNNGR', 'AW-824337235', 'googletagmanager.com/gtm.js', 'whatsapp_click']) {
  assertIncludes(report, expected, 'RELATORIO_GATE_FINAL_TAGS_PUBLICACAO_BUILD_LOCAL_2026-06-15.md')
  assertIncludes(paidTrafficPackage, expected, 'PACOTE_VALIDACAO_TAGS_GSC_GA4_TRAFEGO_PAGO_BB.md')
  assertIncludes(postDeployPackage, expected, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

for (const expected of ['googletagmanager.com/gtm.js', 'googletagmanager.com/gtag/js', 'window.dataLayer']) {
  assertIncludes(tracking, expected, 'Tracking.tsx')
}

for (const expected of ['GoogleTagManager', 'NEXT_PUBLIC_GTM_ID', 'NEXT_PUBLIC_ADS_ID', 'NEXT_PUBLIC_GA_ID']) {
  assertIncludes(layout, expected, 'layout.tsx')
}

for (const expected of ['FROM node:20-alpine', 'ARG NEXT_PUBLIC_GTM_ID', 'ARG NEXT_PUBLIC_ADS_ID', 'ARG NEXT_PUBLIC_GA_ID', 'RUN npm run build']) {
  assertIncludes(dockerfile, expected, 'Dockerfile')
}

for (const expected of ['NEXT_PUBLIC_*', 'tracking vars', 'build args', 'npm run typecheck', 'npm run lint', 'npm run build']) {
  assertIncludes(releaseRunbook, expected, 'RUNBOOK_RELEASE.md')
}

if (packageJson.scripts?.['seo:audit:final-publication-gate'] !== 'node scripts/audit-final-publication-gate.mjs') {
  failures.push('package.json sem script seo:audit:final-publication-gate.')
}

const unsafeText = `${report}\n${csvSource}`
if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Gate final nao pode conter segredo ou variavel sensivel.')
}

if (csv.rows.some((row) => row.status === 'validado_publico') && csv.rows.some((row) => row.status === 'pendente_tooling_local')) {
  warnings.push('Producao publica validada, mas novo deploy segue condicionado a build/tooling verde.')
}

console.log('Final publication gate audit summary')
console.log(`csv_rows=${csv.rows.length}`)
console.log(`validated_public_rows=${csv.rows.filter((row) => row.status === 'validado_publico').length}`)
console.log(`pending_tooling_rows=${csv.rows.filter((row) => row.status === 'pendente_tooling_local').length}`)
console.log(`blocked_deploy_rows=${csv.rows.filter((row) => row.status === 'bloqueado_ate_build_verde').length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nFinal publication gate warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nFinal publication gate failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nFinal publication gate completed.')
