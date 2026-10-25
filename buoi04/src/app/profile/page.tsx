import Image from 'next/image'
import type { Metadata } from 'next'
import { requireUser } from '../../lib/auth/authorization'

export const metadata: Metadata = {
  title: 'Hồ sơ của tôi',
  robots: { index: false, follow: false },
}

export default async function ProfilePage() {
  const user = await requireUser()

  return (
    <main className="app-shell auth-page">
      <section className="auth-card profile-card">
        <p className="eyebrow">Tài khoản</p>
        <h1 className="page-title">Hồ sơ của tôi</h1>
        {user.image && (
          <Image
            className="profile-avatar"
            src={user.image}
            alt=""
            width={80}
            height={80}
            unoptimized
          />
        )}
        <dl className="profile-details">
          <div><dt>Họ tên</dt><dd>{user.name || 'Chưa cập nhật'}</dd></div>
          <div><dt>Email</dt><dd>{user.email}</dd></div>
          <div><dt>Vai trò</dt><dd>{user.role}</dd></div>
        </dl>
      </section>
    </main>
  )
}
