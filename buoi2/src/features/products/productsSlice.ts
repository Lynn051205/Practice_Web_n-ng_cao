import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ProductsState, Product } from './types'

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        return rejectWithValue('Không thể tải danh sách sản phẩm.')
      }
      return (await response.json()) as Product[]
    } catch {
      return rejectWithValue('Có lỗi kết nối. Vui lòng thử lại.')
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Đã xảy ra lỗi.'
      })
  },
})

export default productsSlice.reducer
