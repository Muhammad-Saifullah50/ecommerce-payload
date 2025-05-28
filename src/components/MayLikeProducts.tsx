import { getPayload } from 'payload'
import { Product, Subcategory } from '../../payload-types'
import config from '@/payload.config'
import HorizontalProductCard from './HorizontalProductCard'

const MayLikeProducts = async ({
  subcategory,
  currentProduct,
}: {
  subcategory: Subcategory | string
  currentProduct: Product
}) => {
  const payload = await getPayload({ config })

  // First: try to get products in the same subcategory
  let relatedProducts = (
    await payload.find({
      collection: 'products',
      limit: 10, // fetch more to allow filtering
      where: {
        subcategory: {
          equals: subcategory,
        },
      },
    })
  ).docs.filter((item) => item.id !== currentProduct.id)

  // If none found, fetch from all products instead
  if (relatedProducts.length === 0) {
    relatedProducts = (
      await payload.find({
        collection: 'products',
        limit: 10,
        where: {
          id: {
            not_equals: currentProduct.id,
          },
        },
      })
    ).docs.slice(0, 5)
  } else {
    // Limit to 5 in case more than needed
    relatedProducts = relatedProducts.slice(0, 5)
  }

  if (relatedProducts.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">You may also like</h3>
      <div className="flex flex-col gap-4">
        {relatedProducts.map((item) => (
          <HorizontalProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

export default MayLikeProducts
