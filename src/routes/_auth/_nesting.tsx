import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_nesting')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="p-2">
      <div className="border-b">第一层嵌套路由</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
