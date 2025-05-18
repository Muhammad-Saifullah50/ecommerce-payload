import { use } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import Link from 'next/link'
import { PaginatedDocs } from 'payload';
import { Category } from 'payload-types';
import { cn } from '@/lib/utils';

const CategoriesFilter = ({
  categoriesPromise,
  parameters,
}: {
categoriesPromise: Promise<PaginatedDocs<Category>>;
  parameters: { [key: string]: string | string[] | undefined }
}) => {
const {categories} = use(categoriesPromise)
  return (
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
  )
}

export default CategoriesFilter
