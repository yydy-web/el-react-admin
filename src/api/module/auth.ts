import type { ILoginForm, ILoginRes } from './auth.type'
import { mutationOptions, queryOptions, useMutation } from '@tanstack/react-query'
import { fetchClient } from '~/api/fetch'

export function login(data: ILoginForm) {
  return fetchClient.post<ILoginRes>('/auth/app/login', data)
}

export function userInfo() {
  return fetchClient.get<{ user: ILoginRes['userInfo'] }>('/auth/info')
}

export const userInfoQueryOptions = queryOptions({
  queryKey: ['userInfo'],
  queryFn: userInfo,
})

export const loginMutationOption = mutationOptions({
  mutationKey: ['login'],
  mutationFn: login,
})

export function useLoginMutation() {
  return useMutation(loginMutationOption)
}
