import type { UseQueryOptions } from '@tanstack/react-query'
import { queryOptions } from '@tanstack/react-query'

export function createUseQueryFindOptions<T>(
  queryKey: string,
  fn: (id: number) => Promise<T>,
  id?: number,
) {
  return queryOptions({
    enabled: !!id,
    queryKey: [queryKey, { id }],
    queryFn: () => fn(id!),
  }) as UseQueryOptions<T>
}
