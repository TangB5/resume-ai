import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Preview | ResuMaster AI',
  description: 'Preview your resume before exporting',
}

export default async function ResumePreviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Resume Preview</h1>
        <p className="text-gray-600">Resume ID: {id}</p>
        <p className="text-gray-600">Locale: {locale}</p>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-gray-500">
            Resume preview will be displayed here
          </p>
        </div>
      </div>
    </div>
  )
}

