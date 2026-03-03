import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create New Resume | ResuMaster AI',
  description: 'Start creating your new resume',
}

export default async function NewResumePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Create New Resume</h1>
        <p className="text-gray-600 mb-6">Locale: {locale}</p>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="text-3xl">📄</div>
            <div>
              <h3 className="font-semibold">Upload Existing Resume</h3>
              <p className="text-sm text-gray-500">Upload a PDF or DOCX file</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="text-3xl">🔗</div>
            <div>
              <h3 className="font-semibold">Import from LinkedIn</h3>
              <p className="text-sm text-gray-500">Connect your LinkedIn profile</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="text-3xl">✏️</div>
            <div>
              <h3 className="font-semibold">Build from Scratch</h3>
              <p className="text-sm text-gray-500">Create a new resume manually</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

