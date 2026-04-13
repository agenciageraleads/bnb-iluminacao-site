import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calculator, FileText, CheckCircle2 } from "lucide-react"
import { categories } from "@/lib/data"

export function Hero() {
    const featuredCategory = categories[0]

    return (
        <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-white">
            {/* Barra decorativa amarela no topo e elementos de fundo */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-[60%] h-full bg-accent-premium/5 -z-10 pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-4 sm:px-6 relative">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                    {/* Conteúdo textual — aparece primeiro em mobile */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="space-y-5">
                            {/* Badge de credibilidade */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase">
                                <span className="size-2 bg-accent-premium rounded-full animate-pulse" aria-hidden="true" />
                                Fabricação Própria • Goiânia, GO
                            </div>

                            {/* H1: text-balance evita widows. Tamanho responsivo real. */}
                            <h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-industrial-950 leading-[0.95] uppercase"
                                style={{ textWrap: "balance" } as React.CSSProperties}
                            >
                                ILUMINAÇÃO <br className="hidden sm:block" />
                                <span className="relative inline-block">
                                    INDUSTRIAL
                                    {/* Sublinhado decorativo amarelo */}
                                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent-premium" aria-hidden="true" />
                                </span>
                                <br /> DE ALTO IMPACTO
                            </h1>

                            <p className="text-industrial-500 text-base md:text-lg max-w-xl leading-relaxed">
                                Especialistas em postes metálicos, braços e soluções customizadas
                                para grandes obras, indústrias e projetos públicos em todo o Brasil.
                            </p>
                        </div>

                        {/* CTAs — empilhados em mobile (full-width), lado a lado em sm+ */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <Link
                                href="/contato"
                                className="flex items-center justify-center gap-2 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-900 font-black uppercase tracking-widest h-14 px-8 w-full sm:w-auto transition-colors group"
                                aria-label="Solicitar orçamento rápido"
                            >
                                <Calculator className="size-5" aria-hidden="true" />
                                Orçamento Rápido
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/downloads"
                                className="flex items-center justify-center gap-2 bg-white text-industrial-800 hover:bg-industrial-50 active:bg-industrial-100 border border-industrial-300 font-black uppercase tracking-widest h-14 px-8 w-full sm:w-auto transition-colors"
                                aria-label="Baixar catálogos em PDF"
                            >
                                <FileText className="size-5" aria-hidden="true" />
                                Catálogos PDF
                            </Link>
                        </div>

                        {/* Social proof — stats compactos */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-industrial-200">
                            {[
                                { label: "Projetos Entregues", value: "+5.000" },
                                { label: "Postes Fabricados", value: "+30.000" },
                                { label: "Anos no Mercado", value: "9+" },
                            ].map((stat, i) => (
                                <div key={i} className="accent-bar">
                                    <div className="text-industrial-950 font-black text-xl md:text-2xl">{stat.value}</div>
                                    <div className="text-industrial-500 text-[10px] uppercase font-bold tracking-wider leading-tight mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Trust indicators pequenos — mobile friendly */}
                        <div className="flex flex-wrap gap-3">
                            {["Galvanização NBR 6323", "Prazo Garantido", "Frota Própria"].map((item) => (
                                <div key={item} className="flex items-center gap-1.5 text-[11px] font-bold text-industrial-600 uppercase tracking-wide">
                                    <CheckCircle2 className="size-4 text-accent-dark shrink-0" aria-hidden="true" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual do produto — visível em TODOS os tamanhos (mobile também) */}
                    <div className="relative order-1 lg:order-2">
                        <div className="aspect-[4/3] sm:aspect-[4/4] bg-industrial-100 border border-industrial-200 relative overflow-hidden group">
                            <Image
                                src="/hero-main.png"
                                alt="Postes de Iluminação B&B"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* Borda amarela decorativa no canto */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent-premium" aria-hidden="true" />
                            <div className="absolute bottom-0 right-0 w-1 h-full bg-accent-premium" aria-hidden="true" />

                            {/* Hover overlay apenas em desktop (sem hover em mobile) */}
                            <div className="absolute inset-0 bg-industrial-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" aria-hidden="true" />
                        </div>

                        {/* Selo de qualidade — posicionado fora da imagem para ser legível em mobile */}
                        <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-left-6 bg-accent-premium text-black p-3 md:p-4 text-center shadow-md max-w-[120px] md:max-w-none">
                            <span className="font-black text-[9px] md:text-[11px] uppercase tracking-tight leading-tight block">
                                Executamos o seu<br />projeto de iluminação
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
