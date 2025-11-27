import { useMemo, useState } from "react"
import { FaWallet, FaMoneyBillTrendUp } from "../assets/icons/icon"
import { SkeletonLoader, EmptyState } from "../components/common"
import { formatCurrency, formatDateTime } from "../utils/formatters"
import { useFinancialSummary } from "../hooks/useFinancialData"

export default function BalanceCards() {
  const { data: summary, isLoading, isError } = useFinancialSummary()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  console.log("Summary Data:", summary)
  console.log("Loading:", isLoading, "Error:", isError)
  const cards = useMemo(() => {
    if (!summary?.totalBalance || !summary?.totalExpense || !summary?.totalSavings) {
      return []
    }
    return [
      {
        title: "Total balance",
        amount: summary.totalBalance.amount || 0,
        currency: summary.totalBalance.currency || "TRY",
        change: summary.totalBalance.change || { percentage: 0, trend: "up" },
        icon: FaWallet,
        bgColor: "#363A3F",
        textColor: "#9CA3AF",
        amountColor: "#FFF",
        iconBg: "#4E5257",
        iconColor: "#C8E972",
      },
      {
        title: "Total spending",
        amount: summary.totalExpense.amount || 0,
        currency: summary.totalExpense.currency || "TRY",
        change: summary.totalExpense.change || { percentage: 0, trend: "down" },
        icon: FaWallet,
        bgColor: "#F5F5F5",
        textColor: "#9CA3AF",
        amountColor: "#1F2937",
        iconBg: "#E8E8E8",
        iconColor: "#363A3F",
      },
      {
        title: "Total saved",
        amount: summary.totalSavings.amount || 0,
        currency: summary.totalSavings.currency || "TRY",
        change: summary.totalSavings.change || { percentage: 0, trend: "up" },
        icon: FaMoneyBillTrendUp,
        bgColor: "#F5F5F5",
        textColor: "#9CA3AF",
        amountColor: "#1F2937",
        iconBg: "#E8E8E8",
        iconColor: "#363A3F",
      },
    ]
  }, [summary])

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <SkeletonLoader key={i} height="h-32" />
        ))}
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <EmptyState
        title="Balance Cards"
        message="Failed to load balance information"
        description="Please try refreshing the page or contact support if the issue persists."
        icon={<FaWallet className="mx-auto h-12 w-12 text-gray-300" />}
        containerClassName="bg-white rounded-2xl border border-gray-50"
        contentClassName="text-center py-10"
      />
    )
  }

  // Empty state
  if (!summary || !summary.totalBalance || !summary.totalExpense || !summary.totalSavings) {
    return (
      <EmptyState
        message="No Balance Data"
        description="Your balance information will appear here once data is available."
        icon={<FaWallet className="mx-auto h-12 w-12 text-gray-300" />}
        containerClassName="bg-white rounded-2xl border border-gray-50"
        contentClassName="text-center py-10"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        const trendIcon = card.change.trend === "up" ? "↑" : "↓"
        const trendColor = card.change.trend === "up" ? "#10B981" : "#EF4444"

        return (
          <div
            key={index}
            style={{
              backgroundColor: card.bgColor,
              zIndex: hoveredCard === index ? 10000 : 1,
              overflow: "visible"
            }}
            className={`stagger-item card-hover-glow rounded-xl p-6 py-7 ${index === 0 ? "shadow-lg" : "shadow-sm"} relative`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Tooltip */}
            {hoveredCard === index && (
              <div
                className="absolute z-50 whitespace-nowrap"
                style={{
                  top: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
                  <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    {card.title}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: trendColor }}
                        />
                        <span className="text-sm text-gray-600">Change</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {trendIcon} {Math.abs(card.change.percentage)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-gray-600">Trend</span>
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {card.change.trend}
                      </span>
                    </div>
                    {summary?.lastUpdated && (
                      <div className="pt-2 mt-2 border-t border-gray-200">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium text-gray-700">Last updated</span>
                          <span className="text-xs text-gray-600">
                            {formatDateTime(summary.lastUpdated)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div
                style={{ backgroundColor: card.iconBg }}
                className="flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
              >
                <Icon style={{ color: card.iconColor }} className="max-h-full max-w-full" />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <p
                  style={{ color: card.textColor }}
                  className="text-sm font-normal truncate"
                  title={card.title}
                >
                  {card.title}
                </p>
                <p
                  className="font-bold truncate"
                  style={{
                    color: card.amountColor,
                    fontSize: "clamp(14px, 2vw, 23px)",
                    lineHeight: 1.2,
                  }}
                  title={formatCurrency(card.amount, card.currency)}
                >
                  {formatCurrency(card.amount, card.currency)}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
