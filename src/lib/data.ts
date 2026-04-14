import { getPayload } from 'payload'
import config from '../../payload.config'
import { Category, Product, categories, portfolioItems, benefits, clients } from './constants'

// Funções auxiliares para buscar dados do Payload
async function getClient() {
  return await getPayload({ config })
}

export interface Representative {
    name: string
    company?: string | null
    email: string
    phone: string
    states: string[]
    region?: string
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'categories',
    })

    return docs.map(doc => ({
      title: doc.name as string,
      slug: doc.slug as string,
      image: (doc.image as any)?.url || '',
      description: doc.description as string,
      featured: true, // Por enquanto, todos são featured para manter compatiblidade
    }))
  } catch (error) {
    console.error("Erro ao conectar ao CMS para categorias. Retornando mock estático.", error);
    return categories; // fallback estático
  }
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'products',
      depth: 1,
    })

    return docs.map(doc => ({
      id: doc.slug as string,
      name: doc.name as string,
      category: (doc.category as any)?.slug || '',
      model: doc.model as string,
      image: (doc.mainImage as any)?.url || '',
      description: '', // Descrição processada depois
      leadTime: doc.leadTime as string,
      badges: doc.badges as string[],
      applications: (doc.applications as any[])?.map(a => a.app) || [],
    }))
  } catch (error) {
    console.error("Erro ao conectar ao CMS para produtos. Retornando vazio.", error);
    return []; // Retorna lista vazia para evitar erro 500 do site
  }
}

export const getRepresentatives = async (): Promise<Representative[]> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'representatives' as any,
      limit: 100, // Pegar todos
    })

    return docs.map(doc => ({
      name: doc.name as string,
      company: doc.company as string | null,
      email: doc.email as string,
      phone: doc.phone as string,
      states: doc.states as string[] || [],
      region: doc.region as string || '',
    }))
  } catch (error) {
    console.error("Erro ao conectar ao CMS para representantes.", error);
    return [];
  }
}

export { categories, portfolioItems, benefits, clients }
