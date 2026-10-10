import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { useFavoritesStore, type Product } from './useFavoritesStore'

const tumbler: Product = {
  id: 1,
  name: 'Kinto Travel Tumbler',
  category: 'Đồ dùng hằng ngày',
  price: 680000,
  color: '#d9e8df',
  accent: '#567d68',
}

const backpack: Product = {
  id: 2,
  name: 'Rains Backpack Mini',
  category: 'Phụ kiện',
  price: 1450000,
  color: '#e6d9cd',
  accent: '#9a6243',
}

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ products: [] })
  })

  afterEach(() => {
    useFavoritesStore.setState({ products: [] })
  })

  it('khởi tạo danh sách yêu thích rỗng', () => {
    expect(useFavoritesStore.getState().products).toEqual([])
  })

  it('thêm một sản phẩm vào danh sách yêu thích', () => {
    useFavoritesStore.getState().addFavorite(tumbler)

    expect(useFavoritesStore.getState().products).toEqual([tumbler])
  })

  it('không thêm trùng sản phẩm theo id', () => {
    const { addFavorite } = useFavoritesStore.getState()
    addFavorite(tumbler)
    addFavorite({ ...tumbler, name: 'Tên khác nhưng cùng id' })

    expect(useFavoritesStore.getState().products).toEqual([tumbler])
  })

  it('xóa đúng sản phẩm và giữ lại các sản phẩm khác', () => {
    const { addFavorite, removeFavorite } = useFavoritesStore.getState()
    addFavorite(tumbler)
    addFavorite(backpack)
    removeFavorite(tumbler.id)

    expect(useFavoritesStore.getState().products).toEqual([backpack])
  })

  it('không thay đổi danh sách khi xóa id không tồn tại', () => {
    useFavoritesStore.getState().addFavorite(tumbler)
    useFavoritesStore.getState().removeFavorite(999)

    expect(useFavoritesStore.getState().products).toEqual([tumbler])
  })

  it('kiểm tra đúng trạng thái tồn tại của sản phẩm', () => {
    useFavoritesStore.getState().addFavorite(tumbler)
    const { isFavorite } = useFavoritesStore.getState()

    expect(isFavorite(tumbler.id)).toBe(true)
    expect(isFavorite(backpack.id)).toBe(false)
  })

  it('toggle thêm sản phẩm chưa có vào danh sách', () => {
    useFavoritesStore.getState().toggleFavorite(tumbler)

    expect(useFavoritesStore.getState().products).toEqual([tumbler])
  })

  it('toggle bỏ sản phẩm đã có khỏi danh sách', () => {
    useFavoritesStore.getState().addFavorite(tumbler)
    useFavoritesStore.getState().toggleFavorite(tumbler)

    expect(useFavoritesStore.getState().products).toEqual([])
  })
})
