'use client'

import { useCart } from '@/context/CartContext'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'

const CheckoutCard = () => {
  const { items, finalPriceAfterDiscount } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  const isCheckoutPage = pathname === '/checkout'

  const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const arrayWithDiscountedPrice = items.map((item) => {
    const discountedPrice = item.price * (1 - item.discount_percentage / 100)
    return {
      ...item,
      discountedPrice,
    }
  })

  const afterDiscountPrice = arrayWithDiscountedPrice.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0,
  )

  const totalDiscount = subTotal - afterDiscountPrice

  return (
    <section className="flex flex-col w-full bg-white rounded-lg border p-4 gap-4 h-fit">
      <div className="flex justify-between  w-full">
        <p className=" text-base text-green-500">Subtotal:</p>
        <p className="flex w-1/2  justify-end text-green-500">PKR {subTotal}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className=" text-base text-red-500">Discount:</p>
        <p className="flex w-1/2  justify-end text-red-500">PKR {totalDiscount}</p>
      </div>
      <hr />
      <div className="flex justify-between w-full">
        <p className=" text-xl font-semibold">Total:</p>
        <p className="flex w-1/2  justify-end text-xl font-semibold">
          PKR {finalPriceAfterDiscount()}
        </p>
      </div>

      {!isCheckoutPage && (
        <Button
          size={'lg'}
          className="bg-green-600 hover:bg-green-700"
          onClick={() => router.push('/checkout')}
        >
          Checkout
        </Button>
      )}
    </section>
  )
}

export default CheckoutCard
