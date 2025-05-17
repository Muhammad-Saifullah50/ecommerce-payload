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
          category: {
            equals: query,
          },
          subcategory: {
            equals: query,
          },
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
          ],
        },
      })

    return products
  } catch (error) {
    console.error('Error searching products')
  }
}

// have to refine the searchging ,mechanism