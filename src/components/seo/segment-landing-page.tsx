import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, Download, FileText, MessageCircle } from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import {
    SEGMENT_BASE_PATH,
    type SegmentPageConfig,
    lineDownloadHref,
    otherSegments,
    segmentUrl,
} from "@/lib/seo/segment-pages"
import {
    SITE_URL,
    absoluteUrl,
    createBreadcrumbSchema,
    createFactoryOrganizationSchema,
    createFaqSchema,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

export function createSegmentMetadata(config: SegmentPageConfig): Metadata {
    const url = segmentUrl(config.slug)

    return {
        title: { absolute: config.metaTitle },
        description: config.metaDescription,
        alternates: { canonical: url },
        openGraph: {
            title: config.metaTitle,
            description: config.metaDescription,
            url,
            type: "website",
            images: [
                {
                    url: absoluteUrl(config.heroImage),
                    width: 1200,
                    height: 630,
                    alt: config.heroAlt,
                },
            ],
        },
    }
}

function createSegmentSchema(config: SegmentPageConfig) {
    const url = segmentUrl(config.slug)

    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url,
            name: `${config.label}: ${config.promise}`,
            description: config.metaDescription,
            image: config.heroImage,
        }),
        createBreadcrumbSchema(url, [
            { name: "Início", item: SITE_URL },
            { name: "Soluções por segmento", item: `${SITE_URL}${SEGMENT_BASE_PATH}` },
            { name: config.label, item: url },
        ]),
        createItemListSchema({
            id: `${url}#linhas`,
            name: `Linhas B&B recomendadas para ${config.label.toLowerCase()}`,
            items: config.lines.map((line) => ({
                name: `Linha ${line.name}`,
                description: `${line.description} ${line.fit}`,
            })),
        }),
        createFaqSchema(url, [...config.faq]),
    ])
}

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-accent-dark">
            {children}
        </p>
    )
}

