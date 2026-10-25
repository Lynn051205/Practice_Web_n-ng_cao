# Báo cáo kiểm thử

## Môi trường và kết quả gần nhất

- Node.js `v24.20.0`, npm `11.19.0`, Jest `29.7.x`.
- Lệnh `npm test`: **7 suites passed, 28 tests passed, 0 failed**.
- Lệnh `npm run test:coverage`: **7 suites passed, 28 tests passed, 0 failed**.
- Coverage riêng `src/stores/useFavoritesStore.ts`: statements **100%**, branches **100%**, functions **100%**, lines **100%** (ngưỡng cấu hình tối thiểu: 70% mỗi chỉ số).
- `npm run lint`: thành công.
- `npm run typecheck`: thành công.
- `npm run build`: thành công; Next.js tạo production build cho App Router.
- Prisma migrations `init` và `login_attempt_window_index`: đã tạo và áp dụng thành công cho SQLite cục bộ.
- Lighthouse được đo trực tiếp trong Chrome; xem điểm số, phiên bản và giới hạn phép đo trong [performance-report.md](./performance-report.md).

## Phạm vi test

| Nhóm | Kiểm tra |
|---|---|
| Zustand store | Khởi tạo rỗng, thêm, xóa, không thêm trùng, xóa ID lạ, trạng thái yêu thích, toggle hai chiều, xóa toàn bộ |
| Catalog UI | Render sản phẩm, lọc danh mục, tìm kiếm/no-result, thêm yêu thích, báo lỗi tải và vẫn hiện dữ liệu server |
| Favorites UI | Empty state, link quay lại catalog, bỏ yêu thích |
| Products service | API thành công, HTTP lỗi, payload không phải danh sách, phần tử sai schema, danh sách rỗng |
| Credentials validation | Chuẩn hóa email, email/mật khẩu không hợp lệ, xác nhận không khớp, giới hạn byte UTF-8 phù hợp bcrypt |
| Registration action | Input sai không ghi DB; tài khoản tạo mới luôn là `user` và mật khẩu được lưu bằng bcrypt hash |
| Admin Server Action | Chưa đăng nhập, role `user`, input sai bị từ chối; admin hợp lệ được phép ghi thông báo |

Các test xác thực, database và Admin Action dùng mock khi phù hợp; không cần OAuth provider thật để chạy test. Không thực hiện đăng nhập GitHub thật trong môi trường kiểm thử.

## Smoke test production

Trên production build đã chạy cục bộ:

- `/`, `/products/1`, `/api/products`, `/robots.txt` và `/sitemap.xml`: HTTP 200.
- `/products/999`: HTTP 404.
- `/profile` và `/admin` không đăng nhập: HTTP 307 về `/login`, mỗi trang giữ đúng `callbackUrl`.
- Credentials flow bằng tài khoản admin tạm thời: nhận session; `/admin` trả HTTP 200.
- Credentials flow bằng tài khoản `user` tạm thời: `/admin` trả HTTP 307 tới `/unauthorized`.
- Tài khoản smoke test đã được xóa khỏi SQLite sau khi kiểm tra.
- Trang chủ có canonical, Open Graph và ItemList JSON-LD; chi tiết có canonical/Product JSON-LD nhưng không khai báo Offer; Open Graph image trả `image/png`.

## Lệnh tái chạy

```powershell
npm test
npm run test:coverage
npm run lint
npm run typecheck
npm run build
```

Coverage threshold được cấu hình trong `jest.config.cjs`, chỉ áp dụng cho store yêu thích (không đại diện coverage toàn ứng dụng). Luồng đăng nhập OAuth thật, thao tác trình duyệt end-to-end và các phép đo Lighthouse chưa được chạy.
