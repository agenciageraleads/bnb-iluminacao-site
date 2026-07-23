import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { getPayload } from 'payload'

import config from '../../payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const mediaSourceDirs = ['public/images/produtos', 'temp_images', 'produto_imagens']

const products = [
    {
        name: 'Poste Girafa LED 1x50W Engastado',
        slug: 'poste-girafa-led-1-50w-engastado',
        model: 'BB-VRS-GF1XX-E',
        description: 'Poste decorativo com um projetor LED 50W no topo de um braço alto e elegante. Indicado para pátios, acessos, praças, parques e áreas de convivência com iluminação direcionada.',
        leadTime: '15 a 20 dias uteis',
        mainImage: 'poste-girafa-led-1x50w.png',
        gallery: ['poste-girafa-led-1x50w-real.png'],
        badges: ['LED Integrado', 'NBR 14744', 'Garantia B&B'],
        applications: ['Pátios', 'Acessos', 'Praças', 'Parques', 'Áreas de convivência'],
        optionals: ['Janela de Inspeção', 'Projeto Personalizado', 'Pintura Eletrostática', 'Projeto Iluminotécnico'],
        specs: {
            material: 'Aço Carbono',
            altura: '2m a 6m',
            diametro: 'Metalon 100x50mm',
            norma: 'NBR 6323 / NBR 14744',
        },
    },
    {
        name: 'Poste Girafa LED 2x50W Engastado',
        slug: 'poste-girafa-led-2-50w-engastado',
        model: 'BB-VRS-GF2XX-E',
        description: 'Poste decorativo com dois projetores LED de 50W para cobertura ampla. Indicado para estacionamentos, pátios e grandes áreas abertas que exigem desempenho, conforto visual e acabamento.',
        leadTime: '15 a 20 dias uteis',
        mainImage: 'poste-girafa-led-2x50w.png',
        gallery: ['poste-girafa-led-2x50w-real.png'],
        badges: ['LED Integrado', 'NBR 14744', 'Garantia B&B'],
        applications: ['Estacionamentos', 'Pátios', 'Praças', 'Parques', 'Grandes áreas abertas'],
        optionals: ['Janela de Inspeção', 'Projeto Personalizado', 'Pintura Eletrostática', 'Projeto Iluminotécnico'],
        specs: {
            material: 'Aço Carbono',
            altura: '2m a 6m',
            diametro: 'Metalon 100x50mm',
            norma: 'NBR 6323 / NBR 14744',
        },
    },
    {
        name: 'Poste Girafa LED 1x50W Flangeado',
        slug: 'poste-girafa-led-1-50w-flangeado',
        model: 'BB-VRS-GF1XX-F',
        description: 'Poste decorativo com um projetor LED 50W no topo de um braço alto e elegante. Indicado para pátios, acessos, praças, parques e áreas de convivência com iluminação direcionada.',
        leadTime: '15 a 20 dias uteis',
        mainImage: 'poste-girafa-led-1x50w.png',
        gallery: ['poste-girafa-led-1x50w-real.png'],
        badges: ['LED Integrado', 'NBR 14744', 'Garantia B&B'],
        applications: ['Pátios', 'Acessos', 'Praças', 'Parques', 'Áreas de convivência'],
        optionals: ['Chumbador', 'Janela de Inspeção', 'Projeto Personalizado', 'Pintura Eletrostática', 'Projeto Iluminotécnico'],
        specs: {
            material: 'Aço Carbono',
            altura: '2m a 6m',
            diametro: 'Metalon 100x50mm',
            norma: 'NBR 6323 / NBR 14744',
        },
    },
    {
        name: 'Poste Girafa LED 2x50W Flangeado',
        slug: 'poste-girafa-led-2-50w-flangeado',
        model: 'BB-VRS-GF2XX-F',
        description: 'Poste decorativo com dois projetores LED de 50W para cobertura ampla. Indicado para estacionamentos, pátios e grandes áreas abertas que exigem desempenho, conforto visual e acabamento.',
        leadTime: '15 a 20 dias uteis',
        mainImage: 'poste-girafa-led-2x50w.png',
        gallery: ['poste-girafa-led-2x50w-real.png'],
        badges: ['LED Integrado', 'NBR 14744', 'Garantia B&B'],
        applications: ['Estacionamentos', 'Pátios', 'Praças', 'Parques', 'Grandes áreas abertas'],
        optionals: ['Chumbador', 'Janela de Inspeção', 'Projeto Personalizado', 'Pintura Eletrostática', 'Projeto Iluminotécnico'],
        specs: {
            material: 'Aço Carbono',
            altura: '2m a 6m',
            diametro: 'Metalon 100x50mm',
            norma: 'NBR 6323 / NBR 14744',
        },
    },
    {
        name: 'Poste Rebatedor Engastado',
        slug: 'poste-rebatedor-engastado',
        model: 'BB-VRS-RBXX-E',
        description: 'Poste decorativo com disco superior que rebate a luz para baixo, criando iluminação indireta de alto conforto. Solução sofisticada para áreas residenciais, corporativas, praças e jardins.',
        leadTime: '15 a 20 dias úteis',
        mainImage: 'poste-rebatedor.png',
        gallery: [],
        badges: ['Lançamento', 'NBR 14744', 'Garantia B&B'],
        applications: ['Áreas residenciais', 'Áreas corporativas', 'Praças', 'Jardins', 'Condomínios'],
        optionals: ['Janela de Inspeção', 'Projeto Personalizado', 'Pintura Eletrostática', 'Projeto Iluminotécnico'],
        specs: {
            material: 'Aço Carbono',
            altura: '2m a 6m',
            norma: 'NBR 6323 / NBR 14744',
        },
    },
    {
        name: 'Poste Rebatedor Flangeado',
        slug: 'poste-rebatedor-flangeado',
        model: 'BB-VRS-RBXX-F',
        description: 'Poste decorativo com disco superior que rebate a luz para baixo, criando iluminação indireta de alto conforto. Solução sofisticada para áreas residenciais, corporativas, praças e jardins.',
        leadTime: '15 a 20 dias úteis',
        mainImage: 'poste-rebatedor.png',
        gallery: [],
        badges: ['Lançamento', 'NBR 14744', 'Garantia B&B'],
        applications: ['Áreas residenciais', 'Áreas corporativas', 'Praças', 'Jardins', 'Condomínios'],
        optionals: ['Chumbador', 'Janela de Inspeção', 'Projeto Personalizado', 'Pintura Eletrostática', 'Projeto Iluminotécnico'],
        specs: {
            material: 'Aço Carbono',
            altura: '2m a 6m',
            norma: 'NBR 6323 / NBR 14744',
        },
    },
    {
        name: 'Poste Éos',
        slug: 'poste-ornamental-eos',
        model: 'BB-VRS-ES/ED',
        description: 'Poste decorativo de globos (PVC leitoso 15×30, inclusos) com soquete E27 e luz difusa ornamental. Fuste em tubo 2" de peça única, simples (1 globo) ou duplo (2 globos). Indicado para praças, jardins e áreas de convivência que pedem conforto visual e presença arquitetônica.',
        leadTime: '15 a 20 dias úteis',
        mainImage: 'poste-eos.png',
        gallery: [],
        badges: ['NBR 6323', 'NBR 14744', 'Garantia B&B'],
        applications: ['Praças', 'Jardins', 'Áreas de convivência', 'Condomínios', 'Fachadas'],
        optionals: ['Galvanização a Fogo', 'Parabolt', 'Projeto Personalizado', 'Projeto Iluminotécnico'],
        specs: {
            material: 'Aço Carbono',
            altura: '2,0 a 3,0 m (demais sob projeto)',
            norma: 'NBR 6323 / NBR 14744',
        },
    },
    {
        name: 'Poste Astrea',
        slug: 'poste-ornamental-astrea',
        model: 'BB-VRS-ASTXX',
        description: 'Poste decorativo com estrutura ornamental ramificada, pensado para distribuir a luz de forma ampla. Solução com presença escultural para praças, acessos e áreas de convivência.',
        leadTime: '15 a 20 dias úteis',
        mainImage: 'poste-astrea.png',
        gallery: [],
        badges: ['NBR 6323', 'NBR 14744', 'Garantia B&B'],
        applications: ['Praças', 'Acessos', 'Áreas de convivência', 'Condomínios', 'Fachadas'],
        optionals: ['Projeto Personalizado', 'Pintura Eletrostática', 'Projeto Iluminotécnico'],
        specs: {
            material: 'Aço Carbono',
            altura: '2m a 6m',
            norma: 'NBR 6323 / NBR 14744',
        },
    },
]

