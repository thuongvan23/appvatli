// Dữ liệu và lời giải từng bước cho Toán 7 (tự biên soạn). Được gộp vào các bảng dữ liệu chung trong mathData.ts.
import type { DeriveSet } from './mathDerive';
import { t } from './poly';

const L = (e: string, why?: string, hl?: boolean) => ({ e, why, hl });

export const DERIVE7: Record<string, DeriveSet> = {
  // ---------- Chương I ----------
  'a7-compare': {
    title: 'So sánh hai số hữu tỉ',
    lines: [
      L('So sánh −3/4 và −5/6', 'Đưa về hai phân số cùng mẫu dương.'),
      L('−3/4 = −9/12;  −5/6 = −10/12'),
      L('−9 > −10 ⇒ −3/4 > −5/6', undefined, true),
      L('So sánh 0,6 và 2/3: 0,6 = 3/5 = 9/15; 2/3 = 10/15 ⇒ 0,6 < 2/3', 'Có thể đổi số thập phân thành phân số.', true),
    ],
  },
  'a7-ops': {
    title: 'Cộng, trừ, nhân, chia số hữu tỉ',
    lines: [
      L('−2/3 + 0,5 = −2/3 + 1/2 = −4/6 + 3/6 = −1/6', 'Viết các số dưới dạng phân số rồi quy đồng.', true),
      L('3/4 − (−1/6) = 9/12 + 2/12 = 11/12', 'Trừ một số là cộng với số đối của nó.', true),
      L('−5/8 · 4/15 = −20/120 = −1/6', 'Nhân tử với tử, mẫu với mẫu rồi rút gọn.', true),
      L('−0,75 : 3/2 = −3/4 · 2/3 = −1/2', 'Chia cho một số là nhân với số nghịch đảo.', true),
    ],
  },
  'a7-pow': {
    title: 'Luỹ thừa của số hữu tỉ',
    lines: [
      L('(−2/3)³ = (−2)³/3³ = −8/27', '(a/b)ⁿ = aⁿ/bⁿ.', true),
      L('(0,5)² · (0,5)³ = (0,5)⁵ = 0,03125', 'xᵐ · xⁿ = xᵐ⁺ⁿ.', true),
      L('(−3)⁸ : (−3)⁶ = (−3)² = 9', 'xᵐ : xⁿ = xᵐ⁻ⁿ (x ≠ 0, m ≥ n).', true),
      L('[(1/2)²]³ = (1/2)⁶ = 1/64', '(xᵐ)ⁿ = xᵐ·ⁿ.', true),
    ],
  },
  'a7-order': {
    title: 'Thứ tự thực hiện phép tính. Quy tắc chuyển vế',
    lines: [
      L('2/3 − 1/3 · (3/2)² = 2/3 − 1/3 · 9/4', 'Luỹ thừa trước, rồi nhân chia, cuối cùng cộng trừ.'),
      L('= 2/3 − 3/4 = −1/12', undefined, true),
      L('Tìm x: x + 3/4 = 1/2', 'Quy tắc chuyển vế: chuyển một số hạng sang vế kia thì đổi dấu.'),
      L('x = 1/2 − 3/4 = −1/4', undefined, true),
    ],
  },
  // ---------- Chương II ----------
  'a7-sqrt': {
    title: 'Căn bậc hai số học',
    lines: [
      L('√49 = 7 vì 7 ≥ 0 và 7² = 49', 'Căn bậc hai số học của a ≥ 0 là số x ≥ 0 sao cho x² = a.', true),
      L('√0,36 = 0,6;  √(9/16) = 3/4', undefined, true),
      L('√2 ≈ 1,414 (dùng máy tính, làm tròn đến hàng phần nghìn)', 'Số vô tỉ: số thập phân vô hạn không tuần hoàn.', true),
      L('Mảnh đất hình vuông diện tích 81 m² có cạnh √81 = 9 m', undefined, true),
    ],
  },
  'a7-round': {
    title: 'Làm tròn số và số thực',
    lines: [
      L('π = 3,14159… làm tròn đến hàng phần trăm: 3,14', 'Chữ số bỏ đi đầu tiên là 1 < 5 nên giữ nguyên.', true),
      L('√5 = 2,2360… làm tròn đến hàng phần mười: 2,2'),
      L('|−√3| = √3; số đối của −√3 là √3', 'Giá trị tuyệt đối của một số thực là khoảng cách từ điểm biểu diễn số đó tới gốc O.', true),
      L('So sánh √5 và 2,3: √5 ≈ 2,236 < 2,3', undefined, true),
    ],
  },
  // ---------- Chương III ----------
  'a7-angles': {
    title: 'Tính góc',
    given: 'Hai đường thẳng xx′ và yy′ cắt nhau tại O, góc xOy = 50°. Tính các góc còn lại.',
    lines: [
      L('x′Oy′ = xOy = 50°', 'Hai góc đối đỉnh.', true),
      L('x′Oy = 180° − 50° = 130°', 'Hai góc kề bù.', true),
      L('xOy′ = x′Oy = 130°', 'Hai góc đối đỉnh.', true),
    ],
  },
  'a7-parallel': {
    title: 'Nhận biết hai đường thẳng song song',
    given: 'Đường thẳng c cắt a, b lần lượt tại A, B; góc A₁ = 70°, góc B₁ = 70° (đồng vị). a và b có song song không? Tính góc A₂.',
    lines: [
      L('A₁ = B₁ = 70° và chúng ở vị trí đồng vị', undefined),
      L('⇒ a // b', 'Dấu hiệu nhận biết hai đường thẳng song song.', true),
      L('A₂ = 180° − 70° = 110°', 'A₁ và A₂ là hai góc kề bù.', true),
    ],
  },
  'a7-euclid': {
    title: 'Tính chất của hai đường thẳng song song',
    given: 'Cho a // b, c cắt a tại A và b tại B; góc so le trong A₄ = 65°. Tính các góc tại B.',
    lines: [
      L('B₂ = A₄ = 65°', 'Hai góc so le trong bằng nhau (vì a // b).', true),
      L('B₄ = B₂ = 65° (đối đỉnh); B₁ = B₃ = 180° − 65° = 115°', undefined, true),
      L('Kiểm tra: A₄ + B₁ = 65° + 115° = 180°', 'Hai góc trong cùng phía bù nhau.'),
    ],
  },
  'a7-theorem': {
    title: 'Định lí và chứng minh định lí',
    given: 'Định lí: Hai góc đối đỉnh thì bằng nhau.',
    lines: [
      L('GT: Ô₁ và Ô₃ đối đỉnh.   KL: Ô₁ = Ô₃', 'Giả thiết (GT) là điều cho biết, kết luận (KL) là điều suy ra.'),
      L('Ô₁ + Ô₂ = 180°', 'Hai góc kề bù.'),
      L('Ô₃ + Ô₂ = 180°', 'Hai góc kề bù.'),
      L('⇒ Ô₁ = Ô₃', 'Cùng bù với Ô₂.', true),
    ],
  },
  // ---------- Chương IV ----------
  'a7-sum': {
    title: 'Tính góc trong tam giác',
    lines: [
      L('△ABC có Â = 60°, B̂ = 75° ⇒ Ĉ = 180° − 135° = 45°', 'Tổng ba góc của tam giác bằng 180°.', true),
      L('△ABC vuông tại A, B̂ = 35° ⇒ Ĉ = 90° − 35° = 55°', 'Hai góc nhọn của tam giác vuông phụ nhau.', true),
      L('Góc ngoài tại C bằng Â + B̂ = 60° + 75° = 135°', undefined, true),
    ],
  },
  'a7-ccc': {
    title: 'Chứng minh hai tam giác bằng nhau (c.c.c)',
    given: 'Cho AB = AD, CB = CD. Chứng minh △ABC = △ADC và AC là tia phân giác của góc BAD.',
    lines: [
      L('Xét △ABC và △ADC có:'),
      L('AB = AD (gt); CB = CD (gt); AC là cạnh chung'),
      L('⇒ △ABC = △ADC (c.c.c)', undefined, true),
      L('⇒ BAC = DAC (hai góc tương ứng) ⇒ AC là tia phân giác của góc BAD', undefined, true),
    ],
  },
  'a7-cgc': {
    title: 'Chứng minh hai tam giác bằng nhau (c.g.c)',
    given: 'Hai đoạn thẳng AB và CD cắt nhau tại trung điểm O của mỗi đoạn. Chứng minh AC = BD.',
    lines: [
      L('Xét △OAC và △OBD có:'),
      L('OA = OB; OC = OD (O là trung điểm)'),
      L('AOC = BOD (hai góc đối đỉnh)'),
      L('⇒ △OAC = △OBD (c.g.c) ⇒ AC = BD', 'Hai cạnh tương ứng.', true),
    ],
  },
  'a7-gcg': {
    title: 'Chứng minh hai tam giác bằng nhau (g.c.g)',
    given: 'Cho △ABC có B̂ = Ĉ. Tia phân giác của góc A cắt BC tại D. Chứng minh AB = AC.',
    lines: [
      L('Trong △ABD và △ACD: BAD = CAD (AD là phân giác)'),
      L('ADB = 180° − B̂ − BAD = 180° − Ĉ − CAD = ADC', 'Tổng ba góc của tam giác bằng 180°.'),
      L('AD là cạnh chung'),
      L('⇒ △ABD = △ACD (g.c.g) ⇒ AB = AC', undefined, true),
    ],
  },
  'a7-right': {
    title: 'Hai tam giác vuông bằng nhau',
    given: 'Cho △ABC cân tại A, kẻ AH ⊥ BC (H ∈ BC). Chứng minh HB = HC.',
    lines: [
      L('Xét △AHB và △AHC vuông tại H:'),
      L('AB = AC (cạnh huyền); AH là cạnh chung (cạnh góc vuông)'),
      L('⇒ △AHB = △AHC (cạnh huyền – cạnh góc vuông)', undefined, true),
      L('⇒ HB = HC', undefined, true),
    ],
  },
  'a7-iso': {
    title: 'Tam giác cân',
    lines: [
      L('△ABC cân tại A có Â = 40° ⇒ B̂ = Ĉ = (180° − 40°) : 2 = 70°', 'Hai góc ở đáy của tam giác cân bằng nhau.', true),
      L('Tam giác cân có một góc 60° là tam giác đều', undefined, true),
      L('M thuộc đường trung trực của AB ⇒ MA = MB', 'Tính chất đường trung trực.', true),
    ],
  },
  // ---------- Chương V ----------
  'a7-pie': {
    title: 'Đọc biểu đồ hình quạt tròn',
    given: 'Biểu đồ cho biết 45% học sinh lớp 7A (40 học sinh) đi xe đạp đến trường.',
    lines: [
      L('Số học sinh đi xe đạp = 45% · 40', 'Số lượng = tỉ lệ phần trăm × tổng số.'),
      L('= 18 (học sinh)', undefined, true),
      L('Hình quạt “Xe đạp” có góc ở tâm 45% · 360° = 162°', undefined, true),
    ],
  },
  // ---------- Chương VI ----------
  'a7-prop': {
    title: 'Tỉ lệ thức',
    lines: [
      L('a/b = c/d ⇒ a · d = b · c', 'Tính chất cơ bản của tỉ lệ thức.'),
      L('Tìm x: x/12 = 3/4 ⇒ x = 12 · 3 : 4 = 9', undefined, true),
      L('Từ 2 · 15 = 5 · 6 lập được tỉ lệ thức: 2/5 = 6/15; 2/6 = 5/15; 15/5 = 6/2; 15/6 = 5/2', undefined, true),
    ],
  },
  'a7-series': {
    title: 'Tính chất của dãy tỉ số bằng nhau',
    given: 'Tìm x, y biết x/3 = y/5 và x + y = 32.',
    lines: [
      L('x/3 = y/5 = (x + y)/(3 + 5)', 'Tính chất dãy tỉ số bằng nhau.'),
      L('= 32/8 = 4'),
      L('x = 3 · 4 = 12; y = 5 · 4 = 20', undefined, true),
    ],
  },
  'a7-share': {
    title: 'Chia theo tỉ lệ',
    given: 'Ba lớp 7A, 7B, 7C quyên góp được 120 quyển sách, số sách tỉ lệ với 3; 4; 5. Tính số sách mỗi lớp.',
    lines: [
      L('Gọi số sách là x, y, z: x/3 = y/4 = z/5 và x + y + z = 120'),
      L('x/3 = y/4 = z/5 = 120/12 = 10'),
      L('x = 30; y = 40; z = 50', undefined, true),
    ],
  },
  'a7-direct': {
    title: 'Bài toán tỉ lệ thuận',
    given: 'Mua 5 kg gạo hết 90 nghìn đồng. Mua 8 kg gạo cùng loại hết bao nhiêu tiền?',
    lines: [
      L('Số tiền y tỉ lệ thuận với khối lượng x: y = kx'),
      L('k = 90 : 5 = 18 (nghìn đồng/kg)'),
      L('y = 18 · 8 = 144 (nghìn đồng)', undefined, true),
    ],
  },
  'a7-inverse': {
    title: 'Bài toán tỉ lệ nghịch',
    given: '12 công nhân xây xong một bức tường trong 6 ngày. 9 công nhân (năng suất như nhau) xây xong trong bao nhiêu ngày?',
    lines: [
      L('Số người x và số ngày y tỉ lệ nghịch: x · y = a'),
      L('a = 12 · 6 = 72'),
      L('y = 72 : 9 = 8 (ngày)', undefined, true),
    ],
  },
  // ---------- Chương VII ----------
  'a7-expr': {
    title: 'Biểu thức đại số',
    lines: [
      L('Chu vi hình chữ nhật có chiều dài a, chiều rộng b: 2(a + b)', 'Biểu thức đại số chứa chữ (biến).', true),
      L('Giá trị của 2(a + b) tại a = 5, b = 3: 2(5 + 3) = 16', undefined, true),
      L('Giá trị của x² − 3x + 1 tại x = −2: 4 + 6 + 1 = 11', undefined, true),
    ],
  },
  'a7-root': {
    title: 'Nghiệm của đa thức một biến',
    lines: [
      L('P(x) = 2x − 6. P(3) = 6 − 6 = 0 ⇒ x = 3 là nghiệm của P(x)', 'a là nghiệm của P(x) nếu P(a) = 0.', true),
      L('Q(x) = x² − 4: Q(2) = 0, Q(−2) = 0 ⇒ 2 và −2 là nghiệm', undefined, true),
      L('R(x) = x² + 1 > 0 với mọi x ⇒ R(x) không có nghiệm', undefined, true),
    ],
  },
  'a7-longdiv': {
    title: 'Chia đa thức một biến (đặt tính chia)',
    given: 'Thực hiện phép chia (2x³ − 3x² + 3x − 2) : (x − 1).',
    lines: [
      L('2x³ : x = 2x²; 2x²(x − 1) = 2x³ − 2x²; dư: −x² + 3x − 2', 'Chia hạng tử bậc cao nhất của đa thức bị chia cho hạng tử bậc cao nhất của đa thức chia.'),
      L('−x² : x = −x; −x(x − 1) = −x² + x; dư: 2x − 2'),
      L('2x : x = 2; 2(x − 1) = 2x − 2; dư: 0'),
      L('Thương: 2x² − x + 2; phép chia hết', undefined, true),
      L('Kiểm tra: (x − 1)(2x² − x + 2) = 2x³ − 3x² + 3x − 2 ✓'),
    ],
  },
  'a7-longdiv2': {
    title: 'Phép chia có dư',
    given: 'Chia (x² + 3x + 5) cho (x + 1).',
    lines: [
      L('x² : x = x; x(x + 1) = x² + x; dư: 2x + 5'),
      L('2x : x = 2; 2(x + 1) = 2x + 2; dư: 3'),
      L('x² + 3x + 5 = (x + 1)(x + 2) + 3', 'Bậc của dư nhỏ hơn bậc của đa thức chia.', true),
    ],
  },
  // ---------- Chương VIII ----------
  'a7-prob': {
    title: 'Xác suất của biến cố',
    given: 'Gieo một con xúc xắc cân đối. Tính xác suất của biến cố “Số chấm là số chia hết cho 3”.',
    lines: [
      L('Có 6 kết quả đồng khả năng: 1, 2, 3, 4, 5, 6'),
      L('Biến cố xảy ra khi số chấm là 3 hoặc 6'),
      L('Xác suất = 2/6 = 1/3', undefined, true),
      L('Biến cố chắc chắn có xác suất 1; biến cố không thể có xác suất 0', undefined, true),
    ],
  },
  // ---------- Chương IX ----------
  'a7-sideAngle': {
    title: 'So sánh các góc, các cạnh',
    lines: [
      L('△ABC có AB = 5, BC = 7, CA = 6 ⇒ BC > CA > AB ⇒ Â > B̂ > Ĉ', 'Góc đối diện với cạnh lớn hơn là góc lớn hơn.', true),
      L('△DEF có D̂ = 80°, Ê = 45° ⇒ F̂ = 55° ⇒ EF > DE > DF', 'Cạnh đối diện với góc lớn hơn là cạnh lớn hơn.', true),
    ],
  },
  'a7-tri3': {
    title: 'Bất đẳng thức tam giác',
    lines: [
      L('Bộ ba 2 cm, 3 cm, 6 cm: 6 > 2 + 3 ⇒ không là ba cạnh tam giác', 'Cạnh lớn nhất phải nhỏ hơn tổng hai cạnh kia.', true),
      L('Bộ ba 4 cm, 5 cm, 7 cm: 7 < 4 + 5 ⇒ là ba cạnh tam giác', undefined, true),
      L('Tam giác có hai cạnh 3 và 8: 8 − 3 < c < 8 + 3 ⇒ 5 < c < 11', undefined, true),
    ],
  },
  'a7-centroid': {
    title: 'Trọng tâm tam giác',
    given: '△ABC có trung tuyến AM = 9 cm, G là trọng tâm. Tính AG, GM.',
    lines: [
      L('AG = ⅔ · AM = ⅔ · 9 = 6 (cm)', 'Trọng tâm cách mỗi đỉnh một khoảng bằng ⅔ độ dài đường trung tuyến đi qua đỉnh đó.', true),
      L('GM = AM − AG = 3 (cm) = ½ AG', undefined, true),
    ],
  },
  // ---------- Chương X ----------
  'a7-box': {
    title: 'Hình hộp chữ nhật',
    given: 'Một bể cá hình hộp chữ nhật dài 80 cm, rộng 40 cm, cao 50 cm. Tính diện tích kính làm 4 mặt xung quanh và thể tích bể.',
    lines: [
      L('Sxq = 2(80 + 40) · 50 = 12 000 (cm²)', 'Diện tích xung quanh = chu vi đáy × chiều cao.', true),
      L('V = 80 · 40 · 50 = 160 000 (cm³) = 160 lít', 'V = dài × rộng × cao; 1 lít = 1 000 cm³.', true),
    ],
  },
  'a7-cube': {
    title: 'Hình lập phương',
    given: 'Một hộp quà hình lập phương cạnh 15 cm. Tính diện tích giấy cần để bọc kín hộp và thể tích hộp.',
    lines: [
      L('Diện tích một mặt: 15² = 225 (cm²)'),
      L('Diện tích toàn phần: 6 · 225 = 1 350 (cm²)', undefined, true),
      L('V = 15³ = 3 375 (cm³)', undefined, true),
    ],
  },
  'a7-prism': {
    title: 'Hình lăng trụ đứng',
    given: 'Một chiếc lều có dạng hình lăng trụ đứng tam giác: đáy là tam giác có cạnh đáy 3 m, chiều cao 2 m; hai cạnh bên của đáy dài 2,5 m; chiều dài lều 4 m.',
    lines: [
      L('Chu vi đáy: 3 + 2,5 + 2,5 = 8 (m)'),
      L('Sxq = 8 · 4 = 32 (m²)', 'Diện tích vải làm mái và nền (các mặt bên).', true),
      L('Diện tích đáy: ½ · 3 · 2 = 3 (m²)'),
      L('V = 3 · 4 = 12 (m³)', 'Thể tích = diện tích đáy × chiều cao lăng trụ.', true),
    ],
  },
};

