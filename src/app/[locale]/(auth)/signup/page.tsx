'use client'

// ─────────────────────────────────────────────────────────────
//  COPY TO: src/app/[locale]/(auth)/signup/page.tsx
// ─────────────────────────────────────────────────────────────

import { useActionState, useState } from 'react'
import Link from 'next/link'
import {
  signUpAction,
  signInWithGoogleAction,
  type AuthResult,
} from '@/app/actions'
import {
  AuthInput,
  EmailIcon,
  LockIcon,
  UserIcon,
} from '@/components/auth/AuthInput'

const initialState: AuthResult = {}

// ── Password strength helper ──────────────────────────────────

interface StrengthResult {
  score: number
  label: string
  color: string
}

function getPasswordStrength(password: string): StrengthResult {
  if (!password) return { score: 0, label: '', color: '' }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++

  const levels: StrengthResult[] = [
    { score: 1, label: 'Weak', color: '#fc8181' },
    { score: 2, label: 'Fair', color: '#f6ad55' },
    { score: 3, label: 'Good', color: '#68d391' },
    { score: 4, label: 'Strong', color: '#63b3ed' },
  ]

  return levels[Math.min(score, 4) - 1] ?? { score: 0, label: '', color: '' }
}

// ── Component ─────────────────────────────────────────────────

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState
  )
  const [password, setPassword] = useState('')
  const strength = getPasswordStrength(password)

  async function handleGoogle() {
    const result = await signInWithGoogleAction()
    if (result.url) window.location.href = result.url
    if (result.error) console.error('[Google OAuth]', result.error)
  }

  // ── Success state: email confirmation sent ────────────────
  if (state.success) {
    return (
      <div className="animate-fade-slide-up text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#63b3ed"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
          </svg>
        </div>

        <h2
          className="mb-3 text-[26px] font-bold text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Check your inbox
        </h2>

        <p className="mx-auto mb-6 max-w-xs text-[14px] leading-relaxed text-neutral-400">
          We&apos;ve sent a confirmation link to your email address. Click it to
          activate your account — it expires in 24 hours.
        </p>

        <p className="text-[13px] text-neutral-500">
          Already confirmed?{' '}
          <Link
            href="/en/login"
            className="font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Sign in →
          </Link>
        </p>
      </div>
    )
  }

  // ── Default signup form ───────────────────────────────────
  return (
    <div className="animate-fade-slide-up">
      {/* ── Heading ── */}
      <div className="mb-8">
        <h2
          className="mb-1.5 text-[28px] font-bold tracking-tight text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Create your account
        </h2>
        <p className="text-[14px] text-neutral-400">
          Already have an account?{' '}
          <Link
            href="/en/login"
            className="font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* ── Error banner ── */}
      {state.error && (
        <div className="animate-fade-in mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-[13px] text-red-400">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="mt-0.5 flex-shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{state.error}</span>
        </div>
      )}

      {/* ── Google OAuth ── */}
      <button type="button" onClick={handleGoogle} className="btn-oauth mb-6">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      {/* ── Divider ── */}
      <div className="divider mb-6">or</div>

      {/* ── Form ── */}
      <form action={formAction} className="stagger space-y-4" noValidate>
        <AuthInput
          name="fullName"
          label="Full name"
          type="text"
          placeholder="Alex Johnson"
          autoComplete="name"
          required
          icon={<UserIcon />}
        />

        <AuthInput
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          icon={<EmailIcon />}
        />

        {/* Password + strength meter */}
        <div>
          <AuthInput
            name="password"
            label="Password"
            type="password"
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            required
            icon={<LockIcon />}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Strength bar — only shows when typing */}
          {password.length > 0 && (
            <div
              className="mt-2.5"
              aria-live="polite"
              aria-label={`Password strength: ${strength.label}`}
            >
              <div className="mb-1.5 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{
                      background:
                        i < strength.score
                          ? strength.color
                          : 'rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
              </div>
              <p
                className="text-[11px] font-medium"
                style={{ color: strength.color }}
              >
                {strength.label}
                {strength.score < 3 && (
                  <span className="ml-1 font-normal text-neutral-600">
                    — add uppercase, numbers or symbols
                  </span>
                )}
              </p>
            </div>
          )}
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
                Creating account...
              </span>
            ) : (
              'Create Account →'
            )}
          </button>
        </div>

        <p className="pt-1 text-center text-[12px] text-neutral-500">
          By signing up you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-2 transition-colors hover:text-neutral-300"
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-2 transition-colors hover:text-neutral-300"
          >
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  )
}
