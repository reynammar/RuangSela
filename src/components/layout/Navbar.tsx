"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Menu, X, Bell, LogOut,
  Activity, PenLine, UserPlus, ShieldCheck,
  MoreVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
// @ts-ignore
import { logout } from '@/app/actions/auth'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Activity },
  { name: 'Jurnal AI', href: '/journal', icon: PenLine },
  { name: 'Buddy System', href: '/buddy', icon: UserPlus },
  { name: 'Bantuan', href: '/help', icon: ShieldCheck },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 relative">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
              <div className="h-7 w-7 rounded-[9px] bg-slate-900 flex items-center justify-center text-white font-bold shadow-sm">
                R
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                RuangSela.
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              {navigation.map((item) => {
                const isActive = pathname ? (pathname === item.href || pathname.startsWith(item.href + "/")) : false
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-[14px] font-medium transition-colors",
                      isActive 
                        ? "bg-slate-100 text-slate-900" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>

          {/* Right Area (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
              <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
              <Bell className="h-5 w-5" strokeWidth={2} />
            </button>
            
            <div className="h-5 w-px bg-slate-200 mx-1"></div>
            
            <div className="flex items-center gap-3">
              <Link href="/settings" className="flex items-center gap-2 group">
                <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm group-hover:border-slate-300 transition-colors">
                  M
                </div>
              </Link>
              {/* @ts-ignore */}
              <form action={logout} className="flex items-center">
                <button type="submit" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center" title="Keluar">
                  <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-4">
            <button className="text-slate-400 relative">
              <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
              <Bell className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => {
              const isActive = pathname ? (pathname === item.href || pathname.startsWith(item.href + "/")) : false
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn("h-[18px] w-[18px]", isActive ? "text-slate-900" : "text-slate-400")} />
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 mt-4 border-t border-slate-100">
              {/* @ts-ignore */}
              <form action={logout}>
                <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  <LogOut className="h-[18px] w-[18px] text-slate-400" /> Keluar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
