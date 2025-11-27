import { memo } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import { FaFilter, FaDownload, FaExchangeAlt } from "../assets/icons/icon"
import { SkeletonLoader, Button, Avatar, EmptyState, Card } from "../components/common"
import { formatCurrency, formatDate } from "../utils/formatters"
import PageTransition from "../components/common/PageTransition"
import { useRecentTransactions } from "../hooks/useFinancialData"
import type { Transaction } from "../types"

const TransactionRow = memo(({ transaction }: { transaction: Transaction }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-3 min-w-fit">
        <Avatar src={transaction.image} alt={transaction.business || ""} fallback={transaction.name} />
        <div className="min-w-0">
          <p className="font-medium text-sm text-gray-900 truncate">{transaction.name}</p>
          <p className="text-xs text-gray-300 font-thin truncate">{transaction.business}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-center whitespace-nowrap">
      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
        {transaction.type}
      </span>
    </td>
    <td className="px-6 py-4 text-center whitespace-nowrap">
      <span
        className={`font-bold text-sm ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}
      >
        {formatCurrency(transaction.amount, transaction.currency)}
      </span>
    </td>
    <td className="px-6 py-4 text-center whitespace-nowrap">
      <span className="text-sm text-gray-300">{formatDate(transaction.date).replace(",", "")}</span>
    </td>
  </tr>
))

TransactionRow.displayName = 'TransactionRow'

export default function Transactions() {

  const { data, isLoading, isError } = useRecentTransactions(100)
  const transactions = data?.transactions || []

  return (

      <DashboardLayout title="Transactions">
         <PageTransition>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md"></div>
            <div className="flex items-center gap-3">
              <Button variant="outline" icon={<FaFilter className="h-4 w-4 bg-transparent" />}>
                Filter
              </Button>
              <Button variant="outline" icon={<FaDownload className="h-4 w-4 bg-transparent" />}>
                Export
              </Button>
            </div>
          </div>
          <Card padding="none" className="overflow-hidden">
            {isLoading ? (
              <SkeletonLoader height="h-96" rounded="rounded-none" />
            ) : isError ? (
              <EmptyState
                message="Failed to Load Transactions"
                description="Please try refreshing the page or contact support if the issue persists."
                icon={<FaExchangeAlt className="mx-auto h-16 w-16 text-gray-300" />}
                containerClassName=""
                contentClassName="text-center py-12"
              />
            ) : !transactions || transactions.length === 0 ? (
              <EmptyState
                message="No Transactions Yet"
                description="Your transaction history will appear here once you start making payments or receiving funds."
                icon={<FaExchangeAlt className="mx-auto h-16 w-16 text-gray-300" />}
                containerClassName=""
                contentClassName="text-center py-12"
              />
            ) : (
              <div className="table-scroll-container">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Name/Business
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Type
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {transactions.map((transaction: Transaction) => (
                      <TransactionRow key={transaction.id} transaction={transaction} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
        </PageTransition>
      </DashboardLayout>

  )
}
