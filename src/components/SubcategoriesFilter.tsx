import React, { use } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SubcategoriesFilter = ({
  parameters,
  subcategoriesPromise,
}: {
  parameters: { [key: string]: string | string[] | undefined }
  subcategoriesPromise: Promise<{ docs: { id: string; label: string; value: string }[] }>
}) => {
  const {subcategories} = use(subcategoriesPromise)
  return (
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
  )
}

export default SubcategoriesFilter
