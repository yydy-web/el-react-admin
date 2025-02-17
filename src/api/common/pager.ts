import type { UseQueryOptions } from '@tanstack/react-query'
import type { IFetchPagerParams, IQueryPagerParams, IResponsePager } from './pager.type'
import { queryOptions } from '@tanstack/react-query'

export function createUseQueryPagerOptions<T>(
  pagerKey: string,
  pagerFn: (params: IFetchPagerParams) => Promise<IResponsePager<T>>,
  params: IQueryPagerParams,
) {
  const { pagination, globalFilter = '' } = params
  const { pageIndex, pageSize } = pagination

  return queryOptions({
    queryKey: [pagerKey, { pageIndex, pageSize, globalFilter }],
    queryFn: () => pagerFn({ limit: pageSize, skip: pageIndex * pageSize, q: globalFilter }),
  }) as UseQueryOptions<T>
}
