import { Box, Button, Group, LoadingOverlay, Select, TextInput } from '@mantine/core'
import { addUser, genderValues, putUser, userEntitySchema, userQueryOptions } from '~/api'
import { useAdminForm } from '~/hooks'

interface IUserFormProps {
  userId?: number
}

export function UserForm({ userId }: IUserFormProps) {
  const { form, isLoading, handleSubmitAction, query } = useAdminForm({
    mutationKey: ['user'],
    action: addUser,
    putAction: putUser,
    validateSchema: userEntitySchema,
    carray: userId,
    queryOptions: userQueryOptions,
  })

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={query.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
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
    </Box>
  )
}
