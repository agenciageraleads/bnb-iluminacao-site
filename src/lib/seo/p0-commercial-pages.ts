import type { P0CommercialPageConfig } from "@/components/seo/p0-commercial-page"

const baseUrl = "https://bebiluminacao.com.br"

const commonLinks = [
    { label: "Postes para iluminacao publica", href: "/postes-para-iluminacao-publica" },
    { label: "Fabrica de postes para iluminacao publica", href: "/fabrica-de-postes-para-iluminacao-publica" },
    { label: "Fornecedor de postes para iluminacao publica", href: "/fornecedor-de-postes-para-iluminacao-publica" },
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
        breadcrumbName: "Orcamento de Poste Metalico",
        title: "Orcamento de Poste Metalico",
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
        breadcrumbName: "Industria de Postes Metalicos",
        title: "Industria de Postes Metalicos",
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
    fabricantePostesIluminacao: {
        schemaId: "fabricante-postes-iluminacao-schema",
        pageUrl: `${baseUrl}/fabricante-de-postes-de-iluminacao`,
        breadcrumbName: "Fabricante de Postes de Iluminacao",
        title: "Fabricante de Postes de Iluminacao",
        eyebrow: "Postes para iluminacao urbana e privada",
        description:
            "Fabricante de postes de iluminacao publica, urbana, industrial e condominial. Modelos retos, teleconicos, curvos, bracos e suportes com orcamento tecnico.",
        heroImage: "/images/seo/postes-metalicos/via-iluminada-poste-teleconico-reto.webp",
        heroAlt: "Postes de iluminacao fabricados pela B&B",
        whatsappMessage: "Ola, procuro fabricante de postes de iluminacao e quero solicitar orcamento.",
        primarySection: {
            label: "Fabricante de iluminacao",
            title: "Poste, luminaria e aplicacao precisam conversar",
            body: [
                "Postes de iluminacao nao devem ser escolhidos apenas pelo termo generico. A especificacao depende de ambiente, altura, luminaria, avanco, fixacao, acabamento e memorial tecnico.",
                "A B&B fabrica postes metalicos e orienta a compra para vias, pracas, loteamentos, condominios, patios e estacionamentos.",
            ],
        },
        tables: [
            {
                label: "Modelos",
                title: "Tipos de postes de iluminacao",
                body: "A escolha do modelo vem da aplicacao e do projeto luminotecnico.",
                rows: [
                    ["Poste reto", "Patios, estacionamentos, condominios e areas com geometria objetiva."],
                    ["Poste teleconico", "Vias, loteamentos, avenidas e projetos urbanos com padrao visual limpo."],
                    ["Poste curvo simples", "Ruas, acessos e calcadas com avanco de luminaria para um lado."],
                    ["Poste curvo duplo", "Avenidas, canteiros centrais e areas que iluminam dois sentidos."],
                    ["Bracos e suportes", "Compatibilizacao entre poste, luminaria e necessidade de avanco."],
                ],
            },
        ],
        internalLinks: commonLinks,
        faq: [
            {
                question: "A B&B fabrica postes de iluminacao?",
                answer:
                    "Sim. A B&B fabrica postes metalicos para iluminacao publica, urbana, condominial, industrial e comercial.",
            },
            {
                question: "Quais modelos podem ser usados em iluminacao?",
                answer:
                    "Postes retos, teleconicos, curvos simples, curvos duplos, bracos e suportes podem ser especificados conforme ambiente e luminaria.",
            },
            {
                question: "A B&B ajuda a especificar o poste?",
                answer:
                    "Sim. O briefing tecnico considera aplicacao, altura, fixacao, acabamento, luminaria, quantidade, cidade e prazo.",
            },
        ],
    },
    fabricaIluminacaoPublica: {
        schemaId: "fabrica-postes-iluminacao-publica-schema",
        pageUrl: `${baseUrl}/fabrica-de-postes-para-iluminacao-publica`,
        breadcrumbName: "Fabrica de Postes para Iluminacao Publica",
        title: "Fabrica de Postes para Iluminacao Publica",
        eyebrow: "Origem fabril para obras urbanas",
        description:
            "Fabrica de postes para iluminacao publica com modelos retos, teleconicos, curvos, bracos e suportes. Producao propria, acabamento tecnico e entrega nacional.",
        heroImage: "/images/seo/postes-metalicos/via-publica-postes-retos-dois-lados.jpg",
        heroAlt: "Postes para iluminacao publica em via urbana",
        whatsappMessage: "Ola, procuro fabrica de postes para iluminacao publica e quero solicitar orcamento.",
        primarySection: {
            label: "Fabrica para obra publica",
            title: "Iluminacao publica exige especificacao, nao improviso",
            body: [
                "A busca por fabrica de postes para iluminacao publica indica uma compra com risco tecnico: via, altura, luminaria, fixacao, acabamento, prazo e fiscalizacao precisam estar claros.",
                "A B&B usa a fabrica em Goiania como prova de origem e atende projetos nacionais com foco em briefing tecnico e compra B2B.",
            ],
        },
        tables: [
            {
                label: "Aplicacoes",
                title: "Onde os postes entram",
                body: "A mesma fabrica pode atender diferentes ambientes, desde que a especificacao seja correta.",
                rows: [
                    ["Vias locais", "Postes retos, teleconicos ou curvos conforme luminaria e largura da via."],
                    ["Avenidas", "Postes curvos duplos ou teleconicos para canteiros e dois sentidos."],
                    ["Pracas", "Postes urbanos ou ornamentais com cuidado visual e de manutencao."],
                    ["Loteamentos", "Padronizacao de modelos, volume e prazo de fornecimento."],
                    ["Estacionamentos", "Postes retos ou teleconicos para cobertura de area externa."],
                ],
            },
            {
                label: "Catalogo de fabrica",
                title: "Modelos e conjuntos para iluminacao publica",
                body: "A fabrica precisa orientar o conjunto, nao apenas vender um poste isolado.",
                rows: [
                    ["TR", "Poste teleconico reto", "Vias locais, estacionamentos, patios e areas institucionais."],
                    ["TCS", "Poste teleconico curvo simples", "Ruas, acessos e calcadas com avanco de luminaria."],
                    ["TCD", "Poste teleconico curvo duplo", "Avenidas, canteiros centrais e dois sentidos."],
                    ["Bracos e suportes", "NEX e suportes metalicos", "Compatibilizacao entre poste, luminaria, avanco e manutencao."],
                    ["Fixacao", "Engastado ou flangeado", "Definida pelo projeto civil, base, chumbadores e solo."],
                ],
            },
            {
                label: "Documentos",
                title: "O que a fabrica precisa receber para cotar",
                body: "O briefing reduz retrabalho entre compras, engenharia, obra e fiscalizacao.",
                rows: [
                    ["Aplicacao", "Via, avenida, praca, loteamento, estacionamento, patio ou area institucional."],
                    ["Altura e luminaria", "Altura aproximada, quantidade de luminarias, braco/suporte e avanco."],
                    ["Acabamento", "Galvanizado, pintado ou sob especificacao conforme memorial e ambiente."],
                    ["Prazo e entrega", "Cidade, UF, quantidade, etapa da obra, descarga e condicoes logisticas."],
                ],
            },
        ],
        internalLinks: commonLinks,
        faq: [
            {
                question: "A B&B tem fabrica de postes para iluminacao publica?",
                answer:
                    "Sim. A B&B fabrica postes metalicos para iluminacao publica e urbana, incluindo modelos retos, teleconicos, curvos, bracos e suportes.",
            },
            {
                question: "A fabrica atende projetos fora de Goias?",
                answer:
                    "Sim. Goiania comprova origem fabril, mas a estrategia comercial e nacional.",
            },
            {
                question: "Quais dados enviar para cotar postes de iluminacao publica?",
                answer:
                    "Envie cidade e UF, tipo de via ou area, quantidade, altura, luminaria, fixacao, acabamento, prazo e projeto ou memorial quando houver.",
            },
        ],
    },
    fornecedorIluminacaoPublica: {
        schemaId: "fornecedor-postes-iluminacao-publica-schema",
        pageUrl: `${baseUrl}/fornecedor-de-postes-para-iluminacao-publica`,
        breadcrumbName: "Fornecedor de Postes para Iluminacao Publica",
        title: "Fornecedor de Postes para Iluminacao Publica",
        eyebrow: "Fornecimento tecnico nacional",
        description:
            "Fornecedor de postes para iluminacao publica, vias, pracas, loteamentos e estacionamentos. Compre com fabricante, suporte tecnico e entrega nacional.",
        heroImage: "/images/seo/postes-metalicos/via-urbana-iluminada-postes.jpg",
        heroAlt: "Fornecedor de postes para iluminacao publica",
        whatsappMessage: "Ola, procuro fornecedor de postes para iluminacao publica e quero solicitar orcamento.",
        primarySection: {
            label: "Fornecedor para compras tecnicas",
            title: "Fornecer poste publico e organizar risco de obra",
            body: [
                "Fornecedor de postes para iluminacao publica precisa responder a compras, engenharia e obra: produto, quantidade, prazo, entrega, acabamento, fixacao e documentacao.",
                "A B&B combina atendimento comercial com origem fabril, evitando que a compra fique presa a uma revenda generica sem suporte de especificacao.",
            ],
        },
        tables: [
            {
                label: "Fornecimento",
                title: "O que alinhar antes da proposta",
                body: "O fornecimento certo depende de briefing, padronizacao e compatibilidade com a obra.",
                rows: [
                    ["Produto", "Poste reto, teleconico, curvo simples, curvo duplo, braco ou suporte."],
                    ["Quantidade", "Volume, lotes de entrega, repetibilidade e cronograma da obra."],
                    ["Acabamento", "Galvanizacao, pintura eletrostatica ou acabamento conforme ambiente."],
                    ["Entrega", "Cidade, UF, descarga, prazo e condicoes logisticas."],
                    ["Documentos", "Catalogos, datasheets, memoriais e dados para compra tecnica."],
                ],
            },
            {
                label: "Compra B2B",
                title: "Como comparar fornecedor de postes para iluminacao publica",
                body: "A comparacao deve separar revenda generica de fornecedor com origem fabril e suporte de especificacao.",
                rows: [
                    ["Origem", "Fabricante/fornecedor", "A B&B combina producao propria e atendimento comercial nacional."],
                    ["Modelo", "Reto, teleconico, curvo simples ou curvo duplo", "A escolha depende de via, luminaria, altura e manutencao."],
                    ["Conjunto", "Poste, braco, suporte, base e chumbador", "O fornecimento precisa considerar compatibilidade do conjunto."],
                    ["Acabamento", "Galvanizado, pintado ou combinado", "Definido por ambiente, memorial, durabilidade e padrao visual."],
                    ["Logistica", "Cidade, UF, lote e prazo", "Volume e entrega influenciam cronograma e proposta."],
                ],
            },
            {
                label: "Intencao comercial",
                title: "Buscas que a pagina de fornecedor precisa responder",
                body: "A pagina deve capturar quem esta pronto para comprar, mas ainda precisa organizar o briefing.",
                rows: [
                    ["Fornecedor de postes para iluminacao publica", "Compra por aplicacao, volume e prazo."],
                    ["Postes para iluminacao publica direto da fabrica", "Compra com origem fabril e suporte tecnico."],
                    ["Bracos para luminaria publica", "Compatibilizacao entre luminaria, avanco e poste."],
                    ["Postes para loteamentos e condominios", "Aplicacoes urbanas privadas que tambem usam padrao de iluminacao publica."],
                ],
            },
        ],
        internalLinks: commonLinks,
        faq: [
            {
                question: "A B&B e fornecedora de postes para iluminacao publica?",
                answer:
                    "Sim. A B&B fornece postes metalicos para iluminacao publica e urbana, com origem fabril e atendimento nacional.",
            },
            {
                question: "Fornecedor e fabricante sao a mesma coisa?",
                answer:
                    "Nem sempre. A B&B atua como fabricante e fornecedora, o que ajuda a alinhar produto, prazo, acabamento e documentacao.",
            },
            {
                question: "A B&B fornece bracos e suportes junto com postes?",
                answer:
                    "Sim. A B&B tambem trabalha com bracos, suportes e acessorios para compatibilizar postes e luminarias.",
            },
        ],
    },
}
