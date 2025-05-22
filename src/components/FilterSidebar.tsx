import { Accordion } from '@/components/ui/accordion'

import {
  getCategoriesAndSubCategoriesByParameters,
  getProductFeaturesAndBrands,
} from '@/actions/product.actions'

import BrandFilter from './BrandFilter'
import PricesFilter from './PricesFilter'
import FeaturesFilter from './FeaturesFilter'
import SubcategoriesFilter from './SubcategoriesFilter'
import CategoriesFilter from './CategoriesFilter'
import { Suspense, use } from 'react'
import FilterItemSkeleton from './skeletons/FilterItemSkeleton'

const FilterSidebar =  ({
  paramsPromise,
}: {
  paramsPromise: { [key: string]: string | string[] | undefined }
}) => {

  const parameters = use(paramsPromise)
  
  const categoriesAndSubcategoriesPromise = getCategoriesAndSubCategoriesByParameters(parameters)

  const brandAndFeaturesPromise = getProductFeaturesAndBrands(parameters)

  return (
    <aside className="w-sm">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['item-1', 'item-2', 'item-3', 'item-5']}
      >
        <Suspense fallback={<FilterItemSkeleton />}>
          <CategoriesFilter
            categoriesPromise={categoriesAndSubcategoriesPromise}
            parameters={parameters}
          />
        </Suspense>
        <Suspense fallback={<FilterItemSkeleton />}>
          <SubcategoriesFilter
            parameters={parameters}
            subcategoriesPromise={categoriesAndSubcategoriesPromise}
          />
        </Suspense>

        <Suspense fallback={<FilterItemSkeleton />}>
          <FeaturesFilter featuresPromise={brandAndFeaturesPromise} />
        </Suspense>
        <PricesFilter />

        <Suspense fallback={<FilterItemSkeleton />}>
          <BrandFilter brandsPromise={brandAndFeaturesPromise} />
        </Suspense>
      </Accordion>
    </aside>
  )
}

export default FilterSidebar
// have to correct type errors in all these filters
