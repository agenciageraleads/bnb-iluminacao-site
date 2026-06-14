const baseUrl = process.env.SITE_SMOKE_BASE_URL ?? 'https://bebiluminacao.com.br'

const paths = [
  '/',
  '/fabrica-de-postes-metalicos',
  '/fabricante-de-postes-metalicos',
  '/fabricante-de-postes-teleconicos',
  '/fornecedor-de-postes-metalicos',
  '/postes-metalicos',
  '/postes-para-iluminacao-publica',
  '/postes-para-loteamentos',
  '/postes-para-condominios',
  '/postes-para-pracas',
  '/postes-para-estacionamentos',
  '/produtos/poste-teleconico',
  '/produtos/poste-metalico-galvanizado',
  '/produtos/poste-curvo-simples',
  '/produtos/poste-curvo-duplo',
  '/produtos/braco-para-luminaria-publica',
  '/lp/postes-metalicos',
  '/produtos',
  '/blog',
  '/blog/altura-de-poste-para-iluminacao-publica',
  '/blog/normas-para-postes-de-iluminacao',
  '/blog/poste-galvanizado-ou-pintado',
  '/blog/poste-teleconico-ou-reto',
  '/blog/poste-flangeado-ou-engastado',
  '/representantes',
  '/downloads',
]

const failures = []

for (const path of paths) {
  const url = new URL(path, baseUrl).toString()
  const startedAt = Date.now()

  try {
    const response = await fetch(url, { redirect: 'follow' })
    const elapsedMs = Date.now() - startedAt
    console.log(`${response.status} ${elapsedMs}ms ${url}`)

    if (response.status < 200 || response.status >= 400) {
      failures.push(`${url} returned ${response.status}`)
    }
  } catch (error) {
    console.log(`ERR ${url} ${error instanceof Error ? error.message : String(error)}`)
    failures.push(`${url} failed`)
  }
}

if (failures.length > 0) {
  console.error('\nPublic smoke failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}
