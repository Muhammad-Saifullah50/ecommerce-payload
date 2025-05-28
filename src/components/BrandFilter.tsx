import React, { use } from 'react'
import { AccordionItem, AccordionTrigger } from './ui/accordion'
import { AccordionContent } from '@radix-ui/react-accordion'
import BrandsCheckbox from './BrandsCheckbox'

const BrandFilter = ({ brandsPromise }: { brandsPromise: Promise }) => {
  const { brands } = use(brandsPromise)
  if (brands.length == 0) return null
  return (
    <AccordionItem value="item-5" className='pb-4'>
      <AccordionTrigger className="font-semibold text-base">Brand</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2">
        {
          brands.map((brand: string) => {
            return <BrandsCheckbox key={brand} brand={brand} />
          })}
      </AccordionContent>
    </AccordionItem>
  )
}

export default BrandFilter
