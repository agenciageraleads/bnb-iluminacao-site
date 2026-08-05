export const dynamic = 'force-dynamic'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getCatalogs } from "@/lib/data"
import { DownloadsTabs } from "./DownloadsTabs"
import { FileText, ShieldCheck, Download } from "lucide-react"

export const metadata = {
    title: "Downloads de Catálogos Técnicos | B&B Iluminação",
    description: "Baixe catálogos, datasheets e desenhos técnicos da B&B. Soluções metálicas para urbanismo com documentação para especificação.",
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6 rounded-full">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                        {[
                            { title: "Dados Seguros", desc: "Suas informações estão protegidas conforme LGPD.", icon: <ShieldCheck className="size-6" /> },
                            { title: "Especificações NBR", desc: "Desenhos técnicos e dimensões oficiais.", icon: <FileText className="size-6" /> },
                            { title: "Download em PDF", desc: "Versão otimizada para visualização digital.", icon: <Download className="size-6" /> },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 bg-white border border-industrial-200 rounded-2xl">
                                <div className="size-12 bg-industrial-950 text-accent-premium flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase text-xs tracking-widest mb-2">{item.title}</h3>
                                <p className="text-industrial-500 text-xs font-bold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <DownloadsTabs catalogs={catalogs} />
                </div>
            </main>

            <Footer />
        </div>
    )
}
