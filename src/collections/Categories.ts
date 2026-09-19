import { CollectionConfig } from 'payload'

const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: ({ req }) => req.user ? true : { slug: { in: ['urban', 'orna', 'versa', 'forza', 'vigia', 'nexo', 'civis', 'linha-urban', 'linha-orna', 'linha-versa', 'linha-forza', 'linha-vigia', 'linha-nexo', 'linha-civis'] } },
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'Slug para URLs (ex: publica, decorativa)',
            },
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ],
}

export default Categories
