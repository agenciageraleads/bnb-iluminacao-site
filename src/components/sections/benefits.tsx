import { ShieldCheck, Zap, Award, Recycle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
    {
        title: "MÁXIMA DURABILIDADE",
        description: "Postes galvanizados a fogo conforme NBR 6323, garantindo resistência extrema contra corrosão em qualquer ambiente.",
        icon: ShieldCheck,
    },
    {
        title: "EFICIÊNCIA ENERGÉTICA",
        description: "Projetados para integração perfeita com luminárias LED de alta performance, otimizando o consumo de energia.",
        icon: Zap,
    },
    {
        title: "CERTIFICAÇÃO TOTAL",
        description: "Atendimento rigoroso às normas ABNT e certificações exigidas para licitações e grandes projetos industriais.",
        icon: Award,
    },
    {
        title: "SUSTENTABILIDADE",
        description: "Aço 100% reciclável e processos de fabricação com baixo impacto ambiental, alinhados às práticas ESG.",
        icon: Recycle,
    },
]

export function Benefits() {
    return (
        <section className="py-24 bg-industrial-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tight text-white mb-2">
                        PORQUE COMPRAR <br /> <span className="text-accent-premium">COM A B&B?</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-premium mx-auto mt-6 mb-4"></div>
                    <p className="text-industrial-300 max-w-3xl mx-auto mt-4">
                        Nossos postes metálicos galvanizados unem durabilidade, segurança e um acabamento impecável.
                        Com fabricação ágil e qualidade superior, entregamos soluções robustas e confiáveis para sua obra brilhar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-industrial-900 border border-industrial-800 p-8 hover:border-accent-premium/50 transition-colors group">
                            <div className="w-16 h-16 rounded-full bg-industrial-950 border border-industrial-800 flex items-center justify-center mb-6 group-hover:border-accent-premium transition-colors">
                                <benefit.icon className="size-8 text-accent-premium" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">{benefit.title}</h3>
                            <p className="text-sm text-industrial-400 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
