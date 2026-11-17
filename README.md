# Phòng Lab KHTN (Vật lí + Hoá học) và Toán 8

Mô phỏng thí nghiệm cho phần Vật lí (48 bài) và phần Hoá học (37 bài) của KHTN 7, KHTN 8 và KHTN 9 (bộ Kết nối tri thức), thiết kế để giáo viên trình chiếu trên lớp.

- Toán 8 (Kết nối tri thức): đủ 39 bài của 10 chương, 187 cảnh, mỗi bài có nội dung bài học. Route `#/toan/8`, mã bài `t8-1` … `t8-39`.
- KHTN 7: Vật lí Bài 1, 8–20 (tốc độ, âm thanh, ánh sáng, từ); Hoá học Bài 2–7 (nguyên tử, nguyên tố, bảng tuần hoàn, phân tử, liên kết, hoá trị). Phần Sinh học không thuộc phạm vi app.
Kế hoạch đầy đủ và tiến độ xem tại [docs/KE_HOACH.md](docs/KE_HOACH.md).

## Dùng ngay (không cần cài gì)

Sau khi build, toàn bộ app nằm trong **một file duy nhất**: `PhongLabKHTN.html` ở thư mục gốc (bản sao của `dist/index.html`). File `PhongLabVatLi.html` là bản sao giống hệt, giữ lại cho các đường dẫn cũ.

> Đừng mở `index.html` ở thư mục gốc: đó là file nguồn cho lập trình, mở trực tiếp sẽ không chạy.

- Nhấp đúp vào file để mở bằng Chrome/Edge. App chạy được không cần mạng.
- Chép file này vào USB hoặc gửi qua Zalo/Drive để dùng trên máy ở lớp.

## Dành cho người phát triển

Cần cài Node.js 18 trở lên.

```bash
npm install      # cài thư viện (chỉ lần đầu)
npm run dev      # chạy thử, mở http://localhost:5173
npm test         # kiểm thử bộ giải mạch điện, luật phản ứng hoá học và dữ liệu các bài Hoá
npm run build    # tạo dist/index.html
```

## Cấu trúc thư mục

```
src/
  core/        kiểu dữ liệu, danh mục 34 bài, định dạng số, lưu/mở/chia sẻ, điều hướng
  engines/     các bộ mô phỏng dùng chung (mỗi engine phục vụ nhiều bài)
    circuit/       E1 – bàn lắp mạch điện: model, bộ giải (solver), hình vẽ, bảng thông số
    optics/        E2 – bàn quang học: bộ dò tia (trace.ts), thấu kính, màu sắc
    fluid/         E3 – khối lượng riêng, áp suất, lực đẩy Archimedes
    mechanics/     E4 – moment, đòn bẩy, năng lượng, công, công suất
    thermal/       E5 – nhiễm điện, mô hình hạt, truyền nhiệt, nở vì nhiệt
    electromagnet/ E6 – cảm ứng điện từ, dòng điện xoay chiều
    diagram/       E7 – sơ đồ tương tác (dụng cụ, năng lượng)
    phys7/         P8–P11 – Vật lí 7: tốc độ (cổng quang, đồ thị s–t, an toàn giao thông), âm thanh
                   (nguồn âm, sóng âm, dao động kí, tiếng vang), ánh sáng (vùng tối, phản xạ, gương phẳng),
                   từ (nam châm, từ phổ, Oersted, nam châm điện). Bốn engine dùng chung Phys7View.
    chem/          H1–H3 – Hoá học: bàn ống nghiệm (data.ts: hoá chất + luật phản ứng), pH, chuẩn độ,
                   tốc độ phản ứng, dung dịch, mol, cân bằng PTHH, công thức cấu tạo, polymer, mô hình nguyên tử,
                   bảng tuần hoàn (elements.ts), liên kết ion/cộng hoá trị, hoá trị (AtomViews.tsx),
                   thẻ thông tin & quy trình (infoData.ts), lò cao, chưng cất dầu, chu trình carbon…
    math/          T1–T6 – Toán 8: đại số (đơn thức, đa thức, mô hình diện tích, hằng đẳng thức bằng hình,
                   cân phương trình, phân thức có đồ thị), hàm số (sơ đồ mũi tên, mặt phẳng toạ độ, y = ax + b),
                   hình học (tứ giác kéo đỉnh giữ tính chất, Thalès, phân giác, đồng dạng, Pythagore, đo gián tiếp),
                   dữ liệu – biểu đồ, xác suất (liệt kê kết quả, thí nghiệm lặp), hình chóp đều 3D.
                   Dữ liệu: mathData.ts, lời giải từng bước: mathDerive.ts. Sáu engine dùng chung MathView.
    registry.ts
  lessons/     nội dung từng bài: danh sách cảnh, lời dẫn, câu hỏi, báo cáo
    phys7.ts, chem7.ts  danh sách cảnh các bài lớp 7 (id l7-x, h7-x)
    math8a.ts, math8b.ts  danh sách cảnh Toán 8 (id t8-x)
    chem8.ts, chem9.ts  danh sách cảnh các bài Hoá (id h8-x, h9-x)
    notes/     nội dung bài học (kiến thức, hiện tượng, ví dụ, câu hỏi vận dụng) cho 34 bài Lí + 31 bài Hoá
  ui/          trang chủ, danh sách bài, khung trình chiếu, bút vẽ, báo cáo
```

### Thêm một bài mới cho engine đã có

1. Viết danh sách cảnh trong `src/lessons/<engine>.ts` (xem `circuit.ts`).
2. Đăng ký vào `CONTENT` trong `src/lessons/index.ts`.

Bài sẽ tự hiện trong danh sách lớp, vì danh mục bài nằm trong `src/core/catalog.ts`.

### Thêm một engine mới

1. Tạo `src/engines/<ten>/`. Component chính nhận `EngineProps` (doc, onDoc, options, showValues, onMeasure).
2. Đăng ký trong `src/engines/registry.ts`.

Khung trình chiếu (ẩn số đo, bút vẽ, kính lúp, lưu/link, báo cáo) dùng chung cho mọi engine, không cần viết lại.

## Phím tắt khi trình chiếu

| Phím | Chức năng |
|---|---|
| ← → / PageUp PageDown | Chuyển cảnh (dùng được bút trình chiếu) |
| H | Ẩn/hiện số đo |
| P | Bút vẽ chú thích |
| Q | Hiện câu hỏi |
| N | Mở/đóng nội dung bài học |
| F | Toàn màn hình |
| Esc | Tắt bút vẽ, kính lúp |
| Ctrl+Z | Hoàn tác (bàn lắp mạch) |
| R | Xoay linh kiện đang chọn |
| Delete | Xoá linh kiện/dây đang chọn |

### Thêm phản ứng mới cho bàn ống nghiệm (Hoá học)

1. Khai báo chất trong `SUBS` (`src/engines/chem/data.ts`): công thức, tên, loại (dung dịch, chất rắn, kết tủa…), màu.
2. Thêm một luật vào `RULES`: hai chất phản ứng `a`, `b`, điều kiện (`need: 'heat'`, `cat`), sản phẩm `out`, khí thoát ra, phương trình `eq`, hiện tượng `obs`.
3. Chạy `npm test` – bài kiểm thử tự kiểm tra mọi cảnh tham chiếu đúng chất và dữ liệu.
