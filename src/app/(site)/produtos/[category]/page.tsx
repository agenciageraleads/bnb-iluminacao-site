import { Header } from "@/components/layout/header"
import Image from "next/image"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"
import { getProducts, getCategories } from "@/lib/data"
import { redirect } from "next/navigation"

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: categorySlug } = await params;
    
    // Tentar encontrar se é uma categoria
    const allCategories = await getCategories();
    const category = allCategories.find(c => c.slug === categorySlug);
    
    // Redirecionamento Inteligente: Se não for categoria, verificar se é um produto
    if (!category) {
        const allProducts = await getProducts();
        const productAsCategory = allProducts.find(p => p.id === categorySlug);
        
        if (productAsCategory) {
            redirect(`/produtos/item/${categorySlug}`);
        }
    }

    const products = await getProducts();
    const categoryProducts = products.filter(p => p.category === categorySlug);
    const categoryName = category?.title || categorySlug;

    return (
        <main className="min-h-screen bg-industrial-50 selection:bg-accent-premium selection:text-industrial-950">
            <Header />
            <FloatingWhatsApp />

            {/* Hero Premium de Alta Conversão B2B */}
            <section className="pt-32 md:pt-40 pb-16 bg-industrial-950 relative overflow-hidden border-b-[6px] border-accent-premium shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888037326-88099bb2059a?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/80 to-transparent" aria-hidden="true" />
                <div className="container mx-auto px-4 relative z-10">
                    <Link
                        href="/produtos"
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-industrial-400 hover:text-accent-premium transition-colors mb-8 group"
                        aria-label="Voltar para todos os produtos"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                        Catálogo Completo
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-0.5 w-8 bg-accent-premium"></span>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-accent-premium">Linha Industrial Premium</p>
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter drop-shadow-md">
                                {categoryName}
                            </h1>
                            {category?.description && (
                                <p className="text-industrial-300 mt-6 text-sm md:text-lg leading-relaxed font-medium border-l-2 border-industrial-800 pl-4">
                                    {category.description}
                                </p>
                            )}
                        </div>
                        <button
                            className="flex items-center justify-center gap-3 h-14 px-8 bg-accent-premium hover:bg-yellow-400 text-industrial-950 font-black uppercase tracking-widest text-[11px] transition-all w-full md:w-auto shrink-0 shadow-[0_0_20px_rgba(253,224,71,0.3)] hover:shadow-[0_0_30px_rgba(253,224,71,0.5)] hover:-translate-y-0.5"
                            aria-label="Filtrar produtos desta categoria"
                        >
                            <Filter className="size-4" aria-hidden="true" /> FILTRAR PRODUTOS
                        </button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 md:py-24">
                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8" role="list" aria-label={`Produtos da linha ${categoryName}`}>
                        {categoryProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/produtos/item/${product.id}`}
                                className="group flex flex-col bg-white border border-industrial-200 hover:border-industrial-950 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                                role="listitem"
                                aria-label={`Ver detalhes de ${product.name}`}
                            >
                                <div className="aspect-[4/3] bg-industrial-50 flex items-center justify-center relative border-b border-industrial-100 overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-premium to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-hidden="true" />
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-industrial-100 to-industrial-50">
                                            <span className="text-industrial-200 font-black text-6xl italic select-none group-hover:scale-110 transition-transform duration-500 opacity-50" aria-hidden="true">
                                                {product.model}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-industrial-950/0 group-hover:bg-industrial-950/10 transition-colors duration-500" aria-hidden="true" />
                                    <span className="absolute top-4 right-4 bg-industrial-950 text-accent-premium shadow-lg text-[9px] font-black uppercase tracking-widest px-3 py-1.5 z-20">
                                        {categoryName}
                                    </span>
                                </div>
                                <div className="p-6 flex flex-col flex-1 relative bg-white">
                                    <h2 className="text-base md:text-lg font-black text-industrial-950 uppercase tracking-tight mb-2 group-hover:text-accent-premium transition-colors">
                                        {product.name}
                                    </h2>
                                    <p className="text-industrial-500 text-xs leading-relaxed flex-1 mb-6 font-medium">{product.description}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-industrial-100">
                                        <span className="text-[10px] text-industrial-400 font-black uppercase tracking-[0.2em] bg-industrial-50 px-2 py-1">REF: {product.model}</span>
                                        <span className="text-[11px] text-industrial-950 font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-accent-premium transition-colors">
                                            Detalhes
                                            <ArrowLeft className="size-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-industrial-200 bg-white">
                        <div className="size-16 bg-industrial-50 rounded-full flex items-center justify-center mb-6">
                            <Filter className="size-6 text-industrial-300" />
                        </div>
                        <p className="text-industrial-900 font-black uppercase tracking-widest text-lg mb-2">
                            Catálogo em Atualização
                        </p>
                        <p className="text-industrial-500 font-medium text-sm mb-6 w-full max-w-sm text-center">
                            Nenhuma especificação disponível para esta linha no momento. Nossa engenharia está mapeando os itens.
                        </p>
                        <Link href="/produtos" className="h-12 px-6 flex items-center justify-center bg-industrial-950 text-white font-black uppercase tracking-widest text-[11px] hover:bg-industrial-800 transition-colors">
                            Retornar ao Catálogo
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}
