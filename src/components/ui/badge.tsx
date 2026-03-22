import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "warning" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2",
        {
          "border-transparent bg-sage-500 text-white hover:bg-sage-600": variant === "default",
          "border-transparent bg-softBlue-100 text-softBlue-900 hover:bg-softBlue-200": variant === "secondary",
          "border-transparent bg-red-100 text-red-900 hover:bg-red-200": variant === "destructive",
          "border-transparent bg-yellow-100 text-yellow-900 hover:bg-yellow-200": variant === "warning",
          "border-transparent bg-green-100 text-green-900 hover:bg-green-200": variant === "success",
          "text-sage-950 border-sage-200": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
