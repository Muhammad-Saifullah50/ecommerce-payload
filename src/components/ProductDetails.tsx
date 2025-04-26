'use client'

import Image from 'next/image'
import { Category, Product, Subcategory } from '../../payload-types'
import AddToCart from './AddToCart'
import { useEffect, useState } from 'react'
import Counter from './Counter'
import { useCart } from '@/context/CartContext'

const ProductDetails = ({ product }: { product: Product }) => {
  const { items } = useCart()
  const currentItem = items.find((item) => item.id === product.id)

  const [count, setCount] = useState(currentItem?.quantity || 1)

  useEffect(() => {
    if (currentItem?.quantity) setCount(currentItem.quantity)
  }, [currentItem]);

  const inStock = product.inStock

  const productToAdd = { ...product, quantity: count }
  return (
    <section className=" w-full flex flex-col gap-4">
      <div>
        {inStock ? (
          <div className="flex gap-2">
            <Image src={'/tick.svg'} alt="tick" width={20} height={20} />
            <p className="text-[#00B517]">In Stock</p>
          </div>
        ) : (
          <div className="flex gap-2">
            <Image src={'/cross.svg'} alt="tick" width={20} height={20} />
            <p className="text-[#FA3434]">Out of Stock</p>
          </div>
        )}
      </div>

      <h1 className="font-semibold text-2xl">{product.title}</h1>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full ">
          <p className="text-gray-primary text-base">Price:</p>
          <p className="flex w-1/2 text-left justify-start text-gray-600">PKR {product.price}</p>
        </div>
        <div className="flex justify-between w-full ">
          <p className="text-gray-primary text-base">Discount:</p>
          <p className="flex w-1/2 text-left justify-start text-gray-600"> {product.discount_percentage} %</p>
        </div>
          <hr />
        <div className="flex justify-between w-full">
          <p className="text-gray-primary text-base">Category:</p>
          <p className="flex w-1/2 text-left justify-start text-gray-600">
            {' '}
            {(product.category as Category).label}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-gray-primary text-base">Sub Category:</p>
          <p className="flex w-1/2 text-left justify-start text-gray-600">
            {(product.subcategory as Subcategory).label}
          </p>
        </div>
        <hr />

        <div className="flex justify-between w-full">
          <p className="text-gray-primary text-base"> Protection:</p>
          <p className="flex w-1/2 text-left justify-start text-gray-600">Refund Policy</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-gray-primary text-base">Sub Warranty:</p>
          <p className="flex w-1/2 text-left justify-start text-gray-600">2 years </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-gray-primary text-base">Quantity:</p>
          <div className="flex w-1/2 text-left justify-start text-gray-600">
            <Counter itemId={product.id} count={count} setCount={setCount} />
          </div>
        </div>

        <hr />
      </div>

      {/* add to cart */}

      <AddToCart product={productToAdd} />
    </section>
  )
}

export default ProductDetails
