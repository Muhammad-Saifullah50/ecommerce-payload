import { getPayload } from 'payload'
import config from '@/payload.config'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getProductFeaturesAndBrands } from '@/actions/product.actions'
import FeatureCheckbox from './FeatureCheckbox'
import { prices } from '@/data/prices'
import PriceRangeCheckbox from './PriceRangeCheckbox'
import BrandsCheckbox from './BrandsCheckbox'

type Feature = {
  id?: string | null | undefined
  name: string
  value: string
  label: string
}
const FilterSidebar = async ({
  parameters,
}: {
  parameters: { [key: string]: string | string[] | undefined }
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

  const result = await getProductFeaturesAndBrands(parameters)

  const features = result?.allFeatures
  const brands = result?.brands
  return (
    <aside className="w-xs">
      <Accordion type="multiple" className="w-full" defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-5']}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold text-base">Categories</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {categories.docs.map((category) => {
              const isActive = parameters.category === category.value

              return (
                <Link
                  key={category.id}
                  className={cn('text-sm', isActive ? 'text-blue-primary' : 'text-gray-tertiary')}
                  href={`/shop/?category=${category.value}`}
                >
                  {category.label}
                </Link>
              )
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold text-base">Subcategories</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {subcategories.docs.map((subcategory) => {
              const isActive = parameters.subcategory === subcategory.value

              const newParams = new URLSearchParams(parameters as Record<string, string>)
              newParams.set('subcategory', subcategory.value)

              const href = `/shop/?${newParams.toString()}`

              return (
                <Link
                  key={subcategory.id}
                  className={cn('text-sm', isActive ? 'text-blue-primary' : 'text-gray-tertiary')}
                  href={href}
                >
                  {subcategory.label}
                </Link>
              )
            })}{' '}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold text-base">Features</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {features &&
              features.map((feature: Feature) => {
                return <FeatureCheckbox key={feature.id} feature={feature} />
              })}
            {/* . also disoplay the features in the product page*/}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold text-base">Price Range</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {prices &&
              prices.map((price) => {
                return <PriceRangeCheckbox key={price.id} price={price} />
              })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="font-semibold text-base">Brand</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {brands &&
              brands.map((brand) => {
                return <BrandsCheckbox key={brand.name} brand={brand} />
              })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

export default FilterSidebar
