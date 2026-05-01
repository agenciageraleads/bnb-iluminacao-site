import { CollectionConfig } from 'payload'

const Projects: CollectionConfig = {
    slug: 'projects',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },
    labels: {
        singular: 'Projeto/Obra',
        plural: 'Projetos e Obras',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Título da Obra',
        },
        {
            name: 'category',
            type: 'text',
            required: true,
            label: 'Categoria (ex: Industrial, Público)',
        },
        {
            name: 'location',
            type: 'text',
            required: true,
            label: 'Localização (Cidade, UF)',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Foto da Obra (Destaque)',
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'Galeria de Fotos Adicionais',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            label: 'Ordem (opcional)',
        }
    ],
}

export default Projects
