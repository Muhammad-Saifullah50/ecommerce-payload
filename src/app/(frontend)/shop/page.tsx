// page.tsx or ShopPage.tsx
import { Suspense } from 'react'
import { ChevronRight } from 'lucide-react'
import FilterSidebar from '@/components/FilterSidebar'
import ProductGrid from '@/components/ProductGrid'
import ProductsSkeleton from '@/components/skeletons/ProductsSkeleton'
import { getProductsByParams } from '@/actions/product.actions'
import { Product } from 'payload-types'
import { PaginatedDocs } from 'payload'

export const experimental_ppr = true

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

function ProductGridWrapper({ searchParams }: Props) {
  const productsPromise: Promise<PaginatedDocs<Product>> = getProductsByParams(searchParams)
  return <ProductGrid productsPromise={productsPromise} />
}

const ShopPage = ({ searchParams }: Props) => {
  const categoryName = searchParams.category
  const subCategoryName = searchParams.subcategory
  const hasAnyParams = Object.values(searchParams).some((value) => value !== undefined)

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
        <FilterSidebar parameters={searchParams} />

        <section>
          <Suspense fallback={<ProductsSkeleton />}>
            <ProductGridWrapper searchParams={searchParams} />
          </Suspense>
        </section>
      </section>
    </main>
  )
}

export default ShopPage
