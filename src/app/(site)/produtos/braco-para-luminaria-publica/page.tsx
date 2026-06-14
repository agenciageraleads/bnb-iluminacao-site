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

const pageUrl = "https://bebiluminacao.com.br/produtos/braco-para-luminaria-publica"
const pageDescription =
    "Braco para luminaria publica em aco, com opcoes para postes de iluminacao, ruas, avenidas, pracas e condominios. Consulte medidas e orcamento tecnico."
const whatsappMessage =
    "Ola, vim pela pagina de braco para luminaria publica e quero solicitar um orcamento tecnico."
const heroImage = "https://bebiluminacao.com.br/api/media/file/braco-reto-luminaria.png"
const backgroundImage = "/images/seo/postes-metalicos/praca-iluminada-luminaria-redonda.jpg"

export const metadata: Metadata = {
    title: {
        absolute: "Braco para Luminaria Publica Galvanizado | B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Braco para Luminaria Publica Galvanizado | B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: heroImage,
                width: 1200,
                height: 630,
                alt: "Braco metalico para luminaria publica",
            },
        ],
    },
}

const productModels = [
    {
        title: "Braco reto",
        use: "Postes, ruas e areas objetivas",
        description:
            "Opcao para quando a luminaria precisa de afastamento controlado e leitura visual simples no conjunto.",
        image: "https://bebiluminacao.com.br/api/media/file/braco-reto-luminaria.png",
    },
    {
        title: "Braco curvo",
        use: "Vias, calcadas e pracas",
        description:
            "Alternativa para projetos que pedem avanco com desenho curvo e compatibilizacao visual com o poste.",
        image: "https://bebiluminacao.com.br/api/media/file/braco-curvo-luminaria.png",
    },
    {
        title: "Suporte para luminaria",
        use: "Um ou mais pontos de luz",
        description:
            "Solucao para fixar uma ou mais luminarias conforme poste, carga, posicao e desenho do projeto.",
        image: "https://bebiluminacao.com.br/api/media/file/suporte-2-luminarias.png",
    },
]

const supportImages = [
    {
        title: "Braco reto",
        image: "https://bebiluminacao.com.br/api/media/file/braco-reto-luminaria.png",
    },
    {
        title: "Braco curvo",
        image: "https://bebiluminacao.com.br/api/media/file/braco-curvo-luminaria.png",
    },
    {
        title: "Suporte 1 luminaria",
        image: "https://bebiluminacao.com.br/api/media/file/suporte-1-luminaria.png",
    },
    {
        title: "Suporte 2 luminarias",
        image: "https://bebiluminacao.com.br/api/media/file/suporte-2-luminarias.png",
    },
]

const highlights = [
    {
        title: "Compatibilidade",
        description: "Definicao por poste, luminaria, diametro, fixacao e necessidade de avanco.",
        icon: Wrench,
    },
    {
        title: "Orcamento tecnico",
        description: "Compra orientada por medida, quantidade, aplicacao, cidade de entrega e prazo.",
        icon: ClipboardCheck,
    },
    {
        title: "Acabamento",
        description: "Galvanizacao, pintura eletrostatica ou acabamento sob especificacao do projeto.",
        icon: ShieldCheck,
    },
    {
        title: "Entrega nacional",
        description: "Fabrica em Goiania como prova operacional, com atendimento para todo o Brasil.",
        icon: Truck,
    },
]

const specificationRows = [
    ["Diametro", "Confirmado conforme poste, encaixe, fixacao e luminaria especificada."],
    ["Avanco", "Definido pelo afastamento desejado da luminaria e pela area que precisa receber luz."],
    ["Inclinacao", "Ajustada conforme modelo, luminaria, fotometria e leitura do projeto."],
    ["Fixacao", "Compatibilizada com poste metalico, base, sapata, parafusos ou suporte indicado."],
    ["Acabamento", "Galvanizacao, pintura eletrostatica ou pintura sob especificacao do ambiente."],
    ["Compra", "Orcamento com modelo, quantidade, cidade/UF, prazo, acabamento e memorial quando existir."],
]

