import Script from 'next/script'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { Check, MessageCircle, Phone, ShieldCheck, Truck, Calendar, Download, Factory, ArrowRight, Paintbrush, PenTool, Lightbulb, Layout, Anchor } from "lucide-react"
import Link from "next/link"
import { getProducts, getCategories } from "@/lib/data"

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const allProducts = await getProducts();
    const product = allProducts.find(p => p.id === slug);
    const allCategories = await getCategories();
    const category = allCategories.find(c => c.slug === product?.category);

    if (!product) {
        return (
            <main className="min-h-screen bg-white">
                <Header />
                <div className="container mx-auto px-4 pt-40 text-center">
                    <p className="text-industrial-500 text-lg font-bold mb-6">Produto não encontrado.</p>
                    <Link href="/produtos" className="text-industrial-900 font-black uppercase text-sm underline hover:no-underline">
                        Ver catálogo completo
                    </Link>
                </div>
                <Footer />
            </main>
        )
    }

    const specs = product.specs ?? [
        "Aço SAE 1010/1020 certificado",
        "Galvanização a fogo NBR 6323",
        "Pintura eletrostática opcional",
        "Dimensionado para ventos conforme NBR 6123",
    ]

    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const defaultBadges = ["NBR 6323", "Qualidade ISO", "Garantia B&B"];
    const productBadges = product.badges ?? defaultBadges;

    const defaultApplications = ["Iluminação Pública", "Condomínios", "Estacionamentos", "Áreas Industriais"];
    const productApplications = product.applications ?? defaultApplications;

    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.image ? [product.image] : [],
        "description": product.description,
        "sku": product.model,
        "mpn": product.model,
        "brand": {
            "@type": "Brand",
            "name": "B&B Iluminação"
        },
        "manufacturer": {
            "@id": "https://bebiluminacao.com.br/#organization"
        },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": `O que é o ${product.name}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `O ${product.name} modelo ${product.model} é fabricado pela B&B Iluminação com ${specs[0]}.`
                    }
                },
                {
                    "@type": "Question",
                    "name": `Para quais aplicações o ${product.name} é recomendado?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `É amplamente recomendado para: ${productApplications.join(', ')}.`
                    }
                }
            ]
        }
    };

    return (
        <main className="min-h-screen bg-white pt-24">
            <Script
                id={`product-schema-${product.id}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            <FloatingWhatsApp />

            {/* Breadcrumb */}
            <nav aria-label="Navegação de localização" className="bg-industrial-50 border-b border-industrial-200">
                <div className="container mx-auto px-4 h-12 flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-industrial-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <Link href="/" className="hover:text-industrial-900 transition-colors">Home</Link>
                    <span aria-hidden="true" className="shrink-0">›</span>
                    <Link href="/produtos" className="hover:text-industrial-900 transition-colors">Produtos</Link>
                    <span aria-hidden="true" className="shrink-0">›</span>
                    {category && (
                        <>
                            <Link href={`/produtos/${category.slug}`} className="hover:text-industrial-900 transition-colors">{category.title}</Link>
                            <span aria-hidden="true" className="shrink-0">›</span>
                        </>
                    )}
                    <span className="text-industrial-900 truncate">{product.name}</span>
                </div>
            </nav>

            <section className="container mx-auto px-4 pt-16 pb-16">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                    {/* Galeria do produto */}
                    <div className="space-y-4 lg:sticky lg:top-24">
                        <div className="group aspect-square bg-industrial-100 border border-industrial-200 flex items-center justify-center relative overflow-hidden rounded-sm shadow-sm">
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent-premium z-10" aria-hidden="true" />
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                            ) : (
                                <span className="text-industrial-200 font-black text-[100px] select-none italic" aria-label="Imagem do produto">
                                    {product.model}
                                </span>
                            )}
                            <div className="absolute top-4 right-4 bg-industrial-950/80 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm">
                                {category?.title}
                            </div>
                        </div>

                        {/* Miniaturas em scroll horizontal */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {[1, 2, 3].map((i) => (
                                <button
                                    key={i}
                                    className="aspect-square w-20 shrink-0 bg-industrial-50 border-2 border-transparent hover:border-accent-premium transition-all relative overflow-hidden group shadow-sm"
                                    aria-label={`Visualizar foto ${i} do produto`}
                                >
                                    <span className="text-industrial-300 font-black text-xs italic" aria-hidden="true">{product.model}</span>
                                    {product.image && (
                                        <Image src={product.image} alt="" fill className="object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Conteúdo do Produto */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {productBadges.map((badge, i) => (
                                    <span key={i} className="inline-flex items-center gap-1.5 bg-industrial-50 text-industrial-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 border border-industrial-100 rounded-sm">
                                        <ShieldCheck className="size-3 text-accent-premium" />
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase leading-tight tracking-tight mb-2">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-3">
                                <span className="bg-industrial-100 text-industrial-900 border border-industrial-200 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                    {product.model}
                                </span>
                                <p className="text-industrial-500 text-xs font-bold uppercase tracking-widest">Código Original</p>
                            </div>
                        </div>

                        <p className="text-industrial-600 text-lg leading-relaxed">{product.description}</p>

                        {/* Aplicações */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-industrial-950 flex items-center gap-2">
                                <Factory className="size-4 text-accent-premium" />
                                Aplicações Recomendadas
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {productApplications.map((app, i) => (
                                    <div key={i} className="bg-industrial-50 p-3 border border-industrial-100 flex items-center gap-3 group hover:border-accent-premium transition-colors">
                                        <Check className="size-4 text-accent-premium shrink-0" />
                                        <span className="text-[11px] font-bold text-industrial-700 group-hover:text-industrial-950 transition-colors uppercase tracking-tight">{app}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Especificações Técnicas */}
                        <div className="space-y-4 border-y border-industrial-100 py-2">
                            <details className="group bg-white" open>
                                <summary className="flex items-center justify-between py-4 cursor-pointer font-black text-xs uppercase tracking-widest text-industrial-950 list-none hover:text-accent-premium transition-colors select-none">
                                    Detalhes Técnicos
                                    <span className="group-open:rotate-180 transition-transform duration-300 text-accent-premium" aria-hidden="true">▼</span>
                                </summary>
                                <ul className="pb-4 divide-y divide-industrial-50">
                                    {specs.map((spec: string, i: number) => (
                                        <li key={i} className="flex items-start gap-4 py-3">
                                            <div className="size-5 rounded-full bg-accent-premium/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="size-3 text-industrial-900" aria-hidden="true" />
                                            </div>
                                            <span className="text-sm font-medium text-industrial-600 leading-relaxed">{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </div>

                        {/* Opcionais Disponíveis */}
                        {product.optionals && product.optionals.length > 0 && (
                            <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-px bg-accent-premium flex-1" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-premium">Opcionais Disponíveis</h3>
                                    <div className="h-px bg-industrial-200 flex-1" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.optionals.map((opt, i) => {
                                        let Icon = Check;
                                        if (opt.includes('Pintura')) Icon = Paintbrush;
                                        if (opt.includes('Projeto Personalizado')) Icon = PenTool;
                                        if (opt.includes('Projeto Iluminotécnico')) Icon = Lightbulb;
                                        if (opt.includes('Janela')) Icon = Layout;
                                        if (opt.includes('Chumbador')) Icon = Anchor;

                                        return (
                                            <div key={i} className="flex items-center gap-4 group">
                                                <div className="size-10 rounded-full border border-industrial-200 flex items-center justify-center group-hover:border-accent-premium group-hover:bg-accent-premium/5 transition-all">
                                                    <Icon className="size-5 text-industrial-900 group-hover:text-accent-premium transition-colors" />
                                                </div>
                                                <span className="text-[11px] font-black uppercase tracking-widest text-industrial-600 group-hover:text-industrial-950 transition-colors">{opt}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Logística e Download */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-industrial-50 p-4 border border-industrial-100 flex items-start gap-3">
                                <Calendar className="size-5 text-industrial-900 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400 mb-1">Prazo de Produção</p>
                                    <p className="text-sm font-bold text-industrial-900">{product.leadTime ?? "15 a 30 dias úteis"}</p>
                                </div>
                            </div>
                            <div className="bg-industrial-50 p-4 border border-industrial-100 flex items-start gap-3">
                                <Truck className="size-5 text-industrial-900 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400 mb-1">Logística</p>
                                    <p className="text-sm font-bold text-industrial-900">Entrega em todo o Brasil</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {product.datasheet && (
                                <button className="w-full flex items-center justify-center gap-3 bg-industrial-100 text-industrial-900 border border-industrial-200 font-black uppercase tracking-widest h-14 hover:bg-industrial-200 transition-colors group">
                                    <Download className="size-5 group-hover:translate-y-0.5 transition-transform" />
                                    Baixar Ficha Técnica (PDF)
                                </button>
                            )}

                            {/* Botões de Ação Desktop */}
                            <div className="hidden md:grid grid-cols-2 gap-4">
                                <a
                                    href={`https://wa.me/556235761988?text=Olá! Tenho interesse no produto ${product.name} (${product.model}).`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-industrial-950 text-white hover:bg-industrial-800 font-black uppercase tracking-widest h-16 px-6 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-industrial-950/20"
                                >
                                    <MessageCircle className="size-6" />
                                    Solicitar Cotação
                                </a>
                                <a
                                    href="tel:+556235761988"
                                    className="flex items-center justify-center gap-3 bg-white text-industrial-950 border-2 border-industrial-950 hover:bg-industrial-50 font-black uppercase tracking-widest h-16 px-6 transition-all"
                                >
                                    <Phone className="size-5" />
                                    Ligar Agora
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de Produtos Relacionados */}
            {relatedProducts.length > 0 && (
                <section className="bg-industrial-50 py-20 border-t border-industrial-200">
                    <div className="container mx-auto px-4">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-accent-premium font-black uppercase tracking-widest text-[10px] sm:text-xs">Complemente seu projeto</span>
                                <h2 className="text-3xl md:text-4xl font-black text-industrial-950 uppercase mt-2">Veja Também</h2>
                            </div>
                            <Link href={`/produtos/${product.category}`} className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-industrial-500 hover:text-industrial-950 transition-colors">
                                Ver todos <ArrowRight className="size-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((rel) => (
                                <Link key={rel.id} href={`/produtos/item/${rel.id}`} className="group bg-white border border-industrial-100 hover:border-industrial-900 transition-all shadow-sm flex flex-col h-full">
                                    <div className="aspect-square relative overflow-hidden bg-industrial-50 border-b border-industrial-50">
                                        <Image src={rel.image} alt={rel.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-3 left-3 bg-industrial-950/80 backdrop-blur-sm text-white text-[8px] font-black uppercase px-2 py-1">
                                            {rel.model}
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h4 className="text-sm font-black text-industrial-950 group-hover:text-accent-premium transition-colors uppercase leading-tight mb-2 flex-1">
                                            {rel.name}
                                        </h4>
                                        <div className="flex items-center justify-between text-[10px] font-bold text-industrial-400 uppercase tracking-widest text-industrial-400">
                                            <span>Ver Detalhes</span>
                                            <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA mobile sticky */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-industrial-200 p-4 pb-safe md:hidden shadow-2xl" aria-label="Ações de solicitação">
                <a
                    href={`https://wa.me/556235761988?text=Olá! Tenho interesse no produto ${product.name} (${product.model}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-industrial-950 text-white font-black uppercase tracking-widest h-16 w-full transition-all active:scale-95 shadow-xl shadow-industrial-950/20"
                >
                    <MessageCircle className="size-6" />
                    SOLICITAR COTAÇÃO AGORA
                </a>
            </div>

            <Footer />
        </main>
    )
}
