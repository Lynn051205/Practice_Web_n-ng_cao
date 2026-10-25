'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFavoritesStore } from '../../stores/useFavoritesStore'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price)
}

export function FavoritesList() {
  const favorites = useFavoritesStore((state) => state.products)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-heart" aria-hidden="true">♡</span>
        <p>Chưa có sản phẩm nào được lưu.</p>
        <small>Chạm vào biểu tượng trái tim để lưu món đồ bạn thích.</small>
        <Link className="text-link" href="/">Khám phá sản phẩm</Link>
      </div>
    )
  }

  return (
    <div className="favorite-list">
      {favorites.map((product) => (
        <article className="favorite-item" key={product.id}>
          <Link
            className="favorite-thumb"
            href={`/products/${product.id}`}
            style={{ backgroundColor: product.color }}
            aria-label={`Xem chi tiết ${product.name}`}
          >
            {product.image && (
              <Image src={product.image} alt="" fill sizes="64px" />
            )}
          </Link>
          <div>
            <p className="product-category">{product.category}</p>
            <h3><Link href={`/products/${product.id}`}>{product.name}</Link></h3>
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <button
            type="button"
            className="remove-button"
            onClick={() => removeFavorite(product.id)}
            aria-label={`Bỏ ${product.name} khỏi yêu thích`}
          >
            ×
          </button>
        </article>
      ))}
    </div>
  )
}
