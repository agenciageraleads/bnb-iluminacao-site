import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const manifestPath = path.join(root, 'src/lib/seo/images.ts')
const publicImagesRoot = path.join(root, 'public/images/seo')
const docsPath = path.join(root, '../../Marketing/seo-turnaround-2026-06-12/PADRAO_IMAGENS_SEO_BB.md')
const filenamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|jpeg|png|webp)$/i
const failures = []

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const currentPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...await walk(currentPath))
    } else {
      files.push(currentPath)
    }
  }

  return files
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

const manifest = await readFile(manifestPath, 'utf8')
const docs = await readFile(docsPath, 'utf8')
const imageFiles = await walk(publicImagesRoot)

for (const file of imageFiles) {
  const basename = path.basename(file)
  const relativePublicPath = `/${path.relative(path.join(root, 'public'), file).replaceAll(path.sep, '/')}`
  const size = await stat(file)

  assert(filenamePattern.test(basename), `Nome de imagem fora do padrao kebab-case ASCII: ${relativePublicPath}`)
  assert(manifest.includes(`src: "${relativePublicPath}"`), `Imagem SEO sem entrada no manifest: ${relativePublicPath}`)
  assert(size.size > 10_000, `Imagem SEO parece vazia ou muito pequena: ${relativePublicPath}`)
}

const manifestImagePaths = [...manifest.matchAll(/src: "([^"]+)"/g)].map((match) => match[1])
for (const src of manifestImagePaths) {
  if (!src.startsWith('/images/seo/')) {
    continue
  }

  const filePath = path.join(root, 'public', src)
  try {
    await stat(filePath)
  } catch {
    failures.push(`Entrada do manifest aponta para arquivo inexistente: ${src}`)
  }
}

assert(docs.includes('## Nome de arquivo'), 'Documento de padrao de imagens sem secao de nomes')
assert(docs.includes('## Alt text'), 'Documento de padrao de imagens sem secao de alt text')
assert(docs.includes('src/lib/seo/images.ts'), 'Documento de padrao de imagens nao referencia o manifest tecnico')
assert(manifest.includes('getProductImageAlt'), 'Manifest nao expoe helper de alt para galeria de produto')

if (failures.length > 0) {
  console.error('\nSEO image audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`SEO image audit passed: ${imageFiles.length} SEO images covered by manifest.`)
