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
    Flower2,
    Landmark,
    MapPin,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Trees,
    Truck,
    Users,
    Wrench,
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

const pageUrl = "https://bebiluminacao.com.br/postes-para-pracas"
const pageDescription =
    "Postes para pracas, parques, jardins e areas de convivencia com modelos urbanos, ornamentais, acabamento e atendimento nacional."
const whatsappMessage =
    "Ola, vim pela pagina de postes para pracas e quero ajuda para especificar modelos, quantidades e orcamento tecnico."
const heroImage = "/images/seo/iluminacao-publica/praca-iluminada-postes-jardim.webp"

export const metadata: Metadata = {
    title: {
        absolute: "Postes para Pracas | Modelos Urbanos e Orcamento B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Postes para Pracas | Modelos Urbanos e Orcamento B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Postes metalicos para praca, jardim e area de convivencia iluminada",
            },
        ],
    },
}

const priorities = [
    {
        title: "Conforto visual",
        description:
            "Pracas pedem iluminacao agradavel, segura e coerente com paisagismo, mobiliario urbano e circulacao de pessoas.",
        icon: Flower2,
    },
    {
        title: "Seguranca urbana",
        description:
            "A especificacao deve considerar permanencia noturna, visibilidade, caminhos, bancos, playgrounds e travessias.",
        icon: ShieldCheck,
    },
    {
        title: "Modelo certo",
        description:
            "Postes ornamentais, retos, teleconicos ou curvos podem fazer sentido conforme area, altura e identidade visual.",
        icon: Ruler,
    },
    {
        title: "Origem fabril",
        description:
            "A B&B fabrica postes e orienta acabamento, fixacao, bracos, luminarias e briefing de compra em todo o Brasil.",
        icon: Factory,
    },
]

const applicationCards = [
    {
        title: "Pracas publicas",
        description:
            "Postes urbanos ou ornamentais para areas abertas, circulacao de pedestres, bancos, jardins e convivencia.",
        icon: Landmark,
    },
    {
        title: "Parques e jardins",
        description:
            "Modelos que precisam dialogar com paisagismo, caminhos, areas verdes e manutencao recorrente.",
        icon: Trees,
    },
    {
        title: "Areas de lazer",
        description:
            "Quadras, playgrounds, academias ao ar livre e areas de permanencia pedem criterios de seguranca e conforto.",
        icon: Users,
    },
    {
        title: "Condominios e loteamentos",
        description:
            "Pracas internas precisam manter padrao visual com ruas, portarias, acessos e areas comuns do empreendimento.",
        icon: Building2,
    },
    {
        title: "Centros urbanos",
        description:
            "Calçadas, canteiros, praças secas e areas comerciais exigem resistencia, manutencao e boa leitura visual.",
        icon: MapPin,
    },
    {
        title: "Compra sob projeto",
        description:
            "Quando existe memorial, o orcamento deve partir de desenhos, altura, luminaria, acabamento e fixacao.",
        icon: FileText,
    },
]

const decisionRows = [
    [
        "Praca publica",
        "Poste ornamental, urbano ou teleconico",
        "Paisagismo, seguranca, vandalismo, manutencao, altura e distribuicao da luz.",
    ],
    [
        "Caminho de pedestres",
        "Poste baixo, urbano ou ornamental",
        "Conforto visual, continuidade da rota, pontos escuros e interferencia com arvores.",
    ],
    [
        "Area de lazer",
        "Poste reto, curvo ou conjunto com braco",
        "Uso noturno, quadra, playground, bancos, fluxo de pessoas e orientacao da luminaria.",
    ],
    [
        "Jardim ou paisagismo",
        "Poste ornamental ou decorativo",
        "Identidade visual, proporcao, cor, acabamento e manutencao da area verde.",
    ],
    [
        "Praca de loteamento",
        "Familia padronizada com ruas internas",
        "Repetibilidade, acabamento, reposicao futura e compatibilidade com o empreendimento.",
    ],
    [
        "Area comercial aberta",
        "Poste reto, teleconico ou urbano",
        "Fachadas, vitrines, estacionamento, circulacao e seguranca patrimonial.",
    ],
]

const processSteps = [
    {
        title: "1. Defina a area",
        description:
            "Separe praca, jardim, parque, caminho, area de lazer, quadra, estacionamento ou canteiro.",
        icon: MapPin,
    },
    {
        title: "2. Escolha o efeito visual",
        description:
            "A decisao nao e so tecnica: modelo, altura, luminaria e cor precisam conversar com o ambiente.",
        icon: Flower2,
    },
    {
        title: "3. Revise fixacao",
        description:
            "Confirme base, chumbadores, engastamento, fundacao, piso, jardins e interferencias no local.",
        icon: Wrench,
    },
    {
        title: "4. Envie memorial ou fotos",
        description:
            "Projeto, planta, referencia visual e fotos ajudam a transformar a demanda em orcamento comparavel.",
        icon: ClipboardCheck,
    },
]

