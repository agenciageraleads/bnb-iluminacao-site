import assert from 'node:assert/strict'
import { isPublicCatalogProduct, officialOrnaModels, developmentLines } from '../src/lib/catalog-curation'
import { parseCatalogPublication, publicationCategories, publicationProducts, fetchCatalogPublication } from '../src/lib/commercial-catalog'
import { readPublicProducts, publicProductWhere } from '../src/lib/catalog-public-access'
import { eosProducts } from '../src/lib/eos-products'

for (const model of officialOrnaModels) assert.equal(isPublicCatalogProduct({ category: 'orna', id: `poste-ornamental-${model}`, lifecycle: 'active' }), true)
for (const model of ['aurora', 'serena', 'astra', 'polaris']) assert.equal(isPublicCatalogProduct({ category: 'orna', id: `poste-ornamental-${model}`, lifecycle: 'active' }), false)
assert.equal(isPublicCatalogProduct({ category: 'urban', lifecycle: 'hidden' }), false)
assert.equal(isPublicCatalogProduct({ category: 'urban' }), false)
assert.equal(isPublicCatalogProduct({ category: 'sport', lifecycle: 'active' }), false)
assert.equal(isPublicCatalogProduct({ category: 'versa', id: 'poste-ornamental-eos', lifecycle: 'active' }), false)
assert.deepEqual(developmentLines.map(line => line.name), ['Sport', 'Agro', 'Garden'])
assert.equal(new Set(eosProducts.map(product => product.image)).size, 2)
assert.equal(new Set(eosProducts.map(product => product.model)).size, 2)
assert.ok(eosProducts.every(isPublicCatalogProduct))

const model = { id: 'stable-1', revision: 1, lineSlug: 'urban', lineName: 'Urban', modelSlug: 'reto', name: 'Poste Reto', slug: 'poste-reto', description: 'Descrição aprovada', status: 'active', image: null, variants: [], erpCodprod: 123, cost: 900 }
const feed = parseCatalogPublication({ version: 1, products: [model], developmentLines, internal: 'private' })
assert.equal(JSON.stringify(feed).includes('private'), false)
assert.equal(JSON.stringify(feed).includes('erpCodprod'), false)
assert.equal(JSON.stringify(feed).includes('cost'), false)
assert.equal(publicationProducts(feed)[0].description, 'Descrição aprovada')
assert.deepEqual(publicationProducts(feed)[0].specs, [])
assert.equal(publicationCategories(feed)[0].image, '')
const approvedImage = { url: `https://crm.bebiluminacao.com/catalog/${'a'.repeat(64)}.png`, alt: 'Poste Reto do catálogo', revision: 'a'.repeat(64) }
const categoryFeed = parseCatalogPublication({ version: 1, developmentLines, products: [
    { ...model, id: 'later', slug: 'poste-z', catalogPage: 8, image: { ...approvedImage, url: `https://crm.bebiluminacao.com/catalog/${'b'.repeat(64)}.png` } },
    { ...model, id: 'no-image', slug: 'poste-a', catalogPage: 6, lineName: 'Linha Urban' },
    { ...model, id: 'first-approved', slug: 'poste-b', catalogPage: 6, image: approvedImage },
] })
const categoryOrder = categoryFeed.products.map(product => product.id)
const category = publicationCategories(categoryFeed)[0]
assert.equal(category.image, approvedImage.url)
assert.equal(category.imageAlt, approvedImage.alt)
assert.equal(category.imageFit, 'contain')
assert.equal(category.title, 'Linha Urban')
assert.equal(category.description.includes('Linha Linha'), false)
assert.deepEqual(publicationCategories({ ...categoryFeed, products: [...categoryFeed.products].reverse() }), [category])
assert.deepEqual(categoryFeed.products.map(product => product.id), categoryOrder)
assert.throws(() => parseCatalogPublication({ version: 1, products: [], developmentLines }))
assert.throws(() => parseCatalogPublication({ version: 1, products: [{ ...model, status: 'hidden' }], developmentLines }))
assert.throws(() => parseCatalogPublication({ version: 1, products: [model, model], developmentLines }))
assert.throws(() => parseCatalogPublication({ version: 1, products: [{ ...model, commercialCode: { cost: 999 } }], developmentLines }))
assert.throws(() => parseCatalogPublication({ version: 1, products: [{ ...model, siteSlugs: ['../hidden'] }], developmentLines }))
const aliases = parseCatalogPublication({ version: 1, products: [{ ...model, siteSlugs: ['poste-teleconico-antigo'] }], developmentLines })
assert.deepEqual(publicationProducts(aliases)[0].siteSlugs, ['poste-teleconico-antigo'])
assert.throws(() => parseCatalogPublication({ version: 1, products: [{ ...model, image: { url: 'https://evil.example/image.png' } }], developmentLines }))

const originalSource = process.env.CATALOG_SOURCE
const originalUrl = process.env.CRM_CATALOG_URL
try {
    delete process.env.CATALOG_SOURCE
    assert.deepEqual(await readPublicProducts({ req: { user: null } } as never), publicProductWhere)
    process.env.CATALOG_SOURCE = 'crm'
    assert.equal(await readPublicProducts({ req: { user: null } } as never), false)
    assert.equal(await readPublicProducts({ req: { user: { id: 1 } } } as never), true)
    delete process.env.CRM_CATALOG_URL
    await assert.rejects(fetchCatalogPublication(), /HTTPS/)
} finally {
    if (originalSource === undefined) delete process.env.CATALOG_SOURCE
    else process.env.CATALOG_SOURCE = originalSource
    if (originalUrl === undefined) delete process.env.CRM_CATALOG_URL
    else process.env.CRM_CATALOG_URL = originalUrl
}
console.log('Commercial catalog checks passed: visibility, aliases, DTO privacy, images, source gate, fail-closed.')
