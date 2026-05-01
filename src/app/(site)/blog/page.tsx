import { Header } from "@/components/layout/header"
import { getBlogPosts, Post } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { unstable_noStore as noStore } from "next/cache"

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
    noStore();
    const posts = await getBlogPosts(12);

    return (
        <main className="min-h-screen bg-background pt-24 text-industrial-950">
            <Header />
            <div className="container mx-auto px-4 py-12">
                <header className="mb-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter text-industrial-950">
                        Blog — <span className="text-accent-premium">B&B Iluminação</span>
                    </h1>
                    <div className="w-32 h-2 bg-accent-premium"></div>
                    <p className="text-industrial-500 max-w-2xl text-lg">
                        Dicas, guias e as últimas notícias do setor de iluminação externa e engenharia industrial.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-white border border-industrial-200 rounded-2xl overflow-hidden hover:border-accent-premium/30 hover:shadow-xl hover:shadow-industrial-900/5 transition-all">
                                <div className="relative aspect-video overflow-hidden">
                                     {post.image ? (
                                        <Image 
                                            src={post.image} 
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-industrial-50 flex items-center justify-center p-6 text-center">
                                            <span className="text-industrial-400 text-[10px] font-bold uppercase tracking-widest">{post.title}</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-accent-premium text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest">Técnico</span>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 text-industrial-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                                        <Calendar className="size-3 text-accent-premium" />
                                        {post.date}
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 text-industrial-900 group-hover:text-accent-premium transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-industrial-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {post.summary}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-industrial-100 flex items-center justify-between">
                                        <span className="text-accent-dark text-xs font-bold uppercase tracking-widest group-hover:gap-3 flex items-center gap-2 transition-all">
                                            Ler Artigo Completo <ArrowRight className="size-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center border-2 border-dashed border-industrial-200 rounded-3xl">
                            <h3 className="text-industrial-400 font-outfit text-xl uppercase tracking-widest">Iniciando Sala de Redação...</h3>
                            <p className="text-industrial-500 mt-2">Nossos especialistas estão preparando o próximo conteúdo técnico.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
