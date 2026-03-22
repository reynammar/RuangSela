"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, UserPlus, HeartHandshake, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { logout } from "@/app/actions/auth"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Jurnal AI", href: "/journal", icon: BookOpen },
  { name: "Sobat (Buddy)", href: "/buddy", icon: UserPlus },
  { name: "Bantuan & Referral", href: "/help", icon: HeartHandshake },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-sage-50 border-r border-sage-100">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-sage-100 bg-white">
        <h1 className="text-xl font-bold text-sage-800 tracking-tight">Ruang<span className="text-softBlue-500">Sela</span></h1>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-sage-200 text-sage-900"
                    : "text-sage-700 hover:bg-sage-100 hover:text-sage-900",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-sage-700" : "text-sage-400 group-hover:text-sage-700",
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-sage-100 p-4">
        <Link
          href="/settings"
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-sage-700 hover:bg-sage-100 hover:text-sage-900 transition-colors mb-1"
        >
          <Settings className="mr-3 h-5 w-5 text-sage-400 group-hover:text-sage-700" />
          Pengaturan
        </Link>
        <form action={async () => { await logout() }} className="w-full">
          <button
            type="submit"
            className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
            Keluar
          </button>
        </form>
      </div>
    </div>
  )
}
