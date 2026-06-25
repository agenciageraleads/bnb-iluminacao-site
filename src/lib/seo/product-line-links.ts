export const productLineLinks: Record<string, string> = {
    "linha-urban": "/produtos/poste-teleconico",
    "linha-versa": "/postes-para-pracas",
    "linha-forza": "/postes-metalicos",
    "linha-civis": "/lp/mastros-para-bandeira",
    "linha-vigia": "/postes-metalicos",
    "linha-nexo": "/produtos/braco-para-luminaria-publica",
    "linha-orna": "/postes-para-pracas",
}

export function getProductLineHref(slug: string) {
    return productLineLinks[slug] ?? `/produtos/${slug}`
}
