import { CollectionConfig } from "payload";

export const Subcategories: CollectionConfig = {
    slug: 'subcategories',
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
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
        }
    ],

}