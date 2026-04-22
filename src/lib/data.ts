import { getPayload } from 'payload'
import config from '../../payload.config'
import { Category, Product, categories, portfolioItems, benefits, clients } from './constants'
import fs from 'fs'
import path from 'path'

// Funções auxiliares para buscar dados do Payload
async function getClient() {
  return await getPayload({ config })
}

// Helper para converter Lexical JSON em string simples
function extractTextFromLexical(node: any): string {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (node.text) return node.text;
    if (node.children) {
        return node.children.map((child: any) => extractTextFromLexical(child)).join(" ").trim();
    }
    if (node.root) return extractTextFromLexical(node.root);
    return "";
}

export interface Representative {
    name: string
    company?: string | null
    email: string
    phone: string
    states: string[]
    region?: string
}

export interface ClientLogo {
    name: string
    logoUrl: string
}

export interface Project {
    title: string
    category: string
    location: string
    image: string
}

export interface Post {
    id: string | number
    title: string
    slug: string
    summary: string
    date: string
    image: string
    author: string
}

export interface Catalog {
    id: string | number
    title: string
    description?: string
    thumbnail: string
    fileUrl: string
    category: string
}

export interface Region {
    cityName: string
    slug: string
    featuredImage?: any
    content?: any
    trust?: {
        logistics?: string
        deliveryTime?: string
        warranty?: string
    }
    faq?: Array<{
        question: string
        answer: string
    }>
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

    return docs.map(doc => {
      const specs = [];
      if (doc.specs_material) specs.push(doc.specs_material as string);
      if (doc.specs_altura) specs.push(doc.specs_altura as string);
      if (doc.specs_diametro) specs.push(doc.specs_diametro as string);
      if (doc.specs_norma) specs.push(doc.specs_norma as string);

      return {
        id: doc.slug as string,
        name: doc.name as string,
        category: (doc.category as any)?.slug || '',
        model: doc.model as string,
        image: (doc.mainImage as any)?.url || '',
        description: extractTextFromLexical(doc.description),
        specs: specs.length > 0 ? specs : undefined,
        leadTime: doc.leadTime as string,
        badges: doc.badges as string[],
        optionals: doc.optionals as string[] || [],
        applications: (doc.applications as any[])?.map(a => a.app) || [],
      }
    })
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

export const getClientLogos = async (): Promise<ClientLogo[]> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'clients' as any,
      sort: 'order',
    })

    return docs.map(doc => {
      const logo = doc.logo as any;
      const logoUrl = logo.sizes?.['logo-marquee']?.url || logo.url || '';
      return {
        name: doc.name as string,
        logoUrl,
      };
    })
  } catch (error) {
    console.error("Erro ao conectar ao CMS para logos de clientes.", error);
    return [];
  }
}

export const getPortfolioProjects = async (): Promise<Project[]> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'projects' as any,
      sort: 'order',
      limit: 100,
    })


    if (docs.length === 0) {
      // Tentar Seed Automático se estiver vazio e em ambiente DEV
      try {
        console.log("Iniciando Seed Automático de Projetos...");
        for (const item of portfolioItems) {
           const filePath = path.join(process.cwd(), 'public', item.image);
           if (!fs.existsSync(filePath)) continue;

           const mediaDoc = await payload.create({
             collection: 'media',
             data: { alt: `Projeto ${item.title}` },
             file: {
               data: fs.readFileSync(filePath),
               name: path.basename(filePath),
               mimetype: 'image/png',
               size: fs.statSync(filePath).size,
             },
           });

           await payload.create({
             collection: 'projects' as any,
             data: {
               title: item.title,
               category: item.category,
               location: item.location,
               image: mediaDoc.id,
             },
           });
        }
        // Refetch após seed
        const refetch = await payload.find({ collection: 'projects' as any, limit: 100 });
        if (refetch.docs.length > 0) return refetch.docs.map(doc => ({
           title: doc.title as string,
           category: doc.category as string,
           location: doc.location as string,
           image: (doc.image as any)?.url || '',
        }));
      } catch (seedError) {
        console.error("Falha no Auto-Seed:", seedError);
      }
      return portfolioItems; 
    }

    return docs.map(doc => ({
      title: doc.title as string,
      category: doc.category as string,
      location: doc.location as string,
      image: (doc.image as any)?.url || '',
    }))
  } catch (error) {
    console.error("Erro ao conectar ao CMS para portfólio.", error);
    return portfolioItems;
  }
}

export const getBlogPosts = async (limit: number = 10): Promise<Post[]> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'blog' as any,
      sort: '-createdAt',
      limit,
      depth: 1,
    })

    return docs.map(doc => ({
      id: doc.id,
      title: doc.title as string,
      slug: doc.slug as string,
      summary: doc.summary as string,
      date: new Date(doc.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      image: (doc.featuredImage as any)?.url || '',
      author: doc.author as string,
    }))
  } catch (error) {
    console.error("Erro ao conectar ao CMS para posts do blog.", error);
    return [];
  }
}

export const getBlogPostBySlug = async (slug: string): Promise<any> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'blog' as any,
      where: {
        slug: { equals: slug }
      },
      limit: 1,
      depth: 1,
    })

    if (docs.length === 0) return null;
    
    const doc = docs[0];
    return {
      ...doc,
      date: new Date(doc.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      image: (doc.featuredImage as any)?.url || '',
    };
  } catch (error) {
    console.error("Erro ao buscar post por slug:", error);
    return null;
  }
}

export const getRegionBySlug = async (slug: string): Promise<Region | null> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'regions' as any,
      where: {
        slug: { equals: slug }
      },
      limit: 1,
    })

    if (docs.length === 0) return null;
    return docs[0] as unknown as Region;
  } catch (error) {
    console.error("Erro ao buscar região por slug:", error);
    return null;
  }
}

export const getCatalogs = async (): Promise<Catalog[]> => {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'catalogs' as any,
      depth: 1,
    })

    return docs.map(doc => ({
      id: doc.id,
      title: doc.title as string,
      description: doc.description as string,
      thumbnail: (doc.thumbnail as any)?.url || '',
      fileUrl: (doc.file as any)?.url || '',
      category: doc.category as string,
    }))
  } catch (error) {
    console.error("Erro ao buscar catálogos:", error);
    return [];
  }
}

export const getCatalogById = async (id: string): Promise<any> => {
  try {
    const payload = await getClient()
    const doc = await payload.findByID({
      collection: 'catalogs',
      id,
      depth: 2, // Aumentar depth para pegar detalhes dos produtos dentro do layout
    })

    return doc
  } catch (error) {
    console.error(`Erro ao buscar catálogo ${id}:`, error);
    return null;
  }
}

export { categories, portfolioItems, benefits, clients }

