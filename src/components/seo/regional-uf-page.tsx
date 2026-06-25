import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
    ArrowRight,
    Building2,
    ClipboardCheck,
    Download,
    Factory,
    FileText,
    Landmark,
    MapPin,
    MessageCircle,
    PackageCheck,
    ShieldCheck,
    Truck,
    Wrench,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { createSeoImage } from "@/lib/seo/images"
import type { RegionalUfPageData } from "@/lib/seo/regional-ufs"
import {
    SITE_URL,
    absoluteUrl,
    createBreadcrumbSchema,
    createFaqSchema,
    createImageSchemas,
    createItemListSchema,
    createNationalOrganizationSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

interface RegionalUfPageProps {
    data: RegionalUfPageData
}

interface IconCard {
    title: string
    description: string
    icon: LucideIcon
}

const quoteData = [
    ["Cidade e UF", "Informe a cidade de entrega e confirme que a compra sera faturada para o estado correto."],
    ["Aplicacao", "Via, praca, loteamento, condominio, estacionamento, industria, patio ou area especial."],
    ["Modelo", "Poste reto, teleconico, curvo simples, curvo duplo, ornamental, braco ou suporte."],
    ["Altura e quantidade", "Altura desejada, quantidade por modelo e, se houver, separacao por etapa."],
    ["Fixacao", "Engastado, flangeado, base com chumbador ou definicao pendente pelo projeto civil."],
    ["Acabamento", "Galvanizado, pintado, galvanizado com pintura ou padrao visual do memorial."],
    ["Prazo desejado", "Data alvo da obra para o time comercial avaliar producao, frete e rota."],
    ["Anexos", "Memorial, desenho, foto, planta, lista de materiais ou referencia visual."],
]

const applicationCards: IconCard[] = [
    {
        title: "Iluminacao publica",
        description: "Vias, avenidas, pracas, acessos e areas urbanas com necessidade de especificacao tecnica.",
        icon: Landmark,
    },
    {
        title: "Loteamentos",
        description: "Padronizacao de postes, alturas, acabamento e fornecimento por etapa de obra.",
        icon: MapPin,
    },
    {
        title: "Condominios",
        description: "Ruas internas, portarias, estacionamentos e areas comuns com padrao visual consistente.",
        icon: Building2,
    },
    {
        title: "Estacionamentos",
        description: "Vagas externas, patios, acessos e circulacao com foco em seguranca e manutencao.",
        icon: PackageCheck,
    },
    {
        title: "Areas industriais",
        description: "Galpoes, docas, patios logisticos, circulacao operacional e areas externas amplas.",
        icon: Factory,
    },
    {
        title: "Compra sob projeto",
        description: "Orcamento orientado por memorial, desenho, lista de materiais e dados de entrega.",
        icon: FileText,
    },
]

const proofCards: IconCard[] = [
    {
        title: "Origem fabril real",
        description: "A fabrica em Goiania comprova origem produtiva sem criar promessa de presenca local artificial.",
        icon: Factory,
    },
    {
        title: "Atendimento nacional",
        description: "O time comercial organiza modelo, altura, acabamento, fixacao, volume e cidade de entrega.",
        icon: Truck,
    },
    {
        title: "Compra tecnica",
        description: "A proposta depende de aplicacao, memorial, quantidade, acabamento e condicao logistica.",
        icon: ClipboardCheck,
    },
    {
        title: "Sem promessa artificial",
        description: "Frete e prazo sao confirmados no orcamento, conforme rota, volume e necessidade do projeto.",
        icon: ShieldCheck,
    },
]

const relatedLinks = [
    ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
    ["Fabrica de postes metalicos", "/fabrica-de-postes-metalicos"],
    ["Postes metalicos", "/postes-metalicos"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Postes para estacionamentos", "/postes-para-estacionamentos"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Catalogos e downloads", "/downloads"],
]

export function getRegionalUfMetadata(data: RegionalUfPageData): Metadata {
    const pageUrl = `${SITE_URL}${data.path}`
    const hero = createSeoImage(data.heroImageKey)

    return {
        title: {
            absolute: data.title,
        },
        description: data.description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: data.title,
            description: data.description,
            url: pageUrl,
            type: "website",
            images: [
                {
                    url: absoluteUrl(hero.src),
                    width: 1200,
                    height: 630,
                    alt: data.heroAlt,
                },
            ],
        },
    }
}

