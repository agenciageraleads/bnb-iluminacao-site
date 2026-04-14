import { Check, Phone, Shield, Truck, Zap, Calculator, ArrowRight } from "lucide-react"


export default function PostesMetalicosLP() {
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
                        <span className="hidden sm:inline">ORÇAMENTO</span>
                        <span className="sm:hidden">WHATSAPP</span>
                    </a>
                </div>
            </header>

            {/* Hero Section — CTA acima do fold em mobile */}
            <section className="py-12 md:py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-[40%] h-full bg-accent-premium/5 pointer-events-none" aria-hidden="true" />
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-widest uppercase mb-6">
                            Direto da Fábrica — Goiânia, GO
                        </div>
                        <h1
                            className="text-3xl sm:text-5xl md:text-6xl font-black text-industrial-950 leading-[0.95] mb-5 uppercase"
                            style={{ textWrap: "balance" } as React.CSSProperties}
                        >
                            Postes Metálicos de <span className="relative">
                                Alta Performance
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-premium" aria-hidden="true" />
                            </span>
                        </h1>
                        <p className="text-industrial-500 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                            Fabricação própria com galvanização a fogo NBR 6323. Soluções robustas para indústrias, prefeituras e grandes empreendimentos com entrega em todo o Brasil.
                        </p>

                        {/* CTAs — acima do fold no mobile */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://wa.me/556235761988?text=Quero+receber+cat%C3%A1logo+e+pre%C3%A7os"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black h-14 px-8 w-full sm:w-auto uppercase tracking-widest transition-colors group"
                            >
                                Receber Catálogo e Preços
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </a>
                            <div className="flex items-center gap-3 px-6 py-4 bg-industrial-50 border border-industrial-200">
                                <Zap className="size-5 text-accent-dark shrink-0" aria-hidden="true" />
                                <span className="text-industrial-700 font-bold text-sm">Entrega Rápida em Todo o Brasil</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges — grid 2x2 em mobile */}
            <section className="py-8 md:py-12 bg-industrial-50 border-y border-industrial-200" aria-label="Diferenciais e certificações">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {[
                            { icon: <Shield className="size-7 text-industrial-900" aria-hidden="true" />, label: "Normas ABNT" },
                            { icon: <Zap className="size-7 text-industrial-900" aria-hidden="true" />, label: "Galvanização a Fogo" },
                            { icon: <Truck className="size-7 text-industrial-900" aria-hidden="true" />, label: "Frota Própria" },
                            { icon: <Calculator className="size-7 text-industrial-900" aria-hidden="true" />, label: "Proj. Luminotécnico" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-3 p-4">
                                <div className="size-14 bg-white border border-industrial-200 flex items-center justify-center shadow-sm">
                                    {item.icon}
                                </div>
                                <span className="text-industrial-700 font-bold uppercase text-[11px] tracking-widest leading-tight">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefícios chave */}
            <section className="py-14 md:py-20 bg-white" aria-labelledby="beneficios-heading">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                        <div className="space-y-6">
                            <h2 id="beneficios-heading" className="text-2xl md:text-3xl font-black text-industrial-950 uppercase leading-tight">
                                Por que escolher os <br />postes da B&B?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "Aço certificado de usina (SAE 1010/1020)",
                                    "Banho de zinco por imersão (NBR 6323)",
                                    "Pintura eletrostática em qualquer cor",
                                    "Dimensionados para ventos conforme NBR 6123",
                                    "Garantia estrutural de 10 anos",
                                ].map((text, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="size-5 bg-industrial-950 flex items-center justify-center mt-0.5 shrink-0" aria-hidden="true">
                                            <Check className="size-3 text-white" />
                                        </div>
                                        <span className="text-industrial-600 text-sm md:text-base font-medium leading-relaxed">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="aspect-square bg-industrial-50 border border-industrial-200 relative overflow-hidden" aria-hidden="true">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-industrial-200 font-black text-8xl md:text-[120px] select-none">B&B</span>
                            </div>
                            <div className="absolute top-0 w-full h-1 bg-accent-premium" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final — fundo amarelo com texto preto (contraste adequado) */}
            <section className="py-16 md:py-20 bg-accent-premium" aria-labelledby="cta-final-heading">
                <div className="container mx-auto px-4 text-center space-y-6">
                    <h2
                        id="cta-final-heading"
                        className="text-2xl sm:text-4xl md:text-5xl font-black text-black uppercase leading-tight"
                        style={{ textWrap: "balance" } as React.CSSProperties}
                    >
                        PRONTO PARA ILUMINAR SEU PROJETO?
                    </h2>
                    <p className="text-black/70 text-base md:text-lg font-bold max-w-xl mx-auto">
                        Fale com nossa equipe técnica e receba um orçamento personalizado em menos de 24 horas.
                    </p>
                    <a
                        href="https://wa.me/556235761988"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-industrial-800 active:bg-industrial-900 font-black h-16 px-10 md:px-16 text-base md:text-lg uppercase tracking-widest w-full sm:w-auto transition-colors"
                        aria-label="Solicitar orçamento pelo WhatsApp agora"
                    >
                        SOLICITAR ORÇAMENTO AGORA
                    </a>
                </div>
            </section>
        </main>
    )
}
