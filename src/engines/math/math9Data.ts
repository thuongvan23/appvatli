// Dữ liệu và lời giải từng bước cho Toán 9 (tự biên soạn). Được gộp vào các bảng dữ liệu chung trong mathData.ts.
import type { DeriveSet } from './mathDerive';

const L = (e: string, why?: string, hl?: boolean) => ({ e, why, hl });

export const DERIVE9: Record<string, DeriveSet> = {
  // ---------- Chương I ----------
  'c9-check': {
    title: 'Kiểm tra nghiệm của hệ phương trình',
    given: 'Cặp số (2; −1) có là nghiệm của hệ  x + 2y = 0  và  3x − y = 7  không?',
    lines: [
      L('Thay x = 2, y = −1 vào phương trình thứ nhất:', 'Một cặp số là nghiệm của hệ khi nó là nghiệm của cả hai phương trình.'),
      L('2 + 2 · (−1) = 0 ✓'),
      L('Thay vào phương trình thứ hai: 3 · 2 − (−1) = 7 ✓'),
      L('(2; −1) là nghiệm của hệ', undefined, true),
    ],
  },
  'c9-sub': {
    title: 'Giải hệ bằng phương pháp thế',
    given: 'Giải hệ phương trình  x − 2y = 1  và  3x + y = 10.',
    lines: [
      L('Từ phương trình thứ nhất: x = 2y + 1', 'Biểu diễn một ẩn theo ẩn kia từ một phương trình.'),
      L('Thế vào phương trình thứ hai: 3(2y + 1) + y = 10', 'Được phương trình một ẩn y.'),
      L('7y + 3 = 10 ⇔ y = 1'),
      L('x = 2 · 1 + 1 = 3', 'Thay y vừa tìm được để tìm x.'),
      L('Hệ có nghiệm duy nhất (3; 1)', undefined, true),
    ],
  },
  'c9-add': {
    title: 'Giải hệ bằng phương pháp cộng đại số',
    given: 'Giải hệ phương trình  2x + 3y = 7  và  2x − y = 3.',
    lines: [
      L('Trừ từng vế hai phương trình: (2x + 3y) − (2x − y) = 7 − 3', 'Hệ số của x bằng nhau, trừ vế để khử x.'),
      L('4y = 4 ⇔ y = 1'),
      L('Thay vào 2x − y = 3: 2x − 1 = 3 ⇔ x = 2'),
      L('Hệ có nghiệm duy nhất (2; 1)', undefined, true),
    ],
    note: 'Khi hệ số của cùng một ẩn chưa bằng hoặc đối nhau, nhân hai vế mỗi phương trình với số thích hợp trước khi cộng (trừ).',
  },
  'c9-word1': {
    title: 'Giải bài toán bằng cách lập hệ phương trình',
    given: 'Mua 3 quyển vở và 2 cái bút hết 34 nghìn đồng; mua 2 quyển vở và 5 cái bút hết 41 nghìn đồng. Tính giá mỗi quyển vở, mỗi cái bút.',
    lines: [
      L('Gọi giá một quyển vở là x, một cái bút là y (nghìn đồng), x, y > 0', 'Bước 1: chọn ẩn, đặt điều kiện.'),
      L('3x + 2y = 34  và  2x + 5y = 41', 'Lập hệ phương trình.', true),
      L('Nhân: 6x + 4y = 68  và  6x + 15y = 123', 'Nhân phương trình đầu với 2, phương trình sau với 3.'),
      L('11y = 55 ⇔ y = 5; 3x = 34 − 10 ⇔ x = 8', 'Bước 2: giải hệ.'),
      L('Vở 8 nghìn đồng, bút 5 nghìn đồng', 'Bước 3: đối chiếu điều kiện và trả lời.', true),
    ],
  },
  'c9-word2': {
    title: 'Bài toán chuyển động',
    given: 'Một ca nô xuôi dòng 60 km mất 2 giờ, ngược dòng 60 km mất 3 giờ. Tính vận tốc ca nô khi nước yên lặng và vận tốc dòng nước.',
    lines: [
      L('Gọi vận tốc ca nô là x, dòng nước là y (km/h), x > y > 0'),
      L('Vận tốc xuôi dòng: x + y = 60 : 2 = 30'),
      L('Vận tốc ngược dòng: x − y = 60 : 3 = 20'),
      L('Cộng vế: 2x = 50 ⇔ x = 25; y = 5', undefined, true),
      L('Ca nô 25 km/h, dòng nước 5 km/h', undefined, true),
    ],
  },
  // ---------- Chương II ----------
  'c9-prod': {
    title: 'Phương trình tích',
    given: 'Giải phương trình (x − 2)(2x + 3) = 0.',
    lines: [
      L('(x − 2)(2x + 3) = 0', 'Tích bằng 0 khi một trong các thừa số bằng 0.'),
      L('x − 2 = 0 hoặc 2x + 3 = 0'),
      L('x = 2 hoặc x = −3/2', undefined, true),
      L('Giải x² − 3x = 0: x(x − 3) = 0 ⇔ x = 0 hoặc x = 3', 'Phân tích vế trái thành nhân tử để đưa về phương trình tích.', true),
    ],
  },
  'c9-frac': {
    title: 'Phương trình chứa ẩn ở mẫu',
    given: 'Giải phương trình  (x + 1)/(x − 2) = 3/(x − 2) + 2.',
    lines: [
      L('ĐKXĐ: x ≠ 2', 'Bước 1: tìm điều kiện xác định.'),
      L('x + 1 = 3 + 2(x − 2)', 'Bước 2: quy đồng mẫu hai vế rồi khử mẫu.'),
      L('x + 1 = 2x − 1 ⇔ x = 2', 'Bước 3: giải phương trình vừa nhận được.'),
      L('x = 2 không thoả mãn ĐKXĐ ⇒ phương trình vô nghiệm', 'Bước 4: kiểm tra và kết luận.', true),
    ],
  },
  'c9-frac2': {
    title: 'Phương trình chứa ẩn ở mẫu (có nghiệm)',
    given: 'Giải phương trình  x/(x − 1) − 2/x = 1.',
    lines: [
      L('ĐKXĐ: x ≠ 0 và x ≠ 1'),
      L('x² − 2(x − 1) = x(x − 1)', 'Nhân hai vế với mẫu chung x(x − 1) để khử mẫu.'),
      L('x² − 2x + 2 = x² − x ⇔ −x = −2 ⇔ x = 2'),
      L('x = 2 thoả mãn ĐKXĐ. Nghiệm: x = 2', 'Kiểm tra: 2/1 − 2/2 = 1 ✓', true),
    ],
  },
  'c9-ineq': {
    title: 'Chứng minh bất đẳng thức',
    given: 'Chứng minh a² + b² ≥ 2ab với mọi số thực a, b.',
    lines: [
      L('Xét hiệu: a² + b² − 2ab', 'So sánh hai biểu thức bằng cách xét dấu của hiệu.'),
      L('= (a − b)²', 'Hằng đẳng thức bình phương của một hiệu.'),
      L('(a − b)² ≥ 0 với mọi a, b', 'Bình phương của một số luôn không âm.'),
      L('⇒ a² + b² ≥ 2ab; dấu “=” xảy ra khi a = b', undefined, true),
    ],
  },
  'c9-ineq2': {
    title: 'So sánh hai số',
    given: 'Cho a > b. So sánh −3a + 1 và −3b + 1.',
    lines: [
      L('a > b'),
      L('−3a < −3b', 'Nhân hai vế với −3 < 0: bất đẳng thức đổi chiều.'),
      L('−3a + 1 < −3b + 1', 'Cộng 1 vào hai vế: giữ nguyên chiều.', true),
    ],
  },
  'c9-bpt': {
    title: 'Giải bất phương trình bậc nhất một ẩn',
    lines: [
      L('3x − 5 > 7'),
      L('3x > 12', 'Chuyển vế −5 sang vế phải, đổi dấu.'),
      L('x > 4', 'Chia hai vế cho 3 > 0: giữ nguyên chiều.', true),
      L('−2x + 1 ≥ 9 ⇔ −2x ≥ 8', 'Chuyển vế.'),
      L('x ≤ −4', 'Chia hai vế cho −2 < 0: đổi chiều bất phương trình.', true),
    ],
  },
  'c9-bptWord': {
    title: 'Bài toán thực tế',
    given: 'Bạn Lan có 120 nghìn đồng, muốn mua một hộp bút giá 30 nghìn đồng và một số quyển vở giá 8 nghìn đồng mỗi quyển. Lan mua được nhiều nhất bao nhiêu quyển vở?',
    lines: [
      L('Gọi số vở là x (x ∈ ℕ)'),
      L('30 + 8x ≤ 120', 'Tổng số tiền không vượt quá 120 nghìn đồng.', true),
      L('8x ≤ 90 ⇔ x ≤ 11,25'),
      L('Lan mua được nhiều nhất 11 quyển vở', undefined, true),
    ],
  },
  // ---------- Chương III ----------
  'c9-sqrt': {
    title: 'Căn bậc hai và hằng đẳng thức √(A²) = |A|',
    lines: [
      L('√49 = 7 vì 7 ≥ 0 và 7² = 49', 'Căn bậc hai số học của a ≥ 0 là số x ≥ 0 sao cho x² = a.'),
      L('Căn bậc hai của 49 là 7 và −7'),
      L('√((−5)²) = |−5| = 5', '√(A²) = |A|.', true),
      L('√((√3 − 2)²) = |√3 − 2| = 2 − √3', 'Vì √3 < 2 nên √3 − 2 < 0.', true),
      L('√(2x − 4) xác định khi 2x − 4 ≥ 0 ⇔ x ≥ 2', 'Căn thức bậc hai √A xác định khi A ≥ 0.', true),
    ],
  },
  'c9-mul': {
    title: 'Khai căn bậc hai với phép nhân, phép chia',
    lines: [
      L('√(a·b) = √a · √b (a, b ≥ 0)'),
      L('√(16 · 25) = √16 · √25 = 4 · 5 = 20', undefined, true),
      L('√2 · √18 = √36 = 6', 'Nhân các căn bậc hai.', true),
      L('√(a/b) = √a / √b (a ≥ 0, b > 0)'),
      L('√(49/81) = 7/9;  √50 : √2 = √25 = 5', undefined, true),
    ],
  },
  'c9-trans': {
    title: 'Biến đổi đơn giản biểu thức chứa căn',
    lines: [
      L('√50 = √(25 · 2) = 5√2', 'Đưa thừa số ra ngoài dấu căn: √(A²B) = |A|√B.', true),
      L('3√2 = √(9 · 2) = √18', 'Đưa thừa số vào trong dấu căn.'),
      L('1/√3 = √3/3', 'Trục căn thức ở mẫu: nhân cả tử và mẫu với √3.', true),
      L('2/(√3 + 1) = 2(√3 − 1)/[(√3 + 1)(√3 − 1)] = √3 − 1', 'Nhân với biểu thức liên hợp √3 − 1.', true),
    ],
  },
  'c9-simp': {
    title: 'Rút gọn biểu thức',
    given: 'Rút gọn A = √12 + √27 − √48.',
    lines: [
      L('√12 = 2√3; √27 = 3√3; √48 = 4√3', 'Đưa thừa số ra ngoài dấu căn.'),
      L('A = 2√3 + 3√3 − 4√3', 'Các căn đồng dạng √3.'),
      L('A = √3', undefined, true),
    ],
  },
  'c9-cbrt': {
    title: 'Căn bậc ba',
    lines: [
      L('∛64 = 4 vì 4³ = 64'),
      L('∛(−125) = −5 vì (−5)³ = −125', 'Số âm cũng có căn bậc ba (là số âm).'),
      L('∛(a³) = a với mọi a', undefined, true),
      L('∛8 + ∛(−27) − ∛1000 = 2 − 3 − 10 = −11', undefined, true),
      L('Hình lập phương có thể tích 343 cm³ thì cạnh ∛343 = 7 cm', undefined, true),
    ],
  },
  // ---------- Chương IV ----------
  'c9-trig': {
    title: 'Tính tỉ số lượng giác',
    given: 'Tam giác ABC vuông tại A có AB = 3 cm, AC = 4 cm. Tính các tỉ số lượng giác của góc B.',
    lines: [
      L('BC = √(3² + 4²) = 5 (cm)', 'Định lí Pythagore.'),
      L('sin B = AC/BC = 4/5;  cos B = AB/BC = 3/5', 'Với góc B: cạnh đối là AC, cạnh kề là AB.', true),
      L('tan B = AC/AB = 4/3;  cot B = AB/AC = 3/4', undefined, true),
      L('sin C = cos B = 3/5', 'B và C là hai góc phụ nhau.'),
    ],
  },
  'c9-solveTri': {
    title: 'Giải tam giác vuông',
    given: 'Tam giác ABC vuông tại A có BC = 10 cm, góc B = 35°. Tính AB, AC và góc C.',
    lines: [
      L('Ĉ = 90° − 35° = 55°', 'Hai góc nhọn của tam giác vuông phụ nhau.', true),
      L('AC = BC · sin B = 10 · sin 35° ≈ 5,74 (cm)', 'Cạnh góc vuông = cạnh huyền × sin góc đối.', true),
      L('AB = BC · cos B = 10 · cos 35° ≈ 8,19 (cm)', 'Cạnh góc vuông = cạnh huyền × cos góc kề.', true),
    ],
  },
  'c9-ramp': {
    title: 'Ứng dụng: con dốc, cái thang',
    given: 'Một cái thang dài 4 m đặt tựa vào tường, tạo với mặt đất góc 65° (góc an toàn). Chân thang cách tường bao nhiêu mét? Đầu thang cao bao nhiêu?',
    lines: [
      L('Khoảng cách chân thang – tường = 4 · cos 65°', 'Cạnh kề góc 65°.'),
      L('≈ 4 · 0,4226 ≈ 1,69 (m)', undefined, true),
      L('Độ cao đầu thang = 4 · sin 65° ≈ 3,63 (m)', 'Cạnh đối góc 65°.', true),
    ],
  },
  // ---------- Chương V ----------
  'c9-circle': {
    title: 'Vị trí của điểm và đường tròn',
    given: 'Cho đường tròn (O; 5 cm) và các điểm A, B, C với OA = 3 cm, OB = 5 cm, OC = 7 cm.',
    lines: [
      L('OA = 3 < 5 ⇒ A nằm trong đường tròn', undefined, true),
      L('OB = 5 = R ⇒ B nằm trên đường tròn', undefined, true),
      L('OC = 7 > 5 ⇒ C nằm ngoài đường tròn', undefined, true),
    ],
  },
  'c9-chord': {
    title: 'Dây và khoảng cách từ tâm',
    given: 'Đường tròn (O; 5 cm), dây AB = 8 cm. Tính khoảng cách từ O đến AB.',
    lines: [
      L('Kẻ OH ⊥ AB tại H ⇒ H là trung điểm AB', 'Đường kính vuông góc với dây thì đi qua trung điểm của dây (tam giác OAB cân tại O).'),
      L('AH = 8 : 2 = 4 (cm)'),
      L('OH = √(OA² − AH²) = √(25 − 16) = 3 (cm)', 'Định lí Pythagore trong tam giác OAH.', true),
    ],
  },
  'c9-arc': {
    title: 'Độ dài cung, diện tích hình quạt',
    given: 'Đường tròn bán kính 6 cm. Tính độ dài cung 60° và diện tích hình quạt tròn ứng với cung đó.',
    lines: [
      L('l = πRn/180 = π · 6 · 60/180 = 2π ≈ 6,28 (cm)', undefined, true),
      L('S = πR²n/360 = π · 36 · 60/360 = 6π ≈ 18,85 (cm²)', undefined, true),
      L('Kiểm tra: S = l · R/2 = 2π · 6/2 = 6π ✓'),
    ],
  },
  'c9-ring': {
    title: 'Hình vành khuyên',
    given: 'Mặt một chiếc đĩa CD có dạng hình vành khuyên với R = 6 cm, r = 0,75 cm. Tính diện tích.',
    lines: [
      L('S = π(R² − r²)'),
      L('= π(36 − 0,5625) = 35,4375π'),
      L('≈ 111,33 (cm²)', undefined, true),
    ],
  },
  'c9-tangent': {
    title: 'Tiếp tuyến của đường tròn',
    given: 'Từ điểm A nằm ngoài (O; 3 cm) với OA = 5 cm, kẻ hai tiếp tuyến AB, AC (B, C là tiếp điểm). Tính AB.',
    lines: [
      L('AB ⊥ OB tại B', 'Tiếp tuyến vuông góc với bán kính tại tiếp điểm.'),
      L('AB = √(OA² − OB²) = √(25 − 9) = 4 (cm)', undefined, true),
      L('AC = AB = 4 cm', 'Tính chất hai tiếp tuyến cắt nhau.', true),
    ],
  },
  // ---------- Chương VI ----------
  'c9-ax2': {
    title: 'Hàm số y = ax²',
    given: 'Cho hàm số y = ax². Biết đồ thị đi qua điểm A(2; 8). Tìm a và tính giá trị của hàm số tại x = −3.',
    lines: [
      L('Thay x = 2, y = 8: 8 = a · 2²', 'Điểm thuộc đồ thị thì toạ độ thoả mãn công thức hàm số.'),
      L('a = 2', undefined, true),
      L('y = 2x²; tại x = −3: y = 2 · 9 = 18', undefined, true),
      L('Điểm (−2; 8) cũng thuộc đồ thị', 'Đồ thị đối xứng qua trục Oy.'),
    ],
  },
  'c9-quad1': {
    title: 'Giải phương trình bậc hai bằng công thức nghiệm',
    given: 'Giải phương trình 2x² − 5x + 2 = 0.',
    lines: [
      L('a = 2, b = −5, c = 2'),
      L('Δ = b² − 4ac = 25 − 16 = 9 > 0', 'Δ > 0: phương trình có hai nghiệm phân biệt.'),
      L('x₁ = (5 + 3)/4 = 2;  x₂ = (5 − 3)/4 = 1/2', 'x = (−b ± √Δ)/(2a).', true),
    ],
  },
  'c9-quad2': {
    title: 'Công thức nghiệm thu gọn',
    given: 'Giải phương trình x² − 6x + 4 = 0.',
    lines: [
      L('b = −6 chẵn ⇒ b′ = −3', 'Khi b = 2b′, dùng Δ′ = b′² − ac.'),
      L('Δ′ = 9 − 4 = 5 > 0'),
      L('x₁ = 3 + √5;  x₂ = 3 − √5', 'x = (−b′ ± √Δ′)/a.', true),
    ],
  },
  'c9-quadSp': {
    title: 'Phương trình bậc hai khuyết',
    lines: [
      L('3x² − 12 = 0 ⇔ x² = 4 ⇔ x = 2 hoặc x = −2', 'Khuyết b: đưa về x² = k.', true),
      L('x² + 5x = 0 ⇔ x(x + 5) = 0 ⇔ x = 0 hoặc x = −5', 'Khuyết c: đặt nhân tử chung.', true),
      L('x² + 9 = 0 vô nghiệm vì x² + 9 > 0', undefined, true),
    ],
  },
  'c9-viete': {
    title: 'Nhẩm nghiệm nhờ định lí Viète',
    lines: [
      L('x² − 7x + 6 = 0 có a + b + c = 1 − 7 + 6 = 0', 'Nếu a + b + c = 0 thì phương trình có nghiệm x₁ = 1, x₂ = c/a.'),
      L('⇒ x₁ = 1; x₂ = 6', undefined, true),
      L('2x² + 5x + 3 = 0 có a − b + c = 2 − 5 + 3 = 0', 'Nếu a − b + c = 0 thì x₁ = −1, x₂ = −c/a.'),
      L('⇒ x₁ = −1; x₂ = −3/2', undefined, true),
    ],
  },
  'c9-twoNums': {
    title: 'Tìm hai số biết tổng và tích',
    given: 'Tìm hai số có tổng bằng 7 và tích bằng 12.',
    lines: [
      L('Hai số là nghiệm của phương trình x² − 7x + 12 = 0', 'Hai số có tổng S, tích P là nghiệm của x² − Sx + P = 0 (điều kiện S² − 4P ≥ 0).'),
      L('Δ = 49 − 48 = 1'),
      L('x₁ = 4; x₂ = 3', undefined, true),
    ],
  },
  'c9-quadWord1': {
    title: 'Bài toán hình học',
    given: 'Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng 4 m và diện tích 60 m². Tính các kích thước.',
    lines: [
      L('Gọi chiều rộng là x (m), x > 0; chiều dài x + 4'),
      L('x(x + 4) = 60 ⇔ x² + 4x − 60 = 0', undefined, true),
      L('Δ′ = 4 + 60 = 64 ⇒ x₁ = −2 + 8 = 6; x₂ = −2 − 8 = −10'),
      L('x = −10 loại. Chiều rộng 6 m, chiều dài 10 m', undefined, true),
    ],
  },
  'c9-quadWord2': {
    title: 'Bài toán năng suất',
    given: 'Một đội dự định trồng 120 cây trong một số ngày. Mỗi ngày trồng nhiều hơn dự định 2 cây nên hoàn thành sớm 2 ngày. Theo dự định mỗi ngày trồng bao nhiêu cây?',
    lines: [
      L('Gọi số cây dự định trồng mỗi ngày là x (x ∈ ℕ*)'),
      L('120/x − 120/(x + 2) = 2', 'Thời gian dự định − thời gian thực tế = 2 ngày.', true),
      L('120(x + 2) − 120x = 2x(x + 2) ⇔ x² + 2x − 120 = 0'),
      L('Δ′ = 1 + 120 = 121 ⇒ x = −1 + 11 = 10 (nhận), x = −12 (loại)'),
      L('Dự định mỗi ngày trồng 10 cây', undefined, true),
    ],
  },
  // ---------- Chương VII – VIII ----------
  'c9-freq': {
    title: 'Lập bảng tần số',
    given: 'Điểm kiểm tra của 20 học sinh: 7 8 6 9 7 8 8 10 7 6 8 9 7 8 5 8 9 7 8 6.',
    lines: [
      L('Các giá trị khác nhau: 5, 6, 7, 8, 9, 10'),
      L('Đếm số lần xuất hiện (tần số): 5 → 1; 6 → 3; 7 → 5', 'Tần số của một giá trị là số lần giá trị đó xuất hiện.'),
      L('8 → 7; 9 → 3; 10 → 1'),
      L('Kiểm tra: 1 + 3 + 5 + 7 + 3 + 1 = 20 ✓', undefined, true),
      L('Tần số tương đối của điểm 8: 7/20 = 35%', 'Tần số tương đối = tần số : tổng số dữ liệu.', true),
    ],
  },
  'c9-group': {
    title: 'Ghép nhóm số liệu',
    given: 'Chiều cao (cm) của 30 học sinh được ghép thành các nhóm [150; 155), [155; 160), [160; 165), [165; 170).',
    lines: [
      L('Mỗi nhóm là một nửa khoảng [a; b): gồm các giá trị x với a ≤ x < b', 'Độ dài nhóm là b − a = 5 cm.'),
      L('Đếm số học sinh thuộc mỗi nhóm: 6, 12, 9, 3', 'Học sinh cao đúng 155 cm thuộc nhóm [155; 160).'),
      L('Tần số tương đối: 20%, 40%, 30%, 10%', undefined, true),
      L('Nhóm [155; 160) có tần số lớn nhất', undefined, true),
    ],
  },
  'c9-prob1': {
    title: 'Tính xác suất bằng không gian mẫu',
    given: 'Gieo hai đồng xu cân đối. Tính xác suất của biến cố A: “Có đúng một đồng xu sấp”.',
    lines: [
      L('Ω = {SS; SN; NS; NN}, n(Ω) = 4', 'Liệt kê không gian mẫu; các kết quả đồng khả năng.'),
      L('Các kết quả thuận lợi cho A: SN, NS', 'n(A) = 2.'),
      L('P(A) = n(A)/n(Ω) = 2/4 = 1/2', undefined, true),
    ],
  },
  'c9-prob2': {
    title: 'Chọn ngẫu nhiên hai người',
    given: 'Chọn ngẫu nhiên 2 bạn từ 4 bạn An, Bình, Chi, Dũng. Tính xác suất An được chọn.',
    lines: [
      L('Ω = {AB, AC, AD, BC, BD, CD}, n(Ω) = 6', 'Mỗi kết quả là một cặp (không phân biệt thứ tự).'),
      L('Kết quả thuận lợi: AB, AC, AD ⇒ 3 kết quả'),
      L('P = 3/6 = 1/2', undefined, true),
    ],
  },
  // ---------- Chương IX ----------
  'c9-inscribed': {
    title: 'Góc nội tiếp',
    given: 'Cho đường tròn (O) có cung AB bằng 100°. M là điểm trên cung lớn AB. Tính góc AMB và góc AOB.',
    lines: [
      L('Góc ở tâm AOB = sđ cung nhỏ AB = 100°', undefined, true),
      L('Góc nội tiếp AMB = ½ · 100° = 50°', 'Góc nội tiếp bằng nửa số đo cung bị chắn.', true),
      L('Nếu N thuộc cung nhỏ AB: góc ANB = ½ · 260° = 130°', 'Cung bị chắn lúc này là cung lớn 260°.'),
    ],
  },
  'c9-eqTri': {
    title: 'Đường tròn ngoại tiếp, nội tiếp tam giác đều',
    given: 'Tam giác đều cạnh a = 6 cm. Tính bán kính đường tròn ngoại tiếp R và nội tiếp r.',
    lines: [
      L('Đường cao h = a√3/2 = 3√3 (cm)', 'Trong tam giác đều, tâm hai đường tròn trùng với trọng tâm G.'),
      L('R = ⅔h = a√3/3 = 2√3 ≈ 3,46 (cm)', undefined, true),
      L('r = ⅓h = a√3/6 = √3 ≈ 1,73 (cm)', undefined, true),
    ],
  },
  'c9-cyclic': {
    title: 'Chứng minh tứ giác nội tiếp',
    given: 'Cho tam giác ABC có hai đường cao BD, CE. Chứng minh tứ giác BEDC nội tiếp.',
    lines: [
      L('BEC = 90° và BDC = 90°', 'BD, CE là các đường cao.'),
      L('E, D cùng nhìn đoạn BC dưới góc vuông'),
      L('⇒ E, D thuộc đường tròn đường kính BC', 'Góc nội tiếp chắn nửa đường tròn là góc vuông (và điều ngược lại).'),
      L('⇒ Tứ giác BEDC nội tiếp đường tròn đường kính BC', undefined, true),
    ],
  },
  'c9-polygon': {
    title: 'Đa giác đều',
    lines: [
      L('Lục giác đều: mỗi góc = (6 − 2) · 180°/6 = 120°', undefined, true),
      L('Góc ở tâm = 360°/6 = 60° ⇒ cạnh bằng bán kính R', 'Tam giác tạo bởi tâm và một cạnh là tam giác đều.', true),
      L('Bát giác đều: mỗi góc = 6 · 180°/8 = 135°', undefined, true),
      L('Phép quay 60°, 120°, …, 360° tâm O giữ nguyên lục giác đều'),
    ],
  },
  // ---------- Chương X ----------
  'c9-cyl': {
    title: 'Hình trụ',
    given: 'Một hộp sữa hình trụ có bán kính đáy 4 cm, chiều cao 10 cm. Tính diện tích giấy làm nhãn bao quanh hộp và thể tích hộp.',
    lines: [
      L('Sxq = 2πrh = 2π · 4 · 10 = 80π ≈ 251,3 (cm²)', 'Nhãn dán quanh thân hộp là mặt xung quanh.', true),
      L('V = πr²h = π · 16 · 10 = 160π ≈ 502,7 (cm³)', undefined, true),
    ],
  },
  'c9-cone': {
    title: 'Hình nón',
    given: 'Một chiếc nón lá có đường kính vành 40 cm và chiều cao 19 cm. Tính diện tích lá cần dùng (diện tích xung quanh).',
    lines: [
      L('r = 20 cm; l = √(20² + 19²) = √761 ≈ 27,6 (cm)', 'Đường sinh l, bán kính r, chiều cao h tạo thành tam giác vuông.'),
      L('Sxq = πrl ≈ π · 20 · 27,6 ≈ 1 733 (cm²)', undefined, true),
      L('V = ⅓πr²h = ⅓π · 400 · 19 ≈ 7 959 (cm³)'),
    ],
  },
  'c9-sphere': {
    title: 'Hình cầu',
    given: 'Một quả bóng hình cầu có đường kính 22 cm. Tính diện tích mặt cầu và thể tích.',
    lines: [
      L('R = 11 cm'),
      L('S = 4πR² = 4π · 121 = 484π ≈ 1 520,5 (cm²)', undefined, true),
      L('V = 4/3·πR³ = 4/3·π · 1 331 ≈ 5 575,3 (cm³)', undefined, true),
    ],
  },
};

