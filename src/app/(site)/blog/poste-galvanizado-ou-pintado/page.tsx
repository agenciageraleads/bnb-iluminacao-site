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
    Waves,
    Wrench,
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

const pageUrl = "https://bebiluminacao.com.br/blog/poste-galvanizado-ou-pintado"
const pageTitle = "Poste Galvanizado ou Pintado"
const pageDescription =
    "Compare poste galvanizado, pintado e galvanizado com pintura para escolher acabamento conforme ambiente, durabilidade, visual e memorial tecnico."
const heroImage = "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg"
const whatsappMessage =
    "Ola, vim pelo comparativo de poste galvanizado ou pintado e quero ajuda para definir acabamento e orcamento tecnico."

export const metadata: Metadata = {
    title: {
        absolute: "Poste Galvanizado ou Pintado | Comparativo Tecnico B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Poste Galvanizado ou Pintado | Comparativo Tecnico B&B",
        description: pageDescription,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Postes metalicos externos em estacionamento industrial",
            },
        ],
    },
}

const decisionCards = [
    {
        title: "Ambiente primeiro",
        description:
            "Umidade, maresia, agentes agressivos, manutencao e exposicao externa pesam mais que uma escolha puramente estetica.",
        icon: Waves,
    },
    {
        title: "Visual tambem importa",
        description:
            "Cor, identidade do empreendimento e padronizacao urbana podem pedir pintura mesmo quando a protecao ja foi considerada.",
        icon: Paintbrush,
    },
    {
        title: "Memorial fecha a regra",
        description:
            "Projeto, edital, norma citada, prazo, processo e documentos de recebimento devem definir o acabamento de compra.",
        icon: ClipboardCheck,
    },
]

const comparisonRows = [
    [
        "Poste galvanizado",
        "Quando a prioridade e protecao contra corrosao em area externa, loteamentos, industrias, vias e ambientes mais exigentes.",
        "Confirme processo, dimensoes, prazo, necessidade de pintura complementar e requisito do memorial.",
    ],
    [
        "Poste pintado",
        "Quando a prioridade e padrao visual, cor, arquitetura, identidade do condominio, praca ou empreendimento.",
        "Confirme preparo de superficie, tipo de pintura, cor, ambiente e expectativa de manutencao.",
    ],
    [
        "Galvanizado + pintura",
        "Quando o projeto precisa combinar protecao anticorrosiva com acabamento visual especifico.",
        "Confirme compatibilidade entre processos, sequencia de fabricacao, aderencia, cor e prazo.",
    ],
    [
        "Sob memorial",
        "Quando edital, concessionaria, cliente ou engenharia ja definiram requisito tecnico de acabamento.",
        "Envie o documento antes da cotacao para evitar preco incompleto ou retrabalho.",
    ],
]

const factorCards = [
    {
        title: "Corrosao e intemperie",
        description: "Exposicao a chuva, umidade, maresia, poluicao, produtos quimicos e manutencao muda a necessidade de protecao.",
        icon: ShieldCheck,
    },
    {
        title: "Aplicacao do poste",
        description: "Via publica, loteamento, praca, condominio, estacionamento e patio industrial pedem decisoes diferentes.",
        icon: Landmark,
    },
    {
        title: "Modelo e geometria",
        description: "Poste reto, teleconico, curvo simples, curvo duplo, base e bracos podem interferir no processo e no prazo.",
        icon: Ruler,
    },
    {
        title: "Fixacao e manutencao",
        description: "Engastado, flangeado, base, chumbadores e acesso de manutencao devem entrar no briefing.",
        icon: Wrench,
    },
    {
        title: "Padrao visual",
        description: "Cores, identidade urbana e compatibilidade com luminarias, fachadas e paisagismo podem justificar pintura.",
        icon: Paintbrush,
    },
    {
        title: "Documentos tecnicos",
        description: "Memorial, projeto, edital e requisitos de recebimento devem ser enviados antes de fechar acabamento.",
        icon: FileText,
    },
]

