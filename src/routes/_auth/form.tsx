import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { addUser } from '~/api'

export const Route = createFileRoute('/_auth/form')({
  component: RouteComponent,
})

interface IUseAdminFormOptions {
  mutationKey: Parameters<typeof useMutation>[0]['mutationKey']
  action: (...args: any[]) => Promise<unknown>
}

function useAdminForm<T extends Record<string, any>>(options: IUseAdminFormOptions) {
  const addUserAction = useMutation({
    mutationKey: options.mutationKey,
    mutationFn: options.action,
  })

  const form = useForm<T>({
    initialValues: {
    } as T,
  })

  async function handleSubmitAction(data: T) {
    await addUserAction.mutateAsync(data)
  }
  return {
    form,
    isLoading: addUserAction.isPending,
    handleSubmitAction,
  }
}

function RouteComponent() {
  const { form, isLoading, handleSubmitAction } = useAdminForm({
    mutationKey: ['addUser'],
    action: addUser,
  })

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmitAction)}>
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="your@firstName.com"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={isLoading}>Submit</Button>
        </Group>
      </form>
    </div>
  )
}
