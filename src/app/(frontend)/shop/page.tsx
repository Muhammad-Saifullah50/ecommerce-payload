import FilterSidebar from '@/components/FilterSidebar'
import { ChevronRight } from 'lucide-react'
import { Product } from 'payload-types'
import { getProductsByParams } from '@/actions/product.actions'
import { PaginatedDocs } from 'payload'
import ProductGrid from '@/components/ProductGrid'
import { Suspense, use } from 'react'
import ProductsSkeleton from '@/components/skeletons/ProductsSkeleton'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const ShopPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const usableParams = use(searchParams)
  const categoryName = usableParams.category
  const subCategoryName = usableParams.subcategory

  const hasAnyParams = Object.values(usableParams).some((value) => value !== undefined)

  const productsPromise: PaginatedDocs<Product> | undefined = getProductsByParams(usableParams)

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
          <section>
            <Suspense fallback={<ProductsSkeleton />}>
              <ProductGrid productsPromise={productsPromise} />
            </Suspense>
          </section>
        </section>
      </section>
    </main>
  )
}

export default ShopPage
// haver to use use() and show loading state
