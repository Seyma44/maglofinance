import type { LoadingSpinnerProps } from "../../types"

export default function LoadingSpinner({ className = "", size = "sm", fullScreen = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-16 w-16 border-4",
  }

  if (!fullScreen) {
    return (
      <div
        className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${className}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          {/* Outer ring with gradient colors */}
          <div
            className={`animate-spin rounded-full h-16 w-16 border-4`}
            style={{
              borderColor: "#E8F4F8",
              borderTopColor: "#C5F82A",
              borderRightColor: "#1A5F5E",
              animationDuration: "0.8s",
            }}
            role="status"
            aria-label="Loading"
          >
            <span className="sr-only">Loading...</span>
          </div>

          {/* Inner glow effect */}
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(197, 248, 42, 0.15) 0%, transparent 70%)",
              animationDuration: "2s",
            }}
          />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xl font-semibold text-gray-900">Loading</p>

          {/* Animated dots */}
          <div className="flex gap-1.5">
            <div
              className="h-2 w-2 rounded-full bg-[#1A5F5E] animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "0.6s" }}
            />
            <div
              className="h-2 w-2 rounded-full bg-[#1A5F5E] animate-bounce"
              style={{ animationDelay: "150ms", animationDuration: "0.6s" }}
            />
            <div
              className="h-2 w-2 rounded-full bg-[#C5F82A] animate-bounce"
              style={{ animationDelay: "300ms", animationDuration: "0.6s" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
