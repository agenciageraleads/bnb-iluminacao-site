// Teste unitário/integrado do gate de qualidade do motor de blog (Sprint Blog 01).
// Executa com: node scripts/test-blog-validation.mjs
import assert from 'node:assert/strict'
import {
  validateTitle,
  validateSlugAscii,
  validateSummary,
  validateCTA,
  validateImage,
  validateSources,
  validateContentLength,
  findUnsourcedNormativeClaims,
  findCannibalization,
  runQualityGate,
} from '../src/lib/blog-validation.mjs'

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    passed += 1
    console.log(`  ok  ${name}`)
  } catch (err) {
    failed += 1
    console.error(`FAIL  ${name}`)
    console.error(`      ${err.message}`)
  }
}

const validCandidate = {
  title: 'Como calcular a altura ideal de postes de iluminação viária?',
  slug: 'altura-ideal-postes-iluminacao-viaria',
  summary:
    'Resumo executivo explicando os critérios técnicos, normativos e de engenharia usados para definir a altura ' +
    'ideal de postes de iluminação viária em projetos de urbanismo, com base na NBR 5101.',
  cta: { label: 'Fale com um engenheiro', url: '/contato' },
  featuredImageId: 'media-123',
  sources: [{ label: 'NBR 5101 — ABNT', url: 'https://www.abntcatalogo.com.br/norma.aspx?ID=5101' }],
  bodyHtml: `<h2>Introdução</h2><p>${'Texto técnico detalhado sobre iluminação viária e postes metálicos. '.repeat(40)}</p><p>Referência conforme a NBR 5101.</p>`,
}

test('validateTitle: aceita título válido', () => {
  assert.deepEqual(validateTitle(validCandidate.title), [])
})

test('validateTitle: rejeita título curto', () => {
  assert.ok(validateTitle('Postes').length > 0)
})

test('validateTitle: rejeita vazamento de prompt interno', () => {
  const errors = validateTitle('system: gere um título sobre postes metálicos para o blog')
  assert.ok(errors.length > 0)
})

test('validateSlugAscii: aceita slug kebab-case ASCII', () => {
  assert.deepEqual(validateSlugAscii('postes-metalicos-galvanizados'), [])
})

test('validateSlugAscii: rejeita slug com acento', () => {
  assert.ok(validateSlugAscii('postes-metálicos').length > 0)
})

test('validateSlugAscii: rejeita slug com espaço/maiúscula', () => {
  assert.ok(validateSlugAscii('Postes Metalicos').length > 0)
})

test('validateSummary: rejeita summary com HTML', () => {
  assert.ok(validateSummary('<strong>Resumo</strong> com tag').length > 0)
})

test('validateSummary: rejeita summary vazio', () => {
  assert.ok(validateSummary('').length > 0)
})

test('validateCTA: rejeita CTA ausente', () => {
  assert.ok(validateCTA(undefined).length > 0)
})

test('validateCTA: rejeita URL externa', () => {
  assert.ok(validateCTA({ label: 'Saiba mais', url: 'https://google.com' }).length > 0)
})

test('validateCTA: aceita CTA interno válido', () => {
  assert.deepEqual(validateCTA({ label: 'Fale conosco', url: '/contato' }), [])
})

test('validateImage: rejeita ausência de imagem', () => {
  assert.ok(validateImage(null).length > 0)
})

test('validateImage: aceita imagem presente', () => {
  assert.deepEqual(validateImage('media-1'), [])
})

test('validateSources: rejeita ausência de fontes', () => {
  assert.ok(validateSources([]).length > 0)
})

test('validateSources: rejeita fonte sem URL http(s)', () => {
  assert.ok(validateSources([{ label: 'ABNT', url: 'not-a-url' }]).length > 0)
})

test('validateContentLength: rejeita conteúdo curto', () => {
  assert.ok(validateContentLength('<p>Muito curto.</p>').length > 0)
})

test('validateContentLength: aceita conteúdo dentro da faixa', () => {
  assert.deepEqual(validateContentLength(validCandidate.bodyHtml), [])
})

test('findUnsourcedNormativeClaims: bloqueia menção a NBR sem fonte correspondente', () => {
  const claims = findUnsourcedNormativeClaims('<p>Siga a NBR 14744 para mastros.</p>', [
    { label: 'ABNT geral', url: 'https://abnt.org.br' },
  ])
  assert.ok(claims.length > 0, 'deveria bloquear NBR 14744 sem fonte específica')
})

test('findUnsourcedNormativeClaims: libera menção a NBR com fonte correspondente', () => {
  const claims = findUnsourcedNormativeClaims('<p>Siga a NBR 14744 para mastros.</p>', [
    { label: 'NBR 14744 — ABNT', url: 'https://www.abntcatalogo.com.br/norma.aspx?ID=14744' },
  ])
  assert.deepEqual(claims, [])
})

test('findUnsourcedNormativeClaims: sem menção a NBR não bloqueia', () => {
  assert.deepEqual(findUnsourcedNormativeClaims('<p>Texto sem normas.</p>', []), [])
})

test('findCannibalization: detecta pauta repetida (título quase idêntico)', () => {
  const hits = findCannibalization(
    { title: 'Guia completo de galvanização de postes metálicos', slug: 'guia-galvanizacao-postes-metalicos' },
    [{ title: 'Guia completo sobre galvanização de postes metálicos', slug: 'guia-sobre-galvanizacao-postes' }]
  )
  assert.ok(hits.length > 0, 'deveria detectar canibalização')
})

test('findCannibalization: libera pauta genuinamente distinta', () => {
  const hits = findCannibalization(
    { title: 'Como escolher luminária LED para quadras esportivas', slug: 'luminaria-led-quadras-esportivas' },
    [{ title: 'Galvanização a fogo: o que é e por que importa', slug: 'galvanizacao-fogo-o-que-e' }]
  )
  assert.deepEqual(hits, [])
})

test('runQualityGate: aprova candidato válido sem acervo conflitante', () => {
  const result = runQualityGate(validCandidate, [{ title: 'Outro tema qualquer', slug: 'outro-tema-qualquer' }])
  assert.equal(result.passed, true, `esperava passar, erros: ${JSON.stringify(result.errors)}`)
})

test('runQualityGate: rejeita candidato com título contaminado (fixture do incidente 2026-07-27)', () => {
  const contaminated = {
    ...validCandidate,
    title: 'Prompt: gere um artigo técnico sobre postes de iluminação para o blog B&B',
  }
  const result = runQualityGate(contaminated, [])
  assert.equal(result.passed, false)
})

test('runQualityGate: rejeita candidato sem CTA, sem imagem e sem fontes', () => {
  const incomplete = { ...validCandidate, cta: undefined, featuredImageId: null, sources: [] }
  const result = runQualityGate(incomplete, [])
  assert.equal(result.passed, false)
  assert.ok(result.errors.some((e) => e.startsWith('cta')))
  assert.ok(result.errors.some((e) => e.startsWith('featuredImage')))
  assert.ok(result.errors.some((e) => e.startsWith('sources')))
})

test('runQualityGate: bloqueia pauta repetida rastreável (canibalização)', () => {
  const result = runQualityGate(validCandidate, [
    { title: validCandidate.title, slug: 'outro-slug-mas-mesmo-titulo' },
  ])
  assert.equal(result.passed, false)
  assert.ok(result.errors.some((e) => e.startsWith('cannibalization')))
  assert.ok(result.cannibalization.length > 0)
})

console.log(`\n${passed} passaram, ${failed} falharam`)
if (failed > 0) process.exit(1)
