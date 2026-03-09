import { getPayload } from 'payload'
import config from '../../payload.config'

export interface Product {
  id: string
  name: string
  category: string
  model: string
  image: string
  description: string
  specs?: string[]
  applications?: string[]
  datasheet?: string
  leadTime?: string
  badges?: string[]
}

export interface Category {
  title: string
  slug: string
  image: string
  description: string
  featured?: boolean
}

// Funções auxiliares para buscar dados do Payload
async function getClient() {
  return await getPayload({ config })
}

export const getCategories = async (): Promise<Category[]> => {
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
}

export const getProducts = async (): Promise<Product[]> => {
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
    description: '', // Descrição será processada sob demanda ou via RichText component
    leadTime: doc.leadTime as string,
    badges: doc.badges as string[],
    applications: (doc.applications as any[])?.map(a => a.app) || [],
  }))
}

// Dados estáticos que ainda não foram para o CMS (Benefícios e Clientes)
export const benefits = [
  {
    title: "MÁXIMA DURABILIDADE",
    description: "Postes galvanizados a fogo conforme NBR 6323, garantindo resistência extrema contra corrosão em qualquer ambiente.",
  },
  {
    title: "EFICIÊNCIA ENERGÉTICA",
    description: "Projetados para integração perfeita com luminárias LED de alta performance, otimizando o consumo de energia.",
  },
  {
    title: "CERTIFICAÇÃO TOTAL",
    description: "Atendimento rigoroso às normas ABNT e certificações exigidas para licitações e grandes projetos industriais.",
  },
  {
    title: "SUSTENTABILIDADE",
    description: "Aço 100% reciclável e processos de fabricação com baixo impacto ambiental, alinhados às práticas ESG.",
  },
]

export const clients = [
  { name: "Leroy Merlin" },
  { name: "Makro Service" },
  { name: "Prefeitura de Goiânia" },
  { name: "Porto Belo" },
  { name: "Grupo Comporte" },
  { name: "UFG" },
  { name: "Sesi" },
  { name: "Petrobras" },
  { name: "Piracanjuba" },
  { name: "Porto de Santos" },
  { name: "Porto do Açu" },
  { name: "Renner" },
]
