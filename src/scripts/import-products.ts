import { getPayload } from 'payload'
import config from '../../payload.config'
import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Configuração para compatibilidade de diretório
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function importProducts() {
    console.log('--- Iniciando Importação Massiva de Produtos ---')
    
    // 1. Inicializar Payload
    const payload = await getPayload({ config })
    
    // 2. Localizar arquivo Excel
    const excelPath = path.resolve(__dirname, '../../products-to-import.xlsx')
    if (!fs.existsSync(excelPath)) {
        console.error(`Erro: Arquivo não encontrado em ${excelPath}`)
        process.exit(1)
    }

    // 3. Ler Excel
    const fileBuffer = fs.readFileSync(excelPath)
    const workbook = XLSX.read(fileBuffer)
    const sheetName = workbook.SheetNames[0]
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as any[]

    console.log(`Encontrados ${data.length} produtos para processar.`)

    for (const row of data) {
        try {
            if (!row.Nome) continue; // Pular linhas vazias
            console.log(`\n> Processando: ${row.Nome}`)

            // A. Gerenciar Categoria
            let categoryId = null
            if (row.Categoria) {
                const { docs: existingCats } = await payload.find({
                    collection: 'categories',
                    where: {
                        name: { equals: row.Categoria },
                    },
                })

                if (existingCats.length > 0) {
                    categoryId = existingCats[0].id
                } else {
                    console.log(`  - Criando nova categoria: ${row.Categoria}`)
                    const newCat = await payload.create({
                        collection: 'categories',
                        data: {
                            name: row.Categoria,
                            slug: row.Categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-'),
                        },
                    })
                    categoryId = newCat.id
                }
            }

            // B. Gerenciar Imagem Principal
            let mainImageId = null
            if (row.Imagem_Principal) {
                mainImageId = await getOrCreateMedia(payload, row.Imagem_Principal)
            }

            // C. Gerenciar Galeria
            const galleryIds: any[] = []
            if (row.Galeria) {
                const images = row.Galeria.split(';').map((s: string) => s.trim())
                for (const imgName of images) {
                    const id = await getOrCreateMedia(payload, imgName)
                    if (id) galleryIds.push({ image: id })
                }
            }

            // D. Formatar RichText (Lexical)
            const descriptionJSON = {
                root: {
                    children: [
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: 'normal',
                                    style: '',
                                    text: row.Descricao || '',
                                    type: 'text',
                                    version: 1,
                                },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            type: 'paragraph',
                            version: 1,
                        },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'root',
                    version: 1,
                },
            }

            // E. Criar Produto
            const productData: any = {
                name: row.Nome,
                slug: row.Slug || row.Nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-'),
                model: row.Modelo,
                category: categoryId,
                description: row.Descricao ? {
                    root: {
                        type: 'root',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{
                            type: 'paragraph',
                            format: '',
                            indent: 0,
                            version: 1,
                            children: [{
                                mode: 'normal',
                                text: row.Descricao,
                                type: 'text',
                                style: '',
                                detail: 0,
                                version: 1
                            }]
                        }]
                    }
                } : {
                    root: {
                        type: 'root',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{
                            type: 'paragraph',
                            format: '',
                            indent: 0,
                            version: 1,
                            children: [{
                                mode: 'normal',
                                text: 'Descrição em breve.',
                                type: 'text',
                                style: '',
                                detail: 0,
                                version: 1
                            }]
                        }]
                    }
                },
                mainImage: mainImageId,
                gallery: galleryIds,
                leadTime: row.Prazo_Producao,
                badges: row.Badges ? row.Badges.split(',').map((s: string) => s.trim()) : [],
                applications: (row.Aplicacoes || row.Aplicações) ? (row.Aplicacoes || row.Aplicações).split(',').map((s: string) => ({ app: s.trim() })) : [],
                optionals: row.Opcionais ? row.Opcionais.split(',').map((s: string) => ({ option: s.trim() })) : [],
                specs: {
                    material: row.Spec_Material || 'Aço Galvanizado a Fogo',
                    altura: row.Spec_Altura,
                    diametro: row.Spec_Diametro,
                    norma: row.Spec_Norma || 'NBR 6323 / NBR 14744',
                }
            }

            // Verificar se o produto já existe pelo slug
            const { docs: existingProds } = await payload.find({
                collection: 'products',
                where: { slug: { equals: productData.slug } }
            })

            if (existingProds.length > 0) {
                await payload.update({
                    collection: 'products',
                    id: existingProds[0].id,
                    data: productData
                })
                console.log(`  ✓ Produto atualizado: ${productData.slug}`)
            } else {
                await payload.create({
                    collection: 'products',
                    data: productData
                })
                console.log(`  ✓ Produto criado: ${productData.slug}`)
            }

        } catch (err: any) {
            console.error(`  ✕ Erro ao processar ${row.Nome}:`, err.message)
        }
    }

    console.log('\n--- Importação Concluída ---')
    process.exit(0)
}

/**
 * Busca imagem na biblioteca ou faz upload se o arquivo existir em /temp_images
 */
async function getOrCreateMedia(payload: any, fileName: string) {
    // 1. Tentar encontrar pelo nome do arquivo
    const { docs: existingMedia } = await payload.find({
        collection: 'media',
        where: { filename: { equals: fileName } }
    })

    if (existingMedia.length > 0) return existingMedia[0].id

    // 2. Se não existir, tentar subir da pasta temporária
    const tempPath = path.resolve(__dirname, '../../temp_images', fileName)
    if (fs.existsSync(tempPath)) {
        console.log(`  - Subindo imagem: ${fileName}`)
        const mediaFile = fs.readFileSync(tempPath)
        const mediaDoc = await payload.create({
            collection: 'media',
            data: { alt: fileName },
            file: {
                data: mediaFile,
                name: fileName,
                mimetype: fileName.endsWith('.png') ? 'image/png' : 'image/jpeg',
                size: mediaFile.length,
            },
        })
        return mediaDoc.id
    }

    console.warn(`  ! Imagem não encontrada: ${fileName}`)
    return null
}

importProducts()
