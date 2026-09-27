export interface Product {
  id: number
  title: string
  price: number
  image: string
}

export type ProductsStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface ProductsState {
  items: Product[]
  status: ProductsStatus
  error: string | null
}