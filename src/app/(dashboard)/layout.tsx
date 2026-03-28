"use client";

import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import RuangSelaLogo from "@/assets/RuangSelaLogo2.svg";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f6] font-sans text-slate-900 selection:bg-sage-200 selection:text-sage-900">
      <Navbar />

      <main className="flex-1 flex flex-col relative w-full items-center">
        <div className="w-full flex-1 flex flex-col pb-24">{children}</div>
        <footer className="bg-softBlue-600 pt-16 pb-8 border-t border-softBlue-500 w-full mt-auto flex-shrink-0 z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center mb-6">
                  <Image
                    src={RuangSelaLogo}
                    alt="Logo RuangSela"
                    width={280}
                    height={64}
                    className="h-20 w-auto"
                  />
                </div>
                <p className="text-softBlue-100 text-sm leading-relaxed max-w-xs font-medium">
                  Sistem pendukung kesehatan mental dan manajemen beban akademik
                  bagi mahasiswa Indonesia. Jangan berjalan sendiri di keramaian
                  kampus.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
                  Navigasi
                </h4>
                <ul className="space-y-4 text-sm font-medium text-softBlue-100">
                  <li>
                    <Link
                      href="/dashboard"
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/journal"
                      className="hover:text-white transition-colors"
                    >
                      Jurnal AI
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buddy"
                      className="hover:text-white transition-colors"
                    >
                      Sobat Terpercaya
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="hover:text-white transition-colors"
                    >
                      Bantuan
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
                  Cari Kami
                </h4>
                <ul className="space-y-4 text-sm font-medium text-softBlue-100">
                  <li className="flex gap-3 items-center">
                    <MapPin className="w-4 h-4 text-white" /> Kampus Pusat IT,
                    Jakarta, Indonesia
                  </li>
                  <li className="flex gap-3 items-center">
                    <Phone className="w-4 h-4 text-white" /> Bantuan Darurat:
                    119
                  </li>
                  <li className="flex gap-3 items-center">
                    <Mail className="w-4 h-4 text-white" /> pelukan@ruangsela.id
                  </li>
                  <li className="flex gap-3 items-center">
                    <InstagramIcon className="w-4 h-4 text-white" />{" "}
                    <a href="https://www.instagram.com/ruangselakita/" className="hover:text-white transition-colors">
                      @ruangselakita
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center md:flex md:justify-between items-center text-xs text-softBlue-200 font-medium border-t border-softBlue-500 pt-8">
              <p>
                © {new Date().getFullYear()} RuangSela MVP Version. All rights
                reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0 justify-center">
                <Link href="#" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
