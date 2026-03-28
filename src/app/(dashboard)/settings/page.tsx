"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/app/actions/auth";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [status, setStatus] = useState<{
    type: "error" | "success";
    msg: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    setStatus(null);
    const result = await updateProfile(formData);
    if (result?.error) {
      setStatus({ type: "error", msg: result.error });
    } else if (result?.success) {
      setStatus({ type: "success", msg: result.message! });
    }
    setIsLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Pengaturan"
        description="Kelola preferensi akun dan data pribadi profilmu."
      />

      <div className="grid gap-6 mt-6">
        <Card className="border-sage-100 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-sage-900">
              Profil Mahasiswa
            </CardTitle>
            <CardDescription className="text-sage-600 font-medium">
              Perbarui data akademik untuk mendapatkan personalisasi yang lebih
              baik.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={onSubmit} className="space-y-6 max-w-2xl">
              {status?.type === "error" && (
                <div className="p-3 text-sm font-medium rounded-xl bg-red-50 text-red-600 border border-red-100">
                  {status.msg}
                </div>
              )}
              {status?.type === "success" && (
                <div className="p-3 text-sm font-medium rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {status.msg}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-sage-900 mb-1.5">
                    Nama Lengkap / Panggilan
                  </label>
                  <Input
                    name="full_name"
                    type="text"
                    className="h-12 border-sage-200 focus-visible:ring-softBlue-500"
                    placeholder="Budi Santoso"
                    disabled={isLoading}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-sage-900 mb-1.5">
                    Universitas
                  </label>
                  <Input
                    name="university"
                    type="text"
                    className="h-12 border-sage-200 focus-visible:ring-softBlue-500"
                    placeholder="Universitas Indonesia"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-1.5">
                    Fakultas
                  </label>
                  <Input
                    name="faculty"
                    type="text"
                    className="h-12 border-sage-200 focus-visible:ring-softBlue-500"
                    placeholder="Fasilkom"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-1.5">
                    Jurusan / Program Studi
                  </label>
                  <Input
                    name="major"
                    type="text"
                    className="h-12 border-sage-200 focus-visible:ring-softBlue-500"
                    placeholder="Sistem Informasi"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-1.5">
                    Semester Aktif
                  </label>
                  <Input
                    name="semester"
                    type="number"
                    min="1"
                    max="14"
                    className="h-12 border-sage-200 focus-visible:ring-softBlue-500"
                    placeholder="5"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="bg-softBlue-500 hover:bg-softBlue-600 text-white font-bold px-8 h-12 rounded-xl transition-all shadow-md shadow-softBlue-900/20"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  )}
                  Simpan Perubahan Profil
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
