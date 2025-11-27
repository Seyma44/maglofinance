import Avatar from "./Avatar"
import { formatCurrency, formatDate } from "../../utils/formatters"
import type { TransactionRowProps } from "../../types"

export default function TransactionRow({
  transaction,
  showBusiness = true,
  centerAlignAmount = false,
  className = "hover:bg-gray-50 transition-colors",
}: TransactionRowProps) {
  return (
    <tr className={className}>
      {/* Name/Business Column */}
      <td className="py-4 text-left">
        <div className="flex items-center gap-3">
          <Avatar src={transaction.image} alt={transaction.business || transaction.name} fallback={transaction.name} />
          <div>
            <p className="font-medium text-sm text-gray-900">{transaction.name}</p>
            {showBusiness && transaction.business && (
              <p className="text-xs text-gray-300 font-thin">{transaction.business}</p>
            )}
          </div>
        </div>
      </td>

      {/* Type Column */}
      <td className="py-4 text-center">
        <span className="text-sm text-gray-300 capitalize">{transaction.type}</span>
      </td>

      {/* Amount Column */}
      <td className={`py-4 ${centerAlignAmount ? "text-center" : "text-center"}`}>
        <span className="font-bold text-sm">{formatCurrency(transaction.amount, transaction.currency)}</span>
      </td>

      {/* Date Column */}
      <td className="py-4 text-center">
        <span className="text-sm text-gray-300">
          {formatDate(transaction.date).replace(",", "")}
        </span>
      </td>
    </tr>
  )
}
