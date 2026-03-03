'use client'

// ─────────────────────────────────────────────────────────────
//  COPY TO: src/app/[locale]/(auth)/login/page.tsx
// ─────────────────────────────────────────────────────────────

import { useActionState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signInAction, signInWithGoogleAction, type AuthResult } from '@/app/actions'
import { AuthInput, EmailIcon, LockIcon } from '@/components/auth/AuthInput'

const initialState: AuthResult = {}

export default function LoginPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const urlError     = searchParams.get('error')

  const [state, formAction, isPending] = useActionState(signInAction, initialState)

  useEffect(() => {
    if (state.success) router.push('/en/dashboard')
  }, [state.success, router])

  async function handleGoogle() {
    const result = await signInWithGoogleAction()
    if (result.url)   window.location.href = result.url
    if (result.error) console.error('[Google OAuth]', result.error)
  }

  return (
    <div className="animate-fade-slide-up">

      {/* ── Heading ── */}
      <div className="mb-8">
        <h2
          className="text-[28px] font-bold text-white tracking-tight mb-1.5"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Welcome back
        </h2>
        <p className="text-[14px] text-neutral-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/en/signup"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Sign up free
          </Link>
        </p>
      </div>

      {/* ── URL error (from OAuth redirect) ── */}
      {urlError && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[13px] text-red-400 flex items-start gap-2.5 animate-fade-in">
          <ErrorIcon />
          <span>{decodeURIComponent(urlError)}</span>
        </div>
      )}

      {/* ── Server action error ── */}
      {state.error && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[13px] text-red-400 flex items-start gap-2.5 animate-fade-in">
          <ErrorIcon />
          <span>{state.error}</span>
        </div>
      )}

      {/* ── Google OAuth ── */}
      <button type="button" onClick={handleGoogle} className="btn-oauth mb-6">
        <GoogleLogo />
        Continue with Google
      </button>

      {/* ── Divider ── */}
      <div className="divider mb-6">or</div>

      {/* ── Form ── */}
      <form action={formAction} className="space-y-4 stagger" noValidate>

        <AuthInput
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          icon={<EmailIcon />}
        />

        <div>
          <AuthInput
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            icon={<LockIcon />}
          />
          <div className="mt-1.5 text-right">
            <Link
              href="/en/forgot-password"
              className="text-[12px] text-neutral-500 hover:text-cyan-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="pt-1">
          <button
            type="submit"
            className="btn-primary"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner" aria-hidden="true" />
                Signing in...
              </span>
            ) : (
              'Sign In →'
            )}
          </button>
        </div>

      </form>
    </div>
  )
}

// ── Shared inline SVGs (keeps file self-contained) ────────────

function ErrorIcon() {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className="flex-shrink-0 mt-0.5" aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8"  x2="12"    y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}