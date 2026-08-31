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
    MessageCircle,
    Paintbrush,
    Ruler,
    ShieldCheck,
    Truck,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { TrackedContactLink } from "@/lib/lead-tracking"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFaqSchema,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/fabricante-de-postes-teleconicos"
const pageDescription =
    "Fabricante de postes teleconicos retos e curvos para iluminacao publica, loteamentos, pracas e industrias. Consulte modelos, acabamentos e orcamento tecnico."
const whatsappMessage =
    "Ola, vim pela pagina de fabricante de postes teleconicos e quero solicitar um orcamento tecnico."
const heroImage = "/images/produtos/poste-curvo-duplo-avenida-dia.png"

export const metadata: Metadata = {
    title: {
        absolute: "Fabricante de Postes Teleconicos | Retos e Curvos B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Fabricante de Postes Teleconicos | Retos e Curvos B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Postes teleconicos fabricados pela B&B",
            },
        ],
    },
}

const highlights = [
    {
        title: "Producao propria",
        description: "Fabrica em Goiania como prova operacional, com atendimento comercial para projetos em todo o Brasil.",
        icon: Factory,
    },
    {
        title: "Modelos teleconicos",
        description: "Postes retos, curvos simples e curvos duplos para vias, pracas, loteamentos, condominios e patios.",
        icon: Ruler,
    },
    {
        title: "Orcamento tecnico",
        description: "A proposta nasce de modelo, altura, fixacao, acabamento, quantidade, cidade de entrega e prazo.",
        icon: ClipboardCheck,
    },
    {
        title: "Entrega nacional",
        description: "Goias comprova origem fabril; o mercado-alvo da pagina e nacional.",
        icon: Truck,
    },
]

const modelOptions = [
    {
        title: "Poste teleconico reto (TR)",
        use: "Patios, condominios e estacionamentos",
        description:
            "Modelo indicado para areas que pedem geometria objetiva, instalacao limpa e compatibilidade com luminarias no topo ou em suporte.",
        image: "/images/produtos/poste-reto-avenida-dia.png",
    },
    {
        title: "Poste teleconico curvo simples (TCS)",
        use: "Ruas, acessos e calcadas",
        description:
            "Opcao para projetos em que a luminaria precisa avancar para um lado, direcionando a luz para a via ou area de circulacao.",
        image: "/images/produtos/poste-curvo-simples-rua-noite.png",
    },
    {
        title: "Poste teleconico curvo duplo (TCD)",
        use: "Avenidas e canteiros centrais",
        description:
            "Aplicacao para iluminar dois sentidos, especialmente em canteiros, vias largas, avenidas e areas com dois fluxos.",
        image: "/images/produtos/poste-curvo-duplo-avenida-dia.png",
    },
]

const specificationRows = [
    ["Produto", "Postes teleconicos retos, curvos simples e curvos duplos fabricados conforme necessidade do projeto."],
    ["Aplicacoes", "Iluminacao publica, loteamentos, pracas, condominios, industrias, patios e estacionamentos."],
    ["Fixacao", "Engastado, flangeado, base e chumbadores conforme projeto civil e condicao de instalacao."],
    ["Acabamento", "Galvanizacao, pintura eletrostatica ou acabamento sob especificacao do memorial tecnico."],
    ["Altura", "Definida a partir da aplicacao, luminaria, estudo luminotecnico, largura da via e padrao do projeto."],
    ["Compra", "Orcamento com modelo, quantidade, cidade/UF, prazo, acabamento e desenhos ou memoriais disponiveis."],
]

const buyingSteps = [
    {
        title: "1. Identificar aplicacao",
        description: "Via publica, avenida, praca, condominio, loteamento, industria, patio ou estacionamento.",
    },
    {
        title: "2. Definir geometria",
        description: "Reto, curvo simples ou curvo duplo conforme ponto de luz, avanco e area de cobertura.",
    },
    {
        title: "3. Confirmar fixacao",
        description: "Engastado ou flangeado conforme fundacao, base, chumbadores e condicao da obra.",
    },
    {
        title: "4. Fechar acabamento",
        description: "Galvanizado, pintado ou sob especificacao conforme ambiente, durabilidade e padrao visual.",
    },
]

