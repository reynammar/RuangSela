"use client";

import { Menu, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RuangSelaLogo from "@/assets/RuangSelaLogo.svg";

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-x-4">
        {onMenuClick && (
          <button
            type="button"
            className="-m-2.5 p-2.5 text-slate-700 lg:hidden hover:bg-slate-50 rounded-md transition-colors"
            onClick={onMenuClick}
          >
            <span className="sr-only">Buka sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        {/* Logo untuk mode mobile (muncul saat sidebar disembunyikan) */}
        <Link href="/dashboard" className="lg:hidden flex items-center">
          <Image
            src={RuangSelaLogo}
            alt="Logo RuangSela"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center justify-end gap-x-4">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-slate-400 hover:text-softBlue-500 transition-colors"
        >
          <span className="sr-only">Lihat notifikasi</span>
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Separator Vertikal */}
        <div
          className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200"
          aria-hidden="true"
        />

        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex flex-col items-end">
            <span
              className="text-sm font-bold leading-6 text-slate-900"
              aria-hidden="true"
            >
              Mahasiswa
            </span>
            <span className="text-[11px] font-medium text-slate-500 leading-4">
              Universitas
            </span>
          </div>
          <div className="h-9 w-9 rounded-full bg-softBlue-50 flex items-center justify-center text-softBlue-700 font-bold overflow-hidden border border-softBlue-200 shadow-sm hover:scale-105 transition-transform cursor-pointer">
            M
          </div>
        </div>
      </div>
    </div>
  );
}
