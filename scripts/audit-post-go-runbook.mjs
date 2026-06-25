import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []
const warnings = []

const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const files = {
  runbook: `${seoPackage}/RUNBOOK_EXECUCAO_POS_GO_TURNAROUND_BB.md`,
  csv: `${seoPackage}/artifacts/seo-ops-015-runbook-execucao-pos-go-2026-06-15.csv`,
  sprint98: `${seoPackage}/SPRINT_98_RUNBOOK_EXECUCAO_POS_GO.md`,
}

const requiredScenarios = [
  {
    go: 'GO_NAP_PATCH',
    item: 'SEO-NAP-001',
    requiredSignals: ['seo:audit:nap', 'seo:audit:nap:strict', 'TEMPLATE_PATCH_NAP_LOCAL_BB.md'],
  },
  {
    go: 'GO_GSC_GA4',
    item: 'SEO-MEAS-001',
    requiredSignals: ['CHECKLIST_GSC_GA4_INDEXACAO_P0.md', 'sitemap', 'DebugView'],
  },
  {
    go: 'GO_GBP_AUDIT',
    item: 'SEO-GBP-001',
    requiredSignals: ['perfil correto', 'sem senha', 'Registrar divergencias'],
  },
  {
    go: 'GO_GBP_UPDATE',
    item: 'SEO-GBP-002',
    requiredSignals: ['SEO-NAP-001', 'SEO-GBP-001', 'seo:audit:nap:strict'],
  },
  {
    go: 'GO_CASES',
    item: 'SEO-IMG-009',
    requiredSignals: ['seo:audit:cases', 'seo:audit:cases:strict', 'seo:audit:images'],
  },
  {
    go: 'GO_PRE_CONTATOS_OFFPAGE',
    item: 'SEO-LINK-002',
    requiredSignals: ['PACOTE_CONTATOS_INICIAIS_AUTORIDADE_SEM_NAP_BB.md', 'CONTROLE_RESPOSTAS_AUTORIDADE_OFFPAGE_BB.md'],
  },
  {
    go: 'GO_CIDADES_CMS',
    item: 'SEO-REG-003',
    requiredSignals: ['seo:audit:regional', 'conteudo unico', 'canonical'],
  },
]

const requiredColumns = ['go', 'item_backlog', 'acao_liberada', 'gates_antes', 'gates_depois', 'nao_fazer']

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
  const lines = source.trimEnd().split(/\r?\n/)
  const header = parseCsvLine(lines[0])
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

  try {
    return await readFile(absolutePath, 'utf8')
  } catch {
    failures.push(`Arquivo obrigatorio ilegivel: ${file}`)
    return ''
  }
}

const runbook = await readExpectedFile(files.runbook)
const csv = await readExpectedFile(files.csv)
await readExpectedFile(files.sprint98)

if (runbook) {
  const globalSignals = [
    'npm run seo:audit:external-responses',
    'npm run seo:audit:external-next-actions',
    'Se `seo:audit:external-next-actions` nao listar nenhuma acao pronta',
    'Nao fazer',
    'Encerramento de qualquer GO',
  ]

  for (const signal of globalSignals) {
    if (!runbook.includes(signal)) {
      failures.push(`Runbook pos-GO sem sinal global obrigatorio: ${signal}`)
    }
  }

  for (const scenario of requiredScenarios) {
    if (!runbook.includes(`## ${scenario.go}`)) {
      failures.push(`Runbook pos-GO sem secao do cenario: ${scenario.go}`)
      continue
    }

    for (const signal of scenario.requiredSignals) {
      if (!runbook.includes(signal)) {
        failures.push(`Runbook pos-GO cenario ${scenario.go} sem sinal obrigatorio: ${signal}`)
      }
    }
  }

  if (/senha|token|chave|secret|password/i.test(runbook.replace(/sem senha|senha\/token|sem segredo/gi, ''))) {
    warnings.push('Runbook menciona termos sensiveis; revisar se esta em contexto de proibicao.')
  }
}

let rows = []
let columns = []

if (csv) {
  const parsed = parseCsv(csv)
  rows = parsed.rows
  columns = parsed.header

  for (const column of requiredColumns) {
    if (!columns.includes(column)) {
      failures.push(`CSV do runbook sem coluna obrigatoria: ${column}`)
    }
  }

  if (rows.length !== requiredScenarios.length) {
    failures.push(`CSV do runbook deve ter ${requiredScenarios.length} linhas operacionais; encontrado ${rows.length}.`)
  }

  for (const scenario of requiredScenarios) {
    const row = rows.find((item) => item.go === scenario.go && item.item_backlog === scenario.item)
    if (!row) {
      failures.push(`CSV do runbook sem linha para ${scenario.go}/${scenario.item}.`)
      continue
    }

    if (!row.gates_antes || !row.gates_depois || !row.nao_fazer) {
      failures.push(`CSV do runbook com campos de gate incompletos para ${scenario.go}.`)
    }
  }
}

console.log('Post-GO runbook audit summary')
console.log(`required_files=${Object.keys(files).length}`)
console.log(`scenarios=${requiredScenarios.length}`)
console.log(`csv_rows=${rows.length}`)
console.log(`csv_columns=${columns.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nPost-GO runbook audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nPost-GO runbook audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nPost-GO runbook audit completed.')
