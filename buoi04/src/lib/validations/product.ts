import { z } from 'zod'

export const productSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().trim().min(1),
  category: z.string().trim().min(1),
  price: z.number().nonnegative(),
  color: z.string().regex(/^#[\da-f]{6}$/i),
  accent: z.string().regex(/^#[\da-f]{6}$/i),
  image: z.string().optional(),
  description: z.string().optional(),
})

export const productsSchema = z.array(productSchema)
