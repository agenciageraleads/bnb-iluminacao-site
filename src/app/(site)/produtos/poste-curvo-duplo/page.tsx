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
    Wrench,
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

const pageUrl = "https://bebiluminacao.com.br/produtos/poste-curvo-duplo"
const pageDescription =
    "Poste curvo duplo para avenidas, canteiros centrais, estacionamentos e iluminacao publica. Veja aplicacoes, fixacao, acabamento e orcamento."
const whatsappMessage =
    "Ola, vim pela pagina de poste curvo duplo e quero solicitar um orcamento tecnico."
const heroImage = "/images/produtos/poste-curvo-duplo-avenida-dia.png"

export const metadata: Metadata = {
    title: {
        absolute: "Poste Curvo Duplo para Iluminacao Publica | B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Poste Curvo Duplo para Iluminacao Publica | B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Poste curvo duplo em avenida com canteiro central",
            },
        ],
    },
}

const highlights = [
    {
        title: "Dois sentidos",
        description: "Modelo para projetos que precisam distribuir luminarias para lados opostos da via ou area.",
        icon: Zap,
    },
    {
        title: "Avenidas e canteiros",
        description: "Aplicacao comum em canteiros centrais, avenidas, estacionamentos amplos e areas de circulacao.",
        icon: Landmark,
    },
    {
        title: "Fixacao sob projeto",
        description: "Engastado, flangeado, base e chumbadores conforme fundacao, memorial e condicao da obra.",
        icon: Wrench,
    },
    {
        title: "Atendimento nacional",
        description: "Fabrica em Goiania como prova operacional, com atendimento comercial para todo o Brasil.",
        icon: Truck,
    },
]

const specificationRows = [
    {
        label: "Produto",
        value: "Poste curvo duplo para duas luminarias ou dois avancos, conforme aplicacao e especificacao do projeto.",
    },
    {
        label: "Aplicacoes",
        value: "Avenidas, canteiros centrais, vias largas, estacionamentos, patios, condominios e iluminacao publica.",
    },
    {
        label: "Avanco",
        value: "Definido conforme luminaria, largura da via, area de cobertura, memoriais tecnicos e estudo luminotecnico.",
    },
    {
        label: "Fixacao",
        value: "Engastado, flangeado, base e chumbadores conforme projeto civil e condicao de instalacao.",
    },
    {
        label: "Acabamento",
        value: "Galvanizado, pintado ou sob especificacao conforme ambiente, durabilidade esperada e padrao visual.",
    },
    {
        label: "Compra",
        value: "Orcamento com modelo, altura, avanco, quantidade, cidade/UF, prazo, acabamento e documentos disponiveis.",
    },
]

const comparisonRows = [
    {
        model: "Curvo duplo",
        shape: "Dois avancos ou dois pontos de luminaria.",
        use: "Avenidas, canteiros centrais, vias largas e areas que precisam iluminar dois sentidos.",
    },
    {
        model: "Curvo simples",
        shape: "Um avanco para luminaria.",
        use: "Ruas, acessos, calcadas, estacionamentos e areas com iluminacao predominante para um lado.",
    },
    {
        model: "Teleconico reto",
        shape: "Poste vertical com luminaria no topo ou suporte dedicado.",
        use: "Patios, estacionamentos, galpoes, condominios e areas com geometria de iluminacao mais objetiva.",
    },
]

const useCases = [
    {
        title: "Canteiros centrais",
        description: "Quando o poste fica no eixo central e precisa atender dois lados da via ou avenida.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Avenidas",
        description: "Projetos com fluxo em sentidos opostos e necessidade de repetibilidade visual e tecnica.",
        href: "/produtos/poste-teleconico",
        icon: Ruler,
    },
    {
        title: "Estacionamentos amplos",
        description: "Areas de manobra e circulacao em que dois pontos de luz reduzem zonas de sombra.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Areas industriais",
        description: "Patios, docas, acessos e circulacao interna com maior exigencia de cobertura luminosa.",
        href: "/fornecedor-de-postes-metalicos",
        icon: Factory,
    },
]

const buyingSteps = [
    {
        title: "1. Informar aplicacao",
        description: "Avenida, canteiro central, estacionamento, patio, condominio, loteamento ou obra publica.",
    },
    {
        title: "2. Indicar altura e avancos",
        description: "Use memorial ou estudo luminotecnico como referencia. Sem isso, a equipe orienta a conversa inicial.",
    },
    {
        title: "3. Definir fixacao",
        description: "Engastado ou flangeado conforme fundacao, base, chumbadores e condicao civil da instalacao.",
    },
    {
        title: "4. Confirmar acabamento",
        description: "Galvanizado, pintado ou combinado conforme ambiente, padrao visual e prazo do projeto.",
    },
]

