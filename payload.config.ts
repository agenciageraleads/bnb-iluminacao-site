import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import Users from './src/collections/Users'
import Products from './src/collections/Products'
import Categories from './src/collections/Categories'
import Media from './src/collections/Media'
import Blog from './src/collections/Blog'
import Regions from './src/collections/Regions'
import Representatives from './src/collections/Representatives'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: 'users',
    },
    collections: [
        Users,
        Products,
        Categories,
        Media,
        Blog,
        Regions,
        Representatives,
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'bnb_secret_key_generated_securely_123',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
})
