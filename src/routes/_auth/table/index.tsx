import type { MRT_ColumnDef } from 'mantine-react-table'
import type { IUserEntity } from '~/api'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  MantineReactTable,
} from 'mantine-react-table'
import { Button } from '@mantine/core'
import { useMemo } from 'react'
import { useQueryPager2Options } from '~/api'
import { useAdminTable } from '~/hooks'

export const Route = createFileRoute('/_auth/table/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const columns = useMemo<MRT_ColumnDef<IUserEntity>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
      },
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
      {
        accessorKey: 'action',
        header: 'action',
        Cell: ({ row }) => {
          return (
            <div>
              <Button onClick={() => {
                navigate({ to: '/form/edit/$id', params: { id: `${row.original.id}` } })
              }}>Edit</Button>
            </div>
          )
        }
      }
    ],
    [],
  )

  const table = useAdminTable<IUserEntity>(columns, useQueryPager2Options)

  return (
    <MantineReactTable table={table} />
  )
}
