# Kế hoạch: Phòng Lab Vật lý online – KHTN 8 & 9 (Kết nối tri thức)

**Người dùng chính:** giáo viên trình chiếu trên lớp. Chế độ học sinh tự làm sẽ phát triển ở giai đoạn sau.
**Phạm vi:** toàn bộ phần Vật lý: KHTN 8 (Bài 13–29) và KHTN 9 (Bài 1–17), tổng 34 bài.
**Nguyên tắc nội dung:** số thứ tự và tên bài theo SGK để giáo viên dễ tra cứu. Chữ và hình trong app tự viết, tự vẽ, không chép từ SGK.

---

## 1. Kiến trúc

- React + TypeScript + Vite. Web tĩnh, không cần server, chạy được offline (mở từ USB) và online.
- Mỗi **engine** là một bộ mô phỏng dùng chung cho nhiều bài. Mỗi **bài** gồm phần cấu hình và danh sách **cảnh** (giống các slide), mỗi cảnh là một trạng thái dựng sẵn của engine.
- Vẽ hình: SVG cho mạch điện và quang học (nét sắc, dễ kéo thả). Canvas 2D cho phần chuyển động (hạt, chất lỏng, con lắc). uPlot để vẽ đồ thị.
- Phần vật lý tự viết bằng công thức, không dùng thư viện vật lý. Đơn vị bên trong là SI.

### Chế độ trình chiếu (dùng chung cho mọi bài)
- Toàn màn hình, giao diện 16:9, chữ lớn, tương phản cao.
- Chuyển cảnh bằng phím ← → hoặc PageUp/PageDown (bút trình chiếu bấm được).
- **Ẩn/Hiện số đo** để học sinh dự đoán trước khi xem kết quả.
- Bút vẽ chú thích, kính lúp phóng to một vùng, chạy chậm, tạm dừng, chạy từng bước.
- Lưu và mở thí nghiệm do giáo viên tự lắp, dưới dạng file `.json` hoặc đường link.
- Nút to, dùng được trên màn hình cảm ứng hoặc bảng tương tác.

### Module Báo cáo thực hành (dùng chung)
Gồm: mục đích, chuẩn bị, các bước, bảng số liệu tự điền từ phép đo trên mô phỏng, tính trung bình, đồ thị, nhận xét. In được hoặc xuất PDF.
Dùng cho các bài: L8-14, L8-25, L8-27, L9-9 (và L9-1 giới thiệu cách viết báo cáo).

---

## 2. Các engine

| Mã | Engine | Bài sử dụng |
|---|---|---|
| E1 | Bàn lắp mạch điện (một chiều + xoay chiều) | L8: 21, 22, 23, 24, 25 · L9: 11, 12, 13, 15 |
| E2 | Bàn quang học | L9: 5, 6, 7, 8, 9, 10 |
| E3 | Bình chất lỏng & áp suất | L8: 13, 14, 15, 16, 17 |
| E4 | Cơ học (moment, đòn bẩy, năng lượng, công) | L8: 18, 19 · L9: 2, 3, 4 |
| E5 | Mô hình hạt & nhiệt | L8: 20, 26, 27, 28, 29 |
| E6 | Điện từ | L9: 14, 15 |
| E7 | Sơ đồ tương tác (bài thiên về lý thuyết) | L9: 1, 16, 17 |

---

## 3. Chi tiết từng bài

### KHTN 8

**Chương III – Khối lượng riêng và áp suất (E3)**
- **Bài 13 – Khối lượng riêng:** Cân và bình chia độ. Đo m và V của các khối sắt, nhôm, đồng cùng thể tích, lập bảng tỉ số m/V. Bảng so sánh khối lượng riêng các chất. Công thức D = m/V và cách đổi đơn vị kg/m³ ↔ g/cm³.
- **Bài 14 – Thực hành xác định KLR** *(Báo cáo)*: (1) Vật hình hộp: đo a, b, c bằng thước và cân lấy m. (2) Chất lỏng: cân cốc rỗng, cốc có nước, kết hợp bình chia độ. (3) Vật có hình dạng bất kì: đo thể tích bằng bình chia độ hoặc bình tràn. Đo nhiều lần, có nhiễu đo nhỏ.
- **Bài 15 – Áp suất trên một bề mặt:** Khối hộp đặt lần lượt các mặt lên lớp bột hoặc cát, xem độ lún. Thêm quả nặng để tăng F. p = F/S. Ví dụ đầu nhọn và đầu tù.
- **Bài 16 – Áp suất chất lỏng, áp suất khí quyển:** Bình có màng cao su ở đáy và thành bình. Đầu dò áp suất kéo theo độ sâu, p = d·h. Bình thông nhau. Truyền áp suất trong chất lỏng (máy nén thủy lực). Hộp bị bẹp khi rút khí ra, uống nước bằng ống hút.
- **Bài 17 – Lực đẩy Archimedes:** Lực kế treo vật ở ngoài không khí, rồi nhúng dần vào nước. Nước tràn sang cốc. F_A = d·V. Đổi chất lỏng (nước, dầu, nước muối). Điều kiện vật nổi, lơ lửng, chìm.

