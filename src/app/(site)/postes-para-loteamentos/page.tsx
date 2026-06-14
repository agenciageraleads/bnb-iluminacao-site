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
    MapPin,
    MessageCircle,
    PackageCheck,
    Ruler,
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
    absoluteUrl,
    createBreadcrumbSchema,
    createFactoryOrganizationSchema,
    createFaqSchema,
    createImageSchemas,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = "https://bebiluminacao.com.br/postes-para-loteamentos"
const pageDescription =
    "Postes para loteamentos com padronizacao de modelos, alturas, acabamento, fixacao e fornecimento em volume. Fabricacao B&B e atendimento nacional."
const whatsappMessage =
    "Ola, vim pela pagina de postes para loteamentos e quero ajuda para especificar modelos, quantidades e orcamento tecnico."
const heroImage = "/images/seo/postes-metalicos/via-publica-postes-retos-dois-lados.jpg"

export const metadata: Metadata = {
    title: {
        absolute: "Postes para Loteamentos | Padronizacao e Orcamento B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Postes para Loteamentos | Padronizacao e Orcamento B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: absoluteUrl(heroImage),
                width: 1200,
                height: 630,
                alt: "Postes metalicos para ruas internas de loteamentos",
            },
        ],
    },
}

const requirements = [
    {
        title: "Padronizacao visual",
        description:
            "Modelos, alturas, bracos, luminarias e acabamento precisam manter repetibilidade entre ruas e etapas.",
        icon: Ruler,
    },
    {
        title: "Compra em volume",
        description:
            "Loteamentos pedem planejamento por quantidade, cronograma, fases de obra, entrega e recebimento.",
        icon: PackageCheck,
    },
    {
        title: "Especificacao tecnica",
        description:
            "A decisao envolve via interna, acesso, praca, largura, fixacao, acabamento, memoriais e luminarias.",
        icon: ClipboardCheck,
    },
    {
        title: "Origem fabril",
        description:
            "Goiania comprova operacao fabril; a demanda comercial de loteamentos e nacional.",
        icon: Factory,
    },
]

const applicationCards = [
    {
        title: "Ruas internas",
        description:
            "Postes retos, teleconicos ou curvos simples conforme largura, espacamento e padrao visual do loteamento.",
        icon: MapPin,
    },
    {
        title: "Avenidas de acesso",
        description:
            "Trechos de entrada podem pedir altura, braco, luminaria e acabamento diferentes das ruas locais.",
        icon: Landmark,
    },
    {
        title: "Pracas e areas verdes",
        description:
            "Postes ornamentais ou urbanos ajudam a compatibilizar iluminacao, paisagismo e convivencia.",
        icon: Building2,
    },
    {
        title: "Portarias e areas comerciais",
        description:
            "A especificacao deve considerar visibilidade, seguranca, fluxo de veiculos e identidade do empreendimento.",
        icon: ShieldCheck,
    },
    {
        title: "Etapas da obra",
        description:
            "O fornecimento pode ser planejado por fases para alinhar producao, entrega e instalacao.",
        icon: Truck,
    },
    {
        title: "Compra sob memorial",
        description:
            "Quando ja existe projeto, o orcamento deve partir do memorial e dos desenhos disponiveis.",
        icon: FileText,
    },
]

const decisionRows = [
    [
        "Rua local",
        "Poste teleconico reto ou curvo simples",
        "Padronizacao, altura, espacamento, luminaria e fixacao.",
    ],
    [
        "Acesso principal",
        "Poste teleconico, curvo simples ou curvo duplo",
        "Fluxo, largura, visibilidade, braco e quantidade de pontos.",
    ],
    [
        "Praca interna",
        "Poste ornamental, reto ou urbano",
        "Paisagismo, seguranca, circulacao de pessoas e identidade visual.",
    ],
    [
        "Condominio de lotes",
        "Poste padrao urbano por etapa",
        "Repetibilidade, prazo, manutencao e compatibilidade com luminaria.",
    ],
    [
        "Area comercial",
        "Poste reto ou teleconico com acabamento definido",
        "Altura, fluxo de veiculos, fachada, estacionamento e manutencao.",
    ],
    [
        "Entrega em fases",
        "Mesma familia de postes por lote de fornecimento",
        "Cronograma, volume, transporte, recebimento e conferencia.",
    ],
]

