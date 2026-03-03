import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { locales } from './i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
})

const PROTECTED_PATHS = ['/dashboard', '/resume', '/settings']

export async function middleware(request: NextRequest) {
  // 1. Refresh Supabase auth session
  await updateSession(request)

  // 2. Check if path needs auth (after stripping locale)
  const pathname = request.nextUrl.pathname
  const isProtected = PROTECTED_PATHS.some(p =>
    pathname.replace(/^\/(en|fr|es|ar)/, '').startsWith(p)
  )

  if (isProtected) {
    const { createServerClient } = await import('@supabase/ssr')
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => request.cookies.getAll(), setAll: () => {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      const locale = pathname.split('/')[1] || 'en'
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }
  }

  // 3. Apply i18n routing
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
