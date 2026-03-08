import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    access: {
        read: () => true,
    },
    fields: [
        // Email e Password são adicionados automaticamente pelo 'auth: true'
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
            ],
            defaultValue: 'admin',
            required: true,
        },
    ],
}

export default Users
