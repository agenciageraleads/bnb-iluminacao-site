import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    ArrowRight,
    Building2,
    ClipboardCheck,
    Download,
    Factory,
    FileText,
    Landmark,
    MapPin,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Truck,
    Zap,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { getPortfolioProjects, getProducts } from "@/lib/data"
import { getPrimaryCatalogProducts } from "@/lib/catalog-curation"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFaqSchema,
    createImageSchemas,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"
import { createSeoImage } from "@/lib/seo/images"

export const dynamic = "force-dynamic"

const pageUrl = "https://bebiluminacao.com.br/postes-para-iluminacao-publica"
const pageDescription =
    "Postes para iluminacao publica direto da fabrica: modelos retos, teleconicos, curvos, bracos e suportes com NBR, catalogo e orcamento tecnico."
const whatsappMessage =
    "Ola, vim pela pagina de postes para iluminacao publica e quero solicitar um orcamento tecnico."
const heroImage = "/images/seo/postes-metalicos/via-iluminada-poste-teleconico-reto.webp"

export const metadata: Metadata = {
    title: {
        absolute: "Postes para Iluminacao Publica | Fabrica B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Postes para Iluminacao Publica | Fabrica B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Poste teleconico reto para iluminacao publica em via urbana",
            },
        ],
    },
}

const requirements = [
    {
        title: "Aplicacao urbana",
        description: "Vias, avenidas, pracas, loteamentos, estacionamentos publicos e areas institucionais.",
        icon: Landmark,
    },
    {
        title: "Especificacao tecnica",
        description: "Apoio para definir modelo, altura, avanco, fixacao, acabamento e quantidade.",
        icon: ClipboardCheck,
    },
    {
        title: "Fabricacao propria",
        description: "Origem fabril em Goiania como prova operacional, com atendimento comercial nacional.",
        icon: Factory,
    },
    {
        title: "Entrega por projeto",
        description: "Fornecimento orientado por cidade, UF, prazo, volume, logistica e necessidade da obra.",
        icon: Truck,
    },
]

const applications = [
    {
        title: "Vias e avenidas",
        description: "Postes retos, teleconicos, curvos simples ou duplos conforme largura da via e distribuicao luminosa.",
        icon: MapPin,
    },
    {
        title: "Pracas e parques",
        description: "Modelos ornamentais ou urbanos para areas de convivencia, circulacao e seguranca visual.",
        icon: Landmark,
    },
    {
        title: "Loteamentos",
        description: "Padronizacao de modelos, repetibilidade de fornecimento e suporte para compras em volume.",
        icon: Building2,
    },
    {
        title: "Areas institucionais",
        description: "Postes para escolas, hospitais, estacionamentos, patios e equipamentos publicos.",
        icon: ShieldCheck,
    },
]

const decisionRows = [
    ["Via local", "Poste reto, teleconico ou curvo simples", "Altura, afastamento, tipo de luminaria e fixacao"],
    ["Avenida", "Poste curvo duplo ou teleconico", "Canteiro central, dois sentidos e volume de trafego"],
    ["Praca", "Poste ornamental, reto ou decorativo", "Circulacao de pessoas, paisagismo e identidade visual"],
    ["Loteamento", "Poste teleconico ou padrao urbano", "Repetibilidade, prazo, quantidade e padronizacao"],
    ["Estacionamento publico", "Poste reto ou teleconico", "Area de cobertura, altura e interferencias no piso"],
    ["Area institucional", "Poste sob especificacao", "Ambiente, durabilidade, acabamento e manutencao"],
]

const technicalCatalogRows = [
    ["Poste reto para iluminacao publica", "TR engastado ou flangeado", "Vias locais, estacionamentos, patios e areas institucionais"],
    ["Poste teleconico para iluminacao publica", "TCS/TCD/TR conforme projeto", "Avenidas, loteamentos, condominios e vias urbanas"],
    ["Poste curvo simples", "Avanco unico para luminaria", "Ruas, acessos, calcadas e laterais de vias"],
    ["Poste curvo duplo", "Dois avancos para luminarias", "Canteiros centrais, avenidas e areas com dois sentidos"],
    ["Braco ou suporte para luminaria publica", "NEX e suportes metalicos", "Compatibilizacao entre poste, luminaria e projeto luminotecnico"],
]

