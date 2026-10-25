import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { fetchProducts } from './productsApi'
import type { Product } from '../stores/useFavoritesStore'

const products: Product[] = [
  {
    id: 1,
    name: 'Kinto Travel Tumbler',
    category: 'Đồ dùng hằng ngày',
    price: 680000,
    color: '#d9e8df',
    accent: '#567d68',
  },
]

interface MockResponse {
  ok: boolean
  status: number
  json: () => Promise<unknown>
}

const response = (
  body: unknown,
  ok: boolean,
  status: number,
): MockResponse => ({
  ok,
  status,
  json: async () => body,
})

describe('fetchProducts', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('trả về danh sách sản phẩm khi API thành công', async () => {
    const fetchMock = jest.fn(async () => response(products, true, 200))

    await expect(fetchProducts(fetchMock)).resolves.toEqual(products)
    expect(fetchMock).toHaveBeenCalledWith('/api/products')
  })

  it('báo lỗi rõ ràng khi API trả về HTTP thất bại', async () => {
    const fetchMock = jest.fn(async () =>
      response({ message: 'Unavailable' }, false, 503),
    )

    await expect(fetchProducts(fetchMock)).rejects.toThrow(
      'Không thể tải sản phẩm (HTTP 503).',
    )
  })

  it('báo lỗi khi API không trả về một danh sách', async () => {
    const fetchMock = jest.fn(async () =>
      response({ product: products[0] }, true, 200),
    )

    await expect(fetchProducts(fetchMock)).rejects.toThrow(
      'Dữ liệu sản phẩm từ API không hợp lệ.',
    )
  })

  it('báo lỗi khi một phần tử trong danh sách không có cấu trúc hợp lệ', async () => {
    const fetchMock = jest.fn(async () =>
      response([{ id: 'invalid', name: 'Missing product fields' }], true, 200),
    )

    await expect(fetchProducts(fetchMock)).rejects.toThrow(
      'Dữ liệu sản phẩm từ API không hợp lệ.',
    )
  })

  it('chấp nhận danh sách rỗng', async () => {
    const fetchMock = jest.fn(async () => response([], true, 200))

    await expect(fetchProducts(fetchMock)).resolves.toEqual([])
  })
})
