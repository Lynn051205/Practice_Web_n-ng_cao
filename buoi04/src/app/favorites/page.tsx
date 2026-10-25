import type { Metadata } from 'next'
import { FavoritesList } from '../components/FavoritesList'
import { FavoriteCount } from '../components/FavoriteCount'

export const metadata: Metadata = {
  title: 'Sản phẩm yêu thích',
  robots: { index: false, follow: false },
}

export default function FavoritesPage() {
  return (
    <main className="app-shell compact-shell">
      <section className="favorites-panel page-favorites" aria-label="Danh sách yêu thích">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Bộ sưu tập cá nhân</p>
            <h1 className="page-title">Sản phẩm yêu thích</h1>
          </div>
          <span className="favorite-count" aria-label="Số lượng yêu thích">
            <FavoriteCount />
          </span>
        </div>
        <FavoritesList />
      </section>
    </main>
  )
}
