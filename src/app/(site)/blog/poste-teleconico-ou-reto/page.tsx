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
    Landmark,
    MessageCircle,
    Paintbrush,
    Ruler,
    ShieldCheck,
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

const pageUrl = "https://bebiluminacao.com.br/blog/poste-teleconico-ou-reto"
const pageTitle = "Poste Curvo ou Reto"
const pageDescription =
    "Poste curvo (braco que avanca sobre a via) ou reto (topo livre para bracos e suportes)? Todo poste teleconico e afunilado — entenda a geometria certa para cotar conforme aplicacao e luminaria."
const heroImage = "/images/produtos/poste-reto-avenida-dia.png"
const whatsappMessage =
    "Ola, vim pelo guia de poste curvo ou reto e quero ajuda para definir o modelo correto no orcamento."

export const metadata: Metadata = {
    title: {
        absolute: "Poste Curvo ou Reto | Guia Tecnico B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Poste Curvo ou Reto | Guia Tecnico B&B",
        description: pageDescription,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Poste metalico reto em via urbana",
            },
        ],
    },
}

const decisionCards = [
    {
        title: "Nome certo evita retrabalho",
        description:
            "Teleconico fala do fuste afunilado. Reto pode falar da geometria sem curva. Em muitas compras, os dois termos aparecem juntos.",
        icon: FileText,
    },
    {
        title: "Luminaria define avanco",
        description:
            "Se a luminaria precisa avancar sobre a via, a conversa muda para braco, curvo simples ou curvo duplo.",
        icon: Ruler,
    },
    {
        title: "Projeto fecha o modelo",
        description:
            "Altura, fixacao, acabamento, vento, quantidade e memorial devem orientar o modelo final antes da cotacao.",
        icon: ClipboardCheck,
    },
]

const vocabularyRows = [
    [
        "Poste teleconico",
        "Fuste com geometria afunilada ao longo da altura.",
        "Usado em vias, loteamentos, condominios, pracas, estacionamentos e areas urbanas.",
    ],
    [
        "Poste reto",
        "Termo comercial que pode indicar poste vertical, sem curva no topo.",
        "Pode existir como poste teleconico reto ou como modelo reto conforme catalogo/fabricacao.",
    ],
    [
        "Poste curvo simples",
        "Modelo com avanco para um lado.",
        "Indicado quando a luminaria precisa projetar luz sobre rua, acesso, calcada ou faixa lateral.",
    ],
    [
        "Poste curvo duplo",
        "Modelo com avancos para dois lados.",
        "Usado em canteiros centrais, avenidas e areas que precisam iluminar dois sentidos.",
    ],
]

const applicationCards = [
    {
        title: "Via local ou loteamento",
        description: "Poste teleconico reto ou curvo simples pode atender, conforme luminaria, altura e largura da via.",
        icon: Landmark,
    },
    {
        title: "Avenida ou canteiro",
        description: "Curvo duplo ou solucao com dois pontos pode fazer mais sentido quando ha dois sentidos de iluminacao.",
        icon: Ruler,
    },
    {
        title: "Estacionamento e patio",
        description: "Postes retos costumam aparecer quando a cobertura depende de distribuicao por area e luminarias no topo/suporte.",
        icon: Building2,
    },
    {
        title: "Condominio e praca",
        description: "A decisao combina visual, altura, paisagismo, seguranca, acabamento e facilidade de manutencao.",
        icon: ShieldCheck,
    },
    {
        title: "Area industrial",
        description: "Altura, fixacao, acabamento, vento e interferencias operacionais pesam mais que o nome comercial.",
        icon: Factory,
    },
    {
        title: "Compra sob memorial",
        description: "Se o projeto ja define modelo, use o memorial como base e envie o documento para cotacao.",
        icon: FileText,
    },
]

