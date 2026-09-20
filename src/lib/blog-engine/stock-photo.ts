// Farol SEO Nacional B2B: troca a capa gerada por IA por foto real de banco de imagens
// sempre que a busca achar algo relevante para o tema do post. Pexels e a fonte principal
// (decisao do Lucas 2026-09-19); Unsplash entra como fallback quando o Pexels nao acha nada
// ou a chave nao esta configurada. So cai para geracao por IA quando nenhuma das duas fontes
// retorna resultado.

const PEXELS_SEARCH_URL = "https://api.pexels.com/v1/search"
const UNSPLASH_SEARCH_URL = "https://api.unsplash.com/search/photos"

export type StockPhotoResult = {
    buffer: Buffer
    mimeType: string
    credit: string
    sourceUrl: string
}

type PexelsPhoto = {
    src: { large2x: string }
    photographer: string
    photographer_url: string
}

async function fetchFromPexels(keywords: string): Promise<StockPhotoResult | null> {
    const apiKey = process.env.PEXELS_API_KEY
    if (!apiKey) return null

    try {
        const searchUrl = new URL(PEXELS_SEARCH_URL)
        searchUrl.searchParams.set("query", keywords)
        searchUrl.searchParams.set("orientation", "landscape")
        searchUrl.searchParams.set("per_page", "1")

        const searchRes = await fetch(searchUrl, {
            headers: { Authorization: apiKey },
        })
        if (!searchRes.ok) {
            console.error("Pexels search falhou:", searchRes.status, await searchRes.text().catch(() => ""))
            return null
        }

        const searchData = await searchRes.json()
        const photo: PexelsPhoto | undefined = searchData.photos?.[0]
        if (!photo) return null

        const imageRes = await fetch(photo.src.large2x)
        if (!imageRes.ok) return null
        const arrayBuffer = await imageRes.arrayBuffer()
        const mimeType = imageRes.headers.get("content-type") || "image/jpeg"

        return {
            buffer: Buffer.from(arrayBuffer),
            mimeType,
            credit: `Foto: ${photo.photographer} / Pexels`,
            sourceUrl: photo.photographer_url,
        }
    } catch (err) {
        console.error("Erro ao buscar foto real no Pexels:", err)
        return null
    }
}

type UnsplashPhoto = {
    urls: { regular: string }
    links: { download_location: string }
    user: { name: string; links: { html: string } }
}

async function fetchFromUnsplash(keywords: string): Promise<StockPhotoResult | null> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY
    if (!accessKey) return null

    try {
        const searchUrl = new URL(UNSPLASH_SEARCH_URL)
        searchUrl.searchParams.set("query", keywords)
        searchUrl.searchParams.set("orientation", "landscape")
        searchUrl.searchParams.set("per_page", "1")
        searchUrl.searchParams.set("content_filter", "high")

        const searchRes = await fetch(searchUrl, {
            headers: { Authorization: `Client-ID ${accessKey}` },
        })
        if (!searchRes.ok) {
            console.error("Unsplash search falhou:", searchRes.status, await searchRes.text().catch(() => ""))
            return null
        }

        const searchData = await searchRes.json()
        const photo: UnsplashPhoto | undefined = searchData.results?.[0]
        if (!photo) return null

        const imageRes = await fetch(photo.urls.regular)
        if (!imageRes.ok) return null
        const arrayBuffer = await imageRes.arrayBuffer()
        const mimeType = imageRes.headers.get("content-type") || "image/jpeg"

        // Diretriz obrigatoria da API do Unsplash: registrar o download antes de usar a foto.
        fetch(`${photo.links.download_location}?client_id=${accessKey}`).catch((err) =>
            console.error("Unsplash download ping falhou (nao bloqueante):", err)
        )

        return {
            buffer: Buffer.from(arrayBuffer),
            mimeType,
            credit: `Foto: ${photo.user.name} / Unsplash`,
            sourceUrl: photo.user.links.html,
        }
    } catch (err) {
        console.error("Erro ao buscar foto real no Unsplash:", err)
        return null
    }
}

/**
 * Busca uma foto real a partir de palavras-chave em ingles: tenta o Pexels primeiro, cai para
 * o Unsplash se o Pexels nao achar nada ou nao estiver configurado. Retorna null se nenhuma das
 * duas fontes tiver chave configurada ou achar resultado (o chamador deve tratar null como
 * "cair para geracao por IA").
 */
export async function fetchStockPhoto(keywords: string): Promise<StockPhotoResult | null> {
    const pexelsResult = await fetchFromPexels(keywords)
    if (pexelsResult) return pexelsResult

    return fetchFromUnsplash(keywords)
}
