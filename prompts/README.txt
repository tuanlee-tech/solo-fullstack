# Prompts — Solo Fullstack Docs

Thư mục này chứa các prompt và memory files để làm việc hiệu quả với AI khi phát triển hệ thống tài liệu.

## Danh sách files

| File | Mục đích | Khi nào dùng |
|---|---|---|
| [`MEMORY.md`](./MEMORY.md) | Context toàn bộ dự án, design system, quy tắc | **Đọc đầu tiên** trước mọi task |
| [`convert-markdown-to-mdx.md`](./convert-markdown-to-mdx.md) | Chuyển file Markdown bài giảng → MDX đẹp | Khi có nội dung raw Markdown cần format |
| [`new-doc-page.md`](./new-doc-page.md) | Tạo trang tài liệu mới từ đầu | Khi cần viết trang hoàn toàn mới |
| [`review-improve-mdx.md`](./review-improve-mdx.md) | Review & cải thiện UI/UX trang MDX hiện có | Khi trang hiện tại chưa đẹp/nhất quán |
| [`translate-mdx.md`](./translate-mdx.md) | Dịch file MDX sang ngôn ngữ khác | Khi làm đa ngôn ngữ (i18n), dịch nhưng giữ nguyên UI/component |
| [`add-sidebar-item.md`](./add-sidebar-item.md) | Thêm mục vào sidebar config | Khi thêm trang mới vào navigation |

---

## Workflow điển hình

### Thêm bài giảng mới từ file Markdown thô

```
1. Đọc MEMORY.md để nạp context
2. Dùng prompt trong convert-markdown-to-mdx.md
3. Dán nội dung Markdown vào → AI trả về file .mdx
4. Lưu file vào đúng thư mục trong src/content/docs/
5. Dùng prompt trong add-sidebar-item.md để đăng ký vào sidebar
```

### Tạo trang mới từ đầu

```
1. Đọc MEMORY.md
2. Dùng prompt trong new-doc-page.md
3. Mô tả topic → AI viết file .mdx
4. Review bằng prompt trong review-improve-mdx.md nếu cần
5. Lưu file + đăng ký sidebar
```

### Cải thiện trang hiện có

```
1. Đọc MEMORY.md
2. Copy nội dung file .mdx cần cải thiện
3. Dùng prompt trong review-improve-mdx.md
4. AI phân tích + viết lại → replace file cũ
```

---

## Quick Reference — Design System

```
Accent colors:
  .accent-fe  → #60a5fa (xanh dương — Frontend)
  .accent-be  → #34d399 (xanh lá   — Backend)
  .accent-ops → #f59e0b (vàng cam  — DevOps)
  .accent-info→ #7380df (tím       — Chung)

Starlight components:
  <Steps>             → quy trình có thứ tự
  <Tabs>/<TabItem>    → so sánh 2+ cách
  <CardGrid>          → grid 2 cột
  <LinkCard>          → nút dẫn trang khác
  <Aside type="...">  → tip / caution / danger
  <Badge text="...">  → label trạng thái
```
