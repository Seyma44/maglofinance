import { useEffect, useState } from "react"
import { CiWifiOn, FaEllipsisH } from "../assets/icons/icon"
import chipImage from "../assets/chip.png"
import { SkeletonLoader, EmptyState } from "../components/common"
import { formatCardNumber, maskCardNumber } from "../utils/formatters"
import { useWalletCards } from "../hooks/useFinancialData"

  const MastercardLogo = () => (
    <div className="flex flex-col items-center">
      <div className="flex -space-x-2">
        <div className="w-6 h-6 rounded-full bg-red-600" />
        <div className="w-6 h-6 rounded-full bg-orange-400" />
      </div>
      <span className="text-white text-[9px] font-medium tracking-tight mt-0.5 leading-none">
        mastercard
      </span>
    </div>
  )

  const VisaLogo = () => (
    <div className="bg-blue-950 px-0.5 pb-0.5 pr-1">
      <span className="text-white font-bold text-xs italic tracking-tight">VISA</span>
    </div>
  )
  const ContactlessIcon = ({ dark = false }: { dark?: boolean }) => (
    <CiWifiOn className={`w-9 h-9 ${dark ? "text-gray-700" : "text-gray-800"} rotate-90`} />
  )

export default function WalletSection() {
  const { data: walletCards = [], isLoading } = useWalletCards()
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (initialLoading || isLoading) return <SkeletonLoader height="h-80" />

  if (!walletCards || walletCards.length === 0) {
    return (
      <EmptyState
        title="Wallet"
        message="No cards found"
        description="You don't have any cards in your wallet."
        containerClassName="bg-white rounded-2xl p-6"
        contentClassName="text-center py-12"
      />
    )
  }

  const formatExpiryDate = (month: number, year: number) =>
    `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`

  const getNetworkLogo = (network: string) => {
    if (network.toLowerCase() === "mastercard") return <MastercardLogo />
    if (network.toLowerCase() === "visa") return <VisaLogo />
    return <MastercardLogo /> 
  }

  return (
     <div className="bg-white rounded-2xl p-6 fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Wallet</h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Wallet options">
          <FaEllipsisH className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-center">
        <div className="relative h-80 w-full max-w-[360px]">
        {/* Dark Card  */}
          {walletCards[0] && (
            <div
              className="top-0 left-0 w-full max-w-[360px] h-[210px] rounded-2xl px-7 py-3.5 text-white shadow-lg z-10 relative card-tilt-hover"
              style={{
                background: "linear-gradient(to right, #4A4A49, #20201F)",
              }}
            >
              <div className="flex items-center mb-5">
                <span className="font-semibold text-white text-lg">Maglo.</span>
                <span className="mx-2 font-normal text-gray-500">|</span>
                <span className="text-gray-500 text-xs font-medium whitespace-nowrap">
                  {walletCards[0].bank?.split("|")[1]?.trim() || ""}
                </span>
              </div>

              <div className="flex items-center justify-between mb-5">
                <img src={chipImage} alt="Card Chip" className="w-10 h-7 object-contain" />
                <ContactlessIcon dark />
              </div>

              <p className="font-mono text-lg text-white font-bold">
                {formatCardNumber(walletCards[0].cardNumber)}
              </p>

              {/* Network logo from API */}
              <div className="absolute bottom-3 right-5">
               <MastercardLogo />
              </div>
            </div>
          )}

        {/* Glass Card  */}
        {walletCards[1] && (
          <div
            className="absolute top-[146px] left-5 w-full max-w-[320px]  h-[180px] rounded-2xl px-5 py-3 z-20 shadow-md border border-white/10 card-vibrate-hover"
            style={{
              background: "linear-gradient(45deg, rgba(25,25,25,0.05) 0%, rgba(220,220,220,0.4) 100%)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
          <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="font-semibold text-white text-lg">Maglo.</span>
            <span className="mx-2 text-white font-normal">|</span>
            <span className="text-white text-xs font-medium whitespace-nowrap">
              {walletCards[1].bank?.split("|")[1]?.trim() || ""}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <img src={chipImage} alt="Card Chip" className="w-10 h-7 object-contain" />
          <ContactlessIcon />
        </div>

        <p className="font-mono text-lg text-gray-800 font-semibold">
          {maskCardNumber(walletCards[1].cardNumber)}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium font-mono text-sm">
            {formatExpiryDate(walletCards[1].expiryMonth, walletCards[1].expiryYear)}
          </span>
          {getNetworkLogo(walletCards[1].network)}
        </div>
          </div>
        )}

        {walletCards.length === 1 && (
          <div
            className="absolute top-[130px] left-3 w-full max-w-[280px] rounded-2xl p-5 z-20 shadow-xl border border-white/40 opacity-50 flex items-center justify-center h-[165px]"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(240,240,240,0.6) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            <span className="text-gray-400">Add another card</span>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
