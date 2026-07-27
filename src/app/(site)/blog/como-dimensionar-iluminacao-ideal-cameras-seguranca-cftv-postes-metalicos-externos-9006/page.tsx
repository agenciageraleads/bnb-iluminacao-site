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
    FileText,
    Gauge,
    Lightbulb,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Video,
    Wind,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
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
    "https://bebiluminacao.com.br/blog/como-dimensionar-iluminacao-ideal-cameras-seguranca-cftv-postes-metalicos-externos-9006"
const pageTitle = "Poste para Camera: Como Dimensionar CFTV"
const pageDescription =
    "Altura, rigidez e iluminacao de apoio para imagem nitida: como dimensionar postes metalicos para cameras de seguranca (CFTV) em areas externas — dome e bullet, sem vibracao que borre a cena."
const heroImage = "/images/seo/postes-metalicos/area-industrial-iluminada-postes-metalicos.webp"
const whatsappMessage =
    "Ola, vim pelo guia de poste para camera (CFTV) e quero ajuda para dimensionar altura, rigidez e iluminacao do meu projeto."

export const metadata: Metadata = {
    title: {
        absolute: "Poste para Camera (CFTV): Como Dimensionar Iluminacao e Rigidez | Guia B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Poste para Camera (CFTV): Como Dimensionar | Guia B&B",
        description: pageDescription,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Area externa iluminada com postes metalicos B&B para monitoramento",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Poste para Camera (CFTV): Como Dimensionar | Guia B&B",
        description: pageDescription,
        images: [absoluteUrl(heroImage)],
    },
}

const decisionCards = [
    {
        title: "Altura define a cobertura",
        description:
            "A altura da camera fixa o campo de visao e o angulo. Alto demais perde detalhe do rosto/placa; baixo demais reduz o alcance e expoe a vandalismo.",
        icon: Ruler,
    },
    {
        title: "Rigidez define a nitidez",
        description:
            "Poste que balanca com vento borra a imagem e dispara alarmes falsos. A rigidez do poste e tao importante quanto a camera.",
        icon: Wind,
    },
    {
        title: "Luz de apoio define a cena",
        description:
            "Sem luz suficiente e uniforme, a camera nao entrega imagem util a noite. Iluminacao de apoio e parte do projeto de CFTV.",
        icon: Lightbulb,
    },
]

const cameraRows = [
    [
        "Camera dome",
        "Visao ampla de area, em posicao elevada.",
        "Postes mais altos (faixa de 6 a 15 m) para cobrir patios, perimetros e vias monitoradas.",
    ],
    [
        "Camera bullet",
        "Visao direcionada para um alvo ou corredor.",
        "Postes mais baixos (faixa de 3 a 6 m) para acessos, cancelas e pontos especificos.",
    ],
    [
        "Suporte e topo",
        "Interface entre poste, camera e caixa de equipamentos.",
        "Suporte de topo dedicado mantem a camera firme, alinhada e protegida (linha Nexo).",
    ],
]

const lightingPoints = [
    {
        title: "Nivel e uniformidade",
        items: [
            "garanta lux suficiente na cena, nao so no ponto sob o poste;",
            "uniformidade evita areas escuras onde a imagem perde detalhe;",
            "confirme o minimo com a norma e o fabricante da camera.",
        ],
        icon: Gauge,
    },
    {
        title: "Contraluz e ofuscamento",
        items: [
            "evite a luminaria dentro do campo de visao da camera;",
            "controle contraluz que transforma pessoas em silhuetas;",
            "posicione a luz para iluminar a cena, nao a lente.",
        ],
        icon: ShieldCheck,
    },
    {
        title: "Luz branca ou infravermelho",
        items: [
            "luz branca ajuda cor e efeito dissuasorio; IR entrega imagem discreta;",
            "combine com a tecnologia da camera (colorida noturna, IR, starlight);",
            "temperatura de cor coerente evita distorcao na cena.",
        ],
        icon: Lightbulb,
    },
]

const stabilityRows = [
    ["Vento e regiao", "Velocidade de vento local define o esforco no poste.", "Poste e base dimensionados para a regiao mantem a camera estavel."],
    ["Altura e balanco", "Quanto mais alto, mais o topo tende a oscilar.", "Rigidez e secao do poste controlam a deflexao no topo."],
    ["Carga no topo", "Camera, suporte e caixa somam peso e area de vento.", "Informe a carga real para dimensionar o poste correto."],
    ["Fixacao", "Engaste ou flange transferem o esforco para a fundacao.", "Fixacao adequada evita vibracao que borra a imagem."],
]