export const CHARTS9 = {
  scores9: { title: 'Điểm kiểm tra môn Toán của 20 học sinh', catName: 'Điểm', cats: ['5', '6', '7', '8', '9', '10'], series: [{ name: 'Tần số', vals: [1, 3, 5, 7, 3, 1] }], unit: 'học sinh', note: 'Bảng tần số cho biết mỗi giá trị xuất hiện bao nhiêu lần. Biểu đồ tần số có thể là biểu đồ cột hoặc đoạn thẳng.', rel: true },
  shoes: { title: 'Cỡ giày bán được trong một tuần của một cửa hàng', catName: 'Cỡ giày', cats: ['36', '37', '38', '39', '40', '41', '42'], series: [{ name: 'Tần số', vals: [5, 12, 18, 25, 20, 13, 7] }], unit: 'đôi', note: 'Cỡ giày nào bán chạy nhất? Cửa hàng nên nhập nhiều cỡ nào?', rel: true },
  transport9: { title: 'Phương tiện đến trường của 40 học sinh lớp 9A', catName: 'Phương tiện', cats: ['Đi bộ', 'Xe đạp', 'Xe buýt', 'Xe máy (bố mẹ đưa)'], series: [{ name: 'Tần số', vals: [6, 18, 4, 12] }], unit: 'học sinh', note: 'Biểu đồ hình quạt tròn biểu diễn tần số tương đối (%) của mỗi giá trị.', rel: true },
  heights: { title: 'Chiều cao của 30 học sinh lớp 9 (cm)', catName: 'Nhóm chiều cao', cats: ['[150; 155)', '[155; 160)', '[160; 165)', '[165; 170)'], series: [{ name: 'Tần số', vals: [6, 12, 9, 3] }], unit: 'học sinh', note: 'Số liệu được ghép nhóm; biểu đồ tần số ghép nhóm dùng các cột liền nhau.', rel: true },
  times: { title: 'Thời gian tự học mỗi ngày của 50 học sinh (phút)', catName: 'Nhóm thời gian', cats: ['[0; 30)', '[30; 60)', '[60; 90)', '[90; 120)', '[120; 150)'], series: [{ name: 'Tần số', vals: [5, 14, 18, 9, 4] }], unit: 'học sinh', note: 'Có bao nhiêu phần trăm học sinh tự học từ 60 phút trở lên mỗi ngày?', rel: true },
};

