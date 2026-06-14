import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    AlertTriangle,
    ArrowRight,
    Building2,
    ClipboardCheck,
    Download,
    Factory,
    FileText,
    Landmark,
    Lightbulb,
    MapPin,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Truck,
    Zap,
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

const pageUrl = "https://bebiluminacao.com.br/blog/altura-de-poste-para-iluminacao-publica"
const pageTitle = "Altura de Poste para Iluminacao Publica"
const pageDescription =
    "Guia tecnico para orientar altura de poste para iluminacao publica por aplicacao, largura da via, luminaria, braco, fixacao e dados para orcamento."
const heroImage = "/images/seo/postes-metalicos/via-publica-postes-retos-dois-lados.jpg"
const whatsappMessage =
    "Ola, vim pelo guia de altura de poste para iluminacao publica e quero ajuda para definir um orcamento tecnico."

export const metadata: Metadata = {
    title: {
        absolute: "Altura de Poste para Iluminacao Publica | Guia Tecnico B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Altura de Poste para Iluminacao Publica | Guia Tecnico B&B",
        description: pageDescription,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Postes para iluminacao publica em via urbana",
            },
        ],
    },
}

const decidingFactors = [
    {
        title: "Aplicacao da area",
        description: "Rua local, avenida, praca, estacionamento, condominio, patio ou area industrial mudam a conversa de altura.",
        icon: Landmark,
    },
    {
        title: "Largura e geometria",
        description: "Largura da via, canteiro, calcada, afastamento do poste e interferencias precisam entrar no briefing.",
        icon: MapPin,
    },
    {
        title: "Luminaria e distribuicao",
        description: "Fluxo luminoso, lente, angulo, potencia e posicionamento da luminaria afetam altura e espacamento.",
        icon: Lightbulb,
    },
    {
        title: "Braco e avanco",
        description: "Poste reto, curvo simples, curvo duplo ou braco para luminaria mudam o ponto de luz sobre a pista.",
        icon: Ruler,
    },
    {
        title: "Fixacao e fundacao",
        description: "Poste engastado, flangeado, base e chumbadores dependem do projeto civil e do local de instalacao.",
        icon: ClipboardCheck,
    },
    {
        title: "Ambiente e manutencao",
        description: "Corrosao, acesso, manutencao, trafego, arborizacao e acabamento podem mudar modelo e especificacao.",
        icon: ShieldCheck,
    },
]

const heightRows = [
    ["Pracas, jardins e calcadas internas", "3 a 6 m", "Projetos de convivencia, circulacao de pedestres e areas com menor escala visual."],
    ["Ruas locais, acessos e condominios", "6 a 9 m", "Aplicacoes urbanas comuns, acessos internos, ruas residenciais e loteamentos."],
    ["Vias coletoras, avenidas e canteiros", "9 a 12 m", "Areas mais largas, canteiros centrais e necessidade de cobertura em pista."],
    ["Estacionamentos, patios e industrias", "6 a 15 m", "Altura depende de area de cobertura, manobra, interferencias e luminaria usada."],
    ["Projetos especiais ou grandes areas", "Sob projeto", "Demandas com altura, carga, vento, base ou luminaria fora do padrao precisam de analise especifica."],
]

const modelLinks = [
    {
        title: "Poste teleconico",
        description: "Base tecnica para projetos urbanos, vias, loteamentos, condominios e iluminacao publica.",
        href: "/produtos/poste-teleconico",
        icon: Zap,
    },
    {
        title: "Poste curvo simples",
        description: "Indicado quando a luminaria precisa avancar para um unico lado da via, acesso ou calcada.",
        href: "/produtos/poste-curvo-simples",
        icon: Ruler,
    },
    {
        title: "Poste curvo duplo",
        description: "Usado em canteiros centrais, avenidas e aplicacoes que precisam iluminar dois sentidos.",
        href: "/produtos/poste-curvo-duplo",
        icon: Landmark,
    },
    {
        title: "Braco para luminaria publica",
        description: "Acessorio que ajusta avanco, posicionamento e compatibilidade entre poste e luminaria.",
        href: "/produtos/braco-para-luminaria-publica",
        icon: Lightbulb,
    },
]

