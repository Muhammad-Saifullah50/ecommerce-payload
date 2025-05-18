'use server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Product, ProductsSelect } from 'payload-types'

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


export const getProductsByParams = async (params: {
  [key: string]: string | string[] | undefined
}) => {
  try {
    const hasAnyParams = Object.values(params).some((value) => value !== undefined)

    let products
    const categoryName = params.category
    const subCategoryName = params.subcategory

     const features = Array.isArray(params.feature)
    ? params.feature
    : params.feature
    ? [params.feature]
    : []

    

    const payload = await getPayload({ config })

    if (!hasAnyParams) {
      products = await payload.find({
        collection: 'products',
        limit: 10,
      })
    } else if (categoryName && subCategoryName) {
      products = await payload.find({
        collection: 'products',
        limit: 10,
        where: {
          and: [
            {
              'category.value': {
                equals: categoryName,
              },
            },

            {
              'subcategory.value': {
                equals: subCategoryName,
              },
            },
          ],
        },
      })
    } else if (categoryName || subCategoryName) {
      products = await payload.find({
        collection: 'products',
        limit: 10,
        where: {
          or: [
            {
              'category.value': {
                equals: categoryName,
              },
            },

            {
              'subcategory.value': {
                equals: subCategoryName,
              },
            },
          ],
        },
      })
    } else {
      products = await payload.find({
        collection: 'products',
        limit: 10,
      })
    }

    return products
  } catch (error) {
    console.error('Error getting products by params', error)
  }
}

export const getProductFeatures = async (params: {
  [key: string]: string | string[] | undefined
}) => {
  try {

    const products = await getProductsByParams(params)

    const allFeatures = products?.docs.reduce((acc, prod) => {
      return acc.concat(prod.features);
    }, [] as { name: string; label: string; value: string; id?: string | null }[]);
    

    return allFeatures
  } catch (error) {
    console.error('Error getting product features', error)
  }
}