const RED = '#e11d48';
const BLUE = '#2563eb';

export const EXPS9 = {
  coinDie: {
    name: 'Tung một đồng xu rồi gieo một con xúc xắc',
    short: 'Xu + xúc xắc',
    desc: 'Mỗi kết quả gồm mặt của đồng xu (S hoặc N) và số chấm của xúc xắc. Có 2 · 6 = 12 kết quả.',
    pic: 'cards' as const,
    outcomes: ['S', 'N'].flatMap((c) => [1, 2, 3, 4, 5, 6].map((d) => `${c}${d}`)),
    events: [
      { name: 'Đồng xu sấp và xúc xắc ra số chẵn', test: (o: string) => o[0] === 'S' && Number(o.slice(1)) % 2 === 0 },
      { name: 'Xúc xắc ra 6 chấm', test: (o: string) => o.endsWith('6') },
      { name: 'Đồng xu ngửa', test: (o: string) => o[0] === 'N' },
    ],
  },
  pick2: {
    name: 'Chọn ngẫu nhiên 2 bạn từ 4 bạn An, Bình, Chi, Dũng',
    short: 'Chọn 2 bạn',
    desc: 'Mỗi kết quả là một nhóm hai bạn (không phân biệt thứ tự): A = An, B = Bình, C = Chi, D = Dũng.',
    pic: 'cards' as const,
    outcomes: ['AB', 'AC', 'AD', 'BC', 'BD', 'CD'],
    events: [
      { name: 'An được chọn', test: (o: string) => o.includes('A') },
      { name: 'Không có Dũng', test: (o: string) => !o.includes('D') },
    ],
  },
  draw2: {
    name: 'Rút lần lượt hai thẻ (không hoàn lại) từ hộp có 3 thẻ ghi 1, 2, 3',
    short: 'Rút 2 thẻ',
    desc: 'Kết quả ghi theo thứ tự rút, ví dụ 12: lần thứ nhất rút thẻ 1, lần thứ hai rút thẻ 2.',
    pic: 'cards' as const,
    outcomes: ['12', '13', '21', '23', '31', '32'],
    events: [
      { name: 'Tổng hai số là số lẻ', test: (o: string) => (Number(o[0]) + Number(o[1])) % 2 === 1 },
      { name: 'Số rút lần đầu lớn hơn', test: (o: string) => Number(o[0]) > Number(o[1]) },
      { name: 'Ghép được số chia hết cho 3', test: (o: string) => Number(o) % 3 === 0 },
    ],
  },
  balls2: {
    name: 'Lấy lần lượt có hoàn lại hai viên bi từ túi có 1 bi đỏ (Đ) và 2 bi xanh (X1, X2)',
    short: 'Hai lần lấy bi',
    desc: 'Mỗi kết quả là một cặp (viên lấy lần 1; viên lấy lần 2). Có 3 · 3 = 9 kết quả.',
    pic: 'cards' as const,
    outcomes: ['Đ', 'X1', 'X2'].flatMap((a) => ['Đ', 'X1', 'X2'].map((b) => `${a}-${b}`)),
    colors: [RED, BLUE],
    events: [
      { name: 'Hai viên cùng màu', test: (o: string) => (o.split('-')[0][0] === o.split('-')[1][0]) },
      { name: 'Có ít nhất một bi đỏ', test: (o: string) => o.includes('Đ') },
    ],
  },
};

