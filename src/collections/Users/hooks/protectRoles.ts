import { FieldHook, User } from "payload";

export const protectRoles: FieldHook<{ id: string } & User> = ({ req, data }) => {
    if (req.user?.collection === 'users') {

        const isAdmin = req.user?.roles?.includes('admin')

        if (!isAdmin) {
            if (!data?.roles?.includes('editor')) {
                return ['user']

            }
        }

        const userRoles = new Set(data?.roles || [])
        userRoles.add('user')
        return [...userRoles]
    }
}