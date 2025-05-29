import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
    slug: 'customers',
    admin: {
        useAsTitle: 'name',
    },
    auth: true,
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true
        },
        {
            name: 'email',
            type: 'email',
            required: true
        },
        {
            name: 'hashedPassword',
            type: 'text',
            required: true
        },
        {
            name: 'image',
            type: 'relationship',
            relationTo: 'media'
        }
    ],
}