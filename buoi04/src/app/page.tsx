import type { Metadata } from 'next'
import { ProductCatalog } from './components/ProductCatalog'
import { products } from '../data/products'
import { siteName, siteUrl } from '../lib/site'

export const metadata: Metadata = {
  title: 'Khám phá sản phẩm',
  description:
    'Khám phá danh mục sản phẩm minh họa, lọc theo danh mục và lưu những món đồ bạn yêu thích.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'NEST / 04 — Những điều đáng nhớ',
    description: 'Một góc nhỏ để lưu lại những sản phẩm khiến bạn muốn quay lại.',
    siteName,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'NEST / 04' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEST / 04 — Những điều đáng nhớ',
    description: 'Khám phá và lưu lại những sản phẩm bạn yêu thích.',
    images: ['/opengraph-image'],
  },
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sản phẩm minh họa NEST / 04',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      url: new URL(`/products/${product.id}`, siteUrl).toString(),
    })),
  }

  return (
    <main className="app-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <section className="intro">
        <div>
          <p className="eyebrow">Curated objects</p>
          <h1>Những điều<br /><em>đáng nhớ.</em></h1>
        </div>
        <p className="intro-copy">
          Một góc nhỏ để lưu lại những sản phẩm khiến bạn muốn quay lại.
          <span className="demo-disclaimer">Danh mục và giá chỉ là dữ liệu minh họa.</span>
        </p>
      </section>
      <section className="catalog-section" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Bộ sưu tập tuyển chọn</p>
            <h2 id="catalog-title">Khám phá sản phẩm</h2>
          </div>
          <span className="catalog-note">{products.length} items</span>
        </div>
        <ProductCatalog products={products} initialQuery={q} />
      </section>
    </main>
  )
}
