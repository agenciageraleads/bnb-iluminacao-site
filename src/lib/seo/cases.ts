export interface SeoCaseStudy {
    slug: string
    title: string
    shortTitle: string
    category: string
    location: string
    city: string
    state: string
    product: string
    productHref: string
    applicationHref: string
    image: string
    imageAlt: string
    summary: string
    context: string
    solution: string[]
    outcomes: string[]
    ctaMessage: string
}

export const caseStudies: SeoCaseStudy[] = [
    {
        slug: "postes-para-pracas-centralina-mg",
        title: "Postes metalicos para pracas municipais em Centralina MG",
        shortTitle: "Pracas Municipais",
        category: "Publico e pracas",
        location: "Centralina, MG",
        city: "Centralina",
        state: "MG",
        product: "Postes metalicos para pracas",
        productHref: "/postes-para-pracas",
        applicationHref: "/postes-para-iluminacao-publica",
        image: "/portfolio/pracas-centralina.webp",
        imageAlt: "Postes metalicos instalados em praca municipal de Centralina MG",
        summary:
            "Case visual de postes metalicos aplicados em praca municipal, com foco em area publica, convivencia urbana e padrao visual.",
        context:
            "Projetos de praca precisam equilibrar iluminacao, circulacao, paisagismo, seguranca e manutencao. A foto registra postes metalicos em area publica com palmeiras, bancos e circulacao de pedestres.",
        solution: [
            "Postes metalicos para area urbana aberta.",
            "Compatibilizacao com luminarias para cobertura de espaco publico.",
            "Acabamento visual adequado a praca e convivencia urbana.",
        ],
        outcomes: [
            "Referencia visual para compras publicas e obras urbanas.",
            "Prova de aplicacao real fora de Goiania.",
            "Conexao direta com a pagina de postes para pracas.",
        ],
        ctaMessage:
            "Ola, vi o case de postes para pracas em Centralina MG e quero cotar postes metalicos para uma obra publica.",
    },
    {
        slug: "postes-para-quadras-esportivas-arapora-go",
        title: "Postes metalicos para quadras esportivas em Arapora GO",
        shortTitle: "Quadras de Esportes",
        category: "Esportivo",
        location: "Arapora, GO",
        city: "Arapora",
        state: "GO",
        product: "Postes metalicos para iluminacao esportiva",
        productHref: "/postes-metalicos",
        applicationHref: "/postes-para-iluminacao-publica",
        image: "/portfolio/quadras-arapora.webp",
        imageAlt: "Postes metalicos com luminarias para quadras esportivas em Arapora GO",
        summary:
            "Case visual de postes metalicos em quadra esportiva, indicado para projetos com area ampla, repetibilidade e luminarias em conjunto.",
        context:
            "Quadras esportivas exigem estruturas mais altas, posicionamento coordenado e suporte para luminarias capazes de cobrir a area de jogo sem atrapalhar circulacao ou uso do espaco.",
        solution: [
            "Postes metalicos com suporte para conjunto de luminarias.",
            "Aplicacao em area esportiva aberta.",
            "Projeto orientado por cobertura luminosa e posicionamento dos pontos.",
        ],
        outcomes: [
            "Referencia para escolas, prefeituras, clubes e centros esportivos.",
            "Prova visual de aplicacao em estrutura esportiva.",
            "Interlink para hub de postes metalicos e iluminacao publica.",
        ],
        ctaMessage:
            "Ola, vi o case de postes para quadras esportivas em Arapora GO e quero cotar postes para uma area esportiva.",
    },
    {
        slug: "postes-para-area-hospitalar-goiania-go",
        title: "Postes metalicos para area hospitalar em Goiania GO",
        shortTitle: "Area Hospitalar em Goiania",
        category: "Saude e hospitalar",
        location: "Goiania, GO",
        city: "Goiania",
        state: "GO",
        product: "Postes metalicos para estacionamento e area externa",
        productHref: "/postes-para-estacionamentos",
        applicationHref: "/produtos/poste-metalico-galvanizado",
        image: "/portfolio/maternidade-celia.webp",
        imageAlt: "Postes metalicos em area externa hospitalar em Goiania GO",
        summary:
            "Case visual de postes metalicos em area externa hospitalar, com foco em circulacao, estacionamento, acesso e durabilidade.",
        context:
            "Areas hospitalares e institucionais precisam de iluminacao externa confiavel para acessos, estacionamento, circulacao de pessoas e operacao em horarios variados.",
        solution: [
            "Postes metalicos para area externa e estacionamento.",
            "Aplicacao compativel com ambiente institucional.",
            "Acabamento e especificacao alinhados a uso externo.",
        ],
        outcomes: [
            "Prova operacional em Goiania como origem fabril real.",
            "Referencia para hospitais, clinicas, industrias e estacionamentos.",
            "Conexao com postes para estacionamentos e poste galvanizado.",
        ],
        ctaMessage:
            "Ola, vi o case de postes para area hospitalar em Goiania GO e quero cotar postes para estacionamento ou area externa.",
    },
]

export function getCaseStudyBySlug(slug: string) {
    return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}
