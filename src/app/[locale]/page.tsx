import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Home() {
  const t = useTranslations('app')
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white">
      <h1 className="text-6xl font-bold mb-4">{t('name')}</h1>
      <p className="text-neutral-400 text-xl mb-8">{t('tagline')}</p>
      <Link
        href="/en/signup"
        className="px-8 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
      >
        Get Started Free →
      </Link>
    </main>
  )
}
