import React from 'react'

import useAmountItem from 'hooks/amount-item'

interface Item {
  id: string
  value: number
}

interface IPaymentContext {
  fiats: {id: string; value: number; amount: number}[]
  totalPrice: number
  increment: (item: Item) => void
  decrement: (item: Item) => void
  getFiatAmount: (id: string) => number
}

const PaymentContext = React.createContext<IPaymentContext | null>(null)

function usePaymentContext() {
  const context = React.useContext(PaymentContext)
  if (!context) {
    throw new Error('usePaymentContext must be used within PaymentProvider')
  }

  return context
}

function PaymentProvider(props: React.PropsWithChildren<{}>) {
  const {
    items: fiats,
    increment,
    decrement,
    getItemAmount: getFiatAmount,
    totalValue: totalPrice,
  } = useAmountItem()
  const value = {fiats, increment, decrement, getFiatAmount, totalPrice}
  return <PaymentContext.Provider value={value} {...props} />
}

export {usePaymentContext, PaymentProvider}
