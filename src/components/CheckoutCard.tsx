'use client'

import { useCart } from "@/context/CartContext"
import { Button } from "./ui/button";

const CheckoutCard = () => {

    const {items} = useCart();

  const subTotal = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
  return (
    <section className="flex flex-col w-1/4 bg-white rounded-lg border p-4 gap-4 h-fit mt-16">
      <div  className="flex justify-between  w-full">
        <p className=" text-base">Subtotal:</p>
        <p className="flex w-1/2  justify-end text-gray-600"> {subTotal}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className=" text-base">Discount:</p>
        <p className="flex w-1/2  justify-end text-gray-600">sasa</p>
      </div>
      <hr />
      <div className="flex justify-between w-full">
        <p className=" text-xl font-semibold">Total:</p>
        <p className="flex w-1/2  justify-end text-xl font-semibold">PKR {subTotal}</p>
      </div>

      <Button size={'lg'} className="bg-green-600 hover:bg-green-700">Checkout</Button>
    </section>
  )
}

export default CheckoutCard
