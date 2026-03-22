'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const full_name = formData.get('full_name') as string

  // We pass metadata so the db trigger `handle_new_user` captures it.
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: full_name,
      }
    }
  })

  // To build robust MVP, if user already exists or weak password, return error
  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, message: "Pendaftaran berhasil! Silakan periksa email Anda jika konfirmasi diaktifkan." }
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  const full_name = formData.get('full_name') as string
  const university = formData.get('university') as string
  const faculty = formData.get('faculty') as string
  const major = formData.get('major') as string
  const semester = parseInt(formData.get('semester') as string, 10)

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Unauthorized" }
  }

  const { error } = await supabase.from('profiles').update({
    name: full_name,
    university,
    faculty,
    major,
    semester
  }).eq('id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/settings')
  return { success: true, message: "Profil berhasil diperbarui." }
}
