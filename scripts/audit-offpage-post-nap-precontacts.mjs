import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  sprint147: `${seoPackage}/SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP.md`,
  report147: `${seoPackage}/RELATORIO_EXECUCAO_SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP_2026-06-15.md`,
  csv147: `${seoPackage}/artifacts/seo-link-009-pre-contatos-offpage-pos-nap-2026-06-15.csv`,
  assets: `${seoPackage}/ATIVOS_AUTORIDADE_OFFPAGE_BB.md`,
  napAudit: `${seoPackage}/AUDITORIA_NAP_OFFPAGE_BB.md`,
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

const sprint147 = await readExpectedFile(files.sprint147)
const report147 = await readExpectedFile(files.report147)
const csv147Source = await readExpectedFile(files.csv147)
const assets = await readExpectedFile(files.assets)
const napAudit = await readExpectedFile(files.napAudit)
const responsesSource = await readExpectedFile(files.responses)
const packageJsonSource = await readExpectedFile(files.packageJson)

const csv147 = csv147Source ? parseCsv(csv147Source) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }
const offpageGo = responses.find((row) => row.item_backlog === 'SEO-LINK-002')

const requiredColumns = [
  'ordem',
  'plataforma',
  'tipo',
  'acao_autorizada',
  'url_alvo',
  'dados_permitidos',
  'acao_bloqueada',
  'criterio_avanco',
]

for (const column of requiredColumns) {
  if (!csv147.header.includes(column)) {
    failures.push(`CSV Sprint 147 sem coluna obrigatoria: ${column}`)
  }
}

if (csv147.rows.length < 5) {
  failures.push(`CSV Sprint 147 deveria ter pelo menos 5 oportunidades; encontrado ${csv147.rows.length}.`)
}

for (const platform of ['AECweb', 'QuemFornece', 'LinkedIn']) {
  const hasPlatform = csv147.rows.some((row) => row.plataforma.includes(platform))
  if (!hasPlatform) {
    failures.push(`Fila pos-NAP sem plataforma obrigatoria: ${platform}`)
  }
}

if (offpageGo?.status_resposta !== 'validado' || offpageGo?.go_autorizado !== 'sim') {
  failures.push('SEO-LINK-002 deve estar validado com go_autorizado=sim no registro externo.')
}

for (const expected of [
  'contato@bebiluminacao.com',
  '62 3576-1988',
  'Rua CV10, Qd 26 Lt 02',
  '14.401.288/0002-00',
  'atendimento nacional',
]) {
  assertIncludes(sprint147, expected, 'SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP.md')
  assertIncludes(assets, expected, 'ATIVOS_AUTORIDADE_OFFPAGE_BB.md')
}

for (const expected of [
  'validado para uso controlado',
  'NAP oficial pos-decisao',
  '14.401.288/0002-00',
  'pre-contatos off-page',
]) {
  assertIncludes(napAudit, expected, 'AUDITORIA_NAP_OFFPAGE_BB.md')
}

for (const expected of [
  'nenhum contato foi enviado',
  'nenhum perfil externo foi criado',
  'nenhum pagamento foi autorizado',
  'nenhum diretorio foi publicado',
]) {
  assertIncludes(report147, expected, 'RELATORIO_EXECUCAO_SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP_2026-06-15.md')
}

const unsafeText = `${sprint147}\n${report147}\n${csv147Source}\n${assets}\n${napAudit}`
for (const pattern of [
  /pagamento autorizado:\s*sim/i,
  /perfil externo criado:\s*sim/i,
  /diretorio publicado:\s*sim/i,
  /LinkedIn atualizado:\s*sim/i,
  /GBP atualizado:\s*sim/i,
  /deploy executado/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Pacote off-page pos-NAP sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|senha|token/i.test(unsafeText)) {
  failures.push('Pacote off-page pos-NAP nao pode conter segredo ou pedir segredo.')
}

if (packageJson.scripts?.['seo:audit:offpage-post-nap-precontacts'] !== 'node scripts/audit-offpage-post-nap-precontacts.mjs') {
  failures.push('package.json sem script seo:audit:offpage-post-nap-precontacts.')
}

console.log('Off-page post-NAP precontacts audit summary')
console.log(`rows=${csv147.rows.length}`)
console.log(`offpage_go=${offpageGo?.status_resposta ?? 'missing'}/${offpageGo?.go_autorizado ?? 'missing'}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nOff-page post-NAP precontacts warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nOff-page post-NAP precontacts audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nOff-page post-NAP precontacts audit completed.')