const manufacturerIntentRows = [
    ["Fabricante de postes teleconicos", "Validar origem fabril, modelos produzidos, acabamento e atendimento nacional."],
    ["Fabrica de postes teleconicos", "Confirmar processo, siglas da linha, fixacao, documentos e briefing tecnico."],
    ["Postes teleconicos direto da fabrica", "Comprar com suporte de especificacao antes da proposta, sem depender de revenda generica."],
    ["Poste teleconico galvanizado", "Definir acabamento conforme ambiente, memorial e durabilidade esperada."],
    ["TR, TCS e TCD", "Traduzir a busca em modelo reto, curvo simples ou curvo duplo para cotacao objetiva."],
]

const productLineRows = [
    ["TR", "Poste teleconico reto", "Patios, estacionamentos, vias internas e areas com luminaria no topo ou suporte."],
    ["TCS", "Poste teleconico curvo simples", "Ruas, acessos, calcadas e vias com avanco de luminaria para um lado."],
    ["TCD", "Poste teleconico curvo duplo", "Avenidas, canteiros centrais e areas com iluminacao para dois sentidos."],
    ["Engastado", "Fixacao no solo", "Configuracao definida pelo projeto civil e pela fundacao."],
    ["Flangeado", "Base com chumbadores", "Configuracao usada quando a instalacao pede base aparafusada."],
]

const finishOptions = [
    {
        title: "Galvanizacao",
        description: "Indicada quando o projeto exige maior protecao contra corrosao e vida util operacional.",
        icon: ShieldCheck,
    },
    {
        title: "Pintura eletrostatica",
        description: "Usada para padronizacao visual, identidade do empreendimento e protecao complementar.",
        icon: Paintbrush,
    },
    {
        title: "Memorial tecnico",
        description: "Quando a compra exige compatibilidade com documentos, prazos, luminarias e padroes da obra.",
        icon: FileText,
    },
]

const applicationCards = [
    {
        title: "Iluminacao publica",
        description: "Postes teleconicos para vias, avenidas, pracas e obras urbanas com especificacao tecnica.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Loteamentos",
        description: "Padronizacao visual, repetibilidade de fornecimento e suporte para definicao de modelos.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Areas industriais",
        description: "Patios, galpoes, docas, estacionamentos e acessos com demanda operacional.",
        href: "/postes-metalicos",
        icon: Factory,
    },
    {
        title: "Compra tecnica",
        description: "Pagina para quem precisa de fornecedor/fabricante, prazo e documentacao para cotacao.",
        href: "/fornecedor-de-postes-metalicos",
        icon: ClipboardCheck,
    },
]

const downloadLinks = [
    {
        title: "Datasheet poste reto",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf",
    },
    {
        title: "Datasheet poste curvo simples",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf",
    },
    {
        title: "Datasheet poste curvo duplo",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf",
    },
]

