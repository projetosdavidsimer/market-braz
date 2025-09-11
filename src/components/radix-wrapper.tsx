"use client"

import { useEffect, useState } from "react"

interface RadixWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RadixWrapper({ children, fallback }: RadixWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the same structure to avoid hydration mismatch
  return (
    <div data-radix-wrapper>
      {children}
    </div>
  )
}

// HOC para envolver componentes Radix automaticamente
export function withRadixWrapper<T extends object>(
  Component: React.ComponentType<T>
) {
  const WrappedComponent = (props: T) => (
    <RadixWrapper>
      <Component {...props} />
    </RadixWrapper>
  )
  
  WrappedComponent.displayName = `withRadixWrapper(${Component.displayName || Component.name})`
  
  return WrappedComponent
}