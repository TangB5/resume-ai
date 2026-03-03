'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ─────────────────────────────────────────────────────────────
//  Path: src/app/[locale]/(auth)/actions.ts
// ─────────────────────────────────────────────────────────────

export interface AuthResult {
  error?: string
  success?: boolean
}

// ── Sign Up ───────────────────────────────────────────────────

export async function signUpAction(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createClient()

  const fullName = (formData.get('fullName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!fullName || fullName.length < 2)
    return { error: 'Please enter your full name (at least 2 characters).' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: 'Please enter a valid email address.' }
  if (!password || password.length < 8)
    return { error: 'Password must be at least 8 characters.' }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, avatar_url: null },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    if (
      error.message.includes('already registered') ||
      error.code === 'user_already_exists'
    )
      return {
        error:
          'An account with this email already exists. Try signing in instead.',
      }
    if (error.message.includes('password'))
      return {
        error:
          'Password is too weak. Use a mix of letters, numbers, and symbols.',
      }
    return { error: error.message }
  }

  return { success: true }
}

// ── Sign In ───────────────────────────────────────────────────

export async function signInAction(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Email and password are required.' }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (
      error.message.includes('Invalid login credentials') ||
      error.code === 'invalid_credentials'
    )
      return { error: 'Incorrect email or password. Please try again.' }
    if (error.message.includes('Email not confirmed'))
      return {
        error: 'Please check your email and confirm your account first.',
      }
    if (error.message.includes('Too many requests'))
      return {
        error: 'Too many attempts. Please wait a few minutes and try again.',
      }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/en/dashboard')
}

// ── Google OAuth ──────────────────────────────────────────────

export async function signInWithGoogleAction(): Promise<{
  url?: string
  error?: string
}> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  })

  if (error) return { error: error.message }
  return { url: data.url }
}

// ── Sign Out ──────────────────────────────────────────────────

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/en/login')
}

// ── Forgot Password ───────────────────────────────────────────

export async function forgotPasswordAction(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: 'Please enter a valid email address.' }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })

  // Always return success to prevent email enumeration attacks
  if (error) console.error('[forgotPassword]', error.message)
  return { success: true }
}