const processSteps = [
    {
        title: "1. Organize o memorial",
        description:
            "Reuna projeto, loteamento, planta, ruas, areas comuns, padrao visual e exigencias de recebimento.",
        icon: FileText,
    },
    {
        title: "2. Defina familias de postes",
        description:
            "Separe ruas internas, acessos, pracas, areas comerciais e pontos especiais antes de cotar.",
        icon: ClipboardCheck,
    },
    {
        title: "3. Alinhe fixacao e acabamento",
        description:
            "Confirme se a obra pede engastado, flangeado, galvanizado, pintura ou combinacao conforme ambiente.",
        icon: Wrench,
    },
    {
        title: "4. Planeje volume e entrega",
        description:
            "Informe quantidade por etapa, cidade, UF, prazo, restricoes de descarga e necessidade de documentos.",
        icon: Truck,
    },
]

const quoteData = [
    ["Empreendimento", "Nome do loteamento, cidade, UF, etapa da obra e responsavel pelo contato."],
    ["Aplicacao por area", "Ruas internas, avenidas de acesso, pracas, areas verdes, portaria, estacionamento ou area comercial."],
    ["Quantidade", "Quantidade total e, se possivel, separacao por modelo, rua, etapa ou lote de entrega."],
    ["Modelo e altura", "Poste reto, teleconico, curvo simples, curvo duplo, ornamental ou indefinido."],
    ["Luminaria e braco", "Tipo de luminaria, quantidade por poste, necessidade de avanco, suporte ou braco."],
    ["Fixacao", "Engastado, flangeado, base com chumbador, fundacao existente ou definicao pendente."],
    ["Acabamento", "Galvanizado, pintado, galvanizado com pintura ou padrao visual do empreendimento."],
    ["Documentos", "Memorial, projeto, planta, desenho, edital, referencia visual ou fotos do local."],
]

const relatedPages = [
    {
        title: "Postes para iluminacao publica",
        description: "Base tecnica para vias, ruas, pracas, loteamentos e obras urbanas.",
        href: "/postes-para-iluminacao-publica",
        icon: Landmark,
    },
    {
        title: "Poste teleconico",
        description: "Modelo recorrente em ruas internas, acessos, condominios e loteamentos.",
        href: "/produtos/poste-teleconico",
        icon: Zap,
    },
    {
        title: "Postes para condominios",
        description: "Caminho para ruas internas, portarias, estacionamentos e areas comuns condominiais.",
        href: "/postes-para-condominios",
        icon: Building2,
    },
    {
        title: "Postes para pracas",
        description: "Referencia para pracas, jardins, areas verdes e convivencia em empreendimentos.",
        href: "/postes-para-pracas",
        icon: Landmark,
    },
    {
        title: "Poste flangeado ou engastado",
        description: "Compare fixacao, base, chumbadores e fundacao antes de fechar a compra.",
        href: "/blog/poste-flangeado-ou-engastado",
        icon: Wrench,
    },
    {
        title: "Poste galvanizado ou pintado",
        description: "Defina acabamento conforme durabilidade, ambiente, visual e memorial.",
        href: "/blog/poste-galvanizado-ou-pintado",
        icon: ShieldCheck,
    },
]

