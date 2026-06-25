import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    ClipboardCheck,
    Download,
    Factory,
    FileText,
    MapPin,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Truck,
} from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { getClientLogos, getPortfolioProjects, getProducts } from "@/lib/data"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFaqSchema,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

export const dynamic = "force-dynamic"

const pageUrl = "https://bebiluminacao.com.br/fabricante-de-postes-metalicos"
const pageDescription =
    "Fabricante de postes metalicos em aco para iluminacao publica, condominios, loteamentos e industrias. Producao propria, acabamento tecnico e entrega nacional."
const whatsappMessage = "Ola, vim pela pagina de fabricante de postes metalicos e quero solicitar um orcamento tecnico."

export const metadata: Metadata = {
    title: {
        absolute: "Fabricante de Postes Metalicos | B&B Iluminacao",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Fabricante de Postes Metalicos | B&B Iluminacao",
        description:
            "Postes metalicos para iluminacao publica, condominios, loteamentos e industrias, com producao propria em Goiania e atendimento nacional.",
        url: pageUrl,
        type: "website",
        images: [
            {
                url: "https://bebiluminacao.com.br/hero-industrial.jpg",
                width: 1200,
                height: 630,
                alt: "Fabricante de postes metalicos B&B Iluminacao",
            },
        ],
    },
}

const models = [
    {
        title: "Poste teleconico",
        description: "Postes teleconicos circulares para iluminacao publica, vias, condominios, patios e areas industriais.",
        href: "/produtos/poste-teleconico",
    },
    {
        title: "Poste curvo duplo",
        description: "Postes para avenidas, canteiros centrais e areas que precisam iluminar dois sentidos.",
        href: "/produtos/poste-curvo-duplo",
    },
    {
        title: "Postes para pracas",
        description: "Postes ornamentais para pracas, jardins, condominios e areas urbanas com exigencia visual.",
        href: "/postes-para-pracas",
    },
    {
        title: "Bracos para luminaria",
        description: "Bracos, suportes e acessorios metalicos para luminarias publicas e projetos de iluminacao.",
        href: "/produtos/braco-para-luminaria-publica",
    },
    {
        title: "Postes para pracas e jardins",
        description: "Postes decorativos que combinam design urbano, eficiencia luminosa e acabamento tecnico.",
        href: "/postes-para-pracas",
    },
    {
        title: "Postes metalicos",
        description: "Postes para sistemas de video monitoramento, seguranca patrimonial e areas controladas.",
        href: "/postes-metalicos",
    },
    {
        title: "Mastros para bandeira",
        description: "Mastros metalicos teleconicos para bandeiras e estruturas institucionais.",
        href: "/lp/mastros-para-bandeira",
    },
]

const applications = [
    "Iluminacao publica",
    "Loteamentos",
    "Condominios",
    "Pracas e parques",
    "Estacionamentos",
    "Galpoes e patios industriais",
    "Avenidas e urbanismo",
    "Projetos especiais sob medida",
]

const technicalRows = [
    ["Material", "Aco carbono e configuracoes conforme especificacao do projeto"],
    ["Acabamento", "Galvanizacao, pintura eletrostatica ou pintura sob especificacao"],
    ["Fixacao", "Modelos engastados, flangeados, bases e chumbadores conforme necessidade"],
    ["Modelos", "Reto, teleconico, curvo simples, curvo duplo, ornamental e acessorios"],
    ["Aplicacoes", "Ambientes publicos, privados, industriais, urbanos e comerciais"],
    ["Documentos", "Catalogos, datasheets, desenhos tecnicos e orientacao de orcamento"],
]

const differentiators = [
    {
        title: "Producao propria",
        description: "A B&B fabrica postes metalicos em Goiania e atende projetos em diferentes regioes do Brasil.",
        icon: Factory,
    },
    {
        title: "Atendimento tecnico",
        description: "O time comercial orienta a escolha do modelo, altura, fixacao, acabamento e aplicacao.",
        icon: ClipboardCheck,
    },
    {
        title: "Entrega nacional",
        description: "A estrategia e nacional: Goias prova origem fabril, mas o mercado alvo e Brasil.",
        icon: Truck,
    },
    {
        title: "Acabamento industrial",
        description: "Opcoes de acabamento para durabilidade, resistencia e compatibilidade visual com o projeto.",
        icon: ShieldCheck,
    },
]

