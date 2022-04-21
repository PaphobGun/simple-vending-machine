import React from 'react'

import {useCartContext} from 'context/cart-context'
import NavigationButton from 'components/navigation-button'
import useProducts from 'modules/products/hooks/products'
import CounterCard from 'components/counter-card'

export default function Products() {
  const {products, getProductAmount, increment, decrement} = useCartContext()
  const {data} = useProducts()

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-5xl text-center">
          Simple Vending <span className="text-sky-500">Machine</span>
        </h1>
        <div className="grid grid-cols-12 mt-16 gap-x-4 gap-y-8">
          {data.map(p => (
            <div
              key={p.productId}
              className="col-span-6 md:col-span-3 lg:col-span-2"
            >
              <CounterCard
                item={{
                  name: p.productName,
                  image: p.productImage,
                  price: p.price,
                  amount: getProductAmount(p.productId),
                }}
                increment={() => increment({id: p.productId, value: p.price})}
                decrement={() => decrement({id: p.productId, value: p.price})}
                incrementDisabled={getProductAmount(p.productId) === p.stock}
                decrementDisabled={getProductAmount(p.productId) === 0}
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <NavigationButton to="/payment" disabled={!products.length}>
            Proceed Payment
          </NavigationButton>
        </div>
      </div>
    </div>
  )
}
