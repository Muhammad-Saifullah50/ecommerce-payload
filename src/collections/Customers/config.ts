import { getServerSideUrl } from "@/lib/getServerSideUrl";
import { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
    slug: 'customers',
    auth: {
        tokenExpiration: 12 * 60 * 60,
        verify: {
            generateEmailSubject: (args) => {
                return `
                    Hey ${args.user.firstName ? args.user.firstName : args.user.email}, change your password
                `
            },
            generateEmailHTML: (args) => {
              return   `<div>
              <h1>
                Hey ${args.user.firstName ? args.user.firstName : args.user.email},
              </h1> <br/>
              <p>
              You (or someone) has requested a password change for your account. If this wasn't you, please ignore this email. Otherwise, click the link below to change your password.
               ${getServerSideUrl()}/password-reset?token=${args.token}
              </p>
              </div>`
            },
        },
        forgotPassword: {
            generateEmailSubject: (args) => {
                return `
                    Hey ${args?.user.firstName ? args?.user.firstName : args?.user.email}, verify your email address
                `
            },
            generateEmailHTML: (args) => {
              return   `<div>
              <h1>
                Hey ${args?.user.firstName ? args?.user.firstName : args?.user.email},
              </h1> <br/>
              <p>
              Verify your email address by going to ${getServerSideUrl()}/verify?token=${args?.token}
              </p>
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