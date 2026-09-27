import { useFavoritesStore, type Product } from './stores/useFavoritesStore'
import './App.css'

const products: Product[] = [
  {
    id: 1,
    name: 'Kinto Travel Tumbler',
    category: 'Đồ dùng hằng ngày',
    price: 680000,
    color: '#d9e8df',
    accent: '#567d68',
  },
  {
    id: 2,
    name: 'Rains Backpack Mini',
    category: 'Phụ kiện',
    price: 1450000,
    color: '#e6d9cd',
    accent: '#9a6243',
  },
  {
    id: 3,
    name: 'New Balance 530',
    category: 'Giày thể thao',
    price: 2390000,
    color: '#d9e1eb',
    accent: '#61768f',
  },
  {
    id: 4,
    name: 'Muuto Kettle Teapot',
    category: 'Nhà cửa',
    price: 1120000,
    color: '#ead8dc',
    accent: '#a55c70',
  },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price)

function ProductVisual({ product }: { product: Product }) {
  return (
    <div
      className="product-visual"
      style={{ backgroundColor: product.color, color: product.accent }}
    >
      <span aria-hidden="true">{product.id === 1 ? '◒' : product.id === 2 ? '▱' : product.id === 3 ? '◓' : '◉'}</span>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const favorite = isFavorite(product.id)

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <ProductVisual product={product} />
        <button
          type="button"
          className={`favorite-button ${favorite ? 'is-favorite' : ''}`}
          onClick={() => toggleFavorite(product)}
          aria-label={favorite ? `Bỏ ${product.name} khỏi yêu thích` : `Thêm ${product.name} vào yêu thích`}
          aria-pressed={favorite}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <strong>{formatPrice(product.price)}</strong>
      </div>
    </article>
  )
}

function FavoriteList() {
  const favorites = useFavoritesStore((state) => state.products)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  return (
    <aside className="favorites-panel" aria-label="Danh sách yêu thích">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Bộ sưu tập cá nhân</p>
          <h2>Sản phẩm yêu thích</h2>
        </div>
        <span className="favorite-count">{favorites.length}</span>
      </div>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <span className="empty-heart">♡</span>
          <p>Chưa có sản phẩm nào được lưu.</p>
          <small>Chạm vào biểu tượng trái tim để lưu món đồ bạn thích.</small>
        </div>
      ) : (
        <div className="favorite-list">
          {favorites.map((product) => (
            <div className="favorite-item" key={product.id}>
              <ProductVisual product={product} />
              <div>
                <h3>{product.name}</h3>
                <strong>{formatPrice(product.price)}</strong>
              </div>
              <button type="button" className="remove-button" onClick={() => removeFavorite(product.id)} aria-label={`Bỏ ${product.name} khỏi yêu thích`}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <p className="brand">NEST / 04</p>
        <p className="demo-label">Favorites demo <span>●</span></p>
      </header>
      <section className="intro">
        <div>
          <p className="eyebrow">Curated objects</p>
          <h1>Những điều<br /><em>đáng nhớ.</em></h1>
        </div>
        <p className="intro-copy">Một góc nhỏ để lưu lại những sản phẩm khiến bạn muốn quay lại.</p>
      </section>
      <div className="content-grid">
        <section className="catalog-section" aria-labelledby="catalog-title">
          <div className="section-heading">
            <h2 id="catalog-title">Khám phá sản phẩm</h2>
            <span className="catalog-note">{products.length} items</span>
          </div>
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
        <FavoriteList />
      </div>
    </main>
  )
}

export default App
