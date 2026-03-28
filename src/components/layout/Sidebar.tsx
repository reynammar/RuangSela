"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  UserPlus,
  HeartHandshake,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";
import RuangSelaLogo from "@/assets/RuangSelaLogo.svg";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Jurnal AI", href: "/journal", icon: BookOpen },
  { name: "Sobat (Buddy)", href: "/buddy", icon: UserPlus },
  { name: "Bantuan & Referral", href: "/help", icon: HeartHandshake },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-slate-200">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-200 bg-white">
        <Image
          src={RuangSelaLogo}
          alt="Logo RuangSela"
          width={180}
          height={40}
          priority
          className="h-10 w-auto"
        />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <nav className="flex-1 space-y-1.5">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-softBlue-50 text-softBlue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  "group flex items-center rounded-lg px-3 py-2.5 text-sm font-bold transition-all",
                )}
              >
                <item.icon
                  className={cn(
                    isActive
                      ? "text-softBlue-600"
                      : "text-slate-400 group-hover:text-slate-600",
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4">
        <Link
          href="/settings"
          className="group flex items-center rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors mb-1"
        >
          <Settings className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-600" />
          Pengaturan
        </Link>
        <form
          action={async () => {
            await logout();
          }}
          className="w-full"
        >
          <button
            type="submit"
            className="group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
            Keluar
          </button>
        </form>
      </div>
    </div>
  );
}