const faq = [
    {
        question: "A B&B fabrica postes metalicos sob medida?",
        answer:
            "Sim. A B&B trabalha com postes metalicos e estruturas para diferentes aplicacoes, avaliando modelo, altura, fixacao, acabamento, quantidade e uso previsto no projeto.",
    },
    {
        question: "A B&B atende somente Goiania e Goias?",
        answer:
            "Nao. A fabrica em Goiania serve como prova de origem e capacidade produtiva, mas a estrategia comercial e de atendimento e nacional.",
    },
    {
        question: "Quais tipos de postes metalicos a B&B fabrica?",
        answer:
            "A linha inclui postes teleconicos, retos, curvos simples, curvos duplos, ornamentais, decorativos, bracos, suportes e estruturas metalicas relacionadas a iluminacao.",
    },
    {
        question: "Os postes podem receber galvanizacao ou pintura eletrostatica?",
        answer:
            "A escolha do acabamento depende do produto, ambiente e especificacao do projeto. A B&B orienta a melhor opcao no momento do orcamento tecnico.",
    },
    {
        question: "Quais informacoes enviar para cotar postes metalicos?",
        answer:
            "Informe produto desejado, altura aproximada, quantidade, cidade e UF, tipo de fixacao, acabamento, aplicacao, prazo e, se houver, desenho ou memorial tecnico.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createWebPageSchema({
            url: pageUrl,
            name: "Fabricante de Postes Metalicos",
            description: pageDescription,
            image: "/hero-industrial.jpg",
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Fabricante de Postes Metalicos", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#modelos`,
            name: "Modelos de postes metalicos fabricados pela B&B",
            items: models.map((model) => ({
                name: model.title,
                url: model.href,
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

export default async function FabricanteDePostesMetalicosPage() {
    const [products, projects, clients] = await Promise.all([
        getProducts(),
        getPortfolioProjects(),
        getClientLogos(),
    ])

    const featuredProducts = products
        .filter((product) => /poste|braco|suporte|mastro/i.test(`${product.name} ${product.model}`))
        .slice(0, 6)
    const featuredProjects = projects.filter((project) => project.image).slice(0, 3)
    const featuredClients = clients.filter((client) => client.logoUrl).slice(0, 7)

    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="fabricante-postes-metalicos-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src="/hero-industrial.jpg"
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-55 md:opacity-65"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/95 via-industrial-950/68 to-industrial-950/24" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/70 via-industrial-950/20 to-industrial-950/5" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Factory className="size-4 text-accent-premium" aria-hidden="true" />
                            Fabrica em Goiania, atendimento nacional
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Fabricante de Postes Metalicos
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Postes metalicos fabricados pela B&B para iluminacao publica, condominios, loteamentos,
                            pracas, estacionamentos e areas industriais, com producao propria em Goiania e atendimento
                            para todo o Brasil.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de postes metalicos pelo WhatsApp"
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
                    {differentiators.map((item) => {
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
                        <SectionLabel>Compra direta com fabricante</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Postes metalicos para projetos que exigem durabilidade e suporte tecnico
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A B&B fabrica postes e estruturas metalicas para projetos publicos e privados. A pagina
                            existe para atender compradores que precisam sair da busca generica e chegar a uma cotacao
                            tecnica: modelo, altura, quantidade, fixacao, acabamento, cidade de entrega e prazo.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A fabrica em Goiania e a prova operacional. A oportunidade comercial e nacional: atender
                            construtoras, prefeituras, industrias, condominios, loteamentos e equipes de engenharia em
                            todo o Brasil.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {models.map((model) => (
                            <Link
                                key={model.title}
                                href={model.href}
                                className="group border border-industrial-200 p-6 transition-colors hover:border-industrial-950"
                            >
                                <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                    {model.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-industrial-600">{model.description}</p>
                                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                    Ver linha
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Aplicacoes nacionais</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Onde os postes metalicos B&B entram
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                A escolha correta depende do ambiente, carga, altura, luminaria, acabamento e tipo de
                                instalacao. A B&B deve ser posicionada como fabricante que ajuda o comprador a
                                especificar antes de vender.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {applications.map((application) => (
                                <div key={application} className="border border-white/10 bg-white/5 p-5">
                                    <CheckCircle2 className="mb-4 size-5 text-accent-premium" aria-hidden="true" />
                                    <h3 className="text-sm font-black uppercase tracking-widest">{application}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Especificacao para orcamento</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Informacoes que aceleram uma cotacao tecnica
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Quanto mais claro o briefing, mais rapido o time comercial consegue orientar o modelo certo
                            para a aplicacao.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200">
                        {technicalRows.map(([label, value]) => (
                            <div key={label} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[240px_1fr]">
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
                                className="inline-flex h-12 items-center justify-center gap-2 border border-industrial-300 px-5 text-xs font-black uppercase tracking-widest text-industrial-800 hover:border-industrial-950"
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
                                    className="group flex min-h-[340px] flex-col border border-industrial-200 bg-white transition-colors hover:border-industrial-950"
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

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Prova real</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Obras, clientes e aplicacoes para sustentar a autoridade nacional
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Concorrentes ranqueiam por terem paginas especificas. A B&B pode superar quando une
                                paginas certas com fotos reais, obras, catalogos e prova de fabricacao.
                            </p>
                            {featuredClients.length > 0 && (
                                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                                    {featuredClients.map((client) => (
                                        <div key={client.name} className="relative h-16 border border-industrial-200 bg-white">
                                            <Image
                                                src={client.logoUrl}
                                                alt={client.name}
                                                fill
                                                className="object-contain p-3 grayscale"
                                                sizes="120px"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {featuredProjects.map((project) => (
                                <div key={project.title} className="border border-industrial-200 bg-white">
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
                                        <p className="mt-2 flex items-center gap-2 text-sm font-bold text-industrial-500">
                                            <MapPin className="size-4" aria-hidden="true" />
                                            {project.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas antes de cotar postes metalicos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Estas respostas ajudam o comprador a enviar as informacoes corretas e reduzem atrito antes
                            do primeiro contato comercial.
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
                            Envie seu projeto para orcamento tecnico
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe produto, altura, quantidade, fixacao, acabamento, cidade/UF e prazo. A equipe B&B
                            orienta o melhor caminho para comprar postes metalicos direto com fabricante.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Solicitar orcamento tecnico pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/contato?assunto=orcamento"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <FileText className="size-5" aria-hidden="true" />
                            Enviar briefing
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-6">
                    <Link href="/fabrica-de-postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Factory className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Fabrica de postes</span>
                    </Link>
                    <Link href="/postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Ruler className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Modelos de postes metalicos</span>
                    </Link>
                    <Link href="/produtos/poste-metalico-galvanizado" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <ShieldCheck className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Poste galvanizado</span>
                    </Link>
                    <Link href="/downloads" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Download className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Catalogos e desenhos tecnicos</span>
                    </Link>
                    <Link href="/obras" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Building2 className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Obras realizadas</span>
                    </Link>
                    <Link href="/blog" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <FileText className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Guias tecnicos</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
