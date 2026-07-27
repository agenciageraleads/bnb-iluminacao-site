import {
    Award,
    Boxes,
    Building2,
    Camera,
    Compass,
    Factory,
    FileCheck2,
    FileText,
    Gavel,
    HardHat,
    Landmark,
    LifeBuoy,
    Lightbulb,
    type LucideIcon,
    Package,
    PencilRuler,
    Recycle,
    Ruler,
    ScrollText,
    ShieldCheck,
    Store,
    Timer,
    TrafficCone,
    Wrench,
} from "lucide-react"

import { SITE_URL } from "@/lib/seo/schema"

/**
 * Páginas de segmento (/solucoes/<slug>).
 *
 * Cada bloco da página "Para cada tipo de projeto" do catálogo impresso tem um QR Code
 * que aponta para uma destas URLs. Os slugs abaixo são contratuais: estão gravados nos
 * QR PNGs de `Guia Comercial B&B/assets/qr/seg-*.png` e não podem mudar sem regerar
 * os QRs e reimprimir o catálogo.
 */

export const SEGMENT_BASE_PATH = "/solucoes"

export type SegmentSlug =
    | "construcao-privada"
    | "setor-publico"
    | "iluminacao-publica-ppp"
    | "infraestrutura"
    | "revendas"
    | "projetistas"
    | "industria"

export type SegmentCard = {
    title: string
    description: string
    icon: LucideIcon
}

export type SegmentLine = {
    /** Corresponde à âncora `#linha-<slug>` já existente em /downloads. */
    slug: "urban" | "orna" | "versa" | "forza" | "vigia" | "nexo" | "civis"
    name: string
    description: string
    /** Por que esta linha faz sentido para este decisor. */
    fit: string
}

export type SegmentPageConfig = {
    slug: SegmentSlug
    /** Rótulo do bloco no catálogo impresso. */
    label: string
    /** Quem decide a compra — vira o badge do hero. */
    decisionMaker: string
    /** A promessa do catálogo. Vira o H1. */
    promise: string
    /** A copy-base do bloco no catálogo. */
    blurb: string
    metaTitle: string
    metaDescription: string
    heroImage: string
    heroAlt: string
    heroIcon: LucideIcon
    whatsappMessage: string
    /** Cor do card no índice /solucoes. */
    indexIcon: LucideIcon
    intro: {
        label: string
        title: string
        body: string[]
    }
    /** O que este decisor precisa resolver. */
    priorities: SegmentCard[]
    /** Linhas B&B recomendadas para o segmento. */
    lines: SegmentLine[]
    /** Documentos e provas que a B&B entrega para este segmento. */
    proofs: SegmentCard[]
    /** O que enviar para receber um orçamento útil. */
    quoteData: ReadonlyArray<readonly [string, string]>
    faq: ReadonlyArray<{ question: string; answer: string }>
    /** Links internos relevantes para este decisor. */
    internalLinks: ReadonlyArray<{ label: string; href: string }>
    finalCta: {
        title: string
        body: string
    }
}

export function segmentUrl(slug: SegmentSlug) {
    return `${SITE_URL}${SEGMENT_BASE_PATH}/${slug}`
}

export function lineDownloadHref(slug: SegmentLine["slug"]) {
    return `/downloads#linha-${slug}`
}

/* ── Linhas B&B ────────────────────────────────────────────────────────────── */

const LINE_URBAN = {
    slug: "urban",
    name: "Urban",
    description: "Postes telecônicos em aço carbono galvanizado a fogo — reto, curvo simples e curvo duplo, de 3 a 15 m.",
} as const

const LINE_ORNA = {
    slug: "orna",
    name: "Orna",
    description: "Postes ornamentais para praças, calçadões e áreas de convivência — modelos exclusivos e projetos sob medida.",
} as const

const LINE_VERSA = {
    slug: "versa",
    name: "Versa",
    description: "Postes decorativos e versáteis — girafa LED, rebatedor, Éos e Astrea.",
} as const

const LINE_FORZA = {
    slug: "forza",
    name: "Forza",
    description: "Projetos especiais e estruturas reforçadas para vãos, alturas e cargas fora do padrão.",
} as const

const LINE_VIGIA = {
    slug: "vigia",
    name: "Vigia",
    description: "Postes para segurança e monitoramento — CFTV, câmeras dome e bullet, com passagem de cabo interna.",
} as const

const LINE_NEXO = {
    slug: "nexo",
    name: "Nexo",
    description: "Acessórios: braços, suportes, cruzetas e chumbadores para fechar o conjunto.",
} as const

const LINE_CIVIS = {
    slug: "civis",
    name: "Civis",
    description: "Mastros para bandeiras, engastados ou flangeados.",
} as const

/* ── Links comuns ──────────────────────────────────────────────────────────── */

const LINK_DOWNLOADS = { label: "Catálogos e downloads", href: "/downloads" }
const LINK_PRODUTOS = { label: "Todos os produtos", href: "/produtos" }
const LINK_ORCAMENTO = { label: "Orçamento de poste metálico", href: "/orcamento-poste-metalico" }
const LINK_NORMAS = { label: "Normas para postes de iluminação", href: "/blog/normas-para-postes-de-iluminacao" }
const LINK_FIXACAO = { label: "Poste flangeado ou engastado", href: "/blog/poste-flangeado-ou-engastado" }
const LINK_ACABAMENTO = { label: "Poste galvanizado ou pintado", href: "/blog/poste-galvanizado-ou-pintado" }
const LINK_ALTURA = { label: "Altura de poste para iluminação pública", href: "/blog/altura-de-poste-para-iluminacao-publica" }
const LINK_OBRAS = { label: "Obras entregues", href: "/obras" }
const LINK_QUEM_SOMOS = { label: "Quem somos", href: "/quem-somos" }
const LINK_FABRICA = { label: "Fábrica de postes metálicos", href: "/fabrica-de-postes-metalicos" }
const LINK_IP = { label: "Postes para iluminação pública", href: "/postes-para-iluminacao-publica" }
const LINK_REPRESENTANTES = { label: "Representantes B&B", href: "/representantes" }
const LINK_CONTATO = { label: "Falar com a engenharia", href: "/contato" }

/* ── Provas comuns ─────────────────────────────────────────────────────────── */

const PROOF_GARANTIA: SegmentCard = {
    title: "Garantia de 10 anos",
    description:
        "Contra defeitos de fabricação, por escrito. Pintura e galvanização pedem manutenção periódica conforme o ambiente de instalação.",
    icon: Award,
}

