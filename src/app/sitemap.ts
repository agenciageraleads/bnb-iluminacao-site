import { MetadataRoute } from 'next'
import { categories, getProducts } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:9010'
  const products = await getProducts()

  // Rotas Estáticas
  const staticRoutes = [
    '',
    '/quem-somos',
    '/contato',
    '/servicos',
    '/produtos',
    '/lp/postes-metalicos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Rotas de Categorias
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/produtos/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Rotas de Produtos Individuais
  const productRoutes = products.map((prod) => ({
    url: `${baseUrl}/produtos/item/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
