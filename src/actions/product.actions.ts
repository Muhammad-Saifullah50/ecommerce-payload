'use server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const getAllProductSlugs = async () => {
  try {
    const payload = await getPayload({ config })

    const slugs = await payload.find({
      collection: 'products',
      select: {
        slug: true,
      },
    })
    const slugArr = slugs.docs.map((slugObj) => slugObj.slug)
    return slugArr
  } catch (error: any) {
    console.error('Error getting product slugs')
  }
}

export const searchProducts = async (query: string) => {
  try {
    const payload = await getPayload({ config })

    const products = await payload.find({
      collection: 'products',
      where: {
        or: [
          {
            title: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
          {
            short_description: {
              contains: query,
            },
          },
          {
            category: {
              contains: query,
            },
          },
          {
            subcategory: {
              contains: query,
            },
          },
        ],
      },
    })

    return products
  } catch (error) {
    console.error('Error searching products', error)
  }
}

export const getProductsByParams = async (params: { [key: string]: string | string[] | undefined }) => {
  
}
export const getProductFeatures = async (params: { [key: string]: string | string[] | undefined }) => {
 try {
  
  const payload = await getPayload({ config })

  
 } catch (error) {
    console.error('Error getting product features', error)
 }  
}