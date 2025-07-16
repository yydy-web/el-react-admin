import type { ILoginForm, ILoginRes } from './auth.type'
import { useMutation } from '@tanstack/react-query'
import { fetchClient } from '~/api/fetch'

export function login(data: ILoginForm) {
  return fetchClient.post<ILoginRes>('/auth/app/login', data)
}

export function useLoginMutation() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  })
}
