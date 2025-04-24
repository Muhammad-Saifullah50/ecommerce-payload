import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'label'
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            required: true,
        },
        {
            name: 'value',
            type: 'text',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'subcategories',
            type: 'relationship',
            relationTo: 'subcategories',
            hasMany: true,
        },
        {
            name: 'link',
            type: 'text',
            required: true,
        }
    ],

}