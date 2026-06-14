import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    AlertTriangle,
    ArrowRight,
    BookOpen,
    ClipboardCheck,
    Download,
    FileCheck2,
    FileText,
    Landmark,
    MessageCircle,
    Ruler,
    ShieldCheck,
    Wind,
    Wrench,
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

const pageUrl = "https://bebiluminacao.com.br/blog/normas-para-postes-de-iluminacao"
const pageTitle = "Normas para Postes de Iluminacao Publica"
const pageDescription =
    "Guia tecnico para orientar quais normas e documentos entram na especificacao de postes para iluminacao publica, sem substituir projeto ou memorial."
const heroImage = "/images/seo/postes-metalicos/rua-iluminada-poste-curvo.jpg"
const whatsappMessage =
    "Ola, vim pelo guia de normas para postes de iluminacao e quero ajuda para montar um orcamento tecnico."

export const metadata: Metadata = {
    title: {
        absolute: "Normas para Postes de Iluminacao Publica | Guia Tecnico B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Normas para Postes de Iluminacao Publica | Guia Tecnico B&B",
        description: pageDescription,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Via urbana iluminada por postes publicos",
            },
        ],
    },
}

const decisionCards = [
    {
        title: "Norma nao e catalogo",
        description:
            "A norma ajuda a orientar requisitos tecnicos, mas a compra ainda precisa de modelo, altura, fixacao, acabamento, desenho e quantidade.",
        icon: BookOpen,
    },
    {
        title: "Versao vigente importa",
        description:
            "Edicao, escopo e aplicabilidade devem ser confirmados em fonte oficial antes de fechar memorial, edital ou pedido de compra.",
        icon: FileCheck2,
    },
    {
        title: "Projeto manda na compra",
        description:
            "Projeto luminotecnico, memorial, padrao local e concessionaria podem ser mais determinantes que uma busca generica por norma.",
        icon: ClipboardCheck,
    },
]

const standardRows = [
    [
        "ABNT NBR 14744",
        "Postes de aco para iluminacao",
        "Entra na conversa de postes de aco retos ou curvos e acessorios. Confirme escopo, requisitos e edicao no catalogo oficial e no memorial.",
    ],
    [
        "ABNT NBR 5101",
        "Projeto de iluminacao publica",
        "Orienta criterios luminotecnicos de iluminacao publica. Nao define sozinha o poste comercial, a base, o acabamento ou a compra.",
    ],
    [
        "ABNT NBR 6323",
        "Galvanizacao por imersao a quente",
        "Costuma entrar quando o memorial exige acabamento galvanizado e protecao anticorrosiva para pecas de aco ou ferro fundido.",
    ],
    [
        "ABNT NBR 6123",
        "Acoes de vento",
        "Pode ser relevante no dimensionamento estrutural quando altura, area exposta, bracos, luminarias e local de instalacao exigem analise.",
    ],
    [
        "Padrao da concessionaria ou municipio",
        "Ligacao, rede e recebimento local",
        "Pode definir detalhes de rede, aceite, instalacao, responsabilidades e documentos exigidos no local da obra.",
    ],
    [
        "Memorial e projeto da obra",
        "Especificacao de compra",
        "Fecha modelo, altura, fixacao, acabamento, desenhos, prazo, quantidade e documentos que o fornecedor precisa entregar.",
    ],
]

const documentChecklist = [
    {
        title: "Projeto luminotecnico",
        description: "Ajuda a validar nivel de iluminacao, espacamento, altura, luminaria, lente, braco e distribuicao de luz.",
        icon: Landmark,
    },
    {
        title: "Memorial descritivo",
        description: "Transforma a necessidade da obra em requisito de compra: material, acabamento, altura, fixacao e documentos.",
        icon: FileText,
    },
    {
        title: "Modelo e geometria",
        description: "Poste reto, teleconico, curvo simples, curvo duplo, ornamental ou com braco mudam fabricacao e aplicacao.",
        icon: Ruler,
    },
    {
        title: "Fixacao e fundacao",
        description: "Poste engastado, flangeado, base, chumbadores e fundacao precisam conversar com o projeto civil.",
        icon: Wrench,
    },
    {
        title: "Acabamento e ambiente",
        description: "Galvanizacao, pintura, corrosao, manutencao e exposicao definem a durabilidade esperada do conjunto.",
        icon: ShieldCheck,
    },
    {
        title: "Local e vento",
        description: "Cidade, UF, topografia, altura, area exposta e acessorios podem exigir validacao estrutural especifica.",
        icon: Wind,
    },
]

