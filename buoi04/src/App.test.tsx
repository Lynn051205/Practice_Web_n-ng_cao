import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import '@testing-library/jest-dom/jest-globals'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { useFavoritesStore } from './stores/useFavoritesStore'

describe('App: danh mục và yêu thích', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ products: [] })
  })

  afterEach(() => {
    cleanup()
    useFavoritesStore.setState({ products: [] })
  })

  it('hiển thị đầy đủ bốn sản phẩm và giá của sản phẩm đầu tiên', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Khám phá sản phẩm' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Kinto Travel Tumbler' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Rains Backpack Mini' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'New Balance 530' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Muuto Kettle Teapot' })).toBeVisible()
    expect(screen.getByText((content) => content.includes('680.000'))).toBeVisible()
  })

  it('hiển thị trạng thái rỗng và số lượng yêu thích ban đầu bằng không', () => {
    render(<App />)
    const favoritesPanel = screen.getByRole('complementary', {
      name: 'Danh sách yêu thích',
    })

    expect(
      within(favoritesPanel).getByText('Chưa có sản phẩm nào được lưu.'),
    ).toBeVisible()
    expect(within(favoritesPanel).getByText('0')).toBeVisible()
  })

  it('thêm sản phẩm khi người dùng nhấn nút yêu thích và đồng bộ store', async () => {
    const user = userEvent.setup()
    render(<App />)
    const catalog = screen.getByRole('region', { name: 'Khám phá sản phẩm' })
    const addButton = within(catalog).getByRole('button', {
      name: 'Thêm Kinto Travel Tumbler vào yêu thích',
    })

    await user.click(addButton)

    expect(
      within(catalog).getByRole('button', {
        name: 'Bỏ Kinto Travel Tumbler khỏi yêu thích',
      }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('complementary', { name: 'Danh sách yêu thích' }),
    ).toHaveTextContent('Kinto Travel Tumbler')
    expect(useFavoritesStore.getState().products.map(({ id }) => id)).toEqual([1])
  })

  it('bỏ yêu thích từ danh sách và hiện lại trạng thái rỗng', async () => {
    const user = userEvent.setup()
    render(<App />)
    const catalog = screen.getByRole('region', { name: 'Khám phá sản phẩm' })
    await user.click(
      within(catalog).getByRole('button', {
        name: 'Thêm Rains Backpack Mini vào yêu thích',
      }),
    )

    const favoritesPanel = screen.getByRole('complementary', {
      name: 'Danh sách yêu thích',
    })
    await user.click(
      within(favoritesPanel).getByRole('button', {
        name: 'Bỏ Rains Backpack Mini khỏi yêu thích',
      }),
    )

    expect(useFavoritesStore.getState().products).toEqual([])
    expect(
      screen.getByText('Chưa có sản phẩm nào được lưu.'),
    ).toBeVisible()
    expect(
      within(catalog).getByRole('button', {
        name: 'Thêm Rains Backpack Mini vào yêu thích',
      }),
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('cập nhật số lượng đúng khi chỉ xóa một trong hai sản phẩm yêu thích', async () => {
    const user = userEvent.setup()
    render(<App />)
    const catalog = screen.getByRole('region', { name: 'Khám phá sản phẩm' })

    await user.click(
      within(catalog).getByRole('button', {
        name: 'Thêm Kinto Travel Tumbler vào yêu thích',
      }),
    )
    await user.click(
      within(catalog).getByRole('button', {
        name: 'Thêm Rains Backpack Mini vào yêu thích',
      }),
    )

    const favoritesPanel = screen.getByRole('complementary', {
      name: 'Danh sách yêu thích',
    })
    await user.click(
      within(favoritesPanel).getByRole('button', {
        name: 'Bỏ Kinto Travel Tumbler khỏi yêu thích',
      }),
    )

    expect(within(favoritesPanel).getByText('1')).toBeVisible()
    expect(within(favoritesPanel).queryByText('Kinto Travel Tumbler')).not.toBeInTheDocument()
    expect(within(favoritesPanel).getByText('Rains Backpack Mini')).toBeVisible()
  })
})
