import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    ArrowRight,
    BadgeCheck,
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
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFactoryOrganizationSchema,
    createFaqSchema,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/fabrica-de-postes-metalicos"
const pageDescription =
    "Fabrica de postes metalicos para iluminacao publica, condominios, loteamentos e industrias. Producao propria, acabamento tecnico e suporte para orcamento."
const whatsappMessage =
    "Ola, vim pela pagina de fabrica de postes metalicos e quero solicitar um orcamento tecnico."
const heroImage = "/hero-industrial.jpg"

export const metadata: Metadata = {
    title: {
        absolute: "Fabrica de Postes Metalicos com Entrega Nacional | B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Fabrica de Postes Metalicos com Entrega Nacional | B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Fabrica de postes metalicos B&B Iluminacao",
            },
        ],
    },
}

const processSteps = [
    {
        title: "Leitura do projeto",
        description: "Analise de aplicacao, modelo, altura, quantidade, fixacao, acabamento, cidade de entrega e prazo.",
        icon: ClipboardCheck,
    },
    {
        title: "Preparacao metalica",
        description: "Definicao de materiais, corte, conformacao e componentes conforme a especificacao aprovada.",
        icon: Ruler,
    },
    {
        title: "Solda e montagem",
        description: "Montagem do conjunto metalico, compatibilizando poste, base, bracos, suportes e acessorios.",
        icon: Wrench,
    },
    {
        title: "Acabamento",
        description: "Galvanizacao, pintura eletrostatica ou acabamento sob especificacao do ambiente e memorial.",
        icon: Paintbrush,
    },
    {
        title: "Conferencia",
        description: "Checagem de modelo, acabamento, quantidade, documentacao e condicoes para expedicao.",
        icon: BadgeCheck,
    },
    {
        title: "Expedicao",
        description: "Organizacao de entrega nacional conforme volume, cidade, prazo e condicoes logisticas.",
        icon: Truck,
    },
]

const highlights = [
    {
        title: "Producao propria",
        description: "A fabrica em Goiania comprova origem operacional, sem limitar o atendimento ao mercado local.",
        icon: Factory,
    },
    {
        title: "Suporte tecnico",
        description: "A cotacao considera aplicacao, modelo, fixacao, acabamento, quantidade e documentos do projeto.",
        icon: ClipboardCheck,
    },
    {
        title: "Acabamento industrial",
        description: "Opcoes de protecao e pintura para durabilidade, manutencao e padrao visual.",
        icon: ShieldCheck,
    },
    {
        title: "Atendimento Brasil",
        description: "Goias e prova de fabrica real; a estrategia comercial para postes metalicos e nacional.",
        icon: Truck,
    },
]

const modelCards = [
    {
        title: "Poste teleconico",
        description: "Modelo versatil para vias, loteamentos, condominios, estacionamentos e iluminacao publica.",
        href: "/produtos/poste-teleconico",
        image: "/images/produtos/poste-reto-avenida-dia.png",
    },
    {
        title: "Postes retos e curvos",
        description: "Alternativas para patios, ruas, acessos, avenidas, canteiros centrais e areas operacionais.",
        href: "/postes-metalicos",
        image: "/images/produtos/poste-curvo-simples-rua-noite.png",
    },
    {
        title: "Bracos e suportes",
        description: "Acessorios metalicos para compatibilizar luminarias, postes e necessidades de avanco.",
        href: "/produtos/braco-para-luminaria-publica",
        image: "https://bebiluminacao.com.br/api/media/file/braco-reto-luminaria.png",
    },
]

const qualityRows = [
    ["Projeto", "Modelo, aplicacao, altura, quantidade, cidade/UF, prazo e memoriais quando existirem."],
    ["Estrutura", "Poste, base, braco, suporte, fixacao e componentes definidos conforme necessidade do conjunto."],
    ["Acabamento", "Galvanizacao, pintura eletrostatica ou pintura sob especificacao do ambiente."],
    ["Compatibilidade", "Luminaria, avanco, carga, manutencao, instalacao e leitura visual do projeto."],
    ["Documentos", "Catalogos, datasheets existentes, desenhos tecnicos e briefing de orcamento."],
    ["Entrega", "Expedicao planejada por volume, destino, prazo e condicoes logisticas."],
]

