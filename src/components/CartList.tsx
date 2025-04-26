'use client'
import { useCart } from '@/context/CartContext'
import CartItem from './CartItem'

const CartList = () => {
  const { items } = useCart()

  if (!items) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {items && items.length > 0 ? (
        items.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  )
}

export default CartList
