import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume | ResuMaster AI',
  description: 'View this resume',
}

export default async function PublicResumePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Resume</h1>
        <p className="text-gray-600">Slug: {slug}</p>
        <p className="text-gray-600">Locale: {locale}</p>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-gray-500">
            This is a public resume view. Resume content will be displayed here.
          </p>
        </div>
      </div>
    </div>
  )
}

