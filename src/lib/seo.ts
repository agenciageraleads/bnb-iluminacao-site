import { Metadata } from 'next'

interface SeoProps {
    title: string
    description: string
    slug?: string
    image?: string
}

export function generateSeoMetadata({ title, description, slug, image }: SeoProps): Metadata {
    const url = `https://www.bebiluminacao.com.br${slug || ''}`
    const finalImage = image || '/og-image.jpg'

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            images: [{ url: finalImage }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [finalImage],
        },
    }
}
