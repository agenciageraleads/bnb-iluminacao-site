import { Header } from "@/components/layout/header"
import { Shield, Zap, Truck, Check } from "lucide-react"

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <section className="pt-32 pb-20 bg-industrial-950 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
                        Nossos <span className="text-accent-premium">Serviços</span>
                    </h1>
                    <div className="w-24 h-1 bg-accent-premium mx-auto mb-8"></div>
                    <p className="text-industrial-400 max-w-2xl mx-auto text-lg">
                        Excelência técnica em galvanização, pintura e projetos especiais para infraestrutura industrial e urbana.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <div>
                            <h2 className="text-3xl font-black text-industrial-950 uppercase mb-6">Pintura Eletrostática</h2>
                            <p className="text-industrial-600 mb-6 leading-relaxed">
                                Oferecemos o serviço de pintura eletrostática a pó, que garante um acabamento impecável e alta resistência mecânica e química. Ideal para componentes metálicos que exigem durabilidade e estética superior.
                            </p>
                            <ul className="space-y-3">
                                {["Grande variedade de cores (RAL)", "Proteção extra contra corrosão", "Acabamento uniforme e duradouro"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-industrial-700 font-medium">
                                        <Check className="size-5 text-accent-premium" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="aspect-video bg-industrial-100 border border-industrial-200" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Galvanização a Fogo", icon: <Zap />, desc: "Banho de zinco por imersão conforme NBR 6323." },
                            { title: "Projetos Luminotécnicos", icon: <Shield />, desc: "Cálculos precisos para máxima eficiência energética." },
                            { title: "Logística Própria", icon: <Truck />, desc: "Entrega garantida com frota própria em todo o Brasil." },
                        ].map((s, i) => (
                            <div key={i} className="p-8 border border-industrial-200 bg-white hover:border-accent-premium transition-colors">
                                <div className="size-12 bg-industrial-950 text-white flex items-center justify-center mb-6">
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold text-industrial-950 mb-3">{s.title}</h3>
                                <p className="text-industrial-500 text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
