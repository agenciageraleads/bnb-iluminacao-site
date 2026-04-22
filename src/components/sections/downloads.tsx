import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import Link from "next/link"
import { Catalog } from "@/lib/data"

interface DownloadsProps {
    catalogs?: Catalog[]
}

export function Downloads({ catalogs = [] }: DownloadsProps) {
    // Pegar os 2 primeiros catálogos ou usar placeholders se não houver nenhum
    const displayedCatalogs = catalogs.length > 0 ? catalogs.slice(0, 2) : [];

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
                        {displayedCatalogs.length > 0 ? (
                            displayedCatalogs.map((catalog) => (
                                <div key={catalog.id} className="bg-industrial-950 p-8 border border-industrial-800 hover:border-accent-premium transition-colors space-y-6 group w-full sm:w-72">
                                    <div className="size-16 bg-industrial-900 border border-industrial-800 flex items-center justify-center group-hover:bg-accent-premium transition-colors">
                                        <FileText className="size-8 text-accent-premium group-hover:text-black transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-1 uppercase tracking-tight line-clamp-1">{catalog.title}</h3>
                                        <p className="text-industrial-500 text-sm italic">{catalog.category}</p>
                                    </div>
                                    <Button asChild className="w-full bg-industrial-800 text-white hover:bg-accent-premium hover:text-black font-bold uppercase tracking-widest rounded-none gap-2">
                                        <Link href="/downloads">
                                            <Download className="size-4" />
                                            Download
                                        </Link>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            // Placeholder caso não existam catálogos no CMS ainda
                            [1, 2].map((i) => (
                                <div key={i} className="bg-industrial-950 p-8 border border-industrial-800 opacity-50 space-y-6 w-full sm:w-72">
                                    <div className="size-16 bg-industrial-900 border border-industrial-800 flex items-center justify-center">
                                        <FileText className="size-8 text-industrial-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-industrial-600 font-bold text-xl mb-1 uppercase tracking-tight">Catálogo {i}</h3>
                                        <p className="text-industrial-700 text-sm text-balance tracking-[0.2em] font-black uppercase">EM BREVE</p>
                                    </div>
                                    <Button disabled className="w-full bg-industrial-800 text-industrial-600 font-bold uppercase tracking-widest rounded-none gap-2 cursor-not-allowed">
                                        <Download className="size-4" />
                                        Indisponível
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
