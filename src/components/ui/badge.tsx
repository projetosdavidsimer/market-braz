import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-white",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-700 text-white dark:bg-slate-600 [a&]:hover:bg-slate-800 dark:[a&]:hover:bg-slate-700",
        secondary:
          "border-transparent bg-gray-700 text-white dark:bg-gray-600 [a&]:hover:bg-gray-800 dark:[a&]:hover:bg-gray-700",
        destructive:
          "border-transparent bg-red-600 text-white dark:bg-red-700 [a&]:hover:bg-red-700 dark:[a&]:hover:bg-red-800 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-white border-gray-300 bg-gray-700 dark:bg-gray-600 dark:border-gray-500 [a&]:hover:bg-gray-800 dark:[a&]:hover:bg-gray-700 [a&]:hover:text-white",
        success:
          "border-transparent bg-green-700 text-white dark:bg-green-600 [a&]:hover:bg-green-800 dark:[a&]:hover:bg-green-700",
        warning:
          "border-transparent bg-orange-600 text-white dark:bg-orange-700 [a&]:hover:bg-orange-700 dark:[a&]:hover:bg-orange-800",
        info:
          "border-transparent bg-blue-700 text-white dark:bg-blue-600 [a&]:hover:bg-blue-800 dark:[a&]:hover:bg-blue-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