const choiceGuide = [
    {
        title: "Escolha galvanizado quando",
        items: [
            "o poste ficara exposto ao tempo;",
            "o ambiente exige maior protecao anticorrosiva;",
            "o memorial cita galvanizacao ou durabilidade externa;",
            "a obra prioriza vida util e reducao de manutencao.",
        ],
        icon: ShieldCheck,
    },
    {
        title: "Escolha pintado quando",
        items: [
            "o padrao visual e decisivo;",
            "a cor precisa seguir arquitetura ou identidade do empreendimento;",
            "o ambiente e menos agressivo ou ja tem protecao definida;",
            "o memorial especifica pintura, cor ou acabamento visual.",
        ],
        icon: Paintbrush,
    },
    {
        title: "Combine processos quando",
        items: [
            "a obra exige protecao e cor especifica;",
            "o cliente quer durabilidade com identidade visual;",
            "o memorial pede sistema de acabamento combinado;",
            "engenharia validou compatibilidade, aderencia e prazo.",
        ],
        icon: ClipboardCheck,
    },
]

const quoteChecklist = [
    "Cidade, UF e ambiente de instalacao: via, loteamento, condominio, praca, estacionamento ou industria.",
    "Modelo do poste: reto, teleconico, curvo simples, curvo duplo, ornamental ou sob desenho.",
    "Altura, quantidade, luminaria, braco, fixacao e necessidade de base/chumbadores.",
    "Acabamento desejado: galvanizado, pintado, galvanizado com pintura ou indefinido.",
    "Cor, padrao visual, referencia arquitetonica ou identidade do empreendimento.",
    "Memorial, edital, projeto, norma citada ou documento de recebimento, quando houver.",
    "Prazo esperado, cidade de entrega e restricoes de obra.",
    "Fotos do local ou historico de corrosao/manutencao, quando existir.",
]

