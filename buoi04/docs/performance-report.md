# Báo cáo hiệu năng và Lighthouse

## Môi trường đo

- **Ngày đo:** 2026-10-21.
- **Máy đo:** Windows, Node.js `v24.20.0`.
- **Trình duyệt:** Google Chrome `155.0.8059.85`, headless.
- **Công cụ:** Lighthouse CLI `13.5.0`, preset desktop.
- **Baseline:** Git commit `3167a80` (bản React + Vite trước chuyển đổi), chạy bằng Vite production preview.
- **Bản sau:** Next.js production build, chạy bằng `next start`.
- Mỗi cấu hình được đo một lần trong cùng môi trường. Đây là lab data, không phải dữ liệu người dùng thực tế; chênh lệch nhỏ có thể do biến thiên của lần chạy.

## Kết quả thực tế

| Phiên bản | Performance | Accessibility | Best Practices | SEO | LCP | CLS | INP |
|---|---:|---:|---:|---:|---:|---:|---|
| Trước — Vite, `3167a80` | 100 | 94 | 100 | 82 | 0.4 s | 0.000 | Lighthouse không cung cấp |
| Sau — Next.js App Router | 100 | 100 | 100 | 100 | 0.6 s | 0.000 | Lighthouse không cung cấp |
| Chênh lệch điểm | 0 | +6 | 0 | +18 | +0.2 s | 0.000 | — |

**Diễn giải:** điểm Performance không đổi; LCP lab tăng 0.2 giây (vẫn dưới 1 giây trong lần đo này), còn CLS bằng 0 ở cả hai lần. Accessibility tăng sau khi điều chỉnh tương phản màu. SEO tăng sau khi thêm metadata/canonical, Open Graph và structured data. Lighthouse navigation run không báo cáo INP; không suy diễn số liệu INP từ LCP/CLS.

## Lệnh tái lập

Baseline trong worktree riêng:

```powershell
git worktree add C:\temp\practice-web-week8-baseline 3167a80
Set-Location C:\temp\practice-web-week8-baseline\buoi04
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Trong một cửa sổ PowerShell khác tại thư mục dự án hiện tại (nơi Lighthouse CLI đã được cài), đo URL baseline:

```powershell
npx lighthouse http://127.0.0.1:4173 --preset=desktop --output=json --output-path=.\lighthouse-before.json --chrome-flags="--headless=new --no-sandbox --disable-gpu"
```

Bản Next.js:

```powershell
npm run build
npm run start
npx lighthouse http://localhost:3000 --preset=desktop --output=json --output-path=.\lighthouse-after.json --chrome-flags="--headless=new --no-sandbox --disable-gpu"
```

Sau khi đo baseline, có thể dọn worktree bằng `git worktree remove C:\temp\practice-web-week8-baseline`.

## Thay đổi liên quan

- Chuyển sang App Router; dùng Server Components mặc định và Client Components cho tìm kiếm, lọc và Zustand.
- Dùng `next/image` với ảnh SVG cục bộ; không tải ảnh sản phẩm qua dịch vụ bên ngoài.
- Bổ sung canonical, metadata Open Graph/Twitter, ItemList/Product JSON-LD, robots và sitemap cho route công khai phù hợp.
- Điều chỉnh màu chữ phụ và màu nhấn để đạt tương phản; cấu hình favicon SVG nhằm tránh request favicon không tồn tại.
- Tránh hiển thị loading indicator khi đã có dữ liệu SSR, giúp loại bỏ layout shift quan sát được trong lần đo cuối.

Đây là các thay đổi được ghi nhận trong source; kết quả hiệu năng được giới hạn ở hai lần chạy lab nêu trên.
