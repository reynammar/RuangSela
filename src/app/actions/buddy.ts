'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addBuddy(formData: FormData) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) return { success: false, error: "Unauthorized" }

  // Check if limit reached (max 2 buddies)
  const { count } = await supabase
    .from('trusted_buddies')
    .select('id', { count: 'exact' })
    .eq('user_id', user.id)
    .eq('is_active', true)

  if (count && count >= 2) {
    return { success: false, error: "Maksimal hanya 2 Trusted Buddy yang bisa ditambahkan." }
  }

  const buddy_name = formData.get('buddy_name') as string
  const relationship = formData.get('relationship') as string
  const phone_number = formData.get('phone_number') as string
  const notes = formData.get('notes') as string

  if (!buddy_name || !relationship || !phone_number) {
    return { success: false, error: "Mohon isi semua field wajib." }
  }

  const { error } = await supabase.from('trusted_buddies').insert({
    user_id: user.id,
    buddy_name,
    relationship,
    phone_number,
    notes
  })

  if (error) return { success: false, error: error.message }

  revalidatePath('/buddy')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteBuddy(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: "Unauthorized" }

  const { error } = await supabase
    .from('trusted_buddies')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/buddy')
  revalidatePath('/dashboard')
  return { success: true }
}
