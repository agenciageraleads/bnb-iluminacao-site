import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint148: `${seoPackage}/SPRINT_148_AUDITORIA_GBP_READONLY.md`,
  sprint149: `${seoPackage}/SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY.md`,
  report149: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY_2026-06-15.md`,
  csv149: `${seoPackage}/artifacts/seo-gbp-002-ficha-evidencia-readonly-2026-06-15.csv`,
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
const sprint149 = await readExpectedFile(files.sprint149)
const report149 = await readExpectedFile(files.report149)
const csv149Source = await readExpectedFile(files.csv149)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv149 = csv149Source ? parseCsv(csv149Source) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

const requiredColumns = [
  'etapa',
  'campo',
  'valor_esperado',
  'evidencia_aceita',
  'como_preencher',
  'risco',
  'status_preenchimento',
  'criterio_aprovacao',
  'proxima_acao',
]

for (const column of requiredColumns) {
  if (!csv149.header.includes(column)) {
    failures.push(`CSV Sprint 149 sem coluna obrigatoria: ${column}`)
  }
}

if (csv149.rows.length < 18) {
  failures.push(`CSV Sprint 149 deveria ter pelo menos 18 campos; encontrado ${csv149.rows.length}.`)
}

for (const field of [
  'perfil_correto',
  'url_perfil_publico',
  'nome_publico',
  'categoria_primaria',
  'categorias_secundarias',
  'telefone_whatsapp',
  'site',
  'endereco',
  'horarios',
  'areas_atendimento',
  'produtos',
  'servicos',
  'fotos',
  'posts',
  'reviews_qna',
  'links_utms',
  'divergencias_prioritarias',
  'go_update_recomendado',
]) {
  const hasField = csv149.rows.some((row) => row.campo === field)
  if (!hasField) {
    failures.push(`Ficha GBP sem campo obrigatorio: ${field}`)
  }
}

const invalidStatuses = csv149.rows.filter((row) => row.status_preenchimento !== 'pendente_execucao_humana')
if (invalidStatuses.length > 0) {
  failures.push('Ficha GBP deve iniciar com todos os status como pendente_execucao_humana.')
}

for (const expected of [
  'contato@bebiluminacao.com',
  '(62) 3576-1988',
  '+55 62 3576-1988',
  'Rua CV10, Qd 26 Lt 02, Residencial Centerville, Goiania, GO',
  '14.401.288/0002-00',
  'atendimento nacional',
]) {
  assertIncludes(sprint149, expected, 'SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY.md')
}

for (const expected of [
  'preenchido',
  'divergente',
  'nao_aplicavel',
  'pendente_execucao_humana',
  'GO_GBP_UPDATE',
  'npm run seo:audit:nap:strict',
]) {
  assertIncludes(sprint149, expected, 'SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY.md')
}

for (const expected of [
  'nenhum perfil GBP foi aberto pelo Codex',
  'nenhum Google Business Profile foi editado',
  'nenhuma evidencia real foi inventada',
  'nenhum site, CRM, CMS, GSC, GA4/GTM, Cloudflare ou VPS foi alterado',
]) {
  assertIncludes(report149, expected, 'RELATORIO_EXECUCAO_SPRINT_149_FICHA_EVIDENCIA_GBP_READONLY_2026-06-15.md')
}

if (!sprint148.includes('Sprint 148 - Auditoria GBP read-only')) {
  failures.push('Sprint 149 depende do Sprint 148, mas o arquivo base nao foi encontrado ou esta inconsistente.')
}

const unsafeText = `${sprint149}\n${report149}\n${csv149Source}`
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
    failures.push(`Ficha GBP sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Ficha GBP nao pode conter segredo real.')
}

if (packageJson.scripts?.['seo:audit:gbp-evidence-intake'] !== 'node scripts/audit-gbp-evidence-intake.mjs') {
  failures.push('package.json sem script seo:audit:gbp-evidence-intake.')
}

console.log('GBP evidence intake audit summary')
console.log(`rows=${csv149.rows.length}`)
console.log(`pending_rows=${csv149.rows.filter((row) => row.status_preenchimento === 'pendente_execucao_humana').length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nGBP evidence intake warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nGBP evidence intake audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nGBP evidence intake audit completed.')
