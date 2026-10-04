import { StatsCard } from '../components/StatsCard';
import type { Product } from '../types/product';

type DashboardProps = {
  products: Product[];
};

export default function Dashboard({ products }: DashboardProps) {
  const totalProducts = products.length;
  const categoriesCount = new Set(products.map((product) => product.category)).size;
  const averagePrice = products.reduce((total, product) => total + product.price, 0) / totalProducts;
  const outOfStockCount = products.filter((product) => product.stock === 0).length;

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Dashboard</h1>
        </div>
      </header>

      <section className="stats-grid">
        <StatsCard title="Total products" value={String(totalProducts)} accent="#5b7cff" helper="10,000 mock records" />
        <StatsCard title="Categories" value={String(categoriesCount)} accent="#16a34a" helper="Unique product groups" />
        <StatsCard title="Products shown" value={String(totalProducts)} accent="#f59e0b" helper="Current dataset" />
        <StatsCard title="Average price" value={`$${averagePrice.toFixed(2)}`} accent="#ef4444" helper="Across all products" />
        <StatsCard title="Out of stock" value={String(outOfStockCount)} accent="#8b5cf6" helper="Zero-stock items" />
      </section>
    </div>
  );
}
