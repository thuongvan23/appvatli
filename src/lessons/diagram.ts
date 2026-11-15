// Nội dung KHTN 9: Bài 1, Bài 16, Bài 17.
import type { LessonContent } from '../core/types';

const l9_1: LessonContent = {
  scenes: [
    {
      title: 'Dụng cụ thí nghiệm',
      prompt: 'Bấm vào từng dụng cụ để xem công dụng và lưu ý khi sử dụng.',
      question: 'Kể tên các dụng cụ dùng để đo cường độ dòng điện, hiệu điện thế, năng lượng điện.',
      doc: { mode: 'tools' },
    },
    {
      title: 'Tập đọc số chỉ đồng hồ đo',
      prompt: 'Xác định GHĐ, ĐCNN rồi nhập số chỉ của đồng hồ. Bấm "Câu khác" để luyện tiếp.',
      doc: { mode: 'meterQuiz', unit: 'A', range: 1, seed: 1 },
      startHidden: true,
    },
    {
      title: 'Báo cáo một vấn đề khoa học',
      prompt: 'Lần lượt đi qua các mục của một bài báo cáo khoa học.',
      doc: { mode: 'reportGuide', step: 0 },
    },
  ],
};

const l9_16: LessonContent = {
  scenes: [
    {
      title: 'Vòng năng lượng trên Trái Đất',
      prompt: 'Bấm vào từng ô để xem năng lượng được chuyển hoá và truyền đi như thế nào.',
      question: 'Vì sao nói Mặt Trời là nguồn gốc của hầu hết các dạng năng lượng trên Trái Đất?',
      doc: { mode: 'cycle', sel: 0 },
    },
    {
      title: 'Sự hình thành nhiên liệu hoá thạch',
      prompt: 'Kéo thanh thời gian để xem quá trình hình thành than đá, dầu mỏ qua hàng triệu năm.',
      question: 'Vì sao nhiên liệu hoá thạch là nguồn năng lượng không tái tạo?',
      doc: { mode: 'fossil', t: 0, fuel: 'coal' },
    },
    {
      title: 'Tác động đến môi trường',
      prompt: 'Tăng mức sử dụng nhiên liệu hoá thạch, quan sát khói thải, nồng độ CO₂ và nhiệt độ.',
      question: 'Nêu tác hại của việc sử dụng nhiên liệu hoá thạch và biện pháp giảm thiểu.',
      doc: { mode: 'climate', burn: 0.6 },
    },
  ],
};

const l9_17: LessonContent = {
  scenes: [
    {
      title: 'Các dạng năng lượng tái tạo',
      prompt: 'Bấm vào từng dạng năng lượng để xem ưu điểm, nhược điểm.',
      question: 'Ở địa phương em có thể khai thác dạng năng lượng tái tạo nào?',
      doc: { mode: 'renew', sel: 0 },
    },
    {
      title: 'Điện gió',
      prompt: 'Thay đổi tốc độ gió và quan sát công suất của tua bin.',
      doc: { mode: 'wind', v: 8 },
    },
    {
      title: 'Pin mặt trời',
      prompt: 'Thay đổi giờ trong ngày, góc nghiêng tấm pin và mây che. Khi nào tấm pin cho công suất lớn nhất?',
      doc: { mode: 'solar', hour: 10, tilt: 0, clouds: 0 },
    },
    {
      title: 'Thuỷ điện',
      prompt: 'Thay đổi lưu lượng nước và độ cao cột nước, quan sát công suất nhà máy.',
      question: 'Kể tên một số nhà máy thuỷ điện lớn ở Việt Nam.',
      doc: { mode: 'hydro', Q: 100, h: 80 },
    },
    {
      title: 'Sử dụng năng lượng tiết kiệm',
      prompt: 'Chọn các thói quen tiết kiệm năng lượng và xem lượng điện, tiền điện tiết kiệm được.',
      question: 'Đề xuất ba việc em có thể làm để tiết kiệm năng lượng ở trường học.',
      doc: { mode: 'saving', on: [false, false, false, false, false, false, false] },
    },
  ],
};

export const DIAGRAM_LESSONS: Record<string, LessonContent> = {
  'l9-1': l9_1,
  'l9-16': l9_16,
  'l9-17': l9_17,
};
