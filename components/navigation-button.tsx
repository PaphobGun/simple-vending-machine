import React from 'react'
import Link from 'next/link'

interface NavigationButtonProps {
  to: string
  disabled?: boolean
}

export default function NavigationButton({
  to,
  disabled,
  children,
}: React.PropsWithChildren<NavigationButtonProps>) {
  return (
    <Link href={to} passHref>
      <button
        className={`text-white bg-sky-400 rounded py-2 px-4 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={disabled}
      >
        {children}
      </button>
    </Link>
  )
}
