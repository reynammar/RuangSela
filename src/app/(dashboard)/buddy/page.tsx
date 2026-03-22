import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { UserPlus, Send, MessageCircle, Info, Clock, Trash2, HeartHandshake, Phone, ArrowRight, ShieldCheck, Quote } from "lucide-react"
import { deleteBuddy } from "@/app/actions/buddy"
import BuddyForm from "@/components/features/buddy/buddy-form"

// Server API interaction for delete wrapper
async function removeBuddy(formData: FormData) {
  "use server"
  const id = formData.get("id") as string
  await deleteBuddy(id)
}

export default async function BuddyPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let buddies: any[] = []

  if (user) {
    const { data } = await supabase
      .from('trusted_buddies')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: true })
    
    if (data) buddies = data
  }

  const templates = [
    {
      title: "Butuh Ditemani",
      desc: "Mintalah teman untuk luangkan waktu sejenak.",
      text: "Hai, kamu lagi sibuk ngga? Aku lagi butuh ditemenin ngobrol sebentar nih, rasanya lagi agak suntuk."
    },
    {
      title: "Pikiran Sedang Penuh",
      desc: "Menyatakan kondisi overwhelmed tanpa paksaan.",
      text: "Hai, maaf ganggu. Aku lagi merasa sangat overwhelmed sama tugasku. Boleh tolong temani aku sebentar via chat?"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto w-full space-y-8 md:space-y-12 animate-in fade-in duration-700 px-6 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-20">
      
      {/* 1. Professional Header */}
      <header className="pb-8 border-b border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Security & Support
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Sistem Dukungan <span className="text-slate-400 font-medium italic">Sobat.</span>
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] text-slate-500 font-medium leading-relaxed">
            Tautkan kontak darurat dari lingkaran terdekatmu. Hubungi mereka dalam satu klik melalui pendampingan pesan yang telah terenskripsi.
          </p>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column (Contacts & Empty State) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.15em]">Circle Connections</h2>
            <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[11px] font-bold ${buddies.length >= 2 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
              {buddies.length} / 2 Active
            </div>
          </div>

          {!buddies || buddies.length === 0 ? (
            <div className="bg-white rounded-[32px] p-10 sm:p-16 border border-slate-100 flex flex-col items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group">
              <div className="absolute inset-0 pattern-grid-lg opacity-[0.03] pointer-events-none"></div>
              
              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 mb-8 border border-slate-100 relative z-10 transition-transform group-hover:scale-105 duration-500">
                <HeartHandshake className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3 relative z-10">Lingkaranmu Masih Kosong</h3>
              <p className="text-[15px] text-slate-500 max-w-sm mb-10 leading-relaxed font-medium relative z-10">
                Dukungan dari orang terdekat adalah obat terbaik. Tambahkan hingga dua sobat kepercayaanmu sekarang.
              </p>
              
              <div className="w-full text-left bg-slate-50/50 p-6 sm:p-8 rounded-[28px] border border-slate-100 relative z-10">
                 <h4 className="text-[12px] font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-widest opacity-60">
                   <UserPlus className="w-4 h-4" /> Tambah Kontak Baru
                 </h4>
                 <BuddyForm remaining={2} />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {buddies.map((buddy) => (
                <div key={buddy.id} className="group bg-white rounded-[32px] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all flex flex-col overflow-hidden">
                  
                  {/* Top: Identity */}
                  <div className="p-8 sm:p-10 flex items-start justify-between gap-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center flex-shrink-0 text-white font-bold text-2xl shadow-lg ring-4 ring-slate-50">
                        {buddy.buddy_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-none mb-3">
                          {buddy.buddy_name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                          <span className="inline-flex items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[11px] font-bold text-emerald-700 uppercase tracking-widest">
                            {buddy.relationship}
                          </span>
                          <span className="text-[14px] font-bold text-slate-400 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-100">
                            {buddy.phone_number}
                          </span>
                        </div>
                        {buddy.notes && (
                          <div className="text-[14px] text-slate-600 bg-slate-50/50 px-5 py-4 rounded-2xl border border-slate-100 leading-relaxed font-medium">
                            <Quote className="w-3 h-3 text-slate-300 mb-2 fill-current" />
                            {buddy.notes}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <form action={removeBuddy}>
                      <input type="hidden" name="id" value={buddy.id} />
                      <button 
                        type="submit" 
                        className="w-11 h-11 bg-white border border-slate-100 text-slate-300 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 rounded-full transition-all flex items-center justify-center flex-shrink-0 shadow-sm" 
                        title="Hapus Kontak"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </form>
                  </div>

                  {/* Bottom: Fast Templates */}
                  <div className="bg-slate-50/30 p-8 sm:p-10 border-t border-slate-50">
                    <div className="flex flex-col gap-4">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" /> Quick Assistance Templates
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {templates.map((tpl, i) => (
                           <a 
                            key={i}
                            href={`https://wa.me/${buddy.phone_number.replace(/\D/g, '')}?text=${encodeURIComponent(tpl.text)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col gap-2 p-5 rounded-2xl border border-white bg-white/80 shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group/btn"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[15px] font-bold text-slate-900 group-hover/btn:text-slate-600">{tpl.title}</span>
                              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover/btn:bg-slate-900 group-hover/btn:text-white transition-all">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                            <span className="text-[12px] font-medium text-slate-500 line-clamp-1">{tpl.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {buddies.length > 0 && buddies.length < 2 && (
                <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-dashed border-slate-200 shadow-sm">
                  <h3 className="text-[14px] font-bold text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-widest opacity-60">
                    <UserPlus className="w-5 h-5" /> Tambah Kontak Mentor/Teman Kedua
                  </h3>
                  <BuddyForm remaining={2 - buddies.length} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (Guidance & Consent) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-slate-900 rounded-[32px] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:bg-slate-700/50 transition-colors duration-1000"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 mb-6 backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Kedaulatan Data Penuh</h3>
              <p className="text-[15px] text-slate-400 leading-relaxed font-medium mb-6">
                RuangSela <strong className="text-white">tidak mengotomatisasi</strong> pengiriman hasil tes stres Anda. Kami percaya bahwa keputusan untuk berbagi emosi adalah hak mutlak Anda.
              </p>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
                 <p className="text-[13px] text-slate-400 font-bold uppercase tracking-widest">Our Promise</p>
                 <p className="text-[14px] text-slate-300 leading-relaxed italic font-medium">
                  "Kami hanya menyediakan akses tercepat saat kamu merasa tidak sanggup lagi berpikir jernih."
                 </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-100 p-8 sm:p-10 shadow-sm">
            <h3 className="text-[13px] font-bold text-slate-400 mb-8 flex items-center gap-3 uppercase tracking-widest">
              Guidelines
            </h3>
            
            <ul className="space-y-8">
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-slate-900 shadow-sm">01</div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 leading-tight">Pilih Pendengar Aktif</h4>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed mt-2 opacity-80">Utamakan sosok yang tidak defensif dan mampu berempati tanpa langsung menghakimi atau memberi solusi kilat.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-slate-900 shadow-sm">02</div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 leading-tight">Bangun Kesepakatan</h4>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed mt-2 opacity-80">Beritahu mereka bahwa kamu memasukkan kontaknya sebagai "Sobat" di RuangSela agar mereka tidak terkejut saat menerima pesan.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-rose-600 shadow-sm">03</div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 leading-tight">Eskalasi Medis</h4>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed mt-2 opacity-80">Jika pikiran untuk menyakiti diri muncul, sobat saja tidak cukup. Segera hubungi <Link href="/help" className="text-rose-500 font-bold hover:underline">Direktori Bantuan Ahli</Link>.</p>
                </div>
              </li>
            </ul>

          </div>
        </div>
        
      </div>
    </div>
  )
}
