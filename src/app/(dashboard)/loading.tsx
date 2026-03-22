import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="w-full flex-col p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-2/3 max-w-[250px] bg-sage-200/50 rounded-md animate-pulse" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder specific to widget styles */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="hidden md:flex rounded-xl border border-sage-100 bg-white p-6 flex-col space-y-4 shadow-sm animate-pulse">
            <div className="flex justify-between items-start">
              <div className="h-6 w-1/3 bg-sage-100 rounded-md" />
              <div className="h-10 w-10 bg-sage-50 rounded-full" />
            </div>
            <div className="h-12 w-3/4 bg-sage-50 rounded-md" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-sage-100 bg-white p-8 h-[300px] flex items-center justify-center shadow-sm">
        <div className="flex flex-col items-center gap-4 text-sage-400">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">Menyiapkan Ruang Amanmu...</p>
        </div>
      </div>
    </div>
  )
}