const applications = [
    {
        title: "Iluminacao publica",
        description: "Vias, avenidas, pracas e obras urbanas com repetibilidade tecnica.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Loteamentos",
        description: "Fornecimento padronizado para incorporadoras, construtoras e obras em volume.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Patios e industrias",
        description: "Postes para galpoes, docas, estacionamentos, acessos e circulacao operacional.",
        href: "/postes-metalicos",
        icon: Factory,
    },
    {
        title: "Condominios",
        description: "Projetos residenciais e comerciais com durabilidade, acabamento e padrao visual.",
        href: "/postes-metalicos",
        icon: ShieldCheck,
    },
]

const gallery = [
    {
        src: "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg",
        alt: "Postes metalicos em area industrial iluminada",
        title: "Areas industriais",
    },
    {
        src: "/images/seo/postes-metalicos/via-publica-postes-retos-dois-lados.jpg",
        alt: "Postes metalicos em via publica nos dois sentidos",
        title: "Vias publicas",
    },
    {
        src: "/images/seo/postes-metalicos/praca-iluminada-luminaria-redonda.jpg",
        alt: "Postes metalicos em praca iluminada",
        title: "Pracas e urbanismo",
    },
    {
        src: "/images/servicos/corte-laser.jpg",
        alt: "Processo industrial de corte metalico",
        title: "Processo industrial",
    },
]

const primaryInternalLinks = [
    {
        label: "Fabricante de postes metalicos",
        href: "/fabricante-de-postes-metalicos",
        icon: Factory,
    },
    {
        label: "Fornecedor de postes metalicos",
        href: "/fornecedor-de-postes-metalicos",
        icon: ClipboardCheck,
    },
    {
        label: "Modelos de postes metalicos",
        href: "/postes-metalicos",
        icon: Zap,
    },
    {
        label: "Postes para iluminacao publica",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
]

const secondaryInternalLinks = [
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Postes para pracas", "/postes-para-pracas"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Catalogos e downloads", "/downloads"],
    ["Obras realizadas", "/obras"],
]

