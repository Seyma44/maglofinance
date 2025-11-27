import DashboardLayout from "../layout/DashboardLayout"
import PageTransition from "../components/common/PageTransition"
import { FaPlus, FaCalendarAlt } from "../assets/icons/icon"
import { SkeletonLoader, EmptyState, Button, Avatar, Card } from "../components/common"
import { formatCurrency, formatDateTime } from "../utils/formatters"
import { useScheduledTransfers } from "../hooks/useFinancialData"
import type { ScheduledTransfer } from "../types"

export default function ScheduledTransfersPage() {

  const { data, isLoading, isError } = useScheduledTransfers()
  const scheduledTransfers = data?.transfers || []

  return (
    <DashboardLayout title="Scheduled Transfers">
      <PageTransition>
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md"></div>
            <Button variant="primary" icon={<FaPlus className="h-4 w-4" />}>
              New Transfer
            </Button>
          </div>
          <Card padding="none" className="overflow-hidden">
            {isLoading ? (
              <SkeletonLoader height="h-96" rounded="rounded-none" />
            ) : isError ? (
              <EmptyState
                message="Failed to load scheduled transfers"
                description="Please try refreshing the page or contact support if the issue persists."
                icon={<FaCalendarAlt className="mx-auto h-12 w-12 text-gray-300" />}
                containerClassName=""
                contentClassName="text-center py-12"
              />
            ) : !scheduledTransfers || scheduledTransfers.length === 0 ? (
              <EmptyState
                message="No scheduled transfers found"
                description="Create a new transfer to get started"
                icon={<FaCalendarAlt className="mx-auto h-12 w-12 text-gray-300" />}
                containerClassName=""
                contentClassName="text-center py-12"
              />
            ) : (
              <div className="overflow-x-auto">
                <div className="divide-y divide-gray-50 min-w-[500px]">
                  {scheduledTransfers.map((transfer: ScheduledTransfer) => (
                    <div
                      key={transfer.id}
                      className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={transfer.image}
                          alt={transfer.name}
                          fallback={transfer.name}
                          size="lg"
                          shape="circle"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{transfer.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-gray-300 text-xs">{formatDateTime(transfer.date)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">
                          - {formatCurrency(Math.abs(transfer.amount), transfer.currency)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}