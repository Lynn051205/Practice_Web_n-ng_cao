import { PrismaClient } from '@prisma/client'

const prismaGlobal = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

export const prisma =
  prismaGlobal.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma
}
