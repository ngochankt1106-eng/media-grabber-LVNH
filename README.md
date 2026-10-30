# 💖 Media Grabber ✨ BORN PINK Edition
> **Trình tải đa phương tiện từ mạng xã hội (Media Grabber) phong cách Blackpink ngầu ngầu, đáng yêu & lấp lánh kim tuyến.**

---

## ✨ Điểm nổi bật & Tính năng (Features)

- 👑 **Phong cách BLACKPINK Đặc sắc**: Tone màu đen - hồng neon (`#070709` & `#ff2d75`), kết hợp hiệu ứng kim tuyến lấp lánh (Interactive Sparkles Canvas), vương miện và hiệu ứng pháo hoa sao rực rỡ khi hoàn tất tải.
- 🚫 **Xóa sạch Watermark 100%**: Tự động loại bỏ logo mờ, watermark trên các nền tảng hỗ trợ (TikTok HD, Instagram Reels, Facebook Video).
- 🎵 **Tách âm thanh MP3 riêng biệt**: Trích xuất bản nhạc nền / sound viral dưới dạng file MP3 chất lượng cao (320kbps / 192kbps) với trình phát nhạc (Audio Wave Player) xem trước trực tiếp.
- 📸 **Tải toàn bộ Album ảnh**: Hỗ trợ tải trọn bộ ảnh slide TikTok, Instagram carousel với chất lượng gốc.
- ⚡ **Stateless Serverless 100%**: Xử lý toàn bộ logic bóc tách qua API endpoints trên Vercel Serverless Functions mà không cần phụ thuộc cơ sở dữ liệu (Supabase), đảm bảo tốc độ cao và bảo mật riêng tư tuyệt đối cho người dùng.
- 📱 **Tối ưu toàn diện cho Mọi thiết bị (Mobile, Desktop, iOS, Android)**:
  - **iOS (iPhone/iPad)**: Tích hợp Proxy Streaming kèm header `Content-Disposition: attachment`, khắc phục triệt để lỗi Safari tự mở tab xem phim thay vì tải về Cuộn Camera (Photos).
  - **Android (Chrome/Samsung Internet)**: Tự động bắt link tải trực tiếp vào thư mục Download & Thư viện.
  - **Mã QR Siêu tiện lợi**: Người dùng đang duyệt trên máy tính có thể quét mã QR bằng camera điện thoại để lưu file tức thì.
  - Hỗ trợ **PWA (Progressive Web App)** với favicon và icon app chuẩn Blackpink.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/) + React 18 + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) với custom Blackpink palette & Neon Glow effects
- **Glitter & Particle Effects**: HTML5 Interactive Particle Canvas + Canvas-Confetti
- **Icons**: Lucide React + Custom SVG Favicon / Apple Touch Icon
- **Serverless API**: Next.js Serverless Route Handlers (`/api/extract` & `/api/proxy`)
- **CI/CD**: GitHub Actions (Linting, TypeScript Type Check, Production Build & Vercel Deploy)

---

## 📁 Cấu trúc dự án (Project Structure)

