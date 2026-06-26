import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12')
const publicEvidencePath = path.join(
  seoPackage,
  'artifacts/seo-meas-005-evidencia-publica-indexabilidade-2026-06-15.csv',
)
const outputPath = path.join(
  seoPackage,
  'artifacts/seo-meas-006-fila-execucao-gsc-ga4-2026-06-15.csv',
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

function classifyLot(pathName) {
  if (pathName.startsWith('/blog/')) return 'onda1_conteudo_tecnico'
  if (pathName.includes('sao-paulo') || pathName.includes('minas-gerais') || pathName.includes('goias')) {
    return 'amostra_regional'
  }
  if (pathName.startsWith('/postes-para-') || pathName.includes('suporte') || pathName.includes('chumbador')) {
    return 'onda1_aplicacao_acessorio'
  }
  return 'p0_comercial'
}

function priorityForLot(lote) {
  if (lote === 'p0_comercial') return 'alta'
  if (lote === 'onda1_aplicacao_acessorio') return 'media'
  if (lote === 'onda1_conteudo_tecnico') return 'media'
  return 'amostra'
}

function buildStaticRows() {
  return [
    {
      trilha: 'gsc',
      ordem: '001',
      acao: 'confirmar_propriedade',
      alvo: 'https://bebiluminacao.com.br/ ou dominio bebiluminacao.com.br',
      lote: 'conta',
      prioridade: 'critica',
      status_execucao: 'pendente_execucao_humana',
      evidencia_aceita: 'nome da propriedade e tipo de permissao, sem senha token cookie ou print sensivel',
      proibido: 'registrar senha token cookie e-mail pessoal sensivel ou print com dados privados',
      criterio_avanco: 'propriedade correta confirmada no Search Console',
      proximo_responsavel: 'marketing_analytics',
    },
    {
      trilha: 'gsc',
      ordem: '002',
      acao: 'enviar_ou_reenviar_sitemap',
      alvo: 'https://bebiluminacao.com.br/sitemap.xml',
      lote: 'sitemap',
      prioridade: 'critica',
      status_execucao: 'pendente_execucao_humana',
      evidencia_aceita: 'status enviado ou lido no Sitemaps report com data e hora',
      proibido: 'marcar como enviado sem abrir GSC',
      criterio_avanco: 'sitemap lido ou enviado sem erro critico',
      proximo_responsavel: 'marketing_analytics',
    },
    {
      trilha: 'gsc',
      ordem: '003',
      acao: 'verificar_acoes_manuais_e_seguranca',
      alvo: 'GSC Manual actions e Security issues',
      lote: 'seguranca_indexacao',
      prioridade: 'alta',
      status_execucao: 'pendente_execucao_humana',
      evidencia_aceita: 'status sem problemas ou lista objetiva da pendencia, sem dados sensiveis',
      proibido: 'ignorar alerta critico de acoes manuais ou seguranca',
      criterio_avanco: 'sem bloqueio critico para indexacao',
      proximo_responsavel: 'marketing_analytics',
    },
  ]
}

function buildMeasurementRows(startOrder) {
  const testUrl =
    'https://bebiluminacao.com.br/fabricante-de-postes-metalicos?utm_source=google&utm_medium=cpc&utm_campaign=seo_pos_deploy_onda1&utm_content=debug_whatsapp&utm_term=fabricante_de_postes_metalicos'

  return [
    {
      trilha: 'gtm',
      ordem: String(startOrder).padStart(3, '0'),
      acao: 'abrir_preview_tag_assistant',
      alvo: testUrl,
      lote: 'evento_whatsapp',
      prioridade: 'critica',
      status_execucao: 'pendente_execucao_humana',
      evidencia_aceita: 'Preview conectado na URL publica e container GTM correto identificado sem print sensivel',
      proibido: 'publicar container GTM ou alterar tag nesta etapa',
      criterio_avanco: 'Preview conectado e pagina carregada',
      proximo_responsavel: 'trafego_analytics',
    },
    {
      trilha: 'gtm',
      ordem: String(startOrder + 1).padStart(3, '0'),
      acao: 'clicar_cta_whatsapp_e_confirmar_disparo',
      alvo: 'whatsapp_click',
      lote: 'evento_whatsapp',
      prioridade: 'critica',
      status_execucao: 'pendente_execucao_humana',
      evidencia_aceita: 'evento ou tag whatsapp_click disparando no clique do CTA',
      proibido: 'considerar hover ou pageview como conversao',
      criterio_avanco: 'evento dispara no clique real do CTA',
      proximo_responsavel: 'trafego_analytics',
    },
    {
      trilha: 'ga4',
      ordem: String(startOrder + 2).padStart(3, '0'),
      acao: 'confirmar_realtime_ou_debugview',
      alvo: 'GA4 DebugView/Reatime',
      lote: 'evento_whatsapp',
      prioridade: 'critica',
      status_execucao: 'pendente_execucao_humana',
      evidencia_aceita: 'whatsapp_click aparecendo no GA4 DebugView ou Realtime',
      proibido: 'marcar evento como validado sem aparecer no GA4',
      criterio_avanco: 'evento visivel no GA4',
      proximo_responsavel: 'trafego_analytics',
    },
    {
      trilha: 'ga4',
      ordem: String(startOrder + 3).padStart(3, '0'),
      acao: 'conferir_parametros_evento',
      alvo: 'cta_channel; cta_source; cta_label; page_path; page_location; whatsapp_phone; has_prefilled_message; utm_source; utm_medium; utm_campaign; utm_content; utm_term',
      lote: 'evento_whatsapp',
      prioridade: 'alta',
      status_execucao: 'pendente_execucao_humana',
      evidencia_aceita: 'lista de parametros presentes e ausentes observados no GA4',
      proibido: 'omitir parametro ausente',
      criterio_avanco: 'todos os parametros minimos presentes ou pendencia registrada',
      proximo_responsavel: 'trafego_analytics',
    },
    {
      trilha: 'ga4',
      ordem: String(startOrder + 4).padStart(3, '0'),
      acao: 'decidir_key_event',
      alvo: 'whatsapp_click',
      lote: 'conversao',
      prioridade: 'media',
      status_execucao: 'pendente_execucao_humana',
      evidencia_aceita: 'decisao sim ou nao para marcar whatsapp_click como key event',
      proibido: 'mudar definicao de conversao sem decisao registrada',
      criterio_avanco: 'decisao registrada',
      proximo_responsavel: 'trafego_analytics',
    },
  ]
}

const publicEvidence = parseCsv(await readFile(publicEvidencePath, 'utf8'))
const rows = buildStaticRows()
let order = rows.length + 1

for (const page of publicEvidence) {
  const lote = classifyLot(page.path)
  rows.push({
    trilha: 'gsc',
    ordem: String(order).padStart(3, '0'),
    acao: 'inspecionar_url_e_solicitar_indexacao_se_aplicavel',
    alvo: page.url,
    lote,
    prioridade: priorityForLot(lote),
    status_execucao: 'pendente_execucao_humana',
    evidencia_aceita: 'status da URL Inspection, resultado do live test e data/hora da solicitacao se feita',
    proibido: 'solicitar URL fora da propriedade correta ou marcar indexada sem evidencia',
    criterio_avanco: 'URL inspecionada e status registrado',
    proximo_responsavel: 'marketing_analytics',
  })
  order += 1
}

rows.push(...buildMeasurementRows(order))

const header = [
  'trilha',
  'ordem',
  'acao',
  'alvo',
  'lote',
  'prioridade',
  'status_execucao',
  'evidencia_aceita',
  'proibido',
  'criterio_avanco',
  'proximo_responsavel',
]

const csv = [
  header.join(','),
  ...rows.map((row) => header.map((column) => csvEscape(row[column])).join(',')),
].join('\n')

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${csv}\n`)

console.log('GSC GA4 execution queue build summary')
console.log(`source_rows=${publicEvidence.length}`)
console.log(`queue_rows=${rows.length}`)
console.log(`gsc_url_rows=${rows.filter((row) => row.acao === 'inspecionar_url_e_solicitar_indexacao_se_aplicavel').length}`)
console.log(`measurement_rows=${rows.filter((row) => ['gtm', 'ga4'].includes(row.trilha)).length}`)
console.log(`artifact=${path.relative(root, outputPath)}`)
console.log('GSC GA4 execution queue build completed.')
