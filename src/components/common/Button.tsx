import type { ButtonProps } from "../../types"

export default function Button({
  variant = "outline",
  size = "md",
  icon,
  iconPosition = "left",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors rounded-lg button-press focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantStyles = {
    primary: "bg-primary text-gray-900 hover:bg-primary/90 focus:ring-primary/50",
    secondary: "text-secondary hover:text-secondary/80 focus:ring-secondary/30",
    outline: "border border-[#F2F2F2] text-zinc-500 hover:bg-gray-50 focus:ring-gray-300",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
  }

  const sizeStyles = {
    sm: "px-3 py-2 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5 font-semibold",
  }

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  )
}
