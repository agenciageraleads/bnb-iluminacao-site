import { Header } from "@/components/layout/header"
import Image from "next/image"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { Filter, Search } from "lucide-react"
import Link from "next/link"
import { getProducts, getCategories } from "@/lib/data"
import { CategoryOverview } from "@/components/products/CategoryOverview"

export const dynamic = 'force-dynamic'

export default async function ProdutosPage() {
    const [products, categoriesList] = await Promise.all([
        getProducts(),
        getCategories()
    ]);
    
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <FloatingWhatsApp />

            {/* Hero da página de catálogo */}
            <section className="pt-24 md:pt-28 pb-10 md:pb-14 bg-white border-b border-industrial-200">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-industrial-500 mb-3">Catálogo Completo</p>
                        <h1 className="text-3xl md:text-5xl font-black font-outfit text-industrial-950 uppercase leading-none mb-4">
                            NOSSOS <span className="border-b-4 border-accent-premium">PRODUTOS</span>
                        </h1>
                        <p className="text-industrial-500 text-base leading-relaxed">
                            Soluções em aço galvanizado com certificação de qualidade para iluminação pública, industrial e decorativa.
                        </p>
                    </div>
                </div>
            </section>

            {/* Resumo das Categorias — NOVO */}
            <CategoryOverview categories={categoriesList} />

            <div className="container mx-auto px-4 py-8 md:py-12 border-t border-industrial-100">
                <div className="mb-12">
                    <h2 className="text-xl font-black text-industrial-900 uppercase tracking-tight mb-2">Busca Avançada</h2>
                    <p className="text-industrial-500 text-sm">Ou explore todos os nossos produtos abaixo</p>
                </div>

                {/* Busca e filtro — Mobile: full-width empilhado */}
                <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-industrial-400" aria-hidden="true" />
                        <input
                            type="search"
                            placeholder="Buscar produtos…"
                            aria-label="Buscar produtos"
                            className="w-full bg-white border border-industrial-300 pl-11 pr-4 h-12 text-sm text-industrial-900 placeholder:text-industrial-400 focus:outline-none focus:border-industrial-700 transition-colors"
                        />
                    </div>
                    <button
                        className="flex items-center justify-center gap-2 h-12 px-5 bg-white border border-industrial-300 hover:bg-industrial-50 active:bg-industrial-100 text-industrial-700 font-bold tracking-widest uppercase text-[11px] transition-colors"
                        aria-label="Filtrar produtos"
                    >
                        <Filter className="size-4" aria-hidden="true" />
                        FILTRAR
                    </button>
                </div>

                {/* Categorias — scroll horizontal em mobile */}
                <nav aria-label="Categorias de produtos" className="flex overflow-x-auto pb-4 mb-10 gap-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                    <Link
                        href="/produtos"
                        className="whitespace-nowrap px-5 py-2.5 bg-industrial-950 text-white text-[11px] font-bold uppercase tracking-widest flex-shrink-0 transition-colors"
                    >
                        Todos
                    </Link>
                    {categoriesList.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/produtos/${cat.slug}`}
                            className="whitespace-nowrap px-5 py-2.5 bg-white border border-industrial-200 text-industrial-700 text-[11px] font-bold uppercase tracking-widest hover:bg-industrial-900 hover:text-white hover:border-industrial-900 flex-shrink-0 transition-all"
                        >
                            {cat.title}
                        </Link>
                    ))}
                </nav>

                {/* Grid de produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" role="list" aria-label="Lista de produtos">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/produtos/item/${product.id}`}
                            className="group flex flex-col bg-white border border-industrial-200 hover:border-industrial-800 hover:shadow-md active:shadow-sm transition-all"
                            role="listitem"
                            aria-label={`Ver detalhes de ${product.name}`}
                        >
                            {/* Imagem/placeholder do produto */}
                            <div className="aspect-square bg-industrial-100 flex items-center justify-center relative overflow-hidden border-b border-industrial-200">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-premium group-hover:h-1 transition-all" aria-hidden="true" />
                                {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-contain transition-transform duration-500"
                                        />
                                ) : (
                                    <span
                                        className="text-industrial-300 font-black text-5xl select-none italic tracking-tighter group-hover:scale-105 transition-transform duration-300"
                                        aria-hidden="true"
                                    >
                                        {product.model}
                                    </span>
                                )}
                                <span className="absolute top-3 right-3 bg-industrial-950 text-white text-[9px] font-black uppercase tracking-tight px-2 py-1">
                                    {categoriesList.find(c => c.slug === product.category)?.title || product.category}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="p-4 flex flex-col flex-1">
                                <h2 className="text-sm font-black text-industrial-900 uppercase tracking-tight group-hover:text-industrial-700 transition-colors mb-1">
                                    {product.name}
                                </h2>
                                <p className="text-industrial-500 text-[11px] leading-relaxed flex-1 mb-3">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between pt-3 border-t border-industrial-100">
                                    <span className="text-[10px] text-industrial-400 font-bold uppercase tracking-widest">Modelo: {product.model}</span>
                                    <span className="text-[11px] text-industrial-900 font-black uppercase tracking-widest group-hover:underline">
                                        Ver mais →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}

