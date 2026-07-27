import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Download, MessageCircle } from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { SEGMENT_BASE_PATH, segmentList } from "@/lib/seo/segment-pages"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFactoryOrganizationSchema,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

const pageUrl = `${SITE_URL}${SEGMENT_BASE_PATH}`
const pageTitle = "Soluções por Segmento | B&B Iluminação"
const pageDescription =
    "Cada projeto tem um decisor. Encontre o seu caso: construção privada, setor público, iluminação pública e PPP, infraestrutura, revendas, projetistas ou indústria."
const whatsappMessage =
    "Olá, vim pela página de soluções por segmento do site da B&B e quero falar sobre um projeto."

export const metadata: Metadata = {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: pageUrl,
        type: "website",
    },
}

function getSchema() {
    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: "Soluções por segmento",
            description: pageDescription,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Início", item: SITE_URL },
            { name: "Soluções por segmento", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#segmentos`,
            name: "Segmentos atendidos pela B&B Iluminação",
            items: segmentList.map((segment) => ({
                name: segment.label,
                description: `${segment.promise}. ${segment.blurb}`,
                url: `${pageUrl}/${segment.slug}`,
            })),
        }),
    ])
}

export default function SolucoesPage() {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="solucoes-index-schema" data={getSchema()} />
            <Header />

            <section className="bg-industrial-950 pt-28 md:pt-36">
                <div className="container mx-auto px-4 pb-16 pt-12 md:pb-24">
                    <div className="max-w-4xl">
                        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-accent-premium">
                            Comece por aqui
                        </p>
                        <h1 className="text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl">
                            Para cada tipo de projeto
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            Cada projeto tem um decisor — e cada decisor tem uma conta diferente para fechar. Encontre
                            o seu caso: cada página reúne as soluções, os documentos e o caminho de compra do seu
                            segmento.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {segmentList.map((segment) => {
                            const Icon = segment.indexIcon
                            return (
                                <Link
                                    key={segment.slug}
                                    href={`${SEGMENT_BASE_PATH}/${segment.slug}`}
                                    className="group flex flex-col rounded-2xl border border-industrial-200 p-6 transition-colors hover:border-industrial-950"
                                >
                                    <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-industrial-950 text-accent-premium">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent-dark">
                                        {segment.label}
                                    </p>
                                    <h2 className="mt-3 text-xl font-black uppercase leading-tight text-industrial-950">
                                        {segment.promise}
                                    </h2>
                                    <p className="mt-4 flex-1 text-sm leading-relaxed text-industrial-600">
                                        {segment.blurb}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-500 group-hover:text-industrial-950">
                                        Ver soluções
                                        <ArrowRight
                                            className="size-4 transition-transform group-hover:translate-x-1"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-accent-premium py-16 md:py-20">
                <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            Não se encaixa em nenhum caso?
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Projetos únicos entram pela engenharia: traga a ideia ou o desenho — a B&B projeta e
                            fabrica sob medida.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={whatsappMessage}
                            eventLabel="Falar com a engenharia - indice de segmentos"
                            eventSource="final_solucoes_index"
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label="Falar com a engenharia da B&B pelo WhatsApp"
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com a engenharia
                        </WhatsAppLink>
                        <Link
                            href="/downloads"
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-lg border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <Download className="size-5" aria-hidden="true" />
                            Baixar catálogos
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
