import React from 'react'

import {useCartContext} from 'context/cart'
import {formatCurrency} from 'utils/formatter'

interface PaymentReducerState {
  oneCoin: number
  fiveCoin: number
  tenCoin: number
  twentyBank: number
  fifthyBank: number
  hundrendBank: number
  thousandBank: number
}

interface PaymentAction {
  type: any
  amount: number
}

function paymentReducer(state: PaymentReducerState, action: PaymentAction) {}

export default function Payment() {
  const {totalPrice} = useCartContext()

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-5xl text-center">Payment</h1>
        <h2 className="text-3xl text-center mt-8">
          Total Price: {formatCurrency(totalPrice)}
        </h2>
        <h2 className="text-3xl text-center mt-2 text-sky-400">
          Inserted Amount: {formatCurrency(125)}
        </h2>
      </div>
    </div>
  )
}
