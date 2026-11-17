// Nội dung Toán 8 (Kết nối tri thức), tập hai: Bài 21 – Bài 39.
import type { LessonContent } from '../core/types';

const D = (set: string) => ({ mode: 'derive', set, step: 0 });
const S = (set: string) => ({ mode: 'sort', set, placed: {} });
const TB = (set: string) => ({ mode: 'table', set, open: [] });
const P = (x: number, y: number) => ({ x, y });
const EXP = (exp: string, ev = 0) => ({ mode: 'experiment', exp, ev, trials: 0, hits: 0, pts: [] });
const TRI1 = [P(180, 200), P(90, 430), P(330, 430)];
const RIGHT = [P(330, 180), P(130, 480), P(630, 380)];

// ---------------- Chương VI. Phân thức đại số ----------------

const t8_21: LessonContent = {
  scenes: [
    { title: 'Phân thức và điều kiện xác định', prompt: 'Chọn từng phân thức. Kéo x để tính giá trị; đường đứt nét đỏ đánh dấu giá trị làm mẫu bằng 0.', question: 'Phân thức (x + 3)/(x − 2) xác định khi nào? Tính giá trị tại x = 3.', doc: { mode: 'frac', list: ['f1', 'f2', 'f3', 'f4'], sel: 'f1', x: 3 }, startHidden: true },
    { title: 'Mẫu có hai giá trị bằng 0', prompt: 'Quan sát phân thức 5/(x² − 4).', question: 'Tìm điều kiện xác định của 5/(x² − 4). Vì sao phân thức (2x − 1)/(x² + 1) xác định với mọi x?', doc: { mode: 'frac', list: ['f3', 'f4'], sel: 'f3', x: 1 }, startHidden: true },
    { title: 'Giá trị của phân thức', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tại x = −2, phân thức có giá trị không?', doc: D('b21-cond') },
    { title: 'Hai phân thức bằng nhau', prompt: 'So sánh các tích chéo.', question: 'Hai phân thức x/(x + 1) và x²/(x² + x) có bằng nhau không?', doc: D('b21-equal') },
  ],
};

const t8_22: LessonContent = {
  scenes: [
    { title: 'Rút gọn phân thức', prompt: 'Bật đồ thị phân thức đã rút gọn: hai đồ thị trùng nhau, trừ điểm bị “khoét”.', question: 'Hai phân thức (x² − 1)/(x − 1) và x + 1 khác nhau ở điểm nào?', doc: { mode: 'frac', list: ['s2', 's1', 's3'], sel: 's2', x: 2 }, startHidden: true },
    { title: 'Cách rút gọn', prompt: 'Phân tích tử và mẫu thành nhân tử rồi chia cho nhân tử chung.', question: 'Rút gọn (x² − 2x)/(x² − 4).', doc: D('b22-simp') },
    { title: 'Quy đồng mẫu thức', prompt: 'Tìm mẫu thức chung và nhân tử phụ.', question: 'Quy đồng mẫu thức 1/x và 2/(x² + x).', doc: D('b22-common') },
    { title: 'Kiểm tra rút gọn bằng đồ thị', prompt: 'Chọn phân thức, so sánh đồ thị trước và sau khi rút gọn.', question: 'Vì sao khi rút gọn vẫn phải giữ điều kiện xác định của phân thức ban đầu?', doc: { mode: 'frac', list: ['s1', 's3'], sel: 's1', x: 1, showSimp: true }, startHidden: true },
  ],
};

const t8_23: LessonContent = {
  scenes: [
    { title: 'Cộng phân thức cùng mẫu', prompt: 'Cộng các tử thức, giữ nguyên mẫu thức rồi rút gọn.', question: 'Tính (3x − 1)/(x + 2) + (2 − x)/(x + 2).', doc: D('b23-same') },
    { title: 'Cộng, trừ phân thức khác mẫu', prompt: 'Quy đồng mẫu thức trước.', question: 'Tính 1/(x − 1) − 1/(x + 1).', doc: D('b23-diff') },
    { title: 'Bài toán cuộc đua xe đạp', prompt: 'Viết biểu thức tổng thời gian theo x.', question: 'Với x = 36 km/h, vận động viên hoàn thành cuộc đua trong bao lâu?', doc: D('b23-race') },
  ],
};

const t8_24: LessonContent = {
  scenes: [
    { title: 'Nhân hai phân thức', prompt: 'Nhân tử với tử, mẫu với mẫu, rồi rút gọn.', question: 'Tính (x + 2)/(x − 3) · (x² − 9)/(x² + 2x).', doc: D('b24-mul') },
    { title: 'Chia hai phân thức', prompt: 'Nhân với phân thức nghịch đảo của phân thức chia.', question: 'Phân thức nghịch đảo của (x − 3)/(x² + x) là gì?', doc: D('b24-div') },
    { title: 'Rút gọn biểu thức', prompt: 'Thực hiện trong ngoặc trước.', question: 'Chứng minh giá trị biểu thức không phụ thuộc vào x.', doc: D('b24-mix') },
  ],
};

// ---------------- Chương VII ----------------

const t8_25: LessonContent = {
  scenes: [
    { title: 'Cân thăng bằng và phương trình', prompt: 'Bớt cùng một lượng ở hai đĩa cân để tìm x. Bật "Thử thay x" để kiểm tra nghiệm.', question: 'Bớt 1 hộp x ở mỗi đĩa ứng với phép biến đổi nào của phương trình 2x + 3 = x + 7?', doc: { mode: 'balance', L: [2, 3], R: [1, 7], sol: 4, hist: [] }, startHidden: true },
    { title: 'Chia hai vế', prompt: 'Bớt quả cân rồi chia mỗi đĩa thành các phần bằng nhau.', question: 'Giải phương trình 3x + 1 = 10 bằng cân.', doc: { mode: 'balance', L: [3, 1], R: [0, 10], sol: 3, hist: [] }, startHidden: true },
    { title: 'Phương trình bậc nhất một ẩn', prompt: 'Xếp các phương trình vào nhóm.', question: 'Vì sao 0x + 3 = 0 không phải là phương trình bậc nhất một ẩn?', doc: S('isLinEq') },
    { title: 'Quy tắc chuyển vế', prompt: 'Học sinh giải trước rồi đối chiếu.', question: 'Giải phương trình 5x + 2 = 3x − 6.', doc: D('b25-solve1') },
    { title: 'Phương trình có ngoặc', prompt: 'Bỏ ngoặc, chuyển vế, thu gọn.', question: 'Giải phương trình 3(x − 1) = 2x + 5.', doc: D('b25-solve2') },
    { title: 'Phương trình có mẫu', prompt: 'Quy đồng rồi khử mẫu.', question: 'Giải phương trình x/2 + x/3 = 5.', doc: D('b25-solve3') },
  ],
};

const t8_26: LessonContent = {
  scenes: [
    { title: 'Bài toán tuổi', prompt: 'Ba bước: lập phương trình – giải phương trình – trả lời.', question: 'Sau bao nhiêu năm nữa tuổi mẹ gấp 3 lần tuổi con?', doc: D('b26-age') },
    { title: 'Bài toán chuyển động', prompt: 'Lập bảng: vận tốc – thời gian – quãng đường.', question: 'Hai xe gặp nhau tại điểm cách A bao nhiêu kilômét?', doc: D('b26-motion') },
    { title: 'Bài toán hình học', prompt: 'Học sinh chọn ẩn và đặt điều kiện trước.', question: 'Nếu tăng chiều rộng thêm 3 m thì diện tích tăng bao nhiêu?', doc: D('b26-geo') },
  ],
};

const t8_27: LessonContent = {
  scenes: [
    { title: 'Khái niệm hàm số', prompt: 'Chọn từng ví dụ. Học sinh trả lời: y có phải là hàm số của x không?', question: 'Khi nào đại lượng y là hàm số của đại lượng x?', doc: { mode: 'fmap', list: ['f1', 'f2', 'f3', 'f6'], sel: 'f1' }, startHidden: true },
    { title: 'Hàm số cho bằng bảng', prompt: 'Chọn từng bảng.', question: 'Trong bảng thứ hai, giá trị nào của x làm y không phải là hàm số của x?', doc: { mode: 'fmap', list: ['f4', 'f5'], sel: 'f4' }, startHidden: true },
    { title: 'Mặt phẳng toạ độ', prompt: 'Học sinh đọc toạ độ các điểm A, B, C, D; bật các góc phần tư.', question: 'Điểm có hoành độ âm, tung độ dương nằm ở góc phần tư nào?', doc: { mode: 'plane', task: 'read', pts: [{ x: 3, y: 2, label: 'A' }, { x: -2, y: 4, label: 'B' }, { x: -4, y: -3, label: 'C' }, { x: 2.5, y: -1.5, label: 'D' }, { x: 0, y: -5, label: 'E' }] }, startHidden: true },
    { title: 'Biểu diễn điểm', prompt: 'Kéo các điểm tới đúng toạ độ yêu cầu (điểm chuyển xanh lá khi đúng).', question: 'Điểm M(0; 3) nằm trên trục nào?', doc: { mode: 'plane', task: 'plot', pts: [{ x: 0, y: 0, label: 'M' }, { x: 0, y: 0, label: 'N' }, { x: 0, y: 0, label: 'P' }, { x: 0, y: 0, label: 'Q' }], targets: [[0, 3], [-3, 1], [4, -2], [-1.5, -2.5]] } },
    { title: 'Đồ thị hàm số', prompt: 'Học sinh lập bảng giá trị, biểu diễn các điểm; bật "Nối thành đồ thị".', question: 'Đồ thị hàm số y = 2x là gì? Điểm (1,5; 3) có thuộc đồ thị không?', doc: { mode: 'plane', task: 'free', pts: [], fn: 'twoX', xs: [-2, -1, 0, 1, 2] }, startHidden: true },
    { title: 'Đồ thị không phải đường thẳng', prompt: 'Biểu diễn các điểm (x; 0,5x²) rồi nối lại.', question: 'Đồ thị của hàm số y = 0,5x² có phải là đường thẳng không?', doc: { mode: 'plane', task: 'free', pts: [], fn: 'halfSq', xs: [-3, -2, -1, 0, 1, 2, 3] }, startHidden: true },
  ],
};

const t8_28: LessonContent = {
  scenes: [
    { title: 'Hàm số bậc nhất', prompt: 'Xếp các hàm số vào nhóm.', question: 'Hàm số y = 5(x − 1) có phải hàm số bậc nhất không? Chỉ ra a, b.', doc: S('isLinFn') },
    { title: 'Đồ thị y = ax + b', prompt: 'Kéo a, b. Bật giao điểm với hai trục.', question: 'Đồ thị hàm số y = ax + b cắt trục tung tại điểm nào?', doc: { mode: 'linear', a: 2, b: -4, intercepts: true }, startHidden: true },
    { title: 'Cách vẽ đồ thị', prompt: 'Xác định hai điểm rồi kẻ đường thẳng.', question: 'Vẽ đồ thị y = −x + 3.', doc: D('b28-draw') },
    { title: 'Cước taxi', prompt: 'Kéo số kilômét ở bảng bên phải.', question: 'Đi 15 km hết bao nhiêu tiền? Với 190 nghìn đồng đi được bao nhiêu kilômét?', doc: { mode: 'linear', a: 0, b: 0, ctx: 'taxi', x: 5 }, startHidden: true },
    { title: 'Tiết kiệm và ngọn nến', prompt: 'So sánh: hàm số đồng biến (a > 0) và nghịch biến (a < 0).', question: 'Sau bao lâu thì nến cháy hết?', doc: { mode: 'linear', a: 0, b: 0, ctx: 'candle', x: 3 }, startHidden: true },
  ],
};

const t8_29: LessonContent = {
  scenes: [
    { title: 'Hệ số góc', prompt: 'Bật góc α và "x tăng 1". Kéo a, giữ nguyên b.', question: 'Khi a > 0 thì góc α nhọn hay tù? a càng lớn thì α thay đổi thế nào?', doc: { mode: 'linear', a: 1, b: 1, angle: true, slopeTri: true }, startHidden: true },
    { title: 'Hai đường thẳng song song', prompt: 'Đường thẳng thứ hai có a′ = a. Kéo b′.', question: 'Hai đường thẳng y = ax + b và y = a′x + b′ song song khi nào? Trùng nhau khi nào?', doc: { mode: 'linear', a: 2, b: 1, two: true, a2: 2, b2: -2 }, startHidden: true },
    { title: 'Hai đường thẳng cắt nhau', prompt: 'Kéo a′ khác a; quan sát giao điểm.', question: 'Hai đường thẳng y = 2x + 1 và y = −x + 4 cắt nhau tại điểm nào?', doc: { mode: 'linear', a: 2, b: 1, two: true, a2: -1, b2: 4 }, startHidden: true },
    { title: 'Xác định đường thẳng', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tìm đường thẳng song song với y = −3x và đi qua (2; 1).', doc: D('b29-find') },
    { title: 'Bài toán có tham số', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Với m = 2 thì hai đường thẳng cắt nhau tại điểm nào?', doc: D('b29-param') },
  ],
};

// ---------------- Chương VIII ----------------

const t8_30: LessonContent = {
  scenes: [
    { title: 'Các khái niệm', prompt: 'Học sinh giải thích từng khái niệm, bấm vào ô để kiểm tra.', question: 'Lấy ví dụ về một phép thử ngẫu nhiên trong đời sống.', doc: TB('probTerms'), startHidden: true },
    { title: 'Kết quả có thể', prompt: 'Chọn phép thử. Học sinh liệt kê các kết quả có thể trước khi hiện số đo.', question: 'Tung hai đồng xu thì có bao nhiêu kết quả có thể? Vì sao SN và NS là hai kết quả khác nhau?', doc: { mode: 'prob', exp: 'coin', exps: ['coin', 'die', 'coin2', 'bag', 'spinner'], ev: 0, fav: false }, startHidden: true },
    { title: 'Kết quả thuận lợi', prompt: 'Chọn biến cố; các kết quả thuận lợi được tô màu.', question: 'Liệt kê các kết quả thuận lợi cho biến cố “Số chấm là số nguyên tố”.', doc: { mode: 'prob', exp: 'die', ev: 1 }, startHidden: true },
    { title: 'Rút thẻ', prompt: 'Chọn biến cố, đếm số kết quả thuận lợi.', question: 'Có bao nhiêu kết quả thuận lợi cho biến cố “Số chia hết cho 3”?', doc: { mode: 'prob', exp: 'cards20', ev: 0 }, startHidden: true },
  ],
};

const t8_31: LessonContent = {
  scenes: [
    { title: 'Xác suất bằng tỉ số', prompt: 'Chọn phép thử và biến cố; học sinh tính trước khi hiện số đo.', question: 'Tính xác suất của biến cố “Lấy được bi xanh”.', doc: { mode: 'prob', exp: 'bag', exps: ['die', 'bag', 'spinner', 'cards20', 'coin2'], ev: 0 }, startHidden: true },
    { title: 'Gieo hai con xúc xắc', prompt: 'Có 36 kết quả đồng khả năng. Chọn biến cố.', question: 'Tổng số chấm bằng bao nhiêu thì có xác suất lớn nhất?', doc: { mode: 'prob', exp: 'die2', ev: 0 }, startHidden: true },
    { title: 'Ví dụ: số có hai chữ số', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính xác suất số được chọn có chữ số hàng đơn vị là 0.', doc: D('b31-calc') },
    { title: 'Ví dụ: lấy bi', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Phải thêm bao nhiêu bi đỏ để xác suất lấy được bi đỏ bằng 0,5?', doc: D('b31-bag') },
  ],
};

const t8_32: LessonContent = {
  scenes: [
    { title: 'Tung đồng xu nhiều lần', prompt: 'Bấm thử 1 lần, rồi +10, +100, +1000 lần. Quan sát đường tần số tương đối.', question: 'Khi số lần tung tăng lên, xác suất thực nghiệm của biến cố “mặt sấp” tiến gần đến số nào?', doc: EXP('coin'), startHidden: true },
    { title: 'Gieo xúc xắc', prompt: 'Chọn biến cố, làm thí nghiệm nhiều lần, so sánh với xác suất lí thuyết.', question: 'Sau 1 000 lần gieo, xác suất thực nghiệm của “mặt 6 chấm” xấp xỉ bao nhiêu?', doc: EXP('die', 4), startHidden: true },
    { title: 'Túi bi bí mật', prompt: 'Không mở túi. Lấy bi nhiều lần để ước lượng số bi đỏ, rồi hiện số đo để mở túi.', question: 'Từ kết quả thí nghiệm, trong túi có khoảng bao nhiêu bi đỏ?', doc: EXP('bagHidden'), startHidden: true },
    { title: 'Ước lượng số lần xảy ra', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Nếu tung 2 000 lần thì có khoảng bao nhiêu lần đinh rơi ngửa?', doc: D('b32-est') },
    { title: 'Kiểm tra chất lượng sản phẩm', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Vì sao nhà máy không kiểm tra toàn bộ sản phẩm?', doc: D('b32-qc') },
  ],
};

// ---------------- Chương IX ----------------

const sim = (sub: string, extra: Record<string, unknown> = {}) => ({ mode: 'similar', sub, tri: TRI1, k: 1.5, rot: 0, ...extra });

const t8_33: LessonContent = {
  scenes: [
    { title: 'Hai tam giác đồng dạng', prompt: 'Kéo các đỉnh △ABC; đổi tỉ số k, quay, lật △A′B′C′. Quan sát góc và tỉ số cạnh.', question: '△A′B′C′ ∽ △ABC khi nào? Tỉ số đồng dạng là gì?', doc: sim('def'), startHidden: true },
    { title: 'Tỉ số đồng dạng', prompt: 'Đổi k và so sánh tỉ số chu vi, tỉ số diện tích (bảng bên phải).', question: 'Nếu k = 2 thì diện tích tam giác mới gấp mấy lần?', doc: sim('def', { k: 2, rot: 30 }), startHidden: true },
    { title: 'Tam giác tạo bởi đường song song', prompt: 'Kéo M trên AB: △AMN và △ABC có đồng dạng không?', question: 'Vì sao đường thẳng song song với một cạnh tạo ra một tam giác đồng dạng với tam giác đã cho?', doc: { mode: 'thales', sub: 'thales', tri: [P(300, 120), P(120, 560), P(780, 560)], k: 0.5 }, startHidden: true },
    { title: 'Tính độ dài', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính chu vi △DEF.', doc: D('b33-def') },
  ],
};

const t8_34: LessonContent = {
  scenes: [
    { title: 'Trường hợp cạnh – cạnh – cạnh', prompt: 'Chỉ hiện ba cạnh. Kéo các đỉnh, quan sát tỉ số.', question: 'Hai tam giác có ba cạnh 3, 4, 5 và 6, 8, 10 có đồng dạng không?', doc: sim('ccc'), startHidden: true },
    { title: 'Trường hợp cạnh – góc – cạnh', prompt: 'Chỉ hiện hai cạnh và góc xen giữa.', question: 'Vì sao góc phải là góc xen giữa hai cạnh?', doc: sim('cgc', { rot: 40 }), startHidden: true },
    { title: 'Trường hợp góc – góc', prompt: 'Chỉ hiện hai góc. Bật "Hiện tất cả" để kiểm tra các cạnh.', question: 'Vì sao chỉ cần hai cặp góc bằng nhau?', doc: sim('gg', { rot: -30, flip: true }), startHidden: true },
    { title: 'Tự kiểm tra', prompt: 'Kéo các đỉnh của cả hai tam giác (bắt vào lưới) để tạo hai tam giác đồng dạng.', question: 'Tạo △A′B′C′ đồng dạng với △ABC theo tỉ số 2.', doc: { mode: 'similar', sub: 'free2', tri: [P(120, 240), P(80, 400), P(240, 400)], tri2: [P(600, 160), P(520, 520), P(840, 520)], k: 1, rot: 0 }, startHidden: true },
    { title: 'Các trường hợp đồng dạng', prompt: 'Học sinh nêu điều kiện, bấm vào ô để kiểm tra.', question: 'So sánh với các trường hợp bằng nhau của hai tam giác.', doc: TB('similarCases'), startHidden: true },
    { title: 'Chứng minh', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Biết OA = 4, OC = 8, OB = 3. Tính OD.', doc: D('b34-proof') },
  ],
};

const t8_35: LessonContent = {
  scenes: [
    { title: 'Định lí Pythagore', prompt: 'Kéo a, b; bật chia ô vuông với a = 3, b = 4.', question: 'Diện tích hình vuông dựng trên cạnh huyền so với tổng diện tích hai hình vuông kia?', doc: { mode: 'pythag', sub: 'squares', a: 3, b: 4, t: 0, grid: true }, startHidden: true },
    { title: 'Chứng minh bằng cắt ghép', prompt: 'Kéo thanh "Sắp xếp lại 4 tam giác".', question: 'Vì sao phần trống ở hai cách xếp có diện tích bằng nhau?', doc: { mode: 'pythag', sub: 'proof', a: 3, b: 5, t: 0 }, startHidden: true },
    { title: 'Định lí Pythagore đảo', prompt: 'Chọn ba độ dài a, b, c. So sánh c² với a² + b².', question: 'Bộ ba (5, 12, 13) có tạo thành tam giác vuông không?', doc: { mode: 'pythag', sub: 'converse', a: 3, b: 4, c: 5, t: 0 }, startHidden: true },
    { title: 'Chiếc thang', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Nếu chân thang cách tường 1,4 m thì đầu thang ở độ cao bao nhiêu?', doc: D('b35-ladder') },
    { title: 'Nhận biết tam giác vuông', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tam giác có ba cạnh 7, 8, 11 có vuông không?', doc: D('b35-check') },
  ],
};

const t8_36: LessonContent = {
  scenes: [
    { title: 'Hai tam giác vuông đồng dạng', prompt: '△ABC vuông tại A. Đổi k, quay, lật tam giác thứ hai.', question: 'Hai tam giác vuông cần thêm điều kiện gì để đồng dạng?', doc: sim('right', { tri: RIGHT.map((p) => P(p.x * 0.55, p.y * 0.8 + 20)), k: 1.4 }), startHidden: true },
    { title: 'Đường cao trong tam giác vuông', prompt: 'Kéo B, C. Quan sát ba tam giác đồng dạng và các hệ thức.', question: 'Từ △HBA ∽ △HAC, suy ra hệ thức nào?', doc: { mode: 'similar', sub: 'altitude', tri: RIGHT, k: 1, rot: 0 }, startHidden: true },
    { title: 'Tính đường cao', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính AB và AC.', doc: D('b36-alt') },
    { title: 'Đo chiều cao bằng bóng nắng', prompt: 'Kéo các thanh trượt.', question: 'Vì sao phải đo bóng cọc và bóng cây cùng một lúc?', doc: { mode: 'height', sub: 'shadow', h1: 1.5, s1: 2, s2: 12 }, startHidden: true },
    { title: 'Đo chiều cao bằng cọc ngắm', prompt: 'Mắt, đỉnh cọc, đỉnh cây thẳng hàng.', question: 'Hai tam giác nào đồng dạng? Vì sao?', doc: { mode: 'height', sub: 'stick', h1: 2, s1: 3, s2: 15 }, startHidden: true },
    { title: 'Đo khoảng cách qua sông', prompt: 'Kéo các thanh trượt BC, DE, BD.', question: 'Viết công thức tính AB theo BC, DE, BD.', doc: { mode: 'height', sub: 'river', h1: 4, s1: 9, s2: 6 }, startHidden: true },
    { title: 'Ví dụ: cột cờ', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Bóng một toà nhà dài 30 m thì toà nhà cao bao nhiêu?', doc: D('b36-shadow') },
  ],
};

const t8_37: LessonContent = {
  scenes: [
    { title: 'Hình đồng dạng phối cảnh', prompt: 'Kéo tâm O, đổi tỉ số k; bật các tia từ O.', question: 'Khi k < 0, hình mới nằm ở đâu so với tâm O?', doc: { mode: 'homothety', shape: 'house', shapes: ['house', 'arrow', 'star', 'tri'], O: P(160, 160), k: 2, rays: true }, startHidden: true },
    { title: 'Hình đồng dạng', prompt: 'Quay hình mới: hai hình vẫn đồng dạng.', question: 'Hai hình như thế nào được gọi là đồng dạng?', doc: { mode: 'homothety', shape: 'arrow', shapes: ['house', 'arrow', 'star', 'tri'], O: P(200, 340), k: 1.5, turn: 60 }, startHidden: true },
    { title: 'Hình đồng dạng trong thực tế', prompt: 'Học sinh nêu, bấm vào ô để kiểm tra.', question: 'Bản đồ tỉ lệ 1 : 100 000, khoảng cách trên bản đồ 5 cm ứng với bao nhiêu kilômét thực tế?', doc: TB('similarLife'), startHidden: true },
  ],
};

// ---------------- Chương X ----------------

const pyr = (kind: 'tri' | 'sq', extra: Record<string, unknown> = {}) => ({ mode: 'pyramid', kind, a: 4, h: 5, yaw: 25, pitch: 18, unfold: 0, labels: true, ...extra });

const t8_38: LessonContent = {
  scenes: [
    { title: 'Hình chóp tam giác đều', prompt: 'Kéo trên hình để xoay. Bật đường cao, trung đoạn.', question: 'Hình chóp tam giác đều có mấy mặt, mấy đỉnh, mấy cạnh? Các mặt bên là hình gì?', doc: pyr('tri', { height: true }) },
    { title: 'Trải hình', prompt: 'Kéo thanh "Trải hình" từ 0 đến 1.', question: 'Hình khai triển gồm những hình nào? Có thể gấp hình khai triển thành hình chóp không?', doc: pyr('tri', { unfold: 0.5, pitch: 60 }) },
    { title: 'Diện tích xung quanh', prompt: 'Bật trung đoạn; đổi a, h. Học sinh tính trước khi hiện số đo.', question: 'Vì sao Sxq = p · d?', doc: pyr('tri', { apothem: true, a: 6 }), startHidden: true },
    { title: 'Ví dụ: diện tích xung quanh', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Tính Sxq nếu cạnh đáy 8 cm, trung đoạn 6 cm.', doc: D('b38-area') },
    { title: 'Ví dụ: thể tích', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Nếu chiều cao giảm một nửa thì thể tích thay đổi thế nào?', doc: D('b38-vol') },
  ],
};

const t8_39: LessonContent = {
  scenes: [
    { title: 'Hình chóp tứ giác đều', prompt: 'Kéo trên hình để xoay. So sánh với hình chóp tam giác đều.', question: 'Hình chóp tứ giác đều có mấy mặt bên? Mặt đáy là hình gì?', doc: pyr('sq', { kinds: ['tri', 'sq'], height: true }) },
    { title: 'Trải hình', prompt: 'Kéo thanh "Trải hình".', question: 'Hình khai triển gồm mấy tam giác cân và một hình gì?', doc: pyr('sq', { unfold: 0.5, pitch: 60 }) },
    { title: 'Thể tích: đổ nước', prompt: 'Bấm "Đổ nước 1 lần" cho đến khi đầy hình lăng trụ.', question: 'Thể tích hình chóp bằng bao nhiêu phần thể tích hình lăng trụ có cùng đáy, cùng chiều cao?', doc: pyr('sq', { sub: 'pour', pours: 0 }) },
    { title: 'Diện tích và thể tích', prompt: 'Đổi a, h; học sinh tính trước khi hiện số đo.', question: 'Tính Sxq, V với a = 4 cm, h = 6 cm.', doc: pyr('sq', { apothem: true, height: true, h: 6 }), startHidden: true },
    { title: 'Ví dụ: diện tích', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'Cần bao nhiêu mét vuông giấy để làm một chiếc đèn lồng hình chóp tứ giác đều (không đáy) cạnh đáy 20 cm, trung đoạn 30 cm?', doc: D('b39-area') },
    { title: 'Kim tự tháp', prompt: 'Học sinh làm trước rồi đối chiếu.', question: 'So sánh thể tích kim tự tháp với một khối hộp có cùng đáy, cùng chiều cao.', doc: D('b39-vol') },
    { title: 'So sánh hai loại hình chóp', prompt: 'Học sinh điền, bấm vào ô để kiểm tra.', question: 'Hai loại hình chóp đều có điểm gì giống nhau?', doc: TB('pyramids'), startHidden: true },
  ],
};

export const MATH8B_LESSONS: Record<string, LessonContent> = {
  't8-21': t8_21,
  't8-22': t8_22,
  't8-23': t8_23,
  't8-24': t8_24,
  't8-25': t8_25,
  't8-26': t8_26,
  't8-27': t8_27,
  't8-28': t8_28,
  't8-29': t8_29,
  't8-30': t8_30,
  't8-31': t8_31,
  't8-32': t8_32,
  't8-33': t8_33,
  't8-34': t8_34,
  't8-35': t8_35,
  't8-36': t8_36,
  't8-37': t8_37,
  't8-38': t8_38,
  't8-39': t8_39,
};
