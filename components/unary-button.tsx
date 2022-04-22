import React from 'react'

interface UnaryButtonProps {
  click: () => void
  disabled?: boolean
}

export default function UnaryButton({
  click,
  children,
  disabled = false,
}: React.PropsWithChildren<UnaryButtonProps>) {
  return (
    <button
      data-testid="unary-button"
      className={`text-white bg-sky-400 rounded py-1 px-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={click}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
