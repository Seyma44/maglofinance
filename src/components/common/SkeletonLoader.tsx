import type { SkeletonLoaderProps } from "../../types";

export default function SkeletonLoader({
  height = "h-32",
  width = "w-full",
  rounded = "rounded-2xl",
  className = "",
}: SkeletonLoaderProps) {
  return <div className={`${height} ${width} ${rounded} shimmer ${className}`} />
}
