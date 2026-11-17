// Dữ liệu cho các cảnh Toán 8 – do nhóm phát triển tự biên soạn theo chương trình GDPT 2018.
// Số liệu thống kê thực tế được làm tròn, mang tính minh hoạ.
import { Poly, Term, t } from './poly';
import { DERIVE } from './mathDerive';
import { CHARTS9, DERIVE9, EXPS9, SORTS9, TABLES9 } from './math9Data';
import { CHARTS7, DERIVE7, POLY_TASKS7, SORTS7, TABLES7 } from './math7Data';
export { DERIVE };

// ---------------- Đơn thức ----------------

export const MONO_SETS: Record<string, { title: string; items: { text: string; f: Term[] | null; why?: string }[] }> = {
  isMono: {
    title: 'Biểu thức nào là đơn thức? Tìm hệ số, phần biến và bậc',
    items: [
      { text: '3x²y', f: [t(3, 2, 1)] },
      { text: '−5', f: [t(-5)] },
      { text: 'x + y', f: null, why: 'Có phép cộng giữa các biến – đây là đa thức, không phải đơn thức.' },
      { text: '½xy³', f: [t(0.5, 1, 3)] },
      { text: '2/x', f: null, why: 'Có phép chia cho biến x – không phải đơn thức.' },
      { text: 'z', f: [t(1, 0, 0, 1)] },
      { text: '−x²yz³', f: [t(-1, 2, 1, 3)] },
      { text: '4 − 2x', f: null, why: 'Có phép trừ – đây là đa thức gồm hai hạng tử.' },
      { text: '0,6x⁴', f: [t(0.6, 4)] },
      { text: '2024', f: [t(2024)] },
    ],
  },
  reduce: {
    title: 'Thu gọn đơn thức',
    items: [
      { text: '2x·3xy', f: [t(2, 1), t(3, 1, 1)] },
      { text: '−4x²y·5xy²', f: [t(-4, 2, 1), t(5, 1, 2)] },
      { text: '½x·(−6)x³y', f: [t(0.5, 1), t(-6, 3, 1)] },
      { text: 'xy·(−x)·y²', f: [t(1, 1, 1), t(-1, 1), t(1, 0, 2)] },
      { text: '3x²·2y·z', f: [t(3, 2), t(2, 0, 1), t(1, 0, 0, 1)] },
      { text: '(−2x)·(−2x)', f: [t(-2, 1), t(-2, 1)] },
    ],
  },
};

// ---------------- Xếp nhóm ----------------