export const SORTS7 = {
  numSets: {
    title: 'Số nào là số hữu tỉ, số nào là số vô tỉ?',
    bins: ['Số hữu tỉ', 'Số vô tỉ'],
    items: [
      { t: '−3/7', bin: 0 },
      { t: '0,25', bin: 0 },
      { t: '√2', bin: 1 },
      { t: '√16', bin: 0 },
      { t: 'π', bin: 1 },
      { t: '0,(3)', bin: 0 },
      { t: '−5', bin: 0 },
      { t: '√7', bin: 1 },
      { t: '1,010010001…', bin: 1 },
      { t: '2 1/3', bin: 0 },
    ],
    hint: 'Số hữu tỉ viết được dưới dạng a/b (a, b nguyên, b ≠ 0): số thập phân hữu hạn hoặc vô hạn tuần hoàn. Số vô tỉ là số thập phân vô hạn không tuần hoàn.',
  },
  eventType: {
    title: 'Biến cố chắc chắn, không thể hay ngẫu nhiên?',
    bins: ['Chắc chắn', 'Không thể', 'Ngẫu nhiên'],
    items: [
      { t: 'Gieo xúc xắc được số chấm nhỏ hơn 7', bin: 0 },
      { t: 'Gieo xúc xắc được 7 chấm', bin: 1 },
      { t: 'Gieo xúc xắc được 6 chấm', bin: 2 },
      { t: 'Mặt trời mọc ở hướng đông', bin: 0 },
      { t: 'Tung đồng xu được mặt sấp', bin: 2 },
      { t: 'Lấy được bi đỏ từ túi chỉ có bi xanh', bin: 1 },
      { t: 'Ngày mai trời mưa', bin: 2 },
      { t: 'Tháng 2 có 30 ngày', bin: 1 },
    ],
  },
  ratioType: {
    title: 'Hai đại lượng tỉ lệ thuận hay tỉ lệ nghịch?',
    bins: ['Tỉ lệ thuận', 'Tỉ lệ nghịch', 'Không tỉ lệ'],
    items: [
      { t: 'Số vở mua và số tiền phải trả', bin: 0 },
      { t: 'Vận tốc và thời gian đi hết một quãng đường', bin: 1 },
      { t: 'Số công nhân và số ngày làm xong một việc', bin: 1 },
      { t: 'Chu vi và cạnh hình vuông', bin: 0 },
      { t: 'Diện tích và cạnh hình vuông', bin: 2 },
      { t: 'Chiều dài và chiều rộng của HCN có diện tích 24 cm²', bin: 1 },
      { t: 'Tuổi và chiều cao của một bạn', bin: 2 },
      { t: 'Khối lượng và thể tích của thanh sắt', bin: 0 },
    ],
  },
  isExpr: {
    title: 'Biểu thức số hay biểu thức đại số? Đa thức một biến?',
    bins: ['Biểu thức số', 'Đa thức một biến', 'Biểu thức đại số khác'],
    items: [
      { t: '3 · 5 − 2²', bin: 0 },
      { t: '2x² − x + 1', bin: 1 },
      { t: 'x + y', bin: 2 },
      { t: '7', bin: 0 },
      { t: '1/x + 2', bin: 2 },
      { t: '−5y³ + 2y', bin: 1 },
      { t: '(12 + 8) : 4', bin: 0 },
      { t: 'x⁴ − 1', bin: 1 },
    ],
  },
};

