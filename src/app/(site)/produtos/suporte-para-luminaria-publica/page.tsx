import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
    ArrowRight,
    Building2,
    Download,
    Factory,
    FileText,
    Landmark,
    MessageCircle,
    ShieldCheck,
    Truck,
    Wrench,
    Zap,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFaqSchema,
    createItemListSchema,
    createProductSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/produtos/suporte-para-luminaria-publica"
const pageDescription =
    "Suporte para luminaria publica em aco para 1, 2, 3 ou 4 luminarias, com compatibilidade para postes metalicos, acabamento e orcamento tecnico B&B."
const whatsappMessage =
    "Ola, vim pela pagina de suporte para luminaria publica e quero especificar modelo, quantidade e orcamento tecnico."
const heroImage = "https://bebiluminacao.com.br/api/media/file/suporte-4-luminarias.png"
const backgroundImage = "/images/seo/postes-metalicos/via-publica-postes-retos-dois-lados.jpg"

export const metadata: Metadata = {
    title: {
        absolute: "Suporte para Luminaria Publica | 1 a 4 Luminarias B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Suporte para Luminaria Publica | 1 a 4 Luminarias B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: heroImage,
                width: 1200,
                height: 630,
                alt: "Suporte metalico para luminaria publica com multiplos pontos",
            },
        ],
    },
}

const supportModels = [
    {
        title: "Suporte 1 luminaria",
        use: "Ponto unico de luz",
        description:
            "Solucao para poste com uma luminaria, indicada quando o projeto pede leitura simples, manutencao objetiva e compatibilidade direta com o conjunto.",
        image: "https://bebiluminacao.com.br/api/media/file/suporte-1-luminaria.png",
    },
    {
        title: "Suporte 2 luminarias",
        use: "Dois sentidos ou area mais ampla",
        description:
            "Usado quando o mesmo poste precisa atender duas direcoes, canteiros, patios, acessos ou areas que exigem maior cobertura.",
        image: "https://bebiluminacao.com.br/api/media/file/suporte-2-luminarias.png",
    },
    {
        title: "Suporte 3 luminarias",
        use: "Pracas, patios e circulacao",
        description:
            "Opcao para distribuir pontos de luz em diferentes angulos conforme poste, luminarias, carga e desenho tecnico.",
        image: "https://bebiluminacao.com.br/api/media/file/suporte-3-luminarias.png",
    },
    {
        title: "Suporte 4 luminarias",
        use: "Grandes areas abertas",
        description:
            "Aplicacao para areas amplas, patios, estacionamentos e pontos centrais que precisam iluminar mais de uma direcao.",
        image: "https://bebiluminacao.com.br/api/media/file/suporte-4-luminarias.png",
    },
]

const highlights = [
    {
        title: "Nucleos multiplos",
        description: "Modelos para 1, 2, 3 ou 4 luminarias conforme area, poste, carga e distribuicao de luz.",
        icon: Zap,
    },
    {
        title: "Compatibilidade",
        description: "Definicao por diametro do poste, encaixe, fixacao, peso da luminaria e avanco necessario.",
        icon: Wrench,
    },
    {
        title: "Acabamento externo",
        description: "Galvanizacao, pintura ou acabamento sob especificacao do memorial e do ambiente.",
        icon: ShieldCheck,
    },
    {
        title: "Atendimento nacional",
        description: "Fabrica em Goiania como prova operacional, com atendimento para projetos em todo o Brasil.",
        icon: Truck,
    },
]

const specificationRows = [
    ["Produto", "Suporte metalico para luminaria publica, definido por quantidade de luminarias e compatibilidade com poste."],
    ["Modelos", "Suporte para 1, 2, 3 ou 4 luminarias, com configuracao confirmada conforme desenho e aplicacao."],
    ["Poste", "Compatibilidade com poste metalico, teleconico, reto, curvo ou conjunto sob especificacao."],
    ["Fixacao", "Encaixe, parafusos, base, sapata ou detalhe de montagem conforme diametro, carga e projeto."],
    ["Acabamento", "Galvanizado, pintado ou galvanizado com pintura conforme ambiente e padrao visual."],
    ["Compra", "Orcamento com modelo, quantidade, luminaria, poste, cidade/UF, acabamento, prazo e memorial quando existir."],
]

