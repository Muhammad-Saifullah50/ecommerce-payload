'use server';

import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Customer } from "payload-types";

export const getCurrentUser = async () => {

    try {
        
        const heads = await headers();
        
        const payload = await getPayload({config})
        
        const {user} = await payload.auth({headers: heads})
        
        if(!user) return null
        return user
    } catch (error) {
        console.error('Error getting curent user', error)
    }
}

type UpdateUserParams = {
    email: string,
    firstName?: string,
    lastName: string
}

export const updateUser = async ({email, firstName, lastName} : UpdateUserParams) => {
    try {
        const payload = await getPayload({config});
        const user = await getCurrentUser() as Customer

        const updatedUser = await payload.update({
            collection: 'customers',
            id: user?.id,
            data: {
                email,
                firstName,
                lastName
            }
        })
        return {success: true} 
    } catch (error) {
        console.error('Error updating user', error)
        return {success: false, error: 'Error updating profile'}
    }
}