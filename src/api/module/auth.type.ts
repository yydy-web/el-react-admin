import * as z from 'zod'

export const LoginFormSchema = z.object({
  password: z.string(),
  username: z.string(),
})

export const LoginResSchema = z.object({
  token: z.string(),
})

export type ILoginForm = z.infer<typeof LoginFormSchema>
export type ILoginRes = z.infer<typeof LoginResSchema>
