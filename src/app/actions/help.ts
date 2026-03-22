'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitHelpRequest(formData: FormData) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Unauthorized" }
  }

  const issue_category = formData.get('issue_category') as string
  const description = formData.get('description') as string
  const urgency_level = formData.get('urgency_level') as string
  const preferred_support = formData.get('preferred_support') as string

  if (!issue_category || !description || !urgency_level || !preferred_support) {
    return { success: false, error: "Harap lengkapi semua kolom formulir." }
  }

  const { error } = await supabase.from('help_requests').insert({
    user_id: user.id,
    issue_category,
    description,
    urgency_level,
    preferred_support
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/help')
  return { success: true, message: "Permintaan bantuanmu telah diterima. Kami akan segera menghubungi atau memberikan rekomendasi selanjutnya. Tetap bertahan, kamu berhak mendapatkan dukungan yang baik." }
}