export const SORTS: Record<string, { title: string; bins: string[]; items: { t: string; bin: number }[]; hint?: string }> = {
  likeTerms: {
    title: 'Xếp các đơn thức đồng dạng vào cùng một nhóm',
    bins: ['Đồng dạng với x²y', 'Đồng dạng với xy²', 'Đồng dạng với x³', 'Không thuộc các nhóm trên'],
    items: [
      { t: '3x²y', bin: 0 },
      { t: '−5yx²', bin: 0 },
      { t: '½x²y', bin: 0 },
      { t: '7xy²', bin: 1 },
      { t: '−y²x', bin: 1 },
      { t: '2,5xy²', bin: 1 },
      { t: 'x³', bin: 2 },
      { t: '−4x³', bin: 2 },
      { t: '0,2x³', bin: 2 },
      { t: 'x²y²', bin: 3 },
      { t: '5xy', bin: 3 },
      { t: '3x²', bin: 3 },
    ],
    hint: 'Hai đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và có cùng phần biến.',
  },
  polyDeg: {
    title: 'Thu gọn rồi xếp các đa thức theo bậc',
    bins: ['Bậc 1', 'Bậc 2', 'Bậc 3', 'Bậc 4'],
    items: [
      { t: 'x + 1', bin: 0 },
      { t: '3x² − x', bin: 1 },
      { t: 'x²y + 1', bin: 2 },
      { t: 'xy − 5', bin: 1 },
      { t: 'x³ − x³ + x', bin: 0 },
      { t: '2x²y² − x', bin: 3 },
      { t: '5 − 4y', bin: 0 },
      { t: 'x⁴ − x⁴ + x²y', bin: 2 },
      { t: 'x²y² − x²y² + y²', bin: 1 },
      { t: 'xy³ + x', bin: 3 },
    ],
    hint: 'Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó.',
  },
  divisible: {
    title: 'Đa thức nào chia hết cho đơn thức 2xy?',
    bins: ['Chia hết cho 2xy', 'Không chia hết cho 2xy'],
    items: [
      { t: '4x²y', bin: 0 },
      { t: '6xy³', bin: 0 },
      { t: '3x²y²', bin: 0 },
      { t: '5x³', bin: 1 },
      { t: '7y', bin: 1 },
      { t: 'x²y − 2xy', bin: 0 },
      { t: '4xy + x', bin: 1 },
      { t: '−8x²y³', bin: 0 },
    ],
    hint: 'Đơn thức A chia hết cho đơn thức B (B ≠ 0) khi mỗi biến của B đều là biến của A với số mũ không lớn hơn số mũ của nó trong A. Đa thức chia hết khi mọi hạng tử đều chia hết.',
  },
  factorMethod: {
    title: 'Chọn phương pháp phân tích đa thức thành nhân tử',
    bins: ['Đặt nhân tử chung', 'Dùng hằng đẳng thức', 'Nhóm các hạng tử'],
    items: [
      { t: '3x² − 6x', bin: 0 },
      { t: 'x² − 9', bin: 1 },
      { t: 'x² + 6x + 9', bin: 1 },
      { t: 'xy + x + y + 1', bin: 2 },
      { t: '5x³y − 10xy²', bin: 0 },
      { t: 'x³ − 8', bin: 1 },
      { t: 'x² − xy + 2x − 2y', bin: 2 },
      { t: '4x² − 25', bin: 1 },
      { t: 'x(x − 2) + 3(x − 2)', bin: 0 },
    ],
  },
  quadProps: {
    title: 'Dấu hiệu nhận biết: mỗi tứ giác dưới đây chắc chắn là hình gì?',
    bins: ['Hình bình hành', 'Hình chữ nhật', 'Hình thoi', 'Hình vuông'],
    items: [
      { t: 'Tứ giác có các cạnh đối song song', bin: 0 },
      { t: 'Tứ giác có hai đường chéo cắt nhau tại trung điểm mỗi đường', bin: 0 },
      { t: 'Tứ giác có ba góc vuông', bin: 1 },
      { t: 'Hình bình hành có một góc vuông', bin: 1 },
      { t: 'Hình bình hành có hai đường chéo bằng nhau', bin: 1 },
      { t: 'Tứ giác có bốn cạnh bằng nhau', bin: 2 },
      { t: 'Hình bình hành có hai đường chéo vuông góc', bin: 2 },
      { t: 'Hình bình hành có hai cạnh kề bằng nhau', bin: 2 },
      { t: 'Hình chữ nhật có hai cạnh kề bằng nhau', bin: 3 },
      { t: 'Hình chữ nhật có hai đường chéo vuông góc', bin: 3 },
      { t: 'Hình thoi có một góc vuông', bin: 3 },
      { t: 'Hình thoi có hai đường chéo bằng nhau', bin: 3 },
    ],
  },
  dataType: {
    title: 'Dữ liệu định tính hay dữ liệu định lượng?',
    bins: ['Dữ liệu định tính (không phải là số)', 'Dữ liệu định lượng (là số)'],
    items: [
      { t: 'Màu sắc yêu thích', bin: 0 },
      { t: 'Chiều cao (cm)', bin: 1 },
      { t: 'Môn học yêu thích', bin: 0 },
      { t: 'Số anh chị em ruột', bin: 1 },
      { t: 'Cân nặng (kg)', bin: 1 },
      { t: 'Phương tiện đến trường', bin: 0 },
      { t: 'Điểm kiểm tra môn Toán', bin: 1 },
      { t: 'Mức độ hài lòng', bin: 0 },
      { t: 'Quê quán', bin: 0 },
      { t: 'Số giờ ngủ mỗi ngày', bin: 1 },
    ],
    hint: 'Dữ liệu định lượng là các số (đo, đếm được); dữ liệu định tính là các từ, kí hiệu… mô tả tính chất.',
  },
  quantType: {
    title: 'Dữ liệu định lượng: rời rạc hay liên tục?',
    bins: ['Rời rạc (đếm được)', 'Liên tục (đo được)'],
    items: [
      { t: 'Số học sinh của mỗi lớp', bin: 0 },
      { t: 'Chiều cao của học sinh', bin: 1 },
      { t: 'Số bàn thắng trong một trận', bin: 0 },
      { t: 'Nhiệt độ trong ngày', bin: 1 },
      { t: 'Thời gian chạy 100 m', bin: 1 },
      { t: 'Số sách đã đọc trong tháng', bin: 0 },
      { t: 'Lượng mưa trong tháng', bin: 1 },
      { t: 'Số xe qua ngã tư trong 1 giờ', bin: 0 },
    ],
  },
  isLinEq: {
    title: 'Phương trình nào là phương trình bậc nhất một ẩn?',
    bins: ['Phương trình bậc nhất một ẩn', 'Không phải'],
    items: [
      { t: '2x − 1 = 0', bin: 0 },
      { t: '3 − 5x = 0', bin: 0 },
      { t: 'x² − 4 = 0', bin: 1 },
      { t: '0x + 3 = 0', bin: 1 },
      { t: '½x + 2 = 0', bin: 0 },
      { t: '1/x + 2 = 0', bin: 1 },
      { t: 'x + y = 0', bin: 1 },
      { t: '−0,5t + 7 = 0', bin: 0 },
    ],
    hint: 'Phương trình dạng ax + b = 0 với a, b là hai số đã cho và a ≠ 0 gọi là phương trình bậc nhất một ẩn.',
  },
  isLinFn: {
    title: 'Hàm số nào là hàm số bậc nhất?',
    bins: ['Hàm số bậc nhất y = ax + b (a ≠ 0)', 'Không phải hàm số bậc nhất'],
    items: [
      { t: 'y = 2x + 1', bin: 0 },
      { t: 'y = −x', bin: 0 },
      { t: 'y = 3', bin: 1 },
      { t: 'y = x² + 1', bin: 1 },
      { t: 'y = 1 − 4x', bin: 0 },
      { t: 'y = 2/x', bin: 1 },
      { t: 'y = ½x − 3', bin: 0 },
      { t: 'y = 0x + 5', bin: 1 },
      { t: 'y = 5(x − 1)', bin: 0 },
    ],
  },
};

// ---------------- Phép toán trên đa thức ----------------

export interface PolyTask {
  kind: 'collect' | 'add' | 'sub' | 'mul' | 'div';
  A: Poly;
  B?: Poly;
  name?: string;
}

