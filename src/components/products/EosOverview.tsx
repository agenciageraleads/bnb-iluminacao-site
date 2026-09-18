import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import type { Product } from '@/lib/constants'

export function EosOverview({ products }: { products: Product[] }) {
    return <main className="min-h-screen bg-white">
        <Header />
        <section className="container mx-auto px-4 pt-32 pb-16">
            <Link href="/produtos/versa" className="underline">Linha Versa</Link>
            <h1 className="text-4xl font-bold mt-6 mb-4">Éos: Simples e Duplo</h1>
            <p className="max-w-2xl text-industrial-600">Compare os dois modelos do catálogo. O Éos Simples tem um globo difusor no topo; o Éos Duplo tem dois globos em travessa. A configuração final deve ser definida conforme o projeto.</p>
            <div className="mt-10 divide-y divide-industrial-200">
                {products.map(product => <article key={product.id} className="flex flex-wrap items-center gap-8 py-8">
                    {product.image && <Image src={product.image} alt={product.name} width={220} height={280} className="object-contain" />}
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <p className="my-4 text-industrial-600">{product.description}</p>
                        <Link href={`/produtos/item/${product.id}`} className="inline-flex min-h-12 items-center underline font-bold">Ver {product.name}</Link>
                    </div>
                </article>)}
            </div>
        </section>
        <Footer />
    </main>
}
