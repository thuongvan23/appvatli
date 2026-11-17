// Toán 8 (Kết nối tri thức), tập một: Bài 1 – Bài 20. Nội dung do nhóm phát triển tự biên soạn.
import type { LessonNotes } from './types';

export const NOTES_T8A: Record<string, LessonNotes> = {
  't8-1': {
    opener: 'Diện tích hình chữ nhật có chiều dài 3x, chiều rộng 2y được viết gọn thành 6xy. Biểu thức như 6xy có tên gọi là gì và có những đặc điểm nào?',
    goals: ['Nhận biết được đơn thức, đơn thức thu gọn, hệ số, phần biến và bậc của đơn thức.', 'Nhận biết được các đơn thức đồng dạng; thực hiện được phép cộng, trừ các đơn thức đồng dạng.', 'Tính được giá trị của đơn thức khi biết giá trị của các biến.'],
    sections: [
      { title: 'Đơn thức', body: ['Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.', 'Ví dụ: 3x²y; −5; z; ½xy³ là các đơn thức. Các biểu thức x + y, 2/x không phải là đơn thức.'], scene: 1 },
      { title: 'Đơn thức thu gọn', body: ['Đơn thức thu gọn là đơn thức chỉ gồm một số, hoặc có dạng tích của một số với các biến, mỗi biến chỉ xuất hiện một lần và đã được nâng lên luỹ thừa với số mũ nguyên dương.', 'Trong đơn thức thu gọn, phần số gọi là hệ số, phần còn lại gọi là phần biến.', 'Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến. Số thực khác 0 là đơn thức bậc 0; số 0 là đơn thức không có bậc.'], scene: 2 },
      { title: 'Đơn thức đồng dạng', body: ['Hai đơn thức đồng dạng là hai đơn thức với hệ số khác 0 và có cùng phần biến.', 'Để cộng (hay trừ) các đơn thức đồng dạng, ta cộng (hay trừ) các hệ số với nhau và giữ nguyên phần biến.'], scene: 3 },
    ],
    formulas: [
      { expr: 'axᵐ + bxᵐ = (a + b)xᵐ', note: 'Cộng hai đơn thức đồng dạng' },
      { expr: 'xᵐ · xⁿ = xᵐ⁺ⁿ', note: 'Dùng khi thu gọn đơn thức' },
    ],
    examples: ['2x · 3xy = 6x²y: hệ số 6, phần biến x²y, bậc 3.', '3x²y + 5x²y − x²y = 7x²y.', 'Thể tích hình hộp chữ nhật có ba kích thước x, 2x, 3y là 6x²y.'],
    facts: ['Nhà toán học Pháp François Viète (thế kỉ XVI) là người đầu tiên dùng chữ cái để kí hiệu các đại lượng, đặt nền móng cho đại số hiện đại.'],
    exercises: [
      { q: 'Thu gọn đơn thức (−2x²y) · (3xy³) rồi tìm hệ số, bậc.', a: '−6x³y⁴; hệ số −6; bậc 7.' },
      { q: 'Tính tổng 4xy² − 7xy² + 2xy².', a: '−xy².' },
      { q: 'Tính giá trị của đơn thức 5x²y tại x = −1, y = 2.', a: '5 · 1 · 2 = 10.' },
    ],
  },
  't8-2': {
    opener: 'Một mảnh đất gồm phần trồng hoa có diện tích x² và phần lối đi có diện tích 3x + 2. Biểu thức tổng diện tích x² + 3x + 2 được gọi là gì?',
    goals: ['Nhận biết được đa thức, hạng tử, đa thức thu gọn và bậc của đa thức.', 'Thu gọn được đa thức; tính được giá trị của đa thức khi biết giá trị của các biến.'],
    sections: [
      { title: 'Đa thức', body: ['Đa thức là một tổng của những đơn thức; mỗi đơn thức trong tổng gọi là một hạng tử của đa thức đó.', 'Mỗi đơn thức cũng được coi là một đa thức (chỉ có một hạng tử).'], scene: 1 },
      { title: 'Đa thức thu gọn', body: ['Đa thức thu gọn là đa thức không có hai hạng tử nào đồng dạng.', 'Để thu gọn đa thức, ta nhóm các hạng tử đồng dạng rồi cộng chúng với nhau.'], scene: 1 },
      { title: 'Bậc của đa thức', body: ['Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó.', 'Chú ý: phải thu gọn trước khi xác định bậc. Ví dụ x³ − x³ + x có bậc 1.'], scene: 2 },
      { title: 'Giá trị của đa thức', body: ['Để tính giá trị của đa thức tại các giá trị cho trước của biến, ta thay các giá trị đó vào đa thức (nên thu gọn trước) rồi thực hiện phép tính.'], scene: 3 },
    ],
    examples: ['P = x²y − 3xy + 5x²y + 2xy − 4 + y = 6x²y − xy + y − 4, bậc 3.', 'Đa thức 2x²y² − x có bậc 4.'],
    exercises: [
      { q: 'Thu gọn và tìm bậc: Q = 3x² − 2x + 5x − x² + 1 − 4.', a: 'Q = 2x² + 3x − 3; bậc 2.' },
      { q: 'Tính giá trị của Q tại x = −1.', a: 'Q = 2 − 3 − 3 = −4.' },
      { q: 'Đa thức 0 có bậc bao nhiêu?', a: 'Đa thức 0 không có bậc.' },
    ],
  },
  't8-3': {
    opener: 'Hai thửa ruộng có diện tích được biểu thị bởi hai đa thức. Làm thế nào để viết đa thức biểu thị tổng diện tích, hoặc phần chênh lệch diện tích?',
    goals: ['Thực hiện được phép cộng, phép trừ hai đa thức.', 'Vận dụng được tính chất của phép cộng đa thức trong tính toán.'],
    sections: [
      { title: 'Cộng hai đa thức', body: ['Để cộng hai đa thức, ta viết chúng thành tổng, bỏ dấu ngoặc, nhóm các hạng tử đồng dạng rồi thu gọn.'], scene: 1 },
      { title: 'Trừ hai đa thức', body: ['Để trừ đa thức A cho đa thức B, ta viết A − (B), bỏ dấu ngoặc (đổi dấu tất cả các hạng tử của B), nhóm các hạng tử đồng dạng rồi thu gọn.', 'Chú ý: A − B và B − A là hai đa thức đối nhau.'], scene: 2 },
      { title: 'Tính chất', body: ['Phép cộng đa thức có tính chất giao hoán, kết hợp: A + B = B + A; (A + B) + C = A + (B + C).', 'Quy tắc chuyển vế: nếu A + B = C thì A = C − B.'], scene: 5 },
    ],
    formulas: [{ expr: 'A − (B − C) = A − B + C', note: 'Bỏ dấu ngoặc có dấu “−” đằng trước' }],
    examples: ['(3x² − 2xy + y²) + (x² + 5xy − 3y²) = 4x² + 3xy − 2y².', '(3x² − 2xy + y²) − (x² + 5xy − 3y²) = 2x² − 7xy + 4y².'],
    exercises: [
      { q: 'Tính (x³ − 2x + 1) + (−x³ + x² + 4x − 3).', a: 'x² + 2x − 2.' },
      { q: 'Tìm M biết M − (2x² − y) = x² + 3y.', a: 'M = 3x² + 2y.' },
      { q: 'Cho A = x + y, B = x − y. Tính A + B, A − B.', a: 'A + B = 2x; A − B = 2y.' },
    ],
  },
  't8-4': {
    opener: 'Một hình chữ nhật có chiều dài x + 2 và chiều rộng x + 3. Diện tích của nó bằng bao nhiêu? Có thể viết diện tích thành một đa thức không?',
    goals: ['Thực hiện được phép nhân đơn thức với đa thức, nhân đa thức với đa thức.', 'Vận dụng phép nhân đa thức để chứng minh đẳng thức, giải bài toán thực tế.'],
    sections: [
      { title: 'Nhân đơn thức với đa thức', body: ['Muốn nhân một đơn thức với một đa thức, ta nhân đơn thức đó với từng hạng tử của đa thức rồi cộng các tích với nhau.', 'Mô hình diện tích: hình chữ nhật có một cạnh là đơn thức, cạnh kia là đa thức được chia thành các hình chữ nhật nhỏ.'], scene: 1 },
      { title: 'Nhân đa thức với đa thức', body: ['Muốn nhân một đa thức với một đa thức, ta nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng các tích với nhau, sau đó thu gọn.', 'Nếu đa thức thứ nhất có m hạng tử, đa thức thứ hai có n hạng tử thì có m · n tích riêng.'], scene: 2 },
    ],
    formulas: [
      { expr: 'A(B + C) = AB + AC', note: 'Tính chất phân phối' },
      { expr: '(A + B)(C + D) = AC + AD + BC + BD', note: 'Nhân hai nhị thức' },
    ],
    examples: ['2x(3x² − x + 4) = 6x³ − 2x² + 8x.', '(x + 2)(x² − 3x + 1) = x³ − x² − 5x + 2.', '(2x − y)(x + 3y) = 2x² + 5xy − 3y².'],
    exercises: [
      { q: 'Tính (x − 3)(x + 5).', a: 'x² + 2x − 15.' },
      { q: 'Rút gọn x(x + 2) − (x + 1)².', a: 'x² + 2x − x² − 2x − 1 = −1.' },
      { q: 'Chứng minh (x − 1)(x² + x + 1) = x³ − 1.', a: 'Nhân ra: x³ + x² + x − x² − x − 1 = x³ − 1.' },
    ],
  },
  't8-5': {
    opener: 'Biết diện tích một hình chữ nhật và một cạnh của nó (đều là các biểu thức đại số), làm sao tìm cạnh còn lại?',
    goals: ['Thực hiện được phép chia đơn thức cho đơn thức, chia đa thức cho đơn thức (trường hợp chia hết).'],
    sections: [
      { title: 'Chia đơn thức cho đơn thức', body: ['Đơn thức A chia hết cho đơn thức B (B ≠ 0) khi mỗi biến của B đều là biến của A với số mũ không lớn hơn số mũ của nó trong A.', 'Muốn chia A cho B: chia hệ số của A cho hệ số của B; chia luỹ thừa của từng biến trong A cho luỹ thừa của cùng biến đó trong B; rồi nhân các kết quả.'], scene: 1 },
      { title: 'Chia đa thức cho đơn thức', body: ['Đa thức A chia hết cho đơn thức B khi mọi hạng tử của A đều chia hết cho B.', 'Muốn chia đa thức A cho đơn thức B, ta chia từng hạng tử của A cho B rồi cộng các kết quả.'], scene: 4 },
    ],
    formulas: [{ expr: 'xᵐ : xⁿ = xᵐ⁻ⁿ (m ≥ n, x ≠ 0)', note: 'Chia hai luỹ thừa cùng cơ số' }],
    examples: ['12x⁴y³ : (−4x²y) = −3x²y².', '(6x³y² − 9x²y + 3xy) : 3xy = 2x²y − 3x + 1.'],
    exercises: [
      { q: 'Tính (8x⁴ − 4x³ + 12x²) : 4x².', a: '2x² − x + 3.' },
      { q: 'Đa thức 5x³ + 2x có chia hết cho x² không?', a: 'Không, vì hạng tử 2x không chia hết cho x².' },
      { q: 'Hình chữ nhật có diện tích 6x²y + 9xy² và chiều rộng 3xy. Tính chiều dài.', a: '2x + 3y.' },
    ],
  },
  't8-6': {
    opener: 'Không dùng máy tính, làm thế nào để tính nhanh 101², 99² hay 98 · 102?',
    goals: ['Nhận biết và vận dụng được các hằng đẳng thức: bình phương của một tổng, bình phương của một hiệu, hiệu hai bình phương.'],
    sections: [
      { title: 'Hằng đẳng thức', body: ['Hằng đẳng thức là đẳng thức mà hai vế luôn nhận giá trị bằng nhau với mọi giá trị của biến.'] },
      { title: 'Bình phương của một tổng, một hiệu', body: ['(A + B)² = A² + 2AB + B². Hình vuông cạnh a + b gồm hình vuông a², hình vuông b² và hai hình chữ nhật ab.', '(A − B)² = A² − 2AB + B².'], scene: 1 },
      { title: 'Hiệu hai bình phương', body: ['A² − B² = (A − B)(A + B). Bỏ góc b² khỏi hình vuông cạnh a, phần còn lại ghép được thành hình chữ nhật (a + b) × (a − b).'], scene: 3 },
    ],
    formulas: [
      { expr: '(A + B)² = A² + 2AB + B²', note: 'Bình phương của một tổng' },
      { expr: '(A − B)² = A² − 2AB + B²', note: 'Bình phương của một hiệu' },
      { expr: 'A² − B² = (A − B)(A + B)', note: 'Hiệu hai bình phương' },
    ],
    examples: ['101² = 10 201; 99² = 9 801; 98 · 102 = 9 996.', 'x² + 6x + 9 = (x + 3)².'],
    exercises: [
      { q: 'Khai triển (2x + 3)².', a: '4x² + 12x + 9.' },
      { q: 'Viết 4x² − 4x + 1 thành bình phương của một hiệu.', a: '(2x − 1)².' },
      { q: 'Tính nhanh 47 · 53.', a: '(50 − 3)(50 + 3) = 2 500 − 9 = 2 491.' },
    ],
  },
  't8-7': {
    opener: 'Một khối lập phương cạnh a + b được chia thành các khối nhỏ. Có thể tính thể tích của nó theo a và b mà không cần nhân ba lần không?',
    goals: ['Nhận biết và vận dụng được các hằng đẳng thức lập phương của một tổng, lập phương của một hiệu.'],
    sections: [
      { title: 'Lập phương của một tổng', body: ['(A + B)³ = A³ + 3A²B + 3AB² + B³.', 'Khối lập phương cạnh a + b gồm 8 khối: 1 khối a³, 3 khối a²b, 3 khối ab², 1 khối b³.'], scene: 1 },
      { title: 'Lập phương của một hiệu', body: ['(A − B)³ = A³ − 3A²B + 3AB² − B³. Có thể nhận được bằng cách thay B bởi −B trong công thức lập phương của một tổng.'], scene: 2 },
    ],
    formulas: [
      { expr: '(A + B)³ = A³ + 3A²B + 3AB² + B³', note: 'Lập phương của một tổng' },
      { expr: '(A − B)³ = A³ − 3A²B + 3AB² − B³', note: 'Lập phương của một hiệu' },
    ],
    examples: ['(x + 2)³ = x³ + 6x² + 12x + 8.', '11³ = (10 + 1)³ = 1 331.'],
    exercises: [
      { q: 'Khai triển (x − 1)³.', a: 'x³ − 3x² + 3x − 1.' },
      { q: 'Viết x³ + 3x² + 3x + 1 dưới dạng lập phương.', a: '(x + 1)³.' },
      { q: 'Tính giá trị x³ − 6x² + 12x − 8 tại x = 12.', a: '(x − 2)³ = 10³ = 1 000.' },
    ],
  },
  't8-8': {
    opener: 'Hiệu thể tích hai khối lập phương cạnh a và b có thể viết thành một tích được không?',
    goals: ['Nhận biết và vận dụng được các hằng đẳng thức tổng hai lập phương, hiệu hai lập phương.'],
    sections: [
      { title: 'Tổng hai lập phương', body: ['A³ + B³ = (A + B)(A² − AB + B²). Biểu thức A² − AB + B² gọi là bình phương thiếu của hiệu A − B.'], scene: 2 },
      { title: 'Hiệu hai lập phương', body: ['A³ − B³ = (A − B)(A² + AB + B²).', 'Minh hoạ: bỏ khối b³ khỏi khối a³, phần còn lại tách thành ba khối hộp có chung chiều cao a − b với đáy a², ab, b².'], scene: 1 },
      { title: 'Bảy hằng đẳng thức đáng nhớ', body: ['Các hằng đẳng thức giúp tính nhanh, rút gọn biểu thức và phân tích đa thức thành nhân tử.'], scene: 5 },
    ],
    formulas: [
      { expr: 'A³ + B³ = (A + B)(A² − AB + B²)', note: 'Tổng hai lập phương' },
      { expr: 'A³ − B³ = (A − B)(A² + AB + B²)', note: 'Hiệu hai lập phương' },
    ],
    examples: ['x³ + 8 = (x + 2)(x² − 2x + 4).', '27x³ − 1 = (3x − 1)(9x² + 3x + 1).'],
    exercises: [
      { q: 'Viết x³ − 64 dưới dạng tích.', a: '(x − 4)(x² + 4x + 16).' },
      { q: 'Rút gọn (x + 1)(x² − x + 1) − x³.', a: '1.' },
      { q: 'Tính nhanh 21³ − 1 (gợi ý: dạng hiệu hai lập phương).', a: '(21 − 1)(441 + 21 + 1) = 20 · 463 = 9 260.' },
    ],
  },
  't8-9': {
    opener: 'Muốn tìm x biết x² − 5x = 0, ta có thể viết vế trái thành tích. Viết một đa thức thành tích có lợi gì?',
    goals: ['Phân tích được đa thức thành nhân tử bằng cách: đặt nhân tử chung, sử dụng hằng đẳng thức, nhóm các hạng tử.', 'Vận dụng để tính nhanh, tìm x.'],
    sections: [
      { title: 'Phân tích đa thức thành nhân tử', body: ['Phân tích đa thức thành nhân tử (thừa số) là biến đổi đa thức đó thành một tích của những đa thức.'] },
      { title: 'Đặt nhân tử chung', body: ['AB + AC = A(B + C). Đôi khi cần đổi dấu để làm xuất hiện nhân tử chung: A = −(−A).'], scene: 1 },
      { title: 'Sử dụng hằng đẳng thức', body: ['Nhận dạng đa thức theo vế phải của một hằng đẳng thức rồi viết thành tích.'], scene: 2 },
      { title: 'Nhóm các hạng tử', body: ['Nhóm các hạng tử thích hợp để mỗi nhóm có nhân tử chung hoặc là một hằng đẳng thức, làm xuất hiện nhân tử chung của các nhóm.'], scene: 3 },
    ],
    formulas: [{ expr: 'A · B = 0 ⇔ A = 0 hoặc B = 0', note: 'Dùng để tìm x sau khi phân tích' }],
    examples: ['6x²y − 9xy² = 3xy(2x − 3y).', 'x² − xy + 3x − 3y = (x − y)(x + 3).', 'x² + 5x + 6 = (x + 2)(x + 3).'],
    exercises: [
      { q: 'Phân tích 2x³ − 8x thành nhân tử.', a: '2x(x² − 4) = 2x(x − 2)(x + 2).' },
      { q: 'Phân tích x² − 2xy + y² − 9.', a: '(x − y)² − 9 = (x − y − 3)(x − y + 3).' },
      { q: 'Tìm x biết x² − 9 = 0.', a: '(x − 3)(x + 3) = 0 ⇒ x = 3 hoặc x = −3.' },
    ],
  },
  't8-10': {
    opener: 'Khung cửa sổ, mặt bàn, viên gạch lát nền… đều có dạng tứ giác. Tổng các góc của một tứ giác bất kì bằng bao nhiêu?',
    goals: ['Mô tả được tứ giác, tứ giác lồi.', 'Giải thích được định lí về tổng các góc trong một tứ giác lồi bằng 360°.'],
    sections: [
      { title: 'Tứ giác', body: ['Tứ giác ABCD là hình gồm bốn đoạn thẳng AB, BC, CD, DA, trong đó bất kì hai đoạn thẳng nào cũng không cùng nằm trên một đường thẳng.', 'Các điểm A, B, C, D là các đỉnh; các đoạn AB, BC, CD, DA là các cạnh; AC, BD là các đường chéo.', 'Tứ giác lồi là tứ giác luôn nằm về một phía của đường thẳng chứa bất kì cạnh nào của tứ giác.'], scene: 1 },
      { title: 'Tổng các góc của tứ giác', body: ['Tổng các góc của một tứ giác bằng 360°.', 'Chứng minh: kẻ đường chéo chia tứ giác thành hai tam giác, mỗi tam giác có tổng các góc bằng 180°.'], scene: 2 },
    ],
    formulas: [{ expr: 'Â + B̂ + Ĉ + D̂ = 360°', note: 'Tổng các góc của tứ giác' }],
    examples: ['Tứ giác có Â = 80°, B̂ = 110°, Ĉ = 70° thì D̂ = 100°.', 'Tứ giác có bốn góc bằng nhau thì mỗi góc bằng 90°.'],
    exercises: [
      { q: 'Tứ giác có thể có cả bốn góc nhọn không?', a: 'Không, vì khi đó tổng bốn góc nhỏ hơn 360°.' },
      { q: 'Tứ giác ABCD có Â = 2B̂, Ĉ = D̂ = 90°. Tính Â, B̂.', a: 'Â + B̂ = 180°, 3B̂ = 180° ⇒ B̂ = 60°, Â = 120°.' },
    ],
  },
  't8-11': {
    opener: 'Mặt cắt của nhiều con đê, mái nhà có dạng hình thang với hai bên đối xứng. Hình như vậy có những tính chất gì?',
    goals: ['Giải thích được tính chất về góc kề một đáy, cạnh bên, đường chéo của hình thang cân.', 'Nhận biết được dấu hiệu để một hình thang là hình thang cân.'],
    sections: [
      { title: 'Hình thang', body: ['Hình thang là tứ giác có hai cạnh đối song song. Hai cạnh song song gọi là hai đáy, hai cạnh kia là hai cạnh bên.', 'Hình thang vuông là hình thang có một góc vuông.'], scene: 1 },
      { title: 'Hình thang cân', body: ['Hình thang cân là hình thang có hai góc kề một đáy bằng nhau.', 'Trong hình thang cân: hai cạnh bên bằng nhau; hai đường chéo bằng nhau.'], scene: 2 },
      { title: 'Dấu hiệu nhận biết', body: ['Hình thang có hai đường chéo bằng nhau là hình thang cân.', 'Chú ý: hình thang có hai cạnh bên bằng nhau chưa chắc là hình thang cân (có thể là hình bình hành).'], scene: 3 },
    ],
    examples: ['Hình thang cân ABCD (AB // CD) có Ĉ = 60° thì D̂ = 60°, Â = B̂ = 120°.'],
    exercises: [
      { q: 'Hình thang cân có một góc bằng 50°. Tính các góc còn lại.', a: '50°, 130°, 130°.' },
      { q: 'Vì sao trong hình thang, hai góc kề một cạnh bên bù nhau?', a: 'Vì chúng là hai góc trong cùng phía tạo bởi hai đường thẳng song song (hai đáy) và cạnh bên.' },
    ],
  },
  't8-12': {
    opener: 'Khi kéo giãn một chiếc thang xếp hay giàn phơi, các thanh luôn song song. Tứ giác tạo bởi các thanh đó có tính chất gì?',
    goals: ['Giải thích được tính chất về cạnh đối, góc đối, đường chéo của hình bình hành.', 'Nhận biết được các dấu hiệu nhận biết hình bình hành.'],
    sections: [
      { title: 'Hình bình hành', body: ['Hình bình hành là tứ giác có các cạnh đối song song.'], scene: 1 },
      { title: 'Tính chất', body: ['Trong hình bình hành: các cạnh đối bằng nhau; các góc đối bằng nhau; hai đường chéo cắt nhau tại trung điểm của mỗi đường.'], scene: 2 },
      { title: 'Dấu hiệu nhận biết', body: ['Tứ giác có các cạnh đối song song; hoặc các cạnh đối bằng nhau; hoặc hai cạnh đối song song và bằng nhau; hoặc các góc đối bằng nhau; hoặc hai đường chéo cắt nhau tại trung điểm mỗi đường là hình bình hành.'], scene: 4 },
    ],
    examples: ['Hình bình hành ABCD có Â = 70° thì Ĉ = 70°, B̂ = D̂ = 110°.'],
    exercises: [
      { q: 'Hình bình hành có chu vi 30 cm, AB = 9 cm. Tính BC.', a: 'AB + BC = 15 ⇒ BC = 6 cm.' },
      { q: 'Cho △ABC, M là trung điểm BC. Lấy D đối xứng với A qua M. ABDC là hình gì?', a: 'Hình bình hành (hai đường chéo cắt nhau tại trung điểm mỗi đường).' },
    ],
  },
  't8-13': {
    opener: 'Người thợ mộc kiểm tra một khung cửa có phải hình chữ nhật hay không bằng cách đo hai đường chéo. Vì sao cách làm đó đúng?',
    goals: ['Giải thích được tính chất về hai đường chéo của hình chữ nhật.', 'Nhận biết được dấu hiệu để một hình bình hành là hình chữ nhật.'],
    sections: [
      { title: 'Hình chữ nhật', body: ['Hình chữ nhật là tứ giác có bốn góc vuông. Hình chữ nhật là một hình bình hành đặc biệt, cũng là một hình thang cân đặc biệt.', 'Trong hình chữ nhật, hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường.'], scene: 1 },
      { title: 'Dấu hiệu nhận biết', body: ['Tứ giác có ba góc vuông là hình chữ nhật.', 'Hình bình hành có một góc vuông, hoặc có hai đường chéo bằng nhau, là hình chữ nhật.'], scene: 2 },
      { title: 'Áp dụng vào tam giác vuông', body: ['Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.'], scene: 3 },
    ],
    examples: ['Khung cửa là hình bình hành có hai đường chéo bằng nhau thì là hình chữ nhật.'],
    exercises: [
      { q: 'Tam giác vuông có cạnh huyền 12 cm. Tính độ dài trung tuyến ứng với cạnh huyền.', a: '6 cm.' },
      { q: 'Tứ giác có hai đường chéo bằng nhau có phải là hình chữ nhật không?', a: 'Không nhất thiết (ví dụ hình thang cân); cần thêm điều kiện hai đường chéo cắt nhau tại trung điểm mỗi đường.' },
    ],
  },
  't8-14': {
    opener: 'Mắt lưới, ô cửa, viên gạch hoa có dạng hình thoi, hình vuông. Hai hình này có những tính chất đặc biệt nào?',
    goals: ['Giải thích được tính chất về đường chéo của hình thoi, hình vuông.', 'Nhận biết được dấu hiệu để một hình bình hành là hình thoi, một hình chữ nhật là hình vuông.'],
    sections: [
      { title: 'Hình thoi', body: ['Hình thoi là tứ giác có bốn cạnh bằng nhau. Hình thoi là một hình bình hành đặc biệt.', 'Trong hình thoi: hai đường chéo vuông góc với nhau; hai đường chéo là các đường phân giác của các góc.', 'Dấu hiệu: hình bình hành có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là phân giác của một góc là hình thoi.'], scene: 1 },
      { title: 'Hình vuông', body: ['Hình vuông là tứ giác có bốn góc vuông và bốn cạnh bằng nhau. Hình vuông vừa là hình chữ nhật, vừa là hình thoi.', 'Dấu hiệu: hình chữ nhật có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc; hình thoi có một góc vuông, hoặc hai đường chéo bằng nhau là hình vuông.'], scene: 2 },
    ],
    examples: ['Hình thoi cạnh 4 cm, có một góc 60° thì đường chéo ngắn bằng 4 cm.'],
    exercises: [
      { q: 'Hình thoi có chu vi 20 cm. Tính độ dài cạnh.', a: '5 cm.' },
      { q: 'Hình chữ nhật có hai đường chéo vuông góc là hình gì?', a: 'Hình vuông.' },
      { q: 'Hình thoi ABCD có Â = 70°. Tính góc ABD.', a: 'B̂ = 110°, BD là phân giác ⇒ ABD = 55°.' },
    ],
  },
  't8-15': {
    opener: 'Làm thế nào để chia một đoạn thẳng thành 5 phần bằng nhau chỉ với thước kẻ và êke? Câu trả lời liên quan đến định lí Thalès.',
    goals: ['Giải thích được định lí Thalès trong tam giác (định lí thuận và đảo).', 'Tính được độ dài đoạn thẳng bằng cách sử dụng định lí Thalès.'],
    sections: [
      { title: 'Đoạn thẳng tỉ lệ', body: ['Tỉ số của hai đoạn thẳng là tỉ số độ dài của chúng theo cùng một đơn vị đo.', 'Hai đoạn thẳng AB và CD tỉ lệ với hai đoạn thẳng A′B′ và C′D′ nếu AB/CD = A′B′/C′D′.'] },
      { title: 'Định lí Thalès', body: ['Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ: AM/AB = AN/AC, AM/MB = AN/NC, MB/AB = NC/AC.'], scene: 1 },
      { title: 'Định lí Thalès đảo', body: ['Nếu một đường thẳng cắt hai cạnh của một tam giác và định ra trên hai cạnh này những đoạn thẳng tương ứng tỉ lệ thì đường thẳng đó song song với cạnh còn lại của tam giác.'], scene: 2 },
      { title: 'Hệ quả', body: ['Nếu một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại thì nó tạo thành một tam giác mới có ba cạnh tương ứng tỉ lệ với ba cạnh của tam giác đã cho: AM/AB = AN/AC = MN/BC. Hệ quả vẫn đúng khi đường thẳng cắt phần kéo dài của hai cạnh.'], scene: 3 },
    ],
    formulas: [{ expr: 'MN // BC ⇒ AM/AB = AN/AC = MN/BC', note: 'Định lí Thalès và hệ quả' }],
    examples: ['MN // BC, AM = 3, MB = 2, AN = 4,5 ⇒ NC = 3.', 'MN // BC, AM = 2, AB = 5, BC = 10 ⇒ MN = 4.'],
    facts: ['Theo truyền thuyết, Thalès (thế kỉ VI TCN) đã đo chiều cao kim tự tháp Ai Cập bằng cách so sánh bóng của kim tự tháp với bóng của một cây gậy.'],
    exercises: [
      { q: '△ABC có MN // BC, AM = 4, AB = 6, AC = 9. Tính AN.', a: 'AN = 9 · 4 : 6 = 6.' },
      { q: 'M ∈ AB, N ∈ AC với AM = 2, MB = 3, AN = 4, NC = 6. MN có song song BC không?', a: 'AM/MB = AN/NC = 2/3 ⇒ MN // BC (định lí Thalès đảo).' },
    ],
  },
  't8-16': {
    opener: 'Hai điểm B, C ở hai bên một hồ nước, không đo trực tiếp được. Có cách nào tính khoảng cách BC nhờ đo một đoạn ngắn hơn trên bờ?',
    goals: ['Mô tả được định nghĩa đường trung bình của tam giác.', 'Giải thích được tính chất đường trung bình của tam giác.'],
    sections: [
      { title: 'Định nghĩa', body: ['Đường trung bình của tam giác là đoạn thẳng nối trung điểm hai cạnh của tam giác. Mỗi tam giác có ba đường trung bình.'], scene: 1 },
      { title: 'Tính chất', body: ['Đường trung bình của tam giác thì song song với cạnh thứ ba và bằng nửa cạnh ấy.', 'Đường thẳng đi qua trung điểm một cạnh của tam giác và song song với cạnh thứ hai thì đi qua trung điểm của cạnh thứ ba.'], scene: 1 },
    ],
    formulas: [{ expr: 'MN = BC/2, MN // BC', note: 'M, N là trung điểm của AB, AC' }],
    examples: ['Đo được MN = 45 m (M, N là trung điểm của AB, AC) thì BC = 90 m.', 'Ba đường trung bình chia tam giác thành 4 tam giác bằng nhau; chu vi tam giác tạo bởi ba đường trung bình bằng nửa chu vi tam giác ban đầu.'],
    exercises: [
      { q: 'Tam giác có ba cạnh 6 cm, 8 cm, 10 cm. Tính chu vi tam giác tạo bởi ba đường trung bình.', a: '(6 + 8 + 10) : 2 = 12 cm.' },
      { q: 'Tứ giác ABCD có M, N, P, Q lần lượt là trung điểm các cạnh. MNPQ là hình gì?', a: 'Hình bình hành (MN và PQ cùng song song và bằng nửa AC).' },
    ],
  },
  't8-17': {
    opener: 'Tia phân giác của một góc trong tam giác chia cạnh đối diện thành hai đoạn. Hai đoạn đó có bằng nhau không?',
    goals: ['Giải thích được tính chất đường phân giác trong của tam giác.', 'Vận dụng để tính độ dài đoạn thẳng.'],
    sections: [
      { title: 'Định lí', body: ['Trong tam giác, đường phân giác của một góc chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với hai cạnh kề hai đoạn ấy.', 'Nếu AD là phân giác của góc BAC (D ∈ BC) thì DB/DC = AB/AC.'], scene: 1 },
      { title: 'Trường hợp tam giác cân', body: ['Nếu AB = AC thì DB = DC: phân giác của góc ở đỉnh cũng là đường trung tuyến.'], scene: 2 },
    ],
    formulas: [{ expr: 'DB/DC = AB/AC', note: 'AD là phân giác của góc A' }],
    examples: ['AB = 6, AC = 9, BC = 10 ⇒ DB = 4, DC = 6.'],
    exercises: [
      { q: '△ABC có AB = 5, AC = 7, phân giác AD, DB = 2,5. Tính DC.', a: 'DC = 2,5 · 7 : 5 = 3,5.' },
      { q: '△ABC có AB = 3, AC = 6, BC = 6, phân giác AD. Tính DB.', a: 'DB/DC = 1/2 ⇒ DB = 6 : 3 = 2.' },
    ],
  },
  't8-18': {
    opener: 'Muốn biết các bạn trong khối 8 thích môn thể thao nào nhất để mở câu lạc bộ, em sẽ thu thập dữ liệu bằng cách nào?',
    goals: ['Thực hiện và lí giải được việc thu thập, phân loại dữ liệu theo các tiêu chí cho trước từ nhiều nguồn khác nhau.', 'Chứng tỏ được tính hợp lí của dữ liệu theo các tiêu chí toán học đơn giản.'],
    sections: [
      { title: 'Thu thập dữ liệu', body: ['Có thể thu thập dữ liệu bằng cách quan sát, làm thí nghiệm, lập phiếu hỏi, phỏng vấn (dữ liệu trực tiếp) hoặc từ các nguồn có sẵn như sách, báo, trang web (dữ liệu gián tiếp).'], scene: 1 },
      { title: 'Phân loại dữ liệu', body: ['Dữ liệu định lượng là dữ liệu số; dữ liệu định tính là dữ liệu không phải là số (từ, kí hiệu…).', 'Dữ liệu định lượng gồm dữ liệu rời rạc (đếm được, ví dụ số học sinh) và dữ liệu liên tục (đo được, ví dụ chiều cao).', 'Dữ liệu định tính có thể có thứ bậc (ví dụ: tốt, khá, đạt) hoặc không có thứ bậc (ví dụ: màu sắc).'], scene: 2 },
      { title: 'Tính hợp lí của dữ liệu', body: ['Cần kiểm tra dữ liệu: đúng định dạng, đúng đơn vị, nằm trong phạm vi hợp lí, phù hợp với các điều kiện toán học (ví dụ tổng các tỉ lệ phần trăm của toàn thể bằng 100%).'], scene: 4 },
    ],
    examples: ['Chiều cao 1,58 cm của học sinh lớp 8 là không hợp lí.', 'Số học sinh tham gia không thể lớn hơn sĩ số lớp.'],
    exercises: [
      { q: 'Dữ liệu “thời gian tự học mỗi ngày (phút)” thuộc loại nào?', a: 'Dữ liệu định lượng, liên tục.' },
      { q: 'Bạn An khảo sát “môn học yêu thích” của 10 bạn trong tổ. Dữ liệu này có đại diện cho cả trường không?', a: 'Không, vì mẫu quá nhỏ và chỉ trong một tổ.' },
    ],
  },
  't8-19': {
    opener: 'Cùng một bộ số liệu có thể được trình bày bằng bảng, biểu đồ cột hay biểu đồ hình quạt tròn. Khi nào nên dùng loại nào?',
    goals: ['Mô tả và biểu diễn được dữ liệu vào bảng, biểu đồ thích hợp (biểu đồ tranh, cột, cột kép, hình quạt tròn, đoạn thẳng).', 'Chuyển đổi được dữ liệu từ dạng biểu diễn này sang dạng biểu diễn khác.'],
    sections: [
      { title: 'Bảng và biểu đồ', body: ['Bảng thống kê ghi đầy đủ số liệu; biểu đồ giúp nhìn nhanh, so sánh trực quan.', 'Biểu đồ tranh dùng biểu tượng, mỗi biểu tượng ứng với một số lượng nhất định.'], scene: 1 },
      { title: 'Biểu đồ hình quạt tròn', body: ['Biểu diễn tỉ lệ phần trăm của các phần so với toàn thể. Tổng các tỉ lệ bằng 100%; góc ở tâm của mỗi hình quạt tỉ lệ với tỉ lệ phần trăm (1% ứng với 3,6°).'], scene: 2 },
      { title: 'Biểu đồ đoạn thẳng', body: ['Biểu diễn sự thay đổi của một đại lượng theo thời gian.'], scene: 3 },
      { title: 'Biểu đồ cột kép', body: ['So sánh từng cặp số liệu của hai bộ dữ liệu cùng loại.'], scene: 4 },
    ],
    formulas: [{ expr: 'Tỉ lệ phần trăm = số lượng : tổng · 100%', note: 'Dùng khi vẽ biểu đồ hình quạt tròn' }],
    examples: ['20 trong 40 học sinh đi xe đạp chiếm 50%, ứng với nửa hình tròn.'],
    exercises: [
      { q: 'Muốn biểu diễn nhiệt độ mỗi giờ trong một ngày, nên dùng biểu đồ nào?', a: 'Biểu đồ đoạn thẳng.' },
      { q: 'Một phần chiếm 25% thì hình quạt tương ứng có góc ở tâm bao nhiêu độ?', a: '90°.' },
    ],
  },
  't8-20': {
    opener: 'Đọc một biểu đồ trên báo, làm sao biết được xu hướng, so sánh số liệu, và phát hiện biểu đồ có thể gây hiểu lầm?',
    goals: ['Phát hiện được vấn đề hoặc quy luật đơn giản dựa trên phân tích các số liệu thu được ở dạng biểu đồ.', 'Giải quyết được những vấn đề đơn giản liên quan đến các số liệu thu được ở dạng biểu đồ.'],
    sections: [
      { title: 'Phân tích biểu đồ', body: ['Đọc tiêu đề, đơn vị, các trục; tìm giá trị lớn nhất, nhỏ nhất; so sánh; nhận xét xu hướng tăng, giảm theo thời gian.'], scene: 1 },
      { title: 'Biểu đồ gây hiểu lầm', body: ['Trục đứng không bắt đầu từ 0, chia khoảng không đều hoặc hình vẽ không cân đối có thể làm phóng đại sự chênh lệch.'], scene: 3 },
    ],
    examples: ['Doanh thu 52 và 58 triệu chỉ chênh khoảng 11,5% nhưng nếu trục bắt đầu từ 50 thì cột D trông gấp 4 lần cột A.'],
    exercises: [
      { q: 'Dân số Việt Nam tăng bao nhiêu triệu người từ 2009 đến 2019 (theo biểu đồ)?', a: '96,2 − 85,8 = 10,4 triệu người.' },
      { q: 'Tháng nào ở TP Hồ Chí Minh có lượng mưa ít nhất?', a: 'Tháng 2 (khoảng 4 mm).' },
    ],
  },
};
