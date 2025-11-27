import { useState, useRef, useEffect, useCallback } from "react"
import { FiChevronDown } from "../../assets/icons/icon"
import type { DropdownItem, DropdownProps } from "../../types"

export default function Dropdown({
  items,
  selected,
  onSelect,
  trigger,
  buttonClassName = "flex items-center gap-2.5 px-4 py-2 bg-zinc-50 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors",
  menuClassName = "absolute right-0 top-full mt-1 bg-white border border-gray-50 rounded-lg shadow-lg z-20 min-w-[140px]",
  itemClassName = "w-full text-left px-4 py-2 text-sm hover:bg-zinc-50 first:rounded-t-lg last:rounded-b-lg",
  selectedItemClassName = "text-secondary font-medium bg-gray-50",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const handleItemClick = useCallback((item: DropdownItem) => {
    if (item.onClick) {
      item.onClick()
    }
    if (onSelect) {
      onSelect(item)
    }
    setIsOpen(false)
  }, [onSelect])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          event.preventDefault()
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          break
        case "Enter":
        case " ":
          event.preventDefault()
          handleItemClick(items[focusedIndex])
          break
        case "Escape":
          event.preventDefault()
          setIsOpen(false)
          break
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, focusedIndex, items, handleItemClick])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      {trigger ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setIsOpen(!isOpen)
            }
          }}
        >
          {trigger}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${buttonClassName} focus:outline-none focus:ring-2 focus:ring-primary/50`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selected?.label || "Select"}
          <FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />

          {/* Menu Items */}
          <div className={menuClassName} role="listbox" ref={menuRef}>
            {items.map((item, index) => (
              <button
                key={item.value}
                onClick={() => handleItemClick(item)}
                className={`${itemClassName} focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  selected?.value === item.value ? selectedItemClassName : "text-gray-700"
                } ${focusedIndex === index ? "bg-gray-100" : ""}`}
                role="option"
                aria-selected={selected?.value === item.value}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