export const POLY_TASKS7 = {
  poly7add: {
    title: 'Cộng, trừ đa thức một biến',
    tasks: [
      { kind: 'collect' as const, name: 'P(x)', A: [t(2, 3), t(-3, 1), t(5, 2), t(1), t(-1, 3), t(4, 1)] },
      { kind: 'add' as const, A: [t(2, 3), t(-1, 2), t(3, 1), t(-5)], B: [t(-1, 3), t(4, 2), t(-3, 1), t(2)] },
      { kind: 'sub' as const, A: [t(2, 3), t(-1, 2), t(3, 1), t(-5)], B: [t(-1, 3), t(4, 2), t(-3, 1), t(2)] },
    ],
  },
  poly7mul: {
    title: 'Nhân đa thức một biến',
    tasks: [
      { kind: 'mul' as const, A: [t(3, 1)], B: [t(2, 2), t(-1, 1), t(4)] },
      { kind: 'mul' as const, A: [t(1, 1), t(-2)], B: [t(1, 2), t(3, 1), t(-1)] },
      { kind: 'mul' as const, A: [t(2, 1), t(1)], B: [t(1, 1), t(-3)] },
    ],
  },
  poly7div: {
    title: 'Chia đa thức cho đơn thức',
    tasks: [
      { kind: 'div' as const, A: [t(6, 4), t(-9, 3), t(3, 2)], B: [t(3, 2)] },
      { kind: 'div' as const, A: [t(-8, 3), t(4, 2), t(2, 1)], B: [t(-2, 1)] },
    ],
  },
};

