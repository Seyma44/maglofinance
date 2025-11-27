import { useState, useRef, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaUser, FaTimes, FaSortDown, LuSearch, BiSolidBell, IoLogOut, HiMenu } from "../assets/icons/icon"
import type { RootState, AppDispatch } from "../store/store"
import { logoutUser } from "../store/slices/authSlice"
import { Button } from "../components/common"
import LoadingSpinner from "./common/LoadingSpinner"
import type { HeaderProps } from "../types"

const searchableItems = [
  { label: "Dashboard", path: "/dashboard", keywords: ["home", "overview", "main"] },
  { label: "Transactions", path: "/transactions", keywords: ["payments", "transfers", "history"] },
  { label: "Scheduled Transfers", path: "/transactions/scheduled", keywords: ["scheduled", "recurring", "automatic"] },
  { label: "Invoices", path: "/invoices", keywords: ["bills", "receipts", "documents"] },
  { label: "My Wallets", path: "/wallets", keywords: ["accounts", "balance", "money"] },
  { label: "Settings", path: "/settings", keywords: ["preferences", "account", "configuration"] },
  { label: "Profile", path: "/profile", keywords: ["user", "personal", "info"] },
  { label: "Help", path: "/help", keywords: ["support", "faq", "assistance"] },
]

export default function Header({ title = "Dashboard", onMenuClick }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const trimmedSearch = searchQuery.trim().toLowerCase()

  const searchResults = useMemo(() => {
    if (!trimmedSearch) return []

    return searchableItems.filter((item) => {
      const labelMatch = item.label.toLowerCase().includes(trimmedSearch)
      const keywordMatch = item.keywords.some((keyword) => keyword.toLowerCase().includes(trimmedSearch))
      return labelMatch || keywordMatch
    })
  }, [trimmedSearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      const isMobile = window.innerWidth < 768
      if (!isMobile && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setIsSearchOpen(true)
      }
      if (event.key === "Escape") {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setIsDropdownOpen(false)

    await dispatch(logoutUser())

    await new Promise((resolve) => setTimeout(resolve, 800))

    navigate("/signin")
    setIsLoggingOut(false)
  }

  const handleSearchSelect = (path: string) => {
    navigate(path)
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex h-16 items-center gap-3 px-4 border-b border-gray-50">
            <button
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery("")
              }}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg"
              aria-label="Close search"
            >
              <FaTimes className="h-5 w-5 text-gray-900" />
            </button>
            <div className="flex-1 relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                autoFocus
              />
            </div>
          </div>

          <div className="p-4">
            {trimmedSearch ? (
              searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleSearchSelect(item.path)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <LuSearch className="h-4 w-4 text-gray-400" />
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-gray-500">No results found for "{trimmedSearch}"</div>
              )
            ) : (
              <div className="text-center py-8 text-sm text-gray-400">Start typing to search...</div>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-white">
        <div className="flex h-16 items-center justify-between px-3 lg:px-8">
          <div className="flex items-center gap-3 flex-1">
            <Button variant="ghost" onClick={onMenuClick} className="lg:hidden p-2" aria-label="Open menu">
              <HiMenu className="h-6 w-6 text-gray-900" />
            </Button>
            <h1 className="text-xl sm:text-2xl font-medium text-gray-900 truncate">{title}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-2">
            <div className="relative hidden md:block" ref={searchRef}>
              {!isSearchOpen ? (
                <Button variant="ghost" onClick={() => setIsSearchOpen(true)} aria-label="Search">
                  <LuSearch className="h-6 w-6" color="#929EAE" />
                </Button>
              ) : (
                <div className="relative">
                  <div className="flex items-center">
                    <div className="relative">
                      <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search pages..."
                        className="w-64 pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                          aria-label="Clear search"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {trimmedSearch && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-50 py-2 z-50">
                      {searchResults.length > 0 ? (
                        searchResults.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleSearchSelect(item.path)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            <LuSearch className="h-3 w-3 text-gray-400" />
                            {item.label}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                          No results found for "{trimmedSearch}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button variant="ghost" className="relative" aria-label="Notifications">
              <BiSolidBell className="h-6 w-6" color="#929EAE" />
            </Button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 sm:gap-3 rounded-full pl-2 pr-2 sm:pr-3 py-2 bg-zinc-50 hover:bg-gray-100 transition-colors"
                aria-label="User menu"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white text-sm font-medium">
                  {user?.fullName?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden md:block text-sm font-semibold text-gray-900 ">{user?.fullName || "User"}</span>
                <FaSortDown
                  className={`hidden sm:block h-4 w-4 text-gray-600 transition-transform mb-1.5 ml-2 ${isDropdownOpen ? "-rotate-90 mt-1" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-50 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-sm font-medium text-gray-900">{user?.fullName || "User"}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user?.email || "user@example.com"}</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSearchOpen(true)
                      setIsDropdownOpen(false)
                    }}
                    className="flex md:hidden w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <LuSearch className="h-4 w-4" />
                    Search
                  </button>

                  <button
                    onClick={() => {
                      navigate("/profile")
                      setIsDropdownOpen(false)
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <FaUser className="h-4 w-4" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoLogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {isLoggingOut && <LoadingSpinner fullScreen />}
    </>
  )
}
