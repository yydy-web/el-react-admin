import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_nesting/nesting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/_nesting/nesting/"!</div>
}
