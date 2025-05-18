'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from './ui/checkbox'

const BrandsCheckbox = ({ brand }: { brand: string  }) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString())

    const existingBrand = params.get('brand')

    if (existingBrand) {
      // Remove it
      params.delete('brand')
    } else {
      // Add it
      params.append('brand', brand)
    }

    router.push(`?${params.toString()}`)
  }

  const isChecked = searchParams.get('brand') === brand

  return (
    <div onClick={handleClick} className="flex items-center space-x-2 cursor-pointer">
      <Checkbox id={brand} checked={isChecked} />
      <label
        htmlFor={brand!}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {brand}
      </label>
    </div>
  )
}

export default BrandsCheckbox

// i habve to remove duplicate brands from different products
