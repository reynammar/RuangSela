export type StressResponses = {
  semester: number
  sks: number
  deadlines: number
  exams: number
  orgLevel: 'low' | 'medium' | 'high'
  sleepHours: number
  exhaustion: number
  pressure: number
  overwhelm: number
}

export type StressResult = {
  score: number
  status: 'Aman' | 'Waspada' | 'Tinggi'
  overloadIndicator: string
  burnoutRisk: string
  energyAllocation: string
  priorityWarning: string | null
  explanation: string
  recommendations: string[]
}

export function analyzeStress(responses: StressResponses): StressResult {
  // Score mapping is same as onboarding, to maintain consistency
  let score = 0;
  
  if (responses.sks >= 21) score += 2;
  else if (responses.sks >= 18) score += 1;

  if (responses.deadlines >= 7) score += 3;
  else if (responses.deadlines >= 4) score += 2;
  else if (responses.deadlines >= 1) score += 1;

  if (responses.exams >= 3) score += 3;
  else if (responses.exams >= 1) score += 2;

  if (responses.orgLevel === 'high') score += 2;
  else if (responses.orgLevel === 'medium') score += 1;

  if (responses.sleepHours < 5) score += 3;
  else if (responses.sleepHours <= 6) score += 1;

  score += responses.exhaustion + responses.pressure + responses.overwhelm;

  let status: 'Aman' | 'Waspada' | 'Tinggi' = 'Aman';
  if (score >= 21) status = 'Tinggi';
  else if (score >= 13) status = 'Waspada';

  // Rule-based logic
  let overloadIndicator = "Terkendali"
  let burnoutRisk = "Rendah"
  let energyAllocation = "50% Akademik / 50% Istirahat"
  let priorityWarning = null
  let explanation = "Saat ini beban akademik dan emosionalmu berada dalam batas wajar. Tetap pertahankan rutinitas baikmu."
  let recommendations: string[] = [
    "Pertahankan jadwal tidur yang teratur.",
    "Lanjutkan mengisi jurnal mingguan untuk memantau kemajuanmu."
  ]

  if (status === 'Waspada') {
    overloadIndicator = responses.deadlines >= 4 || responses.exams > 0 ? "Tinggi" : "Sedang"
    burnoutRisk = responses.exhaustion >= 4 ? "Meningkat" : "Sedang"
    energyAllocation = "60% Fokus Akademik / 40% Pemulihan Aktif"
    explanation = "Bebanmu minggu ini cukup padat. Adanya peningkatan tugas atau ujian mulai memengaruhi energi fisik dan mentalmu."
    recommendations = [
      "Gunakan teknik Pomodoro untuk cicil tugas agar tidak menumpuk di satu malam.",
      "Pastikan ada jeda minimal 15 menit setiap 2 jam belajar.",
      "Kurangi aktivitas organisasi yang tidak mendesak minggu ini."
    ]
    if (responses.sleepHours < 6) priorityWarning = "Kurang tidur memicu kecemasan. Prioritaskan tidur minimal 6 jam malam ini."
  } else if (status === 'Tinggi') {
    overloadIndicator = "Sangat Tinggi"
    burnoutRisk = "Tinggi"
    energyAllocation = "30% Urgensi Akademik / 70% Istirahat & Dukungan"
    explanation = "Tingkat stresmu sangat tinggi. Kombinasi antara beban tugas yang menumpuk, kurang tidur, dan kelelahan emosional butuh intervensi segera."
    recommendations = [
      "Hanya kerjakan 1 tugas paling mendesak hari ini. Sisanya delegasikan atau minta perpanjangan jika memungkinkan.",
      "Lakukan teknik relaksasi pernapasan 4-7-8 sekarang juga.",
      "Bicarakan bebanmu dengan teman di fitur Sobat (Buddy) atau jadwalkan konseling kampus."
    ]
    priorityWarning = "WASPADA: Tingkat kelelahan ekstrem. Berhenti sejenak dan cari dukungan profesional jika merasa tidak sanggup."
  }

  // Custom overrides based on extreme inputs regardless of status
  if (responses.sleepHours < 4 && status !== 'Tinggi') {
    priorityWarning = "Sangat Kurang Tidur: Risiko kognitif menurun tajam. Kamu wajib tidur malam ini."
  }

  return {
    score,
    status,
    overloadIndicator,
    burnoutRisk,
    energyAllocation,
    priorityWarning,
    explanation,
    recommendations
  }
}
