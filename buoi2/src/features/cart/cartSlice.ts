import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, CartState } from './types'

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
