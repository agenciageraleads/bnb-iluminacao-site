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
    Waves,
    Wrench,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SeoProductGallery } from "@/components/seo/seo-product-gallery"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { createSeoImage } from "@/lib/seo/images"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFaqSchema,
    createImageSchemas,
    createItemListSchema,
    createProductSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/produtos/poste-metalico-galvanizado"
const pageDescription =
    "Poste metalico galvanizado para iluminacao publica, condominios, loteamentos e industrias. Veja aplicacoes, acabamentos e solicite orcamento tecnico."
const whatsappMessage =
    "Ola, vim pela pagina de poste metalico galvanizado e quero solicitar um orcamento tecnico."
const heroImage = "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg"
const productGallery = [
    createSeoImage("posteMetalicoGalvanizadoInstaladoAreaExterna", {
        alt: "Poste metalico galvanizado instalado em area externa com luminaria",
        title: "Poste galvanizado instalado",
    }),
    createSeoImage("posteMetalicoGalvanizadoSuporteEquipamentoUrbano", {
        alt: "Poste metalico galvanizado com suporte para equipamento em area urbana",
        title: "Poste galvanizado com suporte",
    }),
    createSeoImage("posteRetoAvenidaDia", {
        alt: "Poste metalico galvanizado reto para avenida e iluminacao publica",
        title: "Poste galvanizado reto",
    }),
    createSeoImage("posteRetoAvenidaNoite", {
        alt: "Poste metalico galvanizado em avenida iluminada a noite",
        title: "Poste galvanizado em avenida",
    }),
    createSeoImage("viaPublicaPostesRetosDoisLados", {
        alt: "Postes metalicos galvanizados em via publica com iluminacao nos dois sentidos",
        title: "Postes galvanizados em via publica",
    }),
    createSeoImage("estacionamentoNoturnoPosteReto", {
        alt: "Poste metalico galvanizado para estacionamento externo durante a noite",
        title: "Postes galvanizados em estacionamento",
    }),
]

export const metadata: Metadata = {
    title: {
        absolute: "Poste Metalico Galvanizado para Iluminacao | B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Poste Metalico Galvanizado para Iluminacao | B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Postes metalicos galvanizados para iluminacao",
            },
        ],
    },
}

const highlights = [
    {
        title: "Protecao contra corrosao",
        description: "Acabamento indicado para projetos externos e ambientes que exigem maior resistencia operacional.",
        icon: ShieldCheck,
    },
    {
        title: "Compra sob especificacao",
        description: "Modelo, altura, fixacao e acabamento devem seguir aplicacao, memorial tecnico e condicao da obra.",
        icon: ClipboardCheck,
    },
    {
        title: "Aplicacao B2B",
        description: "Postes para iluminacao publica, loteamentos, condominios, estacionamentos e areas industriais.",
        icon: Building2,
    },
    {
        title: "Atendimento nacional",
        description: "Fabrica em Goiania como prova operacional, com atendimento comercial para todo o Brasil.",
        icon: Truck,
    },
]

const useCases = [
    {
        title: "Iluminacao publica",
        description: "Vias, avenidas, pracas e obras urbanas que exigem padrao tecnico, repetibilidade e durabilidade.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Loteamentos e condominios",
        description: "Projetos em volume que precisam combinar padrao visual, acabamento e prazo de fornecimento.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Areas industriais",
        description: "Patios, docas, estacionamentos, galpoes e circulacao interna em ambientes de uso intenso.",
        href: "/postes-metalicos",
        icon: Factory,
    },
    {
        title: "Ambientes agressivos",
        description: "Regioes com maior exposicao a umidade, intemperies ou agentes que pedem cuidado no acabamento.",
        href: "/fornecedor-de-postes-metalicos",
        icon: Waves,
    },
]

