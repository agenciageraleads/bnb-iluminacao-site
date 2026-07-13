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
    Sparkles,
    Waves,
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

const pageUrl = "https://bebiluminacao.com.br/blog/durabilidade-dos-postes-metalicos"
const pageTitle = "Durabilidade de Postes Metalicos"
const pageDescription =
    "Quanto dura um poste metalico? Entenda corrosao, preparo de superficie, pintura eletrostatica, galvanizacao e como escolher o acabamento certo por ambiente."
const heroImage = "/images/seo/postes-metalicos/poste-metalico-galvanizado-instalado-em-area-externa.webp"
const ebookHref = "/downloads/guia-bb-durabilidade-postes-metalicos.pdf"
const ebookFileName = "B&B - Guia de Durabilidade dos Postes Metalicos.pdf"
const whatsappMessage =
    "Ola, vim pelo guia de durabilidade de postes metalicos e quero ajuda para definir o acabamento certo para o ambiente da minha obra."

export const metadata: Metadata = {
    title: {
        absolute: "Durabilidade de Postes Metalicos | Guia Tecnico B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Durabilidade de Postes Metalicos | Guia Tecnico B&B",
        description: pageDescription,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Poste metalico galvanizado instalado em area externa",
            },
        ],
    },
}

const decisionCards = [
    {
        title: "O ambiente decide",
        description:
            "Umidade, maresia, poluicao, produtos quimicos e manutencao pesam mais que o preco inicial. Nao existe 'dura X anos': depende de onde o poste fica.",
        icon: Waves,
    },
    {
        title: "A preparacao define",
        description:
            "Limpeza, desengraxe e fosfatizacao antes da tinta determinam a aderencia e a vida util. Acabamento bom sobre aco mal preparado falha cedo.",
        icon: Sparkles,
    },
    {
        title: "O acabamento certo",
        description:
            "Pintura eletrostatica, galvanizacao a fogo ou galvanizado com pintura: cada um resiste de um jeito ao mesmo ambiente.",
        icon: ShieldCheck,
    },
]

const comparisonRows = [
    [
        "Pintura liquida",
        "Acabamento comum de serralheria, com menor custo inicial e mais dependente da mao de obra e da preparacao.",
        "Menor padronizacao e mais manutencao ao longo do tempo. Em poste externo permanente, tende a render menos.",
    ],
    [
        "Pintura eletrostatica",
        "Tinta em po com cura em estufa, camada uniforme e resistente a risco e abrasao. Tinta poliester para uso externo.",
        "Excelente custo-beneficio no ambiente urbano sem maresia forte. Sozinha, nao e a melhor opcao em litoral.",
    ],
    [
        "Galvanizacao a fogo",
        "Aco mergulhado em zinco fundido (NBR 6323). O zinco se sacrifica antes do aco e protege ate em riscos pequenos.",
        "Maxima resistencia a corrosao e baixa manutencao. Indicada para litoral, rodovia, obra publica e industria.",
    ],
    [
        "Galvanizado + pintura",
        "Combina a protecao anticorrosiva da galvanizacao com a cor e o acabamento da pintura eletrostatica.",
        "Sistema premium: estetica + durabilidade. Indicado para alto padrao, orla e projetos arquitetonicos.",
    ],
]

const factorCards = [
    {
        title: "Corrosao e ambiente",
        description: "Umidade, oxigenio, sais, poluicao e produtos quimicos definem a agressividade. A ISO 12944 classifica de C1 a CX.",
        icon: ShieldCheck,
    },
    {
        title: "Preparo de superficie",
        description: "Limpeza e desengraxe removem oleo e carepa. Tinta sobre superficie mal preparada desplaca e corroi por baixo.",
        icon: Sparkles,
    },
    {
        title: "Fosfatizacao",
        description: "Camada microscopica entre o aco e a tinta que melhora a aderencia e aumenta a resistencia a corrosao.",
        icon: Paintbrush,
    },
    {
        title: "Acabamento adequado",
        description: "Eletrostatica para o urbano; galvanizacao para ambiente agressivo; combinado quando se quer estetica e protecao.",
        icon: Landmark,
    },
    {
        title: "Dano mecanico",
        description: "Escada, batida de veiculo, rocadeira e corrente danificam qualquer acabamento e abrem ponto de corrosao.",
        icon: Wrench,
    },
    {
        title: "Manutencao preventiva",
        description: "Lavar, corrigir riscos cedo e inspecionar anualmente faz um arranhao pequeno nao virar ferrugem grande.",
        icon: ClipboardCheck,
    },
]

