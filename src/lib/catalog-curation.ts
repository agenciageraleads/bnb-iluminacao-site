const primaryCategoryOrder = [
    'urban',
    'orna',
    'versa',
    'forza',
    'vigia',
    'nexo',
    'civis',
] as const

const legacyPrimaryCategorySlugs = [
    'linha-urban',
    'linha-orna',
    'linha-versa',
    'linha-forza',
    'linha-vigia',
    'linha-nexo',
    'linha-civis',
] as const

const primaryCategorySlugs = new Set<string>([
    ...primaryCategoryOrder,
    ...legacyPrimaryCategorySlugs,
])

export const officialOrnaModels = ['aquila', 'harmonia', 'lyra', 'phoenix', 'altair', 'atlas', 'heliptica', 'aurum', 'vela', 'pyxis'] as const
export const officialOrnaSlugs = officialOrnaModels.flatMap(model => [
    `poste-ornamental-${model}`, `poste-ornamental-${model}-engastado`, `poste-ornamental-${model}-flangeado`,
])
export const developmentLines = ['Sport', 'Agro', 'Garden'].map(name => ({ slug: name.toLowerCase(), name, status: 'development' as const }))
export const eosHubSlug = 'poste-ornamental-eos'

export function isPublicCatalogProduct(product: { category: string; id?: string; slug?: string; lifecycle?: string | null }) {
    if (!isPrimaryCatalogCategory(product.category)) return false
    if (product.lifecycle !== 'active') return false
    const slug = product.slug ?? product.id ?? ''
    if (slug === eosHubSlug) return false
    return !['orna', 'linha-orna'].includes(product.category) || officialOrnaSlugs.includes(slug)
}

export function isPrimaryCatalogCategory(slug: string) {
    return primaryCategorySlugs.has(slug)
}

export function getPrimaryCatalogCategories<T extends { slug: string }>(categories: T[]) {
    return categories
        .filter((category) => isPrimaryCatalogCategory(category.slug))
        .sort((a, b) => getCategoryOrder(a.slug) - getCategoryOrder(b.slug))
}

export function getPrimaryCatalogProducts<T extends { category: string; id?: string; lifecycle?: string | null }>(products: T[]) {
    return products.filter(isPublicCatalogProduct)
}

function getCategoryOrder(slug: string) {
    const normalizedSlug = slug.startsWith('linha-') ? slug.replace('linha-', '') : slug
    const index = primaryCategoryOrder.indexOf(normalizedSlug as typeof primaryCategoryOrder[number])
    return index === -1 ? Number.MAX_SAFE_INTEGER : index
}
