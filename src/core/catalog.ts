import type { ChapterMeta, EngineId, Grade, LessonMeta, Subject } from './types';

export const SUBJECT_NAME: Record<Subject, string> = { phys: 'Vật lí', chem: 'Hoá học', math: 'Toán' };
/** Tiền tố đường dẫn trang danh sách bài theo môn */
export const SUBJECT_PATH: Record<Subject, string> = { phys: 'lop', chem: 'hoa', math: 'toan' };
/** Các lớp có nội dung của từng môn */
export const SUBJECT_GRADES: Record<Subject, Grade[]> = { phys: [7, 8, 9], chem: [7, 8, 9], math: [8, 9] };
/** Tiền tố mã bài theo môn */
const ID_PREFIX: Record<Subject, string> = { phys: 'l', chem: 'h', math: 't' };

export const CHAPTERS: Record<string, ChapterMeta> = {
  // ---------- Vật lí ----------
  '7-MD': { subject: 'phys', grade: 7, roman: '', title: 'Mở đầu' },
  '7-III': { subject: 'phys', grade: 7, roman: 'III', title: 'Tốc độ' },
  '7-IV': { subject: 'phys', grade: 7, roman: 'IV', title: 'Âm thanh' },
  '7-V': { subject: 'phys', grade: 7, roman: 'V', title: 'Ánh sáng' },
  '7-VI': { subject: 'phys', grade: 7, roman: 'VI', title: 'Từ' },
  '8-III': { subject: 'phys', grade: 8, roman: 'III', title: 'Khối lượng riêng và áp suất' },
  '8-IV': { subject: 'phys', grade: 8, roman: 'IV', title: 'Tác dụng làm quay của lực' },
  '8-V': { subject: 'phys', grade: 8, roman: 'V', title: 'Điện' },
  '8-VI': { subject: 'phys', grade: 8, roman: 'VI', title: 'Nhiệt' },
  '9-MD': { subject: 'phys', grade: 9, roman: '', title: 'Mở đầu' },
  '9-I': { subject: 'phys', grade: 9, roman: 'I', title: 'Năng lượng cơ học' },
  '9-II': { subject: 'phys', grade: 9, roman: 'II', title: 'Ánh sáng' },
  '9-III': { subject: 'phys', grade: 9, roman: 'III', title: 'Điện' },
  '9-IV': { subject: 'phys', grade: 9, roman: 'IV', title: 'Điện từ' },
  '9-V': { subject: 'phys', grade: 9, roman: 'V', title: 'Năng lượng với cuộc sống' },
  // ---------- Hoá học ----------
  'h7-I': { subject: 'chem', grade: 7, roman: 'I', title: 'Nguyên tử. Sơ lược về bảng tuần hoàn các nguyên tố hoá học' },
  'h7-II': { subject: 'chem', grade: 7, roman: 'II', title: 'Phân tử. Liên kết hoá học' },
  'h8-MD': { subject: 'chem', grade: 8, roman: '', title: 'Mở đầu' },
  'h8-I': { subject: 'chem', grade: 8, roman: 'I', title: 'Phản ứng hoá học' },
  'h8-II': { subject: 'chem', grade: 8, roman: 'II', title: 'Một số hợp chất thông dụng' },
  'h9-MD': { subject: 'chem', grade: 9, roman: '', title: 'Mở đầu' },
  'h9-VI': { subject: 'chem', grade: 9, roman: 'VI', title: 'Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại' },
  'h9-VII': { subject: 'chem', grade: 9, roman: 'VII', title: 'Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu' },
  'h9-VIII': { subject: 'chem', grade: 9, roman: 'VIII', title: 'Ethylic alcohol và acetic acid' },
  'h9-IX': { subject: 'chem', grade: 9, roman: 'IX', title: 'Lipid. Carbohydrate. Protein. Polymer' },
  'h9-X': { subject: 'chem', grade: 9, roman: 'X', title: 'Khai thác tài nguyên từ vỏ Trái Đất' },
  // ---------- Toán ----------
  't8-I': { subject: 'math', grade: 8, roman: 'I', title: 'Đa thức' },
  't8-II': { subject: 'math', grade: 8, roman: 'II', title: 'Hằng đẳng thức đáng nhớ và ứng dụng' },
  't8-III': { subject: 'math', grade: 8, roman: 'III', title: 'Tứ giác' },
  't8-IV': { subject: 'math', grade: 8, roman: 'IV', title: 'Định lí Thalès' },
  't8-V': { subject: 'math', grade: 8, roman: 'V', title: 'Dữ liệu và biểu đồ' },
  't8-VI': { subject: 'math', grade: 8, roman: 'VI', title: 'Phân thức đại số' },
  't8-VII': { subject: 'math', grade: 8, roman: 'VII', title: 'Phương trình bậc nhất và hàm số bậc nhất' },
  't8-VIII': { subject: 'math', grade: 8, roman: 'VIII', title: 'Mở đầu về tính xác suất của biến cố' },
  't8-IX': { subject: 'math', grade: 8, roman: 'IX', title: 'Tam giác đồng dạng' },
  't8-X': { subject: 'math', grade: 8, roman: 'X', title: 'Một số hình khối trong thực tiễn' },
  't9-I': { subject: 'math', grade: 9, roman: 'I', title: 'Phương trình và hệ hai phương trình bậc nhất hai ẩn' },
  't9-II': { subject: 'math', grade: 9, roman: 'II', title: 'Phương trình và bất phương trình bậc nhất một ẩn' },
  't9-III': { subject: 'math', grade: 9, roman: 'III', title: 'Căn bậc hai và căn bậc ba' },
  't9-IV': { subject: 'math', grade: 9, roman: 'IV', title: 'Hệ thức lượng trong tam giác vuông' },
  't9-V': { subject: 'math', grade: 9, roman: 'V', title: 'Đường tròn' },
  't9-VI': { subject: 'math', grade: 9, roman: 'VI', title: 'Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn' },
  't9-VII': { subject: 'math', grade: 9, roman: 'VII', title: 'Tần số và tần số tương đối' },
  't9-VIII': { subject: 'math', grade: 9, roman: 'VIII', title: 'Xác suất của biến cố trong một số mô hình xác suất đơn giản' },
  't9-IX': { subject: 'math', grade: 9, roman: 'IX', title: 'Đường tròn ngoại tiếp và đường tròn nội tiếp' },
  't9-X': { subject: 'math', grade: 9, roman: 'X', title: 'Một số hình khối trong thực tiễn' },
};