const quoteData = [
    ["Local", "Nome da praca, parque, condominio, loteamento, cidade, UF e responsavel pelo contato."],
    ["Tipo de area", "Praca publica, jardim, parque, caminho, area de lazer, quadra, canteiro ou area comercial."],
    ["Quantidade", "Quantidade total e separacao por area, modelo, fase ou prioridade de instalacao."],
    ["Modelo e altura", "Poste ornamental, reto, teleconico, curvo simples, curvo duplo ou modelo indefinido."],
    ["Luminaria e braco", "Tipo de luminaria, quantidade por poste, orientacao da luz, avanco e suporte desejado."],
    ["Fixacao", "Flangeado, engastado, base com chumbador, fundacao existente, piso pronto ou decisao pendente."],
    ["Acabamento", "Galvanizado, pintado, galvanizado com pintura ou cor definida pelo projeto urbano/paisagistico."],
    ["Documentos", "Memorial, planta, desenho, fotos, referencia visual, edital ou projeto luminotecnico."],
]

const relatedPages = [
    {
        title: "Postes para iluminacao publica",
        description: "Base para vias, pracas, parques, areas institucionais e obras urbanas.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Postes para condominios",
        description: "Referencia para pracas internas, jardins, portarias e areas comuns.",
        href: "/postes-para-condominios",
        icon: Building2,
    },
    {
        title: "Postes para estacionamentos",
        description: "Caminho para vagas, acessos e areas abertas proximas a pracas e convivencia.",
        href: "/postes-para-estacionamentos",
        icon: Truck,
    },
    {
        title: "Poste flangeado ou engastado",
        description: "Compare fixacao, base, chumbadores e fundacao antes da proposta.",
        href: "/blog/poste-flangeado-ou-engastado",
        icon: Wrench,
    },
    {
        title: "Poste galvanizado ou pintado",
        description: "Ajuda a decidir durabilidade, acabamento visual e manutencao.",
        href: "/blog/poste-galvanizado-ou-pintado",
        icon: ShieldCheck,
    },
]

const gallery = [
    createSeoImage("pracaIluminadaPostesJardim", {
        alt: "Postes metalicos para praca e area de convivencia",
        title: "Pracas e convivencia",
    }),
    createSeoImage("pracaPublicaPostesIluminacaoDia", {
        alt: "Postes para praca publica, caminhos e areas de lazer",
        title: "Praca publica",
    }),
    createSeoImage("pracaBelaVistaPostesOrnamentais", {
        alt: "Postes ornamentais em praca ajardinada com circulacao urbana",
        title: "Praca ajardinada",
    }),
    createSeoImage("pracaEstacaoFerroviariaPosteUrbano", {
        alt: "Poste urbano em caminho de praca com area aberta para pedestres",
        title: "Caminhos e calçadas",
    }),
    createSeoImage("pracaGoiatubaIluminacaoNoturna", {
        alt: "Praca iluminada a noite com postes em area de convivencia",
        title: "Iluminacao noturna",
    }),
    createSeoImage("quadraAreiaIluminadaPostes", {
        alt: "Postes para area de lazer com quadra de areia iluminada",
        title: "Areas de lazer",
    }),
    createSeoImage("quadraPoliesportivaPostes", {
        alt: "Postes para quadra poliesportiva e convivencia em areas publicas",
        title: "Quadra e convivencia",
    }),
]