const quoteChecklist = [
    "Tipo de camera: dome, bullet ou combinacao, e quantidade por poste.",
    "Objetivo: visao geral de area, leitura de placa (LPR) ou reconhecimento facial.",
    "Altura pretendida e campo de visao esperado.",
    "Carga no topo: peso e dimensoes de camera, suporte e caixa de equipamentos.",
    "Iluminacao prevista e se ha necessidade de luz de apoio no mesmo poste.",
    "Cidade, UF (para vento), quantidade, prazo e local de entrega.",
    "Fixacao: engastado, flangeado, chumbadores ou indefinido.",
    "Projeto, memorial ou planta do perimetro, quando houver.",
]

const downloadLinks = [
    { title: "Datasheet suporte de luminarias (Nexo)", href: "/downloads/datasheets/DATASHEET-BB-NEXO-SUPORTE-LUMINARIAS.pdf" },
    { title: "Datasheet chumbador (Nexo)", href: "/downloads/datasheets/DATASHEET-BB-NEXO-CHUMBADOR.pdf" },
    { title: "Datasheet poste reto", href: "/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf" },
    { title: "Todos os catalogos, datasheets e desenhos tecnicos", href: "/downloads" },
]

const internalLinks = [
    {
        title: "Qual linha para cada aplicacao",
        description: "A linha Vigia e dedicada a seguranca e CFTV entre as 7 linhas B&B.",
        href: "/blog/qual-poste-para-cada-aplicacao",
        icon: Camera,
    },
    {
        title: "Solucoes para infraestrutura",
        description: "Perimetros, vias e areas monitoradas em projetos de infraestrutura.",
        href: "/solucoes/infraestrutura",
        icon: Building2,
    },
    {
        title: "Altura de poste",
        description: "A altura da camera muda cobertura, detalhe e rigidez necessaria.",
        href: "/blog/altura-de-poste-para-iluminacao-publica",
        icon: Ruler,
    },
    {
        title: "Poste curvo ou reto",
        description: "Defina a geometria do poste conforme a posicao da camera e da luz.",
        href: "/blog/poste-teleconico-ou-reto",
        icon: Video,
    },
]

