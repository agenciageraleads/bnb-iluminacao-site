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
    Landmark,
    MapPin,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Truck,
    Warehouse,
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

const pageUrl = "https://bebiluminacao.com.br/postes-para-estacionamentos"
const pageDescription =
    "Postes para estacionamentos de condominios, hospitais, industrias, galpoes e areas comerciais com suporte tecnico e atendimento nacional."
const whatsappMessage =
    "Ola, vim pela pagina de postes para estacionamentos e quero ajuda para especificar modelos, quantidades e orcamento tecnico."
const heroImage = "/images/seo/postes-metalicos/estacionamento-externo-postes-metalicos.webp"

export const metadata: Metadata = {
    title: {
        absolute: "Postes para Estacionamentos | Modelos e Orcamento B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Postes para Estacionamentos | Modelos e Orcamento B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Postes metalicos para estacionamento externo iluminado",
            },
        ],
    },
}

const priorities = [
    {
        title: "Cobertura de area",
        description:
            "Estacionamentos exigem avaliar altura, quantidade de pontos, alcance da luminaria, corredores e sombras entre vagas.",
        icon: Ruler,
    },
    {
        title: "Seguranca operacional",
        description:
            "Circulacao de veiculos, pedestres, cameras, acessos e manobras precisam entrar no criterio de especificacao.",
        icon: ShieldCheck,
    },
    {
        title: "Fixacao e base",
        description:
            "Poste flangeado, engastado, base com chumbador e fundacao dependem de piso, carga, altura e obra civil.",
        icon: Wrench,
    },
    {
        title: "Atendimento nacional",
        description:
            "A B&B fabrica postes e orienta modelo, acabamento, braco, luminaria e briefing de compra em todo o Brasil.",
        icon: Factory,
    },
]

const applicationCards = [
    {
        title: "Condominios",
        description:
            "Vagas externas, bolsões, garagens abertas e acessos precisam equilibrar seguranca, visual e manutencao.",
        icon: Building2,
    },
    {
        title: "Hospitais e clinicas",
        description:
            "Fluxo noturno, visitantes, ambulancias e acessibilidade pedem boa visibilidade e baixa ambiguidade de circulacao.",
        icon: Landmark,
    },
    {
        title: "Industrias e galpoes",
        description:
            "Patios, docas, areas de carga e circulacao interna podem pedir postes retos, altos e resistentes.",
        icon: Warehouse,
    },
    {
        title: "Comercio e varejo",
        description:
            "Supermercados, lojas, centros comerciais e fachadas precisam iluminar vagas, acesso e fluxo de clientes.",
        icon: Car,
    },
    {
        title: "Patios logisticos",
        description:
            "Manobra de caminhoes, docas e areas amplas exigem planejamento por altura, base, luminaria e alcance.",
        icon: Truck,
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
        "Estacionamento aberto",
        "Poste reto, teleconico ou curvo simples",
        "Altura, cobertura de vagas, circulacao, ofuscamento, base e manutencao.",
    ],
    [
        "Patio industrial",
        "Poste reto ou teleconico com altura maior",
        "Fluxo de maquinas, caminhoes, docas, carga, piso e resistencia operacional.",
    ],
    [
        "Condominio",
        "Poste reto, teleconico ou curvo simples",
        "Padrao visual, vagas externas, portaria, pedestres e reposicao futura.",
    ],
    [
        "Hospital ou clinica",
        "Poste reto, teleconico ou conjunto com braco",
        "Acessibilidade, ambulancias, visibilidade, cameras, entrada e circulacao noturna.",
    ],
    [
        "Centro comercial",
        "Poste reto, teleconico ou curvo duplo",
        "Fachada, vitrines, fluxo de clientes, seguranca e area de cobertura.",
    ],
    [
        "Area com piso pronto",
        "Poste flangeado ou base com chumbador",
        "Fundacao existente, interferencias, manutencao e compatibilidade com obra civil.",
    ],
]

