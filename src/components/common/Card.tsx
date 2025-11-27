import type { CardProps } from "../../types"

export default function Card({ children, padding = "md", shadow = "sm", border = true, className = "" }: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "px-6 py-4",
    lg: "p-8",
  }

  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  }

  const borderClass = border ? "border border-gray-50" : ""

  const classes = `bg-white rounded-2xl ${paddingStyles[padding]} ${shadowStyles[shadow]} ${borderClass} ${className}`

  return <div className={classes}>{children}</div>
}
