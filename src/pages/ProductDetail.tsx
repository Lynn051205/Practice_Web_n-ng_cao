import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="page-shell empty-state">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn--secondary">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="page-shell product-detail">
      <Link to="/products" className="btn btn--secondary product-detail__back">
        ← Back to products
      </Link>

      <div className="product-detail__layout">
        <img src={product.image} alt={product.name} className="product-detail__image" />

        <div className="product-detail__content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>

          <div className="product-detail__meta">
            <span>⭐ {product.rating}</span>
            <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>

          <div className="product-detail__price">${product.price.toFixed(2)}</div>
          <p className="product-detail__description">{product.description}</p>

          <button type="button" className="btn btn--primary">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
