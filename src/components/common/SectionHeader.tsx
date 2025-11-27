import type { SectionHeaderProps } from "../../types";

export default function SectionHeader({
  title,
  action,
  className = "flex items-center justify-between mb-5",
  titleClassName = "text-xl font-medium text-gray-900",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className={titleClassName}>{title}</h2>
      {action && action}
    </div>
  )
}
