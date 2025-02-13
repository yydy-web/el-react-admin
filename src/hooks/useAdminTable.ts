import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { MRT_ColumnDef, MRT_PaginationState, MRT_RowData, useMantineReactTable } from "mantine-react-table"
import { useState } from "react"
import { IQueryPagerParams } from "~/api"

export function useAdminTable<T  extends MRT_RowData>(columns: MRT_ColumnDef<T>[], fn: (params: IQueryPagerParams) => UseQueryOptions<T>) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isFetching, isLoading } = useQuery(fn({
    globalFilter,
    pagination,
  }))

  const dataSource = (data?.users ?? []) as unknown as T[]
  const total = data?.total ?? 0

  const table = useMantineReactTable<T>({
    columns,
    data: dataSource,
    enableColumnResizing: true,
    initialState: { showColumnFilters: false },
    manualSorting: false,
    manualFiltering: false,
    manualPagination: true,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    enableColumnOrdering: true,
    rowCount: total,
    state: {
      globalFilter,
      isLoading,
      pagination,
      showProgressBars: isFetching,
    },
  })

  return table
}