import Image from "next/image"
import { portfolioItems } from "@/lib/data"
import { MessageCircle } from "lucide-react"

export function Portfolio() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <p className="text-accent-premium font-black uppercase tracking-[0.2em] text-xs mb-4">
                            Nossa Experiência
                        </p>
                        <h2 className="text-4xl md:text-6xl font-black text-industrial-950 uppercase leading-[0.9] tracking-tighter">
                            PROJETOS <br /> <span className="text-industrial-400">EXECUTADOS</span>
                        </h2>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-32 h-1 bg-accent-premium mb-2"></div>
                        <p className="text-industrial-500 font-bold uppercase tracking-widest text-[10px]">
                            Mais de 1.000 obras atendidas
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px] md:auto-rows-[250px]">
                    {/* Card 1: Principal (Esquerda - Grande) */}
                    <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden border border-industrial-100">
                        <Image
                            src={portfolioItems[0].image}
                            alt={portfolioItems[0].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-accent-premium font-bold uppercase text-[10px] tracking-widest mb-2 block">{portfolioItems[0].category}</span>
                            <h3 className="text-3xl font-black uppercase mb-1">{portfolioItems[0].title}</h3>
                            <p className="text-white/70 font-bold text-sm tracking-wide">{portfolioItems[0].location}</p>
                        </div>
                    </div>

                    {/* Card 2: Direita Superior */}
                    <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden border border-industrial-100">
                        <Image
                            src={portfolioItems[1].image}
                            alt={portfolioItems[1].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-accent-premium font-bold uppercase text-[9px] tracking-widest mb-1 block">{portfolioItems[1].category}</span>
                            <h3 className="text-xl font-black uppercase mb-0">{portfolioItems[1].title}</h3>
                            <p className="text-white/70 font-bold text-xs">{portfolioItems[1].location}</p>
                        </div>
                    </div>

                    {/* Card 3: Direita Inferior */}
                    <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden border border-industrial-100">
                        <Image
                            src={portfolioItems[2].image}
                            alt={portfolioItems[2].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-accent-premium font-bold uppercase text-[9px] tracking-widest mb-1 block">{portfolioItems[2].category}</span>
                            <h3 className="text-xl font-black uppercase mb-0">{portfolioItems[2].title}</h3>
                            <p className="text-white/70 font-bold text-xs">{portfolioItems[2].location}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center">
                    <a
                        href="https://wa.me/556232887711?text=Olá! Vi o portfólio de vocês e gostaria de solicitar um orçamento para um projeto."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-industrial-950 text-white font-black uppercase tracking-widest px-10 h-16 hover:bg-industrial-800 active:scale-95 transition-all text-sm group"
                    >
                        <MessageCircle className="size-5 text-accent-premium group-hover:scale-110 transition-transform" />
                        SOLICITAR ORÇAMENTO PARA MEU PROJETO
                    </a>
                    <p className="mt-4 text-[10px] text-industrial-400 font-bold uppercase tracking-widest">Atendimento em todo o Brasil</p>
                </div>
            </div>
        </section>
    )
}
