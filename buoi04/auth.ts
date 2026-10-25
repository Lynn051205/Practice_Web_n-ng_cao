import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { compare } from 'bcryptjs'
import authConfig from './auth.config'
import { createLoginAttemptKey, clearLoginAttempts, reserveLoginAttempt } from './src/lib/auth/rate-limit'
import { isUserRole } from './src/lib/auth/roles'
import { prisma } from './src/lib/prisma'
import { loginSchema } from './src/lib/validations/auth'

const providers = [
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Mật khẩu', type: 'password' },
    },
    async authorize(credentials, request) {
      const parsed = loginSchema.safeParse(credentials)
      if (!parsed.success) {
        return null
      }

      const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      const ipAddress = forwardedFor || request.headers.get('x-real-ip') || 'unknown'
      const attemptKey = createLoginAttemptKey(parsed.data.email, ipAddress)

      if (!(await reserveLoginAttempt(attemptKey))) {
        return null
      }

      const user = await prisma.user.findUnique({
        where: { email: parsed.data.email },
      })

      if (
        !user?.passwordHash ||
        !(await compare(parsed.data.password, user.passwordHash)) ||
        !isUserRole(user.role)
      ) {
        return null
      }

      await clearLoginAttempts(attemptKey)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      }
    },
  }),
  ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
    ? [
        GitHub({
          clientId: process.env.AUTH_GITHUB_ID,
          clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
      ]
    : []),
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider !== 'github') {
        return true
      }

      const accountWhere = {
        provider_providerAccountId: {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
      }
      const linkedAccount = await prisma.oAuthAccount.findUnique({
        where: accountWhere,
        include: { user: true },
      })

      if (linkedAccount) {
        if (!isUserRole(linkedAccount.user.role)) {
          return false
        }

        user.id = linkedAccount.user.id
        user.role = linkedAccount.user.role
        return true
      }

      if (!user.email) {
        return false
      }

      const email = user.email.toLowerCase()
      if (await prisma.user.findUnique({ where: { email } })) {
        return false
      }

      const storedUser = await prisma.user.create({
        data: {
          name: user.name?.trim() || email,
          email,
          image: user.image,
          role: 'user',
          accounts: {
            create: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        },
      })

      user.id = storedUser.id
      user.role = 'user'
      return true
    },
  },
})
