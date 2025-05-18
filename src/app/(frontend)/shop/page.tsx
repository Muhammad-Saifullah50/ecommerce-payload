import FilterSidebar from '@/components/FilterSidebar'
import { ChevronRight } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Product } from 'payload-types'
import ProductCard from '@/components/ProductCard'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const ShopPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const usableParams = await searchParams
  const categoryName = usableParams.category
  const subCategoryName = usableParams.subcategory

  const hasAnyParams = Object.values(usableParams).some((value) => value !== undefined)

  const payload = await getPayload({ config })

  let products

  if (!hasAnyParams) {
    products = await payload.find({
      collection: 'products',
      limit: 10,
    })
  } else {
    products = await payload.find({
      collection: 'products',
      where: {
        or: [
          {
            category: {
              equals: categoryName,
            },
          },
          {
            subcategory: {
              equals: subCategoryName,
            },
          },
        ],
      },
    })
  }

  return (
    <main className="flex flex-col gap-4 h-[calc(100vh-10rem)]">
      <div className="flex gap-2 text-gray-primary text-base">
        {hasAnyParams && (
          <div className="flex items-center gap-1">
            <p>Home</p>
            <ChevronRight className="w-4" />
            <p>{categoryName}</p>
            <ChevronRight className="w-4" />
            <p>{subCategoryName}</p>
            <ChevronRight className="w-4" />
            {/* <p>{product.docs[0].title}</p> */}
          </div>
        )}
      </div>
      <section className="flex gap-8">
        <FilterSidebar parameters={usableParams} />

        <section>
          <h1></h1>

          <section>
            <ul className="flex flex-wrap gap-4 items-center justify-center">
              {products?.docs.map((product: Product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </ul>
          </section>
        </section>
      </section>
    </main>
  )
}

export default ShopPage
