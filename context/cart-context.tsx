import React from 'react'

import useAmountItem from 'hooks/amount-item'

interface Item {
  id: string
  value: number
}

interface ICartContext {
  products: {id: string; value: number; amount: number}[]
  totalPrice: number
  increment: (item: Item) => void
  decrement: (item: Item) => void
  getProductAmount: (id: string) => number
}

const CartContext = React.createContext<ICartContext | null>(null)

function useCartContext() {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }

  return context
}

function CartProvider(props: React.PropsWithChildren<{}>) {
  const {
    items: products,
    increment,
    decrement,
    getItemAmount: getProductAmount,
    totalValue: totalPrice,
  } = useAmountItem()
  const value = {products, increment, decrement, getProductAmount, totalPrice}
  return <CartContext.Provider value={value} {...props} />
}

export {useCartContext, CartProvider}