export const POLY_TASKS: Record<string, { title: string; tasks: PolyTask[] }> = {
  like: {
    title: 'Cộng, trừ các đơn thức đồng dạng',
    tasks: [
      { kind: 'collect', A: [t(3, 2, 1), t(5, 2, 1), t(-1, 2, 1)] },
      { kind: 'collect', A: [t(4, 1, 2), t(-7, 1, 2), t(2, 1, 2)] },
      { kind: 'collect', A: [t(2, 3), t(-5, 1, 1), t(-6, 3), t(8, 1, 1)] },
    ],
  },
  collect: {
    title: 'Thu gọn đa thức và tìm bậc',
    tasks: [
      { kind: 'collect', name: 'P', A: [t(1, 2, 1), t(-3, 1, 1), t(5, 2, 1), t(2, 1, 1), t(-4), t(1, 0, 1)] },
      { kind: 'collect', name: 'Q', A: [t(3, 2), t(-2, 1), t(5, 1), t(-1, 2), t(1), t(-4)] },
      { kind: 'collect', name: 'R', A: [t(2, 3, 2), t(-1, 2, 1), t(4), t(-1, 3, 2), t(3, 2, 1), t(-6)] },
    ],
  },
  addsub: {
    title: 'Cộng và trừ hai đa thức',
    tasks: [
      { kind: 'add', A: [t(3, 2), t(-2, 1, 1), t(1, 0, 2)], B: [t(1, 2), t(5, 1, 1), t(-3, 0, 2)] },
      { kind: 'sub', A: [t(3, 2), t(-2, 1, 1), t(1, 0, 2)], B: [t(1, 2), t(5, 1, 1), t(-3, 0, 2)] },
      { kind: 'add', A: [t(1, 3), t(-2, 1), t(1)], B: [t(-1, 3), t(1, 2), t(4, 1), t(-3)] },
      { kind: 'sub', A: [t(1, 3), t(-2, 1), t(1)], B: [t(-1, 3), t(1, 2), t(4, 1), t(-3)] },
    ],
  },
  mul: {
    title: 'Nhân đa thức',
    tasks: [
      { kind: 'mul', A: [t(2, 1)], B: [t(3, 2), t(-1, 1), t(4)] },
      { kind: 'mul', A: [t(-3, 1, 1)], B: [t(1, 2), t(-2, 0, 1), t(5)] },
      { kind: 'mul', A: [t(1, 1), t(2)], B: [t(1, 2), t(-3, 1), t(1)] },
      { kind: 'mul', A: [t(2, 1), t(-1, 0, 1)], B: [t(1, 1), t(3, 0, 1)] },
    ],
  },
  div: {
    title: 'Chia đa thức cho đơn thức',
    tasks: [
      { kind: 'div', A: [t(6, 3, 2), t(-9, 2, 1), t(3, 1, 1)], B: [t(3, 1, 1)] },
      { kind: 'div', A: [t(8, 4), t(-4, 3), t(12, 2)], B: [t(4, 2)] },
      { kind: 'div', A: [t(-15, 3, 3), t(10, 2, 2), t(-5, 1, 2)], B: [t(-5, 1, 1)] },
    ],
  },
  hdtCheck: {
    title: 'Kiểm tra hằng đẳng thức bằng phép nhân đa thức',
    tasks: [
      { kind: 'mul', A: [t(1, 1), t(3)], B: [t(1, 1), t(3)] },
      { kind: 'mul', A: [t(2, 1), t(-1)], B: [t(2, 1), t(-1)] },
      { kind: 'mul', A: [t(1, 1), t(5)], B: [t(1, 1), t(-5)] },
    ],
  },
  cubeCheck: {
    title: 'Kiểm tra bằng phép nhân đa thức',
    tasks: [
      { kind: 'mul', A: [t(1, 2), t(2, 1), t(1)], B: [t(1, 1), t(1)] },
      { kind: 'mul', A: [t(1, 1), t(2)], B: [t(1, 2), t(-2, 1), t(4)] },
      { kind: 'mul', A: [t(1, 1), t(-1)], B: [t(1, 2), t(1, 1), t(1)] },
    ],
  },
};

// ---------------- Phân thức đại số ----------------

export const FRACS: Record<string, { label: string; num: Poly; den: Poly; simp?: { num: Poly; den: Poly; text: string; why?: string } }> = {
  f1: { label: '(x + 3)/(x − 2)', num: [t(1, 1), t(3)], den: [t(1, 1), t(-2)] },
  f2: { label: '(x² − 1)/(x + 2)', num: [t(1, 2), t(-1)], den: [t(1, 1), t(2)] },
  f3: { label: '5/(x² − 4)', num: [t(5)], den: [t(1, 2), t(-4)] },
  f4: { label: '(2x − 1)/(x² + 1)', num: [t(2, 1), t(-1)], den: [t(1, 2), t(1)] },
  s1: {
    label: '(x² − 4)/(x² + 2x)',
    num: [t(1, 2), t(-4)],
    den: [t(1, 2), t(2, 1)],
    simp: { num: [t(1, 1), t(-2)], den: [t(1, 1)], text: '(x − 2)/x', why: '(x² − 4)/(x² + 2x) = (x − 2)(x + 2) / [x(x + 2)]. Chia cả tử và mẫu cho nhân tử chung x + 2. Lưu ý: phân thức ban đầu không xác định tại x = −2 và x = 0.' },
  },
  s2: {
    label: '(x² − 1)/(x − 1)',
    num: [t(1, 2), t(-1)],
    den: [t(1, 1), t(-1)],
    simp: { num: [t(1, 1), t(1)], den: [t(1)], text: 'x + 1', why: '(x² − 1)/(x − 1) = (x − 1)(x + 1)/(x − 1) = x + 1 với x ≠ 1. Đồ thị là đường thẳng y = x + 1 bị khoét một điểm tại x = 1.' },
  },
  s3: {
    label: '(3x − 6)/(x² − 4x + 4)',
    num: [t(3, 1), t(-6)],
    den: [t(1, 2), t(-4, 1), t(4)],
    simp: { num: [t(3)], den: [t(1, 1), t(-2)], text: '3/(x − 2)', why: '(3x − 6)/(x² − 4x + 4) = 3(x − 2)/(x − 2)² = 3/(x − 2).' },
  },
};

// ---------------- Hàm số ----------------

