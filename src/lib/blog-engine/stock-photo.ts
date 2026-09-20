// Farol SEO Nacional B2B: troca a capa gerada por IA por foto real de banco de imagens
// (Unsplash) sempre que a busca achar algo relevante para o tema do post. Só cai para
// geração por IA quando a busca não retorna nada ou a chave não está configurada.

const UNSPLASH_SEARCH_URL = "https://api.unsplash.com/search/photos"

type UnsplashPhoto = {
    id: string
    urls: { regular: string }
    links: { download_location: string }
    user: { name: string; links: { html: string } }
}

export type StockPhotoResult = {
    buffer: Buffer
    mimeType: string
    credit: string
    sourceUrl: string
}

/**
 * Busca uma foto real no Unsplash a partir de palavras-chave em ingles, baixa o binario e
 * dispara o ping de download exigido pelas diretrizes da API do Unsplash. Retorna null se a
 * chave nao estiver configurada, a busca nao achar nada, ou qualquer etapa falhar (o chamador
 * deve tratar null como "cair para geracao por IA").
 */
export async function fetchStockPhoto(keywords: string): Promise<StockPhotoResult | null> {
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
