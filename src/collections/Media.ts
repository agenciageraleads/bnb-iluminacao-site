import { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    upload: {
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'hero',
                width: 1920,
                height: 1080,
                position: 'centre',
            },
            {
                name: 'logo-marquee',
                width: 250,
                height: undefined, // Mantém a proporção
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*', 'application/pdf'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}

export default Media
