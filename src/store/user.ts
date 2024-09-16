import { User } from 'types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserState {
  token: string
  user: Partial<User>
  setToken: (token: string) => void
  setUserInfo: (user: Partial<User>) => void
  clearLogin: () => void
}

const defaultUserState: Pick<UserState, 'token' | 'user'> = {
  token: '',
  user: {},
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      ...defaultUserState,
      setToken: (token) => set({ token }),
      setUserInfo: (user) => set((state) => ({ user: { ...state.user, ...user } })),
      clearLogin: () => {
        set({ ...defaultUserState })
      },
    }),
    {
      name: 'user',
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => ['token'].includes(key))),
    },
  ),
)
