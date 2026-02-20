'use client'

import { Toaster as SonnerToaster } from 'sonner'

interface ToasterProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export function Toaster({ position = 'top-right' }: ToasterProps) {
  return <SonnerToaster position={position} richColors />
}