const decisionRows = [
    ["Braco reto", "Projetos com geometria objetiva", "Quando a luminaria precisa avancar de forma simples em relacao ao poste."],
    ["Braco curvo", "Ruas, pracas, calcadas e areas urbanas", "Quando o projeto pede avanco com desenho curvo ou leitura visual mais urbana."],
    ["Com sapata", "Compatibilizacao com poste e fixacao", "Quando a fixacao precisa distribuir carga e facilitar montagem conforme desenho."],
    ["Suporte multiplo", "Pracas, patios e areas amplas", "Quando ha necessidade de uma ou mais luminarias no mesmo conjunto."],
    ["Sob medida", "Obras, memoriais e reposicao tecnica", "Quando o projeto exige compatibilidade com poste, luminaria ou padrao ja definido."],
]

const applicationCards = [
    {
        title: "Iluminacao publica",
        description: "Ruas, avenidas, pracas e obras urbanas com necessidade de padrao tecnico repetivel.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Condominios",
        description: "Areas internas, acessos, estacionamentos e circulacao com acabamento padronizado.",
        href: "/postes-metalicos",
        icon: ShieldCheck,
    },
    {
        title: "Loteamentos",
        description: "Fornecimento em volume com suporte para escolha de poste, braco e luminaria.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Patios e industrias",
        description: "Areas operacionais que pedem robustez, compatibilidade e manutencao planejada.",
        href: "/postes-metalicos",
        icon: Factory,
    },
]

const finishOptions = [
    {
        title: "Galvanizado",
        description: "Indicado quando o ambiente exige protecao contra corrosao e durabilidade externa.",
        icon: ShieldCheck,
    },
    {
        title: "Pintura eletrostatica",
        description: "Usada para padronizacao visual, identidade do empreendimento e acabamento adicional.",
        icon: Paintbrush,
    },
    {
        title: "Sob especificacao",
        description: "Definido conforme memorial, ambiente, luminaria, volume, prazo e padrao de obra.",
        icon: FileText,
    },
]

const primaryInternalLinks = [
    {
        label: "Postes para iluminacao publica",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        label: "Postes metalicos compativeis",
        href: "/postes-metalicos",
        icon: Zap,
    },
    {
        label: "Comprar direto da fabrica",
        href: "/fabricante-de-postes-metalicos",
        icon: Factory,
    },
]

