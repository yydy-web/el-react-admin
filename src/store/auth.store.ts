import type { ILoginRes, LoginRes } from '~/api'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { userMeQueryOptions } from '~/api'
import { queryClient } from '.'
import { useCacheStore } from './cache.store'

interface States {
  userInfo?: Omit<LoginRes, 'accessToken'>
}

interface Actions {
  loginUser: (res: ILoginRes) => void
  infoUser: () => Promise<void>
  logoutUser: () => void
  setUser: (info: Required<States>['userInfo']) => void
}

function initAuthStore() {
  return {
    userInfo: undefined,
  } as States
}

export const useAuthStore = create<States & Actions>()(
  devtools(
    immer(set => ({
      ...initAuthStore(),
      loginUser: async (res: ILoginRes) => {
        const cacheStore = useCacheStore.getState()
        cacheStore.setToken(res.token)
      },
      async infoUser() {
        const data = await queryClient.ensureQueryData(userMeQueryOptions())
        set((state) => {
          state.userInfo = data
        })
      },
      logoutUser: () => {
        const cacheStore = useCacheStore.getState()
        set((state) => {
          const initStore = initAuthStore()
          state.userInfo = initStore.userInfo
          cacheStore.removeToken()
        })
        window.location.reload()
      },
      setUser: async (info: Required<States>['userInfo']) => {
        set((state) => {
          state.userInfo = info
        })
      },
    })),
    { name: 'auth' },
  ),
)
