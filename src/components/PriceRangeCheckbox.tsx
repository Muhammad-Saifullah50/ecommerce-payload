'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from './ui/checkbox'

const PriceRangeCheckbox = ({
  price,
}: {
  price: { id: number; minPrice: number; maxPrice: number }
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())

  const minPriceValue = price.minPrice.toString()
  const maxPriceValue = price.maxPrice.toString()

  const existingMinPrice = searchParams.get('minPrice')
  const existingMaxPrice = searchParams.get('maxPrice')

  const isChecked =
    existingMinPrice === minPriceValue && existingMaxPrice === maxPriceValue

  const handleClick = () => {
    if (isChecked) {
      params.delete('minPrice')
      params.delete('maxPrice')
    } else {
      params.set('minPrice', minPriceValue)
      params.set('maxPrice', maxPriceValue)
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div onClick={handleClick} className="flex items-center space-x-2 cursor-pointer">
      <Checkbox id={price.id.toString()} checked={isChecked} />
      <label
        htmlFor={price.id.toString()}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Rs {price.minPrice} - Rs {price.maxPrice}
      </label>
    </div>
  )
}

export default PriceRangeCheckbox