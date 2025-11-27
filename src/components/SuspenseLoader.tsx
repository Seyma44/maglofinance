import { useState, useEffect } from "react"
import LoadingSpinner from "./common/LoadingSpinner"
import type { MinimumLoadTimeProps } from "../types"

export default function MinimumLoadTime({ children, delay = 500 }: MinimumLoadTimeProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isReady) {
    return <LoadingSpinner fullScreen />
  }

  return <>{children}</>
}
