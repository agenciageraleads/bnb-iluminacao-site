import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const clientsData = [
  { order: 1, name: "Cargill Agrícola S/A", logo: "cargill.png" },
  { order: 2, name: "FGR Incorporações / SPEs Jardins", logo: "fgr.svg" },
  { order: 3, name: "Tecsidel do Brasil", logo: "tecsidel.png" },
  { order: 4, name: "Rota Verde Goiás SPE S.A.", logo: "rota-verde.png" },
  { order: 5, name: "Jaraguá Luz Concessionária de Cidade Inteligente SPE LTDA", logo: "jaragua-luz.jpeg" },
  { order: 6, name: "BOLD S.A.", logo: "bold.svg" },
  { order: 7, name: "Metalúrgica Gravia", logo: "gravia.png" },
  { order: 8, name: "Agronorte Nutrição Animal / Serviços de Armazenagem", logo: "agronorte.png" },
  { order: 9, name: "SP Enge Construtora", logo: "sp-enge.png" },
  { order: 10, name: "CCB Construtora / Construtora Central do Brasil S.A.", logo: "ccb.png" },
  { order: 11, name: "Elétrica Elevar LTDA", logo: "eletrica-elevar.png" },
  { order: 12, name: "Impetus Energy e Business LTDA", logo: "impetus-energy.png" },
  { order: 13, name: "Colégio Arena / Agora Médio", logo: "colegio-arena.png" }
]

function getMimeType(fileName: string) {
    if (fileName.endsWith('.png')) return 'image/png'
    if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) return 'image/jpeg'
    if (fileName.endsWith('.svg')) return 'image/svg+xml'
    return 'application/octet-stream'
}

async function importClients() {
    console.log('--- Iniciando Importação de Clientes ---')
    const payload = await getPayload({ config })
    
    // Caminho da pasta extraída
    const logosDir = path.resolve(__dirname, 'client-logos')

    for (const client of clientsData) {
        try {
            console.log(`> Processando Cliente: ${client.name}`)
            const logoPath = path.join(logosDir, client.logo)
            
            if (!fs.existsSync(logoPath)) {
                console.warn(`  ! Logo não encontrada para ${client.name}: ${logoPath}`)
                continue
            }

            // 1. Verificar se cliente já existe
            const { docs: existingClients } = await payload.find({
                collection: 'clients',
                where: { name: { equals: client.name } }
            })

            if (existingClients.length > 0) {
                console.log(`  - Cliente já existe, ignorando.`)
                continue
            }

            // 2. Verificar se a logo já existe na mídia (pelo nome original no payload)
            const { docs: existingMedia } = await payload.find({
                collection: 'media',
                where: { filename: { equals: client.logo } }
            })

            let mediaId = null;

            if (existingMedia.length > 0) {
                console.log(`  - Media já existe: ${client.logo}`)
                mediaId = existingMedia[0].id
            } else {
                console.log(`  - Fazendo upload da logo: ${client.logo}`)
                const fileData = fs.readFileSync(logoPath)
                const fileSize = fs.statSync(logoPath).size
                const mimeType = getMimeType(client.logo)

                const media = await payload.create({
                    collection: 'media',
                    data: {
                        alt: `Logo do cliente ${client.name}`,
                    },
                    file: {
                        data: fileData,
                        mimetype: mimeType,
                        name: client.logo,
                        size: fileSize,
                    }
                })
                mediaId = media.id
            }

            // 3. Criar o Cliente
            await payload.create({
                collection: 'clients',
                data: {
                    name: client.name,
                    order: client.order,
                    logo: mediaId
                }
            })

            console.log(`  ✓ Cliente criado com sucesso!`)
            
        } catch (err: any) {
            console.error(`  ✕ Erro em ${client.name}:`, err.message)
        }
    }
    console.log('--- Importação Concluída ---')
    process.exit(0)
}

importClients()
