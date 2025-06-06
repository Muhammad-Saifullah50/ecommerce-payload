'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type CartItem = {
  id: string
  title: string
  short_description: string
  price: number
  quantity: number
  image: string
  discount_percentage: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  finalPriceAfterDiscount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[] | []>([])

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems')
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id)
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: newItem.quantity } : item,
        )
      }

      return [...prev, newItem]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const finalPriceAfterDiscount = (): number => {
    return items.reduce((acc, item) => {
      const discountedPrice = item.price * (1 - item.discount_percentage / 100);
      return acc + discountedPrice * item.quantity;
    }, 0);
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        finalPriceAfterDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
