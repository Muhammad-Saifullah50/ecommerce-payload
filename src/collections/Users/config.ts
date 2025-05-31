import { CollectionConfig, User } from "payload";
import { protectRoles } from "./hooks/protectRoles";
import editor from "./access/editor";
import user from "./access/user";
import admin from "./access/admin";
import { checkRole } from "./access/checkRole";

export const Users: CollectionConfig = {
    slug: 'users',
    access: {
        create: editor,
        read: user,
        update: user,
        delete: admin

    },
    admin: {
        useAsTitle: 'email',
    },
    auth: true,
    defaultPopulate: {
        slug: true,
        name: true
    },
    fields: [
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'roles',
            type: 'select',
            hasMany: true,
            saveToJWT: true,
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'User',
                    value: 'user',
                },
                {
                    label: 'Editor',
                    value: 'editor',
                }
            ],
            hooks: {
                beforeChange: [protectRoles]
            },
            access: {
                update: ({ req: { user } }) => checkRole(['admin'], user as User)
            }
        },
        {
            name: 'name',
            type: 'text',
        },
        {
            name: 'slug',
            type: 'text',
            // have to see if i have to generate a slug
        }
    ],
}