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
import { getProductFeatures } from '@/actions/product.actions'
import FeatureCheckbox from './FeatureCheckbox'

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

  const features = await getProductFeatures(parameters)
  return (
    <aside className="w-xs">
      <Accordion type="multiple" className="w-full" defaultValue={['item-1', 'item-2']}>
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
              features.map((feature) => {
                return <FeatureCheckbox key={feature.id} feature={feature} />
              })}
            {/* implememt shadcn checkbox here  . also disoplay the features in the product page*/}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

export default FilterSidebar
