import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { Category, Subcategory } from '../../../../../payload-types'
import { ChevronRight } from 'lucide-react'
import ProductGallery from '@/components/ProductGallery'
import ProductDetails from '@/components/ProductDetails'
import ProductDescriptionTabs from '@/components/ProductDescriptionTabs'
import MayLikeProducts from '@/components/MayLikeProducts'
import RelatedProducts from '@/components/RelatedProducts'
import { getAllProductSlugs } from '@/actions/product.actions'


// havbe to also ssee the solution to statically generate when new products arrive
export const revalidate = 60

export const generateStaticParams = async () => {
  try {
    const productSlugs = await getAllProductSlugs()

    return productSlugs?.map((slug) => ({
      slug: slug,
    }))
  } catch (error) {
    console.error(error)
  }
}

// hjave to comment thios while developing
const IndividualProductPage = async ({ params }: { params: { slug: string } }) => {
  const usableParams = await params
  const payload = await getPayload({ config })

  const product = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: usableParams.slug,
      },
    },
  })

  if (product.docs.length === 0) return redirect('/')

  const categoryName = (product.docs[0].category as Category).label
  const subCategoryName = (product.docs[0].subcategory as Subcategory).label

  const images = product.docs[0].images
  return (
    <section className="flex flex-col gap-4 py-4">
      <div className="flex gap-2 text-gray-primary text-base">
        Home <ChevronRight className="w-4" /> {categoryName} <ChevronRight className="w-4" />{' '}
        {subCategoryName} <ChevronRight className="w-4" /> {product.docs[0].title}
      </div>
      <section className="flex gap-4 p-4 bg-white border rounded-lg">
        <ProductGallery images={images!} />

        <ProductDetails product={product.docs[0]} />
      </section>
      <section className="flex gap-4 ">
        <section className="flex gap-4 p-4 bg-white border rounded-lg w-4/6">
          <ProductDescriptionTabs description={product.docs[0].description} />
        </section>
        <section className="flex gap-4 p-4 bg-white border rounded-lg w-2/6">
          <MayLikeProducts
            subcategory={product.docs[0].subcategory!}
            currentProduct={product.docs[0]}
          />
        </section>
      </section>
      <section className="flex gap-4 p-4 bg-white border rounded-lg">
        <RelatedProducts category={product.docs[0].category!} currentProduct={product.docs[0]} />
      </section>
    </section>
  )
}
export default IndividualProductPage
