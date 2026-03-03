'use client'

// ─────────────────────────────────────────────────────────────
//  COPY TO: src/app/[locale]/(auth)/forgot-password/page.tsx
// ─────────────────────────────────────────────────────────────

import { useActionState } from 'react'
import Link from 'next/link'
import { forgotPasswordAction, type AuthResult } from '@/app/actions'
import { AuthInput, EmailIcon } from '@/components/auth/AuthInput'

const initialState: AuthResult = {}

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction,
    initialState
  )

  // ── Success state ─────────────────────────────────────────
  if (state.success) {
    return (
      <div className="animate-fade-slide-up text-center">
        {/* Mail icon */}
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
          Check your email
        </h2>

        <p className="mx-auto mb-2 max-w-xs text-[14px] leading-relaxed text-neutral-400">
          If an account exists for that address, we&apos;ve sent a password
          reset link.
        </p>
        <p className="mx-auto mb-8 max-w-xs text-[13px] text-neutral-500">
          Don&apos;t see it? Check your spam or junk folder.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link
            href="/en/login"
            className="text-[13px] font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            ← Back to sign in
          </Link>
          {/* Re-send option — just reloads the page */}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-[12px] text-neutral-600 transition-colors hover:text-neutral-400"
          >
            Try a different email
          </button>
        </div>
      </div>
    )
  }

  // ── Default form ──────────────────────────────────────────
  return (
    <div className="animate-fade-slide-up">
      {/* ── Back link + heading ── */}
      <div className="mb-8">
        <Link
          href="/en/login"
          className="group mb-6 inline-flex items-center gap-1.5 text-[13px] text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to sign in
        </Link>

        <h2
          className="mb-1.5 text-[28px] font-bold tracking-tight text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Reset your password
        </h2>
        <p className="text-[14px] text-neutral-400">
          Enter your email and we&apos;ll send a reset link — no account
          required to request one.
        </p>
      </div>

      {/* ── Error ── */}
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

      {/* ── Form ── */}
      <form action={formAction} className="space-y-4" noValidate>
        <AuthInput
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          icon={<EmailIcon />}
          hint="We'll send a reset link to this address if an account exists."
        />

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
                Sending reset link...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </div>
      </form>

      {/* ── Footer note ── */}
      <p className="mt-6 text-center text-[12px] text-neutral-600">
        Remember your password?{' '}
        <Link
          href="/en/login"
          className="text-neutral-500 transition-colors hover:text-cyan-400"
        >
          Sign in instead
        </Link>
      </p>
    </div>
  )
}