const processSteps = [
    {
        title: "1. Mapeie a area",
        description:
            "Separe vagas, corredores, acessos, docas, portaria, fachada e pontos criticos de circulacao.",
        icon: MapPin,
    },
    {
        title: "2. Defina altura e alcance",
        description:
            "A escolha do poste depende da luminaria, quantidade de pontos, largura da area e pontos escuros.",
        icon: Ruler,
    },
    {
        title: "3. Revise base e fixacao",
        description:
            "Confirme se a obra permite engastamento, flange, chumbadores, fundacao nova ou base existente.",
        icon: Wrench,
    },
    {
        title: "4. Envie dados para cotacao",
        description:
            "Fotos, planta, memorial, cidade, quantidade, modelo desejado e prazo tornam a proposta comparavel.",
        icon: ClipboardCheck,
    },
]

const quoteData = [
    ["Local", "Nome da obra, empresa, condominio, hospital, loja, industria, cidade, UF e contato responsavel."],
    ["Tipo de area", "Estacionamento aberto, patio, doca, vaga externa, acesso, fachada ou area de carga."],
    ["Quantidade", "Quantidade total e separacao por area, modelo, etapa ou prioridade de instalacao."],
    ["Modelo e altura", "Poste reto, teleconico, curvo simples, curvo duplo ou modelo ainda indefinido."],
    ["Luminaria e braco", "Tipo de luminaria, quantidade por poste, avanco, suporte e orientacao da luz."],
    ["Fixacao", "Flangeado, engastado, base com chumbador, fundacao existente, piso pronto ou decisao pendente."],
    ["Acabamento", "Galvanizado, pintado, galvanizado com pintura ou cor definida pelo empreendimento."],
    ["Documentos", "Planta, memorial, fotos, projeto luminotecnico, desenho, edital ou lista de materiais."],
]

