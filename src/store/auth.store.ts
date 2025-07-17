import type { ILoginRes, IMenuSchema, IUserInfo } from '~/api'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { userInfoQueryOptions } from '~/api'
import { menuQueryOption } from '~/api/module/menu'
import { queryClient } from '.'
import { useCacheStore } from './cache.store'

interface States {
  userInfo?: IUserInfo
  menuList: IMenuSchema[]
}

interface Actions {
  loginUser: (res: ILoginRes) => void
  menuUser: () => Promise<void>
  infoUser: () => Promise<void>
  logoutUser: () => void
}

function initAuthStore() {
  return {
    userInfo: undefined,
  } as States
}

export const useAuthStore = create<States & Actions>()(
  devtools(
    immer((set, get) => ({
      ...initAuthStore(),
      loginUser: async (res: ILoginRes) => {
        const cacheStore = useCacheStore.getState()
        cacheStore.setToken(res.token)
        get().menuUser()
        set((state) => {
          state.userInfo = res.userInfo
        })
      },
      infoUser: async () => {
        const data = await queryClient.ensureQueryData(userInfoQueryOptions)
        await get().menuUser()
        set((state) => {
          state.userInfo = data.user
        })
      },
      async menuUser() {
        const menuList = await queryClient.ensureQueryData(menuQueryOption)
        set((state) => {
          state.menuList = menuList
        })
      },
      logoutUser: () => {
        const cacheStore = useCacheStore.getState()
        const initStore = initAuthStore()
        set((state) => {
          state.userInfo = initStore.userInfo
          cacheStore.removeToken()
        })
      },
    })),
    { name: 'auth' },
  ),
)
