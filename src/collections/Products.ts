import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                hidden: true
            },
            hooks: {
                beforeValidate: [
                    ({ data }) => {


                        if (data?.title) return data.title
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^a-z0-9\-]/g, '')

                        return ''
                    }
                ]
            }
        },
        {
            name: 'price',
            type: 'text',
            required: true
        },
        {
            name: 'short_description',
            type: 'text',
            required: true
        },
        {
            name: 'description',
            type: 'richText',
            required: true
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
        },
        {
            name: 'subcategory',
            type: 'relationship',
            relationTo: 'subcategories',
        },
        {
            name: 'images',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
            required: true
            
        },
        {
            name: 'inStock',
            type: 'checkbox',
            required: true
        }

    ],
}
// reviews