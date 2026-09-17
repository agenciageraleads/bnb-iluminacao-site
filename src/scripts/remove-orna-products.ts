/**
 * Remove da base do Payload os modelos ornamentais aposentados no enxugamento da
 * Linha Orna (Aurora, Vespera e Serena — 4 registros, porque a Aurora existe em
 * duas variantes).
 *
 * Contexto: a página de produtos do site é renderizada dinamicamente do Payload
 * (`src/lib/data.ts → getProducts()`), então editar planilha de seed NÃO remove
 * nada do ar. Este script é a etapa que de fato remove.
 *
 * A collection `products` NÃO tem versionamento nem campo de status/rascunho, ou
 * seja: não existe "despublicar". A remoção é destrutiva e definitiva — por isso
 * o script roda em dry-run por padrão e sempre grava um backup antes de apagar.
 *
 * Uso:
 *   npx tsx src/scripts/remove-orna-products.ts            # dry-run (não escreve nada)
 *   npx tsx src/scripts/remove-orna-products.ts --apply    # executa
 */

import fs from 'fs'
import path from 'path'

import { getPayload } from 'payload'

import config from '../../payload.config'

/**
 * Os 4 registros a remover. A Aurora aparece duas vezes no banco, e o registro
 * engastado foi cadastrado com typo no nome ("Porte Ornamental Autora"), por isso
 * a lista é por slug — nome não é confiável aqui.
 */
const SLUGS_TO_REMOVE = [
    'poste-ornamental-aurora-flangeado',
    'porte-ornamental-autora-engastado',
    'poste-ornamental-vespera',
    'poste-ornamental-serena',
] as const

const BACKUP_DIR = path.join(process.cwd(), 'backups')

type Doc = Record<string, unknown> & { id: string | number; slug?: string; name?: string }

function relatedIds(doc: Doc): Array<string | number> {
    const related = doc.relatedProducts
    if (!Array.isArray(related)) return []
    // relatedProducts vem como id cru ou como documento populado, dependendo da profundidade
    return related.map((r) => (typeof r === 'object' && r !== null ? (r as Doc).id : (r as string | number)))
}

async function removeOrnaProducts() {
    const apply = process.argv.includes('--apply')
    const payload = await getPayload({ config })

    console.log(apply ? '\n=== MODO APPLY — vai escrever no banco ===\n' : '\n=== DRY-RUN — nada será alterado ===\n')

    // 1. Localizar os alvos
    const found = await payload.find({
        collection: 'products',
        where: { slug: { in: [...SLUGS_TO_REMOVE] } },
        limit: 100,
        depth: 0,
    })

    const targets = found.docs as Doc[]
    const foundSlugs = new Set(targets.map((d) => d.slug))
    const missing = SLUGS_TO_REMOVE.filter((s) => !foundSlugs.has(s))

    console.log(`Alvos encontrados: ${targets.length} de ${SLUGS_TO_REMOVE.length}`)
    for (const doc of targets) {
        console.log(`  • ${doc.name} (${doc.slug}) — id ${doc.id}`)
    }
    if (missing.length) {
        console.log(`\n  Não encontrados (já removidos ou slug diferente):`)
        for (const s of missing) console.log(`  • ${s}`)
    }

    if (!targets.length) {
        console.log('\nNada a fazer.')
        return
    }

    const targetIds = new Set(targets.map((d) => String(d.id)))

    // 2. Achar quem aponta para eles em relatedProducts.
    //    Sem isso, apagar deixa referência pendurada e a página do produto que
    //    referencia pode quebrar ao popular o relacionamento.
    const all = await payload.find({ collection: 'products', limit: 1000, depth: 0 })
    const referrers = (all.docs as Doc[]).filter(
        (d) => !targetIds.has(String(d.id)) && relatedIds(d).some((id) => targetIds.has(String(id))),
    )

    console.log(`\nProdutos que referenciam algum alvo em relatedProducts: ${referrers.length}`)
    for (const doc of referrers) {
        const limpos = relatedIds(doc).filter((id) => targetIds.has(String(id)))
        console.log(`  • ${doc.name} (${doc.slug}) — remove ${limpos.length} referência(s)`)
    }

    // 3. Mídia usada só por eles (relatado, NÃO apagado — mídia pode ser
    //    reaproveitada em posts, LPs e páginas regionais fora desta collection)
    const mediaIds = new Set<string>()
    for (const doc of targets) {
        if (doc.mainImage) mediaIds.add(String(doc.mainImage))
        const gallery = doc.gallery
        if (Array.isArray(gallery)) {
            for (const item of gallery) {
                const img = (item as Doc)?.image
                if (img) mediaIds.add(String(img))
            }
        }
    }
    if (mediaIds.size) {
        console.log(`\nMídia vinculada a esses produtos (NÃO será apagada por este script): ${mediaIds.size} item(ns)`)
        console.log(`  ids: ${[...mediaIds].join(', ')}`)
    }

    if (!apply) {
        console.log('\nDry-run encerrado. Rode com --apply para executar.\n')
        return
    }

    // 4. Backup antes de qualquer escrita
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupPath = path.join(BACKUP_DIR, `orna-removal-${stamp}.json`)
    fs.writeFileSync(
        backupPath,
        JSON.stringify({ removedAt: stamp, targets, referrers }, null, 2),
        'utf-8',
    )
    console.log(`\nBackup gravado em ${backupPath}`)

    // 5. Limpar referências ANTES de apagar
    for (const doc of referrers) {
        const restantes = relatedIds(doc).filter((id) => !targetIds.has(String(id)))
        await payload.update({
            collection: 'products',
            id: doc.id,
            data: { relatedProducts: restantes },
        })
        console.log(`  referências limpas em ${doc.slug}`)
    }

    // 6. Apagar os alvos
    for (const doc of targets) {
        await payload.delete({ collection: 'products', id: doc.id })
        console.log(`  removido ${doc.slug}`)
    }

    console.log(`\nConcluído: ${targets.length} produto(s) removido(s), ${referrers.length} referência(s) saneada(s).`)
    console.log('Confira /produtos e o sitemap depois do próximo build.\n')
}

removeOrnaProducts()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