const decisionRows = [
    [
        "1 luminaria",
        "Ponto simples em poste existente ou novo",
        "Quando a area exige um foco principal e o conjunto precisa ser direto para manutencao.",
    ],
    [
        "2 luminarias",
        "Avenidas, canteiros, acessos e patios",
        "Quando o poste precisa atender dois lados ou ampliar a cobertura sem duplicar estrutura.",
    ],
    [
        "3 luminarias",
        "Pracas, cruzamentos internos e areas abertas",
        "Quando a distribuicao de luz exige mais angulos em torno do mesmo ponto de instalacao.",
    ],
    [
        "4 luminarias",
        "Estacionamentos, patios e pontos centrais",
        "Quando a prioridade e cobertura em multiplas direcoes a partir de uma estrutura central.",
    ],
    [
        "Sob desenho",
        "Obras com memorial ou padrao existente",
        "Quando o suporte precisa seguir medida, encaixe, luminaria ou padrao definido pelo projeto.",
    ],
]

const applicationCards = [
    {
        title: "Iluminacao publica",
        description: "Vias, avenidas, canteiros e areas urbanas que precisam de compatibilidade entre poste e luminaria.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Estacionamentos",
        description: "Pontos centrais, vagas abertas, acessos e patios com necessidade de cobertura em mais direcoes.",
        href: "/postes-para-estacionamentos",
        icon: Truck,
    },
    {
        title: "Condominios",
        description: "Ruas internas, portarias, pracas, areas comuns e circulacao noturna com padrao visual.",
        href: "/postes-para-condominios",
        icon: Building2,
    },
    {
        title: "Areas industriais",
        description: "Galpoes, docas, patios e circulacao operacional que pedem robustez e manutencao planejada.",
        href: "/postes-metalicos",
        icon: Factory,
    },
]

const quoteRows = [
    ["Modelo", "1, 2, 3 ou 4 luminarias, ou suporte sob desenho."],
    ["Quantidade", "Quantidade por modelo, etapa, obra ou local de instalacao."],
    ["Poste", "Tipo de poste, diametro, altura, fixacao e se ja existe poste instalado."],
    ["Luminaria", "Modelo, peso, encaixe, quantidade por suporte e orientacao desejada."],
    ["Acabamento", "Galvanizado, pintado, galvanizado com pintura, cor ou padrao do memorial."],
    ["Documentos", "Foto, desenho, memorial, planta, referencia visual ou lista de materiais."],
    ["Entrega", "Cidade, UF, prazo, responsavel pela compra e condicao de recebimento."],
]

