import type { InputProps } from "../../types"

export default function Input({
  label,
  error,
  icon,
  iconPosition = "left",
  containerClassName = "",
  labelClassName = "block text-sm font-medium text-gray-900 mb-2",
  className = "",
  id,
  ...props
}: InputProps) {
  const hasError = !!error

  const baseInputClasses = "block w-full rounded-lg border bg-white text-gray-900 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed"

  const paddingClasses = icon && iconPosition === "left" ? "pl-10 pr-4" : icon && iconPosition === "right" ? "pl-4 pr-10" : "px-4"

  const borderClasses = hasError ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-[#F2F2F2] focus:ring-primary/20 focus:border-primary"

  const inputClasses = `${baseInputClasses} ${paddingClasses} py-3 ${borderClasses} ${className}`

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          className={inputClasses}
          {...props}
        />

        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>
      )}
    </div>
  )
}
