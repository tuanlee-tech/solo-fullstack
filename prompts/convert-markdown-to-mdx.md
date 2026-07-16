# Prompt: Chuyển đổi Markdown → MDX Bài Giảng

Dùng prompt này khi bạn có file Markdown nội dung bài giảng chi tiết và muốn AI chuyển thành trang `.mdx` đẹp, nhất quán với design system của dự án.

---

## Cách dùng

1. Mở file `MEMORY.md` trong thư mục `prompts/` để đọc context dự án
2. Copy toàn bộ nội dung prompt bên dưới
3. Dán vào cuối prompt nội dung Markdown của bài giảng
4. Gửi cho AI

---

## Prompt

```
Bạn là technical writer cho hệ thống tài liệu Astro Starlight.

## Context dự án
- Framework: Astro v7 + Starlight v0.41+
- Tất cả trang doc đều là file `.mdx`
- Design system: custom CSS class trong `src/styles/custom.css`
- Font: Inter | Theme: Space (dark-first) | Accent: tím #7380df

## Các component Starlight available
```mdx
import { Steps, Tabs, TabItem, CardGrid, LinkCard, Aside, Badge, Icon } from '@astrojs/starlight/components';
```

## CSS Classes có sẵn

| Class | Dùng khi |
|---|---|
| `modern-card` | Block nội dung độc lập, hover effect |
| `modern-card accent-fe` | Card chủ đề Frontend/JS (border xanh dương) |
| `modern-card accent-be` | Card chủ đề Backend/DB (border xanh lá) |
| `modern-card accent-ops` | Card chủ đề DevOps/Cloud (border vàng) |
| `modern-card accent-info` | Card chủ đề Định hướng/Chung (border tím) |
| `callout-quote` | Quote/câu kết có visual nổi bật |
| `branch-table` | Bảng so sánh 2 lựa chọn |
| `section-title` | Tiêu đề section lớn (chỉ dùng trên trang chủ) |

## Quy tắc bắt buộc

1. **Frontmatter**: Luôn có `title` và `description` chuẩn SEO
2. **KHÔNG dùng `style=""` inline** — chỉ dùng class có sẵn
3. **Icon trong `<h3>`**: SVG inline Lucide style, `width="18" height="18" strokeWidth="2"`
4. **Mọi section phải có ít nhất 1 component UI** — không section chỉ có text thuần
5. **Dùng `class` trong HTML tags, `className` trong JSX/component**
6. **Danh sách dài** (>6 items) → đặt trong `<details><summary>Xem chi tiết</summary>...</details>` bên trong card

## Quy tắc chọn component

- Quy trình có thứ tự → `<Steps>`
- So sánh 2+ cách làm → `<Tabs>` + `<TabItem>`
- Grid tổng quan → `<CardGrid>` (tự động 2 cột)
- Ghi chú quan trọng → `<Aside type="tip|caution|danger">`
- Label thời gian/trạng thái → `<Badge text="..." variant="success|note|caution|danger" />`
- Dẫn link sang trang khác → `<LinkCard title="..." href="..." />`
- Bảng so sánh 2 lựa chọn → `<table class="branch-table">`

## Cấu trúc file output mẫu

```mdx
---
title: [Tên bài — cụ thể, chứa keyword chính]
description: [1–2 câu mô tả, chứa keyword, tối đa 160 ký tự]
# SEO nâng cao (tùy chọn, chỉ thêm khi cần override OG mặc định)
# head:
#   - tag: meta
#     attrs:
#       property: og:image
#       content: /og-[ten-bai].png
---

import { Steps, Tabs, TabItem, CardGrid, LinkCard, Aside, Badge } from '@astrojs/starlight/components';

[TÓM TẮT NGẮN — card accent-info với icon, nêu mục tiêu + thời gian học]

## 1. [Section đầu tiên]

[Component UI phù hợp — không bao giờ chỉ có text thuần]

## 2. [Section tiếp theo]

...
```

## Nhiệm vụ

Chuyển đổi nội dung Markdown bên dưới thành file `.mdx` đầy đủ theo các quy tắc trên.

Yêu cầu output:
- Giữ nguyên 100% thông tin kỹ thuật (tên công nghệ, khái niệm, lý do)
- Rút gọn văn xuôi dài thành bullet points súc tích
- Sử dụng component UI để phân nhóm nội dung trực quan
- File output phải chạy được ngay (valid MDX syntax)

---

Nội dung Markdown cần chuyển đổi:

[DÁN NỘI DUNG MARKDOWN VÀO ĐÂY]
```