const specificationRows = [
    ["Produto", "Poste metalico com acabamento galvanizado, definido conforme modelo, aplicacao e memorial tecnico."],
    ["Modelos", "Reto, teleconico, curvo simples, curvo duplo ou solucao sob especificacao do projeto."],
    ["Fixacao", "Engastado, flangeado, base e chumbadores conforme projeto civil e condicao de instalacao."],
    ["Uso", "Iluminacao publica, loteamentos, condominios, industrias, patios, estacionamentos e areas externas."],
    ["Acabamento", "Galvanizacao e, quando necessario, pintura complementar conforme padrao visual e ambiente."],
    ["Compra", "Orcamento com modelo, quantidade, cidade/UF, prazo, fixacao, acabamento e documentos disponiveis."],
]

const comparisonRows = [
    [
        "Galvanizado",
        "Quando o projeto prioriza protecao contra corrosao em ambiente externo.",
        "Indicado para obras que precisam de maior durabilidade operacional.",
    ],
    [
        "Pintado",
        "Quando a prioridade e padronizacao visual, cor ou identidade do empreendimento.",
        "Pode ser suficiente em ambientes menos agressivos, conforme especificacao tecnica.",
    ],
    [
        "Galvanizado + pintura",
        "Quando o projeto combina protecao e acabamento visual.",
        "Deve ser definido conforme memorial, compatibilidade de processo e padrao da obra.",
    ],
]

const modelOptions = [
    {
        title: "Poste reto galvanizado",
        description: "Opcao objetiva para patios, estacionamentos, areas industriais e layouts de iluminacao direta.",
        href: "/postes-metalicos",
    },
    {
        title: "Poste teleconico galvanizado",
        description: "Modelo usado em vias, loteamentos, condominios e aplicacoes urbanas com exigencia tecnica.",
        href: "/produtos/poste-teleconico",
    },
    {
        title: "Poste curvo duplo galvanizado",
        description: "Aplicacao para avenidas, canteiros e areas que precisam iluminar dois sentidos.",
        href: "/produtos/poste-curvo-duplo",
    },
]

const buyingSteps = [
    {
        title: "1. Definir ambiente",
        description: "Informe se o poste sera usado em via, condominio, loteamento, estacionamento, industria ou area externa.",
    },
    {
        title: "2. Escolher modelo",
        description: "Reto, teleconico, curvo simples, curvo duplo ou outro formato conforme necessidade luminotecnica.",
    },
    {
        title: "3. Confirmar fixacao",
        description: "Engastado ou flangeado conforme fundacao, base, chumbadores e condicao civil da instalacao.",
    },
    {
        title: "4. Validar acabamento",
        description: "Galvanizado, pintado ou combinado conforme ambiente, padrao visual, memorial e prazo.",
    },
]

