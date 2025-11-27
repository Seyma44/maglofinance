import { useQuery } from "@tanstack/react-query"
import { dashboardAPI } from "../services/api"

export const useFinancialSummary = () => {
  return useQuery({
    queryKey: ["financial", "summary"],
    queryFn: async () => {
      const response = await dashboardAPI.getSummary()
      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
    retry: 2,
  })
}

export const useRecentTransactions = (limit = 20) => {
  return useQuery({
    queryKey: ["transactions", "recent", limit],
    queryFn: async () => {
      const response = await dashboardAPI.getRecentTransactions(limit)
      return response.data.data
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  })
}

export const useWorkingCapital = () => {
  return useQuery({
    queryKey: ["financial", "working-capital"],
    queryFn: async () => {
      const response = await dashboardAPI.getWorkingCapital()
      return response.data.data
    },
    staleTime: 10 * 60 * 1000, 
    gcTime: 30 * 60 * 1000, 
    retry: 2,
  })
}

export const useWalletCards = () => {
  return useQuery({
    queryKey: ["financial", "wallet"],
    queryFn: async () => {
      const response = await dashboardAPI.getWalletCards()
      // API returns { success: true, data: { cards: [...] } }
      return response.data.data?.cards || []
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  })
}

export const useScheduledTransfers = () => {
  return useQuery({
    queryKey: ["transfers", "scheduled"],
    queryFn: async () => {
      const response = await dashboardAPI.getScheduledTransfers()
      return response.data.data
    },
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  })
}
