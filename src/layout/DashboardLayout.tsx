import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import type { DashboardLayoutProps } from "../types"


export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
      <div className="flex-1 flex flex-col lg:pl-64 w-full min-w-0 h-full">
        <Header title={title} onMenuClick={toggleMobileSidebar} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden w-full">{children}</main>
      </div>
    </div>
  )
}
