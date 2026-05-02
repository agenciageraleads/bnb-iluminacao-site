import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { getCategories } from "@/lib/data"

export async function Categories() {
    const categoriesList = await getCategories();
    return (
        <section className="py-24 bg-industrial-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mb-16 text-center">
                    <h2 className="text-5xl md:text-7xl font-black font-outfit uppercase tracking-tight text-white mb-4">
                        PRODUTOS
                    </h2>
                    <div className="w-24 h-1 bg-accent-premium mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoriesList.map((cat, index) => (
                        <Link
                            key={index}
                            href={`/produtos/${cat.slug}`}
                            className="group relative block aspect-[4/5] overflow-hidden"
                        >
                            {/* Imagem de Fundo do CMS */}
                            {cat.image ? (
                                <Image
                                    src={cat.image}
                                    alt={cat.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-industrial-900 border border-industrial-800" />
                            )}

                            {/* Gradiente Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/70 to-transparent z-10" />

                            {/* Conteúdo */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 transform transition-transform duration-300 group-hover:-translate-y-2">
                                <span className="text-accent-premium text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Catálogo B&B
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none mb-3 group-hover:text-accent-premium transition-colors">
                                    {cat.title}
                                </h3>
                                <p className="text-industrial-400 text-sm mb-6 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity font-medium">
                                    {cat.description}
                                </p>
                                <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[11px] group-hover:gap-4 transition-all">
                                    Ver Categoria <ArrowRight className="size-4 text-accent-premium" />
                                </div>
                            </div>

                            {/* Borda Decorativa */}
                            <div className="absolute inset-0 border border-white/5 group-hover:border-accent-premium/20 transition-colors pointer-events-none z-30" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

