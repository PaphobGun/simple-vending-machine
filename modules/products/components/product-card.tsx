import Image from 'next/image'
import React from 'react'

import {useCartContext} from 'context/cart'
import UnaryButton from 'components/unary-button'
import {formatCurrency} from 'utils/formatter'
import type {Product} from 'modules/products/hooks/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({
  product: {productId, productName, productImage, stock, price},
}: React.PropsWithChildren<ProductCardProps>) {
  const {getProductAmount, increment, decrement} = useCartContext()
  const amount = React.useMemo(
    () => getProductAmount(productId),
    [getProductAmount, productId],
  )

  const onClickIncrement = () => {
    increment({
      productId,
      productName,
      price,
      productImage,
    })
  }
  const onClickDecrement = () => {
    if (amount <= 0) {
      return
    }

    decrement({
      productId,
      productName,
      productImage,
      price,
    })
  }

  return (
    <div className="text-center">
      <div>
        <Image src={productImage} alt="prod-image" width={120} height={120} />
      </div>
      <h4>{productName}</h4>
      <h4>{formatCurrency(price)} THB</h4>
      <div className="flex justify-center items-center mt-4 gap-x-2">
        <UnaryButton click={onClickDecrement} disabled={amount <= 0}>
          -
        </UnaryButton>
        <div className="w-4">{amount}</div>
        <UnaryButton click={onClickIncrement} disabled={amount === stock}>
          +
        </UnaryButton>
      </div>
    </div>
  )
}
