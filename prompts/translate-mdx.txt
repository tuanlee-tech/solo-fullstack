# Prompt: Dịch MDX sang ngôn ngữ khác (i18n)

Dùng prompt này khi bạn đã có một file `.mdx` hoàn chỉnh (thường là tiếng Việt) và muốn AI dịch nó sang ngôn ngữ khác (ví dụ: tiếng Anh) nhưng vẫn giữ nguyên vẹn cấu trúc UI, component và design system.

---

## Cách dùng

1. Copy toàn bộ nội dung prompt bên dưới
2. Cung cấp file `.mdx` gốc cho AI (bằng cách upload hoặc dán nội dung vào cuối prompt)
3. Xác định rõ ngôn ngữ mục tiêu (mặc định trong prompt là tiếng Anh `en`)
4. Lưu file kết quả vào đúng thư mục ngôn ngữ (ví dụ: `src/content/docs/en/...` giữ nguyên đường dẫn tương đối)

---

## Prompt

```
Bạn là một chuyên gia dịch thuật và technical writer cho hệ thống tài liệu Astro Starlight.

Nhiệm vụ của bạn là dịch file `.mdx` dưới đây từ Tiếng Việt sang **Tiếng Anh (English)**.

## Quy tắc bắt buộc:
1. **Giữ nguyên 100% cấu trúc MDX**: Các component của Starlight (như `<Steps>`, `<Tabs>`, `<CardGrid>`, `<LinkCard>`, `<Badge>`, `<Aside>`) và các thẻ HTML/CSS (`class="modern-card..."`, SVG icons) PHẢI ĐƯỢC GIỮ NGUYÊN. Chỉ dịch phần nội dung text bên trong.
2. **Frontmatter**: Dịch `title` và `description`. Giữ nguyên cấu trúc YAML.
3. **Internal Links (Rất quan trọng)**: Khi dịch sang tiếng Anh, bạn phải tự động thêm prefix `/en` vào các link nội bộ. 
   - Ví dụ gốc: `href="/block-1-master-frontend/goals-and-info/"`
   - Dịch thành: `href="/en/block-1-master-frontend/goals-and-info/"`
4. **Văn phong**: Kỹ thuật, chuyên nghiệp, súc tích, giữ nguyên các thuật ngữ tiếng Anh gốc của ngành IT (ví dụ: Frontend, Backend, CI/CD, Deployment, Framework, v.v.). Không cố dịch các thuật ngữ chuyên ngành sang tiếng Việt/ngôn ngữ khác nếu nó làm mất tính tự nhiên.

## Cấu trúc file mẫu mong đợi:

```mdx
---
title: [Translated Title]
description: [Translated Description]
---

import { Steps, Tabs, TabItem, CardGrid, LinkCard, Icon, Badge } from '@astrojs/starlight/components';

<div class="modern-card accent-info" style={{ marginBottom: '2rem' }}>
  <h3>
    <svg>...</svg>
    [Translated Heading]
  </h3>
  <p>[Translated Content]</p>
</div>

## 1. [Translated Section]

<Steps>
1. **[Translated Step]**
   [Translated Description]
</Steps>
...
```

Dưới đây là nội dung file `.mdx` gốc:

[DÁN NỘI DUNG MDX GỐC VÀO ĐÂY]
```
