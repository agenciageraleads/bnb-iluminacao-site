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
    Paintbrush,
    Ruler,
    ShieldCheck,
    Truck,
} from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { getPortfolioProjects, getProducts } from "@/lib/data"
import { getPrimaryCatalogProducts } from "@/lib/catalog-curation"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFaqSchema,
    createImageSchemas,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"
import { createSeoImage } from "@/lib/seo/images"

export const dynamic = "force-dynamic"

const pageUrl = "https://bebiluminacao.com.br/postes-metalicos"
const pageDescription =
    "Postes metalicos, galvanizados e em aco para iluminacao publica, condominios, loteamentos e industrias. Modelos, acabamentos, NBR e orcamento B&B."
const whatsappMessage = "Ola, vim pela pagina de postes metalicos e quero solicitar um orcamento tecnico."
const heroImage = "/images/seo/postes-metalicos/via-urbana-iluminada-postes.jpg"

export const metadata: Metadata = {
    title: {
        absolute: "Postes Metalicos e Galvanizados | Fabricante B&B",
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Postes Metalicos e Galvanizados | Fabricante B&B",
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: "Postes metalicos para iluminacao urbana B&B",
            },
        ],
    },
}

const models = [
    {
        title: "Poste teleconico",
        description: "Modelo versatil para vias, loteamentos, condominios, estacionamentos e iluminacao publica.",
        use: "Iluminacao urbana e privada",
        href: "/produtos/poste-teleconico",
    },
    {
        title: "Poste reto metalico",
        description: "Solucao objetiva para patios, galpoes, estacionamentos e areas com layout tecnico simples.",
        use: "Patios, acessos e galpoes",
        href: "/produtos/poste-metalico-galvanizado",
    },
    {
        title: "Poste curvo simples",
        description: "Indicado quando o projeto pede avanco unico da luminaria sobre ruas, acessos ou calcadas.",
        use: "Ruas, acessos e calcadas",
        href: "/produtos/poste-curvo-simples",
    },
    {
        title: "Poste curvo duplo",
        description: "Aplicacao comum em avenidas, canteiros centrais e areas que precisam iluminar dois sentidos.",
        use: "Avenidas e canteiros",
        href: "/produtos/poste-curvo-duplo",
    },
    {
        title: "Poste ornamental",
        description: "Alternativa para pracas, jardins, condominios e areas urbanas com exigencia visual.",
        use: "Pracas e paisagismo",
        href: "/postes-para-pracas",
    },
    {
        title: "Bracos e suportes",
        description: "Acessorios metalicos para compatibilizar luminarias, postes existentes e projetos especiais.",
        use: "Luminarias publicas",
        href: "/produtos/braco-para-luminaria-publica",
    },
]

const applications = [
    {
        title: "Iluminacao publica",
        description: "Postes para vias, avenidas, pracas e obras urbanas com especificacao tecnica.",
        icon: Landmark,
    },
    {
        title: "Loteamentos",
        description: "Padronizacao visual, repetibilidade de fornecimento e apoio para definicao de modelos.",
        icon: Building2,
    },
    {
        title: "Condominios",
        description: "Modelos decorativos, retos ou teleconicos conforme arquitetura e necessidade luminotecnica.",
        icon: ShieldCheck,
    },
    {
        title: "Areas industriais",
        description: "Postes para patios, galpoes, docas, estacionamentos e circulacao interna.",
        icon: Factory,
    },
]

const comparisonRows = [
    ["Teleconico", "Vias, condominios e loteamentos", "Boa rigidez, visual limpo e ampla aplicacao"],
    ["Reto metalico", "Patios, galpoes e estacionamentos", "Especificacao simples e instalacao objetiva"],
    ["Curvo simples", "Ruas, acessos e calcadas", "Um avanco de luminaria para direcionamento lateral"],
    ["Curvo duplo", "Avenidas e canteiros centrais", "Dois pontos de iluminacao para sentidos opostos"],
    ["Ornamental", "Pracas, jardins e areas nobres", "Design urbano com acabamento visual mais relevante"],
    ["Bracos e suportes", "Compatibilizacao de luminarias", "Adaptacao entre poste, luminaria e projeto"],
]

