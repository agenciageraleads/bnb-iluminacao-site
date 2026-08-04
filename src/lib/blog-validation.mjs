// Gate de qualidade do motor de blog (Sprint Blog 01).
// Módulo puro (sem I/O) para ser testável por `node` puro e importável pela rota Next.js.

const ASCII_SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const STOPWORDS = new Set([
  'a', 'o', 'e', 'de', 'da', 'do', 'em', 'para', 'com', 'que', 'os', 'as',
  'um', 'uma', 'no', 'na', 'nos', 'nas', 'como', 'por', 'ao', 'aos', 'se', 'sua', 'seu',
])
const MIN_CONTENT_CHARS = 1200
const MAX_CONTENT_CHARS = 20000
const MIN_SUMMARY_CHARS = 40
const MAX_SUMMARY_CHARS = 400
const CANNIBALIZATION_THRESHOLD = 0.6
const NBR_MENTION_RE = /NBR\s?-?\s?\d{4,5}/gi

function stripHtml(html) {
  return String(html ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function tokenize(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((tok) => tok.length > 2 && !STOPWORDS.has(tok))
}

function jaccard(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 0
  let intersection = 0
  for (const tok of setA) {
    if (setB.has(tok)) intersection += 1
  }
  const union = new Set([...setA, ...setB]).size
  return union === 0 ? 0 : intersection / union
}

export function validateTitle(title) {
  const errors = []
  if (typeof title !== 'string' || title.trim().length < 10) {
    errors.push('title: obrigatório, mínimo 10 caracteres.')
    return errors
  }
  if (title.length > 140) errors.push('title: excede 140 caracteres.')
  if (/<[^>]+>/.test(title)) errors.push('title: contém marcação HTML.')
  if (/\b(prompt|instru[cç][aã]o interna|system\s*:|assistant\s*:|ai model|modelo de ia)/i.test(title)) {
    errors.push('title: contém texto interno do agente (vazamento de prompt).')
  }
  return errors
}

export function validateSlugAscii(slug) {
  const errors = []
  if (typeof slug !== 'string' || slug.length === 0) {
    errors.push('slug: obrigatório.')
    return errors
  }
  if (!ASCII_SLUG_RE.test(slug)) {
    errors.push('slug: deve ser ASCII em kebab-case (apenas a-z, 0-9 e hífen).')
  }
  return errors
}

export function validateSummary(summary) {
  const errors = []
  if (typeof summary !== 'string' || summary.trim().length === 0) {
    errors.push('summary: obrigatório.')
    return errors
  }
  if (/<[^>]+>/.test(summary)) errors.push('summary: contém marcação HTML (deve ser texto puro).')
  if (summary.length < MIN_SUMMARY_CHARS) errors.push(`summary: abaixo do mínimo de ${MIN_SUMMARY_CHARS} caracteres.`)
  if (summary.length > MAX_SUMMARY_CHARS) errors.push(`summary: acima do máximo de ${MAX_SUMMARY_CHARS} caracteres.`)
  return errors
}

export function validateCTA(cta) {
  const errors = []
  if (!cta || typeof cta !== 'object') {
    errors.push('cta: obrigatório (label + url).')
    return errors
  }
  if (typeof cta.label !== 'string' || cta.label.trim().length === 0) {
    errors.push('cta.label: obrigatório.')
  }
  if (typeof cta.url !== 'string' || !/^\//.test(cta.url)) {
    errors.push('cta.url: obrigatório, deve ser um caminho interno (começando com "/").')
  }
  return errors
}

export function validateImage(featuredImageId) {
  const errors = []
  if (!featuredImageId) errors.push('featuredImage: obrigatório (Agente Fotógrafo não gerou/anexou imagem).')
  return errors
}

export function validateSources(sources) {
  const errors = []
  if (!Array.isArray(sources) || sources.length === 0) {
    errors.push('sources: obrigatório, ao menos 1 fonte aprovada.')
    return errors
  }
  sources.forEach((s, i) => {
    if (!s || typeof s.label !== 'string' || s.label.trim().length === 0) {
      errors.push(`sources[${i}].label: obrigatório.`)
    }
    if (!s || typeof s.url !== 'string' || !/^https?:\/\//.test(s.url)) {
      errors.push(`sources[${i}].url: obrigatório, deve ser uma URL http(s) válida.`)
    }
  })
  return errors
}

export function validateContentLength(bodyHtml) {
  const errors = []
  const text = stripHtml(bodyHtml)
  if (text.length < MIN_CONTENT_CHARS) {
    errors.push(`bodyHtml: conteúdo abaixo do mínimo de ${MIN_CONTENT_CHARS} caracteres (tem ${text.length}).`)
  }
  if (text.length > MAX_CONTENT_CHARS) {
    errors.push(`bodyHtml: conteúdo acima do máximo de ${MAX_CONTENT_CHARS} caracteres (tem ${text.length}).`)
  }
  return errors
}

// Detecta afirmação normativa (menção a NBR) sem fonte aprovada correspondente.
export function findUnsourcedNormativeClaims(bodyHtml, sources) {
  const text = stripHtml(bodyHtml)
  const mentions = [...new Set((text.match(NBR_MENTION_RE) ?? []).map((m) => m.replace(/\s|-/g, '').toUpperCase()))]
  if (mentions.length === 0) return []

  const sourceText = (Array.isArray(sources) ? sources : [])
    .map((s) => `${s?.label ?? ''} ${s?.url ?? ''}`)
    .join(' ')
    .replace(/\s|-/g, '')
    .toUpperCase()

  return mentions
    .filter((norma) => !sourceText.includes(norma))
    .map((norma) => `norma citada sem fonte aprovada correspondente: ${norma}`)
}

// Duplicidade semântica / canibalização: compara título+slug contra o acervo existente.
export function findCannibalization(candidate, existingPosts) {
  const candidateTitleTokens = new Set(tokenize(candidate.title))
  const candidateSlugTokens = new Set(String(candidate.slug ?? '').split('-').filter(Boolean))

  const hits = []
  for (const post of existingPosts ?? []) {
    if (!post || post.slug === candidate.slug) continue
    const titleSim = jaccard(candidateTitleTokens, new Set(tokenize(post.title)))
    const slugSim = jaccard(candidateSlugTokens, new Set(String(post.slug ?? '').split('-').filter(Boolean)))
    const sim = Math.max(titleSim, slugSim)
    if (sim >= CANNIBALIZATION_THRESHOLD) {
      hits.push({ slug: post.slug, title: post.title, similarity: Number(sim.toFixed(2)) })
    }
  }
  return hits
}

// Gate agregado. Retorna { passed, errors[], cannibalization[] }.
export function runQualityGate(candidate, existingPosts = []) {
  const errors = [
    ...validateTitle(candidate.title),
    ...validateSlugAscii(candidate.slug),
    ...validateSummary(candidate.summary),
    ...validateCTA(candidate.cta),
    ...validateImage(candidate.featuredImageId),
    ...validateSources(candidate.sources),
    ...validateContentLength(candidate.bodyHtml),
    ...findUnsourcedNormativeClaims(candidate.bodyHtml, candidate.sources).map((m) => `sources: ${m}`),
  ]

  const cannibalization = findCannibalization(candidate, existingPosts)
  if (cannibalization.length > 0) {
    errors.push(
      `cannibalization: pauta muito similar a post(s) existente(s): ${cannibalization
        .map((c) => `${c.slug} (${c.similarity})`)
        .join(', ')}`
    )
  }

  return { passed: errors.length === 0, errors, cannibalization }
}