function getFaq(data: RegionalUfPageData) {
    return [
        {
            question: `A B&B tem fabrica em ${data.stateName}?`,
            answer:
                "A fabricacao e feita em Goiania. A pagina por UF existe para orientar compras e projetos no estado, sem indicar presenca local artificial.",
        },
        {
            question: `Como solicitar orcamento para ${data.stateName}?`,
            answer:
                "Envie cidade e UF de entrega, modelo, altura, quantidade, fixacao, acabamento, prazo desejado e anexos como memorial, desenho ou fotos.",
        },
        {
            question: "Qual e o prazo de entrega?",
            answer:
                "O prazo e o frete sao confirmados no orcamento conforme volume, acabamento, rota, cidade de entrega e cronograma da obra.",
        },
        {
            question: "Quais modelos podem ser cotados?",
            answer:
                "A B&B pode orientar postes retos, teleconicos, curvos simples, curvos duplos, ornamentais, bracos, suportes e acessorios conforme aplicacao.",
        },
        {
            question: "A pagina vale para prefeituras, construtoras e condominios?",
            answer:
                "Sim. O conteudo foi feito para compradores tecnicos que precisam comparar modelo, quantidade, acabamento, fixacao e logistica antes da proposta.",
        },
    ]
}

function getSchema(data: RegionalUfPageData) {
    const pageUrl = `${SITE_URL}${data.path}`
    const gallery = data.galleryKeys.map((key) => createSeoImage(key))
    const faq = getFaq(data)

    return createSchemaGraph([
        createNationalOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: data.title,
            description: data.description,
            image: createSeoImage(data.heroImageKey).src,
            mainEntityId: `${pageUrl}#faq`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Postes metalicos", item: `${SITE_URL}/postes-metalicos` },
            { name: data.stateName, item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: `Aplicacoes de postes metalicos em ${data.stateName}`,
            items: applicationCards.map((item) => ({
                name: item.title,
                description: item.description,
            })),
        }),
        createFaqSchema(pageUrl, faq),
        ...createImageSchemas(gallery),
    ])
}

