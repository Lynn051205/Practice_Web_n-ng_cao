import { redirect } from 'next/navigation'
import { auth } from '../../../auth'

export async function requireUser(callbackUrl = '/profile') {
  const session = await auth()
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  }

  return session.user
}

export async function requireAdmin() {
  const user = await requireUser('/admin')
  if (user.role !== 'admin') {
    redirect('/unauthorized')
  }

  return user
}
