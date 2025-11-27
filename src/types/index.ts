import type { ReactNode, InputHTMLAttributes, ButtonHTMLAttributes } from "react"

// ============================================================================
// REDUX TYPES
// ============================================================================

export type RootState = {
  auth: AuthState
}

export type AppDispatch = unknown 

// ============================================================================
// AUTH & USER TYPES
// ============================================================================

export interface User {
  id: string
  fullName: string
  email: string
  role?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

export interface AuthResponse {
  data?: {
    user?: User
    accessToken?: string
  }
  user?: User
  accessToken?: string
}


// ============================================================================
// DATA MODELS
// ============================================================================

export interface Transaction {
  id: string | number
  name: string
  business?: string
  type: string
  amount: number
  currency: string
  date: string
  image?: string
  status?: string
}

export interface ScheduledTransfer {
  id: string
  name: string
  image: string
  date: string
  amount: number
  currency: string
  status: string
}

export interface WalletCard {
  id: string
  name: string
  type: string
  cardNumber: string
  bank: string
  network: string
  expiryMonth: number
  expiryYear: number
  color: string
  isDefault: boolean
}

// ============================================================================
// COMPONENT PROPS - LAYOUT & STRUCTURE
// ============================================================================

export interface PageTransitionProps {
  children: ReactNode
}

export interface DashboardLayoutProps {
  children: ReactNode
  title: string
}

export interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export interface HeaderProps {
  title?: string
  onMenuClick: () => void
}

// ============================================================================
// COMPONENT PROPS - ERROR HANDLING & LOADING
// ============================================================================

export interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export interface ErrorBoundaryProps {
  children: ReactNode
}

export interface MinimumLoadTimeProps {
  children: ReactNode
  delay?: number
}

export interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
  fullScreen?: boolean
}

// ============================================================================
// COMPONENT PROPS - COMMON UI COMPONENTS
// ============================================================================

export interface AvatarProps {
  src?: string
  alt: string
  fallback: string
  size?: "sm" | "md" | "lg" | "xl"
  shape?: "square" | "circle"
  className?: string
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
  children: ReactNode
  className?: string
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  iconPosition?: "left" | "right"
  containerClassName?: string
  labelClassName?: string
}

export interface CardProps {
  children: ReactNode
  padding?: "none" | "sm" | "md" | "lg"
  shadow?: "none" | "sm" | "md" | "lg"
  border?: boolean
  className?: string
}

export interface DropdownItem {
  label: string
  value: string | number
  onClick?: () => void
}

export interface DropdownProps {
  items: DropdownItem[]
  selected?: DropdownItem
  onSelect?: (item: DropdownItem) => void
  trigger?: ReactNode
  buttonClassName?: string
  menuClassName?: string
  itemClassName?: string
  selectedItemClassName?: string
}

export interface EmptyStateProps {
  title?: string
  message: string
  description?: string
  icon?: ReactNode
  containerClassName?: string
  contentClassName?: string
  action?: ReactNode
}

export interface SkeletonLoaderProps {
  height?: string
  width?: string
  rounded?: string
  className?: string
}

export interface SectionHeaderProps {
  title: string
  action?: ReactNode
  className?: string
  titleClassName?: string
}

export interface TransactionRowProps {
  transaction: Transaction
  showBusiness?: boolean
  centerAlignAmount?: boolean
  className?: string
}

export interface ChartDataPoint {
  month: string
  income: number
  expense: number
  net: number
}

export interface TooltipPayloadItem {
  dataKey: string
  value: number
  payload?: ChartDataPoint
}

export interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  currency?: string
}

export interface CursorPoint {
  x: number
  y: number
}

export interface CustomCursorProps {
  points?: CursorPoint[]
  width?: number
  height?: number
  gradientId: string
}

export interface TooltipPayload {
  dataKey: string
  value: number
  payload?: ChartDataPoint
}

export interface CombinedTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  activeDotDataKey?: string | null
  currency?: string
  coordinate?: { x: number; y: number }
  viewBox?: { width: number; height: number }
}