const buyerIntentRows = [
    ["Poste metalico", "Hub pilar", "Comparar modelos, aplicacoes, acabamento e caminho de cotacao"],
    ["Postes metalicos galvanizados", "Produto/acabamento", "Entender durabilidade, ambiente, galvanizacao e vida util"],
    ["Poste de aco galvanizado", "Produto tecnico", "Validar material, protecao contra corrosao e uso em area externa"],
    ["Poste metalico para iluminacao", "Aplicacao", "Relacionar modelo do poste com luminaria, altura e fixacao"],
    ["Postes metalicos direto da fabrica", "Compra B2B", "Comprar com fabricante, nao apenas revenda ou marketplace"],
]

const quoteRows = [
    ["Modelo", "Reto, teleconico, curvo simples, curvo duplo, ornamental, suporte ou estrutura especial."],
    ["Dimensoes", "Altura, diametro, espessura, avanco, quantidade de luminarias e detalhes do projeto."],
    ["Fixacao", "Engastado, flangeado, base, chumbadores ou definicao a partir da obra civil."],
    ["Acabamento", "Galvanizacao a fogo, pintura eletrostatica ou acabamento conforme ambiente e memorial."],
    ["Aplicacao", "Iluminacao publica, condominio, loteamento, estacionamento, patio, galpao, praca ou industria."],
    ["Entrega", "Cidade, UF, quantidade, prazo desejado e documentos tecnicos disponiveis."],
]

const finishOptions = [
    {
        title: "Galvanizacao",
        description: "Indicada quando o ambiente exige maior protecao contra corrosao e vida util prolongada.",
        icon: ShieldCheck,
    },
    {
        title: "Pintura eletrostatica",
        description: "Acabamento para padronizacao visual, identidade do empreendimento e protecao adicional.",
        icon: Paintbrush,
    },
    {
        title: "Sob especificacao",
        description: "Definicao conforme memorial tecnico, ambiente, instalacao, quantidade e prazo do projeto.",
        icon: Ruler,
    },
]

const gallery = [
    createSeoImage("viaUrbanaIluminadaPostes"),
    createSeoImage("estacionamentoIndustrialPostesRetos"),
    createSeoImage("estacionamentoHospitalPostes"),
    createSeoImage("areaInstitucionalPostesMetalicosGalvanizados"),
    createSeoImage("pracaIluminadaLuminariaRedonda"),
    createSeoImage("ruaIluminadaPosteCurvo"),
    createSeoImage("viaPublicaPostesRetosDoisLados"),
]

