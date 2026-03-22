"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { login } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeartHandshake, Loader2, Sparkles, ArrowLeft } from "lucide-react"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  const fillDemo = (type: 'safe' | 'risk') => {
    if (type === 'safe') {
      setEmail('budi@example.com')
      setPassword('password123')
    } else {
      setEmail('sari@example.com')
      setPassword('password123')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10">
        <Link href="/" className="inline-flex items-center justify-center p-3 bg-sage-50 rounded-full text-sage-600 hover:bg-sage-100 hover:text-sage-900 transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="mx-auto h-16 w-16 bg-sage-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-sage-200">
          <HeartHandshake className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-sage-950">
          Masuk ke RuangSela
        </h2>
        <p className="text-base font-medium text-sage-600 mt-2">
          Lanjutkan perjalanan menjaga keseimbanganmu.
        </p>
      </div>

      <form className="space-y-6" action={onSubmit}>
        {error && (
          <div className="p-4 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-center">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-sage-900 block mb-2">Email Pengguna</label>
            <Input 
              name="email"
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 border-sage-200 focus-visible:ring-sage-600 focus-visible:border-sage-600 text-sage-900 text-base bg-white/50 backdrop-blur-sm transition-all"
              placeholder="nama@kampus.ac.id"
              readOnly={loading}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-sage-900 block">Kata Sandi</label>
              <Link href="#" className="text-xs font-bold text-softBlue-600 hover:text-softBlue-700 transition-colors">
                Lupa Kata Sandi?
              </Link>
            </div>
            <Input 
              name="password"
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 border-sage-200 focus-visible:ring-sage-600 focus-visible:border-sage-600 text-sage-900 text-base bg-white/50 backdrop-blur-sm transition-all"
              placeholder="••••••••"
              readOnly={loading}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-14 mt-4 bg-sage-700 hover:bg-sage-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-sage-200 transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          {loading ? "Membuka Ruang..." : "Masuk"}
        </Button>
      </form>

      {/* Demo Injector */}
      {isDemo && (
        <div className="mt-8 pt-6 border-t border-sage-100 animate-in fade-in duration-500">
          <div className="bg-softBlue-50 rounded-2xl p-5 border border-softBlue-200">
            <p className="text-xs font-bold text-softBlue-800 mb-3 flex items-center justify-center gap-1.5 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> 
              Mode Demo Juri
            </p>
            <div className="flex flex-col gap-2">
              <Button type="button" size="sm" variant="outline" className="w-full border-softBlue-300 text-softBlue-800 bg-white hover:bg-softBlue-100 h-10 font-semibold transition-colors" onClick={() => fillDemo('safe')}>
                Isi Data: Akun Sehat (Budi)
              </Button>
              <Button type="button" size="sm" variant="outline" className="w-full border-rose-300 text-rose-800 bg-white hover:bg-rose-50 h-10 font-semibold transition-colors" onClick={() => fillDemo('risk')}>
                Isi Data: Akun Krisis (Sari)
              </Button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-sm font-medium text-sage-600 mt-10">
        Tidak Punya Akun?{" "}
        <Link href="/register" className="font-bold text-sage-900 hover:text-softBlue-600 transition-colors">
          Daftar di sini
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex w-full font-sans overflow-hidden">
      
      {/* Left Column: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 xl:px-24">
         <Suspense fallback={<div className="p-8 text-center text-sage-500 font-medium">Memuat form keamanan...</div>}>
            <LoginForm />
         </Suspense>
      </div>

      {/* Right Column: Featured Image */}
      <div className="hidden lg:flex w-1/2 relative bg-sage-50 items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/login-bg.png" 
            alt="Temukan ketenangan akademikmu" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage-950/80 via-sage-900/20 to-transparent"></div>
        </div>
        
        {/* Quote overlay on image */}
        <div className="relative z-10 w-full max-w-lg p-10 text-white mt-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white/90 text-xs font-bold mb-6 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
             Pendamping Mahasiswa
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Harmoni dalam ambisi dan kesehatan pikiran.
          </h2>
          <p className="text-lg text-sage-100 font-medium leading-relaxed">
            Lebih dari sekadar mengejar target kelulusan. RuangSela hadir untuk merawat kewarasanmu di setiap sela perjuangan akademik.
          </p>
        </div>
      </div>

    </div>
  )
}
