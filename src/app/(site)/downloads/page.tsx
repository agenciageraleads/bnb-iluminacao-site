import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FileText } from "lucide-react"
import { DownloadsTabs } from "./DownloadsTabs"

export const metadata = {
    title: "Downloads de Catálogos e Datasheets Técnicos | B&B Iluminação",
    description:
        "Baixe catálogos, guias comerciais, datasheets e desenhos técnicos cotados por altura da B&B. Soluções metálicas para urbanismo com documentação para especificação.",
}

export default function DownloadsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-industrial-50">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Hero */}
                    <div className="max-w-4xl mx-auto text-center mb-9">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6 rounded-full">
                            <FileText className="size-4 text-accent-dark" />
                            Área Técnica e Comercial
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-display text-industrial-950 uppercase tracking-tighter leading-none mb-5">
                            Downloads <span className="text-accent-dark">B&amp;B</span>
                        </h1>
                        <p className="text-industrial-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Catálogos, guias comerciais e o detalhamento técnico completo das nossas
                            linhas — datasheets e desenhos cotados por altura, em PDF.
                        </p>
                    </div>

                    <DownloadsTabs />
                </div>
            </main>

            <Footer />
        </div>
    )
}