async function importVersaProducts() {
    const payload = await getPayload({ config })
    const categoryId = await getOrCreateVersaCategory(payload)

    for (const product of products) {
        const mainImageId = await getOrCreateMedia(payload, product.mainImage)
        const gallery = []

        for (const image of product.gallery) {
            gallery.push({ image: await getOrCreateMedia(payload, image) })
        }

        const data = {
            name: product.name,
            slug: product.slug,
            model: product.model,
            category: categoryId,
            description: toLexical(product.description),
            mainImage: mainImageId,
            gallery,
            leadTime: product.leadTime,
            badges: product.badges,
            applications: product.applications.map((app) => ({ app })),
            optionals: product.optionals,
            specs: product.specs,
        }

        const existing = await payload.find({
            collection: 'products',
            limit: 1,
            where: { slug: { equals: product.slug } },
        })

        if (existing.docs.length > 0) {
            await payload.update({
                collection: 'products',
                id: existing.docs[0].id,
                data,
            })
            console.log(`updated ${product.slug}`)
            continue
        }

        await payload.create({
            collection: 'products',
            data,
        })
        console.log(`created ${product.slug}`)
    }

    process.exit(0)
}

async function getOrCreateVersaCategory(payload: any) {
    const existing = await payload.find({
        collection: 'categories',
        limit: 1,
        where: { name: { equals: 'Versa' } },
    })

    if (existing.docs.length > 0) return existing.docs[0].id

    const category = await payload.create({
        collection: 'categories',
        data: {
            name: 'Versa',
            slug: 'versa',
        },
    })

    return category.id
}

