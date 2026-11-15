import type { ChapterMeta, EngineId, Grade, LessonMeta, Subject } from './types';

export const SUBJECT_NAME: Record<Subject, string> = { phys: 'Vật lí', chem: 'Hoá học' };
/** Tiền tố đường dẫn trang danh sách bài theo môn */
export const SUBJECT_PATH: Record<Subject, string> = { phys: 'lop', chem: 'hoa' };

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

function build(subject: Subject, grade: Grade, rows: Row[]): LessonMeta[] {
  return rows.map(([num, title, chapter, engine, practical]) => ({
    id: `${subject === 'phys' ? 'l' : 'h'}${grade}-${num}`,
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

export const LESSONS: LessonMeta[] = [...build('phys', 7, ROWS_7), ...build('phys', 8, ROWS_8), ...build('phys', 9, ROWS_9), ...build('chem', 7, CHEM_7), ...build('chem', 8, CHEM_8), ...build('chem', 9, CHEM_9)];

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id);

export function chaptersOf(grade: Grade, subject: Subject = 'phys'): { key: string; meta: ChapterMeta; lessons: LessonMeta[] }[] {
  return Object.entries(CHAPTERS)
    .filter(([, c]) => c.grade === grade && c.subject === subject)
    .map(([key, meta]) => ({ key, meta, lessons: LESSONS.filter((l) => l.chapter === key) }));
}
