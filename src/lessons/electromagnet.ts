// Nội dung KHTN 9 Chương IV: Bài 14, 15.
import type { LessonContent } from '../core/types';

const l9_14: LessonContent = {
  scenes: [
    {
      title: 'Dòng điện cảm ứng',
      prompt: 'Kéo nam châm đưa vào, rút ra khỏi cuộn dây (hoặc bấm các nút bên phải). Quan sát điện kế và hai đèn LED.',
      question: 'Khi nào trong cuộn dây xuất hiện dòng điện cảm ứng? Khi nam châm đứng yên trong cuộn dây thì sao?',
      doc: { mode: 'induction', facing: 'N', turns: 400 },
    },
    {
      title: 'Điều kiện xuất hiện dòng điện cảm ứng',
      prompt: 'So sánh khi đưa nam châm vào nhanh, vào chậm, rút ra; đổi cực nam châm; tăng số vòng dây.',
      question: 'Chiều của dòng điện cảm ứng khi đưa nam châm vào và khi rút ra có giống nhau không? Độ lớn phụ thuộc vào gì?',
      doc: { mode: 'induction', facing: 'S', turns: 800 },
      startHidden: true,
    },
    {
      title: 'Máy phát điện xoay chiều',
      prompt: 'Cho nam châm (hoặc cuộn dây) quay. Quan sát hai đèn LED sáng luân phiên và đồ thị dòng điện.',
      question: 'Vì sao dòng điện tạo ra luân phiên đổi chiều? Nêu nguyên tắc tạo ra dòng điện xoay chiều.',
      doc: { mode: 'generator', speed: 1, rotor: 'magnet' },
    },
  ],
};

const l9_15: LessonContent = {
  scenes: [
    {
      title: 'Tác dụng của dòng điện xoay chiều',
      prompt: 'Chọn nguồn một chiều hoặc xoay chiều; bật "Quay chậm" để quan sát bóng đèn, hai LED và kim nam châm.',
      question: 'Dòng điện xoay chiều có những tác dụng nào? Tác dụng nào khác với dòng điện một chiều?',
      doc: { mode: 'ac', source: 'ac', f: 1 },
    },
    {
      title: 'So sánh với dòng điện một chiều',
      prompt: 'Chuyển qua lại giữa nguồn một chiều và xoay chiều. So sánh hướng lệch của kim nam châm.',
      question: 'Vì sao kim nam châm đặt gần cuộn dây có dòng điện xoay chiều lại dao động? Nêu các quy tắc an toàn điện.',
      doc: { mode: 'ac', source: 'dc', f: 1 },
    },
  ],
};

export const EM_LESSONS: Record<string, LessonContent> = {
  'l9-14': l9_14,
  'l9-15': l9_15,
};
