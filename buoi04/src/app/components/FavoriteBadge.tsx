'use client'

import Link from 'next/link'
import { useFavoritesStore } from '../../stores/useFavoritesStore'

export function FavoriteBadge() {
  const count = useFavoritesStore((state) => state.products.length)

  return (
    <Link className="favorite-nav" href="/favorites" aria-label={`Yêu thích, ${count} sản phẩm`}>
      Yêu thích <span className="nav-count">{count}</span>
    </Link>
  )
}
