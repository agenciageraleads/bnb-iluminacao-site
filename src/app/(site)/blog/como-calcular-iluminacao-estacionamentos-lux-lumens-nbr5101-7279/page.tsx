import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    ArrowRight,
    Building2,
    Calculator,
    ClipboardCheck,
    Download,
    FileText,
    Gauge,
    LayoutGrid,
    Lightbulb,
    MessageCircle,
    Ruler,
    Zap,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { TrackedContactLink } from "@/lib/lead-tracking"
import {
    ORGANIZATION_ID,
    SITE_URL,
    absoluteUrl,
    createBreadcrumbSchema,
    createFactoryOrganizationSchema,
    createFaqSchema,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl =
    "https://bebiluminacao.com.br/blog/como-calcular-iluminacao-estacionamentos-lux-lumens-nbr5101-7279"
const pageTitle = "Como Calcular a Iluminacao de Estacionamentos"
const pageDescription =
    "Lux, lumens e espacamento pela NBR 5101: o metodo que define quantos postes um estacionamento ou patio realmente precisa. Guia pratico da B&B para dimensionar antes de cotar."
const heroImage = "/images/seo/postes-metalicos/estacionamento-comercial-noturno-postes-iluminacao-rio-verde.webp"
const whatsappMessage =
    "Ola, vim pelo guia de calculo de iluminacao de estacionamentos e quero ajuda para definir quantos postes o meu projeto precisa."

export const metadata: Metadata = {
    title: {
        absolute: "Como Calcular a Iluminacao de Estacionamentos (Lux, Lumens e NBR 5101) | Guia B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Como Calcular a Iluminacao de Estacionamentos | Guia B&B",
        description: pageDescription,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Estacionamento iluminado a noite com postes metalicos B&B",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Como Calcular a Iluminacao de Estacionamentos | Guia B&B",
        description: pageDescription,
        images: [absoluteUrl(heroImage)],
    },
}

const decisionCards = [
    {
        title: "Lux e o alvo",
        description:
            "Lux (lx) e o nivel de iluminancia que precisa chegar ao piso. E o numero que o projeto persegue, definido por norma e pelo uso da area.",
        icon: Gauge,
    },
    {
        title: "Lumens e a entrega",
        description:
            "Lumen (lm) e o fluxo luminoso que cada luminaria produz. E o que voce compra; o lux e o que sobra no chao depois de perdas.",
        icon: Lightbulb,
    },
    {
        title: "Espacamento fecha a conta",
        description:
            "Altura, distribuicao da luminaria e espacamento entre postes convertem lumens em lux uniforme — e definem quantos postes entram.",
        icon: LayoutGrid,
    },
]

const conceptRows = [
    [
        "Iluminancia (lux)",
        "Luz que chega ao piso, medida em lx.",
        "Alvo do projeto. Estacionamento e patio pedem menos lux que uma via de trafego intenso.",
    ],
    [
        "Fluxo luminoso (lumens)",
        "Luz total emitida pela luminaria, em lm.",
        "Dado do datasheet da luminaria. Nao confundir com potencia (W).",
    ],
    [
        "Uniformidade (U)",
        "Relacao entre o ponto mais escuro e a media.",
        "Evita zonas de sombra entre postes. A norma trata uniformidade minima, nao so a media.",
    ],
    [
        "Altura de montagem (H)",
        "Altura da luminaria em relacao ao piso.",
        "Quanto maior a altura, maior a area coberta por poste — e maior o espacamento possivel.",
    ],
    [
        "Fatores de perda",
        "Fator de utilizacao e de manutencao.",
        "Descontam sujeira, depreciacao do LED e a fracao de luz que realmente cai na area util.",
    ],
]

const methodSteps = [
    {
        title: "1. Defina a area e o uso",
        items: [
            "meca comprimento x largura da area a iluminar;",
            "classifique o uso: estacionamento comercial, patio, area de manobra, acesso;",
            "quanto mais critico o uso, maior o nivel de lux alvo.",
        ],
        icon: Ruler,
    },
    {
        title: "2. Fixe o nivel de lux alvo",
        items: [
            "use a NBR 5101 e o uso da area como referencia de iluminancia;",
            "registre tambem a uniformidade minima exigida;",
            "na duvida sobre a classe, confirme com projeto luminotecnico.",
        ],
        icon: Gauge,
    },
    {
        title: "3. Escolha luminaria, altura e poste",
        items: [
            "levante o fluxo (lumens) e a curva de distribuicao da luminaria;",
            "defina a altura de montagem e o modelo de poste (reto ou curvo);",
            "altura maior cobre mais area por ponto e permite maior espacamento.",
        ],
        icon: Zap,
    },
    {
        title: "4. Aplique os fatores de perda",
        items: [
            "aplique fator de utilizacao (quanto da luz cai na area util);",
            "aplique fator de manutencao (sujeira e depreciacao ao longo da vida);",
            "e o passo que separa o lux teorico do lux real no chao.",
        ],
        icon: Calculator,
    },
    {
        title: "5. Feche espacamento e numero de postes",
        items: [
            "calcule o espacamento que mantem lux medio e uniformidade;",
            "divida o perimetro/area pelo espacamento para achar os pontos;",
            "arredonde para cima e valide as bordas e cantos da area.",
        ],
        icon: LayoutGrid,
    },
]

const referenceRows = [
    ["Estacionamento / patio de baixa circulacao", "Referencia mais baixa de lux; foco em orientacao e seguranca.", "Postes retos, altura media, maior espacamento."],
    ["Estacionamento comercial / shopping", "Referencia intermediaria; conforto visual e leitura de placas.", "Reto ou curvo, altura media, uniformidade cuidada."],
    ["Area de manobra / carga / logistica", "Referencia mais alta; tarefa visual e movimentacao.", "Alturas maiores, projetores ou luminarias de maior fluxo."],
    ["Acessos, cancelas e cabines", "Reforco pontual sobre o nivel medio da area.", "Ponto dedicado, evita ofuscamento na entrada."],
]

const quoteChecklist = [
    "Dimensoes da area (comprimento x largura) e croqui, se houver.",
    "Uso: estacionamento comercial, patio, manobra, logistica ou acesso.",
    "Nivel de lux e uniformidade alvo, ou classe da NBR 5101, quando definidos.",
    "Luminaria prevista: fluxo (lumens), potencia e curva de distribuicao.",
    "Altura pretendida e modelo de poste (reto ou curvo).",
    "Cidade, UF, quantidade estimada, prazo e local de entrega.",
    "Fixacao: engastado, flangeado, chumbadores ou indefinido.",
    "Projeto, memorial ou projeto luminotecnico, quando houver.",
]

const downloadLinks = [
    { title: "Datasheet poste reto", href: "/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf" },
    { title: "Datasheet poste curvo simples", href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf" },
    { title: "Datasheet poste curvo duplo", href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf" },
    { title: "Todos os catalogos, datasheets e desenhos tecnicos", href: "/downloads" },
]

const internalLinks = [
    {
        title: "Postes para estacionamentos",
        description: "Modelos e alturas mais usados em estacionamentos e patios.",
        href: "/postes-para-estacionamentos",
        icon: Building2,
    },
    {
        title: "Altura de poste",
        description: "A altura muda a area coberta por ponto e o numero de postes.",
        href: "/blog/altura-de-poste-para-iluminacao-publica",
        icon: Ruler,
    },
    {
        title: "Poste curvo ou reto",
        description: "Depois de fechar o calculo, defina a geometria do topo do poste.",
        href: "/blog/poste-teleconico-ou-reto",
        icon: Zap,
    },
    {
        title: "Qual linha para cada aplicacao",
        description: "Veja qual das 7 linhas B&B atende cada tipo de projeto.",
        href: "/blog/qual-poste-para-cada-aplicacao",
        icon: Lightbulb,
    },
]

const faq = [
    {
        question: "Qual a diferenca entre lux e lumens?",
        answer:
            "Lumen (lm) e a luz total que a luminaria emite. Lux (lx) e quanto dessa luz chega ao piso por metro quadrado. Voce compra lumens; o projeto persegue lux. As perdas entre um e outro sao o que o calculo estima.",
    },
    {
        question: "Como sei quantos postes o estacionamento precisa?",
        answer:
            "Depois de fixar o lux alvo, a luminaria, a altura e os fatores de perda, calcula-se o espacamento que mantem o nivel medio e a uniformidade. O numero de postes vem de dividir a area/perimetro por esse espacamento, arredondando para cima e tratando bordas e cantos.",
    },
    {
        question: "A altura do poste muda o numero de postes?",
        answer:
            "Muda bastante. Alturas maiores cobrem mais area por ponto e permitem maior espacamento, reduzindo a quantidade de postes — desde que a luminaria e a uniformidade acompanhem. Por isso altura e espacamento sao decididos juntos.",
    },
    {
        question: "A NBR 5101 vale para estacionamento?",
        answer:
            "A NBR 5101 trata da iluminacao publica viaria e e a principal referencia citada nesses projetos. O nivel exato depende da classe e do uso da area; para um valor vinculante, confirme a norma vigente e um projeto luminotecnico.",
    },
    {
        question: "A B&B faz o calculo luminotecnico?",
        answer:
            "A B&B ajuda a organizar as variaveis e indica modelo, altura e fixacao do poste. O calculo luminotecnico formal, com curva da luminaria e simulacao, deve ser feito ou validado por projeto. Envie os dados da area que orientamos o dimensionamento do poste.",
    },
]

function createArticleSchema() {
    return {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: pageTitle,
        description: pageDescription,
        image: absoluteUrl(heroImage),
        datePublished: "2026-07-27",
        dateModified: "2026-07-27",
        author: {
            "@id": ORGANIZATION_ID,
            name: "B&B Iluminacao",
        },
        publisher: {
            "@id": ORGANIZATION_ID,
        },
        mainEntityOfPage: {
            "@id": `${pageUrl}#webpage`,
        },
    }
}

function getSchema() {
    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createArticleSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: pageTitle,
            description: pageDescription,
            image: heroImage,
            mainEntityId: `${pageUrl}#article`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Blog", item: `${SITE_URL}/blog` },
            { name: pageTitle, item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#metodo`,
            name: "Metodo para calcular a iluminacao de estacionamentos",
            items: methodSteps.map((step) => ({
                name: step.title,
                description: step.items.join(" "),
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

export default function CalculoIluminacaoEstacionamentosPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="calculo-iluminacao-estacionamentos-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento pelo guia de calculo de estacionamentos"
                    eventSource="floating_calculo_estacionamentos"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/60 to-industrial-950/12" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/60 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white rounded-md">
                            <Calculator className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia tecnico de dimensionamento
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Quantos Postes o Projeto Pede?
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Lux, lumens e espacamento pela NBR 5101: o metodo que define quantos postes um estacionamento
                            ou patio realmente precisa. Sem chute — com as contas que sustentam a cotacao.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo guia de calculo de estacionamentos"
                                eventSource="hero_calculo_estacionamentos"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar dimensionamento de iluminacao de estacionamento pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar dimensionamento
                            </WhatsAppLink>
                            <Link
                                href="/postes-para-estacionamentos"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
                            >
                                <Building2 className="size-5" aria-hidden="true" />
                                Postes para estacionamentos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-industrial-50 py-8">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    {decisionCards.map((card) => {
                        const Icon = card.icon
                        return (
                            <div key={card.title} className="flex items-start gap-4 bg-white p-5 rounded-lg">
                                <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
                                    <Icon className="size-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-widest">{card.title}</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-industrial-600">{card.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <article>
                <section className="py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div className="space-y-6">
                            <SectionLabel>Conceitos</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que entra na conta antes de contar postes
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Contar postes sem definir lux, luminaria e altura leva a projeto sub ou superdimensionado.
                                Alinhe estas variaveis primeiro — elas transformam lumens comprados em lux util no chao.
                            </p>
                        </div>

                        <div className="overflow-hidden border border-industrial-200 rounded-2xl">
                            {conceptRows.map(([term, definition, use]) => (
                                <div key={term} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[220px_1fr]">
                                    <div className="bg-industrial-950 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                                        {term}
                                    </div>
                                    <div className="space-y-2 px-5 py-4">
                                        <p className="text-sm font-bold leading-relaxed text-industrial-800">{definition}</p>
                                        <p className="text-sm leading-relaxed text-industrial-600">{use}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-xs text-industrial-400">
                            Fontes tecnicas:{" "}
                            <a href="https://www.abnt.org.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">ABNT — NBR 5101 (iluminação pública)</a>
                            {" · "}
                            <a href="https://www.inmetro.gov.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">INMETRO</a>
                        </p>
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Metodo</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Do lux alvo ao numero de postes, em 5 passos
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Este e o caminho que um projeto luminotecnico percorre. Serve para organizar o pedido e
                                estimar a quantidade; o valor vinculante vem do projeto e da norma vigente.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {methodSteps.map((step) => {
                                const Icon = step.icon
                                return (
                                    <div key={step.title} className="border border-white/15 bg-white/5 p-6 rounded-2xl">
                                        <div className="mb-6 flex size-12 items-center justify-center bg-white text-industrial-950 rounded-lg">
                                            <Icon className="size-6 text-accent-dark" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-black uppercase tracking-tight text-white">{step.title}</h3>
                                        <ul className="mt-5 space-y-3">
                                            {step.items.map((item) => (
                                                <li key={item} className="flex gap-3 text-sm leading-relaxed text-industrial-300">
                                                    <span className="mt-2 size-1.5 shrink-0 bg-accent-premium" aria-hidden="true" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Referencias por uso</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O uso da area move o nivel de lux
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Nem toda area de estacionamento pede o mesmo nivel. Use estas faixas como orientacao de
                                projeto e confirme os valores exatos na norma e no calculo luminotecnico.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {referenceRows.map(([area, level, poste]) => (
                                <div key={area} className="border border-industrial-200 bg-white p-5 rounded-lg">
                                    <p className="text-sm font-black uppercase tracking-tight text-industrial-950">{area}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-industrial-700">{level}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-industrial-500">{poste}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-industrial-50 py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Dados para cotacao</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que enviar para dimensionar os postes
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Com estes dados, o time comercial transforma a area em uma estimativa de quantidade, altura
                                e modelo de poste — e aponta o que precisa de projeto luminotecnico.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {quoteChecklist.map((item) => (
                                <div key={item} className="flex items-start gap-4 border border-industrial-200 bg-white p-5 rounded-lg">
                                    <ClipboardCheck className="mt-0.5 size-5 shrink-0 text-accent-dark" aria-hidden="true" />
                                    <p className="text-sm font-medium leading-relaxed text-industrial-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Arquivos tecnicos</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Datasheets dos postes para fechar a conta
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Alturas e geometrias de poste ajudam a fechar altura de montagem e espacamento no calculo.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {downloadLinks.map((file) =>
                                file.href === "/downloads" ? (
                                    <a
                                        key={file.href}
                                        href={file.href}
                                        className="group flex items-center justify-between gap-4 border border-industrial-200 p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950 rounded-lg"
                                    >
                                        <span className="inline-flex items-center gap-3">
                                            <Download className="size-5 text-accent-dark" aria-hidden="true" />
                                            {file.title}
                                        </span>
                                        <ArrowRight className="size-4 shrink-0 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </a>
                                ) : (
                                    <TrackedContactLink
                                        key={file.href}
                                        href={file.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        channel="download"
                                        eventSource="blog_calculo_iluminacao_estacionamentos"
                                        eventLabel={file.title}
                                        extraPayload={{ download_type: "datasheet" }}
                                        className="group flex items-center justify-between gap-4 border border-industrial-200 p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950 rounded-lg"
                                    >
                                        <span className="inline-flex items-center gap-3">
                                            <Download className="size-5 text-accent-dark" aria-hidden="true" />
                                            {file.title}
                                        </span>
                                        <ArrowRight className="size-4 shrink-0 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </TrackedContactLink>
                                )
                            )}
                        </div>
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Perguntas frequentes</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Duvidas comuns sobre o calculo
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas para alinhar lux, lumens, altura e quantidade antes de compras e engenharia
                                fecharem o pedido.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {faq.map((item) => (
                                <details key={item.question} className="group border border-white/15 bg-white/5 p-6 rounded-2xl" open={item === faq[0]}>
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-black uppercase text-white">
                                        {item.question}
                                        <span className="text-accent-premium transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                                    </summary>
                                    <p className="mt-4 text-sm leading-relaxed text-industrial-300">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </article>

            <section className="bg-accent-premium py-16 md:py-20">
                <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            Envie a area e receba a estimativa de postes
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe dimensoes, uso, luminaria prevista e altura pretendida. A B&B ajuda a estimar
                            quantidade, altura e modelo — e aponta o que precisa de projeto luminotecnico.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar area para estimar postes"
                            eventSource="final_calculo_estacionamentos"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Enviar area do estacionamento para estimar postes pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white rounded-lg"
                        >
                            <FileText className="size-5" aria-hidden="true" />
                            Baixar fichas tecnicas
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-4">
                    {internalLinks.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link key={item.href} href={item.href} className="group border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                                <Icon className="mb-5 size-6 text-accent-dark" aria-hidden="true" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-industrial-950">{item.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-industrial-600">{item.description}</p>
                                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                    Ver pagina
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </section>

            <Footer />
        </main>
    )
}
