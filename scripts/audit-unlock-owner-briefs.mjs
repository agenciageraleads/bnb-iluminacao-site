import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const failures = []
const warnings = []

const files = {
  ownerBriefs: `${seoPackage}/PACOTE_ACIONAMENTO_DONOS_DESBLOQUEIOS_TURNAROUND_BB.md`,
  ownerBriefsCsv: `${seoPackage}/artifacts/seo-ops-023-acionamento-donos-desbloqueios-2026-06-15.csv`,
  closeoutDoc: `${seoPackage}/ENCERRAMENTO_PARCIAL_DESBLOQUEIO_FINAL_TURNAROUND_BB.md`,
  responsesCsv: `${seoPackage}/artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv`,
  backlog: `${seoPackage}/BACKLOG_SEO_TURNAROUND_BB.md`,
  scorecard: `${seoPackage}/SCORECARD_PROGRESSO_ETA_TURNAROUND_BB.md`,
  readiness: 'scripts/audit-turnaround-readiness.mjs',
}

const expectedBlockers = [
  'SEO-NAP-001',
  'SEO-MEAS-001',
  'SEO-GBP-001',
  'SEO-GBP-002',
  'SEO-IMG-009',
  'SEO-LINK-002',
  'SEO-REG-003',
]

const requiredOwners = [
  'direcao_comercial_administrativo',
  'marketing_administrador_gsc',
  'responsavel_perfil_google',
  'marketing_seo',
  'comercial',
  'seo_dev_cms',
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

function countReadinessChecks(source) {
  const requiredFilesMatch = source.match(/const requiredFiles = \[([\s\S]*?)\]\n\nconst localAuditScripts/)
  const localScriptsMatch = source.match(/const localAuditScripts = \[([\s\S]*?)\]\n\nfunction runNpmScript/)

  const requiredFiles = requiredFilesMatch?.[1]?.match(/'[^']+'/g)?.length ?? 0
  const localScripts =
    localScriptsMatch?.[1]?.split('\n').filter((line) => line.trim().startsWith("['seo:audit:")).length ?? 0

  return requiredFiles + localScripts
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

const ownerBriefs = await readExpectedFile(files.ownerBriefs)
const ownerBriefsCsvSource = await readExpectedFile(files.ownerBriefsCsv)
const closeoutDoc = await readExpectedFile(files.closeoutDoc)
const responsesSource = await readExpectedFile(files.responsesCsv)
const backlog = await readExpectedFile(files.backlog)
const scorecard = await readExpectedFile(files.scorecard)
const readiness = await readExpectedFile(files.readiness)

const ownerBriefsCsv = ownerBriefsCsvSource ? parseCsv(ownerBriefsCsvSource) : { header: [], rows: [] }
const responses = responsesSource ? parseCsv(responsesSource).rows : []
const backlogRows = parseBacklogRows(backlog)
const concludedRows = backlogRows.filter((row) => row.status === 'concluido')
const readinessChecks = countReadinessChecks(readiness)

requireIncludes('Pacote de acionamento dos donos', ownerBriefs, [
  'Nao enviar senha',
  'sem token',
  'sem chave',
  'artifacts/seo-ops-012-respostas-desbloqueios-externos-2026-06-15.csv',
  'npm run seo:audit:external-responses',
  'npm run seo:audit:external-next-actions',
  'npm run seo:audit:turnaround',
])

for (const id of expectedBlockers) {
  if (!ownerBriefs.includes(id)) {
    failures.push(`Pacote de acionamento nao referencia bloqueio final: ${id}`)
  }

  if (!closeoutDoc.includes(id)) {
    failures.push(`Encerramento parcial nao referencia bloqueio final: ${id}`)
  }
}

for (const owner of requiredOwners) {
  if (!ownerBriefsCsvSource.includes(owner)) {
    failures.push(`CSV de acionamento sem dono esperado: ${owner}`)
  }
}

for (const column of [
  'item_backlog',
  'dono',
  'canal_sugerido',
  'mensagem_curta',
  'evidencia_pedida',
  'go_esperado',
  'registrar_em',
  'status_atual',
]) {
  if (!ownerBriefsCsv.header.includes(column)) {
    failures.push(`CSV de acionamento sem coluna obrigatoria: ${column}`)
  }
}

if (ownerBriefsCsv.rows.length !== expectedBlockers.length) {
  failures.push(`CSV de acionamento deve ter ${expectedBlockers.length} linhas; encontrado ${ownerBriefsCsv.rows.length}.`)
}

for (const id of expectedBlockers) {
  const row = ownerBriefsCsv.rows.find((item) => item.item_backlog === id)
  if (!row) {
    failures.push(`CSV de acionamento sem linha para ${id}.`)
    continue
  }

  if (!row.mensagem_curta || !row.evidencia_pedida || !row.go_esperado || !row.registrar_em) {
    failures.push(`CSV de acionamento com campos incompletos para ${id}.`)
  }

  const backlogRow = backlogRows.find((item) => item.id === id)
  if (backlogRow && row.status_atual !== backlogRow.status) {
    failures.push(`CSV de acionamento diverge do backlog em ${id}: ${row.status_atual} vs ${backlogRow.status}.`)
  }

  const responseRow = responses.find((item) => item.item_backlog === id)
  if (!responseRow) {
    failures.push(`Registro de respostas externas sem linha para ${id}.`)
  }
}

const unsafePhrases = [
  'mande a senha',
  'envie a senha',
  'manda a senha',
  'cole a senha',
  'envie token',
  'mande token',
  'envie chave',
  'mande chave',
]

for (const phrase of unsafePhrases) {
  if (ownerBriefs.toLowerCase().includes(phrase)) {
    failures.push(`Pacote de acionamento contem frase insegura: ${phrase}`)
  }
}

if (
  !scorecard.includes(`Itens totais no backlog | ${backlogRows.length}`) ||
  !scorecard.includes(`Concluidos | ${concludedRows.length}`)
) {
  failures.push(`Scorecard deve estar atualizado para ${backlogRows.length} itens totais e ${concludedRows.length} concluidos.`)
}

if (!scorecard.includes(`${readinessChecks} checks locais`)) {
  failures.push(`Scorecard deve mencionar ${readinessChecks} checks locais apos o pacote de acionamento/follow-up.`)
}

console.log('Unlock owner briefs audit summary')
console.log(`expected_blockers=${expectedBlockers.length}`)
console.log(`brief_rows=${ownerBriefsCsv.rows.length}`)
console.log(`response_rows=${responses.length}`)
console.log(`required_owners=${requiredOwners.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nUnlock owner briefs warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nUnlock owner briefs audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nUnlock owner briefs audit completed.')
