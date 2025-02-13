import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/user/')({
  component: RouteComponent,
})
function RouteComponent() {
  return (
    <div>
      user index
    </div>
  )
}