export const TABLES7 = {
  numSetsTable: {
    title: 'Các tập hợp số',
    cols: ['Kí hiệu', 'Ví dụ'],
    rows: [
      ['Số tự nhiên', 'ℕ', '0; 1; 2; 15'],
      ['Số nguyên', 'ℤ', '−3; 0; 7'],
      ['Số hữu tỉ', 'ℚ', '−2/3; 0,25; 0,(6)'],
      ['Số vô tỉ', 'I', '√2; π; √5'],
      ['Số thực', 'ℝ', 'Gồm số hữu tỉ và số vô tỉ'],
    ] as [string, ...string[]][],
  },
  powRules: {
    title: 'Luỹ thừa với số mũ tự nhiên của số hữu tỉ',
    cols: ['Công thức', 'Ví dụ'],
    rows: [
      ['Tích hai luỹ thừa cùng cơ số', 'xᵐ · xⁿ = xᵐ⁺ⁿ', '(½)² · (½)³ = (½)⁵'],
      ['Thương hai luỹ thừa cùng cơ số', 'xᵐ : xⁿ = xᵐ⁻ⁿ (x ≠ 0, m ≥ n)', '(−3)⁸ : (−3)⁶ = (−3)²'],
      ['Luỹ thừa của luỹ thừa', '(xᵐ)ⁿ = xᵐ·ⁿ', '[(0,2)²]³ = (0,2)⁶'],
      ['Quy ước', 'x⁰ = 1 (x ≠ 0); x¹ = x', '(−5/7)⁰ = 1'],
    ] as [string, ...string[]][],
  },
  congCases: {
    title: 'Các trường hợp bằng nhau của tam giác',
    cols: ['Điều kiện', 'Kí hiệu'],
    rows: [
      ['Cạnh – cạnh – cạnh', 'Ba cạnh tương ứng bằng nhau', 'c.c.c'],
      ['Cạnh – góc – cạnh', 'Hai cạnh và góc xen giữa bằng nhau', 'c.g.c'],
      ['Góc – cạnh – góc', 'Một cạnh và hai góc kề bằng nhau', 'g.c.g'],
      ['Tam giác vuông', 'Hai cạnh góc vuông; cạnh góc vuông và góc nhọn kề; cạnh huyền và góc nhọn', 'c.g.c; g.c.g'],
      ['Tam giác vuông', 'Cạnh huyền và một cạnh góc vuông', 'cạnh huyền – cạnh góc vuông'],
    ] as [string, ...string[]][],
  },
  concurTable: {
    title: 'Các điểm đặc biệt trong tam giác',
    cols: ['Giao điểm của', 'Tính chất'],
    rows: [
      ['Trọng tâm G', 'Ba đường trung tuyến', 'AG = ⅔ AM'],
      ['Điểm I', 'Ba đường phân giác', 'Cách đều ba cạnh'],
      ['Điểm O', 'Ba đường trung trực', 'Cách đều ba đỉnh'],
      ['Trực tâm H', 'Ba đường cao', '–'],
    ] as [string, ...string[]][],
  },
  solids7: {
    title: 'Hình hộp chữ nhật, hình lập phương, hình lăng trụ đứng',
    cols: ['Diện tích xung quanh', 'Thể tích'],
    rows: [
      ['Hình hộp chữ nhật (a, b, c)', '2(a + b) · c', 'a · b · c'],
      ['Hình lập phương (cạnh a)', '4a²', 'a³'],
      ['Lăng trụ đứng tam giác, tứ giác', 'Chu vi đáy × chiều cao', 'Diện tích đáy × chiều cao'],
    ] as [string, ...string[]][],
  },
};

