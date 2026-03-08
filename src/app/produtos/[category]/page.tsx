import { Header } from "@/components/layout/header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Simulação de dados filtrados
const getProductsByCategory = (category: string) => {
    const all = [
        { id: 1, name: "Poste Reto 4m", category: "publica", model: "PR-40" },
        { id: 2, name: "Poste Curvo Simples", category: "publica", model: "PC-D1" },
        { id: 3, name: "Poste Decorativo Pétala", category: "decorativa", model: "PD-PET" },
        { id: 4, name: "Poste Industrial 12m", category: "industrial", model: "PI-120" },
    ]
    return all.filter(p => p.category === category)
}

export default function CategoryPage({ params }: { params: { category: string } }) {
    const products = getProductsByCategory(params.category)
    const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)

    return (
        <main className="min-h-screen bg-industrial-950 pt-24">
            <Header />

            <div className="container mx-auto px-4 py-12">
                <Link href="/produtos" className="text-accent-premium flex items-center gap-2 mb-8 hover:underline text-sm font-bold">
                    <ArrowLeft className="size-4" /> VOLTAR PARA TODOS OS PRODUTOS
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold font-outfit text-white mb-2">Iluminação <span className="text-accent-premium">{categoryName}</span></h1>
                    <p className="text-industrial-400">Linha especializada para aplicações em ambientes de tipo {categoryName.toLowerCase()}.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} className="group overflow-hidden border-white/5 bg-industrial-900/40 hover:border-accent-premium/30 transition-all">
                            <Link href={`/produtos/item/${product.id}`}>
                                <div className="aspect-square bg-industrial-800 flex items-center justify-center relative overflow-hidden">
                                    <span className="text-industrial-700 font-outfit text-4xl font-bold">{product.model}</span>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-lg group-hover:text-accent-premium transition-colors">{product.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-industrial-500">Modelo: {product.model}</span>
                                        <Button variant="link" size="sm" className="p-0 h-auto text-accent-premium font-bold">
                                            DETALHES
                                        </Button>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    )
}
