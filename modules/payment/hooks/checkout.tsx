import {useMutation} from 'react-query'
import {client} from 'utils/http-client'

interface ProductCheckout {
  id: string
  amount: number
}

interface FiatCheckout {
  id: string
  amount: number
}

interface CheckOutParams {
  products: ProductCheckout[]
  fiats: FiatCheckout[]
}

export default function useCheckout() {
  return useMutation((params: CheckOutParams) =>
    client('api/post-checkout', params),
  )
}
