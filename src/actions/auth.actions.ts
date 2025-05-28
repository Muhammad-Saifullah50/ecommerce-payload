'use server'

import { login } from '@payloadcms/next/auth'
import { getPayload } from 'payload'
import config from '@/payload.config'


export async function loginAction({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    const result = await login({
      collection: 'users',
      config,
      email,
      password,
    })
    return result

  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' }

  }
}

export const signUp = async (data: { email: string; password: string }) => {
  const payload = await getPayload({ config });

  try {
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: data.email,
        },
      },
    });

    if (existingUsers && existingUsers.totalDocs > 0) {
      return {
        error: 'Signup failed! User already exists. Please log into your account',
      };
    }

    const newUser = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password, // ensure password is stored if needed
      },
    });

    if (newUser) {
      const result = await login({
        collection: 'users',
        config,
        email: data.email,
        password: data.password,
      });
      return result;
    }
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred during signup.' };
  }
};
