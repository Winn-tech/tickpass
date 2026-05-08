import { create } from 'zustand'

export interface User {
  id: string
  firstName?: string
  lastName?: string
  businessName?: string
  email: string
  phoneNumber: string
  userType: 'personal' | 'business'
}

interface AuthStore {
  user: User | null
  isAuthReady: boolean
  setUser: (user: User | null) => void
  clearUser: () => void
  setAuthReady: (value: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthReady: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setAuthReady: (value) => set({ isAuthReady: value }),
}))
