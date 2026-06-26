import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const seoPackage = path.resolve(root, '../../Marketing/seo-turnaround-2026-06-12')
const sourcePath = path.join(seoPackage, 'artifacts/seo-reg-001-ufs-prioritarias.csv')
const outputPath = path.join(seoPackage, 'artifacts/seo-reg-005-fila-cidades-cms-2026-06-15.csv')

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

const sourceRows = parseCsv(await readFile(sourcePath, 'utf8'))

const rows = sourceRows.map((sourceRow) => ({
  ordem: sourceRow.ordem,
  frente: 'uf_publicada_ou_publicavel',
  escopo: sourceRow.uf,
  url_ou_rota: sourceRow.url_recomendada,
  status_execucao: 'manter_modelo_uf',
  criterio_avanco:
    'manter title, h1, canonical, schema Organization nacional, CTA rastreado e texto sem filial local falsa',
  evidencia_aceita: 'rota 200; sitemap; canonical; ausencia de LocalBusiness falso; smoke regional',
  bloqueio: 'nao transformar UF em cidade, filial, representante local ou prazo fixo',
  decisao_permitida: 'manter_uf; reforcar_conteudo; solicitar_indexacao_gsc',
  auditor: 'npm run seo:audit:regional-cms-execution-queue',
}))

const controlRows = [
  {
    frente: 'cidade_cms_policy',
    escopo: 'SEO-REG-003',
    url_ou_rota: 'src/collections/Regions.ts',
    status_execucao: 'pendente_modelo_cms_real',
    criterio_avanco:
      'cidade so pode voltar quando tiver prova local real, conteudo unico, responsavel editorial e checklist comercial aprovado',
    evidencia_aceita:
      'obra/case/autorizacao ou argumento logistico especifico; texto unico; canonical; sitemap; schema sem LocalBusiness falso',
    bloqueio: 'nao reativar paginas de cidade em massa, nao usar prazo fixo, nao publicar thin content',
    decisao_permitida: 'manter_redirect; piloto_cidade_unica; descartar_cidade; revisar_servico_local',
  },
  {
    frente: 'legacy_postes_cities',
    escopo: 'postes_metalicos',
    url_ou_rota: '/lp/postes-metalicos/cidades/[city]',
    status_execucao: 'manter_redirect_para_postes_metalicos',
    criterio_avanco: 'reativar somente se cidade cumprir SEO-REG-003',
    evidencia_aceita: 'redirect 301/307 ou metadata noindex follow; canonical para pagina nacional/UF',
    bloqueio: 'nao indexar pagina de cidade sem conteudo unico e prova operacional',
    decisao_permitida: 'manter_redirect; mapear_para_uf; piloto_cidade_unica',
  },
  {
    frente: 'legacy_regioes_cities',
    escopo: 'postes_metalicos',
    url_ou_rota: '/regioes-atendidas/cidades/[city]',
    status_execucao: 'manter_redirect_para_uf_ou_nacional',
    criterio_avanco: 'manter lista de redirects para UFs quando houver equivalencia clara',
    evidencia_aceita: 'redirect por cidade para UF correta ou /postes-metalicos',
    bloqueio: 'nao prometer atendimento local por slug antigo',
    decisao_permitida: 'manter_redirect; mapear_para_uf; descartar_slug',
  },
  {
    frente: 'braco_luminaria_city_lp',
    escopo: 'bracos_suportes',
    url_ou_rota: '/lp/braco-para-luminaria/cidades/[city]',
    status_execucao: 'hardening_texto_aplicado',
    criterio_avanco: 'sem entrega rapida, sem prazo fixo e com prazo/frete confirmados em orcamento',
    evidencia_aceita: 'codigo sem 7 a 15 dias uteis, entrega rapida ou responde em ate 24h',
    bloqueio: 'nao usar a LP antiga como modelo para novas cidades sem reescrita',
    decisao_permitida: 'manter_noindex_futuro; reescrever; redirecionar; piloto_controlado',
  },
  {
    frente: 'servicos_locais',
    escopo: 'corte_laser_pintura',
    url_ou_rota: '/lp/corte-laser/cidades/[city] e /lp/pintura-eletrostatica/cidades/[city]',
    status_execucao: 'fora_do_turnaround_postes',
    criterio_avanco: 'tratar em sprint proprio de servicos locais, nao misturar com postes nacionais',
    evidencia_aceita: 'decisao de escopo separada e pagina nao usada como modelo para postes',
    bloqueio: 'nao copiar estrutura local para paginas nacionais de postes',
    decisao_permitida: 'manter_fora; auditar_em_sprint_proprio',
  },
]

for (const controlRow of controlRows) {
  rows.push({
    ordem: String(rows.length + 1),
    ...controlRow,
    auditor: 'npm run seo:audit:regional-cms-execution-queue',
  })
}

const header = [
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

const csv = [
  header.join(','),
  ...rows.map((row) => header.map((column) => csvEscape(row[column])).join(',')),
].join('\n')

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${csv}\n`)

console.log('Regional CMS execution queue build summary')
console.log(`source_uf_rows=${sourceRows.length}`)
console.log(`queue_rows=${rows.length}`)
console.log(`control_rows=${controlRows.length}`)
console.log(`artifact=${path.relative(root, outputPath)}`)
console.log('Regional CMS execution queue build completed.')
