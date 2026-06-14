import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    ArrowRight,
    Building2,
    Car,
    ClipboardCheck,
    Download,
    Factory,
    FileText,
    Home,
    Landmark,
    MapPin,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Truck,
    Users,
    Wrench,
    Zap,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { createSeoImage } from "@/lib/seo/images"
import {
    SITE_URL,
    absoluteUrl,
    createBreadcrumbSchema,
    createFactoryOrganizationSchema,
    createFaqSchema,
    createImageSchemas,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/postes-para-condominios"
const pageDescription =
    "Postes para condominios residenciais, horizontais e comerciais com padronizacao visual, suporte tecnico, acabamento e atendimento nacional."
const whatsappMessage =
    "Ola, vim pela pagina de postes para condominios e quero ajuda para especificar modelos, quantidades e orcamento tecnico."
const heroImage = "/images/seo/postes-metalicos/rua-iluminada-poste-curvo.jpg"

export const metadata: Metadata = {
    title: {
        absolute: "Postes para Condominios | Modelos e Orcamento B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Postes para Condominios | Modelos e Orcamento B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Postes metalicos para ruas internas de condominios",
            },
        ],
    },
}

const priorities = [
    {
        title: "Padrao visual",
        description:
            "Ruas, portarias, pracas, estacionamentos e areas comuns precisam manter a mesma linguagem de poste, luminaria e acabamento.",
        icon: Ruler,
    },
    {
        title: "Seguranca e circulacao",
        description:
            "A especificacao deve considerar pedestres, veiculos, acesso de visitantes, garagens, portarias e pontos de maior permanencia.",
        icon: ShieldCheck,
    },
    {
        title: "Manutencao previsivel",
        description:
            "Modelos, fixacao, altura, pintura e galvanizacao devem facilitar reposicao futura e rotina de manutencao do condominio.",
        icon: Wrench,
    },
    {
        title: "Compra orientada",
        description:
            "A B&B ajuda a transformar lista de areas, quantidades e memorias de projeto em cotacao tecnica comparavel.",
        icon: ClipboardCheck,
    },
]

const applicationCards = [
    {
        title: "Ruas internas",
        description:
            "Postes retos, teleconicos ou curvos simples para circulacao de moradores, visitantes e servicos internos.",
        icon: MapPin,
    },
    {
        title: "Portarias e acessos",
        description:
            "Iluminacao de entrada, cancelas, guaritas e acessos exige boa leitura visual e compatibilidade com seguranca patrimonial.",
        icon: Home,
    },
    {
        title: "Estacionamentos",
        description:
            "Postes para vagas, bolsões, garagens externas e patios com foco em visibilidade, circulacao e manutencao.",
        icon: Car,
    },
    {
        title: "Areas de convivencia",
        description:
            "Pracas, jardins, quadras e espacos de lazer podem pedir postes ornamentais, retos ou urbanos.",
        icon: Users,
    },
    {
        title: "Condominios horizontais",
        description:
            "Padronizacao por rua, fase ou setor para manter repetibilidade tecnica e visual em todo o empreendimento.",
        icon: Building2,
    },
    {
        title: "Condominios comerciais",
        description:
            "Acesso, estacionamento, fachada e circulacao interna pedem criterios diferentes de um condominio residencial.",
        icon: Landmark,
    },
]

const decisionRows = [
    [
        "Rua interna",
        "Poste teleconico, reto ou curvo simples",
        "Altura, espacamento, luminaria, padrao visual e circulacao de moradores.",
    ],
    [
        "Portaria",
        "Poste reto, teleconico ou ornamental",
        "Visibilidade, controle de acesso, fachada, cameras, cancelas e seguranca.",
    ],
    [
        "Estacionamento",
        "Poste reto, teleconico ou curvo duplo",
        "Area de cobertura, fluxo de veiculos, vagas, reflexo, manutencao e base.",
    ],
    [
        "Praca interna",
        "Poste ornamental, urbano ou curvo simples",
        "Convivencia, paisagismo, conforto visual, seguranca e identidade do condominio.",
    ],
    [
        "Condominio horizontal",
        "Familia padronizada de postes",
        "Repetibilidade, reposicao futura, acabamento, fases e memoriais de implantacao.",
    ],
    [
        "Area comercial",
        "Poste reto, teleconico ou conjunto com braco",
        "Fachada, acesso de clientes, estacionamento, docas e circulacao compartilhada.",
    ],
]

const processSteps = [
    {
        title: "1. Separe as areas",
        description:
            "Liste ruas internas, portaria, estacionamento, praca, jardim, quadra, fachada e areas tecnicas.",
        icon: MapPin,
    },
    {
        title: "2. Defina o padrao",
        description:
            "Escolha familias de postes, altura, luminaria, braco, cor e acabamento para manter unidade visual.",
        icon: Ruler,
    },
    {
        title: "3. Revise fixacao",
        description:
            "Confirme base, chumbadores, engastamento, fundacao existente e interferencias de obra civil.",
        icon: Wrench,
    },
    {
        title: "4. Planeje compra",
        description:
            "Informe quantidade por area, fase, cidade de entrega, prazo, documentos e necessidade de reposicao futura.",
        icon: Truck,
    },
]

