import { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
    slug: 'customers',
    auth: {
        tokenExpiration: 12 * 60 * 60,
        verify: {
            generateEmailSubject: (args) => {
                return `
                    Hey ${args.user.firstName ? args.user.firstName : args.user.email}, verify your email address
                `
            },
            generateEmailHTML: (args) => {
              return   `<div>
              <h1></h1>
              </div>`
            },
        },
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