const PHASE: Record<EngineId, string> = {
  circuit: 'P1',
  optics: 'P2',
  fluid: 'P3',
  mechanics: 'P4',
  thermal: 'P5',
  electromagnet: 'P6',
  diagram: 'P7',
  chemlab: 'H1',
  molecule: 'H2',
  process: 'H3',
  motion: 'P8',
  sound: 'P9',
  light: 'P10',
  magnet: 'P11',
  algebra: 'T1',
  func: 'T2',
  geometry: 'T3',
  stats: 'T4',
  prob: 'T5',
  solid: 'T6',
};

type Row = [num: number, title: string, chapter: string, engine: EngineId, practical?: boolean];

const ROWS_7: Row[] = [
  [1, 'Phương pháp và kĩ năng học tập môn Khoa học tự nhiên', '7-MD', 'motion'],
  [8, 'Tốc độ chuyển động', '7-III', 'motion'],
  [9, 'Đo tốc độ', '7-III', 'motion', true],
  [10, 'Đồ thị quãng đường – thời gian', '7-III', 'motion'],
  [11, 'Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông', '7-III', 'motion'],
  [12, 'Sóng âm', '7-IV', 'sound'],
  [13, 'Độ to và độ cao của âm', '7-IV', 'sound'],
  [14, 'Phản xạ âm, chống ô nhiễm tiếng ồn', '7-IV', 'sound'],
  [15, 'Năng lượng ánh sáng. Tia sáng, vùng tối', '7-V', 'light'],
  [16, 'Sự phản xạ ánh sáng', '7-V', 'light', true],
  [17, 'Ảnh của vật qua gương phẳng', '7-V', 'light'],
  [18, 'Nam châm', '7-VI', 'magnet'],
  [19, 'Từ trường', '7-VI', 'magnet'],
  [20, 'Chế tạo nam châm điện đơn giản', '7-VI', 'magnet', true],
];

const CHEM_7: Row[] = [
  [2, 'Nguyên tử', 'h7-I', 'molecule'],
  [3, 'Nguyên tố hoá học', 'h7-I', 'molecule'],
  [4, 'Sơ lược về bảng tuần hoàn các nguyên tố hoá học', 'h7-I', 'molecule'],
  [5, 'Phân tử – Đơn chất – Hợp chất', 'h7-II', 'molecule'],
  [6, 'Giới thiệu về liên kết hoá học', 'h7-II', 'molecule'],
  [7, 'Hoá trị và công thức hoá học', 'h7-II', 'molecule'],
];

