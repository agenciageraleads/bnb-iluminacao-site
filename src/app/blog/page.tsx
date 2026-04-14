import { Header } from "@/components/layout/header"

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-industrial-950 pt-24 text-white">
            <Header />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold font-outfit mb-8">Blog — <span className="text-accent-premium">B&B Iluminação</span></h1>
                <p className="text-industrial-400 mb-12">Dicas, guias e as últimas notícias do setor de iluminação.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Posts serão renderizados aqui dinamicamente do Payload CMS */}
                    <div className="p-6 rounded-xl border border-white/5 bg-industrial-900/40">
                        <div className="h-48 bg-industrial-800 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-industrial-600">Imagem do Post</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Título do Post</h2>
                        <p className="text-industrial-500 text-sm mb-4">Breve descrição do conteúdo do artigo para SEO...</p>
                        <button className="text-accent-premium font-bold hover:underline">LER MAIS</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