const internalLinks = [
    ["Fabrica de postes metalicos", "/fabrica-de-postes-metalicos"],
    ["Fabricante de postes metalicos", "/fabricante-de-postes-metalicos"],
    ["Fornecedor de postes metalicos", "/fornecedor-de-postes-metalicos"],
    ["Postes para iluminacao publica", "/postes-para-iluminacao-publica"],
    ["Postes para loteamentos", "/postes-para-loteamentos"],
    ["Postes para condominios", "/postes-para-condominios"],
    ["Postes para pracas", "/postes-para-pracas"],
    ["Postes para estacionamentos", "/postes-para-estacionamentos"],
    ["Altura de poste para iluminacao publica", "/blog/altura-de-poste-para-iluminacao-publica"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste teleconico ou reto", "/blog/poste-teleconico-ou-reto"],
    ["Poste flangeado ou engastado", "/blog/poste-flangeado-ou-engastado"],
    ["Poste curvo simples", "/produtos/poste-curvo-simples"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Poste metalico galvanizado", "/produtos/poste-metalico-galvanizado"],
    ["Poste galvanizado ou pintado", "/blog/poste-galvanizado-ou-pintado"],
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Suporte para luminaria publica", "/produtos/suporte-para-luminaria-publica"],
    ["Chumbador para poste metalico", "/produtos/chumbador-para-poste-metalico"],
    ["Catalogo de produtos", "/produtos"],
    ["Poste teleconico", "/produtos/poste-teleconico"],
    ["Poste curvo duplo", "/produtos/poste-curvo-duplo"],
    ["Braco para luminaria publica", "/produtos/braco-para-luminaria-publica"],
    ["Catalogos e downloads", "/downloads"],
    ["Obras realizadas", "/obras"],
]

const faq = [
    {
        question: "Quais modelos de postes metalicos existem?",
        answer:
            "Os modelos mais comuns incluem postes teleconicos, retos, curvos simples, curvos duplos, ornamentais, decorativos e estruturas com bracos ou suportes para luminarias.",
    },
    {
        question: "Poste metalico e indicado para iluminacao publica?",
        answer:
            "Sim. Postes metalicos sao usados em iluminacao publica, loteamentos, avenidas, pracas, condominios, estacionamentos e areas industriais, desde que especificados conforme a aplicacao.",
    },
    {
        question: "Como escolher entre poste reto, curvo e teleconico?",
        answer:
            "A escolha depende de altura, avanco da luminaria, area a iluminar, tipo de instalacao, acabamento, carga prevista e exigencias do projeto. A B&B orienta essa definicao no orcamento tecnico.",
    },
    {
        question: "A B&B atende projetos fora de Goiania?",
        answer:
            "Sim. A fabrica em Goiania e prova de origem e capacidade produtiva, mas a pagina e voltada para atendimento nacional em projetos publicos e privados.",
    },
    {
        question: "Quais dados enviar para orcar postes metalicos?",
        answer:
            "Envie modelo desejado, altura, quantidade, cidade e UF, aplicacao, tipo de fixacao, acabamento, prazo e, se houver, desenho tecnico ou memorial do projeto.",
    },
    {
        question: "Qual a diferenca entre poste metalico e poste metalico galvanizado?",
        answer:
            "Poste metalico descreve a estrutura fabricada em aco. Poste metalico galvanizado indica acabamento com protecao por galvanizacao, indicado quando o ambiente exige maior resistencia contra corrosao e vida util prolongada.",
    },
    {
        question: "Comprar postes metalicos direto da fabrica muda o projeto?",
        answer:
            "Sim. Comprar direto com fabricante ajuda a alinhar modelo, altura, fixacao, acabamento, quantidade, prazo e documentacao tecnica antes da producao, reduzindo risco de retrabalho em compras B2B.",
    },
]

function getSchema() {
    return createSchemaGraph([
        createWebPageSchema({
            url: pageUrl,
            name: "Postes Metalicos",
            description: pageDescription,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Postes Metalicos", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#modelos`,
            name: "Modelos de postes metalicos",
            items: models.map((model) => ({
                name: model.title,
                url: model.href,
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

export default async function PostesMetalicosPage() {
    const [products, projects] = await Promise.all([
        getProducts(),
        getPortfolioProjects(),
    ])

    const featuredProducts = getPrimaryCatalogProducts(products)
        .filter((product) => /poste|braco|suporte|mastro/i.test(`${product.name} ${product.model}`))
        .slice(0, 6)
    const featuredProjects = projects.filter((project) => project.image).slice(0, 3)

    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="postes-metalicos-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp message={whatsappMessage} />
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
                        style={{ objectPosition: "60% center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/88 via-industrial-950/46 to-industrial-950/0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/50 via-industrial-950/8 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white rounded-md">
                            <Truck className="size-4 text-accent-premium" aria-hidden="true" />
                            Postes para projetos em todo o Brasil
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Postes Metalicos
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Hub tecnico e comercial para escolher postes metalicos por modelo, aplicacao, acabamento e
                            necessidade de instalacao. A B&B fabrica e orienta projetos de iluminacao publica, loteamentos,
                            condominios, estacionamentos e areas industriais.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label="Solicitar orcamento de postes metalicos pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
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
                    {applications.map((item) => {
                        const Icon = item.icon
                        return (
                            <div key={item.title} className="flex items-start gap-4 bg-white p-5 rounded-2xl">
                                <div className="flex size-11 shrink-0 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
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
                        <SectionLabel>Escolha por modelo</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Como comparar postes metalicos antes do orcamento
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            A busca por postes metalicos geralmente comeca ampla, mas a compra depende de uma decisao
                            tecnica: altura, geometria, tipo de fixacao, acabamento, luminaria, local de aplicacao e prazo.
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Esta pagina funciona como o hub pilar da B&B. Ela organiza os principais modelos e aponta para
                            linhas, catalogos, obras e paginas tecnicas que ajudam o comprador a especificar com mais
                            seguranca.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {models.map((model) => (
                            <Link
                                key={model.title}
                                href={model.href}
                                className="group border border-industrial-200 p-6 transition-colors hover:border-industrial-950 rounded-2xl"
                            >
                                <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400">
                                    {model.use}
                                </p>
                                <h3 className="mt-3 text-base font-black uppercase tracking-tight text-industrial-950">
                                    {model.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-industrial-600">{model.description}</p>
                                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                    Ver linha
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Tabela comparativa</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Modelos, aplicacoes e criterio de escolha
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            A tabela ajuda a transformar uma busca generica por poste metalico em uma especificacao mais
                            clara para engenharia, compras e orcamento.
                        </p>
                    </div>

                    <div className="overflow-hidden border border-white/15 rounded-2xl">
                        {comparisonRows.map(([model, use, criterion]) => (
                            <div key={model} className="grid border-b border-white/15 last:border-b-0 md:grid-cols-[220px_1fr_1fr]">
                                <div className="bg-white/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                                    {model}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-200">
                                    {use}
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
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Intencao de busca</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que cada busca por poste metalico tenta resolver
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Para disputar top 1, a pagina precisa cobrir as variacoes comerciais sem criar paginas
                            duplicadas. A B&B organiza nesta pagina as buscas por poste metalico, poste galvanizado,
                            poste de aco e compra direta com fabricante.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200">
                        {buyerIntentRows.map(([term, intent, answer]) => (
                            <div key={term} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[230px_190px_1fr]">
                                <div className="bg-industrial-50 px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-700">
                                    {term}
                                </div>
                                <div className="px-5 py-4 text-sm font-black uppercase tracking-widest text-industrial-500">
                                    {intent}
                                </div>
                                <div className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                                    {answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Acabamento</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Galvanizacao, pintura e especificacao por ambiente
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            A escolha do acabamento muda durabilidade, manutencao, percepcao visual e compatibilidade com
                            o memorial do projeto. A B&B deve orientar essa decisao antes da proposta.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {finishOptions.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.title} className="border border-industrial-200 p-6 rounded-2xl">
                                    <div className="mb-6 flex size-12 items-center justify-center bg-industrial-950 text-accent-premium rounded-lg">
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

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Briefing tecnico</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Dados que transformam busca em orcamento
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O Google tende a premiar paginas que resolvem a tarefa do usuario. Para compras B2B, isso
                            significa orientar exatamente o que engenharia e compras devem enviar para receber uma
                            proposta comparavel.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-industrial-200 bg-white">
                        {quoteRows.map(([label, value]) => (
                            <div key={label} className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[220px_1fr]">
                                <div className="bg-white px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-600">
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

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Galeria indexavel</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Imagens de postes metalicos por aplicacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            As imagens ajudam compradores e o Google Imagens a entender diferencas de modelo e uso. Fotos
                            reais de obras e produtos devem substituir gradualmente qualquer material generico.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {gallery.map((image) => (
                            <div key={image.src} className="border border-industrial-200 bg-white rounded-2xl overflow-hidden">
                                <div className="relative aspect-[4/3] bg-industrial-100">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 33vw, 100vw"
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

            {featuredProducts.length > 0 && (
                <section className="py-20 md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-3xl space-y-5">
                                <SectionLabel>Produtos relacionados</SectionLabel>
                                <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                    Itens do catalogo conectados ao hub
                                </h2>
                            </div>
                            <Link
                                href="/produtos"
                                className="inline-flex h-12 items-center justify-center gap-2 border border-industrial-300 px-5 text-xs font-black uppercase tracking-widest text-industrial-800 hover:border-industrial-950 rounded-lg"
                            >
                                Ver catalogo
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/produtos/item/${product.id}`}
                                    className="group flex min-h-[340px] flex-col border border-industrial-200 bg-white transition-colors hover:border-industrial-950 rounded-2xl overflow-hidden"
                                >
                                    <div className="relative aspect-[4/3] border-b border-industrial-100 bg-industrial-50">
                                        {product.image ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-5"
                                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-4xl font-black text-industrial-200">
                                                B&B
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400">
                                            {product.model || "Produto B&B"}
                                        </p>
                                        <h3 className="mt-2 text-base font-black uppercase leading-tight text-industrial-950">
                                            {product.name}
                                        </h3>
                                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-industrial-600">
                                            {product.description}
                                        </p>
                                        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                            Ver produto
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Interlinking P0</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Caminhos para aprofundar a especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            O hub precisa distribuir autoridade para fabricante, linhas, catalogos, obras e futuras paginas
                            tecnicas do cluster.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {internalLinks.map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium rounded-lg"
                            >
                                {label}
                                <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {featuredProjects.length > 0 && (
                <section className="py-20 md:py-28">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 max-w-3xl space-y-5">
                            <SectionLabel>Prova real</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                Obras ajudam a validar aplicacao e capacidade
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">
                                O ganho nacional depende de unir pagina pilar, fotos reais, portfolio e especificacao
                                tecnica. Goiania prova origem; o objetivo comercial e Brasil.
                            </p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-3">
                            {featuredProjects.map((project) => (
                                <div key={project.title} className="border border-industrial-200 bg-white rounded-2xl overflow-hidden">
                                    <div className="relative aspect-[4/3] bg-industrial-50">
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} - ${project.location}`}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 33vw, 100vw"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400">
                                            {project.category}
                                        </p>
                                        <h3 className="mt-2 text-base font-black uppercase text-industrial-950">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 text-sm font-bold text-industrial-500">{project.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas comuns sobre postes metalicos
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas objetivas para compradores que ainda estao comparando modelos, aplicacoes e
                            criterios de compra.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faq.map((item) => (
                            <details key={item.question} className="group border border-industrial-200 bg-white p-6 rounded-2xl" open={item === faq[0]}>
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
                            Compare modelos e envie seu projeto
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe aplicacao, altura, quantidade, cidade/UF, fixacao, acabamento e prazo. A equipe B&B
                            ajuda a transformar a busca por postes metalicos em especificacao e orcamento.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800 rounded-lg"
                            aria-label="Solicitar orcamento tecnico de postes metalicos pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white rounded-lg"
                        >
                            <Download className="size-5" aria-hidden="true" />
                            Baixar catalogos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-white py-10">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    <Link href="/fabricante-de-postes-metalicos" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Factory className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Comprar direto de fabricante</span>
                    </Link>
                    <Link href="/postes-para-iluminacao-publica" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <Landmark className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Aplicacao em iluminacao publica</span>
                    </Link>
                    <Link href="/downloads" className="flex items-center gap-4 border border-industrial-200 p-5 hover:border-industrial-950 rounded-lg">
                        <FileText className="size-6 text-accent-dark" aria-hidden="true" />
                        <span className="text-sm font-black uppercase tracking-widest">Catalogos e desenhos tecnicos</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
