import type { LoginParams } from '~/api'
import { Button, Center, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
import { loginParamsSchema } from '~/api'
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
  const auth = useAuthStore()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const form = useForm<LoginParams>({
    initialValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
    validate: zodResolver(loginParamsSchema),
  })

  const action = useMutation({
    mutationKey: ['login'],
    mutationFn: (params: LoginParams) => auth.loginUser({ ...params, username: 'emilys', password: 'emilyspass' }),
  })

  async function handleSubmitLogin({ username, password }: LoginParams) {
    await action.mutateAsync({ username, password })
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

        <Button type="submit" mt="md" fullWidth loading={action.isPending}>登录</Button>
      </form>
    </Center>
  )
}
