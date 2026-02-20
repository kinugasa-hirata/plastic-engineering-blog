'use client'

import * as React from 'react'

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextType>({ value: '', onValueChange: () => {} })

export function Tabs({ value, onValueChange, children, className = '' }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  return <TabsContext.Provider value={{ value, onValueChange }}><div className={className}>{children}</div></TabsContext.Provider>
}

export function TabsList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={lex gap-1 bg-gray-100 p-1 rounded-lg }>{children}</div>
}

export function TabsTrigger({ value, children, className = '' }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext)
  return (
    <button
      onClick={() => ctx.onValueChange(value)}
      className={px-3 py-1.5 rounded-md text-sm font-medium transition-colors  }
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className = '' }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext)
  if (ctx.value !== value) return null
  return <div className={className}>{children}</div>
}
