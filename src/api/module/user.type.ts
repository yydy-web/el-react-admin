import { z } from 'zod'

export interface IUserEntity {
  id: number
  email: string
  gender: string
  firstName: string
  lastName: string
}

export const genderValues = ['male', 'female'] as const

export const userEntitySchema = z.object({
  id: z.number().optional(),
  email: z.string({ required_error: '请输入邮箱地址' }).email('请输入正确的邮箱地址'),
  gender: z.enum(genderValues, { message: '请选择性别' }).optional(),
  firstName: z.string({ required_error: '请输入名字' }),
  lastName: z.string({ required_error: '请输入姓氏' }),
})

export const loginParamsSchema = z.object({
  username: z.string().nonempty('请输入用户名'),
  password: z.string().nonempty('请输入密码'),
})

export type LoginParams = z.infer<typeof loginParamsSchema>

export interface ILogRes {
  image: string
  accessToken: string
  refreshToken: string
}

export type LoginRes = ILogRes & IUserEntity

export interface IUserList {
  users: IUserEntity[]
  skip: number
  total: number
}
