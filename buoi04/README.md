# NEST / 04 — Khám phá sản phẩm và danh sách yêu thích

Ứng dụng demo khám phá danh mục sản phẩm, lọc/tìm kiếm, xem chi tiết và quản lý danh sách yêu thích. Dự án ban đầu dùng React + Vite; hiện đã chuyển sang Next.js App Router và bổ sung Auth.js, SQLite, phân quyền, SEO và kiểm thử. Tên sản phẩm, hình minh họa và giá đều là dữ liệu mẫu, không phải danh mục bán hàng thực tế.

## Công nghệ

- Next.js App Router, React, TypeScript strict mode.
- Auth.js / NextAuth v5: GitHub OAuth tùy chọn và Credentials (email/mật khẩu).
- SQLite + Prisma lưu người dùng, OAuth account, giới hạn thử đăng nhập và thông báo quản trị.
- bcryptjs băm mật khẩu; Zod xác thực dữ liệu.
- Zustand quản lý danh sách yêu thích phía trình duyệt.
- Jest, Jest DOM và React Testing Library.
- Lighthouse CLI để đo hiệu năng; báo cáo lần đo trước/sau tại `docs/performance-report.md`.

## Tính năng

- Trang chủ công khai có tìm kiếm, lọc danh mục, sắp xếp và trạng thái không tìm thấy.
- Trang chi tiết sản phẩm có metadata SEO, JSON-LD và `notFound` cho mã không hợp lệ.
- Danh sách yêu thích đồng bộ khi điều hướng trong phiên trình duyệt; danh sách được lưu trong Zustand phía client và được làm rỗng khi tải lại trang.
- Đăng ký với xác thực từng trường; tài khoản mới luôn có vai trò `user`.
- Đăng nhập email/mật khẩu và GitHub khi OAuth đã được cấu hình.
- `/profile` yêu cầu đăng nhập; `/admin` yêu cầu vai trò `admin`.
- Proxy, trang phía máy chủ và Server Action đều có lớp kiểm tra phù hợp. Action quản trị lưu thông báo vào SQLite.
- Open Graph image, canonical, ItemList/Product JSON-LD, `robots.txt` và `sitemap.xml`.

## Cài đặt và chạy

Yêu cầu Node.js 20.9 trở lên.

```powershell
npm install
Copy-Item .env.example .env.local
```

Tạo secret cục bộ rồi dán kết quả vào `AUTH_SECRET` trong `.env.local`:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Khởi tạo database và chạy ứng dụng:

```powershell
npx prisma migrate dev --name init
npm run dev
```

Mở `http://localhost:3000`. `DATABASE_URL=file:./dev.db` lưu SQLite tại `prisma/dev.db`; tệp cơ sở dữ liệu được Git ignore.

## GitHub OAuth

1. Tạo OAuth App trong GitHub Developer Settings.
2. Đặt Homepage URL là `http://localhost:3000`.
3. Đặt Authorization callback URL là `http://localhost:3000/api/auth/callback/github`.
4. Điền Client ID và Client Secret vào `AUTH_GITHUB_ID` và `AUTH_GITHUB_SECRET` trong `.env.local`.
5. Khởi động lại dev server. Khi thiếu credentials, các trang công khai và đăng nhập Credentials vẫn hoạt động; giao diện thông báo GitHub OAuth chưa được cấu hình.

Không commit `.env.local` hoặc secrets. Mỗi môi trường triển khai phải có secret và callback URL riêng.

## Tạo tài khoản admin

Đặt `ADMIN_NAME`, `ADMIN_EMAIL` và mật khẩu duy nhất dài ít nhất 12 ký tự trong `.env.local`, sau đó chạy:

```powershell
npm run seed:admin
```

Seed tạo hoặc nâng cấp đúng tài khoản email được chỉ định thành `admin`; mật khẩu chỉ được lưu dưới dạng bcrypt hash. Không sử dụng thông tin quản trị mẫu hoặc mật khẩu dùng chung trên production. Có thể xóa các biến seed sau khi hoàn tất.

## Cấu trúc chính

```text
auth.ts                         Auth.js providers và callbacks phía server
auth.config.ts                  Cấu hình JWT không phụ thuộc cơ sở dữ liệu cho Proxy
proxy.ts                        Điều hướng/bảo vệ /profile và /admin
prisma/schema.prisma            SQLite schema
prisma/seed-admin.ts            Tạo admin qua biến môi trường
src/app/                        App Router, trang, API, Server Actions
src/app/components/             Header, catalog, auth forms, favorites
src/data/products.ts            Danh mục demo dùng chung
src/lib/auth/                   Rate limit và helper kiểm tra quyền server
src/lib/validations/             Schema Zod
src/stores/useFavoritesStore.ts Zustand store phía client
docs/                           Kiến trúc bảo mật, kiểm thử, hiệu năng
```

## Kiểm tra chất lượng

```powershell
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run build
```

Coverage cho store yêu thích được đặt ngưỡng tối thiểu 70% statements, branches, functions và lines.

## Đo Lighthouse

Xem [docs/performance-report.md](./docs/performance-report.md) để biết trạng thái baseline và cách đo. Không có điểm Lighthouse nào được khẳng định nếu chưa đo bằng Lighthouse/PageSpeed trên cùng môi trường.

## Giới hạn demo

- SQLite phù hợp cho học tập và triển khai một máy chủ có ổ đĩa bền vững; không dùng tệp SQLite cục bộ cho serverless/nhiều replica nếu chưa chuyển sang database dùng chung và cơ chế migration phù hợp.
- Giới hạn đăng nhập hiện dựa trên email + địa chỉ IP được reverse proxy chuyển tiếp. Khi triển khai sau proxy, cần cấu hình proxy tin cậy và cân nhắc rate limit dùng chung.
- Danh sách yêu thích chỉ nằm trong store của phiên trình duyệt; không phải dữ liệu tài khoản và không lưu thông tin xác thực.
- Giá, ảnh và nội dung sản phẩm chỉ nhằm minh họa giao diện.
