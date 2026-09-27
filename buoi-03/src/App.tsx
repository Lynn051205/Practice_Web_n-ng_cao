import './App.css'
import { CartSummary } from './features/cart/CartSummary'
import { ProductList } from './features/products/ProductList'

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">PTIT · Redux Toolkit practice</p>
          <h1>Redux Toolkit Shopping Cart</h1>
          <p className="subtitle">A simple, type-safe store for your everyday picks.</p>
        </div>
        <div className="header-mark" aria-hidden="true">RTK</div>
      </header>
      <div className="dashboard-grid">
        <ProductList />
        <CartSummary />
      </div>
    </main>
  )
}

export default App
