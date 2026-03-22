'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function submitStressCheck(formData: FormData) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Unauthorized" }
  }

  // Parse form data
  const semester = parseInt(formData.get('semester') as string, 10) || 1
  const sks = parseInt(formData.get('sks') as string, 10) || 0
  const deadlines = parseInt(formData.get('deadlines') as string, 10) || 0
  const exams = parseInt(formData.get('exams') as string, 10) || 0
  const orgLevel = formData.get('orgLevel') as string // low, medium, high
  const sleepHours = parseInt(formData.get('sleepHours') as string, 10) || 0
  
  const exhaustion = parseInt(formData.get('exhaustion') as string, 10) || 1
  const pressure = parseInt(formData.get('pressure') as string, 10) || 1
  const overwhelm = parseInt(formData.get('overwhelm') as string, 10) || 1

  // Scoring Logic (Non-Clinical, Transparent MVP)
  let score = 0;
  
  // Objective load
  if (sks >= 21) score += 2;
  else if (sks >= 18) score += 1;

  if (deadlines >= 7) score += 3;
  else if (deadlines >= 4) score += 2;
  else if (deadlines >= 1) score += 1;

  if (exams >= 3) score += 3;
  else if (exams >= 1) score += 2;

  if (orgLevel === 'high') score += 2;
  else if (orgLevel === 'medium') score += 1;

  if (sleepHours < 5) score += 3;
  else if (sleepHours <= 6) score += 1;

  // Subjective self-rating (adds directly to score, max 15)
  score += exhaustion + pressure + overwhelm;

  // Classification
  let level = 'Aman';
  if (score >= 21) {
    level = 'Tinggi';
  } else if (score >= 13) {
    level = 'Waspada';
  }

  const responses = {
    semester, sks, deadlines, exams, orgLevel, sleepHours, exhaustion, pressure, overwhelm
  }

  // Save to DB
  const { error } = await supabase.from('stress_assessments').insert({
    user_id: user.id,
    score,
    level,
    responses
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
