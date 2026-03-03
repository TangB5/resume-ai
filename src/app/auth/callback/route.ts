import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ─────────────────────────────────────────────────────────────
//  OAuth + Email Confirmation Callback
//  Supabase redirects here after:
//    • Google OAuth sign-in
//    • Email confirmation link clicked
//    • Password reset link clicked
//
//  Path: src/app/auth/callback/route.ts
// ─────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/en/dashboard'
  const error = searchParams.get('error')

  // Handle OAuth provider errors
  if (error) {
    const errorDesc =
      searchParams.get('error_description') ?? 'Authentication failed'
    return NextResponse.redirect(
      `${origin}/en/login?error=${encodeURIComponent(errorDesc)}`
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('[auth/callback]', exchangeError.message)
      return NextResponse.redirect(
        `${origin}/en/login?error=${encodeURIComponent('Authentication failed. Please try again.')}`
      )
    }

    // Redirect to dashboard (or custom `next` param)
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocal = process.env.NODE_ENV === 'development'

    if (isLocal) return NextResponse.redirect(`${origin}${next}`)
    else if (forwardedHost)
      return NextResponse.redirect(`https://${forwardedHost}${next}`)
    else return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/en/login`)
}
