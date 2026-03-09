import { Header } from "@/components/layout/header"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <main className="min-h-screen bg-industrial-950 pt-24 text-white">
            <Header />
            <article className="container mx-auto px-4 max-w-4xl py-12">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">Título do Post: {slug}</h1>
                    <div className="flex items-center gap-4 text-industrial-400 text-sm">
                        <span>Postado em 08 de Março, 2026</span>
                        <span>•</span>
                        <span>Categoria: Dicas de Iluminação</span>
                    </div>
                </header>

                <div className="prose prose-invert prose-industrial max-w-none">
                    {/* Conteúdo vindo do Payload CMS Lexical Editor */}
                    <p>O conteúdo do blog será renderizado aqui com suporte a imagens otimizadas e links internos.</p>
                </div>
            </article>
        </main>
    )
}
