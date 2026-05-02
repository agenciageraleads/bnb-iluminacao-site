import { Header } from "@/components/layout/header"
import { ArrowRight, Scissors, ShieldCheck, Zap, Maximize2, Cpu, FileCheck } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: "Corte a Laser de Alta Precisão | B&B Iluminação",
    description: "Serviço industrial de corte a laser em fibra óptica para chapas de aço. Precisão milimétrica e acabamento superior.",
}

export default function CorteLaserPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-24 bg-industrial-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#facc15_0%,transparent_50%)] animate-pulse" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <Link 
                            href="/servicos" 
                            className="inline-flex items-center gap-2 text-accent-premium text-xs font-black uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform"
                        >
                            <ArrowRight className="size-4 rotate-180" />
                            Voltar para Serviços
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.85]">
                            Corte a Laser <br />
                            <span className="text-accent-premium">Industrial</span>
                        </h1>
                        <p className="text-industrial-400 text-xl max-w-2xl leading-relaxed mb-10">
                            Equipamentos de fibra óptica de última geração para cortes complexos com precisão de décimos de milímetro. A agilidade que sua obra precisa com a qualidade que só a B&B entrega.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contato?servico=laser" className="bg-accent-premium text-black h-16 px-10 flex items-center justify-center font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl">
                                Solicitar Orçamento Laser
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Stats */}
            <section className="py-20 border-b border-industrial-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "0.1mm", label: "Precisão Nominal" },
                            { value: "Fibra", label: "Tecnologia" },
                            { value: "6.5kW", label: "Potência" },
                            { value: "3x1.5m", label: "Área de Mesa" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center md:text-left">
                                <p className="text-4xl font-black text-industrial-900 mb-2">{stat.value}</p>
                                <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Content */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-square bg-industrial-100 relative overflow-hidden group">
                                <img 
                                    src="/images/servicos/corte-laser.jpg" 
                                    alt="Processo de Corte a Laser Industrial B&B" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                                />
                                <div className="absolute inset-0 bg-industrial-950/20 mix-blend-overlay" />
                            </div>
                            <div className="absolute -bottom-8 -right-8 size-40 bg-accent-premium flex flex-col items-center justify-center text-center p-4 shadow-2xl">
                                <p className="text-4xl font-black text-industrial-950">100%</p>
                                <p className="text-[10px] font-black uppercase tracking-tight text-industrial-950 leading-none">Sem rebarbas ou retrabalho</p>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl font-black uppercase text-industrial-950 mb-6">Por que escolher o <span className="text-industrial-400">Laser B&B?</span></h2>
                                <p className="text-industrial-600 text-lg leading-relaxed">
                                    Diferente dos processos de plasma ou oxicorte, o laser de fibra permite a criação de geometrias complexas, furações precisas e encaixes perfeitos, eliminando a necessidade de acabamento manual posterior.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: <Cpu />, title: "Agilidade", desc: "Ciclos de produção até 5x mais rápidos que métodos convencionais." },
                                    { icon: <ShieldCheck />, title: "Consistência", desc: "Repetibilidade garantida em lotes de alto volume." },
                                    { icon: <Maximize2 />, title: "Capacidade", desc: "Corte em aço carbono, inox e alumínio com espessuras variadas." },
                                    { icon: <FileCheck />, title: "Pronto para Uso", desc: "Peças saem prontas para a etapa de dobra ou soldagem." }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="text-accent-premium">{item.icon}</div>
                                        <h3 className="text-lg font-black uppercase text-industrial-900">{item.title}</h3>
                                        <p className="text-sm text-industrial-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Applications */}
            <section className="py-24 bg-industrial-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-black uppercase text-industrial-900 text-center mb-16">Aplicações Reais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Placas Base", tag: "Estrutural" },
                            { title: "Brasões e Logos", tag: "Ornamental" },
                            { title: "Peças Sob Medida", tag: "Especial" }
                        ].map((app, i) => (
                            <div key={i} className="bg-white p-8 border border-industrial-200">
                                <div className="text-accent-premium text-[10px] font-black uppercase tracking-widest mb-4">{app.tag}</div>
                                <h3 className="text-xl font-black uppercase text-industrial-900 mb-4">{app.title}</h3>
                                <div className="h-1 w-12 bg-industrial-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-6xl font-black uppercase text-industrial-950 mb-8">
                        Reduza os custos da <br />
                        <span className="text-accent-premium">Sua Obra</span>
                    </h2>
                    <p className="text-industrial-500 mb-12 max-w-xl mx-auto font-medium">
                        A precisão do laser economiza material e tempo de montagem. Peça um orçamento técnico hoje mesmo.
                    </p>
                    <Link 
                        href="/contato?servico=laser" 
                        className="inline-flex items-center gap-4 bg-industrial-900 text-white h-16 px-12 font-black uppercase tracking-widest text-xs hover:bg-accent-premium hover:text-black transition-all shadow-2xl"
                    >
                        Solicitar Cotação
                        <ArrowRight className="size-5" />
                    </Link>
                </div>
            </section>
        </main>
    )
}
