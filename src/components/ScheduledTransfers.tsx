import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { FaChevronRight } from "../assets/icons/icon"
import { SkeletonLoader, EmptyState, SectionHeader, Button, Avatar } from "../components/common"
import { formatCurrency, formatDateTime } from "../utils/formatters"
import { useScheduledTransfers } from "../hooks/useFinancialData"
import type { ScheduledTransfer } from "../types"


export default function ScheduledTransfers() {

  const { data, isLoading, isError } = useScheduledTransfers()
  const navigate = useNavigate()
  const scheduledTransfers = data?.transfers || []

  console.log("Scheduled Transfers Data:", scheduledTransfers)
  console.log("Loading:", isLoading, "Error:", isError)

  const handleViewAll = useCallback(() => {
    navigate("/transactions/scheduled")
  }, [navigate])

  // Loading state
  if (isLoading) {
    return <SkeletonLoader height="h-96" />
  }

  // Error state
  if (isError) {
    return (
      <EmptyState
        title="Scheduled Transfers"
        message="Failed to load scheduled transfers"
        description="Please try refreshing the page or contact support if the issue persists."
        containerClassName="bg-white rounded-2xl p-6"
        contentClassName="text-center py-12"
      />
    )
  }

  // Empty state
  if (!scheduledTransfers || scheduledTransfers.length === 0) {
    return (
      <EmptyState
        title="Scheduled Transfers"
        message="No scheduled transfers"
        description="You don't have any upcoming transfers scheduled."
        containerClassName="bg-white rounded-2xl p-6"
        contentClassName="text-center py-12"
      />
    )
  }


  return (
      <div className="bg-white rounded-2xl p-6 fade-in-up">
      <SectionHeader
        title="Scheduled Transfers"
        className="flex items-center justify-between"
        action={
          <Button
            variant="secondary"
            onClick={handleViewAll}
            icon={<FaChevronRight className="h-3 w-3" />}
            iconPosition="right"
            className="gap-3 px-0"
          >
            View All
          </Button>
        }
      />

      <div className="overflow-x-auto">
        <div className="space-y-4 min-w-[300px] divide-y divide-gray-50 ">
          {scheduledTransfers.slice(0, 5).map((transfer: ScheduledTransfer) => (
            <div
              key={transfer.id}
              className="flex items-center justify-between hover:border-gray-200 transition-colors pt-5"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src={transfer.image}
                  alt={transfer.name}
                  fallback={transfer.name}
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
                <p className="font-semibold ">
                  {formatCurrency(transfer.amount, transfer.currency)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {scheduledTransfers.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <button className="text-sm text-secondary hover:text-secondary/80 transition-colors">
            Show {scheduledTransfers.length - 5} more transfers
          </button>
        </div>
      )}
    </div>
  )
}
