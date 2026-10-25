import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <main className="app-shell centered-page">
      <p className="eyebrow">Không tìm thấy</p>
      <h1>Sản phẩm không tồn tại.</h1>
      <Link className="text-link" href="/">Quay lại danh sách sản phẩm</Link>
    </main>
  )
}
