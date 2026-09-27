import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product, ProductsState } from './types'

const initialState: ProductsState = { items: [], status: 'idle', error: null }

const isProduct = (value: unknown): value is Product => {
  if (typeof value !== 'object' || value === null) return false
  const product = value as Record<string, unknown>
  return typeof product.id === 'number' && typeof product.title === 'string' &&
    typeof product.price === 'number' && typeof product.image === 'string'
}

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) return rejectWithValue('Không thể tải danh sách sản phẩm.')
      const data: unknown = await response.json()
      if (!Array.isArray(data) || !data.every(isProduct)) return rejectWithValue('Dữ liệu sản phẩm không hợp lệ.')
      return data
    } catch {
      return rejectWithValue('Có lỗi kết nối. Vui lòng thử lại sau.')
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload ?? 'Không thể tải sản phẩm.' })
  },
})

export default productsSlice.reducer