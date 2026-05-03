import { Check, Phone, Shield, Truck, Zap, Calculator, ArrowRight, FileText, MapPin } from "lucide-react"
import { ClientsMarquee } from "@/components/sections/marquee-clients"
import { Portfolio } from "@/components/sections/portfolio"
import { FaqSection } from "@/components/sections/faq"
import { getPortfolioProjects, getClientLogos, getRegionBySlug, getRegions } from "@/lib/data"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import Image from "next/image"
import Link from "next/link"

interface Props {
  params: { city: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = await getRegionBySlug(params.city)
  if (!city) return {}

  const title = city.meta?.title || `Fábrica de Postes Metálicos em ${city.cityName} - ${city.uf} | B&B Iluminação`
  const description = city.meta?.description || `Procurando postes metálicos em ${city.cityName}? A B&B Iluminação oferece soluções robustas, direto da fábrica, com entrega rápida em ${city.cityName} e região.`

  return {
    title,
    description,
    alternates: {
      canonical: `/lp/postes-metalicos/cidades/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      images: [(city.featuredImage as any)?.url || '/portfolio/reserva-parque.webp'],
    }
  }
}

export async function generateStaticParams() {
  const regions = await getRegions()
  return regions.map((region) => ({ city: region.slug }))
}

export default async function PostesMetalicosCityLP({ params }: Props) {
    const city = await getRegionBySlug(params.city)
    
    if (!city) {
        notFound()
    }

    // Buscar dados do Payload CMS para injetar nas seções de prova social
    const projects = await getPortfolioProjects()
    const clients = await getClientLogos()
    const allRegions = await getRegions()

    const deliveryTime = city.trust?.deliveryTime || "7 a 15 dias úteis"
    const logisticsText = city.trust?.logistics || "Logística própria e parceiros especializados para garantir a entrega no prazo."

    return (
        <main className="min-h-screen bg-white">
            {/* Header minimal de LP */}
            <header className="bg-white border-b border-industrial-200 shadow-sm py-3 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center h-14">
                    <div className="relative h-10 w-40">
                        <Image 
                            src="/logo.png" 
                            alt="B&B Iluminação" 
                            fill 
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                    <a
                        href="https://wa.me/556235761988"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black uppercase tracking-widest text-[10px] px-4 h-10 transition-colors"
                    >
                        <Phone className="size-4" />
                        <span className="hidden sm:inline">ORÇAMENTO RÁPIDO</span>
                        <span className="sm:hidden">WHATSAPP</span>
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-10 pb-20 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-widest uppercase mb-8">
                                <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                                Atendimento Especializado em {city.cityName}, {city.uf}
                            </div>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-industrial-950 leading-[0.9] mb-6 uppercase tracking-tighter">
                                Postes Metálicos em <br />
                                <span className="text-accent-premium">{city.cityName}</span>
                            </h1>
                            <p className="text-industrial-500 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                                {city.meta?.description || `A B&B Iluminação é referência na fabricação de postes metálicos. Atendemos ${city.cityName} com soluções robustas e alta durabilidade.`} 
                                <br className="hidden md:block" />
                                Prazo de entrega estimado: <span className="text-industrial-950 font-bold">{deliveryTime}</span>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a
                                    href={`https://wa.me/556235761988?text=Olá, estou em ${city.cityName} e vi a página de postes metálicos. Gostaria de um orçamento.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black h-16 px-10 w-full sm:w-auto uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-xl shadow-industrial-950/20 group"
                                >
                                    <Calculator className="size-5" />
                                    SOLICITAR ORÇAMENTO
                                </a>
                                <a
                                    href="/downloads"
                                    className="flex items-center justify-center gap-2 bg-white border-2 border-industrial-200 text-industrial-800 hover:border-industrial-950 hover:text-industrial-950 font-black h-16 px-8 w-full sm:w-auto uppercase tracking-widest transition-colors"
                                >
                                    <FileText className="size-5" />
                                    CATÁLOGOS PDF
                                </a>
                            </div>
                            
                            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-industrial-500 text-[11px] font-bold uppercase tracking-widest">
                                <Truck className="size-4 text-accent-dark" />
                                {logisticsText}
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
                            <div className="relative aspect-[4/3] lg:aspect-square bg-industrial-100 border-8 border-white shadow-2xl skew-y-2 lg:skew-y-0 lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                                <Image 
                                    src={(city.featuredImage as any)?.url || "/portfolio/reserva-parque.webp"} 
                                    alt={`Postes Metálicos em ${city.cityName}`} 
                                    fill 
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/40 to-transparent" />
                                <div className="absolute top-4 right-4 bg-accent-premium text-black font-black text-[10px] tracking-widest px-4 py-2 uppercase">
                                    {city.cityName === "Goiânia" ? "Fábrica Própria" : "Atendimento Direto"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ClientsMarquee clients={clients} />

            {/* Benefícios */}
            <section className="py-20 bg-industrial-50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            Logística para {city.cityName}
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Rapidez", desc: `Prazo de entrega em ${city.cityName} reduzido devido à nossa localização estratégica.`, icon: <Zap /> },
                            { title: "Segurança", desc: "Produtos que seguem rigorosamente as normas NBR da ABNT para sua obra.", icon: <Shield /> },
                            { title: "Qualidade", desc: "Aço galvanizado a fogo com durabilidade de décadas contra corrosão.", icon: <Check /> },
                            { title: "Preço", desc: "Venda direta da fábrica sem intermediários, garantindo o melhor custo-benefício.", icon: <Calculator /> },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-industrial-200 p-8 hover:border-accent-premium transition-colors hover:shadow-md">
                                <div className="size-12 bg-industrial-950 text-white flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase mb-3 text-sm">{item.title}</h3>
                                <p className="text-industrial-500 text-[13px] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Portfolio projects={projects} />

            <FaqSection items={city.faq} />

            {/* Interlinking Cidades - CRITICAL FOR SEO */}
            {allRegions.length > 1 && (
                <section className="py-16 bg-white border-t border-industrial-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-industrial-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-center">
                            Outras cidades atendidas pela B&B Iluminação
                        </h2>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-4xl mx-auto">
                            {allRegions.filter(c => c.slug !== city.slug).map((c) => (
                                <Link 
                                    key={c.slug} 
                                    href={`/lp/postes-metalicos/cidades/${c.slug}`}
                                    className="text-industrial-500 hover:text-accent-premium text-xs font-bold transition-colors uppercase tracking-widest flex items-center gap-2"
                                >
                                    <MapPin className="size-3" />
                                    {c.cityName}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Final */}
            <section className="py-20 md:py-32 bg-accent-premium relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern-industrial.png')] opacity-10 mix-blend-overlay"></div>
                <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-black uppercase leading-none tracking-tighter">
                        OBRA EM {city.cityName}?<br />PEÇA SEU ORÇAMENTO
                    </h2>
                    <p className="text-black/80 font-medium text-lg md:text-xl max-w-2xl mx-auto">
                        Fale diretamente com nossa equipe e receba sua proposta comercial para {city.cityName} em tempo recorde.
                    </p>
                    <a
                        href={`https://wa.me/556235761988?text=Olá, estou em ${city.cityName} e preciso de um orçamento de postes metálicos.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-industrial-800 font-black h-16 w-full sm:w-auto px-12 text-lg uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl"
                    >
                        <Phone className="size-5" />
                        FALAR COM UM ESPECIALISTA
                    </a>
                </div>
            </section>
        </main>
    )
}