const publicLightingIntentRows = [
    ["Postes para iluminacao publica", "Busca aplicacao; precisa conectar via, praca, loteamento, estacionamento e obra urbana."],
    ["Poste para iluminacao publica", "Busca produto; precisa orientar modelo, altura, fixacao, acabamento e luminaria."],
    ["Fabrica de postes para iluminacao publica", "Busca origem fabril; precisa provar producao, modelos, acabamento e entrega nacional."],
    ["Fornecedor de postes para iluminacao publica", "Busca compra; precisa explicar quantidade, prazo, documentos, logistica e suporte tecnico."],
    ["Bracos e suportes para luminaria publica", "Busca conjunto; precisa conectar poste, luminaria, avanco, carga e manutencao."],
    ["Normas para postes de iluminacao", "Busca seguranca tecnica; precisa citar referencias e remeter ao memorial da obra."],
]

const complianceRows = [
    ["Material", "Aco carbono ou estrutural conforme desenho, memoriais e solicitacao do projeto."],
    ["Acabamento", "Galvanizacao a fogo, pintura eletrostatica ou combinacao definida conforme ambiente e memorial."],
    ["Normas de referencia", "NBR 14744 para postes de aco e NBR 6323 para galvanizacao a fogo quando aplicavel."],
    ["Fixacao", "Postes engastados, flangeados, bases e chumbadores definidos conforme solo, obra civil e esforcos previstos."],
    ["Documentacao", "Catalogo, datasheet, desenho tecnico, memorial e orientacao para briefing de orcamento."],
]

const quoteData = [
    ["Local da obra", "Cidade, UF e tipo de ambiente: via, praca, loteamento, estacionamento ou patio."],
    ["Modelo desejado", "Reto, teleconico, curvo simples, curvo duplo, ornamental ou estrutura especial."],
    ["Altura e luminaria", "Altura aproximada, quantidade de luminarias, braco/suporte e necessidade de avanco."],
    ["Fixacao", "Poste engastado, flangeado, base, chumbadores ou definicao a partir do projeto civil."],
    ["Acabamento", "Galvanizacao, pintura eletrostatica ou acabamento conforme memorial e ambiente."],
    ["Volume e prazo", "Quantidade, etapa da obra, previsao de entrega e documentos tecnicos disponiveis."],
]

const relatedLines = [
    {
        title: "Poste teleconico",
        description: "Postes teleconicos e urbanos para vias, loteamentos e iluminacao publica.",
        href: "/produtos/poste-teleconico",
    },
    {
        title: "Poste curvo duplo",
        description: "Postes especiais para projetos com maiores alturas, esforcos e complexidade tecnica.",
        href: "/produtos/poste-curvo-duplo",
    },
    {
        title: "Postes para pracas",
        description: "Postes ornamentais para pracas, parques, jardins e areas urbanas com exigencia visual.",
        href: "/postes-para-pracas",
    },
    {
        title: "Bracos e suportes",
        description: "Bracos, suportes e acessorios metalicos para compatibilizacao com luminarias.",
        href: "/produtos/braco-para-luminaria-publica",
    },
]

const heroProofs = [
    "Fabrica propria",
    "NBR 14744 e NBR 6323 quando aplicavel",
    "Orcamento tecnico para obras publicas e privadas",
]

const gallery = [
    createSeoImage("viaIluminadaPosteTeleconicoReto", {
        alt: "Poste teleconico reto para iluminacao publica em via com trafego noturno",
        title: "Poste teleconico em via",
    }),
    createSeoImage("viaIluminadaPosteTeleconicoCurvo", {
        alt: "Postes teleconicos curvos para iluminacao publica em via urbana",
        title: "Postes curvos em via",
    }),
    createSeoImage("pracaIluminadaPostesJardim", {
        alt: "Postes para iluminacao publica em praca e area de convivencia",
        title: "Praca iluminada",
    }),
    createSeoImage("avenidaDuasPistasIluminadaPostes", {
        alt: "Postes para iluminacao publica em avenida de duas pistas",
        title: "Avenida iluminada",
    }),
]