export function RegionalUfPage({ data }: RegionalUfPageProps) {
    const hero = createSeoImage(data.heroImageKey)
    const gallery = data.galleryKeys.map((key) => createSeoImage(key))
    const faq = getFaq(data)
    const whatsappMessage =
        `Ola, vim pela pagina regional de postes metalicos para ${data.stateName} (${data.uf}) e quero solicitar um orcamento tecnico. ` +
        "Tenho interesse em informar modelo, altura, quantidade, acabamento, fixacao, cidade de entrega e prazo."

    return (
        <main className="min-h-screen overflow-x-hidden bg-white [&_*]:box-border">
            <SchemaOrg id={`regional-${data.stateSlug}-schema`} data={getSchema(data)} />
            <Header />

            <section className="relative overflow-hidden bg-industrial-950 pt-28 text-white md:pt-32">
                <div className="absolute inset-0">
                    <Image
                        src={hero.src}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-45"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
                </div>

                <div className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-6 md:py-28">
                    <div className="min-w-0 max-w-[calc(100vw-2rem)] md:max-w-4xl">
                        <div className="mb-6 inline-flex max-w-full items-center gap-3 border border-white/20 bg-white/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-accent-premium md:tracking-[0.24em] rounded-md">
                            <MapPin className="size-4" />
                            {data.regionName} / {data.uf}
                        </div>

                        <h1 className="max-w-[calc(100vw-2rem)] text-[2.05rem] font-black uppercase leading-[0.98] tracking-normal sm:text-[2.55rem] md:max-w-4xl md:text-7xl md:leading-[0.95] md:tracking-tight">
                            <span className="block">Postes metalicos</span>
                            <span className="block">para projetos</span>
                            <span className="block break-words">em {data.stateName}</span>
                        </h1>

                        <p className="mt-7 max-w-[21rem] text-lg font-medium leading-relaxed text-industrial-100 md:max-w-3xl md:text-xl">
                            Fabricacao em Goiania e atendimento tecnico/comercial para compras em {data.stateName},
                            com prazo e frete confirmados no orcamento.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel={`Regional ${data.uf} - solicitar orcamento`}
                                eventSource={`regional_uf_${data.uf.toLowerCase()}_hero`}
                                className="inline-flex h-14 w-full max-w-[calc(100vw-2rem)] items-center justify-center gap-3 bg-accent-premium px-8 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 sm:w-auto rounded-lg"
                            >
                                <MessageCircle className="size-5" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads"
                                className="inline-flex h-14 w-full max-w-[calc(100vw-2rem)] items-center justify-center gap-3 border border-white/25 px-8 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white/10 sm:w-auto rounded-lg"
                            >
                                <Download className="size-5" />
                                Baixar catalogos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 md:grid-cols-4 md:px-6">
                    {proofCards.map((item) => {
                        const Icon = item.icon

                        return (
                            <div key={item.title} className="min-w-0 max-w-[calc(100vw-2rem)] border border-industrial-200 bg-industrial-50 p-6 rounded-2xl">
                                <Icon className="mb-5 size-8 text-accent-dark" />
                                <h2 className="break-words text-sm font-black uppercase tracking-widest text-industrial-950">{item.title}</h2>
                                <p className="mt-3 max-w-[20rem] text-sm leading-relaxed text-industrial-600 md:max-w-none">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-[0.28em] text-accent-dark">
                            Atendimento por UF
                        </span>
                        <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            Compra regional sem promessa local falsa
                        </h2>
                        <p className="mt-6 text-base leading-relaxed text-industrial-600 md:text-lg">
                            {data.commercialContext}
                        </p>
                        <p className="mt-5 text-base leading-relaxed text-industrial-600">
                            A B&B posiciona esta pagina como atendimento nacional por UF. O objetivo e organizar a
                            cotacao para quem precisa comparar postes metalicos com dados tecnicos e logistica definida
                            no orcamento.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {applicationCards.map((item) => {
                            const Icon = item.icon

                            return (
                                <div key={item.title} className="border border-industrial-200 p-6 rounded-2xl">
                                    <Icon className="mb-5 size-7 text-accent-dark" />
                            <h3 className="break-words text-sm font-black uppercase tracking-widest text-industrial-950">{item.title}</h3>
                                    <p className="mt-3 max-w-[20rem] text-sm leading-relaxed text-industrial-600 md:max-w-none">{item.description}</p>
                        </div>
                    )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20">
                <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                    <div className="mb-12 max-w-3xl">
                        <span className="text-[11px] font-black uppercase tracking-[0.28em] text-accent-dark">
                            Dados para cotacao
                        </span>
                        <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            O que enviar para cotar postes em {data.stateName}
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {quoteData.map(([title, description]) => (
                            <div key={title} className="border border-industrial-200 bg-white p-6 rounded-2xl">
                                <h3 className="break-words text-sm font-black uppercase tracking-widest text-industrial-950">{title}</h3>
                                <p className="mt-3 max-w-[20rem] text-sm leading-relaxed text-industrial-600 md:max-w-none">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-2">
                    <div className="border border-industrial-200 p-8 md:p-10 rounded-2xl">
                        <Truck className="mb-6 size-10 text-accent-dark" />
                        <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950">
                            Logistica para {data.stateName}
                        </h2>
                        <div className="mt-6 space-y-4">
                            {data.logisticsNotes.map((note) => (
                                <p key={note} className="text-base leading-relaxed text-industrial-600">
                                    {note}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="border border-industrial-200 bg-industrial-950 p-8 text-white md:p-10 rounded-2xl">
                        <ShieldCheck className="mb-6 size-10 text-accent-premium" />
                        <h2 className="text-3xl font-black uppercase leading-tight">
                            Regras de seguranca comercial
                        </h2>
                        <ul className="mt-6 space-y-4 text-sm font-semibold leading-relaxed text-industrial-200">
                            <li>Sem endereco ou equipe local declarados se isso nao estiver confirmado.</li>
                            <li>Sem prazo fixo publicado antes de avaliar rota, volume e acabamento.</li>
                            <li>Sem case regional se nao houver prova real e autorizacao de uso.</li>
                            <li>Schema orientado a pagina, organizacao, imagens, FAQ e breadcrumbs.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20">
                <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                    <div className="mb-12 max-w-3xl">
                        <span className="text-[11px] font-black uppercase tracking-[0.28em] text-accent-dark">
                            Referencias visuais
                        </span>
                        <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            Aplicacoes de postes metalicos
                        </h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-4">
                        {gallery.map((image) => (
                            <figure key={image.src} className="border border-industrial-200 bg-white rounded-2xl overflow-hidden">
                                <div className="relative aspect-[4/3]">
                                    <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 768px) 25vw, 100vw" />
                                </div>
                                <figcaption className="p-5">
                                    <h3 className="break-words text-sm font-black uppercase tracking-widest text-industrial-950">{image.title}</h3>
                                    <p className="mt-2 max-w-[20rem] text-sm leading-relaxed text-industrial-600 md:max-w-none">{image.alt}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-[0.28em] text-accent-dark">
                            FAQ regional
                        </span>
                        <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            Duvidas comuns para compras em {data.stateName}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faq.map((item) => (
                            <div key={item.question} className="border border-industrial-200 p-6 rounded-2xl">
                                <h3 className="break-words text-sm font-black uppercase tracking-widest text-industrial-950">{item.question}</h3>
                                <p className="mt-3 max-w-[20rem] text-sm leading-relaxed text-industrial-600 md:max-w-none">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-industrial-200 bg-industrial-50 py-16">
                <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                    <h2 className="mb-8 text-center text-xs font-black uppercase tracking-[0.28em] text-industrial-500">
                        Links tecnicos relacionados
                    </h2>
                    <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
                        {relatedLinks.map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="inline-flex min-h-11 max-w-full items-center gap-2 border border-industrial-200 bg-white px-4 text-xs font-black uppercase tracking-widest text-industrial-700 transition-colors hover:border-industrial-950 hover:text-industrial-950 rounded-md"
                            >
                                {label}
                                <ArrowRight className="size-3" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-accent-premium py-20 text-industrial-950">
                <div className="mx-auto w-full max-w-7xl px-4 text-center md:px-6">
                    <h2 className="mx-auto max-w-4xl text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                        Cotar postes metalicos para {data.stateName}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-relaxed md:text-lg">
                        Envie modelo, altura, quantidade, acabamento, fixacao, cidade de entrega e prazo desejado. O
                        retorno comercial considera producao, rota e volume.
                    </p>
                    <WhatsAppLink
                        message={whatsappMessage}
                        eventLabel={`Regional ${data.uf} - CTA final`}
                        eventSource={`regional_uf_${data.uf.toLowerCase()}_final`}
                        className="mt-10 inline-flex h-16 items-center justify-center gap-3 bg-industrial-950 px-10 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                    >
                        <Wrench className="size-5" />
                        Falar com especialista
                    </WhatsAppLink>
                </div>
            </section>

            <FloatingWhatsApp
                message={whatsappMessage}
                eventLabel={`Regional ${data.uf} - flutuante`}
                eventSource={`regional_uf_${data.uf.toLowerCase()}_floating`}
            />
            <Footer />
        </main>
    )
}
