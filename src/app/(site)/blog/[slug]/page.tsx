import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getBlogPostBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Script from "next/script"
import { Calendar, User, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": post.title,
          "description": post.summary,
          "image": post.image,
          "datePublished": post.date,
          "dateModified": post.date, // Assumindo mesma data caso não tenha update
          "author": {
            "@id": `https://bebiluminacao.com.br/#person-${post.author.replace(/\s+/g, '-').toLowerCase()}`
          },
          "publisher": {
            "@id": "https://bebiluminacao.com.br/#organization"
          }
        },
        {
          "@type": "Person",
          "@id": `https://bebiluminacao.com.br/#person-${post.author.replace(/\s+/g, '-').toLowerCase()}`,
          "name": post.author,
          "jobTitle": "Especialista em Iluminação",
          "worksFor": {
            "@id": "https://bebiluminacao.com.br/#organization"
          }
        }
      ]
    };

    return (
        <main className="min-h-screen bg-background text-industrial-950 font-sans">
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            
            {/* Hero do Post */}
            <article className="pt-32 pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-accent-dark font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all mb-12">
                        <ArrowLeft className="size-4" /> Voltar ao Blog
                    </Link>

                    <header className="max-w-4xl mb-12 md:mb-16">
                        <div className="flex flex-wrap items-center gap-4 text-industrial-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="bg-accent-premium/10 text-accent-dark px-3 py-1 rounded-full">Artigo Técnico</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="size-3 md:size-4" /> {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="size-3 md:size-4" /> {post.author}
                            </div>
                        </div>
                        <h1 className="responsive-title mb-8 text-industrial-950">
                            {post.title}
                        </h1>
                        <p className="responsive-summary text-industrial-600">
                            {post.summary}
                        </p>
                    </header>

                    {/* Imagem de Capa */}
                    {post.image && (
                        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-industrial-200 mb-12 md:mb-16 shadow-2xl">
                            <Image 
                                src={post.image} 
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Conteúdo Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
                        <div className="lg:col-span-8">
                            <div 
                                className="prose-industrial max-w-none overflow-x-hidden"
                                dangerouslySetInnerHTML={{ __html: post.bodyHtml || `<p className="text-industrial-400">Conteúdo técnico em processamento...</p>` }} 
                            />

                            {/* Seção de FAQ */}
                            {post.faqs && post.faqs.length > 0 && (
                                <section className="mt-24 p-8 md:p-12 bg-industrial-50 border border-industrial-200 rounded-3xl">
                                    <h2 className="text-3xl font-black font-outfit uppercase tracking-tight mb-12 flex items-center gap-4">
                                        <div className="w-2 h-8 bg-accent-premium"></div>
                                        Perguntas Frequentes
                                    </h2>
                                    <div className="space-y-8">
                                        {post.faqs.map((faq: any, i: number) => (
                                            <div key={i} className="space-y-4">
                                                <h3 className="text-xl font-bold text-accent-dark flex items-start gap-3">
                                                    <CheckCircle2 className="size-6 shrink-0 mt-0.5" />
                                                    {faq.question}
                                                </h3>
                                                <p className="text-industrial-600 leading-relaxed pl-9 text-lg">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar / Autor */}
                        <aside className="lg:col-span-4 space-y-12">
                            <div className="sticky top-32 p-8 bg-white border border-industrial-200 rounded-3xl shadow-xl shadow-industrial-900/5">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-industrial-400 mb-6">Autoridade Técnica</h4>
                                <div className="space-y-4">
                                    <div className="size-16 bg-accent-premium rounded-2xl flex items-center justify-center text-black font-black text-2xl">
                                        LB
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-bold text-industrial-900">{post.author}</h5>
                                        <p className="text-industrial-500 text-sm">Especialista em Iluminação Estrutural</p>
                                    </div>
                                    <p className="text-industrial-600 text-sm leading-relaxed pt-4 border-t border-industrial-100">
                                        Engenheiro responsável pela curadoria técnica da B&B, garantindo que cada artigo siga rigorosamente as normas NBR vigentes.
                                    </p>
                                </div>
                                <Link href="/contato" className="mt-8 w-full py-4 bg-accent-premium text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center hover:bg-industrial-900 hover:text-white transition-colors">
                                    SOLICITAR CONSULTORIA
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    )
}
