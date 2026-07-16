# Project Memory — Solo Fullstack Docs

Đây là file context quan trọng nhất. Đọc file này trước khi làm bất kỳ task nào liên quan đến dự án.

---

## Stack & Framework

| Layer | Công nghệ |
|---|---|
| **Framework** | Astro v7 + Starlight v0.41+ |
| **Language** | MDX (`.mdx`) cho tất cả doc pages |
| **Font** | Inter (via `@fontsource/inter`) |
| **Styling** | Vanilla CSS — `src/styles/custom.css` |
| **Search** | Pagefind (built-in Starlight, vi + en) |
| **i18n** | `root` = Tiếng Việt (default), `en` = English (fallback tự động) |
| **Build** | Static site — `npm run build` |
| **Dev** | `npm run dev` → `http://localhost:4321` |

---

## Cấu trúc i18n (Đa ngôn ngữ)

### Nguyên tắc

Starlight dùng **cấu trúc thư mục** để phân ngôn ngữ:

```
src/content/docs/
│
├── overview/roadmap-overview.mdx       ← Tiếng Việt (root/default, không có prefix)
│
├── en/                                  ← English
│   └── overview/roadmap-overview.mdx   ← Đường dẫn tương đối PHẢI giống hệt bản gốc
│
└── ja/                                  ← Thêm ngôn ngữ khác tương tự
    └── overview/roadmap-overview.mdx
```

### Cách thêm ngôn ngữ mới

**Bước 1:** Thêm locale vào `astro.config.mjs`:
```js
locales: {
  root: { label: 'Tiếng Việt', lang: 'vi' },  // default — đừng xóa
  en:   { label: 'English',    lang: 'en' },
  ja:   { label: '日本語',      lang: 'ja' },   // ví dụ thêm tiếng Nhật
},
```

**Bước 2:** Tạo file dịch với **cùng đường dẫn tương đối**:
- Gốc: `src/content/docs/overview/roadmap-overview.mdx`
- EN:  `src/content/docs/en/overview/roadmap-overview.mdx`
- JA:  `src/content/docs/ja/overview/roadmap-overview.mdx`

**Bước 3 (tùy chọn):** Dịch cả homepage:
- Gốc: `src/content/docs/index.mdx`
- EN:  `src/content/docs/en/index.mdx`

### Fallback tự động

- Nếu file `en/X.mdx` **chưa tồn tại**, Starlight hiển thị bản tiếng Việt gốc kèm banner "Translation missing".
- Không cần dịch hết tất cả — chỉ dịch những trang quan trọng nhất.

### URL structure

| Ngôn ngữ | URL |
|---|---|
| Tiếng Việt (root) | `/overview/roadmap-overview/` |
| English | `/en/overview/roadmap-overview/` |
| 日本語 | `/ja/overview/roadmap-overview/` |

### Link giữa các ngôn ngữ trong MDX

Khi viết bản EN, link nội bộ phải có prefix `/en/`:
```mdx
<LinkCard title="Start Block 1" href="/en/block-1-master-frontend/goals-and-info/" />
```


---

## Cấu trúc thư mục

```
solo-fullstack-docs/
├── src/
│   ├── assets/
│   │   └── logo.svg              # Logo gradient tím-xanh (Stack icon)
│   ├── components/               # Custom Astro components (nếu có)
│   ├── content/
│   │   ├── config.ts             # Starlight content collection config
│   │   └── docs/
│   │       ├── index.mdx         # Trang chủ (template: splash)
│   │       ├── overview/
│   │       │   └── roadmap-overview.mdx
│   │       ├── block-1-master-frontend/
│   │       ├── block-2-master-backend/
│   │       ├── block-3-devops-basics/
│   │       ├── branch-a-staff-architect/
│   │       └── branch-b-solo-founder/
│   └── styles/
│       └── custom.css            # Theme chính — KHÔNG sửa inline style trong MDX
├── public/                       # Static assets (giữ lại để reference)
├── astro.config.mjs              # Sidebar, i18n, customCss config
├── prompts/                      # Prompt files cho AI (thư mục này)
└── package.json
```

---

## Design System — CSS Variables

### Color Tokens (Dark Mode — primary context)

```css
--sl-color-accent:       #7380df  /* Tím chủ đạo */
--sl-color-accent-high:  #c3cbf4  /* Tím sáng — text on dark */
--sl-color-accent-low:   #23263f  /* Tím tối — background tint */

--sl-color-bg:           #0d0f14  /* Nền main content (tối nhất) */
--sl-color-bg-nav:       #161822  /* Nền Header + Sidebar (sáng hơn) */
--sl-color-hairline:     #2d3040  /* Border đậm */
--sl-color-hairline-light: #1e212d  /* Border nhạt */

--sl-color-gray-1: #eceef2   /* Text chính */
--sl-color-gray-2: #c0c2c7   /* Text phụ / mô tả */
--sl-color-gray-3: #888b96   /* Text mờ / hint */
```

### Accent Stripe Card Classes

