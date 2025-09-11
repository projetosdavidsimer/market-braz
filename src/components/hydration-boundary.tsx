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
    return <>{fallback || null}</>
  }

  return <>{children}</>
}

// Componente específico para Radix UI
export function RadixHydrationBoundary({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render same structure for SSR and client to avoid hydration mismatch
  return (
    <div data-hydration-boundary="radix">
      {children}
    </div>
  )
}