const ROWS_8: Row[] = [
  [13, 'Khối lượng riêng', '8-III', 'fluid'],
  [14, 'Thực hành xác định khối lượng riêng', '8-III', 'fluid', true],
  [15, 'Áp suất trên một bề mặt', '8-III', 'fluid'],
  [16, 'Áp suất chất lỏng. Áp suất khí quyển', '8-III', 'fluid'],
  [17, 'Lực đẩy Archimedes', '8-III', 'fluid'],
  [18, 'Tác dụng làm quay của lực. Moment lực', '8-IV', 'mechanics'],
  [19, 'Đòn bẩy và ứng dụng', '8-IV', 'mechanics'],
  [20, 'Hiện tượng nhiễm điện do cọ xát', '8-V', 'thermal'],
  [21, 'Dòng điện, nguồn điện', '8-V', 'circuit'],
  [22, 'Mạch điện đơn giản', '8-V', 'circuit'],
  [23, 'Tác dụng của dòng điện', '8-V', 'circuit'],
  [24, 'Cường độ dòng điện và hiệu điện thế', '8-V', 'circuit'],
  [25, 'Thực hành đo cường độ dòng điện và hiệu điện thế', '8-V', 'circuit', true],
  [26, 'Năng lượng nhiệt và nội năng', '8-VI', 'thermal'],
  [27, 'Thực hành đo năng lượng nhiệt bằng joulemeter', '8-VI', 'thermal', true],
  [28, 'Sự truyền nhiệt', '8-VI', 'thermal'],
  [29, 'Sự nở vì nhiệt', '8-VI', 'thermal'],
];

const ROWS_9: Row[] = [
  [1, 'Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học', '9-MD', 'diagram'],
  [2, 'Động năng. Thế năng', '9-I', 'mechanics'],
  [3, 'Cơ năng', '9-I', 'mechanics'],
  [4, 'Công và công suất', '9-I', 'mechanics'],
  [5, 'Khúc xạ ánh sáng', '9-II', 'optics'],
  [6, 'Phản xạ toàn phần', '9-II', 'optics'],
  [7, 'Lăng kính', '9-II', 'optics'],
  [8, 'Thấu kính', '9-II', 'optics'],
  [9, 'Thực hành đo tiêu cự của thấu kính hội tụ', '9-II', 'optics', true],
  [10, 'Kính lúp. Bài tập thấu kính', '9-II', 'optics'],
  [11, 'Điện trở. Định luật Ohm', '9-III', 'circuit'],
  [12, 'Đoạn mạch nối tiếp, song song', '9-III', 'circuit'],
  [13, 'Năng lượng của dòng điện và công suất điện', '9-III', 'circuit'],
  [14, 'Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều', '9-IV', 'electromagnet'],
  [15, 'Tác dụng của dòng điện xoay chiều', '9-IV', 'electromagnet'],
  [16, 'Vòng năng lượng trên Trái Đất. Năng lượng hoá thạch', '9-V', 'diagram'],
  [17, 'Một số dạng năng lượng tái tạo', '9-V', 'diagram'],
];

const CHEM_8: Row[] = [
  [1, 'Sử dụng một số hoá chất, thiết bị cơ bản trong phòng thí nghiệm', 'h8-MD', 'process'],
  [2, 'Phản ứng hoá học', 'h8-I', 'chemlab'],
  [3, 'Mol và tỉ khối chất khí', 'h8-I', 'molecule'],
  [4, 'Dung dịch và nồng độ', 'h8-I', 'chemlab', true],
  [5, 'Định luật bảo toàn khối lượng và phương trình hoá học', 'h8-I', 'molecule'],
  [6, 'Tính theo phương trình hoá học', 'h8-I', 'molecule'],
  [7, 'Tốc độ phản ứng và chất xúc tác', 'h8-I', 'chemlab'],
  [8, 'Acid', 'h8-II', 'chemlab'],
  [9, 'Base. Thang pH', 'h8-II', 'chemlab'],
  [10, 'Oxide', 'h8-II', 'chemlab'],
  [11, 'Muối', 'h8-II', 'chemlab'],
  [12, 'Phân bón hoá học', 'h8-II', 'process'],
];

