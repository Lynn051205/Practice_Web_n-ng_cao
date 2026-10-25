import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoginForm } from '../components/LoginForm'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  const githubConfigured = Boolean(
    process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET,
  )

  return (
    <main className="app-shell auth-page">
      <section className="auth-card">
        <p className="eyebrow">Chào mừng trở lại</p>
        <h1 className="page-title">Đăng nhập</h1>
        <p className="auth-intro">Đăng nhập để tiếp tục đến bộ sưu tập của bạn.</p>
        <Suspense fallback={<p role="status">Đang tải biểu mẫu…</p>}>
          <LoginForm githubConfigured={githubConfigured} />
        </Suspense>
        <p className="auth-switch">Chưa có tài khoản? <Link href="/register">Đăng ký</Link></p>
      </section>
    </main>
  )
}
