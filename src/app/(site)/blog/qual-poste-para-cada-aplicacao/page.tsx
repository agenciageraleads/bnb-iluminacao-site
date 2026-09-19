import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    ArrowRight,
    Building2,
    Camera,
    ClipboardCheck,
    Download,
    Factory,
    FileText,
    Flag,
    Landmark,
    Lightbulb,
    Link2,
    MessageCircle,
    Route,
    Ruler,
    Trees,
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

const pageUrl = "https://bebiluminacao.com.br/blog/qual-poste-para-cada-aplicacao"
const pageTitle = "Qual Poste B&B para Cada Aplicacao"
const pageDescription =
    "Guia de decisao pelas 7 linhas B&B: Urban, Orna, Versa, Forza, Vigia, Nexo e Civis. Descubra a linha certa por aplicacao e os codigos para cotar."
const heroImage = "/images/produtos/poste-curvo-duplo-avenida-dia.png"
const whatsappMessage =
    "Ola, vim pelo guia de qual linha para cada aplicacao e quero ajuda para definir a linha e o modelo certos para o meu projeto."

export const metadata: Metadata = {
    title: {
        absolute: "Qual Poste B&B para Cada Aplicacao | Guia das 7 Linhas",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Qual Poste B&B para Cada Aplicacao | Guia das 7 Linhas",
        description: pageDescription,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Postes metalicos B&B em avenida urbana",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Qual Poste B&B para Cada Aplicacao | Guia das 7 Linhas",
        description: pageDescription,
        images: [absoluteUrl(heroImage)],
    },
}

const decisionCards = [
    {
        title: "Comece pela aplicacao",
        description:
            "Via, praca, jardim, quadra, perimetro ou fachada. O local de instalacao e o que aponta para a linha certa antes de qualquer modelo.",
        icon: Route,
    },
    {
        title: "Cada linha tem um proposito",
        description:
            "As 7 linhas B&B nao competem entre si: cobrem iluminacao publica, ornamentacao, decoracao, projetos especiais, seguranca, acessorios e mastros.",
        icon: Lightbulb,
    },
    {
        title: "Codigo agiliza a cotacao",
        description:
            "Cada familia tem um prefixo (BB-URB, BB-ORN, BB-VRS, BB-FRZ, BB-VIG, BB-NEX, BB-CIV). Enviar o codigo encurta a conversa comercial.",
        icon: FileText,
    },
]

const lines = [
    {
        name: "Urban",
        code: "BB-URB-TR / TCS / TCD",
        tagline: "Teleconicos para iluminacao publica",
        summary:
            "A linha de rua da B&B. Postes teleconicos retos (TR), curvos simples (TCS) e curvos duplos (TCD), de 3 a 15 m, engastados (-E) ou flangeados (-F).",
        applications:
            "Vias, avenidas, estacionamentos, condominios, aeroportos e areas agroindustriais.",
        href: "/postes-para-iluminacao-publica",
        icon: Route,
    },
    {
        name: "Orna",
        code: "BB-ORN-<modelo>",
        tagline: "Ornamentais para espacos publicos",
        summary:
            "Dez modelos ornamentais de 6 a 12 m, com desenho pensado para leitura urbana e valorizacao do entorno sem abrir mao da engenharia.",
        applications:
            "Pracas, calcadoes, centros historicos e areas de convivencia.",
        href: "/postes-para-pracas",
        icon: Landmark,
    },
    {
        name: "Versa",
        code: "BB-VRS-*",
        tagline: "Decorativos para ambientes de permanencia",
        summary:
            "Familia decorativa com Girafa LED, rebatedor, Eos e Astrea. Escala mais baixa e presenca visual para quem circula perto do poste.",
        applications:
            "Jardins, calcadas internas, fachadas e areas de lazer.",
        href: "/postes-para-condominios",
        icon: Trees,
    },
    {
        name: "Forza",
        code: "BB-FRZ-*",
        tagline: "Projetos especiais e grandes areas",
        summary:
            "Cruzeta para refletor, poste solar e telecônico articulado. Para carga, altura e demandas fora do padrao de via.",
        applications:
            "Quadras, industrias, patios logisticos e usinas solares.",
        href: "/solucoes/industria",
        icon: Factory,
    },
    {
        name: "Vigia",
        code: "BB-VIG-*",
        tagline: "Seguranca e CFTV",
        summary:
            "Postes para camera dome (6 a 15 m) e bullet (3 a 6 m), com rigidez pensada para imagem nitida e sem vibracao que borre a cena.",
        applications:
            "Perimetros, vias monitoradas, condominios e industrias.",
        href: "/solucoes/infraestrutura",
        icon: Camera,
    },
    {
        name: "Nexo",
        code: "BB-NEX-*",
        tagline: "Acessorios que conectam o sistema",
        summary:
            "Bracos, suportes, cruzetas, chumbadores e suporte de topo para cameras. O que conecta poste, luminaria, camera e fundacao.",
        applications:
            "Complemento de qualquer projeto de poste, luminaria ou CFTV.",
        href: "/produtos/braco-para-luminaria-publica",
        icon: Link2,
    },
    {
        name: "Civis",
        code: "BB-CIV-MB",
        tagline: "Mastros para bandeira",
        summary:
            "Mastros de 6 a 12 m para hasteamento, com acabamento e prumo a altura de fachadas e entradas institucionais.",
        applications:
            "Pracas civicas, fachadas corporativas e entradas institucionais.",
        href: "/solucoes/setor-publico",
        icon: Flag,
    },
]

