# Kiến trúc bảo vệ

```mermaid
flowchart TD
    A[HTTP request] --> B[proxy.ts + auth.config.ts]
    B --> C{Route được bảo vệ?}
    C -- Không --> P[Trang công khai]
    C -- Có, chưa đăng nhập --> L[Chuyển đến /login?callbackUrl]
    C -- Có session --> R{Vai trò admin?}
    R -- Không, /profile --> U[Page / Server Component]
    R -- Không, /admin --> X[Chuyển đến /unauthorized]
    R -- Có --> U
    U --> V[requireUser / requireAdmin + auth()]
    V --> S[Server Action]
    S --> T[auth() + kiểm tra role + Zod]
    T --> D[Prisma + SQLite]
```

## Trách nhiệm

- **Proxy** bảo vệ điều hướng vào `/profile` và `/admin`, tạo callback URL nội bộ khi chuyển tới đăng nhập và từ chối user thường ở `/admin`. Proxy dùng `auth.config.ts` không chứa Prisma/bcrypt để giảm phụ thuộc server-side. Đây chỉ là lớp điều hướng, không phải điểm kiểm tra quyền cuối cùng.
- **Page/Server Component** gọi `auth()` qua `requireUser()` hoặc `requireAdmin()` độc lập. Dữ liệu hồ sơ lấy từ session đã ký, không lấy role từ query string hoặc client.
- **Server Action** `createAnnouncement` gọi lại `auth()`, kiểm tra `role === "admin"` và validate dữ liệu bằng Zod trước khi ghi. Gọi trực tiếp action không bỏ qua được kiểm tra này.
- **Auth.js** dùng JWT session. Role được gán từ user database khi đăng nhập; tài khoản đăng ký và OAuth mới nhận role `user`. OAuth GitHub không tự liên kết với tài khoản Credentials cùng email; tài khoản đã tồn tại bị từ chối liên kết ngầm.
- **Credentials** kiểm tra email/mật khẩu bằng bcrypt hash; lỗi đăng nhập không tiết lộ email có tồn tại hay không. Có giới hạn 5 lần thử mỗi cửa sổ 15 phút trên khóa email + IP đã băm.
- **SQLite/Prisma** lưu hash, role, OAuth account, lần thử đăng nhập và thông báo quản trị. Giá trị GitHub secret và `AUTH_SECRET` chỉ đọc từ môi trường.

## Giới hạn và vận hành

Rate limit theo IP chỉ đáng tin khi reverse proxy loại bỏ header chuyển tiếp do client tự gửi và thiết lập header tin cậy. Bản demo dùng SQLite cục bộ, không phù hợp tự động với serverless hoặc nhiều replica. Production nên dùng database dùng chung, rate limiter dùng chung, quy trình quản lý secret và HTTPS. Việc seed admin chỉ chạy khi được gọi rõ ràng với biến môi trường riêng; không có mật khẩu admin mặc định trong source.
