import type { P0CommercialPageConfig } from "@/components/seo/p0-commercial-page"

const baseUrl = "https://bebiluminacao.com.br"

const commonLinks = [
    { label: "Postes para iluminacao publica", href: "/postes-para-iluminacao-publica" },
    { label: "Postes metalicos", href: "/postes-metalicos" },
    { label: "Fabricante de postes metalicos", href: "/fabricante-de-postes-metalicos" },
    { label: "Fabrica de postes metalicos", href: "/fabrica-de-postes-metalicos" },
    { label: "Fornecedor de postes metalicos", href: "/fornecedor-de-postes-metalicos" },
    { label: "Industria de postes metalicos", href: "/industria-de-postes-metalicos" },
    { label: "Orcamento de poste metalico", href: "/orcamento-poste-metalico" },
    { label: "Poste teleconico", href: "/produtos/poste-teleconico" },
    { label: "Braco para luminaria publica", href: "/produtos/braco-para-luminaria-publica" },
    { label: "Suporte para luminaria publica", href: "/produtos/suporte-para-luminaria-publica" },
    { label: "Normas para postes de iluminacao", href: "/blog/normas-para-postes-de-iluminacao" },
    { label: "Catalogos e downloads", href: "/downloads" },
]

export const p0CommercialPages: Record<string, P0CommercialPageConfig> = {
    orcamentoPosteMetalico: {
        schemaId: "orcamento-poste-metalico-schema",
        pageUrl: `${baseUrl}/orcamento-poste-metalico`,
        breadcrumbName: "Orçamento de Poste Metálico",
        title: "Orçamento de Poste Metálico",
        eyebrow: "Compra tecnica para obras",
        description:
            "Orcamento de poste metalico para iluminacao publica, loteamentos, condominios, estacionamentos e industrias. Envie modelo, altura, fixacao, acabamento e prazo.",
        heroImage: "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg",
        heroAlt: "Postes metalicos em area externa para orcamento tecnico",
        whatsappMessage: "Ola, quero solicitar um orcamento de poste metalico com briefing tecnico.",
        primarySection: {
            label: "Compra B2B",
            title: "Preco sem especificacao vira risco de obra",
            body: [
                "A pagina de orcamento existe para tirar o lead da pergunta generica de preco e levar a uma cotacao comparavel. Poste metalico depende de modelo, altura, fixacao, acabamento, quantidade, luminaria, cidade de entrega e prazo.",
                "A B&B orienta o briefing antes da proposta para reduzir retrabalho entre compras, engenharia, obra civil e instalacao.",
            ],
        },
        tables: [
            {
                label: "Dados para cotar",
                title: "Informacoes minimas para receber proposta",
                body: "Quanto mais completo o briefing, menor o risco de uma proposta incompleta ou incompatível com a obra.",
                rows: [
                    ["Aplicacao", "Iluminacao publica, condominio, loteamento, estacionamento, patio, praca ou industria."],
                    ["Modelo", "Reto, teleconico, curvo simples, curvo duplo, braco, suporte ou estrutura especial."],
                    ["Dimensoes", "Altura, avanco, quantidade de luminarias, diametro e observacoes do memorial."],
                    ["Fixacao", "Engastado, flangeado, base, chumbadores ou definicao com obra civil."],
                    ["Acabamento", "Galvanizacao a fogo, pintura eletrostatica, cor e ambiente de instalacao."],
                    ["Entrega", "Cidade, UF, quantidade, prazo, descarga e condicoes logisticas."],
                ],
            },
            {
                label: "Comparacao",
                title: "O que muda o valor do poste metalico",
                body: "A variacao de preco normalmente vem da especificacao, nao apenas do comprimento do tubo.",
                rows: [
                    ["Altura e geometria", "Define consumo de material, esforcos e compatibilidade com luminaria."],
                    ["Galvanizacao", "Aumenta protecao contra corrosao quando o ambiente exige durabilidade externa."],
                    ["Fixacao", "Engastado, flangeado e chumbadores mudam fabricacao, instalacao e obra civil."],
                    ["Volume", "Quantidade, padronizacao e logistica influenciam custo e prazo."],
                ],
            },
        ],
        internalLinks: commonLinks,
        faq: [
            {
                question: "Quanto custa um poste metalico?",
                answer:
                    "O valor depende de modelo, altura, fixacao, acabamento, quantidade, cidade de entrega, luminaria e documentos do projeto. Por isso, a B&B trabalha com orcamento tecnico, nao preco generico.",
            },
            {
                question: "Quais dados enviar para cotar poste metalico?",
                answer:
                    "Envie aplicacao, modelo desejado, altura, quantidade, cidade e UF, tipo de fixacao, acabamento, prazo e desenho ou memorial quando houver.",
            },
            {
                question: "A B&B faz orcamento para obras fora de Goias?",
                answer:
                    "Sim. Goiania comprova origem fabril, mas a B&B atende projetos de postes metalicos em diferentes regioes do Brasil.",
            },
        ],
    },
    industriaPostesMetalicos: {
        schemaId: "industria-postes-metalicos-schema",
        pageUrl: `${baseUrl}/industria-de-postes-metalicos`,
        breadcrumbName: "Indústria de Postes Metálicos",
        title: "Indústria de Postes Metálicos",
        eyebrow: "Fabrica propria e atendimento nacional",
        description:
            "Industria de postes metalicos para iluminacao publica, loteamentos, condominios e industrias. Fabricacao propria, acabamento tecnico, NBR e entrega nacional.",
        heroImage: "/hero-industrial.jpg",
        heroAlt: "Industria de postes metalicos B&B",
        whatsappMessage: "Ola, procuro uma industria de postes metalicos e quero falar com a B&B.",
        primarySection: {
            label: "Prova industrial",
            title: "Industria nao e apenas catalogo de produtos",
            body: [
                "Quem pesquisa industria de postes metalicos quer validar origem produtiva, processo, acabamento, documentos, prazo e capacidade de atendimento.",
                "A B&B se posiciona como fabrica de solucoes metalicas para urbanismo: postes, bracos, suportes e estruturas com rigor de engenharia.",
            ],
        },
        tables: [
            {
                label: "Criterios industriais",
                title: "O que validar antes de comprar",
                body: "A compra B2B precisa de sinais claros de fabrica, suporte tecnico e controle de especificacao.",
                rows: [
                    ["Fabrica propria", "Origem produtiva em Goiania com atendimento comercial nacional."],
                    ["Produtos", "Postes retos, teleconicos, curvos, bracos, suportes e estruturas urbanas."],
                    ["Acabamento", "Galvanizacao, pintura eletrostatica e acabamento conforme ambiente."],
                    ["Documentacao", "Catalogos, datasheets, desenhos e memoriais quando disponiveis."],
                    ["Compra tecnica", "Modelo, altura, fixacao, prazo, volume e logistica antes da proposta."],
                ],
            },
        ],
        internalLinks: commonLinks,
        faq: [
            {
                question: "A B&B e industria de postes metalicos?",
                answer:
                    "Sim. A B&B fabrica postes metalicos e estruturas para urbanismo, com origem em Goiania e atendimento nacional para projetos B2B.",
            },
            {
                question: "Qual a diferenca entre industria e revenda de postes?",
                answer:
                    "A industria fabrica e orienta a especificacao. A revenda normalmente intermedia produtos prontos com menor controle sobre modelo, acabamento, prazo e documentacao.",
            },
            {
                question: "A industria atende iluminacao publica?",
                answer:
                    "Sim. A B&B atende postes para iluminacao publica, vias, praca, loteamento, condominio, estacionamento e areas industriais.",
            },
        ],
    },
}
