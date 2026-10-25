'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useFavoritesStore, type Product } from '../../stores/useFavoritesStore'
import { fetchProducts } from '../../services/productsApi'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price)
}

export function FavoriteButton({ product }: { product: Product }) {
  const favorite = useFavoritesStore((state) =>
    state.products.some((item) => item.id === product.id),
  )
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  return (
    <button
      type="button"
      className={`favorite-button${favorite ? ' is-favorite' : ''}`}
      onClick={() => toggleFavorite(product)}
      aria-label={favorite ? `Bỏ ${product.name} khỏi yêu thích` : `Thêm ${product.name} vào yêu thích`}
      aria-pressed={favorite}
    >
      {favorite ? '♥' : '♡'}
    </button>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div
        className="product-image-wrap"
        style={{ backgroundColor: product.color, color: product.accent }}
      >
        <Link href={`/products/${product.id}`} aria-label={`Xem chi tiết ${product.name}`}>
          {product.image ? (
            <Image
              className="product-art"
              src={product.image}
              alt={`Minh họa ${product.name}`}
              fill
              sizes="(max-width: 620px) 45vw, (max-width: 1000px) 35vw, 280px"
            />
          ) : (
            <span className="product-glyph" aria-hidden="true">◒</span>
          )}
        </Link>
        <FavoriteButton product={product} />
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3><Link href={`/products/${product.id}`}>{product.name}</Link></h3>
        <strong>{formatPrice(product.price)}</strong>
      </div>
    </article>
  )
}

export function ProductCatalog({
  products,
  initialQuery = '',
  loadProducts,
}: {
  products: Product[]
  initialQuery?: string
  loadProducts?: () => Promise<Product[]>
}) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState('Tất cả')
  const [sort, setSort] = useState('featured')
  const [catalog, setCatalog] = useState(products)
  const [loading, setLoading] = useState(products.length === 0)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let cancelled = false
    const fetchCatalog = loadProducts ?? fetchProducts

    fetchCatalog()
      .then((result) => {
        if (!cancelled) {
          setCatalog(result)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setLoadError(
            error instanceof Error ? error.message : 'Không thể đồng bộ danh mục sản phẩm.',
          )
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [loadProducts])

  const categories = useMemo(
    () => ['Tất cả', ...new Set(catalog.map((product) => product.category))],
    [catalog],
  )
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi')
    const result = catalog.filter((product) => {
      const matchesQuery = `${product.name} ${product.category}`
        .toLocaleLowerCase('vi')
        .includes(normalizedQuery)
      return matchesQuery && (category === 'Tất cả' || product.category === category)
    })

    if (sort === 'price-asc') {
      return result.sort((left, right) => left.price - right.price)
    }
    if (sort === 'price-desc') {
      return result.sort((left, right) => right.price - left.price)
    }
    return result
  }, [category, catalog, query, sort])

  return (
    <>
      {loading && <p className="catalog-status" role="status">Đang đồng bộ danh mục sản phẩm…</p>}
      {loadError && (
        <p className="catalog-error" role="alert">
          {loadError} Đang tiếp tục hiển thị dữ liệu minh họa đã tải sẵn.
        </p>
      )}
      <div className="catalog-search">
        <label className="visually-hidden" htmlFor="catalog-search">Tìm trong sản phẩm</label>
        <input
          id="catalog-search"
          type="search"
          placeholder="Tìm theo tên hoặc danh mục..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="catalog-controls" aria-label="Bộ lọc sản phẩm">
        <label>
          Danh mục
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Sắp xếp
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Gợi ý</option>
            <option value="price-asc">Giá: thấp đến cao</option>
            <option value="price-desc">Giá: cao đến thấp</option>
          </select>
        </label>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <p className="empty-results" role="status">Không tìm thấy sản phẩm phù hợp.</p>
      )}
    </>
  )
}
