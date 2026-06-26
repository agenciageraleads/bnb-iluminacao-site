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
    absoluteUrl,
    createBreadcrumbSchema,
    createFaqSchema,
    createItemListSchema,
    createProductSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/produtos/chumbador-para-poste-metalico"
const pageDescription =
    "Chumbador para poste metalico e base flangeada sob especificacao para postes de iluminacao, com orientacao de dados para orcamento tecnico B&B."
const whatsappMessage =
    "Ola, vim pela pagina de chumbador para poste metalico e quero ajuda para cotar base, chumbadores ou gabarito conforme projeto."
const heroImage = "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg"

export const metadata: Metadata = {
    title: {
        absolute: "Chumbador para Poste Metalico | Base Flangeada B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Chumbador para Poste Metalico | Base Flangeada B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Postes metalicos em area externa com base de instalacao",
            },
        ],
    },
}

const highlights = [
    {
        title: "Base flangeada",
        description: "A base aparafusada depende de flange, chumbadores, fundacao, carga, altura e projeto civil.",
        icon: Wrench,
    },
    {
        title: "Dados sob projeto",
        description: "Medidas, furo, bitola, comprimento, rosca e gabarito devem seguir desenho ou memorial.",
        icon: Ruler,
    },
    {
        title: "Compra tecnica",
        description: "Evita comparar chumbadores, bases e postes com criterios diferentes pelo mesmo nome.",
        icon: ClipboardCheck,
    },
    {
        title: "Atendimento nacional",
        description: "Fabrica em Goiania como prova operacional, com suporte para obras em todo o Brasil.",
        icon: Truck,
    },
]

const productOptions = [
    {
        title: "Chumbador para poste",
        description:
            "Conjunto de fixacao usado em poste flangeado quando o projeto civil preve base de concreto e ancoragem aparafusada.",
        icon: Wrench,
    },
    {
        title: "Base flangeada",
        description:
            "Interface entre poste e fundacao, definida por flange, furo, parafusos/chumbadores, carga e geometria do poste.",
        icon: ShieldCheck,
    },
    {
        title: "Gabarito de fixacao",
        description:
            "Referencia para posicionar os chumbadores na obra civil conforme furo, espacamento, prumo e desenho tecnico.",
        icon: Ruler,
    },
    {
        title: "Conjunto sob desenho",
        description:
            "Quando memorial, altura, carga, solo ou padrao da obra exigem medidas especificas e validacao tecnica.",
        icon: FileText,
    },
]

const specificationRows = [
    ["Produto", "Chumbador, base flangeada, gabarito ou conjunto de fixacao para poste metalico."],
    ["Uso", "Postes flangeados para iluminacao publica, estacionamentos, loteamentos, condominios, pracas e areas industriais."],
    ["Medidas", "Definidas por desenho, flange, furo, diametro, comprimento, rosca, carga e fundacao prevista."],
    ["Compatibilidade", "Poste, altura, base, luminaria, braco/suporte, ambiente, manutencao e projeto civil."],
    ["Acabamento", "Galvanizado, pintado ou conforme especificacao do conjunto e ambiente externo."],
    ["Compra", "Orcamento com desenho, quantidade, modelo do poste, cidade/UF, prazo, acabamento e responsavel tecnico quando houver."],
]

const decisionRows = [
    [
        "Poste flangeado",
        "Base aparafusada com chumbadores",
        "Quando a obra civil preve fundacao e interface desmontavel conforme projeto.",
    ],
    [
        "Poste engastado",
        "Trecho embutido no concreto ou solo",
        "Quando a fixacao nao usa base aparafusada e depende de profundidade/fundacao especifica.",
    ],
    [
        "Base existente",
        "Checar furo, prumo, espacamento e carga",
        "Quando a compra e reposicao ou adequacao a uma estrutura ja instalada.",
    ],
    [
        "Obra nova",
        "Definir gabarito antes da concretagem",
        "Quando a fundacao ainda sera executada e precisa receber os chumbadores na posicao correta.",
    ],
    [
        "Projeto indefinido",
        "Enviar fotos, planta e dados de uso",
        "Quando ainda nao ha desenho de flange, fundacao ou responsavel tecnico definido.",
    ],
]

