import { AlertTriangle } from "lucide-react"

interface SafetyDisclaimerProps {
  className?: string
  variant?: "inline" | "footer"
}

export function SafetyDisclaimer({ className = "", variant = "footer" }: SafetyDisclaimerProps) {
  if (variant === "inline") {
    return (
      <div className={`text-xs text-sage-500 bg-sage-50/50 p-4 rounded-lg flex gap-3 border border-sage-100 items-start ${className}`}>
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-sage-400" />
        <p className="leading-relaxed">
          <strong>Peringatan Keamanan:</strong> Fitur peringkasan AI dan penilaian ini dirancang semata-mata sebagai alat untuk refleksi diri dini. 
          RuangSela bukan penyedia layanan kesehatan medis, tidak membuat diagnosis klinis, dan tidak bisa menggantikan terapi atau pengobatan psikologis profesional.
        </p>
      </div>
    )
  }

  return (
    <footer className={`mt-auto py-6 text-center text-[11px] text-sage-400 flex flex-col items-center justify-center gap-2 ${className}`}>
      <p className="max-w-xl px-4 flex items-center justify-center gap-1.5 flex-wrap">
        <AlertTriangle className="w-3 h-3 text-sage-300" />
        RuangSela adalah platform dukungan reflektif (peer-support & self-help). BUKAN pengganti bantuan klinis medis.
      </p>
      <div className="flex gap-4 mt-1 underline-offset-2">
        <a href="/help" className="hover:text-softBlue-500 transition-colors">Cari Bantuan Ahli</a>
        <a href="tel:119" className="hover:text-red-500 transition-colors">Darurat Jiwa Kemenkes (119 ext. 8)</a>
      </div>
    </footer>
  )
}
