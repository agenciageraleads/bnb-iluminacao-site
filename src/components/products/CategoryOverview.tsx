"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Category {
    title: string
    slug: string
    image: string
    description: string
}

interface CategoryOverviewProps {
    categories: Category[]
}

export function CategoryOverview({ categories }: CategoryOverviewProps) {
    if (!categories || categories.length === 0) return null;

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-black font-outfit text-industrial-950 uppercase tracking-tighter mb-4">
                        Explore nossas <span className="text-accent-premium">Linhas de Produtos</span>
                    </h2>
                    <p className="text-industrial-500 max-w-2xl text-sm md:text-base leading-relaxed">
                        Selecione uma categoria para visualizar nosso catálogo completo de soluções em iluminação e infraestrutura.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={`/produtos/${category.slug}`}
                                className="group relative block aspect-[4/5] overflow-hidden bg-industrial-900 rounded-sm"
                            >
                                {/* Imagem de Fundo com Overlay */}
                                {category.image ? (
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-50"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-industrial-800 flex items-center justify-center">
                                        <span className="text-industrial-600 font-black text-4xl italic opacity-20">B&B</span>
                                    </div>
                                )}

                                {/* Gradiente Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/40 to-transparent" />

                                {/* Conteúdo do Card */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <span className="text-[10px] font-bold text-accent-premium uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        Ver Catálogo
                                    </span>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight mb-2 group-hover:text-accent-premium transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-industrial-300 text-xs line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        {category.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                                        <span>Explorar Linha</span>
                                        <ArrowRight className="size-4 text-accent-premium" />
                                    </div>
                                </div>

                                {/* Borda Decorativa */}
                                <div className="absolute inset-0 border border-white/10 group-hover:border-accent-premium/30 transition-colors pointer-events-none" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
