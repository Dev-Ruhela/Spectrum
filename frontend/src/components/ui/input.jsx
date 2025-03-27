import React from 'react'

export function Input({ type, placeholder, value, onChange, className, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 transition-all duration-200 ease-in-out ${className}`}
      {...props}
    />
  )
}
