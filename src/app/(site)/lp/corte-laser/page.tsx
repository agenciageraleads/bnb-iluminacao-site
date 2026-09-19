import { Phone, Cpu, ShieldCheck, Maximize2, FileCheck } from "lucide-react"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { GoogleReviews } from "@/components/sections/google-reviews"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { LaserQuoteForm } from "./LaserQuoteForm"
import { getClientLogos } from "@/lib/data"
import Image from "next/image"

export const metadata = {
    title: "Corte a Laser Industrial — Fibra Óptica 3kW | B&B Iluminação",
    description: "Serviço de corte a laser para construtoras, metalúrgicas e indústrias. Fibra óptica 3kW, até 19mm de espessura, chapas e tubos. Goiânia e região.",
}

const WA_MSG = "Olá, preciso de orçamento para corte a laser industrial."

export default async function CorteLaserLP() {
    const clients = await getClientLogos()

    return (
        <main className="min-h-screen bg-white">
            <header className="bg-white border-b border-industrial-200 shadow-sm py-3 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center h-14">
                    <div className="relative h-10 w-40">
                        <Image
                            src="/logo.svg"
                            alt="B&B Iluminação"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                    <WhatsAppLink
                        message={WA_MSG}
                        className="flex items-center gap-2 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black uppercase tracking-widest text-[10px] px-4 h-10 rounded-lg transition-colors"
                        aria-label="Solicitar orçamento de corte a laser pelo WhatsApp"
                    >
                        <Phone className="size-4" aria-hidden="true" />
                        <span className="hidden sm:inline">ORÇAMENTO RÁPIDO</span>
                        <span className="sm:hidden">WHATSAPP</span>
                    </WhatsAppLink>
                </div>
            </header>

            {/* Hero */}
            <section className="pt-10 pb-16 md:py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
                        {/* Copy */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-widest uppercase rounded-md mb-8">
                                <span className="size-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                                Para construtoras, metalúrgicas e indústrias
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-industrial-950 leading-[0.9] mb-6 uppercase tracking-tighter">
                                Corte a Laser <br />
                                <span className="text-accent-premium">Industrial</span>
                            </h1>
                            <p className="text-industrial-500 text-lg font-medium leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                                Fibra óptica de alta potência para cortes de precisão em chapas e tubos de aço. Peças prontas para uso, sem rebarbas, com tolerâncias milimétricas. Atendemos projetos técnicos e lotes repetitivos.
                            </p>

                            {/* Stats técnicos */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0 mb-10">
                                {[
                                    { value: "3kW", label: "Potência" },
                                    { value: "19mm", label: "Espessura máx." },
                                    { value: "3×1,5m", label: "Área de mesa" },
                                    { value: "100%", label: "Sem rebarbas" },
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-industrial-50 border border-industrial-200 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-black text-industrial-950">{stat.value}</p>
                                        <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Formulário B2B */}
                        <div className="w-full lg:w-[480px] shrink-0">
                            <div className="bg-industrial-50 border border-industrial-200 rounded-2xl p-6 md:p-8">
                                <h2 className="text-lg font-black text-industrial-950 uppercase tracking-tight mb-1">
                                    Solicite sua Cotação
                                </h2>
                                                <p className="text-industrial-500 text-xs mb-6">
                                    Anexe o DXF, PDF ou foto da peça diretamente no formulário.
                                </p>
                                <LaserQuoteForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ClientsMarquee clients={clients} />

            {/* Foto real do serviço */}
            <section className="relative h-[360px] md:h-[480px] overflow-hidden" aria-hidden="true">
                <Image
                    src="/images/servicos/corte-laser.jpg"
                    alt="Máquina de corte a laser fibra óptica B&B Iluminação"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/85 via-industrial-950/50 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                        <p className="text-accent-premium text-[11px] font-bold uppercase tracking-widest mb-3">Equipamento próprio em Goiânia-GO</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none tracking-tighter max-w-xl">
                            Fibra óptica 3kW<br />para chapas e tubos<br />até 19mm
                        </h2>
                        <p className="text-white/70 text-sm mt-4 max-w-sm font-medium">
                            Cortes de precisão milimétrica, sem rebarbas, prontos para solda ou dobra.
                        </p>
                    </div>
                </div>
            </section>

            {/* Diferenciais */}
            <section className="py-20 bg-industrial-50" aria-labelledby="diferenciais-laser">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-14">
                        <h2 id="diferenciais-laser" className="text-3xl md:text-4xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            Por que escolher o Laser B&B?
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Cpu />, title: "Agilidade", desc: "Ciclos de produção até 5× mais rápidos que plasma ou oxicorte convencional." },
                            { icon: <ShieldCheck />, title: "Consistência", desc: "Repetibilidade garantida em lotes de alto volume, peça a peça idêntica." },
                            { icon: <Maximize2 />, title: "Versatilidade", desc: "Tubos, chapas e perfis até 19mm. Geometrias complexas sem retrabalho." },
                            { icon: <FileCheck />, title: "Pronto para Uso", desc: "Peças saem direto para dobra ou soldagem — sem acabamento manual." },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-industrial-200 rounded-2xl p-8 hover:border-accent-premium transition-colors">
                                <div className="size-12 bg-industrial-950 text-white rounded-lg flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase mb-3 text-sm">{item.title}</h3>
                                <p className="text-industrial-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <GoogleReviews />

            {/* CTA Final */}
            <section className="py-20 md:py-28 bg-industrial-950 relative overflow-hidden" aria-labelledby="cta-laser">
                <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
                    <h2 id="cta-laser" className="text-4xl md:text-6xl font-black text-white uppercase leading-none tracking-tighter">
                        REDUZA CUSTOS<br />
                        <span className="text-accent-premium">NA SUA OBRA</span>
                    </h2>
                    <p className="text-industrial-400 font-medium text-lg max-w-xl mx-auto">
                        Precisão laser economiza material e tempo de montagem. Peça uma cotação técnica agora.
                    </p>
                    <WhatsAppLink
                        message={WA_MSG}
                        className="inline-flex items-center justify-center gap-3 bg-accent-premium text-black hover:bg-yellow-300 font-black h-16 w-full sm:w-auto px-12 uppercase tracking-widest rounded-lg transition-transform hover:scale-105 shadow-2xl"
                        aria-label="Falar com especialista em corte a laser pelo WhatsApp"
                    >
                        <Phone className="size-5" />
                        FALAR PELO WHATSAPP
                    </WhatsAppLink>
                </div>
            </section>
        </main>
    )
}
