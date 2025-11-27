import { useState, useEffect } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import PageTransition from "../components/common/PageTransition"
import { FaQuestionCircle } from "../assets/icons/icon"
import { SkeletonLoader, EmptyState, Card } from "../components/common"

export default function Help() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout title="Help">
      <PageTransition>
        {isLoading ? (
          <SkeletonLoader height="h-64" />
        ) : (
          <Card padding="lg">
            <EmptyState
              message="Help Center"
              description="This section is coming soon. We're working on providing you with helpful resources and documentation."
              icon={
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mx-auto">
                  <FaQuestionCircle className="h-8 w-8 text-gray-400" />
                </div>
              }
              containerClassName=""
              contentClassName="text-center"
            />
          </Card>
        )}
      </PageTransition>
    </DashboardLayout>
  )
}
