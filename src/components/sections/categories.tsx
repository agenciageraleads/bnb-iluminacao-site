import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getCategories } from "@/lib/data"

export async function Categories() {
    const categoriesList = await getCategories();
    return (
        <section className="py-24 bg-industrial-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mb-16 text-center">
                    <h2 className="text-5xl md:text-7xl font-black font-sans uppercase tracking-tight text-white mb-4">
                        PRODUTOS
                    </h2>
                    <div className="w-24 h-1 bg-accent-premium mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoriesList.map((cat, index) => (
                        <Link
                            key={index}
                            href={`/produtos/${cat.slug}`}
                            className="group relative"
                        >
                            {/* Losango emulando a angulação do catálogo - Simplificado em container por hora */}
                            <div className="aspect-[4/5] overflow-hidden rounded-none bg-industrial-900 border border-industrial-800 transition-transform duration-500 group-hover:border-accent-premium/50 flex flex-col justify-end p-6 relative">

                                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 to-transparent z-10 opacity-90" />

                                <div className="z-20 transform transition-transform duration-300 group-hover:-translate-y-4">
                                    <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                                    <p className="text-industrial-400 text-sm mb-4 h-10 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {cat.description}
                                    </p>
                                    <span className="text-accent-premium font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                        Ver Categoria <ArrowRight className="size-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
