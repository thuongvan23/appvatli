// Lời giải trình bày từng bước cho các ví dụ Toán 8 (tự biên soạn).
export interface DLine {
  e: string;
  why?: string;
  hl?: boolean;
  tag?: string;
}
export interface DeriveSet {
  title: string;
  given?: string;
  lines: DLine[];
  answer?: string;
  note?: string;
}

export const DERIVE: Record<string, DeriveSet> = {
  // ---------- Chương I ----------
  'b1-value': {
    title: 'Giá trị của đơn thức',
    given: 'Tính giá trị của đơn thức −3x²y tại x = −2 và y = ⅓.',
    lines: [
      { e: '−3x²y = −3 · (−2)² · ⅓', why: 'Thay x = −2, y = ⅓ vào đơn thức.' },
      { e: '= −3 · 4 · ⅓', why: '(−2)² = 4.' },
      { e: '= −4', why: 'Nhân các số: −3 · 4 = −12; −12 · ⅓ = −4.', hl: true },
    ],
    answer: 'Giá trị của đơn thức là −4.',
  },
  'b1-app': {
    title: 'Đơn thức trong thực tế',
    given: 'Mảnh vườn hình chữ nhật có chiều dài 3x (m), chiều rộng 2y (m). Viết đơn thức biểu thị diện tích, rồi tính diện tích khi x = 4, y = 5.',
    lines: [
      { e: 'S = 3x · 2y', why: 'Diện tích hình chữ nhật = chiều dài × chiều rộng.' },
      { e: 'S = 6xy (m²)', why: 'Thu gọn: nhân các hệ số 3 · 2 = 6, giữ phần biến xy.', hl: true },
      { e: 'Với x = 4, y = 5: S = 6 · 4 · 5', why: 'Thay giá trị của các biến.' },
      { e: 'S = 120 (m²)', hl: true },
    ],
    answer: 'S = 6xy; khi x = 4, y = 5 thì S = 120 m².',
  },
  'b2-value': {
    title: 'Giá trị của đa thức',
    given: 'Tính giá trị của đa thức P = x²y − 2xy + 3 tại x = 2, y = −1.',
    lines: [
      { e: 'P = 2² · (−1) − 2 · 2 · (−1) + 3', why: 'Thay x = 2, y = −1 vào từng hạng tử.' },
      { e: '= −4 − (−4) + 3', why: 'Tính từng hạng tử: 2² · (−1) = −4; 2 · 2 · (−1) = −4.' },
      { e: '= −4 + 4 + 3', why: 'Trừ một số âm là cộng với số đối của nó.' },
      { e: '= 3', hl: true },
    ],
    answer: 'P = 3.',
    note: 'Nên thu gọn đa thức trước khi tính giá trị để việc tính toán đơn giản hơn.',
  },
  'b3-app': {
    title: 'Chu vi tam giác',
    given: 'Ba cạnh của một tam giác có độ dài 2x + 1, 3x − 2, x + 4 (cm). Viết đa thức biểu thị chu vi; tính chu vi khi x = 2.',
    lines: [
      { e: 'C = (2x + 1) + (3x − 2) + (x + 4)', why: 'Chu vi bằng tổng ba cạnh.' },
      { e: '= 2x + 1 + 3x − 2 + x + 4', why: 'Bỏ dấu ngoặc (trước ngoặc là dấu “+” nên giữ nguyên dấu).' },
      { e: '= (2x + 3x + x) + (1 − 2 + 4)', why: 'Nhóm các hạng tử đồng dạng.' },
      { e: '= 6x + 3', hl: true },
      { e: 'Khi x = 2: C = 6 · 2 + 3 = 15 (cm)', hl: true },
    ],
    answer: 'C = 6x + 3; khi x = 2, chu vi bằng 15 cm.',
  },
  'b3-find': {
    title: 'Tìm đa thức chưa biết',
    given: 'Tìm đa thức M biết M + (x² − 2xy) = 3x² + xy − 1.',
    lines: [
      { e: 'M = (3x² + xy − 1) − (x² − 2xy)', why: 'Số hạng chưa biết = tổng − số hạng đã biết.' },
      { e: '= 3x² + xy − 1 − x² + 2xy', why: 'Bỏ ngoặc có dấu “−” đằng trước: đổi dấu mọi hạng tử trong ngoặc.' },
      { e: '= (3x² − x²) + (xy + 2xy) − 1', why: 'Nhóm các hạng tử đồng dạng.' },
      { e: '= 2x² + 3xy − 1', hl: true },
    ],
    answer: 'M = 2x² + 3xy − 1.',
  },
  'b4-app': {
    title: 'Diện tích hình chữ nhật',
    given: 'Hình chữ nhật có chiều dài 2x + 3 (m), chiều rộng x − 1 (m). Viết đa thức biểu thị diện tích, tính diện tích khi x = 5.',
    lines: [
      { e: 'S = (2x + 3)(x − 1)', why: 'Diện tích = chiều dài × chiều rộng.' },
      { e: '= 2x · x + 2x · (−1) + 3 · x + 3 · (−1)', why: 'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia.' },
      { e: '= 2x² − 2x + 3x − 3', why: 'Tính từng tích.' },
      { e: '= 2x² + x − 3', why: 'Thu gọn.', hl: true },
      { e: 'Khi x = 5: S = 2 · 25 + 5 − 3 = 52 (m²)', why: 'Kiểm tra: (2·5 + 3)(5 − 1) = 13 · 4 = 52.', hl: true },
    ],
    answer: 'S = 2x² + x − 3; khi x = 5 thì S = 52 m².',
  },
  'b4-prove': {
    title: 'Chứng minh đẳng thức',
    given: 'Chứng minh rằng (x − 1)(x² + x + 1) = x³ − 1.',
    lines: [
      { e: 'VT = (x − 1)(x² + x + 1)', why: 'Biến đổi vế trái.' },
      { e: '= x · x² + x · x + x · 1 − x² − x − 1', why: 'Nhân x với từng hạng tử, rồi nhân −1 với từng hạng tử.' },
      { e: '= x³ + x² + x − x² − x − 1', why: 'Tính các tích.' },
      { e: '= x³ − 1 = VP', why: 'Các hạng tử x² và −x², x và −x triệt tiêu nhau.', hl: true },
    ],
    answer: 'Vế trái bằng vế phải – đẳng thức được chứng minh.',
  },
  'b5-mono': {
    title: 'Chia đơn thức cho đơn thức',
    given: 'Thực hiện phép chia 12x⁴y³ : (−4x²y).',
    lines: [
      { e: '12x⁴y³ : (−4x²y)', why: 'Kiểm tra: mỗi biến của đơn thức chia đều có trong đơn thức bị chia với số mũ không lớn hơn → phép chia hết.' },
      { e: '= [12 : (−4)] · (x⁴ : x²) · (y³ : y)', why: 'Chia hệ số cho hệ số, chia luỹ thừa của từng biến cho luỹ thừa của cùng biến đó.' },
      { e: '= −3 · x² · y²', why: 'xᵐ : xⁿ = xᵐ⁻ⁿ (m ≥ n).' },
      { e: '= −3x²y²', hl: true },
    ],
    answer: '12x⁴y³ : (−4x²y) = −3x²y².',
  },
  'b5-app': {
    title: 'Tìm chiều dài hình chữ nhật',
    given: 'Hình chữ nhật có diện tích 6x²y + 9xy² (cm²) và chiều rộng 3xy (cm). Tìm chiều dài.',
    lines: [
      { e: 'Chiều dài = (6x²y + 9xy²) : 3xy', why: 'Chiều dài = diện tích : chiều rộng.' },
      { e: '= 6x²y : 3xy + 9xy² : 3xy', why: 'Chia từng hạng tử của đa thức cho đơn thức.' },
      { e: '= 2x + 3y (cm)', hl: true },
    ],
    answer: 'Chiều dài là 2x + 3y (cm).',
  },
  // ---------- Chương II ----------
  'b6-calc': {
    title: 'Tính nhanh nhờ hằng đẳng thức',
    lines: [
      { e: '101² = (100 + 1)²', tag: 'Bình phương của một tổng' },
      { e: '= 100² + 2 · 100 · 1 + 1² = 10 201', hl: true },
      { e: '99² = (100 − 1)²', tag: 'Bình phương của một hiệu' },
      { e: '= 100² − 2 · 100 · 1 + 1² = 9 801', hl: true },
      { e: '98 · 102 = (100 − 2)(100 + 2)', tag: 'Hiệu hai bình phương' },
      { e: '= 100² − 2² = 10 000 − 4 = 9 996', hl: true },
    ],
    note: 'Viết số thành tổng hoặc hiệu với một số tròn chục, tròn trăm rồi áp dụng hằng đẳng thức.',
  },
  'b6-expand': {
    title: 'Khai triển bằng hằng đẳng thức',
    lines: [
      { e: '(2x + 3)² = (2x)² + 2 · 2x · 3 + 3²', why: 'Áp dụng (A + B)² với A = 2x, B = 3.' },
      { e: '= 4x² + 12x + 9', hl: true },
      { e: '(x − 5y)² = x² − 2 · x · 5y + (5y)²', why: 'Áp dụng (A − B)² với A = x, B = 5y.' },
      { e: '= x² − 10xy + 25y²', hl: true },
      { e: '(3x − 1)(3x + 1) = (3x)² − 1²', why: 'Áp dụng (A − B)(A + B) = A² − B².' },
      { e: '= 9x² − 1', hl: true },
    ],
  },
  'b6-reverse': {
    title: 'Viết thành bình phương của một tổng / một hiệu',
    lines: [
      { e: 'x² + 6x + 9 = x² + 2 · x · 3 + 3²', why: 'Nhận ra A = x, B = 3 và hạng tử 2AB = 6x.' },
      { e: '= (x + 3)²', hl: true },
      { e: '4x² − 4x + 1 = (2x)² − 2 · 2x · 1 + 1²', why: 'A = 2x, B = 1, 2AB = 4x.' },
      { e: '= (2x − 1)²', hl: true },
      { e: '9 − 12y + 4y² = 3² − 2 · 3 · 2y + (2y)²', why: 'A = 3, B = 2y.' },
      { e: '= (3 − 2y)²', hl: true },
    ],
  },
  'b7-expand': {
    title: 'Khai triển lập phương của một tổng, một hiệu',
    lines: [
      { e: '(x + 2)³ = x³ + 3 · x² · 2 + 3 · x · 2² + 2³', why: 'Áp dụng (A + B)³ với A = x, B = 2.' },
      { e: '= x³ + 6x² + 12x + 8', hl: true },
      { e: '(2x − y)³ = (2x)³ − 3 · (2x)² · y + 3 · 2x · y² − y³', why: 'Áp dụng (A − B)³ với A = 2x, B = y.' },
      { e: '= 8x³ − 12x²y + 6xy² − y³', hl: true },
    ],
  },
  'b7-calc': {
    title: 'Tính nhanh và viết gọn',
    lines: [
      { e: '11³ = (10 + 1)³ = 1000 + 300 + 30 + 1', why: '(10 + 1)³ = 10³ + 3 · 10² · 1 + 3 · 10 · 1² + 1³.' },
      { e: '= 1 331', hl: true },
      { e: '99³ = (100 − 1)³ = 1 000 000 − 30 000 + 300 − 1', why: '(100 − 1)³ = 100³ − 3 · 100² + 3 · 100 − 1.' },
      { e: '= 970 299', hl: true },
      { e: 'x³ + 9x² + 27x + 27 = x³ + 3 · x² · 3 + 3 · x · 3² + 3³', why: 'Nhận ra dạng (A + B)³ với A = x, B = 3.' },
      { e: '= (x + 3)³', hl: true },
    ],
  },
  'b8-fact': {
    title: 'Tổng và hiệu hai lập phương',
    lines: [
      { e: 'x³ + 8 = x³ + 2³', why: 'Viết 8 = 2³.' },
      { e: '= (x + 2)(x² − 2x + 4)', why: 'A³ + B³ = (A + B)(A² − AB + B²).', hl: true },
      { e: '27x³ − 1 = (3x)³ − 1³', why: 'Viết 27x³ = (3x)³.' },
      { e: '= (3x − 1)(9x² + 3x + 1)', why: 'A³ − B³ = (A − B)(A² + AB + B²).', hl: true },
      { e: '(x + 1)(x² − x + 1) − (x − 1)(x² + x + 1)', why: 'Rút gọn biểu thức: mỗi tích là một hằng đẳng thức.' },
      { e: '= (x³ + 1) − (x³ − 1) = 2', hl: true },
    ],
  },
  'b9-common': {
    title: 'Đặt nhân tử chung',
    lines: [
      { e: '6x²y − 9xy² = 3xy · 2x − 3xy · 3y', why: 'Nhân tử chung: ƯCLN của 6 và 9 là 3; phần biến chung là xy.' },
      { e: '= 3xy(2x − 3y)', hl: true },
      { e: '2x(x − 3) + 5(x − 3) = (x − 3)(2x + 5)', why: 'Nhân tử chung là đa thức (x − 3).', hl: true },
      { e: 'x(y − 1) − 3(1 − y) = x(y − 1) + 3(y − 1)', why: 'Đổi dấu: −(1 − y) = y − 1 để xuất hiện nhân tử chung.' },
      { e: '= (y − 1)(x + 3)', hl: true },
    ],
  },
  'b9-hdt': {
    title: 'Phân tích bằng hằng đẳng thức',
    lines: [
      { e: 'x² − 16 = x² − 4² = (x − 4)(x + 4)', why: 'Hiệu hai bình phương.', hl: true },
      { e: '9x² − 6x + 1 = (3x)² − 2 · 3x · 1 + 1² = (3x − 1)²', why: 'Bình phương của một hiệu.', hl: true },
      { e: 'x³ + 27 = (x + 3)(x² − 3x + 9)', why: 'Tổng hai lập phương: 27 = 3³.', hl: true },
      { e: '(x + 1)² − 4 = (x + 1 − 2)(x + 1 + 2)', why: 'Hiệu hai bình phương với A = x + 1, B = 2.' },
      { e: '= (x − 1)(x + 3)', hl: true },
    ],
  },
  'b9-group': {
    title: 'Nhóm các hạng tử',
    lines: [
      { e: 'x² − xy + 3x − 3y = (x² − xy) + (3x − 3y)', why: 'Nhóm hai hạng tử đầu và hai hạng tử cuối.' },
      { e: '= x(x − y) + 3(x − y)', why: 'Đặt nhân tử chung trong từng nhóm.' },
      { e: '= (x − y)(x + 3)', why: 'Xuất hiện nhân tử chung (x − y).', hl: true },
      { e: 'x² − 2x + 1 − y² = (x² − 2x + 1) − y²', why: 'Nhóm ba hạng tử đầu thành bình phương.' },
      { e: '= (x − 1)² − y² = (x − 1 − y)(x − 1 + y)', hl: true },
    ],
  },
  'b9-solve': {
    title: 'Ứng dụng: tìm x',
    given: 'Tìm x biết x² − 5x = 0 và x³ − 4x = 0.',
    lines: [
      { e: 'x² − 5x = 0', why: 'Phân tích vế trái thành nhân tử.' },
      { e: 'x(x − 5) = 0', why: 'Tích bằng 0 khi một trong các thừa số bằng 0.' },
      { e: 'x = 0 hoặc x = 5', hl: true },
      { e: 'x³ − 4x = 0 ⇔ x(x² − 4) = 0 ⇔ x(x − 2)(x + 2) = 0', why: 'Đặt nhân tử chung rồi dùng hiệu hai bình phương.' },
      { e: 'x = 0 hoặc x = 2 hoặc x = −2', hl: true },
    ],
  },
  // ---------- Chương III ----------
  'b10-sum': {
    title: 'Tổng các góc của một tứ giác bằng 360°',
    given: 'Cho tứ giác lồi ABCD. Chứng minh  Â + B̂ + Ĉ + D̂ = 360°.',
    lines: [
      { e: 'Kẻ đường chéo AC.', why: 'Đường chéo AC chia tứ giác thành hai tam giác ABC và ACD.' },
      { e: '△ABC: BAC + B̂ + BCA = 180°', why: 'Tổng ba góc của một tam giác bằng 180°.' },
      { e: '△ACD: CAD + D̂ + ACD = 180°' },
      { e: 'Cộng vế: (BAC + CAD) + B̂ + (BCA + ACD) + D̂ = 360°' },
      { e: 'Â + B̂ + Ĉ + D̂ = 360°', why: 'Vì BAC + CAD = Â và BCA + ACD = Ĉ.', hl: true },
    ],
  },
  'b10-calc': {
    title: 'Tính góc của tứ giác',
    given: 'Tứ giác ABCD có Â = 80°, B̂ = 110°, Ĉ = 70°. Tính D̂.',
    lines: [
      { e: 'Â + B̂ + Ĉ + D̂ = 360°', why: 'Định lí tổng các góc của tứ giác.' },
      { e: '80° + 110° + 70° + D̂ = 360°' },
      { e: 'D̂ = 360° − 260°' },
      { e: 'D̂ = 100°', hl: true },
    ],
  },
  'b11-proof': {
    title: 'Hai đường chéo của hình thang cân bằng nhau',
    given: 'Cho hình thang cân ABCD (AB // CD). Chứng minh AC = BD.',
    lines: [
      { e: 'Xét △ADC và △BCD:', why: 'Chọn hai tam giác chứa hai đường chéo AC và BD.' },
      { e: 'AD = BC', why: 'Hai cạnh bên của hình thang cân.' },
      { e: 'ADC = BCD', why: 'Hai góc kề đáy CD của hình thang cân.' },
      { e: 'DC là cạnh chung' },
      { e: '⇒ △ADC = △BCD (c.g.c) ⇒ AC = BD', hl: true },
    ],
  },
  'b12-proof': {
    title: 'Hai đường chéo của hình bình hành',
    given: 'Cho hình bình hành ABCD, hai đường chéo cắt nhau tại O. Chứng minh OA = OC, OB = OD.',
    lines: [
      { e: 'Xét △OAB và △OCD:' },
      { e: 'AB = CD', why: 'Các cạnh đối của hình bình hành bằng nhau.' },
      { e: 'OAB = OCD', why: 'Hai góc so le trong, vì AB // CD.' },
      { e: 'OBA = ODC', why: 'Hai góc so le trong, vì AB // CD.' },
      { e: '⇒ △OAB = △OCD (g.c.g) ⇒ OA = OC, OB = OD', hl: true },
    ],
  },
  'b13-median': {
    title: 'Đường trung tuyến ứng với cạnh huyền',
    given: 'Cho △ABC vuông tại A, M là trung điểm của BC. Chứng minh AM = BC/2.',
    lines: [
      { e: 'Lấy D đối xứng với A qua M.', why: 'Khi đó M là trung điểm của AD.' },
      { e: 'ABDC có hai đường chéo AD, BC cắt nhau tại trung điểm M', why: 'Dấu hiệu nhận biết hình bình hành.' },
      { e: '⇒ ABDC là hình bình hành' },
      { e: 'Hình bình hành ABDC có Â = 90° ⇒ là hình chữ nhật' },
      { e: '⇒ AD = BC ⇒ AM = AD/2 = BC/2', why: 'Hai đường chéo của hình chữ nhật bằng nhau.', hl: true },
    ],
  },
  'b14-app': {
    title: 'Tính độ dài trong hình thoi',
    given: 'Hình thoi ABCD có cạnh 4 cm và Â = 60°. Tính độ dài đường chéo BD.',
    lines: [
      { e: 'AB = AD = 4 cm', why: 'Bốn cạnh của hình thoi bằng nhau.' },
      { e: '△ABD cân tại A và có Â = 60°' },
      { e: '⇒ △ABD là tam giác đều', why: 'Tam giác cân có một góc 60° là tam giác đều.' },
      { e: '⇒ BD = AB = 4 cm', hl: true },
    ],
  },
  // ---------- Chương IV ----------
  'b15-calc': {
    title: 'Áp dụng định lí Thalès',
    given: 'Cho △ABC, MN // BC (M ∈ AB, N ∈ AC), AM = 3 cm, MB = 2 cm, AN = 4,5 cm. Tính NC.',
    lines: [
      { e: 'MN // BC ⇒ AM/MB = AN/NC', why: 'Định lí Thalès: đường thẳng song song với một cạnh định ra trên hai cạnh kia những đoạn thẳng tương ứng tỉ lệ.' },
      { e: '3/2 = 4,5/NC' },
      { e: 'NC = 4,5 · 2 : 3' },
      { e: 'NC = 3 (cm)', hl: true },
    ],
  },
  'b15-ext': {
    title: 'Hệ quả của định lí Thalès',
    given: 'Cho △ABC, MN // BC (M ∈ AB, N ∈ AC), AM = 2 cm, AB = 5 cm, BC = 10 cm. Tính MN.',
    lines: [
      { e: 'MN // BC ⇒ AM/AB = AN/AC = MN/BC', why: 'Hệ quả: đường thẳng song song với một cạnh tạo thành tam giác mới có ba cạnh tương ứng tỉ lệ với ba cạnh của tam giác đã cho.' },
      { e: '2/5 = MN/10' },
      { e: 'MN = 10 · 2 : 5 = 4 (cm)', hl: true },
    ],
  },
  'b16-app': {
    title: 'Đo khoảng cách bị ngăn bởi hồ nước',
    given: 'Để đo khoảng cách giữa hai điểm B và C bị ngăn bởi một hồ nước, người ta chọn điểm A, xác định trung điểm M của AB và N của AC rồi đo được MN = 45 m.',
    lines: [
      { e: 'M, N là trung điểm của AB, AC', why: 'Theo cách dựng.' },
      { e: '⇒ MN là đường trung bình của △ABC' },
      { e: '⇒ MN // BC và MN = BC/2', why: 'Tính chất đường trung bình của tam giác.' },
      { e: '⇒ BC = 2 · MN = 2 · 45 = 90 (m)', hl: true },
    ],
  },
  'b17-calc': {
    title: 'Áp dụng tính chất đường phân giác',
    given: 'Cho △ABC có AB = 6 cm, AC = 9 cm, BC = 10 cm. AD là phân giác của góc A (D ∈ BC). Tính DB, DC.',
    lines: [
      { e: 'DB/DC = AB/AC = 6/9 = 2/3', why: 'Tính chất đường phân giác của tam giác.' },
      { e: '⇒ DB/2 = DC/3 = (DB + DC)/5 = 10/5 = 2', why: 'Tính chất dãy tỉ số bằng nhau; DB + DC = BC = 10.' },
      { e: 'DB = 4 cm; DC = 6 cm', hl: true },
    ],
  },
  // ---------- Chương VI ----------
  'b21-cond': {
    title: 'Điều kiện xác định và giá trị của phân thức',
    given: 'Cho phân thức P = (x² − 1)/(x + 2). Tìm điều kiện xác định và tính giá trị của P tại x = 3.',
    lines: [
      { e: 'P xác định khi x + 2 ≠ 0 ⇔ x ≠ −2', why: 'Điều kiện xác định: mẫu thức khác 0.', hl: true },
      { e: 'x = 3 thoả mãn điều kiện xác định' },
      { e: 'P = (3² − 1)/(3 + 2) = 8/5', hl: true },
    ],
  },
  'b21-equal': {
    title: 'Hai phân thức bằng nhau',
    given: 'Chứng tỏ hai phân thức (x − 1)/(x² − 1) và 1/(x + 1) bằng nhau.',
    lines: [
      { e: 'A/B = C/D nếu A · D = B · C', why: 'Định nghĩa hai phân thức bằng nhau.' },
      { e: '(x − 1)(x + 1) = x² − 1', why: 'Tính tích tử của phân thức này với mẫu của phân thức kia.' },
      { e: '(x² − 1) · 1 = x² − 1' },
      { e: '⇒ (x − 1)/(x² − 1) = 1/(x + 1)', hl: true },
    ],
  },
  'b22-simp': {
    title: 'Rút gọn phân thức',
    lines: [
      { e: '(x² − 4)/(x² + 2x) = (x − 2)(x + 2) / [x(x + 2)]', why: 'Phân tích tử và mẫu thành nhân tử.' },
      { e: '= (x − 2)/x', why: 'Chia cả tử và mẫu cho nhân tử chung x + 2.', hl: true },
      { e: '(3x² − 6x)/(9x − 18) = 3x(x − 2) / [9(x − 2)]', why: 'Phân tích tử và mẫu thành nhân tử.' },
      { e: '= x/3', why: 'Chia cả tử và mẫu cho 3(x − 2).', hl: true },
    ],
  },
  'b22-common': {
    title: 'Quy đồng mẫu thức',
    given: 'Quy đồng mẫu thức hai phân thức 1/(x − 2) và 3/(x² − 4).',
    lines: [
      { e: 'x² − 4 = (x − 2)(x + 2)', why: 'Phân tích các mẫu thành nhân tử.' },
      { e: 'MTC = (x − 2)(x + 2)', why: 'Mẫu thức chung chia hết cho từng mẫu.' },
      { e: '1/(x − 2) = (x + 2) / [(x − 2)(x + 2)]', why: 'Nhân tử và mẫu với nhân tử phụ x + 2.', hl: true },
      { e: '3/(x² − 4) = 3 / [(x − 2)(x + 2)]', hl: true },
    ],
  },
  'b23-same': {
    title: 'Cộng hai phân thức cùng mẫu',
    lines: [
      { e: '(2x + 1)/(x + 3) + (x + 8)/(x + 3)', why: 'Cộng các tử, giữ nguyên mẫu.' },
      { e: '= (2x + 1 + x + 8)/(x + 3) = (3x + 9)/(x + 3)' },
      { e: '= 3(x + 3)/(x + 3) = 3', why: 'Rút gọn.', hl: true },
    ],
  },
  'b23-diff': {
    title: 'Cộng, trừ phân thức khác mẫu',
    lines: [
      { e: '1/x + 2/(x + 1)', why: 'MTC = x(x + 1).' },
      { e: '= (x + 1)/[x(x + 1)] + 2x/[x(x + 1)]', why: 'Quy đồng mẫu thức.' },
      { e: '= (3x + 1)/[x(x + 1)]', hl: true },
      { e: '3/(x − 2) − 12/(x² − 4)', why: 'MTC = (x − 2)(x + 2).' },
      { e: '= [3(x + 2) − 12]/[(x − 2)(x + 2)] = (3x − 6)/[(x − 2)(x + 2)]' },
      { e: '= 3(x − 2)/[(x − 2)(x + 2)] = 3/(x + 2)', hl: true },
    ],
  },
  'b23-race': {
    title: 'Bài toán cuộc đua xe đạp',
    given: 'Chặng đua gồm 9 km leo dốc, 5 km xuống dốc, 36 km đường phẳng. Vận tốc trên đường phẳng là x (km/h), hơn vận tốc leo dốc 5 km/h và kém vận tốc xuống dốc 10 km/h.',
    lines: [
      { e: 'Vận tốc leo dốc: x − 5; xuống dốc: x + 10 (km/h)' },
      { e: 'T = 9/(x − 5) + 5/(x + 10) + 36/x (giờ)', why: 'Thời gian = quãng đường : vận tốc, rồi cộng ba chặng.', hl: true },
      { e: 'Khi x = 30: T = 9/25 + 5/40 + 36/30' },
      { e: 'T = 0,36 + 0,125 + 1,2 = 1,685 (giờ)', hl: true },
    ],
    answer: 'Biết vận tốc trên đường phẳng thì tính được thời gian: với x = 30 km/h, T ≈ 1 giờ 41 phút.',
  },
  'b24-mul': {
    title: 'Nhân hai phân thức',
    lines: [
      { e: '(x² − 1)/(2x) · 4x²/(x + 1)', why: 'Nhân các tử với nhau, các mẫu với nhau.' },
      { e: '= (x − 1)(x + 1) · 4x² / [2x(x + 1)]', why: 'Phân tích thành nhân tử.' },
      { e: '= 2x(x − 1)', why: 'Rút gọn nhân tử chung 2x(x + 1).', hl: true },
    ],
  },
  'b24-div': {
    title: 'Chia hai phân thức',
    lines: [
      { e: '(x² − 9)/(x + 1) : (x − 3)/(x² + x)', why: 'Chia cho một phân thức là nhân với phân thức nghịch đảo.' },
      { e: '= (x² − 9)/(x + 1) · (x² + x)/(x − 3)' },
      { e: '= (x − 3)(x + 3) · x(x + 1) / [(x + 1)(x − 3)]' },
      { e: '= x(x + 3)', hl: true },
    ],
  },
  'b24-mix': {
    title: 'Rút gọn biểu thức',
    lines: [
      { e: '[1/(x − 1) − 1/(x + 1)] · (x² − 1)/2', why: 'Làm phép tính trong ngoặc trước.' },
      { e: '= [(x + 1) − (x − 1)]/(x² − 1) · (x² − 1)/2' },
      { e: '= 2/(x² − 1) · (x² − 1)/2' },
      { e: '= 1', hl: true },
    ],
    note: 'Với x ≠ 1 và x ≠ −1, giá trị của biểu thức luôn bằng 1, không phụ thuộc vào x.',
  },
  // ---------- Chương VII ----------
  'b25-solve1': {
    title: 'Giải phương trình',
    lines: [
      { e: '3x − 7 = 2x + 5' },
      { e: '3x − 2x = 5 + 7', why: 'Chuyển vế các hạng tử: khi chuyển một hạng tử từ vế này sang vế kia ta phải đổi dấu hạng tử đó.' },
      { e: 'x = 12', hl: true },
    ],
    answer: 'Phương trình có nghiệm x = 12.',
  },
  'b25-solve2': {
    title: 'Phương trình đưa được về dạng ax + b = 0',
    lines: [
      { e: '2(x − 3) + 5 = 4 − (x + 1)' },
      { e: '2x − 6 + 5 = 4 − x − 1', why: 'Bỏ dấu ngoặc.' },
      { e: '2x − 1 = 3 − x', why: 'Thu gọn mỗi vế.' },
      { e: '2x + x = 3 + 1', why: 'Chuyển vế.' },
      { e: '3x = 4' },
      { e: 'x = 4/3', why: 'Chia hai vế cho 3.', hl: true },
    ],
    answer: 'Phương trình có nghiệm x = 4/3.',
  },
  'b25-solve3': {
    title: 'Phương trình có mẫu',
    lines: [
      { e: '(x + 1)/2 − (x − 2)/3 = 1' },
      { e: '3(x + 1) − 2(x − 2) = 6', why: 'Quy đồng mẫu (MC = 6) rồi nhân hai vế với 6 để khử mẫu.' },
      { e: '3x + 3 − 2x + 4 = 6' },
      { e: 'x + 7 = 6' },
      { e: 'x = −1', hl: true },
    ],
    answer: 'Phương trình có nghiệm x = −1.',
  },
  'b26-age': {
    title: 'Bài toán tuổi',
    given: 'Hiện nay tuổi mẹ gấp 4 lần tuổi con. Sau 16 năm nữa, tuổi mẹ chỉ còn gấp 2 lần tuổi con. Tính tuổi con hiện nay.',
    lines: [
      { e: 'Gọi tuổi con hiện nay là x (tuổi), x ∈ ℕ*', why: 'Bước 1: chọn ẩn và đặt điều kiện cho ẩn.' },
      { e: 'Tuổi mẹ hiện nay: 4x', why: 'Biểu diễn các đại lượng chưa biết theo ẩn.' },
      { e: 'Sau 16 năm: con x + 16, mẹ 4x + 16' },
      { e: '4x + 16 = 2(x + 16)', why: 'Lập phương trình biểu thị mối quan hệ giữa các đại lượng.', hl: true },
      { e: '4x + 16 = 2x + 32 ⇔ 2x = 16 ⇔ x = 8', why: 'Bước 2: giải phương trình.' },
      { e: 'x = 8 thoả mãn điều kiện. Con 8 tuổi, mẹ 32 tuổi.', why: 'Bước 3: kiểm tra điều kiện và trả lời.', hl: true },
    ],
  },
  'b26-motion': {
    title: 'Bài toán chuyển động',
    given: 'Hai xe khởi hành cùng lúc từ A và B cách nhau 180 km, đi ngược chiều và gặp nhau sau 2 giờ. Xe đi từ A nhanh hơn xe đi từ B 10 km/h. Tính vận tốc mỗi xe.',
    lines: [
      { e: 'Gọi vận tốc xe đi từ B là x (km/h), x > 0' },
      { e: 'Vận tốc xe đi từ A: x + 10 (km/h)' },
      { e: 'Sau 2 giờ: xe B đi 2x km, xe A đi 2(x + 10) km' },
      { e: '2x + 2(x + 10) = 180', why: 'Hai xe đi ngược chiều gặp nhau: tổng quãng đường bằng AB.', hl: true },
      { e: '4x + 20 = 180 ⇔ x = 40' },
      { e: 'Xe từ B: 40 km/h; xe từ A: 50 km/h', hl: true },
    ],
  },
  'b26-geo': {
    title: 'Bài toán hình học',
    given: 'Một mảnh vườn hình chữ nhật có chu vi 56 m, chiều dài hơn chiều rộng 6 m. Tính diện tích mảnh vườn.',
    lines: [
      { e: 'Gọi chiều rộng là x (m), 0 < x < 28' },
      { e: 'Chiều dài: x + 6 (m)' },
      { e: '2(x + x + 6) = 56', why: 'Chu vi = 2 × (dài + rộng).', hl: true },
      { e: '4x + 12 = 56 ⇔ x = 11' },
      { e: 'Rộng 11 m, dài 17 m; S = 11 · 17 = 187 (m²)', hl: true },
    ],
  },
  'b28-draw': {
    title: 'Cách vẽ đồ thị hàm số y = ax + b',
    given: 'Vẽ đồ thị của hàm số y = 2x − 4.',
    lines: [
      { e: 'Cho x = 0 ⇒ y = −4: được điểm A(0; −4)', why: 'Giao điểm với trục tung.' },
      { e: 'Cho y = 0 ⇒ 2x − 4 = 0 ⇒ x = 2: được điểm B(2; 0)', why: 'Giao điểm với trục hoành.' },
      { e: 'Vẽ đường thẳng đi qua hai điểm A và B', hl: true },
    ],
    note: 'Đồ thị của hàm số y = ax + b (a ≠ 0) là một đường thẳng, nên chỉ cần xác định hai điểm phân biệt.',
  },
  'b29-find': {
    title: 'Xác định hàm số bậc nhất',
    given: 'Tìm a, b để đường thẳng y = ax + b song song với đường thẳng y = 2x − 1 và đi qua điểm M(1; 5).',
    lines: [
      { e: 'Song song với y = 2x − 1 ⇒ a = 2 và b ≠ −1', why: 'Hai đường thẳng song song khi a = a′ và b ≠ b′.' },
      { e: 'Đi qua M(1; 5): 5 = 2 · 1 + b', why: 'Thay toạ độ của M vào y = 2x + b.' },
      { e: 'b = 3 (thoả mãn b ≠ −1)' },
      { e: 'y = 2x + 3', hl: true },
    ],
  },
  'b29-param': {
    title: 'Hai đường thẳng song song, cắt nhau',
    given: 'Cho hai đường thẳng d: y = (m − 1)x + 2 (m ≠ 1) và d′: y = 3x − 1.',
    lines: [
      { e: 'd // d′ ⇔ m − 1 = 3 và 2 ≠ −1', why: 'Hệ số góc bằng nhau, tung độ gốc khác nhau.' },
      { e: '⇔ m = 4', hl: true },
      { e: 'd cắt d′ ⇔ m − 1 ≠ 3 ⇔ m ≠ 4 (và m ≠ 1)', why: 'Hai đường thẳng cắt nhau khi hệ số góc khác nhau.', hl: true },
    ],
  },
  // ---------- Chương VIII ----------
  'b31-calc': {
    title: 'Tính xác suất bằng tỉ số',
    given: 'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất của biến cố A: “Số được chọn chia hết cho 9”.',
    lines: [
      { e: 'Các số tự nhiên có hai chữ số: 10, 11, …, 99', why: 'Liệt kê (đếm) các kết quả có thể.' },
      { e: 'Có 99 − 10 + 1 = 90 kết quả đồng khả năng' },
      { e: 'Kết quả thuận lợi cho A: 18, 27, 36, …, 99', why: 'Các bội của 9 có hai chữ số.' },
      { e: 'Có 10 kết quả thuận lợi' },
      { e: 'P(A) = 10/90 = 1/9', hl: true },
    ],
  },
  'b31-bag': {
    title: 'Lấy bi',
    given: 'Túi có 4 bi đỏ và 6 bi xanh cùng kích thước. Lấy ngẫu nhiên một viên bi. Tính xác suất lấy được bi đỏ.',
    lines: [
      { e: 'Có 4 + 6 = 10 kết quả có thể, đồng khả năng' },
      { e: 'Có 4 kết quả thuận lợi cho biến cố “lấy được bi đỏ”' },
      { e: 'P = 4/10 = 0,4', hl: true },
    ],
  },
  'b32-est': {
    title: 'Ước lượng xác suất bằng thực nghiệm',
    given: 'Tung một chiếc đinh mũ 400 lần thấy có 120 lần đinh rơi ngửa. Ước lượng số lần đinh rơi ngửa khi tung 1 000 lần.',
    lines: [
      { e: 'Xác suất thực nghiệm = 120/400 = 0,3', why: 'Số lần biến cố xảy ra : tổng số lần thực hiện.' },
      { e: 'Xác suất của biến cố ≈ 0,3', why: 'Khi số lần thực hiện đủ lớn, xác suất thực nghiệm xấp xỉ xác suất của biến cố.' },
      { e: 'Số lần đinh rơi ngửa ≈ 0,3 · 1 000 = 300', hl: true },
    ],
  },
  'b32-qc': {
    title: 'Ứng dụng trong kiểm tra chất lượng',
    given: 'Kiểm tra ngẫu nhiên 500 sản phẩm của một nhà máy thấy có 12 sản phẩm lỗi. Ước tính số sản phẩm lỗi trong lô 10 000 sản phẩm.',
    lines: [
      { e: 'Xác suất thực nghiệm sản phẩm lỗi = 12/500 = 0,024' },
      { e: 'Số sản phẩm lỗi ≈ 0,024 · 10 000 = 240', hl: true },
    ],
  },
  // ---------- Chương IX ----------
  'b33-def': {
    title: 'Tam giác đồng dạng',
    given: '△DEF ∽ △ABC với AB = 3 cm, BC = 4 cm, CA = 5 cm và DE = 6 cm. Tính EF, FD.',
    lines: [
      { e: 'DE/AB = EF/BC = FD/CA = k', why: 'Hai tam giác đồng dạng có các cạnh tương ứng tỉ lệ.' },
      { e: 'k = DE/AB = 6/3 = 2', why: 'Tỉ số đồng dạng.' },
      { e: 'EF = 2 · 4 = 8 (cm); FD = 2 · 5 = 10 (cm)', hl: true },
    ],
  },
  'b34-proof': {
    title: 'Chứng minh nhờ tam giác đồng dạng',
    given: 'Hình thang ABCD (AB // CD) có hai đường chéo cắt nhau tại O. Chứng minh OA · OD = OB · OC.',
    lines: [
      { e: 'Xét △OAB và △OCD:' },
      { e: 'OAB = OCD', why: 'Hai góc so le trong (AB // CD).' },
      { e: 'AOB = COD', why: 'Hai góc đối đỉnh.' },
      { e: '⇒ △OAB ∽ △OCD (g.g)', hl: true },
      { e: '⇒ OA/OC = OB/OD ⇒ OA · OD = OB · OC', hl: true },
    ],
  },
  'b35-ladder': {
    title: 'Chiếc thang',
    given: 'Một chiếc thang dài 5 m dựa vào tường, chân thang cách chân tường 3 m. Đầu thang ở độ cao bao nhiêu?',
    lines: [
      { e: 'Thang, tường, mặt đất tạo thành tam giác vuông', why: 'Tường vuông góc với mặt đất; thang là cạnh huyền.' },
      { e: 'h² + 3² = 5²', why: 'Định lí Pythagore.' },
      { e: 'h² = 25 − 9 = 16' },
      { e: 'h = 4 (m)', hl: true },
    ],
  },
  'b35-check': {
    title: 'Nhận biết tam giác vuông',
    given: 'Tam giác có độ dài ba cạnh 9 cm, 12 cm, 15 cm có phải là tam giác vuông không?',
    lines: [
      { e: '15² = 225', why: 'Bình phương cạnh lớn nhất.' },
      { e: '9² + 12² = 81 + 144 = 225', why: 'Tổng bình phương hai cạnh còn lại.' },
      { e: '15² = 9² + 12² ⇒ tam giác vuông', why: 'Định lí Pythagore đảo.', hl: true },
    ],
  },
  'b36-alt': {
    title: 'Đường cao trong tam giác vuông',
    given: '△ABC vuông tại A, đường cao AH. Biết BH = 4 cm, HC = 9 cm. Tính AH.',
    lines: [
      { e: '△HBA ∽ △HAC', why: 'Hai tam giác vuông có HBA = HAC (cùng phụ với góc HAB).' },
      { e: '⇒ HB/HA = HA/HC ⇒ AH² = HB · HC' },
      { e: 'AH² = 4 · 9 = 36' },
      { e: 'AH = 6 (cm)', hl: true },
    ],
  },
  'b36-shadow': {
    title: 'Đo chiều cao bằng bóng nắng',
    given: 'Một cột cờ có bóng dài 12 m trên mặt đất. Cùng lúc đó, một cọc cao 1,5 m có bóng dài 2 m.',
    lines: [
      { e: 'Tia nắng song song ⇒ hai tam giác vuông đồng dạng (g.g)', why: 'Cột cờ, cọc vuông góc với mặt đất; góc tạo bởi tia nắng và mặt đất bằng nhau.' },
      { e: 'h/1,5 = 12/2', why: 'Tỉ số các cạnh tương ứng.' },
      { e: 'h = 1,5 · 6 = 9 (m)', hl: true },
    ],
  },
  // ---------- Chương X ----------
  'b38-area': {
    title: 'Diện tích xung quanh hình chóp tam giác đều',
    given: 'Hình chóp tam giác đều có cạnh đáy 6 cm, trung đoạn 5 cm. Tính diện tích xung quanh.',
    lines: [
      { e: 'p = (3 · 6) : 2 = 9 (cm)', why: 'Nửa chu vi đáy.' },
      { e: 'Sxq = p · d = 9 · 5', why: 'Diện tích xung quanh bằng tích nửa chu vi đáy với trung đoạn.' },
      { e: 'Sxq = 45 (cm²)', hl: true },
    ],
  },
  'b38-vol': {
    title: 'Thể tích hình chóp tam giác đều',
    given: 'Hình chóp tam giác đều có diện tích đáy 15,6 cm² và chiều cao 10 cm. Tính thể tích.',
    lines: [
      { e: 'V = ⅓ · S · h', why: 'Thể tích hình chóp bằng một phần ba tích diện tích đáy với chiều cao.' },
      { e: 'V = ⅓ · 15,6 · 10' },
      { e: 'V = 52 (cm³)', hl: true },
    ],
  },
  'b39-area': {
    title: 'Diện tích hình chóp tứ giác đều',
    given: 'Hình chóp tứ giác đều có cạnh đáy 10 cm, trung đoạn 13 cm. Tính diện tích xung quanh và diện tích toàn phần.',
    lines: [
      { e: 'p = (4 · 10) : 2 = 20 (cm)' },
      { e: 'Sxq = p · d = 20 · 13 = 260 (cm²)', hl: true },
      { e: 'S đáy = 10² = 100 (cm²)' },
      { e: 'Stp = 260 + 100 = 360 (cm²)', hl: true },
    ],
  },
  'b39-vol': {
    title: 'Thể tích kim tự tháp',
    given: 'Một kim tự tháp có dạng hình chóp tứ giác đều, cạnh đáy khoảng 230 m, chiều cao khoảng 147 m. Tính thể tích.',
    lines: [
      { e: 'S = 230² = 52 900 (m²)' },
      { e: 'V = ⅓ · S · h = ⅓ · 52 900 · 147' },
      { e: 'V = 2 592 100 (m³)', hl: true },
    ],
    answer: 'Thể tích khoảng 2,6 triệu mét khối.',
  },
};
