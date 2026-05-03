import { MetadataRoute } from 'next'
import { getCategories, getProducts, getBlogPosts, getCatalogs } from '@/lib/data'
import { getAllStateSlugs } from '@/lib/states-data'
import { getRegions } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bebiluminacao.com.br'
  const [products, posts, categoriesList, regions] = await Promise.all([
    getProducts(),
    getBlogPosts(1000),
    getCategories(),
    getRegions()
  ])

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
    '/lp/mastros-para-bandeira',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Rotas de Categorias
  const categoryRoutes = categoriesList.map((cat) => ({
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

  // Rotas de LPs Estaduais (27 estados)
  const stateRoutes = getAllStateSlugs().map((slug) => ({
    url: `${baseUrl}/lp/estados/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Rotas de LPs de Cidades (GEO-Targeting via CMS)
  const cityRoutes = regions.map((region) => ({
    url: `${baseUrl}/lp/postes-metalicos/cidades/${region.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes, ...stateRoutes, ...cityRoutes]
}
