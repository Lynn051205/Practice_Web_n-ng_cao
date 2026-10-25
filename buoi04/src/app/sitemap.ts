import type { MetadataRoute } from 'next'
import { products } from '../data/products'
import { siteUrl } from '../lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: new URL('/', siteUrl).toString(), changeFrequency: 'weekly', priority: 1 },
    ...products.map((product) => ({
      url: new URL(`/products/${product.id}`, siteUrl).toString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
