# Prompt: Thêm trang mới vào Sidebar

Dùng prompt này khi bạn muốn AI thêm một hoặc nhiều mục vào sidebar config của `astro.config.mjs`.

---

## Prompt

```
Bạn là developer cấu hình Astro Starlight.

## File cần chỉnh sửa
`astro.config.mjs` — phần `sidebar` bên trong `starlight({ ... })`

## Cấu trúc sidebar item

```js
// Mục đơn
{ label: 'Tên hiển thị', link: '/path/to/page/' }

// Nhóm có thể thu gọn
{
  label: 'Tên Nhóm',
  collapsed: true,  // hoặc false để mở mặc định
  items: [
    { label: 'Tên mục', link: '/path/to/page/' },
  ]
}
```

## Quy tắc đặt link
- Link phải trùng khớp với đường dẫn file trong `src/content/docs/`
- File `src/content/docs/block-1/goals.mdx` → link `/block-1/goals/`
- Luôn có dấu `/` ở cuối
- Ký tự đặc biệt trong label dùng `&amp;` thay vì `&` trong JS string

## Nhiệm vụ

Thêm các mục sau vào sidebar (chỉ ra vị trí cụ thể cần insert):

**Vị trí:** [Ví dụ: "Bên trong nhóm 'Block 1: Master Frontend', sau mục 'Goals & Info'"]
**Các mục cần thêm:**
[MÔ TẢ CÁC MỤC CẦN THÊM]

Trả về: chỉ đoạn code thay đổi trong `astro.config.mjs` (không cần viết lại cả file).
```
