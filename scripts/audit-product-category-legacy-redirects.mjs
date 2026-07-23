import { readFile } from 'node:fs/promises'

const sourcePath = 'src/app/(site)/produtos/[category]/page.tsx'
const source = await readFile(sourcePath, 'utf8')
const failures = []

function assertIncludes(expected, label) {
  if (!source.includes(expected)) {
    failures.push(`${label} ausente: ${expected}`)
  }
}

assertIncludes('const legacyCategoryRedirects: Record<string, string>', 'mapa de redirects legados')
assertIncludes('"poste-metalico": "/postes-metalicos"', 'redirect legado poste-metalico')
assertIncludes('redirect(legacyRedirect)', 'execucao do redirect legado')
assertIncludes('notFound()', 'slug de categoria inexistente deve retornar 404')
assertIncludes('index: false', 'metadata de alias legado deve evitar indexacao direta')
assertIncludes('canonical: `${SITE_URL}${legacyCategoryRedirects[categorySlug]}`', 'canonical do alias legado')

if (/Linha de produtos nao encontrada[\\s\\S]*<main/.test(source)) {
  failures.push('rota ainda parece permitir renderizacao 200 para linha de produtos nao encontrada')
}

console.log('Product category legacy redirects audit summary')
console.log(`source=${sourcePath}`)
console.log(`failures=${failures.length}`)

if (failures.length > 0) {
  console.error('\nProduct category legacy redirects audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nProduct category legacy redirects audit completed.')
