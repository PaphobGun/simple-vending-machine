import '../styles/globals.css'
import type {AppProps} from 'next/app'

import {QueryClientProvider, QueryClient} from 'react-query'
import {CartProvider} from 'context/cart-context'
import {PaymentProvider} from 'context/payment-context'

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PaymentProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </PaymentProvider>
    </QueryClientProvider>
  )
}

export default MyApp
