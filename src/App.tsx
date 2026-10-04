import { Suspense, lazy } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { Loading } from './components/Loading';
import { products } from './data/products';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import './App.css';

const ProductDetailPage = lazy(() => import('./pages/ProductDetail'));

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand__mark">PM</div>
            <div>
              <p className="brand__label">Product</p>
              <h2>Management</h2>
            </div>
          </div>

          <nav className="sidebar__nav" aria-label="Main navigation">
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              Dashboard
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              Products
            </NavLink>
          </nav>

          <div className="sidebar__summary">
            <p>Total items</p>
            <strong>{products.length.toLocaleString()}</strong>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard products={products} />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/product/:productId"
              element={
                <Suspense fallback={<Loading />}>
                  <ProductDetailPage />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
