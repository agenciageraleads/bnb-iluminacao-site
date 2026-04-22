import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { portfolioItems } from '@/lib/constants'
import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    console.log('Iniciando Seeding de Projetos...')
    
    const results = []

    for (const item of portfolioItems) {
      // 1. Verificar se o projeto já existe para evitar duplicatas
      const existing = await payload.find({
        collection: 'projects' as any,
        where: {
          title: {
            equals: item.title,
          },
        },
      })

      if (existing.docs.length > 0) {
        results.push({ title: item.title, status: 'skipped (exists)' })
        continue
      }

      // 2. Upload da Imagem para a coleção Media
      // O caminho físico é public + item.image
      const filePath = path.join(process.cwd(), 'public', item.image)
      
      if (!fs.existsSync(filePath)) {
        console.warn(`Arquivo não encontrado: ${filePath}`)
        results.push({ title: item.title, status: 'error (file not found)' })
        continue
      }

      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `Projeto ${item.title}`,
        },
        file: {
          data: fs.readFileSync(filePath),
          name: path.basename(filePath),
          mimetype: 'image/png', // A maioria é .png conforme constants.ts
          size: fs.statSync(filePath).size,
        },
      })

      // 3. Criar registro do Projeto
      await payload.create({
        collection: 'projects' as any,
        data: {
          title: item.title,
          category: item.category,
          location: item.location,
          image: mediaDoc.id,
        },
      })

      results.push({ title: item.title, status: 'success' })
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error('Erro no Seeding:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
