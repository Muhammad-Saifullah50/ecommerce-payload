'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { CartItem as CartItemType, useCart } from '@/context/CartContext'
import Counter from './Counter'

const CartItem = ({ item }: { item: CartItemType }) => {
  const [quantity, setQuantity] = useState(item.quantity)

  const { removeItem } = useCart()

  const discountedPrice = item.price - (item.price * item.discount_percentage) / 100

  
  return (
    <div className={'flex gap-2 border rounded-lg cursor-pointer p-2 justify-between bg-white'}>
      <div className="flex border rounded-lg w-1/4 items-center justify-center">
        <Image
          src={item.image}
          width={100}
          height={100}
          alt={item.title}
          className="object-cover max-w-[100px] max-h-[100px]"
        />
      </div>

      <div className="flex flex-col gap-2 w-2/4 justify-between">
        <h2 className="text-ellipsis line-clamp-1 font-medium">{item.title}</h2>
        <p className="text-ellipsis line-clamp-2 text-gray-primary text-base">
          {item.short_description}
        </p>

        <div className="flex gap-2">
          <Button
            size={'sm'}
            variant={'outline'}
            onClick={() => removeItem(item.id)}
            className="text-destructive hover:text-destructive"
          >
            Remove
          </Button>
          {/* <Button size={'sm'} variant={'outline'} className="text-blue-primary hover:text-blue-primary">
            Add to wishlist
          </Button> */}
        </div>
      </div>

      <div className="flex flex-col justify-between items-end gap-2 w-1/4">
        <div className='flex flex-col items-end'>
          <p className="font-semibold">PKR {discountedPrice * quantity}</p>
          <span className='text-xs text-green-500 flex gap-1'> 
            <s className='text-gray-primary'>PKR {item.price * item.quantity}</s>
            {item.discount_percentage}% off</span>
        </div>
        <Counter itemId={item.id} count={quantity} setCount={setQuantity} />
      </div>
    </div>
  )
}

export default CartItem
