import { Header } from "@/components/layout/header"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { ArrowRight, UserPlus } from "lucide-react"
import Link from "next/link"
import { getRepresentatives } from "@/lib/data"
import { RepresentativesClient } from "./RepresentativesClient"

export const metadata = {
    title: "Representantes | B&B Iluminação",
    description: "Encontre o representante comercial da B&B Iluminação mais próximo de você. Cobertura em todo o Brasil.",
}

export default async function RepresentantesPage() {
    // Busca dados reais do banco (Payload CMS) via Server Component
    const representatives = await getRepresentatives();

    return (
        <main className="min-h-screen bg-industrial-50">
            <Header />
            <FloatingWhatsApp />

            {/* Hero Section */}
            <section className="pt-24 md:pt-32 pb-16 bg-white border-b border-industrial-200">
                <div className="container mx-auto px-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-industrial-500 mb-3">Expansão e Cobertura</p>
                    <h1 className="text-4xl md:text-6xl font-black text-industrial-950 uppercase leading-[0.95] mb-6">
                        Nossos <span className="relative inline-block text-industrial-950">
                            Representantes
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent-premium" aria-hidden="true" />
                        </span>
                    </h1>
                    <p className="text-industrial-500 text-lg md:text-xl leading-relaxed max-w-3xl">
                        A excelência da B&B Iluminação presente em todos os cantos do Brasil. 
                        Encontre o representante comercial mais próximo da sua obra.
                    </p>
                </div>
            </section>

            {/* Interactive Map Component (Client Side) */}
            <RepresentativesClient representatives={representatives} />

            {/* CTA Quer ser Representante */}
            <section className="py-20 md:py-32 bg-industrial-950 relative overflow-hidden" aria-labelledby="seja-rep-heading">
                {/* Visual decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-premium/5 -skew-x-12 transform origin-top-right" aria-hidden="true" />
                
                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-industrial-800 text-industrial-400 text-[11px] font-bold tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm">
                            <span className="size-2 bg-accent-premium rounded-full animate-pulse" aria-hidden="true" />
                            Oportunidade Comercial
                        </div>
                        <h2 id="seja-rep-heading" className="text-3xl md:text-5xl font-black text-white uppercase leading-tight" style={{ textWrap: "balance" } as React.CSSProperties}>
                            Faça parte do <br className="hidden md:block" />
                            <span className="text-accent-premium">Nosso Time</span>
                        </h2>
                        <p className="text-industrial-400 text-lg leading-relaxed mix-blend-screen">
                            Deseja levar os produtos da B&B Iluminação para a sua região? Buscamos parceiros com credibilidade e vontade de crescer.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <Link
                            href="/contato?assunto=representante"
                            className="flex items-center justify-center gap-3 bg-accent-premium text-black hover:bg-yellow-400 active:bg-yellow-500 font-black uppercase tracking-widest h-16 px-10 transition-colors w-full md:w-auto hover:-translate-y-1 transform duration-300 shadow-xl shadow-accent-premium/20"
                        >
                            <UserPlus className="size-5" />
                            Quero ser Representante
                            <ArrowRight className="size-5" />
                        </Link>
                        
                        <Link
                            href="/treinamento/login"
                            className="flex items-center justify-center gap-3 bg-transparent border border-industrial-700 text-industrial-400 hover:text-white hover:border-white font-bold uppercase tracking-widest h-12 px-10 transition-all w-full md:w-auto text-xs"
                        >
                            Já sou Representante (Acesso Restrito)
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
