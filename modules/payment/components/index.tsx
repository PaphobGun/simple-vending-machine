import React from 'react'

import {formatCurrency} from 'utils/formatter'
import useFiats from 'modules/payment/hooks/fiats'
import CounterCard from 'components/counter-card'
import {usePaymentContext} from 'context/payment-context'
import {useCartContext} from 'context/cart-context'
import useCheckout from 'modules/payment/hooks/checkout'

export default function Payment() {
  const {totalPrice, products} = useCartContext()
  const {
    totalPrice: totalInserted,
    getFiatAmount,
    increment,
    decrement,
    fiats,
  } = usePaymentContext()
  const {data} = useFiats()
  const {mutate: checkout} = useCheckout()
  const checkoutDisabled = React.useMemo(
    () => totalInserted < totalPrice,
    [totalPrice, totalInserted],
  )

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-5xl text-center">Payment</h1>
        <h2 className="text-3xl text-center mt-8">
          Total Price: {formatCurrency(totalPrice)}
        </h2>
        <h2 className="text-3xl text-center mt-2 text-sky-400">
          Inserted Amount: {formatCurrency(totalInserted)}
        </h2>
        <div className="grid grid-cols-12 mt-16 gap-x-4 gap-y-8">
          {data.map(f => (
            <div
              key={f.fiatId}
              className="col-span-6 md:col-span-3 lg:col-span-2"
            >
              <CounterCard
                item={{
                  name: f.fiatName,
                  image: f.fiatImage,
                  price: f.price,
                  amount: getFiatAmount(f.fiatId),
                }}
                increment={() => increment({id: f.fiatId, value: f.price})}
                decrement={() => decrement({id: f.fiatId, value: f.price})}
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            className={`text-white bg-sky-400 rounded py-2 px-4 ${
              checkoutDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => checkout({products, fiats})}
            disabled={checkoutDisabled}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
