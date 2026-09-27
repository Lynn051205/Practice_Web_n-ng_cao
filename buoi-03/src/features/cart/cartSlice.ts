import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../products/types'
import type { CartState } from './types'

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) existingItem.quantity += 1
      else state.items.push({ id: action.payload.id, title: action.payload.title, price: action.payload.price, quantity: 1 })
    },
    removeItem: (state, action: PayloadAction<number>) => { state.items = state.items.filter((item) => item.id !== action.payload) },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload.id)
      if (item) item.quantity = Math.max(1, action.payload.quantity)
    },
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer