import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import {
  FaExchangeAlt,
  FaCog,
  IoWallet,
  TbHelpSquareFilled,
  FaFileInvoiceDollar,
  IoLogOut,
  RiHome5Fill,
  HiX,
} from "../assets/icons/icon"

import { logoutUser } from "../store/slices/authSlice"
import type { AppDispatch } from "../store/store"
import Logo from "./common/Logo"
import LoadingSpinner from "./common/LoadingSpinner"
import type { SidebarProps } from "../types"

const menuItems = [
  { icon: RiHome5Fill, label: "Dashboard", path: "/dashboard" },
  { icon: FaExchangeAlt, label: "Transactions", path: "/transactions" },
  { icon: FaFileInvoiceDollar, label: "Invoices", path: "/invoices" },
  { icon: IoWallet, label: "My Wallets", path: "/wallets" },
  { icon: FaCog, label: "Settings", path: "/settings" },
]

export default function Sidebar({ isOpen = false, onClose = () => {} }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    onClose()

    await dispatch(logoutUser())
    await new Promise(resolve => setTimeout(resolve, 800))

    navigate("/signin")
    setIsLoggingOut(false)
  }

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const isActive = (path: string) => {
    if (path === "/dashboard" || path === "/transactions") {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} aria-hidden="true" />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-[#fafafa] transition-transform duration-300 lg:translate-x-0 lg:z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col px-2.5">
          <div className="flex h-16 items-center justify-between px-5 lg:mt-2 ">
            <Logo />
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close menu"
            >
              <HiX className="h-5 w-5 text-gray-900" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              const textColor = active ? "text-gray-900" : "text-gray-300"
              const bgColor = active ? "bg-primary" : "hover:bg-gray-100"

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${bgColor} ${textColor}`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={`h-5 w-5 ${textColor}`} />
                  <span className={textColor}>{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="p-4 space-y-1 mb-20">
            {/* Help Button */}
            <button
              onClick={() => handleNavigate("/help")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                location.pathname === "/help"
                  ? "bg-primary text-gray-900"
                  : "text-gray-300 hover:bg-gray-100 hover:text-gray-900"
              }`}
              aria-current={location.pathname === "/help" ? "page" : undefined}
            >
              <TbHelpSquareFilled
                className={`h-5 w-5 ${location.pathname === "/help" ? "text-gray-900" : "text-gray-300"}`}
              />
              <span className={`${location.pathname === "/help" ? "text-gray-900" : "text-gray-300"}`}>Help</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoLogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Loading Overlay */}
      {isLoggingOut && <LoadingSpinner fullScreen />}
    </>
  )
}
