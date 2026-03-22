import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  HeartHandshake, 
  BrainCircuit, 
  ShieldCheck, 
  BarChart3,
  ArrowRight,
  Sparkles,
  MessageSquareHeart,
  UserPlus,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Phone,
  Mail
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-sage-50/20 flex flex-col font-sans overflow-x-hidden">
      
      {/* Top Navbar */}
      <header className="px-4 sm:px-8 xl:px-12 h-20 flex items-center justify-between bg-white border-b border-sage-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-sage-600 flex items-center justify-center shadow-sm">
            <HeartHandshake className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-sage-900">RuangSela<span className="text-softBlue-500">.</span></span>
        </div>
        <nav className="hidden lg:flex gap-10 text-[15px] font-bold text-sage-700">
          <a href="#beranda" className="hover:text-softBlue-500 transition-colors border-b-2 border-transparent hover:border-softBlue-500 pb-1">Beranda</a>
          <a href="#fitur" className="hover:text-softBlue-500 transition-colors border-b-2 border-transparent hover:border-softBlue-500 pb-1">Fitur Utama</a>
          <a href="#carakerja" className="hover:text-softBlue-500 transition-colors border-b-2 border-transparent hover:border-softBlue-500 pb-1">Cara Kerja</a>
          <a href="#faq" className="hover:text-softBlue-500 transition-colors border-b-2 border-transparent hover:border-softBlue-500 pb-1">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" className="text-sage-800 font-bold hover:text-sage-950 hover:bg-sage-100 px-6">Masuk</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-softBlue-500 hover:bg-softBlue-600 text-white shadow-md font-bold text-[15px] px-6 h-11 rounded-full border-2 border-transparent hover:border-softBlue-700/50 transition-all">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        
        {/* 1. Hero Section (Responsive & Professional) */}
        <section id="beranda" className="relative w-full min-h-[600px] lg:h-[750px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/landing-bg.png" 
              alt="Background RuangSela" 
              fill 
              className="object-cover object-center"
              priority
            />
            {/* Gradient overlay to ensure text readability on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-sage-950/90 via-sage-900/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 pt-10">
            <div className="max-w-3xl animate-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-softBlue-400" />
                Pendamping Kesejahteraan Mahasiswa
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md">
                Ubah Beban Stres <br className="hidden sm:block"/>
                <span className="text-softBlue-400">Jadi Titik Balikmu.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-sage-100 font-medium leading-relaxed max-w-2xl mb-10 drop-shadow">
                RuangSela membantu mahasiswa mengelola beban akademik tersembunyi secara profesional. Jangan simpan stresmu sendirian, kelola bersama ekosistem dan asisten peduli kami.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-softBlue-500 hover:bg-softBlue-600 text-white shadow-xl shadow-softBlue-900/20 text-lg h-14 px-8 rounded-full font-bold transition-transform hover:-translate-y-1">
                    Gabung RuangSela <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/login?demo=true">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-xl text-lg h-14 px-8 rounded-full font-bold transition-all border-2">
                    Coba Demo Juri
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Headline & Grid 4 Cards Section */}
        <section id="fitur" className="pt-20 pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in duration-700 delay-300">
            <h2 className="text-3xl md:text-5xl font-extrabold text-sage-950 tracking-tight mb-4">
              Jadilah Bagian dari Sela yang Aman
            </h2>
            <p className="text-lg text-sage-600 font-medium max-w-2xl mx-auto">
              RuangSela adalah ekosistem terpadu yang memberikan alat preventif dan reaktif untuk merawat kesehatan mental mahasiswa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
            {/* Card 1 */}
            <div className="bg-white border-2 border-sage-100 rounded-[2rem] p-8 hover:border-softBlue-300/50 hover:shadow-2xl hover:shadow-softBlue-100 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-softBlue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-softBlue-500" />
              </div>
              <h3 className="text-xl font-extrabold text-sage-900 mb-3">Radar Stres Akademik</h3>
              <p className="text-sage-600 text-[15px] font-medium leading-relaxed">
                Kelola beban SKS dan tugasmu biar nggak gampang burnout. Pantau kondisi mentalmu lewat skor mingguan biar tahu kapan harus istirahat sejenak.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white border-2 border-sage-100 rounded-[2rem] p-8 hover:border-softBlue-300/50 hover:shadow-2xl hover:shadow-softBlue-100 transition-all duration-300 group flex flex-col items-center text-center mt-0 lg:mt-8">
              <div className="w-16 h-16 rounded-2xl bg-softBlue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquareHeart className="w-8 h-8 text-softBlue-500" />
              </div>
              <h3 className="text-xl font-extrabold text-sage-900 mb-3">Jurnal AI Pribadi</h3>
              <p className="text-sage-600 text-[15px] font-medium leading-relaxed">
                Tumpahkan perasaanmu di sini. AI kita siap jadi pendengar setia tanpa nge-judge, bantu kamu lebih tenang dan temukan solusi nyata dari kegundahanmu.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-sage-100 rounded-[2rem] p-8 hover:border-emerald-300/50 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UserPlus className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-extrabold text-sage-900 mb-3">Trusted Buddy</h3>
              <p className="text-sage-600 text-[15px] font-medium leading-relaxed">
                Kadang kita butuh bantuan tapi segan untuk cerita. Biar sistem kami yang mengabari teman terpercayamu saat beban stresmu butuh perhatian lebih.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border-2 border-sage-100 rounded-[2rem] p-8 hover:border-rose-300/50 hover:shadow-2xl hover:shadow-rose-100 transition-all duration-300 group flex flex-col items-center text-center mt-0 lg:mt-8">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-extrabold text-sage-900 mb-3">Direktori Bantuan</h3>
              <p className="text-sage-600 text-[15px] font-medium leading-relaxed">
                Nggak perlu merasa sendirian di keramaian kampus. Akses cepat rujukan konselor atau layanan krisis saat segalanya terasa di luar kendali.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Cara Kerja (How it Works) */}
        <section id="carakerja" className="py-24 bg-white border-y border-sage-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-sage-950 tracking-tight mb-4">Cara Kerja RuangSela</h2>
              <p className="text-lg text-sage-600 font-medium">Langkah mudah untuk mulai mengelola keseimbangan akademismu.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-sage-200 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Cek Kondisi Awal",
                  desc: "Mulai dengan menjawab pertanyaan asesmen singkat dari AI untuk membangun baseline beban stresmu."
                },
                {
                  step: "02",
                  title: "Evaluasi Berkala",
                  desc: "Gunakan jurnal harian dan lihat perubahan grafik radarmu di dashboard secara real-time."
                },
                {
                  step: "03",
                  title: "Dapatkan Bantuan",
                  desc: "Panggil Buddy mu atau temukan panduan intervensi melalui rujukan kampus saat dibutuhkan."
                }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 bg-white border-2 border-softBlue-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-softBlue-300 transition-all duration-300">
                   <div className="absolute -top-6 -right-2 text-[80px] font-black text-softBlue-500/10 leading-none select-none">
                     {item.step}
                   </div>
                   <h3 className="text-xl font-extrabold text-softBlue-600 mb-4">{item.title}</h3>
                   <p className="text-sage-600 font-medium leading-relaxed">
                     {item.desc}
                   </p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-16 bg-sage-50/50 border border-sage-200 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-extrabold text-sage-900 mb-3">Keamanan & Layanan Terpercaya</h3>
                <p className="text-sm text-sage-600 font-medium leading-relaxed">
                  Data obrolan dan hasil analisismu adalah milikmu. Kami tidak menjual data kesehatan mental kepada pihak ketiga, dan semua profil disamarkan untuk anonimitas maksimal.
                </p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex gap-3 items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-bold text-sage-900">Privasi Anonim & Enkripsi AES-256</span>
                </div>
                <div className="flex gap-3 items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-bold text-sage-900">Kurasi Bantuan Profesional</span>
                </div>
                <div className="flex gap-3 items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-bold text-sage-900">Rekomendasi Berbasis Evidence</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Dampak/Statistik Banner (Prestige Blue Background) */}
        <section className="py-20 bg-softBlue-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-softBlue-600/20 pattern-grid-lg"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Dampak Nyata & Dukungan Riil</h2>
              <p className="text-softBlue-100 font-medium mt-3">Karena setiap mahasiswa berharga.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-softBlue-400">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">1,245</div>
                <div className="text-sm font-bold uppercase tracking-widest text-softBlue-100">User Terbantu</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <MessageSquareHeart className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">15.2K</div>
                <div className="text-sm font-bold uppercase tracking-widest text-softBlue-100">Sesi Refleksi</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <HeartHandshake className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">840</div>
                <div className="text-sm font-bold uppercase tracking-widest text-softBlue-100">Koneksi Buddy</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">32</div>
                <div className="text-sm font-bold uppercase tracking-widest text-softBlue-100">Kasus Darurat</div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ Section */}
        <section id="faq" className="py-24 bg-sage-50/50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-1/3">
                <h2 className="text-3xl font-extrabold text-sage-950 mb-4">Pertanyaan Umum</h2>
                <p className="text-sage-600 font-medium mb-6">Semua hal yang perlu kamu ketahui tentang privasi dan cara menggunakan RuangSela.</p>
                <div className="p-6 bg-white border border-softBlue-200 rounded-2xl flex flex-col items-start gap-4 shadow-sm">
                  <span className="font-bold text-sage-900 text-sm">Punya pertanyaan lain?</span>
                  <Button variant="outline" className="border-softBlue-500 text-softBlue-600 hover:bg-softBlue-50 rounded-full font-bold">
                    Hubungi Bantuan
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 space-y-4">
                {[
                  { q: "Apakah hasil jurnal saya dibaca oleh orang lain?", a: "Tidak. Jurnal ditangani murni oleh algoritma enkripsi secara otomatis. Tak ada pihak internal kami yang membaca secara manual." },
                  { q: "Bagaimana cara kerja fitur Trusted Buddy?", a: "Jika skor stresmu melebihi batas bahaya selama 2 minggu berturut-turut, sistem akan mengirim email pengingat otomatis ke email sobat yang sudah kamu daftarkan (jika diaktifkan)." },
                  { q: "Apakah AI ini bisa memberikan resep obat penenang?", a: "Sangat tidak. AI ini difungsikan sebagai teman diskusi ringan dan pemetaan awal. Untuk indikasi klinis, konsultasi manusia adalah kewajiban." },
                  { q: "Apakah aplikasi ini berbayar untuk fitur dasar?", a: "Aplikasi ini (MVP stage) disediakan 100% gratis untuk mahasiswa yang memakai email `.ac.id`." }
                ].map((faq, i) => (
                  <div key={i} className="bg-white border border-sage-200 rounded-2xl p-6 group hover:border-softBlue-400 transition-colors shadow-sm cursor-pointer">
                    <div className="flex justify-between items-center gap-4">
                      <h4 className="font-extrabold text-sage-900">{faq.q}</h4>
                      <ChevronDown className="w-5 h-5 text-sage-400 group-hover:text-softBlue-500 transition-colors" />
                    </div>
                    <p className="mt-3 text-sage-600 font-medium leading-relaxed hidden group-hover:block transition-all text-sm">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer (Matches MandorIn/ReBite style a bit more closely) */}
      <footer className="bg-sage-950 pt-16 pb-8 border-t border-sage-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-sage-800 flex items-center justify-center">
                  <HeartHandshake className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">RuangSela.</span>
              </div>
              <p className="text-sage-400 text-sm leading-relaxed max-w-xs font-medium">
                Sistem pendukung kesehatan mental dan manajemen beban akademik bagi mahasiswa Indonesia. Jangan berjalan sendiri di keramaian kampus.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Navigasi</h4>
              <ul className="space-y-4 text-sm font-medium text-sage-400">
                <li><a href="#beranda" className="hover:text-softBlue-400 transition-colors">Beranda</a></li>
                <li><a href="#fitur" className="hover:text-softBlue-400 transition-colors">Fitur Utama</a></li>
                <li><a href="#carakerja" className="hover:text-softBlue-400 transition-colors">Cara Kerja</a></li>
                <li><a href="#faq" className="hover:text-softBlue-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Hubungi Kami</h4>
              <ul className="space-y-4 text-sm font-medium text-sage-400">
                <li className="flex gap-3 items-center"><MapPin className="w-4 h-4 text-softBlue-500" /> Kampus Pusat IT, Jakarta, Indonesia</li>
                <li className="flex gap-3 items-center"><Phone className="w-4 h-4 text-softBlue-500" /> Bantuan Darurat: 119</li>
                <li className="flex gap-3 items-center"><Mail className="w-4 h-4 text-softBlue-500" /> pelukan@ruangsela.id</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center md:flex md:justify-between items-center text-xs text-sage-500 font-medium border-t border-sage-800 pt-8">
            <p>© {new Date().getFullYear()} RuangSela MVP Version. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 justify-center">
              <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