const quoteChecklist = [
    "Cidade, UF e tipo de ambiente da obra.",
    "Aplicacao: rua, avenida, praca, loteamento, condominio, estacionamento ou patio.",
    "Altura pretendida ou faixa aproximada, quando ja existir referencia.",
    "Modelo desejado: reto, teleconico, curvo simples, curvo duplo ou ornamental.",
    "Quantidade de postes, luminarias por poste e necessidade de braco ou suporte.",
    "Tipo de fixacao: engastado, flangeado, base, chumbadores ou indefinido.",
    "Acabamento esperado: galvanizacao, pintura eletrostatica ou memorial tecnico.",
    "Projeto, desenho, memorial ou foto do local, quando disponivel.",
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
        title: "Desenhos tecnicos Urban",
        href: "/downloads",
    },
]

const faq = [
    {
        question: "Existe uma altura padrao para poste de iluminacao publica?",
        answer:
            "Nao existe uma altura unica que sirva para todos os projetos. A altura depende da aplicacao, largura da via, luminaria, braco, espacamento, fixacao, memoriais e projeto luminotecnico.",
    },
    {
        question: "Postes de 6 a 12 metros resolvem a maioria das buscas?",
        answer:
            "Essa faixa aparece com frequencia em conversas comerciais, mas deve ser tratada como triagem inicial. A especificacao final precisa considerar o projeto e a aplicacao real.",
    },
    {
        question: "A altura define a distancia entre postes?",
        answer:
            "Nao sozinha. A distancia entre postes depende tambem da luminaria, distribuicao luminosa, largura da via, nivel de iluminacao esperado, braco, obstaculos e criterios do projeto.",
    },
    {
        question: "Como escolher entre poste reto, curvo simples e curvo duplo?",
        answer:
            "O poste reto e mais objetivo para areas amplas e topo/suporte. O curvo simples avanca a luminaria para um lado. O curvo duplo atende canteiros centrais e dois sentidos de iluminacao.",
    },
    {
        question: "Quais dados enviar para a B&B orcar postes de iluminacao publica?",
        answer:
            "Envie cidade e UF, aplicacao, quantidade, altura aproximada, modelo desejado, luminaria, fixacao, acabamento, prazo e qualquer desenho, foto ou memorial disponivel.",
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
            id: `${pageUrl}#faixas`,
            name: "Faixas comuns de altura para triagem comercial",
            items: heightRows.map(([application, range, note]) => ({
                name: `${application}: ${range}`,
                description: note,
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

export default function AlturaDePosteParaIluminacaoPublicaPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="altura-poste-iluminacao-publica-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento altura de poste"
                    eventSource="floating_altura_poste_ip"
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-85 md:opacity-100"
                        sizes="100vw"
                        style={{ objectPosition: "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/54 to-industrial-950/8" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/62 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Ruler className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia tecnico para briefing e orcamento
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Altura de Poste para Iluminacao Publica
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            A altura do poste nao deve ser escolhida isoladamente. Use este guia para organizar a conversa
                            tecnica antes do orcamento, considerando aplicacao, via, luminaria, braco, fixacao, acabamento e
                            projeto luminotecnico.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo guia de altura"
                                eventSource="hero_altura_poste_ip"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de postes para iluminacao publica pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/postes-para-iluminacao-publica"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
                            >
                                <Landmark className="size-5" aria-hidden="true" />
                                Ver aplicacao
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-industrial-50 py-8">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    <div className="flex items-start gap-4 bg-white p-5">
                        <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium">
                            <AlertTriangle className="size-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-widest">Nao e regra unica</h2>
                            <p className="mt-2 text-sm leading-relaxed text-industrial-600">
                                As faixas abaixo sao ponto de partida comercial, nao substituem projeto ou memorial tecnico.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-white p-5">
                        <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium">
                            <Lightbulb className="size-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-widest">Luminaria pesa muito</h2>
                            <p className="mt-2 text-sm leading-relaxed text-industrial-600">
                                O mesmo poste pode ter resultado diferente conforme fluxo, lente, angulo e avanco.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 bg-white p-5">
                        <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium">
                            <Factory className="size-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-widest">Compra com fabricante</h2>
                            <p className="mt-2 text-sm leading-relaxed text-industrial-600">
                                A B&B orienta modelo, altura, fixacao e acabamento para chegar a um orcamento mais claro.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <article>
                <section className="py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div className="space-y-6">
                            <SectionLabel>Como decidir</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                A altura nasce do conjunto, nao de uma tabela isolada
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Em iluminacao publica, a pergunta correta nao e apenas "qual a altura do poste?". O ponto
                                de partida e entender o ambiente, a largura da area, o tipo de luminaria, o espacamento
                                previsto, o braco, a fixacao e o objetivo visual e operacional do projeto.
                            </p>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                A tabela ajuda compradores, engenheiros e equipes de obra a abrir uma conversa mais
                                objetiva com a fabrica. A confirmacao final deve vir do projeto luminotecnico e dos
                                criterios tecnicos aplicaveis ao local.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {decidingFactors.map((factor) => {
                                const Icon = factor.icon
                                return (
                                    <div key={factor.title} className="border border-industrial-200 p-6">
                                        <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                            <Icon className="size-6" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                            {factor.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-industrial-600">{factor.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="bg-industrial-950 py-20 text-white md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Faixas comuns</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Altura por aplicacao para triagem inicial
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Use estas faixas para iniciar o briefing comercial. Elas nao sao especificacao definitiva e
                                precisam ser confrontadas com luminaria, via, espacamento, braco, fixacao e memorial.
                            </p>
                        </div>

                        <div className="overflow-hidden border border-white/15">
                            {heightRows.map(([application, range, note]) => (
                                <div key={application} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[260px_160px_1fr]">
                                    <div className="bg-white/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                                        {application}
                                    </div>
                                    <div className="px-5 py-4 text-xl font-black uppercase text-accent-premium">
                                        {range}
                                    </div>
                                    <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                        {note}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Modelo do poste</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Altura tambem depende da geometria e do avanco
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Dois projetos com a mesma altura podem pedir modelos diferentes. A luminaria pode ficar no
                                topo, em braco, em poste curvo simples ou em poste curvo duplo. Por isso, a escolha do
                                modelo deve caminhar junto com a altura.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {modelLinks.map((model) => {
                                const Icon = model.icon
                                return (
                                    <Link
                                        key={model.href}
                                        href={model.href}
                                        className="group border border-industrial-200 p-6 transition-colors hover:border-industrial-950"
                                    >
                                        <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                            <Icon className="size-6" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                            {model.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-industrial-600">{model.description}</p>
                                        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                            Ver pagina tecnica
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
                            <SectionLabel>Dados para orcamento</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que enviar para definir altura, modelo e preco
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Um pedido com "preciso de poste de iluminacao publica" costuma gerar retrabalho. O ideal e
                                enviar dados minimos para que o time comercial encaminhe a conversa para uma cotacao tecnica.
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
                                Catalogos e desenhos ajudam a sair da duvida
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Os documentos nao substituem a validacao do projeto, mas ajudam compras e engenharia a
                                comparar modelos antes de falar com a B&B.
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
                                Duvidas comuns antes de cotar altura de poste
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas para evitar especificacao incompleta e alinhar o briefing com engenharia, compras
                                e obra.
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
                            Envie os dados da obra para cotar com a B&B
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe aplicacao, cidade/UF, altura aproximada, quantidade, luminaria, braco, fixacao,
                            acabamento e prazo. A equipe B&B organiza o caminho para o orcamento tecnico.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados para orcamento de altura de poste"
                            eventSource="final_altura_poste_ip"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados para orcamento de poste de iluminacao publica"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/fabricante-de-postes-metalicos"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <Factory className="size-5" aria-hidden="true" />
                            Ver fabricante
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    <Link href="/postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Building2 className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Hub de postes metalicos</span>
                    </Link>
                    <Link href="/postes-para-iluminacao-publica" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Landmark className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Postes para iluminacao publica</span>
                    </Link>
                    <Link href="/fornecedor-de-postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Truck className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Fornecedor nacional</span>
                    </Link>
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="container mx-auto grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
                        ["Poste galvanizado ou pintado", "/blog/poste-galvanizado-ou-pintado"],
                        ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
                        ["Postes para loteamentos", "/postes-para-loteamentos"],
                        ["Postes para condominios", "/postes-para-condominios"],
                        ["Postes para pracas", "/postes-para-pracas"],
                        ["Fabricante de postes teleconicos", "/fabricante-de-postes-teleconicos"],
                        ["Normas para postes de iluminacao", "/blog/normas-para-postes-de-iluminacao"],
                        ["Poste curvo simples", "/produtos/poste-curvo-simples"],
                        ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
                        ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
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
