import type { RatingFilter, StockFilter, SortMode } from '../types/product';

type FilterBarProps = {
  categories: string[];
  selectedCategory: string;
  stockFilter: StockFilter;
  ratingFilter: RatingFilter;
  sortMode: SortMode;
  onCategoryChange: (value: string) => void;
  onStockChange: (value: StockFilter) => void;
  onRatingChange: (value: RatingFilter) => void;
  onSortChange: (value: SortMode) => void;
};

export function FilterBar({
  categories,
  selectedCategory,
  stockFilter,
  ratingFilter,
  sortMode,
  onCategoryChange,
  onStockChange,
  onRatingChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="toolbar__filters">
      <label className="field">
        <span className="field__label">Category</span>
        <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">Stock</span>
        <select value={stockFilter} onChange={(event) => onStockChange(event.target.value as StockFilter)}>
          <option value="all">All stock</option>
          <option value="in-stock">In stock</option>
          <option value="low-stock">Low stock</option>
          <option value="out-of-stock">Out of stock</option>
        </select>
      </label>

      <label className="field">
        <span className="field__label">Rating</span>
        <select value={ratingFilter} onChange={(event) => onRatingChange(event.target.value as RatingFilter)}>
          <option value="all">All ratings</option>
          <option value="4+">4.0+</option>
          <option value="3+">3.0+</option>
          <option value="2+">2.0+</option>
        </select>
      </label>

      <label className="field">
        <span className="field__label">Sort by</span>
        <select value={sortMode} onChange={(event) => onSortChange(event.target.value as SortMode)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
        </select>
      </label>
    </div>
  );
}
