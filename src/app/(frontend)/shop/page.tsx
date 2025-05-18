import FilterSidebar from '@/components/FilterSidebar'
import { ChevronRight } from 'lucide-react'

import { Product } from 'payload-types'
import ProductCard from '@/components/ProductCard'
import { getProductsByParams } from '@/actions/product.actions'
import { PaginatedDocs } from 'payload'
import { Suspense } from 'react'
import ProductsSkeleton from '@/components/skeletons/ProductsSkeleton'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export const experimental_ppr = true;

const ShopPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const usableParams = await searchParams
  const categoryName = usableParams.category
  const subCategoryName = usableParams.subcategory

  const hasAnyParams = Object.values(usableParams).some((value) => value !== undefined)

  const products: PaginatedDocs<Product> | undefined = await getProductsByParams(usableParams)

  return (
    <main className="flex flex-col gap-4 h-full">
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
              <Suspense fallback={<ProductsSkeleton />}>
              {products && products.docs.length > 0 ? (
                products?.docs.map((product: Product) => (
                  <ProductCard key={product.id} data={product} />
                ))
              ) : (
                <p>No products found</p>
              )}
              </Suspense>
            </ul>
          </section>
        </section>
      </section>
    </main>
  )
}

export default ShopPage
