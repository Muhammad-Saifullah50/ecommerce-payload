'use server'
import { getPayload, Where } from 'payload'
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

export const getProductsByParams = async (params: {
  [key: string]: string | string[] | undefined
}) => {
  try {
    const categoryName = params.category
    const subCategoryName = params.subcategory

    const features = Array.isArray(params.feature)
      ? params.feature
      : params.feature
        ? [params.feature]
        : []

    const brands = Array.isArray(params.brand) ? params.brand : params.brand ? [params.brand] : []

    const minPrice = params.minPrice ? parseFloat(params.minPrice as string) : undefined
    const maxPrice = params.maxPrice ? parseFloat(params.maxPrice as string) : undefined

    const payload = await getPayload({ config })

    // Base where clause
    const where: Where = {}

    // Add category + subcategory
    if (categoryName) {
      where['category.value'] = { equals: categoryName }
    }

    if (subCategoryName) {
      where['subcategory.value'] = { equals: subCategoryName }
    }

    // Add features
    if (features.length > 0) {
      where['features.value'] = {
        in: features,
      }
    }

    // Add brand
    if (brands.length > 0) {
      where['brand'] = {
        in: brands,
      }
    }

    // Add price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      where['price'] = {}

      if (minPrice !== undefined) {
        where['price'].greater_than_equal = minPrice
      }

      if (maxPrice !== undefined) {
        where['price'].less_than_equal = maxPrice
      }
    }

    const products = await payload.find({
      collection: 'products',
      limit: 10,
      where: Object.keys(where).length > 0 ? where : undefined,
    })

    return products
  } catch (error) {
    console.error('Error getting products by params', error)
  }
}

// have to add paginartion
export const getProductFeaturesAndBrands = async (params: {
  [key: string]: string | string[] | undefined
}) => {
  try {
    const products = await getProductsByParams(params)

    const allFeatures = products?.docs.reduce(
      (acc, prod) => {
        return acc.concat(prod.features)
      },
      [] as { name: string; label: string; value: string; id?: string | null }[],
    )
    const brands = products?.docs.reduce(
      (acc, prod) => {
        return acc.concat(prod.brand)
      },
      [] as { name: string }[],
    )

    return { allFeatures, brands }
  } catch (error) {
    console.error('Error getting product features', error)
  }
}

export const getCategoriesAndSubCategoriesByParameters = async (parameters: {
  [key: string]: string | string[] | undefined
}) => {
  const payload = await getPayload({ config })

  let subcategories

  if (parameters.category) {
    const categoryDoc = await payload.find({
      collection: 'categories',
      where: {
        value: {
          equals: parameters.category,
        },
      },
    })

    subcategories = await payload.find({
      collection: 'subcategories',
      where: {
        category: {
          equals: categoryDoc.docs[0].id,
        },
      },
      select: {
        label: true,
        value: true,
      },
    })
  } else {
    subcategories = await payload.find({
      collection: 'subcategories',
      select: {
        label: true,
        value: true,
      },
    })
  }

  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    select: {
      label: true,
      value: true,
    },
  })

  return { categories, subcategories }
}
