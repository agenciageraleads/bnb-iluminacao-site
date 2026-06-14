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
    Ruler,
    ShieldCheck,
    Truck,
    Wrench,
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
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/fornecedor-de-postes-metalicos"
const pageDescription =
    "Fornecedor de postes metalicos para iluminacao publica, loteamentos, condominios e industrias. Solicite orcamento tecnico direto com a B&B."
const whatsappMessage =
    "Ola, vim pela pagina de fornecedor de postes metalicos e quero solicitar um orcamento tecnico."
const heroImage = "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg"

export const metadata: Metadata = {
    title: {
        absolute: "Fornecedor de Postes Metalicos para Obras e Iluminacao | B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Fornecedor de Postes Metalicos para Obras e Iluminacao | B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Fornecedor de postes metalicos para obras e iluminacao",
            },
        ],
    },
}

const differentiators = [
    {
        title: "Compra direta",
        description: "Contato comercial com quem fabrica e entende a especificacao do poste metalico.",
        icon: Factory,
    },
    {
        title: "Briefing tecnico",
        description: "Modelo, altura, fixacao, acabamento, quantidade, cidade e prazo entram antes da proposta.",
        icon: ClipboardCheck,
    },
    {
        title: "Atendimento nacional",
        description: "A fabrica em Goiania prova origem operacional, mas a demanda atendida e Brasil.",
        icon: Truck,
    },
    {
        title: "Suporte para obra",
        description: "A proposta conversa com compras, engenharia, instalacao e cronograma da obra.",
        icon: ShieldCheck,
    },
]

const supplyOptions = [
    {
        title: "Postes teleconicos",
        description: "Opcoes para vias, loteamentos, condominios, estacionamentos e areas urbanas.",
        href: "/produtos/poste-teleconico",
        icon: Ruler,
    },
    {
        title: "Postes retos e curvos",
        description: "Modelos para ruas, patios, avenidas, acessos, canteiros e iluminacao operacional.",
        href: "/postes-metalicos",
        icon: Landmark,
    },
    {
        title: "Bracos e suportes",
        description: "Acessorios para compatibilizar poste, luminaria, avanco e necessidade de instalacao.",
        href: "/produtos/braco-para-luminaria-publica",
        icon: Wrench,
    },
    {
        title: "Acabamentos",
        description: "Galvanizacao, pintura eletrostatica ou acabamento sob especificacao do projeto.",
        href: "/fabrica-de-postes-metalicos",
        icon: ShieldCheck,
    },
]

const buyerSegments = [
    {
        title: "Construtoras",
        description: "Fornecimento para obras com volume, prazo, padronizacao e documentacao comercial.",
        icon: Building2,
    },
    {
        title: "Prefeituras e obras urbanas",
        description: "Postes para vias, pracas, avenidas e iluminacao publica com especificacao tecnica.",
        icon: Landmark,
    },
    {
        title: "Industrias e patios",
        description: "Postes para galpoes, docas, estacionamentos, acessos e circulacao interna.",
        icon: Factory,
    },
    {
        title: "Condominios e loteamentos",
        description: "Padrao visual, repetibilidade de fornecimento e apoio para escolha do modelo.",
        icon: ShieldCheck,
    },
]

const quoteChecklist = [
    ["Aplicacao", "Iluminacao publica, loteamento, condominio, patio, estacionamento, praca ou area industrial."],
    ["Modelo", "Teleconico, reto, curvo simples, curvo duplo, ornamental, braco ou suporte."],
    ["Dimensoes", "Altura aproximada, avanco da luminaria, quantidade e observacoes do memorial tecnico."],
    ["Fixacao", "Engastado, flangeado, base, chumbadores ou necessidade de compatibilizacao em obra."],
    ["Acabamento", "Galvanizacao, pintura eletrostatica, cor, ambiente de instalacao e exigencia visual."],
    ["Entrega", "Cidade, UF, prazo desejado, volume e condicoes de descarga ou logistica."],
]

const comparisonRows = [
    ["Fornecedor direto", "Ajuda a especificar e cotar o conjunto certo", "Compras tecnicas, obras e volume"],
    ["Revenda generica", "Normalmente vende item padrao sem ajustar aplicacao", "Reposicao simples ou demanda baixa"],
    ["Fabricante", "Produz e orienta modelo, acabamento, fixacao e prazo", "Projetos que precisam suporte tecnico"],
    ["Catalogo isolado", "Mostra produto, mas nao resolve briefing de obra", "Pesquisa inicial de modelos"],
]

