
import { FaChevronRight } from "../assets/icons/icon"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { SkeletonLoader, EmptyState, Card, SectionHeader, Button, Avatar } from "../components/common"
import { formatCurrency, formatDate } from "../utils/formatters"
import { useRecentTransactions } from "../hooks/useFinancialData"
import type { Transaction } from "../types"


export default function RecentTransactions() {
  const { data, isLoading, isError } = useRecentTransactions(20)
  const navigate = useNavigate()


  const handleViewAll = useCallback(() => {
    navigate("/transactions")
  }, [navigate])

  const transactions = data?.transactions || []

  // Loading state
  if (isLoading) {
    return <SkeletonLoader height="h-80" />
  }

  // Error state
  if (isError) {
    return (
      <Card>
        <EmptyState
          title="Recent Transactions"
          message="Failed to load transactions"
          description="Please try refreshing the page or contact support if the issue persists."
          contentClassName="text-center py-10"
        />
      </Card>
    )
  }

  // Empty state
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        title="Recent Transactions"
        message="No transactions found"
        containerClassName="bg-white rounded-2xl p-6 border border-gray-200"
        contentClassName="text-center py-8 text-gray-500"
      />
    )
  }

  return (
    <Card className="fade-in-up">
      <SectionHeader
        title="Recent Transaction"
        action={
          <Button
            variant="secondary"
            onClick={handleViewAll}
            size="md"
            icon={<FaChevronRight className="h-3 w-3" />}
            iconPosition="right"
            className="px-1 py-2 gap-3"
          >
            View All
          </Button>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="pb-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name/Business
              </th>

              <th className="pb-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>

              <th className="pb-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Amount
              </th>

              <th className="pb-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {transactions.slice(0, 3).map((transaction: Transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">

                {/* LEFT COLUMN */}
                <td className="py-4 text-left">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={transaction.image}
                      alt={transaction.business || transaction.name}
                      fallback={transaction.name}
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-900">{transaction.name}</p>
                      <p className="text-xs text-gray-300 font-thin">{transaction.business}</p>
                    </div>
                  </div>
                </td>

                {/* CENTER COLUMN */}
                <td className="py-4 text-center">
                  <span className="text-sm text-gray-300 capitalize">
                    {transaction.type}
                  </span>
                </td>

                {/* CENTER (Amount) */}
                <td className="py-4 text-center">
                  <span className="font-bold text-sm">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </span>
                </td>

                {/* CENTER (Date) */}
                <td className="py-4 text-center">
                  <span className="text-sm text-gray-300">{formatDate(transaction.date).replace(",", "")}</span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </Card>
  )
}
