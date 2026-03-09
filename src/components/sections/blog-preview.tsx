import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

const recentPosts = [
    {
        title: "Vantagens da Galvanização a Fogo em Postes Metálicos",
        excerpt: "Entenda por que a galvanização é essencial para a durabilidade em regiões litorâneas e úmidas.",
        date: "05 Mar 2026",
        slug: "vantagens-galvanizacao-fogo",
        image: "/images/blog-1.jpg"
    },
    {
        title: "Iluminação LED: O Futuro da Eficiência Urbana",
        excerpt: "Como as novas tecnologias de LED estão transformando a iluminação de vias públicas e reduzindo custos.",
        date: "28 Fev 2026",
        slug: "iluminacao-led-futuro",
        image: "/images/blog-2.jpg"
    },
    {
        title: "Tendências em Iluminação Decorativa para 2026",
        excerpt: "Conheça os designs que estarão em alta para projetos residenciais e comerciais de luxo.",
        date: "20 Fev 2026",
        slug: "tendencias-iluminacao-2026",
        image: "/images/blog-3.jpg"
    }
]

export function BlogPreview() {
    return (
        <section className="py-24 bg-industrial-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none">
                            NOSSO <br /> <span className="text-accent-premium">BLOG</span>
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium"></div>
                    </div>
                    <Link href="/blog" className="text-accent-premium font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b border-accent-premium/20">
                        VER TODAS AS NOTÍCIAS <ArrowRight className="size-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentPosts.map((post, index) => (
                        <Link key={index} href={`/blog/${post.slug}`} className="group space-y-6">
                            <div className="aspect-[16/10] bg-industrial-900 border border-industrial-800 overflow-hidden relative">
                                <div className="absolute inset-0 bg-accent-premium/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <span className="text-black bg-accent-premium px-4 py-2 font-bold uppercase tracking-widest text-xs">Leia Mais</span>
                                </div>
                                {/* Placeholder for Image */}
                                <div className="w-full h-full flex items-center justify-center text-industrial-700 font-bold uppercase tracking-widest text-xs">
                                    Preview Imagem
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-industrial-500 text-xs font-bold uppercase tracking-widest">
                                    <Calendar className="size-4" />
                                    {post.date}
                                </div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-accent-premium transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-industrial-400 line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
