import { create } from 'zustand'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  color: string
  accent: string
}

interface FavoritesState {
  products: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  toggleFavorite: (product: Product) => void
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  products: [],
  addFavorite: (product) =>
    set((state) =>
      state.products.some((item) => item.id === product.id)
        ? state
        : { products: [...state.products, product] },
    ),
  removeFavorite: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  isFavorite: (productId) =>
    get().products.some((product) => product.id === productId),
  toggleFavorite: (product) => {
    const isAlreadyFavorite = get().isFavorite(product.id)

    if (isAlreadyFavorite) {
      get().removeFavorite(product.id)
    } else {
      get().addFavorite(product)
    }
  },
}))
