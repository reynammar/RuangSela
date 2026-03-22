"use client"

import { useState } from "react"
import { addBuddy } from "@/app/actions/buddy"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, UserPlus, Phone, AlignLeft } from "lucide-react"

export default function BuddyForm({ remaining }: { remaining: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        className="w-full border-dashed border-2 border-sage-300 text-sage-600 hover:text-sage-900 hover:border-sage-400 hover:bg-sage-50 h-14"
        onClick={() => setIsOpen(true)}
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Tambah Buddy Baru ({remaining} Slot Tersisa)
      </Button>
    )
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)
    const result = await addBuddy(formData)
    
    if (result && result.error) {
      setError(result.error)
      setIsSubmitting(false)
    } else {
      setIsOpen(false)
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-sage-300 shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-sage-900 mb-4">Mendaftarkan Sobat Baru</h3>
        
        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm rounded-md bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-sage-900 mb-1">Nama Panggilan Sobat</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <Input name="buddy_name" type="text" className="pl-10" placeholder="Misal: Kak Sarah" required disabled={isSubmitting} />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Hubungan</label>
              <select name="relationship" className="flex h-10 w-full rounded-md border border-sage-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500" required disabled={isSubmitting}>
                <option value="Sahabat">Sahabat</option>
                <option value="Kakak/Adik">Kakak / Adik</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Pasangan">Pasangan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Nomor WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <Input name="phone_number" type="tel" className="pl-10" placeholder="+62812xxxxxx" required disabled={isSubmitting} />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-sage-900 mb-1">Pesan Kecil (Opsional)</label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-sage-400" />
                <textarea 
                  name="notes" 
                  rows={2} 
                  className="pl-10 flex w-full rounded-md border border-sage-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 resize-none" 
                  placeholder="Hal yang membuat dia nyaman untuk diajak cerita..." 
                  disabled={isSubmitting} 
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-sage-100">
            <Button type="button" variant="ghost" className="text-sage-500" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-softBlue-600 hover:bg-softBlue-700">
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Simpan Kontak"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
