import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AIInsightResult } from "@/app/actions/journal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, ShieldCheck, Footprints } from "lucide-react";

import { CrisisBanner } from "@/components/ui/crisis-banner";
import { SafetyDisclaimer } from "@/components/ui/safety-disclaimer";

export default async function JournalInsightPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return notFound();

  const { data: journal } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!journal) return notFound();

  const insights = journal.ai_insights as AIInsightResult;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm font-medium text-sage-600 hover:text-sage-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Beranda
      </Link>

      {insights.concerning_signs && (
        <CrisisBanner
          triggerContext="Sistem kami menangkap kata-kata yang mengisyaratkan keputusasaan mendalam dari entri tulisanmu hari ini."
          className="animate-in slide-in-from-top duration-500"
        />
      )}

      <div className="bg-gradient-to-br from-softBlue-50 to-sage-50 rounded-2xl p-8 border border-sage-200 relative overflow-hidden">
        <Sparkles className="absolute top-4 right-4 w-24 h-24 text-softBlue-200 opacity-50" />
        <h1 className="text-2xl font-bold text-sage-950 flex items-center gap-2 mb-2">
          Insight Refleksimu
        </h1>
        <p className="text-sage-700 max-w-xl">
          Terima kasih sudah berani memutar kembali perasaanmu. Berikut adalah
          perspektif tambahan atas tulisanmu hari ini.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Kolom Kiri: Ringkasan AI */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-sage-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-sage-50 bg-sage-50/50">
              <CardTitle className="text-base text-sage-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-softBlue-500" />
                Rangkuman Situasi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sage-800 leading-relaxed text-sm">
              &quot;{insights.summary}&quot;
            </CardContent>
          </Card>

          <Card className="border-sage-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-sage-50 bg-sage-50/50">
              <CardTitle className="text-base text-sage-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-softBlue-500" />
                Saran Pendekatan Diri
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {insights.coping_suggestions.map((sug, i) => (
                <div key={i} className="flex gap-3 text-sm text-sage-700">
                  <div className="bg-softBlue-100 text-softBlue-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="mt-0.5">{sug}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* User's Original Input */}
          <div className="mt-8 pt-8 border-t border-sage-200">
            <h4 className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-2">
              Jurnal Asli Kamu
            </h4>
            <div className="bg-white border border-sage-200 rounded-lg p-5 italic text-sage-600 text-sm">
              &quot;{journal.content}&quot;
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Tags & Langkah Selanjutnya */}
        <div className="space-y-6">
          <Card className="border-sage-200 shadow-sm">
            <CardContent className="pt-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-3">
                  Emosi Dominan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {insights.emotions.map((e) => (
                    <Badge
                      key={e}
                      variant="secondary"
                      className="bg-sage-100 text-sage-700 hover:bg-sage-200"
                    >
                      {e}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-3">
                  Pemicu Beban
                </h4>
                <div className="flex flex-wrap gap-2">
                  {insights.triggers.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="border-sage-300 text-sage-600"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sage-200 shadow-sm bg-softBlue-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-sage-900 flex items-center gap-2">
                <Footprints className="w-4 h-4 text-sage-600" />
                Langkah Kecil Terbaik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-sage-700 font-medium leading-relaxed">
                {insights.next_step}
              </p>
            </CardContent>
          </Card>

          <SafetyDisclaimer variant="inline" />
        </div>
      </div>
    </div>
  );
}
