import { memo } from 'react';
import type { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
  onAdd: (productId: string) => void;
  onView: (productId: string) => void;
};

export const ProductCard = memo(function ProductCard({ product, onAdd, onView }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__category">{product.category}</span>
          <span className="product-card__rating">★ {product.rating}</span>
        </div>

        <h3 title={product.name}>{product.name}</h3>

        <div className="product-card__price-row">
          <strong>${product.price.toFixed(2)}</strong>
          <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
        </div>

        <div className="product-card__actions">
          <button type="button" className="btn btn--secondary" onClick={() => onView(product.id)}>
            View details
          </button>
          <button type="button" className="btn btn--primary" onClick={() => onAdd(product.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
});
