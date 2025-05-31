import { User } from "payload";

type IndividualRole = 'admin' | 'editor' | 'user'
export const checkRole = (allRoles: User['roles'] = [], user: User): boolean => {
    if (user) {
        if (allRoles?.some((role: IndividualRole) => {
            return user.roles?.some((individualRole: IndividualRole) => {
                return individualRole === role
            })
        }))
            return true
    }

    return false
}