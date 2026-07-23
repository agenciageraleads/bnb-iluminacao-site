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

export function isPrimaryCatalogCategory(slug: string) {
    return primaryCategorySlugs.has(slug)
}

export function getPrimaryCatalogCategories<T extends { slug: string }>(categories: T[]) {
    return categories
        .filter((category) => isPrimaryCatalogCategory(category.slug))
        .sort((a, b) => getCategoryOrder(a.slug) - getCategoryOrder(b.slug))
}

export function getPrimaryCatalogProducts<T extends { category: string }>(products: T[]) {
    return products.filter((product) => isPrimaryCatalogCategory(product.category))
}

function getCategoryOrder(slug: string) {
    const normalizedSlug = slug.startsWith('linha-') ? slug.replace('linha-', '') : slug
    const index = primaryCategoryOrder.indexOf(normalizedSlug as typeof primaryCategoryOrder[number])
    return index === -1 ? Number.MAX_SAFE_INTEGER : index
}