const CHEM_9: Row[] = [
  [1, 'Nhận biết một số dụng cụ, hoá chất (phần Hoá học)', 'h9-MD', 'process'],
  [18, 'Tính chất chung của kim loại', 'h9-VI', 'chemlab'],
  [19, 'Dãy hoạt động hoá học', 'h9-VI', 'chemlab'],
  [20, 'Tách kim loại và việc sử dụng hợp kim', 'h9-VI', 'process'],
  [21, 'Sự khác nhau cơ bản giữa phi kim và kim loại', 'h9-VI', 'process'],
  [22, 'Giới thiệu về hợp chất hữu cơ', 'h9-VII', 'molecule'],
  [23, 'Alkane', 'h9-VII', 'molecule'],
  [24, 'Alkene', 'h9-VII', 'molecule'],
  [25, 'Nguồn nhiên liệu', 'h9-VII', 'process'],
  [26, 'Ethylic alcohol', 'h9-VIII', 'chemlab'],
  [27, 'Acetic acid', 'h9-VIII', 'chemlab'],
  [28, 'Lipid', 'h9-IX', 'process'],
  [29, 'Carbohydrate. Glucose và saccharose', 'h9-IX', 'chemlab'],
  [30, 'Tinh bột và cellulose', 'h9-IX', 'chemlab'],
  [31, 'Protein', 'h9-IX', 'chemlab'],
  [32, 'Polymer', 'h9-IX', 'molecule'],
  [33, 'Sơ lược về hoá học vỏ Trái Đất và khai thác tài nguyên từ vỏ Trái Đất', 'h9-X', 'process'],
  [34, 'Khai thác đá vôi. Công nghiệp silicate', 'h9-X', 'process'],
  [35, 'Khai thác nhiên liệu hoá thạch. Nguồn carbon. Chu trình carbon và sự ấm lên toàn cầu', 'h9-X', 'process'],
];

const MATH_8: Row[] = [
  [1, 'Đơn thức', 't8-I', 'algebra'],
  [2, 'Đa thức', 't8-I', 'algebra'],
  [3, 'Phép cộng và phép trừ đa thức', 't8-I', 'algebra'],
  [4, 'Phép nhân đa thức', 't8-I', 'algebra'],
  [5, 'Phép chia đa thức cho đơn thức', 't8-I', 'algebra'],
  [6, 'Hiệu hai bình phương. Bình phương của một tổng hay một hiệu', 't8-II', 'algebra'],
  [7, 'Lập phương của một tổng. Lập phương của một hiệu', 't8-II', 'algebra'],
  [8, 'Tổng và hiệu hai lập phương', 't8-II', 'algebra'],
  [9, 'Phân tích đa thức thành nhân tử', 't8-II', 'algebra'],
  [10, 'Tứ giác', 't8-III', 'geometry'],
  [11, 'Hình thang cân', 't8-III', 'geometry'],
  [12, 'Hình bình hành', 't8-III', 'geometry'],
  [13, 'Hình chữ nhật', 't8-III', 'geometry'],
  [14, 'Hình thoi và hình vuông', 't8-III', 'geometry'],
  [15, 'Định lí Thalès trong tam giác', 't8-IV', 'geometry'],
  [16, 'Đường trung bình của tam giác', 't8-IV', 'geometry'],
  [17, 'Tính chất đường phân giác của tam giác', 't8-IV', 'geometry'],
  [18, 'Thu thập và phân loại dữ liệu', 't8-V', 'stats'],
  [19, 'Biểu diễn dữ liệu bằng bảng, biểu đồ', 't8-V', 'stats'],
  [20, 'Phân tích số liệu thống kê dựa vào biểu đồ', 't8-V', 'stats'],
  [21, 'Phân thức đại số', 't8-VI', 'algebra'],
  [22, 'Tính chất cơ bản của phân thức đại số', 't8-VI', 'algebra'],
  [23, 'Phép cộng và phép trừ phân thức đại số', 't8-VI', 'algebra'],
  [24, 'Phép nhân và phép chia phân thức đại số', 't8-VI', 'algebra'],
  [25, 'Phương trình bậc nhất một ẩn', 't8-VII', 'algebra'],
  [26, 'Giải bài toán bằng cách lập phương trình', 't8-VII', 'algebra'],
  [27, 'Khái niệm hàm số và đồ thị của hàm số', 't8-VII', 'func'],
  [28, 'Hàm số bậc nhất và đồ thị của hàm số bậc nhất', 't8-VII', 'func'],
  [29, 'Hệ số góc của đường thẳng', 't8-VII', 'func'],
  [30, 'Kết quả có thể và kết quả thuận lợi', 't8-VIII', 'prob'],
  [31, 'Cách tính xác suất của biến cố bằng tỉ số', 't8-VIII', 'prob'],
  [32, 'Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng', 't8-VIII', 'prob'],
  [33, 'Hai tam giác đồng dạng', 't8-IX', 'geometry'],
  [34, 'Ba trường hợp đồng dạng của hai tam giác', 't8-IX', 'geometry'],
  [35, 'Định lí Pythagore và ứng dụng', 't8-IX', 'geometry'],
  [36, 'Các trường hợp đồng dạng của hai tam giác vuông', 't8-IX', 'geometry'],
  [37, 'Hình đồng dạng', 't8-IX', 'geometry'],
  [38, 'Hình chóp tam giác đều', 't8-X', 'solid'],
  [39, 'Hình chóp tứ giác đều', 't8-X', 'solid'],
];

