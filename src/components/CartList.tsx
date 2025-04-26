'use client'
import { useCart } from '@/context/CartContext'
import CartItem from './CartItem'

const CartList = () => {
  const { items } = useCart()

  if (!items.length) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default CartList
