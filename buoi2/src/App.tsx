import { CartSummary } from './features/cart/CartSummary'
import { ProductList } from './features/products/ProductList'
import './App.css'

function App() {
  return (
    <main className="shopping-app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Redux Toolkit / TypeScript</p>
          <h1>Redux Toolkit Shopping Cart</h1>
        </div>
        <span className="header-badge">PTIT practice</span>
      </header>
      <div className="shop-layout">
        <ProductList />
        <CartSummary />
      </div>
    </main>
  )
}

export default App