const PROOF_NORMAS: SegmentCard = {
    title: "Conformidade normativa",
    description:
        "Estrutura conforme NBR 14744, cálculo de vento conforme NBR 6123 e galvanização a fogo conforme NBR 6323.",
    icon: ShieldCheck,
}

const PROOF_FABRICA: SegmentCard = {
    title: "Fabricação própria",
    description:
        "Corte laser, conformação, solda e galvanização controlados pela B&B — o prazo não depende de terceiro.",
    icon: Factory,
}

/* ── Configuração dos 7 segmentos ──────────────────────────────────────────── */

export const segmentPages: Record<SegmentSlug, SegmentPageConfig> = {
    "construcao-privada": {
        slug: "construcao-privada",
        label: "Construção privada",
        decisionMaker: "Para construtoras e incorporadoras",
        promise: "A obra entrega no prazo e passa na vistoria",
        blurb:
            "Documentação completa para aprovação, produto no cronograma e sem retrabalho na fase final.",
        metaTitle: "Postes para Construtoras e Incorporadoras | B&B Iluminação",
        metaDescription:
            "Postes metálicos para obras privadas: documentação completa para aprovação, entrega no cronograma e acabamento que passa na vistoria. Fábrica própria, garantia de 10 anos.",
        heroImage: "/images/seo/postes-metalicos/condominio-estacionamento-poste-metalico.webp",
        heroAlt: "Postes metálicos instalados em via interna de empreendimento residencial",
        heroIcon: HardHat,
        indexIcon: HardHat,
        whatsappMessage:
            "Olá, sou de construtora/incorporadora e vim pela página de soluções para construção privada. Quero orçar postes para uma obra.",
        intro: {
            label: "O problema real da obra",
            title: "Poste travando habite-se é o retrabalho mais caro da obra",
            body: [
                "A iluminação externa entra na fase final, quando o cronograma já não tem folga. Se o poste chega fora de cota, sem galvanização adequada ou sem a documentação que a concessionária e a prefeitura pedem, a vistoria trava e a obra inteira espera.",
                "A B&B trabalha do outro lado desse problema: produto padronizado por código, desenho cotado antes da fabricação e a documentação técnica pronta para instruir a aprovação — para que o item iluminação não seja o que segura a entrega.",
            ],
        },
        priorities: [
            {
                title: "Documentação para aprovação",
                description:
                    "Desenho cotado, memorial descritivo e certificados de galvanização para instruir a aprovação na concessionária e na prefeitura.",
                icon: FileCheck2,
            },
            {
                title: "Produto no cronograma",
                description:
                    "Prazo firmado com data e acompanhamento por fase da obra, com entrega parcelada quando o canteiro pede.",
                icon: Timer,
            },
            {
                title: "Sem retrabalho na fase final",
                description:
                    "Cota, fixação e chumbador conferidos contra o projeto antes de fabricar — o poste chega na medida da base já executada.",
                icon: Ruler,
            },
            {
                title: "Padrão visual do empreendimento",
                description:
                    "Mesma família de poste, altura, braço e acabamento em ruas, portaria, estacionamento e áreas comuns.",
                icon: Building2,
            },
        ],
        lines: [
            { ...LINE_URBAN, fit: "Ruas internas, acessos e estacionamentos do empreendimento." },
            { ...LINE_ORNA, fit: "Praças, calçadões e áreas de convivência que precisam de identidade visual." },
            { ...LINE_VERSA, fit: "Fachadas, portarias e áreas de lazer com projeto decorativo." },
            { ...LINE_NEXO, fit: "Braços, suportes e chumbadores para fechar o conjunto sem improviso no canteiro." },
        ],
        proofs: [
            {
                title: "Desenho cotado antes de fabricar",
                description:
                    "Você aprova o desenho com cotas, fixação e acabamento antes de a peça entrar em produção. O que chega é o que foi aprovado.",
                icon: PencilRuler,
            },
            PROOF_NORMAS,
            PROOF_FABRICA,
            PROOF_GARANTIA,
        ],
        quoteData: [
            ["Obra", "Nome do empreendimento, cidade, UF e fase (implantação, entrega ou pós-obra)."],
            ["Áreas", "Ruas internas, portaria, estacionamento, praça, quadra, fachada e áreas técnicas."],
            ["Quantidade", "Quantidade por área e por fase de entrega do canteiro."],
            ["Modelo e altura", "Reto, curvo simples, curvo duplo, ornamental — ou o modelo ainda em aberto."],
            ["Fixação", "Engastado, flangeado, base com chumbador ou fundação já executada (com a cota real)."],
            ["Acabamento", "Galvanizado, pintado, galvanizado com pintura ou cor do padrão do empreendimento."],
            ["Prazo", "Data de necessidade em obra e se a entrega pode ser parcelada por fase."],
            ["Documentos", "Projeto elétrico, luminotécnico, memorial, planta de implantação ou lista de materiais."],
        ],
        faq: [
            {
                question: "A B&B entrega a documentação que a vistoria pede?",
                answer:
                    "Sim. Desenho técnico cotado, memorial descritivo, certificado de galvanização e nota fiscal com a descrição técnica do produto acompanham o fornecimento. Se a concessionária local pedir um documento adicional, a engenharia da B&B avalia junto com a obra.",
            },
            {
                question: "Dá para entregar em fases, acompanhando o cronograma?",
                answer:
                    "Sim. A entrega pode ser parcelada por fase, rua ou quadra do empreendimento. É o formato mais comum em loteamentos e condomínios horizontais, e reduz o custo de estocar poste em canteiro.",
            },
            {
                question: "E se a base já estiver executada com outra medida?",
                answer:
                    "Envie a cota real da base e a distribuição dos chumbadores. A B&B fabrica a flange conforme a fundação existente, o que evita quebrar base pronta ou improvisar adaptação em obra.",
            },
            {
                question: "Qual o prazo de fabricação?",
                answer:
                    "O prazo é firmado no pedido, com data. Como a B&B faz corte, conformação, solda e galvanização na própria fábrica, o cronograma não depende de terceiro — e isso é o que sustenta a data acordada.",
            },
        ],
        internalLinks: [
            { label: "Postes para loteamentos", href: "/postes-para-loteamentos" },
            { label: "Postes para condomínios", href: "/postes-para-condominios" },
            { label: "Postes para estacionamentos", href: "/postes-para-estacionamentos" },
            LINK_FIXACAO,
            LINK_ACABAMENTO,
            LINK_ORCAMENTO,
            LINK_OBRAS,
            LINK_DOWNLOADS,
        ],
        finalCta: {
            title: "Envie a planta e o cronograma da obra",
            body:
                "Com a planta de implantação, a quantidade por área e a data de necessidade, a B&B devolve modelo, altura, fixação, acabamento e prazo — no formato que a obra usa para aprovar.",
        },
    },

    "setor-publico": {
        slug: "setor-publico",
        label: "Setor público",
        decisionMaker: "Para prefeituras, autarquias e órgãos",
        promise: "Pronto para licitação e fiscalização",
        blurb:
            "Memorial descritivo, conformidade NBR e documentação que instrui o edital — do pregão à entrega.",
        metaTitle: "Postes para Licitação e Órgãos Públicos | B&B Iluminação",
        metaDescription:
            "Postes metálicos para compras públicas: memorial descritivo, conformidade NBR 14744, 6123 e 6323 e documentação que instrui o edital. Do pregão à entrega fiscalizada.",
        heroImage: "/images/seo/iluminacao-publica/praca-publica-postes-iluminacao-dia.webp",
        heroAlt: "Praça pública com postes metálicos de iluminação",
        heroIcon: Landmark,
        indexIcon: Gavel,
        whatsappMessage:
            "Olá, sou de órgão público e vim pela página de soluções para setor público. Preciso de especificação técnica e documentação para um processo de compra.",
        intro: {
            label: "Antes do edital",
            title: "Um edital bem instruído é o que evita impugnação e entrega errada",
            body: [
                "Especificação genérica gera proposta incomparável: o processo recebe preço de produtos diferentes, a fiscalização recebe o que não foi pedido, e a correção acontece depois do empenho — quando já é caro.",
                "A B&B fornece a descrição técnica, o memorial e as normas aplicáveis para instruir o termo de referência sem direcionar marca. O órgão recebe um texto que qualquer fabricante sério consegue atender, e a fiscalização recebe critério objetivo para conferir o que chegou.",
            ],
        },
        priorities: [
            {
                title: "Memorial descritivo",
                description:
                    "Descrição técnica completa do produto — material, dimensões, espessura, fixação e acabamento — para instruir o termo de referência.",
                icon: ScrollText,
            },
            {
                title: "Conformidade NBR",
                description:
                    "Estrutura conforme NBR 14744, cálculo de vento conforme NBR 6123 e galvanização a fogo conforme NBR 6323 — declaradas e verificáveis.",
                icon: ShieldCheck,
            },
            {
                title: "Documentação de habilitação",
                description:
                    "Atestados de capacidade técnica, dados cadastrais e documentação fiscal organizados para o processo.",
                icon: FileText,
            },
            {
                title: "Do pregão à entrega",
                description:
                    "Prazo firmado, entrega acompanhada e produto conferível contra o que foi especificado no edital.",
                icon: Gavel,
            },
        ],
        lines: [
            { ...LINE_URBAN, fit: "Vias, avenidas e praças — o item mais comum em compra pública de iluminação." },
            { ...LINE_ORNA, fit: "Praças, centros históricos e requalificação urbana com exigência estética." },
            { ...LINE_NEXO, fit: "Braços, suportes, cruzetas e chumbadores especificados como item separado no edital." },
            { ...LINE_CIVIS, fit: "Mastros para bandeiras em praças cívicas, sedes e escolas." },
        ],
        proofs: [
            {
                title: "Texto para o termo de referência",
                description:
                    "Descrição técnica pronta para instruir o edital sem direcionar marca — o órgão recebe critério objetivo, não um catálogo.",
                icon: ScrollText,
            },
            PROOF_NORMAS,
            {
                title: "Atestados de capacidade técnica",
                description:
                    "Mais de 30 mil postes entregues em 26 estados, com obras que podem ser referenciadas na habilitação.",
                icon: FileCheck2,
            },
            PROOF_GARANTIA,
        ],
        quoteData: [
            ["Órgão", "Prefeitura, autarquia, secretaria ou consórcio, cidade e UF."],
            ["Modalidade", "Pregão, dispensa, concorrência, ata de registro de preço ou estudo preliminar."],
            ["Etapa", "Levantamento de preço, elaboração do edital, processo em andamento ou contrato já assinado."],
            ["Objeto", "Vias, praças, quadras, prédios públicos, cemitério, centro histórico ou requalificação."],
            ["Quantidade", "Quantidade por modelo e por lote do processo."],
            ["Modelo e altura", "Reto, curvo simples, curvo duplo, ornamental, mastro — e a altura pretendida."],
            ["Acabamento", "Galvanizado a fogo, pintado ou galvanizado com pintura."],
            ["Documentos", "Termo de referência, memorial, planilha orçamentária ou projeto luminotécnico já existente."],
        ],
        faq: [
            {
                question: "A B&B fornece memorial descritivo para o edital?",
                answer:
                    "Sim. A engenharia fornece a descrição técnica do produto — material, dimensões, espessura de parede, fixação, galvanização e normas aplicáveis — no formato que instrui o termo de referência, sem direcionar marca.",
            },
            {
                question: "A B&B participa de pregão eletrônico?",
                answer:
                    "Sim. A B&B atende compras públicas por pregão, dispensa, concorrência e ata de registro de preço, com documentação de habilitação e atestados de capacidade técnica.",
            },
            {
                question: "Quais normas os postes atendem?",
                answer:
                    "Estrutura conforme a NBR 14744, cálculo de esforço de vento conforme a NBR 6123 e galvanização por imersão a quente conforme a NBR 6323. O aço é estrutural SAE 1010/1020.",
            },
            {
                question: "Dá para ajudar antes de o edital ser publicado?",
                answer:
                    "Sim, e é o momento mais útil. Na fase de estudo preliminar e levantamento de preço, a B&B ajuda a descrever o produto de forma verificável — o que reduz impugnação, proposta incomparável e entrega divergente.",
            },
        ],
        internalLinks: [
            LINK_IP,
            { label: "Postes para praças", href: "/postes-para-pracas" },
            LINK_NORMAS,
            LINK_ALTURA,
            LINK_ACABAMENTO,
            LINK_OBRAS,
            LINK_QUEM_SOMOS,
            LINK_DOWNLOADS,
        ],
        finalCta: {
            title: "Precisa instruir um edital de iluminação?",
            body:
                "Envie o objeto, a quantidade estimada e a etapa do processo. A B&B devolve descrição técnica, normas aplicáveis e a documentação necessária para o termo de referência.",
        },
    },

    "iluminacao-publica-ppp": {
        slug: "iluminacao-publica-ppp",
        label: "Iluminação pública & PPP",
        decisionMaker: "Para operadores de IP, consórcios e concessionárias",
        promise: "Menos manutenção ao longo da concessão",
        blurb:
            "Parque padronizado por código, galvanização que atravessa décadas e reposição simples.",
        metaTitle: "Postes para PPP e Concessionárias de Iluminação Pública | B&B",
        metaDescription:
            "Postes metálicos para PPP e operadores de iluminação pública: parque padronizado por código, galvanização a fogo NBR 6323 e reposição simples ao longo da concessão.",
        heroImage: "/images/seo/iluminacao-publica/avenida-cidade-iluminada-postes.webp",
        heroAlt: "Avenida urbana com parque de iluminação pública padronizado",
        heroIcon: Lightbulb,
        indexIcon: Lightbulb,
        whatsappMessage:
            "Olá, opero iluminação pública (PPP/concessão) e vim pela página de soluções para IP. Quero falar sobre padronização de parque e reposição.",
        intro: {
            label: "O custo que aparece no ano 8",
            title: "Numa concessão, o preço da compra é menor que o preço da manutenção",
            body: [
                "Quem opera o parque durante 20 anos paga duas vezes por uma especificação frouxa: primeiro na troca antecipada do poste que corroeu, depois na equipe que precisa identificar, cotar e repor um item que ninguém sabe qual é.",
                "A B&B trabalha o parque como um conjunto padronizado: cada produto tem código, cada código tem ficha técnica acessível por QR, e a galvanização a fogo é dimensionada para atravessar o ciclo da concessão — não para passar no recebimento.",
            ],
        },
        priorities: [
            {
                title: "Parque padronizado por código",
                description:
                    "Cada produto tem código próprio (ex.: BB-URB-TCS08). O parque vira inventário, e a reposição deixa de depender de quem lembra do que foi comprado.",
                icon: Boxes,
            },
            {
                title: "Galvanização que dura o ciclo",
                description:
                    "Galvanização por imersão a quente conforme NBR 6323, dimensionada para a vida útil da concessão e não para o dia do recebimento.",
                icon: ShieldCheck,
            },
            {
                title: "Reposição simples",
                description:
                    "Recompra pelo código, com o mesmo desenho e a mesma fixação. O poste novo entra na base do antigo.",
                icon: Recycle,
            },
            {
                title: "Modernização em escala",
                description:
                    "Capacidade fabril para expansão e troca de parque em volume, com entrega programada por lote e por região.",
                icon: Factory,
            },
        ],
        lines: [
            { ...LINE_URBAN, fit: "O padrão do parque: reto, curvo simples e curvo duplo de 3 a 15 m." },
            { ...LINE_NEXO, fit: "Braços, suportes e cruzetas padronizados para toda a reposição do parque." },
            { ...LINE_FORZA, fit: "Trechos com vão, altura ou carga fora do padrão do parque." },
            { ...LINE_VIGIA, fit: "Pontos que acumulam iluminação e monitoramento no mesmo poste." },
        ],
        proofs: [
            {
                title: "Código em cada produto",
                description:
                    "O código identifica modelo, linha e altura. É o que permite auditar o parque e recomprar exatamente o mesmo item anos depois.",
                icon: Boxes,
            },
            {
                title: "Ficha técnica por QR",
                description:
                    "Cada linha tem QR Code que leva a desenhos, datasheets e memoriais — a equipe de campo consulta a especificação sem depender do escritório.",
                icon: FileText,
            },
            PROOF_NORMAS,
            PROOF_GARANTIA,
        ],
        quoteData: [
            ["Operação", "Consórcio, concessionária, SPE ou PPP, município(s) atendido(s) e UF."],
            ["Escopo", "Implantação, modernização, expansão ou reposição de parque existente."],
            ["Parque atual", "Modelos e alturas já instalados, se houver padrão herdado a manter."],
            ["Volume", "Quantidade por modelo, por lote e por região de entrega."],
            ["Cronograma", "Entrega programada, lotes por mês e horizonte do contrato."],
            ["Fixação", "Engastado, flangeado ou base existente a ser reaproveitada."],
            ["Acabamento", "Galvanizado a fogo, pintado ou galvanizado com pintura."],
            ["Documentos", "Projeto luminotécnico, plano de modernização ou inventário do parque."],
        ],
        faq: [
            {
                question: "Como o código ajuda a reposição?",
                answer:
                    "O código identifica linha, modelo e altura (por exemplo BB-URB-TCS08). Anos depois, a recompra é feita pelo código e chega com o mesmo desenho, a mesma fixação e o mesmo acabamento — sem precisar remedir poste instalado.",
            },
            {
                question: "A galvanização aguenta o prazo da concessão?",
                answer:
                    "A galvanização é por imersão a quente conforme a NBR 6323. A vida útil real depende da agressividade do ambiente de instalação; para litoral e áreas industriais a engenharia avalia a espessura de camada e a necessidade de pintura complementar.",
            },
            {
                question: "A B&B atende volume de modernização de parque?",
                answer:
                    "Sim. A fabricação é própria — corte laser, conformação, solda e galvanização — o que permite programar entrega por lote e por região ao longo do contrato. Mais de 30 mil postes já entregues em 26 estados.",
            },
            {
                question: "Dá para manter o padrão de um parque herdado?",
                answer:
                    "Na maioria dos casos, sim. Envie o desenho ou as medidas do poste existente, incluindo a distribuição de chumbadores da base. A B&B fabrica compatível para que o poste novo entre na base já executada.",
            },
        ],
        internalLinks: [
            LINK_IP,
            { label: "Fábrica de postes para iluminação pública", href: "/fabrica-de-postes-para-iluminacao-publica" },
            { label: "Fornecedor de postes para iluminação pública", href: "/fornecedor-de-postes-para-iluminacao-publica" },
            LINK_ALTURA,
            LINK_ACABAMENTO,
            LINK_NORMAS,
            LINK_OBRAS,
            LINK_DOWNLOADS,
        ],
        finalCta: {
            title: "Vamos padronizar o parque pelo código",
            body:
                "Envie o escopo do contrato, o volume por modelo e o horizonte de entrega. A B&B devolve a padronização por código, o desenho de cada item e o plano de reposição.",
        },
    },

    infraestrutura: {
        slug: "infraestrutura",
        label: "Infraestrutura & concessões",
        decisionMaker: "Para rodovias, aeroportos, saneamento e energia",
        promise: "Engenharia para ativos críticos",
        blurb:
            "Rodovias, aeroportos, saneamento e energia: cálculo estrutural documentado, conformidade NBR e CFTV integrado.",
        metaTitle: "Postes para Infraestrutura e Concessões | B&B Iluminação",
        metaDescription:
            "Postes metálicos para ativos críticos: rodovias, aeroportos, saneamento e energia. Cálculo estrutural documentado, conformidade NBR e estrutura para CFTV integrado.",
        heroImage: "/images/seo/iluminacao-publica/patio-aeroporto-iluminado-postes.webp",
        heroAlt: "Pátio de aeroporto iluminado por postes metálicos de grande altura",
        heroIcon: TrafficCone,
        indexIcon: TrafficCone,
        whatsappMessage:
            "Olá, atuo em concessão de infraestrutura e vim pela página de soluções para infraestrutura. Preciso de estrutura com cálculo documentado.",
        intro: {
            label: "Ativo crítico",
            title: "Em ativo crítico, a estrutura precisa de memória de cálculo — não de catálogo",
            body: [
                "Rodovia, aeroporto, subestação e ETA não comportam falha estrutural. A responsabilidade técnica pela estrutura instalada é do operador, e ela só se sustenta com cálculo de vento, dimensionamento e memória documentada para o caso específico.",
                "A B&B trata esses projetos pela engenharia: carga de topo, altura, velocidade básica de vento do local e categoria de rugosidade entram no dimensionamento antes de a peça existir — e o resultado é entregue documentado, não apenas afirmado.",
            ],
        },
        priorities: [
            {
                title: "Cálculo estrutural documentado",
                description:
                    "Dimensionamento com carga de topo, altura e velocidade básica de vento do local, conforme NBR 6123 — entregue como documento, não como afirmação.",
                icon: Compass,
            },
            {
                title: "Conformidade NBR",
                description:
                    "Estrutura conforme NBR 14744, galvanização conforme NBR 6323 e aço estrutural SAE 1010/1020 rastreável.",
                icon: ShieldCheck,
            },
            {
                title: "CFTV integrado",
                description:
                    "Poste preparado para câmera dome ou bullet, com passagem interna de cabo e caixa de inspeção — iluminação e monitoramento na mesma estrutura.",
                icon: Camera,
            },
            {
                title: "Estrutura fora do padrão",
                description:
                    "Altura, vão, carga ou geometria fora de catálogo entram como projeto especial, com desenho aprovado antes da fabricação.",
                icon: PencilRuler,
            },
        ],
        lines: [
            { ...LINE_FORZA, fit: "Estruturas reforçadas para altura, vão e carga de ativo crítico." },
            { ...LINE_VIGIA, fit: "Monitoramento de pista, pátio, perímetro e praça de pedágio." },
            { ...LINE_URBAN, fit: "Vias de acesso, pátios e áreas operacionais em altura padrão." },
            { ...LINE_NEXO, fit: "Braços, cruzetas e chumbadores dimensionados para a estrutura escolhida." },
        ],
        proofs: [
            {
                title: "Memória de cálculo por projeto",
                description:
                    "Carga de topo, altura, velocidade básica de vento e categoria de rugosidade do local entram no dimensionamento — e saem documentados.",
                icon: Compass,
            },
            PROOF_NORMAS,
            {
                title: "Desenho aprovado antes de fabricar",
                description:
                    "Nenhuma peça de projeto especial entra em produção sem o desenho cotado aprovado pelo responsável técnico do ativo.",
                icon: PencilRuler,
            },
            PROOF_GARANTIA,
        ],
        quoteData: [
            ["Operador", "Concessionária, operador ou integrador, e o ativo envolvido."],
            ["Ativo", "Rodovia, praça de pedágio, aeroporto, porto, ferrovia, ETA/ETE, subestação ou telecom."],
            ["Aplicação", "Iluminação de pista, pátio, perímetro, acesso, monitoramento ou conjunto."],
            ["Carga de topo", "Peso e área de vento dos equipamentos no topo: luminária, câmera, antena, refletor."],
            ["Altura e vão", "Altura útil pretendida, avanço de braço e vão a ser vencido."],
            ["Local", "Cidade e UF para velocidade básica de vento, e a agressividade do ambiente (litoral, industrial)."],
            ["Fixação", "Engastado, flangeado ou base existente com a distribuição real de chumbadores."],
            ["Documentos", "Projeto estrutural, luminotécnico, planta do ativo ou especificação do integrador."],
        ],
        faq: [
            {
                question: "A B&B entrega memória de cálculo?",
                answer:
                    "Sim, para projetos que exigem. O dimensionamento considera carga de topo, área de vento dos equipamentos, altura, velocidade básica de vento do local e categoria de rugosidade, conforme a NBR 6123, e é entregue documentado.",
            },
            {
                question: "Dá para integrar CFTV no mesmo poste da iluminação?",
                answer:
                    "Sim. A linha Vigia é feita para isso: passagem interna de cabo, janela de inspeção e suporte para câmera dome ou bullet. A carga da câmera e do braço entra no dimensionamento estrutural.",
            },
            {
                question: "E se a altura ou a carga estiverem fora do catálogo?",
                answer:
                    "Entra como projeto especial na linha Forza. A engenharia dimensiona a estrutura para o caso, emite o desenho cotado e só fabrica depois da aprovação do responsável técnico.",
            },
            {
                question: "Como fica a galvanização em ambiente agressivo?",
                answer:
                    "A galvanização a fogo segue a NBR 6323. Para litoral, ambiente industrial ou estação de tratamento, a engenharia avalia a espessura de camada e a conveniência de pintura complementar sobre o galvanizado.",
            },
        ],
        internalLinks: [
            { label: "Postes para estacionamentos", href: "/postes-para-estacionamentos" },
            { label: "Indústria de postes metálicos", href: "/industria-de-postes-metalicos" },
            LINK_NORMAS,
            LINK_ALTURA,
            LINK_FIXACAO,
            LINK_ACABAMENTO,
            LINK_OBRAS,
            LINK_DOWNLOADS,
        ],
        finalCta: {
            title: "Traga a carga de topo e a altura — a engenharia dimensiona",
            body:
                "Informe o ativo, os equipamentos no topo, a altura pretendida e a cidade de instalação. A B&B devolve dimensionamento, desenho cotado e a documentação estrutural.",
        },
    },

    revendas: {
        slug: "revendas",
        label: "Revendas & distribuidores",
        decisionMaker: "Para revendas, distribuidores e casas de iluminação",
        promise: "Produto fácil de vender",
        blurb:
            "Linha completa com código claro e ficha por QR — o balcão orça na hora, com a fábrica por trás.",
        metaTitle: "Postes Metálicos para Revenda e Distribuição | B&B Iluminação",
        metaDescription:
            "Linha completa de postes metálicos para revenda: código claro, ficha técnica por QR e fábrica própria por trás. O balcão orça na hora e entrega com garantia de 10 anos.",
        heroImage: "/images/seo/postes-metalicos/postes-retos-iluminacao-externa.webp",
        heroAlt: "Postes metálicos galvanizados prontos para distribuição",
        heroIcon: Store,
        indexIcon: Store,
        whatsappMessage:
            "Olá, tenho revenda/distribuição e vim pela página de soluções para revendas. Quero conhecer a linha e as condições de fornecimento.",
        intro: {
            label: "O que trava a venda no balcão",
            title: "Venda perdida no balcão é quase sempre venda que demorou",
            body: [
                "O cliente chega com uma foto e uma altura aproximada. Se o balconista precisa ligar para a fábrica, esperar retorno e só então orçar, a venda vai para quem respondeu primeiro — mesmo cobrando mais caro.",
                "A B&B organiza a linha para o balcão resolver sozinho: cada produto tem código, cada linha tem ficha técnica acessível por QR, e o portfólio cobre do poste de rua ao mastro de bandeira. Atrás disso, fábrica própria — não é revenda de revenda.",
            ],
        },
        priorities: [
            {
                title: "Código claro por produto",
                description:
                    "Cada item tem código próprio (ex.: BB-URB-TR06). Pedido, estoque e recompra falam a mesma língua, sem descrição improvisada.",
                icon: Boxes,
            },
            {
                title: "Ficha técnica por QR",
                description:
                    "O QR de cada linha leva a desenhos e datasheets. O balconista mostra a especificação na hora, direto do celular.",
                icon: FileText,
            },
            {
                title: "Linha completa",
                description:
                    "Sete linhas: poste urbano, ornamental, decorativo, reforçado, CFTV, acessórios e mastro. O cliente resolve tudo num fornecedor só.",
                icon: Package,
            },
            {
                title: "Fábrica por trás",
                description:
                    "Fabricação própria com garantia de 10 anos por escrito. A revenda vende com respaldo técnico, não só com preço.",
                icon: Factory,
            },
        ],
        lines: [
            { ...LINE_URBAN, fit: "O giro do balcão: reto, curvo simples e curvo duplo nas alturas mais pedidas." },
            { ...LINE_NEXO, fit: "Braços, suportes, cruzetas e chumbadores — o complemento de quase todo pedido." },
            { ...LINE_VERSA, fit: "Girafa LED, rebatedor, Éos e Astrea para o cliente que quer diferenciação." },
            { ...LINE_ORNA, fit: "Ornamentais para praça, calçadão e projeto com exigência estética." },
        ],
        proofs: [
            {
                title: "Índice de produtos por código",
                description:
                    "Todo o portfólio indexado por código, para o balcão localizar, orçar e pedir sem depender de consulta à fábrica.",
                icon: Boxes,
            },
            {
                title: "Material de apoio para o balcão",
                description:
                    "Catálogo, datasheets e desenhos técnicos disponíveis para download — o mesmo material que o cliente final vai pedir.",
                icon: FileText,
            },
            PROOF_FABRICA,
            PROOF_GARANTIA,
        ],
        quoteData: [
            ["Empresa", "Razão social, cidade, UF e tipo de operação (loja, distribuidor, atacado)."],
            ["Perfil de venda", "Quem compra de você: obra, prefeitura, indústria, condomínio ou consumidor final."],
            ["Linhas de interesse", "Urban, Orna, Versa, Forza, Vigia, Nexo ou Civis."],
            ["Giro esperado", "Modelos e alturas de maior saída na sua região."],
            ["Volume", "Quantidade por pedido e frequência de recompra pretendida."],
            ["Estoque", "Se pretende manter estoque próprio ou trabalhar por pedido."],
            ["Entrega", "Cidade de entrega e se há necessidade de entrega direta ao cliente final."],
            ["Concorrência", "O que você vende hoje nessa categoria e o que falta na sua linha."],
        ],
        faq: [
            {
                question: "A B&B vende para revenda?",
                answer:
                    "Sim. Revendas, distribuidores, atacadistas, home centers e casas de iluminação compram direto da fábrica, com condição própria de canal.",
            },
            {
                question: "Preciso manter estoque?",
                answer:
                    "Não necessariamente. Muitos parceiros trabalham por pedido, com entrega programada. Manter estoque dos itens de maior giro na região costuma valer a pena para ganhar a venda de balcão que não espera.",
            },
            {
                question: "A revenda recebe material técnico para vender?",
                answer:
                    "Sim. Catálogo, datasheets, desenhos técnicos e o índice de produtos por código estão disponíveis para download. É o mesmo material que o cliente final pede antes de fechar.",
            },
            {
                question: "A B&B atende o cliente final direto e concorre comigo?",
                answer:
                    "A B&B trabalha com política de segmentos e proteção de oportunidade registrada. Vale alinhar a área e o perfil de cliente logo no início da parceria — é exatamente o que a política existe para organizar.",
            },
        ],
        internalLinks: [
            LINK_PRODUTOS,
            LINK_FABRICA,
            { label: "Fornecedor de postes metálicos", href: "/fornecedor-de-postes-metalicos" },
            LINK_REPRESENTANTES,
            LINK_FIXACAO,
            LINK_ACABAMENTO,
            LINK_QUEM_SOMOS,
            LINK_DOWNLOADS,
        ],
        finalCta: {
            title: "Quer a linha B&B no seu balcão?",
            body:
                "Envie o perfil da sua operação, a região e as linhas de interesse. A B&B devolve o portfólio por código, o material de apoio e a condição de fornecimento para o canal.",
        },
    },

    projetistas: {
        slug: "projetistas",
        label: "Projetistas & especificadores",
        decisionMaker: "Para projetistas, especificadores e arquitetos",
        promise: "Especifique certo de primeira",
        blurb:
            "Desenhos cotados, memoriais e apoio direto da engenharia — o detalhamento que entra no seu projeto.",
        metaTitle: "Especificação Técnica de Postes Metálicos | B&B Iluminação",
        metaDescription:
            "Desenhos cotados, memoriais descritivos e apoio direto da engenharia para especificar postes metálicos. O detalhamento que entra no seu projeto sem retrabalho.",
        heroImage: "/images/seo/postes-metalicos/poste-metalico-curvo-instalado-via-urbana.webp",
        heroAlt: "Poste metálico curvo instalado conforme especificação de projeto",
        heroIcon: PencilRuler,
        indexIcon: PencilRuler,
        whatsappMessage:
            "Olá, sou projetista/especificador e vim pela página de soluções para projetistas. Preciso de desenho cotado e memorial para especificar.",
        intro: {
            label: "Antes da prancha fechar",
            title: "Especificação sem cota é o que volta como pedido de alteração",
            body: [
                "Quando o projeto descreve o poste por adjetivo — alto, reforçado, ornamental — a obra compra outra coisa, o cálculo não fecha e a alteração volta para a prancha. O custo do retrabalho é sempre do projeto.",
                "A B&B fornece o que o detalhamento precisa: desenho cotado com emendas, janela de inspeção e distribuição de chumbadores, memorial descritivo e as normas aplicáveis. E a engenharia atende direto, sem passar por filtro comercial.",
            ],
        },
        priorities: [
            {
                title: "Desenhos cotados",
                description:
                    "Desenho técnico com cotas, emendas, janela de inspeção, flange e distribuição de chumbadores — pronto para entrar no detalhamento.",
                icon: PencilRuler,
            },
            {
                title: "Memorial descritivo",
                description:
                    "Descrição técnica completa: aço, dimensões, espessura, fixação, galvanização e normas — para colar no caderno de especificações.",
                icon: ScrollText,
            },
            {
                title: "Apoio direto da engenharia",
                description:
                    "Dúvida de dimensionamento, carga de topo ou fixação vai direto para quem projeta o produto — sem intermediário comercial.",
                icon: LifeBuoy,
            },
            {
                title: "Projeto sob medida",
                description:
                    "Geometria fora do catálogo? Traga o croqui ou o desenho. A B&B projeta e fabrica sob medida, com desenho aprovado antes de produzir.",
                icon: Compass,
            },
        ],
        lines: [
            { ...LINE_URBAN, fit: "Base da especificação urbana: reto, curvo simples e curvo duplo, 3 a 15 m." },
            { ...LINE_ORNA, fit: "Quando o projeto pede identidade — modelos exclusivos e desenho sob medida." },
            { ...LINE_VERSA, fit: "Girafa LED, rebatedor, Éos e Astrea para partido arquitetônico definido." },
            { ...LINE_FORZA, fit: "Altura, vão e carga fora do padrão, com dimensionamento dedicado." },
            { ...LINE_VIGIA, fit: "Quando iluminação e CFTV compartilham a mesma estrutura." },
            { ...LINE_NEXO, fit: "Braços, suportes, cruzetas e chumbadores cotados junto com o poste." },
        ],
        proofs: [
            {
                title: "Anatomia do poste documentada",
                description:
                    "Cotas, emendas e janela de inspeção descritas no catálogo técnico — o que o detalhamento precisa referenciar.",
                icon: Ruler,
            },
            {
                title: "Datasheets e desenhos para download",
                description:
                    "Material técnico por linha disponível direto no site, sem cadastro e sem esperar retorno comercial.",
                icon: FileText,
            },
            PROOF_NORMAS,
            {
                title: "Engenharia acessível",
                description:
                    "Contato direto com a engenharia para validar carga de topo, altura e fixação antes de a prancha fechar.",
                icon: LifeBuoy,
            },
        ],
        quoteData: [
            ["Projeto", "Tipo de projeto, cidade, UF e etapa (estudo, básico, executivo ou revisão)."],
            ["Aplicação", "Via, praça, condomínio, indústria, rodovia, aeroporto ou área institucional."],
            ["Carga de topo", "Luminária, refletor, câmera ou antena previstos, com peso e área de vento."],
            ["Altura e avanço", "Altura útil, avanço de braço e espaçamento previsto entre pontos."],
            ["Fixação", "Engastado, flangeado ou base a projetar — e a fundação prevista."],
            ["Acabamento", "Galvanizado a fogo, pintado, galvanizado com pintura ou cor especificada."],
            ["Referência", "Croqui, imagem de referência ou modelo similar que o partido pede."],
            ["Entregável", "Desenho DWG/PDF, memorial descritivo, dimensionamento ou os três."],
        ],
        faq: [
            {
                question: "A B&B fornece desenho técnico para o projeto?",
                answer:
                    "Sim. Desenhos cotados e datasheets por linha estão disponíveis para download no site. Para geometria específica ou projeto especial, a engenharia emite o desenho do caso.",
            },
            {
                question: "Consigo falar direto com a engenharia?",
                answer:
                    "Sim. Dúvida de dimensionamento, carga de topo, fixação ou compatibilidade com base existente vai direto para a engenharia, sem depender de retorno comercial.",
            },
            {
                question: "A B&B fabrica um poste de desenho próprio?",
                answer:
                    "Sim. Projetos únicos entram pela engenharia: traga a ideia, o croqui ou o desenho. A B&B projeta, emite o desenho cotado para aprovação e fabrica sob medida.",
            },
            {
                question: "Como especificar sem direcionar marca?",
                answer:
                    "Especifique por característica verificável: material e classe do aço, altura útil, diâmetro de topo e base, espessura de parede, tipo de fixação, carga de topo admissível e norma de galvanização. A B&B fornece esse texto para o caderno de especificações.",
            },
        ],
        internalLinks: [
            LINK_DOWNLOADS,
            LINK_PRODUTOS,
            LINK_NORMAS,
            LINK_ALTURA,
            LINK_FIXACAO,
            LINK_ACABAMENTO,
            { label: "Poste telecônico ou reto", href: "/blog/poste-teleconico-ou-reto" },
            LINK_CONTATO,
        ],
        finalCta: {
            title: "Precisa do detalhamento para fechar a prancha?",
            body:
                "Envie a aplicação, a carga de topo prevista e a altura pretendida. A B&B devolve desenho cotado, memorial descritivo e o texto de especificação.",
        },
    },

    industria: {
        slug: "industria",
        label: "Indústria, facilities & agro",
        decisionMaker: "Para quem opera o próprio ativo",
        promise: "Instalou, esqueceu",
        blurb:
            "Para quem opera o próprio ativo: baixa manutenção, garantia de 10 anos e suporte técnico contínuo.",
        metaTitle: "Postes para Indústria, Facilities e Agro | B&B Iluminação",
        metaDescription:
            "Postes metálicos para indústria, centros logísticos, hospitais, cooperativas e agro: baixa manutenção, galvanização a fogo, garantia de 10 anos e suporte técnico contínuo.",
        heroImage: "/images/seo/postes-metalicos/area-industrial-iluminada-postes-metalicos.webp",
        heroAlt: "Área industrial iluminada por postes metálicos galvanizados",
        heroIcon: Factory,
        indexIcon: Factory,
        whatsappMessage:
            "Olá, opero indústria/facilities/agro e vim pela página de soluções para indústria. Quero orçar postes com foco em baixa manutenção.",
        intro: {
            label: "Quem opera é quem paga a manutenção",
            title: "Quando o ativo é seu, cada troca de poste sai do seu orçamento",
            body: [
                "Pátio, doca, perímetro, silo e estacionamento não têm concessionária para chamar. A manutenção da iluminação é da própria equipe — e cada poste que corrói cedo vira parada de operação, plataforma elevatória e mão de obra que sai do orçamento do ano.",
                "A B&B trabalha essa conta pelo lado da durabilidade: galvanização por imersão a quente, estrutura dimensionada para a carga real do topo e garantia de 10 anos por escrito contra defeito de fabricação. Instalou, esqueceu.",
            ],
        },
        priorities: [
            {
                title: "Baixa manutenção",
                description:
                    "Galvanização por imersão a quente conforme NBR 6323, dimensionada para o ambiente do seu ativo — inclusive litoral, agroindústria e área com agente corrosivo.",
                icon: Wrench,
            },
            {
                title: "Garantia de 10 anos",
                description:
                    "Contra defeitos de fabricação, por escrito. É a garantia mais longa que a B&B consegue sustentar tecnicamente — e ela é sustentada pela própria fábrica.",
                icon: Award,
            },
            {
                title: "Suporte técnico contínuo",
                description:
                    "Apoio da engenharia do projeto ao pós-venda, incluindo reposição futura pelo mesmo código e mesma fixação.",
                icon: LifeBuoy,
            },
            {
                title: "Segurança e perímetro",
                description:
                    "Estrutura para CFTV, refletor e monitoramento de perímetro — iluminação e segurança no mesmo poste.",
                icon: Camera,
            },
        ],
        lines: [
            { ...LINE_URBAN, fit: "Pátios, acessos, estacionamentos e vias internas da planta." },
            { ...LINE_FORZA, fit: "Refletor em altura, grandes pátios e estruturas com carga elevada." },
            { ...LINE_VIGIA, fit: "Perímetro, portaria, doca e balança com CFTV integrado." },
            { ...LINE_NEXO, fit: "Braços, cruzetas e chumbadores para fechar o conjunto." },
            { ...LINE_CIVIS, fit: "Mastros para bandeiras na entrada e na área administrativa." },
        ],
        proofs: [
            PROOF_GARANTIA,
            {
                title: "Galvanização dimensionada ao ambiente",
                description:
                    "Litoral, agroindústria, frigorífico e área com agente corrosivo pedem avaliação de camada e, às vezes, pintura sobre o galvanizado. A engenharia avalia o seu caso.",
                icon: ShieldCheck,
            },
            {
                title: "Reposição pelo código",
                description:
                    "Anos depois, a recompra é feita pelo código do produto e chega com o mesmo desenho e a mesma fixação — o poste novo entra na base existente.",
                icon: Recycle,
            },
            {
                title: "Do projeto ao pós-venda",
                description:
                    "Apoio técnico nas sete etapas do processo, incluindo depois da instalação.",
                icon: LifeBuoy,
            },
        ],
        quoteData: [
            ["Operação", "Indústria, centro logístico, hospital, cooperativa, fazenda, agroindústria ou facility."],
            ["Áreas", "Pátio, doca, estacionamento, perímetro, via interna, portaria, balança ou área administrativa."],
            ["Ambiente", "Litoral, área industrial, agroindústria, frigorífico ou presença de agente corrosivo."],
            ["Quantidade", "Quantidade por área e prioridade de instalação."],
            ["Altura e carga", "Altura pretendida e o que vai no topo: luminária, refletor, câmera ou antena."],
            ["Fixação", "Engastado, flangeado, base com chumbador ou fundação já existente."],
            ["Acabamento", "Galvanizado, pintado, galvanizado com pintura ou cor do padrão da planta."],
            ["Documentos", "Planta da área, projeto luminotécnico, fotos do existente ou lista de materiais."],
        ],
        faq: [
            {
                question: "O que a garantia de 10 anos cobre?",
                answer:
                    "Cobre defeitos de fabricação, por escrito. Pintura e galvanização requerem manutenção periódica conforme o ambiente de instalação — a garantia não substitui essa manutenção, e a B&B informa o que ela exige antes da compra.",
            },
            {
                question: "Meu ambiente é corrosivo. O galvanizado resolve?",
                answer:
                    "Depende do agente e da exposição. Galvanização a fogo conforme a NBR 6323 é a base; para litoral, agroindústria e ambientes com agente químico, a engenharia avalia a espessura de camada e a conveniência de pintura complementar sobre o galvanizado.",
            },
            {
                question: "Dá para integrar câmera no poste de iluminação?",
                answer:
                    "Sim. A linha Vigia tem passagem interna de cabo, janela de inspeção e suporte para câmera dome ou bullet. O peso da câmera e do braço entra no dimensionamento da estrutura.",
            },
            {
                question: "Como faço a reposição daqui a alguns anos?",
                answer:
                    "Pelo código do produto. Cada item tem código próprio, e a recompra chega com o mesmo desenho, a mesma fixação e o mesmo acabamento — sem precisar remedir o poste instalado.",
            },
        ],
        internalLinks: [
            { label: "Indústria de postes metálicos", href: "/industria-de-postes-metalicos" },
            { label: "Postes para estacionamentos", href: "/postes-para-estacionamentos" },
            LINK_ACABAMENTO,
            LINK_ALTURA,
            LINK_FIXACAO,
            LINK_ORCAMENTO,
            LINK_OBRAS,
            LINK_DOWNLOADS,
        ],
        finalCta: {
            title: "Menos manutenção começa na especificação",
            body:
                "Envie as áreas, o ambiente da planta e o que vai no topo do poste. A B&B devolve modelo, altura, acabamento e o que esperar de manutenção ao longo da vida do ativo.",
        },
    },
}

/** Ordem dos segmentos como aparecem no catálogo impresso. */
export const segmentOrder: SegmentSlug[] = [
    "construcao-privada",
    "setor-publico",
    "iluminacao-publica-ppp",
    "infraestrutura",
    "revendas",
    "projetistas",
    "industria",
]

export const segmentList = segmentOrder.map((slug) => segmentPages[slug])

/** Os outros 6 segmentos, para o bloco de navegação cruzada. */
export function otherSegments(slug: SegmentSlug) {
    return segmentOrder.filter((item) => item !== slug).map((item) => segmentPages[item])
}
