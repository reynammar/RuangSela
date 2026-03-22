import { AlertTriangle, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CrisisBannerProps {
  triggerContext?: string
  className?: string
}

export function CrisisBanner({ triggerContext = "Sistem mendeteksi adanya indikasi beban emosional yang intens.", className = "" }: CrisisBannerProps) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start ${className}`}>
      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0 md:mt-1">
        <AlertTriangle className="h-5 w-5" />
      </div>
      
      <div className="flex-1">
        <h4 className="font-bold text-red-900 text-lg mb-1">Apakah kamu sedang dalam kondisi tidak aman?</h4>
        <p className="text-sm text-red-800 mb-4 leading-relaxed max-w-2xl">
          {triggerContext} Kami sangat peduli padamu. RuangSela tidak memiliki tenaga medis standby, tetapi ada pihak kompeten yang bersedia menemanimu 24 jam. Jangan hadapi ini sendirian.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <a href="tel:119">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-sm border-transparent h-10">
              <Phone className="w-4 h-4 mr-2" />
              Panggil Hotline 119
            </Button>
          </a>
          <Link href="/help">
            <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100 h-10 bg-white">
              Cari Dukungan Profesional
            </Button>
          </Link>
          <Link href="/buddy">
            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-100 hover:text-red-800 h-10">
              <ExternalLink className="w-4 h-4 mr-2" />
              Hubungi Sobatku
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
