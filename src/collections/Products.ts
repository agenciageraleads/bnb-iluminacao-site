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
            name: 'model',
            type: 'text',
            label: 'Modelo/Código',
            required: true,
            admin: {
                description: 'Ex: PC-D1',
            },
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
            name: 'badges',
            type: 'select',
            hasMany: true,
            label: 'Badges e Certificações',
            options: [
                { label: 'NBR 6323', value: 'NBR 6323' },
                { label: 'NBR 6123', value: 'NBR 6123' },
                { label: 'Qualidade ISO', value: 'Qualidade ISO' },
                { label: 'Garantia B&B', value: 'Garantia B&B' },
                { label: 'Selo Próprio', value: 'Selo Próprio' },
            ],
        },
        {
            name: 'applications',
            type: 'array',
            label: 'Aplicações Recomendadas',
            fields: [
                {
                    name: 'app',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'leadTime',
            type: 'text',
            label: 'Prazo de Produção',
            admin: {
                placeholder: '15 a 30 dias úteis',
            },
        },
        {
            name: 'relatedProducts',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            label: 'Produtos Relacionados',
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
            label: 'Arquivos Técnicos / Ficha Técnica',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    admin: {
                        placeholder: 'Ex: Ficha Técnica PDF',
                    },
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
