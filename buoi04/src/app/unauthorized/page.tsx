import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <main className="app-shell centered-page">
      <p className="eyebrow">Không đủ quyền</p>
      <h1 className="page-title">Trang này dành cho quản trị viên.</h1>
      <p>Bạn có thể quay lại trang sản phẩm công khai.</p>
      <Link className="text-link" href="/">Về trang chủ</Link>
    </main>
  )
}
