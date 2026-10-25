import type { Metadata } from 'next'
import { AnnouncementForm } from '../components/AnnouncementForm'
import { requireAdmin } from '../../lib/auth/authorization'
import { products } from '../../data/products'
import { prisma } from '../../lib/prisma'

export const metadata: Metadata = {
  title: 'Quản trị',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  await requireAdmin()
  const [userCount, announcements] = await Promise.all([
    prisma.user.count(),
    prisma.announcement.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
  ])
  const categories = new Set(products.map((product) => product.category))

  return (
    <main className="app-shell admin-page">
      <p className="eyebrow">Không gian quản trị</p>
      <h1 className="page-title">Tổng quan</h1>
      <div className="stats-grid">
        <article><span>Sản phẩm demo</span><strong>{products.length}</strong></article>
        <article><span>Danh mục</span><strong>{categories.size}</strong></article>
        <article><span>Tài khoản</span><strong>{userCount}</strong></article>
      </div>
      <section className="admin-content">
        <div className="auth-card">
          <h2>Thông báo cửa hàng</h2>
          <p>Nội dung được lưu trong SQLite và chỉ quản trị viên mới có thể tạo.</p>
          <AnnouncementForm />
        </div>
        <div className="auth-card">
          <h2>Thông báo gần đây</h2>
          {announcements.length === 0 ? (
            <p>Chưa có thông báo nào.</p>
          ) : (
            <ul className="announcement-list">
              {announcements.map((announcement) => (
                <li key={announcement.id}>
                  <p>{announcement.message}</p>
                  <time dateTime={announcement.createdAt.toISOString()}>
                    {announcement.createdAt.toLocaleString('vi-VN')}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
