export function getProductLineHref(slug: string) {
    const normalizedSlug = slug.startsWith("linha-") ? slug.replace("linha-", "") : slug
    return `/produtos/${normalizedSlug}`
}
