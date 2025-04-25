import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const CartItem = () => {
  return (
    <div className={'flex gap-2 border rounded-lg cursor-pointer p-2'}>
      <Image
        src={'/api/media/file/daniel-korpai-hbTKIbuMmBI-unsplash-1024x1280-1.jpg'}
        width={80}
        height={80}
        alt={'dsds'}
        className="w-1/4"
      />

      <div className="flex flex-col gap-2 w-2/4 justify-between">
        <h2 className="text-ellipsis line-clamp-1 font-medium">
          T-shirts with multiple colors, for men and lady
        </h2>
        <p className="text-ellipsis line-clamp-2 text-gray-primary text-base">
          Size: medium, Color: blue, Material: Plastic Seller: Artel Market
        </p>

        <div className="flex gap-2">
          <Button size={'sm'} variant={'destructive'}>
            Remove
          </Button>
          <Button size={'sm'} variant={'outline'} className="text-blue-primary">
            Add to wishlist
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end gap-2 w-1/4">
        <p className='font-semibold'>PKR 5000</p>
        <div className="flex gap-2 items-center justify-center">
          <Button variant={'outline'} size={'sm'}>+</Button>
          <span>1</span>
          <Button variant={'outline'} size={'sm'}>-</Button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
