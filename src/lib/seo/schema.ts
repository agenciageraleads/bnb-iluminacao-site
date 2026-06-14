export type SchemaNode = Record<string, unknown>

export const SITE_URL = "https://bebiluminacao.com.br"
export const ORGANIZATION_ID = `${SITE_URL}/#organization`

export interface BreadcrumbItem {
    name: string
    item: string
}

export interface FaqItem {
    question: string
    answer: string
}

export interface ListItem {
    name: string
    description?: string
    url?: string
}

export interface ProductProperty {
    name: string
    value: string
}

export function absoluteUrl(pathOrUrl: string) {
    if (/^https?:\/\//.test(pathOrUrl)) {
        return pathOrUrl
    }

    return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`
}

export function createSchemaGraph(nodes: SchemaNode[]) {
    return {
        "@context": "https://schema.org",
        "@graph": nodes,
    }
}

export function createWebPageSchema({
    url,
    name,
    description,
    image,
    mainEntityId,
}: {
    url: string
    name: string
    description: string
    image?: string
    mainEntityId?: string
}): SchemaNode {
    return {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: {
            "@id": ORGANIZATION_ID,
        },
        ...(image
            ? {
                  primaryImageOfPage: {
                      "@type": "ImageObject",
                      url: absoluteUrl(image),
                  },
              }
            : {}),
        ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
    }
}

export function createBreadcrumbSchema(url: string, items: BreadcrumbItem[]): SchemaNode {
    return {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.item,
        })),
    }
}

export function createItemListSchema({
    id,
    name,
    items,
}: {
    id: string
    name: string
    items: ListItem[]
}): SchemaNode {
    return {
        "@type": "ItemList",
        "@id": id,
        name,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            ...(item.description ? { description: item.description } : {}),
            ...(item.url ? { url: absoluteUrl(item.url) } : {}),
        })),
    }
}

export function createFaqSchema(url: string, items: FaqItem[]): SchemaNode {
    return {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    }
}

export function createImageSchemas(images: Array<{ src: string; title: string; alt: string }>): SchemaNode[] {
    return images.map((image) => ({
        "@type": "ImageObject",
        contentUrl: absoluteUrl(image.src),
        name: image.title,
        description: image.alt,
    }))
}

export function createProductSchema({
    url,
    name,
    description,
    image,
    category,
    properties,
}: {
    url: string
    name: string
    description: string
    image: string
    category: string
    properties: ProductProperty[]
}): SchemaNode {
    return {
        "@type": "Product",
        "@id": `${url}#product`,
        name,
        description,
        image: absoluteUrl(image),
        brand: {
            "@type": "Brand",
            name: "B&B Iluminacao",
        },
        category,
        additionalProperty: properties.map((property) => ({
            "@type": "PropertyValue",
            name: property.name,
            value: property.value,
        })),
    }
}

export function createFactoryOrganizationSchema(): SchemaNode {
    return {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "B&B Iluminacao",
        url: SITE_URL,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Goiania",
            addressRegion: "GO",
            addressCountry: "BR",
        },
    }
}
