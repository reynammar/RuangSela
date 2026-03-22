"use client"

import { useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateProfile } from "@/app/actions/auth"
import { Loader2 } from "lucide-react"

export default function SettingsPage() {
  const [status, setStatus] = useState<{ type: 'error'|'success', msg: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setStatus(null)
    const result = await updateProfile(formData)
    if (result?.error) {
      setStatus({ type: 'error', msg: result.error })
    } else if (result?.success) {
      setStatus({ type: 'success', msg: result.message! })
    }
    setIsLoading(false)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Pengaturan" 
        description="Kelola preferensi akun dan data pribadi profilmu."
      />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profil Mahasiswa</CardTitle>
            <CardDescription>Perbarui data akademik untuk mendapatkan personalisasi yang lebih baik.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={onSubmit} className="space-y-4 max-w-xl">
              {status?.type === 'error' && (
                <div className="p-3 text-sm rounded-md bg-red-50 text-red-600 border border-red-200">
                  {status.msg}
                </div>
              )}
              {status?.type === 'success' && (
                <div className="p-3 text-sm rounded-md bg-green-50 text-green-700 border border-green-200">
                  {status.msg}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-sage-900 mb-1">Nama Lengkap / Panggilan</label>
                  <Input name="full_name" type="text" placeholder="Budi Santoso" disabled={isLoading} />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-sage-900 mb-1">Universitas</label>
                  <Input name="university" type="text" placeholder="Universitas Indonesia" disabled={isLoading} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-900 mb-1">Fakultas</label>
                  <Input name="faculty" type="text" placeholder="Fasilkom" disabled={isLoading} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-900 mb-1">Jurusan / Program Studi</label>
                  <Input name="major" type="text" placeholder="Sistem Informasi" disabled={isLoading} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-900 mb-1">Semester Aktif</label>
                  <Input name="semester" type="number" min="1" max="14" placeholder="5" disabled={isLoading} />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Simpan Perubahan Profil
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
