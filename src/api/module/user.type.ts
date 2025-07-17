import { z } from 'zod'
import { DeptSchema } from './dept.type'
import { RoleSchema } from './role.type'

export const UserInfoSchema = z.object({
  avatarName: z.string(),
  avatarPath: z.string(),
  createTime: z.coerce.date(),
  dept: DeptSchema,
  email: z.string(),
  enabled: z.boolean(),
  gender: z.string(),
  id: z.number(),
  isAdmin: z.boolean(),
  jobs: z.array(DeptSchema),
  nickName: z.string(),
  password: z.string(),
  phone: z.string(),
  pwdResetTime: z.coerce.date(),
  roles: z.array(RoleSchema),
  updateBy: z.string(),
  updateTime: z.coerce.date(),
  username: z.string(),
})

export type IUserInfo = z.infer<typeof UserInfoSchema>
