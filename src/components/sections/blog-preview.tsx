import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

import { Post } from "@/lib/data"
import Image from "next/image"

interface BlogPreviewProps {
    posts?: Post[]
}

export function BlogPreview({ posts = [] }: BlogPreviewProps) {
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
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <Link key={index} href={`/blog/${post.slug}`} className="group space-y-6">
                                <div className="aspect-[16/10] bg-industrial-900 border border-industrial-800 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-accent-premium/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <span className="text-black bg-accent-premium px-4 py-2 font-bold uppercase tracking-widest text-xs">Leia Mais</span>
                                    </div>
                                    
                                    {post.image ? (
                                        <Image 
                                            src={post.image} 
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-industrial-700 font-bold uppercase tracking-widest text-xs p-4 text-center">
                                            {post.title}
                                        </div>
                                    )}
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
                                        {post.summary}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center border border-dashed border-industrial-800 rounded-xl">
                             <p className="text-industrial-500 font-outfit uppercase tracking-widest">Iniciando Sala de Redação... Novas pautas em breve.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
