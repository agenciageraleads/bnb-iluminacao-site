/**
 * Script de Otimização SEO: Reescrita de Descrições de Produtos (B&B)
 * Versão standalone — funciona SEM Payload local, usando a API REST da VPS.
 * 
 * Fluxo seguro:
 * 1. --fetch    → Busca produtos da VPS e salva em JSON local
 * 2. --rewrite  → Usa Gemini para gerar descrições otimizadas (preview)
 * 3. --apply    → Envia descrições aprovadas de volta para a VPS
 * 
 * Uso:
 *   npx tsx src/scripts/seo-rewrite-descriptions.ts --fetch
 *   npx tsx src/scripts/seo-rewrite-descriptions.ts --rewrite
 *   npx tsx src/scripts/seo-rewrite-descriptions.ts --apply
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuração da VPS (API REST do Payload)
const VPS_BASE_URL = process.env.BNB_VPS_URL || 'http://168.231.95.29:9010'
const PAYLOAD_API = `${VPS_BASE_URL}/api`

// Caminhos dos arquivos
const PRODUCTS_PATH = path.resolve(__dirname, '../../seo-products-raw.json')
const PREVIEW_PATH = path.resolve(__dirname, '../../seo-descriptions-preview.json')

// Gemini
const apiKey = process.env.GEMINI_API_KEY || ''
if (!apiKey) {
    console.error('ERRO: GEMINI_API_KEY não encontrada no .env')
    process.exit(1)
}
const genAI = new GoogleGenerativeAI(apiKey)

/**
 * Extrai texto puro de um campo Lexical RichText do Payload
 */
function extractText(node: any): string {
    if (!node) return ""
    if (typeof node === "string") return node
    if (node.text) return node.text
    if (node.children) {
        return node.children.map((child: any) => extractText(child)).join(" ").trim()
    }
    if (node.root) return extractText(node.root)
    return ""
}

/**
 * Converte texto puro em formato Lexical RichText (Payload)
 */
function textToLexical(text: string) {
    return {
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
                direction: 'ltr',
                children: [{
                    mode: 'normal',
                    text,
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                }]
            }]
        }
    }
}

// ============================================================
// FASE 1: FETCH — Busca produtos da VPS
// ============================================================
async function runFetch() {
    console.log('📡 Buscando produtos da VPS...\n')

    const res = await fetch(`${PAYLOAD_API}/products?limit=200&depth=1`, {
        headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
        console.error(`❌ Erro ao buscar: ${res.status} ${res.statusText}`)
        process.exit(1)
    }

    const data = await res.json()
    const products = data.docs

    console.log(`📦 ${products.length} produtos encontrados.`)

    // Salvar produtos brutos
    fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2), 'utf-8')
    console.log(`💾 Produtos salvos em: ${PRODUCTS_PATH}`)
    console.log(`\n👉 Próximo passo: npx tsx src/scripts/seo-rewrite-descriptions.ts --rewrite`)

    process.exit(0)
}

