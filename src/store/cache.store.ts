import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface States {
  userToken?: string
}

interface Actions {
  setToken: (token: string) => void
  removeToken: () => void
}

const CACHE_KEY = 'react_cache'

export const useCacheStore = create<States & Actions>()(
  persist(
    immer(set => ({
      userToken: '',
      setToken: (token: string) =>
        set((state) => {
          state.userToken = token
        }),
      removeToken: () => {
        set((state) => {
          state.userToken = undefined
        })
      },
    })),
    {
      name: CACHE_KEY,
      version: 1,
    },
  ),
)
