// Nội dung bài học (lí thuyết, hiện tượng, ví dụ, câu hỏi) – do nhóm phát triển tự biên soạn,
// bám theo yêu cầu cần đạt và các hiện tượng được đề cập trong SGK KHTN 8, 9 (Kết nối tri thức).

export interface NoteSection {
  title: string;
  /** Mỗi phần tử là một đoạn văn */
  body: string[];
  /** Số thứ tự cảnh mô phỏng liên quan (bắt đầu từ 1) */
  scene?: number;
}

export interface LessonNotes {
  /** Học xong bài này, học sinh có thể… */
  goals: string[];
  /** Câu hỏi mở đầu gợi tò mò */
  opener?: string;
  /** Kiến thức trọng tâm và mô tả hiện tượng, thí nghiệm */
  sections: NoteSection[];
  /** Công thức cần nhớ */
  formulas?: { expr: string; note: string }[];
  /** Ví dụ, ứng dụng trong đời sống */
  examples: string[];
  /** Em có biết */
  facts?: string[];
  /** Câu hỏi, bài tập vận dụng kèm đáp án */
  exercises: { q: string; a: string }[];
}
