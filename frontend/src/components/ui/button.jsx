import React from 'react'
import clsx from 'clsx'

export const Button = ({ variant = 'solid', children, className, ...props }) => {
  const baseStyles = 'px-6 py-2 rounded-md font-semibold focus:outline-none focus:ring transition'

  const variants = {
    solid: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    outline: 'border border-purple-600 text-purple-600 hover:bg-purple-100 focus:ring-purple-500',
    ghost: 'text-purple-600 hover:bg-purple-100 focus:ring-purple-500',
  }

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
