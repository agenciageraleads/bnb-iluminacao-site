import { getPayload } from 'payload'
import config from './payload.config'
import * as dotenv from 'dotenv'

dotenv.config()

async function resetAdmins() {
  const payload = await getPayload({ config })
  const newPassword = 'Admin_BeB_2024!'

  const usersToReset = ['test@admin.com', 'financeiro@bebiluminacao.com']

  for (const email of usersToReset) {
    try {
      const updated = await payload.update({
        collection: 'users',
        where: {
          email: { equals: email }
        },
        data: {
          password: newPassword,
        },
      })
      if (updated.docs.length > 0) {
        console.log(`Password reset for ${email} to: ${newPassword}`)
      } else {
        console.log(`User ${email} not found.`)
      }
    } catch (error) {
      console.error(`Error resetting ${email}:`, error.message)
    }
  }

  // Ensure contato@bebiluminacao.com.br exists too as a backup
  try {
    const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: 'contato@bebiluminacao.com.br' } }
    })
    if (existing.docs.length === 0) {
        await payload.create({
            collection: 'users',
            data: {
              email: 'contato@bebiluminacao.com.br',
              password: newPassword,
              name: 'Lucas B&B',
              role: 'admin',
            },
        })
        console.log('Created backup admin: contato@bebiluminacao.com.br')
    }
  } catch (e) {
      console.error('Error creating backup admin:', e.message)
  }

  process.exit(0)
}

resetAdmins()
