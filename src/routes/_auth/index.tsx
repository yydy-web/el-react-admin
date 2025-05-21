import { createFileRoute } from '@tanstack/react-router'
import HelloMd from '../-components/Hello.mdx'
import DemoBlock from '~/docs/components/demo-block'
import * as React from 'react'

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
})

const components = {
  h1: () => <h1>value</h1>,
  DemoBlock
}

function RouteComponent() {
  return (
    <div className=" btn">
      <HelloMd components={components} />
      home page
    </div>
  )
}
