'use server'

import { getPayload } from "payload"
import config from "@/payload.config"
import { Customer } from "payload-types"
import { cookies } from "next/headers"

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

interface LoginParams {
    email: string,
    password: string
}
export type Result = {
    exp?: number,
    token?: string,
    user?: Customer
}

export interface ResetPasswordParams {
    token: string,
    password: string,
}

export const createAccount = async ({ email, password, firstName, lastName }: CreateAccountParams): Promise<Response> => {
    const payload = await getPayload({ config })

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

                return { success: true }
            } catch (error) {
                console.log(error)
                return { success: false, error: 'Error creating account' }
            }
        } else {
            return { success: false, error: 'Account already exists' }
        }
    } catch (error) {
        console.log('Signup error', error)
        return { success: false, error: 'Error creating account' }
    }
}

export const loginAccount = async ({ email, password }: LoginParams): Promise<Response> => {
    const payload = await getPayload({ config })
    try {
        const result: Result = await payload.login({
            collection: 'customers',
            data: {
                email,
                password
            }
        });

        if (result.token) {
            const cookieStore = await cookies();
            cookieStore.set('token', result.token, {
             httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            })


            return {success: true}
        } else {
            return { success: false, error: 'Invalid email and password' }
        }
    } catch (error) {
        console.log('login error', error)
    }
}

export const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const payload = await getPayload({ config });
    try {
        await payload.forgotPassword({
            collection: 'customers',
            data: { email },
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Error sending password reset email' };
    }
};

export const resetPassword = async ({ token, password }: ResetPasswordParams): Promise<Response> => {
    const payload = await getPayload({ config });
    try {
        await payload.resetPassword({
            collection: 'customers',
            data: {
                token,
                password,
                overrideAccess: true,
            },
        });
        return { success: true };
    } catch (error) {
        console.log('reset password error', error)
        return { success: false, error: 'Error resetting password' };
    }
};