const faq = [
    {
        question: "Qual altura de poste para camera de seguranca?",
        answer:
            "Depende do objetivo. Cameras dome de visao ampla costumam usar postes mais altos (faixa de 6 a 15 m); cameras bullet direcionadas usam postes mais baixos (faixa de 3 a 6 m). Leitura de placa e reconhecimento facial pedem altura e angulo especificos — confirme com o projeto de CFTV.",
    },
    {
        question: "Por que a rigidez do poste importa no CFTV?",
        answer:
            "Poste que oscila com o vento faz a imagem tremer, reduz o alcance util do zoom e gera alarmes falsos em analitico de video. Um poste com rigidez adequada mantem a camera estavel e a cena nitida.",
    },
    {
        question: "Preciso de iluminacao junto com a camera?",
        answer:
            "Quase sempre. Sem luz suficiente e uniforme, a camera nao entrega imagem util a noite. A luz de apoio deve iluminar a cena sem ofuscar a lente nem criar contraluz. Pode ser luz branca, infravermelho ou a combinacao com a tecnologia da camera.",
    },
    {
        question: "Da para ter camera e luminaria no mesmo poste?",
        answer:
            "Sim, e comum em perimetros e patios. E preciso dimensionar o poste para a carga somada, posicionar a luz para nao ofuscar a camera e usar suporte de topo adequado. Informe todos os equipamentos previstos para dimensionar corretamente.",
    },
    {
        question: "A B&B fornece o poste ou tambem a camera?",
        answer:
            "A B&B fabrica o poste, o suporte e a fixacao (linhas Vigia e Nexo) dimensionados para a camera e a iluminacao do projeto. A camera e o sistema de CFTV ficam com o integrador; a B&B garante a estrutura estavel e correta para receber esses equipamentos.",
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
            id: `${pageUrl}#cameras`,
            name: "Postes metalicos para cameras de seguranca (CFTV)",
            items: cameraRows.map(([name, definition, use]) => ({
                name,
                description: `${definition} ${use}`,
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

export default function PosteParaCameraCftvPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="poste-camera-cftv-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento pelo guia de poste para camera CFTV"
                    eventSource="floating_poste_cftv"
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
                            <Camera className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia tecnico de CFTV e postes
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Poste para Camera: Como Dimensionar
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Altura, rigidez e iluminacao de apoio para imagem nitida — o dimensionamento certo de CFTV,
                            sem vibracao que borre a cena. O poste e parte do sistema de seguranca, nao um detalhe.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo guia de poste para camera CFTV"
                                eventSource="hero_poste_cftv"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar dimensionamento de poste para camera CFTV pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar dimensionamento
                            </WhatsAppLink>
                            <Link
                                href="/blog/qual-poste-para-cada-aplicacao"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
                            >
                                <ShieldCheck className="size-5" aria-hidden="true" />
                                Conheca a linha Vigia
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
                            <SectionLabel>Camera e poste</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O tipo de camera aponta o poste
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Dome para visao ampla, bullet para alvo direcionado. Cada uma pede uma faixa de altura e um
                                suporte de topo. A linha Vigia da B&B cobre os dois casos, com a linha Nexo nos suportes.
                            </p>
                        </div>

                        <div className="overflow-hidden border border-industrial-200 rounded-2xl">
                            {cameraRows.map(([term, definition, use]) => (
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
                            <a href="https://www.abnt.org.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">ABNT — NBR 14744 (postes de aço) e NBR 5101 (iluminação)</a>
                            {" · "}
                            <a href="https://www.inmetro.gov.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">INMETRO</a>
                        </p>
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Iluminacao para CFTV</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Luz certa e o que da imagem util a noite
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Camera boa com luz ruim entrega cena inutil. A iluminacao de apoio faz parte do projeto de
                                seguranca — nivel, direcao e tecnologia da luz precisam conversar com a camera.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {lightingPoints.map((point) => {
                                const Icon = point.icon
                                return (
                                    <div key={point.title} className="border border-white/15 bg-white/5 p-6 rounded-2xl">
                                        <div className="mb-6 flex size-12 items-center justify-center bg-white text-industrial-950 rounded-lg">
                                            <Icon className="size-6 text-accent-dark" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-black uppercase tracking-tight text-white">{point.title}</h3>
                                        <ul className="mt-5 space-y-3">
                                            {point.items.map((item) => (
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
                            <SectionLabel>Rigidez e vibracao</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Imagem estavel comeca no poste
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                O que faz a imagem tremer nao e so a camera: e o poste oscilando. Estes fatores definem a
                                rigidez necessaria para manter a cena nitida ao longo do ano.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {stabilityRows.map(([factor, why, poste]) => (
                                <div key={factor} className="border border-industrial-200 bg-white p-5 rounded-lg">
                                    <p className="text-sm font-black uppercase tracking-tight text-industrial-950">{factor}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-industrial-700">{why}</p>
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
                                O que enviar para dimensionar o poste de CFTV
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Com estes dados, a B&B dimensiona altura, rigidez, suporte e fixacao do poste para a camera
                                e a iluminacao do projeto.
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
                                Postes, suportes e fixacao para CFTV
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Datasheets de poste, suporte de topo e fixacao ajudam integrador e engenharia a montar um
                                ponto de camera estavel.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {downloadLinks.map((file) => (
                                <a
                                    key={file.href}
                                    href={file.href}
                                    target={file.href === "/downloads" ? undefined : "_blank"}
                                    rel={file.href === "/downloads" ? undefined : "noopener noreferrer"}
                                    className="group flex items-center justify-between gap-4 border border-industrial-200 p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950 rounded-lg"
                                >
                                    <span className="inline-flex items-center gap-3">
                                        <Download className="size-5 text-accent-dark" aria-hidden="true" />
                                        {file.title}
                                    </span>
                                    <ArrowRight className="size-4 shrink-0 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Perguntas frequentes</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Duvidas comuns sobre poste para camera
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas para alinhar altura, rigidez e iluminacao antes de integrador e engenharia
                                fecharem o ponto de CFTV.
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
                            Envie o projeto de CFTV e receba o poste certo
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe tipo de camera, altura, carga no topo, iluminacao prevista e cidade. A B&B dimensiona
                            altura, rigidez, suporte e fixacao para uma imagem estavel.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar projeto de CFTV para dimensionar poste"
                            eventSource="final_poste_cftv"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Enviar projeto de CFTV para dimensionar poste pelo WhatsApp"
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
