import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeItem, updateQuantity } from './cartSlice'

export function CartSummary() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return <aside className="cart-panel" aria-labelledby="cart-title">
    <div className="cart-heading"><div><p className="section-kicker">Your selection</p><h2 id="cart-title">Shopping cart</h2></div><span className="cart-badge">{itemCount}</span></div>
    {items.length === 0 ? <div className="empty-cart"><span className="empty-icon" aria-hidden="true">+</span><h3>Your cart is empty</h3><p>Add a product to start building your order.</p></div> : <>
      <div className="cart-items">{items.map((item) => <div className="cart-item" key={item.id}><div className="cart-item-title"><h3>{item.title}</h3><p>${item.price.toFixed(2)} each</p></div><div className="cart-item-actions"><div className="quantity-control" aria-label={`Quantity for ${item.title}`}><button type="button" aria-label="Decrease quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button><span>{item.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button></div><strong>${(item.price * item.quantity).toFixed(2)}</strong><button type="button" className="remove-button" aria-label={`Remove ${item.title}`} onClick={() => dispatch(removeItem(item.id))}>×</button></div></div>)}</div>
      <div className="cart-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div><button type="button" className="checkout-button">Continue to checkout <span aria-hidden="true">→</span></button>
    </>}
  </aside>
}