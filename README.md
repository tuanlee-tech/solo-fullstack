<div align="center">

# 🚀 Solo Fullstack Docs

**Lộ trình toàn diện từ React đến Staff/Architect hoặc Solo Founder**

Bản đồ học tập theo chiều ngang (Project-based) · Khởi đầu chung · Rẽ nhánh thông minh

[![Astro](https://img.shields.io/badge/Astro-7.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Starlight-0.41-7380df?style=flat-square&logo=astro&logoColor=white)](https://starlight.astro.build)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F6821F?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

[📖 Đọc tài liệu](https://solo-fullstack.pages.dev) · [🗺 Tổng quan lộ trình](https://solo-fullstack.pages.dev/overview/roadmap-overview/)

</div>

---

## 📌 Về dự án

**Solo Fullstack Docs** là hệ thống tài liệu học tập mã nguồn mở, xây dựng trên nền tảng Astro + Starlight. Tài liệu trình bày một lộ trình học fullstack thực dụng cho developer Việt Nam, từ nền tảng JavaScript/React đến hai con đường sự nghiệp:

- **Nhánh A — Staff/Architect:** Lên Senior, Staff, Principal Engineer tại công ty
- **Nhánh B — Solo Founder:** Tự xây dựng sản phẩm SaaS, kinh doanh độc lập

> **Triết lý cốt lõi:** Học lõi chung trước (Frontend + Backend + DevOps), dừng lại ở checkpoint để đánh giá hoàn cảnh thực tế, rẽ nhánh dựa trên dữ kiện — không phải cảm tính.

---

## 🗺 Cấu trúc lộ trình

```
Lõi Chung (9–12 tháng)
├── Khối 1: Master Frontend      (3–6 tháng)
│   JS Core, React/Next.js, TypeScript, Testing, Performance, System Design
├── Khối 2: Master Backend       (6–12 tháng)
│   NestJS, Prisma, PostgreSQL, Stripe, BullMQ, LLM + RAG
└── Khối 3: DevOps Cơ Bản       (2–3 tháng)
    Docker, CI/CD, Nginx, Cloudflare, Observability

         ↓ Điểm Rẽ Nhánh (Checkpoint) ↓

Nhánh A: Staff/Architect         Nhánh B: Solo Founder
├── High Traffic System Design   ├── Validate Before Build
└── Career & Interview           ├── Minimal Deploy
                                 └── Product, Growth & Business
```

---

## 🛠 Tech Stack

| Layer | Công nghệ |
|---|---|
| Framework | [Astro v7](https://astro.build) + [Starlight v0.41](https://starlight.astro.build) |
| Styling | Vanilla CSS — Space Theme (dark-first, Inter font) |
| Search | [Pagefind](https://pagefind.app) — full-text, offline |
| i18n | Tiếng Việt (default) + English (fallback tự động) |
| Deploy | [Cloudflare Pages](https://pages.cloudflare.com) |

---

## ⚡ Getting Started

```bash
# Clone repo
git clone https://github.com/tuanlee-tech/solo-fullstack.git
cd solo-fullstack

# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev
# → http://localhost:4321
```

```bash
# Build production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Cấu trúc thư mục

```
solo-fullstack/
├── src/
│   ├── assets/              # Logo, images
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx              # Trang chủ
│   │       ├── overview/              # Tổng quan lộ trình
│   │       ├── block-1-master-frontend/
│   │       ├── block-2-master-backend/
│   │       ├── block-3-devops-basics/
│   │       ├── branch-a-staff-architect/
│   │       ├── branch-b-solo-founder/
│   │       └── en/                    # Bản dịch tiếng Anh
│   └── styles/
│       └── custom.css       # Design system (Space Theme)
├── public/
│   ├── og-image.png         # Default OG image
│   ├── favicon.svg
│   └── robots.txt
├── prompts/                 # AI prompt templates
│   ├── MEMORY.md            # Project context cho AI
│   ├── convert-markdown-to-mdx.md
│   ├── new-doc-page.md
│   ├── review-improve-mdx.md
│   └── add-sidebar-item.md
└── astro.config.mjs
```

---

## 🌐 Thêm ngôn ngữ mới (i18n)

Starlight hỗ trợ fallback tự động. Để thêm một ngôn ngữ:

**1.** Thêm locale vào `astro.config.mjs`:
```js
locales: {
  root: { label: 'Tiếng Việt', lang: 'vi' },
  en:   { label: 'English',    lang: 'en' },
  // ja: { label: '日本語', lang: 'ja' }, // ví dụ
},
```

**2.** Tạo file dịch với cùng đường dẫn tương đối:
```
src/content/docs/overview/roadmap-overview.mdx      ← Tiếng Việt
src/content/docs/en/overview/roadmap-overview.mdx   ← English
```

Nếu file chưa được dịch, Starlight tự fallback về bản gốc và hiển thị banner "Translation missing".

---

## ✍️ Đóng góp nội dung

Mỗi bài giảng là một file `.mdx` sử dụng Starlight components. Xem thư mục `prompts/` để biết cách viết bài nhất quán với design system.

**Quy trình nhanh:**
1. Đọc `prompts/MEMORY.md` — project context và design system
2. Dùng `prompts/convert-markdown-to-mdx.md` nếu có nội dung Markdown sẵn
3. Hoặc `prompts/new-doc-page.md` để tạo trang mới từ đầu
4. Đăng ký trang mới vào sidebar trong `astro.config.mjs`

---

## 🚀 Deploy lên Cloudflare Pages

1. Fork repo → Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. Chọn repository, cấu hình build:

   | Setting | Value |
   |---|---|
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

3. Thêm Environment Variable:

   | Variable | Value |
   |---|---|
   | `SITE_URL` | `https://your-project.pages.dev` |
   | `NODE_VERSION` | `20` |

---

## 📄 License

MIT © 2024 — Nội dung tài liệu thuộc về tác giả.
