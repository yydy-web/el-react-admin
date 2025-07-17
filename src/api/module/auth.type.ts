import * as z from 'zod'
import { UserInfoSchema } from './user.type'

export const LoginFormSchema = z.object({
  password: z.string(),
  username: z.string(),
})

export const LoginResSchema = z.object({
  token: z.string(),
  userInfo: UserInfoSchema,
})

export type ILoginForm = z.infer<typeof LoginFormSchema>
export type ILoginRes = z.infer<typeof LoginResSchema>