const internalLinks = [
    ["Postes metalicos", "/postes-metalicos"],
    ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
    ["Fabricante de postes teleconicos", "/fabricante-de-postes-teleconicos"],
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Suporte para luminaria publica", "/produtos/suporte-para-luminaria-publica"],
    ["Chumbador para poste metalico", "/produtos/chumbador-para-poste-metalico"],
    ["Poste galvanizado ou pintado", "/blog/poste-galvanizado-ou-pintado"],
    ["Normas para postes de iluminacao", "/blog/normas-para-postes-de-iluminacao"],
    ["Pintura eletrostatica", "/servicos/pintura-eletrostatica"],
    ["Catalogos e downloads", "/downloads"],
    ["Obras realizadas", "/obras"],
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

const faq = [
    {
        question: "O que e um poste metalico galvanizado?",
        answer:
            "E um poste de aco que recebe acabamento galvanizado para aumentar a protecao contra corrosao, especialmente em aplicacoes externas e ambientes mais exigentes.",
    },
    {
        question: "Poste galvanizado e melhor que poste pintado?",
        answer:
            "Depende do ambiente e do objetivo do projeto. A galvanizacao prioriza protecao contra corrosao. A pintura prioriza padrao visual e pode ser complementar quando o memorial pedir acabamento especifico.",
    },
    {
        question: "A B&B fabrica postes galvanizados sob medida?",
        answer:
            "A B&B fabrica postes metalicos sob especificacao. A confirmacao de modelo, acabamento, fixacao e prazos deve ser feita no orcamento tecnico.",
    },
    {
        question: "Quais dados enviar para cotar poste metalico galvanizado?",
        answer:
            "Envie aplicacao, modelo desejado, altura aproximada, quantidade, cidade e UF, tipo de fixacao, acabamento esperado, prazo e desenho ou memorial tecnico se houver.",
    },
    {
        question: "A pagina substitui uma especificacao de engenharia?",
        answer:
            "Nao. A pagina orienta a compra e a conversa comercial. A especificacao final deve respeitar projeto, memoriais, local de instalacao e requisitos tecnicos da obra.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createProductSchema({
            url: pageUrl,
            name: "Poste Metalico Galvanizado",
            description: pageDescription,
            image: heroImage,
            category: "Postes metalicos para iluminacao",
            properties: specificationRows.map(([name, value]) => ({ name, value })),
        }),
        createWebPageSchema({
            url: pageUrl,
            name: "Poste Metalico Galvanizado",
            description: pageDescription,
            image: heroImage,
            mainEntityId: `${pageUrl}#product`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Produtos", item: `${SITE_URL}/produtos` },
            { name: "Poste Metalico Galvanizado", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: "Aplicacoes de poste metalico galvanizado",
            items: useCases.map((item) => ({
                name: item.title,
                description: item.description,
                url: item.href,
            })),
        }),
        ...createImageSchemas(productGallery),
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

export default function PosteMetalicoGalvanizadoPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="poste-metalico-galvanizado-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de poste metalico galvanizado"
                    eventSource="floating_poste_metalico_galvanizado"
                />
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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/94 via-industrial-950/62 to-industrial-950/12" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/62 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <ShieldCheck className="size-4 text-accent-premium" aria-hidden="true" />
                            Acabamento tecnico para uso externo
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Poste Metalico Galvanizado
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Poste metalico galvanizado para iluminacao publica, loteamentos, condominios,
                            estacionamentos e areas industriais, com orientacao para modelo, fixacao, acabamento e
                            orcamento tecnico.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de poste metalico galvanizado"
                                eventSource="hero_poste_metalico_galvanizado"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de poste metalico galvanizado pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
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
                    {highlights.map((item) => {
                        const Icon = item.icon
                        return (
                            <div key={item.title} className="flex items-start gap-4 bg-white p-5">
                                <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium">
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
                        <SectionLabel>Acabamento e especificacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Quando escolher poste galvanizado
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A galvanizacao entra quando o projeto precisa aumentar a protecao do aco contra corrosao,
                            principalmente em aplicacoes externas, areas expostas e ambientes que pedem maior cuidado de
                            durabilidade.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A decisao final deve considerar modelo do poste, ambiente, fixacao, padrao visual,
                            especificacao da obra e prazo. Por isso a pagina trata o tema como compra tecnica, nao como
                            produto de prateleira.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {specificationRows.map(([label, value]) => (
                            <div key={label} className="grid border border-industrial-200 md:grid-cols-[180px_1fr]">
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

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Comparativo</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Galvanizado, pintado ou combinado
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A melhor escolha nao e uma regra unica. O acabamento precisa seguir ambiente, memoriais,
                            padrao visual, manutencao esperada e requisitos do projeto.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-white/15">
                        {comparisonRows.map(([option, use, note]) => (
                            <div key={option} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[220px_1fr_1fr]">
                                <div className="bg-white/10 px-5 py-5 text-xs font-black uppercase tracking-widest text-accent-premium">
                                    {option}
                                </div>
                                <div className="px-5 py-5 text-sm font-medium leading-relaxed text-industrial-200">
                                    {use}
                                </div>
                                <div className="px-5 py-5 text-sm font-medium leading-relaxed text-industrial-200">
                                    {note}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Modelos aplicaveis</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O acabamento acompanha o projeto do poste
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A pagina de galvanizado nao substitui as paginas de modelo. Ela ajuda a definir o acabamento
                            correto depois que a geometria, a aplicacao e a fixacao estao encaminhadas.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {modelOptions.map((model) => (
                            <Link
                                key={model.title}
                                href={model.href}
                                className="group border border-industrial-200 p-7 transition-colors hover:border-industrial-950"
                            >
                                <h3 className="text-lg font-black uppercase tracking-tight text-industrial-950">
                                    {model.title}
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-industrial-600">{model.description}</p>
                                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-950">
                                    Ver contexto
                                    <ArrowRight className="size-4 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <SeoProductGallery
                title="Galeria de poste metalico galvanizado"
                description="Imagens para reforcar aplicacoes externas em vias, estacionamentos e areas industriais, onde o acabamento galvanizado costuma entrar como requisito de durabilidade."
                images={productGallery}
            />

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Compra tecnica</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Dados minimos para cotacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Para evitar comparacao errada de preco, a B&B precisa entender uso, quantidade, local de
                            entrega, modelo, acabamento e fixacao antes de fechar a proposta.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {buyingSteps.map((step) => (
                            <div key={step.title} className="border border-industrial-200 bg-white p-6">
                                <div className="mb-5 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                    <Wrench className="size-6" aria-hidden="true" />
                                </div>
                                <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-industrial-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Aplicacoes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Onde o galvanizado costuma entrar
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O acabamento galvanizado e mais relevante quando a obra combina exposicao externa, exigencia
                            de durabilidade e necessidade de reduzir riscos de corrosao ao longo do uso.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {useCases.map((card) => {
                            const Icon = card.icon
                            return (
                                <Link
                                    key={card.title}
                                    href={card.href}
                                    className="group border border-industrial-200 p-6 transition-colors hover:border-industrial-950"
                                >
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                        {card.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{card.description}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-industrial-950">
                                        Ver aplicacao
                                        <ArrowRight className="size-4 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Downloads</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Catalogos para conversa tecnica
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Use os materiais como ponto de partida. O acabamento galvanizado deve ser confirmado no
                            orcamento conforme modelo e especificacao.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        {downloadLinks.map((download) => (
                            <Link
                                key={download.href}
                                href={download.href}
                                className="group flex items-center justify-between gap-5 border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white hover:text-industrial-950"
                            >
                                <span className="text-sm font-black uppercase tracking-widest">{download.title}</span>
                                <Download className="size-5 text-accent-premium transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas sobre poste galvanizado
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faq.map((item) => (
                            <div key={item.question} className="border border-industrial-200 p-6">
                                <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                    {item.question}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-industrial-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Proximo passo</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Solicite cotacao com especificacao clara
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Envie modelo, quantidade, cidade/UF, tipo de fixacao, acabamento esperado e prazo. Se
                                houver memorial, desenho ou luminaria definida, envie tambem.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <WhatsAppLink
                                    message={whatsappMessage}
                                    eventLabel="Solicitar cotacao de poste metalico galvanizado"
                                    eventSource="final_poste_metalico_galvanizado"
                                    className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-accent-premium hover:text-industrial-950"
                                    aria-label="Solicitar cotacao de poste metalico galvanizado pelo WhatsApp"
                                >
                                    <MessageCircle className="size-5" aria-hidden="true" />
                                    Solicitar cotacao
                                </WhatsAppLink>
                                <Link
                                    href="/fornecedor-de-postes-metalicos"
                                    className="inline-flex h-14 items-center justify-center gap-3 border border-industrial-300 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:border-industrial-950"
                                >
                                    <FileText className="size-5" aria-hidden="true" />
                                    Ver fornecedor
                                </Link>
                            </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {internalLinks.map(([label, href]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="group flex items-center justify-between gap-4 border border-industrial-200 bg-white p-5 text-sm font-black uppercase tracking-widest text-industrial-950 transition-colors hover:border-industrial-950"
                                >
                                    <span>{label}</span>
                                    <ArrowRight className="size-4 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
