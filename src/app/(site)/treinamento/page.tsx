"use client"

import { Header } from "@/components/layout/header"
import { 
    BookOpen, 
    Download, 
    Target, 
    TrendingUp, 
    FileText, 
    ClipboardList,
    LayoutDashboard,
    ArrowRight,
    Lock,
    ExternalLink,
    Clock
} from "lucide-react"
import Link from "next/link"

export default function TrainingDashboardPage() {
    const modules = [
        {
            title: "Vendas & Abordagem",
            description: "Scripts de WhatsApp, roteiro de diagnóstico e quebra de objeções.",
            icon: Target,
            href: "/treinamento/vendas",
            color: "bg-accent-premium",
            status: "Acessar Agora"
        },
        {
            title: "Guia de Produtos",
            description: "Tipos de postes, fixações e acabamentos. Tudo o que você precisa saber.",
            icon: BookOpen,
            href: "/treinamento/produtos",
            color: "bg-industrial-900",
            status: "Acessar Agora"
        }
    ]

    const futureIntegrations = [
        {
            title: "Propostas CRM",
            status: "Em breve",
            icon: ClipboardList,
            description: "Puxando dados do seu Funil de Vendas."
        },
        {
            title: "Comissões & Pagamentos",
            status: "Em breve",
            icon: TrendingUp,
            description: "Integração direta com o sistema Sankhya."
        }
    ]

    const downloads = [
        { name: "Catálogo Completo 2024", type: "PDF", size: "9.5 MB", href: "/downloads/catalogo-bb-iluminacao.pdf" },
        { name: "Manual de Instalação", type: "PDF", size: "2.1 MB", href: "#" },
        { name: "Logotipos B&B (Alta Resolução)", type: "ZIP", size: "4.8 MB", href: "#" },
        { name: "Ficha Técnica: Postes Telecônicos", type: "PDF", size: "1.2 MB", href: "#" }
    ]

    return (
        <main className="min-h-screen bg-industrial-50 pb-20">
            <Header />

            {/* Header do Portal */}
            <section className="pt-32 pb-16 bg-white border-b border-industrial-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-950 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                                <LayoutDashboard className="size-3 text-accent-premium" />
                                Dashboard do Representante
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-industrial-950 uppercase leading-none">
                                Centro de <span className="text-accent-premium">Excelência</span> B&B
                            </h1>
                            <p className="text-industrial-500 text-lg max-w-2xl font-medium">
                                Ferramentas técnicas e comerciais para garantir que sua obra seja entregue exatamente como projetada.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest">Nível de Acesso</p>
                                <p className="text-sm font-black text-industrial-900 uppercase">Parceiro Estratégico</p>
                            </div>
                            <div className="size-12 bg-accent-premium rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-accent-premium/20">
                                R
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Coluna Principal: Treinamentos */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {modules.map((module) => (
                            <Link 
                                key={module.title} 
                                href={module.href}
                                className="group bg-white p-8 border border-industrial-200 hover:border-accent-premium transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className={`size-14 ${module.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <module.icon className={`size-7 ${module.color === 'bg-accent-premium' ? 'text-industrial-950' : 'text-accent-premium'}`} />
                                </div>
                                <h3 className="text-xl font-black text-industrial-950 uppercase mb-3 ">{module.title}</h3>
                                <p className="text-industrial-500 text-sm leading-relaxed mb-6">
                                    {module.description}
                                </p>
                                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-900 group-hover:text-accent-premium transition-colors">
                                    {module.status}
                                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Futuras Integrações */}
                    <div className="bg-industrial-950 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-premium/5 -skew-x-12 transform origin-top-right" />
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
                                <TrendingUp className="text-accent-premium" />
                                Meu Desempenho <span className="text-[10px] bg-industrial-800 px-2 py-1 ml-2 tracking-widest text-industrial-400">ROADMAP</span>
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {futureIntegrations.map((item) => (
                                    <div key={item.title} className="bg-industrial-900 p-6 border border-industrial-800 opacity-60 hover:opacity-100 transition-opacity">
                                        <div className="flex items-start justify-between mb-4">
                                            <item.icon className="size-8 text-industrial-500" />
                                            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-industrial-800 px-2 py-1 rounded text-industrial-400">
                                                <Clock className="size-3" />
                                                {item.status}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold uppercase mb-2">{item.title}</h4>
                                        <p className="text-xs text-industrial-500 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna Lateral: Downloads & Suporte */}
                <div className="space-y-8">
                    <section className="bg-white border border-industrial-200 p-8 shadow-sm">
                        <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
                            <Download className="text-accent-premium size-5" />
                            Downloads
                        </h2>
                        <div className="space-y-4">
                            {downloads.map((file) => (
                                <a 
                                    key={file.name} 
                                    href={file.href}
                                    className="flex items-center justify-between p-4 bg-industrial-50 hover:bg-industrial-100 border border-industrial-100 hover:border-industrial-200 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="size-5 text-industrial-400 group-hover:text-industrial-900" />
                                        <div>
                                            <p className="text-[11px] font-bold text-industrial-900 uppercase tracking-tight">{file.name}</p>
                                            <p className="text-[9px] text-industrial-500 font-bold uppercase">{file.type} • {file.size}</p>
                                        </div>
                                    </div>
                                    <Download className="size-4 text-industrial-300 group-hover:text-accent-premium" />
                                </a>
                            ))}
                        </div>
                    </section>

                    <section className="bg-accent-premium p-8">
                        <h2 className="text-xl font-black uppercase text-industrial-950 mb-2">Suporte Direto</h2>
                        <p className="text-industrial-800 text-sm font-medium mb-6 leading-relaxed">
                            Dúvidas técnicas sobre um projeto específico? Fale direto com a nossa engenharia.
                        </p>
                        <a 
                            href="https://wa.me/556235761988" 
                            target="_blank"
                            className="bg-industrial-950 text-white w-full h-14 flex items-center justify-center font-black uppercase tracking-widest text-xs hover:bg-industrial-800 transition-colors"
                        >
                            Chamar Engenharia
                        </a>
                    </section>
                </div>

            </div>
        </main>
    )
}
