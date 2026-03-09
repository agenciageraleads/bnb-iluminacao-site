import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

export function Downloads() {
    return (
        <section className="py-24 bg-industrial-900 border-y border-industrial-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-premium/10 border border-accent-premium/20 text-accent-premium text-xs font-bold tracking-widest uppercase">
                            Arquivos Técnicos
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            BAIXE NOSSOS <br /> <span className="text-accent-premium">CATÁLOGOS</span>
                        </h2>
                        <p className="text-industrial-400 text-lg leading-relaxed max-w-xl">
                            Tenha em mãos todas as especificações técnicas, dimensões e detalhes das nossas linhas de produtos para facilitar seu projeto.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
                        <div className="bg-industrial-950 p-8 border border-industrial-800 hover:border-accent-premium transition-colors space-y-6 group w-full sm:w-72">
                            <div className="size-16 bg-industrial-900 border border-industrial-800 flex items-center justify-center group-hover:bg-accent-premium transition-colors">
                                <FileText className="size-8 text-accent-premium group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl mb-1 uppercase tracking-tight">Postes e Braços</h3>
                                <p className="text-industrial-500 text-sm">Versão 2024 • PDF • 12MB</p>
                            </div>
                            <Button className="w-full bg-industrial-800 text-white hover:bg-accent-premium hover:text-black font-bold uppercase tracking-widest rounded-none gap-2">
                                <Download className="size-4" />
                                Download
                            </Button>
                        </div>

                        <div className="bg-industrial-950 p-8 border border-industrial-800 hover:border-accent-premium transition-colors space-y-6 group w-full sm:w-72">
                            <div className="size-16 bg-industrial-900 border border-industrial-800 flex items-center justify-center group-hover:bg-accent-premium transition-colors">
                                <FileText className="size-8 text-accent-premium group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl mb-1 uppercase tracking-tight">Linha Garden</h3>
                                <p className="text-industrial-500 text-sm">Versão 2024 • PDF • 8MB</p>
                            </div>
                            <Button className="w-full bg-industrial-800 text-white hover:bg-accent-premium hover:text-black font-bold uppercase tracking-widest rounded-none gap-2">
                                <Download className="size-4" />
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
