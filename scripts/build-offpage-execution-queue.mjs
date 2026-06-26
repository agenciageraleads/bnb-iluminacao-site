import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12')
const sourcePath = path.join(
  seoPackage,
  'artifacts/seo-link-009-pre-contatos-offpage-pos-nap-2026-06-15.csv',
)
const outputPath = path.join(seoPackage, 'artifacts/seo-link-010-fila-execucao-offpage-pos-nap-2026-06-15.csv')

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

function channelForPlatform(platform) {
  if (/linkedin/i.test(platform)) return 'LinkedIn'
  if (/Portal Metalica|CIMM/i.test(platform)) return 'formulario_ou_email_editorial'
  return 'formulario_ou_email_comercial'
}

function decisionGate(row) {
  if (/LinkedIn/i.test(row.plataforma)) return 'revisao_de_marca_obrigatoria'
  if (/Portal Metalica|CIMM/i.test(row.plataforma)) return 'aceite_editorial_obrigatorio'
  return 'custo_link_indexacao_nap_obrigatorios'
}

const sourceRows = parseCsv(await readFile(sourcePath, 'utf8'))
const rows = []

for (const sourceRow of sourceRows) {
  rows.push({
    ordem: sourceRow.ordem,
    plataforma: sourceRow.plataforma,
    tipo: sourceRow.tipo,
    canal_sugerido: channelForPlatform(sourceRow.plataforma),
    url_alvo: sourceRow.url_alvo,
    mensagem_base: 'SPRINT_147_PRE_CONTATOS_OFFPAGE_POS_NAP.md',
    status_execucao: 'pendente_execucao_humana',
    evidencia_contato: 'data; canal; pessoa_ou_area; protocolo_se_houver',
    campos_triagem_obrigatorios:
      'custo_informado; perfil_indexavel; permite_link; permite_catalogo_fotos; campo_nap_obrigatorio; campos_obrigatorios',
    decisao_permitida: 'executar; avaliar_custo; descartar; monitorar',
    gate_decisao: decisionGate(sourceRow),
    acao_bloqueada: sourceRow.acao_bloqueada,
    criterio_avanco: sourceRow.criterio_avanco,
    auditor: 'npm run seo:audit:offpage-execution-queue',
  })
}

rows.push({
  ordem: String(sourceRows.length + 1),
  plataforma: 'controle_consolidado',
  tipo: 'controle',
  canal_sugerido: 'interno',
  url_alvo: 'CONTROLE_RESPOSTAS_AUTORIDADE_OFFPAGE_BB.md',
  mensagem_base: 'MATRIZ_TRIAGEM_RESPOSTAS_OFFPAGE_BB.md',
  status_execucao: 'pendente_execucao_humana',
  evidencia_contato: 'tres_oportunidades_triadas_ou_justificativa_de_bloqueio',
  campos_triagem_obrigatorios:
    'custo_informado; perfil_indexavel; permite_link; campo_nap_obrigatorio; decisao; proximo_passo; responsavel',
  decisao_permitida: 'SEO_LINK_002_EXECUTAR_ou_MANTER_EM_VALIDACAO',
  gate_decisao: 'minimo_tres_oportunidades_com_evidencia',
  acao_bloqueada: 'marcar SEO-LINK-002 concluido sem tres evidencias',
  criterio_avanco: 'tres oportunidades triadas sem custo pendente, sem NAP divergente e com decisao documentada',
  auditor: 'npm run seo:audit:offpage-execution-queue',
})

const header = [
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

const csv = [
  header.join(','),
  ...rows.map((row) => header.map((column) => csvEscape(row[column])).join(',')),
].join('\n')

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${csv}\n`)

console.log('Off-page execution queue build summary')
console.log(`source_rows=${sourceRows.length}`)
console.log(`queue_rows=${rows.length}`)
console.log(`platform_rows=${sourceRows.length}`)
console.log(`control_rows=1`)
console.log(`artifact=${path.relative(root, outputPath)}`)
console.log('Off-page execution queue build completed.')
