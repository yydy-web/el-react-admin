import type { UseQueryOptions } from '@tanstack/react-query'
import type { IFetchPagerParams, IQueryPagerParams, IResponsePager } from './pager.type'
import { queryOptions } from '@tanstack/react-query'

export function createUseQueryPagerOptions<T>(
  userKey: string,
  userFn: (params: IFetchPagerParams) => Promise<IResponsePager<T>>,
  params: IQueryPagerParams,
) {
  const { pagination, globalFilter = '' } = params
  const { pageIndex, pageSize } = pagination

  return queryOptions({
    queryKey: [userKey, { pageIndex, pageSize, globalFilter }],
    queryFn: () => userFn({ limit: pageSize, skip: pageIndex * pageSize, q: globalFilter }),
  }) as UseQueryOptions<T>
}
