import type { ComponentType } from 'react';

export type Grade = 7 | 8 | 9;

/** Môn: Vật lí, Hoá học hoặc Toán */
export type Subject = 'phys' | 'chem' | 'math';

export type EngineId = 'circuit' | 'optics' | 'fluid' | 'mechanics' | 'thermal' | 'electromagnet' | 'diagram' | 'chemlab' | 'molecule' | 'process' | 'motion' | 'sound' | 'light' | 'magnet' | 'algebra' | 'func' | 'geometry' | 'stats' | 'prob' | 'solid';

export interface ChapterMeta {
  subject: Subject;
  grade: Grade;
  /** Số chương theo SGK (III, IV, ...) */
  roman: string;
  title: string;
}

export interface LessonMeta {
  id: string; // ví dụ "l8-21" (Vật lí), "h8-2" (Hoá học)
  subject: Subject;
  grade: Grade;
  num: number;
  title: string;
  chapter: string; // khoá chương, ví dụ "8-V"
  engine: EngineId;
  /** Bài thực hành có báo cáo */
  practical?: boolean;
  /** Giai đoạn phát triển dự kiến (khi chưa có nội dung) */
  phase: string;
}

/** Một cảnh = một trạng thái dựng sẵn của engine, giống một trang trình chiếu. */
export interface Scene<D = unknown, O = unknown> {
  title: string;
  /** Hướng dẫn thao tác ngắn hiển thị ở chân màn hình */
  prompt?: string;
  /** Câu hỏi gợi ý cho học sinh dự đoán/trả lời */
  question?: string;
  doc: D;
  options?: O;
  /** Bảng số liệu/báo cáo gắn với cảnh này */
  report?: ReportDef;
  /** Mở cảnh ở trạng thái ẩn số đo (để học sinh đọc/dự đoán trước) */
  startHidden?: boolean;
}

export interface LessonContent {
  scenes: Scene[];
}

// ---------- Bảng số liệu & báo cáo thực hành ----------

export interface ReportColumn {
  key: string;
  label: string;
  unit?: string;
  /** Lấy từ số đo hiện tại của mô phỏng (khoá trong Measurements) */
  source?: string;
  /** Cột tính từ các cột khác trên cùng hàng */
  formula?: (row: Record<string, number | undefined>) => number | undefined;
  /** Số chữ số thập phân khi hiển thị */
  digits?: number;
  /** Có hiện dòng giá trị trung bình không */
  average?: boolean;
}

export interface ReportDef {
  title: string;
  /** true: in kèm khung "Báo cáo thực hành" (họ tên, mục đích, ...) */
  practical?: boolean;
  purpose?: string;
  equipment?: string[];
  steps?: string[];
  columns: ReportColumn[];
  chart?: { x: string; y: string; title: string };
  questions?: string[];
}

/** Bảng số đo do engine cung cấp, ví dụ { "A.I": 0.25, "V.U": 2.9 } */
export type Measurements = Record<string, number>;

export interface EngineProps<D = unknown, O = unknown> {
  doc: D;
  onDoc: (doc: D) => void;
  options: O;
  /** false: ẩn số đo để học sinh dự đoán trước */
  showValues: boolean;
  onMeasure?: (m: Measurements) => void;
}

export interface EngineDef<D = unknown, O = unknown> {
  id: EngineId;
  name: string;
  View: ComponentType<EngineProps<D, O>>;
  emptyDoc: () => D;
  /** Tuỳ chọn khi mở ở chế độ phòng lab tự do */
  freeOptions: O;
}
