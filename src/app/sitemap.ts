export const dynamic = 'force-dynamic'

import { MetadataRoute } from 'next'
import { getCategories, getProducts, getBlogPosts } from '@/lib/data'
import { getPrimaryCatalogCategories, getPrimaryCatalogProducts } from '@/lib/catalog-curation'
import { caseStudies } from '@/lib/seo/cases'

function hasCleanPathSegment(value: string): boolean {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(value)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bebiluminacao.com.br'
  const [products, posts, categoriesList] = await Promise.all([
    getProducts(),
    getBlogPosts(1000),
    getCategories(),
  ])
  const primaryCategories = getPrimaryCatalogCategories(categoriesList)
  const primaryProducts = getPrimaryCatalogProducts(products)

  // Rotas Estáticas
  const staticRoutes = [
    '',
    '/postes-metalicos',
    '/postes-para-iluminacao-publica',
    '/postes-para-loteamentos',
    '/postes-para-condominios',
    '/postes-para-pracas',
    '/postes-para-estacionamentos',
    '/solucoes',
    '/solucoes/construcao-privada',
    '/solucoes/setor-publico',
    '/solucoes/iluminacao-publica-ppp',
    '/solucoes/infraestrutura',
    '/solucoes/revendas',
    '/solucoes/projetistas',
    '/solucoes/industria',
    '/produtos/poste-teleconico',
    '/produtos/poste-metalico-galvanizado',
    '/produtos/poste-curvo-simples',
    '/produtos/poste-curvo-duplo',
    '/produtos/braco-para-luminaria-publica',
    '/produtos/suporte-para-luminaria-publica',
    '/produtos/chumbador-para-poste-metalico',
    '/quem-somos',
    '/contato',
    '/servicos',
    '/produtos',
    '/produtos/item/poste-ornamental-eos',
    '/obras',
    '/blog',
    '/blog/altura-de-poste-para-iluminacao-publica',
    '/blog/normas-para-postes-de-iluminacao',
    '/blog/poste-galvanizado-ou-pintado',
    '/blog/poste-teleconico-ou-reto',
    '/blog/poste-flangeado-ou-engastado',
    '/downloads',
    '/lp/mastros-para-bandeira',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Rotas de Categorias
  const categoryRoutes = primaryCategories.map((cat) => ({
    url: `${baseUrl}/produtos/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Rotas de Produtos Individuais
  const productRoutes = primaryProducts.map((prod) => ({
    url: `${baseUrl}/produtos/item/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const caseRoutes = caseStudies.map((caseStudy) => ({
    url: `${baseUrl}/obras/${caseStudy.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Rotas de Blog Posts
  const blogRoutes = posts.filter((post) => hasCleanPathSegment(post.slug)).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Prioridade alta para GEO (Artigos Autorais)
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes, ...caseRoutes]
}
