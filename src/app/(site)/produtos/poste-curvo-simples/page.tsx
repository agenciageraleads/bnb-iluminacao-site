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

const pageUrl = "https://bebiluminacao.com.br/produtos/poste-curvo-simples"
const pageDescription =
    "Poste curvo simples para iluminacao publica, ruas, pracas, condominios e estacionamentos. Consulte modelos, fixacao, acabamento e orcamento."
const whatsappMessage =
    "Ola, vim pela pagina de poste curvo simples e quero solicitar um orcamento tecnico."
const heroImage = "/images/produtos/poste-curvo-simples-rua-noite.png"
const productGallery = [
    createSeoImage("posteCurvoSimplesRuaNoite", {
        alt: "Poste curvo simples para rua iluminada com avanco unico",
        title: "Poste curvo simples em rua",
    }),
    createSeoImage("posteCurvoSimplesAvenidaNoite", {
        alt: "Poste curvo simples em avenida com iluminacao noturna",
        title: "Poste curvo simples em avenida",
    }),
    createSeoImage("viaUrbanaPostesCurvos", {
        alt: "Postes metalicos curvos em via urbana com iluminacao noturna",
        title: "Aplicacao urbana do curvo simples",
    }),
    createSeoImage("posteMetalicoCurvoInstaladoViaUrbana", {
        alt: "Poste metalico curvo instalado em via urbana com rede aerea ao fundo",
        title: "Poste curvo instalado",
    }),
]

export const metadata: Metadata = {
    title: {
        absolute: "Poste Curvo Simples Galvanizado | B&B Iluminacao",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Poste Curvo Simples Galvanizado | B&B Iluminacao",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Poste curvo simples para iluminacao publica",
            },
        ],
    },
}

const highlights = [
    {
        title: "Avanco unico",
        description: "Modelo para quando a luminaria precisa avancar para um lado da via, calcada ou area de circulacao.",
        icon: Zap,
    },
    {
        title: "Fixacao definida em projeto",
        description: "Engastado, flangeado, base e chumbadores conforme obra, fundacao e condicao de instalacao.",
        icon: Wrench,
    },
    {
        title: "Acabamento tecnico",
        description: "Galvanizacao, pintura eletrostatica ou acabamento combinado conforme ambiente e memorial.",
        icon: ShieldCheck,
    },
    {
        title: "Atendimento nacional",
        description: "Fabrica em Goiania como prova operacional, com atendimento comercial para todo o Brasil.",
        icon: Truck,
    },
]

const specificationRows = [
    ["Produto", "Poste curvo simples para luminaria com avanco unico, conforme aplicacao e especificacao do projeto."],
    ["Aplicacoes", "Ruas, acessos, pracas, estacionamentos, condominios, loteamentos e iluminacao publica."],
    ["Avanco", "Definido conforme luminaria, area de cobertura, largura da via e memoriais tecnicos disponiveis."],
    ["Fixacao", "Engastado, flangeado, base e chumbadores conforme projeto civil e condicao de instalacao."],
    ["Acabamento", "Galvanizado, pintado ou sob especificacao conforme ambiente, durabilidade esperada e padrao visual."],
    ["Compra", "Orcamento com modelo, altura, avanco, quantidade, cidade/UF, prazo, acabamento e documentos disponiveis."],
]

const comparisonRows = [
    [
        "Curvo simples",
        "Um ponto de avanco para luminaria.",
        "Ruas, acessos, calcadas, estacionamentos e areas que precisam iluminar um lado predominante.",
    ],
    [
        "Curvo duplo",
        "Dois avancos ou dois pontos de iluminacao.",
        "Avenidas, canteiros centrais e areas que precisam iluminar dois sentidos.",
    ],
    [
        "Reto",
        "Poste vertical com luminaria no topo ou suporte dedicado.",
        "Patios, estacionamentos, galpoes e aplicacoes com geometria mais objetiva.",
    ],
]

const useCases = [
    {
        title: "Ruas e acessos",
        description: "Poste curvo simples para direcionar a luminaria sobre a via, acesso ou area de passagem.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Condominios",
        description: "Aplicacoes residenciais e comerciais com necessidade de padrao visual e iluminacao lateral.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Estacionamentos",
        description: "Areas de manobra e circulacao que pedem poste com avanco e compatibilidade com luminaria.",
        href: "/postes-metalicos",
        icon: Ruler,
    },
    {
        title: "Compra tecnica",
        description: "Pagina para alinhar modelo, acabamento, fixacao, quantidade, prazo e cidade de entrega.",
        href: "/fornecedor-de-postes-metalicos",
        icon: ClipboardCheck,
    },
]

const buyingSteps = [
    {
        title: "1. Informar aplicacao",
        description: "Rua, praca, acesso, condominio, estacionamento, loteamento ou area industrial.",
    },
    {
        title: "2. Indicar altura e avanco",
        description: "Use o memorial ou estudo luminotecnico como referencia. Sem isso, a equipe orienta a conversa inicial.",
    },
    {
        title: "3. Definir fixacao",
        description: "Engastado ou flangeado conforme fundacao, base, chumbadores e local de instalacao.",
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
        title: "Datasheet poste curvo simples",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf",
    },
    {
        title: "Datasheet poste reto",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf",
    },
    {
        title: "Datasheet poste curvo duplo",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf",
    },
]

const internalLinks = [
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Suporte para luminaria publica", "/produtos/suporte-para-luminaria-publica"],
    ["Chumbador para poste metalico", "/produtos/chumbador-para-poste-metalico"],
    ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
    ["Fabricante de postes teleconicos", "/fabricante-de-postes-teleconicos"],
    ["Postes metalicos", "/postes-metalicos"],
    ["Catalogos e downloads", "/downloads"],
    ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
]

