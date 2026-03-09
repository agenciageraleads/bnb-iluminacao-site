import { Header } from "@/components/layout/header"
import Image from "next/image"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"
import { products, categories } from "@/lib/data"

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: categorySlug } = await params;
    const category = categories.find(c => c.slug === categorySlug);
    const categoryProducts = products.filter(p => p.category === categorySlug);
    const categoryName = category?.title || categorySlug;

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <FloatingWhatsApp />

            {/* Hero compacto da categoria */}
            <section className="pt-24 md:pt-28 pb-8 bg-white border-b border-industrial-200">
                <div className="container mx-auto px-4">
                    <Link
                        href="/produtos"
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-industrial-500 hover:text-industrial-900 transition-colors mb-6"
                        aria-label="Voltar para todos os produtos"
                    >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Todos os Produtos
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-industrial-500 mb-2">Linha Industrial</p>
                            <h1 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase leading-none">
                                <span className="border-b-4 border-accent-premium">{categoryName}</span>
                            </h1>
                            {category?.description && (
                                <p className="text-industrial-500 mt-3 max-w-xl text-sm md:text-base leading-relaxed">{category.description}</p>
                            )}
                        </div>
                        <button
                            className="flex items-center justify-center gap-2 h-12 px-5 bg-white border border-industrial-300 hover:bg-industrial-50 text-industrial-700 font-bold uppercase tracking-widest text-[11px] transition-colors w-full md:w-auto shrink-0"
                            aria-label="Filtrar produtos desta categoria"
                        >
                            <Filter className="size-4" aria-hidden="true" /> FILTRAR
                        </button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 md:py-12">
                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" role="list" aria-label={`Produtos da linha ${categoryName}`}>
                        {categoryProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/produtos/item/${product.id}`}
                                className="group flex flex-col bg-white border border-industrial-200 hover:border-industrial-800 hover:shadow-md transition-all"
                                role="listitem"
                                aria-label={`Ver detalhes de ${product.name}`}
                            >
                                <div className="aspect-square bg-industrial-100 flex items-center justify-center relative border-b border-industrial-200 overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-premium group-hover:h-1 transition-all" aria-hidden="true" />
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <span className="text-industrial-300 font-black text-5xl italic select-none tracking-tighter group-hover:scale-105 transition-transform duration-300" aria-hidden="true">
                                            {product.model}
                                        </span>
                                    )}
                                    <span className="absolute top-3 right-3 bg-industrial-950 text-white text-[9px] font-black uppercase tracking-tight px-2 py-1">
                                        {categoryName}
                                    </span>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h2 className="text-sm font-black text-industrial-900 uppercase tracking-tight mb-1 group-hover:text-industrial-700">
                                        {product.name}
                                    </h2>
                                    <p className="text-industrial-500 text-[11px] leading-relaxed flex-1 mb-3">{product.description}</p>
                                    <div className="flex items-center justify-between pt-3 border-t border-industrial-100">
                                        <span className="text-[10px] text-industrial-400 font-bold uppercase tracking-widest">Mod: {product.model}</span>
                                        <span className="text-[11px] text-industrial-900 font-black uppercase tracking-widest group-hover:underline">Ver mais →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border border-dashed border-industrial-300 bg-industrial-50">
                        <p className="text-industrial-500 font-bold uppercase tracking-widest text-sm mb-4">
                            Nenhum produto encontrado nesta categoria no momento.
                        </p>
                        <Link href="/produtos" className="text-industrial-900 font-black uppercase text-xs underline hover:no-underline">
                            Ver catálogo completo
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}
