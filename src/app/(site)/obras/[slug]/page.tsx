import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Tag } from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { caseStudies, getCaseStudyBySlug } from "@/lib/seo/cases"
import {
    ORGANIZATION_ID,
    SITE_URL,
    absoluteUrl,
    createBreadcrumbSchema,
    createFactoryOrganizationSchema,
    createImageSchemas,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

interface CasePageProps {
    params: Promise<{ slug: string }>
}

export function generateStaticParams() {
    return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }))
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
    const { slug } = await params
    const caseStudy = getCaseStudyBySlug(slug)

    if (!caseStudy) {
        return {}
    }

    const url = `${SITE_URL}/obras/${caseStudy.slug}`

    return {
        title: {
            absolute: `${caseStudy.shortTitle} | Case B&B Iluminacao`,
        },
        description: caseStudy.summary,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: caseStudy.title,
            description: caseStudy.summary,
            url,
            type: "article",
            images: [
                {
                    url: absoluteUrl(caseStudy.image),
                    width: 1200,
                    height: 630,
                    alt: caseStudy.imageAlt,
                },
            ],
        },
    }
}

function createArticleSchema(caseStudy: (typeof caseStudies)[number]) {
    const pageUrl = `${SITE_URL}/obras/${caseStudy.slug}`

    return {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: caseStudy.title,
        description: caseStudy.summary,
        image: absoluteUrl(caseStudy.image),
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
        about: [
            caseStudy.product,
            caseStudy.category,
            caseStudy.location,
        ],
    }
}

function getSchema(caseStudy: (typeof caseStudies)[number]) {
    const pageUrl = `${SITE_URL}/obras/${caseStudy.slug}`

    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createArticleSchema(caseStudy),
        createWebPageSchema({
            url: pageUrl,
            name: caseStudy.title,
            description: caseStudy.summary,
            image: caseStudy.image,
            mainEntityId: `${pageUrl}#article`,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Obras", item: `${SITE_URL}/obras` },
            { name: caseStudy.shortTitle, item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#resumo`,
            name: `Resumo do case ${caseStudy.shortTitle}`,
            items: [
                {
                    name: "Cidade",
                    description: caseStudy.location,
                },
                {
                    name: "Produto",
                    description: caseStudy.product,
                    url: caseStudy.productHref,
                },
                {
                    name: "Contexto",
                    description: caseStudy.context,
                },
            ],
        }),
        ...createImageSchemas([
            {
                src: caseStudy.image,
                alt: caseStudy.imageAlt,
                title: caseStudy.shortTitle,
            },
        ]),
    ])
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-accent-dark">
            {children}
        </p>
    )
}

export default async function CasePage({ params }: CasePageProps) {
    const { slug } = await params
    const caseStudy = getCaseStudyBySlug(slug)

    if (!caseStudy) {
        notFound()
    }

    const pageUrl = `${SITE_URL}/obras/${caseStudy.slug}`

    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id={`${caseStudy.slug}-schema`} data={getSchema(caseStudy)} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp
                    message={caseStudy.ctaMessage}
                    eventLabel={`Solicitar orcamento pelo case ${caseStudy.shortTitle}`}
                    eventSource={`floating_case_${caseStudy.slug}`}
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={caseStudy.image}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-90"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/94 via-industrial-950/62 to-industrial-950/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/70 via-industrial-950/12 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white rounded-md">
                            <MapPin className="size-4 text-accent-premium" aria-hidden="true" />
                            {caseStudy.location}
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            {caseStudy.title}
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-100 md:text-xl">
                            {caseStudy.summary}
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={caseStudy.ctaMessage}
                                eventLabel={`Solicitar orcamento pelo case ${caseStudy.shortTitle}`}
                                eventSource={`hero_case_${caseStudy.slug}`}
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300 rounded-lg"
                                aria-label={`Solicitar orcamento sobre ${caseStudy.shortTitle} pelo WhatsApp`}
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href={caseStudy.productHref}
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950 rounded-lg"
                            >
                                <Tag className="size-5" aria-hidden="true" />
                                Ver produto
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-industrial-200 bg-industrial-50 py-8">
                <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
                    {[
                        ["Cidade", caseStudy.location],
                        ["Produto", caseStudy.product],
                        ["Categoria", caseStudy.category],
                    ].map(([label, value]) => (
                        <div key={label} className="bg-white p-5 rounded-lg">
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent-dark">
                                {label}
                            </p>
                            <p className="mt-2 text-base font-black uppercase text-industrial-950">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Contexto da obra</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Onde o produto foi aplicado
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            {caseStudy.context}
                        </p>
                        <p className="text-base leading-relaxed text-industrial-600 md:text-lg">
                            Este case e uma referencia visual do portfolio B&B. Medidas, modelo final, acabamento e
                            compatibilidade tecnica devem ser confirmados no orcamento conforme memorial e local de
                            instalacao.
                        </p>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden border border-industrial-200 bg-industrial-100 rounded-2xl">
                        <Image
                            src={caseStudy.image}
                            alt={caseStudy.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-industrial-950 py-20 text-white md:py-28">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
                    <div className="space-y-5">
                        <SectionLabel>Solucao aplicada</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            O que este case prova
                        </h2>
                        <div className="space-y-4">
                            {caseStudy.solution.map((item) => (
                                <div key={item} className="flex gap-4 border border-white/10 bg-white/5 p-5 rounded-lg">
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-premium" aria-hidden="true" />
                                    <p className="text-sm font-medium leading-relaxed text-industrial-200">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-5">
                        <SectionLabel>Valor comercial</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Como usar como referencia de compra
                        </h2>
                        <div className="space-y-4">
                            {caseStudy.outcomes.map((item) => (
                                <div key={item} className="flex gap-4 border border-white/10 bg-white/5 p-5 rounded-lg">
                                    <ArrowRight className="mt-0.5 size-5 shrink-0 text-accent-premium" aria-hidden="true" />
                                    <p className="text-sm font-medium leading-relaxed text-industrial-200">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="space-y-5">
                        <SectionLabel>Proximo passo</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Transforme o case em briefing de cotacao
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Para cotar algo parecido, envie cidade/UF, tipo de obra, quantidade estimada, aplicacao,
                            altura aproximada, acabamento, prazo e qualquer memorial, projeto ou foto de referencia.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <WhatsAppLink
                            message={caseStudy.ctaMessage}
                            eventLabel={`Solicitar cotacao pelo case ${caseStudy.shortTitle}`}
                            eventSource={`final_case_${caseStudy.slug}`}
                            className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-accent-premium hover:text-industrial-950 rounded-lg"
                            aria-label={`Solicitar cotacao sobre ${caseStudy.shortTitle} pelo WhatsApp`}
                        >
                            <MessageCircle className="size-5" aria-hidden="true" />
                            Solicitar cotacao
                        </WhatsAppLink>
                        <Link
                            href={caseStudy.applicationHref}
                            className="inline-flex h-14 items-center justify-center gap-3 border border-industrial-300 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:border-industrial-950 rounded-lg"
                        >
                            Ver aplicacao relacionada
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                        <Link
                            href="/obras"
                            className="inline-flex h-14 items-center justify-center gap-3 border border-industrial-300 px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:border-industrial-950 rounded-lg"
                        >
                            Voltar para obras
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
