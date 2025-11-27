import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import DashboardLayout from "../layout/DashboardLayout"
import PageTransition from "../components/common/PageTransition"
import { FaUser, BiSolidBell, FaLock, FaCreditCard, FaGlobe, FaPalette } from "../assets/icons/icon"
import { Button, Input, SkeletonLoader, EmptyState } from "../components/common"

const settingsTabs = [
  { id: "profile", label: "Profile", icon: FaUser },
  { id: "notifications", label: "Notifications", icon: BiSolidBell },
  { id: "security", label: "Security", icon: FaLock },
  { id: "billing", label: "Billing", icon: FaCreditCard },
  { id: "language", label: "Language", icon: FaGlobe },
  { id: "appearance", label: "Appearance", icon: FaPalette },
]

const tabIcons: Record<string, typeof FaCreditCard> = {
  billing: FaCreditCard,
  language: FaGlobe,
  appearance: FaPalette,
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const { user } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout title="Settings">
      <PageTransition>
        {isLoading ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <SkeletonLoader height="h-80" width="lg:w-64" className="flex-shrink-0" />
            <SkeletonLoader height="h-80" className="flex-1" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Settings Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-50 p-2">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon
                  const active = activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        active ? "bg-primary text-gray-900" : "text-gray-300 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4 text-current" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl border border-gray-50 p-6">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Full Name" type="text" defaultValue={user?.fullName || ""} className="py-2.5" />
                      <Input label="Email" type="email" defaultValue={user?.email || ""} className="py-2.5" />
                    </div>
                    <Button variant="primary" className="px-6">
                      Save Changes
                    </Button>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
                    <div className="space-y-4">
                      {["Email notifications", "Push notifications", "SMS alerts", "Marketing emails"].map((item) => (
                        <label
                          key={item}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <span className="text-sm font-medium text-gray-700">{item}</span>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-5 w-5 rounded border-gray-200 accent-primary"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                    <div className="space-y-4">
                      <Input label="Current Password" type="password" className="py-2.5" />
                      <Input label="New Password" type="password" className="py-2.5" />
                      <Input label="Confirm New Password" type="password" className="py-2.5" />
                    </div>
                    <Button variant="primary" className="px-6">
                      Update Password
                    </Button>
                  </div>
                )}

                {["billing", "language", "appearance"].includes(activeTab) && (
                  <EmptyState
                    message={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings`}
                    description="This section is coming soon. We're working on bringing you more customization options."
                    icon={
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mx-auto">
                        {(() => {
                          const IconComponent = tabIcons[activeTab]
                          return IconComponent ? <IconComponent className="h-6 w-6 text-gray-400" /> : null
                        })()}
                      </div>
                    }
                    containerClassName=""
                    contentClassName="text-center py-8"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </PageTransition>
    </DashboardLayout>
  )
}
