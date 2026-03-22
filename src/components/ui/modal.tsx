"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
}

export function Modal({ isOpen, onClose, children, title, description, className }: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-sage-950/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div 
        className={cn(
          "relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg sm:p-8 animate-in fade-in zoom-in-95",
          className
        )}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && <h2 className="text-xl font-semibold tracking-tight text-sage-950">{title}</h2>}
            {description && <p className="mt-1 text-sm text-sage-600">{description}</p>}
          </div>
        )}
        {children}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-sage-950"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>
  )
}
