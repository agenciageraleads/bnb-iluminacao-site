import { Check, Phone, Shield, Truck, Zap, Calculator, ArrowRight, FileText } from "lucide-react"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { Portfolio } from "@/components/sections/portfolio"
import { FaqSection } from "@/components/sections/faq"
import { getPortfolioProjects, getClientLogos } from "@/lib/data"

export default async function PostesMetalicosLP() {
    // Buscar dados do Payload CMS para injetar nas seções de prova social
    const projects = await getPortfolioProjects();
    const clients = await getClientLogos();

    return (
        <main className="min-h-screen bg-white">
            {/* Header minimal de LP — sem navegação para manter o foco na conversão */}
            <header className="bg-white border-b border-industrial-200 shadow-sm py-3 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center h-14">
                    <span className="text-industrial-950 font-black text-xl tracking-tight">B&B<span className="text-industrial-500 font-bold text-sm ml-1">INDUSTRIAL</span></span>
                    {/* CTA de contato visível no header em mobile */}
                    <a
                        href="https://wa.me/556235761988"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black uppercase tracking-widest text-[10px] px-4 h-10 transition-colors"
                        aria-label="Solicitar orçamento pelo WhatsApp"
                    >
                        <Phone className="size-4" aria-hidden="true" />
                        <span className="hidden sm:inline">ORÇAMENTO RÁPIDO</span>
                        <span className="sm:hidden">WHATSAPP</span>
                    </a>
                </div>
            </header>

            {/* Hero Section — CTA acima do fold em mobile */}
            <section className="py-12 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-[40%] h-full bg-accent-premium/5 pointer-events-none" aria-hidden="true" />
                <div className="container mx-auto px-4 flex flex-col items-center text-center relative">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-widest uppercase mb-8">
                            <span className="size-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></span>
                            Direto da Fábrica — Goiânia, GO
                        </div>
                        <h1
                            className="text-4xl sm:text-6xl md:text-7xl font-black text-industrial-950 leading-[0.95] mb-6 uppercase tracking-tighter"
                            style={{ textWrap: "balance" } as React.CSSProperties}
                        >
                            Postes Metálicos de <br />
                            <span className="relative inline-block text-accent-premium mt-2">
                                Alta Performance
                            </span>
                        </h1>
                        <p className="text-industrial-500 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
                            Soluções robustas para indústrias, prefeituras e grandes empreendimentos com foco em durabilidade e entrega pontual.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/556235761988?text=Olá, vim pela página de postes metálicos e quero solicitar um orçamento."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black h-16 px-10 w-full sm:w-auto uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-xl shadow-industrial-950/20 group"
                            >
                                <Calculator className="size-5" aria-hidden="true" />
                                SOLICITAR ORÇAMENTO
                            </a>
                            <a
                                href="/downloads"
                                className="flex items-center justify-center gap-2 bg-white border-2 border-industrial-200 text-industrial-800 hover:border-industrial-950 hover:text-industrial-950 font-black h-16 px-8 w-full sm:w-auto uppercase tracking-widest transition-colors"
                            >
                                <FileText className="size-5" aria-hidden="true" />
                                BAIXAR CATÁLOGOS PDF
                            </a>
                        </div>
                        
                        <div className="mt-8 flex items-center justify-center gap-2 text-industrial-500 text-[11px] font-bold uppercase tracking-widest">
                            <Truck className="size-4 text-accent-dark" />
                            Entregamos em todo o território nacional
                        </div>
                    </div>
                </div>
            </section>

            {/* Prova Social 1: Logos Marquee */}
            <ClientsMarquee clients={clients} />

            {/* Benefícios chave - Redesenhado para estilo grid técnico */}
            <section className="py-20 bg-industrial-50" aria-labelledby="beneficios-heading">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 id="beneficios-heading" className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            Por que escolher a B&B?
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Alta Durabilidade", desc: "Estruturas desenvolvidas para resistir aos climas mais agressivos (opção de galvanização a fogo).", icon: <Shield /> },
                            { title: "Produção Ágil", desc: "Capacidade produtiva otimizada. Entregamos lotes de até 100 postes em apenas 10 a 15 dias úteis.", icon: <Zap /> },
                            { title: "Normas da ABNT", desc: "Cálculos estruturais rigorosos que superam as exigências da norma NBR 6123 para forças de vento.", icon: <Check /> },
                            { title: "Solução Completa", desc: "Do poste à luminária LED e cabeamento elétrico, compre tudo em um só lugar.", icon: <Calculator /> },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-industrial-200 p-8 hover:border-accent-premium transition-colors hover:shadow-md">
                                <div className="size-12 bg-industrial-950 text-white flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase mb-3">{item.title}</h3>
                                <p className="text-industrial-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prova Social 2: Projetos Executados (Portfolio) */}
            <Portfolio projects={projects} />

            {/* Seção de FAQ (Quebra de objeções B2B) */}
            <FaqSection />

            {/* CTA Final */}
            <section className="py-20 md:py-32 bg-accent-premium relative overflow-hidden" aria-labelledby="cta-final-heading">
                <div className="absolute inset-0 bg-[url('/pattern-industrial.png')] opacity-10 mix-blend-overlay"></div>
                <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
                    <h2
                        id="cta-final-heading"
                        className="text-4xl md:text-6xl font-black text-black uppercase leading-none tracking-tighter"
                        style={{ textWrap: "balance" } as React.CSSProperties}
                    >
                        PRONTO PARA AVANÇAR<br />COM SEU PROJETO?
                    </h2>
                    <p className="text-black/80 font-medium text-lg md:text-xl max-w-2xl mx-auto">
                        Fale diretamente com nossa engenharia ou equipe comercial e receba uma proposta técnica comercial em menos de 24 horas.
                    </p>
                    <a
                        href="https://wa.me/556235761988"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-industrial-800 font-black h-16 w-full sm:w-auto px-12 text-lg uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl"
                        aria-label="Solicitar orçamento pelo WhatsApp agora"
                    >
                        <Phone className="size-5" />
                        FALAR COM UM ESPECIALISTA
                    </a>
                </div>
            </section>
        </main>
    )
}
