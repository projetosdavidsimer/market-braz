"use client"

import { useId } from "react"
import { createContext, useContext } from "react"

interface StableIdContextType {
  generateId: (suffix?: string) => string
}

const StableIdContext = createContext<StableIdContextType | null>(null)

export function StableIdProvider({ children }: { children: React.ReactNode }) {
  const baseId = useId()
  
  const generateId = (suffix?: string) => {
    return suffix ? `${baseId}-${suffix}` : baseId
  }

  return (
    <StableIdContext.Provider value={{ generateId }}>
      {children}
    </StableIdContext.Provider>
  )
}

export function useStableId(suffix?: string) {
  const context = useContext(StableIdContext)
  if (!context) {
    // Fallback para quando não está dentro do provider
    const id = useId()
    return suffix ? `${id}-${suffix}` : id
  }
  return context.generateId(suffix)
}