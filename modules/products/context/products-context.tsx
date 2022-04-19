import React from 'react'

interface Product {
  productId: string
  productName: string
  amount: number
}

interface ProductsState {
  products: Product[]
}

interface ProductContext extends ProductsState {
  increment: (product: Product) => void
  decrement: (product: Product) => void
  setProducts: (products: Product[]) => void
}

enum ProductsActionType {
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  SET_PRODUCTS,
}

interface IncrementAction {
  type: ProductsActionType.INCREMENT_PRODUCT
  product: Product
}

interface DecrementAction {
  type: ProductsActionType.DECREMENT_PRODUCT
  product: Product
}

interface setProductsAction {
  type: ProductsActionType.SET_PRODUCTS
  products: Product[]
}

type ProductsAction = IncrementAction | DecrementAction | setProductsAction

const ProductsContext = React.createContext<ProductContext | null>(null)

function useProductsContext() {
  const productsContext = React.useContext(ProductsContext)
  if (!productsContext) {
    throw new Error('useProductsContext must be used within a ProductsProvider')
  }
  return productsContext
}

function productsReducer(state: ProductsState, action: ProductsAction) {
  switch (action.type) {
    case ProductsActionType.INCREMENT_PRODUCT:
      return {
        products: state.products.map(p =>
          p.productId === action.product.productId
            ? {...p, amount: p.amount + 1}
            : p,
        ),
      }
    case ProductsActionType.DECREMENT_PRODUCT:
      return {
        products: state.products.map(p =>
          p.productId === action.product.productId
            ? {...p, amount: p.amount - 1}
            : p,
        ),
      }
    case ProductsActionType.SET_PRODUCTS:
      return {
        products: action.products,
      }
    default:
      throw new Error('action type is not support')
  }
}

function ProductsProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer(productsReducer, {
    products: [],
  })

  const increment = (product: Product) => {
    dispatch({type: ProductsActionType.INCREMENT_PRODUCT, product})
  }

  const decrement = (product: Product) => {
    if (product.amount === 0) {
      return
    }
    dispatch({type: ProductsActionType.DECREMENT_PRODUCT, product})
  }

  const setProducts = React.useCallback((products: Product[]) => {
    dispatch({type: ProductsActionType.SET_PRODUCTS, products})
  }, [])

  const value = {products: state.products, increment, decrement, setProducts}

  return <ProductsContext.Provider value={value} {...props} />
}

export {useProductsContext, ProductsProvider}
