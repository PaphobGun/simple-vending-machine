import Image from 'next/image'
import React from 'react'

import UnaryButton from 'components/unary-button'
import {formatCurrency} from 'utils/formatter'

interface CounterCardProps {
  increment: () => void
  decrement: () => void
  item: {
    name: string
    image: string
    price: number
    amount: number
  }
  decrementDisabled?: boolean
  incrementDisabled?: boolean
}

export default function CounterCard({
  increment,
  decrement,
  item: {image, name, price, amount},
  decrementDisabled = false,
  incrementDisabled = false,
}: React.PropsWithChildren<CounterCardProps>) {
  return (
    <div className="text-center">
      <div>
        <Image src={image} alt="prod-image" width={150} height={120} />
      </div>
      <h4>{name}</h4>
      <h4>{formatCurrency(price)} THB</h4>
      <div className="flex justify-center items-center mt-4 gap-x-2">
        <UnaryButton click={decrement} disabled={decrementDisabled}>
          -
        </UnaryButton>
        <div className="w-4">{amount}</div>
        <UnaryButton click={increment} disabled={incrementDisabled}>
          +
        </UnaryButton>
      </div>
    </div>
  )
}