export const FMAPS: Record<string, { label: string; title: string; xName: string; yName: string; xs: string[]; ys: string[]; pairs: [number, number][]; isFunc: boolean; why: string; table?: boolean }> = {
  f1: { label: 'Gấp đôi', title: 'Mỗi số x tương ứng với số gấp đôi nó', xName: 'x', yName: 'y', xs: ['1', '2', '3', '4'], ys: ['2', '4', '6', '8'], pairs: [[0, 0], [1, 1], [2, 2], [3, 3]], isFunc: true, why: 'Mỗi giá trị của x tương ứng với đúng một giá trị của y (y = 2x).' },
  f2: { label: 'Một x – hai y', title: 'Tương ứng giữa x và y', xName: 'x', yName: 'y', xs: ['1', '4', '9'], ys: ['−3', '−2', '−1', '1', '2', '3'], pairs: [[0, 2], [0, 3], [1, 1], [1, 4], [2, 0], [2, 5]], isFunc: false, why: 'Mỗi giá trị x tương ứng với hai giá trị y (ví dụ x = 4 ứng với y = −2 và y = 2), nên y không phải là hàm số của x.' },
  f3: { label: 'Bình phương', title: 'Mỗi số x tương ứng với bình phương của nó', xName: 'x', yName: 'y', xs: ['−2', '−1', '1', '2'], ys: ['1', '4'], pairs: [[0, 1], [1, 0], [2, 0], [3, 1]], isFunc: true, why: 'Hai giá trị x khác nhau có thể cùng ứng với một giá trị y; điều quan trọng là mỗi x chỉ ứng với một y.' },
  f4: { label: 'Quãng đường', title: 'Ô tô đi với vận tốc 40 km/h: quãng đường s (km) theo thời gian t (giờ)', xName: 't (giờ)', yName: 's (km)', xs: ['1', '2', '3', '4'], ys: ['40', '80', '120', '160'], pairs: [[0, 0], [1, 1], [2, 2], [3, 3]], isFunc: true, why: 'Mỗi giá trị của t cho đúng một giá trị của s = 40t: s là hàm số của t.', table: true },
  f5: { label: 'Bảng lỗi', title: 'Bảng giá trị tương ứng của x và y', xName: 'x', yName: 'y', xs: ['1', '2', '3', '4'], ys: ['3', '5', '6', '7', '8'], pairs: [[0, 0], [1, 1], [1, 2], [2, 3], [3, 4]], isFunc: false, why: 'Giá trị x = 2 tương ứng với hai giá trị y khác nhau (5 và 6), nên y không phải là hàm số của x.', table: true },
  f6: { label: 'Hàm hằng', title: 'Giá vé vào cửa là 20 nghìn đồng với mọi lứa tuổi từ 6 đến 9', xName: 'Tuổi', yName: 'Giá vé', xs: ['6', '7', '8', '9'], ys: ['20'], pairs: [[0, 0], [1, 0], [2, 0], [3, 0]], isFunc: true, why: 'Mọi giá trị của x đều ứng với cùng một giá trị y: y là hàm hằng.' },
};

export const FUNCS: Record<string, { label: string; f: (x: number) => number }> = {
  twoX: { label: 'y = 2x', f: (x) => 2 * x },
  negX1: { label: 'y = −x + 1', f: (x) => -x + 1 },
  halfSq: { label: 'y = 0,5x²', f: (x) => 0.5 * x * x },
};

export const LIN_CTX: Record<string, { title: string; text: string; formula: string; a: number; b: number; xMax: number; yMax: number; xName: string; yName: string; yUnit: string; step: number; gx: number; gy: number; lx: number; ly: number }> = {
  taxi: { title: 'Cước taxi', text: 'Giá mở cửa 10 nghìn đồng, sau đó mỗi kilômét 12 nghìn đồng. Gọi x là số kilômét, y là số tiền phải trả (nghìn đồng).', formula: 'y = 12x + 10', a: 12, b: 10, xMax: 20, yMax: 260, xName: 'x (km)', yName: 'y (nghìn đồng)', yUnit: 'nghìn đồng', step: 0.5, gx: 1, gy: 10, lx: 2, ly: 20 },
  saving: { title: 'Tiết kiệm', text: 'Bạn An có sẵn 200 nghìn đồng, mỗi tuần để dành thêm 50 nghìn đồng. Gọi x là số tuần, y là số tiền tiết kiệm (nghìn đồng).', formula: 'y = 50x + 200', a: 50, b: 200, xMax: 16, yMax: 1000, xName: 'x (tuần)', yName: 'y (nghìn đồng)', yUnit: 'nghìn đồng', step: 1, gx: 1, gy: 50, lx: 2, ly: 100 },
  candle: { title: 'Ngọn nến', text: 'Một ngọn nến cao 20 cm, mỗi giờ cháy ngắn đi 2 cm. Gọi x là số giờ đã cháy, y là chiều cao còn lại (cm).', formula: 'y = −2x + 20', a: -2, b: 20, xMax: 10, yMax: 22, xName: 'x (giờ)', yName: 'y (cm)', yUnit: 'cm', step: 0.5, gx: 1, gy: 1, lx: 1, ly: 2 },
};

// ---------------- Hình đồng dạng ----------------

export const HOMO_SHAPES: Record<string, { name: string; pts: [number, number][]; label: string[] }> = {
  house: { name: 'Ngôi nhà', pts: [[-40, 40], [40, 40], [40, -10], [0, -50], [-40, -10]], label: ['A', 'B', 'C', 'D', 'E'] },
  arrow: { name: 'Mũi tên', pts: [[-50, -12], [10, -12], [10, -32], [50, 0], [10, 32], [10, 12], [-50, 12]], label: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  tri: { name: 'Tam giác', pts: [[-45, 35], [50, 35], [-10, -45]], label: ['A', 'B', 'C'] },
  star: {
    name: 'Ngôi sao',
    pts: Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 ? 22 : 50;
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      return [Math.round(r * Math.cos(a)), Math.round(r * Math.sin(a))] as [number, number];
    }),
    label: ['A', '', 'B', '', 'C', '', 'D', '', 'E', ''],
  },
};

