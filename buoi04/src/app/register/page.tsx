import Link from 'next/link'
import type { Metadata } from 'next'
import { RegisterForm } from '../components/RegisterForm'

export const metadata: Metadata = {
  title: 'Tạo tài khoản',
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <main className="app-shell auth-page">
      <section className="auth-card">
        <p className="eyebrow">Bộ sưu tập của riêng bạn</p>
        <h1 className="page-title">Tạo tài khoản</h1>
        <p className="auth-intro">Đăng ký để bắt đầu lưu lại những điều bạn yêu thích.</p>
        <RegisterForm />
        <p className="auth-switch">Đã có tài khoản? <Link href="/login">Đăng nhập</Link></p>
      </section>
    </main>
  )
}
