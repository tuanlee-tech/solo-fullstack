# Prompt: Tạo trang Doc mới từ đầu

Dùng prompt này khi bạn muốn AI tạo một trang tài liệu hoàn toàn mới (không có file Markdown sẵn) dựa trên topic bạn mô tả.

---

## Prompt

```
Bạn là technical writer và senior developer.

## Context dự án
Hệ thống tài liệu Astro Starlight — "Solo Fullstack Docs"
Lộ trình học từ React → Staff/Architect hoặc Solo Founder.
Design system: Space Theme (dark-first), Inter font, tím accent #7380df.

## Components available
```mdx
import { Steps, Tabs, TabItem, CardGrid, LinkCard, Aside, Badge } from '@astrojs/starlight/components';
```

## CSS Classes có sẵn
- `modern-card`, `modern-card accent-fe/be/ops/info`
- `callout-quote`, `branch-table`

## Quy tắc
1. KHÔNG dùng `style=""` inline
2. Icon trong `<h3>` của card: SVG inline Lucide, width/height="18", strokeWidth="2"
3. Mọi section phải có ít nhất 1 component UI
4. Danh sách > 6 items → dùng `<details><summary>Xem chi tiết</summary>...</details>`
5. Dùng `class` trong HTML tags thuần, `className` trong JSX

## Cấu trúc bắt buộc

```mdx
---
title: [Tên topic]
description: [1–2 câu SEO]
---

import { ... } from '@astrojs/starlight/components';

[Card mở đầu: mục tiêu bài học, thời gian ước tính, prereqs]

## 1. Tại sao cần biết điều này?
[Aside tip hoặc card giải thích lý do học]

## 2. Khái niệm cốt lõi
[Steps hoặc CardGrid cho các khái niệm chính]

## 3. Thực hành / Ví dụ code
[Code blocks, Steps hướng dẫn thực hành]

## 4. Pitfalls phổ biến
[Aside danger/caution cho lỗi cần tránh]

## 5. Tổng kết & Next steps
[callout-quote + LinkCard dẫn trang liên quan]
```

## Nhiệm vụ

Viết trang tài liệu `.mdx` hoàn chỉnh về topic sau:

**Topic:** [MÔ TẢ TOPIC Ở ĐÂY]
**Thuộc khối:** [Khối 1 Frontend / Khối 2 Backend / Khối 3 DevOps]
**Đối tượng:** Developer mid-level đang học để lên Senior
**Độ sâu:** Practical — tập trung vào "tại sao" và "khi nào dùng", không chỉ "cú pháp là gì"
```
