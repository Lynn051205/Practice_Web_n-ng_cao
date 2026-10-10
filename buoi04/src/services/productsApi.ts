import type { Product } from '../stores/useFavoritesStore'

interface JsonApiResponse {
  ok: boolean
  status: number
  json: () => Promise<unknown>
}

type ProductFetcher = (url: string) => Promise<JsonApiResponse>

export async function fetchProducts(
  fetcher: ProductFetcher = fetch,
): Promise<Product[]> {
  const response = await fetcher('/api/products')

  if (!response.ok) {
    throw new Error(`Không thể tải sản phẩm (HTTP ${response.status}).`)
  }

  const products: unknown = await response.json()
  if (!Array.isArray(products)) {
    throw new Error('Dữ liệu sản phẩm từ API không hợp lệ.')
  }

  return products as Product[]
}
