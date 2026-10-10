import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addItem } from '../cart/cartSlice'
import { fetchProducts } from './productsSlice'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format(price)

export function ProductList() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts())
    }
  }, [dispatch, status])

  return (
    <section className="products-panel" aria-labelledby="products-title">
      <div className="section-title">
        <div>
          <p className="eyebrow">01 / Catalog</p>
          <h2 id="products-title">Featured products</h2>
        </div>
        <span className="item-count">{items.length} items</span>
      </div>

      {status === 'loading' && <p className="message">Đang tải sản phẩm...</p>}
      {status === 'failed' && (
        <div className="message error-message">
          <p>{error}</p>
          <button type="button" onClick={() => void dispatch(fetchProducts())}>Thử lại</button>
        </div>
      )}
      {status === 'succeeded' && (
        <div className="product-grid">
          {items.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.title} className="product-image" />
              </div>
              <div className="product-details">
                <h3>{product.title}</h3>
                <p className="price">{formatPrice(product.price)}</p>
                <button
                  type="button"
                  className="add-button"
                  onClick={() => dispatch(addItem({ id: product.id, title: product.title, price: product.price }))}
                >
                  Add To Cart <span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
