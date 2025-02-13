import type { MRT_PaginationState } from 'mantine-react-table'

export interface IQueryPagerParams {
  globalFilter: string
  pagination: MRT_PaginationState
}

export interface IFetchPagerParams {
  limit: number
  skip: number
  q?: string
}

export interface IResponsePager<T> {
  users: T[]
  skip: number
  total: number
}
