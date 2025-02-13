import type { MRT_ColumnDef } from 'mantine-react-table'
import type { IUserEntity } from '~/api'
import { createFileRoute } from '@tanstack/react-router'
import {
  MantineReactTable,
} from 'mantine-react-table'
import { useMemo } from 'react'
import { useQueryPager2Options } from '~/api'
import { useAdminTable } from '~/hooks'

export const Route = createFileRoute('/_auth/table/')({
  component: RouteComponent,
})

function RouteComponent() {
  const columns = useMemo<MRT_ColumnDef<IUserEntity>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'firstName',
      },
      {
        accessorKey: 'lastName',
        header: 'lastName',
      },
      {
        accessorKey: 'email',
        header: 'email',
      },
      {
        accessorKey: 'gender',
        header: 'gender',
      },
    ],
    [],
  )

  const table = useAdminTable<IUserEntity>(columns, useQueryPager2Options)

  return (
    <MantineReactTable table={table} />
  )
}
