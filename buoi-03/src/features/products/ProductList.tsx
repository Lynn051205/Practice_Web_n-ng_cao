import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addItem } from '../cart/cartSlice'
import { fetchProducts } from './productsSlice'

export function ProductList() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)

  useEffect(() => { if (status === 'idle') void dispatch(fetchProducts()) }, [dispatch, status])

  return <section className="products-panel" aria-labelledby="products-title">
    <div className="section-heading"><div><p className="section-kicker">Explore collection</p><h2 id="products-title">Featured products</h2></div><span className="item-count">{items.length} items</span></div>
    {status === 'loading' && <p className="status-message">Loading products...</p>}
    {status === 'failed' && <div className="error-box" role="alert"><p>{error}</p><button type="button" onClick={() => void dispatch(fetchProducts())}>Try again</button></div>}
    {status === 'succeeded' && <div className="product-grid">{items.map((product) => <article className="product-card" key={product.id}>
      <div className="product-image-wrap"><img src={product.image} alt={product.title} className="product-image" /></div>
      <div className="product-info"><h3>{product.title}</h3><div className="product-footer"><strong>${product.price.toFixed(2)}</strong><button type="button" className="add-button" aria-label={`Add ${product.title} to cart`} onClick={() => dispatch(addItem(product))}>+ Add</button></div></div>
    </article>)}</div>}
  </section>
}