export const SORTS9 = {
  isLin2: {
    title: 'Phương trình nào là phương trình bậc nhất hai ẩn?',
    bins: ['Phương trình bậc nhất hai ẩn ax + by = c', 'Không phải'],
    items: [
      { t: '2x − y = 3', bin: 0 },
      { t: 'x + 0y = 5', bin: 0 },
      { t: '0x − 4y = 2', bin: 0 },
      { t: 'x² + y = 1', bin: 1 },
      { t: '0x + 0y = 7', bin: 1 },
      { t: '3x + 2y = 0', bin: 0 },
      { t: 'xy = 4', bin: 1 },
      { t: 'x/2 − y = 1', bin: 0 },
    ],
    hint: 'Phương trình bậc nhất hai ẩn x, y có dạng ax + by = c, trong đó a, b, c là các số đã biết, a ≠ 0 hoặc b ≠ 0.',
  },
  isLinIneq: {
    title: 'Bất phương trình nào là bất phương trình bậc nhất một ẩn?',
    bins: ['Bất phương trình bậc nhất một ẩn', 'Không phải'],
    items: [
      { t: '2x − 3 > 0', bin: 0 },
      { t: '−x + 5 ≤ 0', bin: 0 },
      { t: 'x² − 1 < 0', bin: 1 },
      { t: '0x + 2 > 0', bin: 1 },
      { t: '½x ≥ 4', bin: 0 },
      { t: '1/x > 2', bin: 1 },
      { t: '3 − 4x < 0', bin: 0 },
      { t: 'x + y > 1', bin: 1 },
    ],
  },
  circleLine: {
    title: 'Vị trí tương đối của đường thẳng a và đường tròn (O; R)',
    bins: ['Cắt nhau', 'Tiếp xúc', 'Không giao nhau'],
    items: [
      { t: 'R = 5 cm, d = 3 cm', bin: 0 },
      { t: 'R = 4 cm, d = 4 cm', bin: 1 },
      { t: 'R = 2 cm, d = 2,5 cm', bin: 2 },
      { t: 'R = 6 cm, d = 0', bin: 0 },
      { t: 'R = 3,5 cm, d = 35 mm', bin: 1 },
      { t: 'R = 1 dm, d = 12 cm', bin: 2 },
    ],
    hint: 'So sánh khoảng cách d từ tâm đến đường thẳng với bán kính R.',
  },
};

