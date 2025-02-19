import { createFileRoute } from '@tanstack/react-router'
import { UserForm } from './-components/Form'

export const Route = createFileRoute('/_auth/form/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <UserForm userId={+id} />
}
