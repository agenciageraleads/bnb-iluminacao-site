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
    Zap,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFaqSchema,
    createItemListSchema,
    createProductSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/produtos/poste-teleconico"
const pageDescription =
    "Poste teleconico para iluminacao publica, avenidas, pracas, condominios e estacionamentos. Modelos retos, curvos, flangeados e engastados com orcamento tecnico."
const whatsappMessage =
    "Ola, vim pela pagina de poste teleconico e quero solicitar um orcamento tecnico."
const heroImage = "/images/produtos/poste-reto-avenida-dia.png"

export const metadata: Metadata = {
    title: {
        absolute: "Poste Teleconico Galvanizado Reto e Curvo | B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Poste Teleconico Galvanizado Reto e Curvo | B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Poste metalico para iluminacao urbana",
            },
        ],
    },
}

const highlights = [
    {
        title: "Reto ou curvo",
        description: "Escolha conforme avanco da luminaria, area de cobertura e leitura visual do projeto.",
        icon: Ruler,
    },
    {
        title: "Engastado ou flangeado",
        description: "Fixacao definida junto ao projeto civil, base, fundacao, chumbadores e local de instalacao.",
        icon: ClipboardCheck,
    },
    {
        title: "Acabamento tecnico",
        description: "Galvanizacao, pintura eletrostatica ou pintura sob especificacao conforme ambiente e memorial.",
        icon: ShieldCheck,
    },
    {
        title: "Atendimento nacional",
        description: "Fabrica em Goiania como prova de origem, com atendimento para projetos em todo o Brasil.",
        icon: Truck,
    },
]

const modelOptions = [
    {
        title: "Poste teleconico reto",
        use: "Vias, patios e estacionamentos",
        description:
            "Solucao de geometria objetiva para areas que precisam de poste vertical, compatibilizacao de luminaria e instalacao limpa.",
        image: "/images/produtos/poste-reto-avenida-dia.png",
    },
    {
        title: "Poste teleconico curvo simples",
        use: "Ruas, acessos e calcadas",
        description:
            "Aplicacao indicada quando a luminaria precisa avancar para um lado, ajudando a direcionar a iluminacao sobre a via ou passagem.",
        image: "/images/produtos/poste-curvo-simples-rua-noite.png",
    },
    {
        title: "Poste teleconico curvo duplo",
        use: "Avenidas e canteiros centrais",
        description:
            "Modelo usado quando o projeto pede iluminacao em dois sentidos, especialmente em canteiros, avenidas e areas amplas.",
        image: "/images/produtos/poste-curvo-duplo-avenida-dia.png",
    },
]

const specificationRows = [
    ["Aplicacao", "Iluminacao publica, loteamentos, condominios, estacionamentos, patios e areas urbanas."],
    ["Formato", "Reto, curvo simples ou curvo duplo, conforme luminaria, avanco e area de cobertura."],
    ["Fixacao", "Engastado, flangeado, base e chumbadores conforme projeto civil e condicao de instalacao."],
    ["Acabamento", "Galvanizacao, pintura eletrostatica ou pintura sob especificacao do ambiente."],
    ["Altura", "Definida conforme estudo luminotecnico, local de aplicacao, luminaria e memoriais do projeto."],
    ["Compra", "Orcamento tecnico com modelo, quantidade, cidade/UF, prazo, acabamento e documentos disponiveis."],
]

const decisionRows = [
    ["Reto", "Patios, estacionamentos, condominios e vias", "Quando o projeto pede linha objetiva e luminaria no topo ou em suporte."],
    ["Curvo simples", "Ruas, acessos, calcadas e areas laterais", "Quando o ponto de luz precisa avancar para um unico lado."],
    ["Curvo duplo", "Avenidas, canteiros centrais e vias largas", "Quando o projeto precisa iluminar dois sentidos ou lados opostos."],
    ["Engastado", "Instalacoes com poste embutido no solo", "Quando o projeto civil preve fundacao para engastamento."],
    ["Flangeado", "Bases, lajes, chumbadores e areas com manutencao prevista", "Quando a fixacao precisa de base aparafusada conforme projeto."],
]

