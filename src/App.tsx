import type React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import type { RootState } from "./store/store"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import ScheduledTransfersPage from "./pages/ScheduledTransfersPage"
import Invoices from "./pages/Invoices"
import Wallets from "./pages/Wallets"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import Help from "./pages/Help"

const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />
}

function App() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    console.log("[v0] App - isAuthenticated:", isAuthenticated)
    console.log("[v0] App - user:", user)
    console.log("[v0] App - token:", localStorage.getItem("token"))
  }, [isAuthenticated, user])


  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
         <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
           <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions/scheduled"
        element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ScheduledTransfersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoices"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Invoices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallets"
        element={
           <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Wallets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
           <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help"
        element={
       <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Help />
          </ProtectedRoute>
        }
      />

      {/* Default Routes */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />} />
    </Routes>
  )
}

export default App
