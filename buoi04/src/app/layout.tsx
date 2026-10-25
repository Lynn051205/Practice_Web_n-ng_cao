import type { Metadata } from 'next'
import { Header } from './components/Header'
import './globals.css'
import { siteName, siteUrl } from '../lib/site'

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'NEST / 04 — Khám phá những điều đáng nhớ',
    template: '%s | NEST / 04',
  },
  description: 'Khám phá bộ sưu tập sản phẩm minh họa và lưu lại những món đồ bạn yêu thích.',
  applicationName: siteName,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
