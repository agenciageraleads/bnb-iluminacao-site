import { Check, Phone, Shield, Truck, Zap, Calculator, FileText } from "lucide-react"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { Portfolio } from "@/components/sections/portfolio"
import { GoogleReviews } from "@/components/sections/google-reviews"
import { FaqSection } from "@/components/sections/faq"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { getPortfolioProjects, getClientLogos } from "@/lib/data"
import Image from "next/image"

export const metadata = {
    title: "Braços para Luminária Pública | B&B Iluminação — Direto da Fábrica",
    description: "Braços e suportes metálicos para luminária pública. Galvanizados a fogo, dentro das normas ABNT. Entrega em todo o Brasil. Solicite orçamento.",
}

const WA_MSG = "Olá, vim pela página de braços para luminária e quero solicitar um orçamento."

export default async function BracoParaLuminariaLP() {
    const projects = await getPortfolioProjects()
    const clients = await getClientLogos()

    return (
        <main className="min-h-screen bg-white">
            <header className="bg-white border-b border-industrial-200 shadow-sm py-3 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center h-14">
                    <div className="relative h-10 w-40">
                        <Image
                            src="/logo.png"
                            alt="B&B Iluminação"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                    <WhatsAppLink
                        message={WA_MSG}
                        className="flex items-center gap-2 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black uppercase tracking-widest text-[10px] px-4 h-10 transition-colors"
                        aria-label="Solicitar orçamento pelo WhatsApp"
                    >
                        <Phone className="size-4" aria-hidden="true" />
                        <span className="hidden sm:inline">ORÇAMENTO RÁPIDO</span>
                        <span className="sm:hidden">WHATSAPP</span>
                    </WhatsAppLink>
                </div>
            </header>

            <section className="pt-10 pb-20 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-widest uppercase mb-8">
                                <span className="size-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                                Direto da Fábrica — Goiânia, GO
                            </div>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-industrial-950 leading-[0.9] mb-6 uppercase tracking-tighter">
                                Braços para <br />
                                <span className="text-accent-premium">Luminária Pública</span>
                            </h1>
                            <p className="text-industrial-500 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                                Suportes e braços metálicos para <span className="text-industrial-950 font-bold">construtoras</span>, prefeituras e projetos de iluminação pública. Galvanizados, dentro das normas ABNT e com entrega em todo o Brasil.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <WhatsAppLink
                                    message={WA_MSG}
                                    className="flex items-center justify-center gap-3 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black h-16 px-10 w-full sm:w-auto uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-xl shadow-industrial-950/20"
                                    aria-label="Solicitar orçamento de braços para luminária pelo WhatsApp"
                                >
                                    <Calculator className="size-5" aria-hidden="true" />
                                    SOLICITAR ORÇAMENTO
                                </WhatsAppLink>
                                <a
                                    href="/downloads"
                                    className="flex items-center justify-center gap-2 bg-white border-2 border-industrial-200 text-industrial-800 hover:border-industrial-950 hover:text-industrial-950 font-black h-16 px-8 w-full sm:w-auto uppercase tracking-widest transition-colors"
                                >
                                    <FileText className="size-5" aria-hidden="true" />
                                    BAIXAR CATÁLOGOS PDF
                                </a>
                            </div>
                            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-industrial-500 text-[11px] font-bold uppercase tracking-widest">
                                <Truck className="size-4 text-accent-dark" />
                                Entregamos em todo o território nacional
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
                            <div className="relative aspect-[4/3] lg:aspect-square bg-industrial-100 border-8 border-white shadow-2xl skew-y-2 lg:skew-y-0 lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                                <Image
                                    src="/portfolio/reserva-parque.webp"
                                    alt="Braços para Luminária Pública B&B Iluminação"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/40 to-transparent" />
                                <div className="absolute top-4 right-4 bg-accent-premium text-black font-black text-[10px] tracking-widest px-4 py-2 uppercase">
                                    Padrão Engenharia
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ClientsMarquee clients={clients} />

            <section className="py-20 bg-industrial-50" aria-labelledby="beneficios-braco">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 id="beneficios-braco" className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            Por que escolher a B&B?
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Galvanização a Fogo", desc: "Proteção superior contra corrosão, ideal para ambientes externos e regiões litorâneas.", icon: <Shield /> },
                            { title: "Produção Ágil", desc: "Lotes de até 500 braços entregues em 10 a 15 dias úteis. Planejamos com você.", icon: <Zap /> },
                            { title: "Normas ABNT", desc: "Braços dimensionados conforme NBR 6123, garantindo segurança estrutural ao projeto.", icon: <Check /> },
                            { title: "Solução Completa", desc: "Braço, poste, luminária LED — compre tudo em um só fornecedor e simplifique a obra.", icon: <Calculator /> },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-industrial-200 p-8 hover:border-accent-premium transition-colors hover:shadow-md">
                                <div className="size-12 bg-industrial-950 text-white flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase mb-3 text-sm">{item.title}</h3>
                                <p className="text-industrial-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Portfolio projects={projects} />

            <GoogleReviews />

            <FaqSection />

            <section className="py-20 md:py-32 bg-accent-premium relative overflow-hidden" aria-labelledby="cta-braco">
                <div className="absolute inset-0 bg-[url('/pattern-industrial.png')] opacity-10 mix-blend-overlay" />
                <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
                    <h2 id="cta-braco" className="text-4xl md:text-6xl font-black text-black uppercase leading-none tracking-tighter">
                        PRONTO PARA AVANÇAR<br />COM SEU PROJETO?
                    </h2>
                    <p className="text-black/80 font-medium text-lg md:text-xl max-w-2xl mx-auto">
                        Fale com nossa equipe comercial e receba uma proposta técnica para braços e suportes em menos de 24 horas.
                    </p>
                    <WhatsAppLink
                        message={WA_MSG}
                        className="inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-industrial-800 font-black h-16 w-full sm:w-auto px-12 text-lg uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl"
                        aria-label="Falar com especialista em braços para luminária pelo WhatsApp"
                    >
                        <Phone className="size-5" />
                        FALAR COM UM ESPECIALISTA
                    </WhatsAppLink>
                </div>
            </section>
        </main>
    )
}
