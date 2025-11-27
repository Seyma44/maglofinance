import axios from "axios"

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isAuthEndpoint = error.config?.url?.includes("/users/login") ||
                          error.config?.url?.includes("/users/register")

    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/signin"
    }
    return Promise.reject(error)
  },
)

export const authAPI = {
  signUp: (data: { name: string; email: string; password: string }) =>
    apiClient.post("/users/register", {
      fullName: data.name,
      email: data.email,
      password: data.password,
    }),
  signIn: (data: { email: string; password: string }) =>
    apiClient.post("/users/login", {
      email: data.email,
      password: data.password,
    }),
  logout: () => apiClient.post("/users/logout"),
  getProfile: () => apiClient.get("/users/profile"),
  refreshToken: () => apiClient.post("/users/refresh-token"),
}

export const dashboardAPI = {
  getSummary: () => apiClient.get("/financial/summary"),
  getRecentTransactions: (limit = 20) => apiClient.get("/financial/transactions/recent", { params: { limit } }),
  getWorkingCapital: () => apiClient.get("/financial/working-capital"),
  getWalletCards: () => apiClient.get("/financial/wallet"),
  getScheduledTransfers: () => apiClient.get("/financial/transfers/scheduled"),
}

export default apiClient
