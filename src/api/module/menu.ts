import type { IMenuSchema } from './menu.type'
import { queryOptions } from '@tanstack/react-query'
import { fetchClient } from '../fetch'

export function menuBuild() {
  return fetchClient.get<IMenuSchema[]>('/api/menus/build')
}

export const menuQueryOption = queryOptions({
  queryKey: ['menuBuild'],
  queryFn: menuBuild,
})