const modelGuide = [
    {
        title: "Peca poste teleconico reto quando",
        items: [
            "a luminaria fica no topo ou em suporte sem avanco curvo relevante;",
            "a obra precisa de geometria vertical e repetibilidade visual;",
            "o projeto cita fuste teleconico, altura e fixacao;",
            "a aplicacao e via, loteamento, condominio, estacionamento ou patio.",
        ],
        href: "/produtos/poste-teleconico",
        icon: Zap,
    },
    {
        title: "Peca poste curvo quando",
        items: [
            "a luminaria precisa avancar sobre a pista ou calcada;",
            "o poste deve direcionar o ponto de luz para um lado especifico;",
            "a instalacao pede leitura urbana com braco integrado;",
            "o projeto diferencia curvo simples ou curvo duplo.",
        ],
        href: "/produtos/poste-curvo-simples",
        icon: Ruler,
    },
    {
        title: "Peca revisao tecnica quando",
        items: [
            "o comprador so tem a foto ou uma referencia generica;",
            "a altura, a fixacao ou o acabamento ainda nao foram definidos;",
            "a obra tem vento, base, braco ou luminaria fora do padrao;",
            "o edital usa termos diferentes do catalogo comercial.",
        ],
        href: "/postes-metalicos",
        icon: ClipboardCheck,
    },
]

const quoteChecklist = [
    "Aplicacao: via publica, loteamento, condominio, praca, estacionamento, patio ou area industrial.",
    "Cidade, UF, quantidade, prazo e local de entrega.",
    "Altura pretendida ou faixa aproximada.",
    "Modelo desejado: teleconico reto, curvo simples, curvo duplo ou indefinido.",
    "Luminaria, quantidade de pontos por poste, braco/suporte e necessidade de avanco.",
    "Fixacao: engastado, flangeado, base, chumbadores ou indefinido.",
    "Acabamento: galvanizado, pintado, galvanizado com pintura ou sob memorial.",
    "Projeto, memorial, desenho, foto do local ou referencia visual, quando houver.",
]

