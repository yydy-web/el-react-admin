import type { IFetchPagerParams, IQueryPagerParams } from '../common/pager.type'
import type { IUserEntity, IUserList, LoginParams, LoginRes } from './user.type'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { fetchClient } from '~/api/fetch'
import { createUseQueryFindOptions } from '../common'
import { createUseQueryPagerOptions } from '../common/pager'

const baseUrl = '/users'
/**
 * api
 */
export function fetchUserList() {
  return fetchClient.get<IUserList>(`${baseUrl}?limit=3`)
}

export function fetchUser(id: IUserEntity['id']) {
  return fetchClient.get<IUserEntity>(`${baseUrl}/${id}`)
}

const USER_PAGER_LIMIT = 10
export function fetchUserPager({ pageParam: offset }: { pageParam: number }): Promise<IUserList> {
  return fetchClient.get<IUserList>(`${baseUrl}?limit=${USER_PAGER_LIMIT}&skip=${offset}`)
}

export function fetchUserPager2(params: IFetchPagerParams) {
  return fetchClient.get<IUserList>(baseUrl, params)
}

export function loginUser(params: LoginParams) {
  return fetchClient.post<LoginRes>(`${baseUrl}/login`, params)
}

export async function getUserMe() {
  return fetchClient.get<LoginRes>(`${baseUrl}/me`)
}

export async function addUser(data: Omit<IUserEntity, 'id'>) {
  return fetchClient.post<void>(`${baseUrl}/add`, data)
}

export async function putUser(data: IUserEntity) {
  return fetchClient.put<void>(`${baseUrl}/put`, data)
}

/**
 * react query client
 */
export const userQueryListOptions = queryOptions({
  queryKey: ['user-list'],
  queryFn: fetchUserList,
})

export function userQueryOptions(id?: number) {
  return createUseQueryFindOptions('user-find', fetchUser, id)
}

export function useQueryPager2Options(params: IQueryPagerParams) {
  return createUseQueryPagerOptions('user-pager2', fetchUserPager2, params)
}

export const userQueryPagerOptions = infiniteQueryOptions({
  queryKey: ['user-pager'],
  queryFn: fetchUserPager,
  initialPageParam: 0,
  select(data) {
    return {
      pages: data.pages.map(item => item.users).flat(),
      pageParams: data.pageParams,
    }
  },
  getNextPageParam: (res, list) => {
    return res.total > list.map(item => item.users).flat().length
      ? (res.skip + USER_PAGER_LIMIT)
      : undefined
  },
})

export function userMeQueryOptions(enabled = false) {
  return queryOptions({
    queryKey: ['user-me'],
    queryFn: getUserMe,
    enabled,
  })
}
