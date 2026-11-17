// Nội dung Toán 8 (Kết nối tri thức), tập một: Bài 1 – Bài 20.
import type { LessonContent } from '../core/types';
import { t } from '../engines/math/poly';

const D = (set: string) => ({ mode: 'derive', set, step: 0 });
const S = (set: string) => ({ mode: 'sort', set, placed: {} });
const TB = (set: string) => ({ mode: 'table', set, open: [] });
const PL = (set: string) => ({ mode: 'poly', set, sel: 0, step: 0, x: 1, y: 1 });

const P = (x: number, y: number) => ({ x, y });
export const QUAD_P = {
  free: [P(220, 500), P(620, 520), P(560, 220), P(300, 180)],
  trap: [P(160, 500), P(700, 500), P(560, 220), P(280, 220)],
  rtrap: [P(200, 500), P(680, 500), P(520, 220), P(200, 220)],
  isoTrap: [P(160, 500), P(720, 500), P(560, 220), P(320, 220)],
  para: [P(160, 500), P(560, 500), P(720, 220), P(320, 220)],
  rect: [P(200, 500), P(680, 500), P(680, 240), P(200, 240)],
  rhombus: [P(180, 360), P(440, 520), P(700, 360), P(440, 200)],
  square: [P(250, 520), P(570, 520), P(570, 200), P(250, 200)],
};
const ALL_KINDS = ['free', 'trap', 'rtrap', 'isoTrap', 'para', 'rect', 'rhombus', 'square'];
const Q = (kind: keyof typeof QUAD_P, extra: Record<string, unknown> = {}) => ({ mode: 'quad', kind, p: QUAD_P[kind], ...extra });
const TRI = [P(300, 120), P(120, 560), P(780, 560)];

const t8_1: LessonContent = {
  scenes: [
    { title: 'Đơn thức là gì?', prompt: 'Bấm vào từng biểu thức. Học sinh trả lời: có phải đơn thức không? Nếu có, tìm hệ số, phần biến, bậc.', question: 'Đơn thức là biểu thức đại số chỉ gồm những gì? Số 2024 có phải là đơn thức không, bậc mấy?', doc: { mode: 'mono', set: 'isMono', sel: 0, x: 1, y: 2 }, startHidden: true },
    { title: 'Thu gọn đơn thức', prompt: 'Thu gọn từng đơn thức: nhân các hệ số với nhau, nhân các luỹ thừa của cùng một biến.', question: 'Thu gọn đơn thức −4x²y·5xy² rồi chỉ ra hệ số, phần biến và bậc.', doc: { mode: 'mono', set: 'reduce', sel: 0, x: 1, y: 1 }, startHidden: true },
    { title: 'Đơn thức đồng dạng', prompt: 'Chọn một thẻ rồi bấm vào nhóm phù hợp. Xếp xong bấm "Kiểm tra".', question: 'Hai đơn thức 3x²y và −5yx² có đồng dạng không? Vì sao?', doc: S('likeTerms') },
    { title: 'Cộng, trừ đơn thức đồng dạng', prompt: 'Bấm "Bước tiếp" để cộng các hệ số và giữ nguyên phần biến.', question: 'Tính 3x²y + 5x²y − x²y.', doc: PL('like'), startHidden: true },
    { title: 'Giá trị của đơn thức', prompt: 'Học sinh tự tính trước, sau đó lần lượt mở từng bước.', question: 'Tính giá trị của đơn thức −3x²y tại x = −2, y = ⅓.', doc: D('b1-value') },
    { title: 'Vận dụng: diện tích mảnh vườn', prompt: 'Viết đơn thức biểu thị diện tích, sau đó tính với số liệu cụ thể.', question: 'Nếu chiều dài tăng gấp đôi thì đơn thức biểu thị diện tích thay đổi thế nào?', doc: D('b1-app') },
  ],
};

