"use client"

import { Header } from "@/components/layout/header"
import { 
    BookOpen, 
    ArrowLeft, 
    CheckCircle2, 
    AlertTriangle, 
    Zap, 
    ShieldCheck, 
    Maximize2, 
    Palette,
    Info,
    ArrowRight,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function ProductImageCarousel({ images, title }: { images: string[], title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="aspect-square w-full bg-industrial-100 relative overflow-hidden group">
            {images.map((img, idx) => (
                <img
                    key={img}
                    src={img}
                    alt={`${title} - foto ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain p-4 transition-all duration-500 transform ${
                        idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGNUY1RjUiLz48cGF0aCBkPSJNNTAgMjVMNTAgNzVNMjUgNTBMNzUgNTAiIHN0cm9rZT0iI0QxRDVEQiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/20 to-transparent" />

            {images.length > 1 && (
                <>
                    {/* Contador de Fotos */}
                    <div className="absolute top-4 right-4 bg-industrial-950/80 text-accent-premium text-[10px] font-black px-2 py-1 tracking-widest uppercase backdrop-blur-sm z-20">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Controles de Navegação */}
                    <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 size-10 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-30"
                    >
                        <ChevronLeft className="size-6" />
                    </button>
                    <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-30"
                    >
                        <ChevronRight className="size-6" />
                    </button>

                    {/* Dots Indicadores */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                        {images.map((_, idx) => (
                            <div 
                                key={idx}
                                className={`h-1 transition-all duration-300 ${
                                    idx === currentIndex ? 'w-6 bg-accent-premium' : 'w-2 bg-white/30'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default function ProductTrainingPage() {
    const productTypes = [
        {
            title: "Telecônico Reto",
            use: "Ruas internas, condomínios, estacionamentos.",
            pitch: "É o mais versátil, atende praticamente qualquer projeto.",
            images: ["/treinamento/produtos/reto.jpg", "/treinamento/produtos/reto-2.jpg"]
        },
        {
            title: "Telecônico Curvo",
            use: "Avenidas, praças, projetos urbanos.",
            pitch: "Ajuda a direcionar melhor a luz e valoriza o visual.",
            images: ["/treinamento/produtos/curvo.jpg"]
        },
        {
            title: "Poste Girafa (LED)",
            use: "Praças modernas, alto padrão.",
            pitch: "Solução pronta, estética diferenciada com LED integrado.",
            images: ["/treinamento/produtos/girafa.webp"]
        },
        {
            title: "Refletor (Cruzeta)",
            use: "Quadras, campos, estacionamentos grandes.",
            pitch: "Ideal para iluminação forte e distribuída.",
            images: ["/treinamento/produtos/refletor.png"]
        },
        {
            title: "Poste para Câmera",
            use: "Segurança de condomínios e empresas.",
            pitch: "Preparado para segurança, evita gambiarras.",
            images: ["/treinamento/produtos/camera.webp"]
        },
        {
            title: "Poste Solar",
            use: "Locais sem rede, áreas rurais, sustentabilidade.",
            pitch: "Resolve iluminação sem depender de energia elétrica.",
            images: ["/treinamento/produtos/solar.webp"]
        }
    ]

    const finishings = [
        {
            type: "Galvanizado a Fogo",
            durability: "Alta resistência à corrosão.",
            warranty: "10 Anos",
            usp: "Ideal para quem quer durabilidade e zero manutenção."
        },
        {
            type: "Pintado (Eletrostática)",
            durability: "Estética refinada e cores variadas.",
            warranty: "5 Anos",
            usp: "Quando o visual do projeto arquitetônico é prioridade."
        }
    ]

    return (
        <main className="min-h-screen bg-industrial-50 pb-20">
            <Header />

            {/* Header */}
            <section className="pt-32 pb-16 bg-industrial-900 text-white relative">
                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/treinamento" className="inline-flex items-center gap-2 text-accent-premium text-xs font-bold uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft className="size-4" />
                        Voltar ao Dashboard
                    </Link>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-12 bg-accent-premium flex items-center justify-center">
                            <BookOpen className="size-7 text-industrial-950" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                            Guia Técnico de <span className="text-accent-premium">Produtos</span>
                        </h1>
                    </div>
                    <p className="text-industrial-400 text-lg max-w-3xl leading-relaxed">
                        Entenda as especificações de cada poste para indicar a solução correta para cada cenário de obra.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-12 space-y-20">
                
                {/* Tipos de Postes */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black uppercase text-industrial-950 flex items-center gap-3">
                            <Zap className="text-accent-premium" />
                            1. Portfólio Comercial
                        </h2>
                        <span className="hidden md:block text-[10px] font-bold text-industrial-400 uppercase tracking-widest bg-industrial-100 px-3 py-1">6 Categorias Principais</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productTypes.map((product) => (
                            <div key={product.title} className="bg-white border border-industrial-200 group hover:border-accent-premium transition-all shadow-sm flex flex-col overflow-hidden">
                                <ProductImageCarousel images={product.images} title={product.title} />
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                                    <div>
                                        <h3 className="text-xl font-black uppercase text-industrial-900 mb-4 pb-2 border-b-2 border-accent-premium tracking-tight">
                                            {product.title}
                                        </h3>
                                        <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest mb-1">Onde Usar:</p>
                                        <p className="text-industrial-700 text-sm font-medium">{product.use}</p>
                                    </div>
                                    <div className="bg-industrial-50 p-3 border-l-2 border-industrial-300 group-hover:border-accent-premium group-hover:bg-accent-premium/5 transition-all">
                                        <p className="text-[10px] font-bold text-industrial-500 uppercase tracking-[0.2em] mb-1">Pitch de Venda:</p>
                                        <p className="text-industrial-900 text-xs font-bold leading-relaxed italic">
                                            "{product.pitch}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Acabamentos */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-black uppercase text-industrial-950 flex items-center gap-3">
                        <Palette className="text-accent-premium" />
                        2. Acabamento e Durabilidade
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {finishings.map((finish) => (
                            <div key={finish.type} className="bg-white border border-industrial-200 p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 py-1 px-4 bg-industrial-950 text-accent-premium text-[10px] font-black tracking-widest uppercase">
                                    Garantia: {finish.warranty}
                                </div>
                                <h3 className="text-xl font-black uppercase text-industrial-950 mb-6">{finish.type}</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="size-5 text-green-600 shrink-0" />
                                        <p className="text-industrial-700 text-sm leading-relaxed">{finish.durability}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Info className="size-5 text-industrial-400 shrink-0" />
                                        <p className="text-industrial-700 text-sm leading-relaxed font-bold">{finish.usp}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-industrial-50 border border-industrial-100 text-xs text-industrial-500 italic">
                                    Nota: A escolha do acabamento impacta diretamente no prazo de manutenção da obra.
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Fixação e Altura */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h2 className="text-2xl font-black uppercase text-industrial-950 flex items-center gap-3">
                            <Maximize2 className="text-accent-premium" />
                            3. Tipos de Fixação
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-white border border-industrial-200 border-t-4 border-t-industrial-400 shadow-sm">
                                <h4 className="font-black uppercase text-industrial-900 mb-2">Engastado</h4>
                                <p className="text-xs text-industrial-500 leading-relaxed mb-4">Enterrado direto no solo. Mais econômico e comum.</p>
                                <span className="text-[10px] bg-industrial-100 px-2 py-1 font-bold text-industrial-600 uppercase tracking-widest">Padrão de Obra</span>
                            </div>
                            <div className="p-6 bg-white border border-industrial-200 border-t-4 border-t-accent-premium shadow-sm">
                                <h4 className="font-black uppercase text-industrial-900 mb-2">Flangeado</h4>
                                <p className="text-xs text-industrial-500 leading-relaxed mb-4">Base com parafusos fixada em concreto. Prático para manutenção.</p>
                                <span className="text-[10px] bg-accent-premium/20 px-2 py-1 font-bold text-industrial-900 uppercase tracking-widest">Premium/Manutenção</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-2xl font-black uppercase text-industrial-950 flex items-center gap-3">
                            <Maximize2 className="text-accent-premium" />
                            4. Alturas Padrão
                        </h2>
                        
                        <div className="bg-industrial-950 text-white p-8 rounded-none border-r-4 border-r-accent-premium">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-industrial-800">
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-industrial-500">Medida</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-industrial-500">Aplicação Ideal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-industrial-900">
                                        <td className="py-4 font-bold text-accent-premium">3m a 6m</td>
                                        <td className="py-4 text-sm text-industrial-300">Áreas pequenas / Internas</td>
                                    </tr>
                                    <tr className="border-b border-industrial-900">
                                        <td className="py-4 font-bold text-accent-premium">7m a 10m</td>
                                        <td className="py-4 text-sm text-industrial-300">Ruas / Condomínios</td>
                                    </tr>
                                    <tr className="border-b border-industrial-900">
                                        <td className="py-4 font-bold text-accent-premium">11m a 15m</td>
                                        <td className="py-4 text-sm text-industrial-300">Avenidas / Grandes Áreas</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Qualificação de Cenário */}
                <section className="bg-industrial-200 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="size-20 bg-industrial-950 flex items-center justify-center shrink-0">
                            <ShieldCheck className="size-10 text-accent-premium" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black uppercase text-industrial-950">A Regra de Ouro Técnica</h2>
                            <p className="text-industrial-700 font-medium leading-relaxed max-w-3xl">
                                "O produto certo depende do cenário, não do gosto." Antes de indicar qualquer modelo, SEMPRE faça as 3 perguntas matadoras:
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white px-4 py-3 border border-industrial-300 text-xs font-black uppercase tracking-widest text-industrial-900">1. Onde vai ser usado?</div>
                                <div className="bg-white px-4 py-3 border border-industrial-300 text-xs font-black uppercase tracking-widest text-industrial-900">2. É mais funcional ou estético?</div>
                                <div className="bg-white px-4 py-3 border border-industrial-300 text-xs font-black uppercase tracking-widest text-industrial-900">3. Já tem projeto definido?</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Botão de Fechamento */}
                <div className="text-center pt-8">
                    <Link 
                        href="/treinamento"
                        className="inline-flex items-center gap-3 bg-industrial-950 text-white h-16 px-10 font-black uppercase tracking-widest text-xs hover:bg-accent-premium hover:text-industrial-950 transition-all shadow-xl"
                    >
                        Concluir Treinamento
                        <ArrowRight className="size-5" />
                    </Link>
                </div>

            </div>
        </main>
    )
}
