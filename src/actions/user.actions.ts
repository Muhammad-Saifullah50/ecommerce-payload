'use server';

import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";

export const getCurrentUser = async () => {

    try {
        
        const heads = await headers();
        
        const payload = await getPayload({config})
        
        const user = await payload.auth({headers: heads})
        
        if(!user) return null
        return user
    } catch (error) {
        console.error('Error getting curent user', error)
    }
}