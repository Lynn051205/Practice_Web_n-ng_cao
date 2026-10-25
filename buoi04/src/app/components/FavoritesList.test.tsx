import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import '@testing-library/jest-dom/jest-globals'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { products } from '../../data/products'
import { useFavoritesStore } from '../../stores/useFavoritesStore'
import { FavoritesList } from './FavoritesList'

describe('FavoritesList', () => {
  beforeEach(() => {
    useFavoritesStore.getState().clearFavorites()
  })

  afterEach(() => {
    cleanup()
    useFavoritesStore.getState().clearFavorites()
  })

  it('shows an empty state when no products are saved', () => {
    render(<FavoritesList />)

    expect(screen.getByText('Chưa có sản phẩm nào được lưu.')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Khám phá sản phẩm' })).toHaveAttribute('href', '/')
  })

  it('removes a saved product from the list', async () => {
    const user = userEvent.setup()
    useFavoritesStore.getState().addFavorite(products[0])
    render(<FavoritesList />)

    await user.click(
      screen.getByRole('button', { name: 'Bỏ Kinto Travel Tumbler khỏi yêu thích' }),
    )

    expect(screen.getByText('Chưa có sản phẩm nào được lưu.')).toBeVisible()
  })
})
