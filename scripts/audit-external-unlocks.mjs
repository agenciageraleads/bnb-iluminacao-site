import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []
const warnings = []

const seoPackage = '../../Marketing/seo-turnaround-2026-06-12'
const files = {
  collectionPackage: `${seoPackage}/COLETA_DESBLOQUEIOS_EXTERNOS_TURNAROUND_BB.md`,
  finalUnlockPanel: `${seoPackage}/DESBLOQUEIO_EXECUTIVO_FINAL_TURNAROUND_BB.md`,
  collectionCsv: `${seoPackage}/artifacts/seo-ops-010-coleta-desbloqueios-externos-2026-06-15.csv`,
  sprint94: `${seoPackage}/SPRINT_94_PACOTE_COLETA_DESBLOQUEIOS_EXTERNOS.md`,
}

const requiredRows = [
  {
    frente: 'NAP',
    item: 'SEO-NAP-001',
    status: 'GO_NAP_PATCH',
  },
  {
    frente: 'GSC',
    item: 'SEO-MEAS-001',
    status: 'GO_GSC_GA4',
  },
  {
    frente: 'GBP',
    item: 'SEO-GBP-001',
    status: 'GO_GBP_AUDIT',
  },
  {
    frente: 'GBP update',
    item: 'SEO-GBP-002',
    status: 'GO_GBP_UPDATE',
  },
  {
    frente: 'Cases',
    item: 'SEO-IMG-009',
    status: 'GO_CASES',
  },
  {
    frente: 'Off-page',
    item: 'SEO-LINK-002',
    status: 'GO_PRE_CONTATOS_OFFPAGE',
  },
  {
    frente: 'Cidades',
    item: 'SEO-REG-003',
    status: 'GO_CIDADES_CMS',
  },
]

const requiredColumns = [
  'frente',
  'item_backlog',
  'resposta_necessaria',
  'evidencia_aceita',
  'evidencia_insuficiente',
  'status_apos_resposta',
  'proximo_sprint',
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

const collectionPackage = await readExpectedFile(files.collectionPackage)
const finalUnlockPanel = await readExpectedFile(files.finalUnlockPanel)
const collectionCsv = await readExpectedFile(files.collectionCsv)
await readExpectedFile(files.sprint94)

if (collectionPackage) {
  const requiredMessageSignals = [
    'Nao enviem senha',
    'token',
    'Google Search Console',
    'Google Business Profile',
    'Cases/fotos',
    'Off-page',
    'Cidades',
  ]

  for (const signal of requiredMessageSignals) {
    if (!collectionPackage.includes(signal)) {
      failures.push(`Pacote de coleta sem sinal obrigatorio: ${signal}`)
    }
  }

  if (!collectionPackage.includes('convite') || !collectionPackage.includes('sem segredo')) {
    failures.push('Pacote de coleta deve orientar convite/screenshot sem segredo para acessos externos.')
  }
}

if (finalUnlockPanel) {
  for (const row of requiredRows) {
    if (!finalUnlockPanel.includes(row.item)) {
      failures.push(`Painel final nao referencia item restante: ${row.item}`)
    }
  }
}

let csvRows = []
let csvColumns = []

if (collectionCsv) {
  const parsed = parseCsv(collectionCsv)
  csvRows = parsed.rows
  csvColumns = parsed.header

  for (const column of requiredColumns) {
    if (!csvColumns.includes(column)) {
      failures.push(`CSV de coleta sem coluna obrigatoria: ${column}`)
    }
  }

  if (csvRows.length !== requiredRows.length) {
    failures.push(`CSV de coleta deve ter ${requiredRows.length} linhas operacionais; encontrado ${csvRows.length}.`)
  }

  for (const required of requiredRows) {
    const row = csvRows.find((item) => item.frente === required.frente && item.item_backlog === required.item)
    if (!row) {
      failures.push(`CSV de coleta sem linha para ${required.frente}/${required.item}.`)
      continue
    }

    if (row.status_apos_resposta !== required.status) {
      failures.push(`CSV de coleta com status incorreto para ${required.item}: ${row.status_apos_resposta || 'vazio'}.`)
    }

    if (!row.evidencia_aceita || !row.evidencia_insuficiente || !row.proximo_sprint) {
      failures.push(`CSV de coleta com campos operacionais incompletos para ${required.item}.`)
    }
  }

  const unsafeEvidence = csvRows.filter((row) => /senha|token|chave/i.test(row.evidencia_aceita ?? ''))
  if (unsafeEvidence.length > 0) {
    failures.push(`Evidencia aceita nao pode pedir segredo: ${unsafeEvidence.map((row) => row.item_backlog).join(', ')}`)
  }

  const responsePlaceholders = csvRows.filter((row) => /pode seguir generico/i.test(row.evidencia_insuficiente ?? ''))
  if (responsePlaceholders.length === 0) {
    warnings.push('CSV nao explicita que "pode seguir" generico e evidencia insuficiente.')
  }
}

console.log('External unlocks audit summary')
console.log(`required_files=${Object.keys(files).length}`)
console.log(`csv_rows=${csvRows.length}`)
console.log(`csv_columns=${csvColumns.length}`)
console.log(`required_backlog_items=${requiredRows.length}`)
console.log(`failures=${failures.length}`)
console.log(`warnings=${warnings.length}`)

if (warnings.length > 0) {
  console.warn('\nExternal unlocks audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nExternal unlocks audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nExternal unlocks audit completed.')
