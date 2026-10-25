import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import '@testing-library/jest-dom/jest-globals'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { products } from '../../data/products'
import { useFavoritesStore } from '../../stores/useFavoritesStore'
import { ProductCatalog } from './ProductCatalog'

describe('ProductCatalog', () => {
  const loadProducts = async () => products

  beforeEach(() => {
    useFavoritesStore.getState().clearFavorites()
  })

  afterEach(() => {
    cleanup()
    useFavoritesStore.getState().clearFavorites()
  })

  it('renders the sample catalog and supports category filtering', async () => {
    const user = userEvent.setup()
    render(<ProductCatalog loadProducts={loadProducts} products={products} />)

    expect(screen.getByRole('heading', { name: 'Kinto Travel Tumbler' })).toBeVisible()
    await user.selectOptions(screen.getByLabelText('Danh mục'), 'Phụ kiện')

    expect(screen.getByRole('heading', { name: 'Rains Backpack Mini' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Kinto Travel Tumbler' })).not.toBeInTheDocument()
  })

  it('shows an empty result and toggles a product into favorites', async () => {
    const user = userEvent.setup()
    render(<ProductCatalog loadProducts={loadProducts} products={products} />)

    await user.type(screen.getByRole('searchbox', { name: 'Tìm trong sản phẩm' }), 'not-a-product')
    expect(screen.getByText('Không tìm thấy sản phẩm phù hợp.')).toBeVisible()

    await user.clear(screen.getByRole('searchbox', { name: 'Tìm trong sản phẩm' }))
    const product = screen.getAllByRole('article')[0]
    const addButton = within(product).getByRole('button', {
      name: 'Thêm Kinto Travel Tumbler vào yêu thích',
    })
    await user.click(addButton)

    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true)
  })

  it('shows a visible error and keeps the server-rendered sample catalog on failure', async () => {
    render(
      <ProductCatalog
        loadProducts={async () => {
          throw new Error('Không thể tải sản phẩm (HTTP 503).')
        }}
        products={products}
      />,
    )

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('HTTP 503')
    })
    expect(screen.getByRole('heading', { name: 'Kinto Travel Tumbler' })).toBeVisible()
  })
})
