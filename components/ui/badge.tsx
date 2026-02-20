import * as React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-blue-100 text-blue-700',
    secondary: 'bg-gray-100 text-gray-700',
    destructive: 'bg-red-100 text-red-700',
    outline: 'border border-gray-200 text-gray-700',
  }
  return <span className={inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium  } {...props} />
}
