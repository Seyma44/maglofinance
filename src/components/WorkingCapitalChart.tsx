import { useState, useMemo, useCallback, useId, useRef, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { SkeletonLoader, Dropdown, EmptyState, Card } from "../components/common"
import { useWorkingCapital } from "../hooks/useFinancialData"
import { formatCurrency } from "../utils/formatters"
import type { ChartDataPoint, CombinedTooltipProps, CustomCursorProps, DropdownItem } from "../types"

const TIME_FILTERS: DropdownItem[] = [
  { label: "Last 3 months", value: 3 },
  { label: "Last 6 months", value: 6 },
  { label: "All time", value: 0 },
]

const CombinedTooltip = (props: CombinedTooltipProps) => {
  const { active, payload, activeDotDataKey, currency, coordinate, viewBox } = props

  if (active && payload && payload.length > 0) {
    const hoveredPayload = activeDotDataKey ? payload.find((p) => p.dataKey === activeDotDataKey) : payload[0]
    const dataPoint = payload[0]?.payload

    if (!dataPoint) return null

    const month = dataPoint.month
    const income = dataPoint.income || 0
    const expense = dataPoint.expense || 0
    const netFlow = income - expense

    const chartWidth = viewBox?.width || 600
    const chartHeight = viewBox?.height || 280
    const isLeftHalf = coordinate ? coordinate.x < chartWidth / 2 : false
    const isTopHalf = coordinate ? coordinate.y < chartHeight / 2 : false

    return (
      <div className="relative inline-flex items-center gap-4">
        {!isLeftHalf && (
          <div className={`tooltip-enter absolute right-full mr-4 z-50 whitespace-nowrap ${isTopHalf ? 'top-0' : 'bottom-0'}`}>
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{month}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#1A5F5E]" />
                    <span className="text-sm text-gray-600">Income</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(income, currency)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#C5F82A]" />
                    <span className="text-sm text-gray-600">Expenses</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(expense, currency)}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-gray-700">Net Flow</span>
                    <span className={`text-sm font-bold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {hoveredPayload && (
          <div className="tooltip-enter relative">
            <div className="bg-[#E8F4F8]/90 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm">
              <span className="text-gray-700">{formatCurrency(hoveredPayload.value as number, currency)}</span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#E8F4F8]" />
          </div>
        )}

        {isLeftHalf && (
          <div className={`tooltip-enter absolute left-full ml-4 z-50 whitespace-nowrap ${isTopHalf ? 'top-0' : 'bottom-0'}`}>
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{month}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#1A5F5E]" />
                    <span className="text-sm text-gray-600">Income</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(income, currency)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#C5F82A]" />
                    <span className="text-sm text-gray-600">Expenses</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(expense, currency)}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-gray-700">Net Flow</span>
                    <span className={`text-sm font-bold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  return null
}

const CustomCursor = ({ points, width = 0, height = 0, gradientId }: CustomCursorProps) => {
  if (!points || points.length === 0) return null

  const x = points[0].x
  const barWidth = width / (points.length * 5)

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E8F4F8" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#E8F4F8" stopOpacity={0} />
        </linearGradient>
      </defs>

      <rect
        x={x - barWidth / 2}
        y={0}
        width={barWidth}
        height={height}
        fill={`url(#${gradientId})`}
        rx={12}
        ry={12}
        stroke="none"
        style={{
          pointerEvents: "none",
          outline: "none",
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          touchAction: "none",
        }}
      />
    </>
  )
}

export default function WorkingCapitalChart() {
  const { data: workingCapitalResponse, isLoading, isError } = useWorkingCapital()
  const [selectedFilter, setSelectedFilter] = useState<DropdownItem>(TIME_FILTERS[1])
  const [activeDotDataKey, setActiveDotDataKey] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768)
  const isOnActiveDot = useRef(false)
  const gradientId = `cursorGradient-${useId()}`

  // Handle window resize for responsive mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleFilterChange = useCallback((item: DropdownItem) => {
    setSelectedFilter(item)
  }, [])

  const rawChartData = useMemo((): ChartDataPoint[] => {
    if (!workingCapitalResponse) return []

    if (Array.isArray(workingCapitalResponse.data)) {
      return workingCapitalResponse.data as ChartDataPoint[]
    }

    return []
  }, [workingCapitalResponse])

  const currency = workingCapitalResponse?.currency || "USD"

  const chartData = useMemo((): ChartDataPoint[] => {
    if (!Array.isArray(rawChartData) || rawChartData.length === 0) return []

    const filterValue = selectedFilter.value as number
    if (filterValue === 0) {
      return rawChartData
    }

    return rawChartData.slice(-filterValue)
  }, [rawChartData, selectedFilter.value])

  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 10000
    const max = Math.max(...chartData.map((d) => Math.max(d.income || 0, d.expense || 0)))
    return Math.ceil(max / 1000) * 1000
  }, [chartData])

  const handleDotInteraction = useCallback((dataKey: string) => {
    isOnActiveDot.current = true
    setActiveDotDataKey(dataKey)
  }, [])

  const handleDotLeave = useCallback(() => {
    isOnActiveDot.current = false
    // Clear tooltip after a delay on mobile
    if (isMobile) {
      setTimeout(() => {
        if (!isOnActiveDot.current) {
          setActiveDotDataKey(null)
        }
      }, 2000)
    } else {
      setActiveDotDataKey(null)
    }
  }, [isMobile])

  const handleChartMouseLeave = useCallback(() => {
    if (!isMobile) {
      setActiveDotDataKey(null)
      isOnActiveDot.current = false
    }
  }, [isMobile])

  if (isLoading) {
    return <SkeletonLoader height="h-96" />
  }

  if (isError) {
    return (
      <Card>
        <EmptyState
          title="Working Capital"
          message="Failed to load chart data"
          description="Please try refreshing the page or contact support if the issue persists."
          contentClassName="flex items-center justify-center h-64"
        />
      </Card>
    )
  }

  if (!workingCapitalResponse || !Array.isArray(rawChartData) || rawChartData.length === 0) {
    return (
      <Card>
        <EmptyState
          title="Working Capital"
          message="No chart data available"
          contentClassName="flex items-center justify-center h-64"
        />
      </Card>
    )
  }

  const formatYAxis = (value: number) => {
    if (value === 0) return "0K"
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toString()
  }

  return (
    <Card padding="md" shadow="sm" border={true} className="-mx-1 overflow-visible">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <h2 className="text-xl font-medium text-gray-900">Working Capital</h2>

        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
          <div className="flex items-center gap-4 mr-10">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#1A5F5E" }} />
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#C5F82A" }} />
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
          </div>

          <Dropdown items={TIME_FILTERS} selected={selectedFilter} onSelect={handleFilterChange} />
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-visible -mx-6 px-6" onMouseLeave={handleChartMouseLeave}>
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                dy={10}
                interval={0}
                padding={{ left: 60, right: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={formatYAxis}
                width={40}
                domain={[0, maxValue]}
                ticks={Array.from({ length: 5 }, (_, i) => (maxValue / 4) * i)}
              />

            <Tooltip
                content={<CombinedTooltip activeDotDataKey={activeDotDataKey} currency={currency} />}
                cursor={!isMobile ? <CustomCursor gradientId={gradientId} /> : false}
                position={isMobile ? { y: 0 } : undefined}
                offset={isMobile ? 20 : -40}
                wrapperStyle={{ outline: 'none' }}
              />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#1A5F5E"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#4F46E5",
                  stroke: "#fff",
                  strokeWidth: 2,
                  onMouseEnter: () => handleDotInteraction("income"),
                  onMouseLeave: handleDotLeave,
                  onTouchStart: () => handleDotInteraction("income"),
                  onTouchEnd: handleDotLeave,
                  style: { cursor: 'pointer', touchAction: 'none' }
                }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#C5F82A"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#C5F82A",
                  stroke: "#fff",
                  strokeWidth: 2,
                  onMouseEnter: () => handleDotInteraction("expense"),
                  onMouseLeave: handleDotLeave,
                  onTouchStart: () => handleDotInteraction("expense"),
                  onTouchEnd: handleDotLeave,
                  style: { cursor: 'pointer', touchAction: 'none' }
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}