import '../styles/globals.css'
import type {AppProps} from 'next/app'

import {QueryClientProvider, QueryClient} from 'react-query'
import {CartProvider} from 'context/cart'

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </QueryClientProvider>
  )
}

export default MyApp