const internalLinks = [
    ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
    ["Fabrica de postes metalicos", "/fabrica-de-postes-metalicos"],
    ["Postes metalicos", "/postes-metalicos"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Catalogos e downloads", "/downloads"],
    ["Contato", "/contato"],
]

const faq = [
    {
        question: "A B&B e fornecedora de postes metalicos para todo o Brasil?",
        answer:
            "Sim. A fabrica em Goiania comprova origem operacional, mas a B&B atende demandas de postes metalicos em diferentes regioes do Brasil.",
    },
    {
        question: "Qual a diferenca entre fornecedor, fabricante e revenda?",
        answer:
            "Fornecedor e quem atende a compra e organiza a proposta. Fabricante produz e orienta tecnicamente. Revenda geralmente intermedia itens prontos, com menor controle sobre especificacao e prazo.",
    },
    {
        question: "Quais informacoes enviar para solicitar orcamento?",
        answer:
            "Envie aplicacao, modelo, altura, quantidade, cidade e UF, tipo de fixacao, acabamento, prazo e desenhos ou memoriais quando existirem.",
    },
    {
        question: "A B&B fornece postes para iluminacao publica?",
        answer:
            "Sim. A B&B atende projetos de iluminacao publica, loteamentos, condominios, vias, pracas, estacionamentos e areas industriais.",
    },
    {
        question: "Consigo comprar poste metalico direto da fabrica?",
        answer:
            "A B&B orienta compras diretas conforme escopo, quantidade, especificacao, prazo e condicoes comerciais do projeto.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createWebPageSchema({
            url: pageUrl,
            name: "Fornecedor de Postes Metalicos",
            description: pageDescription,
            image: heroImage,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Fornecedor de Postes Metalicos", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#fornecimento`,
            name: "Opcoes de fornecimento de postes metalicos",
            items: supplyOptions.map((item) => ({
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

export default function FornecedorDePostesMetalicosPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="fornecedor-postes-metalicos-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Fornecedor de postes metalicos"
                    eventSource="floating_fornecedor_postes"
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-80"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/94 via-industrial-950/70 to-industrial-950/18" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/70 via-industrial-950/15 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto grid gap-12 px-4 pb-20 pt-12 md:pb-28 lg:grid-cols-[1fr_0.72fr] lg:items-end">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Truck className="size-4 text-accent-premium" aria-hidden="true" />
                            Compra tecnica, atendimento nacional
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Fornecedor de Postes Metalicos
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            A B&B atende compras de postes metalicos para iluminacao publica, loteamentos, condominios,
                            industrias e obras privadas, com producao propria, suporte tecnico e cotacao orientada por
                            aplicacao, prazo e volume.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento fornecedor"
                                eventSource="hero_fornecedor_postes"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de fornecedor de postes metalicos pelo WhatsApp"
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

                    <div className="grid gap-3 sm:grid-cols-2">
                        {differentiators.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.title} className="border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
                                    <Icon className="mb-4 size-5 text-accent-premium" aria-hidden="true" />
                                    <h2 className="text-xs font-black uppercase tracking-widest">{item.title}</h2>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-200">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-industrial-50 py-8">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-4">
                    {buyerSegments.map((segment) => {
                        const Icon = segment.icon
                        return (
                            <div key={segment.title} className="flex items-start gap-4 bg-white p-5">
                                <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium">
                                    <Icon className="size-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-widest">{segment.title}</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-industrial-600">{segment.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div className="space-y-6">
                        <SectionLabel>Compra e fornecimento</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Fornecedor para quem precisa cotar com criterio tecnico
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Quem busca fornecedor de postes metalicos normalmente nao quer apenas uma lista de produtos.
                            Precisa comparar prazo, quantidade, aplicacao, acabamento, documentacao e confiabilidade de
                            entrega.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A pagina posiciona a B&B para compras B2B: uma fabrica real como prova operacional, mas com
                            atendimento nacional para construtoras, prefeituras, industrias, condominios e loteamentos.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {supplyOptions.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group border border-industrial-200 p-6 transition-colors hover:border-industrial-950"
                                >
                                    <div className="mb-5 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{item.description}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                        Ver detalhe
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Fornecedor direto ou revenda</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que muda na hora de comprar poste metalico
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                A diferenca comercial aparece antes do preco: quem entende o projeto reduz erro de modelo,
                                acabamento, fixacao, quantidade e prazo.
                            </p>
                        </div>
                        <div className="overflow-hidden border border-white/15">
                            {comparisonRows.map(([type, role, fit]) => (
                                <div key={type} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[190px_1fr_0.8fr]">
                                    <div className="bg-white/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                                        {type}
                                    </div>
                                    <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                        {role}
                                    </div>
                                    <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                        {fit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Briefing de cotacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Informacoes que aceleram o orcamento
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Uma cotacao boa depende de contexto. Envie os dados abaixo para o time comercial orientar
                            modelo, acabamento, fixacao e prazo com menos retrabalho.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        {quoteChecklist.map(([label, value]) => (
                            <div key={label} className="grid border border-industrial-200 md:grid-cols-[190px_1fr]">
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
                        <SectionLabel>Links tecnicos</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Continue a especificacao por produto ou aplicacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A pagina de fornecedor conecta a busca comercial com paginas tecnicas da B&B, sem depender de
                            paginas regionais ou conteudo fino.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {internalLinks.map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="group border border-industrial-200 bg-white p-6 transition-colors hover:border-industrial-950"
                            >
                                <h3 className="text-sm font-black uppercase tracking-widest text-industrial-950">{label}</h3>
                                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                    Acessar
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr]">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas antes de escolher fornecedor
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Estas respostas ajudam compras e engenharia a diferenciar busca generica de cotacao tecnica.
                        </p>
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

            <section className="bg-accent-premium py-16 text-industrial-950">
                <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div className="max-w-3xl">
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-industrial-700">
                            Cotacao tecnica
                        </p>
                        <h2 className="mt-3 text-3xl font-black uppercase leading-tight md:text-5xl">
                            Precisa de fornecedor para obra ou compra recorrente?
                        </h2>
                        <p className="mt-5 text-base font-semibold leading-relaxed text-industrial-800">
                            Envie aplicacao, quantidade, cidade de entrega e prazo. A equipe da B&B orienta o proximo
                            passo da proposta.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="CTA final fornecedor"
                            eventSource="final_fornecedor_postes"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Falar com fornecedor de postes metalicos pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-industrial-950 hover:text-white"
                        >
                            <FileText className="size-5" aria-hidden="true" />
                            Ver catalogos
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