const finishOptions = [
    {
        title: "Galvanizacao",
        description: "Opcao para ambientes externos e projetos que pedem maior protecao contra corrosao.",
        icon: ShieldCheck,
    },
    {
        title: "Pintura",
        description: "Acabamento para padronizacao visual, cor e identidade do empreendimento.",
        icon: Paintbrush,
    },
    {
        title: "Memorial tecnico",
        description: "Especificacao final conforme projeto, luminaria, fixacao, ambiente e volume.",
        icon: FileText,
    },
]

const downloadLinks = [
    {
        title: "Datasheet poste curvo duplo",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf",
    },
    {
        title: "Desenho tecnico TCD engastado",
        href: "/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-URB-TCD04-E.pdf",
    },
    {
        title: "Desenho tecnico TCD flangeado",
        href: "/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-URB-TCD04-F.pdf",
    },
    {
        title: "Datasheet poste curvo simples",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf",
    },
]

const internalLinks = [
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Postes metalicos", "/postes-metalicos"],
    ["Suporte para luminaria publica", "/produtos/suporte-para-luminaria-publica"],
    ["Chumbador para poste metalico", "/produtos/chumbador-para-poste-metalico"],
    ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
    ["Fabricante de postes teleconicos", "/fabricante-de-postes-teleconicos"],
    ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "O que e um poste curvo duplo?",
        answer:
            "E um poste metalico com dois avancos ou dois pontos para luminarias, usado quando o projeto precisa iluminar lados opostos ou dois sentidos de uma via.",
    },
    {
        question: "Quando usar poste curvo duplo em vez de curvo simples?",
        answer:
            "Use curvo duplo em avenidas, canteiros centrais e areas amplas que precisam de iluminacao para dois lados. O curvo simples atende melhor quando a luminaria avanca para um lado predominante.",
    },
    {
        question: "O poste curvo duplo pode ser galvanizado?",
        answer:
            "Pode receber acabamento galvanizado quando o projeto pedir maior protecao contra corrosao. A confirmacao do acabamento deve ocorrer no orcamento tecnico.",
    },
    {
        question: "Quais dados enviar para cotar poste curvo duplo?",
        answer:
            "Envie aplicacao, altura aproximada, avancos, quantidade, cidade e UF, tipo de fixacao, acabamento, luminaria, prazo e desenho ou memorial se houver.",
    },
    {
        question: "A pagina substitui o projeto luminotecnico?",
        answer:
            "Nao. A pagina orienta a compra e a especificacao inicial. Altura, avanco, luminaria e fixacao devem seguir projeto, memoriais e condicoes da obra.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createProductSchema({
            url: pageUrl,
            name: "Poste Curvo Duplo",
            description: pageDescription,
            image: heroImage,
            category: "Postes metalicos para iluminacao",
            properties: specificationRows.map(({ label, value }) => ({ name: label, value })),
        }),
        createWebPageSchema({
            url: pageUrl,
            name: "Poste Curvo Duplo",
            description: pageDescription,
            image: heroImage,
            mainEntityId: `${pageUrl}#product`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Produtos", item: `${SITE_URL}/produtos` },
            { name: "Poste Curvo Duplo", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: "Aplicacoes de poste curvo duplo",
            items: useCases.map((item) => ({
                name: item.title,
                description: item.description,
                url: item.href,
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

export default function PosteCurvoDuploPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="poste-curvo-duplo-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de poste curvo duplo"
                    eventSource="floating_poste_curvo_duplo"
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-95 md:opacity-100"
                        sizes="100vw"
                        style={{ objectPosition: "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/54 to-industrial-950/8" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/58 via-industrial-950/8 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white rounded-md">
                            <Zap className="size-4 text-accent-premium" aria-hidden="true" />
                            Dois avancos para vias e canteiros
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Poste Curvo Duplo
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-100 md:text-xl">
                            Poste curvo duplo para iluminacao publica, avenidas, canteiros centrais, estacionamentos e
                            areas amplas, com orientacao para altura, avanco, fixacao, acabamento e orcamento tecnico.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de poste curvo duplo"
                                eventSource="hero_poste_curvo_duplo"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar orcamento de poste curvo duplo pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
                            >
                                <Download className="size-5" aria-hidden="true" />
                                Baixar datasheet
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
                        <SectionLabel>Modelo e aplicacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Quando usar poste curvo duplo
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            O curvo duplo e indicado quando o projeto posiciona o poste no eixo de uma via, canteiro
                            central ou area ampla e precisa distribuir luminarias para dois lados.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A decisao deve considerar largura da via, altura, avancos, tipo de luminaria, fixacao,
                            acabamento e memoriais tecnicos. Por isso a cotacao precisa nascer de especificacao.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {specificationRows.map((row) => (
                            <div key={row.label} className="grid border border-industrial-200 md:grid-cols-[180px_1fr] rounded-2xl overflow-hidden">
                                <div className="bg-industrial-50 px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-600">
                                    {row.label}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {row.value}
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
                            Curvo duplo, curvo simples ou reto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A geometria do poste deve seguir o posicionamento da luminaria e a area de cobertura.
                            Separar bem os modelos reduz retrabalho na compra e na obra.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-white/15 rounded-2xl">
                        {comparisonRows.map((row) => (
                            <div key={row.model} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[190px_1fr_1.2fr]">
                                <div className="bg-white/10 px-5 py-5 text-xs font-black uppercase tracking-widest text-accent-premium">
                                    {row.model}
                                </div>
                                <div className="px-5 py-5 text-sm font-medium leading-relaxed text-industrial-200">
                                    {row.shape}
                                </div>
                                <div className="px-5 py-5 text-sm font-medium leading-relaxed text-industrial-200">
                                    {row.use}
                                </div>
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
                            Onde o curvo duplo costuma resolver melhor
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O modelo e especialmente util quando o ponto de instalacao precisa atender dois lados com
                            uma mesma estrutura central.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {useCases.map((card) => {
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
                                    <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-industrial-950">
                                        Ver contexto
                                        <ArrowRight className="size-4 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Briefing de compra</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Dados minimos para cotar sem retrabalho
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Quanto mais claro o briefing, mais rapido o time comercial consegue separar modelo, fixacao,
                            acabamento, desenhos e prazo de fornecimento.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {buyingSteps.map((step) => (
                            <div key={step.title} className="border border-industrial-200 bg-white p-6 rounded-2xl">
                                <div className="mb-5 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
                                    <ClipboardCheck className="size-6" aria-hidden="true" />
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
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Acabamento</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Galvanizado, pintado ou sob especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O acabamento acompanha o ambiente. A B&B orienta a escolha entre galvanizacao, pintura ou
                            combinacao conforme memorial, agressividade do local, padrao visual e prazo.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {finishOptions.map((item) => {
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
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Downloads</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Datasheet e desenhos para iniciar a especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Use os materiais como ponto de partida e confirme medidas, avancos e acabamento no orcamento.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        {downloadLinks.map((download) => (
                            <Link
                                key={download.href}
                                href={download.href}
                                className="group flex items-center justify-between gap-5 border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
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
                            Duvidas sobre poste curvo duplo
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faq.map((item) => (
                            <div key={item.question} className="border border-industrial-200 p-6 rounded-2xl">
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
                                Solicite cotacao do poste curvo duplo
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Envie aplicacao, altura, avancos, quantidade, cidade/UF, fixacao, acabamento e prazo. Se
                                tiver memorial ou desenho, envie junto para acelerar a proposta.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <WhatsAppLink
                                    message={whatsappMessage}
                                    eventLabel="Solicitar cotacao de poste curvo duplo"
                                    eventSource="final_poste_curvo_duplo"
                                    className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-accent-premium hover:text-industrial-950 rounded-lg"
                                    aria-label="Solicitar cotacao de poste curvo duplo pelo WhatsApp"
                                >
                                    <MessageCircle className="size-5" aria-hidden="true" />
                                    Solicitar cotacao
                                </WhatsAppLink>
                                <Link
                                    href="/produtos/poste-curvo-simples"
                                    className="inline-flex h-14 items-center justify-center gap-3 border border-industrial-300 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:border-industrial-950 rounded-lg"
                                >
                                    <Ruler className="size-5" aria-hidden="true" />
                                    Ver curvo simples
                                </Link>
                            </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {internalLinks.map(([label, href]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="group flex items-center justify-between gap-4 border border-industrial-200 bg-white p-5 text-sm font-black uppercase tracking-widest text-industrial-950 transition-colors hover:border-industrial-950 rounded-lg"
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
