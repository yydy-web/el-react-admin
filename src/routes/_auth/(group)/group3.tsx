import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/(group)/group3')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/(group)/group3"!
      <Link to="/group2"> to group2</Link>
    </div>
  )
}