const faq = [
    {
        question: "A B&B tem fabrica propria de postes metalicos?",
        answer:
            "Sim. A B&B tem fabrica em Goiania, usada como prova de origem operacional, e atende projetos de postes metalicos em diferentes regioes do Brasil.",
    },
    {
        question: "A fabrica atende somente Goias?",
        answer:
            "Nao. Goiania e Goias sao prova fabril real, mas o objetivo comercial da B&B para postes metalicos e nacional.",
    },
    {
        question: "Quais etapas entram na fabricacao de postes metalicos?",
        answer:
            "A pagina organiza o fluxo em leitura do projeto, preparacao metalica, solda e montagem, acabamento, conferencia e expedicao.",
    },
    {
        question: "A B&B fabrica postes sob medida?",
        answer:
            "A equipe avalia modelo, aplicacao, altura, fixacao, acabamento, quantidade e documentos tecnicos para orientar o orcamento.",
    },
    {
        question: "Quais dados enviar para cotar direto com a fabrica?",
        answer:
            "Envie aplicacao, modelo, altura aproximada, quantidade, cidade e UF, fixacao, acabamento, luminaria, prazo e desenho ou memorial quando houver.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createWebPageSchema({
            url: pageUrl,
            name: "Fabrica de Postes Metalicos",
            description: pageDescription,
            image: heroImage,
        }),
        createFactoryOrganizationSchema(),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Fabrica de Postes Metalicos", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#processo`,
            name: "Processo de fabrica de postes metalicos",
            items: processSteps.map((step) => ({
                name: step.title,
                description: step.description,
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

export default function FabricaDePostesMetalicosPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="fabrica-postes-metalicos-schema" data={getSchema()} />
            <Header />

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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-950/78 to-industrial-950/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto grid gap-12 px-4 pb-20 pt-12 md:pb-28 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Factory className="size-4 text-accent-premium" aria-hidden="true" />
                            Producao propria em Goiania, atendimento nacional
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Fabrica de Postes Metalicos
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Processo fabril para postes metalicos, bracos, suportes e estruturas de iluminacao, com
                            orientacao tecnica para projetos publicos e privados em todo o Brasil.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento direto com a fabrica pelo WhatsApp"
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
                        {processSteps.slice(0, 4).map((step) => {
                            const Icon = step.icon
                            return (
                                <div key={step.title} className="border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
                                    <Icon className="mb-4 size-5 text-accent-premium" aria-hidden="true" />
                                    <h2 className="text-xs font-black uppercase tracking-widest">{step.title}</h2>
                                </div>
                            )
                        })}
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
                        <SectionLabel>Processo fabril</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Da leitura do projeto a expedicao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Uma busca por fabrica de postes metalicos pede prova operacional. A pagina organiza o que
                            precisa ser confirmado antes de comprar: modelo, aplicacao, fixacao, acabamento, quantidade,
                            destino e prazo.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A B&B usa a fabrica em Goiania como origem real, mas trabalha o atendimento em nivel nacional.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {processSteps.map((step) => {
                            const Icon = step.icon
                            return (
                                <div key={step.title} className="border border-industrial-200 bg-white p-6">
                                    <div className="mb-5 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{step.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Modelos fabricados</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Postes, bracos, suportes e estruturas
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A fabrica deve ser avaliada pelo conjunto que consegue orientar e fornecer, nao apenas por
                            uma palavra-chave.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {modelCards.map((model) => (
                            <Link key={model.href} href={model.href} className="group border border-white/15 bg-white/5">
                                <div className="relative aspect-[4/3] bg-industrial-900">
                                    <Image
                                        src={model.image}
                                        alt={model.title}
                                        fill
                                        className={model.image.startsWith("http") ? "object-contain bg-white p-8" : "object-cover"}
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-black uppercase tracking-tight text-white">{model.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-300">{model.description}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-accent-premium">
                                        Ver detalhe
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Controle e conferencia</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que precisa estar claro antes da proposta
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O papel da fabrica e reduzir ambiguidade: transformar demanda comercial em especificacao de
                            produto, acabamento, logistica e documentos.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        {qualityRows.map(([label, value]) => (
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

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Aplicacoes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Para quais obras a fabrica atende
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A producao atende demandas urbanas, privadas e industriais, sempre com especificacao antes
                            do fechamento comercial.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {applications.map((card) => {
                            const Icon = card.icon
                            return (
                                <Link
                                    key={card.title}
                                    href={card.href}
                                    className="group border border-industrial-200 bg-white p-6 transition-colors hover:border-industrial-950"
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

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Prova visual</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Processo, obras e aplicacoes reais
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Enquanto fotos internas especificas da fabrica nao forem aprovadas para publicacao, a pagina
                            usa imagens institucionais, processo industrial e aplicacoes em obra.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-4">
                        {gallery.map((item) => (
                            <div key={item.src} className="border border-industrial-200 bg-white">
                                <div className="relative aspect-[4/3]">
                                    <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(min-width: 768px) 25vw, 100vw" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-industrial-950">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Downloads</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Catalogos, datasheets e briefing de fabrica
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Os documentos ajudam a iniciar a conversa. A proposta final depende de modelo, quantidade,
                            acabamento, destino e informacoes tecnicas do projeto.
                        </p>
                    </div>
                    <div className="grid gap-3">
                        {[
                            ["Datasheet poste reto", "/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf"],
                            ["Datasheet poste curvo simples", "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf"],
                            ["Datasheet poste curvo duplo", "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf"],
                            ["Catalogo geral B&B", "/downloads/catalogo-bb-iluminacao.pdf"],
                        ].map(([label, href]) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium"
                            >
                                <span className="inline-flex items-center gap-3">
                                    <Download className="size-5 text-accent-premium" aria-hidden="true" />
                                    {label}
                                </span>
                                <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas comuns sobre fabrica de postes
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas objetivas para compradores que querem validar se a empresa realmente fabrica.
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
                            Fale direto com a fabrica
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Envie modelo, aplicacao, quantidade, cidade/UF, fixacao, acabamento, luminaria, prazo e
                            documentos tecnicos. A equipe B&B organiza a cotacao.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Falar com a fabrica de postes metalicos"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com a fabrica
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <FileText className="size-5" aria-hidden="true" />
                            Ver documentos
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
                <div className="container mx-auto grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4">
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
