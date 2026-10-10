import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import productsReducer from '../features/products/productsSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
