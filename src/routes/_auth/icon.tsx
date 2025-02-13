import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/icon')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/icon"!
      <div className=" space-x-2">
        <i className=" icon-[custom--anq] text-red-300"></i>
        <i className=" icon-[custom--backup] text-red-300"></i>
      </div>
    </div>
  )
}