const secondaryInternalLinks = [
    ["Suporte para luminaria publica", "/produtos/suporte-para-luminaria-publica"],
    ["Chumbador para poste metalico", "/produtos/chumbador-para-poste-metalico"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Linha Nexo", "/produtos/linha-nexo"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "O que e um braco para luminaria publica?",
        answer:
            "E o acessorio metalico que posiciona a luminaria em relacao ao poste, definindo avanco, fixacao, alinhamento e compatibilidade do conjunto de iluminacao.",
    },
    {
        question: "A B&B fornece braco reto, curvo e suporte para luminaria?",
        answer:
            "Sim. A pagina organiza bracos retos, bracos curvos e suportes para orientar a conversa tecnica antes do orcamento.",
    },
    {
        question: "Como escolher a medida do braco para luminaria?",
        answer:
            "A medida depende do poste, da luminaria, do avanco desejado, da area de cobertura, da fixacao e do memorial tecnico quando existir.",
    },
    {
        question: "O braco precisa ser galvanizado?",
        answer:
            "A galvanizacao e uma opcao importante para ambientes externos e maior durabilidade. A definicao final depende do ambiente, acabamento desejado e especificacao do projeto.",
    },
    {
        question: "Quais dados enviar para cotar?",
        answer:
            "Envie modelo desejado, quantidade, cidade e UF, poste onde sera instalado, luminaria, avanco ou medida desejada, acabamento, prazo e, se houver, desenho ou memorial.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createProductSchema({
            url: pageUrl,
            name: "Braco para Luminaria Publica",
            description: pageDescription,
            image: heroImage,
            category: "Bracos e suportes metalicos para iluminacao publica",
            properties: specificationRows.map(([name, value]) => ({ name, value })),
        }),
        createWebPageSchema({
            url: pageUrl,
            name: "Braco para Luminaria Publica",
            description: pageDescription,
            mainEntityId: `${pageUrl}#product`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Produtos", item: `${SITE_URL}/produtos` },
            { name: "Braco para Luminaria Publica", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#modelos`,
            name: "Modelos de braco e suporte para luminaria publica",
            items: productModels.map((model) => ({
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

export default function BracoParaLuminariaPublicaPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="braco-luminaria-publica-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp message={whatsappMessage} />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={backgroundImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-65"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-950/84 to-industrial-950/32" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-industrial-950/20" />
                </div>

                <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[76%] w-[42%] md:block" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-contain object-bottom opacity-95 drop-shadow-2xl"
                        sizes="42vw"
                    />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Wrench className="size-4 text-accent-premium" aria-hidden="true" />
                            Acessorio para postes e luminarias
                        </div>
                        <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            <span className="block">Braco para</span>
                            <span className="block">Luminaria Publica</span>
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Bracos e suportes metalicos para compatibilizar luminarias com postes de iluminacao publica,
                            ruas, avenidas, pracas, condominios, estacionamentos e areas industriais.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de braco para luminaria publica pelo WhatsApp"
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

                    <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 md:hidden">
                        {supportImages.map((item) => (
                            <div key={item.title} className="border border-white/15 bg-white/90 p-3">
                                <div className="relative aspect-square">
                                    <Image src={item.image} alt={item.title} fill className="object-contain" sizes="25vw" />
                                </div>
                                <p className="mt-2 text-center text-[9px] font-black uppercase tracking-widest text-industrial-700">
                                    {item.title}
                                </p>
                            </div>
                        ))}
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
                            O braco define avanco, fixacao e compatibilidade
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Na pratica, o braco para luminaria publica conecta o poste, a luminaria e a area que precisa
                            receber luz. A escolha errada gera retrabalho em compra, instalacao e manutencao.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A B&B organiza a cotacao com foco no conjunto: tipo de poste, luminaria, avanco, fixacao,
                            acabamento, quantidade, cidade de entrega e prazo.
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
                            Braco reto, braco curvo e suportes
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            O modelo deve seguir o poste, a luminaria, a area de cobertura e a forma de fixacao prevista
                            em obra.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {productModels.map((model) => (
                            <div key={model.title} className="border border-white/15 bg-white/5">
                                <div className="relative aspect-[4/3] bg-white p-6">
                                    <Image
                                        src={model.image}
                                        alt={model.title}
                                        fill
                                        className="object-contain p-5"
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
                        <SectionLabel>Escolha tecnica</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Como sair da busca generica para a especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Antes de comparar preco, vale confirmar o tipo de braco, a fixacao, o acabamento e a
                            compatibilidade com poste e luminaria.
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
                        <SectionLabel>Compatibilidade</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O acessorio precisa conversar com o poste e a luminaria
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O braco nao deve ser tratado isoladamente. Ele depende da estrutura onde sera instalado, do
                            peso e encaixe da luminaria, do avanco desejado e das condicoes do ambiente.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {supportImages.map((item) => (
                            <div key={item.title} className="border border-industrial-200 bg-white p-5">
                                <div className="relative aspect-[4/3]">
                                    <Image src={item.image} alt={item.title} fill className="object-contain" sizes="(min-width: 768px) 50vw, 100vw" />
                                </div>
                                <h3 className="mt-4 text-sm font-black uppercase tracking-widest text-industrial-950">
                                    {item.title}
                                </h3>
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
                            Onde bracos e suportes entram no projeto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A pagina aprofunda o acessorio e conecta o comprador aos hubs de aplicacao, fabricante,
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

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Acabamento</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Galvanizado, pintado ou sob especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A decisao deve considerar corrosao, ambiente externo, padrao visual, manutencao e memorial do
                            projeto.
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

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Downloads</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Catalogo geral e briefing para cotacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Enquanto datasheets especificos de bracos nao forem confirmados no pacote local, o catalogo
                            geral serve como ponto de partida e a especificacao final fica no orcamento tecnico.
                        </p>
                    </div>
                    <div className="grid gap-3">
                        <Link
                            href="/downloads"
                            className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium"
                        >
                            <span className="inline-flex items-center gap-3">
                                <Download className="size-5 text-accent-premium" aria-hidden="true" />
                                Ver catalogos e downloads
                            </span>
                            <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                        <a
                            href="/downloads/catalogo-bb-iluminacao.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium"
                        >
                            Catalogo geral B&B
                            <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas comuns sobre bracos para luminaria
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas objetivas para compras, engenharia e instalacao antes do pedido de orcamento.
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
                            Envie as medidas para cotar bracos e suportes
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe modelo, quantidade, poste, luminaria, avanco desejado, acabamento, cidade/UF e prazo.
                            Se houver desenho ou memorial, envie junto.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Falar com especialista sobre braco para luminaria publica"
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
