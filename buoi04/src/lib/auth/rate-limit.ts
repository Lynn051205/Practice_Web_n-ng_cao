import { createHash } from 'node:crypto'
import { prisma } from '../prisma'

const attemptLimit = 5
const windowMilliseconds = 15 * 60 * 1000

export function createLoginAttemptKey(email: string, ipAddress: string): string {
  return createHash('sha256')
    .update(`${email}:${ipAddress}`)
    .digest('hex')
}

export async function reserveLoginAttempt(key: string): Promise<boolean> {
  const now = new Date()
  const cutoff = new Date(now.getTime() - windowMilliseconds)

  return prisma.$transaction(async (transaction) => {
    await transaction.loginAttempt.deleteMany({
      where: { windowStartedAt: { lt: cutoff } },
    })
    const existing = await transaction.loginAttempt.findUnique({ where: { key } })

    if (existing && existing.windowStartedAt > cutoff) {
      if (existing.attempts >= attemptLimit) {
        return false
      }

      await transaction.loginAttempt.update({
        where: { key },
        data: { attempts: { increment: 1 } },
      })
      return true
    }

    await transaction.loginAttempt.upsert({
      where: { key },
      create: { key, attempts: 1, windowStartedAt: now },
      update: { attempts: 1, windowStartedAt: now },
    })
    return true
  })
}

export async function clearLoginAttempts(key: string): Promise<void> {
  await prisma.loginAttempt.deleteMany({ where: { key } })
}
