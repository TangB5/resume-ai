// src/middleware.ts
import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { locales } from './i18n'

const PROTECTED_PATHS = ['/dashboard', '/resume', '/settings']

// Middleware i18n
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
})

export async function proxy(request: NextRequest) {
  console.log('[proxy] pathname:', request.nextUrl.pathname)
  // 1️⃣ Refresh Supabase session
  await updateSession(request)

  const pathname = request.nextUrl.pathname

  // 2️⃣ Vérifier si la route est protégée
  const isProtected = PROTECTED_PATHS.some((p) =>
    pathname.replace(/^\/(en|fr|es|ar)/, '').startsWith(p)
  )

  if (isProtected) {
    // Création d'un client Supabase côté serveur
    const { createServerClient } = await import('@supabase/ssr')
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: () => {}, // inutile ici, gestion via updateSession
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      // Redirection vers la page login avec locale
      const locale = pathname.split('/')[1] || 'en'
      console.log('[proxy] detected locale from path:', locale)
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }
  }

  // 3️⃣ Appliquer i18n routing
  return intlMiddleware(request)
}

// Matcher pour exclure les fichiers statiques et API
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
