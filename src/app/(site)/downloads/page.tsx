import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getCatalogs } from "@/lib/data"
import { DownloadGrid } from "./DownloadGrid"
import { FileText, ShieldCheck, Download } from "lucide-react"

export const metadata = {
    title: "Downloads de Catálogos Corporativos | B&B Indústria",
    description: "Baixe nossos catálogos técnicos em PDF. Soluções completas em postes metálicos e iluminação LED para seu projeto.",
}

export default async function DownloadsPage() {
    const catalogs = await getCatalogs()

    return (
        <div className="flex flex-col min-h-screen bg-industrial-50">
            <Header />
            
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header da Página */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                            <FileText className="size-4 text-accent-dark" />
                            Área Técnica e Comercial
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-industrial-950 uppercase tracking-tighter leading-none mb-6">
                            Catálogos <span className="text-accent-premium">Corporativos</span>
                        </h1>
                        <p className="text-industrial-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Acesse as especificações técnicas completas dos nossos produtos. 
                            Soluções certificadas para projetos de infraestrutura de alto nível.
                        </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                        {[
                            { title: "Dados Seguros", desc: "Suas informações estão protegidas conforme LGPD.", icon: <ShieldCheck className="size-6" /> },
                            { title: "Especificações NBR", desc: "Desenhos técnicos e dimensões oficiais.", icon: <FileText className="size-6" /> },
                            { title: "Download em PDF", desc: "Versão otimizada para visualização digital.", icon: <Download className="size-6" /> },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 bg-white border border-industrial-200">
                                <div className="size-12 bg-industrial-950 text-accent-premium flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase text-xs tracking-widest mb-2">{item.title}</h3>
                                <p className="text-industrial-500 text-xs font-bold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Catálogos Grid */}
                    {catalogs.length > 0 ? (
                        <DownloadGrid catalogs={catalogs} />
                    ) : (
                        <div className="text-center py-20 bg-white border-2 border-dashed border-industrial-300 max-w-3xl mx-auto">
                            <FileText className="size-16 text-industrial-300 mx-auto mb-4" />
                            <h2 className="text-xl font-black text-industrial-400 uppercase tracking-widest">Nenhum catálogo disponível no momento</h2>
                            <p className="text-industrial-400 text-sm mt-2">Estamos atualizando nossos materiais técnicos.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
