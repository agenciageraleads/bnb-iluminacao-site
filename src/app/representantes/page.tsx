import { Header } from "@/components/layout/header"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { MapPin, Phone, Mail, ArrowRight, UserPlus } from "lucide-react"
import Link from "next/link"

export default function RepresentantesPage() {
    // Dados de exemplo que o cliente poderá substituir facilmente via Payload/Data
    const regions = [
        {
            name: "Centro-Oeste",
            reps: [
                { state: "GO / DF", name: "João Henrique", email: "joao.go@bebiluminacao.com.br", phone: "(62) 99999-0001" },
                { state: "MT / MS", name: "Sérgio Moraes", email: "sergio.mt@bebiluminacao.com.br", phone: "(65) 98888-0002" },
            ]
        },
        {
            name: "Sudeste",
            reps: [
                { state: "SP Capital", name: "Carlos Drummond", email: "carlos.sp@bebiluminacao.com.br", phone: "(11) 97777-0003" },
                { state: "SP Interior / MG", name: "Roberto Silva", email: "roberto.mg@bebiluminacao.com.br", phone: "(31) 96666-0004" },
                { state: "RJ / ES", name: "Felipe Freitas", email: "felipe.rj@bebiluminacao.com.br", phone: "(21) 95555-0005" },
            ]
        },
        {
            name: "Sul",
            reps: [
                { state: "PR / SC / RS", name: "Fernando Ávila", email: "fernando.sul@bebiluminacao.com.br", phone: "(41) 94444-0006" },
            ]
        },
        {
            name: "Norte & Nordeste",
            reps: [
                { state: "Norte", name: "Juliana Mendes", email: "juliana.norte@bebiluminacao.com.br", phone: "(92) 93333-0007" },
                { state: "Nordeste", name: "Rafael Torres", email: "rafael.ne@bebiluminacao.com.br", phone: "(81) 92222-0008" },
            ]
        }
    ];

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
                        Encontre o distribuidor autorizado ou representante comercial mais próximo da sua obra.
                    </p>
                </div>
            </section>

            {/* Region Grid Section */}
            <section className="py-16 md:py-24 bg-industrial-50" aria-labelledby="reps-heading">
                <div className="container mx-auto px-4">
                    <h2 id="reps-heading" className="sr-only">Busca de Representantes por Região</h2>

                    <div className="grid lg:grid-cols-2 gap-x-12 gap-y-16">
                        {regions.map((region, idx) => (
                            <div key={idx} className="space-y-6">
                                <div className="border-b-2 border-industrial-200 pb-3 flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-industrial-950 uppercase tracking-tight">
                                        Região <span className="text-accent-dark">{region.name}</span>
                                    </h3>
                                    <MapPin className="size-6 text-industrial-400" />
                                </div>
                                
                                <div className="space-y-4">
                                    {region.reps.map((rep, rIdx) => (
                                        <div key={rIdx} className="bg-white p-6 border border-industrial-200 hover:border-accent-premium transition-colors group relative overflow-hidden">
                                            {/* Accent line left */}
                                            <div className="absolute top-0 left-0 h-full w-1 bg-industrial-200 group-hover:bg-accent-premium transition-colors" />
                                            
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pl-2">
                                                <div>
                                                    <span className="inline-block px-2 py-1 bg-industrial-100 text-industrial-600 text-[10px] font-bold uppercase tracking-wider mb-2">
                                                        {rep.state}
                                                    </span>
                                                    <h4 className="text-xl font-bold text-industrial-950 uppercase">{rep.name}</h4>
                                                </div>
                                                
                                                <div className="flex flex-col gap-2 shrink-0">
                                                    <a href={`tel:${rep.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-industrial-600 hover:text-industrial-950 transition-colors text-sm font-medium">
                                                        <Phone className="size-4" />
                                                        {rep.phone}
                                                    </a>
                                                    <a href={`mailto:${rep.email}`} className="flex items-center gap-2 text-industrial-600 hover:text-industrial-950 transition-colors text-sm font-medium">
                                                        <Mail className="size-4" />
                                                        {rep.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                    
                    <Link
                        href="/contato?assunto=representante"
                        className="flex items-center justify-center gap-3 bg-accent-premium text-black hover:bg-yellow-400 active:bg-yellow-500 font-black uppercase tracking-widest h-16 px-10 transition-colors shrink-0 w-full md:w-auto hover:-translate-y-1 transform duration-300 shadow-xl shadow-accent-premium/20"
                    >
                        <UserPlus className="size-5" />
                        Quero ser Representante
                        <ArrowRight className="size-5" />
                    </Link>
                </div>
            </section>
        </main>
    )
}
