import { createFileRoute } from '@tanstack/react-router'
import { UserForm } from './-components/Form'

export const Route = createFileRoute('/_auth/form/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserForm />
}
