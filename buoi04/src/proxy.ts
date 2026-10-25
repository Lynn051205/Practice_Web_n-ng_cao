import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import authConfig from '../auth.config'

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { pathname, search } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')

  if (!request.auth?.user) {
    const callbackUrl = `${pathname}${search}`
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', callbackUrl)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminRoute && request.auth.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*'],
}
