import { hash } from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '../src/lib/prisma'
import { isWithinBcryptByteLimit } from '../src/lib/validations/auth'

const seedSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(12)
    .max(72)
    .refine(isWithinBcryptByteLimit),
})

async function main() {
  const parsed = seedSchema.safeParse({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  })

  if (!parsed.success) {
    throw new Error(
      'Set ADMIN_NAME, ADMIN_EMAIL, and a 12–72 character ADMIN_PASSWORD before seeding.',
    )
  }

  const passwordHash = await hash(parsed.data.password, 12)
  await prisma.user.upsert({
    where: { email: parsed.data.email },
    create: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: 'admin',
    },
    update: {
      name: parsed.data.name,
      passwordHash,
      role: 'admin',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error: unknown) => {
    await prisma.$disconnect()
    console.error('Admin seed failed.')
    throw error
  })
