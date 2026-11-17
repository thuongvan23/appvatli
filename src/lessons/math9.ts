// Nội dung Toán 9 (Kết nối tri thức): Bài 1 – Bài 32.
import type { LessonContent } from '../core/types';

const D = (set: string) => ({ mode: 'derive', set, step: 0 });
const S = (set: string) => ({ mode: 'sort', set, placed: {} });
const TB = (set: string) => ({ mode: 'table', set, open: [] });
const P = (x: number, y: number) => ({ x, y });
const CI = (sub: string, extra: Record<string, unknown> = {}) => ({ mode: 'circle', sub, ...extra });
const H = true;

const L: Record<string, LessonContent> = {
  // ---------- Chương I ----------
  't9-1': {
    scenes: [
      { title: 'Phương trình bậc nhất hai ẩn', prompt: 'Kéo điểm M; điểm chuyển xanh khi toạ độ của nó thoả mãn phương trình. Đổi a, b, c.', question: 'Phương trình 2x − y = 1 có bao nhiêu nghiệm? Tập nghiệm được biểu diễn bởi hình gì?', doc: { mode: 'system', e1: [2, -1, 1], pt: { x: 0, y: 0 } }, startHidden: H },
      { title: 'Nhận biết phương trình bậc nhất hai ẩn', prompt: 'Xếp các phương trình vào nhóm.', question: 'Vì sao 0x + 0y = 7 không phải là phương trình bậc nhất hai ẩn?', doc: S('isLin2') },
      { title: 'Hệ hai phương trình', prompt: 'Kéo M tới giao điểm hai đường thẳng: đó là nghiệm của hệ.', question: 'Nghiệm của hệ hai phương trình bậc nhất hai ẩn là gì?', doc: { mode: 'system', e1: [1, 2, 0], e2: [3, -1, 7], pt: { x: 0, y: 0 } }, startHidden: H },
      { title: 'Kiểm tra nghiệm', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Cặp số (0; 0) có là nghiệm của hệ không?', doc: D('c9-check') },
    ],
  },
  't9-2': {
    scenes: [
      { title: 'Phương pháp thế', prompt: 'Lần lượt mở từng bước.', question: 'Giải hệ x + y = 5 và 2x − y = 1 bằng phương pháp thế.', doc: D('c9-sub') },
      { title: 'Phương pháp cộng đại số', prompt: 'Lần lượt mở từng bước.', question: 'Khi nào nên cộng vế, khi nào nên trừ vế?', doc: D('c9-add') },
      { title: 'Kiểm tra bằng đồ thị', prompt: 'Giao điểm hai đường thẳng là nghiệm của hệ.', question: 'Hệ x − 2y = 1, 3x + y = 10 có nghiệm (3; 1). Hai đường thẳng cắt nhau ở đâu?', doc: { mode: 'system', e1: [1, -2, 1], e2: [3, 1, 10] }, startHidden: H },
      { title: 'Số nghiệm của hệ', prompt: 'Đổi các hệ số để được hai đường thẳng song song, trùng nhau.', question: 'Hệ x + y = 2 và 2x + 2y = 5 có nghiệm không? Vì sao?', doc: { mode: 'system', e1: [1, 1, 2], e2: [2, 2, 5] }, startHidden: H },
    ],
  },
  't9-3': {
    scenes: [
      { title: 'Bài toán mua hàng', prompt: 'Ba bước: lập hệ – giải hệ – trả lời.', question: 'Mua 5 quyển vở và 5 cái bút hết bao nhiêu tiền?', doc: D('c9-word1') },
      { title: 'Bài toán chuyển động trên dòng nước', prompt: 'Vận tốc xuôi dòng = vận tốc thật + vận tốc nước.', question: 'Thả trôi một chiếc bè thì sau bao lâu bè trôi được 60 km?', doc: D('c9-word2') },
      { title: 'Minh hoạ bằng đồ thị', prompt: 'Hai phương trình x + y = 30 và x − y = 20 (đơn vị 5 km/h) cắt nhau tại nghiệm.', question: 'Đọc toạ độ giao điểm của hai đường thẳng x + y = 6 và x − y = 4.', doc: { mode: 'system', e1: [1, 1, 6], e2: [1, -1, 4] }, startHidden: H },
    ],
  },
  // ---------- Chương II ----------
  't9-4': {
    scenes: [
      { title: 'Phương trình tích', prompt: 'Tích bằng 0 khi một thừa số bằng 0.', question: 'Giải phương trình (3x − 1)(x + 4) = 0.', doc: D('c9-prod') },
      { title: 'Phương trình chứa ẩn ở mẫu', prompt: 'Chú ý bước tìm điều kiện xác định và kiểm tra nghiệm.', question: 'Vì sao x = 2 không phải là nghiệm?', doc: D('c9-frac') },
      { title: 'Một ví dụ có nghiệm', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Giải phương trình 1/(x − 2) + 3 = (x − 3)/(2 − x).', doc: D('c9-frac2') },
    ],
  },
  't9-5': {
    scenes: [
      { title: 'Cộng một số vào hai vế', prompt: 'Chọn “Cộng k”, đổi k (kể cả số âm).', question: 'Cộng cùng một số vào hai vế, chiều bất đẳng thức có thay đổi không?', doc: { mode: 'ineq', sub: 'prop', a: -2, b: 3, op: 'add', k: 4 }, startHidden: H },
      { title: 'Nhân hai vế với một số', prompt: 'Chọn “Nhân với k”, thử k dương rồi k âm.', question: 'Nhân hai vế với −2 thì chiều bất đẳng thức thế nào?', doc: { mode: 'ineq', sub: 'prop', a: -1, b: 3, op: 'mul', k: 2 }, startHidden: H },
      { title: 'So sánh hai biểu thức', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Cho a < b. So sánh 2a − 5 và 2b − 5.', doc: D('c9-ineq2') },
      { title: 'Chứng minh bất đẳng thức', prompt: 'Xét hiệu hai vế.', question: 'Chứng minh (a + b)² ≥ 4ab.', doc: D('c9-ineq') },
    ],
  },
  't9-6': {
    scenes: [
      { title: 'Bất phương trình bậc nhất một ẩn', prompt: 'Xếp vào nhóm.', question: 'Bất phương trình bậc nhất một ẩn có dạng thế nào?', doc: S('isLinIneq') },
      { title: 'Tập nghiệm trên trục số', prompt: 'Đổi a, b, dấu, c. Kéo “Thử x” để kiểm tra một giá trị có là nghiệm không.', question: 'Biểu diễn tập nghiệm của 3x − 5 > 7 trên trục số.', doc: { mode: 'ineq', sub: 'solve', a: 3, b: -5, c: 7, rel: '>', t: 2 }, startHidden: H },
      { title: 'Chia cho số âm', prompt: 'Quan sát bước chia hai vế cho a < 0.', question: 'Giải −2x + 1 ≥ 9. Điểm −4 có thuộc tập nghiệm không?', doc: { mode: 'ineq', sub: 'solve', a: -2, b: 1, c: 9, rel: '≥', t: 0 }, startHidden: H },
      { title: 'Trình bày lời giải', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Giải bất phương trình 5 − 3x < 2.', doc: D('c9-bpt') },
      { title: 'Bài toán thực tế', prompt: 'Lập bất phương trình rồi giải.', question: 'Nếu vở giá 9 nghìn đồng thì Lan mua được bao nhiêu quyển?', doc: D('c9-bptWord') },
    ],
  },
  // ---------- Chương III ----------
  't9-7': {
    scenes: [
      { title: 'Cạnh hình vuông và căn bậc hai', prompt: 'Đổi diện tích S; cạnh hình vuông là √S.', question: 'Hình vuông có diện tích 50 cm² thì cạnh khoảng bao nhiêu? Nằm giữa hai số tự nhiên nào?', doc: { mode: 'sqrt', sub: 'square', A: 50 }, startHidden: H },
      { title: 'Số chính phương', prompt: 'Thử S = 1, 4, 9, …, 100.', question: 'Với S nào thì √S là số tự nhiên?', doc: { mode: 'sqrt', sub: 'square', A: 16 }, startHidden: H },
      { title: 'Căn thức bậc hai', prompt: 'Lần lượt mở từng bước.', question: 'Tìm điều kiện để √(3 − x) xác định.', doc: D('c9-sqrt') },
    ],
  },
  't9-8': {
    scenes: [
      { title: 'Khai căn một tích, một thương', prompt: 'Lần lượt mở từng bước.', question: 'Tính √(0,09 · 64) và √(18/50).', doc: D('c9-mul') },
      { title: 'Các quy tắc biến đổi', prompt: 'Học sinh nêu công thức, bấm vào ô để kiểm tra.', question: 'Quy tắc khai căn một tích cần điều kiện gì?', doc: TB('sqrtRules'), startHidden: H },
    ],
  },
  't9-9': {
    scenes: [
      { title: 'Đưa thừa số ra ngoài, trục căn thức', prompt: 'Lần lượt mở từng bước.', question: 'Trục căn thức ở mẫu: 3/√6 và 1/(√5 − 2).', doc: D('c9-trans') },
      { title: 'Rút gọn biểu thức', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Rút gọn √8 + √18 − √32.', doc: D('c9-simp') },
      { title: 'Bảng tổng hợp', prompt: 'Bấm vào ô để kiểm tra.', question: 'Đưa thừa số vào trong dấu căn: 2√5.', doc: TB('sqrtRules'), startHidden: H },
    ],
  },
  't9-10': {
    scenes: [
      { title: 'Cạnh hình lập phương và căn bậc ba', prompt: 'Đổi thể tích V; thử 8, 27, 64, 125.', question: 'Khối lập phương có thể tích 100 cm³ thì cạnh khoảng bao nhiêu?', doc: { mode: 'sqrt', sub: 'cube', A: 27 }, startHidden: H },
      { title: 'Tính căn bậc ba', prompt: 'Lần lượt mở từng bước.', question: 'Tính ∛(−0,001).', doc: D('c9-cbrt') },
    ],
  },
  // ---------- Chương IV ----------
  't9-11': {
    scenes: [
      { title: 'Cạnh đối, cạnh kề, cạnh huyền', prompt: 'Đổi góc α. Xác định cạnh đối, cạnh kề với góc α.', question: 'Định nghĩa sin α, cos α, tan α, cot α.', doc: { mode: 'trig', sub: 'ratio', alpha: 35, size: 380 }, startHidden: H },
      { title: 'Tỉ số không phụ thuộc kích thước', prompt: 'Bật tam giác nhỏ, đổi kích thước: các tỉ số không đổi.', question: 'Vì sao tỉ số lượng giác chỉ phụ thuộc vào góc α?', doc: { mode: 'trig', sub: 'ratio', alpha: 50, size: 300, compare: true }, startHidden: H },
      { title: 'Góc đặc biệt', prompt: 'Học sinh nhớ lại, bấm vào ô để kiểm tra; đặt α = 30°, 45°, 60° để đối chiếu.', question: 'Vì sao sin 30° = cos 60°?', doc: TB('trigSpecial'), startHidden: H },
      { title: 'Tính tỉ số lượng giác', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính các tỉ số lượng giác của góc C.', doc: D('c9-trig') },
    ],
  },
  't9-12': {
    scenes: [
      { title: 'Hệ thức giữa cạnh và góc', prompt: 'Đổi góc α và kích thước; so sánh cạnh đối với huyền · sin α, cạnh kề với huyền · cos α.', question: 'Cạnh góc vuông bằng cạnh huyền nhân với sin góc nào? cos góc nào?', doc: { mode: 'trig', sub: 'ratio', alpha: 40, size: 400 }, startHidden: H },
      { title: 'Giải tam giác vuông', prompt: 'Lần lượt mở từng bước.', question: 'Giải tam giác vuông ABC (Â = 90°) biết AB = 6, Ĉ = 40°.', doc: D('c9-solveTri') },
      { title: 'Đo chiều cao bằng giác kế', prompt: 'Đổi góc nâng α, khoảng cách d.', question: 'Đứng cách tháp 30 m, góc nâng 40°, mắt cao 1,5 m. Tháp cao bao nhiêu?', doc: { mode: 'trig', sub: 'height', alpha: 35, size: 300, d: 20, h0: 1.5 }, startHidden: H },
      { title: 'Chiếc thang', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Với thang dài 5 m thì chân thang cách tường bao nhiêu để an toàn?', doc: D('c9-ramp') },
    ],
  },
  // ---------- Chương V ----------
  't9-13': {
    scenes: [
      { title: 'Điểm và đường tròn', prompt: 'Kéo điểm M, so sánh OM với R.', question: 'Đường tròn (O; R) là gì? Khi nào M nằm trong, trên, ngoài đường tròn?', doc: CI('basic', { M: P(600, 200), R: 5 }), startHidden: H },
      { title: 'Tính đối xứng', prompt: 'Bật điểm M′ đối xứng với M qua O; kéo M trên đường tròn.', question: 'Đường tròn có tâm đối xứng, trục đối xứng không?', doc: CI('basic', { M: P(560, 200), R: 5, diam: true }), startHidden: H },
      { title: 'Vị trí của điểm', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Cho (O; 4 cm), OA = 4,5 cm. A nằm ở đâu?', doc: D('c9-circle') },
    ],
  },
  't9-14': {
    scenes: [
      { title: 'Dây và đường kính', prompt: 'Kéo A, B trên đường tròn; bật đường kính.', question: 'Dây nào lớn nhất? Dây càng gần tâm thì dài hay ngắn?', doc: CI('chord', { angs: [200, 340], R: 5, diam: true }), startHidden: H },
      { title: 'Góc ở tâm và số đo cung', prompt: 'Kéo A, B; quan sát góc ở tâm, cung nhỏ, cung lớn.', question: 'Số đo cung lớn được tính thế nào?', doc: CI('chord', { angs: [30, 140], R: 5 }), startHidden: H },
      { title: 'Khoảng cách từ tâm đến dây', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Dây AB = 6 cm trong (O; 5 cm) cách tâm bao nhiêu?', doc: D('c9-chord') },
    ],
  },
  't9-15': {
    scenes: [
      { title: 'Độ dài cung, diện tích hình quạt', prompt: 'Đổi số đo cung n, bán kính R.', question: 'Cung 90° dài bằng mấy phần chu vi? Hình quạt 90° có diện tích bằng mấy phần hình tròn?', doc: CI('arc', { n: 90, R: 5, r: 3 }), startHidden: H },
      { title: 'Hình vành khuyên', prompt: 'Đổi R, r.', question: 'Diện tích hình vành khuyên được tính thế nào?', doc: CI('arc', { n: 90, R: 5, r: 3, ring: true }), startHidden: H },
      { title: 'Ví dụ: cung và hình quạt', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính độ dài cung 120° của đường tròn bán kính 3 cm.', doc: D('c9-arc') },
      { title: 'Ví dụ: đĩa CD', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính chu vi đường tròn ngoài của chiếc đĩa.', doc: D('c9-ring') },
    ],
  },
  't9-16': {
    scenes: [
      { title: 'Ba vị trí tương đối', prompt: 'Kéo thanh “Khoảng cách d”.', question: 'Khi nào đường thẳng tiếp xúc với đường tròn? Tiếp tuyến có tính chất gì?', doc: CI('line', { d: 3, R: 5 }), startHidden: H },
      { title: 'Nhận biết vị trí', prompt: 'Xếp các trường hợp vào nhóm.', question: 'Điều kiện d = R có ý nghĩa gì?', doc: S('circleLine') },
      { title: 'Hai tiếp tuyến cắt nhau', prompt: 'Kéo điểm A ở ngoài đường tròn.', question: 'So sánh AB và AC. AO có tính chất gì?', doc: CI('tangents', { M: P(720, 380), R: 4 }), startHidden: H },
      { title: 'Tính độ dài tiếp tuyến', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính góc BAC biết OA = 2R.', doc: D('c9-tangent') },
    ],
  },
  't9-17': {
    scenes: [
      { title: 'Vị trí tương đối của hai đường tròn', prompt: 'Đổi d = OO′, R, r. Quan sát số điểm chung.', question: 'So sánh d với R + r và R − r trong từng trường hợp.', doc: CI('two', { R: 4, r: 2.5, d: 5 }), startHidden: H },
      { title: 'Bảng tổng kết', prompt: 'Học sinh điền, bấm vào ô để kiểm tra.', question: 'Hai đường tròn (O; 5 cm), (O′; 3 cm), OO′ = 8 cm có vị trí nào?', doc: TB('twoCircles'), startHidden: H },
    ],
  },
  // ---------- Chương VI ----------
  't9-18': {
    scenes: [
      { title: 'Đồ thị hàm số y = ax²', prompt: 'Lập bảng giá trị rồi hiện số đo; đổi a.', question: 'Đồ thị của y = ax² có trục đối xứng là đường nào? Đỉnh ở đâu?', doc: { mode: 'parabola', sub: 'ax2', a: 1 }, startHidden: H },
      { title: 'So sánh hai parabol', prompt: 'Parabol thứ hai có a′ = −a. Đổi a, a′.', question: 'a > 0 và a < 0 thì đồ thị khác nhau thế nào? |a| lớn thì parabol thế nào?', doc: { mode: 'parabola', sub: 'ax2', a: 0.5, a2: -0.5 }, startHidden: H },
      { title: 'Xác định hệ số a', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Đồ thị y = ax² đi qua (−1; 3). Tìm a.', doc: D('c9-ax2') },
    ],
  },
  't9-19': {
    scenes: [
      { title: 'Số nghiệm và biệt thức Δ', prompt: 'Đổi a, b, c. Nghiệm là hoành độ giao điểm của parabol với trục Ox.', question: 'Dấu của Δ cho biết điều gì?', doc: { mode: 'parabola', sub: 'quad', a: 2, b: -5, c: 2 }, startHidden: H },
      { title: 'Công thức nghiệm', prompt: 'Lần lượt mở từng bước.', question: 'Giải phương trình x² − 4x − 5 = 0.', doc: D('c9-quad1') },
      { title: 'Công thức nghiệm thu gọn', prompt: 'Khi b chẵn, dùng Δ′.', question: 'Giải 3x² + 8x + 4 = 0 bằng công thức nghiệm thu gọn.', doc: D('c9-quad2') },
      { title: 'Phương trình khuyết', prompt: 'Không cần dùng Δ.', question: 'Giải 2x² − 8x = 0.', doc: D('c9-quadSp') },
    ],
  },
  't9-20': {
    scenes: [
      { title: 'Tổng và tích hai nghiệm', prompt: 'Bật định lí Viète, đổi a, b, c và so sánh với nghiệm thực tế.', question: 'x₁ + x₂ và x₁ · x₂ bằng gì theo a, b, c?', doc: { mode: 'parabola', sub: 'quad', a: 1, b: -7, c: 6, viete: true }, startHidden: H },
      { title: 'Nhẩm nghiệm', prompt: 'Lần lượt mở từng bước.', question: 'Nhẩm nghiệm của 3x² − 5x + 2 = 0.', doc: D('c9-viete') },
      { title: 'Tìm hai số biết tổng và tích', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tìm hai số có tổng −1 và tích −12.', doc: D('c9-twoNums') },
    ],
  },
  't9-21': {
    scenes: [
      { title: 'Bài toán hình học', prompt: 'Chú ý loại nghiệm không thoả mãn điều kiện.', question: 'Tính chu vi mảnh vườn.', doc: D('c9-quadWord1') },
      { title: 'Bài toán năng suất', prompt: 'Lập phương trình từ chênh lệch thời gian.', question: 'Thực tế đội trồng trong bao nhiêu ngày?', doc: D('c9-quadWord2') },
      { title: 'Kiểm tra bằng đồ thị', prompt: 'Bài toán: tìm số tự nhiên x biết x(x − 2) = 8, tức là x² − 2x − 8 = 0. Đọc nghiệm trên trục hoành.', question: 'Phương trình có hai nghiệm; nghiệm nào thoả mãn bài toán?', doc: { mode: 'parabola', sub: 'quad', a: 1, b: -2, c: -8 }, startHidden: H },
    ],
  },
  // ---------- Chương VII ----------
  't9-22': {
    scenes: [
      { title: 'Lập bảng tần số', prompt: 'Học sinh đếm, mở từng bước.', question: 'Giá trị nào có tần số lớn nhất?', doc: D('c9-freq') },
      { title: 'Bảng và biểu đồ tần số', prompt: 'Đổi qua lại giữa bảng, biểu đồ cột, đoạn thẳng.', question: 'Có bao nhiêu học sinh đạt từ 8 điểm trở lên?', doc: { mode: 'chart', set: 'scores9', kind: 'table', kinds: ['table', 'bar', 'line'] }, startHidden: H },
      { title: 'Ứng dụng', prompt: 'Quan sát biểu đồ cỡ giày.', question: 'Cửa hàng nên nhập nhiều giày cỡ nào? Vì sao?', doc: { mode: 'chart', set: 'shoes', kind: 'bar', kinds: ['table', 'bar', 'line'] }, startHidden: H },
    ],
  },
  't9-23': {
    scenes: [
      { title: 'Tần số tương đối', prompt: 'Bật “Biểu diễn tần số tương đối”: bảng có thêm hàng tần số tương đối (%).', question: 'Tần số tương đối được tính thế nào? Tổng các tần số tương đối bằng bao nhiêu?', doc: { mode: 'chart', set: 'transport9', kind: 'table', kinds: ['table', 'bar', 'pie'], rel: true }, startHidden: H },
      { title: 'Biểu đồ hình quạt tròn', prompt: 'Biểu đồ hình quạt biểu diễn tần số tương đối.', question: 'Hình quạt “Xe đạp” có góc ở tâm bao nhiêu độ?', doc: { mode: 'chart', set: 'transport9', kind: 'pie', kinds: ['table', 'bar', 'pie'], rel: true }, startHidden: H },
      { title: 'Biểu đồ cột tần số tương đối', prompt: 'Đổi qua lại tần số và tần số tương đối.', question: 'Bao nhiêu phần trăm học sinh được điểm 7?', doc: { mode: 'chart', set: 'scores9', kind: 'bar', kinds: ['table', 'bar', 'pie'], rel: true }, startHidden: H },
    ],
  },
  't9-24': {
    scenes: [
      { title: 'Ghép nhóm số liệu', prompt: 'Lần lượt mở từng bước.', question: 'Học sinh cao 160 cm thuộc nhóm nào?', doc: D('c9-group') },
      { title: 'Biểu đồ tần số ghép nhóm', prompt: 'Chuyển giữa bảng, cột liền; bật tần số tương đối.', question: 'Nhóm nào có nhiều học sinh nhất? Chiếm bao nhiêu phần trăm?', doc: { mode: 'chart', set: 'heights', kind: 'hist', kinds: ['table', 'hist', 'pie'] }, startHidden: H },
      { title: 'Thời gian tự học', prompt: 'Phân tích biểu đồ tần số tương đối ghép nhóm.', question: 'Bao nhiêu phần trăm học sinh tự học từ 60 phút trở lên?', doc: { mode: 'chart', set: 'times', kind: 'hist', kinds: ['table', 'hist', 'line'], rel: true }, startHidden: H },
    ],
  },
  // ---------- Chương VIII ----------
  't9-25': {
    scenes: [
      { title: 'Không gian mẫu', prompt: 'Chọn phép thử. Học sinh liệt kê không gian mẫu trước khi hiện số đo.', question: 'Không gian mẫu là gì? Phép thử tung đồng xu rồi gieo xúc xắc có bao nhiêu phần tử?', doc: { mode: 'prob', exp: 'coinDie', exps: ['coinDie', 'pick2', 'draw2', 'balls2', 'die2'], ev: 0, fav: false }, startHidden: H },
      { title: 'Chọn và rút có thứ tự', prompt: 'So sánh “chọn 2 bạn” (không thứ tự) với “rút lần lượt 2 thẻ” (có thứ tự).', question: 'Vì sao rút thẻ 12 và 21 là hai kết quả khác nhau, còn nhóm AB và BA là một?', doc: { mode: 'prob', exp: 'draw2', exps: ['pick2', 'draw2'], ev: 0, fav: false }, startHidden: H },
      { title: 'Các khái niệm', prompt: 'Bấm vào ô để kiểm tra.', question: 'Biến cố liên quan tới phép thử là gì?', doc: TB('probTerms'), startHidden: H },
    ],
  },
  't9-26': {
    scenes: [
      { title: 'Xác suất của biến cố', prompt: 'Chọn phép thử và biến cố; học sinh tính trước khi hiện số đo.', question: 'Tính xác suất “hai viên cùng màu” khi lấy có hoàn lại.', doc: { mode: 'prob', exp: 'balls2', exps: ['coinDie', 'pick2', 'draw2', 'balls2', 'die2'], ev: 0 }, startHidden: H },
      { title: 'Tung hai đồng xu', prompt: 'Lần lượt mở từng bước.', question: 'Tính xác suất có ít nhất một đồng xu sấp.', doc: D('c9-prob1') },
      { title: 'Chọn hai bạn', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính xác suất Chi và Dũng cùng được chọn.', doc: D('c9-prob2') },
      { title: 'Kiểm chứng bằng thực nghiệm', prompt: 'Gieo hai xúc xắc nhiều lần; so sánh với xác suất 1/6.', question: 'Sau 1 000 lần, xác suất thực nghiệm của “tổng bằng 7” xấp xỉ bao nhiêu?', doc: { mode: 'experiment', exp: 'die2', ev: 0, trials: 0, hits: 0, pts: [] }, startHidden: H },
    ],
  },
  // ---------- Chương IX ----------
  't9-27': {
    scenes: [
      { title: 'Góc nội tiếp', prompt: 'Kéo M trên đường tròn (không vượt qua A, B).', question: 'Góc AMB thay đổi thế nào? So sánh với số đo cung bị chắn.', doc: CI('inscribed', { angs: [210, 330, 100], R: 5 }), startHidden: H },
      { title: 'Góc nội tiếp chắn nửa đường tròn', prompt: 'A, B là hai đầu đường kính. Kéo M.', question: 'Góc nội tiếp chắn nửa đường tròn bằng bao nhiêu độ?', doc: CI('inscribed', { angs: [180, 0, 120], R: 5 }), startHidden: H },
      { title: 'Tính góc', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Cung AB = 70°. Tính góc nội tiếp chắn cung đó.', doc: D('c9-inscribed') },
    ],
  },
  't9-28': {
    scenes: [
      { title: 'Đường tròn ngoại tiếp tam giác', prompt: 'Kéo các đỉnh. Khi nào tâm O nằm trong, trên cạnh, ngoài tam giác?', question: 'Tâm đường tròn ngoại tiếp là giao của các đường nào?', doc: CI('tri', { outer: true }), startHidden: H },
      { title: 'Đường tròn nội tiếp tam giác', prompt: 'Bật đường tròn nội tiếp; kéo các đỉnh.', question: 'Tâm đường tròn nội tiếp là giao của các đường nào? Vì sao nó luôn nằm trong tam giác?', doc: CI('tri', { inner: true }), startHidden: H },
      { title: 'Tam giác đều', prompt: 'Bật cả hai đường tròn; kéo để được tam giác (gần) đều.', question: 'Tam giác đều có tâm hai đường tròn trùng nhau không? Tỉ số R : r?', doc: CI('tri', { outer: true, inner: true, tri: [P(380, 110), P(150, 510), P(610, 510)] }), startHidden: H },
      { title: 'Tính bán kính', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tam giác đều cạnh 9 cm có R, r bằng bao nhiêu?', doc: D('c9-eqTri') },
    ],
  },
  't9-29': {
    scenes: [
      { title: 'Tứ giác nội tiếp', prompt: 'Kéo các đỉnh trên đường tròn; quan sát tổng hai góc đối.', question: 'Tứ giác nội tiếp có tính chất gì về góc?', doc: CI('cyclic', { angs: [130, 210, 320, 50], R: 5 }), startHidden: H },
      { title: 'Khi D rời khỏi đường tròn', prompt: 'Bật “D di chuyển tự do”, kéo D vào trong hoặc ra ngoài.', question: 'Tứ giác có Â + Ĉ = 180° thì có nội tiếp được không?', doc: CI('cyclic', { angs: [130, 210, 320, 50], R: 5, free: true, Dp: P(520, 160) }), startHidden: H },
      { title: 'Chứng minh tứ giác nội tiếp', prompt: 'Lần lượt mở từng bước.', question: 'Hình chữ nhật có nội tiếp đường tròn không? Tâm ở đâu?', doc: D('c9-cyclic') },
    ],
  },
  't9-30': {
    scenes: [
      { title: 'Đa giác đều', prompt: 'Đổi số cạnh n; quan sát góc trong và góc ở tâm.', question: 'Mỗi góc của ngũ giác đều bằng bao nhiêu độ?', doc: CI('polygon', { sides: 6, R: 5 }), startHidden: H },
      { title: 'Phép quay giữ nguyên đa giác đều', prompt: 'Đổi n, đọc các góc quay ở bảng.', question: 'Phép quay nào giữ nguyên tam giác đều? Hình vuông?', doc: CI('polygon', { sides: 5, R: 5, inner: true }), startHidden: H },
      { title: 'Tính toán', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Lục giác đều nội tiếp đường tròn bán kính 4 cm có chu vi bao nhiêu?', doc: D('c9-polygon') },
    ],
  },
  // ---------- Chương X ----------
  't9-31': {
    scenes: [
      { title: 'Hình trụ', prompt: 'Đổi r, h; bật hình khai triển.', question: 'Mặt xung quanh của hình trụ khai triển thành hình gì? Kích thước bao nhiêu?', doc: { mode: 'round', kind: 'cyl', kinds: ['cyl', 'cone'], r: 2, h: 5, unfold: true }, startHidden: H },
      { title: 'Hình nón', prompt: 'Đổi r, h; bật hình khai triển.', question: 'Mặt xung quanh của hình nón khai triển thành hình gì?', doc: { mode: 'round', kind: 'cone', kinds: ['cyl', 'cone'], r: 3, h: 6, unfold: true }, startHidden: H },
      { title: 'Hộp sữa', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Nếu tăng bán kính đáy gấp đôi thì thể tích tăng mấy lần?', doc: D('c9-cyl') },
      { title: 'Chiếc nón lá', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'So sánh thể tích hình nón với hình trụ có cùng đáy, cùng chiều cao.', doc: D('c9-cone') },
    ],
  },
  't9-32': {
    scenes: [
      { title: 'Hình cầu', prompt: 'Đổi bán kính R.', question: 'Diện tích mặt cầu, thể tích hình cầu được tính thế nào?', doc: { mode: 'round', kind: 'sphere', r: 3, h: 6 }, startHidden: H },
      { title: 'Hình cầu trong hình trụ', prompt: 'Bật “Đặt hình cầu vào hình trụ vừa khít”.', question: 'Thể tích hình cầu bằng mấy phần thể tích hình trụ ngoại tiếp?', doc: { mode: 'round', kind: 'sphere', r: 3, h: 6, arch: true }, startHidden: H },
      { title: 'Quả bóng', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Cần bao nhiêu mét vuông da để bọc 100 quả bóng như vậy?', doc: D('c9-sphere') },
      { title: 'Bảng công thức', prompt: 'Bấm vào ô để kiểm tra.', question: 'Hình nào có diện tích xung quanh bằng π · r · l?', doc: TB('roundSolids'), startHidden: H },
    ],
  },
};

export const MATH9_LESSONS: Record<string, LessonContent> = L;