const processSteps = [
    "Limpeza das impurezas maiores",
    "Limpeza das impurezas menores",
    "Desengraxe (remocao de oleo e oleosidade)",
    "Fosfatizacao (preparacao da peca)",
    "Secagem",
    "Pintura eletrostatica a po",
    "Cura em estufa",
    "Inspecao visual antes da expedicao",
]

const choiceGuide = [
    {
        title: "Pintura eletrostatica quando",
        items: [
            "o ambiente e urbano, sem maresia forte;",
            "a prioridade e estetica com bom custo-beneficio;",
            "o local permite manutencao futura;",
            "condominios, estacionamentos, pracas e fachadas.",
        ],
        icon: Paintbrush,
    },
    {
        title: "Galvanizacao quando",
        items: [
            "o ambiente e agressivo (litoral, industria, rural pesado);",
            "a manutencao futura e dificil ou cara;",
            "a prioridade e vida util longa e baixa manutencao;",
            "rodovias, obras publicas e prefeituras.",
        ],
        icon: ShieldCheck,
    },
    {
        title: "Galvanizado + pintura quando",
        items: [
            "o projeto precisa de protecao maxima e cor especifica;",
            "ha exigencia estetica em ambiente proximo ao litoral;",
            "o cliente quer durabilidade com identidade visual;",
            "alto padrao, orla e fachadas corporativas.",
        ],
        icon: ClipboardCheck,
    },
]

const quoteChecklist = [
    "Cidade, UF e ambiente de instalacao: via, loteamento, condominio, praca, estacionamento, industria ou litoral.",
    "Modelo do poste: reto, teleconico, curvo simples, curvo duplo, ornamental ou sob desenho.",
    "Altura, quantidade, luminaria, braco, fixacao e necessidade de base/chumbadores.",
    "Acabamento desejado: pintura eletrostatica, galvanizado, galvanizado com pintura ou indefinido.",
    "Cor, padrao visual ou referencia arquitetonica do empreendimento.",
    "Memorial, edital, projeto, norma citada ou documento de recebimento, quando houver.",
    "Prazo esperado, cidade de entrega e condicoes de acesso para manutencao.",
]

const internalLinks = [
    {
        title: "Poste galvanizado ou pintado",
        description: "Compare os acabamentos lado a lado para escolher conforme ambiente, durabilidade e memorial.",
        href: "/blog/poste-galvanizado-ou-pintado",
        icon: ShieldCheck,
    },
    {
        title: "Pintura eletrostatica",
        description: "Conheca o processo de pintura em po para projetos que precisam de cor e acabamento uniforme.",
        href: "/servicos/pintura-eletrostatica",
        icon: Paintbrush,
    },
    {
        title: "Poste metalico galvanizado",
        description: "Veja a pagina do acabamento galvanizado para areas externas e ambientes agressivos.",
        href: "/produtos/poste-metalico-galvanizado",
        icon: ShieldCheck,
    },
    {
        title: "Normas para postes",
        description: "Organize normas, memoriais e documentos antes de fechar a especificacao de compra.",
        href: "/blog/normas-para-postes-de-iluminacao",
        icon: FileText,
    },
    {
        title: "Postes metalicos",
        description: "Compare modelos, aplicacoes e caminhos de compra no hub nacional de postes.",
        href: "/postes-metalicos",
        icon: Building2,
    },
]

const faq = [
    {
        question: "Quanto tempo dura um poste metalico?",
        answer:
            "Nao existe um numero unico. A vida util depende do acabamento e, principalmente, da agressividade do ambiente e da manutencao. O mesmo poste dura muito mais numa cidade do que a beira-mar.",
    },
    {
        question: "Qual e a garantia da B&B?",
        answer:
            "5 anos para postes pintados e 10 anos para galvanizados, cobrindo a integridade estrutural da peca. O acabamento e item de conservacao e, conforme o ambiente, pode exigir manutencao antes desse prazo. Em resumo: estrutura e garantia, acabamento e cuidado.",
    },
    {
        question: "Pintura eletrostatica serve para o litoral?",
        answer:
            "Sozinha, nao e a melhor escolha em exposicao direta a maresia. Para litoral, o indicado e galvanizado ou galvanizado com pintura. A pintura eletrostatica tem otimo desempenho no ambiente urbano sem maresia forte.",
    },
    {
        question: "O que e fosfatizacao e por que importa?",
        answer:
            "E uma camada microscopica criada entre o aco e a tinta, que melhora a aderencia e aumenta a resistencia a corrosao. E uma das etapas que mais influenciam a durabilidade do acabamento pintado.",
    },
    {
        question: "O retoque em campo fica igual ao acabamento de fabrica?",
        answer:
            "O retoque protege a estrutura, mas pode ter diferenca visual em relacao ao acabamento original. Por isso, corrigir riscos profundos cedo, antes que virem corrosao, e a melhor estrategia de conservacao.",
    },
]

