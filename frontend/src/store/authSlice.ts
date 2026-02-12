import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import api from '../api/axios'
import type { User } from '../types/auth'

type AuthState = {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  status: 'idle' | 'checking'
}

const initialToken = localStorage.getItem('token')

const initialState: AuthState = {
  token: initialToken,
  user: null,
  isAuthenticated: Boolean(initialToken),
  status: 'idle',
}

export const validateToken = createAsyncThunk<User, void>(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<{ data: User }>('/api/v1/auth')

      if (!response.data?.data?.id) {
        localStorage.removeItem('token')
        return rejectWithValue('invalid_token')
      }

      return response.data.data
    } catch {
      localStorage.removeItem('token')
      return rejectWithValue('invalid_token')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
    },
    clearAuth: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.status = 'checking'
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(validateToken.rejected, (state) => {
        state.status = 'idle'
        state.token = null
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export const { setToken, clearAuth } = authSlice.actions
export default authSlice.reducer
