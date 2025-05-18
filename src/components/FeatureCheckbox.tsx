'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from './ui/checkbox'

const FeatureCheckbox = ({
  feature,
}: {
  feature: { id?: string | null | undefined; name: string; value: string, label: string }
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString())

    const featureValue = feature.value
    const existingFeatures = params.getAll('feature')

    if (existingFeatures.includes(featureValue)) {
      // Remove it
      const updated = existingFeatures.filter((val) => val !== featureValue)
      params.delete('feature')
      updated.forEach((val) => params.append('feature', val))
    } else {
      // Add it
      params.append('feature', featureValue)
    }

    router.push(`?${params.toString()}`)
  }

  const isChecked = searchParams.getAll('feature').includes(feature.value)

  return (
    <div onClick={handleClick} className="flex items-center space-x-2 cursor-pointer">
      <Checkbox id={feature.id!} checked={isChecked} />
      <label
        htmlFor={feature.id!}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {feature.label}
      </label>
    </div>
  )
}

export default FeatureCheckbox

// i habve to remove duplicate features from different products