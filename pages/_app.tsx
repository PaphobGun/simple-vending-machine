import '../styles/globals.css'
import type {AppProps} from 'next/app'

import {ProductsProvider} from 'modules/products/context/products-context'
import {QueryClientProvider, QueryClient} from 'react-query'

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <Component {...pageProps} />
      </ProductsProvider>
    </QueryClientProvider>
  )
}

export default MyApp
