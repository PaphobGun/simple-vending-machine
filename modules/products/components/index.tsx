import React from 'react'

import {useCartContext} from 'context/cart'
import NavigationButton from 'components/navigation-button'
import ProductCard from 'modules/products/components/product-card'
import useProducts from 'modules/products/hooks/products'

export default function Products() {
  const {products} = useCartContext()
  const {data} = useProducts()

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-5xl text-center">
          Simple Vending <span className="text-sky-500">Machine</span>
        </h1>
        <div className="grid grid-cols-12 mt-16 gap-x-4 gap-y-8">
          {data.map(p => (
            <div key={p.productId} className="col-span-6 md:col-span-2">
              <ProductCard product={p} />
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
