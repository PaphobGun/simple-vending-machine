import React from 'react'

interface Product {
  productId: string
  productName: string
  productImage: string
  price: number
  amount: number
}

interface ProductInAction {
  productId: string
  productName: string
  price: number
  productImage: string
}

interface CartState {
  products: Product[]
  totalPrice: number
}

interface CartContext extends CartState {
  increment: (product: ProductInAction) => void
  decrement: (product: ProductInAction) => void
  getProductAmount: (productId: string) => number
}

enum CartActionType {
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
}

interface IncrementAction {
  type: CartActionType.INCREMENT_PRODUCT
  product: ProductInAction
}

interface DecrementAction {
  type: CartActionType.DECREMENT_PRODUCT
  product: ProductInAction
}

interface AddAction {
  type: CartActionType.ADD_PRODUCT
  product: Product
}

interface RemoveAction {
  type: CartActionType.REMOVE_PRODUCT
  product: ProductInAction
}

type CartAction = IncrementAction | DecrementAction | AddAction | RemoveAction

const CartContext = React.createContext<CartContext | null>(null)

function useCartContext() {
  const cartContext = React.useContext(CartContext)
  if (!cartContext) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return cartContext
}

function cartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case CartActionType.INCREMENT_PRODUCT:
      return {
        ...state,
        products: state.products.map(p =>
          p.productId === action.product.productId
            ? {...p, amount: p.amount + 1}
            : p,
        ),
        totalPrice: state.totalPrice + action.product.price,
      }
    case CartActionType.DECREMENT_PRODUCT:
      return {
        ...state,
        products: state.products.map(p =>
          p.productId === action.product.productId
            ? {...p, amount: p.amount - 1}
            : p,
        ),
        totalPrice: state.totalPrice - action.product.price,
      }
    case CartActionType.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
        totalPrice: state.totalPrice + action.product.price,
      }
    case CartActionType.REMOVE_PRODUCT:
      const target = state.products.find(
        p => p.productId === action.product.productId,
      )
      if (!target) {
        throw new Error('Invalid product')
      }
      return {
        ...state,
        products: state.products.filter(
          p => p.productId !== action.product.productId,
        ),
        totalPrice: state.totalPrice - target.amount * target.price,
      }
    default:
      throw new Error('action type is not support')
  }
}

function CartProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer(cartReducer, {
    products: [],
    totalPrice: 0,
  })

  const increment = (product: ProductInAction) => {
    const existingProduct = state.products.find(
      p => p.productId === product.productId,
    )
    if (existingProduct) {
      dispatch({type: CartActionType.INCREMENT_PRODUCT, product})
    } else {
      dispatch({
        type: CartActionType.ADD_PRODUCT,
        product: {...product, amount: 1},
      })
    }
  }

  const decrement = (product: ProductInAction) => {
    const existingProduct = state.products.find(
      p => p.productId === product.productId,
    )
    if (existingProduct?.amount === 1) {
      dispatch({type: CartActionType.REMOVE_PRODUCT, product})
    } else {
      dispatch({type: CartActionType.DECREMENT_PRODUCT, product})
    }
  }

  const getProductAmount = React.useCallback(
    (productId: string) => {
      const product = state.products.find(p => p.productId === productId)

      if (product) {
        return product.amount
      }

      return 0
    },
    [state.products],
  )

  const value = {...state, increment, decrement, getProductAmount}

  return <CartContext.Provider value={value} {...props} />
}

export {useCartContext, CartProvider}