async function getOrCreateMedia(payload: any, fileName: string) {
    const existing = await payload.find({
        collection: 'media',
        limit: 1,
        where: { filename: { equals: fileName } },
    })

    if (existing.docs.length > 0) return existing.docs[0].id

    const localPath = mediaSourceDirs
        .map((dir) => path.resolve(__dirname, '../..', dir, fileName))
        .find((candidate) => fs.existsSync(candidate))

    if (!localPath) throw new Error(`Imagem não encontrada: ${fileName}`)

    const mediaFile = fs.readFileSync(localPath)
    const media = await payload.create({
        collection: 'media',
        data: { alt: fileName },
        file: {
            data: mediaFile,
            name: fileName,
            mimetype: getMimeType(fileName),
            size: mediaFile.length,
        },
    })

    return media.id
}

function toLexical(text: string) {
    return {
        root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
                {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                        {
                            mode: 'normal',
                            text,
                            type: 'text',
                            style: '',
                            detail: 0,
                            version: 1,
                        },
                    ],
                },
            ],
        },
    }
}

function getMimeType(fileName: string) {
    const ext = path.extname(fileName).toLowerCase()

    if (ext === '.png') return 'image/png'
    if (ext === '.webp') return 'image/webp'
    return 'image/jpeg'
}

importVersaProducts().catch((error) => {
    console.error(error)
    process.exit(1)
})
