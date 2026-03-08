import { Header } from "@/components/layout/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Download, Phone } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    // Mock de um produto específico
    const product = {
        name: "Poste Reto 4m - Galvanizado",
        model: "PR-40",
        category: "Iluminação Pública",
        description: "Poste metálico reto fabricado em aço SAE 1010/1020, com galvanização a fogo por imersão. Ideal para iluminação de pátios, estacionamentos e vias públicas secundárias.",
        specs: [
            { label: "Altura Livre", value: "4000mm" },
            { label: "Diâmetro Nominal", value: "60,3mm" },
            { label: "Material", value: "Aço SAE 1010/1020" },
            { label: "Acabamento", value: "Galvanizado a Fogo (NBR 6323)" },
            { label: "Base", value: "Flangeada ou Engastada" },
        ]
    }

    return (
        <main className="min-h-screen bg-industrial-950 pt-24">
            <Header />

            <div className="container mx-auto px-4 py-12">
                <Link href="/produtos" className="text-accent-premium flex items-center gap-2 mb-8 hover:underline text-sm font-bold">
                    <ArrowLeft className="size-4" /> VOLTAR AO CATÁLOGO
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Product Media */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl glass border-white/10 flex items-center justify-center overflow-hidden">
                            <span className="text-industrial-800 font-outfit text-9xl font-black">{product.model}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square rounded-lg glass border-white/5 opacity-40" />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <Badge variant="industrial" className="w-fit mb-4">{product.category}</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold font-outfit text-white mb-6">
                            {product.name}
                        </h1>

                        <p className="text-industrial-300 text-lg mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-6 mb-10">
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <Check className="size-5 text-accent-premium" /> Especificações Técnicas
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 border-t border-industrial-800 pt-6">
                                {product.specs.map((spec, i) => (
                                    <div key={i} className="flex justify-between border-b border-industrial-900 pb-2">
                                        <span className="text-industrial-500 text-sm italic">{spec.label}</span>
                                        <span className="text-industrial-200 text-sm font-medium">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <Button variant="premium" size="lg" className="flex-1 gap-2">
                                <Phone className="size-5" /> SOLICITAR ORÇAMENTO
                            </Button>
                            <Button variant="outline" size="lg" className="gap-2">
                                <Download className="size-5" /> FICHA TÉCNICA
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