export const CHARTS7 = {
  hobby7: { title: 'Sở thích của học sinh lớp 7A (40 học sinh)', catName: 'Sở thích', cats: ['Thể thao', 'Đọc sách', 'Âm nhạc', 'Vẽ', 'Khác'], series: [{ name: 'Số học sinh', vals: [14, 8, 10, 4, 4] }], unit: 'học sinh', note: 'Biểu đồ hình quạt tròn: cả hình tròn biểu diễn 100%; mỗi hình quạt biểu diễn tỉ lệ phần trăm của một phần.' },
  rice: { title: 'Sản lượng lúa của một hợp tác xã qua các năm (tấn)', catName: 'Năm', cats: ['2018', '2019', '2020', '2021', '2022', '2023'], series: [{ name: 'Sản lượng', vals: [420, 450, 435, 480, 510, 530] }], unit: 'tấn', note: 'Biểu đồ đoạn thẳng biểu diễn sự thay đổi của số liệu theo thời gian. Năm nào sản lượng giảm?' },
  temp7: { title: 'Nhiệt độ trong một ngày ở Sa Pa (°C)', catName: 'Giờ', cats: ['6 h', '8 h', '10 h', '12 h', '14 h', '16 h', '18 h'], series: [{ name: 'Nhiệt độ', vals: [9, 11, 14, 17, 18, 15, 12] }], unit: '°C', note: 'Nhiệt độ cao nhất lúc mấy giờ? Tăng trong khoảng thời gian nào?' },
};
