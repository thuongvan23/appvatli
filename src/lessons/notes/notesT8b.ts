// Toán 8 (Kết nối tri thức), tập hai: Bài 21 – Bài 39. Nội dung do nhóm phát triển tự biên soạn.
import type { LessonNotes } from './types';

export const NOTES_T8B: Record<string, LessonNotes> = {
  't8-21': {
    opener: 'Từ các số nguyên ta có phân số. Tương tự, từ các đa thức ta có phân thức đại số. Phân thức đại số xác định khi nào?',
    goals: ['Nhận biết được phân thức đại số, tử thức và mẫu thức.', 'Viết được điều kiện xác định và tính được giá trị của phân thức.', 'Nhận biết được hai phân thức bằng nhau.'],
    sections: [
      { title: 'Phân thức đại số', body: ['Phân thức đại số là biểu thức có dạng A/B, trong đó A, B là những đa thức và B khác đa thức 0. A là tử thức, B là mẫu thức.', 'Mỗi đa thức cũng được coi là một phân thức có mẫu bằng 1.'], scene: 1 },
      { title: 'Điều kiện xác định, giá trị của phân thức', body: ['Điều kiện xác định của phân thức A/B là điều kiện của biến để mẫu B khác 0.', 'Giá trị của phân thức chỉ tính được tại các giá trị của biến thoả mãn điều kiện xác định.'], scene: 2 },
      { title: 'Hai phân thức bằng nhau', body: ['A/B = C/D nếu A · D = B · C.'], scene: 4 },
    ],
    formulas: [{ expr: 'A/B = C/D ⇔ A · D = B · C', note: 'Hai phân thức bằng nhau' }],
    examples: ['(x + 3)/(x − 2) xác định khi x ≠ 2.', '5/(x² − 4) xác định khi x ≠ 2 và x ≠ −2.'],
    exercises: [
      { q: 'Tìm điều kiện xác định của (2x)/(x² − x).', a: 'x² − x ≠ 0 ⇔ x ≠ 0 và x ≠ 1.' },
      { q: 'Tính giá trị của (x² − 1)/(x + 2) tại x = 0.', a: '−1/2.' },
    ],
  },
  't8-22': {
    opener: 'Phân số có thể rút gọn, quy đồng nhờ tính chất cơ bản. Phân thức đại số có tính chất tương tự không?',
    goals: ['Mô tả được những tính chất cơ bản của phân thức đại số.', 'Rút gọn phân thức; quy đồng mẫu thức nhiều phân thức.'],
    sections: [
      { title: 'Tính chất cơ bản', body: ['Nếu nhân cả tử và mẫu của một phân thức với cùng một đa thức khác đa thức 0 thì được một phân thức bằng phân thức đã cho.', 'Nếu chia cả tử và mẫu của một phân thức cho một nhân tử chung của chúng thì được một phân thức bằng phân thức đã cho.', 'Quy tắc đổi dấu: A/B = (−A)/(−B).'] },
      { title: 'Rút gọn phân thức', body: ['Phân tích tử và mẫu thành nhân tử để tìm nhân tử chung, rồi chia cả tử và mẫu cho nhân tử chung đó.', 'Phân thức sau khi rút gọn chỉ bằng phân thức ban đầu tại các giá trị thoả mãn điều kiện xác định của phân thức ban đầu.'], scene: 1 },
      { title: 'Quy đồng mẫu thức', body: ['Phân tích các mẫu thành nhân tử rồi tìm mẫu thức chung; tìm nhân tử phụ của từng mẫu; nhân cả tử và mẫu của mỗi phân thức với nhân tử phụ tương ứng.'], scene: 3 },
    ],
    formulas: [{ expr: 'A/B = (A · M)/(B · M) (M ≠ 0)', note: 'Tính chất cơ bản' }],
    examples: ['(x² − 4)/(x² + 2x) = (x − 2)/x.', '(x² − 1)/(x − 1) = x + 1 với x ≠ 1.'],
    exercises: [
      { q: 'Rút gọn (5x + 10)/(x² − 4).', a: '5(x + 2)/[(x − 2)(x + 2)] = 5/(x − 2).' },
      { q: 'Tìm mẫu thức chung của 1/(2x) và 3/(x² − x).', a: 'MTC = 2x(x − 1).' },
    ],
  },
  't8-23': {
    opener: 'Một vận động viên đua xe qua ba chặng với vận tốc khác nhau. Tổng thời gian là tổng của ba phân thức – làm sao cộng chúng?',
    goals: ['Thực hiện được phép cộng, phép trừ phân thức đại số.', 'Vận dụng tính chất giao hoán, kết hợp của phép cộng trong tính toán.'],
    sections: [
      { title: 'Cộng, trừ phân thức cùng mẫu', body: ['Muốn cộng (trừ) hai phân thức có cùng mẫu thức, ta cộng (trừ) các tử thức với nhau và giữ nguyên mẫu thức.'], scene: 1 },
      { title: 'Cộng, trừ phân thức khác mẫu', body: ['Quy đồng mẫu thức rồi cộng (trừ) các phân thức có cùng mẫu thức vừa tìm được.', 'Phân thức đối của A/B là −A/B; A/B − C/D = A/B + (−C/D).'], scene: 2 },
    ],
    formulas: [{ expr: 'A/M + B/M = (A + B)/M', note: 'Cộng hai phân thức cùng mẫu' }],
    examples: ['1/x + 2/(x + 1) = (3x + 1)/[x(x + 1)].', '3/(x − 2) − 12/(x² − 4) = 3/(x + 2).'],
    exercises: [
      { q: 'Tính x/(x − 1) − 1/(x − 1).', a: '(x − 1)/(x − 1) = 1 (x ≠ 1).' },
      { q: 'Tính 1/(x − 1) − 1/(x + 1).', a: '2/(x² − 1).' },
    ],
  },
  't8-24': {
    opener: 'Nhân, chia phân số: nhân tử với tử, mẫu với mẫu; chia là nhân với số nghịch đảo. Với phân thức thì sao?',
    goals: ['Thực hiện được phép nhân, phép chia hai phân thức đại số.', 'Vận dụng các tính chất của phép nhân để tính toán hợp lí.'],
    sections: [
      { title: 'Nhân hai phân thức', body: ['Muốn nhân hai phân thức, ta nhân các tử thức với nhau, các mẫu thức với nhau: A/B · C/D = (A · C)/(B · D).', 'Nên phân tích thành nhân tử và rút gọn trước khi nhân.'], scene: 1 },
      { title: 'Chia hai phân thức', body: ['Phân thức nghịch đảo của A/B (A ≠ 0) là B/A.', 'A/B : C/D = A/B · D/C (C/D ≠ 0).'], scene: 2 },
    ],
    formulas: [
      { expr: 'A/B · C/D = AC/BD', note: 'Nhân hai phân thức' },
      { expr: 'A/B : C/D = A/B · D/C', note: 'Chia hai phân thức' },
    ],
    examples: ['(x² − 1)/(2x) · 4x²/(x + 1) = 2x(x − 1).', '(x² − 9)/(x + 1) : (x − 3)/(x² + x) = x(x + 3).'],
    exercises: [
      { q: 'Tính 3x/(x + 2) · (x² − 4)/(6x²).', a: '(x − 2)/(2x).' },
      { q: 'Tính (x + 1)/x : (x² − 1)/x².', a: 'x/(x − 1).' },
    ],
  },
  't8-25': {
    opener: 'Một chiếc cân thăng bằng: đĩa trái có 2 hộp x và 3 quả cân 1 kg, đĩa phải có 1 hộp x và 7 quả cân. Mỗi hộp nặng bao nhiêu?',
    goals: ['Nhận biết được phương trình bậc nhất một ẩn.', 'Giải được phương trình bậc nhất một ẩn và phương trình đưa được về dạng ax + b = 0.'],
    sections: [
      { title: 'Phương trình một ẩn', body: ['Phương trình ẩn x có dạng A(x) = B(x). Giá trị x₀ làm hai vế bằng nhau là một nghiệm của phương trình. Giải phương trình là tìm tất cả các nghiệm.'], scene: 1 },
      { title: 'Phương trình bậc nhất một ẩn', body: ['Phương trình dạng ax + b = 0, với a, b là hai số đã cho và a ≠ 0, là phương trình bậc nhất một ẩn. Nghiệm duy nhất x = −b/a.'], scene: 3 },
      { title: 'Hai quy tắc biến đổi', body: ['Quy tắc chuyển vế: chuyển một hạng tử từ vế này sang vế kia và đổi dấu hạng tử đó.', 'Quy tắc nhân (chia): nhân (chia) cả hai vế với cùng một số khác 0.', 'Trên cân: bớt cùng một lượng ở hai đĩa, hoặc chia đều mỗi đĩa, cân vẫn thăng bằng.'], scene: 1 },
      { title: 'Phương trình đưa được về dạng ax + b = 0', body: ['Bỏ ngoặc (hoặc quy đồng, khử mẫu), chuyển các hạng tử chứa ẩn sang một vế, các hằng số sang vế kia, thu gọn rồi giải.'], scene: 5 },
    ],
    formulas: [{ expr: 'ax + b = 0 (a ≠ 0) ⇔ x = −b/a', note: 'Nghiệm của phương trình bậc nhất một ẩn' }],
    examples: ['3x − 7 = 2x + 5 ⇔ x = 12.', '(x + 1)/2 − (x − 2)/3 = 1 ⇔ x = −1.'],
    exercises: [
      { q: 'Giải phương trình 4x − 3 = 2x + 9.', a: 'x = 6.' },
      { q: 'Giải phương trình 3(x − 2) = 5 − 2(x + 1).', a: '3x − 6 = 3 − 2x ⇔ 5x = 9 ⇔ x = 9/5.' },
    ],
  },
  't8-26': {
    opener: 'Bài toán cổ: “Vừa gà vừa chó, bó lại cho tròn, ba mươi sáu con, một trăm chân chẵn”. Có thể giải bằng phương trình như thế nào?',
    goals: ['Giải quyết được một số vấn đề thực tiễn gắn với phương trình bậc nhất (bài toán chuyển động, năng suất, tuổi, hình học…).'],
    sections: [
      { title: 'Các bước giải', body: ['Bước 1. Lập phương trình: chọn ẩn số và đặt điều kiện thích hợp cho ẩn; biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết; lập phương trình biểu thị mối quan hệ giữa các đại lượng.', 'Bước 2. Giải phương trình.', 'Bước 3. Kiểm tra các nghiệm có thoả mãn điều kiện của ẩn không, rồi kết luận.'], scene: 1 },
    ],
    examples: ['Gà và chó: gọi số gà là x (0 < x < 36), số chó 36 − x; 2x + 4(36 − x) = 100 ⇒ x = 22: 22 gà, 14 chó.', 'Hai xe ngược chiều gặp nhau: tổng quãng đường hai xe đi bằng khoảng cách ban đầu.'],
    exercises: [
      { q: 'Tổng hai số bằng 50, số này gấp 4 lần số kia. Tìm hai số.', a: 'x + 4x = 50 ⇒ x = 10; hai số là 10 và 40.' },
      { q: 'Một người đi xe đạp từ A đến B với vận tốc 15 km/h, lúc về với vận tốc 12 km/h nên thời gian về nhiều hơn 30 phút. Tính AB.', a: 'x/12 − x/15 = 1/2 ⇒ x = 30 km.' },
    ],
  },
  't8-27': {
    opener: 'Quãng đường ô tô đi được phụ thuộc vào thời gian; giá cước taxi phụ thuộc vào số kilômét. Mối quan hệ “phụ thuộc” đó được toán học mô tả bằng khái niệm hàm số.',
    goals: ['Nhận biết được những mô hình thực tế dẫn đến khái niệm hàm số.', 'Tính được giá trị của hàm số khi hàm số đó xác định bởi công thức.', 'Xác định được toạ độ của một điểm trên mặt phẳng toạ độ; xác định được một điểm khi biết toạ độ của nó.', 'Nhận biết được đồ thị hàm số.'],
    sections: [
      { title: 'Khái niệm hàm số', body: ['Nếu đại lượng y phụ thuộc vào đại lượng thay đổi x sao cho với mỗi giá trị của x ta luôn xác định được chỉ một giá trị tương ứng của y thì y được gọi là hàm số của x, x gọi là biến số.', 'Hàm số có thể cho bằng bảng, bằng công thức, bằng sơ đồ… Khi x thay đổi mà y luôn nhận một giá trị thì y là hàm hằng.', 'Kí hiệu y = f(x); f(a) là giá trị của hàm số tại x = a.'], scene: 1 },
      { title: 'Mặt phẳng toạ độ', body: ['Hai trục số Ox (trục hoành), Oy (trục tung) vuông góc với nhau tại gốc O tạo thành hệ trục toạ độ Oxy. Hai trục chia mặt phẳng thành bốn góc phần tư I, II, III, IV.', 'Mỗi điểm M được xác định bởi cặp số (x₀; y₀): x₀ là hoành độ, y₀ là tung độ của M.'], scene: 3 },
      { title: 'Đồ thị của hàm số', body: ['Đồ thị của hàm số y = f(x) là tập hợp tất cả các điểm (x; f(x)) trên mặt phẳng toạ độ.'], scene: 5 },
    ],
    examples: ['s = 40t: s là hàm số của t; f(2) = 80.', 'Điểm (−2; 4) nằm ở góc phần tư thứ II.'],
    exercises: [
      { q: 'Cho f(x) = 3x − 1. Tính f(0), f(−2).', a: 'f(0) = −1; f(−2) = −7.' },
      { q: 'Điểm có tung độ bằng 0 nằm trên trục nào?', a: 'Trục hoành Ox.' },
      { q: 'Điểm A(1; 2) có thuộc đồ thị hàm số y = 2x không?', a: 'Có, vì 2 · 1 = 2.' },
    ],
  },
  't8-28': {
    opener: 'Cước taxi y (nghìn đồng) theo số kilômét x là y = 12x + 10. Đồ thị của hàm số này có hình dạng gì?',
    goals: ['Nhận biết được hàm số bậc nhất y = ax + b (a ≠ 0).', 'Thiết lập được bảng giá trị và vẽ được đồ thị của hàm số bậc nhất.', 'Vận dụng hàm số bậc nhất vào giải quyết bài toán thực tiễn.'],
    sections: [
      { title: 'Hàm số bậc nhất', body: ['Hàm số bậc nhất là hàm số cho bởi công thức y = ax + b, trong đó a, b là các số cho trước và a ≠ 0.'], scene: 1 },
      { title: 'Đồ thị', body: ['Đồ thị của hàm số y = ax + b (a ≠ 0) là một đường thẳng: cắt trục tung tại điểm có tung độ bằng b; song song với đường thẳng y = ax nếu b ≠ 0 và trùng với y = ax nếu b = 0.', 'Cách vẽ: xác định hai điểm, thường là (0; b) và (−b/a; 0), rồi kẻ đường thẳng qua hai điểm đó.'], scene: 2 },
      { title: 'Ứng dụng thực tế', body: ['Nhiều đại lượng thay đổi đều theo thời gian hay theo số lượng được mô tả bởi hàm số bậc nhất: cước taxi, tiền tiết kiệm, chiều cao ngọn nến đang cháy…'], scene: 4 },
    ],
    formulas: [{ expr: 'y = ax + b (a ≠ 0)', note: 'Hàm số bậc nhất' }],
    examples: ['y = 2x − 4 cắt Oy tại (0; −4), cắt Ox tại (2; 0).', 'Taxi: đi 15 km trả 12 · 15 + 10 = 190 nghìn đồng.'],
    exercises: [
      { q: 'Vẽ đồ thị hàm số y = −x + 3: xác định hai điểm.', a: '(0; 3) và (3; 0).' },
      { q: 'Nến cao 20 cm, mỗi giờ ngắn đi 2 cm. Sau mấy giờ nến còn 8 cm?', a: '20 − 2x = 8 ⇒ x = 6 giờ.' },
    ],
  },
  't8-29': {
    opener: 'Các đường thẳng y = x, y = 2x, y = 3x đều đi qua gốc toạ độ nhưng “dốc” khác nhau. Hệ số nào quyết định độ dốc đó?',
    goals: ['Nhận biết được khái niệm hệ số góc của đường thẳng y = ax + b (a ≠ 0).', 'Sử dụng được hệ số góc để nhận biết và giải thích sự cắt nhau hoặc song song của hai đường thẳng.'],
    sections: [
      { title: 'Hệ số góc', body: ['Góc α tạo bởi đường thẳng y = ax + b (a ≠ 0) và trục Ox là góc tạo bởi tia Ax và tia AT, với A là giao điểm của đường thẳng và trục Ox, T là điểm thuộc đường thẳng có tung độ dương.', 'a gọi là hệ số góc của đường thẳng. a > 0: α nhọn, a càng lớn thì α càng lớn; a < 0: α tù.', 'Khi x tăng 1 đơn vị thì y thay đổi a đơn vị.'], scene: 1 },
      { title: 'Hai đường thẳng song song, cắt nhau', body: ['Cho d: y = ax + b (a ≠ 0) và d′: y = a′x + b′ (a′ ≠ 0).', 'd // d′ ⇔ a = a′ và b ≠ b′; d trùng d′ ⇔ a = a′ và b = b′; d cắt d′ ⇔ a ≠ a′.'], scene: 2 },
    ],
    formulas: [
      { expr: 'd // d′ ⇔ a = a′, b ≠ b′', note: 'Hai đường thẳng song song' },
      { expr: 'd cắt d′ ⇔ a ≠ a′', note: 'Hai đường thẳng cắt nhau' },
    ],
    examples: ['y = 2x + 1 và y = 2x − 2 song song.', 'y = 2x + 1 và y = −x + 4 cắt nhau tại (1; 3).'],
    exercises: [
      { q: 'Tìm hệ số góc của đường thẳng y = 3 − 2x.', a: 'a = −2.' },
      { q: 'Tìm đường thẳng song song với y = −3x và đi qua (2; 1).', a: 'y = −3x + 7.' },
    ],
  },
  't8-30': {
    opener: 'Gieo một con xúc xắc: có thể xuất hiện mặt nào? Những mặt nào làm cho biến cố “số chấm là số chẵn” xảy ra?',
    goals: ['Nhận biết được mối liên hệ giữa xác suất của một biến cố ngẫu nhiên với tỉ số các kết quả thuận lợi trong một số ví dụ đơn giản.', 'Liệt kê được các kết quả có thể và các kết quả thuận lợi cho một biến cố.'],
    sections: [
      { title: 'Kết quả có thể', body: ['Phép thử ngẫu nhiên là hoạt động mà ta không biết trước kết quả. Mỗi kết quả có thể xảy ra gọi là một kết quả có thể của phép thử.', 'Ví dụ: tung hai đồng xu có 4 kết quả có thể: SS, SN, NS, NN.'], scene: 2 },
      { title: 'Kết quả thuận lợi', body: ['Mỗi kết quả có thể làm cho biến cố E xảy ra gọi là một kết quả thuận lợi cho E.', 'Ví dụ: gieo xúc xắc, các kết quả thuận lợi cho biến cố “số chấm là số nguyên tố” là 2, 3, 5.'], scene: 3 },
    ],
    examples: ['Rút một thẻ trong 20 thẻ ghi số 1 đến 20: có 6 kết quả thuận lợi cho biến cố “số chia hết cho 3”: 3, 6, 9, 12, 15, 18.'],
    exercises: [
      { q: 'Lấy một viên bi từ túi có 3 bi đỏ, 5 bi xanh, 2 bi vàng. Có bao nhiêu kết quả có thể?', a: '10 kết quả (mỗi viên bi là một kết quả).' },
      { q: 'Tung hai đồng xu. Liệt kê kết quả thuận lợi cho “có ít nhất một mặt sấp”.', a: 'SS, SN, NS.' },
    ],
  },
  't8-31': {
    opener: 'Xác suất lấy được bi đỏ từ túi có 4 bi đỏ và 6 bi xanh là bao nhiêu? Có công thức nào để tính nhanh không?',
    goals: ['Sử dụng được tỉ số để mô tả xác suất của một biến cố ngẫu nhiên trong một số ví dụ đơn giản.'],
    sections: [
      { title: 'Công thức tính xác suất', body: ['Giả sử các kết quả có thể của một phép thử là đồng khả năng. Khi đó xác suất của biến cố E bằng tỉ số giữa số kết quả thuận lợi cho E và tổng số kết quả có thể.', '0 ≤ P(E) ≤ 1. Biến cố chắc chắn có xác suất 1, biến cố không thể có xác suất 0.'], scene: 1 },
    ],
    formulas: [{ expr: 'P(E) = số kết quả thuận lợi cho E / tổng số kết quả có thể', note: 'Khi các kết quả đồng khả năng' }],
    examples: ['Gieo xúc xắc: P(số chấm chẵn) = 3/6 = 1/2.', 'Gieo hai xúc xắc: P(tổng bằng 7) = 6/36 = 1/6.'],
    facts: ['Lí thuyết xác suất ra đời từ những bức thư trao đổi giữa hai nhà toán học Pascal và Fermat (thế kỉ XVII) về các trò chơi may rủi.'],
    exercises: [
      { q: 'Rút một thẻ trong 20 thẻ số 1–20. Tính P(“số nguyên tố”).', a: 'Có 8 số nguyên tố (2, 3, 5, 7, 11, 13, 17, 19) ⇒ P = 8/20 = 2/5.' },
      { q: 'Vòng quay 8 ô bằng nhau, 3 ô đỏ. Tính xác suất mũi tên chỉ ô đỏ.', a: '3/8.' },
    ],
  },
  't8-32': {
    opener: 'Không mở túi, làm sao ước lượng trong túi có bao nhiêu bi đỏ? Xác suất thực nghiệm sẽ giúp ta trả lời.',
    goals: ['Nhận biết được mối liên hệ giữa xác suất thực nghiệm của một biến cố với xác suất của biến cố đó thông qua một số ví dụ đơn giản.', 'Sử dụng được xác suất thực nghiệm để ước lượng xác suất và giải quyết một số bài toán thực tế.'],
    sections: [
      { title: 'Xác suất thực nghiệm', body: ['Thực hiện phép thử n lần, biến cố E xảy ra k lần. Xác suất thực nghiệm của E là k/n.'], scene: 1 },
      { title: 'Mối liên hệ với xác suất', body: ['Khi số lần thực hiện phép thử càng lớn thì xác suất thực nghiệm của biến cố E càng gần với xác suất của E. Vì vậy có thể dùng xác suất thực nghiệm để ước lượng xác suất.'], scene: 2 },
      { title: 'Ứng dụng', body: ['Ước lượng số lần xảy ra biến cố: số lần ≈ P(E) · số lần thực hiện.', 'Dùng trong kiểm tra chất lượng sản phẩm, dự báo thời tiết, bảo hiểm…'], scene: 4 },
    ],
    formulas: [{ expr: 'Xác suất thực nghiệm = k/n', note: 'k: số lần E xảy ra, n: số lần thực hiện' }],
    examples: ['Tung đinh mũ 400 lần, 120 lần ngửa: xác suất thực nghiệm 0,3.', 'Kiểm tra 500 sản phẩm thấy 12 lỗi: lô 10 000 sản phẩm có khoảng 240 sản phẩm lỗi.'],
    exercises: [
      { q: 'Lấy bi (có trả lại) 200 lần, được 140 lần bi đỏ. Túi có 10 bi; ước lượng số bi đỏ.', a: '140/200 = 0,7 ⇒ khoảng 7 bi đỏ.' },
      { q: 'Vì sao tung đồng xu 10 lần có thể được 7 lần sấp?', a: 'Số lần thử ít nên xác suất thực nghiệm có thể khác xa 0,5.' },
    ],
  },
  't8-33': {
    opener: 'Ảnh phóng to và ảnh gốc có hình dạng giống nhau nhưng kích thước khác nhau. Hai tam giác như vậy được gọi là gì?',
    goals: ['Mô tả được định nghĩa hai tam giác đồng dạng.', 'Giải thích được định lí về trường hợp đặc biệt của hai tam giác đồng dạng (đường thẳng song song với một cạnh).'],
    sections: [
      { title: 'Định nghĩa', body: ["△A′B′C′ đồng dạng với △ABC nếu Â′ = Â, B̂′ = B̂, Ĉ′ = Ĉ và A′B′/AB = B′C′/BC = C′A′/CA. Kí hiệu △A′B′C′ ∽ △ABC; k là tỉ số đồng dạng.", 'Mỗi tam giác đồng dạng với chính nó; nếu △A′B′C′ ∽ △ABC theo tỉ số k thì △ABC ∽ △A′B′C′ theo tỉ số 1/k; quan hệ đồng dạng có tính bắc cầu.'], scene: 1 },
      { title: 'Định lí', body: ['Nếu một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại thì nó tạo thành một tam giác mới đồng dạng với tam giác đã cho.'], scene: 3 },
      { title: 'Tỉ số chu vi, diện tích', body: ['Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng k; tỉ số diện tích bằng k².'], scene: 2 },
    ],
    examples: ['△DEF ∽ △ABC, AB = 3, BC = 4, CA = 5, DE = 6 ⇒ k = 2, EF = 8, FD = 10.'],
    exercises: [
      { q: "△A′B′C′ ∽ △ABC theo tỉ số 3; chu vi △ABC là 12 cm. Tính chu vi △A′B′C′.", a: '36 cm.' },
      { q: 'Hai tam giác bằng nhau có đồng dạng không? Tỉ số bao nhiêu?', a: 'Có, tỉ số đồng dạng bằng 1.' },
    ],
  },
  't8-34': {
    opener: 'Để biết hai tam giác đồng dạng, có cần kiểm tra đủ ba cặp góc và ba tỉ số cạnh không?',
    goals: ['Giải thích được các trường hợp đồng dạng của hai tam giác: cạnh – cạnh – cạnh, cạnh – góc – cạnh, góc – góc.', 'Vận dụng để tính độ dài, chứng minh.'],
    sections: [
      { title: 'Trường hợp c.c.c', body: ['Nếu ba cạnh của tam giác này tỉ lệ với ba cạnh của tam giác kia thì hai tam giác đó đồng dạng.'], scene: 1 },
      { title: 'Trường hợp c.g.c', body: ['Nếu hai cạnh của tam giác này tỉ lệ với hai cạnh của tam giác kia và hai góc tạo bởi các cặp cạnh đó bằng nhau thì hai tam giác đồng dạng.'], scene: 2 },
      { title: 'Trường hợp g.g', body: ['Nếu hai góc của tam giác này lần lượt bằng hai góc của tam giác kia thì hai tam giác đó đồng dạng.'], scene: 3 },
    ],
    examples: ['Tam giác 3, 4, 5 và tam giác 6, 8, 10 đồng dạng (c.c.c), tỉ số 2.', 'Hình thang ABCD (AB // CD), O = AC ∩ BD: △OAB ∽ △OCD (g.g).'],
    exercises: [
      { q: '△ABC có AB = 4, AC = 6, Â = 50°; △DEF có DE = 6, DF = 9, D̂ = 50°. Hai tam giác có đồng dạng không?', a: 'Có (c.g.c), vì 6/4 = 9/6 = 1,5 và Â = D̂.' },
      { q: 'Trong hình thang trên, OA = 4, OC = 8, OB = 3. Tính OD.', a: 'OA/OC = OB/OD ⇒ OD = 6.' },
    ],
  },
  't8-35': {
    opener: 'Một chiếc thang dài 5 m dựa vào tường, chân thang cách tường 3 m. Đầu thang ở độ cao bao nhiêu?',
    goals: ['Giải thích được định lí Pythagore (thuận và đảo).', 'Tính được độ dài cạnh trong tam giác vuông; giải quyết bài toán thực tế.'],
    sections: [
      { title: 'Định lí Pythagore', body: ['Trong một tam giác vuông, bình phương của cạnh huyền bằng tổng các bình phương của hai cạnh góc vuông: BC² = AB² + AC² (△ABC vuông tại A).', 'Chứng minh bằng cắt ghép: xếp 4 tam giác vuông bằng nhau vào hình vuông cạnh a + b theo hai cách.'], scene: 1 },
      { title: 'Định lí Pythagore đảo', body: ['Nếu một tam giác có bình phương của một cạnh bằng tổng các bình phương của hai cạnh kia thì tam giác đó là tam giác vuông.'], scene: 3 },
    ],
    formulas: [{ expr: 'c² = a² + b²', note: 'c là cạnh huyền; a, b là hai cạnh góc vuông' }],
    examples: ['Thang 5 m, chân cách tường 3 m: độ cao 4 m.', 'Tam giác 9, 12, 15 là tam giác vuông vì 15² = 9² + 12².'],
    facts: ['Người Ai Cập cổ dùng sợi dây thắt 12 nút cách đều để tạo tam giác có cạnh 3, 4, 5 – một góc vuông – khi xây dựng.'],
    exercises: [
      { q: 'Tam giác vuông có hai cạnh góc vuông 6 cm và 8 cm. Tính cạnh huyền.', a: '10 cm.' },
      { q: 'Tính đường chéo của hình vuông cạnh 1 dm.', a: '√2 ≈ 1,41 dm.' },
      { q: 'Tam giác 7, 8, 11 có vuông không?', a: 'Không, vì 11² = 121 ≠ 7² + 8² = 113.' },
    ],
  },
  't8-36': {
    opener: 'Không cần trèo lên cây, làm sao đo được chiều cao của cây chỉ với một chiếc cọc và thước dây?',
    goals: ['Giải thích được các trường hợp đồng dạng của hai tam giác vuông.', 'Giải quyết được một số vấn đề thực tiễn gắn với việc vận dụng kiến thức về hai tam giác đồng dạng (đo chiều cao, khoảng cách).'],
    sections: [
      { title: 'Các trường hợp đồng dạng của tam giác vuông', body: ['Hai tam giác vuông đồng dạng nếu: có một góc nhọn bằng nhau; hoặc hai cạnh góc vuông của tam giác này tỉ lệ với hai cạnh góc vuông của tam giác kia; hoặc cạnh huyền và một cạnh góc vuông của tam giác này tỉ lệ với cạnh huyền và một cạnh góc vuông của tam giác kia.'], scene: 1 },
      { title: 'Đường cao trong tam giác vuông', body: ['Đường cao AH của tam giác ABC vuông tại A tạo ra △HBA ∽ △ABC ∽ △HAC. Suy ra AH² = HB · HC; AB² = BH · BC; AC² = CH · CB; AB · AC = BC · AH.'], scene: 2 },
      { title: 'Ứng dụng đo gián tiếp', body: ['Đo chiều cao bằng bóng nắng: tia nắng song song nên tam giác tạo bởi cây và bóng cây đồng dạng với tam giác tạo bởi cọc và bóng cọc.', 'Đo bằng cọc ngắm, đo khoảng cách qua sông nhờ các tam giác đồng dạng (định lí Thalès).'], scene: 4 },
    ],
    formulas: [{ expr: 'AH² = HB · HC', note: 'Đường cao trong tam giác vuông' }],
    examples: ['BH = 4, HC = 9 ⇒ AH = 6.', 'Cọc 1,5 m có bóng 2 m, cột cờ có bóng 12 m ⇒ cột cờ cao 9 m.'],
    exercises: [
      { q: 'Cây có bóng 15 m; cùng lúc, cọc 2 m có bóng 2,5 m. Cây cao bao nhiêu?', a: '15 · 2 : 2,5 = 12 m.' },
      { q: '△ABC vuông tại A, BH = 4, HC = 9. Tính AB.', a: 'AB² = 4 · 13 = 52 ⇒ AB = √52 ≈ 7,2.' },
    ],
  },
  't8-37': {
    opener: 'Bản đồ, ảnh phóng to, mô hình ô tô… đều giống vật thật về hình dạng. Những hình như vậy có quan hệ toán học gì?',
    goals: ['Nhận biết được hình đồng dạng phối cảnh (hình vị tự), hình đồng dạng qua các hình ảnh cụ thể.', 'Nhận biết được vẻ đẹp trong tự nhiên, nghệ thuật, kiến trúc… biểu hiện qua hình đồng dạng.'],
    sections: [
      { title: 'Hình đồng dạng phối cảnh', body: ['Cho điểm O và số k ≠ 0. Với mỗi điểm M của hình H, lấy M′ sao cho OM′ = k · OM (M′ cùng phía với M nếu k > 0, khác phía nếu k < 0). Hình H′ gồm các điểm M′ gọi là hình đồng dạng phối cảnh của H, O là tâm, k là tỉ số.'], scene: 1 },
      { title: 'Hình đồng dạng', body: ['Hình H′ được gọi là đồng dạng với hình H nếu H′ bằng một hình đồng dạng phối cảnh với H.', 'Tỉ số chu vi hai hình đồng dạng bằng |k|; tỉ số diện tích bằng k².'], scene: 2 },
    ],
    examples: ['Tất cả các hình tròn đều đồng dạng với nhau; tất cả các hình vuông đều đồng dạng với nhau.', 'Các khổ giấy A3, A4, A5 là các hình chữ nhật đồng dạng.'],
    exercises: [
      { q: 'Hai hình chữ nhật 2 × 3 và 4 × 5 có đồng dạng không?', a: 'Không, vì 4/2 ≠ 5/3.' },
      { q: 'Phóng to một hình theo tỉ số 3 thì diện tích tăng bao nhiêu lần?', a: '9 lần.' },
    ],
  },
  't8-38': {
    opener: 'Mái của một số chòi canh, lều trại, hộp quà có dạng hình chóp tam giác đều. Hình này có những yếu tố nào, diện tích và thể tích tính ra sao?',
    goals: ['Mô tả được đỉnh, mặt đáy, mặt bên, cạnh bên của hình chóp tam giác đều.', 'Tạo lập được hình chóp tam giác đều.', 'Tính được diện tích xung quanh, thể tích của hình chóp tam giác đều.'],
    sections: [
      { title: 'Hình chóp tam giác đều', body: ['Hình chóp tam giác đều S.ABC có: đỉnh S; mặt đáy ABC là tam giác đều; ba mặt bên SAB, SBC, SCA là các tam giác cân bằng nhau; các cạnh bên SA = SB = SC.', 'Đường cao SH (H là trọng tâm của tam giác đáy); trung đoạn là đường cao vẽ từ đỉnh của mỗi mặt bên.'], scene: 1 },
      { title: 'Tạo lập', body: ['Cắt hình khai triển gồm một tam giác đều và ba tam giác cân bằng nhau dựng trên ba cạnh của nó, rồi gấp lại.'], scene: 2 },
      { title: 'Diện tích xung quanh và thể tích', body: ['Diện tích xung quanh bằng tích nửa chu vi đáy với trung đoạn: Sxq = p · d.', 'Thể tích bằng một phần ba tích diện tích đáy với chiều cao: V = ⅓ · S · h.'], scene: 3 },
    ],
    formulas: [
      { expr: 'Sxq = p · d', note: 'p: nửa chu vi đáy; d: trung đoạn' },
      { expr: 'V = ⅓ · S · h', note: 'S: diện tích đáy; h: chiều cao' },
    ],
    examples: ['Cạnh đáy 6 cm, trung đoạn 5 cm: Sxq = 9 · 5 = 45 cm².', 'Diện tích đáy 15,6 cm², chiều cao 10 cm: V = 52 cm³.'],
    exercises: [
      { q: 'Hình chóp tam giác đều có cạnh đáy 8 cm, trung đoạn 6 cm. Tính Sxq.', a: 'p = 12 ⇒ Sxq = 72 cm².' },
      { q: 'Nếu tăng chiều cao gấp đôi, giữ nguyên đáy, thể tích thay đổi thế nào?', a: 'Tăng gấp đôi.' },
    ],
  },
  't8-39': {
    opener: 'Kim tự tháp Ai Cập, mái tháp chuông, chiếc đèn lồng… có dạng hình chóp tứ giác đều. Thể tích của kim tự tháp lớn đến mức nào?',
    goals: ['Mô tả được đỉnh, mặt đáy, mặt bên, cạnh bên của hình chóp tứ giác đều.', 'Tạo lập được hình chóp tứ giác đều.', 'Tính được diện tích xung quanh, thể tích của hình chóp tứ giác đều; giải quyết bài toán thực tế.'],
    sections: [
      { title: 'Hình chóp tứ giác đều', body: ['Hình chóp tứ giác đều S.ABCD có mặt đáy ABCD là hình vuông; bốn mặt bên là các tam giác cân bằng nhau có chung đỉnh S; bốn cạnh bên bằng nhau.', 'Đường cao SH với H là giao điểm hai đường chéo của đáy.'], scene: 1 },
      { title: 'Thể tích', body: ['Hình chóp và hình lăng trụ có cùng diện tích đáy, cùng chiều cao: đổ đầy nước vào hình chóp ba lần thì đầy hình lăng trụ. Vì vậy V = ⅓ · S · h.'], scene: 3 },
      { title: 'Diện tích', body: ['Sxq = p · d; diện tích toàn phần bằng diện tích xung quanh cộng diện tích đáy.'], scene: 4 },
    ],
    formulas: [
      { expr: 'Sxq = p · d', note: 'Diện tích xung quanh' },
      { expr: 'V = ⅓ · a² · h', note: 'a: cạnh đáy; h: chiều cao' },
    ],
    examples: ['Cạnh đáy 10 cm, trung đoạn 13 cm: Sxq = 260 cm², Stp = 360 cm².', 'Kim tự tháp cạnh đáy 230 m, cao 147 m: V ≈ 2 592 100 m³.'],
    facts: ['Kim tự tháp Kheops ở Ai Cập được xây dựng khoảng 4 500 năm trước, từng là công trình cao nhất thế giới trong gần 4 000 năm.'],
    exercises: [
      { q: 'Hình chóp tứ giác đều cạnh đáy 6 cm, chiều cao 4 cm. Tính thể tích và trung đoạn.', a: 'V = ⅓ · 36 · 4 = 48 cm³; d = √(4² + 3²) = 5 cm.' },
      { q: 'Tính Sxq của hình chóp trên.', a: 'p = 12 ⇒ Sxq = 60 cm².' },
    ],
  },
};
