import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Building2, Camera, MapPin, MessageCircle, Tag } from "lucide-react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SchemaOrg } from "@/components/seo/schema-org"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { getPortfolioProjects } from "@/lib/data"
import { caseStudies } from "@/lib/seo/cases"
import {
    SITE_URL,
    createBreadcrumbSchema,
    createFactoryOrganizationSchema,
    createImageSchemas,
    createItemListSchema,
    createSchemaGraph,
    createWebPageSchema,
} from "@/lib/seo/schema"

export const dynamic = "force-dynamic"

const pageUrl = "https://bebiluminacao.com.br/obras"
const pageTitle = "Obras Realizadas em Postes e Iluminacao | B&B"
const pageDescription =
    "Cases e obras realizadas pela B&B com postes metalicos, iluminacao publica, pracas, quadras, estacionamentos e areas externas."
const whatsappMessage =
    "Ola, vi as obras realizadas da B&B e quero solicitar um orcamento para um projeto."
const heroImage = caseStudies[0].image

export const metadata: Metadata = {
    title: {
        absolute: pageTitle,
    },
    description: pageDescription,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: pageUrl,
        type: "website",
        images: [
            {
                url: `https://bebiluminacao.com.br${heroImage}`,
                width: 1200,
                height: 630,
                alt: caseStudies[0].imageAlt,
            },
        ],
    },
}

function getSchema() {
    return createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: pageTitle,
            description: pageDescription,
            image: heroImage,
        }),
        createBreadcrumbSchema(pageUrl, [
            { name: "Inicio", item: SITE_URL },
            { name: "Obras", item: pageUrl },
        ]),
        createItemListSchema({
            id: `${pageUrl}#cases`,
            name: "Cases de postes metalicos e iluminacao B&B",
            items: caseStudies.map((caseStudy) => ({
                name: caseStudy.title,
                description: `${caseStudy.product} em ${caseStudy.location}`,
                url: `/obras/${caseStudy.slug}`,
            })),
        }),
        ...createImageSchemas(
            caseStudies.map((caseStudy) => ({
                src: caseStudy.image,
                alt: caseStudy.imageAlt,
                title: caseStudy.shortTitle,
            }))
        ),
    ])
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-accent-dark">
            {children}
        </p>
    )
}

export default async function ObrasPage() {
    const projects = await getPortfolioProjects()

    return (
        <main className="min-h-screen bg-white text-industrial-950">
            <SchemaOrg id="obras-schema" data={getSchema()} />
            <Header />
            <div className="hidden md:block">
                <FloatingWhatsApp
                    message={whatsappMessage}
                    eventLabel="Solicitar orcamento a partir de obras realizadas"
                    eventSource="floating_obras"
                />
            </div>

            <section className="relative overflow-hidden bg-industrial-950 pt-28 md:pt-36">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-90"
                        sizes="100vw"
                        style={{ objectPosition: "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/94 via-industrial-950/68 to-industrial-950/16" />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/72 via-industrial-950/20 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-12 md:pb-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                            <Camera className="size-4 text-accent-premium" aria-hidden="true" />
                            Cases reais do portfolio B&B
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Obras realizadas com postes e iluminacao
                        </h1>
                        <p className="mt-8 max-w-3xl text-base font-medium leading-relaxed text-industrial-100 md:text-xl">
                            Fotos reais de aplicacoes da B&B em pracas, quadras, estacionamentos, areas hospitalares,
                            condominios e projetos institucionais. Goiania comprova origem fabril; o atendimento e
                            nacional.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink
                                message={whatsappMessage}
                                eventLabel="Solicitar orcamento a partir de obras realizadas"
                                eventSource="hero_obras"
                                className="inline-flex h-14 items-center justify-center gap-3 bg-accent-premium px-7 text-xs font-black uppercase tracking-widest text-industrial-950 transition-colors hover:bg-yellow-300"
                                aria-label="Solicitar orcamento a partir das obras realizadas pelo WhatsApp"
                            >
                                <MessageCircle className="size-5" aria-hidden="true" />
                                Solicitar orcamento
                            </WhatsAppLink>
                            <Link
                                href="/postes-metalicos"
                                className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-industrial-950"
                            >
                                <Building2 className="size-5" aria-hidden="true" />
                                Ver postes metalicos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Cases com foto real</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Aplicacoes documentadas por cidade, produto e contexto
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            Os cases abaixo conectam imagem, cidade, tipo de obra, produto aplicado e proximo passo
                            comercial. Eles servem como prova visual para compradores que precisam validar experiencia
                            antes de cotar.
                        </p>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-3">
                        {caseStudies.map((caseStudy) => (
                            <Link
                                key={caseStudy.slug}
                                href={`/obras/${caseStudy.slug}`}
                                className="group flex min-h-[520px] flex-col border border-industrial-200 bg-white transition-colors hover:border-industrial-950"
                            >
                                <div className="relative aspect-[4/3] bg-industrial-100">
                                    <Image
                                        src={caseStudy.image}
                                        alt={caseStudy.imageAlt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        sizes="(min-width: 1024px) 33vw, 100vw"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-5 flex flex-wrap gap-2">
                                        <span className="inline-flex items-center gap-2 bg-industrial-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent-premium">
                                            <MapPin className="size-3" aria-hidden="true" />
                                            {caseStudy.location}
                                        </span>
                                        <span className="inline-flex items-center gap-2 border border-industrial-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-industrial-600">
                                            <Tag className="size-3" aria-hidden="true" />
                                            {caseStudy.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black uppercase leading-tight text-industrial-950">
                                        {caseStudy.shortTitle}
                                    </h3>
                                    <p className="mt-3 text-sm font-black uppercase tracking-widest text-accent-dark">
                                        {caseStudy.product}
                                    </p>
                                    <p className="mt-4 flex-1 text-sm leading-relaxed text-industrial-600">
                                        {caseStudy.summary}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-950">
                                        Ver case
                                        <ArrowRight className="size-4 text-accent-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl space-y-5">
                        <SectionLabel>Portfolio completo</SectionLabel>
                        <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                            Outras obras e referencias visuais
                        </h2>
                        <p className="text-base leading-relaxed text-industrial-600">
                            O grid abaixo preserva o portfolio do CMS/fallback atual. Os cards destacados acima sao os
                            cases SEO com pagina individual, cidade, produto e CTA.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={`${project.title}-${project.location}`}
                                className="border border-industrial-200 bg-white"
                            >
                                <div className="relative aspect-video overflow-hidden bg-industrial-100">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} - ${project.location}`}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-industrial-100" />
                                    )}
                                </div>
                                <div className="p-6">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-dark">
                                        {project.category}
                                    </p>
                                    <h3 className="mt-3 text-lg font-black uppercase text-industrial-950">
                                        {project.title}
                                    </h3>
                                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-industrial-500">
                                        <MapPin className="size-4 text-accent-dark" aria-hidden="true" />
                                        {project.location}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-accent-premium py-16 md:py-20">
                <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                            Quer transformar uma referencia em orcamento?
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-industrial-800">
                            Envie cidade, tipo de obra, quantidade estimada, aplicacao, modelo desejado, acabamento e prazo.
                            A equipe B&B organiza o briefing para cotacao.
                        </p>
                    </div>
                    <WhatsAppLink
                        message={whatsappMessage}
                        eventLabel="Solicitar orcamento a partir do portfolio"
                        eventSource="final_obras"
                        className="inline-flex h-14 items-center justify-center gap-3 bg-industrial-950 px-7 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-industrial-800"
                        aria-label="Solicitar orcamento a partir do portfolio pelo WhatsApp"
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
