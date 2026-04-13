import { Header } from "@/components/layout/header"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { CheckCircle2, Users, Lightbulb, Award } from "lucide-react"
import Link from "next/link"

export default function QuemSomosPage() {
    const numbers = [
        { value: "+30.000", label: "Postes Fabricados" },
        { value: "9+", label: "Anos no Mercado" },
        { value: "20t", label: "Capacidade Mensal" },
        { value: "26", label: "Estados Atendidos" },
    ]

    const valores = [
        { icon: <Users className="size-6" aria-hidden="true" />, title: "Comprometimento", desc: "Cumprimos prazos e especificações porque sabemos que sua obra depende disso." },
        { icon: <Lightbulb className="size-6" aria-hidden="true" />, title: "Inovação", desc: "Projetamos soluções customizadas para cada demanda, do padrão ao especial." },
        { icon: <Award className="size-6" aria-hidden="true" />, title: "Qualidade Certificada", desc: "Galvanização a fogo NBR 6323 e aço SAE certificado de usina em todos os produtos." },
    ]

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <FloatingWhatsApp />

            {/* Hero institucional */}
            <section className="pt-24 md:pt-28 pb-12 bg-white border-b border-industrial-200">
                <div className="container mx-auto px-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-industrial-500 mb-3">A Empresa</p>
                    <h1 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase leading-none mb-4">
                        QUEM SOMOS<span className="text-accent-dark">.</span>
                    </h1>
                    <p className="text-industrial-500 text-base md:text-lg leading-relaxed max-w-2xl">
                        A B&B Iluminação nasceu em 2017 para inovar o mercado brasileiro de soluções metálicas e de iluminação para grandes obras. A partir de nossa sede própria em Goiânia, unimos excelência, agilidade e fabricação certificada.
                    </p>
                </div>
            </section>

            {/* Números — grid 2x2 em mobile */}
            <section className="py-12 bg-industrial-950" aria-labelledby="numeros-heading">
                <div className="container mx-auto px-4">
                    <h2 id="numeros-heading" className="sr-only">Números da empresa</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {numbers.map((n, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-5xl font-black text-white mb-1">{n.value}</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-industrial-400 leading-tight">{n.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Missão e história */}
            <section className="py-14 md:py-20 bg-white" aria-labelledby="historia-heading">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                        {/* Imagem de fábrica — full-width em mobile */}
                        <div className="aspect-[4/3] bg-industrial-50 border border-industrial-200 flex items-center justify-center relative overflow-hidden" aria-hidden="true">
                            <div className="absolute top-0 w-full h-1 bg-accent-premium" />
                            <span className="text-industrial-200 font-black text-8xl select-none italic">B&B</span>
                            <span className="absolute bottom-4 left-4 bg-industrial-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                                Fábrica Goiânia, GO
                            </span>
                        </div>
                        <div className="space-y-5">
                            <h2 id="historia-heading" className="text-2xl md:text-3xl font-black text-industrial-950 uppercase">
                                Nossa <span className="border-b-4 border-accent-premium">História</span>
                            </h2>
                            <div className="space-y-4 text-industrial-600 text-base leading-relaxed">
                                <p>Nascida em 2017 com o intuito de renovar o mercado de artigos de iluminação no estado de Goiás, a B&B preza por utilizar apenas matéria-prima de qualidade e acabamento de primeira linha para garantir aos clientes o que há de mais seguro no setor.</p>
                                <p>Ocupamos sede própria na região de Goiânia, com um quadro de funcionários capacitados e ampla experiência para a produção de soluções que atendem diversos nichos da construção civil, entregando desde postes metálicos de iluminação viária e esportiva até projetos residenciais requintados.</p>
                            </div>
                            <div className="space-y-2 pt-2">
                                {["Fabricação 100% nacional", "Galvanização própria in-house", "Frota de entrega própria"].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="size-4 text-industrial-700 shrink-0" aria-hidden="true" />
                                        <span className="text-industrial-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores — cards em grid */}
            <section className="py-14 bg-industrial-50 border-y border-industrial-200" aria-labelledby="valores-heading">
                <div className="container mx-auto px-4">
                    <h2 id="valores-heading" className="text-2xl md:text-3xl font-black text-industrial-950 uppercase mb-8 text-center">
                        Nossos <span className="border-b-4 border-accent-premium">Valores</span>
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-5">
                        {valores.map((v, i) => (
                            <div key={i} className="bg-white border border-industrial-200 p-6 space-y-3">
                                <div className="size-12 bg-industrial-950 flex items-center justify-center text-white">
                                    {v.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase tracking-tight text-sm">{v.title}</h3>
                                <p className="text-industrial-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="py-14 md:py-20 bg-accent-premium" aria-labelledby="cta-quem-somos">
                <div className="container mx-auto px-4 text-center space-y-5">
                    <h2 id="cta-quem-somos" className="text-2xl md:text-4xl font-black text-black uppercase" style={{ textWrap: "balance" } as React.CSSProperties}>
                        Vamos trabalhar juntos?
                    </h2>
                    <p className="text-black/70 font-bold max-w-lg mx-auto">
                        Fale com nossos especialistas e descubra a solução ideal para o seu projeto.
                    </p>
                    <Link
                        href="/contato"
                        className="inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-industrial-800 font-black uppercase tracking-widest h-14 px-10 transition-colors w-full sm:w-auto"
                        aria-label="Entrar em contato com a B&B Iluminação"
                    >
                        ENTRAR EM CONTATO
                    </Link>
                </div>
            </section>
        </main>
    )
}
