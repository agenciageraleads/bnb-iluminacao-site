import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    Anchor,
    ArrowRight,
    Building2,
    ClipboardCheck,
    Download,
    Factory,
    FileText,
    Hammer,
    Landmark,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Wrench,
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

const pageUrl = "https://bebiluminacao.com.br/blog/poste-flangeado-ou-engastado"
const pageTitle = "Poste Flangeado ou Engastado"
const pageDescription =
    "Compare poste flangeado e engastado para definir fixacao, base, chumbadores, fundacao e dados de cotacao conforme projeto e aplicacao."
const heroImage = "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg"
const whatsappMessage =
    "Ola, vim pelo guia de poste flangeado ou engastado e quero ajuda para definir fixacao e orcamento tecnico."

export const metadata: Metadata = {
    title: {
        absolute: "Poste Flangeado ou Engastado | Guia Tecnico B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Poste Flangeado ou Engastado | Guia Tecnico B&B",
        description: pageDescription,
        url: pageUrl,
        type: "article",
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

const decisionCards = [
    {
        title: "Fundacao vem antes do preco",
        description:
            "A fixacao precisa conversar com base, chumbadores, solo, concreto, carga, altura e acesso da obra.",
        icon: Anchor,
    },
    {
        title: "Memorial pode mandar",
        description:
            "Se edital, projeto ou padrao local ja define engastado ou flangeado, use isso como referencia inicial.",
        icon: FileText,
    },
    {
        title: "Manutencao muda a decisao",
        description:
            "Base flangeada pode facilitar remocao e substituicao; engastado depende mais da solucao civil prevista.",
        icon: Wrench,
    },
]

const fixationRows = [
    [
        "Poste flangeado",
        "Poste com base/flange para fixacao por chumbadores ou parafusos na fundacao.",
        "Costuma entrar quando a obra civil preve base aparafusada, interface clara com chumbadores e possivel necessidade de remocao futura.",
    ],
    [
        "Poste engastado",
        "Poste instalado com trecho embutido no solo, bloco ou fundacao de concreto.",
        "Faz sentido quando o projeto civil/estrutural ja preve engastamento e define profundidade, concreto, solo e travamento.",
    ],
    [
        "Base e chumbadores",
        "Conjunto que liga poste, flange, concreto e obra civil.",
        "Nao deve ser tratado como acessorio generico: medidas, furo, prumo, arruela, porca e classe precisam seguir projeto.",
    ],
    [
        "Fixacao indefinida",
        "Quando o comprador ainda nao sabe se a obra pede base ou engastamento.",
        "O melhor caminho e enviar aplicacao, altura, local, luminaria, quantidade, fotos e memorial para triagem tecnica.",
    ],
]

const applicationCards = [
    {
        title: "Iluminacao publica",
        description:
            "A decisao depende de padrao da obra, via, altura, luminaria, memorial, concessionaria e responsavel tecnico.",
        icon: Landmark,
    },
    {
        title: "Loteamentos",
        description:
            "Padronizacao, repetibilidade, base civil e manutencao futura pesam bastante em ruas internas e acessos.",
        icon: Building2,
    },
    {
        title: "Condominios",
        description:
            "Visual, paisagismo, manutencao, seguranca e acabamento precisam ficar alinhados com a base escolhida.",
        icon: ShieldCheck,
    },
    {
        title: "Areas industriais",
        description:
            "Circulacao de veiculos, patios, galpoes e interferencias operacionais exigem mais cuidado com fundacao.",
        icon: Factory,
    },
    {
        title: "Estacionamentos",
        description:
            "Acesso de manutencao, risco de impacto, altura, luminaria e fluxo de carros influenciam a especificacao.",
        icon: Ruler,
    },
    {
        title: "Compra sob memorial",
        description:
            "Quando existe desenho ou memoria tecnica, a cotacao deve partir do documento e nao apenas do nome comercial.",
        icon: ClipboardCheck,
    },
]

const choiceGuide = [
    {
        title: "Considere flangeado quando",
        items: [
            "o projeto civil ja preve base de concreto com chumbadores;",
            "a obra precisa de interface aparafusada e controle de prumo na instalacao;",
            "remocao, substituicao ou manutencao futura sao pontos relevantes;",
            "o memorial cita flange, base, chumbador, placa ou gabarito.",
        ],
        href: "/produtos/poste-teleconico",
        icon: Anchor,
    },
    {
        title: "Considere engastado quando",
        items: [
            "o projeto ja definiu trecho embutido, bloco, profundidade ou fundacao;",
            "a execucao civil esta preparada para receber o poste diretamente;",
            "a obra prioriza uma solucao sem placa aparente na base;",
            "solo, concreto, altura e carga foram avaliados pelo responsavel tecnico.",
        ],
        href: "/postes-para-iluminacao-publica",
        icon: Hammer,
    },
    {
        title: "Peça revisao tecnica quando",
        items: [
            "o comprador so sabe a altura ou tem apenas uma foto de referencia;",
            "a base civil ainda nao foi executada ou nao tem desenho;",
            "ha duvida entre chumbador, engastamento, sapata ou bloco;",
            "o poste recebe braco, luminaria pesada, vento relevante ou instalacao critica.",
        ],
        href: "/postes-metalicos",
        icon: ClipboardCheck,
    },
]

const quoteChecklist = [
    "Aplicacao: via, praca, loteamento, condominio, estacionamento, patio ou area industrial.",
    "Cidade, UF, quantidade, prazo e local de entrega.",
    "Altura prevista, modelo do poste, braco/suporte e luminaria.",
    "Fixacao desejada: flangeado, engastado, base com chumbador ou indefinido.",
    "Se for flangeado: desenho da base, medidas de flange, furo, chumbadores ou gabarito.",
    "Se for engastado: profundidade prevista, bloco/fundacao, solo e restricoes da obra civil.",
    "Acabamento: galvanizado, pintado, galvanizado com pintura ou exigencia do memorial.",
    "Projeto, memorial, edital, foto do local, desenho tecnico ou referencia visual, quando houver.",
]

const internalLinks = [
    {
        title: "Postes metalicos",
        description: "Compare modelos, aplicacoes, altura, acabamento e caminhos de compra no hub nacional.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Normas para postes",
        description: "Organize normas, memoriais, padroes locais e documentos antes da cotacao.",
        href: "/blog/normas-para-postes-de-iluminacao",
        icon: FileText,
    },
    {
        title: "Altura de poste",
        description: "A altura influencia carga, braco, luminaria, fundacao e decisao de fixacao.",
        href: "/blog/altura-de-poste-para-iluminacao-publica",
        icon: Ruler,
    },
    {
        title: "Poste galvanizado ou pintado",
        description: "Depois da fixacao, defina acabamento conforme ambiente, durabilidade e memorial.",
        href: "/blog/poste-galvanizado-ou-pintado",
        icon: ShieldCheck,
    },
]

const downloadLinks = [
    {
        title: "Datasheet poste reto",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf",
    },
    {
        title: "Datasheet poste curvo simples",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf",
    },
    {
        title: "Datasheet poste curvo duplo",
        href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf",
    },
    {
        title: "Catalogos e desenhos tecnicos",
        href: "/downloads",
    },
]

const faq = [
    {
        question: "Qual a diferenca entre poste flangeado e engastado?",
        answer:
            "Poste flangeado usa base/flange presa por chumbadores ou parafusos na fundacao. Poste engastado tem um trecho embutido no solo, bloco ou concreto conforme projeto civil/estrutural.",
    },
    {
        question: "Poste flangeado e sempre melhor?",
        answer:
            "Nao. Ele pode ser melhor quando a obra preve base aparafusada, chumbadores e manutencao futura. A escolha depende de projeto, fundacao, altura, carga, local e memorial.",
    },
    {
        question: "Poste engastado dispensa projeto de fundacao?",
        answer:
            "Nao. O engastamento tambem precisa considerar profundidade, solo, concreto, altura, vento, luminaria e responsabilidade tecnica da obra.",
    },
    {
        question: "A B&B fornece poste com base e chumbador?",
        answer:
            "A B&B fabrica postes e estruturas conforme especificacao. Para cotar base, flange, chumbadores ou gabarito, envie desenho, memorial ou dados da obra para validacao comercial e tecnica.",
    },
    {
        question: "O que enviar para definir a fixacao correta?",
        answer:
            "Envie aplicacao, cidade e UF, altura, quantidade, luminaria, braco, acabamento, local de instalacao, tipo de fundacao, fotos e qualquer projeto, memorial ou desenho existente.",
    },
]

function createArticleSchema() {
    return {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: pageTitle,
        description: pageDescription,
        image: absoluteUrl(heroImage),
        datePublished: "2026-06-14",
        dateModified: "2026-06-14",
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
            id: `${pageUrl}#comparativo`,
            name: "Comparativo entre poste flangeado e engastado",
            items: fixationRows.map(([name, definition, use]) => ({
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

export default function PosteFlangeadoOuEngastadoPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="poste-flangeado-ou-engastado-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento pelo guia flangeado ou engastado"
                    eventSource="floating_flangeado_ou_engastado"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/62 via-industrial-950/12 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Anchor className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia tecnico de fixacao
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Poste Flangeado ou Engastado: Como Escolher a Fixacao
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            A duvida nao e so comercial. Flangeado e engastado mudam a conversa sobre base,
                            chumbadores, fundacao, manutencao e responsabilidade tecnica da obra.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo guia flangeado ou engastado"
                                eventSource="hero_flangeado_ou_engastado"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de poste flangeado ou engastado pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
                            >
                                <Download className="size-5" aria-hidden="true" />
                                Ver catalogos
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
                            <div key={card.title} className="flex items-start gap-4 bg-white p-5">
                                <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium">
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
                            <SectionLabel>Comparativo</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                A fixacao muda a interface entre poste e obra civil
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Poste flangeado e poste engastado podem atender aplicacoes parecidas, mas nao devem ser
                                comprados como se fossem a mesma solucao. A diferenca principal esta na forma como o poste
                                encontra a fundacao.
                            </p>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                A decisao final precisa considerar projeto civil, memorial, altura, luminaria, vento,
                                acabamento, local de instalacao e responsavel tecnico.
                            </p>
                        </div>

                        <div className="overflow-hidden border border-industrial-200">
                            {fixationRows.map(([term, definition, use]) => (
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
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Aplicacoes</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O local de instalacao indica o cuidado com a base
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                O nome da fixacao e apenas parte da compra. A aplicacao, a obra civil e o plano de
                                manutencao determinam quais dados precisam ir para a cotacao.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {applicationCards.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.title} className="border border-white/15 bg-white/5 p-6">
                                        <div className="mb-6 flex size-12 items-center justify-center bg-white text-industrial-950">
                                            <Icon className="size-6 text-accent-dark" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-black uppercase tracking-tight text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-industrial-300">{item.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="py-20 md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Escolha inicial</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Como organizar a decisao antes de pedir preco
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Use estes cenarios para reduzir ambiguidade com compras, engenharia e fornecedor. A B&B
                                pode orientar a cotacao, mas a solucao final deve respeitar projeto e responsabilidade
                                tecnica.
                            </p>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-3">
                            {choiceGuide.map((group) => {
                                const Icon = group.icon
                                return (
                                    <Link key={group.title} href={group.href} className="group border border-industrial-200 p-6 hover:border-industrial-950">
                                        <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                            <Icon className="size-6" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                            {group.title}
                                        </h3>
                                        <ul className="mt-5 space-y-3">
                                            {group.items.map((item) => (
                                                <li key={item} className="flex gap-3 text-sm leading-relaxed text-industrial-600">
                                                    <span className="mt-2 size-1.5 shrink-0 bg-accent-dark" aria-hidden="true" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                            Ver caminho relacionado
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
                            <SectionLabel>Dados para cotacao</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que enviar quando a fixacao ainda nao esta definida
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Quanto mais claro for o contexto da obra, menor a chance de comparar propostas com bases
                                diferentes. Use a lista como briefing tecnico antes de pedir orcamento.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {quoteChecklist.map((item) => (
                                <div key={item} className="flex items-start gap-4 border border-industrial-200 bg-white p-5">
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
                                Consulte modelos antes de fechar base e fundacao
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Datasheets ajudam a alinhar modelo, altura e geometria. Para base, chumbador ou
                                engastamento, use tambem o memorial ou desenho da obra.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {downloadLinks.map((file) => (
                                <a
                                    key={file.href}
                                    href={file.href}
                                    target={file.href === "/downloads" ? undefined : "_blank"}
                                    rel={file.href === "/downloads" ? undefined : "noopener noreferrer"}
                                    className="group flex items-center justify-between gap-4 border border-industrial-200 p-5 text-sm font-black uppercase tracking-widest text-industrial-800 transition-colors hover:border-industrial-950"
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
                                Duvidas comuns sobre base, flange e engastamento
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas para transformar uma busca generica em conversa tecnica com compras,
                                engenharia e fabricante.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {faq.map((item) => (
                                <details key={item.question} className="group border border-white/15 bg-white/5 p-6" open={item === faq[0]}>
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
                            Envie os dados da base antes de fechar o poste
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe modelo, altura, quantidade, luminaria, local, fixacao desejada, fundacao e desenho
                            existente. A B&B ajuda a organizar a cotacao tecnica.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados para definir fixacao de poste"
                            eventSource="final_flangeado_ou_engastado"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados para definir poste flangeado ou engastado pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/postes-metalicos"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <Building2 className="size-5" aria-hidden="true" />
                            Ver postes metalicos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-4">
                    {internalLinks.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link key={item.href} href={item.href} className="group border border-industrial-200 p-5 hover:border-industrial-950">
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
                        ["Poste teleconico", "/produtos/poste-teleconico"],
                        ["Poste teleconico ou reto", "/blog/poste-teleconico-ou-reto"],
                        ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
                        ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
                        ["Catalogos e downloads", "/downloads"],
                    ].map(([label, href]) => (
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