const internalLinks = [
    ["Fabrica de postes para iluminacao publica", "/fabrica-de-postes-para-iluminacao-publica"],
    ["Fornecedor de postes para iluminacao publica", "/fornecedor-de-postes-para-iluminacao-publica"],
    ["Fabrica de postes metalicos", "/fabrica-de-postes-metalicos"],
    ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
    ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
    ["Industria de postes metalicos", "/industria-de-postes-metalicos"],
    ["Orcamento de poste metalico", "/orcamento-poste-metalico"],
    ["Postes metalicos", "/postes-metalicos"],
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Postes para pracas", "/postes-para-pracas"],
    ["Postes para estacionamentos", "/postes-para-estacionamentos"],
    ["Altura de poste para iluminacao publica", "/blog/altura-de-poste-para-iluminacao-publica"],
    ["Normas para postes de iluminacao", "/blog/normas-para-postes-de-iluminacao"],
    ["Poste galvanizado ou pintado", "/blog/poste-galvanizado-ou-pintado"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste teleconico ou reto", "/blog/poste-teleconico-ou-reto"],
    ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Suporte para luminaria publica", "/produtos/suporte-para-luminaria-publica"],
    ["Chumbador para poste metalico", "/produtos/chumbador-para-poste-metalico"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "A B&B fabrica postes para iluminacao publica?",
        answer:
            "Sim. A B&B fabrica postes metalicos para aplicacoes urbanas e orienta a especificacao conforme ambiente, modelo, altura, fixacao, acabamento, quantidade e prazo.",
    },
    {
        question: "Quais modelos podem ser usados em iluminacao publica?",
        answer:
            "A escolha pode envolver postes retos, teleconicos, curvos simples, curvos duplos, ornamentais, bracos e suportes. A aplicacao define o modelo mais adequado.",
    },
    {
        question: "A pagina atende apenas projetos em Goias?",
        answer:
            "Nao. Goiania e Goias funcionam como prova de origem fabril. A estrategia comercial da B&B para postes de iluminacao publica e nacional.",
    },
    {
        question: "O que enviar para cotar postes para iluminacao publica?",
        answer:
            "Envie cidade e UF, tipo de via ou area, quantidade, altura desejada, luminaria, tipo de fixacao, acabamento, prazo e, se houver, projeto ou memorial tecnico.",
    },
    {
        question: "A B&B ajuda a escolher acabamento e fixacao?",
        answer:
            "Sim. O time comercial pode orientar a conversa tecnica inicial para transformar a demanda em uma cotacao mais clara para engenharia e compras.",
    },
    {
        question: "Postes de iluminacao publica precisam seguir norma tecnica?",
        answer:
            "Projetos de iluminacao publica devem considerar requisitos tecnicos, memoriais, ambiente, fixacao, cargas e normas aplicaveis. A B&B orienta a cotacao com referencias como NBR 14744 e NBR 6323 quando cabiveis ao produto e acabamento.",
    },
    {
        question: "Qual a diferenca entre poste reto, curvo e teleconico para iluminacao publica?",
        answer:
            "O poste reto atende aplicacoes objetivas e patios; o curvo posiciona a luminaria com avanco lateral; o teleconico combina rigidez, visual limpo e ampla aplicacao urbana. A escolha depende de altura, luminaria, via, fixacao e projeto.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createWebPageSchema({
            url: pageUrl,
            name: "Postes para Iluminacao Publica",
            description: pageDescription,
            image: heroImage,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Postes para Iluminacao Publica", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: "Aplicacoes de postes para iluminacao publica",
            items: applications.map((application) => ({
                name: application.title,
                description: application.description,
            })),
        }),
        ...createImageSchemas(gallery),
        createFaqSchema(pageUrl, faq),
    ])
}

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-accent-dark">
            {children}
        </p>
    )
}

