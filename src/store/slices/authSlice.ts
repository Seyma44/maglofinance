import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "../../services/api"
import toast from "react-hot-toast"
import type { User, AuthState, AuthResponse, ApiError } from "../../types"

const getUserFromStorage = (): User | null => {
  try {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

const initialState: AuthState = {
  user: getUserFromStorage(),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
}

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      await authAPI.signUp(credentials)

      const loginResponse = await authAPI.signIn({
        email: credentials.email,
        password: credentials.password,
      })
      return loginResponse.data as AuthResponse
    } catch (error: unknown) {
      const apiError = error as ApiError
      const errorMessage = apiError.response?.data?.message || "Sign up failed. Please try again."
      return rejectWithValue(errorMessage)
    }
  },
)

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.signIn(credentials)
      return response.data as AuthResponse
    } catch (error: unknown) {
      const apiError = error as ApiError
      const errorMessage = apiError.response?.data?.message || "Invalid email or password. Please try again."
      return rejectWithValue(errorMessage)
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authAPI.logout()
    return true
  } catch (error: unknown) {
    const apiError = error as ApiError
    return rejectWithValue(apiError.response?.data?.message || "Logout failed")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    clearAuth: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false
        state.isAuthenticated = true

        const userData = action.payload.data?.user || action.payload.user
        const accessToken = action.payload.data?.accessToken || action.payload.accessToken

        state.user = userData || null
        if (accessToken) {
          localStorage.setItem("token", accessToken)
        }
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData))
        }
        toast.success("Account created successfully!")
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        toast.error(action.payload as string)
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false
        state.isAuthenticated = true

        const userData = action.payload.data?.user || action.payload.user
        const accessToken = action.payload.data?.accessToken || action.payload.accessToken

        state.user = userData || null
        if (accessToken) {
          localStorage.setItem("token", accessToken)
        }
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData))
        }
        toast.success("Welcome back!")
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        toast.error(action.payload as string)
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out successfully")
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null
        state.isAuthenticated = false
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      })
  },
})

export const { setCredentials, clearAuth } = authSlice.actions
export const logout = clearAuth
export default authSlice.reducer
