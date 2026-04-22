import { getPayload } from 'payload'
import config from '../payload.config.js' // Ajustado para .js ou import local
import { portfolioItems } from './lib/constants.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function seed() {
  const payload = await getPayload({ config })
  
  for (const item of portfolioItems) {
      const filePath = path.join(process.cwd(), 'public', item.image)
      if (!fs.existsSync(filePath)) continue

      const mediaDoc = await payload.create({
        collection: 'media',
        data: { alt: `Projeto ${item.title}` },
        file: {
          data: fs.readFileSync(filePath),
          name: path.basename(filePath),
          mimetype: 'image/png',
          size: fs.statSync(filePath).size,
        },
      })

      await payload.create({
        collection: 'projects' as any,
        data: {
          title: item.title,
          category: item.category,
          location: item.location,
          image: mediaDoc.id,
        },
      })
      console.log(`Povoado: ${item.title}`)
  }
}

seed().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