const faq = [
    {
        question: "O que e um poste curvo simples?",
        answer:
            "E um poste metalico com um unico avanco para luminaria, usado quando o ponto de luz precisa ser projetado para um lado da via, acesso, calcada ou area de circulacao.",
    },
    {
        question: "Qual a diferenca entre poste curvo simples e curvo duplo?",
        answer:
            "O curvo simples direciona a luminaria para um lado. O curvo duplo atende dois sentidos ou lados opostos, comum em avenidas e canteiros centrais.",
    },
    {
        question: "O poste curvo simples pode ser galvanizado?",
        answer:
            "Pode receber acabamento galvanizado quando a especificacao pedir maior protecao contra corrosao. A confirmacao do acabamento deve ocorrer no orcamento tecnico.",
    },
    {
        question: "Quais dados enviar para cotar poste curvo simples?",
        answer:
            "Envie aplicacao, altura aproximada, avanco desejado, quantidade, cidade e UF, tipo de fixacao, acabamento, luminaria, prazo e desenho ou memorial se houver.",
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
            name: "Poste Curvo Simples",
            description: pageDescription,
            image: heroImage,
            category: "Postes metalicos para iluminacao",
            properties: specificationRows.map(([name, value]) => ({ name, value })),
        }),
        createWebPageSchema({
            url: pageUrl,
            name: "Poste Curvo Simples",
            description: pageDescription,
            image: heroImage,
            mainEntityId: `${pageUrl}#product`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Produtos", item: `${SITE_URL}/produtos` },
            { name: "Poste Curvo Simples", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: "Aplicacoes de poste curvo simples",
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

export default function PosteCurvoSimplesPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="poste-curvo-simples-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de poste curvo simples"
                    eventSource="floating_poste_curvo_simples"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/94 via-industrial-950/58 to-industrial-950/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/68 via-industrial-950/12 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Zap className="size-4 text-accent-premium" aria-hidden="true" />
                            Um avanco para luminaria publica
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Poste Curvo Simples
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Poste curvo simples para iluminacao publica, ruas, pracas, condominios, estacionamentos e
                            acessos, com orientacao para altura, avanco, fixacao, acabamento e orcamento tecnico.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de poste curvo simples"
                                eventSource="hero_poste_curvo_simples"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de poste curvo simples pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
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
                        <SectionLabel>Modelo e aplicacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Quando usar poste curvo simples
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            O curvo simples e indicado quando o projeto precisa posicionar a luminaria com avanco para
                            um lado, mantendo o poste em uma borda, calcada, passeio, canteiro lateral ou area de acesso.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A decisao deve considerar altura, avanco, tipo de luminaria, fixacao, acabamento, largura da
                            via e memoriais do projeto. Por isso a cotacao precisa nascer de especificacao tecnica.
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
                            Curvo simples, curvo duplo ou reto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A geometria do poste deve seguir o lado iluminado, o posicionamento da luminaria e a area de
                            cobertura. O modelo errado aumenta retrabalho na obra e na compra.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-white/15">
                        {comparisonRows.map(([model, shape, use]) => (
                            <div key={model} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[190px_1fr_1.2fr]">
                                <div className="bg-white/10 px-5 py-5 text-xs font-black uppercase tracking-widest text-accent-premium">
                                    {model}
                                </div>
                                <div className="px-5 py-5 text-sm font-medium leading-relaxed text-industrial-200">
                                    {shape}
                                </div>
                                <div className="px-5 py-5 text-sm font-medium leading-relaxed text-industrial-200">
                                    {use}
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
                            Onde o curvo simples costuma resolver melhor
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O modelo e especialmente util quando o ponto de instalacao fica lateralizado em relacao a
                            area iluminada.
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
                                        Ver contexto
                                        <ArrowRight className="size-4 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <SeoProductGallery
                title="Galeria de poste curvo simples"
                description="Imagens que mostram o uso do poste curvo simples em rua, avenida e aplicacoes urbanas com avanco de luminaria para um lado."
                images={productGallery}
            />

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Briefing de compra</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Dados minimos para cotar sem retrabalho
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Quanto mais claro o briefing, mais rapido o time comercial consegue separar modelo, fixacao,
                            acabamento e prazo de fornecimento.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {buyingSteps.map((step) => (
                            <div key={step.title} className="border border-industrial-200 bg-white p-6">
                                <div className="mb-5 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
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
                                <div key={item.title} className="border border-industrial-200 p-6">
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

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Downloads</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Datasheets para iniciar a especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Use os materiais como ponto de partida e confirme medidas, avanco e acabamento no orcamento.
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
                            Duvidas sobre poste curvo simples
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
                                Solicite cotacao do poste curvo simples
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Envie aplicacao, altura, avanco, quantidade, cidade/UF, fixacao, acabamento e prazo. Se
                                tiver memorial ou desenho, envie junto para acelerar a proposta.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <WhatsAppLink
                                    message={whatsappMessage}
                                    eventLabel="Solicitar cotacao de poste curvo simples"
                                    eventSource="final_poste_curvo_simples"
                                    className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-accent-premium hover:text-industrial-950"
                                    aria-label="Solicitar cotacao de poste curvo simples pelo WhatsApp"
                                >
                                    <MessageCircle className="size-5" aria-hidden="true" />
                                    Solicitar cotacao
                                </WhatsAppLink>
                                <Link
                                    href="/produtos/poste-curvo-duplo"
                                    className="inline-flex h-14 items-center justify-center gap-3 border border-industrial-300 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:border-industrial-950"
                                >
                                    <Ruler className="size-5" aria-hidden="true" />
                                    Ver curvo duplo
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