**Chương IV – Tác dụng làm quay của lực (E4)**
- **Bài 18 – Moment lực:** Cánh cửa hoặc cờ lê có trục quay. Kéo điểm đặt lực và hướng lực, xem vật có quay không. M = F·d, cánh tay đòn hiển thị trực quan. Lực song song trục hoặc đi qua trục thì không làm vật quay.
- **Bài 19 – Đòn bẩy:** Thanh có điểm tựa O, treo quả nặng và lực kế. Điều kiện thăng bằng F₁d₁ = F₂d₂. Ba vị trí điểm tựa (loại 1, loại 2). Thư viện ví dụ đòn bẩy trong đời sống và trong cơ thể người.

**Chương V – Điện (E5, E1)**
- **Bài 20 – Nhiễm điện do cọ xát (E5):** Kéo để cọ thước nhựa với mảnh vải. Electron chuyển từ vật này sang vật kia (hiển thị dấu + và −). Thước hút giấy vụn. Hai vật nhiễm điện cùng loại thì đẩy nhau, khác loại thì hút nhau. Hiện tượng sét (minh họa).
- **Bài 21 – Dòng điện, nguồn điện (E1):** Kẹp lần lượt các vật (đồng, nhôm, nhựa, gỗ, thủy tinh, nước muối) vào mạch để phân loại vật dẫn điện và vật cách điện. Dòng electron chạy trong dây (bật/tắt hiển thị). Các loại nguồn điện, cực + và −.
- **Bài 22 – Mạch điện đơn giản (E1):** Bảng kí hiệu linh kiện. Lắp mạch theo sơ đồ cho sẵn, và vẽ sơ đồ từ mạch thật (hiện song song hai chế độ). Cầu chì, aptomat, rơ le (mô phỏng chức năng ngắt mạch).
- **Bài 23 – Tác dụng của dòng điện (E1):** Tác dụng nhiệt (dây điện trở nóng lên), phát sáng (đèn, LED), hóa học (điện phân dung dịch CuSO₄, thỏi than được phủ đồng), sinh lí (minh họa và cảnh báo an toàn), từ (cuộn dây hút đinh sắt, chuông điện).
- **Bài 24 – Cường độ dòng điện và hiệu điện thế (E1):** Ampe kế mắc nối tiếp, vôn kế mắc song song (cảnh báo khi mắc sai). Đồng hồ kim có chọn GHĐ và ĐCNN, tập đọc số chỉ. Tăng số pin thì I và U tăng, đèn sáng hơn.
- **Bài 25 – Thực hành đo I, U** *(Báo cáo)*: Mạch gồm đèn, ampe kế, vôn kế, thay đổi nguồn 1,5 V, 3 V, 4,5 V. Bảng số liệu tự điền.

**Chương VI – Nhiệt (E5)**
- **Bài 26 – Năng lượng nhiệt và nội năng:** Mô hình phân tử chuyển động nhanh dần khi nhiệt độ tăng. Khuếch tán thuốc tím trong nước nóng và nước lạnh (so sánh song song). Nội năng tăng khi nung nóng. Hai cách làm thay đổi nội năng.
- **Bài 27 – Thực hành đo năng lượng nhiệt bằng joulemeter** *(Báo cáo)*: Bình nhiệt lượng kế, dây đun, joulemeter, nhiệt kế. Đun nước, đọc năng lượng (J) theo Δt. So sánh khi đổi khối lượng nước.
- **Bài 28 – Sự truyền nhiệt:** Dẫn nhiệt (thanh kim loại gắn đinh bằng sáp, các đinh rơi lần lượt; so sánh đồng, nhôm, thép). Đối lưu (dòng nước có hạt màu khi đun đáy bình). Bức xạ nhiệt (đèn chiếu vào bình đen và bình trắng). Hiệu ứng nhà kính.
- **Bài 29 – Sự nở vì nhiệt:** Quả cầu và vòng kim loại. Chất lỏng dâng trong ống khi nóng, so sánh các chất lỏng. Khí nở đẩy giọt nước màu. Băng kép cong khi đốt nóng. Ứng dụng: khe hở đường ray, nhiệt kế.

