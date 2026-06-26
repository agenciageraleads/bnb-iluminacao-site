import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  queueCsv: `${seoPackage}/artifacts/seo-meas-006-fila-execucao-gsc-ga4-2026-06-15.csv`,
  publicEvidenceCsv: `${seoPackage}/artifacts/seo-meas-005-evidencia-publica-indexabilidade-2026-06-15.csv`,
  sprint150: `${seoPackage}/SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM.md`,
  sprint158: `${seoPackage}/SPRINT_158_EVIDENCIA_PUBLICA_INDEXABILIDADE.md`,
  checklist: `${seoPackage}/CHECKLIST_GSC_GA4_INDEXACAO_P0.md`,
  packageDoc: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'trilha',
  'ordem',
  'acao',
  'alvo',
  'lote',
  'prioridade',
  'status_execucao',
  'evidencia_aceita',
  'proibido',
  'criterio_avanco',
  'proximo_responsavel',
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

const queueCsvSource = await readExpectedFile(files.queueCsv)
const publicEvidenceCsvSource = await readExpectedFile(files.publicEvidenceCsv)
const sprint150 = await readExpectedFile(files.sprint150)
const sprint158 = await readExpectedFile(files.sprint158)
const checklist = await readExpectedFile(files.checklist)
const packageDoc = await readExpectedFile(files.packageDoc)
const packageJsonSource = await readExpectedFile(files.packageJson)

const queueCsv = queueCsvSource ? parseCsv(queueCsvSource) : { header: [], rows: [] }
const publicEvidenceCsv = publicEvidenceCsvSource ? parseCsv(publicEvidenceCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!queueCsv.header.includes(column)) {
    failures.push(`Fila GSC/GA4 sem coluna obrigatoria: ${column}`)
  }
}

const urlInspectionRows = queueCsv.rows.filter(
  (row) => row.acao === 'inspecionar_url_e_solicitar_indexacao_se_aplicavel',
)
const measurementRows = queueCsv.rows.filter((row) => ['gtm', 'ga4'].includes(row.trilha))

if (publicEvidenceCsv.rows.length !== 25) {
  failures.push(`Evidencia publica deveria ter 25 URLs; encontrado ${publicEvidenceCsv.rows.length}.`)
}

if (urlInspectionRows.length !== 25) {
  failures.push(`Fila GSC deveria ter 25 linhas de URL Inspection; encontrado ${urlInspectionRows.length}.`)
}

if (measurementRows.length !== 5) {
  failures.push(`Fila GA4/GTM deveria ter 5 linhas de medicao; encontrado ${measurementRows.length}.`)
}

if (queueCsv.rows.length !== 33) {
  failures.push(`Fila GSC/GA4 deveria ter 33 linhas totais; encontrado ${queueCsv.rows.length}.`)
}

for (const row of publicEvidenceCsv.rows) {
  if (row.indexable_public_surface !== 'sim' || row.evidence_status !== 'ok_para_gsc') {
    failures.push(`URL publica ainda nao esta pronta para GSC: ${row.url}`)
  }

  if (!urlInspectionRows.some((queueRow) => queueRow.alvo === row.url)) {
    failures.push(`Fila GSC/GA4 nao inclui URL publica: ${row.url}`)
  }
}

for (const row of queueCsv.rows) {
  if (row.status_execucao !== 'pendente_execucao_humana') {
    failures.push(`Linha ${row.ordem} deveria iniciar como pendente_execucao_humana.`)
  }

  if (!row.evidencia_aceita || !row.proibido || !row.criterio_avanco || !row.proximo_responsavel) {
    failures.push(`Linha ${row.ordem} tem criterio operacional fraco ou ausente.`)
  }
}

for (const expectedAction of [
  'confirmar_propriedade',
  'enviar_ou_reenviar_sitemap',
  'verificar_acoes_manuais_e_seguranca',
  'abrir_preview_tag_assistant',
  'clicar_cta_whatsapp_e_confirmar_disparo',
  'confirmar_realtime_ou_debugview',
  'conferir_parametros_evento',
  'decidir_key_event',
]) {
  if (!queueCsv.rows.some((row) => row.acao === expectedAction)) {
    failures.push(`Fila GSC/GA4 sem acao obrigatoria: ${expectedAction}`)
  }
}

for (const expected of [
  'whatsapp_click',
  'utm_source=google',
  'utm_medium=cpc',
  'utm_campaign=seo_pos_deploy_onda1',
  'cta_channel',
  'utm_term',
]) {
  assertIncludes(queueCsvSource, expected, 'Fila GSC/GA4')
}

for (const expected of [
  'Search Console',
  'GA4',
  'GTM',
  'sem senha',
  'whatsapp_click',
]) {
  assertIncludes(sprint150, expected, 'SPRINT_150_FICHA_EVIDENCIA_GSC_GA4_GTM.md')
}

for (const expected of [
  'artifacts/seo-meas-005-evidencia-publica-indexabilidade-2026-06-15.csv',
  'GTM publico presente',
]) {
  assertIncludes(sprint158, expected, 'SPRINT_158_EVIDENCIA_PUBLICA_INDEXABILIDADE.md')
}

for (const expected of [
  'artifacts/seo-meas-006-fila-execucao-gsc-ga4-2026-06-15.csv',
  'npm run seo:build:gsc-ga4-execution-queue',
  'npm run seo:audit:gsc-ga4-execution-queue',
]) {
  assertIncludes(checklist, expected, 'CHECKLIST_GSC_GA4_INDEXACAO_P0.md')
  assertIncludes(packageDoc, expected, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

const unsafeText = `${queueCsvSource}\n${checklist}\n${packageDoc}`
for (const pattern of [
  /GSC validado:\s*sim/i,
  /GA4 validado:\s*sim/i,
  /GTM validado:\s*sim/i,
  /sitemap enviado:\s*sim/i,
  /indexacao solicitada:\s*sim/i,
  /evento validado:\s*sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Fila GSC/GA4 sugere conclusao indevida ou coleta sensivel: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Fila GSC/GA4 nao pode conter segredo real.')
}

if (packageJson.scripts?.['seo:build:gsc-ga4-execution-queue'] !== 'node scripts/build-gsc-ga4-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:gsc-ga4-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:gsc-ga4-execution-queue'] !== 'node scripts/audit-gsc-ga4-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:gsc-ga4-execution-queue.')
}

console.log('GSC GA4 execution queue audit summary')
console.log(`queue_rows=${queueCsv.rows.length}`)
console.log(`url_inspection_rows=${urlInspectionRows.length}`)
console.log(`measurement_rows=${measurementRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nGSC GA4 execution queue warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nGSC GA4 execution queue audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nGSC GA4 execution queue audit completed.')
