import { Header } from "@/components/layout/header"

export default async function CityPage({ params }: { params: { city: string } }) {
    const { city } = await params;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');

    return (
        <main className="min-h-screen bg-industrial-950 pt-24 text-white">
            <Header />
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6">
                    Procurando por Loja de Iluminação em <span className="text-accent-premium">{cityName}</span>?
                </h1>
                <p className="text-xl text-industrial-400 max-w-2xl mx-auto mb-12">
                    A B&B Iluminação é especialista em soluções de postes metálicos e iluminação profissional atendendo toda a região de {cityName}.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="p-8 rounded-2xl border border-white/5 bg-industrial-900/40">
                        <h3 className="text-xl font-bold mb-4">Atendimento Local</h3>
                        <p className="text-industrial-400">Entrega rápida e suporte especializado para projetos em {cityName}.</p>
                    </div>
                    <div className="p-8 rounded-2xl border border-white/5 bg-industrial-900/40">
                        <h3 className="text-xl font-bold mb-4">Qualidade Certificada</h3>
                        <p className="text-industrial-400">Postes certificados ABNT com máxima durabilidade.</p>
                    </div>
                    <div className="p-8 rounded-2xl border border-white/5 bg-industrial-900/40">
                        <h3 className="text-xl font-bold mb-4">Projetos Customizados</h3>
                        <p className="text-industrial-400">Desenvolvemos soluções sob medida para sua necessidade.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
