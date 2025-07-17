import z from 'zod'

export const RoleSchema = z.object({
  dataScope: z.string(),
  id: z.number(),
  level: z.number(),
  name: z.string(),
})
