import { z } from 'zod'

export interface IUserEntity {
  id: number
  email: string
  gender: string
  firstName: string
  lastName: string
}

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