const relatedPages = [
    {
        title: "Postes para condominios",
        description: "Referencia para vagas externas, acessos, portarias e areas comuns.",
        href: "/postes-para-condominios",
        icon: Building2,
    },
    {
        title: "Postes para iluminacao publica",
        description: "Base tecnica para areas abertas, vias, acessos e circulacao urbana.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
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
    createSeoImage("estacionamentoExternoPostesMetalicos", {
        alt: "Postes metalicos retos para estacionamento industrial e patio amplo",
        title: "Patios e industrias",
    }),
    createSeoImage("estacionamentoCobertoPostesRetos", {
        alt: "Postes metalicos retos para estacionamento externo e area coberta",
        title: "Estacionamento coberto",
    }),
    createSeoImage("estacionamentoNoturnoPosteReto", {
        alt: "Poste metalico reto para estacionamento externo durante a noite",
        title: "Estacionamento noturno",
    }),
    createSeoImage("condominioEstacionamentoPosteMetalico", {
        alt: "Poste metalico para estacionamento residencial em condominio",
        title: "Areas residenciais",
    }),
    createSeoImage("estacionamentoShoppingSingapuraPostesCurvos", {
        alt: "Postes metalicos curvos em estacionamento comercial com vagas e paisagismo",
        title: "Comercio e varejo",
    }),
    createSeoImage("estacionamentoOutletPremiumPostesIluminacao", {
        alt: "Postes metalicos para estacionamento amplo de centro comercial",
        title: "Estacionamento amplo",
    }),
    createSeoImage("estacionamentoComercialNoturnoPostesIluminacao", {
        alt: "Postes metalicos iluminando acesso e estacionamento comercial a noite",
        title: "Acesso comercial noturno",
    }),
    createSeoImage("estacionamentoHospitalarNoturnoPostesIluminacao", {
        alt: "Postes metalicos iluminando estacionamento hospitalar durante a noite",
        title: "Estacionamento hospitalar",
    }),
    createSeoImage("areaExternaHospitalarPostesMetalicos", {
        alt: "Postes metalicos em area externa hospitalar com circulacao e acesso",
        title: "Area externa hospitalar",
    }),
]

const internalLinks = [
    ["Postes metalicos", "/postes-metalicos"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para pracas", "/postes-para-pracas"],
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
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "A B&B fabrica postes para estacionamentos?",
        answer:
            "Sim. A B&B fabrica postes metalicos para estacionamentos de condominios, hospitais, industrias, galpoes, centros comerciais e areas abertas, com atendimento nacional.",
    },
    {
        question: "Qual poste usar em estacionamento?",
        answer:
            "A escolha depende da area, altura, luminaria, quantidade de vagas, circulacao de veiculos, pedestres, base, fixacao, acabamento e manutencao.",
    },
    {
        question: "Poste de estacionamento deve ser flangeado?",
        answer:
            "Depende do piso, fundacao, altura, carga e obra civil. Em areas com piso pronto, flange e chumbadores podem facilitar manutencao, mas a decisao precisa ser tecnica.",
    },
    {
        question: "A pagina atende so Goias?",
        answer:
            "Nao. Goiania e Goias comprovam origem fabril, mas a estrategia comercial e nacional para estacionamentos em diferentes regioes do Brasil.",
    },
    {
        question: "O que enviar para orcar postes para estacionamento?",
        answer:
            "Envie cidade, UF, tipo de estacionamento, quantidade, altura, modelo desejado, luminaria, fixacao, acabamento, prazo, fotos, planta ou memorial.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: "Postes para Estacionamentos",
            description: pageDescription,
            image: heroImage,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Postes para Estacionamentos", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: "Aplicacoes de postes para estacionamentos",
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

export default function PostesParaEstacionamentosPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="postes-para-estacionamentos-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de postes para estacionamentos"
                    eventSource="floating_postes_estacionamentos"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/58 to-industrial-950/14" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/54 via-industrial-950/8 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex max-w-full items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white rounded-md">
                            <Car className="size-4 shrink-0 text-accent-premium" aria-hidden="true" />
                            Condominios, hospitais, industrias e areas comerciais
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl lg:text-7xl">
                            Postes para Estacionamentos
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Postes metalicos para estacionamentos, patios, docas, acessos e areas abertas, com suporte
                            tecnico para modelo, altura, fixacao, acabamento e atendimento nacional.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de postes para estacionamentos"
                                eventSource="hero_postes_estacionamentos"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar orcamento de postes para estacionamentos pelo WhatsApp"
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
                        <SectionLabel>Aplicacao em estacionamentos</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Estacionamento precisa iluminar vagas, acessos e circulacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A escolha do poste envolve altura, luminaria, area de cobertura, fluxo de veiculos,
                            pedestres, cameras, base, fundacao, manutencao e acabamento.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A pagina organiza o briefing para condominios, hospitais, industrias, varejo, galpoes e
                            areas comerciais que precisam transformar uma area aberta em cotacao tecnica.
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
                            Cada tipo de estacionamento muda o criterio de especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A tabela ajuda a separar modelo, altura, fixacao e area de cobertura antes do pedido de preco.
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
                            Como preparar uma cotacao para estacionamento
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Quanto mais clara a separacao por area, fluxo e fixacao, mais objetiva fica a proposta.
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
                            O que enviar para cotar postes para estacionamentos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Se o projeto ainda nao esta fechado, fotos, planta e referencia visual ja ajudam a orientar
                            modelos provaveis e lacunas de especificacao.
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
                            Paginas que ajudam a fechar modelo, altura e fixacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Estacionamentos conectam seguranca, circulacao, manutencao, obra civil e iluminacao. Estes
                            caminhos mantem a especificacao dentro do cluster certo.
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
                            Referencias visuais para patios, vagas e acessos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Imagens por contexto reduzem ambiguidade entre estacionamento aberto, patio industrial,
                            area hospitalar e circulacao residencial.
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
                            Caminhos relacionados para compradores de estacionamentos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A pagina de estacionamentos distribui autoridade para aplicacao, fabricante, produto,
                            acabamento, fixacao e catalogos.
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
                            Duvidas comuns antes de cotar postes para estacionamentos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas para transformar uma demanda de obra, manutencao ou ampliacao em briefing tecnico.
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
                            Envie a area ou o projeto do estacionamento
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe cidade, tipo de estacionamento, quantidade, altura, luminaria, fixacao, acabamento e
                            prazo. A B&B ajuda a organizar o orcamento tecnico.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados de postes para estacionamento"
                            eventSource="final_postes_estacionamentos"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Enviar dados de postes para estacionamento pelo WhatsApp"
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
                    <Link href="/postes-para-condominios" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Building2 className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver postes para condominios</span>
                    </Link>
                    <Link href="/produtos/poste-teleconico" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Zap className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver poste teleconico</span>
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
