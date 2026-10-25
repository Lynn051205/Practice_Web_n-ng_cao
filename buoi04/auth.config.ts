import type { NextAuthConfig } from 'next-auth'

const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.role = user.role ?? 'user'
      }

      return token
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role === 'admin' ? 'admin' : 'user'
      }

      return session
    },
  },
} satisfies NextAuthConfig

export default authConfig
