import { CollectionConfig } from 'payload'

const Clients: CollectionConfig = {
    slug: 'clients',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'name',
    },
    labels: {
        singular: 'Cliente',
        plural: 'Clientes',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Nome do Cliente',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Logo do Cliente',
            admin: {
                description: 'Suba o logo do cliente. O sistema irá redimensionar automaticamente para o carrossel.',
            }
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            label: 'Ordem de Exibição',
            admin: {
                description: 'Número menor aparece primeiro.',
            }
        }
    ],
}

export default Clients
