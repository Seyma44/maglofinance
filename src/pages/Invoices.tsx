import { useState, useEffect } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import PageTransition from "../components/common/PageTransition"
import { FaFileInvoice, FaPlus } from "../assets/icons/icon"
import { Button, SkeletonLoader, EmptyState, Card } from "../components/common"

export default function Invoices() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout title="Invoices">
      <PageTransition>
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex justify-end">
              <SkeletonLoader height="h-10" width="w-40" />
            </div>
            <SkeletonLoader height="h-96" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1 max-w-md"></div>
              <Button variant="primary" icon={<FaPlus className="h-4 w-4" />}>
                Create Invoice
              </Button>
            </div>

            <Card padding="lg">
              <EmptyState
                message="No Invoices Yet"
                description="Start creating invoices for your clients and track all your payments in one place."
                icon={<FaFileInvoice className="mx-auto h-16 w-16 text-gray-300" />}
                containerClassName=""
                contentClassName="text-center"
                action={
                  <Button variant="primary" icon={<FaPlus className="h-4 w-4" />} size="lg">
                    Create Your First Invoice
                  </Button>
                }
              />
            </Card>
          </div>
        )}
      </PageTransition>
    </DashboardLayout>
  )
}
