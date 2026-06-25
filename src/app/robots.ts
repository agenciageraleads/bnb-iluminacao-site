import { MetadataRoute } from 'next'

const privatePaths = ['/admin/', '/api/']

const aiSearchAndReferralBots = [
    'OAI-SearchBot',
    'ChatGPT-User',
    'OAI-AdsBot',
    'PerplexityBot',
    'Perplexity-User',
    'Claude-SearchBot',
    'Claude-User',
]

const aiTrainingAndDatasetBots = [
    'GPTBot',
    'Google-Extended',
    'ClaudeBot',
    'anthropic-ai',
    'CCBot',
]

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bebiluminacao.com.br'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: privatePaths,
            },
            {
                userAgent: aiSearchAndReferralBots,
                allow: '/',
                disallow: privatePaths,
            },
            {
                userAgent: aiTrainingAndDatasetBots,
                disallow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
