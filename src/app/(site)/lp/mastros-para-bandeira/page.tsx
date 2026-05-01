import { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import { Phone, Shield, Truck, Flag, Ruler, Sun, CheckCircle2, Paintbrush, MessageCircle, ArrowRight } from "lucide-react"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { Portfolio } from "@/components/sections/portfolio"
import { getPortfolioProjects, getClientLogos } from "@/lib/data"

// Metadados SEO otimizados para mastros
export const metadata: Metadata = {
    title: "Mastros para Bandeira em Aço Galvanizado | 3m a 12m | B&B Iluminação",
    description: "Fabricante de mastros para bandeira em aço galvanizado a fogo. De 3 a 12 metros. Kit completo com bandeira. Uso externo. Envio para todo o Brasil.",
    keywords: ["mastro para bandeira", "mastro de bandeira", "mastro externo", "bandeira com mastro", "mastro galvanizado", "hasteamento de bandeira"],
    openGraph: {
        title: "Mastros para Bandeira — Feitos para Área Externa | B&B",
        description: "Kit completo: mastro em aço galvanizado + bandeira. De 3 a 12m de altura. Entrega nacional.",
        type: "website",
    },
}

// Schema.org para produto
const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Mastro para Bandeira em Aço Galvanizado",
    "description": "Mastros metálicos telecônicos para hasteamento de bandeiras em áreas externas. De 3 a 12 metros de altura.",
    "brand": { "@type": "Brand", "name": "B&B Iluminação" },
    "manufacturer": { "@type": "Organization", "name": "B&B Iluminação" },
    "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "offerCount": "6",
    },
    "material": "Aço galvanizado a fogo / Pintura eletrostática",
    "additionalProperty": [
        { "@type": "PropertyValue", "name": "Altura", "value": "3m a 12m" },
        { "@type": "PropertyValue", "name": "Acabamento", "value": "Galvanização a fogo ou pintura eletrostática" },
        { "@type": "PropertyValue", "name": "Uso", "value": "Exclusivo para área externa" },
    ]
}

// Alturas disponíveis de mastros
const mastroHeights = [
    { height: "3m", use: "Fachadas comerciais e entradas", icon: "🏪" },
    { height: "5m", use: "Praças e áreas públicas", icon: "🏛️" },
    { height: "7m", use: "Indústrias e condomínios", icon: "🏭" },
    { height: "9m", use: "Órgãos públicos e quartéis", icon: "⚖️" },
    { height: "10m", use: "Centros cívicos e estádios", icon: "🏟️" },
    { height: "12m", use: "Grandes empreendimentos", icon: "🏗️" },
]

// FAQ específico de mastros
const faqMastros = [
    {
        question: "Qual a altura ideal de mastro para minha necessidade?",
        answer: "Depende da aplicação. Para fachadas comerciais, 3 a 5m são ideais. Para praças e órgãos públicos, recomendamos 7 a 9m. Grandes empreendimentos e centros cívicos podem exigir mastros de 10 a 12m. Nossa equipe técnica ajuda a dimensionar."
    },
    {
        question: "O mastro serve para uso externo?",
        answer: "Sim! Nossos mastros são projetados EXCLUSIVAMENTE para áreas externas. O aço galvanizado a fogo ou com pintura eletrostática garante resistência a chuva, sol, vento e maresia."
    },
    {
        question: "Vocês enviam para todo o Brasil?",
        answer: "Sim, fazemos envio para todos os estados brasileiros. Nossa fábrica em Goiânia-GO possui logística otimizada para entregas em território nacional."
    },
    {
        question: "A bandeira está inclusa no kit?",
        answer: "Sim! Oferecemos o kit completo: mastro + bandeira + acessórios de fixação. Trabalhamos com bandeiras do Brasil, dos estados, de todos os países e personalizadas para empresas."
    },
    {
        question: "Qual o acabamento disponível?",
        answer: "Dois acabamentos: Galvanização a fogo (NBR 6323) para máxima proteção anticorrosiva, ou Pintura eletrostática a pó, disponível em diversas cores para combinar com a identidade visual do local."
    },
    {
        question: "Vocês atendem licitações e órgãos públicos?",
        answer: "Sim. Fornecemos mastros para prefeituras, câmaras, fóruns, quartéis e órgãos federais. Emitimos toda a documentação técnica exigida em editais."
    },
]

