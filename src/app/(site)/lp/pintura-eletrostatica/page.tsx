import { Phone, ShieldCheck, Palette, Layers, Zap } from "lucide-react"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { PinturaQuoteForm } from "./PinturaQuoteForm"
import { getClientLogos } from "@/lib/data"
import Image from "next/image"

export const metadata = {
    title: "Pintura Eletrostática Industrial para Lotes | B&B Iluminação",
    description: "Pintura eletrostática a pó poliéster para uso externo, com fosfatização e cura em estufa, em Goiânia-GO. A partir de 10 peças por pedido, ou demanda programada e recorrente.",
}

const WA_MSG = "Olá, preciso de orçamento para pintura eletrostática industrial."

export default async function PinturaEletrostaticaLP() {
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
                        aria-label="Solicitar orçamento de pintura pelo WhatsApp"
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
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-[11px] font-bold tracking-widest uppercase rounded-md mb-8">
                                <span className="size-2 bg-yellow-500 rounded-full" aria-hidden="true" />
                                Para construtoras, indústrias e prefeituras
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-industrial-950 leading-[0.9] mb-6 uppercase tracking-tighter">
                                Pintura Eletrostática <br />
                                <span className="text-accent-premium">Industrial</span>
                            </h1>
                            <p className="text-industrial-500 text-lg font-medium leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                                Pó poliéster para uso externo, aplicado sobre peça limpa, desengraxada e fosfatizada, com cura em estufa. Cabine e estufa de 6 m próprias, em Goiânia-GO.
                            </p>
                            <p className="inline-flex items-center gap-2 px-3 py-2 bg-industrial-50 border border-industrial-200 text-industrial-800 text-xs font-bold rounded-md mb-8">
                                Lote mínimo: 10 peças por pedido, ou demanda programada e recorrente.
                            </p>
                            <p className="inline-flex items-center gap-2 px-3 py-2 bg-industrial-50 border border-industrial-200 text-industrial-800 text-xs font-bold rounded-md mb-8">
                                Lote mínimo: 10 peças por pedido, ou demanda programada e recorrente.
                            </p>
                            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto lg:mx-0 mb-10">
                                {[
                                    "Poliéster Externo",
                                    "Fosfatização",
                                    "Cura em Estufa",
                                    "Estufa de 6 m",
                                ].map((tag) => (
                                    <div key={tag} className="flex items-center gap-2 text-industrial-600 text-[11px] font-bold uppercase tracking-widest">
                                        <div className="size-1.5 bg-accent-premium shrink-0" />
                                        {tag}
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
                                    Preencha os dados abaixo. A equipe comercial retorna pelo contato informado.
                                </p>
                                <PinturaQuoteForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ClientsMarquee clients={clients} />

            {/* Foto real do serviço */}
            <section className="relative h-[360px] md:h-[480px] overflow-hidden" aria-hidden="true">
                <Image
                    src="/images/servicos/pintura-eletrostatica.jpg"
                    alt="Serviço de pintura eletrostática industrial B&B Iluminação"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-industrial-950/80 via-industrial-950/40 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                        <p className="text-accent-premium text-[11px] font-bold uppercase tracking-widest mb-3">Estrutura própria em Goiânia-GO</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none tracking-tighter max-w-xl">
                            Cabine de pintura<br />e estufa de cura<br />industrial
                        </h2>
                        <p className="text-white/70 text-sm mt-4 max-w-sm font-medium">
                            Limpeza, desengraxe, fosfatização, secagem, pintura a pó, cura em estufa e inspeção visual.
                        </p>
                    </div>
                </div>
            </section>

            {/* Diferenciais */}
            <section className="py-20 bg-white" aria-labelledby="diferenciais-pintura">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-14">
                        <h2 id="diferenciais-pintura" className="text-3xl md:text-4xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            Como Fazemos o Acabamento
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <ShieldCheck />, title: "Uso Externo", desc: "Tinta poliéster indicada para sol e chuva em ambiente urbano. Em litoral, a indicação é galvanizado ou galvanizado + pintado." },
                            { icon: <Palette />, title: "Cor por Referência RAL", desc: "Informe a cor e o acabamento na cotação. A disponibilidade entra na proposta." },
                            { icon: <Layers />, title: "Cura em Estufa", desc: "Estufa de 6 m. A peça entra limpa, desengraxada e fosfatizada." },
                            { icon: <Zap />, title: "Para Lotes", desc: "A partir de 10 peças por pedido, ou demanda programada e recorrente. O prazo vem na proposta." },
                        ].map((item, i) => (
                            <div key={i} className="bg-industrial-50 border border-industrial-200 rounded-2xl p-8 hover:border-accent-premium transition-colors">
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


            {/* CTA Final */}
            <section className="py-20 md:py-28 bg-industrial-950 relative overflow-hidden" aria-labelledby="cta-pintura">
                <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
                    <h2 id="cta-pintura" className="text-4xl md:text-6xl font-black text-white uppercase leading-none tracking-tighter">
                        PREFERE FALAR<br />
                        <span className="text-accent-premium">DIRETAMENTE?</span>
                    </h2>
                    <p className="text-industrial-400 font-medium text-lg max-w-xl mx-auto">
                        Nossa equipe comercial atende via WhatsApp para agilizar sua cotação.
                    </p>
                    <WhatsAppLink
                        message={WA_MSG}
                        className="inline-flex items-center justify-center gap-3 bg-accent-premium text-black hover:bg-yellow-300 font-black h-16 w-full sm:w-auto px-12 uppercase tracking-widest rounded-lg transition-transform hover:scale-105 shadow-2xl"
                        aria-label="Falar com especialista em pintura eletrostática pelo WhatsApp"
                    >
                        <Phone className="size-5" />
                        FALAR PELO WHATSAPP
                    </WhatsAppLink>
                </div>
            </section>
        </main>
    )
}
