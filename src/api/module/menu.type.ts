import * as z from 'zod'

export const MetaSchema = z.object({
  icon: z.string(),
  noCache: z.boolean(),
  title: z.string(),
})

export type IMeta = z.infer<typeof MetaSchema>

export const ChildChildSchema = z.object({
  component: z.string(),
  hidden: z.boolean(),
  meta: MetaSchema,
  name: z.string(),
  path: z.string(),
})

export type ChildChild = z.infer<typeof ChildChildSchema>

export const ChildSchema = z.object({
  component: z.string(),
  hidden: z.boolean(),
  meta: MetaSchema,
  name: z.string(),
  path: z.string(),
  alwaysShow: z.boolean().optional(),
  children: z.array(ChildChildSchema).optional(),
  redirect: z.string().optional(),
})
export type IChildSchema = z.infer<typeof ChildSchema>

export const MenuSchema = z.object({
  alwaysShow: z.boolean(),
  children: z.array(ChildSchema),
  component: z.string(),
  hidden: z.boolean(),
  meta: MetaSchema,
  name: z.string(),
  path: z.string(),
  redirect: z.string(),
})
export type IMenuSchema = z.infer<typeof MenuSchema>
