import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12')
const gbpEvidencePath = path.join(
  seoPackage,
  'artifacts/seo-gbp-002-ficha-evidencia-readonly-2026-06-15.csv',
)
const outputPath = path.join(seoPackage, 'artifacts/seo-gbp-003-fila-execucao-readonly-update-2026-06-15.csv')

const fieldActions = new Map([
  ['perfil_correto', ['confirmar_entidade', 'bloqueia_tudo_se_divergente']],
  ['url_perfil_publico', ['registrar_referencia_publica', 'usar_para_auditoria']],
  ['nome_publico', ['comparar_marca', 'manter_ou_corrigir_no_update']],
  ['categoria_primaria', ['avaliar_categoria_principal', 'manter_ou_corrigir_no_update']],
  ['categorias_secundarias', ['avaliar_excesso_ou_gap', 'manter_investigar_ou_corrigir_no_update']],
  ['telefone_whatsapp', ['comparar_nap_telefone', 'manter_ou_corrigir_no_update']],
  ['site', ['comparar_url_site', 'preparar_utm_futura']],
  ['endereco', ['comparar_nap_endereco', 'manter_ou_corrigir_no_update']],
  ['horarios', ['registrar_horario_publico', 'investigar_ou_corrigir_no_update']],
  ['areas_atendimento', ['avaliar_areas_sem_filial_falsa', 'manter_investigar_ou_corrigir_no_update']],
  ['produtos', ['mapear_gaps_produtos_p0', 'preparar_update_futuro']],
  ['servicos', ['mapear_gaps_servicos_p0', 'preparar_update_futuro']],
  ['fotos', ['mapear_lote_visual', 'preparar_lote_aprovado']],
  ['posts', ['mapear_cadencia_posts', 'preparar_pauta_futura']],
  ['reviews_qna', ['resumir_temas_anonimizados', 'preparar_respostas_futuras_se_aprovado']],
  ['links_utms', ['mapear_links_e_utm', 'preparar_utm_futura']],
  ['divergencias_prioritarias', ['consolidar_divergencias', 'decidir_go_update']],
  ['go_update_recomendado', ['registrar_decisao_humana', 'liberar_ou_bloquear_update']],
])

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

function riskPriority(risk) {
  if (risk === 'alto') return 'critica'
  if (risk === 'medio') return 'media'
  return 'baixa'
}

const evidenceRows = parseCsv(await readFile(gbpEvidencePath, 'utf8'))
const rows = []

rows.push({
  trilha: 'gbp_readonly',
  ordem: '001',
  campo_origem: 'controle_abertura',
  acao: 'abrir_perfil_correto_sem_editar',
  valor_esperado: 'B&B Iluminacao no Google Business Profile correto',
  evidencia_aceita: 'URL publica ou identificador Maps sem dado de conta',
  prioridade: 'critica',
  status_execucao: 'pendente_execucao_humana',
  decisao_permitida: 'seguir_ou_bloquear',
  proibido: 'editar perfil; publicar foto; publicar post; responder review; alterar NAP',
  criterio_avanco: 'perfil correto aberto e nenhuma edicao feita',
})

rows.push({
  trilha: 'gbp_readonly',
  ordem: '002',
  campo_origem: 'nap_oficial_base',
  acao: 'confirmar_base_de_comparacao_nap',
  valor_esperado:
    'contato@bebiluminacao.com; (62) 3576-1988; Rua CV10, Qd 26 Lt 02, Residencial Centerville, Goiania, GO; 14.401.288/0002-00',
  evidencia_aceita: 'base de comparacao NAP reconhecida antes da auditoria',
  prioridade: 'critica',
  status_execucao: 'pendente_execucao_humana',
  decisao_permitida: 'seguir_ou_bloquear',
  proibido: 'editar GBP nesta etapa; registrar senha token cookie ou print sensivel; inventar evidencia',
  criterio_avanco: 'operador usa NAP oficial como referencia unica',
})

let order = 3

for (const sourceRow of evidenceRows) {
  const [action, allowedDecision] = fieldActions.get(sourceRow.campo) ?? [
    `auditar_${sourceRow.campo}`,
    'manter_investigar_ou_corrigir_no_update',
  ]

  rows.push({
    trilha: sourceRow.etapa === 'decisao' ? 'gbp_decisao' : 'gbp_readonly',
    ordem: String(order).padStart(3, '0'),
    campo_origem: sourceRow.campo,
    acao: action,
    valor_esperado: sourceRow.valor_esperado,
    evidencia_aceita: sourceRow.evidencia_aceita,
    prioridade: riskPriority(sourceRow.risco),
    status_execucao: 'pendente_execucao_humana',
    decisao_permitida: allowedDecision,
    proibido: 'editar GBP nesta etapa; registrar senha token cookie ou print sensivel; inventar evidencia',
    criterio_avanco: sourceRow.criterio_aprovacao,
  })
  order += 1
}

rows.push({
  trilha: 'gbp_update_gate',
  ordem: String(order).padStart(3, '0'),
  campo_origem: 'go_gbp_update',
  acao: 'avaliar_se_update_pode_ser_aberto',
  valor_esperado: 'ficha completa + divergencias priorizadas + NAP strict verde + decisao humana',
  evidencia_aceita: 'decisao GO_GBP_UPDATE ou manter bloqueado, sem segredo',
  prioridade: 'critica',
  status_execucao: 'pendente_execucao_humana',
  decisao_permitida: 'GO_GBP_UPDATE_ou_MANTER_BLOQUEADO',
  proibido: 'atualizar GBP antes da ficha read-only completa',
  criterio_avanco: 'decisao coerente com evidencia e sem edicao previa',
})

const header = [
  'trilha',
  'ordem',
  'campo_origem',
  'acao',
  'valor_esperado',
  'evidencia_aceita',
  'prioridade',
  'status_execucao',
  'decisao_permitida',
  'proibido',
  'criterio_avanco',
]

const csv = [
  header.join(','),
  ...rows.map((row) => header.map((column) => csvEscape(row[column])).join(',')),
].join('\n')

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${csv}\n`)

console.log('GBP execution queue build summary')
console.log(`source_rows=${evidenceRows.length}`)
console.log(`queue_rows=${rows.length}`)
console.log(`readonly_rows=${rows.filter((row) => row.trilha === 'gbp_readonly').length}`)
console.log(`decision_rows=${rows.filter((row) => row.trilha !== 'gbp_readonly').length}`)
console.log(`artifact=${path.relative(root, outputPath)}`)
console.log('GBP execution queue build completed.')
