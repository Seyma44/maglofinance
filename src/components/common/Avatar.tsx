import type { AvatarProps } from "../../types"

export default function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  shape = "square",
  className = "",
}: AvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
  }

  const shapeClasses = {
    square: "rounded-lg",
    circle: "rounded-full",
  }

  const containerClass = `relative flex items-center justify-center ${sizeClasses[size]} ${shapeClasses[shape]} bg-gray-100 overflow-hidden ${className}`

  return (
    <div className={containerClass}>
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement as HTMLElement | null
              if (parent) {
                const fallbackEl = parent.querySelector(".fallback-initial") as HTMLElement | null
                if (fallbackEl) {
                  fallbackEl.style.display = "flex"
                }
              }
            }}
          />
          <div
            className="fallback-initial absolute inset-0 flex items-center justify-center bg-gray-100"
            style={{ display: "none" }}
          >
            <span className="font-semibold text-gray-700">{fallback.charAt(0).toUpperCase()}</span>
          </div>
        </>
      ) : (
        <span className="font-semibold text-gray-700">{fallback.charAt(0).toUpperCase()}</span>
      )}
    </div>
  )
}
