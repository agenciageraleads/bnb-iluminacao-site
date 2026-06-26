import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  queueCsv: `${seoPackage}/artifacts/seo-reg-005-fila-cidades-cms-2026-06-15.csv`,
  sourceCsv: `${seoPackage}/artifacts/seo-reg-001-ufs-prioritarias.csv`,
  modelDoc: `${seoPackage}/MODELO_REGIONAL_UF_SEO_BB.md`,
  macro: `${seoPackage}/MACROBLOCO_REGIONAL_CMS_EXECUCAO_ASSISTIDA.md`,
  report: `${seoPackage}/RELATORIO_EXECUCAO_MACROBLOCO_REGIONAL_CMS_EXECUCAO_ASSISTIDA_2026-06-15.md`,
  postDeployPackage: `${seoPackage}/PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  regionsCollection: 'src/collections/Regions.ts',
  bracoCityLp: 'src/app/(site)/lp/braco-para-luminaria/cidades/[city]/page.tsx',
  legacyPostesCity: 'src/app/(site)/lp/postes-metalicos/cidades/[city]/page.tsx',
  legacyRegionCity: 'src/app/(site)/regioes-atendidas/cidades/[city]/page.tsx',
  packageJson: 'package.json',
}

const requiredColumns = [
  'ordem',
  'frente',
  'escopo',
  'url_ou_rota',
  'status_execucao',
  'criterio_avanco',
  'evidencia_aceita',
  'bloqueio',
  'decisao_permitida',
  'auditor',
]

const requiredControlFronts = [
  'cidade_cms_policy',
  'legacy_postes_cities',
  'legacy_regioes_cities',
  'braco_luminaria_city_lp',
  'servicos_locais',
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
const sourceCsvSource = await readExpectedFile(files.sourceCsv)
const modelDoc = await readExpectedFile(files.modelDoc)
const macro = await readExpectedFile(files.macro)
const report = await readExpectedFile(files.report)
const postDeployPackage = await readExpectedFile(files.postDeployPackage)
const scorecard = await readExpectedFile(files.scorecard)
const regionsCollection = await readExpectedFile(files.regionsCollection)
const bracoCityLp = await readExpectedFile(files.bracoCityLp)
const legacyPostesCity = await readExpectedFile(files.legacyPostesCity)
const legacyRegionCity = await readExpectedFile(files.legacyRegionCity)
const packageJsonSource = await readExpectedFile(files.packageJson)

const queueCsv = queueCsvSource ? parseCsv(queueCsvSource) : { header: [], rows: [] }
const sourceCsv = sourceCsvSource ? parseCsv(sourceCsvSource) : { header: [], rows: [] }
const packageJson = packageJsonSource ? JSON.parse(packageJsonSource) : { scripts: {} }

for (const column of requiredColumns) {
  if (!queueCsv.header.includes(column)) {
    failures.push(`Fila regional/CMS sem coluna obrigatoria: ${column}`)
  }
}

if (sourceCsv.rows.length !== 15) {
  failures.push(`Fonte regional deveria ter 15 UFs; encontrado ${sourceCsv.rows.length}.`)
}

if (queueCsv.rows.length !== 20) {
  failures.push(`Fila regional/CMS deveria ter 20 linhas; encontrado ${queueCsv.rows.length}.`)
}

for (const front of requiredControlFronts) {
  if (!queueCsv.rows.some((row) => row.frente === front)) {
    failures.push(`Fila regional/CMS sem controle obrigatorio: ${front}`)
  }
}

for (const row of queueCsv.rows) {
  if (!row.criterio_avanco || !row.evidencia_aceita || !row.bloqueio || !row.decisao_permitida) {
    failures.push(`Linha ${row.ordem} tem criterio regional/CMS fraco ou ausente.`)
  }
}

for (const expected of [
  'nao reativar paginas de cidade em massa',
  'thin content',
  'prova local real',
  'conteudo unico',
  'sem LocalBusiness falso',
  'manter_redirect',
  'piloto_cidade_unica',
]) {
  assertIncludes(queueCsvSource, expected, 'Fila regional/CMS')
}

for (const expected of [
  'Nao reativar paginas de cidade neste momento',
  'SEO-REG-003',
  'conteudo unico',
  'LocalBusiness',
]) {
  assertIncludes(modelDoc, expected, 'MODELO_REGIONAL_UF_SEO_BB.md')
}

for (const expected of [
  'artifacts/seo-reg-005-fila-cidades-cms-2026-06-15.csv',
  'npm run seo:build:regional-cms-execution-queue',
  'npm run seo:audit:regional-cms-execution-queue',
  'Nenhuma pagina de cidade deve ser reativada em massa',
]) {
  assertIncludes(macro, expected, 'MACROBLOCO_REGIONAL_CMS_EXECUCAO_ASSISTIDA.md')
  assertIncludes(report, expected, 'RELATORIO_EXECUCAO_MACROBLOCO_REGIONAL_CMS_EXECUCAO_ASSISTIDA_2026-06-15.md')
  assertIncludes(postDeployPackage, expected, 'PACOTE_POS_DEPLOY_EVIDENCIAS_EXTERNAS_BB.md')
}

for (const expected of ['20 linhas de decisao regional/CMS', 'regional-cms-execution-queue']) {
  assertIncludes(scorecard, expected, 'SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md')
}

for (const forbidden of ['7 a 15 dias úteis', 'entrega rápida', 'Entrega Rápida', 'responde em até 24h']) {
  if (regionsCollection.includes(forbidden) || bracoCityLp.includes(forbidden)) {
    failures.push(`Regional/CMS ainda contem promessa operacional fixa na frente de bracos: ${forbidden}`)
  }
}

for (const expected of ['Prazo e frete confirmados no orçamento', 'Prazo sob orçamento']) {
  assertIncludes(`${regionsCollection}\n${bracoCityLp}`, expected, 'Hardening regional/CMS')
}

for (const expected of ['redirect("/postes-metalicos")', 'index: false', 'follow: true']) {
  assertIncludes(legacyPostesCity, expected, 'Legacy postes city page')
}

for (const expected of ['redirect(getLegacyCityDestination(city))', 'index: false', 'follow: true']) {
  assertIncludes(legacyRegionCity, expected, 'Legacy region city page')
}

const unsafeText = `${queueCsvSource}\n${macro}\n${report}\n${postDeployPackage}`
for (const pattern of [
  /cidade publicada:\s*sim/i,
  /GO_CIDADES_CMS:\s*sim/i,
  /LocalBusiness por cidade autorizado:\s*sim/i,
  /filial local confirmada:\s*sim/i,
]) {
  if (pattern.test(unsafeText)) {
    failures.push(`Fila regional/CMS sugere conclusao indevida: ${pattern}`)
  }
}

if (packageJson.scripts?.['seo:build:regional-cms-execution-queue'] !== 'node scripts/build-regional-cms-execution-queue.mjs') {
  failures.push('package.json sem script seo:build:regional-cms-execution-queue.')
}

if (packageJson.scripts?.['seo:audit:regional-cms-execution-queue'] !== 'node scripts/audit-regional-cms-execution-queue.mjs') {
  failures.push('package.json sem script seo:audit:regional-cms-execution-queue.')
}

console.log('Regional CMS execution queue audit summary')
console.log(`queue_rows=${queueCsv.rows.length}`)
console.log(`source_uf_rows=${sourceCsv.rows.length}`)
console.log(`control_rows=${requiredControlFronts.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nRegional CMS execution queue warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nRegional CMS execution queue audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nRegional CMS execution queue audit completed.')
