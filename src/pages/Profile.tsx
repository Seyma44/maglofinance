import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import DashboardLayout from "../layout/DashboardLayout"
import PageTransition from "../components/common/PageTransition"
import { FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt } from "../assets/icons/icon"
import { Button, Input, SkeletonLoader, Card } from "../components/common"

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout title="Profile">
      <PageTransition>
        {isLoading ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <SkeletonLoader height="h-36" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonLoader height="h-64" />
              <SkeletonLoader height="h-64" />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gray-900 flex items-center justify-center text-white text-3xl font-bold">
                    {user?.fullName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-gray-900 hover:bg-primary/90 transition-colors" aria-label="Change profile picture">
                    <FaCamera className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">{user?.fullName || "User"}</h2>
                  <p className="text-gray-500 mt-1">{user?.email || "user@example.com"}</p>
                  <p className="text-sm text-gray-400 mt-2">Member since November 2024</p>
                </div>
              </div>
            </Card>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <Input label="Full Name" type="text" defaultValue={user?.fullName || ""} className="py-2.5" />

                  <Input
                    label="Email"
                    type="email"
                    defaultValue={user?.email || ""}
                    icon={<FaEnvelope className="h-4 w-4" />}
                    className="py-2.5"
                  />

                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+90 (555) 000-0000"
                    icon={<FaPhone className="h-4 w-4" />}
                  />
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    type="text"
                    placeholder="123 Main Street"
                    icon={<FaMapMarkerAlt className="h-4 w-4" />}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input label="City" type="text" placeholder="New York" />
                    <Input label="ZIP Code" type="text" placeholder="10001" />
                  </div>
                  <Input
                    label="Country"
                    type="text"
                    placeholder="Türkiye"
                    icon={<FaMapMarkerAlt className="h-4 w-4" />}
                  />
                </div>
              </Card>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button variant="primary" className="px-6">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </PageTransition>
    </DashboardLayout>
  )
}
