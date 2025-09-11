"use client"

import { createContext, useContext, useEffect, useState } from 'react'

interface HydrationContextType {
  isHydrated: boolean
  isMobile: boolean
}

const HydrationContext = createContext<HydrationContextType>({
  isHydrated: false,
  isMobile: false,
})

export function useHydration() {
  return useContext(HydrationContext)
}

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Marca como hidratado
    setIsHydrated(true)
    
    // Detecta mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <HydrationContext.Provider value={{ isHydrated, isMobile }}>
      {children}
    </HydrationContext.Provider>
  )
}