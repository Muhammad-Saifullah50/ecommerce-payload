'use server'

import { getPayload } from "payload"
import config  from "@/payload.config"

interface CreateAccountParams {
email: string,
password: string,
firstName: string,
lastName: string,   
}

export interface Response {
    success: boolean,
    error?: string
}

export const createAccount = async ({email, password, firstName, lastName}: CreateAccountParams): Promise<Response> => {
    const payload = await getPayload({config})

    try {
        const existingAccount = await payload.find({
            collection: 'customers',
            where: {
                email: {
                    equals: email
                }
            }
        });

        if (existingAccount.totalDocs === 0) {
            try {
                await payload.create({
                    collection: 'customers',
                    data: {
                        email,
                        password,
                        firstName,
                        lastName
                    }
                });

                return {success: true}
            } catch (error) {
                console.log(error)
                return {success: false, error: 'Error creating account'}
            }
        } else {
            return {success: false, error: 'Account already exists'}
        }
    } catch (error) {
        console.log('Signup error', error)
        return {success: false, error: 'Error creating account'}
    }
}