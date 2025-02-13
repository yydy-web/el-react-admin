import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '~/store'

export const Route = createFileRoute('/_auth/page')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userInfo } = useAuthStore()

  return (
    <div>
      Hello "/_auth/page"
      { userInfo?.gender }
    </div>
  )
}
