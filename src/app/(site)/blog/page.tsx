import { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { getBlogPosts, Post } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, Anchor, BookOpen, Lightbulb, Paintbrush, Ruler, Zap } from "lucide-react"
import { unstable_noStore as noStore } from "next/cache"

export const metadata: Metadata = {
    title: "Blog | Dicas e Guias de Iluminação | B&B Iluminação",
    description: "Acompanhe artigos técnicos, dicas de instalação e novidades sobre postes metálicos, iluminação externa e engenharia industrial.",
    alternates: {
        canonical: "https://bebiluminacao.com.br/blog",
    }
}

export const dynamic = 'force-dynamic'

const featuredGuides = [
    {
        title: "Qual Poste B&B para Cada Aplicacao",
        summary:
            "Guia de decisao pelas 7 linhas B&B (Urban, Orna, Versa, Forza, Vigia, Nexo e Civis): a linha certa por aplicacao, com codigos para cotar.",
        href: "/blog/qual-poste-para-cada-aplicacao",
        image: "/images/produtos/poste-curvo-duplo-avenida-dia.png",
        date: "27/07/2026",
        tier: "Guia tecnico P0",
        icon: Lightbulb,
    },
    {
        title: "Altura de Poste para Iluminacao Publica",
        summary:
            "Guia tecnico para orientar altura por aplicacao, via, luminaria, braco, fixacao e dados para orcamento.",
        href: "/blog/altura-de-poste-para-iluminacao-publica",
        image: "/images/seo/postes-metalicos/via-publica-postes-retos-dois-lados.jpg",
        date: "14/06/2026",
        tier: "Guia tecnico P0",
        icon: Ruler,
    },
    {
        title: "Normas para Postes de Iluminacao Publica",
        summary:
            "Guia autoral para organizar normas, memoriais, padroes locais e documentos antes da cotacao tecnica.",
        href: "/blog/normas-para-postes-de-iluminacao",
        image: "/images/seo/postes-metalicos/rua-iluminada-poste-curvo.jpg",
        date: "14/06/2026",
        tier: "Guia tecnico P0",
        icon: BookOpen,
    },
    {
        title: "Poste Galvanizado ou Pintado",
        summary:
            "Comparativo tecnico para escolher acabamento por ambiente, durabilidade, visual, memorial e prazo.",
        href: "/blog/poste-galvanizado-ou-pintado",
        image: "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg",
        date: "14/06/2026",
        tier: "Guia tecnico P0",
        icon: Paintbrush,
    },
    {
        title: "Poste Teleconico ou Reto",
        summary:
            "Guia para entender nomenclatura, geometria, avanco de luminaria e modelo correto antes da cotacao.",
        href: "/blog/poste-teleconico-ou-reto",
        image: "/images/produtos/poste-reto-avenida-dia.png",
        date: "14/06/2026",
        tier: "Guia tecnico P0",
        icon: Zap,
    },
    {
        title: "Poste Flangeado ou Engastado",
        summary:
            "Comparativo para alinhar fixacao, base, chumbadores, fundacao e dados de cotacao antes da compra.",
        href: "/blog/poste-flangeado-ou-engastado",
        image: "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg",
        date: "14/06/2026",
        tier: "Guia tecnico P1",
        icon: Anchor,
    },
]

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

                <section className="mb-14 grid gap-5">
                    {featuredGuides.map((guide) => {
                        const Icon = guide.icon

                        return (
                            <Link
                                key={guide.href}
                                href={guide.href}
                                className="group grid overflow-hidden border border-industrial-200 bg-white transition-colors hover:border-industrial-950 lg:grid-cols-[0.9fr_1.1fr] rounded-2xl"
                            >
                                <div className="relative min-h-[280px] bg-industrial-100">
                                    <Image
                                        src={guide.image}
                                        alt={guide.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(min-width: 1024px) 45vw, 100vw"
                                    />
                                </div>
                                <div className="flex flex-col justify-center p-8 md:p-10">
                                    <div className="mb-5 inline-flex w-fit items-center gap-3 bg-industrial-950 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white rounded-md">
                                        <Icon className="size-4 text-accent-premium" aria-hidden="true" />
                                        {guide.tier}
                                    </div>
                                    <div className="mb-4 flex items-center gap-3 text-industrial-500 text-[10px] font-bold uppercase tracking-widest">
                                        <Calendar className="size-3 text-accent-premium" />
                                        {guide.date}
                                    </div>
                                    <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950 transition-colors group-hover:text-accent-dark md:text-5xl">
                                        {guide.title}
                                    </h2>
                                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-industrial-600">
                                        {guide.summary}
                                    </p>
                                    <span className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-industrial-700">
                                        Ler guia tecnico
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </section>

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
                                        <span className="bg-accent-premium text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md">Técnico</span>
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