const gallery = [
    {
        src: "/images/seo/postes-metalicos/via-publica-postes-retos-dois-lados.jpg",
        alt: "Postes metalicos em via de loteamento com iluminacao padronizada",
        title: "Ruas padronizadas",
    },
    {
        src: "/images/seo/postes-metalicos/via-urbana-iluminada-postes.jpg",
        alt: "Postes metalicos para via urbana e acesso de empreendimento",
        title: "Acessos urbanos",
    },
    {
        src: "/images/seo/postes-metalicos/rua-iluminada-poste-curvo.jpg",
        alt: "Poste curvo para rua interna e area residencial",
        title: "Ruas internas",
    },
    {
        src: "/images/seo/postes-metalicos/praca-iluminada-luminaria-redonda.jpg",
        alt: "Postes ornamentais para praca e area verde de loteamento",
        title: "Areas verdes",
    },
]

const internalLinks = [
    ["Postes metalicos", "/postes-metalicos"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Postes para pracas", "/postes-para-pracas"],
    ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
    ["Fabrica de postes metalicos", "/fabrica-de-postes-metalicos"],
    ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Altura de poste para iluminacao publica", "/blog/altura-de-poste-para-iluminacao-publica"],
    ["Normas para postes de iluminacao", "/blog/normas-para-postes-de-iluminacao"],
    ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
    ["Poste galvanizado ou pintado", "/blog/poste-galvanizado-ou-pintado"],
    ["Catalogos e downloads", "/downloads"],
]

const faq = [
    {
        question: "A B&B fabrica postes para loteamentos?",
        answer:
            "Sim. A B&B fabrica postes metalicos para loteamentos, ruas internas, acessos, pracas, areas verdes e empreendimentos urbanos, com atendimento comercial nacional.",
    },
    {
        question: "Qual poste usar em loteamento?",
        answer:
            "A escolha depende da largura das vias, luminaria, altura, padrao visual, fixacao, acabamento, memoriais e fase da obra. Postes teleconicos, retos, curvos simples e ornamentais podem aparecer conforme a area.",
    },
    {
        question: "Como cotar postes em volume para loteamento?",
        answer:
            "Envie quantidade por modelo ou etapa, cidade e UF, altura, luminaria, braco, fixacao, acabamento, prazo, projeto e memorial. Isso permite comparar propostas com a mesma base tecnica.",
    },
    {
        question: "O acabamento deve ser galvanizado ou pintado?",
        answer:
            "Depende do ambiente, durabilidade esperada, padrao visual e memorial. Em muitos projetos, galvanizacao e pintura podem ser avaliadas juntas.",
    },
    {
        question: "A pagina atende so Goias?",
        answer:
            "Nao. Goiania e Goias sao prova de origem fabril. A pagina atende incorporadoras, urbanizadoras e compradores de loteamentos em todo o Brasil.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: "Postes para Loteamentos",
            description: pageDescription,
            image: heroImage,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Postes para Loteamentos", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#aplicacoes`,
            name: "Aplicacoes de postes para loteamentos",
            items: applicationCards.map((application) => ({
                name: application.title,
                description: application.description,
            })),
        }),
        ...createImageSchemas(gallery),
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

export default function PostesParaLoteamentosPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="postes-para-loteamentos-schema" data={getSchema()} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento de postes para loteamentos"
                    eventSource="floating_postes_loteamentos"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/58 to-industrial-950/12" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/60 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Building2 className="size-4 text-accent-premium" aria-hidden="true" />
                            Incorporadoras, urbanizadoras e obras por etapa
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Postes para Loteamentos
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Postes metalicos para ruas internas, acessos, pracas e areas comuns de loteamentos, com
                            padronizacao de modelos, suporte tecnico, fabricacao propria e atendimento nacional.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento de postes para loteamentos"
                                eventSource="hero_postes_loteamentos"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento de postes para loteamentos pelo WhatsApp"
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
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-industrial-50 py-8">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-4">
                    {requirements.map((item) => {
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
                        <SectionLabel>Aplicacao em loteamentos</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O desafio e manter padrao tecnico em todas as ruas
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Loteamento nao costuma comprar um poste isolado. A decisao envolve padronizacao de modelos,
                            quantidade, etapas de entrega, memoriais, luminarias, fundacao e acabamento para muitas ruas.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A pagina existe para transformar a busca por postes para loteamentos em briefing tecnico:
                            onde o poste sera usado, qual familia de modelos entra, como entregar em volume e quais dados
                            precisam chegar ao orcamento.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {applicationCards.map((item) => {
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
                        <SectionLabel>Escolha por area</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Cada trecho do loteamento pode pedir um criterio diferente
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A tabela organiza a conversa entre incorporadora, engenharia, instalador e fabricante antes do
                            pedido de preco.
                        </p>
                    </div>

                    <div className="overflow-hidden border border-white/15">
                        {decisionRows.map(([place, model, criterion]) => (
                            <div key={place} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[220px_1fr_1fr]">
                                <div className="bg-white/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                                    {place}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                    {model}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                    {criterion}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Fluxo de compra</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Como preparar uma cotacao de loteamento
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O melhor pedido ja chega separado por area, etapa, modelo e documentos. Isso reduz retrabalho
                            e evita comparar propostas com bases tecnicas diferentes.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-4">
                        {processSteps.map((step) => {
                            const Icon = step.icon
                            return (
                                <div key={step.title} className="border border-industrial-200 p-6">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{step.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Dados para cotacao</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que enviar para cotar postes para loteamentos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Se algum dado ainda estiver indefinido, envie o que existir. A primeira conversa pode separar
                            possibilidades e apontar quais informacoes faltam para fechar a proposta.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 bg-white">
                        {quoteData.map(([label, value]) => (
                            <div key={label} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[220px_1fr]">
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

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Cluster tecnico</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Paginas que ajudam a fechar a especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Loteamentos conectam aplicacao, modelo, acabamento, fixacao e iluminacao publica. Estes
                            caminhos mantem o comprador dentro do cluster comercial certo.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {relatedPages.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group border border-industrial-200 bg-white p-6 transition-colors hover:border-industrial-950"
                                >
                                    <Icon className="mb-5 size-6 text-accent-dark" aria-hidden="true" />
                                    <h3 className="text-base font-black uppercase tracking-tight text-industrial-950">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{item.description}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                        Ver pagina
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Galeria indexavel</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Referencias visuais para ruas, acessos e areas comuns
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Imagens por contexto ajudam incorporadoras e equipes de engenharia a conversar sobre padrao
                            visual, aplicacao e repetibilidade.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-4">
                        {gallery.map((image) => (
                            <div key={image.src} className="border border-industrial-200 bg-white">
                                <div className="relative aspect-[4/3] bg-industrial-100">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 25vw, 100vw"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-black uppercase text-industrial-950">{image.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-industrial-600">{image.alt}</p>
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
                            Caminhos relacionados para compradores de loteamentos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A pagina de loteamentos deve distribuir autoridade para produto, aplicacao, fabricante,
                            acabamento, fixacao e catalogos.
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
                            Duvidas comuns antes de cotar postes para loteamentos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas para transformar uma demanda ampla em briefing tecnico de compra.
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
                            Envie o projeto ou a lista de postes do loteamento
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe empreendimento, cidade, quantidade, modelos, altura, luminarias, fixacao, acabamento
                            e prazo. A B&B ajuda a organizar o orcamento tecnico.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Enviar dados de postes para loteamento"
                            eventSource="final_postes_loteamentos"
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Enviar dados de postes para loteamento pelo WhatsApp"
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
                    <Link href="/postes-para-iluminacao-publica" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Landmark className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Ver iluminacao publica</span>
                    </Link>
                    <Link href="/fornecedor-de-postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Factory className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Comprar direto de fornecedor</span>
                    </Link>
                    <Link href="/downloads" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950">
                        <Ruler className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Catalogos e desenhos tecnicos</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
