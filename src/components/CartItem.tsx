'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { CartItem as CartItemType } from '@/context/CartContext'
import Counter from './Counter'

const CartItem = ({ item }: { item: CartItemType }) => {
  
  const [quantity, setQuantity] = useState(item.quantity)
  return (
    <div className={'flex gap-2 border rounded-lg cursor-pointer p-2'}>
      <Image src={item.image} width={80} height={80} alt={item.title} className="w-1/4 max-w-[80px] max-h-[90px]" />

      <div className="flex flex-col gap-2 w-2/4 justify-between">
        <h2 className="text-ellipsis line-clamp-1 font-medium">{item.title}</h2>
        <p className="text-ellipsis line-clamp-2 text-gray-primary text-base">{item.title}</p>

        <div className="flex gap-2">
          <Button size={'sm'} variant={'outline'} className='text-destructive hover:text-destructive'>
            Remove
          </Button>
          <Button size={'sm'} variant={'outline'} className="text-blue-primary hover:text-blue-primary">
            Add to wishlist
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end gap-2 w-1/4">
        <p className="font-semibold">PKR {Number(item.price) * quantity}</p>
        <Counter itemId={item.id} count={quantity} setCount={setQuantity} />
      </div>
    </div>
  )
}

export default CartItem
