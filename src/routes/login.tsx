import type { ILoginForm } from '~/api'
import { Button, Center, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'
import { LoginFormSchema, useLoginMutation } from '~/api'
import { useAuthStore } from '~/store'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  component: RouteComponent,
  beforeLoad({ context: { cookie }, search }) {
    // 校验用户是否登录跳转
    if (cookie) {
      throw redirect({ to: search.redirect || '/page' })
    }
  },
})

function RouteComponent() {
  const router = useRouter()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const { loginUser } = useAuthStore()
  const form = useForm<ILoginForm>({
    initialValues: {
      username: 'admin',
      password: '123456',
    },
    validate: zod4Resolver(LoginFormSchema),
  })

  const { mutateAsync, isPending } = useLoginMutation()

  async function handleSubmitLogin({ username, password }: ILoginForm) {
    const res = await mutateAsync({ username, password })
    loginUser(res)
    await router.invalidate()
    await navigate({ to: search.redirect || '/page' })
  }

  return (
    <Center h={800}>
      <form className=" w-[300px]" onSubmit={form.onSubmit(handleSubmitLogin)}>
        <TextInput
          withAsterisk
          label="用户名"
          placeholder="请输入用户名"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />

        <TextInput
          mt="md"
          withAsterisk
          label="密码"
          placeholder="请输入密码"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Button type="submit" mt="md" fullWidth loading={isPending}>登录</Button>
      </form>
    </Center>
  )
}
