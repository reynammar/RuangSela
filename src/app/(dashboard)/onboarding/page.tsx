"use client"

import { useState } from "react"
import { submitStressCheck } from "@/app/actions/stress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, BookOpen, Clock, Activity, Loader2 } from "lucide-react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // Progress calc
  const totalSteps = 4
  const progressPercent = ((step - 1) / totalSteps) * 100

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    await submitStressCheck(formData) // inside action handles redirect
    // no need to set isloading false if redirect occurs, but handled just in case
  }

  return (
    <div className="max-w-2xl mx-auto py-12 animate-in fade-in duration-500">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-sage-950">Cek Stres Akademik</h1>
        <p className="mt-2 text-sage-600">Mari ukur beban kerjamu minggu ini. Jawab dengan jujur sesuai apa yang kamu rasakan tanpa tekanan.</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-sage-100 rounded-full h-2 mb-8 overflow-hidden">
        <div 
          className="bg-softBlue-500 h-2 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <form action={handleSubmit}>
        <Card className="border-sage-200 shadow-md">
          <CardContent className="p-8">
            
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-6 text-sage-800">
                  <BookOpen className="w-5 h-5 text-softBlue-600" />
                  <h2 className="text-xl font-semibold">Tanggung Jawab Akademik</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-1">Semester berapa kamu sekarang?</label>
                    <Input name="semester" type="number" min="1" max="14" defaultValue="1" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-1">Total SKS yang diambil semester ini?</label>
                    <Input name="sks" type="number" min="1" max="24" defaultValue="20" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-1">Seberapa sibuk kamu di organisasi / kepanitiaan?</label>
                    <select name="orgLevel" className="flex h-10 w-full rounded-md border border-sage-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500" required>
                      <option value="low">Rendah (Hanya anggota pasif / tidak ikut)</option>
                      <option value="medium">Sedang (Anggota aktif / staf)</option>
                      <option value="high">Tinggi (Pengurus inti / ketua)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-6 text-sage-800">
                  <Clock className="w-5 h-5 text-softBlue-600" />
                  <h2 className="text-xl font-semibold">Beban Minggu Ini</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-1">Berapa banyak tugas/deadline dalam 7 hari ke depan?</label>
                    <Input name="deadlines" type="number" min="0" defaultValue="0" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-1">Ada berapa ujian/kuis di minggu ini?</label>
                    <Input name="exams" type="number" min="0" defaultValue="0" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-1">Rata-rata tidurmu dalam seminggu terakhir (jam/hari)?</label>
                    <Input name="sleepHours" type="number" min="0" max="24" defaultValue="7" required />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-6 text-sage-800">
                  <Activity className="w-5 h-5 text-softBlue-600" />
                  <h2 className="text-xl font-semibold">Self-Assessment Emosional</h2>
                  <p className="text-xs text-sage-500 ml-auto">Skala 1 (Sangat Rendah) - 5 (Sangat Tinggi)</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-2">Tingkat kelelahan fisik & mental (exhaustion)?</label>
                    <div className="flex gap-4 items-center">
                      <span className="text-xs text-sage-500">Ringan</span>
                      <input type="range" name="exhaustion" min="1" max="5" defaultValue="3" className="flex-1 accent-sage-600" />
                      <span className="text-xs text-sage-500">Berat</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-2">Perasaan tertekan tuntutan akademik?</label>
                    <div className="flex gap-4 items-center">
                      <span className="text-xs text-sage-500">Biasa</span>
                      <input type="range" name="pressure" min="1" max="5" defaultValue="3" className="flex-1 accent-sage-600" />
                      <span className="text-xs text-sage-500">Kewalahan</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-900 mb-2">Seberapa sering kamu overthinking tentang masa depan/kuliah?</label>
                    <div className="flex gap-4 items-center">
                      <span className="text-xs text-sage-500">Jarang</span>
                      <input type="range" name="overwhelm" min="1" max="5" defaultValue="3" className="flex-1 accent-sage-600" />
                      <span className="text-xs text-sage-500">Sering</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center animate-in slide-in-from-right-4 duration-300 py-8">
                <div className="w-16 h-16 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-sage-950">Terima Kasih Telah Jujur</h2>
                <p className="text-sage-600 max-w-sm mx-auto">
                  Menyadari keadaan diri adalah langkah pertama yang hebat. Mari kita lihat rangkuman kondisi kerjamu dan bagaimana RuangSela bisa mendukungmu minggu ini.
                </p>
              </div>
            )}

            {/* Stepper Controls */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-sage-100">
              {step > 1 ? (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setStep(s => s - 1)}
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
              ) : <div></div>}

              {step < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={() => setStep(s => s + 1)}
                >
                  Selanjutnya
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading} className="bg-sage-600 hover:bg-sage-700 text-white">
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Selesaikan Cek Stres"}
                </Button>
              )}
            </div>

          </CardContent>
        </Card>
      </form>
    </div>
  )
}
