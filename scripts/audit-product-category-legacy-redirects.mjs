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

const unknownMetadataIndex = source.indexOf('title: "Linha de produtos nao encontrada"')
const notFoundIndex = source.indexOf('notFound()')

if (unknownMetadataIndex === -1) {
  failures.push('metadata de slug desconhecido deveria continuar sinalizando linha nao encontrada')
}

if (notFoundIndex === -1 || notFoundIndex < unknownMetadataIndex) {
  failures.push('slug desconhecido precisa chamar notFound() antes de renderizar o <main>')
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