function createArticleSchema() {
    return {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: pageTitle,
        description: pageDescription,
        image: absoluteUrl(heroImage),
        datePublished: "2026-06-30",
        dateModified: "2026-06-30",
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
            id: `${pageUrl}#comparativo-durabilidade`,
            name: "Acabamentos de postes metalicos por durabilidade",
            items: comparisonRows.map(([finish, use, note]) => ({
                name: finish,
                description: `${use} ${note}`,
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

export default function DurabilidadeDosPostesMetalicosPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="durabilidade-dos-postes-metalicos-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento pelo guia de durabilidade"
                    eventSource="floating_durabilidade_postes"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/58 to-industrial-950/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/58 via-industrial-950/8 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <ShieldCheck className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia tecnico de durabilidade
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Durabilidade de Postes Metalicos: O Que Define a Vida Util
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Por que dois postes iguais duram tempos diferentes? A resposta esta no ambiente, no preparo da
                            superficie e no acabamento. Entenda a corrosao e escolha entre pintura eletrostatica,
                            galvanizacao e galvanizado com pintura.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <a
                                href={ebookHref}
                                download={ebookFileName}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Baixar o guia tecnico de durabilidade de postes em PDF"
                            >
                                <Download className="size-5" aria-hidden="true" />
                                Baixar o guia (PDF)
                            </a>
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo guia de durabilidade"
                                eventSource="hero_durabilidade_postes"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
                                aria-label="Falar com a engenharia da B&B pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Falar com a engenharia
                            </WhatsAppLink>
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
                            <SectionLabel>O que faz um poste enferrujar</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Durabilidade e uma conversa entre o aco e o ambiente
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                O aco enferruja quando o ambiente lhe da os ingredientes: umidade, oxigenio, sais, poluicao,
                                produtos quimicos e dano mecanico no acabamento. Por isso a especificacao correta sempre
                                comeca pelo ambiente, nao pelo produto.
                            </p>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Nao existe resposta unica do tipo "dura X anos". A norma internacional ISO 12944 classifica
                                os ambientes por agressividade corrosiva, de C1 (interno seco) a CX (marinho ou industrial
                                extremo). O mesmo poste, com o mesmo acabamento, dura muito mais numa praca do que a beira-mar.
                            </p>
                        </div>

                        <div className="overflow-hidden border border-industrial-200 rounded-2xl">
                            {comparisonRows.map(([finish, use, note]) => (
                                <div key={finish} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[220px_1fr]">
                                    <div className="bg-industrial-950 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                                        {finish}
                                    </div>
                                    <div className="space-y-2 px-5 py-4">
                                        <p className="text-sm font-bold leading-relaxed text-industrial-800">{use}</p>
                                        <p className="text-sm leading-relaxed text-industrial-600">{note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-xs text-industrial-400">
                            Fontes tecnicas:{" "}
                            <a href="https://www.abnt.org.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">ABNT — NBR 6323 (galvanização) e NBR 14744 (postes de aço)</a>
                            {" · "}
                            <a href="https://www.iso.org/standard/64809.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">ISO 12944 (corrosividade)</a>
                        </p>
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Fatores de durabilidade</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Por que dois postes iguais duram tempos diferentes
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                A vida util de um poste e decidida antes de aplicar a cor — e depende de quem o instala e
                                cuida. Estes sao os fatores que mais pesam.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {factorCards.map((factor) => {
                                const Icon = factor.icon
                                return (
                                    <div key={factor.title} className="border border-white/15 bg-white/5 p-6">
                                        <div className="mb-6 flex size-12 items-center justify-center bg-white text-industrial-950">
                                            <Icon className="size-6 text-accent-dark" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-black uppercase tracking-tight text-white">
                                            {factor.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-industrial-300">{factor.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div className="space-y-6">
                            <SectionLabel>Por tras da pintura B&B</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Pintar nao e so passar tinta
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Na B&B, a pintura comeca muito antes da tinta. Cada etapa existe por um motivo de engenharia
                                — e e isso que faz o acabamento durar. A tinta e poliester para uso externo, indicada para
                                resistir ao sol em ambiente urbano.
                            </p>
                            <div className="border border-industrial-200 bg-industrial-50 p-6 rounded-2xl">
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent-dark">Garantia B&B</p>
                                <p className="mt-3 text-sm font-bold leading-relaxed text-industrial-800">
                                    5 anos para postes pintados e 10 anos para galvanizados, cobrindo a integridade
                                    estrutural da peca. O acabamento e item de conservacao: conforme o ambiente, pode pedir
                                    manutencao antes desse prazo. Estrutura e garantia; acabamento e cuidado.
                                </p>
                            </div>
                        </div>
                        <div className="border border-industrial-200">
                            {processSteps.map((step, index) => (
                                <div key={step} className="flex items-center gap-4 border-b border-industrial-200 px-5 py-4 last:border-b-0">
                                    <span className="flex size-9 shrink-0 items-center justify-center bg-accent-premium text-sm font-black text-industrial-950">
                                        {index + 1}
                                    </span>
                                    <p className="text-sm font-bold leading-relaxed text-industrial-800">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Como escolher</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Qual acabamento faz sentido para a sua obra
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Use estes cenarios como triagem inicial. A confirmacao final deve considerar memorial,
                                processo, compatibilidade de acabamento, responsavel tecnico e condicoes da obra.
                            </p>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-3">
                            {choiceGuide.map((group) => {
                                const Icon = group.icon
                                return (
                                    <div key={group.title} className="border border-industrial-200 p-6 rounded-2xl">
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
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="bg-accent-premium py-16 md:py-20">
                    <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                            <SectionLabel>Material de referencia</SectionLabel>
                            <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                                Baixe o Guia Tecnico da Durabilidade
                            </h2>
                            <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                                E-book completo em PDF: o que faz um poste enferrujar, comparativo de acabamentos, o segredo
                                da preparacao de superficie, galvanizacao, manutencao e como escolher. Guarde e use no proximo
                                projeto.
                            </p>
                        </div>
                        <a
                            href={ebookHref}
                            download={ebookFileName}
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Baixar o guia tecnico de durabilidade de postes em PDF"
                        >
                            <Download className="size-5" aria-hidden="true" />
                            Baixar o guia (PDF)
                        </a>
                    </div>
                </section>

                <section className="bg-industrial-50 py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Dados para cotacao</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que enviar para a B&B indicar o acabamento
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Antes de decidir pelo preco, descreva onde o poste vai ficar. A engenharia da B&B orienta o
                                acabamento certo para o ambiente.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {quoteChecklist.map((item) => (
                                <div key={item} className="flex items-start gap-4 border border-industrial-200 bg-white p-5 rounded-2xl">
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
                                Datasheets e desenhos por modelo
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Compare modelo, altura, braco e fixacao da Linha Urban antes de fechar o acabamento.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {[
                                { title: "Datasheet poste reto", href: "/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf" },
                                { title: "Datasheet poste curvo simples", href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf" },
                                { title: "Datasheet poste curvo duplo", href: "/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf" },
                                { title: "Catalogos e desenhos tecnicos", href: "/downloads" },
                            ].map((file) => (
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
                                Duvidas comuns sobre durabilidade de postes
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas diretas para orientar a conversa entre compras, engenharia, obra e fornecedor.
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

            <section className="bg-white py-16 md:py-20">
                <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            Escolha pelo ambiente, nao so pelo preco
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-700">
                            Envie ambiente, modelo, quantidade, fixacao e prazo. A B&B ajuda a transformar acabamento em
                            especificacao de cotacao.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados para orcamento de durabilidade"
                            eventSource="final_durabilidade_postes"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados para orcamento de poste pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/postes-metalicos"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-industrial-50"
                        >
                            <Factory className="size-5" aria-hidden="true" />
                            Ver postes metalicos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-t border-industrial-200 bg-white py-10">
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
