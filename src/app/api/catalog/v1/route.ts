import { fetchCatalogPublication } from '@/lib/commercial-catalog'

export const dynamic = 'force-dynamic'

export async function GET() {
    if (process.env.CATALOG_SOURCE !== 'crm') return Response.json({ error: 'Publication not activated' }, { status: 503 })
    try {
        return Response.json(await fetchCatalogPublication(), { headers: { 'Cache-Control': 'no-store' } })
    } catch {
        return Response.json({ error: 'Catalog publication unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
    }
}
