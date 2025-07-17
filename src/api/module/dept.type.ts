import { z } from 'zod'

export const DeptSchema = z.object({
  id: z.number(),
  name: z.string(),
})
