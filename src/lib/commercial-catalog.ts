import type { Product } from './constants'
import { cache } from 'react'
import { isPublicCatalogProduct } from './catalog-curation'

type PublicModel = {
    id: string; revision: number; lineSlug: string; lineName: string; modelSlug: string;
    name: string; slug: string; description: string; siteSlugs: string[]; commercialCode: string | null; catalogPage: number | null; status: 'active';
    image: { url: string; alt: string; revision: number | string } | null;
    variants: { id: string; label: string; heightMeters: number | null; fixation: string | null; finish: string | null; commercialCode: string | null; status: 'active' }[];
}

export type CatalogPublication = {
    version: 1;
    products: PublicModel[];
    developmentLines: { slug: string; name: string; status: 'development' }[];
}

function nullableText(value: unknown): string | null {
    if (value === null || value === undefined) return null
    if (typeof value !== 'string') throw new Error('Invalid catalog text')
    return value
}

function nullableNumber(value: unknown): number | null {
    if (value === null || value === undefined) return null
    if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('Invalid catalog number')
    return value
}

export function parseCatalogPublication(value: unknown): CatalogPublication {
    const feed = value as CatalogPublication
    if (!feed || feed.version !== 1 || !Array.isArray(feed.products) || !feed.products.length || !Array.isArray(feed.developmentLines)) throw new Error('Catalog publication is missing or empty')
    const slugs = new Set<string>()
    for (const product of feed.products) {
        if (![product?.id, product?.lineName, product?.modelSlug].every(field => typeof field === 'string' && field.length > 0) || !Number.isInteger(product?.revision)) throw new Error('Invalid catalog identity')
        if (!product || typeof product.name !== 'string' || !product.name.trim() || typeof product.lineSlug !== 'string' || typeof product.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug) || slugs.has(product.slug) || product.status !== 'active' || !Array.isArray(product.variants)) throw new Error('Invalid catalog product')
        if (product.image) {
            if (typeof product.image.alt !== 'string' || typeof product.image.revision !== 'string') throw new Error('Invalid catalog image metadata')
            const imageUrl = new URL(product.image.url)
            if (imageUrl.protocol !== 'https:' || imageUrl.username || imageUrl.password || imageUrl.port || !['crm.bebiluminacao.com', 'bebiluminacao.com.br', 'www.bebiluminacao.com.br'].includes(imageUrl.hostname)) throw new Error('Invalid catalog image')
            if (imageUrl.hostname === 'crm.bebiluminacao.com' && !imageUrl.pathname.startsWith('/catalog/')) throw new Error('Invalid catalog image path')
        }
        if (!isPublicCatalogProduct({ category: product.lineSlug, slug: product.slug, lifecycle: 'active' })) throw new Error('Unapproved public catalog product')
        slugs.add(product.slug)
    }
    for (const product of feed.products) {
        for (const alias of product.siteSlugs ?? []) {
            if (alias === product.slug) continue
            if (typeof alias !== 'string' || slugs.has(alias) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(alias) || !isPublicCatalogProduct({ category: product.lineSlug, slug: alias, lifecycle: 'active' })) throw new Error('Invalid catalog alias')
            slugs.add(alias)
        }
    }
    return {
        version: 1,
        products: feed.products.map(product => ({
            id: product.id, revision: product.revision, lineSlug: product.lineSlug, lineName: product.lineName,
            modelSlug: product.modelSlug, name: product.name, slug: product.slug,
            description: typeof product.description === 'string' ? product.description : '',
            siteSlugs: Array.isArray(product.siteSlugs) ? product.siteSlugs.filter(slug => typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) : [],
            commercialCode: nullableText(product.commercialCode), catalogPage: nullableNumber(product.catalogPage), status: 'active',
            image: product.image ? { url: product.image.url, alt: product.image.alt, revision: product.image.revision } : null,
            variants: product.variants.filter(variant => variant?.status === 'active').map(variant => {
                if (typeof variant.id !== 'string' || typeof variant.label !== 'string') throw new Error('Invalid catalog variant')
                return { id: variant.id, label: variant.label, heightMeters: nullableNumber(variant.heightMeters), fixation: nullableText(variant.fixation), finish: nullableText(variant.finish), commercialCode: nullableText(variant.commercialCode), status: 'active' }
            }),
        })),
        developmentLines: ['Sport', 'Agro', 'Garden'].map(name => ({ slug: name.toLowerCase(), name, status: 'development' })),
    }
}

export const fetchCatalogPublication = cache(async (): Promise<CatalogPublication> => {
    const endpoint = process.env.CRM_CATALOG_URL
    if (!endpoint || !endpoint.startsWith('https://')) throw new Error('CRM_CATALOG_URL must use HTTPS')
    const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(8000), redirect: 'error' })
    if (!response.ok) throw new Error(`Catalog publication unavailable (${response.status})`)
    return parseCatalogPublication(await response.json())
})

export function publicationProducts(feed: CatalogPublication): Product[] {
    return feed.products.map(product => ({
        id: product.slug, name: product.name, category: product.lineSlug, model: product.commercialCode || product.modelSlug,
        image: product.image?.url || '', lifecycle: 'active', siteSlugs: product.siteSlugs,
        description: product.description || `${product.name} — Linha ${product.lineName}. Consulte as configurações e o detalhamento técnico com a B&B Iluminação.`,
        specs: product.variants.map(variant => variant.label), badges: [], applications: [], optionals: [],
    }))
}
