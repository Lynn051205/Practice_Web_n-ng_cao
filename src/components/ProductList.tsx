import { memo, useEffect, useState, useCallback } from 'react';
import { List, type RowComponentProps } from 'react-window';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  products: Product[];
  onAdd: (productId: string) => void;
  onView: (productId: string) => void;
};

type RowProps = RowComponentProps<{
  products: Product[];
  onAdd: (productId: string) => void;
  onView: (productId: string) => void;
}>;

const itemHeight = 332;

export const ProductList = memo(function ProductList({ products, onAdd, onView }: ProductListProps) {
  const [listHeight, setListHeight] = useState(680);

  useEffect(() => {
    const updateHeight = () => {
      setListHeight(Math.min(760, window.innerHeight - 260));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const Row = useCallback(
    ({ index, style, products: rowProducts, onAdd: rowOnAdd, onView: rowOnView }: RowProps) => {
      const product = rowProducts[index];

      if (!product) {
        return null;
      }

      return (
        <div style={style}>
          <ProductCard product={product} onAdd={rowOnAdd} onView={rowOnView} />
        </div>
      );
    },
    [],
  );

  return (
    <div className="product-list-virtualized">
      <List
        rowComponent={Row}
        rowCount={products.length}
        rowHeight={itemHeight}
        rowProps={{ products, onAdd, onView }}
        style={{ height: listHeight, width: '100%' }}
        overscanCount={6}
      />
    </div>
  );
});
