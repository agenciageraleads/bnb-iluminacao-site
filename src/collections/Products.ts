import { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
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
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
        },
        {
            name: 'description',
            type: 'richText',
            required: true,
        },
        {
            name: 'mainImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
        {
            name: 'specs',
            type: 'group',
            label: 'Especificações Técnicas',
            fields: [
                {
                    name: 'material',
                    type: 'text',
                    defaultValue: 'Aço Galvanizado a Fogo',
                },
                {
                    name: 'altura',
                    type: 'text',
                    admin: { description: 'Ex: 3m a 12m' },
                },
                {
                    name: 'diametro',
                    type: 'text',
                    admin: { description: 'Ex: 60mm' },
                },
                {
                    name: 'norma',
                    type: 'text',
                    defaultValue: 'NBR 6323 / NBR 14744',
                },
            ],
        },
        {
            name: 'downloads',
            type: 'array',
            label: 'Arquivos Técnicos',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'file',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}

export default Products
