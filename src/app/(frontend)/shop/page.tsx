import FilterSidebar from '@/components/FilterSidebar'
import { ChevronRight } from 'lucide-react'
import { Product } from 'payload-types'
import { getProductsByParams } from '@/actions/product.actions'
import { PaginatedDocs } from 'payload'
import ProductGrid from '@/components/ProductGrid'
import { Suspense } from 'react'
import ProductsSkeleton from '@/components/skeletons/ProductsSkeleton'
import Route from '@/components/Route'
import RouteSkeleton from '@/components/skeletons/RouteSkeleton'
import FilterItemSkeleton from '@/components/skeletons/FilterItemSkeleton'

export const experimental_ppr = true

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const ShopPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const productsPromise: PaginatedDocs<Product> | undefined = getProductsByParams(searchParams)
  return (
    <main className="flex flex-col gap-4 h-full">
      <Suspense fallback={<RouteSkeleton />}>
        <Route searchParams={searchParams} />
      </Suspense>
      <section className="flex gap-8">
        <Suspense fallback={<FilterItemSkeleton />}>
        <FilterSidebar paramsPromise={searchParams} />
        </Suspense>

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
