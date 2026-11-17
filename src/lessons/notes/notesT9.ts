// Toán 9 (Kết nối tri thức): Bài 1 – Bài 32. Nội dung do nhóm phát triển tự biên soạn.
import type { LessonNotes } from './types';

export const NOTES_T9: Record<string, LessonNotes> = {
  't9-1': {
    opener: 'Mua 3 quyển vở và 2 cái bút hết 34 nghìn đồng. Giá vở và giá bút có thể là bao nhiêu? Có bao nhiêu khả năng?',
    goals: ['Nhận biết được khái niệm phương trình bậc nhất hai ẩn, hệ hai phương trình bậc nhất hai ẩn.', 'Nhận biết được nghiệm của phương trình, hệ phương trình bậc nhất hai ẩn.'],
    sections: [
      { title: 'Phương trình bậc nhất hai ẩn', body: ['Phương trình bậc nhất hai ẩn x, y là hệ thức dạng ax + by = c, trong đó a, b, c là các số đã biết (a ≠ 0 hoặc b ≠ 0).', 'Mỗi cặp số (x₀; y₀) thoả mãn ax₀ + by₀ = c là một nghiệm. Phương trình có vô số nghiệm; tập nghiệm được biểu diễn bởi một đường thẳng trên mặt phẳng toạ độ.'], scene: 1 },
      { title: 'Hệ hai phương trình bậc nhất hai ẩn', body: ['Hệ gồm hai phương trình bậc nhất hai ẩn. Cặp số (x₀; y₀) là nghiệm của hệ nếu nó là nghiệm của cả hai phương trình.', 'Về hình học, nghiệm của hệ là toạ độ giao điểm của hai đường thẳng.'], scene: 3 },
    ],
    examples: ['(1; 1) là một nghiệm của 2x − y = 1; (0; −1), (2; 3) cũng là nghiệm.', '(2; −1) là nghiệm của hệ x + 2y = 0 và 3x − y = 7.'],
    exercises: [
      { q: 'Cặp số (3; 1) có là nghiệm của x − 2y = 1 không?', a: 'Có: 3 − 2 = 1.' },
      { q: 'Viết nghiệm tổng quát của x + y = 5.', a: '(x; 5 − x) với x tuỳ ý.' },
    ],
  },
  't9-2': {
    opener: 'Có cách nào tìm chính xác nghiệm của hệ phương trình mà không cần vẽ đồ thị?',
    goals: ['Giải được hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế và phương pháp cộng đại số.', 'Tìm được nghiệm của hệ bằng máy tính cầm tay.'],
    sections: [
      { title: 'Phương pháp thế', body: ['Từ một phương trình, biểu diễn một ẩn theo ẩn kia rồi thế vào phương trình còn lại để được phương trình một ẩn; giải phương trình đó rồi suy ra ẩn kia.'], scene: 1 },
      { title: 'Phương pháp cộng đại số', body: ['Nhân hai vế của mỗi phương trình với số thích hợp (nếu cần) để hệ số của một ẩn bằng nhau hoặc đối nhau; cộng hoặc trừ từng vế để khử ẩn đó.'], scene: 2 },
      { title: 'Số nghiệm của hệ', body: ['Hệ có nghiệm duy nhất khi hai đường thẳng cắt nhau; vô nghiệm khi chúng song song; vô số nghiệm khi chúng trùng nhau.'], scene: 4 },
    ],
    examples: ['x − 2y = 1, 3x + y = 10 có nghiệm (3; 1).', '2x + 3y = 7, 2x − y = 3 có nghiệm (2; 1).'],
    exercises: [
      { q: 'Giải hệ x + y = 5 và 2x − y = 1.', a: 'Cộng vế: 3x = 6 ⇒ x = 2, y = 3.' },
      { q: 'Hệ x + y = 2 và 2x + 2y = 5 có bao nhiêu nghiệm?', a: 'Vô nghiệm (hai đường thẳng song song).' },
    ],
  },
  't9-3': {
    opener: 'Bài toán cổ “Vừa gà vừa chó, bó lại cho tròn, ba mươi sáu con, một trăm chân chẵn” có thể giải nhanh bằng hệ phương trình.',
    goals: ['Giải quyết được một số bài toán thực tế bằng cách lập hệ phương trình bậc nhất hai ẩn.'],
    sections: [{ title: 'Các bước giải', body: ['Bước 1: chọn hai ẩn, đặt điều kiện; biểu diễn các đại lượng theo ẩn; lập hệ phương trình.', 'Bước 2: giải hệ phương trình.', 'Bước 3: kiểm tra điều kiện và trả lời.'], scene: 1 }],
    examples: ['Gà x con, chó y con: x + y = 36, 2x + 4y = 100 ⇒ x = 22, y = 14.', 'Ca nô: x + y = 30, x − y = 20 ⇒ x = 25 km/h, y = 5 km/h.'],
    exercises: [{ q: 'Tổng hai số là 25, hiệu là 7. Tìm hai số.', a: 'x + y = 25, x − y = 7 ⇒ x = 16, y = 9.' }],
  },
  't9-4': {
    opener: 'Phương trình (x − 2)(2x + 3) = 0 không có dạng ax + b = 0. Làm sao đưa nó về các phương trình bậc nhất?',
    goals: ['Giải được phương trình tích có dạng (a₁x + b₁)(a₂x + b₂) = 0.', 'Giải được phương trình chứa ẩn ở mẫu quy về phương trình bậc nhất.'],
    sections: [
      { title: 'Phương trình tích', body: ['(a₁x + b₁)(a₂x + b₂) = 0 ⇔ a₁x + b₁ = 0 hoặc a₂x + b₂ = 0.', 'Nhiều phương trình đưa được về dạng tích nhờ phân tích đa thức thành nhân tử.'], scene: 1 },
      { title: 'Phương trình chứa ẩn ở mẫu', body: ['Bước 1: tìm điều kiện xác định. Bước 2: quy đồng mẫu hai vế rồi khử mẫu. Bước 3: giải phương trình nhận được. Bước 4: chọn các giá trị thoả mãn điều kiện xác định để kết luận.'], scene: 2 },
    ],
    examples: ['(x − 2)(2x + 3) = 0 ⇔ x = 2 hoặc x = −3/2.', 'x/(x − 1) − 2/x = 1 có nghiệm x = 2.'],
    exercises: [
      { q: 'Giải x² − 4x = 0.', a: 'x(x − 4) = 0 ⇔ x = 0 hoặc x = 4.' },
      { q: 'Tìm ĐKXĐ của 1/(x + 3) = 2/(x − 1).', a: 'x ≠ −3 và x ≠ 1.' },
    ],
  },
  't9-5': {
    opener: 'Biển báo “Tốc độ tối đa 60 km/h” có thể viết bằng kí hiệu toán học như thế nào?',
    goals: ['Nhận biết được thứ tự trên tập số thực.', 'Nhận biết được bất đẳng thức và mô tả được một số tính chất cơ bản của bất đẳng thức (bắc cầu, liên hệ với phép cộng, phép nhân).'],
    sections: [
      { title: 'Bất đẳng thức', body: ['Hệ thức dạng a > b (a < b, a ≥ b, a ≤ b) là bất đẳng thức; a là vế trái, b là vế phải.', 'Tính chất bắc cầu: a > b và b > c thì a > c.'] },
      { title: 'Liên hệ với phép cộng', body: ['Khi cộng cùng một số vào hai vế của một bất đẳng thức ta được bất đẳng thức cùng chiều.'], scene: 1 },
      { title: 'Liên hệ với phép nhân', body: ['Nhân hai vế với cùng một số dương: được bất đẳng thức cùng chiều.', 'Nhân hai vế với cùng một số âm: được bất đẳng thức ngược chiều.'], scene: 2 },
    ],
    formulas: [
      { expr: 'a < b ⇒ a + c < b + c', note: 'Cộng một số vào hai vế' },
      { expr: 'a < b, c < 0 ⇒ ac > bc', note: 'Nhân với số âm: đổi chiều' },
    ],
    examples: ['Tốc độ v không vượt quá 60 km/h: v ≤ 60.', 'a² + b² ≥ 2ab với mọi a, b.'],
    exercises: [
      { q: 'Cho a > b. So sánh −5a và −5b.', a: '−5a < −5b.' },
      { q: 'Chứng minh nếu a > b thì 2a + 3 > 2b + 3.', a: 'Nhân hai vế với 2 > 0 rồi cộng 3: giữ nguyên chiều.' },
    ],
  },
  't9-6': {
    opener: 'Với 120 nghìn đồng, em mua được tối đa bao nhiêu quyển vở? Câu trả lời cần đến bất phương trình.',
    goals: ['Nhận biết được khái niệm bất phương trình bậc nhất một ẩn, nghiệm của bất phương trình.', 'Giải được bất phương trình bậc nhất một ẩn.'],
    sections: [
      { title: 'Bất phương trình bậc nhất một ẩn', body: ['Bất phương trình dạng ax + b < 0 (hoặc > 0, ≤ 0, ≥ 0), với a, b là các số đã cho, a ≠ 0, gọi là bất phương trình bậc nhất một ẩn x.', 'Số x₀ là một nghiệm nếu thay vào ta được một khẳng định đúng.'], scene: 1 },
      { title: 'Cách giải', body: ['Chuyển vế (đổi dấu hạng tử).', 'Chia (nhân) hai vế cho số dương: giữ nguyên chiều; cho số âm: đổi chiều.', 'Biểu diễn tập nghiệm trên trục số.'], scene: 2 },
    ],
    examples: ['3x − 5 > 7 ⇔ x > 4.', '−2x + 1 ≥ 9 ⇔ x ≤ −4.'],
    exercises: [
      { q: 'Giải 5 − 3x < 2.', a: '−3x < −3 ⇔ x > 1.' },
      { q: 'Số 0 có là nghiệm của 2x + 3 > 1 không?', a: 'Có, vì 3 > 1.' },
    ],
  },
  't9-7': {
    opener: 'Hình vuông có diện tích 50 m² thì cạnh dài bao nhiêu mét?',
    goals: ['Nhận biết được khái niệm căn bậc hai của số thực không âm, căn thức bậc hai.', 'Tính được giá trị (đúng hoặc gần đúng) căn bậc hai của một số; vận dụng √(A²) = |A|.'],
    sections: [
      { title: 'Căn bậc hai', body: ['Căn bậc hai của số thực không âm a là số x sao cho x² = a.', 'Số a > 0 có hai căn bậc hai là √a (căn bậc hai số học) và −√a; số 0 có một căn bậc hai là 0; số âm không có căn bậc hai.'], scene: 1 },
      { title: 'Căn thức bậc hai', body: ['Với A là biểu thức đại số, √A là căn thức bậc hai, xác định khi A ≥ 0.', 'Hằng đẳng thức: √(A²) = |A|.'], scene: 3 },
    ],
    formulas: [{ expr: '√(A²) = |A|', note: 'Với mọi biểu thức A' }],
    examples: ['√49 = 7; √50 ≈ 7,07.', '√((√3 − 2)²) = 2 − √3.'],
    exercises: [
      { q: 'Tìm các căn bậc hai của 81.', a: '9 và −9.' },
      { q: 'Với giá trị nào của x thì √(3 − x) xác định?', a: 'x ≤ 3.' },
    ],
  },
  't9-8': {
    opener: 'Không dùng máy tính, có tính được √(16 · 25) hay √2 · √18 không?',
    goals: ['Thực hiện được phép khai căn bậc hai của một tích, một thương; nhân, chia các căn bậc hai.'],
    sections: [
      { title: 'Khai căn bậc hai và phép nhân', body: ['√(A·B) = √A · √B với A, B ≥ 0.', 'Ngược lại, √A · √B = √(A·B).'], scene: 1 },
      { title: 'Khai căn bậc hai và phép chia', body: ['√(A/B) = √A / √B với A ≥ 0, B > 0.'], scene: 1 },
    ],
    formulas: [
      { expr: '√(AB) = √A · √B', note: 'A, B ≥ 0' },
      { expr: '√(A/B) = √A / √B', note: 'A ≥ 0, B > 0' },
    ],
    examples: ['√(16 · 25) = 20.', '√50 : √2 = 5.'],
    exercises: [
      { q: 'Tính √0,09 · √64.', a: '0,3 · 8 = 2,4.' },
      { q: 'Tính √(18/50).', a: '√(9/25) = 3/5.' },
    ],
  },
  't9-9': {
    opener: 'Biểu thức √12 + √27 − √48 trông phức tạp nhưng có thể rút gọn thành một số rất đơn giản.',
    goals: ['Thực hiện được các phép biến đổi đơn giản: đưa thừa số ra ngoài (vào trong) dấu căn, trục căn thức ở mẫu.', 'Rút gọn được biểu thức chứa căn thức bậc hai.'],
    sections: [
      { title: 'Đưa thừa số ra ngoài, vào trong dấu căn', body: ['√(A²B) = |A|√B (B ≥ 0).', 'A√B = √(A²B) nếu A ≥ 0; A√B = −√(A²B) nếu A < 0.'], scene: 1 },
      { title: 'Trục căn thức ở mẫu', body: ['A/√B = A√B/B (B > 0).', 'Với mẫu dạng √a ± √b hoặc √a ± b: nhân cả tử và mẫu với biểu thức liên hợp.'], scene: 1 },
      { title: 'Rút gọn', body: ['Đưa các căn về cùng dạng (căn đồng dạng) rồi cộng, trừ.'], scene: 2 },
    ],
    examples: ['√50 = 5√2.', '2/(√3 + 1) = √3 − 1.', '√12 + √27 − √48 = √3.'],
    exercises: [
      { q: 'Rút gọn √8 + √18 − √32.', a: '2√2 + 3√2 − 4√2 = √2.' },
      { q: 'Trục căn thức: 3/√6.', a: '3√6/6 = √6/2.' },
    ],
  },
  't9-10': {
    opener: 'Một thùng hình lập phương chứa được 1 000 lít nước. Cạnh của thùng dài bao nhiêu?',
    goals: ['Nhận biết được khái niệm căn bậc ba, căn thức bậc ba.', 'Tính được giá trị (đúng hoặc gần đúng) căn bậc ba của một số.'],
    sections: [
      { title: 'Căn bậc ba', body: ['Căn bậc ba của số thực a là số x sao cho x³ = a, kí hiệu ∛a.', 'Mọi số thực đều có đúng một căn bậc ba; căn bậc ba của số dương là số dương, của số âm là số âm.'], scene: 1 },
      { title: 'Căn thức bậc ba', body: ['∛A xác định với mọi giá trị của A; ∛(A³) = A.'], scene: 2 },
    ],
    formulas: [{ expr: '(∛a)³ = ∛(a³) = a', note: 'Với mọi số thực a' }],
    examples: ['1 000 lít = 1 m³ ⇒ cạnh 1 m.', '∛(−27) = −3.'],
    exercises: [
      { q: 'Tính ∛(−0,001).', a: '−0,1.' },
      { q: 'So sánh 3 và ∛26.', a: '3 = ∛27 > ∛26.' },
    ],
  },
  't9-11': {
    opener: 'Làm sao đo chiều cao một cái tháp chỉ bằng thước đo góc và thước dây?',
    goals: ['Nhận biết được các giá trị sin, cos, tan, cot của góc nhọn.', 'Giải thích được tỉ số lượng giác của các góc đặc biệt 30°, 45°, 60° và của hai góc phụ nhau.'],
    sections: [
      { title: 'Tỉ số lượng giác', body: ['Trong tam giác vuông, với góc nhọn α: sin α = đối/huyền; cos α = kề/huyền; tan α = đối/kề; cot α = kề/đối.', 'Các tỉ số này chỉ phụ thuộc vào góc α, không phụ thuộc kích thước tam giác (các tam giác vuông có cùng góc nhọn α đồng dạng).'], scene: 1 },
      { title: 'Hai góc phụ nhau', body: ['Nếu α + β = 90° thì sin α = cos β, cos α = sin β, tan α = cot β, cot α = tan β.'], scene: 2 },
      { title: 'Góc đặc biệt', body: ['sin 30° = 1/2, sin 45° = √2/2, sin 60° = √3/2; tan 45° = 1.'], scene: 3 },
    ],
    formulas: [{ expr: 'sin α = đối/huyền; cos α = kề/huyền; tan α = đối/kề', note: 'α là góc nhọn' }],
    examples: ['Tam giác 3 – 4 – 5: sin B = 4/5, cos B = 3/5.'],
    exercises: [
      { q: 'Tính sin 60° − cos 30°.', a: '0.' },
      { q: 'Vì sao 0 < sin α < 1 với mọi góc nhọn α?', a: 'Vì cạnh góc vuông luôn nhỏ hơn cạnh huyền.' },
    ],
  },
  't9-12': {
    opener: 'Biết độ dài cạnh huyền và một góc nhọn của tam giác vuông, có tính được các cạnh còn lại không?',
    goals: ['Giải thích được một số hệ thức về cạnh và góc trong tam giác vuông.', 'Giải quyết được bài toán thực tế: tính độ dài, chiều cao, khoảng cách.'],
    sections: [
      { title: 'Hệ thức giữa cạnh và góc', body: ['Trong tam giác vuông, mỗi cạnh góc vuông bằng: cạnh huyền nhân với sin góc đối hoặc cos góc kề; cạnh góc vuông kia nhân với tan góc đối hoặc cot góc kề.'], scene: 1 },
      { title: 'Giải tam giác vuông', body: ['Giải tam giác vuông là tìm tất cả các cạnh và góc khi biết hai cạnh, hoặc một cạnh và một góc nhọn.'], scene: 2 },
      { title: 'Ứng dụng', body: ['Đo chiều cao bằng góc nâng: chiều cao = độ cao mắt + d · tan α.'], scene: 3 },
    ],
    formulas: [
      { expr: 'b = a · sin B = a · cos C', note: 'a: cạnh huyền' },
      { expr: 'b = c · tan B = c · cot C', note: 'b, c: hai cạnh góc vuông' },
    ],
    examples: ['BC = 10, B = 35° ⇒ AC ≈ 5,74; AB ≈ 8,19.'],
    exercises: [
      { q: 'Một cái thang dài 5 m đặt nghiêng 60° so với mặt đất. Đầu thang cao bao nhiêu?', a: '5 · sin 60° ≈ 4,33 m.' },
      { q: 'Đứng cách tháp 30 m, góc nâng 40°, mắt cao 1,5 m. Tháp cao bao nhiêu?', a: '1,5 + 30 · tan 40° ≈ 26,7 m.' },
    ],
  },
  't9-13': {
    opener: 'Vành bánh xe, mặt đồng hồ, miệng giếng… đều có dạng đường tròn. Đường tròn có những tính chất gì đặc biệt?',
    goals: ['Nhận biết được tâm đối xứng, trục đối xứng của đường tròn.', 'Xác định được vị trí tương đối của một điểm với đường tròn.'],
    sections: [
      { title: 'Đường tròn', body: ['Đường tròn tâm O bán kính R (R > 0), kí hiệu (O; R), là hình gồm các điểm cách O một khoảng bằng R.', 'Điểm M nằm trên, trong, ngoài (O; R) khi OM = R, OM < R, OM > R.'], scene: 1 },
      { title: 'Tính đối xứng', body: ['Đường tròn là hình có tâm đối xứng (chính là tâm O) và có vô số trục đối xứng (mỗi đường kính là một trục đối xứng).'], scene: 2 },
    ],
    examples: ['(O; 5 cm): OA = 3 cm ⇒ A nằm trong đường tròn.'],
    exercises: [{ q: 'Đường tròn (O; 2 cm) có đường kính bao nhiêu?', a: '4 cm.' }],
  },
  't9-14': {
    opener: 'Trong các dây của một đường tròn, dây nào dài nhất?',
    goals: ['Nhận biết được cung, dây cung, đường kính và quan hệ giữa độ dài đường kính và dây.', 'Nhận biết được góc ở tâm, số đo cung.'],
    sections: [
      { title: 'Dây và đường kính', body: ['Đoạn thẳng nối hai điểm của đường tròn là một dây. Dây đi qua tâm là đường kính.', 'Trong một đường tròn, đường kính là dây lớn nhất.'], scene: 1 },
      { title: 'Góc ở tâm, số đo cung', body: ['Góc có đỉnh trùng với tâm đường tròn gọi là góc ở tâm.', 'Số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó; số đo cung lớn bằng 360° trừ số đo cung nhỏ; nửa đường tròn có số đo 180°.'], scene: 2 },
    ],
    examples: ['Dây AB = 8 cm trong (O; 5 cm) cách tâm 3 cm.'],
    exercises: [{ q: 'Góc ở tâm 70° chắn cung nhỏ bao nhiêu độ? Cung lớn?', a: '70° và 290°.' }],
  },
  't9-15': {
    opener: 'Một chiếc quạt giấy khi mở ra có dạng hình quạt tròn. Tính diện tích giấy của chiếc quạt thế nào?',
    goals: ['Tính được độ dài cung tròn, diện tích hình quạt tròn, diện tích hình vành khuyên.'],
    sections: [
      { title: 'Độ dài cung tròn', body: ['Độ dài cung n° của đường tròn bán kính R: l = πRn/180.'], scene: 1 },
      { title: 'Diện tích hình quạt tròn', body: ['S = πR²n/360 = l·R/2.'], scene: 1 },
      { title: 'Hình vành khuyên', body: ['Hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính R và r (r < R) có diện tích S = π(R² − r²).'], scene: 2 },
    ],
    formulas: [
      { expr: 'l = πRn/180', note: 'Độ dài cung n°' },
      { expr: 'S = πR²n/360', note: 'Diện tích hình quạt' },
      { expr: 'S = π(R² − r²)', note: 'Diện tích hình vành khuyên' },
    ],
    examples: ['R = 6 cm, n = 60°: l = 2π cm, S = 6π cm².'],
    exercises: [{ q: 'Tính độ dài cung 120° của đường tròn bán kính 3 cm.', a: 'l = π · 3 · 120/180 = 2π ≈ 6,28 cm.' }],
  },
  't9-16': {
    opener: 'Khi bánh xe lăn trên mặt đường, mặt đường và vành bánh xe có bao nhiêu điểm chung?',
    goals: ['Mô tả được ba vị trí tương đối của đường thẳng và đường tròn.', 'Giải thích được dấu hiệu nhận biết tiếp tuyến; tính chất hai tiếp tuyến cắt nhau.'],
    sections: [
      { title: 'Ba vị trí tương đối', body: ['Gọi d là khoảng cách từ O đến đường thẳng a: d < R cắt nhau (2 điểm chung); d = R tiếp xúc (1 điểm chung); d > R không giao nhau.'], scene: 1 },
      { title: 'Tiếp tuyến', body: ['Đường thẳng tiếp xúc với đường tròn gọi là tiếp tuyến. Tiếp tuyến vuông góc với bán kính tại tiếp điểm.', 'Dấu hiệu: đường thẳng đi qua một điểm của đường tròn và vuông góc với bán kính đi qua điểm đó là tiếp tuyến.'], scene: 1 },
      { title: 'Hai tiếp tuyến cắt nhau', body: ['Nếu hai tiếp tuyến tại B và C cắt nhau tại A thì AB = AC; AO là tia phân giác của góc BAC; OA là tia phân giác của góc BOC.'], scene: 3 },
    ],
    examples: ['(O; 3 cm), OA = 5 cm ⇒ tiếp tuyến AB = 4 cm.'],
    exercises: [{ q: '(O; 5 cm), khoảng cách từ O đến a là 5 cm. Vị trí tương đối?', a: 'Tiếp xúc.' }],
  },
  't9-17': {
    opener: 'Hai vòng của biểu tượng Olympic, hai bánh răng ăn khớp với nhau… cho thấy những vị trí nào của hai đường tròn?',
    goals: ['Mô tả được ba vị trí tương đối của hai đường tròn (cắt nhau, tiếp xúc, không giao nhau).'],
    sections: [
      { title: 'Vị trí tương đối', body: ['Hai đường tròn (O; R), (O′; r) với R ≥ r, d = OO′.', 'Cắt nhau: R − r < d < R + r. Tiếp xúc ngoài: d = R + r. Tiếp xúc trong: d = R − r > 0. Ở ngoài nhau: d > R + r. Đựng nhau: d < R − r.'], scene: 1 },
    ],
    examples: ['(O; 5 cm), (O′; 3 cm), OO′ = 8 cm: tiếp xúc ngoài.'],
    exercises: [{ q: '(O; 4 cm), (O′; 2 cm), OO′ = 5 cm. Vị trí tương đối?', a: '2 < 5 < 6: cắt nhau.' }],
  },
  't9-18': {
    opener: 'Đường đi của quả bóng được ném lên, dây cáp cầu treo… có dạng đường cong gọi là parabol.',
    goals: ['Thiết lập được bảng giá trị và vẽ được đồ thị hàm số y = ax² (a ≠ 0).', 'Nhận biết được tính đối xứng (trục) và trục đối xứng của đồ thị hàm số y = ax².'],
    sections: [
      { title: 'Đồ thị hàm số y = ax²', body: ['Đồ thị của hàm số y = ax² (a ≠ 0) là một parabol đỉnh O, nhận trục Oy làm trục đối xứng.', 'a > 0: đồ thị nằm phía trên trục hoành, O là điểm thấp nhất. a < 0: đồ thị nằm phía dưới trục hoành, O là điểm cao nhất.'], scene: 1 },
    ],
    examples: ['y = 2x² đi qua (1; 2), (−1; 2), (2; 8), (−2; 8).'],
    exercises: [{ q: 'Đồ thị y = ax² đi qua (−1; 3). Tìm a.', a: 'a = 3.' }],
  },
  't9-19': {
    opener: 'Mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng 4 m, diện tích 60 m². Phương trình tìm chiều rộng có dạng x² + 4x − 60 = 0.',
    goals: ['Nhận biết được phương trình bậc hai một ẩn.', 'Giải được phương trình bậc hai một ẩn bằng công thức nghiệm, công thức nghiệm thu gọn; dùng máy tính cầm tay.'],
    sections: [
      { title: 'Phương trình bậc hai một ẩn', body: ['Phương trình dạng ax² + bx + c = 0, với a, b, c là các số đã cho, a ≠ 0.'] },
      { title: 'Công thức nghiệm', body: ['Δ = b² − 4ac. Δ > 0: hai nghiệm phân biệt x = (−b ± √Δ)/(2a). Δ = 0: nghiệm kép x = −b/(2a). Δ < 0: vô nghiệm.', 'Nếu b = 2b′: Δ′ = b′² − ac; nghiệm x = (−b′ ± √Δ′)/a.'], scene: 1 },
      { title: 'Ý nghĩa hình học', body: ['Nghiệm của phương trình là hoành độ giao điểm của đồ thị y = ax² + bx + c với trục hoành.'], scene: 1 },
    ],
    formulas: [
      { expr: 'Δ = b² − 4ac', note: 'Biệt thức' },
      { expr: 'x = (−b ± √Δ)/(2a)', note: 'Khi Δ ≥ 0' },
    ],
    examples: ['2x² − 5x + 2 = 0 có nghiệm 2 và 1/2.', 'x² − 6x + 4 = 0 có nghiệm 3 ± √5.'],
    exercises: [
      { q: 'Giải x² − 4x − 5 = 0.', a: 'Δ′ = 9 ⇒ x = 5 hoặc x = −1.' },
      { q: 'Phương trình x² + x + 1 = 0 có nghiệm không?', a: 'Δ = −3 < 0: vô nghiệm.' },
    ],
  },
  't9-20': {
    opener: 'Không cần giải, có biết được tổng và tích hai nghiệm của một phương trình bậc hai không?',
    goals: ['Giải thích được định lí Viète.', 'Ứng dụng định lí Viète: nhẩm nghiệm, tìm hai số biết tổng và tích.'],
    sections: [
      { title: 'Định lí Viète', body: ['Nếu x₁, x₂ là hai nghiệm của ax² + bx + c = 0 (a ≠ 0) thì x₁ + x₂ = −b/a và x₁x₂ = c/a.'], scene: 1 },
      { title: 'Nhẩm nghiệm', body: ['a + b + c = 0 ⇒ x₁ = 1, x₂ = c/a. a − b + c = 0 ⇒ x₁ = −1, x₂ = −c/a.'], scene: 2 },
      { title: 'Tìm hai số biết tổng và tích', body: ['Hai số có tổng S và tích P là nghiệm của x² − Sx + P = 0 (điều kiện S² − 4P ≥ 0).'], scene: 3 },
    ],
    formulas: [{ expr: 'x₁ + x₂ = −b/a; x₁x₂ = c/a', note: 'Định lí Viète' }],
    examples: ['x² − 7x + 6 = 0 có nghiệm 1 và 6.', 'Tổng 7, tích 12: hai số 3 và 4.'],
    exercises: [{ q: 'Nhẩm nghiệm 3x² − 5x + 2 = 0.', a: 'a + b + c = 0 ⇒ x = 1, x = 2/3.' }],
  },
  't9-21': {
    opener: 'Nhiều bài toán thực tế (diện tích, năng suất, chuyển động) dẫn đến phương trình bậc hai.',
    goals: ['Giải quyết được một số bài toán thực tế bằng cách lập phương trình bậc hai một ẩn.'],
    sections: [{ title: 'Các bước giải', body: ['Chọn ẩn và đặt điều kiện; lập phương trình; giải phương trình; đối chiếu điều kiện để loại nghiệm không phù hợp rồi trả lời.'], scene: 1 }],
    examples: ['Vườn chữ nhật: x(x + 4) = 60 ⇒ rộng 6 m, dài 10 m.', 'Trồng cây: 120/x − 120/(x + 2) = 2 ⇒ x = 10.'],
    exercises: [{ q: 'Tích hai số tự nhiên liên tiếp là 132. Tìm hai số.', a: 'x(x + 1) = 132 ⇒ x = 11; hai số là 11 và 12.' }],
  },
  't9-22': {
    opener: 'Điểm kiểm tra của cả lớp có rất nhiều số lặp lại. Làm sao trình bày gọn để thấy điểm nào phổ biến nhất?',
    goals: ['Xác định được tần số của một giá trị; thiết lập được bảng tần số và biểu đồ tần số (cột, đoạn thẳng).'],
    sections: [
      { title: 'Bảng tần số', body: ['Tần số của một giá trị là số lần xuất hiện của giá trị đó trong mẫu số liệu.', 'Bảng tần số gồm hai dòng (hoặc hai cột): các giá trị và tần số tương ứng; tổng các tần số bằng cỡ mẫu.'], scene: 1 },
      { title: 'Biểu đồ tần số', body: ['Biểu đồ cột hoặc biểu đồ đoạn thẳng với trục ngang là các giá trị, trục đứng là tần số.'], scene: 2 },
    ],
    examples: ['Điểm 8 có tần số 7 trong 20 học sinh.'],
    exercises: [{ q: 'Mẫu số liệu 2, 3, 3, 5, 3, 2 có bảng tần số thế nào?', a: '2 → 2; 3 → 3; 5 → 1.' }],
  },
  't9-23': {
    opener: 'Lớp A có 18 bạn đi xe đạp trên 40 bạn, lớp B có 15 bạn trên 30 bạn. Lớp nào có tỉ lệ đi xe đạp cao hơn?',
    goals: ['Xác định được tần số tương đối; thiết lập được bảng tần số tương đối và biểu đồ tần số tương đối (cột, hình quạt tròn).'],
    sections: [
      { title: 'Tần số tương đối', body: ['Tần số tương đối của giá trị x là tỉ số giữa tần số của x và cỡ mẫu, thường viết dưới dạng phần trăm.', 'Tổng các tần số tương đối bằng 100%.'], scene: 1 },
      { title: 'Biểu đồ tần số tương đối', body: ['Biểu đồ hình quạt tròn: mỗi giá trị ứng với một hình quạt có góc ở tâm tỉ lệ với tần số tương đối (1% ↔ 3,6°). Có thể dùng biểu đồ cột.'], scene: 2 },
    ],
    formulas: [{ expr: 'f = n/N · 100%', note: 'n: tần số, N: cỡ mẫu' }],
    examples: ['18/40 = 45% học sinh lớp 9A đi xe đạp; góc ở tâm 162°.'],
    exercises: [{ q: 'So sánh tỉ lệ đi xe đạp của lớp A (18/40) và lớp B (15/30).', a: '45% < 50%: lớp B cao hơn.' }],
  },
  't9-24': {
    opener: 'Chiều cao của học sinh có rất nhiều giá trị khác nhau. Làm sao lập bảng tần số gọn gàng?',
    goals: ['Thiết lập được bảng tần số, tần số tương đối ghép nhóm; vẽ được biểu đồ tần số, tần số tương đối ghép nhóm (dạng cột).'],
    sections: [
      { title: 'Ghép nhóm số liệu', body: ['Chia khoảng giá trị thành các nhóm dạng [a; b) có độ dài bằng nhau; tần số của nhóm là số giá trị thuộc nhóm đó.'], scene: 1 },
      { title: 'Biểu đồ ghép nhóm', body: ['Biểu đồ tần số (tần số tương đối) ghép nhóm dùng các cột liền nhau, mỗi cột ứng với một nhóm.'], scene: 2 },
    ],
    examples: ['Chiều cao 30 học sinh: [150; 155) 6 bạn, [155; 160) 12 bạn…'],
    exercises: [{ q: 'Giá trị 160 thuộc nhóm [155; 160) hay [160; 165)?', a: '[160; 165).' }],
  },
  't9-25': {
    opener: 'Gieo một đồng xu rồi gieo một con xúc xắc: có tất cả bao nhiêu kết quả? Liệt kê thế nào để không bỏ sót?',
    goals: ['Nhận biết được phép thử ngẫu nhiên và không gian mẫu.', 'Liệt kê được không gian mẫu bằng cách liệt kê, lập bảng hoặc sơ đồ cây.'],
    sections: [
      { title: 'Phép thử ngẫu nhiên, không gian mẫu', body: ['Phép thử ngẫu nhiên là hoạt động mà ta không biết trước kết quả.', 'Tập hợp tất cả các kết quả có thể của phép thử gọi là không gian mẫu, kí hiệu Ω.'], scene: 1 },
      { title: 'Chú ý thứ tự', body: ['Khi chọn một nhóm (không phân biệt thứ tự), AB và BA là một kết quả. Khi rút lần lượt (có thứ tự), 12 và 21 là hai kết quả khác nhau.'], scene: 2 },
    ],
    examples: ['Tung đồng xu rồi gieo xúc xắc: n(Ω) = 12.', 'Chọn 2 bạn trong 4 bạn: n(Ω) = 6.'],
    exercises: [{ q: 'Gieo hai con xúc xắc có bao nhiêu kết quả?', a: '36.' }],
  },
  't9-26': {
    opener: 'Gieo hai con xúc xắc, tổng số chấm bằng mấy thì dễ xảy ra nhất?',
    goals: ['Tính được xác suất của biến cố bằng cách kiểm đếm số kết quả thuận lợi trong không gian mẫu (các kết quả đồng khả năng).'],
    sections: [
      { title: 'Công thức tính xác suất', body: ['Giả sử các kết quả của phép thử là đồng khả năng. Xác suất của biến cố A: P(A) = n(A)/n(Ω), trong đó n(A) là số kết quả thuận lợi cho A, n(Ω) là số phần tử của không gian mẫu.'], scene: 1 },
    ],
    formulas: [{ expr: 'P(A) = n(A)/n(Ω)', note: 'Các kết quả đồng khả năng' }],
    examples: ['Tổng hai xúc xắc bằng 7: P = 6/36 = 1/6 (lớn nhất).', 'Chọn 2 trong 4 bạn, An được chọn: P = 1/2.'],
    exercises: [{ q: 'Tung hai đồng xu. Tính xác suất cả hai đều ngửa.', a: '1/4.' }],
  },
  't9-27': {
    opener: 'Đứng ở các vị trí khác nhau trên khán đài hình tròn, góc nhìn khung thành có bằng nhau không?',
    goals: ['Nhận biết được góc nội tiếp.', 'Giải thích được mối liên hệ giữa số đo của góc nội tiếp và số đo của cung bị chắn.'],
    sections: [
      { title: 'Góc nội tiếp', body: ['Góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung của đường tròn đó.'], scene: 1 },
      { title: 'Tính chất', body: ['Số đo góc nội tiếp bằng nửa số đo cung bị chắn.', 'Các góc nội tiếp cùng chắn một cung (hoặc chắn các cung bằng nhau) thì bằng nhau.', 'Góc nội tiếp chắn nửa đường tròn là góc vuông.'], scene: 2 },
    ],
    examples: ['Cung AB = 100° ⇒ góc nội tiếp AMB = 50°.'],
    exercises: [{ q: 'Góc nội tiếp bằng 35° chắn cung bao nhiêu độ?', a: '70°.' }],
  },
  't9-28': {
    opener: 'Ba ngôi nhà ở ba vị trí. Đặt trạm phát sóng ở đâu để cách đều cả ba nhà?',
    goals: ['Nhận biết được định nghĩa đường tròn ngoại tiếp, nội tiếp tam giác.', 'Xác định được tâm và bán kính đường tròn ngoại tiếp, nội tiếp tam giác (đặc biệt tam giác vuông, tam giác đều).'],
    sections: [
      { title: 'Đường tròn ngoại tiếp tam giác', body: ['Đường tròn đi qua ba đỉnh của tam giác. Tâm là giao điểm ba đường trung trực.', 'Tam giác vuông: tâm là trung điểm cạnh huyền, R bằng nửa cạnh huyền.'], scene: 1 },
      { title: 'Đường tròn nội tiếp tam giác', body: ['Đường tròn tiếp xúc với ba cạnh của tam giác. Tâm là giao điểm ba đường phân giác trong, luôn nằm trong tam giác.'], scene: 2 },
      { title: 'Tam giác đều', body: ['Tâm hai đường tròn trùng với trọng tâm; R = a√3/3, r = a√3/6 (a là cạnh).'], scene: 3 },
    ],
    formulas: [{ expr: 'R = a√3/3; r = a√3/6', note: 'Tam giác đều cạnh a' }],
    examples: ['Trạm phát sóng đặt tại tâm đường tròn ngoại tiếp tam giác tạo bởi ba ngôi nhà.'],
    exercises: [{ q: 'Tam giác vuông có hai cạnh góc vuông 6 cm và 8 cm. Tính R.', a: 'Cạnh huyền 10 cm ⇒ R = 5 cm.' }],
  },
  't9-29': {
    opener: 'Tứ giác nào có thể vẽ được một đường tròn đi qua cả bốn đỉnh?',
    goals: ['Nhận biết được tứ giác nội tiếp đường tròn; giải thích được định lí về tổng hai góc đối của tứ giác nội tiếp.', 'Xác định được tâm và bán kính đường tròn ngoại tiếp hình chữ nhật, hình vuông.'],
    sections: [
      { title: 'Tứ giác nội tiếp', body: ['Tứ giác có bốn đỉnh nằm trên một đường tròn gọi là tứ giác nội tiếp đường tròn.', 'Trong tứ giác nội tiếp, tổng hai góc đối bằng 180°. Ngược lại, tứ giác có tổng hai góc đối bằng 180° thì nội tiếp được đường tròn.'], scene: 1 },
      { title: 'Hình chữ nhật, hình vuông', body: ['Hình chữ nhật, hình vuông nội tiếp đường tròn có tâm là giao điểm hai đường chéo, bán kính bằng nửa đường chéo.'], scene: 3 },
    ],
    examples: ['Hình chữ nhật 6 × 8 nội tiếp đường tròn bán kính 5.'],
    exercises: [{ q: 'Tứ giác ABCD nội tiếp có Â = 70°. Tính Ĉ.', a: '110°.' }],
  },
  't9-30': {
    opener: 'Tổ ong, mặt cắt bulông, biển báo dừng xe… có dạng đa giác đều. Đa giác đều có những tính chất nào?',
    goals: ['Nhận dạng được đa giác đều.', 'Nhận biết được phép quay giữ nguyên đa giác đều; những hình phẳng đều trong tự nhiên, nghệ thuật, kiến trúc.'],
    sections: [
      { title: 'Đa giác đều', body: ['Đa giác đều là đa giác lồi có tất cả các cạnh bằng nhau và tất cả các góc bằng nhau.', 'Mỗi góc của đa giác đều n cạnh bằng (n − 2)·180°/n.'], scene: 1 },
      { title: 'Phép quay', body: ['Phép quay tâm O góc α (0° < α < 360°) giữ nguyên đa giác đều n cạnh tâm O khi α = k·360°/n.'], scene: 2 },
    ],
    formulas: [{ expr: 'Góc trong = (n − 2)·180°/n', note: 'Đa giác đều n cạnh' }],
    examples: ['Lục giác đều: mỗi góc 120°; cạnh bằng bán kính đường tròn ngoại tiếp.'],
    exercises: [{ q: 'Mỗi góc của ngũ giác đều bằng bao nhiêu?', a: '108°.' }],
  },
  't9-31': {
    opener: 'Lon nước ngọt có dạng hình trụ, chiếc nón lá có dạng hình nón. Cần bao nhiêu vật liệu để làm chúng?',
    goals: ['Mô tả được hình trụ, hình nón (đáy, mặt xung quanh, đường sinh, chiều cao, bán kính đáy).', 'Tính được diện tích xung quanh, thể tích hình trụ, hình nón.'],
    sections: [
      { title: 'Hình trụ', body: ['Quay hình chữ nhật một vòng quanh một cạnh cố định ta được hình trụ. Mặt xung quanh khai triển thành hình chữ nhật kích thước 2πr × h.', 'Sxq = 2πrh; V = πr²h.'], scene: 1 },
      { title: 'Hình nón', body: ['Quay tam giác vuông một vòng quanh một cạnh góc vuông cố định ta được hình nón. Mặt xung quanh khai triển thành hình quạt bán kính l (đường sinh).', 'Sxq = πrl; V = ⅓πr²h; l² = r² + h².'], scene: 2 },
    ],
    formulas: [
      { expr: 'Sxq trụ = 2πrh; V trụ = πr²h', note: 'Hình trụ' },
      { expr: 'Sxq nón = πrl; V nón = ⅓πr²h', note: 'Hình nón' },
    ],
    examples: ['Hộp sữa r = 4 cm, h = 10 cm: V = 160π ≈ 502,7 cm³.'],
    exercises: [{ q: 'Hình nón r = 3 cm, h = 4 cm. Tính Sxq.', a: 'l = 5 ⇒ Sxq = 15π ≈ 47,1 cm².' }],
  },
  't9-32': {
    opener: 'Quả bóng đá, viên bi, Trái Đất có dạng gần với hình cầu. Diện tích da bọc quả bóng là bao nhiêu?',
    goals: ['Mô tả được hình cầu (tâm, bán kính, đường kính, mặt cầu).', 'Tính được diện tích mặt cầu và thể tích hình cầu.'],
    sections: [
      { title: 'Hình cầu', body: ['Quay nửa hình tròn tâm O bán kính R một vòng quanh đường kính cố định ta được hình cầu tâm O, bán kính R.', 'Cắt hình cầu bởi một mặt phẳng được một hình tròn; mặt phẳng qua tâm cắt theo hình tròn lớn.'], scene: 1 },
      { title: 'Diện tích và thể tích', body: ['S = 4πR²; V = 4/3·πR³.', 'Hình cầu đặt vừa khít trong hình trụ có thể tích bằng 2/3 thể tích hình trụ (phát hiện của Archimedes).'], scene: 2 },
    ],
    formulas: [
      { expr: 'S = 4πR²', note: 'Diện tích mặt cầu' },
      { expr: 'V = 4/3·πR³', note: 'Thể tích hình cầu' },
    ],
    examples: ['Quả bóng đường kính 22 cm: S ≈ 1 520,5 cm².'],
    facts: ['Archimedes coi phát hiện “thể tích hình cầu bằng 2/3 thể tích hình trụ ngoại tiếp” là thành tựu đẹp nhất của mình và muốn hình vẽ này được khắc trên bia mộ.'],
    exercises: [{ q: 'Hình cầu bán kính 3 cm có thể tích bao nhiêu?', a: '36π ≈ 113,1 cm³.' }],
  },
};
