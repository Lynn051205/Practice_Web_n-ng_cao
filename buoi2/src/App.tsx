import { Accordion } from './components/Accordion'
import { products } from './data/products'
import { usePagination } from './hooks/usePagination'
import './App.css'

function App() {
  const pagination = usePagination(products, 4)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-mark"><span>02</span><i /></div>
        <p className="eyebrow">React / TypeScript practice</p>
        <span className="status"><b /> Live component lab</span>
      </header>

      <section className="intro">
        <p className="kicker">Bài tập về nhà · Buổi 3</p>
        <h1>Compound components<br /><em>&amp;</em> generic hooks.</h1>
        <p className="intro-copy">Một playground nhỏ cho hai pattern nền tảng trong React: quản lý state chia sẻ bằng Context và phân trang an toàn kiểu dữ liệu.</p>
      </section>

      <section className="lesson-grid">
        <div className="section-heading">
          <span className="index">01</span>
          <div><p className="kicker">Compound component</p><h2>Accordion</h2></div>
          <p className="section-note">Mở một panel sẽ đóng panel còn lại.</p>
        </div>
        <Accordion.Root>
          <Accordion.Item value="compound">
            <Accordion.Header>Compound Component là gì?</Accordion.Header>
            <Accordion.Panel><p>Accordion được ghép từ nhiều component nhỏ. <strong>Root</strong> giữ state chung, còn Item, Header và Panel cùng đọc state qua Context.</p></Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="context">
            <Accordion.Header>Context API hoạt động thế nào?</Accordion.Header>
            <Accordion.Panel><p>Context truyền <strong>openItem</strong> và hàm <strong>toggleItem</strong> xuống cây component mà không cần truyền props qua từng lớp.</p></Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="benefit">
            <Accordion.Header>Tại sao pattern này hữu ích?</Accordion.Header>
            <Accordion.Panel><p>API rõ ràng, UI linh hoạt và logic state được tách khỏi phần hiển thị. Đây là pattern phù hợp cho Tabs, Menu và Modal.</p></Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </section>

      <section className="lesson-grid products-section">
        <div className="section-heading">
          <span className="index">02</span>
          <div><p className="kicker">Custom hook &lt;T&gt;</p><h2>Product index</h2></div>
          <p className="section-note">{products.length} items · 4 items / page</p>
        </div>
        <div className="product-grid">
          {pagination.currentItems.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-art" style={{ background: `linear-gradient(145deg, ${product.accent}, #f0e9df)` }}><span>{String(product.id).padStart(2, '0')}</span></div>
              <div className="product-info"><p className="product-category">{product.category}</p><h3>{product.name}</h3><p className="product-meta">{product.color}</p><strong>{formatPrice(product.price)}</strong></div>
            </article>
          ))}
        </div>
        <nav className="pagination" aria-label="Product pagination">
          <button type="button" onClick={pagination.prev} disabled={pagination.currentPage === 1} aria-label="Trang trước">←</button>
          <span><strong>{String(pagination.currentPage).padStart(2, '0')}</strong> / {String(pagination.totalPages).padStart(2, '0')}</span>
          <button type="button" onClick={pagination.next} disabled={pagination.currentPage === pagination.totalPages} aria-label="Trang sau">→</button>
        </nav>
      </section>

      <footer><span>TS</span><p>Typed by design</p><p>usePagination&lt;T&gt; · AccordionContext</p></footer>
    </main>
  )
}

export default App