const internalLinks = [
    ["Postes metalicos", "/postes-metalicos"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para estacionamentos", "/postes-para-estacionamentos"],
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
    ["Normas para postes de iluminacao", "/blog/normas-para-postes-de-iluminacao"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "A B&B fabrica postes para pracas?",
        answer:
            "Sim. A B&B fabrica postes metalicos para pracas, parques, jardins, areas de lazer e convivencia, com atendimento nacional e suporte para organizar a cotacao tecnica.",
    },
    {
        question: "Qual modelo de poste usar em praca?",
        answer:
            "Depende da area, altura desejada, luminaria, paisagismo, fluxo de pessoas, seguranca, acabamento e fixacao. Postes ornamentais, retos, teleconicos e curvos podem ser avaliados conforme o projeto.",
    },
    {
        question: "Poste ornamental serve para praca publica?",
        answer:
            "Pode servir quando o projeto pede identidade visual e compatibilidade com paisagismo, mas a escolha deve considerar resistencia, manutencao, luminaria, fundacao e ambiente.",
    },
    {
        question: "A B&B atende projetos de pracas em todo o Brasil?",
        answer:
            "Sim. Goiania e Goias comprovam origem fabril, mas a estrategia comercial e nacional para obras urbanas, condominios, loteamentos e areas publicas.",
    },
    {
        question: "O que enviar para orcar postes para praca?",
        answer:
            "Envie cidade, UF, quantidade, area de aplicacao, altura, modelo desejado, luminaria, fixacao, acabamento, prazo, fotos, planta, memorial ou referencia visual.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: "Postes para Pracas",
            description: pageDescription,
            image: heroImage,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Postes para Pracas", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: "Aplicacoes de postes para pracas",
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

export default function PostesParaPracasPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="postes-para-pracas-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de postes para pracas"
                    eventSource="floating_postes_pracas"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/90 via-industrial-950/56 to-industrial-950/14" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/54 via-industrial-950/8 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex max-w-full items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white rounded-md">
                            <Flower2 className="size-4 shrink-0 text-accent-premium" aria-hidden="true" />
                            Pracas, parques, jardins e areas de convivencia
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl lg:text-7xl">
                            Postes para Pracas
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Postes metalicos para pracas, parques, jardins, caminhos e areas de convivencia, com
                            modelos urbanos ou ornamentais, fabricacao propria e atendimento nacional.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de postes para pracas"
                                eventSource="hero_postes_pracas"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar orcamento de postes para pracas pelo WhatsApp"
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
                    {priorities.map((item) => {
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
                        <SectionLabel>Aplicacao em pracas</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Praca precisa iluminar circulacao, permanencia e paisagismo
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A escolha do poste para praca envolve conforto visual, seguranca, distribuicao da luz,
                            resistencia, manutencao, fundacao, interferencia com arvores e identidade urbana.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A pagina organiza o briefing para prefeituras, construtoras, condominios, loteadoras e
                            equipes de engenharia que precisam transformar uma area aberta em cotacao tecnica.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {applicationCards.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.title} className="border border-industrial-200 p-6 rounded-2xl">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
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
                        <SectionLabel>Escolha por contexto</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Cada trecho da praca pede um criterio diferente
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A tabela ajuda a separar modelo, aplicacao e criterio tecnico antes do pedido de preco.
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
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Fluxo de compra</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Como preparar uma cotacao para praca
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Quanto mais clara a separacao por area e efeito visual, mais objetiva fica a proposta de
                            poste, luminaria, acabamento e fixacao.
                        </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {processSteps.map((step) => {
                            const Icon = step.icon
                            return (
                                <div key={step.title} className="border border-industrial-200 p-6 rounded-2xl">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
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
                            O que enviar para cotar postes para pracas
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Se ainda nao existe projeto completo, fotos e referencias ja ajudam a orientar modelos
                            provaveis e lacunas de especificacao.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 bg-white rounded-2xl">
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
                            Paginas que ajudam a fechar modelo, acabamento e fixacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Pracas conectam paisagismo, iluminacao publica, modelo ornamental, manutencao e obra civil.
                            Estes caminhos mantem a especificacao dentro do cluster certo.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {relatedPages.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group border border-industrial-200 bg-white p-6 transition-colors hover:border-industrial-950 rounded-2xl"
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
                            Referencias visuais para pracas, jardins e caminhos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Imagens por contexto reduzem ambiguidade entre poste ornamental, urbano, reto, curvo e
                            aplicacoes de convivencia.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-4">
                        {gallery.map((image) => (
                            <div key={image.src} className="border border-industrial-200 bg-white rounded-2xl">
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
                            Caminhos relacionados para compradores de pracas
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A pagina de pracas distribui autoridade para aplicacao publica, loteamentos, condominios,
                            produto, acabamento, fixacao e catalogos.
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

            <section className="bg-white py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas comuns antes de cotar postes para pracas
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas para transformar uma demanda urbana, paisagistica ou condominial em briefing
                            tecnico de compra.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faq.map((item) => (
                            <details key={item.question} className="group border border-industrial-200 bg-industrial-50 p-6 rounded-2xl" open={item === faq[0]}>
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
                            Envie o projeto ou fotos da praca
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe cidade, area de aplicacao, quantidade, modelo desejado, altura, luminaria, fixacao,
                            acabamento e prazo. A B&B ajuda a organizar o orcamento tecnico.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados de postes para praca"
                            eventSource="final_postes_pracas"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Enviar dados de postes para praca pelo WhatsApp"
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
                    <Link href="/postes-para-iluminacao-publica" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Landmark className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver iluminacao publica</span>
                    </Link>
                    <Link href="/postes-para-condominios" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Building2 className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver postes para condominios</span>
                    </Link>
                    <Link href="/downloads" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <FileText className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Catalogos e desenhos tecnicos</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
