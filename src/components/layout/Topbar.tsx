"use client"

import { Menu, Bell } from "lucide-react"

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-sage-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-x-3">
        {onMenuClick && (
          <button
            type="button"
            className="-m-2.5 p-2.5 text-sage-700 lg:hidden hover:bg-sage-50 rounded-md transition-colors"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-end gap-x-4">
        <button type="button" className="-m-2.5 p-2.5 text-sage-400 hover:text-sage-600 transition-colors">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-sage-200" aria-hidden="true" />

        <div className="flex items-center gap-x-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold leading-6 text-sage-900" aria-hidden="true">
              Mahasiswa
            </span>
            <span className="text-xs text-sage-500 leading-4">Universitas</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-sage-200 flex items-center justify-center text-sage-700 font-bold overflow-hidden border border-sage-300">
            M
          </div>
        </div>
      </div>
    </div>
  )
}
