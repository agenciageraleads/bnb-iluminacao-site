"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { portfolioItems } from "@/lib/constants"
import { MessageCircle } from "lucide-react"

export function Portfolio() {
    const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2]);
    const [fade, setFade] = useState(false);

    // Efeito para trocar os projetos aleatoriamente a cada 4 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Inicia o fade out
            
            setTimeout(() => {
                // Seleciona 3 novos itens aleatórios sem repetir
                const newIndexes: number[] = [];
                while (newIndexes.length < 3) {
                    const r = Math.floor(Math.random() * portfolioItems.length);
                    if (!newIndexes.includes(r)) newIndexes.push(r);
                }
                setCurrentIndexes(newIndexes);
                setFade(false); // Inicia o fade in
            }, 500); // Tempo igual a duração da transição CSS
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const mainProject = portfolioItems[currentIndexes[0]];
    const sideProject1 = portfolioItems[currentIndexes[1]];
    const sideProject2 = portfolioItems[currentIndexes[2]];

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
                            Mais de 30.000 postes fabricados
                        </p>
                    </div>
                </div>

                {/* Grid Dinâmico (Bento Style) */}
                <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px] md:auto-rows-[250px] transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                    
                    {/* Card 1: Principal (Esquerda - Grande) */}
                    <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden border border-industrial-100">
                        <Image
                            src={mainProject.image}
                            alt={mainProject.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent opacity-100" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <span className="text-accent-premium font-bold uppercase text-[10px] tracking-widest mb-2 block">{mainProject.category}</span>
                            <h3 className="text-3xl font-black uppercase mb-1">{mainProject.title}</h3>
                            <p className="text-white/70 font-bold text-sm tracking-wide">{mainProject.location}</p>
                        </div>
                    </div>

                    {/* Card 2: Direita Superior */}
                    <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden border border-industrial-100">
                        <Image
                            src={sideProject1.image}
                            alt={sideProject1.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 to-transparent opacity-100" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <span className="text-accent-premium font-bold uppercase text-[9px] tracking-widest mb-1 block">{sideProject1.category}</span>
                            <h3 className="text-xl font-black uppercase mb-0">{sideProject1.title}</h3>
                            <p className="text-white/70 font-bold text-xs">{sideProject1.location}</p>
                        </div>
                    </div>

                    {/* Card 3: Direita Inferior */}
                    <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden border border-industrial-100">
                        <Image
                            src={sideProject2.image}
                            alt={sideProject2.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 to-transparent opacity-100" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <span className="text-accent-premium font-bold uppercase text-[9px] tracking-widest mb-1 block">{sideProject2.category}</span>
                            <h3 className="text-xl font-black uppercase mb-0">{sideProject2.title}</h3>
                            <p className="text-white/70 font-bold text-xs">{sideProject2.location}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center">
                    <a
                        href="https://wa.me/556235761988?text=Olá! Vi o portfólio de vocês e gostaria de solicitar um orçamento para um projeto."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-industrial-950 text-white font-black uppercase tracking-widest px-10 h-16 hover:bg-industrial-800 active:scale-95 transition-all text-sm group"
                    >
                        <MessageCircle className="size-5 text-accent-premium group-hover:scale-110 transition-transform" />
                        QUERO EXECUTAR MEU PROJETO
                    </a>
                    <p className="mt-4 text-[10px] text-industrial-400 font-bold uppercase tracking-widest">Enviamos nossos postes para todos os estados do Brasil</p>
                </div>
            </div>
        </section>
    )
} 
