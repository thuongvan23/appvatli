// Nội dung Toán 7 (Kết nối tri thức): Bài 1 – Bài 37.
import type { LessonContent } from '../core/types';
import { t } from '../engines/math/poly';

const D = (set: string) => ({ mode: 'derive', set, step: 0 });
const S = (set: string) => ({ mode: 'sort', set, placed: {} });
const TB = (set: string) => ({ mode: 'table', set, open: [] });
const PL = (set: string, sel = 0) => ({ mode: 'poly', set, sel, step: 0, x: 1, y: 1 });
const P = (x: number, y: number) => ({ x, y });
const TRI = [P(300, 120), P(120, 520), P(700, 500)];
const T7 = (sub: string, extra: Record<string, unknown> = {}) => ({ mode: 'tri7', sub, tri: TRI, ...extra });
const CONG = (sub: string, extra: Record<string, unknown> = {}) => ({ mode: 'similar', sub, tri: [P(180, 200), P(90, 430), P(330, 430)], k: 1, rot: 35, cong: true, ...extra });
const EXP = (exp: string, ev = 0) => ({ mode: 'experiment', exp, ev, trials: 0, hits: 0, pts: [] });
const H = true;

const L: Record<string, LessonContent> = {
  // ---------- Chương I ----------
  't7-1': {
    scenes: [
      { title: 'Số hữu tỉ trên trục số', prompt: 'Đổi tử số, mẫu số; quan sát cách chia đoạn đơn vị.', question: 'Biểu diễn −3/4 và 5/4 trên trục số.', doc: { mode: 'numline', sub: 'rational', p: -3, q: 4 }, startHidden: H },
      { title: 'Số đối và giá trị tuyệt đối', prompt: 'Bật “Số đối và giá trị tuyệt đối”.', question: 'Số đối của −2/5 là số nào? Hai điểm biểu diễn có vị trí thế nào so với điểm 0?', doc: { mode: 'numline', sub: 'rational', p: -2, q: 5, opp: true }, startHidden: H },
      { title: 'So sánh số hữu tỉ', prompt: 'Lần lượt mở từng bước.', question: 'So sánh −0,7 và −2/3.', doc: D('a7-compare') },
      { title: 'Các tập hợp số', prompt: 'Bấm vào ô để kiểm tra.', question: 'Số −5 thuộc những tập hợp số nào?', doc: TB('numSetsTable'), startHidden: H },
    ],
  },
  't7-2': {
    scenes: [
      { title: 'Các phép tính với số hữu tỉ', prompt: 'Học sinh tính trước rồi đối chiếu.', question: 'Tính (−1,2) · 5/6 + 1/2.', doc: D('a7-ops') },
      { title: 'Cộng trên trục số', prompt: 'Biểu diễn 1/2 trên trục số, rồi dịch thêm −2/3.', question: 'Kết quả 1/2 + (−2/3) nằm ở đâu trên trục số?', doc: { mode: 'numline', sub: 'rational', p: -1, q: 6 }, startHidden: H },
    ],
  },
  't7-3': {
    scenes: [
      { title: 'Luỹ thừa của số hữu tỉ', prompt: 'Lần lượt mở từng bước.', question: 'Tính (−1/2)⁴ và (−1/2)⁵. Luỹ thừa bậc chẵn, bậc lẻ của số âm có dấu thế nào?', doc: D('a7-pow') },
      { title: 'Các công thức', prompt: 'Bấm vào ô để kiểm tra.', question: 'Viết (0,25)⁴ · 4⁴ thành một luỹ thừa.', doc: TB('powRules'), startHidden: H },
    ],
  },
  't7-4': {
    scenes: [{ title: 'Thứ tự thực hiện phép tính, chuyển vế', prompt: 'Lần lượt mở từng bước.', question: 'Tìm x: 2/3 − x = −1/6.', doc: D('a7-order') }],
  },
  // ---------- Chương II ----------
  't7-5': {
    scenes: [
      { title: 'Số thập phân vô hạn tuần hoàn', prompt: 'Đổi tử, mẫu; quan sát các số dư lặp lại.', question: 'Vì sao 1/3 = 0,333… mãi không dừng?', doc: { mode: 'numline', sub: 'decimal', p: 1, q: 7 }, startHidden: H },
      { title: 'Hữu hạn hay vô hạn tuần hoàn?', prompt: 'Thử 3/8, 7/20, 5/6, 2/11.', question: 'Phân số tối giản có mẫu như thế nào thì viết được thành số thập phân hữu hạn?', doc: { mode: 'numline', sub: 'decimal', p: 3, q: 8 }, startHidden: H },
      { title: 'Làm tròn số', prompt: 'Lần lượt mở từng bước.', question: 'Làm tròn 2/3 đến hàng phần trăm.', doc: D('a7-round') },
    ],
  },
  't7-6': {
    scenes: [
      { title: '√2 trên trục số', prompt: 'Đường chéo hình vuông cạnh 1 dài √2; quay compa đặt lên trục số.', question: '√2 có phải là số hữu tỉ không?', doc: { mode: 'numline', sub: 'real', p: 1, q: 1, a: 1, b: 1 }, startHidden: H },
      { title: 'Căn bậc hai số học', prompt: 'Lần lượt mở từng bước.', question: 'Tính √1,44 và √(25/49).', doc: D('a7-sqrt') },
      { title: 'Hình vuông và căn bậc hai', prompt: 'Đổi diện tích S.', question: 'Hình vuông diện tích 2 m² có cạnh bao nhiêu mét?', doc: { mode: 'sqrt', sub: 'square', A: 2 }, startHidden: H },
    ],
  },
  't7-7': {
    scenes: [
      { title: 'Số hữu tỉ và số vô tỉ', prompt: 'Xếp các số vào nhóm.', question: 'Tập hợp số thực gồm những số nào?', doc: S('numSets') },
      { title: 'Số thực trên trục số', prompt: 'Đổi hai cạnh góc vuông để biểu diễn √5, √10, √13…', question: 'Mỗi số thực được biểu diễn bởi mấy điểm trên trục số?', doc: { mode: 'numline', sub: 'real', p: 1, q: 1, a: 2, b: 1 }, startHidden: H },
    ],
  },
  // ---------- Chương III ----------
  't7-8': {
    scenes: [
      { title: 'Góc đối đỉnh, góc kề bù', prompt: 'Đổi góc Ô₁; quan sát bốn góc tạo thành.', question: 'Hai góc đối đỉnh có quan hệ gì? Hai góc kề bù?', doc: { mode: 'angles', sub: 'pair', ang: 50 }, startHidden: H },
      { title: 'Tia phân giác của một góc', prompt: 'Đổi góc xOy.', question: 'Tia phân giác chia góc thành hai góc thế nào?', doc: { mode: 'angles', sub: 'bisector', ang: 80 }, startHidden: H },
      { title: 'Tính góc', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Nếu xOy = 90° thì các góc còn lại bằng bao nhiêu?', doc: D('a7-angles') },
    ],
  },
  't7-9': {
    scenes: [
      { title: 'Các cặp góc tạo bởi một đường thẳng cắt hai đường thẳng', prompt: 'Chọn từng loại cặp góc; đọc số đo.', question: 'Chỉ ra các cặp góc so le trong, đồng vị, trong cùng phía.', doc: { mode: 'angles', sub: 'parallel', ang: 60, dev: 12, pair: 'sole' }, startHidden: H },
      { title: 'Dấu hiệu nhận biết', prompt: 'Kéo “Độ nghiêng của b” về 0°: khi nào cặp góc so le trong bằng nhau?', question: 'Nếu hai góc đồng vị bằng nhau thì a và b có quan hệ gì?', doc: { mode: 'angles', sub: 'parallel', ang: 60, dev: 10, pair: 'dongvi' }, startHidden: H },
      { title: 'Vận dụng', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Nếu A₁ = 70°, B₁ = 75° thì a có song song với b không?', doc: D('a7-parallel') },
    ],
  },
  't7-10': {
    scenes: [
      { title: 'Tính chất hai đường thẳng song song', prompt: 'Với a // b (độ nghiêng 0°), đổi góc của c và chọn từng cặp góc.', question: 'Khi a // b, các góc so le trong, đồng vị có quan hệ gì? Góc trong cùng phía?', doc: { mode: 'angles', sub: 'parallel', ang: 65, dev: 0, pair: 'trong' }, startHidden: H },
      { title: 'Tính góc', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Phát biểu tiên đề Euclid.', doc: D('a7-euclid') },
    ],
  },
  't7-11': {
    scenes: [{ title: 'Giả thiết, kết luận, chứng minh', prompt: 'Lần lượt mở từng bước.', question: 'Viết giả thiết, kết luận của định lí “Hai góc kề bù có tổng bằng 180°”.', doc: D('a7-theorem') }],
  },
  // ---------- Chương IV ----------
  't7-12': {
    scenes: [
      { title: 'Tổng ba góc của tam giác', prompt: 'Kéo các đỉnh; quan sát tổng ba góc và hình ghép ba góc.', question: 'Tổng ba góc của một tam giác bằng bao nhiêu?', doc: T7('sum'), startHidden: H },
      { title: 'Góc ngoài của tam giác', prompt: 'Bật “Góc ngoài tại đỉnh C”.', question: 'Góc ngoài tại C bằng tổng những góc nào?', doc: T7('sum', { ext: true }), startHidden: H },
      { title: 'Tính góc', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tam giác vuông có hai góc nhọn quan hệ thế nào?', doc: D('a7-sum') },
    ],
  },
  't7-13': {
    scenes: [
      { title: 'Hai tam giác bằng nhau', prompt: "Kéo đỉnh △ABC; △A'B'C' là hình dời, quay, lật của △ABC.", question: 'Hai tam giác bằng nhau có những cạnh, góc nào bằng nhau?', doc: CONG('def'), startHidden: H },
      { title: 'Trường hợp cạnh – cạnh – cạnh', prompt: 'Chỉ hiện ba cạnh.', question: 'Cần biết những yếu tố nào để kết luận hai tam giác bằng nhau theo c.c.c?', doc: CONG('ccc'), startHidden: H },
      { title: 'Chứng minh', prompt: 'Lần lượt mở từng bước.', question: 'Vì sao suy ra được AC là tia phân giác?', doc: D('a7-ccc') },
    ],
  },
  't7-14': {
    scenes: [
      { title: 'Trường hợp cạnh – góc – cạnh', prompt: 'Chỉ hiện hai cạnh và góc xen giữa.', question: 'Góc phải ở vị trí nào so với hai cạnh?', doc: CONG('cgc'), startHidden: H },
      { title: 'Trường hợp góc – cạnh – góc', prompt: 'Chỉ hiện một cạnh và hai góc kề.', question: 'Hai góc phải ở vị trí nào so với cạnh?', doc: CONG('gg', { flip: true }), startHidden: H },
      { title: 'Chứng minh (c.g.c)', prompt: 'Lần lượt mở từng bước.', question: 'Chứng minh thêm AC // BD.', doc: D('a7-cgc') },
      { title: 'Chứng minh (g.c.g)', prompt: 'Lần lượt mở từng bước.', question: 'Tam giác có hai góc bằng nhau là tam giác gì?', doc: D('a7-gcg') },
      { title: 'Bảng tổng kết', prompt: 'Bấm vào ô để kiểm tra.', question: 'So sánh ba trường hợp bằng nhau của tam giác.', doc: TB('congCases'), startHidden: H },
    ],
  },
  't7-15': {
    scenes: [
      { title: 'Hai tam giác vuông bằng nhau', prompt: 'Kéo đỉnh B, C (tam giác luôn vuông tại A).', question: 'Nêu các trường hợp bằng nhau của tam giác vuông.', doc: CONG('right', { tri: [P(110, 430), P(110, 200), P(330, 430)] }), startHidden: H },
      { title: 'Chứng minh', prompt: 'Lần lượt mở từng bước.', question: 'Chứng minh thêm AH là tia phân giác của góc BAC.', doc: D('a7-right') },
    ],
  },
  't7-16': {
    scenes: [
      { title: 'Tam giác cân', prompt: 'Kéo đỉnh A (A luôn nằm trên đường trung trực của BC) và các điểm B, C.', question: 'Tam giác cân có tính chất gì về góc?', doc: T7('iso', { tri: [P(410, 140), P(180, 500), P(640, 500)] }), startHidden: H },
      { title: 'Đường trung trực của đoạn thẳng', prompt: 'Kéo điểm M trên đường trung trực của BC; so sánh MB và MC.', question: 'Điểm nằm trên đường trung trực của BC có tính chất gì?', doc: T7('iso', { tri: [P(410, 140), P(180, 500), P(640, 500)], M: P(410, 600) }), startHidden: H },
      { title: 'Vận dụng', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tam giác cân có góc ở đáy 50° thì góc ở đỉnh bằng bao nhiêu?', doc: D('a7-iso') },
    ],
  },
  // ---------- Chương V ----------
  't7-17': {
    scenes: [
      { title: 'Cách thu thập dữ liệu', prompt: 'Bấm vào ô để kiểm tra.', question: 'Muốn biết môn thể thao yêu thích của các bạn trong lớp, em làm thế nào?', doc: TB('collectMethods'), startHidden: H },
      { title: 'Phân loại dữ liệu', prompt: 'Xếp các loại dữ liệu vào hai nhóm.', question: 'Cho ví dụ về dữ liệu không phải là số.', doc: S('dataType') },
      { title: 'Tính hợp lí của dữ liệu', prompt: 'Bấm vào các dòng không hợp lí.', question: 'Làm sao phát hiện dữ liệu không hợp lí?', doc: { mode: 'datafix', set: 'body', flagged: [] } },
    ],
  },
  't7-18': {
    scenes: [
      { title: 'Biểu đồ hình quạt tròn', prompt: 'Đổi qua lại bảng và biểu đồ.', question: 'Sở thích nào chiếm tỉ lệ lớn nhất? Bao nhiêu phần trăm?', doc: { mode: 'chart', set: 'hobby7', kind: 'pie', kinds: ['table', 'pie', 'bar'] }, startHidden: H },
      { title: 'Phương tiện đến trường', prompt: 'Sửa số liệu ở bảng bên phải và quan sát biểu đồ thay đổi.', question: 'Tổng các tỉ lệ phần trăm trong biểu đồ hình quạt bằng bao nhiêu?', doc: { mode: 'chart', set: 'transport', kind: 'pie', kinds: ['table', 'pie'], edit: true }, startHidden: H },
      { title: 'Đọc biểu đồ', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Lớp có 36 học sinh, 25% thích bóng đá. Có bao nhiêu bạn thích bóng đá?', doc: D('a7-pie') },
    ],
  },
  't7-19': {
    scenes: [
      { title: 'Biểu đồ đoạn thẳng', prompt: 'Quan sát sự thay đổi theo thời gian.', question: 'Năm nào sản lượng lúa giảm so với năm trước?', doc: { mode: 'chart', set: 'rice', kind: 'line', kinds: ['table', 'line', 'bar'] }, startHidden: H },
      { title: 'Nhiệt độ trong ngày', prompt: 'Đọc biểu đồ đoạn thẳng.', question: 'Nhiệt độ cao nhất lúc mấy giờ? Chênh lệch giữa cao nhất và thấp nhất?', doc: { mode: 'chart', set: 'temp7', kind: 'line', kinds: ['table', 'line'] }, startHidden: H },
    ],
  },
  // ---------- Chương VI ----------
  't7-20': {
    scenes: [{ title: 'Tỉ lệ thức', prompt: 'Lần lượt mở từng bước.', question: 'Tìm x biết 1,5/x = 3/8.', doc: D('a7-prop') }],
  },
  't7-21': {
    scenes: [
      { title: 'Dãy tỉ số bằng nhau', prompt: 'Lần lượt mở từng bước.', question: 'Tìm x, y biết x/2 = y/5 và y − x = 9.', doc: D('a7-series') },
      { title: 'Chia theo tỉ lệ', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Chia 150 thành ba phần tỉ lệ với 2; 3; 5.', doc: D('a7-share') },
    ],
  },
  't7-22': {
    scenes: [
      { title: 'Đại lượng tỉ lệ thuận', prompt: 'Đổi hệ số k; quan sát tỉ số y/x và đồ thị.', question: 'Khi x tăng gấp 3 thì y thay đổi thế nào?', doc: { mode: 'ratio', ctx: 'apple', ctxs: ['apple', 'move'], k: 30 }, startHidden: H },
      { title: 'Tỉ lệ thuận hay tỉ lệ nghịch?', prompt: 'Xếp các cặp đại lượng vào nhóm.', question: 'Diện tích và cạnh hình vuông có tỉ lệ thuận không?', doc: S('ratioType') },
      { title: 'Bài toán tỉ lệ thuận', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Với 300 nghìn đồng mua được bao nhiêu kg gạo?', doc: D('a7-direct') },
    ],
  },
  't7-23': {
    scenes: [
      { title: 'Đại lượng tỉ lệ nghịch', prompt: 'Đổi hệ số a; quan sát tích x · y và đồ thị.', question: 'Khi vận tốc tăng gấp đôi thì thời gian thay đổi thế nào?', doc: { mode: 'ratio', ctx: 'trip', ctxs: ['trip', 'work'], k: 120 }, startHidden: H },
      { title: 'Bài toán tỉ lệ nghịch', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Muốn xây xong trong 4 ngày cần bao nhiêu công nhân?', doc: D('a7-inverse') },
    ],
  },
  // ---------- Chương VII ----------
  't7-24': {
    scenes: [
      { title: 'Biểu thức số, biểu thức đại số', prompt: 'Xếp các biểu thức vào nhóm.', question: 'Biểu thức đại số khác biểu thức số ở chỗ nào?', doc: S('isExpr') },
      { title: 'Giá trị của biểu thức đại số', prompt: 'Lần lượt mở từng bước.', question: 'Tính giá trị của 3x² − x tại x = −1.', doc: D('a7-expr') },
    ],
  },
  't7-25': {
    scenes: [
      { title: 'Thu gọn, sắp xếp đa thức một biến', prompt: 'Bấm “Bước tiếp”: nhóm các hạng tử cùng bậc rồi sắp xếp theo luỹ thừa giảm dần.', question: 'Tìm bậc, hệ số cao nhất, hệ số tự do của P(x).', doc: PL('poly7add', 0), startHidden: H },
      { title: 'Nghiệm của đa thức', prompt: 'Lần lượt mở từng bước.', question: 'Kiểm tra x = −1 có là nghiệm của x² + x không.', doc: D('a7-root') },
    ],
  },
  't7-26': {
    scenes: [
      { title: 'Cộng hai đa thức', prompt: 'Bấm “Bước tiếp”.', question: 'Tính P(x) + Q(x).', doc: PL('poly7add', 1), startHidden: H },
      { title: 'Trừ hai đa thức', prompt: 'Chú ý đổi dấu khi bỏ ngoặc.', question: 'Tính P(x) − Q(x).', doc: PL('poly7add', 2), startHidden: H },
    ],
  },
  't7-27': {
    scenes: [
      { title: 'Nhân đa thức bằng mô hình diện tích', prompt: 'Bấm “Điền ô tiếp”.', question: 'Tính (x − 2)(x² + 3x − 1).', doc: { mode: 'area', tasks: [[[t(3, 1)], [t(2, 2), t(-1, 1), t(4)]], [[t(1, 1), t(-2)], [t(1, 2), t(3, 1), t(-1)]]], sel: 0, step: 0 }, startHidden: H },
      { title: 'Trình bày phép nhân', prompt: 'Chọn bài, bấm “Bước tiếp”.', question: 'Tính (2x + 1)(x − 3).', doc: PL('poly7mul'), startHidden: H },
    ],
  },
  't7-28': {
    scenes: [
      { title: 'Chia đa thức cho đơn thức', prompt: 'Bấm “Bước tiếp”.', question: 'Tính (6x⁴ − 9x³ + 3x²) : 3x².', doc: PL('poly7div'), startHidden: H },
      { title: 'Chia đa thức cho đa thức (chia hết)', prompt: 'Lần lượt mở từng bước của phép đặt tính chia.', question: 'Kiểm tra lại bằng phép nhân.', doc: D('a7-longdiv') },
      { title: 'Phép chia có dư', prompt: 'Lần lượt mở từng bước.', question: 'Bậc của đa thức dư so với bậc của đa thức chia?', doc: D('a7-longdiv2') },
    ],
  },
  // ---------- Chương VIII ----------
  't7-29': {
    scenes: [
      { title: 'Biến cố chắc chắn, không thể, ngẫu nhiên', prompt: 'Xếp các biến cố vào nhóm.', question: 'Cho ví dụ về một biến cố ngẫu nhiên.', doc: S('eventType') },
      { title: 'Biến cố khi gieo xúc xắc', prompt: 'Chọn biến cố; các kết quả làm biến cố xảy ra được tô màu.', question: 'Biến cố “số chấm lớn hơn 4” xảy ra khi nào?', doc: { mode: 'prob', exp: 'die', ev: 2 }, startHidden: H },
    ],
  },
  't7-30': {
    scenes: [
      { title: 'Xác suất của biến cố', prompt: 'Chọn phép thử, biến cố; học sinh tính trước khi hiện số đo.', question: 'Xác suất lấy được bi đỏ từ túi có 3 bi đỏ, 5 bi xanh, 2 bi vàng?', doc: { mode: 'prob', exp: 'die', exps: ['coin', 'die', 'bag', 'spinner'], ev: 0 }, startHidden: H },
      { title: 'Thử nghiệm nhiều lần', prompt: 'Tung đồng xu nhiều lần.', question: 'Tần số xuất hiện mặt sấp tiến gần đến số nào?', doc: EXP('coin'), startHidden: H },
      { title: 'Tính xác suất', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính xác suất gieo được mặt có số chấm là số lẻ.', doc: D('a7-prob') },
    ],
  },
  // ---------- Chương IX ----------
  't7-31': {
    scenes: [
      { title: 'Góc và cạnh đối diện', prompt: 'Kéo các đỉnh. Cạnh lớn nhất (đỏ) đối diện góc nào?', question: 'Trong tam giác, góc lớn nhất đối diện với cạnh nào?', doc: T7('side'), startHidden: H },
      { title: 'So sánh', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Trong tam giác vuông, cạnh nào lớn nhất? Vì sao?', doc: D('a7-sideAngle') },
    ],
  },
  't7-32': {
    scenes: [
      { title: 'Đường vuông góc và đường xiên', prompt: 'Kéo A, B, C. So sánh AH với AB, AC; so sánh các hình chiếu HB, HC.', question: 'Đường nào ngắn nhất trong các đường kẻ từ A đến d?', doc: T7('perp', { tri: [P(380, 180), P(0, 0), P(0, 0)], bx: 560, cx: 120 }), startHidden: H },
    ],
  },
  't7-33': {
    scenes: [
      { title: 'Bất đẳng thức tam giác', prompt: 'Đổi độ dài ba đoạn thẳng.', question: 'Ba đoạn 2 cm, 3 cm, 6 cm có ghép được thành tam giác không?', doc: T7('ineq3', { len: [6, 2, 3] }), startHidden: H },
      { title: 'Vận dụng', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tam giác cân có hai cạnh 3 cm và 7 cm. Cạnh thứ ba dài bao nhiêu?', doc: D('a7-tri3') },
    ],
  },
  't7-34': {
    scenes: [
      { title: 'Ba đường trung tuyến', prompt: 'Bật ba đường trung tuyến; kéo các đỉnh.', question: 'Trọng tâm G chia mỗi đường trung tuyến theo tỉ số nào?', doc: T7('concur', { med: true }), startHidden: H },
      { title: 'Ba đường phân giác', prompt: 'Bật ba đường phân giác.', question: 'Điểm I có tính chất gì?', doc: T7('concur', { bis: true }), startHidden: H },
      { title: 'Trọng tâm', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính GM biết AM = 12 cm.', doc: D('a7-centroid') },
    ],
  },
  't7-35': {
    scenes: [
      { title: 'Ba đường trung trực', prompt: 'Bật ba đường trung trực; kéo để được tam giác tù.', question: 'Điểm O cách đều ba điểm nào? O nằm ở đâu khi tam giác tù?', doc: T7('concur', { perpb: true }), startHidden: H },
      { title: 'Ba đường cao', prompt: 'Bật ba đường cao.', question: 'Trực tâm của tam giác vuông nằm ở đâu?', doc: T7('concur', { alt: true }), startHidden: H },
      { title: 'Tổng kết các điểm đặc biệt', prompt: 'Bấm vào ô để kiểm tra; bật cả bốn loại đường để so sánh.', question: 'Trong tam giác đều, bốn điểm G, I, O, H có vị trí thế nào?', doc: TB('concurTable'), startHidden: H },
    ],
  },
  // ---------- Chương X ----------
  't7-36': {
    scenes: [
      { title: 'Hình hộp chữ nhật', prompt: 'Kéo trên hình để xoay; đổi các kích thước; bật hình khai triển.', question: 'Hình hộp chữ nhật có bao nhiêu mặt, đỉnh, cạnh?', doc: { mode: 'prism', kind: 'box', kinds: ['box', 'cube'], a: 5, b: 3, h: 4, yaw: 30, pitch: 22 }, startHidden: H },
      { title: 'Hình lập phương', prompt: 'Bật hình khai triển.', question: 'Hình khai triển của hình lập phương gồm mấy hình vuông?', doc: { mode: 'prism', kind: 'cube', kinds: ['box', 'cube'], a: 4, b: 4, h: 4, yaw: 35, pitch: 22, net: true }, startHidden: H },
      { title: 'Bể cá', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Đổ vào bể 120 lít nước thì mực nước cao bao nhiêu?', doc: D('a7-box') },
      { title: 'Hộp quà', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Nếu cạnh tăng gấp đôi thì thể tích tăng mấy lần?', doc: D('a7-cube') },
    ],
  },
  't7-37': {
    scenes: [
      { title: 'Lăng trụ đứng tam giác', prompt: 'Kéo để xoay; bật hình khai triển.', question: 'Các mặt bên của hình lăng trụ đứng là hình gì?', doc: { mode: 'prism', kind: 'tri', kinds: ['tri', 'quad'], a: 4, b: 3, h: 5, yaw: 30, pitch: 20 }, startHidden: H },
      { title: 'Lăng trụ đứng tứ giác', prompt: 'Bật hình khai triển.', question: 'Diện tích xung quanh của hình lăng trụ đứng được tính thế nào?', doc: { mode: 'prism', kind: 'quad', kinds: ['tri', 'quad'], a: 5, b: 3, h: 4, yaw: 30, pitch: 22, net: true }, startHidden: H },
      { title: 'Chiếc lều', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Cần bao nhiêu mét vuông vải để làm hai mặt đầu lều?', doc: D('a7-prism') },
      { title: 'Bảng công thức', prompt: 'Bấm vào ô để kiểm tra.', question: 'Thể tích hình lăng trụ đứng bằng gì?', doc: TB('solids7'), startHidden: H },
    ],
  },
};

export const MATH7_LESSONS: Record<string, LessonContent> = L;
