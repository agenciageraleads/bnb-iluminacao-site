import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12')
const sourcePath = path.join(
  seoPackage,
  'artifacts/seo-img-010-matriz-validacao-comercial-cases-2026-06-15.csv',
)
const outputPath = path.join(
  seoPackage,
  'artifacts/seo-img-019-fila-execucao-cases-comerciais-2026-06-15.csv',
)

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

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line)
    return Object.fromEntries(header.map((column, index) => [column, values[index] ?? '']))
  })
}

function csvEscape(value) {
  const text = String(value ?? '')

  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`
  }

  return text
}

function ownerForCluster(cluster) {
  if (/hospitalar|institucional|industrial/i.test(cluster)) return 'comercial_tecnico'
  if (/esportivo/i.test(cluster)) return 'direcao_comercial'
  return 'comercial'
}

function publicationGate(row) {
  if (row.risco_editorial === 'alto') return 'validacao_nominal_e_juridica_obrigatoria'
  if (row.prioridade === '4') return 'confirmar_roadmap_iluminacao_esportiva'
  if (row.prioridade === '5') return 'qualidade_contexto_e_autorizacao_obrigatorios'
  return 'obra_cidade_produto_autorizacao_obrigatorios'
}

const sourceRows = parseCsv(await readFile(sourcePath, 'utf8'))
const rows = sourceRows.map((sourceRow, index) => ({
  ordem: String(index + 1),
  prioridade: sourceRow.prioridade,
  cluster: sourceRow.cluster,
  source_path: sourceRow.source_path,
  candidato_case_slug: sourceRow.candidato_case_slug,
  pagina_destino_se_confirmado: sourceRow.pagina_destino_se_confirmado,
  responsavel_validacao: ownerForCluster(sourceRow.cluster),
  status_execucao: 'pendente_validacao_comercial',
  pergunta_para_time_comercial: sourceRow.pergunta_para_time_comercial,
  confirmacoes_obrigatorias: sourceRow.confirmacoes_obrigatorias,
  evidencia_aceita:
    'obra_BB_confirmada; cidade_UF; produto_familia; autorizacao_uso_publico; decisao_nome_cliente',
  decisao_permitida:
    'aprovar_nominal; aprovar_anonimo; manter_referencia_visual; descartar; guardar_sprint_futuro',
  acao_segura_sem_resposta: sourceRow.recomendacao_sem_confirmacao,
  gate_publicacao: publicationGate(sourceRow),
  acao_bloqueada: 'publicar case nominal, title, slug, alt text ou schema com marca/local sem autorizacao',
  auditor: 'npm run seo:audit:cases-execution-queue',
}))

const header = [
  'ordem',
  'prioridade',
  'cluster',
  'source_path',
  'candidato_case_slug',
  'pagina_destino_se_confirmado',
  'responsavel_validacao',
  'status_execucao',
  'pergunta_para_time_comercial',
  'confirmacoes_obrigatorias',
  'evidencia_aceita',
  'decisao_permitida',
  'acao_segura_sem_resposta',
  'gate_publicacao',
  'acao_bloqueada',
  'auditor',
]

const csv = [
  header.join(','),
  ...rows.map((row) => header.map((column) => csvEscape(row[column])).join(',')),
].join('\n')

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${csv}\n`)

console.log('Cases execution queue build summary')
console.log(`source_rows=${sourceRows.length}`)
console.log(`queue_rows=${rows.length}`)
console.log(`pending_rows=${rows.filter((row) => row.status_execucao === 'pendente_validacao_comercial').length}`)
console.log(`artifact=${path.relative(root, outputPath)}`)
console.log('Cases execution queue build completed.')