```
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline CI/CD tự động kiểm tra code & deploy Vercel
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── extract/       # API Serverless bóc tách link đa nền tảng
│   │   │   │   └── route.ts
│   │   │   └── proxy/         # API Serverless stream file ép tải về (iOS/Android fix)
│   │   │       └── route.ts
│   │   ├── apple-icon.svg     # Icon ứng dụng cho iPhone/iPad
│   │   ├── favicon.ico / icon.svg # Favicon vương miện lấp lánh chuẩn brand
│   │   ├── manifest.ts        # PWA Web App Manifest
│   │   ├── globals.css        # Custom styles & keyframe animations
│   │   ├── layout.tsx         # Root layout tối ưu viewport mobile (viewport-fit=cover)
│   │   └── page.tsx           # Trang chủ Media Grabber
│   ├── components/
│   │   ├── AudioPlayer.tsx    # Trình nghe thử file MP3 phong cách Blackpink
│   │   ├── FaqSection.tsx     # Hướng dẫn tải chi tiết cho iOS và Android
│   │   ├── FeatureHighlights.tsx # Khối giới thiệu 4 tính năng chính
│   │   ├── Footer.tsx         # Footer BLINKs & Creators
│   │   ├── GrabberInput.tsx   # Thanh nhập link neon glow, tự nhận diện nền tảng
│   │   ├── HistoryDrawer.tsx  # Lịch sử tải gần đây (Client-side localStorage)
│   │   ├── HeroHeader.tsx     # Tiêu đề bắt mắt & huy hiệu kim tuyến
│   │   ├── Navbar.tsx         # Header với status "BLACKPINK IN YOUR AREA"
│   │   ├── QrModal.tsx        # Modal mã QR quét bằng camera điện thoại
│   │   ├── ResultCard.tsx     # Thẻ hiển thị media & danh sách nút tải
│   │   └── SparkleCanvas.tsx  # Canvas kim tuyến tương tác chuột / chạm tay
│   ├── lib/
│   │   ├── confetti.ts        # Hiệu ứng nổ pháo hoa sao hồng & vàng
│   │   └── extractors/        # Bộ bóc tách link TikTok, IG, YT, FB, X...
│   └── types/
│       └── media.ts           # TypeScript interfaces cho media payload
├── package.json
└── tailwind.config.ts
```

---

## 🚀 Hướng dẫn Cài đặt & Chạy cục bộ (Local Development)

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Kiểm tra chất lượng code (Lint & Type-check)
```bash
npm run type-check
npm run lint
```

### 3. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

### 4. Build sản phẩm (Production Build)
```bash
npm run build
npm start
```

---

## 🌐 Triển khai lên Vercel Serverless (Deployment)

Dự án được tối ưu hóa 100% cho Vercel Serverless Functions:
1. Đẩy mã nguồn lên kho lưu trữ GitHub của bạn.
2. Truy cập [Vercel](https://vercel.com) > **Add New Project** > Chọn Repository vừa tạo.
3. Nhấn **Deploy**.
4. Các route `/api/extract` và `/api/proxy` sẽ tự động chuyển thành Serverless Functions với thời gian thực thi lên đến 30–45 giây và hỗ trợ streaming mượt mà.

### Cấu hình CI/CD Tự Động (GitHub Actions):
Trong file `.github/workflows/ci-cd.yml` đã được định cấu hình sẵn:
- Chạy tự động mỗi khi có `push` hoặc `pull_request` vào nhánh `main` / `master`.
- Tự động chạy **Type-check** (`tsc --noEmit`), **ESLint** (`npm run lint`), và **Build** (`npm run build`).
- Bạn có thể thêm 3 biến Secrets trong GitHub Repository (`Settings` > `Secrets and variables` > `Actions`):
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
  để tự động deploy production sau khi code pass toàn bộ bài kiểm tra!

---

## 📱 Khắc phục & Tối ưu trên iOS, Android & Computer

- **iOS (iPhone/iPad)**:
  - Thẻ `viewport` được định nghĩa `viewportFit: 'cover'`, hỗ trợ hiển thị tràn viền cho Dynamic Island & Notch trên iPhone.
  - Sử dụng proxy stream ép `Content-Disposition: attachment` để Safari hiển thị thông báo "Bạn có muốn tải về không?" và lưu thẳng vào thư mục Files hoặc Cuộn Camera.
  - Hỗ trợ thêm vào Màn hình chính (Add to Home Screen) như một ứng dụng PWA độc lập với icon riêng.
- **Android**:
  - Hỗ trợ mọi trình duyệt (Chrome, Samsung Internet, Firefox), tải trực tiếp về Gallery.
- **Computer**:
  - Trình phát Video và Audio nhúng trực tiếp để xem trước chất lượng trước khi tải.
  - QR Code Modal giúp chuyển link tải sang điện thoại chỉ với 1 thao tác quét camera.

---

## 💖 Tuyên bố miễn trừ trách nhiệm (Disclaimer)
Ứng dụng được tạo ra phục vụ cho mục đích học tập, sáng tạo nội dung cá nhân và sao lưu phương tiện hợp pháp. Vui lòng tuân thủ điều khoản dịch vụ và tôn trọng bản quyền của tác giả gốc trên từng nền tảng.