const internalLinks = [
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Postes para estacionamentos", "/postes-para-estacionamentos"],
    ["Postes metalicos", "/postes-metalicos"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
    ["Poste galvanizado ou pintado", "/blog/poste-galvanizado-ou-pintado"],
    ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "A B&B fornece suporte para luminaria publica?",
        answer:
            "Sim. A B&B fabrica e orienta suportes metalicos para luminaria publica, incluindo configuracoes para 1, 2, 3 ou 4 luminarias conforme projeto, poste e aplicacao.",
    },
    {
        question: "Qual a diferenca entre braco e suporte para luminaria?",
        answer:
            "O braco normalmente define o avanco da luminaria em relacao ao poste. O suporte ou nucleo organiza uma ou mais luminarias no mesmo conjunto, podendo atender multiplas direcoes.",
    },
    {
        question: "Como escolher suporte para 2, 3 ou 4 luminarias?",
        answer:
            "A escolha depende da area a iluminar, poste, altura, luminaria, peso, angulos, manutencao, fixacao e memoriais tecnicos quando existirem.",
    },
    {
        question: "O suporte precisa ser galvanizado?",
        answer:
            "Para uso externo, galvanizacao e uma opcao relevante para durabilidade. A decisao final depende de ambiente, acabamento desejado, memorial, prazo e compatibilidade de processo.",
    },
    {
        question: "O que enviar para cotar suporte para luminaria publica?",
        answer:
            "Envie modelo desejado, quantidade, poste, luminaria, cidade e UF, acabamento, prazo, fotos, desenho, memorial ou referencia visual.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createProductSchema({
            url: pageUrl,
            name: "Suporte para Luminaria Publica",
            description: pageDescription,
            image: heroImage,
            category: "Suportes metalicos para luminaria publica",
            properties: specificationRows.map(([name, value]) => ({ name, value })),
        }),
        createWebPageSchema({
            url: pageUrl,
            name: "Suporte para Luminaria Publica",
            description: pageDescription,
            image: heroImage,
            mainEntityId: `${pageUrl}#product`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Produtos", item: `${SITE_URL}/produtos` },
            { name: "Suporte para Luminaria Publica", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#modelos`,
            name: "Modelos de suporte para luminaria publica",
            items: supportModels.map((model) => ({
                name: model.title,
                description: model.description,
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

export default function SuporteParaLuminariaPublicaPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="suporte-luminaria-publica-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de suporte para luminaria publica"
                    eventSource="floating_suporte_luminaria_publica"
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={backgroundImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-55"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-950/82 to-industrial-950/24" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/72 via-industrial-950/10 to-transparent" />
                </div>

                <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[76%] w-[42%] md:block" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-contain object-bottom opacity-95 drop-shadow-2xl"
                        sizes="42vw"
                    />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex max-w-full items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white md:tracking-[0.22em]">
                            <Wrench className="size-4 shrink-0 text-accent-premium" aria-hidden="true" />
                            Nucleos para 1, 2, 3 ou 4 luminarias
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl lg:text-7xl">
                            Suporte para Luminaria Publica
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Suportes metalicos para luminarias publicas em postes de ruas, avenidas, pracas,
                            estacionamentos, condominios e areas industriais, com especificacao por modelo, fixacao,
                            acabamento e quantidade de pontos de luz.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de suporte para luminaria publica"
                                eventSource="hero_suporte_luminaria_publica"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de suporte para luminaria publica pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
                            >
                                <Download className="size-5" aria-hidden="true" />
                                Baixar catalogos
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 md:hidden">
                        {supportModels.map((item) => (
                            <div key={item.title} className="border border-white/15 bg-white/90 p-3">
                                <div className="relative aspect-square">
                                    <Image src={item.image} alt={item.title} fill className="object-contain" sizes="25vw" />
                                </div>
                                <p className="mt-2 text-center text-[9px] font-black uppercase tracking-widest text-industrial-700">
                                    {item.title}
                                </p>
                            </div>
                        ))}
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
                            O suporte organiza quantas luminarias o poste vai receber
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A especificacao nao deve partir apenas do nome do acessorio. Ela precisa considerar quantas
                            luminarias serao instaladas, quais angulos precisam ser atendidos, o tipo de poste, a carga,
                            a fixacao, o acabamento e a manutencao.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Esta pagina existe para transformar uma busca generica por suporte em briefing tecnico para
                            compra direta com fabricante.
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
                        <SectionLabel>Modelos</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Suportes para 1, 2, 3 ou 4 luminarias
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A quantidade de luminarias muda a distribuicao de luz, a carga, a fixacao e a forma de
                            manutencao do conjunto.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-4">
                        {supportModels.map((model) => (
                            <div key={model.title} className="border border-white/15 bg-white/5">
                                <div className="relative aspect-[4/3] bg-white p-5">
                                    <Image
                                        src={model.image}
                                        alt={model.title}
                                        fill
                                        className="object-contain p-5"
                                        sizes="(min-width: 768px) 25vw, 100vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-premium">
                                        {model.use}
                                    </p>
                                    <h3 className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                                        {model.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-300">{model.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Escolha por configuracao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Cada quantidade muda a aplicacao do conjunto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A tabela ajuda o comprador a diferenciar nucleo simples, duplo e multiplo antes de solicitar
                            preco.
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
                            Onde suportes para luminarias entram no projeto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Suportes e nucleos aparecem quando um poste precisa atender uma area mais ampla, multiplas
                            direcoes ou um padrao de manutencao mais previsivel.
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
                            O que enviar para cotar suporte para luminaria
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Quanto mais claro o conjunto poste + luminaria + suporte, menor a chance de comparar pecas
                            diferentes pelo mesmo nome.
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
                        <SectionLabel>Interlinking P1</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Caminhos relacionados para especificar o conjunto completo
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A pagina de suporte conecta acessorio, poste, aplicacao, acabamento e catalogos para reduzir
                            ambiguidade no pedido.
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
                            Duvidas comuns antes de cotar suporte para luminaria publica
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas para separar braco, suporte, nucleo, quantidade de luminarias e compatibilidade.
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
                            Envie o modelo de suporte e a quantidade de luminarias
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe se precisa de suporte para 1, 2, 3 ou 4 luminarias, poste, luminaria, acabamento,
                            cidade de entrega e prazo. Se houver desenho ou memorial, envie junto.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados de suporte para luminaria publica"
                            eventSource="final_suporte_luminaria_publica"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados de suporte para luminaria publica pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <FileText className="size-5" aria-hidden="true" />
                            Ver catalogos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    <Link href="/produtos/braco-para-luminaria-publica" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Wrench className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver braco para luminaria</span>
                    </Link>
                    <Link href="/postes-para-iluminacao-publica" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Landmark className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver iluminacao publica</span>
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
