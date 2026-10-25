'use client'

import { useFavoritesStore } from '../../stores/useFavoritesStore'

export function FavoriteCount() {
  return useFavoritesStore((state) => state.products.length)
}
