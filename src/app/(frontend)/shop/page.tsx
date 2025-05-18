import FilterSidebar from '@/components/FilterSidebar'
import { ChevronRight } from 'lucide-react'
import { getPayload, PaginatedDocs } from 'payload'
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

  let products: PaginatedDocs<Product>

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
