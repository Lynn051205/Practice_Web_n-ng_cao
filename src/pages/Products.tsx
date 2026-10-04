import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterBar } from '../components/FilterBar';
import { ProductList } from '../components/ProductList';
import { SearchBar } from '../components/SearchBar';
import { products as allProducts, categoriesList } from '../data/products';
import { useDebounce } from '../hooks/useDebounce';
import type { RatingFilter, SortMode, StockFilter } from '../types/product';

export default function Products() {
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const navigate = useNavigate();
  const debouncedSearchText = useDebounce(searchText, 250);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearchText.trim().toLowerCase();

    return [...allProducts]
      .filter((product) => product.name.toLowerCase().includes(normalizedSearch))
      .filter((product) => (categoryFilter === 'all' ? true : product.category === categoryFilter))
      .filter((product) => {
        switch (stockFilter) {
          case 'in-stock':
            return product.stock > 0;
          case 'low-stock':
            return product.stock > 0 && product.stock <= 10;
          case 'out-of-stock':
            return product.stock === 0;
          default:
            return true;
        }
      })
      .filter((product) => {
        switch (ratingFilter) {
          case '4+':
            return product.rating >= 4;
          case '3+':
            return product.rating >= 3;
          case '2+':
            return product.rating >= 2;
          default:
            return true;
        }
      })
      .sort((left, right) => {
        switch (sortMode) {
          case 'price-asc':
            return left.price - right.price;
          case 'price-desc':
            return right.price - left.price;
          case 'rating-desc':
            return right.rating - left.rating;
          case 'rating-asc':
            return left.rating - right.rating;
          default:
            return 0;
        }
      });
  }, [categoryFilter, debouncedSearchText, ratingFilter, sortMode, stockFilter]);

  const handleAddToCart = useCallback((productId: string) => {
    setCartItems((previous) => ({
      ...previous,
      [productId]: (previous[productId] ?? 0) + 1,
    }));
  }, []);

  const handleViewProduct = useCallback(
    (productId: string) => {
      navigate(`/product/${productId}`);
    },
    [navigate],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategoryFilter(value);
  }, []);

  const handleStockChange = useCallback((value: StockFilter) => {
    setStockFilter(value);
  }, []);

  const handleRatingChange = useCallback((value: RatingFilter) => {
    setRatingFilter(value);
  }, []);

  const handleSortChange = useCallback((value: SortMode) => {
    setSortMode(value);
  }, []);

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Product List</h1>
        </div>
        <div className="cart-pill">Cart items: {Object.values(cartItems).reduce((total, value) => total + value, 0)}</div>
      </header>

      <section className="toolbar">
        <SearchBar value={searchText} onChange={handleSearchChange} />
        <FilterBar
          categories={categoriesList}
          selectedCategory={categoryFilter}
          stockFilter={stockFilter}
          ratingFilter={ratingFilter}
          sortMode={sortMode}
          onCategoryChange={handleCategoryChange}
          onStockChange={handleStockChange}
          onRatingChange={handleRatingChange}
          onSortChange={handleSortChange}
        />
      </section>

      <div className="results-header">
        <span>{filteredProducts.length} products</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No products match the current filters.</h2>
          <p>Try changing the search or reset the filters.</p>
        </div>
      ) : (
        <ProductList products={filteredProducts} onAdd={handleAddToCart} onView={handleViewProduct} />
      )}
    </div>
  );
}
