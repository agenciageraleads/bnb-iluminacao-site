import { Header } from "@/components/layout/header"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { CheckCircle2, Target, Eye, CheckSquare, KeyRound } from "lucide-react"
import Link from "next/link"

export default function QuemSomosPage() {
    const numbers = [
        { value: "+30.000", label: "Postes Fabricados" },
        { value: "9+", label: "Anos no Mercado" },
        { value: "20t", label: "Capacidade Mensal" },
        { value: "26", label: "Estados Atendidos" },
    ]

    const valoresArray = [
        "Focamos sempre na solução",
        "Cobramos de quem acreditamos",
        "Somos humanos e Justos",
        "Estamos sempre evoluindo",
        "Somos alegres e positivos!",
        "Somos um time eficaz e produtivo",
        "Colhemos o fruto do nosso trabalho",
        "Sempre estamos fazendo algo, e diferente",
        "Somos paranoicos por resultados",
        "Entregamos mais do que o esperado",
    ];

    const chavesArray = [
        "A parceria tem que ser boa para ambos os lados",
        "Se prometeu, cumpre. Se errou, corrija.",
        "Se não tem verdade, não tem negócio!",
        "Se você pode resolver o problema, resolva!",
    ];

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

            {/* Números */}
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

            {/* História */}
            <section className="py-14 md:py-20 bg-white" aria-labelledby="historia-heading">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                        {/* Imagem de fábrica */}
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
                                {["Fabricação 100% nacional", "Pintura eletrostática in-house", "Logística facilitada em nível nacional"].map((item) => (
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

            {/* Cultura: Missão, Visão, Valores e Chaves */}
            <section className="py-16 md:py-24 bg-industrial-50 border-y border-industrial-200" aria-labelledby="cultura-heading">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-industrial-500 mb-3">Nossa Identidade</p>
                        <h2 id="cultura-heading" className="text-3xl md:text-5xl font-black text-industrial-950 uppercase">
                            DNA <span className="border-b-4 border-accent-premium">B&B</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                        
                        {/* Coluna Esquerda: Missão e Visão */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Missão */}
                            <div className="bg-white p-8 border-l-4 border-industrial-950 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Target className="size-24" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Target className="size-6 text-industrial-950" />
                                    <h3 className="text-2xl font-black text-industrial-950 uppercase tracking-tight">Missão</h3>
                                </div>
                                <p className="text-industrial-600 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                                    "Desenvolver soluções metálicas que iluminam, protegem e transformam espaços."
                                </p>
                            </div>

                            {/* Visão */}
                            <div className="bg-white p-8 border-l-4 border-accent-premium shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Eye className="size-24 text-accent-premium" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Eye className="size-6 text-accent-premium" />
                                    <h3 className="text-2xl font-black text-industrial-950 uppercase tracking-tight">Visão</h3>
                                </div>
                                <p className="text-industrial-600 text-base md:text-lg font-medium leading-relaxed relative z-10">
                                    Estar presente em todas as regiões do Brasil até 2028, sendo reconhecida como a indústria de postes metálicos mais confiável, com mais de 10.000 projetos entregues no prazo e com excelência.
                                </p>
                            </div>
                        </div>

                        {/* Coluna Direita: Valores e Chaves */}
                        <div className="lg:col-span-7 space-y-8">
                            
                            {/* Valores */}
                            <div className="bg-white p-8 border border-industrial-200 shadow-sm">
                                <h3 className="text-xl font-black text-industrial-950 uppercase tracking-tight mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="size-5 text-accent-dark" />
                                    Nossos Valores
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                                    {valoresArray.map((valor, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckSquare className="size-5 text-accent-dark shrink-0 mt-0.5" />
                                            <span className="text-industrial-700 font-medium text-sm md:text-base leading-snug">{valor}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chaves */}
                            <div className="bg-industrial-950 p-8 shadow-sm">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                                    <KeyRound className="size-5 text-accent-premium" />
                                    Nossas Chaves
                                </h3>
                                <div className="space-y-4">
                                    {chavesArray.map((chave, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="mt-1.5 size-1.5 rounded-full bg-accent-premium shrink-0" />
                                            <span className="text-industrial-100 font-medium text-sm md:text-base leading-relaxed">{chave}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
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
