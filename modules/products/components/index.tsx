import React from 'react'
import {useQuery} from 'react-query'

import {useProductsContext} from 'modules/products/context/products-context'
import {client} from 'utils/http-client'

export default function Products() {
  const {products, increment, decrement, setProducts} = useProductsContext()
  const {data} = useQuery('get-products', () =>
    client('api/hello').then(data => data.products),
  )

  React.useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data, setProducts])

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-5xl text-center">Simple Vending Machine</h1>
        {products.map(p => (
          <div key={p.productId}>
            <h4>{p.productName}</h4>
            <div>amount: {p.amount}</div>
            <button className="block" onClick={() => decrement(p)}>
              -
            </button>
            <button onClick={() => increment(p)}>+</button>
          </div>
        ))}
      </div>
    </div>
  )
}