// ============================================================
// FASE 2: REWRITE — Gera descrições otimizadas via Gemini
// ============================================================
async function runRewrite() {
    console.log('✍️  Gerando descrições otimizadas via Gemini...\n')

    if (!fs.existsSync(PRODUCTS_PATH)) {
        console.error(`❌ Arquivo de produtos não encontrado. Rode --fetch primeiro.`)
        process.exit(1)
    }

    const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'))
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const results: any[] = []

    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const categoryName = (product.category as any)?.name || 'Sem categoria'
        const currentDesc = extractText(product.description)

        console.log(`[${i + 1}/${products.length}] ${product.name} (${product.model})`)

        // Montar especificações
        const specs = []
        if (product.specs?.material) specs.push(`Material: ${product.specs.material}`)
        if (product.specs?.altura) specs.push(`Altura: ${product.specs.altura}`)
        if (product.specs?.diametro) specs.push(`Diâmetro: ${product.specs.diametro}`)
        if (product.specs?.norma) specs.push(`Norma: ${product.specs.norma}`)

        const applications = (product.applications || []).map((a: any) => a.app).join(', ')
        const badges = (product.badges || []).join(', ')

        const prompt = `
Você é um especialista em SEO para o setor de iluminação industrial e pública no Brasil.
Reescreva a descrição do produto abaixo para otimizar o ranqueamento orgânico no Google.

PRODUTO:
- Nome: ${product.name}
- Modelo: ${product.model}
- Categoria: ${categoryName}
- Descrição atual: "${currentDesc || 'Sem descrição'}"
- Especificações: ${specs.join(', ') || 'Não informadas'}
- Aplicações: ${applications || 'Não informadas'}
- Certificações: ${badges || 'Não informadas'}

DIRETRIZES OBRIGATÓRIAS:
1. Use termos semânticos (LSI) que as pessoas realmente buscam no Google:
   - "poste de iluminação pública", "poste galvanizado a fogo", "poste para condomínio"
   - "iluminação LED para quadras", "poste decorativo para praças"
   - "NBR 6323", "NBR 14744", "galvanização a fogo"
   - "fabricante de postes", "indústria de postes metálicos"
2. Inclua o nome da cidade "Goiânia" ou "Goiás" pelo menos uma vez (SEO Local).
3. Mencione pelo menos uma norma técnica (NBR) quando aplicável.
4. Mantenha entre 150-250 palavras.
5. Tom técnico-profissional, mas acessível. Sem exageros publicitários.
6. Não use bullet points. Texto corrido em parágrafos.
7. Comece direto com o nome do produto ou sua função principal.

RETORNE APENAS o texto da descrição, sem aspas, sem JSON, sem formatação markdown.`

        try {
            const result = await model.generateContent(prompt)
            const newDesc = result.response.text().trim()

            results.push({
                id: product.id,
                slug: product.slug,
                name: product.name,
                model: product.model,
                category: categoryName,
                descricao_atual: currentDesc || '(vazio)',
                descricao_nova: newDesc,
                palavras: newDesc.split(/\s+/).length,
                status: 'pendente',
            })

            console.log(`  ✅ ${newDesc.split(/\s+/).length} palavras geradas`)

            // Rate limit: 1s entre chamadas
            await new Promise(resolve => setTimeout(resolve, 1200))

        } catch (err: any) {
            console.error(`  ❌ Erro: ${err.message}`)
            results.push({
                id: product.id,
                slug: product.slug,
                name: product.name,
                descricao_atual: currentDesc,
                descricao_nova: null,
                status: 'erro',
                erro: err.message,
            })
        }
    }

    fs.writeFileSync(PREVIEW_PATH, JSON.stringify(results, null, 2), 'utf-8')

    const successCount = results.filter(r => r.status === 'pendente').length
    console.log(`\n📄 Preview salvo em: ${PREVIEW_PATH}`)
    console.log(`✅ ${successCount} descrições geradas com sucesso`)
    console.log(`\n👉 Revise o JSON. Mude "status" para "aprovado" nos itens que deseja aplicar.`)
    console.log(`   Depois rode: npx tsx src/scripts/seo-rewrite-descriptions.ts --apply`)

    process.exit(0)
}

// ============================================================
// FASE 3: APPLY — Envia descrições aprovadas para a VPS
// ============================================================
async function runApply() {
    console.log('🚀 Aplicando descrições aprovadas na VPS...\n')

    if (!fs.existsSync(PREVIEW_PATH)) {
        console.error(`❌ Arquivo de preview não encontrado. Rode --rewrite primeiro.`)
        process.exit(1)
    }

    const data = JSON.parse(fs.readFileSync(PREVIEW_PATH, 'utf-8'))
    const approved = data.filter((item: any) => item.status === 'aprovado')

    if (approved.length === 0) {
        console.log('⚠️  Nenhum item com status "aprovado".')
        console.log('   Edite o JSON e mude "status" para "aprovado" nos itens desejados.')
        process.exit(0)
    }

    console.log(`📝 ${approved.length} descrições para aplicar.\n`)

    let successCount = 0
    let errorCount = 0

    for (const item of approved) {
        try {
            console.log(`  Atualizando: ${item.name} (${item.slug})`)

            const res = await fetch(`${PAYLOAD_API}/products/${item.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description: textToLexical(item.descricao_nova),
                }),
            })

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${await res.text()}`)
            }

            successCount++
            console.log(`  ✅ OK`)
        } catch (err: any) {
            errorCount++
            console.error(`  ❌ Erro: ${err.message}`)
        }
    }

    console.log(`\n--- Resultado ---`)
    console.log(`✅ Sucesso: ${successCount}`)
    console.log(`❌ Erros: ${errorCount}`)

    // Atualizar status
    for (const item of data) {
        if (item.status === 'aprovado') {
            item.status = 'aplicado'
        }
    }
    fs.writeFileSync(PREVIEW_PATH, JSON.stringify(data, null, 2), 'utf-8')

    process.exit(0)
}

// --- Ponto de entrada ---
const args = process.argv.slice(2)

if (args.includes('--apply')) {
    runApply().catch(console.error)
} else if (args.includes('--rewrite')) {
    runRewrite().catch(console.error)
} else if (args.includes('--fetch')) {
    runFetch().catch(console.error)
} else {
    console.log(`
📖 Uso do Script SEO Rewrite:

  --fetch     Busca produtos da VPS e salva localmente
  --rewrite   Gera descrições otimizadas via Gemini (preview)
  --apply     Aplica descrições aprovadas de volta na VPS

Fluxo recomendado:
  1. npx tsx src/scripts/seo-rewrite-descriptions.ts --fetch
  2. npx tsx src/scripts/seo-rewrite-descriptions.ts --rewrite
  3. Revisar o arquivo seo-descriptions-preview.json
  4. Mudar "status" para "aprovado" nos itens desejados
  5. npx tsx src/scripts/seo-rewrite-descriptions.ts --apply
`)
}
