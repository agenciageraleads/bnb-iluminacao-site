import { CollectionConfig } from 'payload'

const Regions: CollectionConfig = {
    slug: 'regions',
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
            name: 'content',
            type: 'richText',
        },
        {
            name: 'meta',
            type: 'group',
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
