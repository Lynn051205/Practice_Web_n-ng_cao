import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeItem, updateQuantity } from './cartSlice'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format(price)

export function CartSummary() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <aside className="cart-panel" aria-labelledby="cart-title">
      <div className="section-title cart-heading">
        <div>
          <p className="eyebrow">02 / Your order</p>
          <h2 id="cart-title">Cart summary</h2>
        </div>
        <span className="cart-count">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
      </div>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.<br />Add a product to begin.</p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>{formatPrice(item.price)} each</p>
              </div>
              <div className="quantity-controls" aria-label={`Quantity for ${item.title}`}>
                <button type="button" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} aria-label="Decrease quantity">-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} aria-label="Increase quantity">+</button>
              </div>
              <strong className="line-total">{formatPrice(item.price * item.quantity)}</strong>
              <button type="button" className="remove-button" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>
    </aside>
  )
}
