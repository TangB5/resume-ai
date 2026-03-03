import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | ResuMaster AI',
  description: 'Manage your account settings',
}

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-2 text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mb-8">Locale: {locale}</p>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Profile Settings</h2>
            <p className="text-gray-600">Manage your profile information</p>
          </div>

          {/* Privacy Settings */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Privacy & Security</h2>
            <p className="text-gray-600">Control your privacy preferences</p>
          </div>

          {/* Notification Settings */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Notifications</h2>
            <p className="text-gray-600">Manage notification preferences</p>
          </div>

          {/* Danger Zone */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-red-600">Danger Zone</h2>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

