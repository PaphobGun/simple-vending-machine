import {useQuery} from 'react-query'

import {client} from 'utils/http-client'

interface Product {
  productId: string
  productName: string
  productImage: string
  stock: number
  price: number
}

export default function useProducts() {
  const {data = [], ...rest} = useQuery<Product[]>(
    'get-products',
    () => client('api/get-products').then(data => data.products),
    {
      refetchOnWindowFocus: false,
    },
  )

  return {data, ...rest}
}

export type {Product}