const quoteRows = [
    ["Poste", "Modelo, altura, diametro, tipo de base, peso/carga estimada e se sera flangeado ou engastado."],
    ["Base", "Desenho da flange, quantidade de furos, espacamento, diametro, espessura e padrao do conjunto."],
    ["Chumbador", "Bitola, comprimento, rosca, quantidade por poste, material/acabamento e gabarito quando existir."],
    ["Obra civil", "Tipo de fundacao, concreto, base existente, restricoes de piso, acesso e etapa da obra."],
    ["Aplicacao", "Via, praca, estacionamento, condominio, loteamento, patio, industria ou area operacional."],
    ["Documentos", "Projeto, memorial, foto, croqui, lista de materiais, edital ou referencia visual."],
    ["Entrega", "Cidade, UF, prazo, quantidade total e responsavel pela compra/especificacao."],
]

const applicationCards = [
    {
        title: "Iluminacao publica",
        description: "Bases para postes em vias, avenidas, acessos e obras urbanas com especificacao formal.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Estacionamentos",
        description: "Postes flangeados em areas abertas, patios, vagas, docas e pontos com manutencao futura.",
        href: "/postes-para-estacionamentos",
        icon: Truck,
    },
    {
        title: "Loteamentos",
        description: "Fornecimento em volume com repetibilidade de base, gabarito e padrao de instalacao.",
        href: "/postes-para-loteamentos",
        icon: Building2,
    },
    {
        title: "Fabrica e estruturas",
        description: "Compra direta com fabricante para alinhar poste, base, chumbador e acabamento.",
        href: "/fabrica-de-postes-metalicos",
        icon: Factory,
    },
]