// ---------------- Biểu đồ ----------------

export const CHARTS: Record<string, { title: string; catName: string; cats: string[]; series: { name: string; vals: number[] }[]; unit: string; icon?: string; picUnit?: number; source?: string; note?: string; stepEdit?: number; rel?: boolean }> = {
  fruits: { title: 'Loại quả yêu thích của học sinh lớp 8A', catName: 'Loại quả', cats: ['Cam', 'Táo', 'Chuối', 'Xoài', 'Nho'], series: [{ name: 'Số học sinh', vals: [8, 6, 10, 12, 4] }], unit: 'học sinh', icon: '🍎', picUnit: 2, note: 'Bảng thống kê và các biểu đồ chỉ là các cách khác nhau để biểu diễn cùng một dữ liệu.' },
  transport: { title: 'Phương tiện đến trường của học sinh lớp 8B', catName: 'Phương tiện', cats: ['Đi bộ', 'Xe đạp', 'Xe buýt', 'Bố mẹ đưa'], series: [{ name: 'Số học sinh', vals: [8, 20, 5, 7] }], unit: 'học sinh', icon: '🚲', picUnit: 4, note: 'Biểu đồ hình quạt tròn biểu diễn tỉ lệ phần trăm của từng phần so với toàn thể.' },
  temp: { title: 'Nhiệt độ trung bình các tháng ở Hà Nội (°C)', catName: 'Tháng', cats: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'], series: [{ name: 'Nhiệt độ', vals: [16.4, 17.0, 20.2, 23.7, 27.3, 28.8, 28.9, 28.2, 27.2, 24.6, 21.4, 18.2] }], unit: '°C', source: 'Số liệu làm tròn, mang tính minh hoạ', note: 'Biểu đồ đoạn thẳng thích hợp để biểu diễn sự thay đổi của một đại lượng theo thời gian.' },
  scores2: { title: 'Điểm trung bình một số môn học của hai lớp 8A, 8B', catName: 'Môn học', cats: ['Toán', 'Ngữ văn', 'Tiếng Anh', 'KHTN'], series: [{ name: 'Lớp 8A', vals: [7.5, 7.0, 8.2, 7.8] }, { name: 'Lớp 8B', vals: [7.9, 7.4, 7.6, 8.1] }], unit: 'điểm', note: 'Biểu đồ cột kép dùng để so sánh hai bộ dữ liệu cùng loại.', stepEdit: 0.1 },
  rain: { title: 'Lượng mưa trung bình các tháng ở TP Hồ Chí Minh (mm)', catName: 'Tháng', cats: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'], series: [{ name: 'Lượng mưa', vals: [14, 4, 12, 42, 220, 331, 313, 268, 334, 268, 114, 48] }], unit: 'mm', source: 'Số liệu làm tròn, mang tính minh hoạ', note: 'Mùa mưa là các tháng có lượng mưa lớn (khoảng tháng 5 đến tháng 11).' },
  sales: { title: 'Doanh thu quý I của bốn cửa hàng (triệu đồng)', catName: 'Cửa hàng', cats: ['Cửa hàng A', 'Cửa hàng B', 'Cửa hàng C', 'Cửa hàng D'], series: [{ name: 'Doanh thu', vals: [52, 55, 54, 58] }], unit: 'triệu đồng', note: 'Kéo thanh trượt để trục đứng không bắt đầu từ 0: sự chênh lệch giữa các cột bị phóng đại, gây hiểu lầm.' },
  pop: { title: 'Dân số Việt Nam qua các lần tổng điều tra (triệu người)', catName: 'Năm', cats: ['1979', '1989', '1999', '2009', '2019'], series: [{ name: 'Dân số', vals: [52.7, 64.4, 76.3, 85.8, 96.2] }], unit: 'triệu người', source: 'Số liệu làm tròn, mang tính minh hoạ', note: 'Dân số tăng liên tục; hãy tính mức tăng sau mỗi 10 năm.' },
  sport: { title: 'Môn thể thao yêu thích của học sinh khối 8', catName: 'Môn', cats: ['Bóng đá', 'Cầu lông', 'Bơi', 'Bóng rổ', 'Cờ vua'], series: [{ name: 'Nam', vals: [45, 18, 12, 15, 10] }, { name: 'Nữ', vals: [8, 30, 20, 9, 13] }], unit: 'học sinh', note: 'Lập bảng, chọn biểu đồ phù hợp để so sánh sở thích của học sinh nam và nữ.' },
};

export const DATAFIX: Record<string, { title: string; intro: string; head: string[]; rows: string[][]; bad: number[]; why: Record<number, string>; hint?: string }> = {
  body: {
    title: 'Kết quả đo chiều cao, cân nặng của một nhóm học sinh lớp 8',
    intro: 'Bạn Minh ghi chép số liệu của 8 bạn. Có những dữ liệu nào không hợp lí?',
    head: ['Họ tên', 'Tuổi', 'Chiều cao (cm)', 'Cân nặng (kg)'],
    rows: [
      ['An', '13', '152', '42'],
      ['Bình', '14', '1,58', '45'],
      ['Chi', '13', '148', '39'],
      ['Dũng', '41', '160', '50'],
      ['Hà', '13', '155', '450'],
      ['Khoa', '14', '163', '52'],
      ['Lan', '13', '150', '40'],
      ['Mai', '14', '157', '46'],
    ],
    bad: [1, 3, 4],
    why: { 1: 'chiều cao 1,58 cm (có lẽ là 158 cm hoặc 1,58 m)', 3: 'học sinh lớp 8 không thể 41 tuổi', 4: 'cân nặng 450 kg là vô lí' },
    hint: 'Kiểm tra xem dữ liệu có đúng định dạng, đúng đơn vị và nằm trong phạm vi hợp lí không.',
  },
  club: {
    title: 'Số học sinh tham gia câu lạc bộ thể thao của khối 8',
    intro: 'Bảng thống kê sau có những dòng nào không hợp lí?',
    head: ['Lớp', 'Sĩ số', 'Số học sinh tham gia', 'Tỉ lệ tham gia'],
    rows: [
      ['8A', '40', '24', '60%'],
      ['8B', '38', '45', '118%'],
      ['8C', '42', '−3', '−7%'],
      ['8D', '40', '20', '50%'],
      ['8E', '36', 'nhiều', '?'],
      ['8G', '44', '22', '25%'],
    ],
    bad: [1, 2, 4, 5],
    why: { 1: 'số tham gia lớn hơn sĩ số', 2: 'số học sinh không thể âm', 4: '“nhiều” không phải là số', 5: 'tính sai tỉ lệ: 22/44 = 50%' },
  },
};

// ---------------- Phép thử ngẫu nhiên ----------------

export interface Exp {
  name: string;
  short: string;
  desc: string;
  pic: 'coin' | 'coin2' | 'die' | 'die2' | 'spinner' | 'bag' | 'cards';
  outcomes: string[];
  colors?: string[];
  events: { name: string; test: (o: string, i: number) => boolean }[];
  /** phép thử giấu thành phần (để ước lượng bằng thực nghiệm) */
  hidden?: string;
}

const isPrime = (n: number) => n > 1 && Array.from({ length: n - 2 }, (_, i) => i + 2).every((d) => n % d !== 0);
const RED = '#e11d48';
const BLUE = '#2563eb';
const YEL = '#eab308';
const WHITE = '#cbd5e1';

export const EXPS: Record<string, Exp> = {
  coin: { name: 'Tung một đồng xu', short: 'Đồng xu', desc: 'Kết quả có thể: mặt sấp (S) hoặc mặt ngửa (N). Đồng xu cân đối nên hai kết quả đồng khả năng.', pic: 'coin', outcomes: ['S', 'N'], events: [{ name: 'Xuất hiện mặt sấp', test: (o) => o === 'S' }] },
  die: {
    name: 'Gieo một con xúc xắc cân đối',
    short: 'Xúc xắc',
    desc: 'Kết quả có thể là số chấm xuất hiện: 1, 2, 3, 4, 5, 6.',
    pic: 'die',
    outcomes: ['1', '2', '3', '4', '5', '6'],
    events: [
      { name: 'Số chấm là số chẵn', test: (o) => Number(o) % 2 === 0 },
      { name: 'Số chấm là số nguyên tố', test: (o) => isPrime(Number(o)) },
      { name: 'Số chấm lớn hơn 4', test: (o) => Number(o) > 4 },
      { name: 'Số chấm chia hết cho 3', test: (o) => Number(o) % 3 === 0 },
      { name: 'Xuất hiện mặt 6 chấm', test: (o) => o === '6' },
    ],
  },
  coin2: {
    name: 'Tung hai đồng xu cân đối',
    short: 'Hai đồng xu',
    desc: 'Mỗi kết quả là một cặp mặt của đồng xu thứ nhất và đồng xu thứ hai, ví dụ SN: đồng xu thứ nhất sấp, đồng xu thứ hai ngửa.',
    pic: 'coin2',
    outcomes: ['SS', 'SN', 'NS', 'NN'],
    events: [
      { name: 'Hai mặt giống nhau', test: (o) => o[0] === o[1] },
      { name: 'Có ít nhất một mặt sấp', test: (o) => o.includes('S') },
      { name: 'Cả hai mặt đều ngửa', test: (o) => o === 'NN' },
    ],
  },
  die2: {
    name: 'Gieo hai con xúc xắc cân đối',
    short: 'Hai xúc xắc',
    desc: 'Mỗi kết quả là một cặp (số chấm xúc xắc thứ nhất; số chấm xúc xắc thứ hai). Có 6 · 6 = 36 kết quả đồng khả năng.',
    pic: 'die2',
    outcomes: Array.from({ length: 36 }, (_, i) => `(${Math.floor(i / 6) + 1};${(i % 6) + 1})`),
    events: [
      { name: 'Tổng số chấm bằng 7', test: (_, i) => Math.floor(i / 6) + 1 + (i % 6) + 1 === 7 },
      { name: 'Hai mặt có số chấm bằng nhau', test: (_, i) => Math.floor(i / 6) === i % 6 },
      { name: 'Tổng số chấm lớn hơn 9', test: (_, i) => Math.floor(i / 6) + 1 + (i % 6) + 1 > 9 },
    ],
  },
  bag: {
    name: 'Lấy ngẫu nhiên một viên bi từ túi',
    short: 'Túi bi',
    desc: 'Túi có 3 bi đỏ (Đ), 5 bi xanh (X), 2 bi vàng (V) có cùng kích thước và khối lượng. Mỗi viên bi là một kết quả có thể.',
    pic: 'bag',
    outcomes: ['Đ1', 'Đ2', 'Đ3', 'X1', 'X2', 'X3', 'X4', 'X5', 'V1', 'V2'],
    colors: [RED, RED, RED, BLUE, BLUE, BLUE, BLUE, BLUE, YEL, YEL],
    events: [
      { name: 'Lấy được bi đỏ', test: (o) => o[0] === 'Đ' },
      { name: 'Lấy được bi xanh', test: (o) => o[0] === 'X' },
      { name: 'Không lấy được bi vàng', test: (o) => o[0] !== 'V' },
    ],
  },
  cards20: {
    name: 'Rút ngẫu nhiên một thẻ trong 20 thẻ ghi số 1 đến 20',
    short: 'Thẻ số',
    desc: 'Hộp có 20 thẻ cùng loại ghi các số 1, 2, …, 20. Rút ngẫu nhiên một thẻ.',
    pic: 'cards',
    outcomes: Array.from({ length: 20 }, (_, i) => String(i + 1)),
    events: [
      { name: 'Số chia hết cho 3', test: (o) => Number(o) % 3 === 0 },
      { name: 'Số nguyên tố', test: (o) => isPrime(Number(o)) },
      { name: 'Số có hai chữ số', test: (o) => Number(o) >= 10 },
      { name: 'Số chính phương', test: (o) => Number.isInteger(Math.sqrt(Number(o))) },
    ],
  },
  spinner: {
    name: 'Quay vòng quay may mắn',
    short: 'Vòng quay',
    desc: 'Vòng quay chia thành 8 hình quạt bằng nhau ghi số 1 đến 8: các ô 1, 2, 3 màu đỏ; 4, 5, 6 màu xanh; 7, 8 màu vàng.',
    pic: 'spinner',
    outcomes: ['1', '2', '3', '4', '5', '6', '7', '8'],
    colors: [RED, RED, RED, BLUE, BLUE, BLUE, YEL, YEL],
    events: [
      { name: 'Mũi tên chỉ ô màu đỏ', test: (_, i) => i < 3 },
      { name: 'Mũi tên chỉ ô ghi số lẻ', test: (o) => Number(o) % 2 === 1 },
      { name: 'Mũi tên chỉ ô màu vàng', test: (_, i) => i >= 6 },
    ],
  },
  bagHidden: {
    name: 'Túi bi bí mật (10 viên, gồm bi đỏ và bi trắng)',
    short: 'Túi bí mật',
    desc: 'Không mở túi, hãy ước lượng số bi đỏ trong túi bằng cách lấy ngẫu nhiên một viên, ghi màu rồi trả lại, lặp lại nhiều lần.',
    pic: 'bag',
    hidden: 'Mở túi: có 7 bi đỏ và 3 bi trắng – xác suất lấy được bi đỏ là 0,7.',
    outcomes: ['Đ', 'Đ', 'Đ', 'Đ', 'Đ', 'Đ', 'Đ', 'T', 'T', 'T'],
    colors: [RED, RED, RED, RED, RED, RED, RED, WHITE, WHITE, WHITE],
    events: [{ name: 'Lấy được bi đỏ', test: (o) => o === 'Đ' }],
  },
};

// ---------------- Bảng (dùng chung kiểu "table") ----------------

export const MATH_TABLES: Record<string, { title: string; cols: string[]; rows: [string, ...string[]][] }> = {
  hdt7: {
    title: 'Bảy hằng đẳng thức đáng nhớ',
    cols: ['Công thức', 'Ví dụ'],
    rows: [
      ['Bình phương của một tổng', '(A + B)² = A² + 2AB + B²', '(x + 3)² = x² + 6x + 9'],
      ['Bình phương của một hiệu', '(A − B)² = A² − 2AB + B²', '(2x − 1)² = 4x² − 4x + 1'],
      ['Hiệu hai bình phương', 'A² − B² = (A − B)(A + B)', 'x² − 25 = (x − 5)(x + 5)'],
      ['Lập phương của một tổng', '(A + B)³ = A³ + 3A²B + 3AB² + B³', '(x + 1)³ = x³ + 3x² + 3x + 1'],
      ['Lập phương của một hiệu', '(A − B)³ = A³ − 3A²B + 3AB² − B³', '(x − 2)³ = x³ − 6x² + 12x − 8'],
      ['Tổng hai lập phương', 'A³ + B³ = (A + B)(A² − AB + B²)', 'x³ + 8 = (x + 2)(x² − 2x + 4)'],
      ['Hiệu hai lập phương', 'A³ − B³ = (A − B)(A² + AB + B²)', 'x³ − 1 = (x − 1)(x² + x + 1)'],
    ],
  },
  collectMethods: {
    title: 'Một số cách thu thập dữ liệu',
    cols: ['Cách làm', 'Ví dụ'],
    rows: [
      ['Quan sát', 'Theo dõi, ghi chép trực tiếp', 'Đếm số xe qua cổng trường từ 6 h 30 đến 7 h'],
      ['Làm thí nghiệm', 'Thực hiện và ghi lại kết quả', 'Đo nhiệt độ nước sau mỗi phút đun'],
      ['Lập phiếu hỏi', 'Phát phiếu câu hỏi cho nhiều người', 'Khảo sát môn thể thao yêu thích của khối 8'],
      ['Phỏng vấn', 'Hỏi trực tiếp và ghi lại câu trả lời', 'Hỏi ý kiến thầy cô về thư viện trường'],
      ['Thu thập từ nguồn có sẵn', 'Tra cứu sách, báo, trang web chính thống', 'Số liệu dân số trên trang của Tổng cục Thống kê'],
    ],
  },
  chartChoice: {
    title: 'Chọn dạng biểu diễn dữ liệu phù hợp',
    cols: ['Thường dùng khi', 'Ví dụ'],
    rows: [
      ['Bảng thống kê', 'Cần ghi đầy đủ số liệu cụ thể', 'Điểm kiểm tra của từng học sinh'],
      ['Biểu đồ tranh', 'Số liệu đơn giản, cần trình bày sinh động', 'Số cây trồng được của các lớp'],
      ['Biểu đồ cột', 'So sánh số liệu giữa các đối tượng', 'Số học sinh thích mỗi loại quả'],
      ['Biểu đồ cột kép', 'So sánh hai bộ dữ liệu cùng loại', 'Điểm trung bình của hai lớp'],
      ['Biểu đồ hình quạt tròn', 'Biểu diễn tỉ lệ các phần so với toàn thể', 'Tỉ lệ phương tiện đến trường'],
      ['Biểu đồ đoạn thẳng', 'Biểu diễn sự thay đổi theo thời gian', 'Nhiệt độ các tháng trong năm'],
    ],
  },
  quadSummary: {
    title: 'Tính chất các tứ giác đặc biệt',
    cols: ['Cạnh', 'Góc', 'Đường chéo'],
    rows: [
      ['Hình thang cân', 'Hai cạnh bên bằng nhau; hai đáy song song', 'Hai góc kề một đáy bằng nhau', 'Bằng nhau'],
      ['Hình bình hành', 'Các cạnh đối song song và bằng nhau', 'Các góc đối bằng nhau', 'Cắt nhau tại trung điểm mỗi đường'],
      ['Hình chữ nhật', 'Các cạnh đối song song và bằng nhau', 'Bốn góc vuông', 'Bằng nhau và cắt nhau tại trung điểm mỗi đường'],
      ['Hình thoi', 'Bốn cạnh bằng nhau; các cạnh đối song song', 'Các góc đối bằng nhau', 'Vuông góc, cắt nhau tại trung điểm mỗi đường, là phân giác các góc'],
      ['Hình vuông', 'Bốn cạnh bằng nhau; các cạnh đối song song', 'Bốn góc vuông', 'Bằng nhau, vuông góc, cắt nhau tại trung điểm mỗi đường'],
    ],
  },
  similarCases: {
    title: 'Các trường hợp đồng dạng của hai tam giác',
    cols: ['Điều kiện', 'Kí hiệu'],
    rows: [
      ['Cạnh – cạnh – cạnh', "A'B'/AB = B'C'/BC = C'A'/CA", 'c.c.c'],
      ['Cạnh – góc – cạnh', "A'B'/AB = A'C'/AC và góc A' = góc A", 'c.g.c'],
      ['Góc – góc', "Góc A' = góc A và góc B' = góc B", 'g.g'],
      ['Tam giác vuông: một góc nhọn', 'Hai tam giác vuông có một góc nhọn bằng nhau', 'g.g'],
      ['Tam giác vuông: hai cạnh góc vuông', 'Hai cạnh góc vuông tỉ lệ', 'c.g.c'],
      ['Tam giác vuông: cạnh huyền – cạnh góc vuông', 'Cạnh huyền và một cạnh góc vuông tỉ lệ', 'cạnh huyền – cạnh góc vuông'],
    ],
  },
  probTerms: {
    title: 'Các khái niệm về xác suất',
    cols: ['Ý nghĩa', 'Ví dụ: gieo một con xúc xắc'],
    rows: [
      ['Phép thử ngẫu nhiên', 'Hoạt động mà ta không biết trước kết quả', 'Gieo một con xúc xắc'],
      ['Kết quả có thể', 'Mỗi kết quả có thể xảy ra của phép thử', '1, 2, 3, 4, 5, 6 chấm'],
      ['Biến cố', 'Sự kiện có thể xảy ra hay không tuỳ kết quả của phép thử', 'A: “Số chấm là số chẵn”'],
      ['Kết quả thuận lợi', 'Kết quả làm cho biến cố xảy ra', '2, 4, 6 là các kết quả thuận lợi cho A'],
      ['Xác suất', 'Số kết quả thuận lợi : số kết quả có thể (khi đồng khả năng)', 'P(A) = 3/6 = 1/2'],
    ],
  },
  similarLife: {
    title: 'Hình đồng dạng trong thực tế',
    cols: ['Vì sao đồng dạng', 'Tỉ số đồng dạng'],
    rows: [
      ['Bản đồ và vùng đất thật', 'Mọi khoảng cách được thu nhỏ cùng một tỉ lệ', 'Tỉ lệ bản đồ, ví dụ 1 : 100 000'],
      ['Ảnh phóng to và ảnh gốc', 'Chiều dài, chiều rộng phóng to cùng một số lần', 'Ví dụ 3 (ảnh 10 × 15 → 30 × 45)'],
      ['Mô hình ô tô, máy bay', 'Mọi kích thước thu nhỏ cùng tỉ lệ', 'Ví dụ 1 : 18'],
      ['Các khổ giấy A3, A4, A5', 'Tỉ số hai cạnh của mọi khổ giấy đều bằng nhau (≈ 1,414)', 'A4 so với A3 ≈ 0,707'],
      ['Bóng của vật dưới đèn chiếu', 'Hình bóng là hình đồng dạng phối cảnh với vật, tâm là bóng đèn', 'Phụ thuộc khoảng cách tới đèn'],
    ],
  },
  pyramids: {
    title: 'So sánh hình chóp tam giác đều và hình chóp tứ giác đều',
    cols: ['Hình chóp tam giác đều', 'Hình chóp tứ giác đều'],
    rows: [
      ['Mặt đáy', 'Tam giác đều', 'Hình vuông'],
      ['Mặt bên', '3 tam giác cân bằng nhau', '4 tam giác cân bằng nhau'],
      ['Số cạnh bên – cạnh đáy', '3 – 3', '4 – 4'],
      ['Số đỉnh', '4', '5'],
      ['Diện tích xung quanh', 'Sxq = p·d', 'Sxq = p·d'],
      ['Thể tích', 'V = ⅓·S·h', 'V = ⅓·S·h'],
    ],
  },
};

export type { Poly };

// Gộp dữ liệu Toán 9
Object.assign(DERIVE, DERIVE9);
Object.assign(CHARTS, CHARTS9);
Object.assign(EXPS, EXPS9);
Object.assign(SORTS, SORTS9);
Object.assign(MATH_TABLES, TABLES9);

// Gộp dữ liệu Toán 7
Object.assign(DERIVE, DERIVE7);
Object.assign(CHARTS, CHARTS7);
Object.assign(SORTS, SORTS7);
Object.assign(MATH_TABLES, TABLES7);
Object.assign(POLY_TASKS, POLY_TASKS7);