const primaryInternalLinks = [
    {
        label: "Ver pagina do produto",
        href: "/produtos/poste-teleconico",
        icon: Ruler,
    },
    {
        label: "Fabricante de postes metalicos",
        href: "/fabricante-de-postes-metalicos",
        icon: Factory,
    },
    {
        label: "Aplicacao em iluminacao publica",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
]

const secondaryInternalLinks = [
    ["Hub de postes metalicos", "/postes-metalicos"],
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Fabrica de postes metalicos", "/fabrica-de-postes-metalicos"],
    ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
    ["Industria de postes metalicos", "/industria-de-postes-metalicos"],
    ["Orcamento de poste metalico", "/orcamento-poste-metalico"],
    ["Poste teleconico ou reto", "/blog/poste-teleconico-ou-reto"],
    ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "A B&B e fabricante de postes teleconicos?",
        answer:
            "Sim. A B&B fabrica postes metalicos, incluindo modelos teleconicos retos, curvos simples e curvos duplos para diferentes aplicacoes de iluminacao.",
    },
    {
        question: "Qual a diferenca entre poste teleconico reto, curvo simples e curvo duplo?",
        answer:
            "O reto tem geometria vertical objetiva. O curvo simples avanca a luminaria para um lado. O curvo duplo atende dois sentidos, comum em canteiros centrais e avenidas.",
    },
    {
        question: "A pagina substitui o projeto luminotecnico?",
        answer:
            "Nao. A pagina organiza a compra e a especificacao inicial. Altura, afastamento, luminaria e fixacao devem ser confirmados conforme projeto e memoriais tecnicos.",
    },
    {
        question: "A B&B atende fora de Goias?",
        answer:
            "Sim. A fabrica em Goiania serve como prova de origem e capacidade operacional, mas o atendimento comercial para postes teleconicos e nacional.",
    },
    {
        question: "Quais dados enviar para cotar com fabricante?",
        answer:
            "Envie aplicacao, modelo desejado, altura aproximada, quantidade, cidade e UF, tipo de fixacao, acabamento, luminaria, prazo e desenho ou memorial se houver.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createWebPageSchema({
            url: pageUrl,
            name: "Fabricante de Postes Teleconicos",
            description: pageDescription,
            image: heroImage,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Fabricante de Postes Teleconicos", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#modelos`,
            name: "Modelos de postes teleconicos fabricados pela B&B",
            items: modelOptions.map((model) => ({
                name: model.title,
                description: model.description,
            })),
        }),
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

export default function FabricanteDePostesTeleconicosPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="fabricante-postes-teleconicos-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento fabricante postes teleconicos"
                    eventSource="floating_fabricante_postes_teleconicos"
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-80 md:opacity-95"
                        sizes="100vw"
                        style={{ objectPosition: "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/94 via-industrial-950/62 to-industrial-950/12" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/64 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white rounded-md">
                            <Factory className="size-4 text-accent-premium" aria-hidden="true" />
                            Producao propria, atendimento nacional
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Fabricante de Postes Teleconicos
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Postes teleconicos retos, curvos simples e curvos duplos para iluminacao publica, loteamentos,
                            pracas, condominios, estacionamentos e areas industriais, com suporte para compra tecnica.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento fabricante postes teleconicos"
                                eventSource="hero_fabricante_postes_teleconicos"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar orcamento de postes teleconicos pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/produtos/poste-teleconico"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
                            >
                                <Ruler className="size-5" aria-hidden="true" />
                                Ver poste teleconico
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-industrial-50 py-8">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-4">
                    {highlights.map((item) => {
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
                        <SectionLabel>Compra com fabricante</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que confirmar antes de pedir preco
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Quem procura fabricante de postes teleconicos normalmente ja precisa sair da busca generica e
                            chegar em uma especificacao: modelo, aplicacao, fixacao, acabamento e prazo.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A B&B posiciona Goiania como prova fabril e atende projetos no Brasil com conversa comercial
                            orientada por engenharia, compras e obra.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {specificationRows.map(([label, value]) => (
                            <div key={label} className="grid border border-industrial-200 md:grid-cols-[180px_1fr] rounded-2xl">
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
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Intencao comercial</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que a busca por fabricante precisa comprovar
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Para competir nacionalmente, a pagina precisa responder origem fabril, modelos, acabamento,
                            siglas da linha, fixacao, documentos e compra direta com suporte tecnico.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 bg-white rounded-2xl">
                        {manufacturerIntentRows.map(([term, answer]) => (
                            <div key={term} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[260px_1fr]">
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

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Modelos fabricados</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Retos, curvos simples e curvos duplos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A geometria do poste muda conforme largura da via, posicao da luminaria, canteiro central,
                            circulacao e necessidade visual do projeto.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {modelOptions.map((model) => (
                            <div key={model.title} className="border border-white/15 bg-white/5 overflow-hidden rounded-2xl">
                                <div className="relative aspect-[4/3] bg-industrial-900">
                                    <Image
                                        src={model.image}
                                        alt={model.title}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-premium">
                                        {model.use}
                                    </p>
                                    <h3 className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                                        {model.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-300">{model.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Linha Urban</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            TR, TCS e TCD para cotar com menos ambiguidade
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O papel da pagina de fabricante e transformar a busca ampla em um briefing: sigla, geometria,
                            aplicacao, fixacao e acabamento.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 rounded-2xl">
                        {productLineRows.map(([code, model, use]) => (
                            <div key={code} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[140px_260px_1fr]">
                                <div className="bg-industrial-50 px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-700">
                                    {code}
                                </div>
                                <div className="px-5 py-4 text-sm font-black uppercase tracking-widest text-industrial-800">
                                    {model}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {use}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Processo de cotacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Como transformar busca em briefing
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A pagina existe para reduzir ruído na cotacao. Quanto melhor o briefing, mais rapido o time
                            comercial consegue orientar modelo, acabamento, documentos e prazo.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {buyingSteps.map((step) => (
                            <div key={step.title} className="border border-industrial-200 p-6 rounded-2xl">
                                <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-industrial-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Acabamento</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Galvanizado, pintado ou sob especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O acabamento deve considerar ambiente, durabilidade esperada, padrao visual, manutencao e
                            memoriais do projeto.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {finishOptions.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.title} className="border border-industrial-200 bg-white p-6 rounded-2xl">
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

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Aplicacoes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Onde os postes teleconicos entram
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A pagina de fabricante distribui o comprador para produto, aplicacao, hub de postes e
                            cotacao com fornecedor.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {applicationCards.map((card) => {
                            const Icon = card.icon
                            return (
                                <Link
                                    key={card.title}
                                    href={card.href}
                                    className="group border border-industrial-200 p-6 transition-colors hover:border-industrial-950 rounded-2xl"
                                >
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                        {card.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{card.description}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                        Ver detalhes
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Downloads</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Documentos para iniciar a conversa tecnica
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Use os materiais como ponto de partida. A confirmacao final de modelo, altura, fixacao e
                            acabamento deve acontecer no orcamento tecnico.
                        </p>
                    </div>
                    <div className="grid gap-3">
                        {downloadLinks.map((file) => (
                            <TrackedContactLink
                                key={file.href}
                                href={file.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                channel="download"
                                eventSource="fabricante_de_postes_teleconicos"
                                eventLabel={file.title}
                                extraPayload={{ download_type: "datasheet" }}
                                className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium rounded-lg"
                            >
                                <span className="inline-flex items-center gap-3">
                                    <Download className="size-5 text-accent-premium" aria-hidden="true" />
                                    {file.title}
                                </span>
                                <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </TrackedContactLink>
                        ))}
                        <Link
                            href="/downloads"
                            className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium rounded-lg"
                        >
                            Ver todos os catalogos
                            <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas sobre fabricante de postes teleconicos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas para compradores que precisam validar fornecedor, modelo e dados de cotacao.
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
                            Fale com fabricante de postes teleconicos
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Envie aplicacao, modelo, altura aproximada, quantidade, cidade/UF, fixacao, acabamento,
                            luminaria e prazo para iniciar uma cotacao tecnica.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Falar com fabricante de postes teleconicos"
                            eventSource="final_fabricante_postes_teleconicos"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Falar com fabricante de postes teleconicos"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com fabricante
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white rounded-lg"
                        >
                            <Download className="size-5" aria-hidden="true" />
                            Baixar catalogos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    {primaryInternalLinks.map(({ label, href, icon: Icon }) => (
                        <Link key={href} href={href} className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                            <Icon className="size-6 text-accent-dark" aria-hidden="true" />
                            <span className="text-sm font-black uppercase tracking-widest">{label}</span>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="container mx-auto grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4">
                    {secondaryInternalLinks.map(([label, href]) => (
                        <Link
                            key={href}
                            href={href}
                            className="group flex items-center justify-between gap-4 border border-industrial-200 p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950 rounded-lg"
                        >
                            {label}
                            <ArrowRight className="size-4 shrink-0 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}
