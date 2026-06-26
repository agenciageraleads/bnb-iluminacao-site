export const dynamic = 'force-dynamic'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getCatalogs } from "@/lib/data"
import { DownloadsExplorer } from "./DownloadsExplorer"
import { FileText } from "lucide-react"

export const metadata = {
    title: "Downloads de Catálogos Corporativos | B&B Indústria",
    description: "Baixe nossos catálogos, guias comerciais e datasheets técnicos em PDF. Desenhos cotados por altura das linhas de postes metálicos e iluminação LED.",
}

export default async function DownloadsPage() {
    const catalogs = await getCatalogs()

    return (
        <div className="flex flex-col min-h-screen bg-industrial-50">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Hero */}
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                            <FileText className="size-4 text-accent-dark" />
                            Área Técnica e Comercial
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-industrial-950 uppercase tracking-tighter leading-none mb-5">
                            Downloads <span className="text-accent-premium">B&amp;B</span>
                        </h1>
                        <p className="text-industrial-500 text-lg font-medium max-w-2xl mx-auto">
                            Catálogos, guias comerciais e o detalhamento técnico completo das nossas linhas — datasheets e desenhos cotados por altura, em PDF.
                        </p>
                    </div>

                    <DownloadsExplorer catalogs={catalogs} />
                </div>
            </main>

            <Footer />
        </div>
    )
}