export function SegmentLandingPage({ config }: { config: SegmentPageConfig }) {
    const HeroIcon = config.heroIcon
    const others = otherSegments(config.slug)

    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id={`solucoes-${config.slug}-schema`} data={createSegmentSchema(config)} />
            <Header />
            <div className="hidden 2xl:block">
                <FloatingWhatsApp
                    message={config.whatsappMessage}
                    eventLabel={`Solicitar orcamento - ${config.label}`}
                    eventSource={`floating_solucoes_${config.slug}`}
                />
            </div>

            {/* Hero — a promessa do catálogo, na língua do decisor */}
            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={config.heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-90 md:opacity-100"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/92 via-industrial-950/58 to-industrial-950/16" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/54 via-industrial-950/8 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex max-w-full items-center gap-3 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white">
                            <HeroIcon className="size-4 shrink-0 text-accent-premium" aria-hidden="true" />
                            {config.decisionMaker}
                        </div>
                        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-accent-premium">
                            {config.label}
                        </p>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl">
                            {config.promise}
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-200 md:text-xl">
                            {config.blurb}
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={config.whatsappMessage}
                                eventLabel={`Solicitar orcamento - ${config.label}`}
                                eventSource={`hero_solucoes_${config.slug}`}
                                className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label={`Solicitar orçamento para ${config.label} pelo WhatsApp`}
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orçamento
                            </WhatsAppLink>
                            <Link
                                href="/downloads"
                                className="inline-flex h-14 items-center justify-center gap-3 rounded-lg border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
                            >
                                <Download className="size-5" aria-hidden="true" />
                                Baixar catálogos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* O que este decisor precisa resolver */}
            <section className="border-b border-industrial-200 bg-industrial-50 py-8">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-4">
                    {config.priorities.map((item) => {
                        const Icon = item.icon
                        return (
                            <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-white p-5">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-industrial-950 text-accent-premium">
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

            {/* O problema, contado do lado do decisor */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    <div className="space-y-6">
                        <SectionLabel>{config.intro.label}</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            {config.intro.title}
                        </h2>
                    </div>
                    <div className="space-y-5">
                        {config.intro.body.map((paragraph) => (
                            <p key={paragraph} className="text-base leading-relaxed text-industrial-600 md:text-lg">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Linhas recomendadas — cada card leva à âncora da linha em /downloads */}
            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Linhas recomendadas</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            As linhas B&B que atendem este tipo de projeto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Cada linha tem material técnico próprio. Clique para ir direto aos datasheets e desenhos
                            técnicos daquela linha.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {config.lines.map((line) => (
                            <Link
                                key={line.slug}
                                href={lineDownloadHref(line.slug)}
                                className="group flex flex-col rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors hover:border-accent-premium"
                            >
                                <h3 className="text-xl font-black uppercase text-white">Linha {line.name}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-industrial-300">{line.description}</p>
                                <p className="mt-4 border-l-2 border-accent-premium pl-4 text-sm font-medium leading-relaxed text-white">
                                    {line.fit}
                                </p>
                                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-accent-premium">
                                    Material técnico
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documentos e provas */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Documentos e provas</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que a B&B entrega junto com o produto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Rigor de engenharia não é adjetivo: é documento na mão de quem precisa aprovar, fiscalizar
                            ou operar.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {config.proofs.map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.title} className="rounded-2xl border border-industrial-200 p-6">
                                    <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-industrial-950 text-accent-premium">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black uppercase text-industrial-950">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-industrial-600">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* O que enviar para cotar */}
            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Dados para cotação</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que enviar para receber um orçamento útil
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Se o projeto ainda não está fechado, envie o que tem. A primeira resposta já separa os
                            modelos prováveis e aponta o que falta para fechar a proposta.
                        </p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-industrial-200 bg-white">
                        {config.quoteData.map(([label, value]) => (
                            <div
                                key={label}
                                className="grid border-b border-industrial-200 last:border-b-0 md:grid-cols-[220px_1fr]"
                            >
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

            {/* FAQ */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Perguntas frequentes</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Dúvidas comuns deste tipo de projeto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Se a sua pergunta não está aqui, a engenharia responde direto pelo WhatsApp ou pelo
                            formulário de contato.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {config.faq.map((item, index) => (
                            <details
                                key={item.question}
                                className="group rounded-2xl border border-industrial-200 bg-industrial-50 p-6"
                                open={index === 0}
                            >
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-black uppercase text-industrial-950">
                                    {item.question}
                                    <span className="text-accent-dark transition-transform group-open:rotate-45" aria-hidden="true">
                                        +
                                    </span>
                                </summary>
                                <p className="mt-4 text-sm leading-relaxed text-industrial-600">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="bg-accent-premium py-16 md:py-20">
                <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            {config.finalCta.title}
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            {config.finalCta.body}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                        <WhatsAppLink
                            message={config.whatsappMessage}
                            eventLabel={`Falar com especialista - ${config.label}`}
                            eventSource={`final_solucoes_${config.slug}`}
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                            aria-label={`Falar com especialista sobre ${config.label} pelo WhatsApp`}
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Falar com especialista
                        </WhatsAppLink>
                        <Link
                            href="/contato"
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-lg border-2 border-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-white"
                        >
                            <FileText className="size-5" aria-hidden="true" />
                            Enviar por e-mail
                        </Link>
                    </div>
                </div>
            </section>

            {/* Links internos */}
            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Continuar navegando</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Páginas que ajudam a fechar a especificação
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-300">
                            Modelo, altura, fixação e acabamento são as quatro decisões que definem o produto. Estes
                            caminhos ajudam a fechar cada uma.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {config.internalLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-accent-premium"
                            >
                                {item.label}
                                <ArrowRight
                                    className="size-4 shrink-0 text-accent-premium transition-transform group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Não é o seu caso? — os outros 6 segmentos */}
            <section className="border-b border-industrial-200 bg-white py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-10 max-w-3xl space-y-4">
                        <SectionLabel>Não é o seu caso?</SectionLabel>
                        <h2 className="text-2xl font-black uppercase leading-tight md:text-4xl">
                            Cada projeto tem um decisor — encontre o seu
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Projetos únicos entram pela engenharia: traga a ideia ou o desenho, a B&B projeta e fabrica
                            sob medida.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {others.map((segment) => {
                            const Icon = segment.indexIcon
                            return (
                                <Link
                                    key={segment.slug}
                                    href={`${SEGMENT_BASE_PATH}/${segment.slug}`}
                                    className="group flex items-start gap-4 rounded-2xl border border-industrial-200 p-5 transition-colors hover:border-industrial-950"
                                >
                                    <Icon className="mt-0.5 size-6 shrink-0 text-accent-dark" aria-hidden="true" />
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-industrial-950">
                                            {segment.label}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-industrial-600">
                                            {segment.promise}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
