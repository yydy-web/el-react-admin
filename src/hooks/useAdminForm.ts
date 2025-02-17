import type { UseQueryOptions } from '@tanstack/react-query'
import type { ZodSchema } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash-es'
import { useEffect } from 'react'

export interface IUseAdminFormOptions<T extends Record<string, any>> {
  mutationKey: Parameters<typeof useMutation>[0]['mutationKey']
  action: (data: T) => Promise<unknown>
  putAction?: (data: T) => Promise<unknown>
  initValue?: Partial<T>
  validateSchema?: ZodSchema<Record<string, any>>
  carray?: number
  queryOptions?: (id?: number) => UseQueryOptions<T>
}

export function useAdminForm<T extends Record<string, any>>(options: IUseAdminFormOptions<T>) {
  const form = useForm<T>({
    mode: 'uncontrolled',
    initialValues: {
      ...options.initValue,
    } as T,
    validate: options.validateSchema
      ? zodResolver(options.validateSchema)
      : undefined,
  })

  const addUserAction = useMutation({
    mutationKey: [options.mutationKey, 'form', isEmpty(options.carray) ? 'save' : 'put'],
    mutationFn: async (values: T) => {
      if (options.putAction && options.carray) {
        options.putAction(values)
        return
      }
      options.action(values)
    },
  })

  const query = useQuery(options.queryOptions
    ? options.queryOptions(options.carray)
    : {
      queryKey: ['useAdminForm', options.carray],
      enabled: false,
    })

  useEffect(() => {
    if (query.data) {
      form.setValues({
        ...query.data,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data])

  async function handleSubmitAction(values: T) {
    await form.validate()
    await addUserAction.mutateAsync(values)
  }

  return {
    query,
    form,
    isLoading: addUserAction.isPending,
    handleSubmitAction,
  }
}