| Class | Màu Border-left | Dùng cho |
|---|---|---|
| `.accent-fe` | `#60a5fa` (xanh dương) | Frontend / JavaScript / React |
| `.accent-be` | `#34d399` (xanh lá) | Backend / Database / API |
| `.accent-ops` | `#f59e0b` (vàng cam) | DevOps / Infrastructure / Cloud |
| `.accent-info` | `#7380df` (tím accent) | Khái niệm chung / Định hướng |

---

## Component Reference — Starlight Built-in

Import dùng trong mọi `.mdx`:

```mdx
import { Steps, Tabs, TabItem, CardGrid, LinkCard, Aside, Badge, Icon } from '@astrojs/starlight/components';
```

### Khi nào dùng component nào

| Component | Dùng khi |
|---|---|
| `<Steps>` | Quy trình có thứ tự (setup, install, flow) |
| `<Tabs>` + `<TabItem>` | So sánh 2+ phương án (JS vs TS, cách cũ vs mới) |
| `<CardGrid>` | Grid 2 cột cho các item tổng quan |
| `<LinkCard>` | Nút "Xem chi tiết" dẫn sang trang khác |
| `<Aside type="tip">` | Ghi chú hữu ích, best practice |
| `<Aside type="caution">` | Cảnh báo quan trọng |
| `<Aside type="danger">` | Lỗi phổ biến cần tránh hoàn toàn |
| `<Badge>` | Label trạng thái/thời gian trong `<h3>` |
| `<Icon>` | Icon Starlight built-in (laptop, setting, rocket...) |

### Khi nào dùng custom class

| Class | Dùng khi |
|---|---|
| `<div class="modern-card">` | Block nội dung độc lập, có thể hover |
| `<div class="modern-card accent-*">` | Card với màu border trái để phân loại |
| `<div class="callout-quote">` | Quote/câu kết bài có visual nổi bật |
| `<table class="branch-table">` | Bảng so sánh 2 lựa chọn có styled header |
| `<h2 class="section-title">` | Tiêu đề section trên trang chủ (gradient) |
| `<p class="section-subtitle">` | Phụ đề nhỏ bên dưới section-title |
| `<details>` trong `modern-card` | Danh sách dài ẩn đi, click mới hiện |

---

## Quy tắc bắt buộc khi viết MDX

1. **KHÔNG dùng `style="..."` inline** trong MDX — luôn dùng class đã có trong `custom.css`
2. **Icon trong `<h3>` của card**: SVG inline Lucide style (`strokeWidth="2"`, `width/height="18"`)
3. **Mọi section phải có ít nhất 1 component UI** — không section nào chỉ có text thuần
4. **`className` vs `class`**: Dùng `class` trong HTML tags thuần (div, table), dùng `className` trong JSX components
5. **Frontmatter bắt buộc**: `title` và `description` (chuẩn SEO, 1–2 câu)
6. **Trang chủ** (`index.mdx`): Dùng `template: splash` — KHÔNG áp dụng cho các trang khác
7. **File extension**: Mọi file có component JSX/Starlight phải là `.mdx`, không phải `.md`

---

## Sidebar Config (`astro.config.mjs`)

Khi thêm trang mới, phải đăng ký trong `sidebar` của `astro.config.mjs`. Ví dụ:

```js
{
  label: 'Block 1: Master Frontend',
  collapsed: false,
  items: [
    { label: 'Goals & Info', link: '/block-1-master-frontend/goals-and-info/' },
    // thêm mục mới ở đây
  ]
}
```

---

## SEO

### Default OG Image

File `public/og-image.png` được dùng làm OG image mặc định cho toàn bộ site. Cấu hình trong `astro.config.mjs` → `head: [...]`.

Khi share link bất kỳ trang nào lên Facebook/Twitter/Zalo, ảnh `og-image.png` sẽ tự động hiển thị.

### Frontmatter SEO bắt buộc (mỗi trang)

```yaml
---
title: Tên bài — cụ thể, chứa keyword chính      # Xuất hiện trên tab browser + search results
description: Mô tả 1–2 câu, chứa keyword, ≤160 ký tự  # Xuất hiện dưới title trong Google
---
```

### Override OG image cho trang cụ thể (tùy chọn)

Nếu muốn một trang dùng ảnh OG riêng (ví dụ landing page quan trọng):

```yaml
---
title: Tên bài
description: Mô tả
head:
  - tag: meta
    attrs:
      property: og:image
      content: /og-ten-bai-cu-the.png   # đặt file trong /public/
  - tag: meta
    attrs:
      name: twitter:image
      content: /og-ten-bai-cu-the.png
---
```

### Checklist SEO khi viết bài mới

- [ ] `title` chứa keyword chính, không quá 60 ký tự
- [ ] `description` mô tả rõ giá trị bài viết, ≤160 ký tự
- [ ] Heading có `##` duy nhất đóng vai H1 thứ 2 (Starlight tự render `title` là H1)
- [ ] Có `lastUpdated: true` trong `astro.config.mjs` → Google thấy freshness signal

---

## Lưu ý Deploy & Build

- Chạy `npm install --legacy-peer-deps` nếu gặp peer dependency conflict
- `@astrojs/sitemap` cần thêm `site: 'https://yourdomain.com'` vào `astro.config.mjs` để tắt warning
- Pagefind index tự động sau `npm run build`, không cần config thêm
