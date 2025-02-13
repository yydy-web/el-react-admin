import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/about/name/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about/name/"!</div>
}
