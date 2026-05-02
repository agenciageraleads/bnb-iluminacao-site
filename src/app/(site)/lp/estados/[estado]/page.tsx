import { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import { Phone, Shield, Truck, Zap, CheckCircle2, Calculator, Flag, Camera, HelpCircle, MessageCircle, MapPin, ArrowRight, FileText, Lightbulb } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { Portfolio } from "@/components/sections/portfolio"
import { getPortfolioProjects, getClientLogos, getRepresentatives } from "@/lib/data"
import { statesData, getStateBySlug, getAllStateSlugs, type StateData } from "@/lib/states-data"
import { notFound } from "next/navigation"

// Gera todas as rotas estáticas para os 27 estados
export async function generateStaticParams() {
    return getAllStateSlugs().map(slug => ({ estado: slug }))
}

// Metadados SEO dinâmicos por estado
export async function generateMetadata({ params }: { params: Promise<{ estado: string }> }): Promise<Metadata> {
    const { estado } = await params
    const stateData = getStateBySlug(estado)

    if (!stateData) {
        return { title: "Estado não encontrado | B&B Iluminação" }
    }

    return {
        title: `Postes Metálicos em ${stateData.name} | Fabricante Certificado | B&B Iluminação`,
        description: stateData.metaDescription,
        alternates: {
            canonical: `https://bebiluminacao.com.br/lp/estados/${stateData.slug}`,
        },
        openGraph: {
            title: `Postes e Mastros em ${stateData.name} — B&B Iluminação`,
            description: `Fabricante de postes metálicos para ${stateData.name}. Iluminação, CFTV e mastros para bandeira. Entrega em ${stateData.estimatedDelivery}.`,
            type: "website",
            images: [{ url: "https://bebiluminacao.com.br/logo.png", width: 1200, height: 630, alt: `Postes metálicos em ${stateData.name} - B&B Iluminação` }],
        },
    }
}

// Produtos/soluções que a B&B oferece
const solutions = [
    {
        title: "Iluminação Pública",
        desc: "Postes telecônicos e decorativos para praças, parques, estacionamentos e rodovias.",
        icon: <Lightbulb />,
        href: "/lp/postes-metalicos",
    },
    {
        title: "CFTV e Monitoramento",
        desc: "Postes projetados para câmeras de segurança e sistemas de vigilância.",
        icon: <Camera />,
        href: "/produtos",
    },
    {
        title: "Mastros para Bandeira",
        desc: "Kit completo com mastro de 3 a 12m + bandeira. Uso externo.",
        icon: <Flag />,
        href: "/lp/mastros-para-bandeira",
    },
]

export default async function EstadoLP({ params }: { params: Promise<{ estado: string }> }) {
    const { estado } = await params
    const stateData = getStateBySlug(estado)

    if (!stateData) notFound()

    const [projects, clients, representatives] = await Promise.all([
        getPortfolioProjects(),
        getClientLogos(),
        getRepresentatives(),
    ])

    // Filtra representantes deste estado
    const stateReps = representatives.filter(r => r.states.includes(stateData.uf))

    // Schema.org LocalBusiness para o estado
    const localSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `B&B Iluminação — ${stateData.name}`,
        "description": `Fabricante de postes metálicos certificados para ${stateData.name}. Iluminação pública, CFTV e mastros para bandeira.`,
        "url": `https://bebiluminacao.com.br/lp/estados/${stateData.slug}`,
        "telephone": "+55 62 3576-1988",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Goiânia",
            "addressRegion": "GO",
            "addressCountry": "BR"
        },
        "areaServed": {
            "@type": "State",
            "name": stateData.name,
        },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": stateData.faq.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
            }))
        }
    }

    return (
        <main className="min-h-screen bg-white">
            <Script
                id={`state-schema-${estado}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
            />
            <Header />

            {/* 1. Hero Regional */}
            <section className="relative pt-32 pb-20 bg-industrial-950 overflow-hidden">
                {/* Padrão decorativo de fundo */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-accent-premium text-[10px] font-black tracking-[0.3em] uppercase mb-8">
                        <MapPin className="size-3" />
                        {stateData.region} · Entrega em {stateData.estimatedDelivery}
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter mb-8 max-w-5xl mx-auto">
                        Postes e Mastros em<br />
                        <span className="text-accent-premium">{stateData.name}</span>
                    </h1>

                    <p className="text-industrial-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                        Fabricante de postes para iluminação, CFTV e mastros para bandeira com entrega em <span className="text-white font-bold">{stateData.capital}</span> e todas as cidades do estado.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={`https://wa.me/556235761988?text=Olá! Estou em ${stateData.name} e preciso de um orçamento para postes/mastros.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-accent-premium text-industrial-950 px-8 h-14 flex items-center justify-center font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all active:scale-95 gap-3"
                        >
                            <MessageCircle className="size-5" />
                            Solicitar Orçamento
                        </a>
                        <a
                            href="tel:+556235761988"
                            className="border border-white/20 text-white px-8 h-14 flex items-center justify-center font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all gap-3"
                        >
                            <Phone className="size-5" />
                            Falar com Especialista
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. Trust Bar */}
            <section className="py-12 border-b border-industrial-100 bg-industrial-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <Truck className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Logística {stateData.uf}</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">Entrega em {stateData.estimatedDelivery} para {stateData.capital} e cidades do interior.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <Shield className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Garantia Técnica</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">Produtos certificados com normas NBR 14744 e NBR 6323.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <Calculator className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Orçamento Rápido</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">Resposta em até 2 horas úteis com proposta técnica comercial.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Soluções / Produtos */}
            <section className="py-20 bg-white" aria-labelledby="solucoes-heading">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-accent-premium font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Nossas Soluções</span>
                        <h2 id="solucoes-heading" className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            Postes para Cada<br /><span className="text-industrial-400">Necessidade</span>
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {solutions.map((sol, i) => (
                            <a key={i} href={sol.href} className="block bg-industrial-50 border border-industrial-200 p-8 hover:border-accent-premium hover:shadow-lg transition-all group">
                                <div className="size-14 bg-industrial-950 text-white flex items-center justify-center mb-6 group-hover:bg-accent-premium group-hover:text-black transition-colors">
                                    {sol.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase tracking-widest text-sm mb-3">{sol.title}</h3>
                                <p className="text-industrial-500 text-sm leading-relaxed mb-4">{sol.desc}</p>
                                <span className="inline-flex items-center gap-2 text-accent-dark text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                                    Saiba mais <ArrowRight className="size-3" />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Diferenciais */}
            <section className="py-20 bg-industrial-50" aria-labelledby="diferenciais-heading">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 id="diferenciais-heading" className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            Por que a B&B?
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto" />
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Galvanização a Fogo", desc: "Proteção anticorrosiva NBR 6323 que garante décadas de durabilidade em qualquer clima.", icon: <Shield /> },
                            { title: "Produção Ágil", desc: "Capacidade de entrega de até 100 unidades em 10 a 15 dias úteis direto da fábrica.", icon: <Zap /> },
                            { title: "Normas ABNT", desc: "Cálculos estruturais que superam as exigências da NBR 6123 para forças de vento.", icon: <CheckCircle2 /> },
                            { title: "Solução Completa", desc: "Do poste à luminária LED, do mastro à bandeira. Tudo em um só fornecedor.", icon: <Calculator /> },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-industrial-200 p-8 hover:border-accent-premium transition-colors hover:shadow-md">
                                <div className="size-12 bg-industrial-950 text-white flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase mb-3 text-xs tracking-widest">{item.title}</h3>
                                <p className="text-industrial-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Representante Local (se houver) */}
            {stateReps.length > 0 && (
                <section className="py-16 bg-industrial-950 text-white" aria-labelledby="rep-heading">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 id="rep-heading" className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2">
                                Representante em <span className="text-accent-premium">{stateData.name}</span>
                            </h2>
                            <p className="text-industrial-400 font-medium text-sm">Atendimento comercial especializado na sua região.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {stateReps.map((rep, i) => (
                                <div key={i} className="border border-industrial-700 p-8 hover:border-accent-premium transition-colors">
                                    <h3 className="font-black text-lg mb-1">{rep.name}</h3>
                                    {rep.company && <p className="text-industrial-400 text-sm mb-4">{rep.company}</p>}
                                    <div className="space-y-2">
                                        <a href={`tel:${rep.phone.replace(/\D/g, '')}`} className="flex items-center gap-3 text-accent-premium text-sm font-bold hover:underline">
                                            <Phone className="size-4" /> {rep.phone}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6. Prova Social */}
            <ClientsMarquee clients={clients} />
            <Portfolio projects={projects} />

            {/* 7. FAQ Regional */}
            <section className="py-20 bg-industrial-50 border-y border-industrial-100" aria-labelledby="faq-estado-heading">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <HelpCircle className="size-12 text-accent-premium mx-auto mb-4" />
                        <h2 id="faq-estado-heading" className="text-3xl font-black text-industrial-950 uppercase">
                            Dúvidas Frequentes — {stateData.name}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {stateData.faq.map((item, i) => (
                            <div key={i} className="bg-white border border-industrial-200 p-8 hover:border-accent-premium transition-colors">
                                <h4 className="font-black text-industrial-950 uppercase text-sm mb-3 flex items-center gap-3">
                                    <span className="size-6 bg-accent-premium text-industrial-950 flex items-center justify-center text-[10px] shrink-0 font-black">Q</span>
                                    {item.question}
                                </h4>
                                <p className="text-industrial-600 text-sm leading-relaxed pl-9">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. CTA Final */}
            <section className="py-24 bg-accent-premium relative overflow-hidden" aria-labelledby="cta-estado-heading">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2
                            id="cta-estado-heading"
                            className="text-4xl md:text-6xl font-black text-black uppercase mb-8 leading-none tracking-tighter"
                            style={{ textWrap: "balance" } as React.CSSProperties}
                        >
                            Pronto para iluminar<br />seu projeto em {stateData.name}?
                        </h2>
                        <p className="text-black/80 text-lg mb-12 font-medium max-w-2xl mx-auto">
                            Fale com nossa engenharia e receba uma proposta técnica comercial em menos de 24 horas. Entregamos em {stateData.capital} e em todas as cidades de {stateData.name}.
                        </p>
                        <a
                            href={`https://wa.me/556235761988?text=Olá! Estou em ${stateData.name} e gostaria de um orçamento para postes/mastros. Podem me ajudar?`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 bg-black text-white px-12 h-20 font-black uppercase tracking-[0.2em] text-sm hover:bg-industrial-800 transition-all hover:scale-105 active:scale-95"
                        >
                            <MessageCircle className="size-7" />
                            Falar no WhatsApp
                        </a>
                        <p className="mt-6 text-[10px] text-black/50 font-bold uppercase tracking-widest">
                            Atendimento técnico humanizado · Resposta em até 2h úteis
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