const scenarioRows = [
    ["Via, avenida ou estrada", "Urban", "Teleconico reto, curvo simples ou curvo duplo conforme largura e sentidos.", "BB-URB-TR / TCS / TCD"],
    ["Estacionamento ou patio logistico", "Urban ou Forza", "Poste reto para cobertura por area; Forza quando ha refletor ou grande vao.", "BB-URB-TR · BB-FRZ-*"],
    ["Praca, calcadao ou centro historico", "Orna", "Ornamental de 6 a 12 m para leitura urbana e valorizacao do espaco.", "BB-ORN-<modelo>"],
    ["Jardim, calcada interna ou area de lazer", "Versa", "Decorativo em escala baixa, com presenca visual proxima de quem circula.", "BB-VRS-*"],
    ["Quadra, industria ou usina solar", "Forza", "Cruzeta para refletor, poste solar ou telecônico articulado.", "BB-FRZ-*"],
    ["Perimetro ou via monitorada (CFTV)", "Vigia", "Poste para camera dome ou bullet, com rigidez para imagem estavel.", "BB-VIG-*"],
    ["Fachada corporativa ou praca civica", "Civis", "Mastro para bandeira de 6 a 12 m, com prumo e acabamento institucional.", "BB-CIV-MB"],
    ["Braco, suporte, cruzeta ou chumbador", "Nexo", "Acessorios que conectam poste, luminaria, camera e fundacao.", "BB-NEX-*"],
]

const quoteChecklist = [
    "Aplicacao: via, praca, jardim, quadra, perimetro, fachada, patio ou area industrial.",
    "Cidade, UF, quantidade, prazo e local de entrega.",
    "Altura pretendida ou faixa aproximada por ponto.",
    "Linha ou modelo desejado, quando ja houver definicao (Urban, Orna, Versa, Forza, Vigia, Nexo, Civis).",
    "Luminaria, camera ou refletor previsto e quantidade de pontos por poste.",
    "Fixacao: engastada, flangeada, chumbadores ou indefinida.",
    "Acabamento: galvanizado, pintado, galvanizado com pintura ou sob memorial.",
    "Projeto, memorial, desenho ou foto do local, quando houver.",
]

