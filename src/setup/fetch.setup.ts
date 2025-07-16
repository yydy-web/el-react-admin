import { useAuthStore, useCacheStore } from '~/store'

export function fetchAuthIntercept(req: RequestInit) {
  const { userToken } = useCacheStore.getState()

  if (userToken) {
    req.headers = {
      ...(req.headers || {}),
      Authorization: `Bearer ${userToken}`,
    }
  }

  return req
}

export function fetchResponseIntercepet(res: Response) {
  if (res.status === 401) {
    useAuthStore.getState().logoutUser()
    throw new Error('unauthorized')
  }

  if (res.status !== 200) {
    throw new Error('error request')
  }
  return res
}