const riskCards = [
    {
        title: "Copiar trecho de norma da internet",
        description:
            "Alem de risco legal, muitas copias estao incompletas ou desatualizadas. Use fonte oficial e trate a pagina como orientacao de briefing.",
    },
    {
        title: "Comprar so por preco",
        description:
            "Sem altura, aplicacao, fixacao e acabamento, o menor preco pode virar retrabalho, incompatibilidade ou troca de fornecedor.",
    },
    {
        title: "Ignorar o padrao local",
        description:
            "Concessionaria, prefeitura, edital e memorial podem exigir documentos e detalhes que nao aparecem em uma busca nacional.",
    },
    {
        title: "Trocar acabamento sem validar",
        description:
            "Galvanizacao, pintura e protecao anticorrosiva devem ser decididas pelo ambiente e pela durabilidade esperada do projeto.",
    },
]

const quoteChecklist = [
    "Cidade, UF, tipo de obra e ambiente de instalacao.",
    "Aplicacao: via publica, loteamento, condominio, praca, estacionamento ou area industrial.",
    "Modelo pretendido: reto, teleconico, curvo simples, curvo duplo, ornamental ou suporte/braco.",
    "Altura, quantidade, luminaria, braco, numero de pontos por poste e espacamento previsto.",
    "Tipo de fixacao: engastado, flangeado, base, chumbadores ou indefinido.",
    "Acabamento esperado: galvanizado, pintura, cor, durabilidade ou exigencia do memorial.",
    "Projeto, memorial, edital, padrao da concessionaria, desenho ou foto do local.",
    "Prazo, cidade de entrega e documentos tecnicos exigidos para recebimento.",
]

