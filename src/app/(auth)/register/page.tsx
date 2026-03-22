"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signup } from "@/app/actions/auth"
import { Loader2, Leaf } from "lucide-react"

export default function RegisterPage() {
  const [status, setStatus] = useState<{ type: 'error'|'success', msg: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setStatus(null)
    const result = await signup(formData)
    if (result?.error) {
      setStatus({ type: 'error', msg: result.error })
    } else if (result?.success) {
      setStatus({ type: 'success', msg: result.message! })
      const form = document.querySelector('form')
      if (form) form.reset()
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative calm background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sage-100 rounded-full mix-blend-multiply blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-softBlue-100 rounded-full mix-blend-multiply blur-3xl opacity-60"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <div className="w-14 h-14 bg-sage-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sage-200 hover:scale-105 transition-transform cursor-pointer">
              <Leaf className="w-7 h-7" />
            </div>
          </Link>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-sage-950">
          Mulai Perjalananmu
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-sage-600">
          Buat akun untuk melacak stres akademikmu
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        <div className="bg-white/80 backdrop-blur-md py-10 px-6 shadow-xl shadow-sage-900/5 sm:rounded-3xl sm:px-10 border border-sage-100">
          <form className="space-y-5" action={onSubmit}>
            {status?.type === 'error' && (
              <div className="p-4 text-sm font-medium rounded-xl bg-red-50 text-red-600 border border-red-100">
                {status.msg}
              </div>
            )}
            {status?.type === 'success' && (
              <div className="p-4 text-sm font-medium rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                {status.msg}
              </div>
            )}

            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-sage-900 mb-2">Nama Panggilan</label>
              <Input id="full_name" name="full_name" type="text" className="h-12 border-sage-200 focus-visible:ring-sage-600 focus-visible:border-transparent bg-white/50" placeholder="Misal: Budi" required disabled={isLoading} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-sage-900 mb-2">Email</label>
              <Input id="email" name="email" type="email" className="h-12 border-sage-200 focus-visible:ring-sage-600 focus-visible:border-transparent bg-white/50" placeholder="mahasiswa@kampus.ac.id" required disabled={isLoading} />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-sage-900 mb-2">Kata Sandi</label>
              <Input id="password" name="password" type="password" className="h-12 border-sage-200 focus-visible:ring-sage-600 focus-visible:border-transparent bg-white/50" placeholder="••••••••" required disabled={isLoading} />
            </div>

            <Button type="submit" className="w-full h-12 mt-8 bg-sage-700 hover:bg-sage-800 text-white font-bold text-base rounded-xl transition-all hover:-translate-y-0.5 shadow-md" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isLoading ? "Mendaftar..." : "Daftar Akun"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-sage-600">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-bold text-sage-900 hover:text-softBlue-600 transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
