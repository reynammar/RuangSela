"use client"

import { Navbar } from "@/components/layout/Navbar"
import Link from "next/link"
import { HeartHandshake } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f6] font-sans text-slate-900 selection:bg-sage-200 selection:text-sage-900">
      <Navbar />
      
      {/* Main SaaS Content Area */}
      <main className="flex-1 flex flex-col relative w-full items-center">
        <div className="w-full flex-1 flex flex-col pb-24">
          {children}
        </div>
        <footer className="bg-sage-950 pt-16 pb-8 border-t border-sage-800 w-full mt-auto flex-shrink-0 z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-8 w-8 rounded-full bg-sage-800 flex items-center justify-center">
                    <HeartHandshake className="text-white w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-white">RuangSela.</span>
                </div>
                <p className="text-sage-400 text-sm leading-relaxed max-w-xs font-medium">
                  Sistem pendukung kesehatan mental dan manajemen beban akademik bagi mahasiswa Indonesia. Jangan berjalan sendiri di keramaian kampus.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Navigasi</h4>
                <ul className="space-y-4 text-sm font-medium text-sage-400">
                  <li><Link href="/dashboard" className="hover:text-softBlue-400 transition-colors">Home</Link></li>
                  <li><Link href="/journal" className="hover:text-softBlue-400 transition-colors">Jurnal AI</Link></li>
                  <li><Link href="/buddy" className="hover:text-softBlue-400 transition-colors">Sobat Terpercaya</Link></li>
                  <li><Link href="/help" className="hover:text-softBlue-400 transition-colors">Bantuan</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Hubungi Kami</h4>
                <ul className="space-y-4 text-sm font-medium text-sage-400">
                  <li className="flex gap-3"><span className="text-softBlue-500">📍</span> Kampus Pusat IT, Jakarta, Indonesia</li>
                  <li className="flex gap-3"><span className="text-softBlue-500">📞</span> Bantuan Darurat: 119</li>
                  <li className="flex gap-3"><span className="text-softBlue-500">✉️</span> pelukan@ruangsela.id</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center md:flex md:justify-between items-center text-xs text-sage-500 font-medium border-t border-sage-800 pt-8">
              <p>© {new Date().getFullYear()} RuangSela MVP Version. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0 justify-center">
                <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
                <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
