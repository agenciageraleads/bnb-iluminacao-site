import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bebiluminacao.com.br'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            // Motores Generativos de IA (GEO)
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'Claude-Web', 'anthropic-ai'],
                allow: '/',
                disallow: ['/admin/'],
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
