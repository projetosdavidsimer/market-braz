"use client"

import { useEffect, useState } from "react"

interface HydrationBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationBoundary({ children, fallback }: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return <div suppressHydrationWarning>{fallback || children}</div>
  }

  return <div suppressHydrationWarning>{children}</div>
}

// Componente específico para Radix UI
export function RadixHydrationBoundary({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div suppressHydrationWarning data-hydration-boundary="radix">
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </div>
  )
}