const quoteData = [
    ["Condominio", "Nome, cidade, UF, tipo de empreendimento e responsavel pelo contato."],
    ["Tipo de area", "Rua interna, portaria, estacionamento, praca, jardim, quadra, fachada ou area comercial."],
    ["Quantidade", "Quantidade por area, modelo, fase, setor ou prioridade de instalacao."],
    ["Modelo e altura", "Poste reto, teleconico, curvo simples, curvo duplo, ornamental ou modelo ainda indefinido."],
    ["Luminaria e braco", "Tipo de luminaria, potencia, avanco, suporte, quantidade por poste e padrao desejado."],
    ["Fixacao", "Flangeado, engastado, base com chumbador, fundacao existente ou decisao pendente."],
    ["Acabamento", "Galvanizado, pintado, galvanizado com pintura ou cor padrao do condominio."],
    ["Documentos", "Planta, memorial, fotos, referencia visual, lista de materiais ou projeto luminotecnico."],
]

const relatedPages = [
    {
        title: "Postes metalicos",
        description: "Hub para escolher modelos, aplicacoes, acabamento e caminhos de compra.",
        href: "/postes-metalicos",
        icon: Zap,
    },
    {
        title: "Postes para loteamentos",
        description: "Referencia para ruas internas, empreendimentos por etapa e padronizacao em volume.",
        href: "/postes-para-loteamentos",
        icon: Building2,
    },
    {
        title: "Postes para pracas",
        description: "Caminho para jardins, pracinhas internas, areas de convivencia e paisagismo.",
        href: "/postes-para-pracas",
        icon: Users,
    },
    {
        title: "Postes para estacionamentos",
        description: "Referencia para vagas externas, acessos, visitantes e circulacao noturna.",
        href: "/postes-para-estacionamentos",
        icon: Car,
    },
    {
        title: "Poste flangeado ou engastado",
        description: "Compare fixacao, base, chumbadores e fundacao antes de fechar a proposta.",
        href: "/blog/poste-flangeado-ou-engastado",
        icon: Wrench,
    },
    {
        title: "Poste galvanizado ou pintado",
        description: "Ajuda a decidir durabilidade, acabamento visual e manutencao do condominio.",
        href: "/blog/poste-galvanizado-ou-pintado",
        icon: ShieldCheck,
    },
]

const gallery = [
    createSeoImage("ruaIluminadaPosteCurvo", {
        alt: "Postes metalicos em rua interna de condominio residencial",
        title: "Ruas internas",
    }),
    createSeoImage("pracaIluminadaLuminariaRedonda", {
        alt: "Postes ornamentais para praca e area de convivencia em condominio",
        title: "Areas de convivencia",
    }),
    createSeoImage("estacionamentoHospitalPostes", {
        alt: "Postes metalicos para estacionamento e areas de acesso",
        title: "Estacionamentos",
    }),
    createSeoImage("viaPublicaPostesRetosDoisLados", {
        alt: "Postes metalicos padronizados para vias internas e acessos",
        title: "Acessos e vias",
    }),
]

