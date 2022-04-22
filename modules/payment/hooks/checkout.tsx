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

interface ChangeFiat {
  1: number
  5: number
  10: number
  20: number
  50: number
  100: number
  500: number
  1000: number
}

interface Data {
  changeFiat: ChangeFiat
  change: number
}

interface Error {
  msg: string
}

export default function useCheckout() {
  return useMutation<Data, any, Error | any>((params: CheckOutParams) =>
    client('api/post-checkout', params),
  )
}