const internalLinks = [
    {
        title: "Altura de poste para iluminacao publica",
        description: "Continue a triagem tecnica por altura, aplicacao, luminaria, braco e fixacao.",
        href: "/blog/altura-de-poste-para-iluminacao-publica",
        icon: Ruler,
    },
    {
        title: "Postes para iluminacao publica",
        description: "Veja aplicacoes urbanas, loteamentos, condominios, areas industriais e dados para orcamento.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Poste metalico galvanizado",
        description: "Entenda quando o acabamento galvanizado entra como requisito de durabilidade e protecao.",
        href: "/produtos/poste-metalico-galvanizado",
        icon: ShieldCheck,
    },
    {
        title: "Poste teleconico",
        description: "Acesse a pagina tecnica do modelo usado em vias, loteamentos, condominios e projetos urbanos.",
        href: "/produtos/poste-teleconico",
        icon: Zap,
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
        question: "Qual norma rege poste de iluminacao publica?",
        answer:
            "Nao existe uma resposta unica para toda compra. Postes de aco para iluminacao, projeto luminotecnico, galvanizacao, vento, padrao local, concessionaria e memorial podem entrar juntos na especificacao.",
    },
    {
        question: "A B&B pode dizer que um poste esta em norma sem projeto?",
        answer:
            "A pagina orienta briefing comercial e tecnico. A confirmacao formal deve considerar projeto, memorial, edicao vigente da norma, local de instalacao e requisitos exigidos pelo cliente ou orgao responsavel.",
    },
    {
        question: "NBR 14744 e NBR 5101 sao a mesma coisa?",
        answer:
            "Nao. Elas aparecem em conversas diferentes: uma associada a postes de aco para iluminacao e outra ao projeto de iluminacao publica. A aplicacao deve ser confirmada em fonte oficial e no memorial da obra.",
    },
    {
        question: "Quando galvanizacao entra na especificacao?",
        answer:
            "Quando o ambiente, a durabilidade esperada, o memorial ou o comprador exigem protecao anticorrosiva. Em muitos casos a galvanizacao por imersao a quente aparece como requisito tecnico.",
    },
    {
        question: "O que enviar para orcar poste conforme norma?",
        answer:
            "Envie cidade e UF, aplicacao, quantidade, modelo, altura, luminaria, braco, fixacao, acabamento, prazo, memorial, projeto, edital ou padrao local quando existir.",
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
            id: `${pageUrl}#normas-documentos`,
            name: "Normas e documentos para postes de iluminacao publica",
            items: standardRows.map(([standard, scope, note]) => ({
                name: `${standard}: ${scope}`,
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

export default function NormasParaPostesDeIluminacaoPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="normas-postes-iluminacao-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento pelo guia de normas"
                    eventSource="floating_normas_postes_ip"
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
                            <BookOpen className="size-4 text-accent-premium" aria-hidden="true" />
                            Guia tecnico para briefing e compra
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Normas para Postes de Iluminacao Publica
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Antes de cotar poste, organize quais normas, memoriais, padroes locais e documentos tecnicos
                            entram na especificacao. Este guia ajuda compras e engenharia a chegar em um orcamento mais
                            claro, sem substituir consulta oficial, projeto ou responsavel tecnico.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento pelo guia de normas"
                                eventSource="hero_normas_postes_ip"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de postes conforme briefing tecnico pelo WhatsApp"
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
                            <SectionLabel>Como usar este guia</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Norma entra no contexto, mas a especificacao nasce do projeto
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Em postes para iluminacao publica, a decisao raramente depende de uma unica sigla. A compra
                                pode envolver norma de produto, projeto luminotecnico, dimensionamento estrutural, acabamento,
                                padrao da concessionaria, edital, memorial da obra e exigencias de recebimento.
                            </p>
                            <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                Use esta pagina para montar o briefing antes de falar com a fabrica. Para fechar requisito
                                formal, confirme sempre a edicao vigente em fonte oficial, o memorial do projeto e a
                                responsabilidade tecnica aplicavel.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {documentChecklist.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.title} className="border border-industrial-200 p-6">
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
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Normas e documentos</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                O que normalmente entra na conversa tecnica
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                A lista abaixo e orientativa. Ela nao reproduz texto de norma e nao substitui consulta ao
                                catalogo oficial, ao projetista, ao edital, ao memorial ou ao padrao local da obra.
                            </p>
                        </div>

                        <div className="overflow-hidden border border-white/15">
                            {standardRows.map(([standard, scope, note]) => (
                                <div key={standard} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[260px_270px_1fr]">
                                    <div className="bg-white/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                                        {standard}
                                    </div>
                                    <div className="px-5 py-4 text-base font-black uppercase text-accent-premium">
                                        {scope}
                                    </div>
                                    <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                        {note}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-start gap-3 border border-white/15 bg-white/5 p-5 text-sm leading-relaxed text-industrial-300">
                            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent-premium" aria-hidden="true" />
                            <p>
                                As normas citadas devem ser verificadas em fonte oficial. O papel da B&B aqui e ajudar a
                                transformar requisito em briefing de fabricacao, cotacao e atendimento tecnico.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-20 md:py-28">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>Riscos comuns</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Erros que atrasam a compra de postes
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                A maior parte dos atrasos nao nasce da fabricacao, mas de briefing incompleto. Compras,
                                engenharia e fornecedor precisam falar sobre a mesma especificacao desde o inicio.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {riskCards.map((risk) => (
                                <div key={risk.title} className="border border-industrial-200 p-6">
                                    <div className="mb-5 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                        <AlertTriangle className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                        {risk.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{risk.description}</p>
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
                                O que enviar para orcar com menos retrabalho
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Se o pedido envolve norma, memorial ou edital, envie os documentos desde o primeiro contato.
                                A equipe comercial consegue direcionar melhor modelo, altura, acabamento e escopo de entrega.
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
                                Catalogos ajudam a transformar norma em item compravel
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                Datasheets e desenhos nao substituem o projeto, mas ajudam a comparar modelos e enviar uma
                                solicitacao mais objetiva para fabricacao.
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
                                Duvidas comuns sobre normas para postes
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-300">
                                Respostas objetivas para compradores, engenheiros, loteadores, condominios e equipes de
                                obra que precisam especificar sem travar o orcamento.
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
                            Envie memorial, projeto ou dados da obra
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            A B&B ajuda a transformar requisito em cotacao tecnica: modelo, altura, fixacao, acabamento,
                            quantidade, prazo, entrega e documentos de apoio.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados para orcamento conforme normas"
                            eventSource="final_normas_postes_ip"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados para orcamento de poste conforme normas pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/postes-para-iluminacao-publica"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <Landmark className="size-5" aria-hidden="true" />
                            Ver aplicacoes
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
                        ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
                        ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
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