export default async function PostesParaIluminacaoPublicaPage() {
    const [products, projects] = await Promise.all([
        getProducts(),
        getPortfolioProjects(),
    ])

    const featuredProducts = getPrimaryCatalogProducts(products)
        .filter((product) => /poste|braco|suporte/i.test(`${product.name} ${product.model}`))
        .slice(0, 6)
    const featuredProjects = projects.filter((project) => project.image).slice(0, 3)

    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="postes-iluminacao-publica-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp message={whatsappMessage} />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-85 md:opacity-100"
                        sizes="100vw"
                        style={{ objectPosition: "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/90 via-industrial-950/54 to-industrial-950/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/58 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white rounded-md">
                            <Landmark className="size-4 text-accent-premium" aria-hidden="true" />
                            Vias, pracas e obras urbanas
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Postes para Iluminacao Publica
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Postes metalicos para vias, avenidas, pracas, loteamentos e areas institucionais. A B&B
                            fabrica, orienta a especificacao por altura, fixacao e acabamento, e atende compras tecnicas
                            em todo o Brasil.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {heroProofs.map((proof) => (
                                <span
                                    key={proof}
                                    className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-white"
                                >
                                    {proof}
                                </span>
                            ))}
                        </div>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar orcamento de postes para iluminacao publica pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
                            >
                                <Download className="size-5" aria-hidden="true" />
                                Baixar catalogos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-industrial-50 py-8">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-4">
                    {requirements.map((item) => {
                        const Icon = item.icon
                        return (
                            <div key={item.title} className="flex items-start gap-4 bg-white p-5 rounded-2xl">
                                <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
                                    <Icon className="size-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-widest">{item.title}</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-industrial-600">{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div className="space-y-6">
                        <SectionLabel>Aplicacao publica</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            A compra depende do ambiente, nao so do poste
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Em iluminacao publica, o comprador precisa alinhar seguranca, durabilidade, manutencao,
                            padrao visual, fixacao e compatibilidade com luminarias. A pagina existe para tirar a busca do
                            termo generico e levar o lead para uma especificacao objetiva.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A B&B deve aparecer como fabricante que orienta a decisao: qual modelo usar, onde aplicar,
                            quais informacoes enviar e como transformar demanda publica ou urbana em orcamento tecnico.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {applications.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.title} className="border border-industrial-200 p-6 rounded-2xl">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Critério de escolha</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Onde cada modelo tende a entrar
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Esta tabela ajuda compras, engenharia e obras a organizar uma conversa tecnica antes de pedir
                            preco.
                        </p>
                    </div>

                    <div className="overflow-hidden border border-white/15 rounded-2xl">
                        {decisionRows.map(([place, model, criterion]) => (
                            <div key={place} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[220px_1fr_1fr]">
                                <div className="bg-white/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                                    {place}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                    {model}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                    {criterion}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Catalogo tecnico</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Modelos B&B para postes de iluminacao publica
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A pagina precisa responder a busca comercial e tecnica ao mesmo tempo. Por isso, a B&B
                            apresenta os tipos de poste, acessorios e aplicacoes antes do orcamento, deixando claro o
                            caminho entre demanda urbana e especificacao.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200">
                        {technicalCatalogRows.map(([model, configuration, use]) => (
                            <div key={model} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[240px_1fr_1fr]">
                                <div className="bg-industrial-50 px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-700">
                                    {model}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {configuration}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {use}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Intencao comercial</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Buscas que esta pagina precisa resolver
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A busca por postes para iluminacao publica mistura aplicacao, produto, fabrica, fornecedor,
                            bracos, suportes e normas. Separar cada intencao reduz atrito antes do orcamento.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 bg-white">
                        {publicLightingIntentRows.map(([term, answer]) => (
                            <div key={term} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[270px_1fr]">
                                <div className="bg-white px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-600">
                                    {term}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Norma e acabamento</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Especificacao que evita retrabalho na obra
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O comprador de postes para iluminacao publica nao precisa apenas de preco. Precisa de um
                            produto compativel com ambiente, luminaria, fixacao, memorial tecnico, prazo e fiscalizacao.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 bg-white">
                        {complianceRows.map(([label, value]) => (
                            <div key={label} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[220px_1fr]">
                                <div className="bg-white px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-600">
                                    {label}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Dados para cotacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Informacoes que evitam orcamento incompleto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Iluminacao publica costuma envolver volume, prazo, memoriais e etapas de obra. Quanto mais
                            claro o briefing, mais rapido o time comercial consegue orientar o modelo certo.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 rounded-2xl">
                        {quoteData.map(([label, value]) => (
                            <div key={label} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[220px_1fr]">
                                <div className="bg-industrial-50 px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-600">
                                    {label}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Linhas relacionadas</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Produtos que sustentam projetos urbanos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A pagina de aplicacao distribui autoridade para linhas tecnicas e ajuda o comprador a
                            comparar caminhos antes do contato comercial.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {relatedLines.map((line) => (
                            <Link
                                key={line.href}
                                href={line.href}
                                className="group border border-industrial-200 bg-white p-6 transition-colors hover:border-industrial-950 rounded-2xl"
                            >
                                <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                    {line.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-industrial-600">{line.description}</p>
                                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                    Ver linha
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Galeria indexavel</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Imagens de postes aplicados em areas urbanas
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Fotos por aplicacao ajudam o lead a reconhecer o contexto do projeto e reforcam sinais para
                            busca organica e Google Imagens.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-4">
                        {gallery.map((image) => (
                            <div key={image.src} className="border border-industrial-200 bg-white">
                                <div className="relative aspect-[4/3] bg-industrial-100">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 25vw, 100vw"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-black uppercase text-industrial-950">{image.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-industrial-600">{image.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {featuredProducts.length > 0 && (
                <section className="bg-industrial-50 py-20 md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-3xl space-y-5">
                                <SectionLabel>Catalogo B&B</SectionLabel>
                                <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                    Produtos relacionados
                                </h2>
                            </div>
                            <Link
                                href="/produtos"
                                className="inline-flex h-12 items-center justify-center gap-2 border border-industrial-300 px-5 text-xs font-black uppercase tracking-widest text-industrial-800 hover:border-industrial-950 rounded-lg"
                            >
                                Ver catalogo
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/produtos/item/${product.id}`}
                                    className="group flex min-h-[340px] flex-col border border-industrial-200 bg-white transition-colors hover:border-industrial-950 rounded-2xl"
                                >
                                    <div className="relative aspect-[4/3] border-b border-industrial-100 bg-industrial-50">
                                        {product.image ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-5"
                                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-4xl font-black text-industrial-200">
                                                B&B
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400">
                                            {product.model || "Produto B&B"}
                                        </p>
                                        <h3 className="mt-2 text-base font-black uppercase leading-tight text-industrial-950">
                                            {product.name}
                                        </h3>
                                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-industrial-600">
                                            {product.description}
                                        </p>
                                        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                            Ver produto
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Interlinking P0</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Proximos passos para comprar com especificacao tecnica
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A pagina conecta fabricante, linhas de postes, bracos, catalogos, aplicacoes e artigos
                            tecnicos para reduzir duvida antes da cotacao.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {internalLinks.map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium rounded-lg"
                            >
                                {label}
                                <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {featuredProjects.length > 0 && (
                <section className="py-20 md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Prova real</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Obras ajudam a validar aplicacao e capacidade
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                A prova local de fabrica e portfolio sustenta a ambicao nacional quando aparece conectada
                                a paginas especificas.
                            </p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-3">
                            {featuredProjects.map((project) => (
                                <div key={project.title} className="border border-industrial-200 bg-white rounded-2xl">
                                    <div className="relative aspect-[4/3] bg-industrial-50">
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} - ${project.location}`}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 33vw, 100vw"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400">
                                            {project.category}
                                        </p>
                                        <h3 className="mt-2 text-base font-black uppercase text-industrial-950">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 text-sm font-bold text-industrial-500">{project.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas comuns antes do orcamento
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas para compradores que precisam transformar uma demanda urbana em briefing tecnico.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faq.map((item) => (
                            <details key={item.question} className="group border border-industrial-200 bg-white p-6 rounded-2xl" open={item === faq[0]}>
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-black uppercase text-industrial-950">
                                    {item.question}
                                    <span className="text-accent-dark transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                                </summary>
                                <p className="mt-4 text-sm leading-relaxed text-industrial-600">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-accent-premium py-16 md:py-20">
                <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            Envie a demanda da obra publica ou urbana
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe local, aplicacao, quantidade, altura desejada, luminarias, fixacao, acabamento e prazo.
                            A B&B ajuda a organizar a especificacao para orcamento.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Falar com especialista sobre postes para iluminacao publica"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white rounded-lg"
                        >
                            <FileText className="size-5" aria-hidden="true" />
                            Ver catalogos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    <Link href="/postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Zap className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Comparar modelos de postes</span>
                    </Link>
                    <Link href="/fabricante-de-postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Factory className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Comprar direto de fabricante</span>
                    </Link>
                    <Link href="/downloads" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Ruler className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Catalogos e desenhos tecnicos</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
