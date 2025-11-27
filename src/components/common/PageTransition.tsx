import { useState, useCallback } from "react"
import { useLocation } from "react-router-dom"
import type { PageTransitionProps } from "../../types"

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState("fadeIn")
  const shouldFadeOut = location.pathname !== displayLocation.pathname


  const handleAnimationEnd = useCallback(() => {
    if (shouldFadeOut) {
      setTransitionStage("fadeIn")
      setDisplayLocation(location)
    }
  }, [shouldFadeOut, location])


  const currentStage = shouldFadeOut ? "fadeOut" : transitionStage

  return (
    <>
      {/* Animated overlay curtain */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-400 ease-out ${
          currentStage === "fadeOut" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-pink-500/10 transition-transform duration-500 ease-out ${
            currentStage === "fadeOut" ? "translate-y-0" : "-translate-y-full"
          }`}
        />
      </div>

      <div
        className={`relative will-change-transform ${
          currentStage === "fadeOut"
            ? "animate-fade-out-slide"
            : "animate-page-enter-bounce"
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Floating particles effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {currentStage === "fadeIn" && (
            <>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-primary to-secondary opacity-30 animate-float-particle"
                  style={{
                    left: `${i * 15 + 10}%`,
                    top: `${i * 10 + 5}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${2 + i * 0.3}s`,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Content wrapper with blur effect */}
        <div
          className={`transition-all duration-300 ease-out ${
            currentStage === "fadeOut" ? "blur-[8px]" : "blur-0"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  )
}