const t8_2: LessonContent = {
  scenes: [
    { title: 'Thu gọn đa thức', prompt: 'Các hạng tử đồng dạng được tô cùng màu. Bấm "Bước tiếp" để nhóm và cộng các hệ số.', question: 'Thu gọn đa thức P = x²y − 3xy + 5x²y + 2xy − 4 + y. P có bao nhiêu hạng tử? Bậc mấy?', doc: PL('collect'), startHidden: true },
    { title: 'Bậc của đa thức', prompt: 'Thu gọn từng đa thức (nhẩm) rồi xếp vào nhóm theo bậc.', question: 'Vì sao đa thức x³ − x³ + x có bậc 1 chứ không phải bậc 3?', doc: S('polyDeg') },
    { title: 'Giá trị của đa thức', prompt: 'Thay giá trị của các biến vào đa thức rồi tính.', question: 'Tính giá trị của P = x²y − 2xy + 3 tại x = 2, y = −1.', doc: D('b2-value') },
    { title: 'Thử với nhiều giá trị', prompt: 'Chọn bài, kéo thanh trượt x, y ở bảng bên phải để tính giá trị của đa thức đã thu gọn.', question: 'Tìm một cặp giá trị (x; y) để đa thức Q = 2x² + 3x − 3 có giá trị bằng −1.', doc: { mode: 'poly', set: 'collect', sel: 1, step: 4, x: 0, y: 0 } },
  ],
};

const t8_3: LessonContent = {
  scenes: [
    { title: 'Cộng hai đa thức', prompt: 'Bỏ ngoặc, nhóm các hạng tử đồng dạng rồi thu gọn.', question: 'Tính A + B với A = 3x² − 2xy + y², B = x² + 5xy − 3y².', doc: PL('addsub'), startHidden: true },
    { title: 'Trừ hai đa thức', prompt: 'Chú ý: bỏ ngoặc có dấu “−” đằng trước thì đổi dấu mọi hạng tử trong ngoặc.', question: 'Tính A − B. So sánh với B − A.', doc: { mode: 'poly', set: 'addsub', sel: 1, step: 0, x: 1, y: 1 }, startHidden: true },
    { title: 'Đa thức một biến', prompt: 'Chọn bài 3, 4: cộng, trừ hai đa thức một biến.', question: 'Kiểm tra kết quả bằng cách thay x = 1 vào cả hai vế.', doc: { mode: 'poly', set: 'addsub', sel: 2, step: 0, x: 1, y: 1 }, startHidden: true },
    { title: 'Vận dụng: chu vi tam giác', prompt: 'Viết đa thức biểu thị chu vi rồi thu gọn.', question: 'Với giá trị nào của x thì chu vi bằng 27 cm?', doc: D('b3-app') },
    { title: 'Tìm đa thức chưa biết', prompt: 'Học sinh làm trước rồi đối chiếu từng bước.', question: 'Tìm đa thức N biết N − (x² − 2xy) = 3x² + xy − 1.', doc: D('b3-find') },
  ],
};