const MATH_9: Row[] = [
  [1, 'Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn', 't9-I', 'algebra'],
  [2, 'Giải hệ hai phương trình bậc nhất hai ẩn', 't9-I', 'algebra'],
  [3, 'Giải bài toán bằng cách lập hệ phương trình', 't9-I', 'algebra'],
  [4, 'Phương trình quy về phương trình bậc nhất một ẩn', 't9-II', 'algebra'],
  [5, 'Bất đẳng thức và tính chất', 't9-II', 'algebra'],
  [6, 'Bất phương trình bậc nhất một ẩn', 't9-II', 'algebra'],
  [7, 'Căn bậc hai và căn thức bậc hai', 't9-III', 'algebra'],
  [8, 'Khai căn bậc hai với phép nhân và phép chia', 't9-III', 'algebra'],
  [9, 'Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai', 't9-III', 'algebra'],
  [10, 'Căn bậc ba và căn thức bậc ba', 't9-III', 'algebra'],
  [11, 'Tỉ số lượng giác của góc nhọn', 't9-IV', 'geometry'],
  [12, 'Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng', 't9-IV', 'geometry'],
  [13, 'Mở đầu về đường tròn', 't9-V', 'geometry'],
  [14, 'Cung và dây của một đường tròn', 't9-V', 'geometry'],
  [15, 'Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên', 't9-V', 'geometry'],
  [16, 'Vị trí tương đối của đường thẳng và đường tròn', 't9-V', 'geometry'],
  [17, 'Vị trí tương đối của hai đường tròn', 't9-V', 'geometry'],
  [18, 'Hàm số y = ax² (a ≠ 0)', 't9-VI', 'func'],
  [19, 'Phương trình bậc hai một ẩn', 't9-VI', 'algebra'],
  [20, 'Định lí Viète và ứng dụng', 't9-VI', 'algebra'],
  [21, 'Giải bài toán bằng cách lập phương trình', 't9-VI', 'algebra'],
  [22, 'Bảng tần số và biểu đồ tần số', 't9-VII', 'stats'],
  [23, 'Bảng tần số tương đối và biểu đồ tần số tương đối', 't9-VII', 'stats'],
  [24, 'Bảng tần số, tần số tương đối ghép nhóm và biểu đồ', 't9-VII', 'stats'],
  [25, 'Phép thử ngẫu nhiên và không gian mẫu', 't9-VIII', 'prob'],
  [26, 'Xác suất của biến cố liên quan tới phép thử', 't9-VIII', 'prob'],
  [27, 'Góc nội tiếp', 't9-IX', 'geometry'],
  [28, 'Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác', 't9-IX', 'geometry'],
  [29, 'Tứ giác nội tiếp', 't9-IX', 'geometry'],
  [30, 'Đa giác đều', 't9-IX', 'geometry'],
  [31, 'Hình trụ và hình nón', 't9-X', 'solid'],
  [32, 'Hình cầu', 't9-X', 'solid'],
];

function build(subject: Subject, grade: Grade, rows: Row[]): LessonMeta[] {
  return rows.map(([num, title, chapter, engine, practical]) => ({
    id: `${ID_PREFIX[subject]}${grade}-${num}`,
    subject,
    grade,
    num,
    title,
    chapter,
    engine,
    practical,
    phase: PHASE[engine],
  }));
}

export const LESSONS: LessonMeta[] = [...build('phys', 7, ROWS_7), ...build('phys', 8, ROWS_8), ...build('phys', 9, ROWS_9), ...build('chem', 7, CHEM_7), ...build('chem', 8, CHEM_8), ...build('chem', 9, CHEM_9), ...build('math', 8, MATH_8), ...build('math', 9, MATH_9)];

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id);

export function chaptersOf(grade: Grade, subject: Subject = 'phys'): { key: string; meta: ChapterMeta; lessons: LessonMeta[] }[] {
  return Object.entries(CHAPTERS)
    .filter(([, c]) => c.grade === grade && c.subject === subject)
    .map(([key, meta]) => ({ key, meta, lessons: LESSONS.filter((l) => l.chapter === key) }));
}