const internalLinks = [
    ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Postes para estacionamentos", "/postes-para-estacionamentos"],
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Postes metalicos", "/postes-metalicos"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Suporte para luminaria publica", "/produtos/suporte-para-luminaria-publica"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "A B&B fornece chumbador para poste metalico?",
        answer:
            "A B&B orienta e cota conjuntos de base, flange, chumbadores ou gabarito conforme especificacao do poste, desenho, memorial e projeto da obra.",
    },
    {
        question: "Chumbador e usado em qualquer poste?",
        answer:
            "Nao. Chumbador esta associado a postes flangeados ou bases aparafusadas. Postes engastados seguem outra logica de fundacao e profundidade.",
    },
    {
        question: "Quais medidas preciso informar?",
        answer:
            "Informe desenho da flange, quantidade de furos, espacamento, bitola, comprimento, rosca, quantidade por poste, altura/modelo do poste e dados da fundacao.",
    },
    {
        question: "A pagina substitui projeto estrutural?",
        answer:
            "Nao. A pagina organiza a compra e o briefing. A definicao final de base, chumbadores e fundacao deve respeitar projeto civil/estrutural, memorial e responsavel tecnico.",
    },
    {
        question: "O que enviar para cotar base ou chumbador?",
        answer:
            "Envie modelo do poste, aplicacao, quantidade, cidade/UF, desenho, memorial, fotos, base existente ou nova, acabamento e prazo.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createProductSchema({
            url: pageUrl,
            name: "Chumbador para Poste Metalico",
            description: pageDescription,
            image: heroImage,
            category: "Base e chumbadores para postes metalicos",
            properties: specificationRows.map(([name, value]) => ({ name, value })),
        }),
        createWebPageSchema({
            url: pageUrl,
            name: "Chumbador para Poste Metalico",
            description: pageDescription,
            image: heroImage,
            mainEntityId: `${pageUrl}#product`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Produtos", item: `${SITE_URL}/produtos` },
            { name: "Chumbador para Poste Metalico", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#opcoes`,
            name: "Opcoes de base e chumbador para poste metalico",
            items: productOptions.map((option) => ({
                name: option.title,
                description: option.description,
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

export default function ChumbadorParaPosteMetalicoPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="chumbador-poste-metalico-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de chumbador para poste metalico"
                    eventSource="floating_chumbador_poste_metalico"
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-85"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-950/76 to-industrial-950/18" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/70 via-industrial-950/12 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex max-w-full items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white md:tracking-[0.22em]">
                            <Wrench className="size-4 shrink-0 text-accent-premium" aria-hidden="true" />
                            Base, flange, chumbador e gabarito
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl lg:text-7xl">
                            Chumbador para Poste Metalico
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Orientacao para cotar chumbadores, bases flangeadas e gabaritos de fixacao para postes
                            metalicos, sem substituir projeto civil, memorial ou responsavel tecnico da obra.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de chumbador para poste metalico"
                                eventSource="hero_chumbador_poste_metalico"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de chumbador para poste metalico pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/blog/poste-flangeado-ou-engastado"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
                            >
                                <FileText className="size-5" aria-hidden="true" />
                                Ver guia de fixacao
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
                        <SectionLabel>Produto tecnico</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Chumbador e base so fazem sentido junto do poste e da fundacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Em poste flangeado, a conversa envolve flange, furos, chumbadores, gabarito, fundacao,
                            altura, carga, ambiente e manutencao. O mesmo nome pode representar pecas diferentes.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Por isso, a B&B trata a cotacao como conjunto tecnico: poste, base, chumbador, acabamento,
                            cidade de entrega, prazo e documentos da obra.
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
                        <SectionLabel>Opcoes de fixacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Base, chumbador e gabarito nao devem ser comprados no escuro
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A pagina organiza a conversa comercial sem prometer medida padrao universal.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-4">
                        {productOptions.map((option) => {
                            const Icon = option.icon
                            return (
                                <div key={option.title} className="border border-white/15 bg-white/5 p-6">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-accent-premium text-industrial-950">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-white">
                                        {option.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-300">{option.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Escolha por contexto</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Flangeado, engastado e base existente mudam a cotacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Antes de pedir preco, confirme se a obra realmente usa base aparafusada ou se o poste sera
                            engastado.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200">
                        {decisionRows.map(([item, use, criterion]) => (
                            <div key={item} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[170px_1fr_1fr]">
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
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Aplicacoes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Onde base e chumbadores entram no projeto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A fixacao aparece nas paginas de aplicacao, mas aqui o foco e transformar a duvida em dados
                            para cotacao.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {applicationCards.map((card) => {
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
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Dados para cotacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que enviar para cotar chumbador ou base flangeada
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O ideal e enviar desenho ou memorial. Se ainda nao existir, fotos e contexto da obra ajudam a
                            organizar a proxima conversa tecnica.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200">
                        {quoteRows.map(([label, value]) => (
                            <div key={label} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[190px_1fr]">
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
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Interlinking tecnico</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Caminhos relacionados para fechar poste, base e acessorios
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A pagina de chumbador conecta fixacao, modelos de poste, aplicacoes, bracos, suportes e
                            catalogos.
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
                            Duvidas comuns antes de cotar chumbador para poste
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas para diferenciar chumbador, base, flange, gabarito e engastamento.
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
                            Envie desenho, memorial ou fotos da base
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe poste, altura, quantidade, flange, furos, chumbadores, acabamento, cidade e prazo. Se
                            a obra ainda nao tem projeto, envie o contexto para triagem comercial.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados de chumbador para poste metalico"
                            eventSource="final_chumbador_poste_metalico"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados de chumbador para poste metalico pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <Download className="size-5" aria-hidden="true" />
                            Ver catalogos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    <Link href="/blog/poste-flangeado-ou-engastado" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <FileText className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Guia flangeado ou engastado</span>
                    </Link>
                    <Link href="/produtos/poste-teleconico" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Ruler className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver poste teleconico</span>
                    </Link>
                    <Link href="/downloads" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Download className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Catalogos e downloads</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
