import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getGoogleAccessToken, runGa4Report } from '@/lib/ga4-client'

// Endpoint de leitura só — resumo periódico de tráfego/engajamento dos posts publicados do
// blog, usado pela automação do piloto Sprint Blog 04 (n8n dispara semanalmente e manda o
// resumo por WhatsApp). Usa a MESMA service account do Google já usada em outras integrações
// do workspace (Sheets/Search Console/GA4), com escopo analytics.readonly já concedido na
// propriedade GA4 da B&B — nunca grava nada no Google, só lê.

function verifyInternalToken(req: Request): boolean {
    const secret = process.env.BLOG_ENGINE_SECRET
    if (!secret) return false
    const auth = req.headers.get('Authorization') ?? ''
    if (!auth.startsWith('Bearer ')) return false
    const token = auth.slice(7)
    try {
        const tokenBuf = Buffer.from(token)
        const secretBuf = Buffer.from(secret)
        if (tokenBuf.length !== secretBuf.length) return false
        return timingSafeEqual(tokenBuf, secretBuf)
    } catch {
        return false
    }
}

export async function GET(req: Request) {
    try {
        if (!verifyInternalToken(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const propertyId = process.env.GA4_PROPERTY_ID || ''
        if (!propertyId) {
            return NextResponse.json({ success: false, error: 'GA4_PROPERTY_ID não configurada' }, { status: 200 })
        }

        const { searchParams } = new URL(req.url)
        const days = Number(searchParams.get('days') || '30')

        const payload = await getPayload({ config })
        const posts = await payload.find({
            collection: 'blog',
            where: { status: { equals: 'published' } },
            limit: 200,
            select: { title: true, slug: true, createdAt: true },
        })

        const accessToken = await getGoogleAccessToken()

        const reportData = await runGa4Report(accessToken, propertyId, {
            dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
            dimensions: [{ name: 'pagePath' }],
            metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
            dimensionFilter: {
                filter: {
                    fieldName: 'pagePath',
                    stringFilter: { matchType: 'BEGINS_WITH', value: '/blog/' },
                },
            },
            limit: 500,
        })

        const viewsByPath: Record<string, { pageViews: number; sessions: number }> = {}
        for (const row of reportData.rows ?? []) {
            const path = row.dimensionValues?.[0]?.value ?? ''
            viewsByPath[path] = {
                pageViews: Number(row.metricValues?.[0]?.value ?? 0),
                sessions: Number(row.metricValues?.[1]?.value ?? 0),
            }
        }

        const summary = posts.docs.map((p: any) => {
            const path = `/blog/${p.slug}`
            const metrics = viewsByPath[path] ?? { pageViews: 0, sessions: 0 }
            const ageDays = Math.floor((Date.now() - new Date(p.createdAt).getTime()) / 86400000)
            return {
                slug: p.slug,
                title: p.title,
                publishedAt: p.createdAt,
                ageDays,
                pageViews: metrics.pageViews,
                sessions: metrics.sessions,
            }
        })

        summary.sort((a, b) => b.pageViews - a.pageViews)

        return NextResponse.json({
            success: true,
            periodDays: days,
            totalPosts: summary.length,
            totalPageViews: summary.reduce((acc, s) => acc + s.pageViews, 0),
            posts: summary,
        })
    } catch (error: any) {
        console.error('Falha no endpoint de analytics do blog:', error)
        return NextResponse.json({
            success: false,
            error: 'Erro ao consultar GA4',
            details: error.message,
        }, { status: 200 })
    }
}
