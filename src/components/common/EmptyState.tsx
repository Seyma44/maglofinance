import type { EmptyStateProps } from "../../types";

export default function EmptyState({
  title,
  message,
  description,
  icon,
  containerClassName = "bg-white rounded-2xl p-6",
  contentClassName = "text-center py-8",
  action,
}: EmptyStateProps) {
  return (
    <div className={containerClassName}>
      {title && (
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xl font-medium text-gray-900">{title}</h2>
        </div>
      )}
      <div className={contentClassName}>
        {icon && <div className="mb-4">{icon}</div>}
        <div className="text-gray-900 font-medium text-lg mb-2">{message}</div>
        {description && <p className="text-sm text-gray-500 max-w-sm mx-auto">{description}</p>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  )
}
