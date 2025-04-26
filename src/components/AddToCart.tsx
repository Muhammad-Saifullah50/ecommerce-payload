'use client'

import { useCart } from '@/context/CartContext'
import CartSheet from './CartSheet'
import { Button } from './ui/button'
import { Media, Product } from 'payload-types'

const AddToCart = ({product}: {product: Product & {quantity: number}}) => {

    const {addItem} = useCart()
    const itemToAdd = {
        id: product.id,
        title: product.title,
        short_description: product.short_description,
        price: product.price,
        quantity: product.quantity,
        image: (product?.images[0] as Media).url,
        discount_percentage: product.discount_percentage
        // have to proviude with dummy imaghe
    }
  return (
      <CartSheet key={'addtocartbutton'}>
        <Button onClick={() => addItem(itemToAdd)}>Add to Cart</Button>
      </CartSheet>
  )
}

export default AddToCart
