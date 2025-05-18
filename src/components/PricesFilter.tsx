import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { prices } from '@/data/prices'
import PriceRangeCheckbox from './PriceRangeCheckbox'

const PricesFilter = () => {
  return (
 <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold text-base">Price Range</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {prices &&
              prices.map((price) => {
                return <PriceRangeCheckbox key={price.id} price={price} />
              })}
          </AccordionContent>
        </AccordionItem>  )
}

export default PricesFilter