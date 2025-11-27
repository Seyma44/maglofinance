
import { StrictMode, lazy, Suspense, type ComponentType } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { store } from './store/store'
import LoadingSpinner from './components/common/LoadingSpinner'
import MinimumLoadTime from './components/SuspenseLoader'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ErrorBoundary } from './components/common'

const App = lazy(() => import("./App") as Promise<{ default: ComponentType<unknown> }>)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, 
      gcTime: 10 * 60 * 1000, 
      refetchOnWindowFocus: false, 
    },
  },
})

const toastConfig = {
  position: 'top-right' as const,
  toastOptions: {
    duration: 3000,
    style: {
      background: '#fff',
      color: '#1A1A1A',
      border: '1px solid #E8E8E8',
    },
    success: {
      iconTheme: {
        primary: '#C5F82A',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#EF4444',
        secondary: '#fff',
      },
    },
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <MinimumLoadTime delay={600}>
                <App />
              </MinimumLoadTime>
            </Suspense>
            <Toaster {...toastConfig} />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
