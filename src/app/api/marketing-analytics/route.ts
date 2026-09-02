import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getGoogleAccessToken, runGa4Report } from '@/lib/ga4-client'

// Endpoint de leitura só — alimenta a aba de Marketing do CRM B&B. Dois blocos:
// 1) blog: performance por post + checkpoints D+14/30/60/90 (calculados sob demanda a partir
//    do histórico diário do GA4, sem tabela de snapshot própria — o GA4 já é a fonte da verdade
//    histórica).
// 2) events: totais dos eventos de lead do lead-tracking (src/lib/lead-tracking.tsx) no site
//    inteiro, não só o blog.
// Reusa a mesma service account do Google já usada noutras integrações do workspace. Só leitura.

const CHECKPOINT_DAYS = [14, 30, 60, 90] as const
const LEAD_EVENT_NAMES = [
    'whatsapp_click',
    'download_click',
    'form_submit',
    'blog_cta_click',
    'phone_click',
    'catalog_lead_submit',
] as const

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

// Formato usado para comparar com o valor da dimensão "date" nas linhas retornadas pelo GA4
// (sempre YYYYMMDD, sem hífen).
function toGa4RowDate(d: Date): string {
    return d.toISOString().slice(0, 10).replace(/-/g, '')
}

// Formato exigido pelo campo startDate/endDate do corpo da requisição runReport (YYYY-MM-DD).
function toGa4RequestDate(d: Date): string {
    return d.toISOString().slice(0, 10)
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
        const eventDays = Number(searchParams.get('eventDays') || '30')

        const payload = await getPayload({ config })
        const posts = await payload.find({
            collection: 'blog',
            where: { status: { equals: 'published' } },
            limit: 300,
            select: { title: true, slug: true, createdAt: true },
        })

        const accessToken = await getGoogleAccessToken()

        // Bloco 1 — blog: daily granularity desde o post mais antigo até hoje, um único
        // runReport (barato), depois soma cumulativa em código pra achar os checkpoints.
        const oldestCreatedAt = posts.docs.reduce((min: number, p: any) => {
            const t = new Date(p.createdAt).getTime()
            return t < min ? t : min
        }, Date.now())
        const startDate = toGa4RequestDate(new Date(oldestCreatedAt))

        const dailyReport = await runGa4Report(accessToken, propertyId, {
            dateRanges: [{ startDate, endDate: 'today' }],
            dimensions: [{ name: 'date' }, { name: 'pagePath' }],
            metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
            dimensionFilter: {
                filter: {
                    fieldName: 'pagePath',
                    stringFilter: { matchType: 'BEGINS_WITH', value: '/blog/' },
                },
            },
            limit: 100000,
        })

        // path -> [{ date: 'YYYYMMDD', pageViews, sessions }] ordenado
        const rowsByPath: Record<string, { date: string; pageViews: number; sessions: number }[]> = {}
        for (const row of dailyReport.rows ?? []) {
            const date = row.dimensionValues?.[0]?.value ?? ''
            const path = row.dimensionValues?.[1]?.value ?? ''
            const pageViews = Number(row.metricValues?.[0]?.value ?? 0)
            const sessions = Number(row.metricValues?.[1]?.value ?? 0)
            if (!rowsByPath[path]) rowsByPath[path] = []
            rowsByPath[path].push({ date, pageViews, sessions })
        }
        for (const path of Object.keys(rowsByPath)) {
            rowsByPath[path].sort((a, b) => (a.date < b.date ? -1 : 1))
        }

        function cumulativeAt(path: string, publishedAt: Date, offsetDays: number) {
            const targetDate = new Date(publishedAt.getTime() + offsetDays * 86400000)
            if (targetDate.getTime() > Date.now()) return { reached: false, pageViews: 0, sessions: 0 }
            const targetStr = toGa4RowDate(targetDate)
            const rows = rowsByPath[path] ?? []
            let pageViews = 0
            let sessions = 0
            for (const r of rows) {
                if (r.date <= targetStr) {
                    pageViews += r.pageViews
                    sessions += r.sessions
                }
            }
            return { reached: true, pageViews, sessions }
        }

        const blogSummary = posts.docs.map((p: any) => {
            const path = `/blog/${p.slug}`
            const publishedAt = new Date(p.createdAt)
            const ageDays = Math.floor((Date.now() - publishedAt.getTime()) / 86400000)
            const totalPageViews = (rowsByPath[path] ?? []).reduce((acc, r) => acc + r.pageViews, 0)
            const totalSessions = (rowsByPath[path] ?? []).reduce((acc, r) => acc + r.sessions, 0)
            const checkpoints: Record<string, { reached: boolean; pageViews: number; sessions: number }> = {}
            for (const days of CHECKPOINT_DAYS) {
                checkpoints[`d${days}`] = cumulativeAt(path, publishedAt, days)
            }
            return {
                slug: p.slug,
                title: p.title,
                publishedAt: p.createdAt,
                ageDays,
                totalPageViews,
                totalSessions,
                checkpoints,
            }
        })
        blogSummary.sort((a, b) => b.totalPageViews - a.totalPageViews)

        // Bloco 2 — eventos de lead do site inteiro (não só blog), totais no período.
        const eventsReport = await runGa4Report(accessToken, propertyId, {
            dateRanges: [{ startDate: `${eventDays}daysAgo`, endDate: 'today' }],
            dimensions: [{ name: 'eventName' }],
            metrics: [{ name: 'eventCount' }],
            dimensionFilter: {
                filter: {
                    fieldName: 'eventName',
                    inListFilter: { values: [...LEAD_EVENT_NAMES] },
                },
            },
            limit: 50,
        })

        const eventTotals: Record<string, number> = Object.fromEntries(LEAD_EVENT_NAMES.map((n) => [n, 0]))
        for (const row of eventsReport.rows ?? []) {
            const name = row.dimensionValues?.[0]?.value ?? ''
            const count = Number(row.metricValues?.[0]?.value ?? 0)
            if (name in eventTotals) eventTotals[name] = count
        }

        return NextResponse.json({
            success: true,
            generatedAt: new Date().toISOString(),
            blog: {
                totalPosts: blogSummary.length,
                totalPageViewsAllTime: blogSummary.reduce((acc, s) => acc + s.totalPageViews, 0),
                posts: blogSummary,
            },
            events: {
                periodDays: eventDays,
                totals: eventTotals,
                totalLeadEvents: Object.values(eventTotals).reduce((a, b) => a + b, 0),
            },
            notes: {
                adsSpendCac: 'Não disponível — gastos/CAC de campanhas pagas (Google Ads) ainda não estão integrados a este endpoint.',
            },
        })
    } catch (error: any) {
        console.error('Falha no endpoint de marketing-analytics:', error)
        return NextResponse.json({
            success: false,
            error: 'Erro ao consultar GA4',
            details: error.message,
        }, { status: 200 })
    }
}
