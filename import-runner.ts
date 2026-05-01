import { getPayload } from 'payload'
import config from './payload.config'
import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function importProducts() {
    console.log('--- Iniciando Importação (Runner) ---')
    const payload = await getPayload({ config })
    const excelPath = path.resolve(__dirname, './products-to-import.xlsx')
    
    if (!fs.existsSync(excelPath)) {
        console.error(`Erro: Arquivo não encontrado em ${excelPath}`)
        process.exit(1)
    }

    const fileBuffer = fs.readFileSync(excelPath)
    const workbook = XLSX.read(fileBuffer)
    const sheetName = workbook.SheetNames[0]
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as any[]

    for (const row of data) {
        try {
            if (!row.Nome) continue;
            console.log(`> Processando: ${row.Nome}`)

            let categoryId = null
            if (row.Categoria) {
                const { docs: existingCats } = await payload.find({
                    collection: 'categories',
                    where: { name: { equals: row.Categoria } },
                })
                if (existingCats.length > 0) {
                    categoryId = existingCats[0].id
                    console.log(`  - Categoria encontrada: ${row.Categoria} (ID: ${categoryId})`)
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
                    console.log(`  - Categoria criada (ID: ${categoryId})`)
                }
            } else {
                console.warn(`  ! Produto sem categoria definido no Excel.`)
            }

            const productData: any = {
                name: row.Nome,
                slug: row.Slug || row.Nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-'),
                model: row.Modelo,
                category: categoryId,
                description: {
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
                                text: row.Descricao || 'Descrição em breve.',
                                type: 'text',
                                style: '',
                                detail: 0,
                                version: 1
                            }]
                        }]
                    }
                },
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
                console.log(`  ✓ Atualizado: ${productData.slug}`)
            } else {
                await payload.create({
                    collection: 'products',
                    data: productData
                })
                console.log(`  ✓ Criado: ${productData.slug}`)
            }
        } catch (err: any) {
            console.error(`  ✕ Erro em ${row.Nome}:`, err.message)
        }
    }
    process.exit(0)
}

importProducts()
