import DashboardLayout from "../layout/DashboardLayout"
import BalanceCards from "../components/BalanceCards"
import WorkingCapitalChart from "../components/WorkingCapitalChart"
import RecentTransactions from "../components/RecentTransactions"
import WalletSection from "../components/WalletSection"
import ScheduledTransfers from "../components/ScheduledTransfers"
import PageTransition from "../components/common/PageTransition"

export default function Dashboard() {
  return (
      <DashboardLayout title="Dashboard">
        <PageTransition>
          <div className="page-enter grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-8">
              <BalanceCards />
              <WorkingCapitalChart />
              <RecentTransactions />
            </div>
            <div className="space-y-6">
              <WalletSection />
              <ScheduledTransfers />
            </div>
          </div>
        </PageTransition>
      </DashboardLayout>

  )
}