const internalLinks = [
    {
        title: "Poste teleconico",
        description: "Veja a pagina comercial do modelo teleconico reto, curvo simples e curvo duplo.",
        href: "/produtos/poste-teleconico",
        icon: Zap,
    },
    {
        title: "Postes metalicos",
        description: "Compare modelos e aplicacoes no hub nacional de postes metalicos.",
        href: "/postes-metalicos",
        icon: Building2,
    },
    {
        title: "Altura de poste",
        description: "Continue a triagem por altura, via, luminaria, braco e fixacao.",
        href: "/blog/altura-de-poste-para-iluminacao-publica",
        icon: Ruler,
    },
    {
        title: "Poste flangeado ou engastado",
        description: "Defina se a fixacao deve partir de base com chumbadores ou engastamento em fundacao.",
        href: "/blog/poste-flangeado-ou-engastado",
        icon: Anchor,
    },
    {
        title: "Poste galvanizado ou pintado",
        description: "Defina o acabamento depois de escolher modelo, aplicacao e ambiente.",
        href: "/blog/poste-galvanizado-ou-pintado",
        icon: Paintbrush,
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
        question: "Poste teleconico e poste reto sao a mesma coisa?",
        answer:
            "Nao necessariamente. Teleconico descreve o fuste afunilado. Reto pode indicar que o poste nao tem curva no topo. Por isso existe a expressao poste teleconico reto em muitas conversas comerciais.",
    },
    {
        question: "Quando escolher poste teleconico reto?",
        answer:
            "Quando o projeto pede poste vertical, geometria limpa, luminaria no topo ou em suporte, e nao precisa de avanco curvo integrado para jogar luz sobre a via.",
    },
    {
        question: "Quando escolher poste curvo simples?",
        answer:
            "Quando a luminaria precisa avancar para um lado da via, acesso, calcada ou area de circulacao. O avanco ajuda a posicionar melhor o ponto de luz.",
    },
    {
        question: "Quando escolher poste curvo duplo?",
        answer:
            "Quando o projeto precisa iluminar dois sentidos, como canteiros centrais, avenidas ou areas amplas com dois lados de cobertura.",
    },
    {
        question: "O que enviar para a B&B indicar o modelo correto?",
        answer:
            "Envie aplicacao, cidade e UF, altura, quantidade, luminaria, necessidade de avanco, fixacao, acabamento, prazo e qualquer desenho, memorial ou foto do local.",
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
            id: `${pageUrl}#modelos`,
            name: "Comparativo de modelos de postes metalicos",
            items: vocabularyRows.map(([name, definition, use]) => ({
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

export default function PosteTeleconicoOuRetoPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="poste-teleconico-ou-reto-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento pelo guia teleconico ou reto"
                    eventSource="floating_teleconico_ou_reto"
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
                            <Zap className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia tecnico para escolher modelo
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Poste Curvo ou Reto: Entenda Antes de Cotar
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Todo poste teleconico e afunilado — o que muda e o topo: curvo, com braco que avanca sobre a
                            via, ou reto, com topo livre para bracos e suportes. Este guia ajuda a nomear o modelo certo
                            antes de pedir preco.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo guia teleconico ou reto"
                                eventSource="hero_teleconico_ou_reto"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar orcamento de poste teleconico ou reto pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/produtos/poste-teleconico"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
                            >
                                <Zap className="size-5" aria-hidden="true" />
                                Ver poste teleconico
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
                            <SectionLabel>Nomenclatura</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Antes de comparar, alinhe o que cada termo significa
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                "Teleconico" geralmente descreve o fuste do poste. "Reto" pode significar que o poste e
                                vertical, sem curva integrada no topo. Por isso, um pedido pode ser perfeitamente descrito
                                como poste teleconico reto.
                            </p>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                A escolha correta depende de onde a luminaria precisa ficar: no topo, em suporte, em braco,
                                em poste curvo simples ou em poste curvo duplo.
                            </p>
                        </div>

                        <div className="overflow-hidden border border-industrial-200 rounded-2xl">
                            {vocabularyRows.map(([term, definition, use]) => (
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
                            <a href="https://www.abnt.org.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-industrial-800">ABNT — NBR 14744 (postes de aço para iluminação)</a>
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
                            <SectionLabel>Aplicacoes</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O uso do local indica a geometria do poste
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                A forma do poste deve acompanhar o local de instalacao, a luminaria, o braco, a altura, a
                                fixacao e o resultado luminotecnico esperado.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {applicationCards.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.title} className="border border-white/15 bg-white/5 p-6 rounded-2xl">
                                        <div className="mb-6 flex size-12 items-center justify-center bg-white text-industrial-950 rounded-lg">
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
                                Como pedir o modelo com menos margem para erro
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Use estes cenarios para organizar o pedido antes de falar com a fabrica. A confirmacao final
                                depende de projeto, memorial, luminaria, fixacao, acabamento e local de instalacao.
                            </p>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-3">
                            {modelGuide.map((group) => {
                                const Icon = group.icon
                                return (
                                    <Link key={group.title} href={group.href} className="group border border-industrial-200 p-6 hover:border-industrial-950 rounded-2xl">
                                        <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
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
                                O que enviar para definir teleconico, reto ou curvo
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Quando o nome do modelo ainda esta confuso, envie a aplicacao e os dados da obra. Isso ajuda
                                o time comercial a transformar a busca em uma cotacao tecnica.
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
                                Compare os modelos antes de fechar o pedido
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Datasheets e desenhos ajudam compras e engenharia a entender se o projeto pede poste reto,
                                curvo simples, curvo duplo ou outra solucao.
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
                                        eventSource="blog_poste_teleconico_ou_reto"
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
                                Duvidas comuns sobre poste teleconico e reto
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas para reduzir ambiguidade antes de compras, engenharia e fornecedor falarem de
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
                            Envie a aplicacao para escolher o modelo certo
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe altura, luminaria, avanco, fixacao, acabamento, cidade e prazo. A B&B ajuda a organizar
                            a conversa entre teleconico, reto, curvo simples e curvo duplo.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados para escolher modelo de poste"
                            eventSource="final_teleconico_ou_reto"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Enviar dados para escolher poste teleconico ou reto pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/produtos/poste-teleconico"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white rounded-lg"
                        >
                            <Zap className="size-5" aria-hidden="true" />
                            Ver teleconico
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
                        ["Poste curvo simples", "/produtos/poste-curvo-simples"],
                        ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
                        ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
                        ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
                        ["Fabricante de postes teleconicos", "/fabricante-de-postes-teleconicos"],
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