const t8_4: LessonContent = {
  scenes: [
    { title: 'Nhân đơn thức với đa thức', prompt: 'Mỗi ô của hình chữ nhật là tích của hạng tử ở hàng với hạng tử ở cột. Bấm "Điền ô tiếp".', question: 'Diện tích hình chữ nhật cạnh 2x và 3x² − x + 4 bằng bao nhiêu?', doc: { mode: 'area', tasks: [[[t(2, 1)], [t(3, 2), t(-1, 1), t(4)]], [[t(-3, 1, 1)], [t(1, 2), t(-2, 0, 1), t(5)]]], sel: 0, step: 0 }, startHidden: true },
    { title: 'Nhân đa thức với đa thức', prompt: 'Lần lượt điền từng ô; các ô cùng màu là hạng tử đồng dạng cần thu gọn.', question: 'Tính (x + 2)(x² − 3x + 1). Có bao nhiêu tích riêng trước khi thu gọn?', doc: { mode: 'area', tasks: [[[t(1, 1), t(2)], [t(1, 2), t(-3, 1), t(1)]], [[t(2, 1), t(-1, 0, 1)], [t(1, 1), t(3, 0, 1)]], [[t(1, 1), t(3)], [t(1, 1), t(-2)]]], sel: 0, step: 0 }, startHidden: true },
    { title: 'Trình bày phép nhân', prompt: 'Chọn từng bài, bấm "Bước tiếp" để xem cách trình bày.', question: 'Tính (2x − y)(x + 3y) rồi kiểm tra tại x = 1, y = 1.', doc: PL('mul'), startHidden: true },
    { title: 'Vận dụng: diện tích hình chữ nhật', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tìm x để diện tích hình chữ nhật bằng 52 m².', doc: D('b4-app') },
    { title: 'Chứng minh đẳng thức', prompt: 'Biến đổi vế trái thành vế phải.', question: 'Chứng minh (x + 1)(x² − x + 1) = x³ + 1.', doc: D('b4-prove') },
  ],
};

const t8_5: LessonContent = {
  scenes: [
    { title: 'Chia đơn thức cho đơn thức', prompt: 'Chia hệ số cho hệ số, luỹ thừa của từng biến cho luỹ thừa cùng biến.', question: 'Khi nào đơn thức A chia hết cho đơn thức B?', doc: D('b5-mono') },
    { title: 'Chia hết hay không?', prompt: 'Xếp các đơn thức, đa thức vào nhóm, bấm "Kiểm tra".', question: 'Vì sao 4xy + x không chia hết cho 2xy?', doc: S('divisible') },
    { title: 'Mô hình: tìm cạnh còn lại', prompt: 'Biết diện tích (các ô) và một cạnh. Bấm "Tìm hạng tử tiếp" để tìm từng hạng tử của thương.', question: 'Hình chữ nhật có diện tích 6x³y² − 9x²y + 3xy và một cạnh 3xy. Cạnh kia bằng bao nhiêu?', doc: { mode: 'area', tasks: [[[t(3, 1, 1)], [t(2, 2, 1), t(-3, 1), t(1)]], [[t(4, 2)], [t(2, 2), t(-1, 1), t(3)]]], sel: 0, step: 0, divide: true }, startHidden: true },
    { title: 'Chia đa thức cho đơn thức', prompt: 'Chọn từng bài, bấm "Bước tiếp".', question: 'Thực hiện phép chia (−15x³y³ + 10x²y² − 5xy²) : (−5xy).', doc: PL('div'), startHidden: true },
    { title: 'Vận dụng: chiều dài hình chữ nhật', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính chu vi hình chữ nhật đó khi x = 2, y = 1.', doc: D('b5-app') },
  ],
};

const t8_6: LessonContent = {
  scenes: [
    { title: 'Bình phương của một tổng', prompt: 'Kéo thanh "Tách các phần": hình vuông cạnh a + b gồm 4 phần.', question: 'Diện tích hình vuông cạnh a + b bằng tổng diện tích những phần nào?', doc: { mode: 'identity', id: 'sqsum', a: 3, b: 2, t: 0 }, startHidden: true },
    { title: 'Bình phương của một hiệu', prompt: 'Kéo thanh trượt để bớt hai dải a × b khỏi hình vuông cạnh a.', question: 'Vì sao phải cộng thêm b² trong công thức (a − b)²?', doc: { mode: 'identity', id: 'sqdiff', a: 5, b: 2, t: 0 }, startHidden: true },
    { title: 'Hiệu hai bình phương', prompt: 'Kéo thanh "Cắt – ghép hình" để ghép phần còn lại thành một hình chữ nhật.', question: 'Hình chữ nhật mới có kích thước bao nhiêu? Từ đó suy ra công thức a² − b².', doc: { mode: 'identity', id: 'diff2', a: 5, b: 2, t: 0 }, startHidden: true },
    { title: 'Kiểm tra bằng phép nhân', prompt: 'Nhân đa thức rồi so sánh với hằng đẳng thức.', question: 'Có cần nhân từng hạng tử khi đã nhớ hằng đẳng thức không?', doc: PL('hdtCheck'), startHidden: true },
    { title: 'Khai triển', prompt: 'Học sinh làm trước, sau đó mở từng bước.', question: 'Khai triển (3x + 2y)².', doc: D('b6-expand') },
    { title: 'Viết thành bình phương', prompt: 'Nhận ra A, B và hạng tử 2AB.', question: 'Viết x² − 10x + 25 thành bình phương của một hiệu.', doc: D('b6-reverse') },
    { title: 'Tính nhanh', prompt: 'Thi tính nhẩm nhanh trước khi mở đáp án.', question: 'Tính nhanh 51², 49², 51 · 49.', doc: D('b6-calc') },
  ],
};

const t8_7: LessonContent = {
  scenes: [
    { title: 'Lập phương của một tổng', prompt: 'Kéo thanh "Tách các khối": khối lập phương cạnh a + b gồm 8 khối nhỏ.', question: 'Có bao nhiêu khối a²b? Bao nhiêu khối ab²? Viết công thức (a + b)³.', doc: { mode: 'identity', id: 'cubesum', a: 3, b: 1.5, t: 0 }, startHidden: true },
    { title: 'Lập phương của một hiệu', prompt: 'Khối tím là (a − b)³ nằm trong khối lập phương cạnh a. Đổi a, b và kiểm tra hai vế.', question: 'Từ (a + b)³, thay b bởi −b để suy ra công thức (a − b)³.', doc: { mode: 'identity', id: 'cubediff', a: 4, b: 1.5, t: 0.3 }, startHidden: true },
    { title: 'Khai triển', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Khai triển (x − 3)³.', doc: D('b7-expand') },
    { title: 'Tính nhanh, viết gọn', prompt: 'Áp dụng hằng đẳng thức để tính nhẩm.', question: 'Viết x³ − 6x² + 12x − 8 dưới dạng lập phương của một hiệu.', doc: D('b7-calc') },
  ],
};

const t8_8: LessonContent = {
  scenes: [
    { title: 'Hiệu hai lập phương', prompt: 'Bỏ khối b³, kéo thanh trượt để tách phần còn lại thành ba khối hộp.', question: 'Ba khối hộp có chung kích thước nào? Từ đó suy ra a³ − b³.', doc: { mode: 'identity', id: 'diff3', a: 4, b: 2, t: 0 }, startHidden: true },
    { title: 'Tổng hai lập phương', prompt: 'Đổi a, b và so sánh giá trị hai vế.', question: 'Chứng minh a³ + b³ = (a + b)(a² − ab + b²) bằng phép nhân đa thức.', doc: { mode: 'identity', id: 'sum3', a: 3, b: 2, t: 0 }, startHidden: true },
    { title: 'Kiểm tra bằng phép nhân', prompt: 'Nhân đa thức rồi quan sát các hạng tử triệt tiêu.', question: 'Vì sao (x + 2)(x² − 2x + 4) chỉ còn hai hạng tử?', doc: PL('cubeCheck'), startHidden: true },
    { title: 'Áp dụng', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Viết 8x³ + 1 dưới dạng tích.', doc: D('b8-fact') },
    { title: 'Bảy hằng đẳng thức đáng nhớ', prompt: 'Học sinh nêu công thức, bấm vào ô để kiểm tra.', question: 'Hằng đẳng thức nào có hai vế đều là tích?', doc: TB('hdt7'), startHidden: true },
  ],
};

const t8_9: LessonContent = {
  scenes: [
    { title: 'Đặt nhân tử chung', prompt: 'Tìm nhân tử chung của hệ số và của phần biến.', question: 'Phân tích 4x³ − 8x² thành nhân tử.', doc: D('b9-common') },
    { title: 'Dùng hằng đẳng thức', prompt: 'Nhận dạng hằng đẳng thức phù hợp.', question: 'Phân tích x² − 4y² và 8 − x³ thành nhân tử.', doc: D('b9-hdt') },
    { title: 'Nhóm các hạng tử', prompt: 'Nhóm sao cho mỗi nhóm có nhân tử chung, hoặc tạo thành hằng đẳng thức.', question: 'Phân tích xy + x + y + 1 thành nhân tử.', doc: D('b9-group') },
    { title: 'Chọn phương pháp', prompt: 'Xếp mỗi đa thức vào phương pháp phù hợp nhất.', question: 'Đa thức 2x³ − 8x cần dùng phối hợp những phương pháp nào?', doc: S('factorMethod') },
    { title: 'Mô hình: x² + 5x + 6 = ?', prompt: 'Biết diện tích x² + 5x + 6 là một hình chữ nhật có cạnh x + 2. Bấm tìm cạnh còn lại.', question: 'Thử phân tích x² + 7x + 12 thành tích hai nhị thức.', doc: { mode: 'area', tasks: [[[t(1, 1), t(2)], [t(1, 1), t(3)]], [[t(1, 1), t(3)], [t(1, 1), t(4)]]], sel: 0, step: 0, divide: true }, startHidden: true },
    { title: 'Ứng dụng: tìm x', prompt: 'Phân tích thành nhân tử, rồi dùng: tích bằng 0 khi một thừa số bằng 0.', question: 'Tìm x biết x² − 9 = 0.', doc: D('b9-solve') },
  ],
};

// ---------------- Chương III. Tứ giác ----------------

const t8_10: LessonContent = {
  scenes: [
    { title: 'Tứ giác', prompt: 'Kéo các đỉnh A, B, C, D. Kéo một đỉnh vào trong để có tứ giác không lồi.', question: 'Tứ giác ABCD là hình gồm những gì? Thế nào là tứ giác lồi?', doc: Q('free', { sides: true }) },
    { title: 'Tổng các góc của tứ giác', prompt: 'Kéo các đỉnh và quan sát tổng bốn góc; bật "Ghép bốn góc".', question: 'Tổng bốn góc của một tứ giác lồi bằng bao nhiêu?', doc: Q('free', { angles: true, sum: true }), startHidden: true },
    { title: 'Chứng minh', prompt: 'Kẻ một đường chéo chia tứ giác thành hai tam giác.', question: 'Vì sao chỉ cần kẻ một đường chéo?', doc: D('b10-sum') },
    { title: 'Tính góc', prompt: 'Học sinh tính trước rồi đối chiếu.', question: 'Tứ giác có ba góc bằng 90° thì góc còn lại bằng bao nhiêu?', doc: D('b10-calc') },
    { title: 'Đường chéo', prompt: 'Bật hai đường chéo. Kéo đỉnh để tạo tứ giác không lồi: đường chéo nằm ở đâu?', question: 'Hai đường chéo của tứ giác lồi luôn cắt nhau phải không?', doc: Q('free', { diag: true, angles: true }) },
  ],
};

const t8_11: LessonContent = {
  scenes: [
    { title: 'Hình thang', prompt: 'Kéo các đỉnh: AB luôn song song với CD. Chọn hình thang vuông để so sánh.', question: 'Hình thang có tổng hai góc kề một cạnh bên bằng bao nhiêu? Vì sao?', doc: Q('trap', { angles: true, marks: true, kinds: ['trap', 'rtrap', 'isoTrap'] }), startHidden: true },
    { title: 'Hình thang cân', prompt: 'Kéo các đỉnh của hình thang cân. Bật kí hiệu cạnh bằng nhau.', question: 'Hai cạnh bên của hình thang cân có bằng nhau không? Hai góc kề một đáy thì sao?', doc: Q('isoTrap', { angles: true, sides: true, marks: true }), startHidden: true },
    { title: 'Đường chéo của hình thang cân', prompt: 'Bật hai đường chéo, so sánh AC và BD.', question: 'Hình thang có hai đường chéo bằng nhau thì là hình gì?', doc: Q('isoTrap', { diag: true }), startHidden: true },
    { title: 'Chứng minh', prompt: 'Lần lượt mở từng bước.', question: 'Có thể chứng minh AC = BD bằng cách xét cặp tam giác khác không?', doc: D('b11-proof') },
    { title: 'Nhận dạng', prompt: 'Kéo đỉnh (bắt vào lưới) để tạo hình thang, hình thang vuông, hình thang cân.', question: 'Tạo một hình thang có hai cạnh bên bằng nhau nhưng không phải hình thang cân.', doc: Q('free', { angles: true, marks: true }), startHidden: true },
  ],
};

const t8_12: LessonContent = {
  scenes: [
    { title: 'Hình bình hành', prompt: 'Kéo các đỉnh A, B, D (hoặc C). Quan sát các cạnh đối, góc đối.', question: 'Hình bình hành có những tính chất gì về cạnh và góc?', doc: Q('para', { angles: true, sides: true, marks: true }), startHidden: true },
    { title: 'Hai đường chéo', prompt: 'Bật hai đường chéo, quan sát OA, OC, OB, OD.', question: 'Giao điểm hai đường chéo của hình bình hành có tính chất gì?', doc: Q('para', { diag: true, marks: true }), startHidden: true },
    { title: 'Chứng minh', prompt: 'Lần lượt mở từng bước.', question: 'Dùng tính chất này để chứng minh hình bình hành có tâm đối xứng.', doc: D('b12-proof') },
    { title: 'Dấu hiệu nhận biết', prompt: 'Kéo các đỉnh (bắt vào lưới) để tạo một hình bình hành. Kiểm tra bằng số đo.', question: 'Nêu các dấu hiệu nhận biết hình bình hành.', doc: Q('free', { sides: true, diag: true, marks: true }), startHidden: true },
  ],
};

const t8_13: LessonContent = {
  scenes: [
    { title: 'Hình chữ nhật', prompt: 'Kéo các đỉnh của hình chữ nhật, quan sát góc và đường chéo.', question: 'Hình chữ nhật có phải là hình bình hành, hình thang cân không?', doc: Q('rect', { angles: true, diag: true, marks: true }), startHidden: true },
    { title: 'Từ hình bình hành đến hình chữ nhật', prompt: 'Chọn Hình bình hành rồi kéo để có một góc vuông, hoặc chuyển sang Hình chữ nhật.', question: 'Hình bình hành cần thêm điều kiện gì để trở thành hình chữ nhật?', doc: Q('para', { angles: true, diag: true, kinds: ['para', 'rect'] }), startHidden: true },
    { title: 'Trung tuyến ứng với cạnh huyền', prompt: 'Lần lượt mở từng bước.', question: 'Tam giác vuông có cạnh huyền 10 cm thì trung tuyến ứng với cạnh huyền dài bao nhiêu?', doc: D('b13-median') },
    { title: 'Nhận dạng', prompt: 'Kéo các đỉnh (bắt vào lưới) để tạo hình chữ nhật.', question: 'Tứ giác có hai đường chéo bằng nhau có chắc là hình chữ nhật không?', doc: Q('free', { angles: true, diag: true }), startHidden: true },
  ],
};

const t8_14: LessonContent = {
  scenes: [
    { title: 'Hình thoi', prompt: 'Kéo các đỉnh; bật hai đường chéo và các góc.', question: 'Hai đường chéo của hình thoi có tính chất gì?', doc: Q('rhombus', { diag: true, marks: true, angles: true }), startHidden: true },
    { title: 'Hình vuông', prompt: 'Kéo các đỉnh của hình vuông.', question: 'Hình vuông có những tính chất của các hình nào?', doc: Q('square', { diag: true, marks: true, angles: true }), startHidden: true },
    { title: 'Các tứ giác đặc biệt', prompt: 'Chuyển qua lại giữa các loại tứ giác, quan sát các tính chất ở bảng bên phải.', question: 'Hình vuông có phải là hình thoi không? Hình thoi có phải là hình vuông không?', doc: Q('para', { diag: true, marks: true, kinds: ['para', 'rect', 'rhombus', 'square'] }), startHidden: true },
    { title: 'Dấu hiệu nhận biết', prompt: 'Xếp mỗi dấu hiệu vào hình phù hợp.', question: 'Hình bình hành có hai đường chéo vuông góc và bằng nhau là hình gì?', doc: S('quadProps') },
    { title: 'Bảng tổng kết', prompt: 'Học sinh nêu tính chất, bấm vào ô để kiểm tra.', question: 'Tứ giác nào có hai đường chéo là phân giác các góc?', doc: TB('quadSummary'), startHidden: true },
    { title: 'Vận dụng', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Hình thoi có góc A = 120° và cạnh 6 cm. Tính đường chéo AC.', doc: D('b14-app') },
  ],
};

// ---------------- Chương IV. Định lí Thalès ----------------

const t8_15: LessonContent = {
  scenes: [
    { title: 'Định lí Thalès', prompt: 'Kéo điểm M trên AB (MN luôn song song BC) và các đỉnh tam giác. So sánh các tỉ số.', question: 'Nếu MN // BC thì những tỉ số nào bằng nhau?', doc: { mode: 'thales', sub: 'thales', tri: TRI, k: 0.4 }, startHidden: true },
    { title: 'Định lí Thalès đảo', prompt: 'Kéo M trên AB và N trên AC độc lập. Khi nào MN song song với BC?', question: 'Nếu AM/AB = AN/AC thì kết luận gì về MN và BC?', doc: { mode: 'thales', sub: 'converse', tri: TRI, k: 0.4, k2: 0.6 }, startHidden: true },
    { title: 'Hệ quả', prompt: 'Kéo M, kể cả ra ngoài đoạn AB (trên đường thẳng AB).', question: 'Tỉ số MN/BC bằng tỉ số nào? Hệ quả còn đúng khi M nằm ngoài đoạn AB không?', doc: { mode: 'thales', sub: 'ext', tri: [P(420, 300), P(220, 560), P(700, 560)], k: 0.5 }, startHidden: true },
    { title: 'Tính độ dài', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính AC.', doc: D('b15-calc') },
    { title: 'Áp dụng hệ quả', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính AN biết AC = 7,5 cm.', doc: D('b15-ext') },
  ],
};

const t8_16: LessonContent = {
  scenes: [
    { title: 'Đường trung bình của tam giác', prompt: 'M, N là trung điểm của AB, AC. Kéo các đỉnh tam giác, quan sát MN và BC.', question: 'Đường trung bình MN có quan hệ gì với cạnh BC?', doc: { mode: 'thales', sub: 'mid', tri: TRI, k: 0.5 }, startHidden: true },
    { title: 'Ba đường trung bình', prompt: 'Bật "Vẽ cả ba đường trung bình".', question: 'Ba đường trung bình chia tam giác thành bao nhiêu tam giác bằng nhau? Chu vi tam giác MNP bằng bao nhiêu phần chu vi tam giác ABC?', doc: { mode: 'thales', sub: 'mid', tri: TRI, k: 0.5, all3: true }, startHidden: true },
    { title: 'Đường thẳng qua trung điểm', prompt: 'Kéo M tới trung điểm của AB (tỉ số AM/AB = 0,5): N ở đâu?', question: 'Đường thẳng đi qua trung điểm một cạnh và song song với cạnh thứ hai thì đi qua điểm nào?', doc: { mode: 'thales', sub: 'thales', tri: TRI, k: 0.3 }, startHidden: true },
    { title: 'Đo khoảng cách qua hồ', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Nếu chỉ đo được AB, AC và không vào được giữa hồ thì làm thế nào?', doc: D('b16-app') },
  ],
};

const t8_17: LessonContent = {
  scenes: [
    { title: 'Tính chất đường phân giác', prompt: 'Kéo các đỉnh tam giác; so sánh DB/DC với AB/AC.', question: 'Đường phân giác AD chia cạnh BC theo tỉ số nào?', doc: { mode: 'bisector', tri: [P(330, 130), P(110, 560), P(820, 560)] }, startHidden: true },
    { title: 'Tam giác cân', prompt: 'Kéo để AB = AC. D nằm ở đâu?', question: 'Trong tam giác cân, phân giác của góc ở đỉnh có tính chất gì?', doc: { mode: 'bisector', tri: [P(460, 120), P(200, 560), P(720, 560)] }, startHidden: true },
    { title: 'Tính độ dài', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Thay AC = 12 cm thì DB, DC bằng bao nhiêu?', doc: D('b17-calc') },
  ],
};

// ---------------- Chương V. Dữ liệu và biểu đồ ----------------

const t8_18: LessonContent = {
  scenes: [
    { title: 'Cách thu thập dữ liệu', prompt: 'Học sinh nêu cách làm và ví dụ, bấm vào ô để kiểm tra.', question: 'Muốn biết nhiệt độ cao nhất mỗi ngày trong tháng trước ở Hà Nội, ta thu thập dữ liệu bằng cách nào?', doc: TB('collectMethods'), startHidden: true },
    { title: 'Định tính hay định lượng?', prompt: 'Xếp các loại dữ liệu vào hai nhóm.', question: 'Điểm kiểm tra là dữ liệu định lượng. Còn xếp loại học lực (Tốt, Khá…) thì sao?', doc: S('dataType') },
    { title: 'Rời rạc hay liên tục?', prompt: 'Xếp các dữ liệu định lượng vào hai nhóm.', question: 'Cho thêm một ví dụ về dữ liệu liên tục.', doc: S('quantType') },
    { title: 'Dữ liệu có hợp lí không?', prompt: 'Bấm vào các dòng có dữ liệu không hợp lí, rồi bấm "Kiểm tra".', question: 'Làm thế nào để phát hiện dữ liệu không hợp lí?', doc: { mode: 'datafix', set: 'body', flagged: [] } },
    { title: 'Phát hiện lỗi trong bảng thống kê', prompt: 'Bấm vào các dòng không hợp lí.', question: 'Sửa lại dòng của lớp 8G cho đúng.', doc: { mode: 'datafix', set: 'club', flagged: [] } },
  ],
};

const t8_19: LessonContent = {
  scenes: [
    { title: 'Từ bảng đến biểu đồ', prompt: 'Đổi qua lại giữa bảng, biểu đồ tranh, biểu đồ cột. Sửa số liệu ở bảng bên phải.', question: 'Trong biểu đồ tranh, mỗi biểu tượng ứng với bao nhiêu học sinh? Biểu diễn 5 học sinh thế nào?', doc: { mode: 'chart', set: 'fruits', kind: 'table', kinds: ['table', 'picto', 'bar'], edit: true }, startHidden: true },
    { title: 'Biểu đồ hình quạt tròn', prompt: 'Chuyển giữa bảng, biểu đồ cột và quạt tròn.', question: 'Phương tiện nào chiếm tỉ lệ lớn nhất? Tính tỉ lệ phần trăm học sinh đi xe đạp.', doc: { mode: 'chart', set: 'transport', kind: 'pie', kinds: ['table', 'bar', 'pie'], edit: true }, startHidden: true },
    { title: 'Biểu đồ đoạn thẳng', prompt: 'Quan sát sự thay đổi nhiệt độ theo tháng.', question: 'Nhiệt độ cao nhất vào tháng nào? Tăng liên tục trong khoảng thời gian nào?', doc: { mode: 'chart', set: 'temp', kind: 'line', kinds: ['table', 'line', 'bar'] }, startHidden: true },
    { title: 'Biểu đồ cột kép', prompt: 'So sánh điểm trung bình của hai lớp.', question: 'Lớp nào có điểm trung bình cao hơn ở nhiều môn hơn?', doc: { mode: 'chart', set: 'scores2', kind: 'bar2', kinds: ['table', 'bar2', 'line'] }, startHidden: true },
    { title: 'Chọn biểu đồ phù hợp', prompt: 'Học sinh nêu khi nào dùng mỗi dạng biểu diễn, bấm vào ô để kiểm tra.', question: 'Muốn biểu diễn tỉ lệ các loại đất ở một tỉnh, nên dùng biểu đồ nào?', doc: TB('chartChoice'), startHidden: true },
    { title: 'Thực hành: lập biểu đồ', prompt: 'Chọn dạng biểu đồ phù hợp nhất cho dữ liệu này.', question: 'Vì sao không nên dùng biểu đồ quạt tròn cho dữ liệu này?', doc: { mode: 'chart', set: 'sport', kind: 'table', kinds: ['table', 'bar2', 'line'] } },
  ],
};

const t8_20: LessonContent = {
  scenes: [
    { title: 'Đọc và phân tích biểu đồ', prompt: 'Quan sát lượng mưa các tháng.', question: 'Mùa mưa ở TP Hồ Chí Minh kéo dài từ tháng nào đến tháng nào? Tháng nào mưa nhiều nhất?', doc: { mode: 'chart', set: 'rain', kind: 'bar', kinds: ['bar', 'line', 'table'] }, startHidden: true },
    { title: 'Xu hướng theo thời gian', prompt: 'Quan sát dân số qua các lần tổng điều tra.', question: 'Dân số tăng bao nhiêu từ 1999 đến 2019? Dự đoán dân số năm 2029.', doc: { mode: 'chart', set: 'pop', kind: 'line', kinds: ['line', 'bar', 'table'] }, startHidden: true },
    { title: 'Biểu đồ gây hiểu lầm', prompt: 'Kéo thanh "Trục đứng bắt đầu từ" lên 50: cửa hàng D trông gấp mấy lần cửa hàng A?', question: 'Vì sao biểu đồ này có thể gây hiểu lầm? Doanh thu của D thực sự hơn A bao nhiêu phần trăm?', doc: { mode: 'chart', set: 'sales', kind: 'bar', axisFrom: 0 } },
    { title: 'So sánh hai bộ dữ liệu', prompt: 'Quan sát sở thích thể thao của học sinh nam và nữ.', question: 'Môn nào được nữ yêu thích hơn nam? Rút ra nhận xét.', doc: { mode: 'chart', set: 'sport', kind: 'bar2', kinds: ['bar2', 'table'] }, startHidden: true },
  ],
};

export const MATH8A_LESSONS: Record<string, LessonContent> = {
  't8-1': t8_1,
  't8-2': t8_2,
  't8-3': t8_3,
  't8-4': t8_4,
  't8-5': t8_5,
  't8-6': t8_6,
  't8-7': t8_7,
  't8-8': t8_8,
  't8-9': t8_9,
  't8-10': t8_10,
  't8-11': t8_11,
  't8-12': t8_12,
  't8-13': t8_13,
  't8-14': t8_14,
  't8-15': t8_15,
  't8-16': t8_16,
  't8-17': t8_17,
  't8-18': t8_18,
  't8-19': t8_19,
  't8-20': t8_20,
};

export { ALL_KINDS };
