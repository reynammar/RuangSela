"use client";

import { useState } from "react";
import Link from "next/link";
import { submitHelpRequest } from "@/app/actions/help";
import {
  UserPlus,
  MessageSquare,
  Stethoscope,
  Building2,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function HelpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "error" | "success";
    msg: string;
  } | null>(null);

  const supportOptions = [
    {
      title: "Sobat (Buddy System)",
      desc: "Langkah pertama berbagi pikiran tanpa penilaian klinis. Cocok jika kamu butuh kehadiran sahabat.",
      icon: UserPlus,
      color: "text-softBlue-600",
      bg: "bg-softBlue-50 group-hover:bg-softBlue-100",
      link: "/buddy",
      action: "Lihat Kontak",
    },
    {
      title: "Konselor Kampus",
      desc: "Layanan mahasiswa untuk mengelola masalah akademis, penumpukan tugas, dan transisi kehidupan kampus.",
      icon: Building2,
      color: "text-softBlue-600",
      bg: "bg-softBlue-50 group-hover:bg-softBlue-100",
      link: "#form",
      action: "Ajukan Sesi",
    },
    {
      title: "Psikolog Mitra",
      desc: "Bantuan profesional berlisensi untuk kecemasan mendalam, trauma, atau diagnosis yang mengganggu harianmu.",
      icon: Stethoscope,
      color: "text-sage-600",
      bg: "bg-sage-50 group-hover:bg-sage-100",
      link: "#form",
      action: "Minta Rujukan",
    },
    {
      title: "Layanan Eksternal",
      desc: "Hotline dukungan 24 jam gratis atau direktori psikiater di luar kampus untuk pendampingan spesifik.",
      icon: MessageSquare,
      color: "text-indigo-600",
      bg: "bg-indigo-50 group-hover:bg-indigo-100",
      link: "#",
      action: "Lihat Direktori",
    },
  ];

  async function handleFormSubmit(formData: FormData) {
    setIsSubmitting(true);
    setStatus(null);
    const result = await submitHelpRequest(formData);

    if (result && result.error) {
      setStatus({ type: "error", msg: result.error });
    } else if (result && result.success) {
      setStatus({ type: "success", msg: result.message! });
      const form = document.querySelector("#help-form") as HTMLFormElement;
      if (form) form.reset();
    }
    setIsSubmitting(false);
  }

  return (
    <div className="max-w-6xl mx-auto w-full space-y-10 md:space-y-16 animate-in fade-in duration-700 px-6 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-20">
      {/* 1. Professional Header */}
      <header className="pb-8 border-b border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Assistance Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Pusat Bantuan &{" "}
            <span className="text-slate-400 font-medium italic">Rujukan.</span>
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] text-slate-500 font-medium leading-relaxed">
            Meminta bantuan adalah bentuk keberanian tertinggi. RuangSela
            memandu Anda menemukan intervensi yang paling tepat, privat, dan
            profesional.
          </p>
        </div>
      </header>

      {/* 2. Emergency Banner (Modern High-Visibility) */}
      <div className="bg-rose-600 rounded-[32px] p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl shadow-rose-900/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center text-white flex-shrink-0 backdrop-blur-md border border-white/10">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Status Darurat & Krisis
            </h3>
            <p className="text-[14px] sm:text-[15px] text-rose-100 mt-2 max-w-xl leading-relaxed font-medium">
              Jika Anda merasa dalam bahaya tak tertahankan, terpikir menyakiti
              diri, atau diserang panik akut, segera hubungi hotline darurat
              nasional (119).
            </p>
          </div>
        </div>
        <a
          href="tel:119"
          className="w-full lg:w-auto relative z-10 flex-shrink-0"
        >
          <button className="w-full lg:w-auto bg-white text-rose-600 px-10 py-4 rounded-full font-bold text-[14px] shadow-lg hover:bg-rose-50 transition-colors uppercase tracking-widest">
            Hubungi 119 Sekarang
          </button>
        </a>
      </div>

      {/* 3. Pathway Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.15em]">
            Layanan Tersedia
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportOptions.map((opt, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-slate-200 transition-all flex flex-col group"
            >
              <div className="flex flex-col gap-5 mb-6">
                <div
                  className={`h-14 w-14 rounded-2xl ${opt.bg} flex items-center justify-center ${opt.color} flex-shrink-0 transition-all group-hover:scale-110 shadow-sm border border-black/5`}
                >
                  <opt.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">
                    {opt.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 mt-2 leading-relaxed font-medium line-clamp-3">
                    {opt.desc}
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <Link
                  href={opt.link}
                  className="flex items-center justify-center w-full h-11 rounded-xl bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 text-[12px] font-bold transition-all border border-slate-100 uppercase tracking-widest shadow-sm"
                >
                  {opt.action}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Professional Counselor Profiles */}
      <div className="pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 mb-12 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Kenali Tim Ahli Kami
            </h2>
            <p className="text-[14px] text-slate-400 font-medium mt-1">
              Konselor bersertifikasi yang berdedikasi untuk RuangSela.
            </p>
          </div>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-[11px] font-bold border border-slate-100 uppercase tracking-widest">
            Kurasi Profesional
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Liana, M.Psi., Psikolog",
              role: "Psikolog Klinis Utama",
              exp: "8 Tahun Praktik",
              tags: ["Kecemasan Akademik", "Burnout Ekstrem"],
              image:
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200",
              indicator: "bg-emerald-500",
            },
            {
              name: "Budi Santoso, M.Pd., Kons.",
              role: "Konselor Kampus",
              exp: "5 Tahun Praktik",
              tags: ["Manajemen Waktu", "Stres Skripsi"],
              image:
                "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200",
              indicator: "bg-softBlue-500",
            },
            {
              name: "Sinta Karina, S.Psi.",
              role: "Konselor Relasi & Sosial",
              exp: "3 Tahun Praktik",
              tags: ["Dinamika Keluarga", "Social Crisis"],
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
              indicator: "bg-softBlue-500",
            },
          ].map((counselor, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-[32px] p-1 shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all group overflow-hidden"
            >
              <div className="p-8 pb-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={counselor.image}
                    alt={counselor.name}
                    className="w-24 h-24 rounded-[30px] object-cover border-4 border-slate-50 shadow-md transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 border-4 border-white rounded-full ${counselor.indicator} shadow-sm`}
                  ></div>
                </div>

                <h4 className="text-[17px] font-bold text-slate-900 leading-snug">
                  {counselor.name}
                </h4>
                <p className="text-[12px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                  {counselor.role}
                </p>

                <div className="flex items-center gap-2 mt-5 mb-6 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest">
                    {counselor.exp}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center w-full pt-4 border-t border-slate-50">
                  {counselor.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="inline-block bg-slate-50/50 border border-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-tight"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Secure Referral Form */}
      <section id="form" className="pt-10 scroll-mt-20">
        <div className="bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl relative">
          {/* Decorative Mesh Background */}
          <div className="absolute inset-0 pattern-grid-lg opacity-[0.05] pointer-events-none"></div>

          <div className="grid lg:grid-cols-12">
            {/* Form Info (4 cols) */}
            <div className="lg:col-span-4 p-8 sm:p-12 lg:bg-white/5 backdrop-blur-sm border-r border-white/5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight mb-4">
                  Akses Bantuan Pribadi
                </h2>
                <p className="text-[14px] sm:text-[15px] text-slate-400 font-medium leading-relaxed">
                  Setiap pengajuan diproses melalui sistem enkripsi penuh dan
                  hanya dapat diakses oleh tim ahli medis RuangSela.
                </p>
              </div>

              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-widest leading-none">
                    100% Rahasia
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-softBlue-500/20 text-softBlue-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-widest leading-none">
                    Respon Cepat
                  </span>
                </div>
              </div>
            </div>

            {/* Actual Form (8 cols) */}
            <div className="lg:col-span-8 p-8 sm:p-12 bg-white">
              <form
                id="help-form"
                action={handleFormSubmit}
                className="space-y-8"
              >
                {status?.type === "error" && (
                  <div className="p-5 rounded-[20px] bg-rose-50 border border-rose-100 flex items-start gap-4 text-rose-800 animate-in slide-in-from-top-4">
                    <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[14px] font-medium leading-relaxed">
                      {status.msg}
                    </p>
                  </div>
                )}
                {status?.type === "success" && (
                  <div className="p-5 rounded-[20px] bg-emerald-50 border border-emerald-100 flex items-start gap-4 text-emerald-800 animate-in slide-in-from-top-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[14px] font-medium leading-relaxed">
                      {status.msg}
                    </p>
                  </div>
                )}

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                      Kategori Masalah
                    </label>
                    <select
                      name="issue_category"
                      className="w-full flex h-14 rounded-2xl border border-slate-100 bg-slate-50 px-5 text-[14px] font-bold text-slate-900 focus-visible:outline-none focus:ring-4 focus:ring-slate-100 transition-all outline-none appearance-none cursor-pointer"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Pilih fokus masalah...</option>
                      <option value="Akademik & Perkuliahan">
                        Akademik: Tugas, Konsentrasi
                      </option>
                      <option value="Karier & Masa Depan">
                        Karier: Kecemasan Kerja
                      </option>
                      <option value="Keluarga & Relasi">
                        Sosial: Hubungan & Dinamika
                      </option>
                      <option value="Burnout Ekstrem">
                        Klinis: Kelelahan Mental
                      </option>
                      <option value="Lainnya">
                        Lainnya / Sulit Dijelaskan
                      </option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                      Preferensi Dukungan
                    </label>
                    <select
                      name="preferred_support"
                      className="w-full h-14 rounded-2xl border border-slate-100 bg-slate-50 px-5 text-[14px] font-bold text-slate-900 focus-visible:outline-none focus:ring-4 focus:ring-slate-100 transition-all outline-none appearance-none cursor-pointer"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Ingin dibantu oleh...</option>
                      <option value="Konselor Kampus">Konselor Kampus</option>
                      <option value="Psikolog Klinis">
                        Psikolog Klinis (Terapi)
                      </option>
                      <option value="Belum Tahu">
                        Bantu tentukan oleh tim ahli
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                    Level Urgensi
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        val: "Tinggi",
                        label: "Tinggi",
                        sub: "Priority Respons",
                      },
                      {
                        val: "Sedang",
                        label: "Sedang",
                        sub: "Regular Scheduled",
                      },
                      { val: "Rendah", label: "Ringan", sub: "General Advice" },
                    ].map((item) => (
                      <label
                        key={item.val}
                        className="flex flex-col p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 cursor-pointer transition-all has-[:checked]:border-slate-900 has-[:checked]:bg-white has-[:checked]:ring-1 has-[:checked]:ring-slate-900 group"
                      >
                        <input
                          type="radio"
                          name="urgency_level"
                          value={item.val}
                          className="sr-only"
                          required
                          disabled={isSubmitting}
                        />
                        <span className="text-[14px] font-bold text-slate-900">
                          {item.label}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 group-hover:text-slate-500">
                          {item.sub}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                    Detail Situasi
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    className="block w-full rounded-3xl border border-slate-100 bg-slate-50 p-6 text-[15px] font-medium text-slate-900 shadow-sm focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all resize-none outline-none placeholder:text-slate-300"
                    placeholder="Sebutkan perasaan atau gejala yang kamu alami..."
                    disabled={isSubmitting}
                  />
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-12 h-14 rounded-full font-bold text-[14px] shadow-xl shadow-slate-900/10 transition-all active:scale-95 disabled:opacity-30 uppercase tracking-widest"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Kirim Pengiriman <ExternalLink className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
