import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { FavoriteButton } from '../../components/ProductCatalog'
import { getProductById } from '../../../data/products'
import { siteName, siteUrl } from '../../../lib/site'

type ProductPageProps = {
  params: Promise<{ id: string }>
}

function readProductId(value: string): number | null {
  if (!/^\d+$/.test(value)) {
    return null
  }
  const id = Number(value)
  return Number.isSafeInteger(id) ? id : null
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const productId = readProductId(id)
  const product = productId === null ? undefined : getProductById(productId)

  if (!product) {
    return { title: 'Không tìm thấy sản phẩm', robots: { index: false, follow: false } }
  }

  const canonical = `/products/${product.id}`
  const description = product.description ?? `Thông tin minh họa về ${product.name}.`
  const image = product.image ?? '/opengraph-image'
  return {
    title: product.name,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: `${product.name} | ${siteName}`,
      description,
      images: [{ url: image, alt: `Minh họa ${product.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${siteName}`,
      description,
      images: [image],
    },
  }
}

export default async function ProductDetail({ params }: ProductPageProps) {
  const { id } = await params
  const productId = readProductId(id)
  const product = productId === null ? undefined : getProductById(productId)

  if (!product) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? new URL(product.image, siteUrl).toString() : undefined,
    category: product.category,
  }

  return (
    <main className="app-shell detail-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Khám phá sản phẩm</Link><span aria-hidden="true"> / </span><span>{product.name}</span>
      </nav>
      <section className="product-detail">
        <div className="detail-art" style={{ backgroundColor: product.color }}>
          {product.image && (
            <Image
              src={product.image}
              alt={`Minh họa ${product.name}`}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="demo-disclaimer">
            Sản phẩm và giá bên dưới là dữ liệu minh họa, không phải đề nghị bán hàng.
          </p>
          <strong className="detail-price">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(product.price)}
          </strong>
          <FavoriteButton product={product} />
          <Link className="text-link" href="/">← Quay lại danh sách</Link>
        </div>
      </section>
    </main>
  )
}
