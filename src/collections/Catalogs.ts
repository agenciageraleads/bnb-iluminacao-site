import type { CollectionConfig } from 'payload'

export const Catalogs: CollectionConfig = {
    slug: 'catalogs',
    admin: {
        useAsTitle: 'title',
        group: 'Marketing',
    },
    fields: [
        {
            name: 'generatePdf',
            type: 'ui',
            admin: {
                components: {
                    Field: '@/components/admin/GeneratePdfButton#GeneratePdfButton',
                },
                position: 'sidebar',
            },
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Título do Catálogo (ex: Linha Decorativa 2024)',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Descrição Curta',
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Imagem de Capa (Miniatura)',
        },
        {
            name: 'category',
            type: 'select',
            options: [
                { label: 'Geral', value: 'geral' },
                { label: 'Postes Decorativos', value: 'decorativo' },
                { label: 'Iluminação Pública', value: 'publica' },
                { label: 'Industrial', value: 'industrial' },
            ],
            defaultValue: 'geral',
        },
        {
            name: 'layout',
            type: 'blocks',
            label: 'Layout do Catálogo (Páginas)',
            blocks: [
                {
                    slug: 'cover',
                    labels: { singular: 'Capa', plural: 'Capas' },
                    fields: [
                        { name: 'title', type: 'text', label: 'Título Grande' },
                        { name: 'subtitle', type: 'text', label: 'Subtítulo' },
                        { name: 'image', type: 'upload', relationTo: 'media', label: 'Foto de Fundo' },
                    ]
                },
                {
                    slug: 'productGrid',
                    labels: { singular: 'Grade de Produtos', plural: 'Grades de Produtos' },
                    fields: [
                        { name: 'title', type: 'text', label: 'Título da Página (ex: Linha Telecônica)' },
                        { name: 'products', type: 'relationship', relationTo: 'products', hasMany: true, label: 'Produtos' },
                    ]
                },
                {
                    slug: 'fullText',
                    labels: { singular: 'Página de Texto', plural: 'Páginas de Texto' },
                    fields: [
                        { name: 'content', type: 'richText', label: 'Conteúdo' },
                    ]
                }
            ]
        },
        {
            name: 'file',
            type: 'upload',
            relationTo: 'media',
            required: false,
            label: 'Arquivo PDF (Upload ou Gerado)',
        },
    ],
}


export const CatalogLeads: CollectionConfig = {
    slug: 'catalog-leads',
    admin: {
        useAsTitle: 'email',
        group: 'Marketing',
        defaultColumns: ['name', 'email', 'company', 'companyCnpj', 'createdAt'],
    },
    access: {
        create: () => true,
        read: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Nome Completo',
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            label: 'E-mail Corporativo',
        },
        {
            name: 'phone',
            type: 'text',
            required: true,
            label: 'Telefone/WhatsApp',
        },
        {
            name: 'company',
            type: 'text',
            required: true,
            label: 'Nome da Empresa',
        },
        {
            name: 'companyCnpj',
            type: 'text',
            required: true,
            label: 'CNPJ da Empresa',
        },
        {
            name: 'catalogDownloaded',
            type: 'relationship',
            relationTo: 'catalogs',
            label: 'Catálogo Baixado',
        }
    ],
    timestamps: true,
}