const finishOptions = [
    {
        title: "Poste teleconico galvanizado",
        description: "Alternativa para ambientes que exigem maior protecao contra corrosao e durabilidade operacional.",
        icon: ShieldCheck,
    },
    {
        title: "Pintura eletrostatica",
        description: "Acabamento para padronizacao visual, identidade do empreendimento e protecao adicional.",
        icon: Paintbrush,
    },
    {
        title: "Sob especificacao",
        description: "Definicao conforme memorial, ambiente, volume, prazo, luminaria, fixacao e padrao do projeto.",
        icon: FileText,
    },
]

const applicationCards = [
    {
        title: "Iluminacao publica",
        description: "Vias, avenidas, pracas e areas urbanas com necessidade de padrao tecnico e repetibilidade.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Loteamentos",
        description: "Projetos em volume que pedem padronizacao visual, prazo e suporte para especificacao.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Condominios",
        description: "Aplicacoes residenciais e comerciais com combinacao de durabilidade, acabamento e desenho urbano.",
        href: "/postes-metalicos",
        icon: ShieldCheck,
    },
    {
        title: "Areas industriais",
        description: "Patios, galpoes, estacionamentos, acessos e circulacao interna com demanda operacional.",
        href: "/postes-metalicos",
        icon: Factory,
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
        label: "Comparar modelos de postes",
        href: "/postes-metalicos",
        icon: Zap,
    },
    {
        label: "Aplicacao em iluminacao publica",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        label: "Comprar direto da fabrica",
        href: "/fabricante-de-postes-metalicos",
        icon: Factory,
    },
]

const secondaryInternalLinks = [
    ["Fabricante de postes teleconicos", "/fabricante-de-postes-teleconicos"],
    ["Altura de poste para iluminacao publica", "/blog/altura-de-poste-para-iluminacao-publica"],
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Linha Urban", "/produtos/linha-urban"],
    ["Catalogos e downloads", "/downloads"],
    ["Obras realizadas", "/obras"],
]

