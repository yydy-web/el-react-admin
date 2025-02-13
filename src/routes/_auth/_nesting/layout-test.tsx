import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_nesting/layout-test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_nesting/ this is layout-test"!</div>
}
