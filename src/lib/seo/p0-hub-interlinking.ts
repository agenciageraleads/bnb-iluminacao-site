// Farol SEO Nacional B2B — Sprint 02: garante que todo post de blog (motor autonomo ou manual)
// que mencione um cluster P0 (fabricante/fabrica/fornecedor, postes metalicos/galvanizados,
// poste teleconico, iluminacao publica) linke para o hub correspondente. Backfill de 2026-09-02
// achou 47/96 posts publicados mencionando esses clusters sem nenhum link para os hubs.

type P0HubLink = {
    pattern: RegExp
    url: string
    snippet: string
}

export const P0_HUB_LINKS: P0HubLink[] = [
    {
        pattern: /tele[cç][oô]nic/i,
        url: "/produtos/poste-teleconico",
        snippet:
            '<p>Se sua obra pede resistência com estética diferenciada, conheça o <a href="/produtos/poste-teleconico">poste telecônico</a> da B&amp;B, fabricado sob medida conforme a NBR 14744.</p>',
    },
    {
        pattern: /fabricante de postes|f[aá]brica de postes|fornecedor de postes|ind[uú]stria de postes/i,
        url: "/fabricante-de-postes-metalicos",
        snippet:
            '<p>A B&amp;B é <a href="/fabricante-de-postes-metalicos">fabricante de postes metálicos</a> com fábrica própria em Goiânia — veja a estrutura de produção e o portfólio completo.</p>',
    },
    {
        pattern: /postes? met[aá]lico/i,
        url: "/postes-metalicos",
        snippet:
            '<p>Conheça a linha completa de <a href="/postes-metalicos">postes metálicos</a> da B&amp;B, com modelos retos, telecônicos, curvos e opções de galvanização a fogo.</p>',
    },
    {
        pattern: /ilumina[cç][aã]o p[uú]blica/i,
        url: "/postes-para-iluminacao-publica",
        snippet:
            '<p>Veja o catálogo técnico de <a href="/postes-para-iluminacao-publica">postes para iluminação pública</a> da B&amp;B, com opções de fixação, acabamento e documentação para licitação.</p>',
    },
]

/**
 * Se o post menciona um cluster P0 (titulo/summary/corpo) e ainda nao linka para nenhum hub P0,
 * acrescenta um paragrafo curto com o link para o hub mais relevante (o primeiro padrao que bater,
 * na ordem acima). Nao faz nada se o post ja tiver algum link de hub P0 (nao duplica) ou se nenhum
 * cluster for mencionado.
 */
export function ensureP0HubLink(bodyHtml: string | undefined | null, title: string, summary: string): string {
    if (!bodyHtml) return bodyHtml ?? ""

    const alreadyLinked = P0_HUB_LINKS.some(({ url }) => bodyHtml.includes(`href="${url}"`))
    if (alreadyLinked) return bodyHtml

    const haystack = `${title} ${summary} ${bodyHtml}`
    const match = P0_HUB_LINKS.find(({ pattern }) => pattern.test(haystack))
    if (!match) return bodyHtml

    return bodyHtml + match.snippet
}
