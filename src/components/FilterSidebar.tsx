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
          <AccordionTrigger className="font-semibold text-lg">Categories</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {categories.docs.map((category) => {
              const isActive = parameters.category === category.value

              return (
                <Link
                  key={category.id}
                  className={cn('text-base', isActive ? 'text-blue-primary' : 'text-gray-tertiary')}
                  href={`/shop/?category=${category.value}`}
                >
                  {category.label}
                </Link>
              )
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold text-lg">Subcategories</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {subcategories.docs.map((subcategory) => {
              const isActive = parameters.subcategory === subcategory.value

              const newParams = new URLSearchParams(parameters as Record<string, string>)
              newParams.set('subcategory', subcategory.value)

              const href = `/shop/?${newParams.toString()}`

              return (
                <Link
                  key={subcategory.id}
                  className={cn('text-base', isActive ? 'text-blue-primary' : 'text-gray-tertiary')}
                  href={href}
                >
                  {subcategory.label}
                </Link>
              )
            })}{' '}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold text-lg">Features</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {features &&
              features.map((feature) => {
                // const isActive = parameters.subcategory === subcategory.value

                const newParams = new URLSearchParams(parameters as Record<string, string>)
                newParams.set('feature', feature.value)

                const href = `/shop/?${newParams.toString()}`

                return (
                  <Link key={feature.id} className={cn('text-base text-gray-tertiary')} href={href}>
                    {feature.name}: {feature.value}
                  </Link>
                )
              })}{' '}
              {/* implememt shadcn xcheckbox here  */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

export default FilterSidebar
