import { Button, Group, Select, TextInput } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { addUser, genderValues, putUser, userEntitySchema, userQueryOptions } from '~/api'
import { useAdminForm } from '~/hooks'
import { useAuthStore } from '~/store'

export const Route = createFileRoute('/_auth/form')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userInfo } = useAuthStore()
  const [userId, setUserId] = useState<number>()

  const { form, isLoading, handleSubmitAction, query } = useAdminForm({
    mutationKey: ['user'],
    action: addUser,
    putAction: putUser,
    validateSchema: userEntitySchema,
    carray: userId,
    queryOptions: userQueryOptions,
  })

  function getCurrentUser() {
    setUserId(userInfo?.id)
  }

  return (
    <div>
      <Button onClick={getCurrentUser} loading={query.isLoading}>
        获取当前用户登录信息
      </Button>
      <form onSubmit={form.onSubmit(handleSubmitAction)}>
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="firstName..."
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />

        <TextInput
          withAsterisk
          label="lastName"
          placeholder="lastName..."
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email..."
          key={form.key('email')}
          {...form.getInputProps('email')}
        />

        <Select
          label="gender"
          placeholder="gender..."
          data={genderValues}
          key={form.key('gender')}
          {...form.getInputProps('gender')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={isLoading} fullWidth>新增</Button>
        </Group>
      </form>
    </div>
  )
}
