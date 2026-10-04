export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
  description: string;
}

export type StockFilter = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';
export type RatingFilter = 'all' | '4+' | '3+' | '2+';
export type SortMode = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'rating-asc';

export interface ProductFilters {
  search: string;
  category: string;
  stock: StockFilter;
  rating: RatingFilter;
  sort: SortMode;
}
