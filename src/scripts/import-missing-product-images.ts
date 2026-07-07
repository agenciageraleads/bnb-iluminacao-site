import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { getPayload } from 'payload'

import config from '../../payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const mediaSourceDirs = ['public/images/produtos', 'produto_imagens', 'media']

const imageAssignments = [
    {
        slug: 'mastro-bandeira-engastado',
        productName: 'Mastro p/ Bandeira Engastado',
        fileName: 'mastro-bandeira-engastado.jpg',
    },
    {
        slug: 'mastro-bandeira-flangeado',
        productName: 'Mastro p/ Bandeira Flangeado',
        fileName: 'mastro-bandeira-flangeado.jpg',
    },
    {
        slug: 'poste-articulado-engastado',
        productName: 'Poste Telecônico Articulado Engastado',
        fileName: 'poste-articulado.png',
    },
    {
        slug: 'poste-articulado-flangeado',
        productName: 'Poste Telecônico Articulado Flangeado',
        fileName: 'poste-articulado.png',
    },
    {
        slug: 'poste-cruzeta-refletor-engastado',
        productName: 'Poste c/ Cruzeta p/ Refletor Engastado',
        fileName: 'poste-cruzeta-refletor.png',
    },
    {
        slug: 'poste-cruzeta-refletor-flangeado',
        productName: 'Poste c/ Cruzeta p/ Refletor Flangeado',
        fileName: 'poste-cruzeta-refletor.png',
    },
    {
        slug: 'poste-placa-solar-engastado',
        productName: 'Poste p/ Placa Solar Engastado',
        fileName: 'poste-placa-solar.png',
    },
    {
        slug: 'poste-placa-solar-flangeado',
        productName: 'Poste p/ Placa Solar Flangeado',
        fileName: 'poste-placa-solar.png',
    },
    {
        slug: 'poste-camera-bullet-engastado',
        productName: 'Poste p/ Câmera Bullet Engastado',
        fileName: 'poste-camera-bullet.png',
    },
    {
        slug: 'poste-camera-dome-engastado',
        productName: 'Poste p/ Câmera Dome Engastado',
        fileName: 'poste-camera-dome.png',
    },
    {
        slug: 'poste-camera-dome-flangeado',
        productName: 'Poste p/ Câmera Dome Flangeado',
        fileName: 'poste-camera-dome.png',
    },
]

async function importMissingProductImages() {
    const payload = await getPayload({ config })

    for (const assignment of imageAssignments) {
        const product = await payload.find({
            collection: 'products',
            limit: 1,
            where: { slug: { equals: assignment.slug } },
        })

        if (product.docs.length === 0) {
            console.warn(`missing product ${assignment.slug}`)
            continue
        }

        const mediaId = await getOrCreateMedia(payload, assignment.fileName, assignment.productName)

        await payload.update({
            collection: 'products',
            id: product.docs[0].id,
            data: { mainImage: mediaId },
        })

        console.log(`updated ${assignment.slug} -> ${assignment.fileName}`)
    }

    process.exit(0)
}

async function getOrCreateMedia(payload: any, fileName: string, alt: string) {
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
        data: { alt },
        file: {
            data: mediaFile,
            name: fileName,
            mimetype: getMimeType(fileName),
            size: mediaFile.length,
        },
    })

    return media.id
}

function getMimeType(fileName: string) {
    const ext = path.extname(fileName).toLowerCase()

    if (ext === '.png') return 'image/png'
    if (ext === '.webp') return 'image/webp'
    if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
    return 'application/octet-stream'
}

importMissingProductImages().catch((error) => {
    console.error(error)
    process.exit(1)
})
