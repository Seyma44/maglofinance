import DashboardLayout from "../layout/DashboardLayout"
import { FaPlus, FaCreditCard } from "../assets/icons/icon"
import { SkeletonLoader, EmptyState, Button, Card } from "../components/common"
import PageTransition from "../components/common/PageTransition"
import { useWalletCards } from "../hooks/useFinancialData"

export default function Wallets() {
  const { data, isLoading, isError } = useWalletCards()
  const walletCards = data?.cards || []

  return (
      <DashboardLayout title="My Wallets">
        <PageTransition>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-gray-600">Manage your cards and wallets</p>

              <Button variant="primary" icon={<FaPlus className="h-4 w-4" />} className="w-full sm:w-auto">
                Add New Card
              </Button>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <SkeletonLoader key={i} height="h-48" />
                ))}
              </div>
            ) : isError ? (
              <Card padding="lg">
                <EmptyState
                  message="Failed to Load Cards"
                  description="Please try refreshing the page or contact support if the issue persists."
                  icon={<FaCreditCard className="mx-auto h-16 w-16 text-gray-300" />}
                  containerClassName=""
                  contentClassName="text-center"
                />
              </Card>
            ) : !walletCards || walletCards.length === 0 ? (
              <Card padding="lg">
                <EmptyState
                  message="No Cards Added"
                  description="Add your credit or debit cards to manage payments easily."
                  icon={<FaCreditCard className="mx-auto h-16 w-16 text-gray-300" />}
                  containerClassName=""
                  contentClassName="text-center"
                />
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">Coming soon..</div>
            )}
          </div>
        </PageTransition>
      </DashboardLayout>
 
  )
}
