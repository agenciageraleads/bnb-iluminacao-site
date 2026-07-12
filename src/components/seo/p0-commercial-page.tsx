import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, Download, MessageCircle } from "lucide-react"

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
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

export type Row = readonly [string, string] | readonly [string, string, string]

export type FaqItem = {
    question: string
    answer: string
}

export type LinkItem = {
    label: string
    href: string
}

export type P0CommercialPageConfig = {
    schemaId: string
    pageUrl: string
    breadcrumbName: string
    title: string
    eyebrow: string
    description: string
    heroImage: string
    heroAlt: string
    whatsappMessage: string
    primarySection: {
        label: string
        title: string
        body: string[]
    }
    tables: {
        label: string
        title: string
        body: string
        rows: Row[]
    }[]
    internalLinks: LinkItem[]
    faq: FaqItem[]
}

export function createP0CommercialSchema(config: P0CommercialPageConfig) {
    return createSchemaGraph([
        createWebPageSchema({
            url: config.pageUrl,
            name: config.breadcrumbName,
            description: config.description,
            image: config.heroImage,
        }),
        createBreadcrumbSchema(config.pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: config.breadcrumbName, item: config.pageUrl },
        ]),
        createItemListSchema({
            id: `${config.pageUrl}#criterios`,
            name: `${config.breadcrumbName}: criterios de compra`,
            items: config.tables.flatMap((table) =>
                table.rows.map((row) => ({
                    name: row[0],
                    description: row.slice(1).join(" - "),
                })),
            ),
        }),
        createFaqSchema(config.pageUrl, config.faq),
    ])
}

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-accent-dark">
            {children}
        </p>
    )
}

function renderRow(row: Row) {
    return (
        <div
            key={row.join("-")}
            className={
                row.length === 3
                    ? "grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[230px_220px_1fr]"
                    : "grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[240px_1fr]"
            }
        >
            <div className="bg-industrial-50 px-5 py-4 text-xs font-black uppercase tracking-widest text-industrial-700">
                {row[0]}
            </div>
            {row.slice(1).map((cell) => (
                <div key={cell} className="px-5 py-4 text-sm font-medium leading-relaxed text-industrial-800">
                    {cell}
                </div>
            ))}
        </div>
    )
}

export function P0CommercialPage({ config }: { config: P0CommercialPageConfig }) {
    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id={config.schemaId} data={createP0CommercialSchema(config)} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp message={config.whatsappMessage} />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={config.heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-85 md:opacity-100"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/58 to-industrial-950/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/60 via-industrial-950/10 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            {config.eyebrow}
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            {config.title}
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            {config.description}
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={config.whatsappMessage}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label={`Solicitar orcamento: ${config.title}`}
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

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-6">
                        <SectionLabel>{config.primarySection.label}</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            {config.primarySection.title}
                        </h2>
                    </div>
                    <div className="space-y-5">
                        {config.primarySection.body.map((paragraph) => (
                            <p key={paragraph} className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {config.tables.map((table, index) => (
                <section
                    key={table.title}
                    className={index % 2 === 0 ? "bg-industrial-50 py-20 md:py-28" : "py-20 md:py-28"}
                >
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                        <div className="space-y-5">
                            <SectionLabel>{table.label}</SectionLabel>
                            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                                {table.title}
                            </h2>
                            <p className="text-base leading-relaxed text-industrial-600">{table.body}</p>
                        </div>
                        <div className="overflow-hidden border border-industrial-200 bg-white">
                            {table.rows.map(renderRow)}
                        </div>
                    </div>
                </section>
            ))}

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Cluster P0</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Caminhos para aprofundar a especificacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Links internos conectam a pagina comercial a produtos, aplicacoes, fabrica, catalogos e guias tecnicos.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {config.internalLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group flex items-center justify-between gap-4 border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium"
                            >
                                {item.label}
                                <ArrowRight className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Duvidas antes do orcamento
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Respostas diretas para compras, engenharia e obras antes do primeiro contato comercial.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {config.faq.map((item, index) => (
                            <details key={item.question} className="group border border-industrial-200 bg-white p-6" open={index === 0}>
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
                            Envie o briefing tecnico
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Informe aplicacao, modelo, altura, quantidade, cidade/UF, fixacao, acabamento, luminaria, prazo e memorial quando houver.
                        </p>
                    </div>
                    <WhatsAppLink
                        message={config.whatsappMessage}
                        className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                        aria-label={`Falar com especialista: ${config.title}`}
                    >
                        <MessageCircle className="size-5" aria-hidden="true" />
                        Falar com especialista
                    </WhatsAppLink>
                </div>
            </section>

            <Footer />
        </main>
    )
}
