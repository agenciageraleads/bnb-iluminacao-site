import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint148: `${seoPackage}/SPRINT_148_AUDITORIA_GBP_READONLY.md`,
  report148: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_148_AUDITORIA_GBP_READONLY_2026-06-15.md`,
  csv148: `${seoPackage}/artifacts/seo-gbp-001-auditoria-readonly-2026-06-15.csv`,
  responses: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  packageJson: 'package.json',
}

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

const sprint148 = await readExpectedFile(files.sprint148)
const report148 = await readExpectedFile(files.report148)
const csv148Source = await readExpectedFile(files.csv148)
const responsesSource = await readExpectedFile(files.responses)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv148 = csv148Source ? parseCsv(csv148Source) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const gbpAuditGo = responses.find((row) => row.item_backlog === 'SEO-GBP-001')
const gbpUpdateGo = responses.find((row) => row.item_backlog === 'SEO-GBP-002')

const requiredColumns = [
  'ordem',
  'campo',
  'fonte_esperada',
  'criterio_readonly',
  'evidencia_requerida',
  'acao_permitida',
  'acao_bloqueada',
  'status_saida',
]

for (const column of requiredColumns) {
  if (!csv148.header.includes(column)) {
    failures.push(`CSV Sprint 148 sem coluna obrigatoria: ${column}`)
  }
}

if (csv148.rows.length < 15) {
  failures.push(`CSV Sprint 148 deveria ter pelo menos 15 campos; encontrado ${csv148.rows.length}.`)
}

for (const field of [
  'acesso_e_perfil_correto',
  'nome_publico',
  'categoria_primaria',
  'telefone_whatsapp',
  'site',
  'endereco',
  'areas_atendimento',
  'produtos',
  'servicos',
  'fotos',
  'posts',
  'reviews_qna',
  'links_utms',
]) {
  const hasField = csv148.rows.some((row) => row.campo === field)
  if (!hasField) {
    failures.push(`Auditoria GBP sem campo obrigatorio: ${field}`)
  }
}

if (gbpAuditGo?.status_resposta !== 'validado' || gbpAuditGo?.go_autorizado !== 'sim') {
  failures.push('SEO-GBP-001 deve estar validado com go_autorizado=sim no registro externo.')
}

if (gbpUpdateGo?.status_resposta !== 'validado' || gbpUpdateGo?.go_autorizado !== 'sim') {
  warnings.push('SEO-GBP-002 ainda nao esta validado com go_autorizado=sim; update deve continuar bloqueado.')
}

for (const expected of [
  'contato@bebiluminacao.com',
  '(62) 3576-1988',
  '+55 62 3576-1988',
  'Rua CV10, Qd 26 Lt 02, Residencial Centerville, Goiania, GO',
  '14.401.288/0002-00',
  'atendimento nacional',
]) {
  assertIncludes(sprint148, expected, 'SPRINT_148_AUDITORIA_GBP_READONLY.md')
}

for (const expected of [
  'https://support.google.com/business/answer/3038177',
  'https://support.google.com/business/answer/3039617',
  'https://support.google.com/business/answer/6103862',
  'https://support.google.com/business/answer/7667250',
  'https://support.google.com/business/answer/9124203',
  'https://support.google.com/business/answer/9455399',
  'https://support.google.com/business/answer/9157481',
]) {
  assertIncludes(sprint148, expected, 'SPRINT_148_AUDITORIA_GBP_READONLY.md')
}

for (const expected of [
  'nenhum Google Business Profile foi editado',
  'nenhum produto, servico, foto, post, review ou Q&A foi publicado/respondido',
  'nenhum diretorio externo foi atualizado',
  'nenhum site, CRM, CMS, GSC, GA4/GTM, Cloudflare ou VPS foi alterado',
]) {
  assertIncludes(report148, expected, 'RELATORIO_EXECUCAO_SPRINT_148_AUDITORIA_GBP_READONLY_2026-06-15.md')
}

for (const expected of [
  'read-only',
  'GO_GBP_UPDATE',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'npm run seo:audit:nap:strict',
]) {
  assertIncludes(sprint148, expected, 'SPRINT_148_AUDITORIA_GBP_READONLY.md')
}

const unsafeText = `${sprint148}\n${report148}\n${csv148Source}`
for (const pattern of [
  /GBP atualizado:\s*sim/i,
  /perfil editado:\s*sim/i,
  /produto publicado:\s*sim/i,
  /servico publicado:\s*sim/i,
  /foto publicada:\s*sim/i,
  /review respondid[ao]:\s*sim/i,
  /diretorio atualizado:\s*sim/i,
  /deploy executado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Pacote GBP read-only sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Pacote GBP read-only nao pode conter segredo ou pedir segredo.')
}

if (packageJson.scripts?.['seo:audit:gbp-readonly-package'] !== 'node scripts/audit-gbp-readonly-package.mjs') {
  failures.push('package.json sem script seo:audit:gbp-readonly-package.')
}

console.log('GBP read-only package audit summary')
console.log(`rows=${csv148.rows.length}`)
console.log(`gbp_audit_go=${gbpAuditGo?.status_resposta ?? 'missing'}/${gbpAuditGo?.go_autorizado ?? 'missing'}`)
console.log(`gbp_update_go=${gbpUpdateGo?.status_resposta ?? 'missing'}/${gbpUpdateGo?.go_autorizado ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nGBP read-only package warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nGBP read-only package audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nGBP read-only package audit completed.')