const internalLinks = [
    ["Postes metalicos", "/postes-metalicos"],
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para pracas", "/postes-para-pracas"],
    ["Postes para estacionamentos", "/postes-para-estacionamentos"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
    ["Fabrica de postes metalicos", "/fabrica-de-postes-metalicos"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Suporte para luminaria publica", "/produtos/suporte-para-luminaria-publica"],
    ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
    ["Chumbador para poste metalico", "/produtos/chumbador-para-poste-metalico"],
    ["Poste galvanizado ou pintado", "/blog/poste-galvanizado-ou-pintado"],
    ["Altura de poste para iluminacao publica", "/blog/altura-de-poste-para-iluminacao-publica"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "A B&B fabrica postes para condominios?",
        answer:
            "Sim. A B&B fabrica postes metalicos para condominios residenciais, horizontais, verticais e comerciais, com atendimento nacional e suporte para organizar a cotacao tecnica.",
    },
    {
        question: "Qual poste usar em condominio?",
        answer:
            "A escolha depende da area: ruas internas, portarias, estacionamentos, pracas, jardins e fachadas podem pedir modelos, alturas, bracos, luminarias, fixacao e acabamento diferentes.",
    },
    {
        question: "Poste para condominio precisa ser galvanizado?",
        answer:
            "Depende do ambiente, durabilidade esperada, exposicao, padrao visual e manutencao. Galvanizacao, pintura ou galvanizado com pintura podem ser avaliados conforme o projeto.",
    },
    {
        question: "A B&B atende administradoras e sindicatos?",
        answer:
            "Sim. O atendimento pode apoiar administradoras, sindicos, construtoras, incorporadoras e equipes de manutencao com briefing, modelos e orcamento.",
    },
    {
        question: "A pagina atende so Goias?",
        answer:
            "Nao. Goiania e Goias comprovam origem fabril, mas a estrategia comercial e nacional para condominios em diferentes regioes do Brasil.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: "Postes para Condominios",
            description: pageDescription,
            image: heroImage,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Postes para Condominios", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: "Aplicacoes de postes para condominios",
            items: applicationCards.map((application) => ({
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

export default function PostesParaCondominiosPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="postes-para-condominios-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de postes para condominios"
                    eventSource="floating_postes_condominios"
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-90 md:opacity-100"
                        sizes="100vw"
                        style={{ objectPosition: "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/58 to-industrial-950/16" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/54 via-industrial-950/8 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex max-w-full items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white">
                            <Home className="size-4 shrink-0 text-accent-premium" aria-hidden="true" />
                            Condominios residenciais, horizontais e comerciais
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl lg:text-7xl">
                            Postes para Condominios
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Postes metalicos para ruas internas, portarias, estacionamentos, fachadas e areas comuns
                            de condominios, com fabricacao propria, suporte tecnico e atendimento nacional.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de postes para condominios"
                                eventSource="hero_postes_condominios"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de postes para condominios pelo WhatsApp"
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
                    {priorities.map((item) => {
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
                        <SectionLabel>Aplicacao em condominios</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            A compra precisa equilibrar visual, seguranca e manutencao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Condominios raramente precisam de um unico poste isolado. A decisao envolve circulacao,
                            areas comuns, portarias, estacionamentos, fachadas, reposicao futura e padrao visual.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A pagina organiza a conversa entre sindico, administradora, construtora, manutencao e
                            fornecedor para chegar a uma cotacao com modelo, altura, fixacao, acabamento e quantidade.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {applicationCards.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.title} className="border border-industrial-200 p-6">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase text-industrial-950">
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
                        <SectionLabel>Escolha por area</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Cada area do condominio pede um criterio de especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Esta tabela ajuda a separar a conversa antes do pedido de preco e evita comparar propostas
                            com escopos diferentes.
                        </p>
                    </div>

                    <div className="overflow-hidden border border-white/15">
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
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Fluxo de compra</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Como preparar uma cotacao para condominio
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Quanto melhor a separacao por area e prioridade, mais objetiva fica a proposta de postes,
                            acessorios e acabamento.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-4">
                        {processSteps.map((step) => {
                            const Icon = step.icon
                            return (
                                <div key={step.title} className="border border-industrial-200 p-6">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase text-industrial-950">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{step.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Dados para cotacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que enviar para cotar postes para condominios
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Se o projeto ainda nao esta fechado, envie fotos e referencias. A primeira resposta pode
                            separar modelos provaveis e apontar o que falta para fechar a proposta.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 bg-white">
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

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Cluster tecnico</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Paginas que ajudam a fechar modelo, fixacao e acabamento
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Condominios conectam uso, visual, manutencao e compra. Estes caminhos mantem o comprador no
                            cluster certo antes do contato comercial.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {relatedPages.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group border border-industrial-200 bg-white p-6 transition-colors hover:border-industrial-950"
                                >
                                    <Icon className="mb-5 size-6 text-accent-dark" aria-hidden="true" />
                                    <h3 className="text-base font-black uppercase text-industrial-950">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{item.description}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                        Ver pagina
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Galeria indexavel</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Referencias visuais para ruas, portarias e areas comuns
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Imagens por contexto ajudam a discutir padrao visual, aplicacao, altura, luminaria e
                            manutencao com menos ambiguidade.
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

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Interlinking P1</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Caminhos relacionados para compradores de condominios
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A pagina de condominios distribui autoridade para aplicacao, fabricante, modelo, acabamento,
                            fixacao e catalogos.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {internalLinks.map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium"
                            >
                                {label}
                                <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas comuns antes de cotar postes para condominios
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas para transformar uma demanda de administracao, obra ou manutencao em briefing
                            tecnico de compra.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faq.map((item) => (
                            <details key={item.question} className="group border border-industrial-200 bg-industrial-50 p-6" open={item === faq[0]}>
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
                            Envie as areas e a lista de postes do condominio
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe tipo de condominio, cidade, areas, quantidade, modelos, altura, luminarias, fixacao,
                            acabamento e prazo. A B&B ajuda a organizar o orcamento tecnico.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados de postes para condominio"
                            eventSource="final_postes_condominios"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados de postes para condominio pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <FileText className="size-5" aria-hidden="true" />
                            Ver catalogos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    <Link href="/postes-para-loteamentos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Building2 className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver postes para loteamentos</span>
                    </Link>
                    <Link href="/fornecedor-de-postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Factory className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Comprar direto de fornecedor</span>
                    </Link>
                    <Link href="/downloads" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <FileText className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Catalogos e desenhos tecnicos</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
