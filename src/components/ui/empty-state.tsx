import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col flex-1 items-center justify-center rounded-xl border border-dashed border-sage-200 bg-white/50 p-8 text-center animate-in fade-in duration-500",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-500 mb-4">
          {icon}
        </div>
      )}
      <h3 className="mt-2 text-sm font-semibold text-sage-900">{title}</h3>
      <p className="mt-1 text-sm text-sage-500 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
