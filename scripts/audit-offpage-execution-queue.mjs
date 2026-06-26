import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  queueCsv: `${seoPackage}/artifacts/seo-link-010-fila-execucao-offpage-pos-nap-2026-06-15.csv`,
  sourceCsv: `${seoPackage}/artifacts/seo-link-009-pre-contatos-offpage-pos-nap-2026-06-15.csv`,
  sprint147: `${seoPackage}/SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP.md`,
  sprint157: `${seoPackage}/SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE.md`,
  matrix: `${seoPackage}/MATRIZ_TRIAGEM_RESPOSTAS_OFFPAGE_BB.md`,
  control: `${seoPackage}/CONTROLE_RESPOSTAS_AUTORIDADE_OFFPAGE_BB.md`,
  macro: `${seoPackage}/MACROBLOCO_OFFPAGE_EXECUCAO_ASSISTIDA.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_MACROBLOCO_OFFPAGE_EXECUCAO_ASSISTIDA_2026-06-15.md`,
  packageDoc: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  packageJson: 'package.json',
}

const requiredColumns = [
  'ordem',
  'plataforma',
  'tipo',
  'canal_sugerido',
  'url_alvo',
  'mensagem_base',
  'status_execucao',
  'evidencia_contato',
  'campos_triagem_obrigatorios',
  'decisao_permitida',
  'gate_decisao',
  'acao_bloqueada',
  'criterio_avanco',
  'auditor',
]

const requiredPlatforms = ['AECweb', 'QuemFornece', 'Portal Metalica CIMM', 'LinkedIn Company', 'Kompass B2Brazil']

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
const sourceCsvSource = await readExpectedFile(files.sourceCsv)
const sprint147 = await readExpectedFile(files.sprint147)
const sprint157 = await readExpectedFile(files.sprint157)
const matrix = await readExpectedFile(files.matrix)
const control = await readExpectedFile(files.control)
const macro = await readExpectedFile(files.macro)
const report = await readExpectedFile(files.report)
const packageDoc = await readExpectedFile(files.packageDoc)
const packageJsonSource = await readExpectedFile(files.packageJson)

const queueCsv = queueCsvSource ? parseCsv(queueCsvSource) : { header: [], rows: [] }
const sourceCsv = sourceCsvSource ? parseCsv(sourceCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!queueCsv.header.includes(column)) {
    failures.push(`Fila off-page sem coluna obrigatoria: ${column}`)
  }
}

if (sourceCsv.rows.length !== 5) {
  failures.push(`Fonte off-page deveria ter 5 plataformas; encontrado ${sourceCsv.rows.length}.`)
}

if (queueCsv.rows.length !== 6) {
  failures.push(`Fila off-page deveria ter 6 linhas; encontrado ${queueCsv.rows.length}.`)
}

for (const platform of requiredPlatforms) {
  if (!queueCsv.rows.some((row) => row.plataforma === platform)) {
    failures.push(`Fila off-page sem plataforma obrigatoria: ${platform}`)
  }
}

for (const row of queueCsv.rows) {
  if (row.status_execucao !== 'pendente_execucao_humana') {
    failures.push(`Linha ${row.ordem} deveria iniciar como pendente_execucao_humana.`)
  }

  if (!row.evidencia_contato || !row.campos_triagem_obrigatorios || !row.decisao_permitida || !row.gate_decisao) {
    failures.push(`Linha ${row.ordem} tem criterio de triagem fraco ou ausente.`)
  }
}

for (const expected of [
  'custo_informado',
  'perfil_indexavel',
  'permite_link',
  'campo_nap_obrigatorio',
  'SEO_LINK_002_EXECUTAR_ou_MANTER_EM_VALIDACAO',
]) {
  assertIncludes(queueCsvSource, expected, 'Fila off-page')
}

for (const expected of [
  'contato@bebiluminacao.com',
  '3576-1988',
  '14.401.288/0002-00',
  'nao autoriza',
]) {
  assertIncludes(sprint147, expected, 'SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP.md')
}

for (const expected of ['offpage_precontato', 'nao envia mensagens', 'nao cria cadastro']) {
  assertIncludes(sprint157, expected, 'SPRINT_157_FILA_EXECUCAO_HUMANA_GBP_OFFPAGE.md')
}

for (const expected of ['perfil ou conteudo publico e indexavel', 'link para URL limpa permitido', 'custo aprovado']) {
  assertIncludes(matrix, expected, 'MATRIZ_TRIAGEM_RESPOSTAS_OFFPAGE_BB.md')
}

for (const expected of ['seo-link-004-controle-respostas-offpage', 'aprovado_para_execucao', 'avaliar_custo']) {
  assertIncludes(control, expected, 'CONTROLE_RESPOSTAS_AUTORIDADE_OFFPAGE_BB.md')
}

for (const expected of [
  'artifacts/seo-link-010-fila-execucao-offpage-pos-nap-2026-06-15.csv',
  'npm run seo:build:offpage-execution-queue',
  'npm run seo:audit:offpage-execution-queue',
  'nenhum contato externo foi enviado',
]) {
  assertIncludes(macro, expected, 'MACROBLOCO_OFFPAGE_EXECUCAO_ASSISTIDA.md')
  assertIncludes(report, expected, 'RELATORIO_EXECUCAO_MACROBLOCO_OFFPAGE_EXECUCAO_ASSISTIDA_2026-06-15.md')
  assertIncludes(packageDoc, expected, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

const unsafeText = `${queueCsvSource}\n${macro}\n${report}\n${packageDoc}`
for (const pattern of [
  /pagamento autorizado:\s*sim/i,
  /perfil externo criado:\s*sim/i,
  /diretorio publicado:\s*sim/i,
  /mensagem enviada:\s*sim/i,
  /LinkedIn atualizado:\s*sim/i,
  /GBP atualizado:\s*sim/i,
  /deploy executado:\s*sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Fila off-page sugere execucao proibida: ${pattern}`)
  }
}

if (/PAYLOAD_SECRET|POSTGRES_PASSWORD|DATABASE_URL|PRIVATE KEY|BEGIN OPENSSH|AIza[0-9A-Za-z_-]{20,}|ghp_[0-9A-Za-z_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}/i.test(unsafeText)) {
  failures.push('Fila off-page nao pode conter segredo real.')
}

if (packageJson.scripts?.['seo:build:offpage-execution-queue'] !== 'node scripts/build-offpage-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:offpage-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:offpage-execution-queue'] !== 'node scripts/audit-offpage-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:offpage-execution-queue.')
}

console.log('Off-page execution queue audit summary')
console.log(`queue_rows=${queueCsv.rows.length}`)
console.log(`source_rows=${sourceCsv.rows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nOff-page execution queue warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nOff-page execution queue audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nOff-page execution queue audit completed.')
