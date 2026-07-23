export const productLineLinks: Record<string, string> = {
    urban: "/produtos/poste-teleconico",
    versa: "/produtos/versa",
    forza: "/produtos/forza",
    civis: "/lp/mastros-para-bandeira",
    vigia: "/produtos/vigia",
    nexo: "/produtos/braco-para-luminaria-publica",
    orna: "/produtos/orna",
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
