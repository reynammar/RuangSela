"use client"

import { useState } from "react"
import { submitJournalEntry } from "@/app/actions/journal"
import { Mic, Send, Loader2, Sparkles, AlertCircle, Quote, Circle } from "lucide-react"

const moods = [
  { label: "Tenang", color: "bg-emerald-500", text: "text-emerald-700", ring: "ring-emerald-100", bg: "bg-emerald-50/50" },
  { label: "Senang", color: "bg-amber-400", text: "text-amber-700", ring: "ring-amber-100", bg: "bg-amber-50/50" },
  { label: "Netral", color: "bg-slate-400", text: "text-slate-700", ring: "ring-slate-100", bg: "bg-slate-50/50" },
  { label: "Cemas", color: "bg-rose-400", text: "text-rose-700", ring: "ring-rose-100", bg: "bg-rose-50/50" },
  { label: "Lelah", color: "bg-orange-400", text: "text-orange-700", ring: "ring-orange-100", bg: "bg-orange-50/50" },
  { label: "Sedih", color: "bg-indigo-400", text: "text-indigo-700", ring: "ring-indigo-100", bg: "bg-indigo-50/50" },
  { label: "Marah", color: "bg-red-500", text: "text-red-700", ring: "ring-red-100", bg: "bg-red-50/50" }
]

export default function JournalPage() {
  const [content, setContent] = useState("")
  const [selectedMood, setSelectedMood] = useState(moods[2]) // Default: Netral
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    if (content.length < 10) return
    setIsSubmitting(true)
    setError(null)
    formData.append('mood', selectedMood.label)
    
    const result = await submitJournalEntry(formData)
    if (result && result.error) {
      setError(result.error)
      setIsSubmitting(false)
    }
  }

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto w-full min-h-[90vh] flex flex-col pt-12 pb-32 sm:pb-40 px-6 sm:px-8 lg:px-12 animate-in fade-in duration-1000">
      
      {/* 1. Professional Header */}
      <div className="mb-12 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          Daily Journaling
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 text-center">
          Ruang Cerita <span className="text-slate-400 font-medium italic">Amanmu.</span>
        </h1>
        <p className="text-[15px] sm:text-16px text-slate-500 font-medium leading-relaxed max-w-lg text-center opacity-80">
          Tumpahkan beban pikiranmu secara privat. Enkripsi RuangSela memastikan setiap kata hanyalah milikmu sendiri.
        </p>
      </div>

      {/* 2. Professional Editor Framework */}
      <form action={handleSubmit} className="flex flex-col flex-1 relative h-full">
        
        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900 animate-in slide-in-from-top-4">
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <p className="text-[14px] font-medium">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-[0_12px_48px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col relative h-[65vh]">
          
          {/* Editor Status Bar */}
          <div className="h-12 bg-white border-b border-slate-50 flex items-center justify-between px-6 sm:px-8">
             <div className="flex items-center gap-1.5 opacity-40">
               <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
             </div>
             <span className="text-[12px] font-bold text-slate-400 tracking-tight uppercase tracking-widest">{currentDate}</span>
             <div className="w-8 flex justify-end">
               <Quote className="w-3.5 h-3.5 text-slate-200" />
             </div>
          </div>

          <div className="flex flex-col sm:flex-row h-full">
            
            {/* Professional Mood Sidebar */}
            <div className="w-full sm:w-[200px] border-b sm:border-b-0 sm:border-r border-slate-50 bg-slate-50/20 p-6 flex flex-col gap-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  Indikator Emosi
                </label>
                <div className="flex flex-row sm:flex-col flex-wrap sm:flex-nowrap gap-2 sm:gap-1.5">
                  {moods.map(m => {
                    const isSelected = selectedMood.label === m.label;
                    return (
                      <button
                        key={m.label}
                        type="button"
                        onClick={() => setSelectedMood(m)}
                        className={`inline-flex items-center justify-start px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 w-auto sm:w-full border-2 border-transparent
                          ${isSelected 
                            ? `${m.bg} ${m.text} scale-[1.03] border-slate-100 shadow-sm` 
                            : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                          }`}
                      >
                        <Circle className={`w-2 h-2 mr-3 fill-current ${isSelected ? m.color : 'text-slate-200'}`} />
                        {m.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Writing Surface */}
            <div className="flex-1 relative bg-white">
               <textarea
                 id="content"
                 name="content"
                 className="w-full h-full bg-transparent border-0 resize-none text-[17px] sm:text-[18px] text-slate-800 leading-[1.8] font-medium placeholder:text-slate-300 focus:ring-0 outline-none p-8 sm:p-12"
                 placeholder="Sebutkan perasaanmu hari ini..."
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
                 disabled={isSubmitting}
                 autoFocus
               />

               <div className="absolute bottom-8 right-8 pointer-events-none flex items-center gap-3">
                  <div className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm text-[11px] font-bold text-slate-400 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${content.length >= 10 ? 'bg-emerald-400' : 'bg-slate-300 transition-colors duration-500'}`}></span>
                    {content.length} Character
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* 3. Floating Bottom Bar (Minimalist Fitts's Law compliant) */}
        <div className="fixed bottom-10 left-0 right-0 z-50 px-6 sm:px-8 pointer-events-none flex justify-center">
          <div className="pointer-events-auto w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 p-2.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-between">
            
            <div className="hidden sm:flex items-center gap-4 pl-5">
               <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-slate-300" />
               </div>
               <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white tracking-widest uppercase">Vault Secure</span>
                  <span className="text-[10px] text-slate-400 font-medium">Data is end-to-end encrypted</span>
               </div>
            </div>

            <div className="flex flex-1 sm:flex-none items-center gap-2 pr-1">
               <button 
                type="button" 
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5 flex items-center justify-center flex-shrink-0" 
                title="Voice input"
               >
                 <Mic className="w-5 h-5" />
               </button>
               
               <button 
                 type="submit" 
                 disabled={isSubmitting || content.length < 10} 
                 className="flex-1 sm:w-auto h-11 px-8 rounded-full bg-softBlue-500 hover:bg-softBlue-600 text-white font-bold text-[13px] uppercase tracking-widest shadow-lg shadow-softBlue-500/20 transition-all active:scale-95 disabled:opacity-30 disabled:shadow-none"
               >
                 {isSubmitting ? (
                   <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                 ) : (
                   <span className="flex items-center justify-center gap-2">
                     Save Reflection <Send className="w-3.5 h-3.5" />
                   </span>
                 )}
               </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}
