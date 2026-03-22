import { 
  Activity, BarChart3, CalendarClock, ArrowRight,
  ShieldCheck, AlertCircle, PenLine, HeartHandshake, UserPlus, 
  ChevronRight, Sparkles, Quote, Flame, Zap
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { analyzeStress, type StressResponses } from "@/lib/stress-logic"

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let assessmentResult = null;
  let hasData = false;
  let history: any[] = [];
  let latestJournal = null;

  if (user) {
    const { data: assessments } = await supabase
      .from("stress_assessments")
      .select("*")
      .eq("user_id", user.id)
      .order("assessed_at", { ascending: false })
      .limit(3)

    if (assessments && assessments.length > 0) {
      hasData = true;
      history = assessments;
      const latest = assessments[0];
      const responses = latest.responses as StressResponses;
      assessmentResult = analyzeStress(responses)
    }

    const { data: journals } = await supabase
      .from("journal_entries")
      .select("id, created_at, mood, content, ai_summary")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
    
    if (journals && journals.length > 0) {
      latestJournal = journals[0]
    }
  }

  const hour = new Date().getHours()
  let greeting = 'Selamat Pagi'
  if (hour >= 12 && hour < 15) greeting = 'Selamat Siang'
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore'
  else if (hour >= 18) greeting = 'Selamat Malam'

  return (
    <div className="w-full flex flex-col pb-16 animate-in fade-in duration-500">
      
      {/* 1. Hero Section (Full Bleed, Responsive) */}
      <section className="relative w-full min-h-[600px] md:h-[640px] flex items-center overflow-hidden border-b border-sage-200/50 bg-sage-950 py-16 md:py-0">
        <div className="absolute inset-0 z-0 text-white">
          <Image 
            src="/landing-bg.png" 
            alt="Dashboard RuangSela Background" 
            fill 
            className="object-cover object-center opacity-60 md:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-sage-950/95 via-sage-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          
          {/* Hero Content */}
          <div className="max-w-xl animate-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 mx-auto md:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-softBlue-400" />
              RuangSela Workspace
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.2] mb-6 drop-shadow-md">
              {greeting},<br/>
              <span className="text-softBlue-400">
                Waktunya Beri Jeda.
              </span>
            </h1>
            
            <p className="text-[15px] md:text-[18px] text-sage-100 font-medium leading-relaxed max-w-lg mb-10 drop-shadow mx-auto md:mx-0">
              Kesehatan mentalmu adalah landasan dari segala pencapaian akademis. Hubungkan kembali emosimu, pantau kondisi stres, dan temukan ketenangan.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="/onboarding" className="w-full sm:w-auto flex items-center justify-center h-14 px-8 rounded-full bg-softBlue-500 text-white font-bold hover:bg-softBlue-600 transition-transform shadow-xl shadow-softBlue-900/20 hover:-translate-y-1">
                <Activity className="w-5 h-5 mr-2" />
                Cek Stres Sekarang
              </Link>
              <Link href="/journal" className="w-full sm:w-auto flex items-center justify-center h-14 px-8 rounded-full border-2 border-white/30 text-white bg-white/10 font-bold hover:bg-white/20 backdrop-blur-sm transition-all shadow-xl">
                <PenLine className="w-5 h-5 mr-2" />
                Dengarkan AI Jurnal
              </Link>
            </div>
          </div>

          {/* Current Status Badge/Card in Hero */}
          {hasData && assessmentResult ? (
             <div className="w-full md:w-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
               <div className="relative z-10 text-left">
                 <div className="flex items-center gap-2 mb-4">
                   <Activity className="w-4 h-4 text-softBlue-400" />
                   <span className="text-[11px] font-bold text-sage-100 uppercase tracking-widest">Status Terkini</span>
                 </div>
                 <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                   {assessmentResult.status}
                 </h2>
                 <p className="text-[14px] text-sage-100 font-medium mb-4">
                   Risiko Burnout: <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded ml-1">{assessmentResult.burnoutRisk}</span>
                 </p>
                 {assessmentResult.priorityWarning && (
                   <div className="bg-rose-500/20 border border-rose-500/30 rounded-xl p-3 flex items-start gap-2 text-rose-100 mt-2">
                     <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                     <p className="text-[12px] font-medium leading-[1.5]">{assessmentResult.priorityWarning}</p>
                   </div>
                 )}
               </div>
             </div>
          ) : (
            <div className="w-full md:w-[340px] bg-white/5 border border-white/10 border-dashed rounded-[28px] p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm mx-auto md:mx-0">
              <BarChart3 className="w-10 h-10 text-white/30 mb-4" />
              <p className="text-[14px] text-white/60 font-medium leading-relaxed">Peta emosional belum tersedia. Mulai dengan asesmen stres hari ini.</p>
            </div>
          )}

        </div>
      </section>

      {/* 2. Daily Quote Banner (Responsive) */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 xl:px-12 pt-12">
        <div className="relative bg-gradient-to-br from-sage-50 via-white to-sage-50/50 rounded-3xl p-6 sm:p-10 border border-sage-200/60 shadow-sm overflow-hidden flex flex-col md:flex-row items-center gap-6 sm:gap-10 justify-between group cursor-default">
           <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-softBlue-100/50 rounded-full blur-3xl group-hover:bg-softBlue-200/50 transition-colors duration-700 pointer-events-none"></div>
           
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-4">
               <span className="w-8 h-[2px] bg-softBlue-400 rounded-full"></span>
               <span className="text-[11px] font-bold text-sage-600 uppercase tracking-[0.2em]">Kutipan Hari Ini</span>
             </div>
             <p className="text-lg sm:text-2xl font-serif text-slate-800 leading-relaxed max-w-3xl italic">
               "Tidak apa-apa untuk menjeda langkahmu sejenak. Kamu tidak sedang tertinggal, kamu sedang mensinkronkan ulang dirimu."
             </p>
           </div>
           
           <div className="flex-shrink-0 relative z-10 hidden md:block">
             <div className="w-14 h-14 rounded-full bg-white border border-sage-200 shadow-sm flex items-center justify-center text-softBlue-500">
               <Quote className="w-5 h-5 fill-current" />
             </div>
           </div>
        </div>
      </div>

      {/* 3. Feature Explanation Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 xl:px-12 pt-16 pb-12">
        <div className="text-center mb-12">
           <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">Jelajahi RuangSela</h2>
           <p className="text-[15px] font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">Tiga pilar utama yang dirancang untuk membantu kamu menjaga keseimbangan mental di tengah padatnya dunia perkuliahan.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Asesmen */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-sm hover:border-softBlue-300 hover:shadow-xl transition-all duration-300 group flex flex-col h-full text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-softBlue-50 flex items-center justify-center text-softBlue-500 mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-[18px] font-bold text-slate-900 mb-3 tracking-tight">Cek Peta Emosional</h3>
            <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
              Pantau kondisi mentalmu lewat skor mingguan biar tahu kapan harus istirahat sejenak. Jangan biarkan tugas menumpuk jadi beban.
            </p>
            <Link href="/onboarding" className="inline-flex items-center text-[14px] font-bold text-softBlue-600 hover:text-softBlue-700 transition-colors uppercase tracking-widest text-[11px]">
              Mulai Asesmen <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Card 2: Jurnal */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-sm hover:border-softBlue-300 hover:shadow-xl transition-all duration-300 group flex flex-col h-full text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-softBlue-50 flex items-center justify-center text-softBlue-600 mb-6 group-hover:scale-110 transition-transform">
              <PenLine className="w-8 h-8" />
            </div>
            <h3 className="text-[18px] font-bold text-slate-900 mb-3 tracking-tight">Jurnal AI Pribadi</h3>
            <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
              Tumpahkan perasaanmu di sini. AI kita siap jadi pendengar setia tanpa nge-judge, bantu kamu lebih tenang dan temukan solusi nyata dari kegundahanmu.
            </p>
            <Link href="/journal" className="inline-flex items-center text-[14px] font-bold text-softBlue-600 hover:text-softBlue-700 transition-colors uppercase tracking-widest text-[11px]">
              Tulis Sekarang <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Card 3: Support */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-sm hover:border-rose-300 hover:shadow-xl transition-all duration-300 group flex flex-col h-full text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-[18px] font-bold text-slate-900 mb-3 tracking-tight">Proteksi Darurat</h3>
            <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
              Nggak perlu merasa sendirian di keramaian kampus. Simpan kontak sobat atau akses cepat rujukan konselor saat segalanya terasa di luar kendali.
            </p>
            <Link href="/help" className="inline-flex items-center text-[14px] font-bold text-rose-600 hover:text-rose-700 transition-colors uppercase tracking-widest text-[11px]">
              Lihat Direktori <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

        </div>
      </div>

      {/* 4. Gamification & Tips Split Section (Responsive) */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 xl:px-12 pt-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Mini Stats (Gamification) - 7 cols */}
          <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-8 border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">Rangkuman Aktivitas</h3>
               <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Bulan Ini</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col">
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-8 h-8 rounded-full bg-softBlue-100/30 flex items-center justify-center text-softBlue-500">
                     <Flame className="w-4 h-4 fill-current" />
                   </div>
                   <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Streak Jurnal</span>
                 </div>
                 <div className="text-3xl font-black text-slate-900 mb-1">3 <span className="text-sm font-bold text-slate-400">Hari</span></div>
                 <p className="text-[11px] font-bold text-emerald-600 mt-auto">+1 hari ini</p>
               </div>
               
               <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col">
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-8 h-8 rounded-full bg-softBlue-100/30 flex items-center justify-center text-softBlue-500">
                     <CalendarClock className="w-4 h-4" />
                   </div>
                   <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Total Sesi</span>
                 </div>
                 <div className="text-3xl font-black text-slate-900 mb-1">12 <span className="text-sm font-bold text-slate-400">Sesi</span></div>
                 <p className="text-[11px] font-bold text-slate-400 mt-auto">Konsisten</p>
               </div>
               
               <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col">
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-100/30 flex items-center justify-center text-emerald-500">
                     <Activity className="w-4 h-4" />
                   </div>
                   <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Skor Stres</span>
                 </div>
                 <div className="text-3xl font-black text-slate-900 mb-1">42<span className="text-sm font-bold text-slate-400">/100</span></div>
                 <p className="text-[11px] font-bold text-emerald-600 mt-auto flex items-center gap-1 uppercase tracking-tight">
                   <Zap className="w-3 h-3 fill-current" />
                   Menurun 15%
                 </p>
               </div>
            </div>
          </div>

          {/* Daily Tips - 5 cols */}
          <div className="lg:col-span-5 bg-sage-900 rounded-[28px] p-8 lg:p-10 relative overflow-hidden group shadow-[0_8px_30px_rgba(15,23,42,0.1)]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-sage-800 rounded-full blur-[60px] opacity-40 -mr-20 -mt-20 group-hover:bg-softBlue-500/20 transition-colors duration-1000"></div>
             
             <div className="relative z-10 flex flex-col h-full">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-softBlue-400 backdrop-blur-sm border border-white/10">
                     <Sparkles className="w-5 h-5" />
                   </div>
                   <h3 className="text-[16px] font-bold text-white tracking-tight">Tips Hari Ini</h3>
                 </div>
               </div>
               
               <div className="mt-auto">
                 <h4 className="text-xl font-bold text-softBlue-400 mb-3 tracking-tight">Teknik Grounding 5-4-3-2-1</h4>
                 <p className="text-[14px] sm:text-[15px] font-medium leading-relaxed text-sage-100/90 mb-6">
                   Lakukan jeda sebentar. Sebutkan 5 benda yang bisa kamu lihat, 4 yang bisa disentuh, dan 3 yang bisa didengar untuk membawa fokusmu kembali ke saat ini.
                 </p>
                 <button className="text-[11px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2 hover:text-softBlue-400 transition-colors">
                   Tandai Bermanfaat <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
             </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}

