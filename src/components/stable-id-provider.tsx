"use client"

import { ReactNode } from "react"

interface StableIdProviderProps {
  children: ReactNode
}

export function StableIdProvider({ children }: StableIdProviderProps) {
  // Por enquanto, apenas um wrapper simples
  return <>{children}</>
}

export function useStableId(suffix?: string) {
  // Retorna um ID simples por enquanto
  return suffix ? `stable-${suffix}` : "stable-id"
}