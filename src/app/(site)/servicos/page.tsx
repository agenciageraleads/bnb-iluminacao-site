import { Header } from "@/components/layout/header"
import { ArrowRight, Scissors, Palette, ShieldCheck, Zap, Cog } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
    const services = [
        {
            id: "corte-laser",
            title: "Corte a Laser",
            icon: <Scissors className="size-8" />,
            description: "Tecnologia de ponta em fibra óptica para cortes de precisão milimétrica em aço carbono e outras ligas.",
            features: ["Precisão de 0.1mm", "Alta Produtividade", "Sem necessidade de retrabalho"],
            href: "/servicos/corte-laser",
            image: "/media/blog-qual-a-melhor-fundacao-e-metodo-de-instalacao-para-postes-de-iluminacao-externa-chumbadores-flanges-ou-enterramento-direto-1776132889407.png" // Placeholder visual industrial
        },
        {
            id: "pintura-eletrostatica",
            title: "Pintura Eletrostática",
            icon: <Palette className="size-8" />,
            description: "Acabamento premium com pó poliéster, garantindo durabilidade extrema e estética superior para seus projetos.",
            features: ["Paleta RAL completa", "Resistência UV e Química", "Acabamento Uniforme"],
            href: "/servicos/pintura-eletrostatica",
            image: "/media/Tipos-Lampadas-Led-BEB.jpeg" // Placeholder visual industrial
        }
    ]

    return (
        <main className="min-h-screen bg-industrial-50">
            <Header />
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-industrial-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-premium/5 skew-x-12 translate-x-20" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-accent-premium font-black uppercase tracking-[0.3em] text-xs mb-4 block animate-fade-in">
                            Infraestrutura Industrial
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 leading-[0.9]">
                            Serviços de <br />
                            <span className="text-accent-premium">Alta Performance</span>
                        </h1>
                        <p className="text-industrial-400 text-lg md:text-xl leading-relaxed mb-10">
                            A B&B Iluminação oferece processamento técnico de aço e acabamentos de nível industrial para parceiros que buscam excelência e agilidade na entrega.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Services Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 -mt-32 relative z-20">
                        {services.map((service) => (
                            <Link 
                                key={service.id} 
                                href={service.href}
                                className="group bg-white border border-industrial-200 overflow-hidden hover:border-accent-premium transition-all duration-500 shadow-2xl hover:-translate-y-2"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <img 
                                        src={service.image} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-industrial-950/20 to-transparent" />
                                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                                        <div className="size-14 bg-accent-premium flex items-center justify-center text-industrial-950">
                                            {service.icon}
                                        </div>
                                        <h2 className="text-3xl font-black uppercase text-white tracking-tighter">
                                            {service.title}
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-industrial-600 text-lg mb-8 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="space-y-4 mb-10">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <ShieldCheck className="size-5 text-accent-premium" />
                                                <span className="text-industrial-900 font-bold uppercase text-xs tracking-widest">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="inline-flex items-center gap-3 text-industrial-950 font-black uppercase tracking-widest text-xs group-hover:text-accent-premium transition-colors">
                                        Explorar Serviço Completo
                                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Capabilities */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-black uppercase text-industrial-900 mb-4">
                                Capacidades Adicionais
                            </h2>
                            <p className="text-industrial-500 font-medium leading-relaxed">
                                Além do processamento de base, oferecemos suporte técnico em todas as etapas da obra, da concepção à logística final.
                            </p>
                        </div>
                        <Link href="/contato" className="text-accent-premium font-black uppercase tracking-widest text-xs border-b-2 border-accent-premium pb-1">
                            Solicitar Orçamento Técnico
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Galvanização a Fogo", icon: <Zap />, desc: "Proteção total contra corrosão conforme NBR 6323." },
                            { title: "Luminotécnica", icon: <Cog />, desc: "Cálculos Dialux para máxima eficiência em projetos externos." },
                            { title: "Logística Nacional", icon: <Truck className="size-6" />, desc: "Frota própria e parceiros para entrega em todo o Brasil." }
                        ].map((s, i) => (
                            <div key={i} className="p-8 bg-industrial-50 border border-industrial-100 hover:bg-white hover:shadow-xl transition-all group">
                                <div className="size-12 bg-industrial-900 text-accent-premium flex items-center justify-center mb-6 group-hover:bg-accent-premium group-hover:text-industrial-900 transition-colors">
                                    {s.icon}
                                </div>
                                <h3 className="text-lg font-black uppercase text-industrial-900 mb-3">{s.title}</h3>
                                <p className="text-industrial-500 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="bg-industrial-950 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-8">
                        Precisa de uma <span className="text-accent-premium">Solução sob Medida?</span>
                    </h2>
                    <Link 
                        href="/contato" 
                        className="inline-flex items-center gap-4 bg-accent-premium text-black h-16 px-12 font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl"
                    >
                        Falar com Consultor Técnico
                        <ArrowRight className="size-5" />
                    </Link>
                </div>
            </section>
        </main>
    )
}

function Truck({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a2 2 0 0 0-.222-.906l-1.39-2.78A2 2 0 0 0 18.602 8.5H15" /><path d="M22 17h-3" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
        </svg>
    )
}
