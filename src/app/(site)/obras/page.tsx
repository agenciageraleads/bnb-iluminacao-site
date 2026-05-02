import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getPortfolioProjects } from "@/lib/data"
import Image from "next/image"
import { MapPin, Tag } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ObrasPage() {
    const projects = await getPortfolioProjects()

    return (
        <main className="min-h-screen bg-industrial-950">
            <Header />
            
            <div className="pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header da Página */}
                    <div className="flex flex-col mb-16 max-w-3xl">
                        <span className="text-accent-premium text-xs font-black uppercase tracking-[0.4em] mb-4">
                            Nossas Obras
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
                            PORTFÓLIO <br /> <span className="text-accent-premium">DE PROJETOS</span>
                        </h1>
                        <p className="text-industrial-400 text-lg leading-relaxed">
                            Confira as soluções de iluminação e estruturas metálicas que transformaram espaços em todo o Brasil. Qualidade B&B em cada detalhe.
                        </p>
                    </div>

                    {/* Grid de Projetos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div 
                                key={index} 
                                className="group bg-industrial-900 border border-industrial-800 overflow-hidden transition-all hover:border-accent-premium/30"
                            >
                                {/* Imagem */}
                                <div className="aspect-video relative overflow-hidden">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-industrial-800" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Conteúdo */}
                                <div className="p-8 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-industrial-800 border border-industrial-700 text-accent-premium text-[10px] font-black uppercase tracking-widest">
                                            {project.category}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent-premium transition-colors">
                                        {project.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-industrial-400 text-sm font-medium">
                                        <MapPin className="size-4 text-accent-premium" />
                                        {project.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
