import {useQuery} from 'react-query'

import {client} from 'utils/http-client'

interface Fiat {
  fiatId: string
  fiatName: string
  fiatImage: string
  stock: number
  price: number
}

export default function useFiats() {
  const {data = [], ...rest} = useQuery<Fiat[]>(
    'get-fiats',
    () => client('api/get-fiats').then(data => data.fiats),
    {
      refetchOnWindowFocus: false,
    },
  )

  return {data, ...rest}
}

export type {Fiat}
