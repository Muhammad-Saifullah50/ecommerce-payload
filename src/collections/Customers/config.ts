import { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
    slug: 'customers',
    auth: {
        tokenExpiration: 12 * 60 * 60,
        verify: true,
        cookies: {
            secure: true,
            sameSite: 'None',
            domain: process.env.COOKIE_DOMAIN
        }
    },
    admin: {
        useAsTitle: 'firstName'
    },
    access: {
        create: () => true,
        admin: () => false
    },
    fields: [
        {
            type: 'row',
            fields: [
                {type: 'text', name: 'firstName'},
                {type: 'text', name: 'lastName'}
            ]
        }
    ]
}