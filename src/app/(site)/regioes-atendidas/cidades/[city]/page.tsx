import { Metadata } from 'next'
import Script from 'next/script'
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getRegionBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import { Phone, CheckCircle2, Truck, Clock, ShieldCheck, HelpCircle, MessageCircle } from "lucide-react"


export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city } = await params;
    const region = await getRegionBySlug(city);
    const cityName = region?.cityName || city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');

    return {
        title: `Indústria de Postes em ${cityName} | B&B Iluminação`,
        description: `Fabricante de postes metálicos certificados para ${cityName}. Atendimento técnico, entrega rápida e garantia de qualidade para iluminação pública e industrial.`,
        openGraph: {
            title: `Postes de Iluminação em ${cityName} - B&B`,
            description: `A melhor solução em postes de aço para ${cityName} e região.`,
            type: 'website',
        }
    }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const region = await getRegionBySlug(city);
    
    // Fallback para nome amigável se não estiver no banco (para SEO passivo)
    const cityName = region?.cityName || city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `B&B Iluminação - Unidade ${cityName}`,
        "description": `Atendimento especializado em postes e iluminação para a região de ${cityName}.`,
        "url": `https://bebiluminacao.com.br/regioes-atendidas/cidades/${city}`,
        "telephone": "+55 62 3576-1988",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": cityName,
            "addressRegion": "GO",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-16.6869",
            "longitude": "-49.2643"
        },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": (region?.faq || []).map((f: any) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.answer
                }
            }))
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Script
                id={`region-schema-${city}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />


            {/* 1. Hero Regional Industrial */}
            <section className="relative pt-32 pb-20 bg-industrial-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <p className="text-accent-premium font-black uppercase tracking-[0.3em] text-[10px] mb-6 animate-in slide-in-from-bottom duration-500">
                        Atendimento Especializado
                    </p>
                    <h1 className="text-4xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter mb-8 max-w-5xl mx-auto">
                        INDÚSTRIA DE POSTES EM <br />
                        <span className="text-accent-premium">{cityName}</span>
                    </h1>
                    <p className="text-industrial-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                        Soluções em iluminação pública e industrial certificadas pela ABNT com entrega rápida para toda a região de {cityName}.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#contato" className="bg-accent-premium text-industrial-950 px-8 h-14 flex items-center justify-center font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all active:scale-95">
                            Solicitar Orçamento
                        </a>
                        <a href="tel:+556235761988" className="border border-white/20 text-white px-8 h-14 flex items-center justify-center font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                            Falar com Especialista
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. Trust Bar (Confiança & Logística) */}
            <section className="py-12 border-b border-industrial-100 bg-industrial-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <Truck className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Logística {cityName}</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">{region?.trust?.logistics || 'Logística facilitada com parceiros especializados.'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <Clock className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Prazo de Entrega</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">{region?.trust?.deliveryTime || '7 a 15 dias úteis para fabricação.'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <ShieldCheck className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Garantia Técnica</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">{region?.trust?.warranty || '12 meses contra corrosão e fadiga.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Diferenciais de Qualidade */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-accent-premium font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Qualidade B&B</span>
                            <h2 className="text-4xl font-black text-industrial-950 uppercase leading-none mb-6">
                                Postes Certificados <br /> <span className="text-industrial-400">para seu Projeto</span>
                            </h2>
                            <p className="text-industrial-600 mb-8 font-medium">
                                Nossos postes metálicos são fabricados seguindo rigorosamente a norma NBR 14744, garantindo segurança estrutural para {cityName}. Seja para praças, indústrias ou rodovias.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Aço Galvanizado a Fogo de Alta Densidade",
                                    "Cálculo Estrutural para Ventos da Região",
                                    "Acabamento contra Intempéries e Maresia",
                                    "Fácil Instalação e Baixa Manutenção"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-industrial-950 uppercase">
                                        <CheckCircle2 className="size-5 text-accent-premium" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative aspect-video bg-industrial-900 border-8 border-industrial-100 overflow-hidden group">
                             {region?.featuredImage?.url ? (
                                <Image 
                                    src={region.featuredImage.url} 
                                    alt={`Iluminação pública em ${cityName}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                             ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-4xl uppercase select-none">
                                    B&B Iluminação
                                </div>
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/60 to-transparent" />
                             <div className="absolute bottom-6 left-6">
                                <p className="text-white font-black uppercase text-[10px] tracking-widest">{cityName} / GO</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Galeria de FAQ Regional */}
            <section className="py-24 bg-industrial-50 border-y border-industrial-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <HelpCircle className="size-12 text-accent-premium mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-industrial-950 uppercase">Dúvidas Comuns em {cityName}</h2>
                    </div>

                    <div className="space-y-4">
                        {(region?.faq && region.faq.length > 0 ? region.faq : [
                            { question: "Como funciona o frete para minha cidade?", answer: "Atendemos com logística otimizada para todo o Brasil. O valor e prazo são calculados com base no volume do projeto." },
                            { question: "Vocês fazem a instalação no local?", answer: "Somos fabricantes. Fornecemos todo o suporte técnico e manuais para que sua equipe execute a instalação com perfeição." },
                            { question: "Os postes possuem certificação?", answer: "Sim, os produtos seguem as normas técnicas NBR vigentes. Certificados e laudos podem ser solicitados sob consulta para seu projeto." }
                        ]).map((item, i) => (
                            <div key={i} className="bg-white border border-industrial-200 p-8">
                                <h4 className="font-black text-industrial-950 uppercase text-sm mb-3 flex items-center gap-3">
                                    <span className="size-6 bg-accent-premium text-industrial-950 flex items-center justify-center text-[10px] shrink-0">Q</span>
                                    {item.question}
                                </h4>
                                <p className="text-industrial-600 text-sm leading-relaxed pl-9">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA Final Transformador */}
            <section id="contato" className="py-24 bg-industrial-950 text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-none">
                            Pronto para iluminar <br /> <span className="text-accent-premium">seu projeto em {cityName}?</span>
                        </h2>
                        <p className="text-industrial-400 text-lg mb-12 font-medium">
                            Não compre sem antes falar com o nosso time técnico. Garantimos o melhor custo-benefício e a maior durabilidade do mercado.
                        </p>
                        <a 
                            href={`https://wa.me/556235761988?text=Olá! Estou em ${cityName} e gostaria de um orçamento técnico para meu projeto de iluminação.`}

                            target="_blank"
                            className="inline-flex items-center gap-4 bg-accent-premium text-industrial-950 px-12 h-20 font-black uppercase tracking-[0.2em] text-sm hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95"
                        >
                            <MessageCircle className="size-7" />
                            Falar no WhatsApp
                        </a>
                        <p className="mt-6 text-[10px] text-industrial-500 font-bold uppercase tracking-widest">Atendimento técnico humanizado e resposta rápida</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
