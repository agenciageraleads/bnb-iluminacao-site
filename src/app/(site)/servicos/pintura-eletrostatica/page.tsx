import { Header } from "@/components/layout/header"
import { ArrowRight, Palette, ShieldCheck, Sun, Droplets, Paintbrush, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
    title: "Pintura Eletrostática a Pó | B&B Iluminação",
    description: "Pintura eletrostática a pó poliéster para uso externo, com fosfatização e cura em estufa. A partir de 10 peças por pedido, ou demanda programada e recorrente.",
}

export default function PinturaEletrostaticaPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-24 bg-industrial-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/servicos/pintura-eletrostatica.jpg')] bg-cover bg-center mix-blend-overlay opacity-30" />
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
                            Acabamento <br />
                            <span className="text-accent-premium">Eletrostático</span>
                        </h1>
                        <p className="text-industrial-300 text-xl max-w-2xl leading-relaxed mb-10">
                            Pó poliéster para uso externo, aplicado sobre peça limpa, desengraxada e fosfatizada, com cura em estufa. Cabine e estufa de 6 m próprias, em Goiânia-GO. Lote mínimo: 10 peças por pedido, ou demanda programada e recorrente.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contato" className="bg-accent-premium text-black h-16 px-10 flex items-center justify-center font-black uppercase tracking-widest text-xs rounded-lg hover:bg-white transition-all shadow-xl">
                                Obter Orçamento de Pintura
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="bg-accent-premium py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <ShieldCheck />, title: "Uso Externo", desc: "Indicada para sol e chuva em ambiente urbano. Em litoral, a indicação é galvanizado ou galvanizado + pintado." },
                            { icon: <Palette />, title: "Referência RAL", desc: "Informe a cor na cotação. A disponibilidade entra na proposta." },
                            { icon: <Paintbrush />, title: "Preparação", desc: "Limpeza, desengraxe e fosfatização antes da tinta." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 text-industrial-950">
                                <div className="p-2 bg-industrial-950 text-accent-premium rounded-lg">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-black uppercase text-sm mb-1">{item.title}</h3>
                                    <p className="text-xs font-medium opacity-80">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Detail Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black uppercase text-industrial-900 leading-[0.9]">
                                A Pintura Começa <br />
                                <span className="text-industrial-400">Antes da Tinta.</span>
                            </h2>
                            <p className="text-industrial-600 text-lg leading-relaxed">
                                A tinta em pó recebe carga elétrica, adere ao aço e cura em estufa. Antes disso, a peça passa por limpeza, desengraxe, fosfatização e secagem. Depois da cura, passa por inspeção visual.
                            </p>
                            
                            <div className="space-y-6">
                                {[
                                    { icon: <Sun />, title: "Tinta para Uso Externo", desc: "Resina poliéster indicada para sol em ambiente urbano." },
                                    { icon: <Droplets />, title: "Fosfatização", desc: "Prepara a superfície do aço para receber a tinta." },
                                    { icon: <Layers />, title: "Cura em Estufa", desc: "Estufa de 6 m para curar a camada de tinta." }
                                ].map((benefit, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="size-12 shrink-0 border border-industrial-200 rounded-lg flex items-center justify-center text-industrial-900 group-hover:bg-accent-premium group-hover:border-accent-premium transition-all">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase text-industrial-900 mb-2">{benefit.title}</h4>
                                            <p className="text-industrial-500 text-sm leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative">
                            <div className="aspect-[4/5] bg-industrial-100 rounded-2xl overflow-hidden relative">
                                <Image 
                                    src="/images/servicos/pintura-eletrostatica.jpg" 
                                    alt="Peças em Processo de Pintura Eletrostática" 
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                                />
                                <div className="absolute inset-0 bg-industrial-950/10" />
                            </div>
                            {/* Accent box */}
                            <div className="absolute -top-10 -left-10 size-48 border-[10px] border-industrial-100 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Colors Section */}
            <section className="py-24 bg-industrial-950 text-white overflow-hidden">
                <div className="container mx-auto px-4 text-center mb-16">
                    <h2 className="text-3xl font-black uppercase mb-4">Cor do Projeto</h2>
                    <p className="text-industrial-400 max-w-xl mx-auto">Informe a cor por referência RAL na cotação. A disponibilidade e o efeito no prazo entram na proposta. Cores abaixo apenas ilustrativas.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 px-4 opacity-70 hover:opacity-100 transition-opacity">
                    {["bg-[#000000]", "bg-[#333333]", "bg-[#FFFFFF]", "bg-[#C0C0C0]", "bg-[#0b5394]", "bg-[#38761d]", "bg-[#990000]"].map((color, i) => (
                        <div key={i} className={`size-16 sm:size-24 ${color} border border-white/10 rounded-md`} />
                    ))}
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-7xl font-black uppercase text-industrial-900 mb-8 leading-none">
                            Tem um Lote <br />
                            <span className="text-accent-premium">para Pintar?</span>
                        </h2>
                        <p className="text-industrial-500 mb-12 text-lg font-medium leading-relaxed">
                            Envie o tipo de peça, a quantidade e a cor. Atendemos a partir de 10 peças por pedido, ou demanda programada e recorrente.
                        </p>
                        <Link 
                            href="/contato" 
                            className="bg-industrial-900 text-white h-20 px-16 inline-flex items-center justify-center font-black uppercase tracking-[0.2em] text-sm rounded-lg hover:bg-accent-premium hover:text-black transition-all shadow-2xl"
                        >
                            Solicitar Orçamento de Pintura
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