const downloadLinks = [
    { title: "Datasheet poste reto (Urban)", href: "/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf" },
    { title: "Datasheet poste curvo duplo (Urban)", href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf" },
    { title: "Datasheet poste Eos (Versa)", href: "/downloads/datasheets/DATASHEET-BB-POSTE-EOS-SIMPLES.pdf" },
    { title: "Datasheet mastro para bandeira (Civis)", href: "/downloads/datasheets/DATASHEET-BB-MST-MASTRO-BANDEIRA.pdf" },
    { title: "Datasheet suporte de luminarias (Nexo)", href: "/downloads/datasheets/DATASHEET-BB-NEXO-SUPORTE-LUMINARIAS.pdf" },
    { title: "Todos os catalogos, datasheets e desenhos tecnicos", href: "/downloads" },
]

const internalLinks = [
    {
        title: "Postes para iluminacao publica",
        description: "Hub da linha Urban para vias, avenidas e areas urbanas.",
        href: "/postes-para-iluminacao-publica",
        icon: Route,
    },
    {
        title: "Solucoes por segmento",
        description: "Industria, infraestrutura, setor publico, construcao privada e mais.",
        href: "/solucoes",
        icon: Building2,
    },
    {
        title: "Poste curvo ou reto",
        description: "Depois de escolher a linha Urban, defina a geometria do topo do poste.",
        href: "/blog/poste-teleconico-ou-reto",
        icon: Ruler,
    },
    {
        title: "Altura de poste",
        description: "Continue a triagem pela altura conforme via, luminaria e espacamento.",
        href: "/blog/altura-de-poste-para-iluminacao-publica",
        icon: Ruler,
    },
]

const faq = [
    {
        question: "Quantas linhas de poste a B&B fabrica?",
        answer:
            "Sao sete linhas: Urban (teleconicos para iluminacao publica), Orna (ornamentais), Versa (decorativos), Forza (projetos especiais), Vigia (seguranca e CFTV), Nexo (acessorios) e Civis (mastros para bandeira).",
    },
    {
        question: "Como escolher entre Urban, Orna e Versa?",
        answer:
            "Urban atende via e area urbana com teleconicos de 3 a 15 m. Orna e para pracas, calcadoes e centros historicos com desenho ornamental. Versa e decorativa, para jardins, fachadas e areas de lazer em escala mais baixa.",
    },
    {
        question: "Qual linha usar em quadra, industria ou usina solar?",
        answer:
            "A linha Forza, de projetos especiais: cruzeta para refletor, poste solar e telecônico articulado, dimensionados para carga, altura e vaos maiores que os de via comum.",
    },
    {
        question: "Existe poste especifico para camera de seguranca?",
        answer:
            "Sim. A linha Vigia tem poste para camera dome (6 a 15 m) e bullet (3 a 6 m), com rigidez pensada para manter a imagem estavel e sem vibracao em perimetros e vias monitoradas.",
    },
    {
        question: "Para que serve a linha Nexo?",
        answer:
            "A Nexo reune os acessorios que conectam o sistema: bracos, suportes, cruzetas, chumbadores e suporte de topo para cameras. E o que liga poste, luminaria, camera e fundacao.",
    },
    {
        question: "O que enviar para a B&B indicar a linha certa?",
        answer:
            "Envie a aplicacao, cidade e UF, altura, quantidade, luminaria ou camera prevista, fixacao, acabamento, prazo e qualquer desenho, memorial ou foto do local.",
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
            id: `${pageUrl}#linhas`,
            name: "Linhas de postes metalicos B&B por aplicacao",
            items: lines.map((line) => ({
                name: `${line.name} (${line.code})`,
                description: `${line.tagline}. ${line.summary} Aplicacoes: ${line.applications}`,
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

export default function QualPosteParaCadaAplicacaoPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="qual-poste-para-cada-aplicacao-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento pelo guia de linhas por aplicacao"
                    eventSource="floating_qual_poste_por_aplicacao"
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
                            <Lightbulb className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia de decisao pelas 7 linhas B&B
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Qual Poste B&B para Cada Aplicacao
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Via, praca, jardim, quadra, perimetro ou fachada? A B&B tem sete linhas, cada uma com um
                            proposito. Este guia percorre todas elas e indica a certa por cenario, com os codigos para
                            cotar.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo guia de linhas por aplicacao"
                                eventSource="hero_qual_poste_por_aplicacao"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar orcamento pela linha certa de poste pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/postes-metalicos"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
                            >
                                <Building2 className="size-5" aria-hidden="true" />
                                Ver postes metalicos
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
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>As sete linhas</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Cada linha resolve um tipo de projeto
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                A B&B fabrica solucoes metalicas para o urbanismo: iluminacao, ornamentacao, decoracao,
                                projetos especiais, seguranca, acessorios e mastros. Comece pela linha que corresponde a
                                sua aplicacao e leve o codigo para a cotacao.
                            </p>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-2">
                            {lines.map((line) => {
                                const Icon = line.icon
                                return (
                                    <Link
                                        key={line.name}
                                        href={line.href}
                                        className="group flex flex-col border border-industrial-200 p-6 hover:border-industrial-950 rounded-2xl"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex size-12 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
                                                <Icon className="size-6" aria-hidden="true" />
                                            </div>
                                            <span className="rounded-md bg-industrial-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-accent-dark">
                                                {line.code}
                                            </span>
                                        </div>
                                        <h3 className="mt-5 text-2xl font-black uppercase tracking-tight text-industrial-950">
                                            {line.name}
                                        </h3>
                                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-industrial-500">
                                            {line.tagline}
                                        </p>
                                        <p className="mt-4 text-sm leading-relaxed text-industrial-600">{line.summary}</p>
                                        <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-industrial-800">
                                            <span className="mt-2 size-1.5 shrink-0 bg-accent-dark" aria-hidden="true" />
                                            <span>
                                                <span className="font-bold">Aplicacoes: </span>
                                                {line.applications}
                                            </span>
                                        </p>
                                        <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                            Ver pagina relacionada
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Por cenario</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Da aplicacao direto para a linha
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Localize a sua obra na coluna da esquerda e leve a linha e o codigo indicados. A confirmacao
                                final depende de projeto, altura, luminaria, fixacao e acabamento.
                            </p>
                        </div>
                        <div className="overflow-hidden border border-white/15 rounded-2xl">
                            {scenarioRows.map(([scenario, line, note, code]) => (
                                <div
                                    key={scenario}
                                    className="grid gap-2 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[1.1fr_0.6fr_1.4fr_0.8fr] md:items-center md:gap-4"
                                >
                                    <p className="text-sm font-black uppercase tracking-tight text-white">{scenario}</p>
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-premium">{line}</p>
                                    <p className="text-sm leading-relaxed text-industrial-300">{note}</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-industrial-200">{code}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-xs text-industrial-400">
                            Fontes tecnicas:{" "}
                            <a href="https://www.abnt.org.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">ABNT — NBR 14744 (postes de aço) e NBR 5101 (iluminação pública)</a>
                            {" · "}
                            <a href="https://www.inmetro.gov.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">INMETRO</a>
                        </p>
                    </div>
                </section>

                <section className="py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Dados para cotacao</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que enviar para fechar a linha certa
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Quando a linha ainda esta em aberto, envie a aplicacao e os dados da obra. Isso ajuda o time
                                comercial a transformar a busca em uma cotacao tecnica com o codigo correto.
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

                <section className="bg-industrial-50 py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Arquivos tecnicos</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Datasheets por linha para comparar antes de cotar
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Fichas tecnicas e desenhos ajudam compras e engenharia a confirmar se o projeto pede Urban,
                                Orna, Versa, Forza, Vigia, Nexo ou Civis.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {downloadLinks.map((file) =>
                                file.href === "/downloads" ? (
                                    <a
                                        key={file.href}
                                        href={file.href}
                                        className="group flex items-center justify-between gap-4 border border-industrial-200 bg-white p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950 rounded-lg"
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
                                        eventSource="blog_qual_poste_para_cada_aplicacao"
                                        eventLabel={file.title}
                                        extraPayload={{ download_type: "datasheet" }}
                                        className="group flex items-center justify-between gap-4 border border-industrial-200 bg-white p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950 rounded-lg"
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
                                Duvidas comuns sobre as linhas B&B
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas para escolher a linha certa antes de compras, engenharia e fornecedor falarem de
                                preco, prazo e fabricacao.
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
                            Na duvida, a engenharia escolhe a linha com voce
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Mande a aplicacao, a altura pretendida e o local. O time tecnico indica a linha, o modelo e a
                            fixacao certos para o projeto, com a documentacao de apoio.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar aplicacao para escolher a linha de poste"
                            eventSource="final_qual_poste_por_aplicacao"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Enviar aplicacao para escolher a linha de poste pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white rounded-lg"
                        >
                            <Download className="size-5" aria-hidden="true" />
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

            <section className="bg-white py-10">
                <div className="container mx-auto grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
                        ["Postes para pracas", "/postes-para-pracas"],
                        ["Postes para condominios", "/postes-para-condominios"],
                        ["Postes para estacionamentos", "/postes-para-estacionamentos"],
                        ["Solucoes por segmento", "/solucoes"],
                        ["Ver todos os produtos", "/produtos"],
                        ["Catalogos e downloads", "/downloads"],
                    ].map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="group flex items-center justify-between gap-4 border border-industrial-200 p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950 rounded-lg"
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