export const TABLES9 = {
  trigSpecial: {
    title: 'Tỉ số lượng giác của các góc đặc biệt',
    cols: ['sin', 'cos', 'tan', 'cot'],
    rows: [
      ['30°', '1/2', '√3/2', '√3/3', '√3'],
      ['45°', '√2/2', '√2/2', '1', '1'],
      ['60°', '√3/2', '1/2', '√3', '√3/3'],
    ] as [string, ...string[]][],
  },
  twoCircles: {
    title: 'Vị trí tương đối của hai đường tròn (O; R) và (O′; r), R ≥ r, d = OO′',
    cols: ['Số điểm chung', 'Hệ thức giữa d, R, r'],
    rows: [
      ['Cắt nhau', '2', 'R − r < d < R + r'],
      ['Tiếp xúc ngoài', '1', 'd = R + r'],
      ['Tiếp xúc trong', '1', 'd = R − r > 0'],
      ['Ở ngoài nhau', '0', 'd > R + r'],
      ['Đựng nhau', '0', 'd < R − r'],
    ] as [string, ...string[]][],
  },
  roundSolids: {
    title: 'Hình trụ, hình nón, hình cầu',
    cols: ['Diện tích xung quanh (mặt)', 'Thể tích'],
    rows: [
      ['Hình trụ (r, h)', 'Sxq = 2πrh', 'V = πr²h'],
      ['Hình nón (r, h, đường sinh l)', 'Sxq = πrl', 'V = ⅓πr²h'],
      ['Hình cầu (R)', 'S = 4πR²', 'V = 4/3·πR³'],
    ] as [string, ...string[]][],
  },
  sqrtRules: {
    title: 'Các phép biến đổi căn thức bậc hai',
    cols: ['Công thức', 'Ví dụ'],
    rows: [
      ['Hằng đẳng thức', '√(A²) = |A|', '√((−3)²) = 3'],
      ['Khai căn một tích', '√(AB) = √A · √B (A, B ≥ 0)', '√(9 · 16) = 12'],
      ['Khai căn một thương', '√(A/B) = √A/√B (A ≥ 0, B > 0)', '√(25/4) = 5/2'],
      ['Đưa thừa số ra ngoài dấu căn', '√(A²B) = |A|√B (B ≥ 0)', '√12 = 2√3'],
      ['Trục căn thức ở mẫu', 'A/√B = A√B/B (B > 0)', '2/√2 = √2'],
    ] as [string, ...string[]][],
  },
};
