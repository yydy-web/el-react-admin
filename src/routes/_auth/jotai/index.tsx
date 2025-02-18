import { createFileRoute } from '@tanstack/react-router'
import { atom, useAtom } from 'jotai'

export const Route = createFileRoute('/_auth/jotai/')({
  component: RouteComponent,
})

const textAtom = atom('hello')
const textLenAtom = atom(get => get(textAtom).length)
const uppercaseAtom = atom(get => get(textAtom).toUpperCase())

function Input() {
  const [text, setText] = useAtom(textAtom)
  return <input value={text} onChange={e => setText(e.target.value)} />
}

function CharCount() {
  const [len] = useAtom(textLenAtom)
  return (
    <div>
      Length:
      {len}
    </div>
  )
}

function Uppercase() {
  const [uppercase] = useAtom(uppercaseAtom)
  return (
    <div>
      Uppercase:
      {uppercase}
    </div>
  )
}

function RouteComponent() {
  return (
    <div>
      <Input />
      <CharCount />
      <Uppercase />
    </div>
  )
}
