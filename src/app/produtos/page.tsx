import { Header } from "@/components/layout/header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, Search } from "lucide-react"
import Link from "next/link"

const allProducts = [
    { id: 1, name: "Poste Reto 4m", category: "Pública", model: "PR-40", image: "/images/p1.jpg" },
    { id: 2, name: "Poste Curvo Simples", category: "Pública", model: "PC-D1", image: "/images/p2.jpg" },
    { id: 3, name: "Poste Decorativo Pétala", category: "Decorativa", model: "PD-PET", image: "/images/p3.jpg" },
    { id: 4, name: "Poste Industrial 12m", category: "Industrial", model: "PI-120", image: "/images/p4.jpg" },
    { id: 5, name: "Poste Cônico 6m", category: "Pública", model: "PCO-60", image: "/images/p5.jpg" },
    { id: 6, name: "Poste Ornamental", category: "Decorativa", model: "PO-01", image: "/images/p6.jpg" },
]

export default function ProdutosPage() {
    return (
        <main className="min-h-screen bg-industrial-950 pt-24">
            <Header />

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold font-outfit text-white mb-2">Catálogo de <span className="text-accent-premium">Produtos</span></h1>
                        <p className="text-industrial-400">Encontre a solução ideal para seu projeto de iluminação.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-industrial-500" />
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                className="bg-industrial-900 border border-industrial-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent-premium w-64"
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter className="size-4" /> FILTRAR
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {allProducts.map((product) => (
                        <Card key={product.id} className="group overflow-hidden border-white/5 bg-industrial-900/40 hover:border-accent-premium/30 transition-all">
                            <Link href={`/produtos/item/${product.id}`}>
                                <div className="aspect-square bg-industrial-800 flex items-center justify-center relative overflow-hidden">
                                    <span className="text-industrial-700 font-outfit text-4xl font-bold">{product.model}</span>
                                    <Badge variant="industrial" className="absolute top-4 right-4">{product.category}</Badge>
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