const internalLinks = [
    {
        title: "Poste metalico galvanizado",
        description: "Aprofunde a pagina comercial do acabamento galvanizado para iluminacao e areas externas.",
        href: "/produtos/poste-metalico-galvanizado",
        icon: ShieldCheck,
    },
    {
        title: "Pintura eletrostatica",
        description: "Veja o servico de pintura para projetos que precisam de cor e acabamento visual.",
        href: "/servicos/pintura-eletrostatica",
        icon: Paintbrush,
    },
    {
        title: "Normas para postes",
        description: "Organize normas, memoriais e documentos antes de fechar especificacao de compra.",
        href: "/blog/normas-para-postes-de-iluminacao",
        icon: FileText,
    },
    {
        title: "Poste flangeado ou engastado",
        description: "Alinhe base, chumbadores, fundacao e manutencao antes de fechar o acabamento.",
        href: "/blog/poste-flangeado-ou-engastado",
        icon: Wrench,
    },
    {
        title: "Postes metalicos",
        description: "Compare modelos, aplicacoes e caminhos de compra no hub nacional de postes.",
        href: "/postes-metalicos",
        icon: Building2,
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
        question: "Poste galvanizado e sempre melhor que poste pintado?",
        answer:
            "Nao necessariamente. Galvanizacao costuma priorizar protecao contra corrosao. Pintura costuma priorizar padrao visual e cor. A melhor escolha depende do ambiente, memorial, manutencao e objetivo do projeto.",
    },
    {
        question: "Quando usar poste galvanizado com pintura?",
        answer:
            "Quando o projeto precisa combinar protecao anticorrosiva com acabamento visual especifico. A compatibilidade entre processos, aderencia, cor e prazo deve ser validada antes da compra.",
    },
    {
        question: "Qual norma entra na galvanizacao de postes metalicos?",
        answer:
            "A ABNT NBR 6323 costuma aparecer quando o memorial exige galvanizacao por imersao a quente em produtos de aco ou ferro fundido. A edicao vigente e o escopo devem ser confirmados em fonte oficial e no memorial.",
    },
    {
        question: "Pintura eletrostatica substitui galvanizacao?",
        answer:
            "Nao e uma substituicao automatica. A pintura pode atender padrao visual e protecao complementar, mas a decisao depende de ambiente, preparo de superficie, processo, durabilidade esperada e memorial.",
    },
    {
        question: "O que enviar para a B&B definir acabamento do poste?",
        answer:
            "Envie aplicacao, cidade e UF, ambiente, quantidade, modelo, altura, fixacao, cor desejada, prazo e qualquer memorial, projeto, edital ou referencia tecnica disponivel.",
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
            id: `${pageUrl}#comparativo-acabamentos`,
            name: "Comparativo de acabamento para postes metalicos",
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

export default function PosteGalvanizadoOuPintadoPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="poste-galvanizado-ou-pintado-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento pelo comparativo de acabamento"
                    eventSource="floating_acabamento_postes"
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
                            <Paintbrush className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia tecnico de acabamento
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Poste Galvanizado ou Pintado: Como Escolher
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            O acabamento do poste nao deve ser definido so por preco ou aparencia. Compare galvanizado,
                            pintado e galvanizado com pintura para alinhar durabilidade, ambiente, padrao visual, memorial
                            tecnico e prazo de fornecimento.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo comparativo de acabamento"
                                eventSource="hero_acabamento_postes"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de poste com acabamento pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/produtos/poste-metalico-galvanizado"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
                            >
                                <ShieldCheck className="size-5" aria-hidden="true" />
                                Ver poste galvanizado
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
                            <SectionLabel>Comparativo rapido</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Galvanizar, pintar ou combinar processos
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Em postes metalicos, acabamento e especificacao caminham juntos. A galvanizacao costuma
                                aparecer quando a conversa e durabilidade externa e protecao anticorrosiva. A pintura
                                aparece quando cor, identidade visual e padronizacao do empreendimento sao decisivas.
                            </p>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Em muitos projetos, a decisao correta nao e "um contra o outro", mas entender se o poste
                                deve ser galvanizado, pintado ou galvanizado com pintura complementar conforme ambiente,
                                memorial, prazo e processo de fabricacao.
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
                            <a href="https://abrasip.org.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">ABRASIP</a>
                            {" · "}
                            <a href="https://www.inmetro.gov.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">INMETRO</a>
                        </p>
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Fatores de decisao</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O acabamento depende do uso real do poste
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Uma escolha bem feita considera ambiente, processo, visual, manutencao, fixacao, modelo do
                                poste e exigencias do memorial. Essa triagem reduz retrabalho no orcamento.
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
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Regra pratica</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Como orientar a primeira escolha
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

                <section className="bg-industrial-50 py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Dados para cotacao</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que enviar para a B&B definir acabamento
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Se o acabamento nao estiver fechado, envie o contexto da obra. A B&B consegue orientar a
                                conversa comercial para chegar em uma cotacao mais objetiva.
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
                                Datasheets ajudam a comparar modelo e acabamento
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Antes de fechar galvanizado, pintado ou combinado, compare modelo, altura, braco, fixacao
                                e aplicacao do poste.
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
                                        eventSource="blog_poste_galvanizado_ou_pintado"
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
                                Duvidas comuns sobre acabamento de postes
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas para orientar a conversa entre compras, engenharia, obra e fornecedor antes de
                                fechar o pedido.
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
                            Defina o acabamento antes de comprar
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Envie ambiente, modelo, quantidade, fixacao, cor desejada e memorial. A B&B ajuda a transformar
                            acabamento em especificacao de cotacao.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados para orcamento de acabamento"
                            eventSource="final_acabamento_postes"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados para orcamento de acabamento de poste pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/postes-metalicos"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <Factory className="size-5" aria-hidden="true" />
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
                        ["Poste teleconico", "/produtos/poste-teleconico"],
                        ["Poste curvo simples", "/produtos/poste-curvo-simples"],
                        ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
                        ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
                        ["Durabilidade dos postes metalicos", "/blog/durabilidade-dos-postes-metalicos"],
                        ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
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
