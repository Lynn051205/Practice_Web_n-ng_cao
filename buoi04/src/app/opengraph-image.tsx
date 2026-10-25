import { ImageResponse } from 'next/og'

export const alt = 'NEST / 04 — Những điều đáng nhớ'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '88px',
        background: '#f7f5f0',
        color: '#252522',
      }}
    >
      <div style={{ color: '#de604c', fontSize: 26, letterSpacing: 8 }}>NEST / 04</div>
      <div style={{ marginTop: 42, fontSize: 82, lineHeight: 1.05, fontWeight: 700 }}>
        Những điều đáng nhớ.
      </div>
      <div style={{ marginTop: 34, color: '#6c6862', fontSize: 28 }}>
        Khám phá và lưu lại sản phẩm bạn yêu thích.
      </div>
    </div>,
    size,
  )
}
