import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calculator, FileText } from "lucide-react"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-premium/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-accent-industrial/10 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex flex-col items-center justify-center text-center">
                        {/* Logo Gigante da Capa */}
                        <svg viewBox="0 0 500 200" className="h-32 md:h-48 mb-10 fill-accent-premium lg:fill-white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10,20 h80 c25,0 45,15 45,40 c0,15 -10,25 -20,30 c15,5 25,18 25,35 c0,25 -20,45 -50,45 h-80 v-150 z m35,30 v30 h40 c10,0 20,-5 20,-15 c0,-10 -10,-15 -20,-15 h-40 z m0,60 v30 h45 c15,0 25,-8 25,-15 c0,-10 -10,-15 -25,-15 h-45 z" />
                            <path d="M160,105 l20,-30 h-15 c-10,0 -15,-5 -15,-15 c0,-15 15,-15 25,-15 h30 l-25,-25 h-35 c-25,0 -45,15 -45,45 c0,20 15,35 30,40 z" />
                            <path d="M220,105 l40,-40 h-20 c-15,0 -20,-5 -20,-15 c0,-10 10,-15 20,-15 h35 l15,-15 h-80 c-25,0 -40,20 -40,40 c0,25 20,35 40,45 z" />
                            <path d="M250,20 h80 c25,0 45,15 45,40 c0,15 -10,25 -20,30 c15,5 25,18 25,35 c0,25 -20,45 -50,45 h-80 v-150 z m35,30 v30 h40 c10,0 20,-5 20,-15 c0,-10 -10,-15 -20,-15 h-40 z m0,60 v30 h45 c15,0 25,-8 25,-15 c0,-10 -10,-15 -25,-15 h-45 z" />
                        </svg>

                        <h1 className="text-4xl md:text-6xl font-light tracking-wide text-industrial-200 mb-12">
                            Soluções de <span className="font-bold text-white">iluminação</span>
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button className="bg-accent-premium text-black hover:bg-accent-premium/90 font-bold uppercase tracking-widest rounded-none h-14 px-8 w-full sm:w-auto gap-2 group">
                            <Calculator className="size-5" />
                            SOLICITE SEU ORÇAMENTO
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button className="bg-transparent border border-industrial-600 text-white hover:bg-white/5 font-bold uppercase tracking-widest rounded-none h-14 px-8 w-full sm:w-auto gap-2">
                            <FileText className="size-5" />
                            VER CATÁLOGO COMPLETO
                        </Button>
                    </div>
                </div>

                {/* Imagem Principal ou Vídeo em Destaque */}
                <div className="max-w-5xl mx-auto mt-16 relative">
                    <div className="aspect-[21/9] rounded-none overflow-hidden bg-industrial-900 border border-industrial-800 shadow-2xl relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <span className="text-industrial-600 font-extrabold uppercase tracking-widest text-xl">
                                E-COMMERCE B&B EM CONSTRUÇÃO
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
