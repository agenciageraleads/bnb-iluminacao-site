"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { portfolioItems as staticPortfolioItems } from "@/lib/constants"
import { MessageCircle, Camera, X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/lib/data"
import { AnimatePresence, motion } from "framer-motion"

export function Portfolio({ projects = [] }: { projects?: Project[] }) {
    const items = projects.length > 0 ? projects : staticPortfolioItems;
    const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2]);
    const [fade, setFade] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

    // Efeito para trocar os projetos aleatoriamente a cada 15 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Inicia o fade out
            
            setTimeout(() => {
                // Seleciona 3 novos itens aleatórios sem repetir
                const newIndexes: number[] = [];
                while (newIndexes.length < 3) {
                    const r = Math.floor(Math.random() * items.length);
                    if (!newIndexes.includes(r)) newIndexes.push(r);
                }
                setCurrentIndexes(newIndexes);
                setFade(false); // Inicia o fade in
            }, 500); // Tempo igual a duração da transição CSS
        }, 15000);

        return () => clearInterval(interval);
    }, [items.length]);

    const mainProject = items[currentIndexes[0]] || items[0];
    const sideProject1 = items[currentIndexes[1]] || items[1];
    const sideProject2 = items[currentIndexes[2]] || items[2];

    const openGallery = (project: Project) => {
        setSelectedProject(project);
        setCurrentGalleryIndex(0);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedProject?.gallery) return;
        const allImages = [selectedProject.image, ...selectedProject.gallery];
        setCurrentGalleryIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedProject?.gallery) return;
        const allImages = [selectedProject.image, ...selectedProject.gallery];
        setCurrentGalleryIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

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
                    <div 
                        className="md:col-span-8 md:row-span-2 relative group overflow-hidden border border-industrial-100 cursor-pointer"
                        onClick={() => openGallery(mainProject)}
                    >
                        <Image
                            src={mainProject.image}
                            alt={mainProject.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {mainProject.gallery && mainProject.gallery.length > 0 && (
                            <div className="absolute top-4 right-4 bg-industrial-950/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest z-10">
                                <Camera className="size-3 text-accent-premium" />
                                {mainProject.gallery.length + 1} fotos
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent opacity-100" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <span className="text-accent-premium font-bold uppercase text-[10px] tracking-widest mb-2 block">{mainProject.category}</span>
                            <h3 className="text-3xl font-black uppercase mb-1">{mainProject.title}</h3>
                            <p className="text-white/70 font-bold text-sm tracking-wide">{mainProject.location}</p>
                        </div>
                    </div>

                    {/* Card 2: Direita Superior */}
                    <div 
                        className="md:col-span-4 md:row-span-1 relative group overflow-hidden border border-industrial-100 cursor-pointer"
                        onClick={() => openGallery(sideProject1)}
                    >
                        <Image
                            src={sideProject1.image}
                            alt={sideProject1.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {sideProject1.gallery && sideProject1.gallery.length > 0 && (
                            <div className="absolute top-3 right-3 bg-industrial-950/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest z-10">
                                <Camera className="size-2.5 text-accent-premium" />
                                {sideProject1.gallery.length + 1}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 to-transparent opacity-100" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <span className="text-accent-premium font-bold uppercase text-[9px] tracking-widest mb-1 block">{sideProject1.category}</span>
                            <h3 className="text-xl font-black uppercase mb-0">{sideProject1.title}</h3>
                            <p className="text-white/70 font-bold text-xs">{sideProject1.location}</p>
                        </div>
                    </div>

                    {/* Card 3: Direita Inferior */}
                    <div 
                        className="md:col-span-4 md:row-span-1 relative group overflow-hidden border border-industrial-100 cursor-pointer"
                        onClick={() => openGallery(sideProject2)}
                    >
                        <Image
                            src={sideProject2.image}
                            alt={sideProject2.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {sideProject2.gallery && sideProject2.gallery.length > 0 && (
                            <div className="absolute top-3 right-3 bg-industrial-950/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest z-10">
                                <Camera className="size-2.5 text-accent-premium" />
                                {sideProject2.gallery.length + 1}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 to-transparent opacity-100" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <span className="text-accent-premium font-bold uppercase text-[9px] tracking-widest mb-1 block">{sideProject2.category}</span>
                            <h3 className="text-xl font-black uppercase mb-0">{sideProject2.title}</h3>
                            <p className="text-white/70 font-bold text-xs">{sideProject2.location}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://wa.me/556235761988?text=Olá! Vi o portfólio de vocês e gostaria de solicitar um orçamento para um projeto."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-industrial-950 text-white font-black uppercase tracking-widest px-10 h-16 hover:bg-industrial-800 active:scale-95 transition-all text-sm group"
                        >
                            <MessageCircle className="size-5 text-accent-premium group-hover:scale-110 transition-transform" />
                            QUERO EXECUTAR MEU PROJETO
                        </a>
                        <Link
                            href="/obras"
                            className="inline-flex items-center justify-center gap-3 bg-white border border-industrial-200 text-industrial-950 font-black uppercase tracking-widest px-10 h-16 hover:bg-industrial-50 active:scale-95 transition-all text-sm group"
                        >
                            VER TODAS AS OBRAS
                        </Link>
                    </div>
                    <p className="mt-4 text-[10px] text-industrial-400 font-bold uppercase tracking-widest">Enviamos nossos postes para todos os estados do Brasil</p>
                </div>
            </div>

            {/* Modal de Galeria */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-industrial-950/95 backdrop-blur-xl p-4 md:p-8"
                        onClick={() => setSelectedProject(null)}
                    >
                        <button 
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                            onClick={() => setSelectedProject(null)}
                        >
                            <X className="size-8" />
                        </button>

                        <div 
                            className="relative w-full max-w-6xl aspect-[16/10] md:aspect-[16/9] flex flex-col items-center justify-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Imagem Principal do Modal */}
                            <div className="relative w-full h-full group">
                                <Image
                                    src={[selectedProject.image, ...(selectedProject.gallery || [])][currentGalleryIndex]}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                                
                                {(selectedProject.gallery && selectedProject.gallery.length > 0) && (
                                    <>
                                        <button 
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center bg-industrial-950/50 border border-white/10 text-white rounded-full hover:bg-accent-premium hover:border-accent-premium transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronLeft className="size-6" />
                                        </button>
                                        <button 
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center bg-industrial-950/50 border border-white/10 text-white rounded-full hover:bg-accent-premium hover:border-accent-premium transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronRight className="size-6" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Info e Navegação */}
                            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                                <div>
                                    <span className="text-accent-premium font-bold uppercase text-[10px] tracking-[0.2em] mb-1 block">
                                        {selectedProject.category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                                        {selectedProject.title}
                                    </h3>
                                    <p className="text-white/50 font-bold text-xs uppercase tracking-widest">
                                        {selectedProject.location}
                                    </p>
                                </div>

                                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                                    <div className="flex gap-2">
                                        {[selectedProject.image, ...selectedProject.gallery].map((img, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => setCurrentGalleryIndex(idx)}
                                                className={`relative size-12 md:size-16 overflow-hidden border-2 transition-all ${currentGalleryIndex === idx ? 'border-accent-premium scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                            >
                                                <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
} 
