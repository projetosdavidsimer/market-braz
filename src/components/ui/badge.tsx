"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { badgeColors, type BadgeColorVariant, getStatusColor } from "@/lib/badge-colors"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        success: "",
        warning: "",
        info: "",
        neutral: "",
        purple: "",
        pink: "",
      },
      size: {
        default: "px-2 py-0.5 text-xs",
        sm: "px-1.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
  status?: string
}

function Badge({ 
  className, 
  variant = "default", 
  size, 
  status, 
  style, 
  asChild = false,
  ...props 
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"
  
  // Se um status for fornecido, use a cor apropriada
  const colorVariant: BadgeColorVariant = status 
    ? getStatusColor(status)
    : (variant as BadgeColorVariant) || 'neutral'

  // Detecta tema escuro via CSS
  const [isDark, setIsDark] = React.useState(false)
  
  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    // Observer para mudanças de tema
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  // Obtém as cores do sistema com fallback
  const colors = badgeColors[colorVariant] || badgeColors.neutral
  const themeColors = isDark ? colors.dark : colors.light

  const customStyle = {
    backgroundColor: themeColors.bg,
    color: themeColors.text,
    borderColor: themeColors.border,
    ...style
  }

  return (
    <Comp 
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)} 
      style={customStyle}
      {...props} 
    />
  )
}

export { Badge, badgeVariants }
export type { BadgeProps }