export default async function MastrosLP() {
    const projects = await getPortfolioProjects()
    const clients = await getClientLogos()

    return (
        <main className="min-h-screen bg-white">
            <Script
                id="mastro-product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            {/* Header Minimal LP — foco na conversão */}
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
                    <a
                        href="https://wa.me/556235761988?text=Olá, quero um orçamento para mastros de bandeira."
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

            {/* Hero Section */}
            <section className="pt-10 pb-20 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Texto */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-widest uppercase mb-8">
                                <span className="size-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                                Kit Completo: Mastro + Bandeira
                            </div>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-industrial-950 leading-[0.9] mb-6 uppercase tracking-tighter">
                                Mastros para<br />
                                <span className="text-accent-premium">Bandeira</span>
                            </h1>
                            <p className="text-industrial-500 text-lg md:text-xl font-medium leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                                Mastros em aço galvanizado de <span className="text-industrial-950 font-bold">3 a 12 metros</span> de altura, projetados exclusivamente para <span className="text-industrial-950 font-bold">áreas externas</span>. Bandeiras de todas as nacionalidades e estados.
                            </p>
                            <p className="text-industrial-400 text-sm font-bold uppercase tracking-widest mb-10">
                                Galvanização a fogo · Pintura eletrostática · Envio nacional
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a
                                    href="https://wa.me/556235761988?text=Olá, vim pela página de mastros para bandeira e quero solicitar um orçamento."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 font-black h-16 px-10 w-full sm:w-auto uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-xl shadow-industrial-950/20 group text-xs"
                                >
                                    <MessageCircle className="size-5" aria-hidden="true" />
                                    SOLICITAR ORÇAMENTO
                                </a>
                                <a
                                    href="/downloads"
                                    className="flex items-center justify-center gap-2 bg-white border-2 border-industrial-200 text-industrial-800 hover:border-industrial-950 hover:text-industrial-950 font-black h-16 px-8 w-full sm:w-auto uppercase tracking-widest transition-colors text-xs"
                                >
                                    <Flag className="size-5" aria-hidden="true" />
                                    VER CATÁLOGO
                                </a>
                            </div>

                            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-industrial-500 text-[11px] font-bold uppercase tracking-widest">
                                <Truck className="size-4 text-accent-dark" />
                                Entregamos em todo o território nacional
                            </div>
                        </div>

                        {/* Imagem de impacto — Mastro ao ar livre */}
                        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
                            <div className="relative aspect-[4/3] lg:aspect-square bg-industrial-100 border-8 border-white shadow-2xl skew-y-2 lg:skew-y-0 lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                                <Image
                                    src="/portfolio/reserva-parque.webp"
                                    alt="Mastro para bandeira em aço galvanizado instalado em área externa"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/40 to-transparent" />
                                <div className="absolute top-4 right-4 bg-accent-premium text-black font-black text-[10px] tracking-widest px-4 py-2 uppercase">
                                    Uso Externo
                                </div>
                                <div className="absolute bottom-4 left-4 bg-black/80 text-white font-black text-[10px] tracking-widest px-4 py-2 uppercase">
                                    3m a 12m de altura
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="py-10 border-y border-industrial-100 bg-industrial-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <Sun className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Área Externa</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">Projetado exclusivamente para uso ao ar livre. Resistente a sol, chuva e vento.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <Truck className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Envio Nacional</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">Entregamos para todos os 26 estados + DF com logística própria.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-6 bg-white border border-industrial-200 shadow-sm">
                            <Flag className="size-10 text-accent-premium shrink-0" />
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-industrial-950">Kit Completo</h4>
                                <p className="text-industrial-500 text-xs mt-1 font-bold">Mastro + bandeira + acessórios de fixação. Pronto para instalar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prova Social: Clientes */}
            <ClientsMarquee clients={clients} />

            {/* Alturas Disponíveis */}
            <section className="py-20 bg-white" aria-labelledby="alturas-heading">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-accent-premium font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Opções de Altura</span>
                        <h2 id="alturas-heading" className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            De 3 a 12 Metros
                        </h2>
                        <p className="text-industrial-500 font-medium max-w-2xl mx-auto">
                            Escolha a altura ideal para o seu projeto. Todos os mastros são fabricados sob medida em aço carbono com acabamento premium.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mastroHeights.map((item, i) => (
                            <div key={i} className="bg-industrial-50 border border-industrial-200 p-6 hover:border-accent-premium transition-colors hover:shadow-md group">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                                    <span className="text-3xl font-black text-industrial-950">{item.height}</span>
                                </div>
                                <p className="text-industrial-600 text-sm font-medium">{item.use}</p>
                                <div className="mt-4 flex items-center gap-2 text-accent-dark text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="size-3" />
                                    Solicitar orçamento
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Diferenciais */}
            <section className="py-20 bg-industrial-950 text-white" aria-labelledby="diferenciais-heading">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 id="diferenciais-heading" className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
                            Por que escolher<br /><span className="text-accent-premium">mastros B&B?</span>
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Galvanização a Fogo",
                                desc: "Revestimento de zinco conforme NBR 6323, proteção anticorrosiva de longa duração contra chuva, sol e maresia.",
                                icon: <Shield />,
                            },
                            {
                                title: "Pintura Eletrostática",
                                desc: "Acabamento em pó de alta resistência, disponível em diversas cores para harmonizar com a identidade visual do local.",
                                icon: <Paintbrush />,
                            },
                            {
                                title: "Bandeiras Inclusas",
                                desc: "Kit completo com bandeiras de todas as nacionalidades, estados brasileiros e bandeiras personalizadas para empresas.",
                                icon: <Flag />,
                            },
                            {
                                title: "Sob Medida",
                                desc: "Mastros fabricados de 3 a 12 metros de altura, dimensionados para cada projeto e necessidade específica.",
                                icon: <Ruler />,
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 p-8 border border-industrial-800 hover:border-accent-premium transition-colors">
                                <div className="size-14 bg-accent-premium text-black flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-black uppercase tracking-widest text-sm mb-2">{item.title}</h3>
                                    <p className="text-industrial-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio */}
            <Portfolio projects={projects} />

            {/* FAQ */}
            <section className="py-20 bg-industrial-50 border-y border-industrial-100" aria-labelledby="faq-mastros-heading">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 id="faq-mastros-heading" className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight mb-4">
                            Dúvidas Frequentes
                        </h2>
                        <div className="w-24 h-1 bg-accent-premium mx-auto" />
                    </div>

                    <div className="space-y-4">
                        {faqMastros.map((item, i) => (
                            <div key={i} className="bg-white border border-industrial-200 p-8 hover:border-accent-premium transition-colors">
                                <h4 className="font-black text-industrial-950 uppercase text-sm mb-3 flex items-center gap-3">
                                    <span className="size-6 bg-accent-premium text-industrial-950 flex items-center justify-center text-[10px] shrink-0 font-black">Q</span>
                                    {item.question}
                                </h4>
                                <p className="text-industrial-600 text-sm leading-relaxed pl-9">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 md:py-32 bg-accent-premium relative overflow-hidden" aria-labelledby="cta-mastros-heading">
                <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
                    <h2
                        id="cta-mastros-heading"
                        className="text-4xl md:text-6xl font-black text-black uppercase leading-none tracking-tighter"
                        style={{ textWrap: "balance" } as React.CSSProperties}
                    >
                        HASTEAR A BANDEIRA<br />COMEÇA AQUI
                    </h2>
                    <p className="text-black/80 font-medium text-lg md:text-xl max-w-2xl mx-auto">
                        Fale com nossa equipe comercial e receba o orçamento do seu mastro com bandeira em menos de 24 horas. Enviamos para todo o Brasil.
                    </p>
                    <a
                        href="https://wa.me/556235761988?text=Olá! Quero um orçamento para mastros de bandeira. Podem me ajudar?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-industrial-800 font-black h-16 w-full sm:w-auto px-12 text-lg uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl"
                        aria-label="Solicitar orçamento pelo WhatsApp agora"
                    >
                        <Phone className="size-5" />
                        FALAR COM ESPECIALISTA
                    </a>
                    <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest">
                        Resposta garantida em até 2 horas úteis
                    </p>
                </div>
            </section>
        </main>
    )
}
