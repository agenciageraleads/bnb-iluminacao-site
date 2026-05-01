import { CollectionConfig } from 'payload'

const Regions: CollectionConfig = {
    slug: 'regions',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'cityName',
    },
    fields: [
        {
            name: 'cityName',
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
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Foto da Cidade (Destaque)',
        },
        {
            name: 'content',
            type: 'richText',
            label: 'Conteúdo Principal',
        },
        {
            name: 'trust',
            type: 'group',
            label: 'Elementos de Confiança',
            fields: [
                {
                    name: 'logistics',
                    type: 'text',
                    label: 'Logística para a Região',
                    admin: { placeholder: 'Ex: Logística facilitada com parceiros especializados.' },
                },
                {
                    name: 'deliveryTime',
                    type: 'text',
                    label: 'Prazo Estimado',
                    admin: { placeholder: 'Ex: 7 a 15 dias úteis.' },
                },
                {
                    name: 'warranty',
                    type: 'text',
                    label: 'Garantia',
                    admin: { placeholder: 'Ex: 12 meses contra corrosão.' },
                },
            ],
        },
        {
            name: 'faq',
            type: 'array',
            label: 'Perguntas Frequentes (FAQ)',
            fields: [
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'answer',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
        {
            name: 'meta',
            type: 'group',
            label: 'SEO / Meta Tags',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
            ],
        },
    ],
}

export default Regions
