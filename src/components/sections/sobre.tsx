import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Sobre() {
    return (
        <section className="bg-accent-premium py-20 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Lado Esquerdo: Imagem da Fábrica / Autoridade */}
                    <div className="relative order-2 lg:order-1">
                        <div className="aspect-video lg:aspect-square relative overflow-hidden border-[8px] border-white shadow-2xl">
                            <Image
                                src="https://picsum.photos/seed/sobre/1200/800" // Fábrica/Indústria
                                alt="Fábrica da B&B Iluminação"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Badge flutuante de autoridade */}
                        <div className="absolute -bottom-6 -right-6 md:translate-x-0 bg-industrial-950 text-white p-8 border-t-4 border-white shadow-2xl z-10 max-w-[200px] text-center">
                            <span className="text-4xl font-black block mb-1">09+</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest leading-tight block">
                                ANOS DE EXPERIÊNCIA <br /> NO MERCADO
                            </span>
                        </div>
                    </div>

                    {/* Lado Direito: Texto */}
                    <div className="order-1 lg:order-2 space-y-8">
                        <div className="space-y-4">
                            <p className="text-industrial-950 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-industrial-950"></span>
                                Sobre a B&B Iluminação
                            </p>
                            <h2 className="text-4xl md:text-6xl font-black text-industrial-950 uppercase leading-[0.9] tracking-tighter">
                                DESDE 1992 PROVENDO PRODUTOS DE <span className="text-white">EXCELÊNCIA</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-industrial-900">
                            <p className="text-lg md:text-xl font-bold leading-tight">
                                A B&B Iluminação é fabricante de Postes de Aço Telecônico e Cônico Contínuo, Luminárias Públicas e Decorativas em LED.
                            </p>
                            <p className="text-base leading-relaxed font-medium">
                                Com intuito de renovar o mercado de artigos de iluminação no Brasil, sempre utilizando matéria-prima de qualidade e acabamento de primeira linha, garantindo o que há de melhor no mercado para seus clientes e parceiros. Mais de 1.000 projetos entregues com sucesso.
                            </p>
                        </div>

                        <Link
                            href="/quem-somos"
                            className="inline-flex items-center gap-3 bg-industrial-950 text-white font-black uppercase tracking-widest px-8 h-14 hover:bg-industrial-800 active:scale-95 transition-all text-xs group"
                        >
                            CONHECER NOSSA HISTÓRIA
                            <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
