import { MetadataRoute } from 'next'
import { categories, getProducts, getBlogPosts, getCatalogs } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bebiluminacao.com.br'
  const products = await getProducts()
  const posts = await getBlogPosts(1000)

  // Rotas Estáticas
  const staticRoutes = [
    '',
    '/quem-somos',
    '/contato',
    '/servicos',
    '/produtos',
    '/blog',
    '/downloads',
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

  // Rotas de Blog Posts
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Prioridade alta para GEO (Artigos Autorais)
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes]
}
