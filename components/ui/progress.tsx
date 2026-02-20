import * as React from 'react'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

export function Progress({ value = 0, className = '' }: ProgressProps) {
  return (
    <div className={w-full bg-gray-200 rounded-full h-2 }>
      <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: ${Math.min(100, Math.max(0, value))}% }} />
    </div>
  )
}