const faq = [
    {
        question: "O que e um poste teleconico?",
        answer:
            "E um poste metalico com geometria afunilada ao longo da altura, usado em projetos de iluminacao urbana, vias, condominios, loteamentos, pracas, patios e estacionamentos.",
    },
    {
        question: "A B&B trabalha com poste teleconico reto e curvo?",
        answer:
            "Sim. A pagina organiza os modelos reto, curvo simples e curvo duplo para orientar a conversa tecnica antes do orcamento.",
    },
    {
        question: "Qual a diferenca entre poste engastado e flangeado?",
        answer:
            "O engastado e instalado com parte do poste embutida na fundacao. O flangeado utiliza base aparafusada com chumbadores, conforme projeto civil e local de instalacao.",
    },
    {
        question: "A B&B atende somente Goiania e Goias?",
        answer:
            "Nao. A fabrica em Goiania comprova origem e capacidade operacional, mas a estrategia comercial para postes teleconicos e nacional.",
    },
    {
        question: "Quais dados enviar para cotar poste teleconico?",
        answer:
            "Envie modelo desejado, aplicacao, altura aproximada, quantidade, cidade e UF, tipo de fixacao, acabamento, luminaria, prazo e, se houver, desenho ou memorial tecnico.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createProductSchema({
            url: pageUrl,
            name: "Poste Teleconico",
            description: pageDescription,
            image: heroImage,
            category: "Postes metalicos para iluminacao",
            properties: specificationRows.map(([name, value]) => ({ name, value })),
        }),
        createWebPageSchema({
            url: pageUrl,
            name: "Poste Teleconico",
            description: pageDescription,
            mainEntityId: `${pageUrl}#product`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Produtos", item: `${SITE_URL}/produtos` },
            { name: "Poste Teleconico", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#modelos`,
            name: "Modelos de poste teleconico",
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

export default function PosteTeleconicoPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="poste-teleconico-schema" data={getSchema()} />
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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/58 to-industrial-950/8" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/58 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Zap className="size-4 text-accent-premium" aria-hidden="true" />
                            Reto, curvo, flangeado ou engastado
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Poste Teleconico
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Poste teleconico para iluminacao publica, avenidas, pracas, condominios, loteamentos,
                            estacionamentos e areas industriais, com orientacao tecnica para modelo, fixacao, acabamento e
                            orcamento.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de poste teleconico pelo WhatsApp"
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
                        <SectionLabel>Produto tecnico</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Quando usar poste teleconico
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A busca por poste teleconico normalmente ja vem de uma necessidade tecnica: iluminar uma area,
                            manter padrao urbano, atender memoriais, compatibilizar luminarias e definir fixacao antes da
                            compra.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Esta pagina organiza a conversa para compras, engenharia e obras: modelo, aplicacao, fixacao,
                            acabamento, documentos e informacoes minimas para um orcamento tecnico.
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
                        <SectionLabel>Modelos</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Reto, curvo simples e curvo duplo
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A geometria do poste deve seguir o ambiente, o posicionamento da luminaria e o objetivo de
                            iluminacao. A B&B orienta a escolha antes da proposta.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {modelOptions.map((model) => (
                            <div key={model.title} className="border border-white/15 bg-white/5">
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
                        <SectionLabel>Fixacao e escolha</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Como transformar demanda em especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Antes de comparar preco, vale confirmar o tipo de uso, o modelo, a fixacao e o acabamento.
                            Isso reduz retrabalho entre compras, obra e engenharia.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200">
                        {decisionRows.map(([item, use, criterion]) => (
                            <div key={item} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[180px_1fr_1fr]">
                                <div className="bg-industrial-50 px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-600">
                                    {item}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {use}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {criterion}
                                </div>
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
                                <div key={item.title} className="border border-industrial-200 bg-white p-6">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
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
                            Onde o poste teleconico entra no cluster B&B
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Esta pagina aprofunda o produto e distribui o comprador para aplicacoes, fabricante, hub de
                            postes e catalogos.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {applicationCards.map((card) => {
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
                                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                        Ver aplicacao
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
                            Datasheets e desenhos para iniciar a conversa tecnica
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Use os documentos disponiveis como ponto de partida. A confirmacao final de modelo, altura,
                            fixacao e acabamento deve acontecer no orcamento tecnico.
                        </p>
                    </div>
                    <div className="grid gap-3">
                        {downloadLinks.map((file) => (
                            <a
                                key={file.href}
                                href={file.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium"
                            >
                                <span className="inline-flex items-center gap-3">
                                    <Download className="size-5 text-accent-premium" aria-hidden="true" />
                                    {file.title}
                                </span>
                                <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </a>
                        ))}
                        <Link
                            href="/downloads"
                            className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium"
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
                            Duvidas comuns sobre poste teleconico
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas objetivas para compradores que precisam sair da busca generica e chegar a um
                            briefing tecnico.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faq.map((item) => (
                            <details key={item.question} className="group border border-industrial-200 bg-white p-6" open={item === faq[0]}>
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
                            Envie o projeto para cotar poste teleconico
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe aplicacao, modelo, altura aproximada, quantidade, cidade/UF, fixacao, acabamento,
                            luminaria e prazo. A equipe B&B organiza a especificacao para orcamento.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Falar com especialista sobre poste teleconico"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
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
                        <Link key={href} href={href} className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                            <Icon className="size-6 text-accent-dark" aria-hidden="true" />
                            <span className="text-sm font-black uppercase tracking-widest">{label}</span>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="container mx-auto grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
                    {secondaryInternalLinks.map(([label, href]) => (
                        <Link
                            key={href}
                            href={href}
                            className="group flex items-center justify-between gap-4 border border-industrial-200 p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950"
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