### KHTN 9

- **Bài 1 – Dụng cụ, báo cáo (E7):** Thư viện dụng cụ ảo (điện kế, đồng hồ đo điện đa năng, biến áp nguồn, joulemeter, bộ thí nghiệm quang), bấm vào để xem chức năng. Bài tập đọc số chỉ dụng cụ đo. Mẫu báo cáo.

**Chương I – Năng lượng cơ học (E4)**
- **Bài 2 – Động năng, thế năng:** Viên bi lăn xuống máng va vào khúc gỗ, chỉnh m và v rồi xem gỗ bị đẩy xa bao nhiêu. Wđ = ½mv². Vật ở độ cao h, Wt = P·h. Biểu đồ cột cập nhật trực tiếp.
- **Bài 3 – Cơ năng:** Con lắc và vật trượt trên máng cong. Biểu đồ cột Wđ, Wt, W theo thời gian thực. Bật/tắt ma sát để so sánh cơ năng được bảo toàn và cơ năng bị hao hụt.
- **Bài 4 – Công và công suất:** Kéo vật trên mặt phẳng hoặc nâng vật lên cao. A = F·s. Hai máy (hai người) cùng làm một công, so sánh thời gian để rút ra P = A/t. Đổi đơn vị W, kW, mã lực.

**Chương II – Ánh sáng (E2)**
- **Bài 5 – Khúc xạ ánh sáng:** Bán trụ thủy tinh trên bảng chia độ tròn. Xoay tia tới, đọc i và r. Bảng tự lập sin i / sin r. Chiết suất các môi trường. Tia đi ngược chiều.
- **Bài 6 – Phản xạ toàn phần:** Tia đi từ thủy tinh ra không khí, tăng dần góc tới. Tia khúc xạ yếu dần rồi biến mất, xuất hiện góc giới hạn. sin i_gh = n₂/n₁. Cáp quang (tia phản xạ nhiều lần trong sợi).
- **Bài 7 – Lăng kính:** Tia đơn sắc bị lệch về phía đáy. Ánh sáng trắng tán sắc thành dải màu. Kính lọc màu. Màu sắc của vật dưới ánh sáng màu.
- **Bài 8 – Thấu kính:** Thấu kính hội tụ và phân kì. Chùm tia song song, tiêu điểm. Ba tia đặc biệt. Kéo vật dọc trục chính, ảnh cập nhật trực tiếp (thật/ảo, cùng chiều/ngược chiều, lớn hơn/nhỏ hơn). Công cụ dựng ảnh từng bước.
- **Bài 9 – Thực hành đo tiêu cự thấu kính hội tụ** *(Báo cáo)*: Băng quang học có vật, thấu kính, màn. Dịch vật và màn để tìm ảnh rõ nét bằng vật (phương pháp Silbermann: d = d' = 2f, f = L/4). Đo nhiều lần.
- **Bài 10 – Kính lúp, bài tập thấu kính:** Ảnh ảo qua kính lúp, số bội giác G = 25/f. Chế độ bài tập: giáo viên nhập d, f, h, app dựng ảnh và giải từng bước bằng hình học (tam giác đồng dạng).

**Chương III – Điện (E1)**
- **Bài 11 – Điện trở, định luật Ohm:** Đo I theo U với các điện trở khác nhau, đồ thị U–I. I = U/R. Điện trở dây dẫn phụ thuộc l, S, vật liệu (R = ρl/S, có thanh trượt). Đọc vòng màu điện trở.
- **Bài 12 – Đoạn mạch nối tiếp, song song:** Đo I và U ở từng điện trở. Công thức R tương đương. So sánh độ sáng của đèn khi mắc nối tiếp và song song, khi tháo bớt một đèn.
- **Bài 13 – Năng lượng của dòng điện và công suất điện:** P = U·I, W = P·t. Đèn ghi 220 V – 60 W. Công tơ điện chạy theo thời gian. Bài toán tính tiền điện của các thiết bị trong nhà.

**Chương IV – Điện từ (E6, E1)**
- **Bài 14 – Cảm ứng điện từ, nguyên tắc tạo dòng điện xoay chiều (E6):** Đưa nam châm ra vào cuộn dây (kéo bằng chuột) làm LED sáng và kim điện kế lệch. Hiển thị số đường sức từ xuyên qua cuộn dây. Cuộn dây quay trong từ trường hoặc nam châm quay, hai LED mắc ngược sáng luân phiên. Đồ thị i(t) xoay chiều.
- **Bài 15 – Tác dụng của dòng điện xoay chiều (E1/E6):** So sánh các tác dụng nhiệt, phát sáng, từ (nam châm điện, kim nam châm dao động), sinh lí giữa dòng một chiều và dòng xoay chiều. Hai LED mắc ngược nhấp nháy.

**Chương V – Năng lượng với cuộc sống (E7)**
- **Bài 16 – Vòng năng lượng trên Trái Đất, năng lượng hóa thạch:** Sơ đồ dòng năng lượng tương tác, bấm từng mũi tên (Mặt Trời → thực vật → …). Dòng thời gian hình thành than và dầu mỏ. Tác động môi trường (CO₂).
- **Bài 17 – Năng lượng tái tạo:** Các mô hình nhà máy điện mặt trời, gió, nước, sóng, địa nhiệt. Chỉnh tham số (cường độ nắng, tốc độ gió, lưu lượng nước) và xem công suất phát. Bảng ưu nhược điểm. Biện pháp tiết kiệm năng lượng.

---

## 4. Lộ trình triển khai

| Giai đoạn | Nội dung | Số bài xong (cộng dồn) |
|---|---|---|
| P0 | Khung app: chọn lớp, chương, bài; chế độ trình chiếu; lưu và mở thí nghiệm; module Báo cáo | 0 |
| P1 | E1 Mạch điện: L8 21–25, L9 11–13 | 8 |
| P2 | E2 Quang học: L9 5–10 | 14 |
| P3 | E3 Chất lỏng: L8 13–17 | 19 |
| P4 | E4 Cơ học: L8 18–19, L9 2–4 | 24 |
| P5 | E5 Hạt & nhiệt: L8 20, 26–29 | 29 |
| P6 | E6 Điện từ: L9 14–15 | 31 |
| P7 | E7 Sơ đồ tương tác: L9 1, 16, 17 | 34 |
| P8 | Hoàn thiện: bản offline cho USB, kiểm tra trên máy chiếu, hướng dẫn sử dụng cho giáo viên | 34 |
| Sau | Chế độ học sinh: phiếu bài tập, nộp báo cáo, tài khoản và lớp học (cần backend) | |

Cuối mỗi giai đoạn: bạn chạy thử, kiểm tra nội dung vật lý và kịch bản cảnh, góp ý, rồi mới sang giai đoạn sau.

---

## 5. Tiến độ

Cập nhật ngày 11/11/2026: **đã có mô phỏng cho đủ 34/34 bài, tổng cộng 109 cảnh.** Script tự động đã mở từng cảnh, không có lỗi hay cảnh báo nào.

**Nội dung bài học (nút "Bài học", phím N):** cả 34 bài đều có:
- Câu hỏi mở đầu và mục tiêu.
- Kiến thức trọng tâm, kèm mô tả các thí nghiệm và hiện tượng SGK đề cập. Mỗi mục có nút mở thẳng cảnh mô phỏng tương ứng.
- Công thức, ví dụ thực tế, "Em có biết".
- Câu hỏi vận dụng có đáp án ẩn.

Có thể in phiếu nội dung bài. Toàn bộ nội dung nằm trong `src/lessons/notes/`, do nhóm phát triển tự viết, bám theo nội dung SGK nhưng không sao chép câu chữ.

| Giai đoạn | Trạng thái | Nội dung đã làm |
|---|---|---|
| P0 Khung app | ✅ Xong | Trình chiếu, ẩn số đo, bút vẽ, kính lúp, lưu file/link, báo cáo kèm đồ thị, in/CSV, nền sáng/tối, bản build 1 file chạy offline |
| P1 Mạch điện (E1) | ✅ Xong | L8 Bài 21–25, L9 Bài 11–13 (29 cảnh). Phòng lab mạch điện tự do |
| P2 Quang học (E2) | ✅ Xong | L9 Bài 5–10 (21 cảnh): dò tia theo định luật Snell, phản xạ toàn phần, tán sắc, kính lọc, màu sắc vật, thấu kính, Silbermann, kính lúp, dựng ảnh từng bước. Phòng lab quang học tự do |
| P3 Chất lỏng (E3) | ✅ Xong | L8 Bài 13–17 (14 cảnh): cân + bình chia độ, KLR chất lỏng, áp suất trên cát, áp suất theo độ sâu, tia nước, bình thông nhau, máy nén thuỷ lực, áp suất khí quyển, lực kế + bình tràn, vật nổi/chìm |
| P4 Cơ học (E4) | ✅ Xong | L8 Bài 18–19, L9 Bài 2–4 (12 cảnh): moment (cửa, cờ lê), đòn bẩy loại 1/2, động năng, thế năng, con lắc/máng cong (Wđ, Wt, W), công, công suất |
| P5 Nhiệt (E5) | ✅ Xong | L8 Bài 20, 26–29 (16 cảnh): nhiễm điện cọ xát, hút/đẩy, mô hình hạt, khuếch tán, joulemeter, dẫn nhiệt, đối lưu, bức xạ, nở vì nhiệt (rắn, lỏng, khí, băng kép) |
| P6 Điện từ (E6) | ✅ Xong | L9 Bài 14–15 (5 cảnh): cảm ứng điện từ, máy phát xoay chiều, tác dụng của dòng xoay chiều |
| P7 Sơ đồ (E7) | ✅ Xong | L9 Bài 1, 16, 17 (11 cảnh): dụng cụ, tập đọc đồng hồ, cấu trúc báo cáo, vòng năng lượng, nhiên liệu hoá thạch, môi trường, năng lượng tái tạo, điện gió, pin mặt trời, thuỷ điện, tiết kiệm năng lượng |
| P8 Hoàn thiện | ✅ Xong | File `PhongLabVatLi.html` chạy offline, trang Hướng dẫn sử dụng trong app, kiểm tra tự động toàn bộ cảnh |
| Sau | Chưa làm | Chế độ học sinh: phiếu bài tập, nộp báo cáo, tài khoản (cần máy chủ) |

**Cần giáo viên kiểm tra:**
- Lời dẫn và câu hỏi từng cảnh có hợp với cách dạy trên lớp không.
- Các số liệu mặc định, ví dụ bóng đèn 3 V – 0,9 W và 6 V – 3 W, giá điện 2.000 đ/kWh, khối lượng riêng các chất, chiết suất.
- Một số hiện tượng được **phóng đại để dễ quan sát**: độ nở của quả cầu và băng kép, độ tán sắc của lăng kính, độ lún của cát, tốc độ khuếch tán. Số liệu ở cảnh môi trường (CO₂, nhiệt độ) và tiết kiệm điện chỉ để minh hoạ.
- Kí hiệu sơ đồ mạch, cách gọi tên dụng cụ có khớp với SGK đang dùng không.


---

## Mở rộng: phần Hoá học KHTN 8 – 9 (đã hoàn thành)

31 bài: KHTN 8 Bài 1 – 12; KHTN 9 Bài 1 (phần hoá học), Bài 18 – 35. Mã bài `h8-x`, `h9-x`; trang danh sách `#/hoa/8`, `#/hoa/9`.

| Mã | Engine | Nội dung chính |
|---|---|---|
| H1 | Bàn thí nghiệm (`chemlab`) | Ống nghiệm với ~80 hoá chất và ~60 luật phản ứng (sủi khí, kết tủa, đổi màu, toả nhiệt, tráng bạc, ester hoá…); thang pH; phản ứng trung hoà có đồ thị pH; tốc độ phản ứng (4 yếu tố); độ tan, pha dung dịch, nồng độ mol; bảo toàn khối lượng |
| H2 | Mô hình phân tử (`molecule`) | Sắp xếp lại nguyên tử; lập PTHH (15 phương trình); mol, tỉ khối; tính theo PTHH và hiệu suất; công thức cấu tạo, phân loại chất hữu cơ; phản ứng cộng, trùng hợp; nhường – nhận electron; nhiệt lượng nhiên liệu |
| H3 | Sơ đồ – quy trình (`process`) | Thẻ dụng cụ, kí hiệu cảnh báo, ứng dụng; quy trình từng bước; bảng tính tan; mối quan hệ hợp chất vô cơ; dãy hoạt động hoá học; lò cao, lò thổi, điện phân nhôm; chưng cất dầu mỏ; phân bón N-P-K; tính dẫn điện; vỏ Trái Đất; chu trình carbon, hiệu ứng nhà kính |

Ba engine dùng chung bộ điều phối `ChemView`, nên một bài có thể kết hợp các loại cảnh. Bài thực hành có báo cáo: H8-4 (pha dung dịch NaCl 0,9%), bảng số liệu trung hoà ở H8-9, H9-27.

---

## Mở rộng KHTN 7 (2026-11-14)

Phạm vi: phần Vật lí (Bài 1, 8–20) và Hoá học (Bài 2–7) của KHTN 7. Phần Sinh học (Bài 21–42) không thuộc phạm vi app.

| Mã | Engine | Bài |
|---|---|---|
| P8 | Tốc độ – chuyển động (`motion`) | L7: 1, 8, 9, 10, 11 |
| P9 | Âm thanh (`sound`) | L7: 12, 13, 14 |
| P10 | Ánh sáng – gương phẳng (`light`) | L7: 15, 16, 17 |
| P11 | Nam châm – từ trường (`magnet`) | L7: 18, 19, 20 |
| H2 | Mô hình phân tử (thêm cảnh nguyên tử, bảng tuần hoàn, liên kết, hoá trị) | H7: 2–7 |

- **Bài 1:** 5 bước phương pháp tìm hiểu tự nhiên, thẻ kĩ năng, dụng cụ đo; đo thời gian bằng cổng quang + đồng hồ hiện số (MODE A ↔ B).
- **Bài 8–11:** so sánh nhanh chậm (cùng t / cùng s), v = s/t và đổi đơn vị; đo tốc độ bằng đồng hồ bấm giây (có sai số phản xạ) và cổng quang *(Báo cáo)*; camera “bắn tốc độ”; đồ thị s–t (vẽ từ bảng, đi – nghỉ – đi, hai người gặp nhau); quãng đường phản ứng + quãng đường phanh theo tốc độ, mặt đường, người lái; khoảng cách an toàn.
- **Bài 12–14:** nguồn âm dao động (trống, âm thoa, thước, dây đàn, cột khí); sóng âm nén – giãn trong khí, lỏng, rắn, chân không; chuông trong bình hút khí; dao động kí (biên độ – độ to, tần số – độ cao, hạ âm/siêu âm) có phát âm thật qua loa; tiếng vang, vật phản xạ âm tốt/kém, đo độ sâu đáy biển; biện pháp chống ô nhiễm tiếng ồn.
- **Bài 15–17:** năng lượng ánh sáng (pin mặt trời, nhiệt kế); chùm sáng – tia sáng; vùng tối/nửa tối (nguồn hẹp, rộng); định luật phản xạ *(Báo cáo)*, phản xạ khuếch tán; ảnh qua gương phẳng (tấm kính + 2 cây nến, dựng ảnh, tia tới mắt).
- **Bài 18–20:** vật liệu từ, tương tác hai nam châm, nam châm treo tự do; từ phổ (mạt sắt), đường sức từ, la bàn kéo thả, từ trường Trái Đất; Oersted, ống dây; nam châm điện (số pin, số vòng, lõi sắt, đổi cực) *(Báo cáo)*.
- **Hoá 7:** mô hình Rutherford – Bohr và lắp ráp nguyên tử; kí hiệu hoá học (tên Latin); bảng tuần hoàn chu kì 1–4 (ô, chu kì, nhóm, kim loại/phi kim/khí hiếm, đố vui); phân tử – đơn chất – hợp chất, khối lượng phân tử; liên kết ion (NaCl, MgO) và cộng hoá trị (H₂, Cl₂, O₂, N₂, HCl, H₂O, NH₃, CH₄, CO₂); lập công thức theo hoá trị; phần trăm khối lượng và tìm công thức.
